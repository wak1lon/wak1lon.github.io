import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firebaseConfig, firebaseDatabaseId, firebaseDb } from "./firebase-client";
import { mergeSiteSettings, SiteSettings } from "./site-client";

const SETTINGS_DOCUMENT = doc(firebaseDb, "siteSettings", "public");
const IMAGE_FIELDS = ["faviconData", "socialImageData", "logoData", "heroImageData", "aboutImageData", "bannerImageData"] as const;
const FIRESTORE_ENDPOINT = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${firebaseDatabaseId}/documents/siteSettings/public?key=${firebaseConfig.apiKey}`;
const MAX_ASSET_CHARACTERS = 820_000;

type ImageField = (typeof IMAGE_FIELDS)[number];
type PublishStep = "checking" | "uploading" | "saving";

type RestField = {
  stringValue?: string;
  booleanValue?: boolean;
};

type RestDocument = {
  fields?: Record<string, RestField>;
};

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

function assetEndpoint(field: ImageField) {
  return `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${firebaseDatabaseId}/documents/siteAssets/${field}?key=${firebaseConfig.apiKey}`;
}

async function readPublishedAsset(field: ImageField) {
  try {
    const response = await fetch(assetEndpoint(field), {
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
    if (response.status === 404) return null;
    if (!response.ok) return null;

    const payload = await response.json() as RestDocument;
    const data = payload.fields?.data?.stringValue;
    const version = payload.fields?.version?.stringValue;

    if (!data?.startsWith("data:image/") || data.length > MAX_ASSET_CHARACTERS) return null;
    return { field, data, version: version || "" };
  } catch {
    return null;
  }
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
    if (value.length > MAX_ASSET_CHARACTERS) {
      throw settingsError("asset-too-large", "Image exceeds Firestore limit");
    }

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
    response = await fetch(FIRESTORE_ENDPOINT, {
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
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
  let response: Response;
  try {
    response = await fetch(FIRESTORE_ENDPOINT, {
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw settingsError("unavailable", "Firestore read failed");
  }

  const responseText = await response.text();
  if (response.status === 404 && /database .+ does not exist/i.test(responseText)) {
    throw settingsError("failed-precondition", "Firestore database does not exist");
  }
  if (response.status === 404) return null;
  if (!response.ok) {
    throw settingsError(response.status === 403 ? "permission-denied" : "unavailable", "Firestore read failed");
  }

  const payload = JSON.parse(responseText) as RestDocument;
  const values: Record<string, string | boolean> = {};

  Object.entries(payload.fields || {}).forEach(([key, field]) => {
    if (typeof field.stringValue === "string") values[key] = field.stringValue;
    if (typeof field.booleanValue === "boolean") values[key] = field.booleanValue;
  });

  // Cada imagem é lida separadamente. Assim, uma imagem maior ou uma falha isolada
  // não impede o restante do site (inclusive a logomarca) de carregar.
  const assets = await Promise.all(IMAGE_FIELDS.map((field) => readPublishedAsset(field)));
  assets.forEach((asset) => {
    if (!asset) return;
    values[asset.field] = asset.data;
    if (asset.field === "faviconData" && asset.version) values.faviconVersion = asset.version;
    if (asset.field === "socialImageData" && asset.version) values.socialImageVersion = asset.version;
  });

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
