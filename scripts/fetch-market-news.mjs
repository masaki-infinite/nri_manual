#!/usr/bin/env node
/**
 * Fetches Google News RSS for predefined topics and saves to public/market-data.json
 * No API key required. Designed to run via GitHub Actions on a schedule.
 *
 * Usage: node scripts/fetch-market-news.mjs
 */

import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, "..", "public", "market-data.json");

const TOPICS = [
  "日本SIer AI 富士通 日立 NTTデータ Anthropic",
  "OpenAI Claude Gemini 最新AIモデル",
  "日本AI政策 DX 経済産業省",
  "Snowflake Cortex データ基盤 AI",
];

const MAX_PER_TOPIC = 8;

function fetchUrl(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; market-news-fetcher/1.0)" } },
      (res) => {
        if (
          [301, 302, 303, 307, 308].includes(res.statusCode) &&
          maxRedirects > 0 &&
          res.headers.location
        ) {
          res.resume();
          return fetchUrl(res.headers.location, maxRedirects - 1)
            .then(resolve)
            .catch(reject);
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
      }
    );
    req.on("error", reject);
    req.setTimeout(15000, () => {
      req.destroy(new Error("Request timed out"));
    });
  });
}

function extractText(raw) {
  // strip CDATA if present
  const m = raw.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  return (m ? m[1] : raw).trim();
}

function stableId(url) {
  let h = 0;
  for (let i = 0; i < url.length; i++) {
    h = (Math.imul(31, h) + url.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

function getDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function parseRSS(xml, topic, fetchedAt) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[1];

    const rawTitle = block.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "";
    // Google News appends " - Source Name" to titles — strip it
    const title = extractText(rawTitle)
      .replace(/\s+-\s+[^-]+$/, "")
      .trim();

    const link = extractText(block.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? "");
    const pubRaw = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim() ?? "";
    const sourceName = extractText(
      block.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] ?? ""
    );

    if (!title || !link) continue;

    let publishedDate = fetchedAt;
    try {
      const d = new Date(pubRaw);
      if (!isNaN(d.getTime())) publishedDate = d.toISOString();
    } catch { /* ignore */ }

    const id = stableId(link);
    items.push({
      id,
      title,
      url: link,
      summary: "",
      source: sourceName || getDomain(link),
      publishedDate,
      fetchedAt,
      topic,
      starred: false,
    });

    if (items.length >= MAX_PER_TOPIC) break;
  }
  return items;
}

async function main() {
  console.log("=== Market News Fetch ===");

  // Load existing data to preserve starred status
  const starredIds = new Set();
  try {
    const existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf-8"));
    for (const a of existing.articles ?? []) {
      if (a.starred) starredIds.add(a.id);
    }
    console.log(`Loaded ${starredIds.size} starred articles from existing data`);
  } catch {
    console.log("No existing data (first run)");
  }

  const articleMap = new Map();
  const fetchedAt = new Date().toISOString();

  for (const topic of TOPICS) {
    const encoded = encodeURIComponent(topic);
    const url = `https://news.google.com/rss/search?q=${encoded}&hl=ja&gl=JP&ceid=JP:ja`;
    console.log(`\nFetching: "${topic.substring(0, 40)}..."`);
    try {
      const xml = await fetchUrl(url);
      const items = parseRSS(xml, topic, fetchedAt);
      let added = 0;
      for (const item of items) {
        if (!articleMap.has(item.id)) {
          item.starred = starredIds.has(item.id);
          articleMap.set(item.id, item);
          added++;
        }
      }
      console.log(`  -> ${added} new articles (${items.length} fetched)`);
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
  }

  const articles = Array.from(articleMap.values()).sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  const output = {
    articles,
    lastUpdated: fetchedAt,
    topics: TOPICS,
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), "utf-8");
  console.log(`\nDone: ${articles.length} articles saved to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
