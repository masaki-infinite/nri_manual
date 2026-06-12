import Link from "next/link";

export default function SnowflakeDataPlatformPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">データ基盤としての Snowflake</h2>

      <div className="space-y-8">

        {/* Hero */}
        <section className="bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                <span>❄️</span>
                データ基盤の位置づけ
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                「データウェアハウス」ではなく「データ + AI の統合プラットフォーム」
              </h3>
              <p className="text-slate-700 leading-7 max-w-3xl">
                Snowflake はクラウドデータウェアハウスとして知られていますが、現在の位置づけは
                <strong>構造化データ・非構造化データ・AI ワークロード・アプリ実行基盤</strong>をひとつの
                プラットフォームで担う「統合データ基盤」です。ガバナンスを維持したまま、
                分析・生成 AI・エージェントを同じ場所で動かせる点が最大の特徴です。
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur border border-sky-100 rounded-xl p-4 shadow-sm min-w-56">
              <div className="text-sm text-slate-500 mb-2">一言で言うと</div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>・データを動かさずに AI を動かす</li>
                <li>・ガバナンスを崩さずに拡張する</li>
                <li>・分析と生成 AI を同じ基盤で使う</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 1. 進化の経緯 */}
        <section id="phases" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Snowflake の進化：3 つのフェーズ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                phase: "Phase 1",
                label: "クラウド DWH",
                period: "〜 2020",
                color: "border-gray-200 bg-white",
                headColor: "text-gray-500",
                items: [
                  "ストレージとコンピューティングの分離",
                  "マルチクラウド対応（AWS / Azure / GCP）",
                  "SQL ベースの高速クエリ",
                  "自動スケーリング・マルチクラスタ",
                ],
              },
              {
                phase: "Phase 2",
                label: "データクラウド",
                period: "2020 〜 2023",
                color: "border-sky-200 bg-sky-50",
                headColor: "text-sky-700",
                items: [
                  "Data Sharing・Marketplace による組織間連携",
                  "Snowpark（Python / Java / Scala でのデータ変換）",
                  "Streamlit for Snowflake（BI アプリ内包）",
                  "非構造化データ（PDF・画像）の管理",
                ],
              },
              {
                phase: "Phase 3",
                label: "AI データ基盤",
                period: "2024 〜 現在",
                color: "border-indigo-200 bg-indigo-50",
                headColor: "text-indigo-700",
                items: [
                  "Cortex AI（LLM・Embedding・Search）",
                  "SPCS（コンテナでカスタム AI を Snowflake 内で実行）",
                  "Snowflake Agents / CoWork",
                  "Natoma 買収 → MCP ゲートウェイ統合",
                ],
              },
            ].map((p) => (
              <div key={p.phase} className={`rounded-xl border ${p.color} p-5`}>
                <div className={`text-xs font-bold ${p.headColor} mb-1`}>{p.phase}</div>
                <div className="font-semibold text-gray-800 mb-1">{p.label}</div>
                <div className="text-xs text-gray-500 mb-3">{p.period}</div>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {p.items.map((item) => (
                    <li key={item}>・{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 2. 機能レイヤー */}
        <section id="layers" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. 機能レイヤー構成</h3>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  {["レイヤー", "主な機能", "NRI 案件での使い方"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-slate-800">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    layer: "ストレージ",
                    features: "構造化テーブル・半構造化（VARIANT）・非構造化ファイル（Stage）",
                    usecase: "仕様書 PDF・業務データ・GIS データの一元管理",
                  },
                  {
                    layer: "コンピューティング",
                    features: "仮想ウェアハウス（SQL）・Snowpark（Python）・SPCS（コンテナ）",
                    usecase: "dbt による変換・RAG API の SPCS ホスティング",
                  },
                  {
                    layer: "AI / Cortex",
                    features: "Cortex Search・LLM 関数（COMPLETE）・Embedding・Analyst",
                    usecase: "社内文書 RAG・質問応答・Snowflake Analyst での自然言語 SQL",
                  },
                  {
                    layer: "ガバナンス",
                    features: "RBAC・Dynamic Data Masking・行レベルセキュリティ・Query History",
                    usecase: "厳格な監査要件対応・部署別権限設計",
                  },
                  {
                    layer: "連携",
                    features: "Data Sharing・Marketplace・Native Apps・MCP ゲートウェイ（Natoma）",
                    usecase: "ArcGIS 連携・外部 SaaS へのエージェントアクセス制御",
                  },
                ].map((row, i) => (
                  <tr key={row.layer} className={`border-t border-gray-200 align-top ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{row.layer}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.features}</td>
                    <td className="px-4 py-3 text-slate-600 leading-6">{row.usecase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. 他基盤との比較 */}
        <section id="compare" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. 他基盤との位置づけ比較</h3>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  {["観点", "Snowflake", "Databricks", "Azure Synapse / Fabric", "BigQuery"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-slate-800">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["主な強み", "ガバナンス・共有・マルチクラウド", "ML/AI・OSS 親和性・Delta Lake", "Microsoft エコシステム統合", "Google エコシステム・大規模集計"],
                  ["AI 機能", "Cortex AI（LLM・Search・Agents）", "MLflow・Mosaic AI・DBRX", "Azure OpenAI 連携", "Gemini・Vertex AI 連携"],
                  ["コンテナ実行", "SPCS（Snowflake 内）", "Databricks Containers", "ACI / AKS 連携", "Cloud Run 連携"],
                  ["ガバナンス", "Snowflake 基盤で一元管理", "Unity Catalog", "Microsoft Purview", "BigQuery IAM"],
                  ["NRI での採用理由", "ガバナンス・監査・横展開", "ML 開発が主目的の案件", "M365 中心の案件", "GCP インフラの案件"],
                ].map((row, i) => (
                  <tr key={i} className={`border-t border-gray-200 align-top ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    {row.map((cell, j) => (
                      <td key={j} className={`px-4 py-3 leading-6 ${j === 0 ? "font-semibold text-slate-800 whitespace-nowrap" : j === 1 ? "text-sky-800" : "text-slate-600"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. なぜ Snowflake が「データ基盤」なのか */}
        <section id="why" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. Snowflake を「データ基盤」として採用する理由</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: "🔐",
                title: "ガバナンスが崩れない",
                body: "RBAC・監査ログ・Dynamic Data Masking がプラットフォーム標準として組み込まれており、アプリ側でセキュリティを再実装する必要がありません。厳格な監査要件を Snowflake 基盤で担保できます。",
              },
              {
                icon: "🤝",
                title: "データを動かさずに共有できる",
                body: "Data Sharing により、コピーを作らずにデータを別アカウント・別組織へ安全に公開できます。部門横断で同一データを参照する大規模組織案件に特に有効です。",
              },
              {
                icon: "🧠",
                title: "AI をデータの近くで動かせる",
                body: "Cortex AI・SPCS を使うことで LLM・Embedding・RAG をすべて Snowflake 内で完結できます。データを外部 AI サービスに送らずに処理できるため、機密データを扱う案件でも安心です。",
              },
              {
                icon: "📈",
                title: "スケールが線形でコントロールできる",
                body: "ウェアハウスのサイズ変更・マルチクラスタを SQL 一行で制御でき、コストと性能のバランスを案件ごとに調整できます。SPCS のコンピュートプールも同じ思想で管理します。",
              },
              {
                icon: "🔗",
                title: "エコシステムが広い",
                body: "dbt・ArcGIS・Tableau・Sigma・各種 BI ツールとの連携が標準化されており、NRI が手がける多様な案件の技術スタックに対応できます。",
              },
              {
                icon: "🌐",
                title: "マルチクラウドで vendor lock-in を避けられる",
                body: "AWS・Azure・GCP いずれでも同一の Snowflake 機能が使えます。顧客のクラウド方針に合わせて環境を選べるため、提案の幅が広がります。",
              },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-2">{card.title}</h4>
                <p className="text-sm text-gray-600 leading-6">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. NRI 案件での典型構成 */}
        <section id="patterns" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">5. NRI 案件での典型的な Snowflake 構成</h3>
          <div className="space-y-4">
            {[
              {
                label: "地理情報 × AI 連携案件（例）",
                color: "border-sky-200 bg-sky-50",
                layers: [
                  { role: "データ管理", desc: "仕様書 PDF・業務データを Snowflake に格納（GIS は Phase 1 は ArcGIS Pro）" },
                  { role: "GIS（任意）", desc: "Phase 2 で dbt の GIS mart を追加し ArcGIS へ同期可能" },
                  { role: "RAG 検索", desc: "Cortex Search で仕様書を検索し根拠付き回答を生成" },
                  { role: "フロント", desc: "Next.js + ArcGIS Maps SDK で地図ビューを提供" },
                ],
              },
              {
                label: "汎用 社内 RAG 基盤",
                color: "border-indigo-200 bg-indigo-50",
                layers: [
                  { role: "文書格納", desc: "PDF・会議録・仕様書を Snowflake Stage + テーブルで管理" },
                  { role: "インデックス", desc: "Cortex Search でチャンク埋め込み・検索インデックスを構築" },
                  { role: "API", desc: "SPCS に FastAPI を載せて RAG API をホスト" },
                  { role: "監査", desc: "Query History・アクセスログで全検索履歴を Snowflake に保存" },
                ],
              },
            ].map((pattern) => (
              <div key={pattern.label} className={`rounded-xl border ${pattern.color} p-5`}>
                <div className="font-semibold text-gray-800 mb-3">{pattern.label}</div>
                <div className="flex flex-wrap gap-2">
                  {pattern.layers.map((layer, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
                      <span className="font-medium text-slate-700">{layer.role}：</span>
                      <span className="text-slate-600">{layer.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* まとめ */}
        <section id="summary" className="scroll-mt-28 bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">まとめ</h3>
          <p className="text-slate-200 leading-7 mb-4 max-w-4xl">
            Snowflake は「速い DWH」から「ガバナンス付き AI データ基盤」へと進化しています。
            分析・生成 AI・エージェント・外部連携のすべてをひとつの基盤で担えるため、
            複数部局が横断的に使う行政案件や、監査要件の厳しい企業案件に特に強みを発揮します。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm mb-6">
            <div className="rounded-xl bg-white/10 px-4 py-3">・データを動かさずに AI を動かす</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・ガバナンスを行動レベルまで拡張</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・分析・生成 AI・エージェントを一元管理</div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/training/snowflake/mcp-gateway"
              className="inline-flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              MCP ゲートウェイ連携へ →
            </Link>
            <Link
              href="/training/snowflake/rag"
              className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              RAG 構築へ →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
