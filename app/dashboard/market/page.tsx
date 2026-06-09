"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type MarketArticle = {
  id: string;
  title: string;
  url: string;
  summary: string;
  source: string;
  publishedDate: string;
  fetchedAt: string;
  topic: string;
  starred: boolean;
};

type MarketData = {
  articles: MarketArticle[];
  lastUpdated: string | null;
  topics: string[];
};

const STARRED_KEY = "market_starred";

type PinnedArticle = {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedDate: string;
  imagePath: string;
  tag: string;
};

const PINNED_ARTICLES: PinnedArticle[] = [
  {
    id: "pinned-snowflake-summit-2026-platform",
    title: "ブレインパッドが現地から速報！Snowflake Summit 2026　AIのビジネス実装最前線：Platform Keynote",
    summary:
      "Day2 Platform Keynote 速報。CoWork（旧Intelligence）・CoCo（旧Cortex Code）へ改名、Cortex Sense で精度83%達成、Snowflake Runtime で React アプリをデータの真横で実行可能に。ガバナンスデモや Samsung SIA の事例も紹介。ブレインパッドによる現地レポート。",
    source: "brainpad.co.jp",
    url: "/dashboard/market/articles/snowflake-summit-2026-platform",
    publishedDate: "2026-06-03",
    imagePath: "",
    tag: "Snowflake Summit 2026",
  },
  {
    id: "pinned-snowflake-summit-2026-opening",
    title: "ブレインパッドが現地から速報！Snowflake Summit 2026　AIのビジネス実装最前線：Opening Keynote",
    summary:
      "米国サンフランシスコ開催の Snowflake Summit 2026 Day1 速報。CEO Sridhar Ramaswamy 氏・Anthropic Daniela Amodei 氏らが登壇し「Making AI Real for Business」をテーマに Agentic Control Plane、Natoma 買収（MCPゲートウェイ）、Sanofi のライブデモ、「信頼は加速装置」のメッセージが発表された。ブレインパッドによる現地レポート。",
    source: "brainpad.co.jp",
    url: "/dashboard/market/articles/snowflake-summit-2026-opening",
    publishedDate: "2026-06-02",
    imagePath: "",
    tag: "Snowflake Summit 2026",
  },
  {
    id: "pinned-fujitsu-anthropic-2026",
    title: "サイバー防衛が「属人化した職人技」から「人×AIの組織戦」に変わる号砲、富士通が鳴らした。",
    summary:
      "富士通 × Anthropic が戦略的パートナーシップを締結。全社員約10万人に Claude を展開し、1,000人規模のエンジニアチームを編成。FDE（Forward Deployed Engineer）モデルと Claude を組み合わせ、人×AI協業によるサイバー防衛の組織モデルを構築する取り組み。",
    source: "fujitsu.com",
    url: "/dashboard/market/articles/fujitsu-anthropic-2026",
    publishedDate: "2026-05-29",
    imagePath: "/images/fujitsu.png",
    tag: "富士通 × Anthropic",
  },
];

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function isJapaneseDomain(source: string): boolean {
  return (
    source.endsWith(".jp") ||
    /nikkei|nri|fujitsu|hitachi|nttdata|meti\.go|ipa\.go|itmedia|ascii|gigazine|codezine|mynavi|impress|atmarkit/.test(
      source
    )
  );
}

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return "1時間未満前";
  if (h < 24) return `${h}時間前`;
  return `${Math.floor(h / 24)}日前`;
}

export default function MarketPage() {
  const [data, setData] = useState<MarketData | null>(null);
  const [starred, setStarred] = useState<Record<string, boolean>>({});
  const [enabledTopics, setEnabledTopics] = useState<Set<string>>(new Set());
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load starred map from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STARRED_KEY);
      if (raw) setStarred(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  // Fetch static JSON
  useEffect(() => {
    fetch("/market-data.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<MarketData>;
      })
      .then((d) => {
        setData(d);
        setEnabledTopics(new Set(d.topics));
      })
      .catch((e) => setLoadError(String(e)));
  }, []);

  const toggleStar = (id: string) => {
    const next = { ...starred, [id]: !starred[id] };
    setStarred(next);
    localStorage.setItem(STARRED_KEY, JSON.stringify(next));
  };

  const toggleTopic = (topic: string) => {
    setEnabledTopics((prev) => {
      const next = new Set(prev);
      next.has(topic) ? next.delete(topic) : next.add(topic);
      return next;
    });
  };

  const isStale =
    data?.lastUpdated
      ? Date.now() - new Date(data.lastUpdated).getTime() > 4 * 3_600_000
      : false;

  const articles = (data?.articles ?? []).map((a) => ({
    ...a,
    starred: starred[a.id] ?? false,
  }));

  const displayed = articles.filter((a) => {
    if (!enabledTopics.has(a.topic)) return false;
    if (showStarredOnly && !a.starred) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">市場インテリジェンス</h1>
          <p className="text-sm text-gray-500 mt-1">AI業界・競合動向フィード（Google News RSS / 自動更新）</p>
        </div>
        <div className="flex items-center gap-3">
          {data?.lastUpdated && (
            <span className="text-sm text-gray-500">
              最終更新: {formatRelativeTime(data.lastUpdated)}
            </span>
          )}
          <a
            href="../../.github/workflows/market-fetch.yml"
            title="GitHub Actions で手動更新できます（リポジトリの Actions タブ → Market News Fetch → Run workflow）"
            className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs hover:bg-gray-200 transition-colors"
          >
            GitHub Actions で更新
          </a>
        </div>
      </div>

      {/* 古いデータ警告 */}
      {isStale && (
        <div className="mb-4 px-4 py-3 bg-yellow-50 border border-yellow-300 rounded-lg text-sm text-yellow-800">
          ⚠ 最終更新から4時間以上経過しています。GitHub Actions（Actions タブ → Market News Fetch → Run workflow）で手動更新できます。
        </div>
      )}

      {/* エラー */}
      {loadError && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-300 rounded-lg text-sm text-red-700">
          データ読み込みエラー: {loadError}
        </div>
      )}

      {/* ピックアップ記事 */}
      {PINNED_ARTICLES.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            📌 ピックアップ
          </h2>
          <div className="space-y-4">
            {PINNED_ARTICLES.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl border border-indigo-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex gap-0 flex-col md:flex-row">
                  {article.imagePath && (
                    <div className="md:w-72 flex-shrink-0 bg-gray-50 flex items-center justify-center overflow-hidden">
                      <Image
                        src={article.imagePath}
                        alt={article.title}
                        width={288}
                        height={400}
                        className="w-full h-auto object-contain"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex-1 p-5">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                        {article.tag}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(article.publishedDate).toLocaleDateString("ja-JP", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                        {article.source}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-800 leading-snug mb-3">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {article.summary}
                    </p>
                    <Link
                      href={article.url}
                      className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      記事を読む →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2カラムレイアウト */}
      <div className="flex gap-6">
        {/* 左：トピックフィルタ */}
        <aside className="w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">トピック</h2>
            {data === null ? (
              <div className="text-xs text-gray-400">読み込み中…</div>
            ) : (
              <ul className="space-y-2">
                {(data.topics ?? []).map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id={`topic-${topic}`}
                      checked={enabledTopics.has(topic)}
                      onChange={() => toggleTopic(topic)}
                      className="mt-0.5 w-4 h-4 text-indigo-600 rounded flex-shrink-0"
                    />
                    <label
                      htmlFor={`topic-${topic}`}
                      className="text-xs text-gray-700 cursor-pointer leading-snug break-words"
                    >
                      {topic}
                    </label>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => setShowStarredOnly(!showStarredOnly)}
                className={`w-full text-xs px-3 py-2 rounded-lg transition-colors ${
                  showStarredOnly
                    ? "bg-yellow-100 text-yellow-800 font-semibold"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                ⭐ ブックマークのみ
              </button>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400 leading-relaxed">
              データは GitHub Actions により6時間毎に自動更新。
              トピックの変更は{" "}
              <code className="bg-gray-100 px-1 rounded">scripts/fetch-market-news.mjs</code>{" "}
              を編集してください。
            </div>
          </div>
        </aside>

        {/* 右：フィード */}
        <div className="flex-1 min-w-0">
          {data === null && !loadError ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
              <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-4" />
              <p className="text-sm">データを読み込んでいます…</p>
            </div>
          ) : displayed.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400">
              <p className="text-4xl mb-4">{showStarredOnly ? "⭐" : "📰"}</p>
              <p className="text-sm font-medium text-gray-500">
                {showStarredOnly
                  ? "ブックマークした記事がありません"
                  : "記事がありません。GitHub Actions を実行してデータを取得してください。"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayed.map((article) => {
                const domain = article.source || getDomain(article.url);
                const isDomestic = isJapaneseDomain(domain);
                return (
                  <div
                    key={article.id}
                    className="bg-white rounded-xl border border-gray-200 p-4 hover:border-indigo-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className={`text-xs px-2 py-0.5 rounded font-medium ${
                              isDomestic
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {isDomestic ? "国内" : "海外"}
                          </span>
                          {article.publishedDate && (
                            <span className="text-xs text-gray-400">
                              {new Date(article.publishedDate).toLocaleDateString("ja-JP", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })}
                            </span>
                          )}
                          <span
                            className="text-xs text-gray-400 truncate max-w-[140px]"
                            title={article.topic}
                          >
                            [{article.topic.split(" ")[0]}…]
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-2 break-words">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                            {domain}
                          </span>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-indigo-600 hover:text-indigo-800 underline underline-offset-2"
                          >
                            リンクを開く ↗
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleStar(article.id)}
                        className="flex-shrink-0 text-xl leading-none hover:scale-110 transition-transform"
                        title={article.starred ? "ブックマーク解除" : "ブックマーク"}
                      >
                        {article.starred ? "⭐" : "☆"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
