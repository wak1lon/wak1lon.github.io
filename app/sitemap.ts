import type { MetadataRoute } from "next";
import { blogPosts } from "./blog/blog-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-23T00:00:00-05:00");

  return [
    { url: "https://wakilongestor.com.br/", lastModified, changeFrequency: "weekly", priority: 1 },
    { url: "https://wakilongestor.com.br/blog/", lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...blogPosts.map((post) => ({
      url: `https://wakilongestor.com.br/blog/${post.slug}/`,
      lastModified: new Date(`${post.updatedAt}T00:00:00-05:00`),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    { url: "https://wakilongestor.com.br/privacidade/", lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: "https://wakilongestor.com.br/termos/", lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
