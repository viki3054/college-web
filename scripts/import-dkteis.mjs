import { PrismaClient } from "@prisma/client";
import sanitizeHtml from "sanitize-html";

const prisma = new PrismaClient();

function envBool(v) {
  return String(v || "").toLowerCase() === "true";
}

function decodeEntities(str) {
  return String(str || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#x60;/g, "`")
    .replace(/&#x3D;/g, "=");
}

function slugifyPath(pathname) {
  const p = String(pathname || "/")
    .trim()
    .toLowerCase()
    .replace(/\/+$/g, "")
    .replace(/^\/+/, "");
  if (!p) return "home";
  return p
    .split("/")
    .filter(Boolean)
    .join("-")
    .replace(/[^a-z0-9\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

function extractTitle(html) {
  const m = String(html || "").match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? decodeEntities(m[1]).replace(/\s+/g, " ").trim() : "Imported Page";
}

function extractMainHtml(html) {
  const s = String(html || "");
  const main = s.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (main) return main[1];
  const body = s.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return body ? body[1] : s;
}

function absolutizeUrl(raw, baseUrl) {
  const v = String(raw || "").trim();
  if (!v) return "";
  if (v.startsWith("mailto:") || v.startsWith("tel:")) return v;
  try {
    return new URL(v, baseUrl).toString();
  } catch {
    return v;
  }
}

function sanitizeAndRewriteHtml(html, baseUrl) {
  const cleaned = sanitizeHtml(String(html || ""), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      p: ["class"],
      div: ["class"],
      span: ["class"],
      h1: ["class"],
      h2: ["class"],
      h3: ["class"],
      h4: ["class"],
      h5: ["class"],
      h6: ["class"],
      ul: ["class"],
      ol: ["class"],
      li: ["class"],
      table: ["class"],
      thead: ["class"],
      tbody: ["class"],
      tr: ["class"],
      th: ["class"],
      td: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: (tagName, attribs) => {
        const href = absolutizeUrl(attribs.href, baseUrl);
        return {
          tagName,
          attribs: {
            ...attribs,
            href,
            target: "_blank",
            rel: "noreferrer",
          },
        };
      },
      img: (tagName, attribs) => {
        const src = absolutizeUrl(attribs.src, baseUrl);
        return {
          tagName,
          attribs: {
            ...attribs,
            src,
            loading: "lazy",
          },
        };
      },
    },
  });

  // Reduce excessive whitespace coming from theme wrappers
  return cleaned.replace(/\n{3,}/g, "\n\n").trim();
}

function htmlToText(html) {
  let s = String(html || "");
  s = s.replace(/<script[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, "");
  s = s.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  s = s.replace(/<br\s*\/?\s*>/gi, "\n");
  s = s.replace(/<\/p\s*>/gi, "\n\n");
  s = s.replace(/<\/h[1-6]\s*>/gi, "\n\n");
  s = s.replace(/<li\b[^>]*>/gi, "- ");
  s = s.replace(/<\/li\s*>/gi, "\n");
  s = s.replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
    const t = htmlToText(text).trim();
    const h = decodeEntities(href).trim();
    return t ? `${t} (${h})` : h;
  });
  s = s.replace(/<[^>]+>/g, " ");
  s = decodeEntities(s);
  s = s.replace(/\r/g, "");
  s = s.replace(/[\t\f\v]+/g, " ");
  s = s.replace(/\n{3,}/g, "\n\n");
  s = s.replace(/ +\n/g, "\n");
  s = s.replace(/\n +/g, "\n");
  return s.trim();
}

async function fetchText(url) {
  if (typeof fetch !== "function") {
    throw new Error("Global fetch() is not available. Please use Node.js 18+.");
  }
  const res = await fetch(url, {
    headers: {
      "User-Agent": "SmartSchoolImporter/1.0",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`Fetch failed ${res.status} for ${url}`);
  return res.text();
}

async function getSitemapUrls(sitemapUrl, { maxNested = 20 } = {}) {
  const xml = await fetchText(sitemapUrl);
  const locs = Array.from(xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)).map((m) => decodeEntities(m[1]).trim());
  const unique = [...new Set(locs)].filter(Boolean);

  const isIndex = /<sitemapindex\b/i.test(xml);
  if (!isIndex) return unique;

  // sitemap index: fetch nested sitemaps and extract URLs
  const nested = unique.slice(0, Math.max(0, maxNested));
  const out = new Set();
  for (const sm of nested) {
    try {
      const xml2 = await fetchText(sm);
      const locs2 = Array.from(xml2.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)).map((m) => decodeEntities(m[1]).trim());
      for (const u of locs2) out.add(u);
    } catch (e) {
      console.error("Failed nested sitemap:", sm, e?.message || e);
    }
  }
  return [...out].filter(Boolean);
}

function shouldSkipUrl(u, baseHost) {
  try {
    const url = new URL(u);
    if (baseHost && url.host !== baseHost) return true;
    const p = url.pathname || "/";
    if (p.startsWith("/wp-content/")) return true;
    if (p.startsWith("/wp-includes/")) return true;
    if (p.endsWith(".jpg") || p.endsWith(".png") || p.endsWith(".webp") || p.endsWith(".pdf")) return true;
    return false;
  } catch {
    return true;
  }
}

async function main() {
  const sitemapUrl = process.env.DKTEIS_SITEMAP_URL || "https://www.dkteis.com/sitemap.xml";
  const baseUrl = process.env.DKTEIS_BASE_URL || "https://www.dkteis.com";
  const baseHost = new URL(baseUrl).host;

  const maxPages = Number(process.env.DKTEIS_MAX_PAGES || 50);
  const delayMs = Number(process.env.DKTEIS_DELAY_MS || 200);
  const publish = envBool(process.env.DKTEIS_PUBLISH);
  const dryRun = envBool(process.env.DKTEIS_DRY_RUN);
  const slugPrefix = (process.env.DKTEIS_SLUG_PREFIX || "dkteis").trim().toLowerCase();
  const skipRoot = envBool(process.env.DKTEIS_SKIP_ROOT || "true");

  console.log("Importer settings:");
  console.log("- sitemap:", sitemapUrl);
  console.log("- base:", baseUrl);
  console.log("- maxPages:", maxPages);
  console.log("- delayMs:", delayMs);
  console.log("- slugPrefix:", slugPrefix);
  console.log("- publish:", publish);
  console.log("- dryRun:", dryRun);

  const urls = (await getSitemapUrls(sitemapUrl))
    .filter((u) => !shouldSkipUrl(u, baseHost))
    .slice(0, Math.max(0, maxPages));

  console.log(`Discovered ${urls.length} URLs from sitemap (after filtering).`);

  let ok = 0;
  let failed = 0;

  for (const u of urls) {
    try {
      const url = new URL(u);
      if (skipRoot && url.pathname === "/") {
        continue;
      }

      const pageSlugBase = slugifyPath(url.pathname);
      const slug = slugPrefix ? `${slugPrefix}-${pageSlugBase}` : pageSlugBase;

      const html = await fetchText(u);
      const title = extractTitle(html);
      const mainHtml = extractMainHtml(html);
      const contentHtml = sanitizeAndRewriteHtml(mainHtml, baseUrl);
      const content = htmlToText(contentHtml);

      if (!content) {
        console.log("SKIP (empty content):", u);
        continue;
      }

      if (dryRun) {
        console.log("DRY RUN upsert:", { slug, title, sourceUrl: u, chars: content.length, hasHtml: Boolean(contentHtml) });
      } else {
        await prisma.sitePage.upsert({
          where: { slug },
          create: {
            title,
            slug,
            content,
            contentHtml,
            isPublished: publish,
            sourceUrl: u,
          },
          update: {
            title,
            content,
            contentHtml,
            isPublished: publish,
            sourceUrl: u,
          },
        });
        console.log("IMPORTED:", u, "->", slug);
      }

      ok++;

      if (delayMs > 0) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    } catch (e) {
      failed++;
      console.error("FAILED:", u);
      console.error(e?.message || e);
    }
  }

  console.log(`Done. OK=${ok}, FAILED=${failed}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
