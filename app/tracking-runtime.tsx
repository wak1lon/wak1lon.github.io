"use client";

import { useEffect } from "react";
import { defaultSettings, SETTINGS_KEY, SiteSettings } from "./site-client";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const SETTINGS_EVENT = "wakilon:settings-updated";

function readSettings(): SiteSettings {
  try {
    const saved = window.localStorage.getItem(SETTINGS_KEY);
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function applyFavicon(dataUrl: string) {
  const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]') ?? document.createElement("link");
  link.rel = "icon";
  link.href = dataUrl || "/favicon.svg";
  link.setAttribute("data-wakilon-favicon", "true");
  if (!link.parentNode) document.head.appendChild(link);
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

function applyEditableIntegrations() {
  const settings = readSettings();
  applyFavicon(settings.faviconData);

  // O painel não executa códigos colados. Eles rodam somente nas páginas públicas.
  if (window.location.pathname.startsWith("/painel")) return;
  installSnippet(settings.gtmCode, "gtm");
  installSnippet(settings.metaPixelCode, "meta-pixel");
}

function normalizeParameter(value: string | undefined) {
  return value?.trim().slice(0, 180) || undefined;
}

export function trackMarketingEvent(eventName: string, parameters: Record<string, string | undefined> = {}) {
  const cleanParameters = Object.fromEntries(
    Object.entries(parameters)
      .map(([key, value]) => [key, normalizeParameter(value)] as const)
      .filter((entry): entry is [string, string] => Boolean(entry[1])),
  );

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: `wakilon_${eventName}`, ...cleanParameters });
  window.gtag?.("event", eventName, cleanParameters);

  if (window.fbq) {
    if (eventName === "generate_lead") window.fbq("track", "Lead", cleanParameters);
    else if (eventName === "contact") window.fbq("track", "Contact", cleanParameters);
    else window.fbq("trackCustom", eventName, cleanParameters);
  }
}

export default function TrackingRuntime() {
  useEffect(() => {
    applyEditableIntegrations();

    const handleSettings = () => applyEditableIntegrations();
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
    document.addEventListener("click", handleClick);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "wakilon_page_ready", page_path: window.location.pathname });

    return () => {
      window.removeEventListener(SETTINGS_EVENT, handleSettings);
      window.removeEventListener("storage", handleSettings);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
