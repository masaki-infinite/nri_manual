"use client";

import { useState } from "react";

// ──────────────────────────────────────────────────
// Architecture Diagram
// ──────────────────────────────────────────────────
function ArchDiagram() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-5 py-3">
        <h3 className="text-white font-bold text-sm tracking-wide">システム構成図（HVD アーキテクチャ）</h3>
      </div>

      <div className="p-5 space-y-2">
        {/* Layer: Users */}
        <div className="rounded-lg bg-sky-50 border border-sky-200 px-4 py-2.5 flex items-center gap-3">
          <span className="text-sky-600 font-bold text-xs w-28 flex-shrink-0">👤 ユーザー層</span>
          <div className="flex gap-2 flex-wrap">
            {["FDE（現場エンジニア）", "PdE（製品エンジニア）", "顧客ビジネスユーザー"].map((x) => (
              <span key={x} className="bg-sky-100 text-sky-800 text-xs px-2.5 py-1 rounded-full border border-sky-200">
                {x}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="text-center text-gray-400 text-lg leading-none">↕</div>

        {/* Layer: Dev Tools */}
        <div className="rounded-lg bg-violet-50 border border-violet-200 px-4 py-2.5">
          <div className="text-violet-700 font-bold text-xs mb-2">🛠️ 開発ツール層</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { name: "Claude Code CLI", sub: "55+ スキル / HVD フレームワーク" },
              { name: "dbt", sub: "ELT・モデル・テスト" },
              { name: "Terraform", sub: "IaC（DB/スキーマ/ロール）" },
              { name: "Next.js 16", sub: "shadcn/ui + Tailwind CSS" },
            ].map((t) => (
              <div key={t.name} className="bg-violet-100 border border-violet-200 rounded-lg px-3 py-2">
                <div className="font-semibold text-violet-800 text-xs">{t.name}</div>
                <div className="text-violet-600 text-xs mt-0.5 leading-tight">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="text-center text-gray-400 text-lg leading-none">↕</div>

        {/* Layer: Snowflake */}
        <div className="rounded-lg bg-indigo-50 border border-indigo-200 px-4 py-2.5">
          <div className="text-indigo-700 font-bold text-xs mb-2">❄️ Snowflake 層（SSOT データ基盤）</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { name: "Cortex Agent", sub: "AI 意思決定・LLM オーケストレーション", color: "bg-indigo-100 border-indigo-200 text-indigo-800" },
              { name: "Hybrid Table", sub: "アプリ書き込み SSOT（行ロック）", color: "bg-blue-100 border-blue-200 text-blue-800" },
              { name: "dbt Mart + SV", sub: "集計テーブル・Semantic View（AI Read）", color: "bg-cyan-100 border-cyan-200 text-cyan-800" },
              { name: "SPCS", sub: "Snowpark Container Services（Web ホスティング）", color: "bg-teal-100 border-teal-200 text-teal-800" },
            ].map((t) => (
              <div key={t.name} className={`${t.color} border rounded-lg px-3 py-2`}>
                <div className="font-semibold text-xs">{t.name}</div>
                <div className="text-xs mt-0.5 leading-tight opacity-80">{t.sub}</div>
              </div>
            ))}
          </div>
          {/* CQRS note */}
          <div className="mt-2 bg-white border border-indigo-100 rounded px-3 py-1.5 text-xs text-indigo-700">
            <span className="font-semibold">CQRS 三責務分離（ADR-0009）：</span>
            画面 Read = Kysely + zod　／　AI Read = Semantic View　／　Write = Action SP（CALL のみ）
          </div>
        </div>

        {/* Arrow */}
        <div className="text-center text-gray-400 text-lg leading-none">↕</div>

        {/* Layer: Data Sources */}
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-2.5 flex items-center gap-3">
          <span className="text-emerald-700 font-bold text-xs w-28 flex-shrink-0">📦 外部データ層</span>
          <div className="flex gap-2 flex-wrap">
            {["CSV / Excel", "Snowflake Stage", "SaaS（Notion / Salesforce）", "REST API"].map((x) => (
              <span key={x} className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full border border-emerald-200">
                {x}
              </span>
            ))}
          </div>
        </div>

        {/* data flow legend */}
        <div className="pt-2 flex flex-wrap gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-violet-200 border border-violet-300 inline-block" /> Claude Code が design.yaml を SSOT として生成・デプロイ</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-sky-200 border border-sky-300 inline-block" /> SPCS コンテナ上の Next.js を通じてブラウザに提供</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-200 border border-emerald-300 inline-block" /> raw → staging → mart → Semantic View のパイプライン</span>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────
// R1-R6 Pipeline Diagram
// ──────────────────────────────────────────────────
const PHASES = [
  {
    id: "R1",
    label: "R1",
    title: "要件 & AI 戦略",
    gate: "G-R1：Business Go",
    dri: "PM",
    reviewer: "Architect",
    color: "bg-rose-50 border-rose-200",
    headerColor: "bg-rose-500",
    gateColor: "bg-rose-100 text-rose-700 border-rose-300",
    description: "プロジェクトの「何を作るか・なぜ作るか」を言語化し、AI 活用戦略と要件を design.yaml に書き込む。この段階で目的がズレると後工程すべてに影響するため、PM が Business Go を判定するまで次に進めない。",
    agentActions: [
      { agent: "PM 🎯", actions: ["md-scope を起動してプロジェクト名・目的・ペルソナをヒアリング", "顧客課題と KPI を明確化して decision_flow に落とし込む", "G-R1 ゲートで「事業価値があるか」を判定し Go/No-Go を決定"] },
      { agent: "Architect 🏗️", actions: ["AI 投資テーマ・活用パターン（Cortex Agent / Analyst）を提案", "md-datasource でデータソースの実在性・接続可否を確認", "セキュリティリスク分類（R1〜R7）を design.yaml#ai_strategy に記録"] },
    ],
    activities: ["md-scope", "md-datasource", "md-requirements"],
    outputs: ["design.yaml#{purpose, personas, decision_flow, ai_strategy, requirements, datasources}"],
  },
  {
    id: "R2",
    label: "R2",
    title: "ワイヤーフレーム設計",
    gate: "G-R2：Wireframe OK",
    dri: "Designer",
    reviewer: "Architect",
    color: "bg-orange-50 border-orange-200",
    headerColor: "bg-orange-500",
    gateColor: "bg-orange-100 text-orange-700 border-orange-300",
    description: "「何を画面に表示するか・ユーザーがどう操作するか」を HTML ワイヤーフレームとして可視化する。Designer が主導し、コードを書く前に画面の全体像を顧客と合意する。承認なしに実装フェーズへ進むことは禁止。",
    agentActions: [
      { agent: "Designer 🎨", actions: [
        "md-features で機能一覧・優先度・ユーザーストーリーを design.yaml に書き込む",
        "md-analysis でデータの集計軸・フィルタ・KPI 指標を定義する",
        "md-scenarios でユーザーの操作シナリオ（ハッピーパス・エラーパス）を列挙する",
        "md-branding でカラーパレット・フォント・コンポーネントトーンを決定する",
        "md-wireframe で各画面のレイアウトを HTML ファイルとして自動生成する（html/<画面名>.html）",
        "生成した HTML を顧客に見せて「この画面で合ってますか？」を確認する",
      ]},
      { agent: "Architect 🏗️", actions: ["ワイヤーフレームの画面数・複雑度が技術的に実現可能か審査", "design.yaml の features セクションと要件（R1成果物）の整合性を確認", "G-R2 ゲートで「実装前に画面設計として完成しているか」を判定"] },
    ],
    activities: ["md-features", "md-analysis", "md-scenarios", "md-branding", "md-wireframe"],
    outputs: ["design.yaml#{features, analysis, scenarios, branding}", "html/<screen>.html（ワイヤーフレーム）"],
  },
  {
    id: "R3",
    label: "R3",
    title: "モック UI 生成",
    gate: "G-R3：Mock UX OK",
    dri: "Architect",
    reviewer: "Designer",
    color: "bg-amber-50 border-amber-200",
    headerColor: "bg-amber-500",
    gateColor: "bg-amber-100 text-amber-700 border-amber-300",
    description: "R2 のワイヤーフレームを Next.js のモックコンポーネントに自動変換する。データはすべてダミーで、実際の Snowflake には接続しない。顧客が「動くもの」として触れる最初のマイルストーン。",
    agentActions: [
      { agent: "Architect 🏗️", actions: ["md-ui で UI コンポーネント仕様（テーブル列・グラフ種別・フィルタ）を design.yaml に書き込む", "md-capabilities で Cortex Agent のツール定義・API エンドポイント設計を確定する", "vc-ui-mock でワイヤーフレームから Next.js ページコンポーネントを自動生成する", "vc-ui-smoke でモック画面が表示エラーなしに動作するか自動検証する"] },
      { agent: "Designer 🎨", actions: ["生成されたモック画面がブランディング・UX 観点で R2 の意図通りか確認", "G-R3 ゲートで「顧客に見せられる品質か」を審査・承認"] },
    ],
    activities: ["md-ui", "md-capabilities", "vc-ui-mock", "vc-ui-smoke"],
    outputs: ["design.yaml#{ui, capabilities}", "web/app/**/page.tsx（モック）"],
  },
  {
    id: "R4",
    label: "R4",
    title: "データモデル設計",
    gate: "G-R4：Data Model OK",
    dri: "Architect",
    reviewer: "Reviewer",
    color: "bg-yellow-50 border-yellow-200",
    headerColor: "bg-yellow-500",
    gateColor: "bg-yellow-100 text-yellow-700 border-yellow-300",
    description: "Snowflake 上のテーブル・dbt モデル・ELT パイプラインの設計を確定する。ここでスキーマを決めると R5 の実装コストが大幅に下がる。設計変更は ADR として記録し追跡可能にする。",
    agentActions: [
      { agent: "Architect 🏗️", actions: ["md-data でエンティティ・テーブル・カラム定義を design.yaml#data_models に書き込む", "md-architecture で Snowflake Database / Schema / Warehouse の構成を確定する", "md-elt でデータソースから Snowflake への取り込みパイプラインを設計する", "重要な設計判断は adr/ に ADR として記録する"] },
      { agent: "Reviewer 🔍", actions: ["固定費オブジェクト（Cortex Search 等）が含まれていないか審査（ADR-0014 準拠）", "Secure View の RBAC 設計が要件を満たすか確認", "hvd-verify-r4 で design.yaml の整合性を自動チェック", "G-R4 ゲートで「このデータモデルで実装に進んで問題ないか」を拒否権付きで審査"] },
    ],
    activities: ["md-data", "md-architecture", "md-elt", "hvd-verify-r4"],
    outputs: ["design.yaml#{data_models, elt, architecture}", "adr/"],
  },
  {
    id: "R5",
    label: "R5",
    title: "本番 UI 実装",
    gate: "G-R5：E2E OK",
    dri: "Worker",
    reviewer: "Reviewer",
    color: "bg-teal-50 border-teal-200",
    headerColor: "bg-teal-600",
    gateColor: "bg-teal-100 text-teal-700 border-teal-300",
    description: "design.yaml の定義に従って Terraform・dbt・Stored Procedure・Next.js を自動生成し、Snowflake に実際にデプロイする。Worker が実装を担い、E2E シナリオテストを全件パスするまで R6 に進めない。",
    agentActions: [
      { agent: "Worker ⚙️", actions: ["iac-project-base で Terraform の Database / Schema / Warehouse を apply する", "sf-dbt-project で dbt プロジェクトを初期化し、Staging / Mart モデルを生成する", "sf-deploy-backend で Stored Procedure・Cortex Agent ツール関数を Snowflake にデプロイする", "vc-ui-build でモック UI をリアル API 接続の本番コンポーネントに置き換える", "sf-e2e-scenario で design.yaml#scenarios のシナリオをテストコードに変換して実行する"] },
      { agent: "Reviewer 🔍", actions: ["E2E テスト全件 PASS を確認してから G-R5 ゲートを承認", "FinOps 観点でコスト設計が ADR-0014 に違反していないか確認"] },
    ],
    activities: ["iac-project-base", "sf-dbt-project", "sf-deploy-backend", "vc-ui-build", "sf-e2e-scenario"],
    outputs: ["iac/base/**.tf", "dbt/**", "web/lib/{db,actions}/**", "python tests/_smoke_test.py"],
  },
  {
    id: "R6",
    label: "R6",
    title: "ガバナンス & SPCS",
    gate: "G-R6：Operations Go",
    dri: "Reviewer",
    reviewer: "PM",
    color: "bg-purple-50 border-purple-200",
    headerColor: "bg-purple-600",
    gateColor: "bg-purple-100 text-purple-700 border-purple-300",
    description: "RBAC・Secure View・監査ログなどのガバナンスを Terraform で適用し、Snowpark Container Services（SPCS）に本番デプロイする。Operations Go が出て初めて顧客環境への引き渡しが完了。",
    agentActions: [
      { agent: "Reviewer 🔍", actions: ["md-gov-roles で RBAC ロール定義（誰が何を見られるか）を確定する", "md-gov-policy でデータアクセスポリシー・監査要件を design.yaml に書き込む", "iac-project-governance で Secure View・ロール・ポリシーを Terraform apply する", "sf-gov-verify でガバナンス設定が要件通りに適用されているか自動検証する"] },
      { agent: "Worker ⚙️", actions: ["vc-spcs-deploy で Next.js アプリを SPCS コンテナとしてビルド・デプロイする", "doc/runbook に運用手順・障害対応フローを自動生成する"] },
      { agent: "PM 🎯", actions: ["G-R6 ゲートで「顧客に納品できる状態か」を最終判定する", "Operations Go を出してプロジェクト完了とする"] },
    ],
    activities: ["md-gov-roles", "md-gov-policy", "iac-project-governance", "vc-spcs-deploy", "sf-gov-verify"],
    outputs: ["iac/governance/**.tf", "SPCS サービス稼働", "doc/runbook/**"],
  },
];

function PipelineDiagram() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 px-5 py-3">
        <h3 className="text-white font-bold text-sm tracking-wide">R1-R6 開発パイプライン（12 ステップ × 6 品質ゲート）</h3>
        <p className="text-indigo-200 text-xs mt-0.5">各フェーズをクリックすると詳細を展開します</p>
      </div>

      {/* Phase flow */}
      <div className="p-4">
        <div className="flex items-start gap-0 overflow-x-auto pb-2">
          {PHASES.map((phase, idx) => (
            <div key={phase.id} className="flex items-start flex-shrink-0">
              {/* Phase card */}
              <div className="w-36">
                <button
                  onClick={() => setOpen(open === phase.id ? null : phase.id)}
                  className={`w-full text-left rounded-lg border-2 overflow-hidden transition-all hover:shadow-md ${phase.color} ${open === phase.id ? "ring-2 ring-offset-1 ring-indigo-400" : ""}`}
                >
                  <div className={`${phase.headerColor} text-white px-3 py-1.5 flex items-center justify-between`}>
                    <span className="font-bold text-sm">{phase.label}</span>
                    <span className="text-xs opacity-80">{open === phase.id ? "▲" : "▼"}</span>
                  </div>
                  <div className="px-2.5 py-2">
                    <div className="text-xs font-semibold text-gray-800 leading-tight">{phase.title}</div>
                    <div className="mt-1.5 text-xs text-gray-500">DRI: <span className="font-medium text-gray-700">{phase.dri}</span></div>
                  </div>
                </button>
                {/* Gate badge */}
                <div className={`mt-1 mx-0.5 text-center text-xs px-1 py-0.5 rounded border ${phase.gateColor} font-medium leading-tight`}>
                  {phase.gate}
                </div>
              </div>

              {/* Arrow between phases */}
              {idx < PHASES.length - 1 && (
                <div className="flex items-center mt-5 px-1 text-gray-400 font-bold text-lg flex-shrink-0">→</div>
              )}
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {open && (() => {
          const phase = PHASES.find((p) => p.id === open)!;
          return (
            <div className={`mt-3 rounded-xl border-2 ${phase.color} overflow-hidden`}>
              {/* Header */}
              <div className={`${phase.headerColor} text-white px-4 py-3 flex items-center gap-3`}>
                <span className="font-bold text-sm">{phase.label}: {phase.title}</span>
                <span className="text-xs opacity-80 bg-white/20 px-2 py-0.5 rounded-full">DRI: {phase.dri}</span>
                <span className="text-xs opacity-80 bg-white/20 px-2 py-0.5 rounded-full">Reviewer: {phase.reviewer}</span>
              </div>

              <div className="p-4 flex flex-col gap-4">
                {/* フェーズ概要 */}
                <p className="text-xs text-gray-700 leading-relaxed border-l-4 border-gray-300 pl-3 bg-white/60 py-2 pr-3 rounded-r-lg">
                  {phase.description}
                </p>

                {/* エージェントごとのアクション */}
                <div>
                  <div className="text-xs font-bold text-gray-700 mb-2">エージェントが行うこと</div>
                  <div className="flex flex-col gap-3">
                    {phase.agentActions.map((ag) => (
                      <div key={ag.agent} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 border-b border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700">{ag.agent}</div>
                        <ul className="px-3 py-2 flex flex-col gap-1.5">
                          {ag.actions.map((action, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                              <span className="mt-0.5 text-gray-400 font-bold shrink-0">{i + 1}.</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* スキルと成果物 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-bold text-gray-700 mb-1.5">実行するスキル</div>
                    <div className="space-y-1">
                      {phase.activities.map((a) => (
                        <div key={a} className="flex items-center gap-1.5 text-xs text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                          <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 font-mono">{a}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-700 mb-1.5">生成される成果物</div>
                    <div className="space-y-1">
                      {phase.outputs.map((o) => (
                        <div key={o} className="flex items-start gap-1.5 text-xs text-gray-700">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                          <span>{o}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────
// CADRE Roles Table
// ──────────────────────────────────────────────────
const ROLES = [
  { role: "PM", icon: "🎯", desc: "プロジェクト統括・Business Go 判定", dri: "R1", gate: "G-R1, G-R6" },
  { role: "Architect", icon: "🏗️", desc: "設計責任・AI 戦略・技術判断", dri: "R3, R4", gate: "G-R2, G-R3, G-R4" },
  { role: "Designer", icon: "🎨", desc: "ワイヤーフレーム・UX 設計", dri: "R2", gate: "G-R2, G-R3" },
  { role: "Worker", icon: "⚙️", desc: "dbt/SP/Cortex/Next.js 実装", dri: "R5", gate: "G-R5" },
  { role: "Reviewer", icon: "🔍", desc: "検証・ガバナンス・FinOps（拒否権）", dri: "R6", gate: "G-R1, G-R4, G-R5, G-R6" },
  { role: "Orchestrator", icon: "🎼", desc: "dev/biz cycle 統括・subagent dispatch", dri: "—", gate: "—" },
  { role: "Doc", icon: "📝", desc: "設計ドキュメント生成（SSOT → HTML）", dri: "—", gate: "—" },
  { role: "Marketing", icon: "📢", desc: "GTM ナラティブ・biz cycle テーマ企画", dri: "—", gate: "—" },
];

// ──────────────────────────────────────────────────
// Procedure Steps（PoC 開始から R6 完了まで一本化）
// ──────────────────────────────────────────────────

const CONVERSATION_STEPS = [
  {
    from: "あなた",
    color: "bg-indigo-50 border-indigo-200",
    nameColor: "text-indigo-700",
    text: "新しいプロジェクトを始めたい。営業部門向けに、顧客の購買履歴から商談の優先度を AI が提案するシステムを作りたい。",
  },
  {
    from: "Claude（PM として自動応答）",
    color: "bg-slate-50 border-slate-200",
    nameColor: "text-slate-600",
    text: "承知しました。md-scope を起動します。\n① このシステムを使うのは誰ですか？\n② 現在どんな課題がありますか？\n③ プロジェクト名の案はありますか？（例: sales-priority）",
  },
  {
    from: "あなた",
    color: "bg-indigo-50 border-indigo-200",
    nameColor: "text-indigo-700",
    text: "① 営業担当者とマネージャー\n② 商談が多すぎて優先度判断に時間がかかる\n③ sales-priority でお願いします",
  },
  {
    from: "Claude（PM）",
    color: "bg-slate-50 border-slate-200",
    nameColor: "text-slate-600",
    text: "了解です。projects/sales-priority/ を作成し、design.yaml を生成します。\n\n✅ 生成完了:\n  projects/sales-priority/design.yaml\n  projects/sales-priority/design/01-purpose.yaml\n  projects/sales-priority/design/02-personas.yaml\n  projects/sales-priority/design/03-decision_flow.yaml\n\n次は Architect にデータソース設計を依頼してください。",
  },
];

const ANTIPATTERNS = [
  {
    ng: "「projects/sales-priority/ を作成して」と直接指示する",
    why: "フォルダだけ作られて design.yaml が生成されない。スキルが呼ばれず手順が飛ぶ。",
    ok: "「〜〜を作りたい」と目的を伝える → PM が md-scope を自動起動してくれる",
  },
  {
    ng: "GitHub Copilot で jcg_snowflake を開いて指示する",
    why: "Copilot はエージェント役割・スキル体系・messages/ 通信プロトコルを読み込まないため非推奨",
    ok: "Claude Code（VSCode 拡張 または claude CLI）を使う",
  },
  {
    ng: "/md-scope とユーザーが直接タイプして起動する",
    why: "可能ではあるが、PM が文脈を把握した上で起動するのが正規フロー。ヒアリングが飛ぶ場合がある",
    ok: "「新しいプロジェクトを始めたい」と話しかけ、PM の判断で md-scope が呼ばれるのを待つ",
  },
  {
    ng: "複数エージェントに同じチャットでバラバラに指示する",
    why: "agent 間通信（messages/）に履歴が残らず、後追いできなくなる（ADR-0018 C1 違反）",
    ok: "1 エージェントずつ順番に依頼する",
  },
];

const STEPS = [
  {
    phase: "最終プロダクト確認",
    color: "bg-teal-600",
    badge: "bg-teal-100 text-teal-700",
    items: [
      {
        title: "何が作られるのか把握する",
        commands: [
          "# 【成果物】Next.js 16 Web アプリ on Snowflake SPCS",
          "#   jcg_snowflake/projects/<name>/web/ → Docker ビルド",
          "#   → SPCS イメージリポジトリ push → CREATE SERVICE",
          "#   → ブラウザからアクセス（Snowflake OAuth 認証）",
          "",
          "# 【含まれるもの】",
          "#   Cortex Agent（AI チャットパネル）",
          "#   Hybrid Table（書き込み SSOT）",
          "#   dbt Mart + Semantic View（分析データ）",
          "#   Terraform IaC（DB / スキーマ / ロール）",
        ],
        note: "Streamlit は jcg_snowflake フレームワークでは使わない。implement スキルはすべて vc-*（Next.js 系）。Python PoC には別フレームワーク（streamlit_snowflake/）を使う。",
      },
    ],
  },
  {
    phase: "Step 0: 開発環境セットアップ",
    color: "bg-slate-600",
    badge: "bg-slate-100 text-slate-700",
    items: [
      {
        title: "① Claude Code をインストールする",
        commands: [
          "# VSCode 拡張「Claude Code」をインストール",
          "#   または CLI:",
          "npm install -g @anthropic-ai/claude-code",
          "",
          "# 動作確認",
          "claude --version",
        ],
        note: "GitHub Copilot ではなく Claude Code を使う。CLAUDE.md・スキル体系・エージェント役割を自動で読み込むのは Claude Code のみ。",
      },
      {
        title: "② jcg_snowflake をリポジトリルートで開く",
        commands: [
          "# VSCode で開く",
          "code C:\\Users\\<name>\\src\\nomura\\jcg_snowflake",
          "",
          "# ⚠️ projects/<name>/ を開くのは NG",
          "# リポジトリルート（jcg_snowflake/）を開く",
        ],
        note: "Claude Code は CLAUDE.md をルートから読む。サブフォルダで開くとスキル・エージェント体系が読み込まれない。",
      },
      {
        title: "③ .env を作成する（リポジトリルートに 1 ファイルのみ）",
        commands: [
          "# リポジトリルート直下に .env を作成",
          "SNOWFLAKE_ACCOUNT=xxxx.east-us-2.azure",
          "SNOWFLAKE_USER=my_user",
          "SNOWFLAKE_PASSWORD=...",
          "SNOWFLAKE_ROLE=HVD_DEV_DEPLOY",
          "SNOWFLAKE_WAREHOUSE=HVD_DEV_WH",
          "",
          "# 環境変数ロード（PowerShell）",
          ". .\\load-env.ps1",
        ],
        note: ".env はリポジトリルートに 1 ファイルのみ。projects/<name>/.env は作らない（CLAUDE.md ルール）。",
      },
      {
        title: "④ 共有インフラ初回構築（初回のみ）",
        commands: [
          "cd iac/shared-dev",
          "terraform init",
          "terraform apply",
          "# → HVD_DEV_WH / HVD_DEV_POOL / HVD_SHARED イメージリポジトリが作成される",
        ],
        note: "shared インフラは全プロジェクト共用。一度作ったら destroy しない。",
      },
    ],
  },
  {
    phase: "Step 1: Claude Code でプロジェクトを開始する（R1a）",
    color: "bg-indigo-600",
    badge: "bg-indigo-100 text-indigo-700",
    items: [
      {
        title: "Claude Code チャットで「作りたいもの」を伝える",
        commands: [
          "# ✅ 正しい始め方（目的を自然言語で伝える）",
          '> "新しいプロジェクトを始めたい。',
          '   営業向けに商談の優先度を AI が提案するシステムを作りたい"',
          "",
          "# Claude が PM として応答し md-scope を起動する",
          "# → projects/<name>/design.yaml が自動生成される",
          "",
          "# ❌ NG: ディレクトリ作成を直接指示する",
          '> "projects/sales-priority/ を作成して"  # スキルが呼ばれない',
        ],
        note: "Claude は jcg_snowflake/CLAUDE.md を読んで PM（CEO）として応答する。目的を伝えるだけで md-scope が起動し design.yaml が生成される。",
      },
      {
        title: "R1a 完了後の成果物",
        commands: [
          "projects/<name>/",
          "  design.yaml                   ← 全設計の SSOT（以降これが軸になる）",
          "  design/01-purpose.yaml        ← 目的・課題",
          "  design/02-personas.yaml       ← ペルソナ",
          "  design/03-decision_flow.yaml  ← 意思決定フロー",
          "",
          "# 整合性検証",
          "python scripts/verify_design_foundation.py --project <name>",
        ],
        note: "design.yaml は SSOT。以降のすべてのスキルは design.yaml を読み・書きしながら進む。手動で直接編集するより Claude を通じて更新する。",
      },
    ],
  },
  {
    phase: "R1b: 要件定義（PM / Architect）",
    color: "bg-rose-600",
    badge: "bg-rose-100 text-rose-700",
    items: [
      {
        title: "AI 戦略・データソース・要件を定義する",
        commands: [
          '# Claude に依頼する例:',
          '> "データソース設計をお願いしたい"  → md-datasource',
          '> "要件書の仕様書を取り込んでほしい"  → md-spec-intake（PDF 在る場合）',
          '> "要件をまとめてほしい"  → md-requirements',
          "",
          "# G-R1 品質ゲート（Business Go）",
          '> "R1 の検証をお願いしたい"  → hvd-verify-r1 が走る',
        ],
        note: "schema SSOT は design/02-architecture.yaml。load-env.ps1 が SNOWFLAKE_DATABASE/SCHEMA を export する。",
      },
    ],
  },
  {
    phase: "R2: ワイヤーフレーム設計（Designer / Architect）",
    color: "bg-orange-600",
    badge: "bg-orange-100 text-orange-700",
    items: [
      {
        title: "機能・シナリオ・ブランド・ワイヤーフレームを作る",
        commands: [
          '# Claude に依頼する例:',
          '> "画面構成を設計してほしい"  → md-features / md-scenarios',
          '> "ワイヤーフレームを作って"  → md-wireframe',
          "",
          "# 成果物",
          "design.yaml#{features, analysis, scenarios, branding}",
          "html/<screen-id>.html  ← ワイヤーフレーム（手動編集 OK）",
          "",
          "# G-R2 品質ゲート",
          "python scripts/verify_feature_traceability.py --project <name>",
        ],
        note: "F-* は F-DOMAIN-NNN 形式（例: F-CHAT-001）。lifecycle: planned / deferred / archived で管理。",
      },
    ],
  },
  {
    phase: "R3: モック UI 生成（Architect / Designer）",
    color: "bg-amber-600",
    badge: "bg-amber-100 text-amber-700",
    items: [
      {
        title: "モック UI を生成してステークホルダーに見せる",
        commands: [
          '# Claude に依頼する例:',
          '> "UI モックを生成してほしい"  → vc-ui-mock',
          "",
          "# 成果物",
          "web/app/**/page.tsx  ← モック（mock-data.ts のシードデータで動く）",
          "",
          "# G-R3 品質ゲート（UX 確認）",
          '> "UX スモークテストをお願いしたい"  → vc-ui-smoke',
        ],
        note: "モック段階は lib/mock-data.ts を使用。本番 Snowflake 接続なし。ステークホルダーに見せて方向感を合わせてから実装に進む。",
      },
    ],
  },
  {
    phase: "R4: データモデル設計（Architect / Reviewer）",
    color: "bg-yellow-600",
    badge: "bg-yellow-100 text-yellow-700",
    items: [
      {
        title: "Hybrid Table・dbt Mart・ELT パイプラインを設計する",
        commands: [
          '# Claude に依頼する例:',
          '> "データモデルを設計してほしい"  → md-data / md-elt / md-architecture',
          "",
          "# G-R4 品質ゲート",
          '> "R4 の検証をお願いしたい"  → hvd-verify-r4',
          "",
          "# 禁止: stg → HT 直接ロード",
          "grep -REn 'FROM.*stg_' projects/<name>/dbt/macros/ | grep 'INSERT INTO.*_HT'",
        ],
        note: "Hybrid Table への書き込みは必ず Action SP（CALL ACTION_*）経由。Kysely の INSERT/UPDATE は禁止（ADR-0009）。",
      },
    ],
  },
  {
    phase: "R5: 本番実装（Worker / Reviewer）",
    color: "bg-teal-700",
    badge: "bg-teal-100 text-teal-700",
    items: [
      {
        title: "① IaC インフラを構築する",
        commands: [
          "cd projects/<name>/iac/base",
          "terraform init && terraform apply",
          "# → DB / Schema / Warehouse を作成",
          "",
          "# ⚠️ shared リソース（HVD_DEV_WH 等）は resource 宣言禁止",
          "# locals 文字列参照のみ（terraform destroy で消えるのを防ぐ）",
        ],
        note: "managed_by=shared のリソースは data source または locals 文字列参照のみ。project IaC はスタンドアロンで destroy できる構造を保つ（ADR-0054）。",
      },
      {
        title: "② dbt でバックエンドをデプロイする",
        commands: [
          "cd projects/<name>/dbt",
          "dbt build",
          "",
          "# Hybrid Table 作成 + 初期データ投入（mart 経由）",
          "dbt run-operation deploy_hybrid_<table>",
          "dbt run-operation load_hybrid_tables",
          "",
          "# Action SP / Function SP / Cortex Agent",
          "dbt run-operation deploy_action_<name>",
          "dbt run-operation deploy_agent_<name>",
          "",
          "# Semantic View デプロイ（AI Read 経路）",
          "python .claude/skills/templates/dbt/models/semantic/deploy_semantic_views.py projects/<name>/dbt",
        ],
        note: "SNOWFLAKE_DATABASE / SCHEMA は load-env.ps1 が export。dbt_project.yml#vars への記載は廃止済み（ADR-0060）。",
      },
      {
        title: "③ フロントエンドを本番接続に切り替える",
        commands: [
          '# Claude に依頼する例:',
          '> "本番 UI を実装してほしい"  → vc-ui-build / vc-data-access',
          "",
          "# E2E テスト",
          "python projects/<name>/tests/_smoke_test.py",
          "",
          "# G-R5 品質ゲート",
          '> "E2E シナリオテストをお願いしたい"  → sf-e2e-scenario',
        ],
        note: "Write は CALL ACTION_* 経由のみ。FQN ヘルパ FQN_ACTION() を使う。CORTEX.COMPLETE() 直叩きは禁止（ADR-0032）。",
      },
    ],
  },
  {
    phase: "R6: ガバナンス & SPCS デプロイ（Reviewer / PM）",
    color: "bg-purple-700",
    badge: "bg-purple-100 text-purple-700",
    items: [
      {
        title: "① ガバナンス設計 & Secure View をデプロイする",
        commands: [
          '# Claude に依頼する例:',
          '> "ガバナンス設計をお願いしたい"  → md-gov-roles / md-gov-policy',
          '> "ガバナンスをデプロイしてほしい"  → iac-project-governance',
          "",
          "dbt run-operation deploy_secure_views",
          "dbt run-operation deploy_grants",
          "",
          "# ⚠️ Standard Edition 前提",
          "# Dynamic Data Masking / Row Access Policy は使用不可",
          "# Secure View + QUERY_HISTORY で代替（ADR-0058）",
        ],
        note: "base table への直接 GRANT は禁止。必ず <base>_SECURE schema 経由で SELECT を付与する。",
      },
      {
        title: "② SPCS に Web アプリをデプロイして完成",
        commands: [
          '# Claude に依頼する例:',
          '> "SPCS にデプロイしてほしい"  → vc-spcs-deploy',
          "",
          "# → Docker ビルド → HVD_SHARED イメージリポジトリへ push",
          "# → CREATE SERVICE → ブラウザでアクセス可能に",
          "",
          "# ガバナンス検証",
          '> "ガバナンスの最終検証をお願いしたい"  → sf-gov-verify',
          "",
          "# 設計書ドキュメント生成",
          '> "設計書を生成してほしい"  → hvd-design-doc  → doc/_html/ に HTML',
        ],
        note: "SPCS は OAuth トークンで認証。Web は /snowflake/session/token からトークンを取得して Snowflake SDK に渡す（ADR-0062）。",
      },
    ],
  },
  {
    phase: "品質ゲート共通（全フェーズ）",
    color: "bg-gray-700",
    badge: "bg-gray-100 text-gray-700",
    items: [
      {
        title: "設計整合性検証",
        commands: [
          "# フェーズ境界では必須（Claude に依頼することもできる）",
          '> "整合性検証をお願いしたい"  → hvd-verify',
          "",
          "# 個別スクリプト",
          "python scripts/verify_design_foundation.py --project <name>",
          "python scripts/verify_feature_traceability.py --project <name>",
          "python scripts/verify_skill_ssot.py",
        ],
        note: "🔴 Error は CI fail。🟡 Warning は次スプリントの課題として記録する。",
      },
      {
        title: "固定費オブジェクト禁止チェック",
        commands: [
          "# Cortex Search Service 禁止（固定費 / ADR-0015）",
          'grep -rEn "kind: cortex_search|search_services:" projects/<name>/design/',
          "",
          "# CRON Task 禁止（固定費 / ADR-0023）",
          'grep -rEn "USING CRON|SCHEDULE\\s*=|ALTER TASK.*RESUME" projects/<name>/dbt/macros/',
        ],
        note: "例外は対応 ADR を Supersede する新規 ADR 起票でのみ許可。",
      },
    ],
  },
];

type StepItem = { title: string; commands: string[]; note?: string };
type Step = { phase: string; color: string; badge: string; items: StepItem[] };

function ProcedureSteps() {
  const [openPhase, setOpenPhase] = useState<number | null>(1);
  const [convOpen, setConvOpen] = useState(true);

  return (
    <div className="space-y-3">
      {/* PoC の流れ俯瞰 */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-4 text-sm text-indigo-800">
        <p className="font-semibold mb-1">この手順書の読み方</p>
        <p className="text-xs text-indigo-700">
          上から順に進めることでアプリが完成します。各フェーズをクリックすると詳細コマンドが展開されます。
          Claude Code に「〜をお願いしたい」と話しかけるだけで対応するスキルが自動起動するものは
          <code className="bg-white px-1 rounded border border-indigo-200 mx-1 font-mono">&gt; "..."</code>
          で示しています。
        </p>
      </div>

      {STEPS.map((step: Step, idx: number) => (
        <div key={step.phase} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <button
            onClick={() => setOpenPhase(openPhase === idx ? null : idx)}
            className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors text-left"
          >
            <span className={`${step.color} text-white text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 w-7 h-7 flex items-center justify-center`}>
              {idx + 1}
            </span>
            <span className="font-semibold text-gray-800 text-sm flex-1">{step.phase}</span>
            <span className="text-gray-400 text-sm">{openPhase === idx ? "▲" : "▼"}</span>
          </button>

          {openPhase === idx && (
            <div className="px-5 pb-5 space-y-4 border-t border-gray-100">
              {/* Step 1 のみ会話例を挿入 */}
              {idx === 2 && (
                <div className="mt-4">
                  <p className="text-xs text-gray-600 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2.5 mb-3">
                    <b>ポイント：</b> Claude は <code className="font-mono bg-white px-1 rounded border">jcg_snowflake/CLAUDE.md</code> を読んで
                    <b> PM（CEO）として応答</b>します。「何を作りたいか」を伝えるだけで PM が
                    <code className="font-mono bg-white px-1 rounded border mx-1">md-scope</code>
                    スキルを起動し、<code className="font-mono bg-white px-1 rounded border">projects/&lt;name&gt;/</code> を自動生成してくれます。
                  </p>
                  <button
                    onClick={() => setConvOpen(!convOpen)}
                    className="flex items-center gap-2 text-xs font-semibold text-indigo-700 mb-2"
                  >
                    <span>{convOpen ? "▼" : "▶"}</span> 会話例を見る
                  </button>
                  {convOpen && (
                    <div className="space-y-2.5 mb-4">
                      {CONVERSATION_STEPS.map((s, i) => (
                        <div key={i} className={`rounded-lg border px-4 py-3 ${s.color}`}>
                          <div className={`text-xs font-bold mb-1.5 ${s.nameColor}`}>{s.from}</div>
                          <pre className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed font-sans">{s.text}</pre>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {step.items.map((item: StepItem) => (
                <div key={item.title} className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className={`${step.badge} border text-xs px-2 py-0.5 rounded-full`}>{step.phase.split(":")[0].split("（")[0].trim()}</span>
                    {item.title}
                  </h4>
                  <pre className="bg-gray-900 text-gray-100 rounded-lg px-4 py-3 text-xs overflow-x-auto font-mono leading-relaxed">
                    {item.commands.join("\n")}
                  </pre>
                  {item.note && (
                    <p className="mt-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded px-3 py-2">
                      💡 {item.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* アンチパターン */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-red-600 to-rose-700 px-5 py-3">
          <h3 className="text-white font-bold text-sm tracking-wide">よくある間違い（アンチパターン）</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {ANTIPATTERNS.map((p, i) => (
            <div key={i} className="px-5 py-3.5 grid grid-cols-1 gap-1.5 sm:grid-cols-[1fr_1fr_1fr] sm:gap-4">
              <div>
                <span className="text-xs text-red-500 font-semibold">❌ NG</span>
                <p className="text-xs text-gray-700 mt-0.5">{p.ng}</p>
              </div>
              <div>
                <span className="text-xs text-amber-500 font-semibold">なぜ問題か</span>
                <p className="text-xs text-gray-600 mt-0.5">{p.why}</p>
              </div>
              <div>
                <span className="text-xs text-green-600 font-semibold">✅ 正しい方法</span>
                <p className="text-xs text-gray-700 mt-0.5">{p.ok}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────
// Quick Reference Card
// ──────────────────────────────────────────────────
const QUICK_CMDS = [
  { label: "環境変数ロード", cmd: ". .\\load-env.ps1", desc: "毎回の作業前に実行" },
  { label: "dbt フルビルド", cmd: "cd projects/<name>/dbt && dbt build", desc: "モデル生成 + テスト実行" },
  { label: "整合性検証", cmd: "python scripts/verify_design_foundation.py --project <name>", desc: "R1〜R6 任意タイミングで" },
  { label: "スモークテスト", cmd: "python projects/<name>/tests/_smoke_test.py", desc: "デプロイ後に必ず実行" },
  { label: "Terraform 適用", cmd: "cd projects/<name>/iac/base && terraform apply", desc: "DB/Schema/WH 作成" },
  { label: "Hybrid Table 初期投入", cmd: "dbt run-operation load_hybrid_tables", desc: "mart → HT の bootstrap" },
  { label: "Secure View 再生成", cmd: "dbt run-operation deploy_secure_views", desc: "R6 ガバナンスデプロイ" },
  { label: "設計書 HTML 生成", cmd: "# /hvd-design-doc", desc: "doc/_html/ に自動生成" },
];

function QuickRef() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-5 py-3">
        <h3 className="text-white font-bold text-sm tracking-wide">クイックリファレンス — よく使うコマンド</h3>
      </div>
      <div className="p-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {QUICK_CMDS.map((q) => (
          <div key={q.label} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-700">{q.label}</span>
              <span className="text-xs text-gray-400">{q.desc}</span>
            </div>
            <code className="text-xs text-indigo-700 font-mono break-all">{q.cmd}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────
// Key ADRs and Rules
// ──────────────────────────────────────────────────
const KEY_ADRS = [
  { id: "ADR-0009", title: "CQRS 三責務分離", summary: "画面Read=Kysely / AI Read=SV / Write=Action SP のみ" },
  { id: "ADR-0015", title: "Cortex Search Service 全面禁止", summary: "固定費発生。AI_EMBED + VECTOR_COSINE で代替" },
  { id: "ADR-0023", title: "CRON Task 全面禁止", summary: "固定費発生。CI トリガー / 手動実行で代替" },
  { id: "ADR-0053", title: "Terraform IaC 統合", summary: "Phase 3 = base / Phase 5 = governance に分離" },
  { id: "ADR-0058", title: "Standard Edition ガバナンス", summary: "Secure View + QUERY_HISTORY で機密分離・監査" },
  { id: "ADR-0060", title: "design.yaml SSOT（v1.2）", summary: "DB/Schema は design/02-architecture.yaml が唯一の真実" },
  { id: "ADR-0073", title: "YAML-Anchored SSOT", summary: "1 fact = 1 location。SKILL.md は narrative のみ" },
  { id: "ADR-0109", title: "4 レイヤ責務分離", summary: "framework / agents / skills / projects で越境禁止" },
];

// ──────────────────────────────────────────────────
// jcg_snowflake Repository Section
// ──────────────────────────────────────────────────
const JCG_STATS = [
  { label: "スキル数", value: "137", sub: "7カテゴリ・55スキル" },
  { label: "Rules", value: "19", sub: "path-scoped" },
  { label: "ADR", value: "110+", sub: "設計決定記録" },
  { label: "Agents", value: "8", sub: "CADRE 組織" },
];

const JCG_IMPROVEMENTS = [
  {
    file: ".claude/rules/snowflake-sql.md",
    type: "新規",
    color: "bg-emerald-100 text-emerald-700 border-emerald-300",
    desc: "dbt 外の汎用 SQL ファイル向けルール（UPPER_SNAKE_CASE 命名・LIMIT なし SELECT 禁止・固定費オブジェクト禁止・日本語コメント推奨）",
    globs: ["**/sql/**/*.sql", "**/ops/**/*.sql"],
  },
  {
    file: ".claude/rules/iac-tf-layout.md",
    type: "修正",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    desc: "frontmatter に globs を追加して path-scoped rule として機能させた（既存コンテンツは変更なし）",
    globs: ["**/*.tf", "**/*.tfvars", "**/iac/**"],
  },
  {
    file: ".claude/hooks/validate-hardcoded-creds.sh",
    type: "新規",
    color: "bg-emerald-100 text-emerald-700 border-emerald-300",
    desc: "Write/Edit 後に JWT（Snowflake PAT）・AWS Access Key・OpenAI Key・GitHub PAT をソースファイル内で検出して警告。*.example / *.md / tests/* は対象外",
    globs: [],
  },
  {
    file: ".claude/settings.json",
    type: "修正",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    desc: "PostToolUse(Write|Edit|MultiEdit) フックに validate-hardcoded-creds.sh を追加",
    globs: [],
  },
];

const JCG_SETUP_STEPS = [
  {
    step: "① リポジトリを開く",
    cmd: 'code C:\\Users\\cab02322\\src\\nomura\\jcg_snowflake\n# ⚠️ projects/<name>/ ではなくリポジトリルートを開く',
  },
  {
    step: "② 環境変数ロード",
    cmd: ". .\\load-env.ps1\n# または bash: set -a && source .env && set +a",
  },
  {
    step: "③ Snowflake 接続テスト",
    cmd: 'python scripts/sf_sql.py query \\\n  --query "SELECT CURRENT_USER() AS u, CURRENT_ACCOUNT() AS a, CURRENT_WAREHOUSE() AS wh"\n# 社内 Proxy 環境では PowerShell で実行（bash では 407 エラーになる場合あり）',
  },
  {
    step: "④ dbt 動作確認",
    cmd: "cd projects/<name>/dbt\ndbt parse\ndbt build",
  },
];

function JcgSnowflakeSection() {
  const [expandedImprove, setExpandedImprove] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      {/* Header card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-cyan-700 px-5 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-base tracking-wide">jcg_snowflake</h3>
            <p className="text-blue-100 text-xs mt-0.5">Hyperscale Value product Delivery スキルセット — Snowflake Cortex Agent 中心 AI エージェントサービス開発フレームワーク</p>
          </div>
          <a
            href="https://github.com/masaki-infinite/jcg_snowflake"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-lg border border-white/30 transition-colors flex-shrink-0"
          >
            GitHub ↗
          </a>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-4">
            {JCG_STATS.map((s) => (
              <div key={s.label} className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5 text-center">
                <div className="text-2xl font-bold text-blue-700">{s.value}</div>
                <div className="text-xs font-semibold text-gray-700 mt-0.5">{s.label}</div>
                <div className="text-xs text-gray-500">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {["22 ステップパイプライン", "UI-First アプローチ", "Maximum Delivery / Minimum Development", "design.yaml SSOT", "6RTW-Native v4.0", "dbt + Terraform + Next.js"].map((t) => (
              <span key={t} className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full border border-gray-200">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent improvements */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-5 py-3 flex items-center justify-between">
          <h3 className="text-white font-bold text-sm tracking-wide">今回の改善（hvd vs ECC / gh-aw 比較から適用）</h3>
          <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full border border-white/30">improve/rules-security ブランチ</span>
        </div>
        <div className="divide-y divide-gray-100">
          {JCG_IMPROVEMENTS.map((item, i) => (
            <div key={i} className="px-4 py-3">
              <button
                onClick={() => setExpandedImprove(expandedImprove === i ? null : i)}
                className="w-full text-left flex items-start gap-3"
              >
                <span className={`text-xs font-bold px-2 py-0.5 rounded border flex-shrink-0 mt-0.5 ${item.color}`}>{item.type}</span>
                <div className="flex-1 min-w-0">
                  <code className="text-xs text-indigo-700 font-mono break-all">{item.file}</code>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
                <span className="text-gray-400 text-xs flex-shrink-0 mt-0.5">{expandedImprove === i ? "▲" : "▼"}</span>
              </button>
              {expandedImprove === i && item.globs.length > 0 && (
                <div className="mt-2 ml-14 flex flex-wrap gap-1.5">
                  {item.globs.map((g) => (
                    <code key={g} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200 font-mono">{g}</code>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="px-4 py-3 bg-amber-50 border-t border-amber-100">
          <p className="text-xs text-amber-800">
            <b>PR:</b>{" "}
            <a
              href="https://github.com/masaki-infinite/jcg_snowflake/pull/new/improve/rules-security"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              https://github.com/masaki-infinite/jcg_snowflake/pull/new/improve/rules-security
            </a>
            {" "}— GitHub 上で PR を作成して GitHub Actions（skill-validate.yml）の実行を確認してください
          </p>
        </div>
      </div>

      {/* Setup */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-5 py-3">
          <h3 className="text-white font-bold text-sm tracking-wide">セットアップ & 接続確認</h3>
        </div>
        <div className="p-4 space-y-4">
          {JCG_SETUP_STEPS.map((s) => (
            <div key={s.step}>
              <div className="text-xs font-semibold text-gray-700 mb-1.5">{s.step}</div>
              <pre className="bg-gray-900 text-gray-100 rounded-lg px-4 py-3 text-xs overflow-x-auto font-mono leading-relaxed">
                {s.cmd}
              </pre>
            </div>
          ))}
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-xs text-blue-800">
            <b>接続情報（.env）:</b> <code className="font-mono">SNOWFLAKE_ACCOUNT</code> /
            {" "}<code className="font-mono">SNOWFLAKE_USER</code> /
            {" "}<code className="font-mono">SNOWFLAKE_PAT</code> /
            {" "}<code className="font-mono">SNOWFLAKE_ROLE</code> /
            {" "}<code className="font-mono">SNOWFLAKE_WAREHOUSE</code>
            <br />
            <span className="text-blue-600 mt-1 block">雛形は <code className="font-mono">.env.example</code> を参照。実際の値は <code className="font-mono">.env</code>（.gitignore 済）にのみ記載。</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────
// Main DevGuide Component
// ──────────────────────────────────────────────────
export default function DevGuide() {
  const [section, setSection] = useState<"steps" | "overview" | "pipeline" | "roles" | "adrs" | "jcg">("steps");

  const tabs = [
    { id: "steps" as const, label: "📋 手順書" },
    { id: "overview" as const, label: "構成図" },
    { id: "pipeline" as const, label: "パイプライン" },
    { id: "roles" as const, label: "役割分担" },
    { id: "adrs" as const, label: "主要 ADR" },
    { id: "jcg" as const, label: "📦 jcg_snowflake" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl px-6 py-5 text-white shadow-md">
        <h2 className="text-xl font-bold mb-1">HVD フレームワーク 開発手順書</h2>
        <p className="text-indigo-100 text-sm">
          Hyperscale Value product Delivery — design.yaml を SSOT として AI サービスを 1〜2 週間で本番リリースするフレームワーク
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "22 ステップ",
            "R1〜R6 フェーズ",
            "6 品質ゲート",
            "8 CADRE ロール",
            "55+ スキル",
            "Snowflake + dbt + Next.js + SPCS",
          ].map((tag) => (
            <span key={tag} className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full border border-white/30">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setSection(t.id)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              section === t.id
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Section content */}
      {section === "steps" && (
        <div>
          <p className="text-sm text-gray-500 mb-4">
            環境セットアップからアプリ完成まで、上から順に進めてください。各フェーズをクリックすると
            実行するスキルとコマンドが展開されます。
          </p>
          <ProcedureSteps />
        </div>
      )}

      {section === "overview" && (
        <div className="space-y-6">
          <ArchDiagram />
          <QuickRef />
        </div>
      )}

      {section === "pipeline" && <PipelineDiagram />}

      {section === "roles" && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-5 py-3">
            <h3 className="text-white font-bold text-sm tracking-wide">CADRE 8 ロール — 責任分担マトリクス</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-600 w-32">ロール</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-600">主な責務</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-600 w-24">DRI フェーズ</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-600 w-40">承認ゲート</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ROLES.map((r) => (
                  <tr key={r.role} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-semibold text-gray-800 text-sm">
                      <span className="mr-1.5">{r.icon}</span>{r.role}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600 text-xs">{r.desc}</td>
                    <td className="px-4 py-2.5 text-xs">
                      <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">{r.dri}</span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-gray-600">{r.gate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              <b>DRI（Directly Responsible Individual）</b>: そのフェーズの設計・実行責任者。1 ファイル 1 DRI 原則（ADR-0018）。<br />
              <b>Reviewer</b> は拒否権（veto）を持つ。override する場合は ADR 起票が必須。<br />
              ロールは Claude Code の agent として実装されており、<code className="bg-white px-1 rounded border text-indigo-700 font-mono">.claude/agents/*.md</code> で定義されている。
            </p>
          </div>
        </div>
      )}

      {section === "jcg" && <JcgSnowflakeSection />}

      {section === "adrs" && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            開発中に必ず確認すべき主要 ADR（Architecture Decision Records）。
            全 ADR は <code className="bg-gray-100 px-1.5 py-0.5 rounded text-indigo-700 font-mono text-xs">jcg_snowflake/adr/</code> に保存されています。
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {KEY_ADRS.map((adr) => (
              <div key={adr.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full flex-shrink-0 mt-0.5">
                    {adr.id}
                  </span>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm mb-0.5">{adr.title}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{adr.summary}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs text-amber-800">
              <b>⚠️ 禁止事項（自動 lint で検出）</b><br />
              ・Cortex Search Service の新規作成（ADR-0015 / 全環境・全期間禁止）<br />
              ・CRON Task のスケジュール実行（ADR-0023 / SPCS lifecycle 管理目的のみ例外）<br />
              ・stg → Hybrid Table への直接ロード（data-layer-responsibility ルール）<br />
              ・画面 Server Action での Kysely DML 直書き（ADR-0009 / CALL ACTION_* のみ）<br />
              ・shared リソース（HVD_DEV_WH 等）の resource 宣言（iac-tf-layout ルール）
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
