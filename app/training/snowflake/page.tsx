"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SnowflakeArchDiagram from "./SnowflakeArchDiagram";

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
    title: "Snowflake 構成図（このページ）",
    href: "/training/snowflake",
    description:
      "ウェアハウス・テーブル・ステージ・ストレージの関係図。コンピューティングとストレージの分離アーキテクチャを解説。",
    tags: ["構成図", "warehouse", "stage", "table", "ストレージ", "アーキテクチャ"],
    badge: "図",
    badgeColor: "bg-sky-600",
  },
  {
    title: "SPCS の基本",
    href: "/training/snowflake#spcs",
    description:
      "Snowpark Container Services の概要・3 要素・作成手順（Registry → Pool → Service）・エンドポイント利用・本番 OAuth 接続。",
    tags: ["spcs", "コンテナ", "kubernetes", "インフラ", "gpu", "create service", "compute pool"],
  },
  {
    title: "Snowflake Adaptor",
    href: "/training/snowflake/adaptor",
    description:
      "Next.js BFF と Snowflake をつなぐ snowflake-sdk 接続層。PAT / OAuth 認証切替・Connection Pool・API Route からの SQL 実行。",
    tags: ["adaptor", "snowflake-sdk", "bff", "oauth", "pat", "接続", "api route"],
    badge: "NEW",
    badgeColor: "bg-teal-600",
  },
  {
    title: "Snowflake Intelligence",
    href: "/training/snowflake/intelligence",
    description:
      "ビジネスユーザー向け会話型エージェント UI。Cortex Agents・Analyst・Search・MCP 連携とカスタム UI との比較。",
    tags: ["intelligence", "cowork", "cortex agents", "エージェント", "mcp", "deep research"],
    badge: "NEW",
    badgeColor: "bg-violet-600",
  },
  {
    title: "Cortex Code",
    href: "/training/snowflake/cortex-code",
    description:
      "開発者向けデータネイティブ AI コーディングエージェント。CLI・IDE・Snowsight から SQL・dbt・パイプライン・エージェントを構築。",
    tags: ["cortex code", "coco", "cli", "dbt", "データエンジニアリング", "agent sdk", "mcp"],
    badge: "NEW",
    badgeColor: "bg-cyan-600",
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
      "Phase 2 以降の任意拡張。Snowflake と ArcGIS の接続方式・実装ステップ・注意点を整理。",
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
      <p className="text-gray-600 text-sm mb-6">
        基本構成図・SPCS・Adaptor・Snowflake Intelligence・Cortex Code・RAG構築・ArcGIS連携など、Snowflake 関連テーマをまとめています。
      </p>

      {/* ---- Snowflake 基本構成図 ---- */}
      <section className="mb-8">
        <SnowflakeArchDiagram />
        <p className="text-xs text-gray-500 mt-3 leading-relaxed max-w-4xl">
          上図は Snowflake のコア構造です。SQL を投げるのはウェアハウス、定義を持つのは Database / Schema、
          実体のバイト列は下部の共有ストレージに置かれます。SPCS（コンテナ）は別レイヤーで、
          同じ Snowflake アカウント内からこれらのテーブル・Stage にアクセスします。
        </p>
        <div className="mt-4 rounded-xl border border-teal-200 bg-teal-50/60 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="text-sm text-teal-900">
            <span className="font-semibold">Next.js から接続するには</span>
            <span className="text-teal-800"> — snowflake-sdk による Snowflake Adaptor（BFF 専用）を参照</span>
          </div>
          <Link
            href="/training/snowflake/adaptor"
            className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-900 shrink-0"
          >
            Snowflake Adaptor へ →
          </Link>
        </div>
      </section>

      {/* ---- Quick nav + search ---- */}
      <section id="pages" className="scroll-mt-28 mb-8 bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
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
      <div id="spcs" className="space-y-8 scroll-mt-28">
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
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            4. SPCS を作成して利用する（基本手順）
          </h3>
          <p className="text-sm text-gray-600 leading-6 mb-4 max-w-4xl">
            概要の次は「実際にどう作るか」です。SPCS では
            <span className="font-semibold text-gray-800"> Image Registry → Compute Pool → Service </span>
            の順に用意し、コンテナを起動してエンドポイント URL から利用します。
            カスタム Next.js BFF も、この Service として常駐させる典型的なパターンです。
          </p>

          <div className="mb-5 rounded-xl border border-indigo-200 bg-indigo-50/60 p-5">
            <h4 className="font-semibold text-indigo-900 mb-3">よくある確認：UI 操作？ SQL？ ローカル IDE？</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-800 mb-1.5">Snowsight の UI だけで完結する？</p>
                <p className="text-gray-600 leading-6">
                  <span className="font-semibold text-gray-800">一部は UI でも可能</span>です（Compute Pool や Service の作成・状態確認など）。
                  ただし本ページでは <span className="font-semibold">SQL / Snowflake CLI を前提</span>に書いています。
                  理由は、Terraform や SQL ファイルで再現でき、他事業者への引継ぎや CI/CD に載せやすいためです。
                  運用監視は UI、定義の作成はコード、という分担が一般的です。
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1.5">ローカル IDE から PAT で作れる？</p>
                <p className="text-gray-600 leading-6">
                  <span className="font-semibold text-gray-800">はい、開発時はそれが基本</span>です。
                  ローカルの VS Code / Cursor から <span className="font-mono text-xs">snow sql</span> や snowsql で PAT 認証し、
                  <span className="font-mono text-xs">CREATE IMAGE REPOSITORY</span> などの SQL を実行します。
                  実体は <span className="font-semibold">Snowflake アカウント上に作られる</span>もので、ローカルに Pool や Service ができるわけではありません。
                  イメージの <span className="font-mono text-xs">docker build / push</span> だけローカル PC で行い、Registry へ送ります。
                </p>
              </div>
            </div>
            <table className="w-full text-xs mt-4 border border-indigo-100 rounded-lg overflow-hidden">
              <thead className="bg-indigo-100/80 text-indigo-900">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold">作業</th>
                  <th className="text-left px-3 py-2 font-semibold">どこで実行</th>
                  <th className="text-left px-3 py-2 font-semibold">認証</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700 divide-y divide-indigo-50">
                <tr>
                  <td className="px-3 py-2">Registry / Pool / Service の SQL</td>
                  <td className="px-3 py-2">ローカル IDE → Snowflake CLI（結果はクラウド上）</td>
                  <td className="px-3 py-2 font-mono">PAT / Key Pair</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">docker build / push</td>
                  <td className="px-3 py-2">ローカル PC のターミナル</td>
                  <td className="px-3 py-2 font-mono">snow spcs image-registry login（PAT）</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">状態確認・ログ閲覧</td>
                  <td className="px-3 py-2">Snowsight UI または <span className="font-mono">SHOW SERVICES</span> 等</td>
                  <td className="px-3 py-2">同上</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">本番コンテナ内アプリ → Snowflake</td>
                  <td className="px-3 py-2">SPCS 内（Service が起動したあと）</td>
                  <td className="px-3 py-2 font-mono">OAuth（/snowflake/session/token）※PAT 不要</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 横方向フロー */}
          <div className="overflow-x-auto mb-6 pb-1">
            <div className="flex items-stretch gap-1 min-w-[720px] text-xs">
              {[
                { n: "0", t: "権限・ロール", d: "GRANT", c: "bg-slate-100 border-slate-300" },
                { n: "1", t: "Image Registry", d: "イメージ保管", c: "bg-sky-50 border-sky-300" },
                { n: "2", t: "docker push", d: "ビルド&登録", c: "bg-sky-50 border-sky-300" },
                { n: "3", t: "Compute Pool", d: "CPU/GPU", c: "bg-emerald-50 border-emerald-300" },
                { n: "4", t: "Service", d: "常駐起動", c: "bg-violet-50 border-violet-300" },
                { n: "5", t: "Endpoint", d: "URLで利用", c: "bg-amber-50 border-amber-300" },
              ].map((s, i, arr) => (
                <div key={s.n} className="flex items-stretch flex-1">
                  <div className={`border rounded-lg p-2.5 flex-1 ${s.c}`}>
                    <div className="font-bold text-gray-800">{s.n}. {s.t}</div>
                    <div className="text-gray-600 mt-0.5">{s.d}</div>
                  </div>
                  {i < arr.length - 1 ? (
                    <span className="flex items-center px-1 text-slate-400 font-bold">→</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {/* Step 0 */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">Step 0. 前提（ロールと権限）</h4>
              <p className="text-sm text-gray-600 leading-6 mb-3">
                SPCS の作成には <span className="font-mono text-sm">CREATE COMPUTE POOL</span>、
                <span className="font-mono text-sm"> CREATE SERVICE</span>、
                <span className="font-mono text-sm"> CREATE IMAGE REPOSITORY</span> などの権限が必要です。
                開発時は PAT で接続し、運用ロール（例: <span className="font-mono">SPCS_ADMIN</span>）に必要な GRANT を付与します。
              </p>
              <pre className="bg-gray-900 text-green-300 rounded-lg p-4 text-xs leading-relaxed overflow-auto">{`-- 例: 運用ロールへ SPCS 関連権限を付与（アカウント管理者が実施）
GRANT CREATE COMPUTE POOL ON ACCOUNT TO ROLE SPCS_ADMIN;
GRANT CREATE SERVICE ON ACCOUNT TO ROLE SPCS_ADMIN;
GRANT CREATE IMAGE REPOSITORY ON SCHEMA my_db.my_schema TO ROLE SPCS_ADMIN;
GRANT USAGE ON INTEGRATION snowservices_ingress ON ACCOUNT TO ROLE SPCS_ADMIN;
GRANT BIND SERVICE ENDPOINT ON ACCOUNT TO ROLE SPCS_ADMIN;`}</pre>
            </div>

            {/* Step 1-2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">Step 1–2. Image Registry を作り、イメージを push する</h4>
              <p className="text-sm text-gray-600 leading-6 mb-3">
                Snowflake 内にコンテナイメージ用のレジストリを作成し、ローカルでビルドした Docker イメージを push します。
                ログインには <span className="font-mono">snow spcs image-registry login</span> または PAT を使います。
              </p>
              <pre className="bg-gray-900 text-green-300 rounded-lg p-4 text-xs leading-relaxed overflow-auto">{`-- 1) レジストリ作成
USE ROLE SPCS_ADMIN;
USE DATABASE MY_DB;
USE SCHEMA MY_SCHEMA;

CREATE IMAGE REPOSITORY IF NOT EXISTS my_app_repo;
SHOW IMAGE REPOSITORIES;
-- repository_url をメモ（例: org-account.registry.snowflakecomputing.com/my_db/my_schema/my_app_repo）

-- 2) ローカルでビルド & push
docker build -t my-nextjs-app:latest .
docker tag my-nextjs-app:latest <repository_url>/my-nextjs-app:latest
snow spcs image-registry login --database MY_DB --schema MY_SCHEMA --repository my_app_repo
docker push <repository_url>/my-nextjs-app:latest`}</pre>
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3">
                Next.js の場合は <span className="font-mono">output: standalone</span> でビルドし、
                本番用 Dockerfile で <span className="font-mono">node server.js</span> を起動する構成が一般的です。
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">Step 3. Compute Pool を作成する</h4>
              <p className="text-sm text-gray-600 leading-6 mb-3">
                コンテナを動かす計算リソースのプールです。Web アプリなら CPU 系、LLM 推論なら GPU 系を選びます。
                <span className="font-mono"> AUTO_SUSPEND_SECS</span> でアイドル時のコストを抑えられます。
              </p>
              <pre className="bg-gray-900 text-green-300 rounded-lg p-4 text-xs leading-relaxed overflow-auto">{`CREATE COMPUTE POOL IF NOT EXISTS my_web_pool
  MIN_NODES = 1
  MAX_NODES = 2
  INSTANCE_FAMILY = CPU_X64_S   -- Web/API 向け
  AUTO_RESUME = TRUE
  AUTO_SUSPEND_SECS = 3600
  COMMENT = 'Next.js BFF 用 compute pool';

SHOW COMPUTE POOLS;`}</pre>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">Step 4. Service を作成する（spec でコンテナ定義）</h4>
              <p className="text-sm text-gray-600 leading-6 mb-3">
                <span className="font-mono">CREATE SERVICE</span> でイメージ・ポート・環境変数・公開エンドポイントを宣言します。
                SPCS 内のコンテナから Snowflake へは OAuth トークン（<span className="font-mono">/snowflake/session/token</span>）で接続するため、
                PAT をコンテナに埋め込む必要はありません。
              </p>
              <pre className="bg-gray-900 text-green-300 rounded-lg p-4 text-xs leading-relaxed overflow-auto">{`CREATE SERVICE my_nextjs_service
  IN COMPUTE POOL my_web_pool
  FROM SPECIFICATION $$
spec:
  containers:
    - name: nextjs
      image: /my_db/my_schema/my_app_repo/my-nextjs-app:latest
      env:
        PORT: "3000"
        NODE_ENV: "production"
        SNOWFLAKE_HOST: "org-account.snowflakecomputing.com"
        SNOWFLAKE_DATABASE: "MY_APP_DB"
        SNOWFLAKE_SCHEMA: "APP"
      resources:
        requests:
          memory: 2Gi
          cpu: "1"
        limits:
          memory: 4Gi
          cpu: "2"
  endpoints:
    - name: web
      port: 3000
      public: true
$$
  MIN_INSTANCES = 1
  MAX_INSTANCES = 2
  AUTO_RESUME = TRUE;

-- 状態確認
SHOW SERVICES;
SELECT SYSTEM$GET_SERVICE_STATUS('my_nextjs_service');
SHOW ENDPOINTS IN SERVICE my_nextjs_service;`}</pre>
            </div>

            {/* Step 5 */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">Step 5. エンドポイントにアクセスして利用する</h4>
              <p className="text-sm text-gray-600 leading-6 mb-3">
                <span className="font-mono">SHOW ENDPOINTS IN SERVICE</span> で表示される URL にブラウザまたは curl でアクセスします。
                社内限定にする場合は <span className="font-mono">public: false</span> と Network Policy の組み合わせを検討します。
              </p>
              <pre className="bg-gray-900 text-green-300 rounded-lg p-4 text-xs leading-relaxed overflow-auto">{`-- エンドポイント URL を取得
SHOW ENDPOINTS IN SERVICE my_nextjs_service;
-- 例: https://xxxxx.snowflakecomputing.app/

curl -I https://xxxxx.snowflakecomputing.app/api/health

-- ログ確認
SELECT SYSTEM$GET_SERVICE_LOGS('my_nextjs_service', '0', 'nextjs', 100);

-- 停止・再開・削除
ALTER SERVICE my_nextjs_service SUSPEND;
ALTER SERVICE my_nextjs_service RESUME;
DROP SERVICE my_nextjs_service;`}</pre>
            </div>

            {/* App connection inside SPCS */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
              <h4 className="font-semibold text-indigo-900 mb-2">SPCS 内アプリから Snowflake へ接続する（本番認証）</h4>
              <p className="text-sm text-indigo-800/90 leading-6 mb-3">
                コンテナ内の Next.js（snowflake-sdk）は、注入される OAuth セッショントークンで Snowflake に接続します。
                開発時の PAT とは異なるため、<span className="font-mono">lib/db/client.ts</span> で環境に応じた認証切替を実装します。
              </p>
              <pre className="bg-gray-900 text-green-300 rounded-lg p-4 text-xs leading-relaxed overflow-auto">{`// SPCS 内: OAuth トークンを読む
import fs from 'fs';

function getSnowflakeToken() {
  if (process.env.SNOWFLAKE_HOST) {
    return fs.readFileSync('/snowflake/session/token', 'utf8');
  }
  return process.env.SNOWFLAKE_PAT; // ローカル開発
}

// snowflake-sdk
snowflake.createConnection({
  account: process.env.SNOWFLAKE_ACCOUNT,
  host: process.env.SNOWFLAKE_HOST,
  token: getSnowflakeToken(),
  authenticator: 'OAUTH',
  role: process.env.SNOWFLAKE_ROLE,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE,
  database: process.env.SNOWFLAKE_DATABASE,
  schema: process.env.SNOWFLAKE_SCHEMA,
});`}</pre>
            </div>

            {/* Job vs Service + checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">Service と Job の使い分け</h4>
                <ul className="text-sm text-gray-600 space-y-2 leading-6">
                  <li><span className="font-semibold text-gray-800">Service</span> — Web API・Next.js など常駐プロセス。エンドポイントを公開。</li>
                  <li><span className="font-semibold text-gray-800">Job</span> — バッチ変換・索引更新など一度きりの処理。終了したら課金停止。</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">よくあるつまずき</h4>
                <ul className="text-sm text-gray-600 space-y-2 leading-6">
                  <li>・イメージ URL の形式（<span className="font-mono">/DB/SCHEMA/repo/name:tag</span>）の誤り</li>
                  <li>・Compute Pool が SUSPENDED のまま Service を起動</li>
                  <li>・<span className="font-mono">snowservices_ingress</span> 権限不足で public endpoint が作れない</li>
                  <li>・コンテナ内で PAT を使おうとして本番認証と混同</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            5. 主なユースケース
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

        <section id="summary" className="scroll-mt-28 bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">まとめ</h3>
          <p className="text-slate-200 leading-7 mb-4 max-w-4xl">
            SPCS は「Snowflake の中でコンテナを動かす」ことで、データ基盤とアプリ実行基盤を近づけるための機能です。
            基本の作成フローは <span className="text-white font-semibold">Registry → push → Compute Pool → Service → Endpoint</span>。
            本番ではコンテナ内 OAuth で Snowflake に接続し、開発時の PAT とは切り分けます。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-6">
            <div className="rounded-xl bg-white/10 px-4 py-3">・データの近くで動く</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・Registry / Pool / Service で構築</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・Endpoint URL で利用開始</div>
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
