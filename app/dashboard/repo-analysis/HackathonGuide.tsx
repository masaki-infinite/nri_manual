"use client";

import { useState } from "react";

type Tab = "arch" | "layers" | "adr" | "roles" | "playbook" | "structure";

export default function HackathonGuide() {
  const [tab, setTab] = useState<Tab>("arch");

  const tabs: { id: Tab; label: string }[] = [
    { id: "arch", label: "🏗️ 構成図" },
    { id: "layers", label: "🔢 5層アーキテクチャ" },
    { id: "adr", label: "📜 ADR" },
    { id: "roles", label: "👥 役割分担" },
    { id: "playbook", label: "📋 手順書" },
    { id: "structure", label: "📁 リポジトリ構成" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          🏆 hackathon-lib-check
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Java レガシーアプリ モダナイゼーション ハッカソンフレームワーク
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
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 構成図 */}
      {tab === "arch" && (
        <div className="space-y-8">
          {/* 技術スタック */}
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">技術スタック（As-Is → To-Be）</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-xl border border-red-200 p-4">
                <div className="text-sm font-bold text-red-700 mb-3 flex items-center gap-1">
                  As-Is（現在）
                </div>
                <div className="space-y-2">
                  {[
                    { label: "ブラウザ", color: "bg-gray-200 text-gray-700" },
                    { label: "Apache Tomcat 9（WAR）", color: "bg-gray-200 text-gray-700" },
                    { label: "Struts 1.3.10（EOL 2013）", color: "bg-red-200 text-red-800" },
                    { label: "Hibernate 5.6（javax）", color: "bg-orange-200 text-orange-800" },
                    { label: "Java 17（アップグレード済み）", color: "bg-green-200 text-green-800" },
                    { label: "MySQL 8.0（docker-compose）", color: "bg-gray-200 text-gray-700" },
                  ].map((item, i) => (
                    <div key={i} className={`text-xs px-3 py-1.5 rounded-lg font-medium text-center ${item.color}`}>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
                <div className="text-sm font-bold text-blue-700 mb-3 flex items-center gap-1">
                  To-Be（移行目標）
                </div>
                <div className="space-y-2">
                  {[
                    { label: "ブラウザ", color: "bg-gray-200 text-gray-700" },
                    { label: "Azure Container Apps", color: "bg-blue-200 text-blue-800" },
                    { label: "Spring Boot 3.x（Jakarta EE）", color: "bg-green-200 text-green-800" },
                    { label: "JPA / Hibernate 6.x（jakarta）", color: "bg-green-200 text-green-800" },
                    { label: "Java 17+", color: "bg-green-200 text-green-800" },
                    { label: "Azure Database for MySQL", color: "bg-blue-200 text-blue-800" },
                  ].map((item, i) => (
                    <div key={i} className={`text-xs px-3 py-1.5 rounded-lg font-medium text-center ${item.color}`}>
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center text-gray-400 text-sm mt-2">移行</div>
          </section>

          {/* Agent 協調モデル */}
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">AI Agent 協調モデル（5層アーキテクチャ）</h3>
            <div className="space-y-3">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-2">5 実行手段層 — Skills</div>
                <div className="text-xs text-gray-600">skills/*.md（14本）Agent がタスクに応じて動的選択</div>
              </div>
              <div className="flex justify-center text-gray-400">↓</div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">4 実行責任層 — Agents（5体）</div>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { name: "analyst", icon: "🔍", desc: "分析・計画" },
                    { name: "modernizer", icon: "⚙️", desc: "コード改善" },
                    { name: "database", icon: "🗄️", desc: "環境・DB" },
                    { name: "validator", icon: "✅", desc: "品質保証" },
                    { name: "drift-fixer", icon: "🔧", desc: "乖離修正" },
                  ].map((agent) => (
                    <div key={agent.name} className="bg-white rounded-lg px-2 py-2 border border-green-100 text-center">
                      <div className="text-xl">{agent.icon}</div>
                      <div className="text-xs font-bold text-gray-700 mt-1">{agent.name}</div>
                      <div className="text-xs text-gray-500">{agent.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center text-gray-400">↓</div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">3 基本動作層 — Instruction.md</div>
                <div className="text-sm text-blue-800 bg-white rounded-lg px-3 py-2 border border-blue-100 text-xs text-gray-600">
                  .github/copilot-instructions.md（全Agent共通） + .github/copilot/instructions/*.instructions.md（タスク別）
                </div>
              </div>
              <div className="flex justify-center text-gray-400">↓</div>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <div className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-2">2 暗黙知層 — ADR</div>
                <div className="text-xs text-gray-600">design/architect.md（唯一の真実）+ design/adr/（設計判断の履歴）</div>
              </div>
              <div className="flex justify-center text-gray-400">↓</div>
              <div className="bg-gray-50 border border-gray-300 rounded-xl p-4">
                <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">1 実行基盤層 — Agentic-workflow</div>
                <div className="text-xs text-gray-600">.github/workflows/（GitHub Actions CI/CD）+ docker-compose.yml（ローカル環境）</div>
              </div>
            </div>
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-yellow-800">
              <strong>architect.md の扱いルール：</strong> drift-fixer だけが修正可能。他の4 Agent は変更禁止（コンフリクト防止）
            </div>
          </section>

          {/* CI/CDパイプライン */}
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">CI/CD パイプライン</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">PR チェック（自動）</div>
                <div className="space-y-2">
                  {[
                    { icon: "🔍", name: "architecture-drift-check", desc: "architect.md vs 実構成（C-01〜C-10）" },
                    { icon: "🔒", name: "codeql-analysis", desc: "Java コードのセキュリティスキャン" },
                    { icon: "📦", name: "dependency-review", desc: "新規依存関係の CVE チェック" },
                  ].map((w) => (
                    <div key={w.name} className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                      <div className="text-xs font-medium text-gray-700">{w.icon} {w.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{w.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">デプロイ（main push）</div>
                <div className="space-y-2">
                  {[
                    { step: 1, label: "JDK 17 セットアップ" },
                    { step: 2, label: "mvn test（ビルド・テスト）" },
                    { step: 3, label: "Docker ビルド（git sha + latest）" },
                    { step: 4, label: "ACR に push" },
                    { step: 5, label: "Container App 更新（リトライ5回）" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-1.5 border border-blue-100">
                      <span className="w-5 h-5 bg-blue-500 text-white rounded-full text-xs flex items-center justify-center font-bold flex-shrink-0">{s.step}</span>
                      <span className="text-xs text-blue-800">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Azure インフラ */}
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">Azure インフラ構成（japaneast）</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="text-xs font-bold text-blue-700 mb-3">Resource Group（prefix-rg）</div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "📦", name: "Azure Container Registry", file: "acr.bicep", desc: "Docker イメージ保管" },
                  { icon: "🚀", name: "Container Apps", file: "container-app.bicep", desc: "Java WAR 実行（ポート 8080）" },
                  { icon: "🌐", name: "Container Environment", file: "container-env.bicep", desc: "CA の実行環境" },
                  { icon: "📊", name: "Log Analytics Workspace", file: "loganalytics.bicep", desc: "ログ収集・監視" },
                  { icon: "🗄️", name: "Azure DB for MySQL", file: "mysql.bicep", desc: "マネージド DB" },
                ].map((r) => (
                  <div key={r.name} className="bg-white rounded-lg px-3 py-2 border border-blue-100">
                    <div className="text-sm">{r.icon}</div>
                    <div className="text-xs font-semibold text-gray-700">{r.name}</div>
                    <div className="text-xs text-gray-400"><code>{r.file}</code></div>
                    <div className="text-xs text-gray-500 mt-0.5">{r.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* セキュリティ状況 */}
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">セキュリティ状況</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs font-semibold text-green-700 mb-2">対応済み</div>
                <div className="space-y-1.5">
                  {[
                    "CVE-2021-44228 Log4j RCE → Logback 移行",
                    "CVE-2022-23307 Log4j RCE → Logback 移行",
                    "CVE-2025-48734 commons-beanutils → 1.11.0",
                  ].map((s) => (
                    <div key={s} className="bg-green-50 border border-green-200 rounded px-2 py-1.5 text-xs text-green-800">{s}</div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-red-700 mb-2">未対応 Critical</div>
                <div className="space-y-1.5">
                  {[
                    "S-02 Struts 1.x EOL 2013 → Spring Boot 移行必要",
                    "S-03 DB 認証情報 hibernate.cfg.xml にハードコード",
                    "S-04 認証フィルター無効化（web.xml で disabled）",
                    "S-05 管理 JSP 公開（db-admin.jsp 等）",
                  ].map((s) => (
                    <div key={s} className="bg-red-50 border border-red-200 rounded px-2 py-1.5 text-xs text-red-800">{s}</div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-orange-700 mb-2">High リスク</div>
                <div className="space-y-1.5">
                  {[
                    "A-02 hbm2ddl.auto=update 本番で列削除インシデントあり（BOOK-490）",
                    "A-04 JUnit テスト 0 件（テスト未整備）",
                  ].map((s) => (
                    <div key={s} className="bg-orange-50 border border-orange-200 rounded px-2 py-1.5 text-xs text-orange-800">{s}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 5層アーキテクチャ */}
      {tab === "layers" && (
        <div className="space-y-8">

          {/* 出典バナー */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 flex items-start gap-3">
            <span className="text-lg flex-shrink-0">📐</span>
            <div>
              <strong>出典：</strong>
              <code className="text-xs bg-gray-200 px-1 py-0.5 rounded mx-1">agentic_workflow_5layer_architecture.svg</code>
              （Agentic Workflow 5層アーキテクチャ）が定義するモデル。
              hackathon-lib-check はこの5層で構成されています。
              ※ ADR-001 が「3レイヤー Copilot カスタマイズ」と呼んでいるのは③〜④層のカスタマイズファイル部分を指します。
            </div>
          </div>

          {/* 5層スタック図 */}
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">5層アーキテクチャ全体像</h3>
            <p className="text-xs text-gray-500 mb-4">
              上の層（⑤）ほど具体的・動的（タスクごとに変わる）、下の層（①）ほど抽象的・静的（プロジェクト全体を支える基盤）。
            </p>
            <div className="space-y-2">
              {[
                {
                  num: "5",
                  layer: "実行手段層",
                  keyword: "Skills",
                  tagline: "エージェントが用いる具体的な技能と道具",
                  detail: "Agent がタスク実行時に動的に選択・参照する手順書ライブラリ（14本）。SKILL-INDEX.md で索引管理し、最大 2〜3 個を同時参照（4個以上は精度低下のため制限）。各スキルは独立した手順書で、複数の Agent が共有できる。",
                  files: ["skills/ANALYZE-LEGACY.md", "skills/REFACTOR-CODE.md", "skills/CONTAINERIZE.md", "skills/ADD-TESTS.md", "…計14本"],
                  bg: "bg-orange-50", border: "border-orange-300", titleColor: "text-orange-900", badge: "bg-orange-500",
                },
                {
                  num: "4",
                  layer: "実行責任層",
                  keyword: "Agents",
                  tagline: "分析・計画 / 環境構築 / 品質担保 / 整合性",
                  detail: "役割ごとに分離された5体の Agent 定義ファイル。各 Agent は担当スキル・実行ステップ・権限制約を持つ。重要な制約：architect.md を変更できるのは drift-fixer だけ。これにより複数 Agent が並列に動いてもコンフリクトが起きない。",
                  files: [".github/agents/analyst.md", ".github/agents/modernizer.md", ".github/agents/database.md", ".github/agents/validator.md", ".github/agents/drift-fixer.md"],
                  bg: "bg-green-50", border: "border-green-300", titleColor: "text-green-900", badge: "bg-green-600",
                },
                {
                  num: "3",
                  layer: "基本動作層",
                  keyword: "Instruction.md",
                  tagline: "エージェント共通の行動規範と禁止事項",
                  detail: "全 Agent に共通で適用される横断ルール（L1）と、タスク種別ごとの詳細手順（L2）。ADR-001 で「3レイヤー Copilot カスタマイズ」と呼んでいる部分の L1・L2 はこの層、L3（Agent 定義）は④層に対応する。",
                  files: [".github/copilot-instructions.md（L1: 全Agent共通）", ".github/copilot/instructions/design.instructions.md（L2: 設計修正タスク）"],
                  bg: "bg-blue-50", border: "border-blue-300", titleColor: "text-blue-900", badge: "bg-blue-600",
                },
                {
                  num: "2",
                  layer: "暗黙知層",
                  keyword: "ADR",
                  tagline: "設計判断と意思決定の履歴を形式知化",
                  detail: "Architecture Decision Records。「なぜこの設計にしたか」の判断根拠を記録し、Agent が設計変更の文脈を理解できるようにする。architect.md（唯一の真実の源）もこの層に含まれ、drift-check がコードとの整合性を自動チェックする。",
                  files: ["design/architect.md（唯一の正規アーキテクチャ定義）", "design/adr/001-copilot-customization-and-anti-drift.md", "design/adr/002-skill-quality-standards-and-phased-loading.md"],
                  bg: "bg-purple-50", border: "border-purple-300", titleColor: "text-purple-900", badge: "bg-purple-600",
                },
                {
                  num: "1",
                  layer: "実行基盤層",
                  keyword: "Agentic-workflow",
                  tagline: "エージェントが協調動作する実行環境",
                  detail: "Agent が動く CI/CD 基盤と実行環境。GitHub Actions が PR ごとに品質ゲート（drift-check / CodeQL / dependency-review）を自動実行し、main push でコンテナビルド・Azure デプロイまで一貫して動く。ローカルは docker-compose.yml で同等環境を再現。",
                  files: [".github/workflows/architecture-drift-check.yml", ".github/workflows/deploy-app.yml", ".github/workflows/codeql-analysis.yml", "docker-compose.yml（ローカル開発環境）"],
                  bg: "bg-gray-50", border: "border-gray-300", titleColor: "text-gray-900", badge: "bg-gray-600",
                },
              ].map((layer) => (
                <div key={layer.num} className={`${layer.bg} ${layer.border} border rounded-xl p-4`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`w-7 h-7 ${layer.badge} text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                      {layer.num}
                    </span>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className={`text-sm font-bold ${layer.titleColor}`}>{layer.layer}</span>
                      <span className="text-xs text-gray-400">—</span>
                      <code className="text-xs font-mono font-semibold text-gray-600">{layer.keyword}</code>
                    </div>
                    <span className="text-xs text-gray-500 italic hidden sm:block">{layer.tagline}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed mb-2 ml-10">{layer.detail}</p>
                  <div className="ml-10 flex flex-wrap gap-1.5">
                    {layer.files.map((f) => (
                      <code key={f} className="text-xs bg-white border border-gray-200 rounded px-1.5 py-0.5 text-gray-600">{f}</code>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ADR-001 との対応 */}
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">ADR-001「3レイヤー」と5層の対応</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 text-xs leading-relaxed mb-3">
                ADR-001 は Copilot カスタマイズファイルを L1/L2/L3 の3層と呼んでいますが、5層モデルでは②〜④層にまたがります。
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="text-left px-3 py-1.5 border border-blue-200 font-semibold text-blue-700">5層モデル</th>
                      <th className="text-left px-3 py-1.5 border border-blue-200 font-semibold text-blue-700">ADR-001 の呼称</th>
                      <th className="text-left px-3 py-1.5 border border-blue-200 font-semibold text-blue-700">ファイル</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { layer: "5 実行手段層", adr: "—（言及なし）", file: "skills/*.md" },
                      { layer: "4 実行責任層", adr: "L3: Agent 定義", file: ".github/agents/*.md" },
                      { layer: "3 基本動作層", adr: "L1: 横断指示 / L2: タスク別指示", file: "copilot-instructions.md / instructions/*.md" },
                      { layer: "2 暗黙知層", adr: "—（言及なし）", file: "design/adr/ + architect.md" },
                      { layer: "1 実行基盤層", adr: "—（言及なし）", file: ".github/workflows/ + docker-compose.yml" },
                    ].map((row) => (
                      <tr key={row.layer} className="border border-blue-200">
                        <td className="px-3 py-1.5 font-medium text-blue-800">{row.layer}</td>
                        <td className="px-3 py-1.5 text-gray-600">{row.adr}</td>
                        <td className="px-3 py-1.5"><code className="text-gray-600">{row.file}</code></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* なぜ層を分けるのか */}
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">なぜ層を分けるのか</h3>
            <div className="space-y-3">
              {[
                {
                  icon: "🔒",
                  title: "権限の明確化（④ Agent 層）",
                  desc: "「architect.md を変更できるのは drift-fixer だけ」を Agent 定義に書く。複数 Agent が並列に動いてもコンフリクトが起きない構造を層で保証する。",
                },
                {
                  icon: "♻️",
                  title: "再利用性（⑤ Skills 層）",
                  desc: "Skills 層の手順書は複数の Agent が共有できる。CAPTURE-BASELINE は validator が主に使うが、他の Agent も呼び出せる。",
                },
                {
                  icon: "📏",
                  title: "コンテキスト節約（⑤ Skills 層）",
                  desc: "Skills を load-on-demand にすることで Agent は必要なもの（最大 2〜3 個）だけ読み込む。全スキルを常時ロードすると精度が低下する。",
                },
                {
                  icon: "🧠",
                  title: "暗黙知の形式知化（② ADR 層）",
                  desc: "「なぜこの設計か」を ADR に記録することで、Agent が設計変更の文脈を理解して適切な判断ができる。architect.md と drift-check の組み合わせで設計との乖離を自動検出。",
                },
                {
                  icon: "🔄",
                  title: "陳腐化の防止（Issue スナップショット原則）",
                  desc: "Issue（① 実行基盤層のトリガー）にはゴール状態だけ書く。現状分析は Agent が実行時に最新コードを確認するため、他の PR がマージされても指示が陳腐化しない。",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 bg-gray-50 rounded-xl border border-gray-200 p-4">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-sm font-bold text-gray-800 mb-1">{item.title}</div>
                    <div className="text-xs text-gray-600 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      )}

      {/* ADR */}
      {tab === "adr" && (
        <div className="space-y-6">
          {/* ADRとは */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
            <h3 className="text-base font-bold text-purple-800 mb-2">ADR（Architecture Decision Records）とは</h3>
            <p className="text-sm text-purple-700 mb-3">
              設計上の重要な決定を記録する文書。「なぜそう決めたのか」の意思決定履歴を形式知として残し、後から参加したメンバーや Agent が判断根拠を追跡できるようにします。
            </p>
            <div className="grid grid-cols-3 gap-3 text-xs">
              {[
                { icon: "🎯", label: "コンテキスト", desc: "決定が必要になった背景・課題" },
                { icon: "✅", label: "決定", desc: "採用した設計・方針の内容" },
                { icon: "📊", label: "結果", desc: "ポジティブ・ネガティブ両面の影響" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-lg px-3 py-2 border border-purple-100 text-center">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="font-bold text-gray-700">{item.label}</div>
                  <div className="text-gray-500 mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ADR-001 */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">ADR-001</span>
              <h3 className="text-base font-bold text-gray-800">Copilot カスタマイズと Anti-Drift 戦略</h3>
              <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">提案</span>
            </div>

            <div className="space-y-4">
              {/* 課題 */}
              <div>
                <div className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2">解決した課題</div>
                <div className="space-y-1.5">
                  {[
                    "セマンティックコンフリクト: Git 上では衝突しないが論理的に矛盾する変更が同時マージされる",
                    "ドリフト（乖離）: architect.md と実際のコードベースが徐々に乖離していく",
                    "指示の陳腐化: Issue 起票時の現状分析が、他の PR マージにより無効になる",
                  ].map((p) => (
                    <div key={p} className="text-xs text-red-700 bg-red-50 rounded px-3 py-1.5 border border-red-100">{p}</div>
                  ))}
                </div>
              </div>

              {/* 3つの施策 */}
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">決定: 3つの施策</div>
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <div className="text-xs font-bold text-blue-800 mb-1">① Issue＝スナップショット原則</div>
                    <p className="text-xs text-blue-700">
                      Issue には「ゴール状態」のみを記述。現状分析は書かない。
                      Agent が作業開始時に自律的に最新コードを確認するため、陳腐化した指示による誤作業を防ぐ。
                    </p>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                    <div className="text-xs font-bold text-indigo-800 mb-1">② 3レイヤー Copilot カスタマイズ</div>
                    <table className="w-full text-xs mt-2">
                      <tbody>
                        {[
                          { layer: "L1 横断指示", file: "copilot-instructions.md", role: "全タスク共通の原則・規約" },
                          { layer: "L2 タスク別指示", file: "instructions/*.instructions.md", role: "タスク種別ごとの具体的手順" },
                          { layer: "L3 Agent 定義", file: "agents/*.md", role: "自動化 Agent の振る舞い定義" },
                        ].map((row) => (
                          <tr key={row.layer} className="border-b border-indigo-100 last:border-0">
                            <td className="py-1 pr-3 font-semibold text-indigo-700 whitespace-nowrap">{row.layer}</td>
                            <td className="py-1 pr-3 font-mono text-indigo-600">{row.file}</td>
                            <td className="py-1 text-indigo-700">{row.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                    <div className="text-xs font-bold text-green-800 mb-1">③ Architecture Drift Detection</div>
                    <p className="text-xs text-green-700">
                      <code className="bg-green-100 px-1 rounded">design/architect.md</code> をアーキテクチャの正規定義とし、
                      <code className="bg-green-100 px-1 rounded">tools/drift-check.sh</code> で実構成との差分を自動検出。
                      CI（PR ごと）で実行し、FAIL 時は drift-fixer Agent が修正 PR を自動生成。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ADR-002 */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">ADR-002</span>
              <h3 className="text-base font-bold text-gray-800">スキル品質基準と同時利用制限の導入</h3>
              <span className="ml-auto text-xs text-white bg-green-600 px-2 py-1 rounded">承認済み</span>
            </div>

            <div className="space-y-4">
              {/* SkillsBench */}
              <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                <div className="text-xs font-bold text-orange-700 mb-2">SkillsBench（2024）の知見: 同時参照スキル数と精度</div>
                <div className="flex gap-2">
                  {[
                    { count: "1個", delta: "+10.2pp", color: "bg-yellow-100 text-yellow-800" },
                    { count: "2〜3個", delta: "+18.6pp ★ピーク", color: "bg-green-100 text-green-800" },
                    { count: "4個以上", delta: "+5.9pp（低下）", color: "bg-red-100 text-red-800" },
                  ].map((row) => (
                    <div key={row.count} className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium text-center ${row.color}`}>
                      <div className="font-bold mb-0.5">{row.count}</div>
                      <div>{row.delta}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-orange-700 mt-2">→ 同時参照スキル数は <strong>最大3個</strong> に制限</p>
              </div>

              {/* スキル品質5原則 */}
              <div>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">スキル品質の5原則</div>
                <div className="space-y-1.5">
                  {[
                    { id: "P-1", title: "1スキル＝1責務", desc: "1ファイルが担う役割は1つに限定。複数の役割が混在する場合は分割する" },
                    { id: "P-2", title: "description がルーティングの命", desc: "動詞＋目的語の形式でそのスキルが「何をするスキルか」を一文で表現" },
                    { id: "P-3", title: "Compact 優先 — 60行以内", desc: "スキルファイルは60行以内を目標。超過する場合は責務の分割を検討" },
                    { id: "P-4", title: "手続き（how）を書け、答え（what）を書くな", desc: "「どう判断・行動するか」の手順を記述。特定の答えを埋め込まない" },
                    { id: "P-5", title: "検証可能な完了条件", desc: "「ファイルが存在すること」「テストが全件パスすること」など客観的な形式で" },
                  ].map((p) => (
                    <div key={p.id} className="flex gap-3 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                      <span className="flex-shrink-0 text-xs font-bold text-orange-600 w-8">{p.id}</span>
                      <div>
                        <span className="text-xs font-semibold text-gray-700">{p.title}</span>
                        <span className="text-xs text-gray-500 ml-2">{p.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* フェーズ別読み込み */}
              <div>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">フェーズ別読み込み戦略</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                    <div className="text-xs font-bold text-indigo-700 mb-1">Phase 1: load-always（常時）</div>
                    <div className="text-xs text-indigo-600 space-y-0.5">
                      <div>• SKILL-INDEX.md（最初に必ず参照）</div>
                      <div>• SKILL-AUTHORING.md（スキル作成時）</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="text-xs font-bold text-gray-700 mb-1">Phase 2: load-on-demand（必要時）</div>
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div>• タスクに関連する個別スキル</div>
                      <div>• <strong>最大 2〜3 個</strong>を選択して読み込む</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ADRを書くには */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-bold text-gray-800 mb-3">新しい ADR を書くには</h3>
            <pre className="bg-gray-900 text-green-300 rounded-lg p-4 text-xs overflow-x-auto">{`# ADR-XXX: タイトル

## 日付
YYYY-MM-DD

## ステータス
提案 / 承認済み / 完了 / 廃止

## コンテキスト
決定が必要になった背景・課題

## 決定
採用した決定内容

## 結果
### ポジティブ
- ...
### ネガティブ
- ...

## 参考
- 関連ドキュメントへのリンク`}</pre>
            <div className="mt-3 bg-yellow-50 rounded-lg p-3 border border-yellow-200 text-xs text-yellow-800">
              <strong>ルール：</strong> セキュリティに関わる変更は必ず ADR を作成すること（copilot-instructions.md §6 品質基準より）
            </div>
          </div>
        </div>
      )}

      {/* 役割分担 */}
      {tab === "roles" && (
        <div className="space-y-6">
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-sm text-indigo-800">
            <strong>基本原則：</strong>あなたは「作業者」ではなく「Agent のマネージャー」。
            Agent に Issue を振る → PR をレビュー → GO / 修正を判断する。
          </div>

          {/* チーム体制 */}
          <div>
            <h3 className="text-base font-bold text-gray-700 mb-3">チーム体制（5人）</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600 border border-gray-200">役割</th>
                    <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600 border border-gray-200">担当 Agent</th>
                    <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600 border border-gray-200">概要</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { role: "統括（リーダー）", agent: "—", desc: "Secrets 設定、レビュー、App Mod、コンフリクト解消" },
                    { role: "メンバーA", agent: "@analyst", desc: "分析・計画" },
                    { role: "メンバーB", agent: "@modernizer", desc: "コード改善" },
                    { role: "メンバーC", agent: "@database", desc: "環境・DB" },
                    { role: "メンバーD", agent: "@validator", desc: "品質保証" },
                  ].map((row) => (
                    <tr key={row.role} className="border border-gray-200">
                      <td className="px-3 py-2 text-xs text-gray-700">{row.role}</td>
                      <td className="px-3 py-2 text-xs font-mono text-indigo-700">{row.agent}</td>
                      <td className="px-3 py-2 text-xs text-gray-600">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 各 Agent の詳細 */}
          <div className="space-y-4">
            {[
              {
                name: "analyst",
                icon: "🔍",
                color: "blue",
                summary: "レガシーアプリを解析し architect.md と GitHub Issue を生成する",
                skills: ["ANALYZE-LEGACY", "MODERNIZE-PLAN", "TRIAGE-ISSUE"],
                steps: [
                  "ANALYZE-LEGACY でアプリ解析",
                  "design/architect.md を生成（初回のみ）",
                  "MODERNIZE-PLAN で移行計画作成",
                  "TRIAGE-ISSUE で Issue 群を生成",
                ],
                constraint: "architect.md の初回生成のみ可能。以降の更新は drift-fixer が担当",
              },
              {
                name: "modernizer",
                icon: "⚙️",
                color: "purple",
                summary: "コードリファクタリング・依存アップグレード・セキュリティ修正・コンテナ化",
                skills: ["REFACTOR-CODE", "UPGRADE-DEPENDENCIES", "FIX-SECURITY", "CONTAINERIZE"],
                steps: [
                  "Issue を取得",
                  "REFACTOR-CODE でコード改善",
                  "UPGRADE-DEPENDENCIES で依存更新",
                  "FIX-SECURITY でセキュリティ修正",
                  "CONTAINERIZE でコンテナ化",
                  "PR を作成",
                ],
                constraint: "architect.md は変更禁止。drift-check 失敗時は drift-fixer に委譲",
              },
              {
                name: "database",
                icon: "🗄️",
                color: "green",
                summary: "レガシーアプリ起動・MCP サーバーセットアップ・DB モダナイゼーション",
                skills: ["LAUNCH-LEGACY", "SETUP-MCP", "MODERNIZE-DATABASE"],
                steps: [
                  "LAUNCH-LEGACY でアプリ起動",
                  "SETUP-MCP で MCP サーバーセットアップ",
                  "MODERNIZE-DATABASE で DB 改善",
                  "PR を作成",
                ],
                constraint: "architect.md は変更禁止。drift-check 失敗時は drift-fixer に委譲",
              },
              {
                name: "validator",
                icon: "✅",
                color: "teal",
                summary: "ベースライン記録・移行検証・テスト追加による品質保証",
                skills: ["CAPTURE-BASELINE", "VERIFY-MIGRATION", "ADD-TESTS"],
                steps: [
                  "CAPTURE-BASELINE でベースライン記録",
                  "VERIFY-MIGRATION で随時検証",
                  "ADD-TESTS でテスト追加",
                  "最終チェック実行",
                ],
                constraint: "architect.md は変更禁止。アプリ起動後に開始すること",
              },
              {
                name: "drift-fixer",
                icon: "🔧",
                color: "red",
                summary: "drift-check.sh が検出したアーキテクチャ乖離を自動修正する唯一の Agent",
                skills: ["drift-check.sh（C-01〜C-10 チェック）"],
                steps: [
                  "drift-check.sh の FAIL を分析",
                  "現在のコード状態を確認",
                  "architect.md を修正",
                  "drift-check で再検証",
                  "PR を作成してマージ",
                ],
                constraint: "architect.md の修正権限を持つ唯一の Agent。他の Agent は一切変更禁止",
              },
            ].map((agent) => {
              const colorMap: Record<string, { bg: string; border: string; badge: string; badgeText: string }> = {
                blue: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-100", badgeText: "text-blue-700" },
                purple: { bg: "bg-purple-50", border: "border-purple-200", badge: "bg-purple-100", badgeText: "text-purple-700" },
                green: { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-100", badgeText: "text-green-700" },
                teal: { bg: "bg-teal-50", border: "border-teal-200", badge: "bg-teal-100", badgeText: "text-teal-700" },
                red: { bg: "bg-red-50", border: "border-red-200", badge: "bg-red-100", badgeText: "text-red-700" },
              };
              const c = colorMap[agent.color];
              return (
                <div key={agent.name} className={`${c.bg} ${c.border} border rounded-xl p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{agent.icon}</span>
                    <span className="font-bold text-gray-800 font-mono">@{agent.name}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{agent.summary}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-1.5">使用スキル</div>
                      <div className="flex flex-wrap gap-1">
                        {agent.skills.map((s) => (
                          <span key={s} className={`${c.badge} ${c.badgeText} text-xs px-2 py-0.5 rounded font-mono`}>{s}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-1.5">実行ステップ</div>
                      <ol className="space-y-0.5">
                        {agent.steps.map((step, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                            <span className={`${c.badge} ${c.badgeText} rounded-full w-4 h-4 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold`}>{i + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500 bg-white rounded px-2 py-1.5 border border-gray-200">
                    <strong>制約：</strong>{agent.constraint}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 判断ポイント */}
          <div>
            <h3 className="text-base font-bold text-gray-700 mb-3">判断ポイント</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-3 py-2 font-semibold text-gray-600 border border-gray-200">状況</th>
                    <th className="text-left px-3 py-2 font-semibold text-gray-600 border border-gray-200">対応</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { cond: "Azure がハマった", action: "CONTAINERIZE 手順1〜5で完了にする、後追いで対応" },
                    { cond: "Agent が詰まった", action: "Issue の指示を修正して再実行、または手動介入" },
                    { cond: "コンフリクトが起きた", action: "リーダーが解消" },
                    { cond: "drift-check が FAIL した", action: "drift-fixer に Issue を振る → 修正 PR マージ → 元 PR で Update branch" },
                    { cond: "初回 PR の Actions が動かない", action: "PR の Actions タブで「Approve and run」を押す（Bot からの初回 PR は承認が必要）" },
                    { cond: "architect.md を誰が修正？", action: "drift-fixer だけ。他の Agent（modernizer/validator/database）は変更禁止" },
                  ].map((row) => (
                    <tr key={row.cond} className="border border-gray-200">
                      <td className="px-3 py-2 text-gray-700 font-medium">{row.cond}</td>
                      <td className="px-3 py-2 text-gray-600">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 手順書 */}
      {tab === "playbook" && (
        <div className="space-y-6">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
            <strong>キーメッセージ：</strong>1回のプロンプトの質ではなく、Agent を並列で安全に回し続けるためのオーケストレーション基盤が差別化ポイント。
          </div>

          {/* タイムライン */}
          <div>
            <h3 className="text-base font-bold text-gray-700 mb-3">タイムライン</h3>
            <div className="space-y-3">
              {[
                {
                  phase: "Phase 0",
                  time: "09:00-09:30",
                  color: "gray",
                  title: "準備",
                  items: [
                    "オープニング・お題確認",
                    "リーダー: テンプレート投入 + GitHub Secrets 設定",
                    "deploy-infra.yml 手動実行（Azure プロビジョニング）",
                  ],
                },
                {
                  phase: "Phase 1a",
                  time: "09:30-09:40",
                  color: "blue",
                  title: "analyst 先行",
                  items: [
                    "メンバーA のみ: analyst に ANALYZE-LEGACY を実行",
                    "他3人はまだ待機（リポジトリ・スキルを読む）",
                    "architect.md ができるまで他の Agent は動かない",
                  ],
                },
                {
                  phase: "Phase 1b",
                  time: "09:40-09:50",
                  color: "green",
                  title: "architect.md 確定後に展開",
                  items: [
                    "メンバーC: database に LAUNCH-LEGACY を実行",
                    "メンバーD: validator は待機（アプリ起動待ち）",
                    "メンバーB: modernizer はまだ待機",
                  ],
                },
                {
                  phase: "Phase 2",
                  time: "09:50-10:00",
                  color: "purple",
                  title: "判断",
                  items: [
                    "リーダー: architect.md の App Mod 判定を確認",
                    "Java 確定 → App Mod ほぼ確実",
                    "Issue 群を4人に割り振る",
                  ],
                },
                {
                  phase: "Phase 3",
                  time: "10:00-15:00",
                  color: "indigo",
                  title: "並列開発",
                  items: [
                    "4人が各 Agent のマネージャーとして動く",
                    "Issue を Coding Agent に振る → PR レビュー → 再実行",
                    "validator が随時 VERIFY-MIGRATION で検証",
                    "drift-check FAIL → drift-fixer に Issue を振る",
                  ],
                },
                {
                  phase: "Phase 4",
                  time: "15:00-15:30",
                  color: "orange",
                  title: "最終検証",
                  items: [
                    "VERIFY-MIGRATION 最終実行",
                    "Azure 上で動作確認",
                  ],
                },
                {
                  phase: "Phase 5",
                  time: "15:30-16:00",
                  color: "red",
                  title: "プレゼン準備",
                  items: [
                    "発表資料作成",
                    "16:00 までに資料アップロード",
                  ],
                },
              ].map((phase) => {
                const colorMap: Record<string, { dot: string; bg: string; border: string; phaseTag: string }> = {
                  gray: { dot: "bg-gray-400", bg: "bg-gray-50", border: "border-gray-200", phaseTag: "bg-gray-200 text-gray-700" },
                  blue: { dot: "bg-blue-500", bg: "bg-blue-50", border: "border-blue-200", phaseTag: "bg-blue-500 text-white" },
                  green: { dot: "bg-green-500", bg: "bg-green-50", border: "border-green-200", phaseTag: "bg-green-500 text-white" },
                  purple: { dot: "bg-purple-500", bg: "bg-purple-50", border: "border-purple-200", phaseTag: "bg-purple-500 text-white" },
                  indigo: { dot: "bg-indigo-500", bg: "bg-indigo-50", border: "border-indigo-200", phaseTag: "bg-indigo-500 text-white" },
                  orange: { dot: "bg-orange-500", bg: "bg-orange-50", border: "border-orange-200", phaseTag: "bg-orange-500 text-white" },
                  red: { dot: "bg-red-500", bg: "bg-red-50", border: "border-red-200", phaseTag: "bg-red-500 text-white" },
                };
                const c = colorMap[phase.color];
                return (
                  <div key={phase.phase} className={`${c.bg} ${c.border} border rounded-xl p-4`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${c.phaseTag}`}>{phase.phase}</span>
                      <span className="text-sm font-bold text-gray-800">{phase.title}</span>
                      <span className="text-xs text-gray-500 ml-auto">{phase.time}</span>
                    </div>
                    <ul className="space-y-1">
                      {phase.items.map((item, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-gray-400 mt-0.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* プレゼン構成 */}
          <div>
            <h3 className="text-base font-bold text-gray-700 mb-3">プレゼン構成（10分）</h3>
            <div className="space-y-2">
              {[
                { time: "1分", content: "結果を先に見せる（デモ画面、PR 数、デプロイ済みアプリ）" },
                { time: "2分", content: "普通にやると何が起きるか（1人なら動く、5人同時だと壊れる）" },
                { time: "4分", content: "5層アーキテクチャの仕組み（実行基盤→暗黙知→基本動作→実行責任→実行手段）" },
                { time: "2分", content: "品質の証拠（drift-check 結果、DORA メトリクス、GHAS Security タブ）" },
                { time: "1分", content: "まとめ「コードだけでなく開発プロセス自体をモダナイズした」" },
              ].map((row) => (
                <div key={row.time} className="flex gap-3 items-start bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                  <span className="text-xs font-bold text-indigo-600 w-8 flex-shrink-0 mt-0.5">{row.time}</span>
                  <span className="text-xs text-gray-700">{row.content}</span>
                </div>
              ))}
            </div>
          </div>

          {/* テンプレート投入手順 */}
          <div>
            <h3 className="text-base font-bold text-gray-700 mb-3">テンプレート投入手順（リーダー）</h3>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-green-300 space-y-1 overflow-x-auto">
              <div className="text-gray-500"># 1. テンプレートをクローン</div>
              <div>git clone https://github.com/NRI-Oxalis/hackathon_lib.git /tmp/template</div>
              <div className="mt-2 text-gray-500"># 2. お題リポジトリをクローン</div>
              <div>{"git clone https://<主催者Enterprise>/<org>/<お題リポ>.git"}</div>
              <div>{"cd <お題リポ>"}</div>
              <div className="mt-2 text-gray-500"># 3. テンプレートをコピー（既存ファイルを上書きしない）</div>
              <div>cp -rn /tmp/template/.github .</div>
              <div>cp -rn /tmp/template/tools .</div>
              <div>cp -rn /tmp/template/design .</div>
              <div>cp -rn /tmp/template/infra .</div>
              <div>cp -rn /tmp/template/skills .</div>
              <div className="mt-2 text-gray-500"># 4. push</div>
              <div>{"git add -A && git commit -m \"hackathon_lib テンプレート投入\" && git push"}</div>
            </div>
          </div>
        </div>
      )}

      {/* リポジトリ構成 */}
      {tab === "structure" && (
        <div className="space-y-6">
          <div className="font-mono text-xs bg-gray-50 rounded-xl border border-gray-200 p-4 overflow-x-auto">
            <pre className="text-gray-700 leading-relaxed whitespace-pre">{`hackathon-lib-check/
│
├── 📋 ドキュメント（ルート）
│   ├── README.md              クイックスタート
│   ├── PLAYBOOK.md            ★ハッカソン当日の運用マニュアル
│   ├── AGENTS.md              Agent 体系の概要
│   ├── CLAUDE.md              Claude Code 向け指示
│   └── COMMANDS-QUICK-REF.md  コマンドクイックリファレンス
│
├── 🤖 .github/                AI Agent・CI/CD の制御層
│   ├── copilot-instructions.md    L1: 全 Agent 共通ルール
│   ├── copilot/instructions/      L2: タスク別詳細手順
│   ├── agents/                    L3: Agent 定義（5体）
│   │   ├── analyst.md
│   │   ├── modernizer.md
│   │   ├── database.md
│   │   ├── validator.md
│   │   └── drift-fixer.md
│   ├── ISSUE_TEMPLATE/
│   │   ├── agent-task.yml         Agent タスク依頼テンプレート
│   │   └── bug-report.yml         バグ報告テンプレート
│   └── workflows/                 GitHub Actions CI/CD（5本）
│       ├── architecture-drift-check.yml
│       ├── codeql-analysis.yml
│       ├── dependency-review.yml
│       ├── deploy-app.yml
│       └── deploy-infra.yml
│
├── 🏛️ design/                 アーキテクチャ定義（真実の源）
│   ├── architect.md           ★唯一の正規アーキテクチャ定義
│   ├── migration-analysis.md  現状分析レポート
│   └── adr/                   設計意思決定記録
│
├── 📚 skills/                 Agent が参照する手順書ライブラリ（16 本）
│   ├── SKILL-INDEX.md         索引（load-always）
│   └── *.md                   個別スキル（load-on-demand）
│
├── ☁️ infra/                  Azure インフラ定義（Bicep IaC）
│   ├── main.bicep             エントリーポイント
│   └── modules/               ACR / CA / 環境 / LogAnalytics / MySQL
│
├── 🔧 tools/                  自動化・検証スクリプト
│   ├── drift-check.sh         アーキテクチャドリフト検出
│   ├── capture-baseline.sh    旧アプリ動作ベースライン記録
│   └── verify-migration.sh    移行前後の動作比較
│
├── 🗄️ config/mysql/           ローカル DB 初期化 SQL
│   ├── 01-create-tables.sql   テーブル DDL（17 テーブル）
│   └── 02-seed-data.sql       テストデータ
│
└── ☕ src/main/                アプリ本体（Java）
    ├── java/.../bookstore/
    │   ├── action/            Struts Action（8 クラス）
    │   ├── model/             Hibernate エンティティ（17 クラス）
    │   ├── dao/               データアクセス層
    │   ├── manager/           ビジネスロジック層
    │   └── util/              ユーティリティ
    └── webapp/WEB-INF/
        ├── struts-config.xml
        └── jsp/               JSP テンプレート（View 層）`}</pre>
          </div>

          {/* キーファイル説明 */}
          <div>
            <h3 className="text-base font-bold text-gray-700 mb-3">キーファイルの役割</h3>
            <div className="space-y-2">
              {[
                { path: "design/architect.md", role: "★唯一の正規アーキテクチャ定義。drift-check がこれとコードを比較して乖離を検出。drift-fixer のみ修正可能", warning: true },
                { path: "PLAYBOOK.md", role: "ハッカソン当日の運用マニュアル。Phase 0〜5 のタイムライン・チーム体制・判断ポイントを定義", warning: false },
                { path: ".github/copilot-instructions.md", role: "L1 全 Agent 共通ルール。これが全ての Agent の基本行動指針", warning: false },
                { path: "skills/SKILL-INDEX.md", role: "スキルライブラリの索引。Agent はここを参照して必要なスキルを選ぶ（最大3個同時）", warning: false },
                { path: "tools/drift-check.sh", role: "C-01〜C-10 の 10 チェックを実行。FAIL → drift-fixer が architect.md を修正", warning: false },
                { path: "resources/hibernate.cfg.xml", role: "hbm2ddl.auto=update（本番で列削除インシデントあり）。DB 認証情報もハードコードされており要修正", warning: true },
                { path: "infra/main.bicep", role: "Azure インフラのエントリーポイント。5モジュール（ACR / CA / 環境 / Log / MySQL）を呼び出す", warning: false },
              ].map((f) => (
                <div key={f.path} className={`rounded-lg px-3 py-2 border text-xs ${f.warning ? "bg-orange-50 border-orange-200" : "bg-gray-50 border-gray-200"}`}>
                  <div className="font-mono font-semibold text-gray-700 mb-0.5">{f.path}</div>
                  <div className="text-gray-600">{f.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* スキル一覧 */}
          <div>
            <h3 className="text-base font-bold text-gray-700 mb-3">スキルライブラリ（14本）</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "ANALYZE-LEGACY", agent: "analyst", desc: "レガシーコード解析" },
                { name: "MODERNIZE-PLAN", agent: "analyst", desc: "モダナイズ計画作成" },
                { name: "TRIAGE-ISSUE", agent: "analyst", desc: "Issue 優先度付け" },
                { name: "REFACTOR-CODE", agent: "modernizer", desc: "コードリファクタリング" },
                { name: "UPGRADE-DEPENDENCIES", agent: "modernizer", desc: "依存ライブラリ更新" },
                { name: "FIX-SECURITY", agent: "modernizer", desc: "セキュリティ脆弱性修正" },
                { name: "CONTAINERIZE", agent: "modernizer", desc: "Docker コンテナ化" },
                { name: "LAUNCH-LEGACY", agent: "database", desc: "レガシーアプリ起動" },
                { name: "SETUP-MCP", agent: "database", desc: "MCP サーバーセットアップ" },
                { name: "MODERNIZE-DATABASE", agent: "database", desc: "DB モダナイゼーション" },
                { name: "CAPTURE-BASELINE", agent: "validator", desc: "動作ベースライン記録" },
                { name: "VERIFY-MIGRATION", agent: "validator", desc: "移行前後の動作比較" },
                { name: "ADD-TESTS", agent: "validator", desc: "JUnit テスト追加" },
              ].map((skill) => {
                const agentColor: Record<string, string> = {
                  analyst: "bg-blue-100 text-blue-700",
                  modernizer: "bg-purple-100 text-purple-700",
                  database: "bg-green-100 text-green-700",
                  validator: "bg-teal-100 text-teal-700",
                };
                return (
                  <div key={skill.name} className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-mono font-semibold text-gray-700">{skill.name}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${agentColor[skill.agent] || "bg-gray-200 text-gray-600"}`}>{skill.agent}</span>
                    </div>
                    <div className="text-xs text-gray-500">{skill.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
