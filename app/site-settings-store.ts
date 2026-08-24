import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firebaseConfig, firebaseDatabaseId, firebaseDb } from "./firebase-client";
import { mergeSiteSettings, SiteSettings } from "./site-client";

const SETTINGS_DOCUMENT = doc(firebaseDb, "siteSettings", "public");
const IMAGE_FIELDS = ["faviconData", "socialImageData", "logoData", "heroImageData", "aboutImageData", "bannerImageData"] as const;
const FIRESTORE_ENDPOINT = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${firebaseDatabaseId}/documents/siteSettings/public?key=${firebaseConfig.apiKey}`;
const ASSETS_ENDPOINT = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${firebaseDatabaseId}/documents/siteAssets?pageSize=20&key=${firebaseConfig.apiKey}`;
const MAX_ASSET_CHARACTERS = 820_000;

type PublishStep = "checking" | "uploading" | "saving";

function settingsError(code: string, message: string) {
  const error = new Error(message) as Error & { code?: string };
  error.code = code;
  return error;
}

function withTimeout<T>(operation: Promise<T>, milliseconds: number, code: string) {
  return new Promise<T>((resolve, reject) => {
    const timer = window.setTimeout(() => reject(settingsError(code, "Operation timed out")), milliseconds);
    operation.then(
      (value) => { window.clearTimeout(timer); resolve(value); },
      (error) => { window.clearTimeout(timer); reject(error); },
    );
  });
}

function isInlineImage(value: string) {
  return value.startsWith("data:image/");
}

async function saveEditableImages(settings: SiteSettings) {
  const published = { ...settings };
  const persisted = { ...settings };

  await Promise.all(IMAGE_FIELDS.map(async (field) => {
    const value = settings[field];
    const assetDocument = doc(firebaseDb, "siteAssets", field);
    if (!value) {
      await withTimeout(deleteDoc(assetDocument), 12_000, "deadline-exceeded");
      persisted[field] = "";
      return;
    }
    if (!isInlineImage(value)) return;
    if (value.length > MAX_ASSET_CHARACTERS) throw settingsError("asset-too-large", "Image exceeds Firestore limit");
    const version = String(Date.now());
    await withTimeout(setDoc(assetDocument, {
      data: value,
      version,
      updatedAt: serverTimestamp(),
    }), 15_000, "deadline-exceeded");
    persisted[field] = "";
    if (field === "faviconData") {
      published.faviconVersion = version;
      persisted.faviconVersion = version;
    }
    if (field === "socialImageData") {
      published.socialImageVersion = version;
      persisted.socialImageVersion = version;
    }
  }));

  return { published, persisted };
}

async function checkFirestoreReady() {
  let response: Response;
  try {
    response = await fetch(FIRESTORE_ENDPOINT, { cache: "no-store", signal: AbortSignal.timeout(8_000) });
  } catch {
    throw settingsError("unavailable", "Firestore unavailable");
  }
  const payload = await response.text();
  if (response.status === 404 && /database .+ does not exist/i.test(payload)) {
    throw settingsError("failed-precondition", "Firestore database does not exist");
  }
  if (response.status === 403) throw settingsError("permission-denied", "Firestore permission denied");
  if (!response.ok && response.status !== 404) throw settingsError("unavailable", "Firestore unavailable");
}

export async function loadPublishedSiteSettings() {
  const [response, assetsResponse] = await Promise.all([
    fetch(FIRESTORE_ENDPOINT, { cache: "no-store", signal: AbortSignal.timeout(8_000) }),
    fetch(ASSETS_ENDPOINT, { cache: "no-store", signal: AbortSignal.timeout(8_000) }),
  ]);
  const responseText = await response.text();
  if (response.status === 404 && /database .+ does not exist/i.test(responseText)) {
    throw settingsError("failed-precondition", "Firestore database does not exist");
  }
  const assetsText = await assetsResponse.text();
  if (response.status === 404 && assetsResponse.status === 404) return null;
  if (!response.ok && response.status !== 404) {
    throw settingsError(response.status === 403 ? "permission-denied" : "unavailable", "Firestore read failed");
  }
  const payload = response.ok
    ? JSON.parse(responseText) as { fields?: Record<string, { stringValue?: string; booleanValue?: boolean }> }
    : { fields: {} };
  const values: Record<string, string | boolean> = {};
  Object.entries(payload.fields || {}).forEach(([key, field]) => {
    if (typeof field.stringValue === "string") values[key] = field.stringValue;
    if (typeof field.booleanValue === "boolean") values[key] = field.booleanValue;
  });
  if (assetsResponse.ok) {
    const assetsPayload = JSON.parse(assetsText) as { documents?: Array<{ name?: string; fields?: Record<string, { stringValue?: string }> }> };
    assetsPayload.documents?.forEach((asset) => {
      const key = asset.name?.split("/").pop();
      if (!key || !IMAGE_FIELDS.includes(key as (typeof IMAGE_FIELDS)[number])) return;
      const data = asset.fields?.data?.stringValue;
      if (data?.startsWith("data:image/") && data.length <= MAX_ASSET_CHARACTERS) values[key] = data;
      const version = asset.fields?.version?.stringValue;
      if (key === "faviconData" && version) values.faviconVersion = version;
      if (key === "socialImageData" && version) values.socialImageVersion = version;
    });
  }
  return mergeSiteSettings(values as Partial<SiteSettings>);
}

export async function publishSiteSettings(
  settings: SiteSettings,
  administratorOrStep?: string | ((step: PublishStep) => void),
  legacyStep?: (step: PublishStep) => void,
) {
  const onStep = typeof administratorOrStep === "function" ? administratorOrStep : legacyStep;
  onStep?.("checking");
  await checkFirestoreReady();
  onStep?.("uploading");
  const { published, persisted } = await saveEditableImages(settings);
  onStep?.("saving");
  await withTimeout(setDoc(SETTINGS_DOCUMENT, {
    ...persisted,
    updatedAt: serverTimestamp(),
  }), 15_000, "deadline-exceeded");
  return published;
}

export function firebaseSettingsError(error: unknown) {
  const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
  if (code.includes("permission-denied") || code.includes("unauthorized")) {
    return "O Firebase recusou a publicação. Confirme as regras do Firestore e a conta administradora.";
  }
  if (code.includes("failed-precondition")) {
    return "O banco Firestore ainda não foi criado no Firebase. Ative-o e tente publicar novamente.";
  }
  if (code.includes("asset-too-large")) return "A imagem ficou grande demais. Escolha outra imagem ou reduza a resolução.";
  if (code.includes("deadline-exceeded")) {
    return "A publicação demorou além do esperado e foi interrompida com segurança. Tente novamente.";
  }
  if (code.includes("unavailable")) return "O Firebase está temporariamente indisponível. Tente novamente em instantes.";
  return "Não foi possível publicar no Firebase. Verifique a configuração do projeto e tente novamente.";
}
