import type { MetadataRoute } from "next";
import { env } from "@/lib/config/env";
import { listarSlugsPublicados } from "@/lib/rct-blog.server";

const ROTAS_ESTATICAS = [
  "",
  "/caminho",
  "/blog",
  "/contribuir",
  "/privacidade",
  "/termos",
  "/cookies",
  "/seguranca",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.siteUrl.replace(/\/$/, "");
  const agora = new Date();

  let slugs: string[] = [];
  try {
    slugs = await listarSlugsPublicados();
  } catch {
    slugs = [];
  }

  const estaticas: MetadataRoute.Sitemap = ROTAS_ESTATICAS.map((path) => ({
    url: `${base}${path}`,
    lastModified: agora,
    changeFrequency: path === "" || path === "/blog" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/blog" ? 0.9 : 0.7,
  }));

  const artigos: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: agora,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...estaticas, ...artigos];
}
