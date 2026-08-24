"use client";

import { OPEN_COOKIE_SETTINGS_EVENT } from "./cookie-consent-state";

export default function CookieSettingsButton({ className = "footer-cookie-button" }: { className?: string }) {
  return <button type="button" className={className} onClick={() => window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT))}>Preferências de cookies</button>;
}
