import type { MetadataRoute } from "next";
import { company } from "@/lib/content";

const ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, freq: "monthly" },
  { path: "/manufacturing", priority: 0.9, freq: "monthly" },
  { path: "/products", priority: 0.9, freq: "monthly" },
  { path: "/development", priority: 0.8, freq: "monthly" },
  { path: "/quality", priority: 0.8, freq: "monthly" },
  { path: "/digital", priority: 0.7, freq: "monthly" },
  { path: "/awards", priority: 0.6, freq: "yearly" },
  { path: "/faq", priority: 0.7, freq: "monthly" },
  { path: "/careers", priority: 0.6, freq: "monthly" },
  { path: "/contact", priority: 0.8, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: `${company.domain}${r.path}`,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
