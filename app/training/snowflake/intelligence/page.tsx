import Link from "next/link";
import SnowflakeIntelligenceDiagram from "../SnowflakeIntelligenceDiagram";

export default function SnowflakeIntelligencePage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Snowflake Intelligence</h2>

      <p className="text-gray-600 text-sm mb-6 max-w-3xl leading-relaxed">
        Snowflake Intelligence は、<strong>ビジネスユーザー向けの会話型 AI アプリ</strong>（Snowsight 上）です。
        裏側では <span className="font-semibold">Cortex Agents</span> が自然言語を解釈し、
        Cortex Analyst・Cortex Search・カスタムツール・MCP コネクタを組み合わせて回答とアクションを返します。
        開発者向けの対になるのが{" "}
        <Link href="/training/snowflake/cortex-code" className="font-semibold text-cyan-700 hover:underline">
          Cortex Code（CoCo）
        </Link>
        です。
      </p>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span>✨</span>
            概要
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">
            「質問するだけ」でガバナンス付きのエージェント体験
          </h3>
          <p className="text-slate-700 leading-7 max-w-4xl mb-4">
            Snowflake Intelligence は、自前でオーケストレーションを書かなくても
            構造化・非構造化データに自然言語でアクセスできる<strong>すぐ使えるエージェント UI</strong>です。
            ユーザーが質問すると Cortex Agent API にルーティングされ、エージェントが適切なツールを選び、
            SQL 生成・文書検索・外部システム操作を実行して自然言語で結果を返します。
            アクセスは Snowflake の RBAC と監査ログの枠内に収まります。
          </p>
          <SnowflakeIntelligenceDiagram />
          <p className="text-xs text-violet-800/80 mt-3 bg-violet-100/60 border border-violet-200 rounded-lg px-3 py-2">
            命名メモ：Summit 2026 以降、ビジネス向け UI は <span className="font-semibold">CoWork</span>、
            開発者向けは <span className="font-semibold">CoCo</span>（旧 Cortex Code）としてブランドが拡張されています。
            ドキュメント上は引き続き Snowflake Intelligence / Cortex Code の表記も併用されます。
          </p>
        </section>

        <section id="agents" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Cortex Agents が担うこと</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "推論と計画",
                body: "ユーザーの依頼を分解し、どのツールをどの順で呼ぶかをエージェントが決定。自前の LangChain ループが不要。",
              },
              {
                title: "ツール統合",
                body: "Cortex Analyst（構造化）、Cortex Search（非構造化）、UDF/SP、MCP コネクタを 1 つのエージェント定義に束ねる。",
              },
              {
                title: "ガバナンス",
                body: "各ツールの実行は Snowflake 権限に従う。Query History・ACCESS_HISTORY で追跡可能。",
              },
              {
                title: "配信チャネル",
                body: "Snowflake Intelligence（Snowsight）に加え、REST API・MCP サーバー・CoWork / モバイル等から同じエージェントを利用可能。",
              },
            ].map((c) => (
              <div key={c.title} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">{c.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. 主な機能（2026 時点）</h3>
          <div className="space-y-3">
            {[
              {
                tag: "Deep Research",
                desc: "構造化・非構造化データを横断した深掘り分析。レポート形式の成果物を生成。",
              },
              {
                tag: "User Skills",
                desc: "役割・好みに応じたパーソナライズ。ユーザーごとに関連する洞察や操作を調整。",
              },
              {
                tag: "MCP 連携",
                desc: "Jira・Salesforce 等の外部 SaaS とエージェントが連携。Natoma 買収後の MCP ゲートウェイと接続。",
              },
              {
                tag: "Cortex Sense（文脈層）",
                desc: "ビジネス用語・セマンティック定義・運用知識をエージェントに渡し、回答精度と一貫性を向上。",
              },
              {
                tag: "Automations",
                desc: "定型的なワークフローをスケジュール実行。通知や定期レポートの自動化。",
              },
            ].map((f) => (
              <div
                key={f.tag}
                className="flex flex-col sm:flex-row sm:items-start gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
              >
                <span className="font-bold text-violet-700 text-sm shrink-0 sm:w-36">{f.tag}</span>
                <span className="text-sm text-slate-600 leading-relaxed">{f.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="stack" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. エージェント企業スタックでの位置づけ</h3>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden text-sm">
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  {["レイヤー", "代表プロダクト", "役割"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-slate-800">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    layer: "エンゲージメント",
                    product: "Snowflake Intelligence / CoWork",
                    role: "ビジネスユーザーが会話・ダッシュボード・Slack で利用",
                  },
                  {
                    layer: "ビルダー",
                    product: "Cortex Code / CoCo",
                    role: "開発者がエージェント・パイプライン・アプリを構築",
                  },
                  {
                    layer: "エージェント基盤",
                    product: "Cortex Agents",
                    role: "推論・ツール選択・マルチステップ実行のマネージドランタイム",
                  },
                  {
                    layer: "インテリジェンス",
                    product: "Horizon・Cortex Sense・Semantic View",
                    role: "メタデータ・ビジネス定義・文脈をエージェントに供給",
                  },
                  {
                    layer: "データ基盤",
                    product: "Tables・Stage・Iceberg・Streaming",
                    role: "訓練文書・業務データ・GIS mart などの実データ",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.layer}
                    className={`border-t border-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{row.layer}</td>
                    <td className="px-4 py-3 text-indigo-700 font-medium">{row.product}</td>
                    <td className="px-4 py-3 text-slate-600 leading-relaxed">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="comparison" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. 標準 UI とカスタムアプリの使い分け</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border-2 border-violet-300 bg-violet-50/50 rounded-xl p-5">
              <h4 className="font-bold text-violet-900 mb-2">Snowflake Intelligence をそのまま使う場合</h4>
              <ul className="text-sm text-slate-700 space-y-2 leading-relaxed">
                <li>・Snowsight 上で Cortex Search 等をツールにしたエージェントを公開</li>
                <li>・ビジネスユーザーは Snowflake UI でチャット（カスタム画面は不要）</li>
                <li>・迅速な PoC や社内ナレッジ検索に向く</li>
              </ul>
            </div>
            <div className="border-2 border-orange-300 bg-orange-50/50 rounded-xl p-5">
              <h4 className="font-bold text-orange-900 mb-2">カスタム BFF + 独自 UI を構築する場合</h4>
              <ul className="text-sm text-slate-700 space-y-2 leading-relaxed">
                <li>・Next.js + SPCS でブランド・画面遷移を自由に設計</li>
                <li>・同じ Cortex Search / COMPLETE を snowflake-sdk 経由で直接呼ぶ</li>
                <li>・地図・外部 SaaS・業務ワークフローを 1 画面に統合しやすい</li>
                <li>・エージェント REST API で Intelligence と併用も可能</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 leading-relaxed">
            Intelligence は「標準 UI + マネージドエージェント」、カスタム構成は「独自 UI + 同じ Cortex データ層」という関係です。
            検索索引（Cortex Search）と権限設計は共通で、画面とオーケストレーションの載せ方が異なります。
          </p>
        </section>

        <section id="links" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">5. 関連リンク（社内資料）</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/training/snowflake/cortex-code", label: "Cortex Code", desc: "開発者向けコーディングエージェント" },
              { href: "/training/snowflake/rag", label: "RAG 構築", desc: "Cortex Search + COMPLETE" },
              { href: "/training/snowflake/mcp-gateway", label: "MCP ゲートウェイ", desc: "外部ツール連携" },
              { href: "/training/snowflake/cortex", label: "Cortex AI", desc: "LLM・Search・Analyst" },
              { href: "/training/snowflake/adaptor", label: "Snowflake Adaptor", desc: "Next.js 接続層" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors px-4 py-3 min-w-[140px]"
              >
                <div className="font-semibold text-gray-800 text-sm">{l.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{l.desc}</div>
              </Link>
            ))}
          </div>
        </section>

        <section id="summary" className="scroll-mt-28 bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">まとめ</h3>
          <p className="text-slate-200 leading-7 mb-4 max-w-4xl">
            Snowflake Intelligence は、Cortex Agents をビジネスユーザー向けにパッケージした会話インターフェースです。
            構造化・非構造化データと外部 MCP を横断し、ガバナンス内でエージェント体験を提供します。
            標準 UI かカスタムアプリかは要件次第ですが、同じ Cortex 基盤を理解しておくと設計の選択肢が広がります。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-white/10 px-4 py-3">・Cortex Agents が中核</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・Analyst + Search + MCP</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・RBAC 内で安全に実行</div>
          </div>
        </section>
      </div>
    </div>
  );
}
