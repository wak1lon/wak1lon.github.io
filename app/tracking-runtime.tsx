"use client";

import { useEffect } from "react";
import { COOKIE_CONSENT_EVENT, CookiePreferences, readCookiePreferences } from "./cookie-consent-state";
import { defaultSettings, mergeSiteSettings, SETTINGS_KEY, SiteSettings } from "./site-client";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[] };
  }
}

const SETTINGS_EVENT = "wakilon:settings-updated";
const GA4_ID = "G-L8HFJW94KT";
let activeSettings = defaultSettings;
let appliedGtmCode = "";
let appliedMetaCode = "";
let ga4Configured = false;

function readLocalSettings(): SiteSettings {
  try {
    const saved = window.localStorage.getItem(SETTINGS_KEY);
    return saved ? mergeSiteSettings(JSON.parse(saved)) : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function faviconHref(source: string, version: string) {
  const href = source || "/favicon.svg";
  if (href.startsWith("data:image/")) return href;
  const token = version || "site-default-v1";
  return `${href}${href.includes("?") ? "&" : "?"}wakilon-favicon=${encodeURIComponent(token)}`;
}

function applyFavicon(source: string, version: string) {
  const href = faviconHref(source, version);

  document
    .querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]')
    .forEach((link) => link.remove());

  (["icon", "shortcut icon", "apple-touch-icon"] as const).forEach((rel) => {
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    link.setAttribute("data-wakilon-favicon", "true");
    document.head.appendChild(link);
  });
}

function removeSnippet(key: string) {
  document.querySelectorAll(`[data-wakilon-snippet="${key}"]`).forEach((node) => node.remove());
}

function installSnippet(code: string, key: string) {
  removeSnippet(key);
  if (!code.trim()) return;

  const template = document.createElement("template");
  template.innerHTML = code;
  template.content.querySelectorAll("script").forEach((source) => {
    const script = document.createElement("script");
    Array.from(source.attributes).forEach((attribute) => script.setAttribute(attribute.name, attribute.value));
    script.setAttribute("data-wakilon-snippet", key);
    script.textContent = source.textContent;
    document.head.appendChild(script);
    source.remove();
  });

  const remaining = template.innerHTML.trim();
  if (remaining) {
    const host = document.createElement("div");
    host.hidden = true;
    host.setAttribute("data-wakilon-snippet", key);
    host.innerHTML = remaining;
    document.body.appendChild(host);
  }
}

function ensureConsentMode() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || ((...args: unknown[]) => { window.dataLayer?.push(args); });
}

function applyGoogleConsent(preferences: CookiePreferences | null, mode: "default" | "update") {
  ensureConsentMode();
  window.gtag?.("consent", mode, {
    analytics_storage: preferences?.analytics ? "granted" : "denied",
    ad_storage: preferences?.marketing ? "granted" : "denied",
    ad_user_data: preferences?.marketing ? "granted" : "denied",
    ad_personalization: preferences?.marketing ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: mode === "default" ? 500 : undefined,
  });
}

function ensureGa4() {
  ensureConsentMode();
  if (!document.getElementById("wakilon-ga4-script")) {
    const script = document.createElement("script");
    script.id = "wakilon-ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(script);
  }
  if (!ga4Configured) {
    window.gtag?.("js", new Date());
    window.gtag?.("config", GA4_ID, { anonymize_ip: true });
    ga4Configured = true;
  }
}

function expireTrackingCookies() {
  const names = ["_ga", "_gid", "_gat", "_fbp", "_fbc"];
  const domains = ["", window.location.hostname, ".wakilongestor.com.br"];
  names.forEach((name) => domains.forEach((domain) => {
    document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ""} SameSite=Lax`;
  }));
}

function applyIntegrations(preferences = readCookiePreferences()) {
  applyFavicon(activeSettings.faviconData, activeSettings.faviconVersion);
  if (window.location.pathname.startsWith("/painel")) return;

  applyGoogleConsent(preferences, "update");
  if (preferences?.analytics) {
    ensureGa4();
    if (activeSettings.gtmCode !== appliedGtmCode) {
      installSnippet(activeSettings.gtmCode, "gtm");
      appliedGtmCode = activeSettings.gtmCode;
    }
  } else {
    removeSnippet("gtm");
    appliedGtmCode = "";
  }

  if (preferences?.marketing) {
    if (activeSettings.metaPixelCode !== appliedMetaCode) {
      installSnippet(activeSettings.metaPixelCode, "meta-pixel");
      appliedMetaCode = activeSettings.metaPixelCode;
    }
    window.fbq?.("consent", "grant");
  } else {
    window.fbq?.("consent", "revoke");
    removeSnippet("meta-pixel");
    appliedMetaCode = "";
  }

  if (preferences && !preferences.analytics && !preferences.marketing) expireTrackingCookies();
}

async function refreshPublishedSettings() {
  activeSettings = readLocalSettings();
  applyFavicon(activeSettings.faviconData, activeSettings.faviconVersion);
  try {
    const { loadPublishedSiteSettings } = await import("./site-settings-store");
    const published = await loadPublishedSiteSettings();
    if (published) {
      activeSettings = published;
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(published));
    }
  } catch {
    // Mantém a versão padrão/local se o Firebase estiver temporariamente indisponível.
  }
  applyIntegrations();
}

function normalizeParameter(value: string | undefined) {
  return value?.trim().slice(0, 180) || undefined;
}

export function trackMarketingEvent(eventName: string, parameters: Record<string, string | undefined> = {}) {
  const preferences = readCookiePreferences();
  if (!preferences?.analytics && !preferences?.marketing) return;
  const cleanParameters = Object.fromEntries(
    Object.entries(parameters)
      .map(([key, value]) => [key, normalizeParameter(value)] as const)
      .filter((entry): entry is [string, string] => Boolean(entry[1])),
  );

  if (preferences.analytics) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: `wakilon_${eventName}`, ...cleanParameters });
    window.gtag?.("event", eventName, cleanParameters);
  }
  if (preferences.marketing && window.fbq) {
    if (eventName === "generate_lead") window.fbq("track", "Lead", cleanParameters);
    else if (eventName === "contact") window.fbq("track", "Contact", cleanParameters);
    else window.fbq("trackCustom", eventName, cleanParameters);
  }
}

export default function TrackingRuntime() {
  useEffect(() => {
    applyGoogleConsent(readCookiePreferences(), "default");
    void refreshPublishedSettings();

    const handleSettings = () => { void refreshPublishedSettings(); };
    const handleConsent = (event: Event) => applyIntegrations((event as CustomEvent<CookiePreferences>).detail);
    const handleClick = (event: MouseEvent) => {
      const element = (event.target as Element | null)?.closest<HTMLElement>("[data-track-event]");
      if (!element) return;
      trackMarketingEvent(element.dataset.trackEvent || "interaction", {
        interaction_text: element.dataset.trackLabel || element.textContent || undefined,
        funnel_step: element.dataset.trackStep,
        plan_name: element.dataset.trackPlan,
        link_url: element instanceof HTMLAnchorElement ? element.href : undefined,
        page_path: window.location.pathname,
      });
    };

    window.addEventListener(SETTINGS_EVENT, handleSettings);
    window.addEventListener("storage", handleSettings);
    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsent);
    document.addEventListener("click", handleClick);
    trackMarketingEvent("page_ready", { page_path: window.location.pathname });

    return () => {
      window.removeEventListener(SETTINGS_EVENT, handleSettings);
      window.removeEventListener("storage", handleSettings);
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsent);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
