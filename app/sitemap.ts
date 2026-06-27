import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6,
    },
  ];
}
