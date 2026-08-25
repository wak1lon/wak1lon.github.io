"use client";

import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { firebaseDb } from "./firebase-client";
import { SETTINGS_KEY } from "./site-client";
import { loadPublishedSiteSettings } from "./site-settings-store";

export default function SiteRealtimeSync() {
  useEffect(() => {
    let active = true;
    let syncing = false;
    let syncAgain = false;

    const applyPublishedSettings = async () => {
      if (syncing) {
        syncAgain = true;
        return;
      }

      syncing = true;
      try {
        do {
          syncAgain = false;
          try {
            const published = await loadPublishedSiteSettings();
            if (!active || !published) continue;

            const serialized = JSON.stringify(published);
            if (window.localStorage.getItem(SETTINGS_KEY) !== serialized) {
              window.localStorage.setItem(SETTINGS_KEY, serialized);
              // O SiteClient já escuta o evento storage. Disparamos o mesmo fluxo
              // também nesta aba para aplicar a publicação sem precisar recarregar.
              window.dispatchEvent(new Event("storage"));
            }
          } catch {
            // O SiteClient mantém o conteúdo local/padrão caso o Firebase esteja indisponível.
          }
        } while (active && syncAgain);
      } finally {
        syncing = false;
      }
    };

    const settingsDocument = doc(firebaseDb, "siteSettings", "public");
    const unsubscribe = onSnapshot(
      settingsDocument,
      () => { void applyPublishedSettings(); },
      () => {
        // A sincronização periódica existente no SiteClient continua como fallback.
      },
    );

    void applyPublishedSettings();

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return null;
}
