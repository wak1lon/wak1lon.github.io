import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firebaseConfig, firebaseDb, firebaseStorage } from "./firebase-client";
import { mergeSiteSettings, SiteSettings } from "./site-client";

const SETTINGS_DOCUMENT = doc(firebaseDb, "siteSettings", "public");
const IMAGE_FIELDS = ["faviconData", "logoData", "heroImageData", "aboutImageData", "bannerImageData"] as const;

function isInlineImage(value: string) {
  return value.startsWith("data:image/");
}

function extensionFromDataUrl(value: string) {
  const mime = value.slice(5, value.indexOf(";"));
  if (mime === "image/svg+xml") return "svg";
  if (mime === "image/png") return "png";
  if (mime === "image/x-icon" || mime === "image/vnd.microsoft.icon") return "ico";
  if (mime === "image/jpeg") return "jpg";
  return "webp";
}

async function uploadEditableImages(settings: SiteSettings) {
  const published = { ...settings };

  await Promise.all(IMAGE_FIELDS.map(async (field) => {
    const value = settings[field];
    if (!isInlineImage(value)) return;
    const objectRef = ref(firebaseStorage, `site-assets/${field}.${extensionFromDataUrl(value)}`);
    await uploadString(objectRef, value, "data_url", {
      cacheControl: "public,max-age=3600",
      customMetadata: { managedBy: "wakilon-site-panel" },
    });
    published[field] = await getDownloadURL(objectRef);
  }));

  return published;
}

export async function loadPublishedSiteSettings() {
  const endpoint = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/siteSettings/public?key=${firebaseConfig.apiKey}`;
  const response = await fetch(endpoint, { cache: "no-store" });
  if (response.status === 404) return null;
  if (!response.ok) {
    const error = new Error("Firestore read failed") as Error & { code?: string };
    error.code = response.status === 403 ? "permission-denied" : "unavailable";
    throw error;
  }
  const payload = await response.json() as { fields?: Record<string, { stringValue?: string; booleanValue?: boolean }> };
  const values: Record<string, string | boolean> = {};
  Object.entries(payload.fields || {}).forEach(([key, field]) => {
    if (typeof field.stringValue === "string") values[key] = field.stringValue;
    if (typeof field.booleanValue === "boolean") values[key] = field.booleanValue;
  });
  return mergeSiteSettings(values as Partial<SiteSettings>);
}

export async function publishSiteSettings(settings: SiteSettings, administratorEmail: string) {
  const published = await uploadEditableImages(settings);
  await setDoc(SETTINGS_DOCUMENT, {
    ...published,
    updatedAt: serverTimestamp(),
    updatedBy: administratorEmail,
  });
  return published;
}

export function firebaseSettingsError(error: unknown) {
  const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
  if (code.includes("permission-denied") || code.includes("unauthorized")) {
    return "O Firebase recusou a publicação. Confirme as regras do Firestore/Storage e a conta administradora.";
  }
  if (code.includes("failed-precondition")) {
    return "O banco Firestore ainda não foi criado no Firebase. Ative-o e tente publicar novamente.";
  }
  if (code.includes("storage/unknown") || code.includes("storage/retry-limit-exceeded")) {
    return "O envio da imagem não foi concluído. Verifique o Firebase Storage e tente novamente.";
  }
  if (code.includes("unavailable")) return "O Firebase está temporariamente indisponível. Tente novamente em instantes.";
  return "Não foi possível publicar no Firebase. Verifique a configuração do projeto e tente novamente.";
}
