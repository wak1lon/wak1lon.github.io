import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-23T00:00:00-05:00");

  return [
    { url: "https://wakilongestor.com.br/", lastModified, changeFrequency: "weekly", priority: 1 },
    { url: "https://wakilongestor.com.br/privacidade/", lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: "https://wakilongestor.com.br/termos/", lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
