import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const endpoint = "https://firestore.googleapis.com/v1/projects/painel-site-wakilon-gestor/databases/painelwakilonsite/documents/siteAssets/socialImageData?key=AIzaSyAy1rhV1m5pMCRmigkJ1udLhWh4d313B2o";
const output = fileURLToPath(new URL("../public/og-share.jpg", import.meta.url));

try {
  const response = await fetch(endpoint, { signal: AbortSignal.timeout(8_000) });
  if (!response.ok) throw new Error(`Firestore respondeu ${response.status}`);
  const payload = await response.json();
  const dataUrl = payload?.fields?.data?.stringValue;
  const match = /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl || "");
  if (!match) throw new Error("Nenhuma imagem JPEG válida foi publicada pelo painel");
  const image = Buffer.from(match[1], "base64");
  if (!image.length || image.length > 700_000) throw new Error("Imagem fora do limite seguro");
  await writeFile(output, image);
  console.log("Imagem de compartilhamento sincronizada.");
} catch (error) {
  console.log(`Mantendo a imagem de compartilhamento padrão: ${error instanceof Error ? error.message : "indisponível"}.`);
}
