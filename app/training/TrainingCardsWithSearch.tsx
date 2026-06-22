"use client";

import { useState } from "react";
import Link from "next/link";

type Card = {
  emoji: string;
  title: string;
  desc: string;
  href: string;
  border: string;
  bg: string;
  linkText: string;
  tags: string[];
  badge?: string;
};

const CARDS: Card[] = [
  {
    emoji: "❄️",
    title: "Snowflake / SPCS",
    desc: "構成図・SPCS・RAG・Cortex AI・Snowflake × ArcGIS 連携などを解説します。",
    href: "/training/snowflake",
    border: "border-sky-200",
    bg: "bg-sky-50/40",
    linkText: "text-sky-600",
    tags: ["Snowflake", "SPCS", "RAG", "Cortex", "クラウド"],
  },
  {
    emoji: "🗺️",
    title: "地理空間データ活用",
    desc: "Snowflake で地理空間データを格納・分析・可視化する方法。GEOGRAPHY 型・H3・ST_POINT などを解説。",
    href: "/training/snowflake/geospatial",
    border: "border-cyan-200",
    bg: "bg-cyan-50/40",
    linkText: "text-cyan-600",
    tags: ["Snowflake", "地理空間", "GeoJSON", "H3", "地図", "GEOGRAPHY"],
  },
  {
    emoji: "📍",
    title: "CARTOとは？",
    desc: "Snowflake ネイティブ連携の地理情報 BI プラットフォーム。H3 集計・ヒートマップ・商圏分析を GUI で実現できます。",
    href: "/training/snowflake/geospatial#carto-case",
    border: "border-emerald-200",
    bg: "bg-emerald-50/40",
    linkText: "text-emerald-600",
    tags: ["CARTO", "地理空間", "可視化", "BI", "Snowflake", "H3", "ヒートマップ"],
    badge: "NEW",
  },
  {
    emoji: "🧰",
    title: "GitHub",
    desc: "Copilot、Actions、Agentic Workflow、Copilot RAG（GitHub / Azure / AWS）など GitHub 関連の資料です。",
    href: "/training/github",
    border: "border-gray-200",
    bg: "bg-white",
    linkText: "text-indigo-600",
    tags: ["GitHub", "Copilot", "Actions", "CI/CD", "開発"],
  },
  {
    emoji: "📊",
    title: "セマンティックレイヤー",
    desc: "データの意味を統一し、分析や可視化を安定させる考え方をまとめています。",
    href: "/training/semantic-layer",
    border: "border-emerald-200",
    bg: "bg-emerald-50/40",
    linkText: "text-emerald-600",
    tags: ["セマンティック", "データ", "分析", "BI"],
  },
  {
    emoji: "🤖",
    title: "Claude Code",
    desc: "AI を使った開発の進め方や、プロンプト運用の資料をまとめています。",
    href: "/training/claude-code",
    border: "border-purple-200",
    bg: "bg-purple-50/40",
    linkText: "text-purple-600",
    tags: ["AI", "Claude", "プロンプト", "開発", "LLM"],
  },
  {
    emoji: "🗺️",
    title: "ArcGIS",
    desc: "ArcGIS Online・Enterprise・Pro の概要、Hosted Feature Layer、GIS データの取り込み手順を解説します。",
    href: "/training/arcgis",
    border: "border-cyan-200",
    bg: "bg-cyan-50/40",
    linkText: "text-cyan-600",
    tags: ["ArcGIS", "GIS", "地図", "Esri", "地理空間"],
  },
  {
    emoji: "🏛️",
    title: "省庁提案",
    desc: "中小企業庁など行政機関の組織図と役割を踏まえた提案整理資料です。",
    href: "/training/government-proposals",
    border: "border-amber-200",
    bg: "bg-amber-50/40",
    linkText: "text-amber-700",
    tags: ["省庁", "提案", "行政", "官公庁"],
  },
];

export default function TrainingCardsWithSearch() {
  const [query, setQuery] = useState("");

  const filtered =
    query.trim() === ""
      ? CARDS
      : CARDS.filter((c) => {
          const q = query.toLowerCase();
          return (
            c.title.toLowerCase().includes(q) ||
            c.desc.toLowerCase().includes(q) ||
            c.tags.some((t) => t.toLowerCase().includes(q))
          );
        });

  return (
    <div>
      {/* 検索バー */}
      <div className="mb-6 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none select-none">
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="キーワードで絞り込む（例: Snowflake、地図、AI、CARTO）"
          className="w-full border border-gray-300 rounded-xl pl-10 pr-10 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white shadow-sm"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="クリア"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm leading-none"
          >
            ✕
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-12">
          「{query}」に一致するページが見つかりませんでした。
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {filtered.map((card) => (
            <Link key={card.href} href={card.href}>
              <div
                className={`border ${card.border} rounded-lg p-5 hover:shadow-md transition-shadow cursor-pointer ${card.bg} h-full flex flex-col`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">{card.emoji}</span>
                  {card.badge && (
                    <span className="text-xs bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full">
                      {card.badge}
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{card.title}</h4>
                <p className="text-sm text-gray-600 flex-1">{card.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {card.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={`mt-3 ${card.linkText} text-sm font-medium`}>
                  資料を見る →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
