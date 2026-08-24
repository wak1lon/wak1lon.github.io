export const COOKIE_CONSENT_KEY = "wakilon-cookie-consent-v1";
export const COOKIE_CONSENT_EVENT = "wakilon:consent-updated";
export const OPEN_COOKIE_SETTINGS_EVENT = "wakilon:open-cookie-settings";

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  version: 1;
  updatedAt: string;
};

export function readCookiePreferences(): CookiePreferences | null {
  try {
    const saved = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!saved) return null;
    const value = JSON.parse(saved) as Partial<CookiePreferences>;
    if (value.version !== 1) return null;
    return {
      necessary: true,
      analytics: Boolean(value.analytics),
      marketing: Boolean(value.marketing),
      version: 1,
      updatedAt: typeof value.updatedAt === "string" ? value.updatedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function saveCookiePreferences(analytics: boolean, marketing: boolean) {
  const preferences: CookiePreferences = {
    necessary: true,
    analytics,
    marketing,
    version: 1,
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
  window.dispatchEvent(new CustomEvent<CookiePreferences>(COOKIE_CONSENT_EVENT, { detail: preferences }));
  return preferences;
}
