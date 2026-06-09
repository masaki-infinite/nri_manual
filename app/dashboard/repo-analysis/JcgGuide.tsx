"use client";

import { useState } from "react";

type Tab = "overview" | "workflow" | "agents" | "skills" | "rules" | "usage";

export default function JcgGuide() {
  const [tab, setTab] = useState<Tab>("overview");

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "❄️ 概要" },
    { id: "workflow", label: "🔄 ワークフロー" },
    { id: "agents", label: "🤖 CADRE 組織" },
    { id: "skills", label: "📚 スキル体系" },
    { id: "rules", label: "⚙️ 品質ゲート" },
    { id: "usage", label: "📋 使い方" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          ❄️ jcg_snowflake（HVD）
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Hyperscale Value product Delivery — Snowflake Cortex Agent × 22 ステップ × 55 スキル × CADRE 8体組織
        </p>
      </div>

      {/* タブ */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-4 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id
                ? "bg-sky-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 概要 */}
      {tab === "overview" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">HVD とは</h3>
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                <strong>Maximum Delivery, Minimum Development</strong> を掲げる Snowflake 特化の AI エージェントフレームワーク。
                <code className="bg-white px-1 rounded text-sky-700 text-xs mx-1">design.yaml</code>
                を Single Source of Truth として、設計から実装・デプロイまでを
                <strong> 22 ステップ × 55 スキル</strong> で段階的に自動化する。
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white rounded-lg p-3 border border-sky-100">
                  <div className="font-bold text-sky-700 mb-1">Maximum Delivery</div>
                  <div className="text-gray-600">FDE（Forward Deployed Engineer）が顧客現場で design.yaml に意図を集約し、高速・高品質に AI システムを届ける</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-sky-100">
                  <div className="font-bold text-sky-700 mb-1">Minimum Development</div>
                  <div className="text-gray-600">PdE（Product Engineer）が標準アプリと Agent Skills を進化させ、個別開発量を構造的に最小化する</div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">主要コンポーネント</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "📐", title: "design.yaml", desc: "全設計定義の SSOT。purpose〜ui まで全セクションをカバー。スキーマ検証・自動生成の起点。", color: "bg-blue-50 border-blue-200 text-blue-700" },
                { icon: "🧠", title: "Cortex Agent", desc: "Snowflake Cortex Agent REST API。CQRS 三責務分離（AI Read = Semantic View / Write = Action SP）。", color: "bg-purple-50 border-purple-200 text-purple-700" },
                { icon: "🏗️", title: "6RTW-Native v4.0", desc: "R1〜R6 の 6 段階ゲート + 22 ステップ + 12 gate で設計→実装を進める開発パイプライン。", color: "bg-green-50 border-green-200 text-green-700" },
                { icon: "👥", title: "CADRE 8体組織", desc: "CEO / COO / CTO / CFO-CRO / CMO / CAIO / Worker × 2 のフラット 8 体 AI エージェント組織。", color: "bg-orange-50 border-orange-200 text-orange-700" },
                { icon: "📚", title: "55 スキル", desc: "design / implement / verify / document / manage / operate / specialist の 7 カテゴリ・55 スキル。", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
                { icon: "⚙️", title: "品質ゲート基盤", desc: "hooks / rules / CI で整合違反・秘匿情報漏洩・PRJ_DIR 越境を機械的に検出する多層防御。", color: "bg-red-50 border-red-200 text-red-700" },
              ].map((item) => (
                <div key={item.title} className={`rounded-xl border p-4 ${item.color.split(" ").slice(0, 2).join(" ")}`}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className={`font-bold text-xs mb-1 ${item.color.split(" ")[2]}`}>{item.title}</div>
                  <div className="text-xs text-gray-600 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-700 mb-3">ディレクトリ構造</h3>
            <div className="bg-gray-900 rounded-xl p-5 font-mono text-xs text-gray-300 leading-relaxed">
              <div className="text-sky-400 mb-2">jcg_snowflake/</div>
              {[
                [".claude/skills/", "55 スキル定義（7 カテゴリ）"],
                [".claude/agents/", "CADRE 8体エージェント定義"],
                [".claude/rules/", "18 個のパススコープルール"],
                [".claude/hooks/", "品質ゲートフック群"],
                [".claude/framework/", "workflow-core.yaml（SSOT）"],
                ["projects/<name>/", "個別プロジェクト（PRJ_DIR）"],
                ["  design.yaml", "全設計定義（SSOT）"],
                ["  dbt/", "dbt プロジェクト（models + macros）"],
                ["  web/", "Next.js 16 + shadcn/ui 本番アプリ"],
                ["biz/02-themes/", "ビジネステーマポートフォリオ"],
                ["scripts/", "共有 Python スクリプト群"],
                ["adr/", "横断 Architecture Decision Records"],
              ].map(([code, comment], i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-gray-300 min-w-[220px]">{code}</span>
                  <span className="text-gray-500">← {comment}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ワークフロー */}
      {tab === "workflow" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">6RTW-Native v4.0 — 開発パイプライン</h3>
            <div className="space-y-3">
              {[
                { r: "R1", title: "仕様・AI 戦略", gate: "G1-2", dri: "CEO / COO", desc: "md-scope でプロジェクト起動。design.yaml の purpose / ai_strategy / personas を確定する。", color: "bg-blue-50 border-blue-200 text-blue-700" },
                { r: "R2", title: "データ設計", gate: "G2-1", dri: "CTO", desc: "md-datasource / md-data でデータモデル・Hybrid Table・dbt models を設計する。", color: "bg-cyan-50 border-cyan-200 text-cyan-700" },
                { r: "R3", title: "機能設計", gate: "G3-1", dri: "CTO", desc: "md-capabilities / md-ui で Action SP・Semantic View・画面仕様を設計する。", color: "bg-teal-50 border-teal-200 text-teal-700" },
                { r: "R4", title: "実装", gate: "G4-1", dri: "CTO / Worker", desc: "sf-deploy-backend / vc-ui-build でバックエンド・フロントエンドを実装・デプロイする。", color: "bg-green-50 border-green-200 text-green-700" },
                { r: "R5", title: "ガバナンス", gate: "—", dri: "CFO-CRO（任意）", desc: "iac-project-governance で Secure View・ロール階層・監査 view を構築する。", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
                { r: "R6", title: "運用・セキュリティ", gate: "—", dri: "CFO-CRO（任意）", desc: "sf-finops / sf-ops-monitor で AUTO_SUSPEND チューニング・アラート設定を行う。", color: "bg-orange-50 border-orange-200 text-orange-700" },
              ].map((item) => (
                <div key={item.r} className={`rounded-xl border p-4 ${item.color.split(" ").slice(0, 2).join(" ")}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${item.color}`}>{item.r}</span>
                    <span className="font-bold text-sm text-gray-700">{item.title}</span>
                    <span className="ml-auto text-xs text-gray-400">Gate: {item.gate}</span>
                    <span className="text-xs text-gray-400">DRI: {item.dri}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">2 つの Cycle</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="font-bold text-blue-700 text-sm mb-2">🔄 dev cycle（内側ループ）</div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div><span className="font-medium">起動者:</span> CEO / COO</div>
                  <div><span className="font-medium">承認者:</span> CFO-CRO（G2-3 / G3-1）</div>
                  <div><span className="font-medium">頻度:</span> プロジェクト都度</div>
                  <div><span className="font-medium">対象:</span> projects/&lt;name&gt;/</div>
                  <div><span className="font-medium">スキル:</span> hvd-dev-cycle</div>
                </div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <div className="font-bold text-purple-700 text-sm mb-2">🔄 biz cycle（外側ループ）</div>
                <div className="space-y-1 text-xs text-gray-600">
                  <div><span className="font-medium">起動者:</span> CMO</div>
                  <div><span className="font-medium">承認者:</span> CEO</div>
                  <div><span className="font-medium">頻度:</span> T1 monthly / T2 quarterly</div>
                  <div><span className="font-medium">対象:</span> biz/02-themes/</div>
                  <div><span className="font-medium">スキル:</span> hvd-biz-cycle</div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-700 mb-3">CQRS 三責務分離（ADR-0009）</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">経路</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">何を使う</th>
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">何を使わない</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["画面 Read", "Kysely + zod（lib/db/queries/**）", "Cortex Analyst の埋め込み"],
                    ["AI Read", "Semantic View（cortex_analyst_text_to_sql）", "Hybrid Table の直 SELECT"],
                    ["Write（画面・AI）", "Action SP（CALL ACTION_<NAME>(...)）", "Kysely DML 直書き"],
                  ].map(([path, use, avoid]) => (
                    <tr key={path} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-3 py-2 font-medium text-gray-700">{path}</td>
                      <td className="border border-gray-200 px-3 py-2 text-green-700">{use}</td>
                      <td className="border border-gray-200 px-3 py-2 text-red-600">{avoid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* CADRE 組織 */}
      {tab === "agents" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-2">CADRE — フラット 8体組織</h3>
            <p className="text-xs text-gray-500 mb-4">Coordinated Agentic Development Role Engine。各エージェントに DRI（意思決定責任者）と拒否権（Veto）を割り当て、人間のマネジメント組織を AI で再現する。</p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { name: "CEO", icon: "👑", color: "bg-blue-50 border-blue-200 text-blue-700", role: "最終意思決定", desc: "全体統括・subagent dispatch・ユーザへの最終報告。デフォルト応答 agent。" },
                { name: "COO", icon: "📋", color: "bg-cyan-50 border-cyan-200 text-cyan-700", role: "実行管理", desc: "dev cycle の進行管理・スケジュール・リソース調整。" },
                { name: "CTO", icon: "🏗️", color: "bg-green-50 border-green-200 text-green-700", role: "技術設計", desc: "design.yaml の技術仕様・アーキテクチャ・実装方針の意思決定 DRI。" },
                { name: "CFO-CRO", icon: "🛡️", color: "bg-orange-50 border-orange-200 text-orange-700", role: "品質・コスト管理", desc: "品質ゲート承認（G2-3 / G3-1）・FinOps・リスク管理・セキュリティ監査。" },
                { name: "CMO", icon: "📊", color: "bg-purple-50 border-purple-200 text-purple-700", role: "事業戦略", desc: "biz cycle 起案・テーマポートフォリオ管理・顧客価値の定義。" },
                { name: "CAIO", icon: "🧠", color: "bg-pink-50 border-pink-200 text-pink-700", role: "AI 戦略", desc: "Cortex Agent 設計・AI 品質評価・LLM 選定・AI 倫理レビュー。" },
                { name: "Worker A", icon: "⚙️", color: "bg-yellow-50 border-yellow-200 text-yellow-700", role: "バックエンド実装", desc: "dbt / Snowflake / Action SP の実装担当。CTO 指示のもとで動作。" },
                { name: "Worker B", icon: "🖥️", color: "bg-gray-50 border-gray-200 text-gray-600", role: "フロントエンド実装", desc: "Next.js / shadcn/ui の実装担当。CTO 指示のもとで動作。" },
              ].map((agent) => (
                <div key={agent.name} className={`rounded-xl border p-3 ${agent.color.split(" ").slice(0, 2).join(" ")}`}>
                  <div className="text-xl mb-1">{agent.icon}</div>
                  <div className={`font-bold text-sm ${agent.color.split(" ")[2]}`}>{agent.name}</div>
                  <div className="text-xs text-gray-500 mb-2">{agent.role}</div>
                  <div className="text-xs text-gray-600 leading-relaxed">{agent.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-700 mb-3">Agent 間通信（ADR-0018）</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4 text-xs">
                {[
                  { label: "設計仕様", medium: "design.yaml", note: "書込 DRI が単独所有" },
                  { label: "進捗 / Gate 承認", medium: "progress.yaml", note: "gates[].approvals[] が SSOT" },
                  { label: "揮発的な依頼・通知", medium: ".hvd/messages/<ts>-<from>-to-<to>.jsonl", note: "append-only JSONL" },
                  { label: "Phase 境界 handoff", medium: ".hvd/handoff/phaseN-to-phaseN+1.md", note: "Phase 境界専用" },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-lg p-3 border border-gray-100">
                    <div className="font-semibold text-gray-700 mb-1">{item.label}</div>
                    <code className="text-blue-600 block mb-1">{item.medium}</code>
                    <div className="text-gray-500">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* スキル体系 */}
      {tab === "skills" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">7 カテゴリ × 55 スキル</h3>
            <div className="space-y-3">
              {[
                {
                  category: "design",
                  icon: "📐",
                  count: 13,
                  color: "bg-blue-50 border-blue-200 text-blue-700",
                  desc: "design.yaml 書込みスキル群。md-scope（起動）/ md-analysis / md-data / md-ui / md-capabilities 等。",
                  examples: ["md-scope", "md-analysis", "md-data", "md-ui", "md-capabilities", "md-branding"],
                },
                {
                  category: "implement",
                  icon: "🔨",
                  count: 14,
                  color: "bg-green-50 border-green-200 text-green-700",
                  desc: "ファイル生成スキル群。sf-deploy-backend / vc-ui-build / iac-project-base 等。",
                  examples: ["sf-deploy-backend", "vc-ui-build", "iac-project-base", "sf-dbt-init", "sf-deploy-agent"],
                },
                {
                  category: "verify",
                  icon: "✅",
                  count: 7,
                  color: "bg-purple-50 border-purple-200 text-purple-700",
                  desc: "検証・QA スキル群。hvd-verify / hvd-verify-design / hvd-verify-crud 等。",
                  examples: ["hvd-verify", "hvd-verify-design", "hvd-verify-crud", "hvd-verify-skill-ssot"],
                },
                {
                  category: "manage",
                  icon: "📋",
                  count: 7,
                  color: "bg-orange-50 border-orange-200 text-orange-700",
                  desc: "管理・横断スキル群。hvd-dev-cycle / hvd-biz-cycle / hvd-adr / hvd-pmo 等。",
                  examples: ["hvd-dev-cycle", "hvd-biz-cycle", "hvd-adr", "hvd-pmo"],
                },
                {
                  category: "operate",
                  icon: "🔧",
                  count: 8,
                  color: "bg-yellow-50 border-yellow-200 text-yellow-700",
                  desc: "運用スキル群。sf-finops / sf-ops-monitor / sf-incident 等。",
                  examples: ["sf-finops", "sf-ops-monitor", "sf-incident"],
                },
                {
                  category: "document",
                  icon: "📄",
                  count: 1,
                  color: "bg-gray-50 border-gray-200 text-gray-600",
                  desc: "文書生成スキル。hvd-design-doc が design.yaml から doc/ を自動生成する。",
                  examples: ["hvd-design-doc"],
                },
                {
                  category: "specialist",
                  icon: "🎯",
                  count: 5,
                  color: "bg-pink-50 border-pink-200 text-pink-700",
                  desc: "ドメイン特化スキル。cortex-search-specialist / sf-stage-deploy / vc-chat 等。",
                  examples: ["cortex-search-specialist", "sf-stage-deploy", "vc-chat"],
                },
              ].map((item) => (
                <div key={item.category} className={`rounded-xl border p-4 ${item.color.split(" ").slice(0, 2).join(" ")}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className={`font-bold text-sm ${item.color.split(" ")[2]}`}>{item.category}/</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${item.color}`}>{item.count} スキル</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">{item.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.examples.map((ex) => (
                      <code key={ex} className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-500">{ex}</code>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-700 mb-3">YAML-Anchored SSOT パターン（ADR-0073）</h3>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-gray-600 leading-relaxed">
              各スキルは <code className="bg-white px-1 rounded text-amber-700">skill.unit.yaml</code>（事実の正本）と
              <code className="bg-white px-1 rounded text-amber-700 mx-1">SKILL.md</code>（人間向け narrative）の 2 ファイル構成。
              ADR-0086 で派生 HTML は廃止済み。スキル閲覧は GitHub Markdown または
              <code className="bg-white px-1 rounded text-amber-700 mx-1">.claude/framework/skill-index.md</code> を使う。
            </div>
          </section>
        </div>
      )}

      {/* 品質ゲート */}
      {tab === "rules" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">品質ゲート基盤（4層防御）</h3>
            <div className="space-y-3">
              {[
                {
                  layer: "Hooks",
                  icon: "🪝",
                  color: "bg-red-50 border-red-200 text-red-700",
                  items: [
                    { name: "validate-secrets.sh", desc: "Write/Edit 後に JWT・API キー・PAT のハードコードを検出して警告" },
                    { name: "validate-prj-dir.sh", desc: "PRJ_DIR 外へのファイル書込みを exit 1 でブロック（プロジェクト越境防止）" },
                    { name: "validate-design-yaml.sh", desc: "design.yaml 編集後に YAML パース + 必須セクション存在を検証" },
                    { name: "validate-doc-edit.sh", desc: "doc/**（自動生成物）への直接編集を警告" },
                  ],
                },
                {
                  layer: "Rules（18個）",
                  icon: "📏",
                  color: "bg-orange-50 border-orange-200 text-orange-700",
                  items: [
                    { name: "dbt-models.md", desc: "dbt models の命名・env_var 参照・ディレクトリ配置規約" },
                    { name: "cortex-agent-tools.md", desc: "Cortex Agent ツール構成・禁止パターン・DDL 既知の罠 6点" },
                    { name: "no-fixed-cost-objects.md", desc: "Cortex Search Service / CRON Task の全面禁止（ADR-0015 / ADR-0023）" },
                    { name: "data-layer-responsibility.md", desc: "raw→staging→mart→hybrid の依存方向・stg→HT 直接禁止" },
                  ],
                },
                {
                  layer: "Scripts（検証）",
                  icon: "🔬",
                  color: "bg-green-50 border-green-200 text-green-700",
                  items: [
                    { name: "verify_skill_ssot.py", desc: "スキル SSOT 検証（S1–S14）。unit.yaml と SKILL.md の整合性確認。" },
                    { name: "verify_design_foundation.py", desc: "design.yaml の foundation.snowflake SSOT 検証（F1–F9）" },
                    { name: "verify_feature_traceability.py", desc: "features トレーサビリティ検証（F0–F12 / ADR-0085）" },
                    { name: "lint_fixed_cost_objects.py", desc: "Cortex Search / CRON Task の混入検出（🔴 CI fail）" },
                  ],
                },
                {
                  layer: "CI（GitHub Actions）",
                  icon: "⚙️",
                  color: "bg-blue-50 border-blue-200 text-blue-700",
                  items: [
                    { name: "skill-validate.yml", desc: ".claude/ 変更を検知してスキル検証を実行" },
                    { name: "lint-summary.md", desc: "gh-aw ワークフローが Copilot で PR コメントを生成" },
                  ],
                },
              ].map((section) => (
                <div key={section.layer} className={`rounded-xl border p-4 ${section.color.split(" ").slice(0, 2).join(" ")}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span>{section.icon}</span>
                    <span className={`font-bold text-sm ${section.color.split(" ")[2]}`}>{section.layer}</span>
                  </div>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <div key={item.name} className="bg-white rounded-lg p-2 border border-gray-100 flex gap-2">
                        <code className="text-xs font-bold text-gray-700 min-w-[200px]">{item.name}</code>
                        <span className="text-xs text-gray-500">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-700 mb-3">無効化環境変数</h3>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-gray-300 leading-relaxed">
              {[
                ["HVD_VALIDATE_DISABLE=1", "全 validation hook 無効化"],
                ["HVD_VALIDATE_SECRETS_DISABLE=1", "validate-secrets だけ無効化"],
                ["HVD_COMPACT_DISABLE=1", "pre/post-compact.sh 無効化"],
                ["HVD_STATUSLINE=off", "statusline.sh 無効化"],
              ].map(([env, desc]) => (
                <div key={env} className="flex gap-4">
                  <span className="text-green-400">export {env}</span>
                  <span className="text-gray-500">  # {desc}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* 使い方 */}
      {tab === "usage" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">新規プロジェクト開始手順</h3>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  title: "環境設定",
                  desc: "リポジトリルートの .env に Snowflake 接続情報を設定する。プロジェクト個別の .env は作成しない。",
                  code: ". .\\load-env.ps1   # PowerShell: 環境変数ロード",
                  color: "border-blue-200 bg-blue-50",
                  numColor: "bg-blue-600",
                },
                {
                  step: "2",
                  title: "プロジェクトディレクトリ作成",
                  desc: "projects/<name>/ を作成して .env の DATABASE / SCHEMA を設定する。",
                  code: "mkdir projects/<name>\n# PRJ_DIR は自動判別（design.yaml + dbt/ or web/ の存在で確定）",
                  color: "border-cyan-200 bg-cyan-50",
                  numColor: "bg-cyan-600",
                },
                {
                  step: "3",
                  title: "md-scope でプロジェクト起動",
                  desc: "CEO が R1a で md-scope を実行。design.yaml の purpose / ai_strategy / personas を初期生成する。",
                  code: "# Claude Code で実行\n/skill md-scope",
                  color: "border-green-200 bg-green-50",
                  numColor: "bg-green-600",
                },
                {
                  step: "4",
                  title: "hvd-dev-cycle で R1-R6 を進める",
                  desc: "dev cycle orchestrator が R1〜R6 の各ステップを進行する。各 Gate で CFO-CRO が承認。",
                  code: "/skill hvd-dev-cycle",
                  color: "border-orange-200 bg-orange-50",
                  numColor: "bg-orange-600",
                },
                {
                  step: "5",
                  title: "dbt build → スモークテスト",
                  desc: "実装完了後に dbt build でモデルをデプロイし、smoke_test.py で動作確認する。",
                  code: "cd projects/<name>/dbt && dbt build\ncd .. && python tests/_smoke_test.py",
                  color: "border-purple-200 bg-purple-50",
                  numColor: "bg-purple-600",
                },
              ].map((item) => (
                <div key={item.step} className={`rounded-xl border p-4 ${item.color}`}>
                  <div className="flex items-start gap-3">
                    <span className={`${item.numColor} text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      {item.step}
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-700 mb-1">{item.title}</div>
                      <div className="text-xs text-gray-600 mb-2">{item.desc}</div>
                      <pre className="bg-gray-900 text-gray-300 text-xs rounded-lg p-3 overflow-x-auto leading-relaxed">{item.code}</pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-700 mb-3">主要 dbt コマンド</h3>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-gray-300 leading-relaxed space-y-1">
              {[
                ["dbt build", "ビルド・テスト一括"],
                ["dbt run-operation deploy_action_<name>", "Action SP のデプロイ"],
                ["dbt run-operation deploy_agent_<decision>", "Cortex Agent のデプロイ"],
                ["dbt run-operation load_hybrid_tables", "Hybrid Table 初期データ投入"],
                ["python scripts/sf_sql.py query --query '...'", "Snowflake 直接クエリ"],
              ].map(([cmd, desc]) => (
                <div key={cmd} className="flex gap-3 flex-wrap">
                  <span className="text-green-400">{cmd}</span>
                  <span className="text-gray-500">  # {desc}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
