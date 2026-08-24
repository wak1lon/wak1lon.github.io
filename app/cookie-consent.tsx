"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  readCookiePreferences,
  saveCookiePreferences,
} from "./cookie-consent-state";

type ConsentView = "hidden" | "banner" | "preferences";

export default function CookieConsent() {
  const [view, setView] = useState<ConsentView>("hidden");
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (window.location.pathname.startsWith("/painel")) return;
    const hydrate = window.setTimeout(() => {
      const saved = readCookiePreferences();
      if (saved) {
        setAnalytics(saved.analytics);
        setMarketing(saved.marketing);
      } else {
        setView("banner");
      }
    }, 0);

    const openPreferences = () => {
      const current = readCookiePreferences();
      setAnalytics(Boolean(current?.analytics));
      setMarketing(Boolean(current?.marketing));
      setView("preferences");
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openPreferences);
    return () => {
      window.clearTimeout(hydrate);
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openPreferences);
    };
  }, []);

  function confirm(nextAnalytics: boolean, nextMarketing: boolean) {
    saveCookiePreferences(nextAnalytics, nextMarketing);
    setAnalytics(nextAnalytics);
    setMarketing(nextMarketing);
    setView("hidden");
  }

  if (view === "hidden") return null;

  return (
    <>
      {view === "banner" && (
        <section className="cookie-banner" role="dialog" aria-label="Preferências de privacidade" aria-live="polite">
          <div className="cookie-icon" aria-hidden="true"><span /><i /><i /><i /></div>
          <div className="cookie-copy">
            <span>PRIVACIDADE E CONTROLE</span>
            <h2>Você escolhe como seus dados são usados.</h2>
            <p>Usamos cookies necessários para o site funcionar. Com sua autorização, também usamos medição e publicidade para entender acessos e melhorar campanhas. <Link href="/privacidade">Ler Política de Privacidade</Link>.</p>
          </div>
          <div className="cookie-actions">
            <button type="button" className="cookie-accept" onClick={() => confirm(true, true)}>Aceitar todos</button>
            <button type="button" className="cookie-essential" onClick={() => confirm(false, false)}>Somente necessários</button>
            <button type="button" className="cookie-customize" onClick={() => setView("preferences")}>Personalizar</button>
          </div>
        </section>
      )}

      {view === "preferences" && (
        <div className="cookie-modal-backdrop" role="presentation">
          <section className="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">
            <button type="button" className="cookie-modal-close" aria-label="Fechar preferências" onClick={() => setView(readCookiePreferences() ? "hidden" : "banner")}>×</button>
            <span className="section-kicker">CENTRAL DE PRIVACIDADE</span>
            <h2 id="cookie-modal-title">Preferências de cookies</h2>
            <p>Altere sua escolha a qualquer momento. Cookies necessários permanecem ativos porque sustentam funções básicas e segurança.</p>
            <div className="cookie-options">
              <label>
                <span><b>Cookies necessários</b><small>Funcionamento, segurança e registro da sua preferência.</small></span>
                <input type="checkbox" checked disabled aria-label="Cookies necessários sempre ativos" />
                <i aria-hidden="true" />
              </label>
              <label>
                <span><b>Medição e analytics</b><small>Autoriza GA4 e GTM para medir navegação e conversões.</small></span>
                <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
                <i aria-hidden="true" />
              </label>
              <label>
                <span><b>Publicidade e Meta Pixel</b><small>Autoriza atribuição, públicos e medição de campanhas publicitárias.</small></span>
                <input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} />
                <i aria-hidden="true" />
              </label>
            </div>
            <div className="cookie-modal-actions">
              <button type="button" className="cookie-essential" onClick={() => confirm(false, false)}>Recusar opcionais</button>
              <button type="button" className="cookie-accept" onClick={() => confirm(analytics, marketing)}>Salvar preferências</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
