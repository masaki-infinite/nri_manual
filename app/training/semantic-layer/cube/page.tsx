import Link from "next/link";

const features = [
  {
    icon: "🧩",
    title: "ヘッドレス BI セマンティックレイヤー",
    body: "BIツール・アプリ・API クライアントから同じメトリクス定義を参照できるミドルウェア。DWH の上に統一された「ビジネス語」の層を置くことで、ツールが増えてもKPIの定義が分散しない。",
  },
  {
    icon: "🔌",
    title: "多様な接続 API",
    body: "REST API・GraphQL API・SQL API（Postgres ワイヤプロトコル互換）の 3 種類をネイティブ提供。既存の BI ツール（Tableau・Looker・Metabase 等）や独自アプリから透過的に接続できる。",
  },
  {
    icon: "⚡",
    title: "Pre-aggregation（事前集計）",
    body: "クエリ結果を Redis や DWH にキャッシュ（事前集計テーブル）として保持し、繰り返し実行されるクエリを高速化。DWH のクエリコストを大幅削減できる。",
  },
  {
    icon: "📐",
    title: "データモデリング（Cube スキーマ）",
    body: "YAML または JavaScript でディメンション・メジャー・結合関係を定義。dbt のメトリクス定義とも統合可能。コードベースで管理できるためバージョン管理・レビューが容易。",
  },
  {
    icon: "🔒",
    title: "行レベルセキュリティ・マルチテナント",
    body: "コンテキスト変数（ユーザーロール・テナント ID 等）に基づき、クエリに WHERE 条件を自動付与。BI ツール側で個別にセキュリティ設定しなくても一元管理できる。",
  },
];

const comparison = [
  {
    item: "ポジション",
    cube: "OSS ヘッドレスBI / セマンティックレイヤー",
    atscale: "エンタープライズ向け仮想 OLAP セマンティックレイヤー",
    looker: "フルスタック BI（セマンティックレイヤー内包）",
  },
  {
    item: "料金",
    cube: "OSS 無料 / Cube Cloud は従量課金",
    atscale: "年間数万ドル〜（カスタム見積もり）",
    looker: "年間数百万円〜（Google Cloud 経由）",
  },
  {
    item: "モデリング言語",
    cube: "YAML / JavaScript（Cube スキーマ）",
    atscale: "GUI + Semantic Model（独自形式）",
    looker: "LookML（独自 DSL）",
  },
  {
    item: "API 提供",
    cube: "REST / GraphQL / SQL（3 種類）",
    atscale: "MDX / SQL",
    looker: "Looker API / SQL Runner",
  },
  {
    item: "キャッシュ・事前集計",
    cube: "Pre-aggregation（Redis / DWH）",
    atscale: "Aggregate awareness（自動）",
    looker: "PDT（Persistent Derived Tables）",
  },
  {
    item: "OSS",
    cube: "あり（Apache 2.0）",
    atscale: "なし",
    looker: "なし",
  },
  {
    item: "適した規模",
    cube: "スタートアップ〜中規模",
    atscale: "大規模エンタープライズ",
    looker: "中〜大規模",
  },
];

const architectureSteps = [
  { step: "1", label: "DWH", desc: "Snowflake / BigQuery / Redshift 等", color: "bg-blue-100 text-blue-800" },
  { step: "2", label: "Cube Core", desc: "スキーマ定義・事前集計・セキュリティ処理", color: "bg-indigo-100 text-indigo-800" },
  { step: "3", label: "API Layer", desc: "REST / GraphQL / SQL API でクライアントに提供", color: "bg-violet-100 text-violet-800" },
  { step: "4", label: "クライアント", desc: "Tableau / Metabase / 独自アプリ / AI エージェント", color: "bg-purple-100 text-purple-800" },
];

export default function CubePage() {
  return (
    <div className="space-y-8">
      <div>
        <Link href="/training/semantic-layer" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← セマンティックレイヤーに戻る
        </Link>
      </div>

      <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white rounded-xl p-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">🧊</span>
          <h2 className="text-3xl font-bold">Cube（Cube.dev）</h2>
        </div>
        <p className="text-violet-100 text-lg">
          OSS のヘッドレス BI セマンティックレイヤー — DWH の上にメトリクスの統一レイヤーを置く
        </p>
        <div className="flex gap-3 mt-4 flex-wrap">
          {["OSS（Apache 2.0）", "REST / GraphQL / SQL API", "Pre-aggregation", "Snowflake 対応"].map((t) => (
            <span key={t} className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">アーキテクチャの概念</h3>
        <div className="flex gap-2 items-center flex-wrap">
          {architectureSteps.map((s, i) => (
            <div key={s.step} className="flex items-center gap-2">
              <div className={`rounded-lg px-4 py-3 text-center min-w-[120px] ${s.color}`}>
                <div className="text-xs font-bold mb-0.5">Step {s.step}</div>
                <div className="font-bold text-sm">{s.label}</div>
                <div className="text-xs mt-0.5 opacity-80">{s.desc}</div>
              </div>
              {i < architectureSteps.length - 1 && <span className="text-gray-400 text-xl">→</span>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">主な機能</h3>
        <div className="grid grid-cols-1 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-white border border-gray-200 rounded-lg p-5 flex gap-4">
              <span className="text-3xl flex-shrink-0">{f.icon}</span>
              <div>
                <div className="font-semibold text-gray-800 mb-1">{f.title}</div>
                <div className="text-sm text-gray-600 leading-relaxed">{f.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Cube / AtScale / Looker 比較</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">項目</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Cube</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">AtScale</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">Looker</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={row.item} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-200 px-4 py-2 font-medium text-gray-700">{row.item}</td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-600">{row.cube}</td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-600">{row.atscale}</td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-600">{row.looker}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-violet-50 border border-violet-200 rounded-lg p-5">
        <h4 className="font-semibold text-violet-800 mb-2">💡 Cube を選ぶ場面</h4>
        <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
          <li>複数の BI ツールや内製アプリが同じメトリクスを参照する必要がある</li>
          <li>DWH のクエリコスト（Snowflake クレジット等）を削減したい</li>
          <li>行レベルセキュリティをツールをまたいで一元管理したい</li>
          <li>OSS で始めて必要になったら Cube Cloud（マネージドサービス）に移行したい</li>
          <li>AI エージェント・LLM アプリにメトリクス API を提供したい（MCP サーバーとしても動作可能）</li>
        </ul>
      </div>
    </div>
  );
}
