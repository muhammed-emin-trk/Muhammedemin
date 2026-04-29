import type { MetadataRoute } from "next";

const baseUrl = "https://www.muhammedeminturk.com.tr";

const routes = ["", "/hakkimda", "/projeler", "/blog", "/iletisim"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
