"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Topic = {
  title: string;
  href: string;
  category: string;
  summary: string;
  tags: string[];
};

const topics: Topic[] = [
  {
    title: "Snowflake / SPCS",
    href: "/training/snowflake",
    category: "Data Platform",
    summary: "SPCSの概要、特徴、ユースケースを解説。",
    tags: ["snowflake", "spcs", "container"],
  },
  {
    title: "SnowflakeでRAGを構築する方法",
    href: "/training/snowflake/rag",
    category: "AI / RAG",
    summary: "Cortex Search、SPCS自前、ハイブリッドなど方式比較。",
    tags: ["snowflake", "rag", "cortex", "llm"],
  },
  {
    title: "Snowflake × ArcGIS 連携",
    href: "/training/snowflake-arcgis",
    category: "Integration",
    summary: "SnowflakeとArcGISの接続方式と実装ステップ。",
    tags: ["snowflake", "arcgis", "integration", "gis"],
  },
  {
    title: "ArcGIS",
    href: "/training/arcgis",
    category: "GIS",
    summary: "ArcGIS OnlineとExperience Builderの基本。",
    tags: ["arcgis", "gis", "experience builder"],
  },
  {
    title: "AtScale",
    href: "/training/atscale",
    category: "Semantic Layer",
    summary: "セマンティクス機能、価格、構成要素、評価を整理。",
    tags: ["atscale", "semantic layer", "olap"],
  },
  {
    title: "Databricks",
    href: "/training/databricks",
    category: "Data Platform",
    summary: "コンポーネントとSnowflake比較を整理。",
    tags: ["databricks", "lakehouse", "comparison"],
  },
  {
    title: "セマンティックレイヤー",
    href: "/training/semantic-layer",
    category: "Semantic Layer",
    summary: "意味統一の考え方と導入効果を解説。",
    tags: ["semantic", "metric", "governance"],
  },
  {
    title: "GitHub",
    href: "/training/github",
    category: "Dev Productivity",
    summary: "Copilot、Actions、Agentic Workflow。",
    tags: ["github", "copilot", "actions"],
  },
  {
    title: "Copilot RAG",
    href: "/training/copilot-rag",
    category: "AI / RAG",
    summary: "GitHub / Azure / AWS で分けた Copilot から使うRAG構成を整理。",
    tags: ["copilot", "rag", "mcp", "azure", "aws"],
  },
  {
    title: "省庁提案",
    href: "/training/government-proposals",
    category: "Public Sector",
    summary: "中小企業庁を含む省庁の組織図と役割整理。",
    tags: ["government", "organization", "proposal"],
  },
  {
    title: "Claude Code モデル",
    href: "/training/claude-code/models",
    category: "AI / Dev",
    summary: "Opus 4.8・Fable 5 など Claude Code で使うモデルの比較と選び方。",
    tags: ["claude", "opus", "fable", "model"],
  },
  {
    title: "Claude Opus 4.8",
    href: "/training/claude-code/models/opus-4-8",
    category: "AI / Dev",
    summary: "Claude Code の主力モデル。Effort・Dynamic Workflows・料金。",
    tags: ["claude", "opus", "claude code"],
  },
  {
    title: "Claude Fable 5",
    href: "/training/claude-code/models/fable",
    category: "AI / Dev",
    summary: "最上位モデル。長時間自律作業とセーフガードの仕組み。",
    tags: ["claude", "fable", "mythos", "agent"],
  },
];

export default function TrainingCatalogPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = useMemo(() => {
    const set = new Set<string>(["ALL"]);
    topics.forEach((t) => set.add(t.category));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return topics.filter((t) => {
      const categoryMatch = activeCategory === "ALL" || t.category === activeCategory;
      if (!categoryMatch) return false;
      if (!q) return true;
      const haystack = [t.title, t.summary, t.category, ...t.tags].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [query, activeCategory]);

  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">勉強会テーマ検索</h2>
      <p className="text-gray-700 leading-7 mb-6">
        テーマが増えてもすぐ探せるように、キーワード検索とカテゴリ絞り込みで一覧表示します。
      </p>

      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-8">
        <label htmlFor="topic-search" className="block text-sm font-medium text-gray-700 mb-2">
          キーワード検索
        </label>
        <input
          id="topic-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="例: RAG, ArcGIS, 省庁, Snowflake"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  active ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold text-gray-800">検索結果</h3>
          <span className="text-sm text-gray-500">{filtered.length} 件</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((topic) => (
            <Link key={topic.href} href={topic.href}>
              <div className="h-full border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white">
                <div className="text-xs inline-block px-2 py-1 rounded bg-indigo-100 text-indigo-700 font-medium mb-3">
                  {topic.category}
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{topic.title}</h4>
                <p className="text-sm text-gray-600 leading-6 mb-3">{topic.summary}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {topic.tags.map((tag) => (
                    <span key={`${topic.href}-${tag}`} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="text-indigo-600 text-sm font-medium">ページを開く →</div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-6 border border-dashed border-gray-300 rounded-xl p-6 text-center text-sm text-gray-500">
            条件に一致するテーマが見つかりませんでした。キーワードやカテゴリを変更してください。
          </div>
        )}
      </section>
    </div>
  );
}
