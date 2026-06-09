"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SnowflakeSubNav from "./SnowflakeSubNav";

type SubPage = {
  title: string;
  href: string;
  description: string;
  tags: string[];
  badge?: string;
  badgeColor?: string;
};

const subPages: SubPage[] = [
  {
    title: "SPCS の基本（このページ）",
    href: "/training/snowflake",
    description:
      "Snowpark Container Services の概要・3 要素（Image Registry / Compute Pool / Service）・主なユースケース。",
    tags: ["spcs", "コンテナ", "kubernetes", "インフラ", "gpu"],
  },
  {
    title: "SnowflakeでRAGを構築する方法",
    href: "/training/snowflake/rag",
    description:
      "Cortex Search 中心・SPCS 自前・ハイブリッド・外部検索基盤連携の 4 パターンを比較。実装ステップと推奨アプローチ付き。",
    tags: ["rag", "cortex", "llm", "検索", "生成ai", "ベクトル"],
    badge: "NEW",
    badgeColor: "bg-amber-500",
  },
  {
    title: "Snowflake × ArcGIS 連携",
    href: "/training/snowflake-arcgis",
    description:
      "Snowflake と ArcGIS の接続方式・実装ステップ・注意点を整理。地理情報と業務データを統合するパターン。",
    tags: ["arcgis", "gis", "地理情報", "連携", "feature layer"],
  },
];

export default function SnowflakeTrainingPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return subPages;
    return subPages.filter((p) => {
      const hay = [p.title, p.description, ...p.tags].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/training"
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Snowflake 勉強会
      </h2>
      <SnowflakeSubNav />
      <p className="text-gray-600 text-sm mb-6">
        SPCS・RAG構築・ArcGIS連携など、Snowflake 関連テーマをまとめています。
      </p>

      {/* ---- Quick nav + search ---- */}
      <section className="mb-8 bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-semibold text-gray-700">
            このセクションのページ
          </span>
          <span className="text-xs text-gray-400 font-normal">
            — キーワードで絞り込めます
          </span>
        </div>

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="例: RAG, コンテナ, ArcGIS, ベクトル検索..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
        />

        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 py-2">
            一致するページが見つかりませんでした。
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {filtered.map((page) => (
              <Link key={page.href} href={page.href}>
                <div className="h-full rounded-xl border border-gray-200 bg-gray-50 hover:bg-indigo-50 hover:border-indigo-200 transition-colors p-4 cursor-pointer">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold text-gray-800 leading-5">
                      {page.title}
                    </span>
                    {page.badge && (
                      <span
                        className={`${page.badgeColor ?? "bg-indigo-500"} text-white text-xs font-bold px-2 py-0.5 rounded-full shrink-0`}
                      >
                        {page.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 leading-5 mb-3">
                    {page.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {page.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ---- SPCS main content ---- */}
      <div className="space-y-8">
        <section className="bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                <span>❄️</span>
                SPCS の基本
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                Snowpark Container Services は「データの近くでコンテナを動かす」仕組み
              </h3>
              <p className="text-slate-700 leading-7 max-w-4xl">
                SPCS（Snowpark Container Services）は、Snowflake が提供するフルマネージドな
                コンテナ実行環境です。Docker などでコンテナ化したアプリケーションを、
                Snowflake のセキュリティ境界内でそのまま動かせるため、データ基盤とアプリ基盤を
                ひとつの場所でつなげられます。
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur border border-sky-100 rounded-xl p-4 shadow-sm min-w-64">
              <div className="text-sm text-slate-500 mb-2">要点</div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>・Kubernetes 運用を Snowflake に任せられる</li>
                <li>・Web API / バックグラウンドジョブを常駐実行できる</li>
                <li>・GPU を使う AI/ML ワークロードも扱える</li>
                <li>・RBAC を含む Snowflake の統制を活かせる</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            1. SPCS の核心
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-2xl mb-3">📍</div>
              <h4 className="font-semibold text-gray-800 mb-2">データの近くで動く</h4>
              <p className="text-sm text-gray-600 leading-6">
                外部クラウドにデータを持ち出さず、Snowflake の内部でアプリを動かすため、
                セキュリティとネットワークの観点で扱いやすくなります。
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-2xl mb-3">🧩</div>
              <h4 className="font-semibold text-gray-800 mb-2">コンテナをそのまま載せる</h4>
              <p className="text-sm text-gray-600 leading-6">
                任意の言語、フレームワーク、ライブラリを含めたコンテナとして実行できるため、
                Snowpark 単体より自由度が高いのが特徴です。
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="text-2xl mb-3">🛡️</div>
              <h4 className="font-semibold text-gray-800 mb-2">統制を保ったまま拡張</h4>
              <p className="text-sm text-gray-600 leading-6">
                Snowflake の RBAC や監査の考え方をそのまま活かしながら、
                アプリケーションの実行基盤としても使えます。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            2. 主な特徴とメリット
          </h3>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">① インフラ管理が軽い</h4>
              <p className="text-sm text-gray-600 leading-6">
                Kubernetes などの複雑なオーケストレーションを自前で持たずに済みます。
                コンテナの配置やスケーリングを Snowflake 側に寄せられるため、
                運用負荷を抑えやすくなります。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">② 自由度が高い</h4>
              <p className="text-sm text-gray-600 leading-6">
                Snowpark の実行モデルに比べて制約が少なく、常駐 API サーバーやバックグラウンド処理、
                独自ライブラリを含む処理を載せやすいのが強みです。GPU を使う処理にも向いています。
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">③ セキュリティとガバナンスを保ちやすい</h4>
              <p className="text-sm text-gray-600 leading-6">
                データを Snowflake の外に出さずに処理できるため、転送リスクや管理コストを抑えられます。
                既存の権限制御も活かしやすく、社内利用のアプリに適しています。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            3. SPCS を構成する 3 つの要素
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-sky-200 bg-sky-50 p-5">
              <div className="text-2xl mb-3">🗂️</div>
              <h4 className="font-semibold text-gray-800 mb-2">Image Registry</h4>
              <p className="text-sm text-gray-700 leading-6">
                コンテナイメージを保管する場所です。Docker Hub や ECR の Snowflake 版のような役割を持ちます。
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="text-2xl mb-3">⚙️</div>
              <h4 className="font-semibold text-gray-800 mb-2">Compute Pool</h4>
              <p className="text-sm text-gray-700 leading-6">
                コンテナを動かすための計算資源のまとまりです。CPU / GPU の規模や台数をここで管理します。
              </p>
            </div>
            <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
              <div className="text-2xl mb-3">🚀</div>
              <h4 className="font-semibold text-gray-800 mb-2">Service / Job</h4>
              <p className="text-sm text-gray-700 leading-6">
                実際に起動する単位です。常駐させる Web API は Service、1 回だけ流すバッチ処理は Job です。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            4. 主なユースケース
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">LLM / 生成AIのホスティング</h4>
              <p className="text-sm text-gray-600 leading-6">
                Open Source の LLM や Embedding モデルを GPU 環境に載せ、社内データを使った RAG や AI エージェントを構築します。
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">Web アプリ・API サーバー</h4>
              <p className="text-sm text-gray-600 leading-6">
                Streamlit、Flask、FastAPI などで作った社内アプリを Snowflake 上でそのままホストできます。
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">複雑な ETL / 前処理</h4>
              <p className="text-sm text-gray-600 leading-6">
                SQL や標準 Python だけでは足りない画像・音声処理、ネイティブライブラリ依存の変換処理にも向いています。
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">まとめ</h3>
          <p className="text-slate-200 leading-7 mb-4 max-w-4xl">
            SPCS は「Snowflake の中でコンテナを動かす」ことで、データ基盤とアプリ実行基盤を近づけるための機能です。
            インフラの複雑さを抑えつつ、自由度の高いアプリや AI ワークロードを統制付きで運用できるのが大きな価値です。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-6">
            <div className="rounded-xl bg-white/10 px-4 py-3">・データの近くで動く</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・コンテナの自由度が高い</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・Snowflake の統制を保てる</div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/training/snowflake/rag"
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              RAG構築ページへ →
            </Link>
            <Link
              href="/training/snowflake-arcgis"
              className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              ArcGIS連携ページへ →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
