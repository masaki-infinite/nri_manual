"use client";

import { useState } from "react";

type Tab = "overview" | "arch" | "agents" | "skills" | "ci" | "usage";

export default function AgenticGuide() {
  const [tab, setTab] = useState<Tab>("overview");

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "🧭 概要" },
    { id: "arch", label: "🏗️ 構成図" },
    { id: "agents", label: "🤖 Agent ロール" },
    { id: "skills", label: "📚 スキル" },
    { id: "ci", label: "⚙️ CI / ADR" },
    { id: "usage", label: "📋 使い方" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          🧭 agentic-dev-template
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          複数 AI Agent 協調開発フレームワーク — Anti-Drift CI × スキルライブラリ × 3層カスタマイズ
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
                ? "bg-indigo-600 text-white"
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
            <h3 className="text-base font-bold text-gray-700 mb-4">このテンプレートとは</h3>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
              <p className="text-sm text-gray-700 leading-relaxed">
                GitHub Copilot や Claude Code などの複数 AI を<strong>「役割を持った専門家」</strong>として機能させ、
                案件開発・社内開発・OSS 開発で品質を自動担保する汎用フレームワークテンプレート。
                <code className="bg-white px-1 rounded text-indigo-700 text-xs mx-1">design/architect.md</code>
                を Single Source of Truth として、Agent 間の設計乖離を CI で自動検出する。
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">主要な特徴</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: "🔒",
                  title: "Single Source of Truth",
                  desc: "design/architect.md が唯一の正規定義。Agent・開発者が同じ仕様を参照して設計乖離を防止する。",
                  color: "bg-blue-50 border-blue-200",
                  titleColor: "text-blue-700",
                },
                {
                  icon: "🚫",
                  title: "Issue＝スナップショット原則",
                  desc: "Issue にはゴール状態のみ記述。並列 PR 環境では現状分析が即座に陳腐化するため禁止。",
                  color: "bg-orange-50 border-orange-200",
                  titleColor: "text-orange-700",
                },
                {
                  icon: "⚙️",
                  title: "Anti-Drift CI",
                  desc: "PR ごとに drift-check.sh を実行し、architect.md と実構成の乖離を自動検出・通知する。",
                  color: "bg-green-50 border-green-200",
                  titleColor: "text-green-700",
                },
                {
                  icon: "📚",
                  title: "スキルライブラリ蓄積",
                  desc: "skills/ に手順書を積み上げることで Agent 精度を継続改善。SKILL-INDEX.md が常時読み込まれる。",
                  color: "bg-purple-50 border-purple-200",
                  titleColor: "text-purple-700",
                },
              ].map((item) => (
                <div key={item.title} className={`rounded-xl border p-4 ${item.color}`}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className={`font-bold text-sm mb-1 ${item.titleColor}`}>{item.title}</div>
                  <div className="text-xs text-gray-600 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-700 mb-3">hackathon-lib-check との関係</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600 leading-relaxed">
              hackathon-lib-check（Java モダナイゼーション実装例）のコア構造を<strong>プロジェクト非依存に抽象化</strong>したテンプレート。
              hackathon-lib-check は5体の専用 Agent（analyst / modernizer / database / validator / drift-fixer）を持つ具体実装であり、
              agentic-dev-template はその汎用版として4体構成（analyst / developer / reviewer / drift-fixer）に整理されている。
            </div>
          </section>
        </div>
      )}

      {/* 構成図 */}
      {tab === "arch" && (
        <div className="space-y-8">
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">3層 Copilot カスタマイズ構成</h3>
            <div className="space-y-3">
              {[
                {
                  layer: "L1",
                  title: "全体ルール層",
                  file: ".github/copilot-instructions.md",
                  desc: "全 Agent 共通ルール。SSOT・Issue 原則・スキル参照上限（最大3個）を宣言。",
                  color: "bg-red-50 border-red-200 text-red-700",
                },
                {
                  layer: "L2",
                  title: "タスク別指示層",
                  file: ".github/copilot/instructions/",
                  desc: "implementation.instructions.md / review.instructions.md — タスク種別ごとの詳細指示。",
                  color: "bg-orange-50 border-orange-200 text-orange-700",
                },
                {
                  layer: "L3",
                  title: "Agent 定義層",
                  file: ".github/agents/",
                  desc: "analyst.md / developer.md / reviewer.md / drift-fixer.md — 各 Agent の役割・権限・行動原則。",
                  color: "bg-green-50 border-green-200 text-green-700",
                },
              ].map((item) => (
                <div key={item.layer} className={`rounded-xl border p-4 ${item.color.split(" ").slice(0, 2).join(" ")}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${item.color}`}>{item.layer}</span>
                    <span className="font-bold text-sm text-gray-700">{item.title}</span>
                    <code className="text-xs bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-500 ml-auto">{item.file}</code>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">ディレクトリ構造</h3>
            <div className="bg-gray-900 rounded-xl p-5 font-mono text-xs text-gray-300 leading-relaxed">
              <div className="text-green-400 mb-2">agentic-dev-template/</div>
              {[
                ["├── README.md", ""],
                ["├── CLAUDE.md", "Claude Code 向け指示書"],
                ["├── WORKFLOW.md", "開発ワークフロー定義"],
                ["├── .github/", ""],
                ["│   ├── copilot-instructions.md", "L1: 全体ルール"],
                ["│   ├── copilot/instructions/", "L2: タスク別指示"],
                ["│   ├── agents/", "L3: Agent 定義 (4体)"],
                ["│   ├── workflows/", "CI 定義"],
                ["│   └── ISSUE_TEMPLATE/", "Issue テンプレート"],
                ["├── design/", ""],
                ["│   ├── architect.md", "★ SSOT — アーキテクチャ正本"],
                ["│   └── adr/", "意思決定記録"],
                ["├── skills/", "スキルライブラリ"],
                ["└── tools/", "補助ツール"],
              ].map(([code, comment], i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-gray-300">{code}</span>
                  {comment && <span className="text-gray-500 text-xs">← {comment}</span>}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Agent ロール */}
      {tab === "agents" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">4体の Agent 構成</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  name: "analyst",
                  icon: "🔍",
                  color: "bg-blue-50 border-blue-200",
                  titleColor: "text-blue-700",
                  badge: "bg-blue-100 text-blue-700",
                  role: "分析・計画",
                  desc: "Issue を分析して実装計画を立案する。design/architect.md の初回生成も担当。実装は行わない。",
                  canEdit: "architect.md（初回のみ）",
                  outputs: ["実装計画 Issue コメント", "architect.md 初期生成"],
                },
                {
                  name: "developer",
                  icon: "⚙️",
                  color: "bg-green-50 border-green-200",
                  titleColor: "text-green-700",
                  badge: "bg-green-100 text-green-700",
                  role: "実装",
                  desc: "analyst の計画に従ってコードを実装する。architect.md の編集権限はなく、実装のみに集中。",
                  canEdit: "src/ など実装ファイル",
                  outputs: ["実装 PR", "テストコード"],
                },
                {
                  name: "reviewer",
                  icon: "✅",
                  color: "bg-purple-50 border-purple-200",
                  titleColor: "text-purple-700",
                  badge: "bg-purple-100 text-purple-700",
                  role: "レビュー",
                  desc: "実装 PR を architect.md との整合性・コード品質の観点でレビューする。承認・修正指示を出す。",
                  canEdit: "PR コメントのみ",
                  outputs: ["PR レビューコメント", "承認 / 差し戻し"],
                },
                {
                  name: "drift-fixer",
                  icon: "🔧",
                  color: "bg-orange-50 border-orange-200",
                  titleColor: "text-orange-700",
                  badge: "bg-orange-100 text-orange-700",
                  role: "乖離修正",
                  desc: "Anti-Drift CI が検出した乖離を修正する。architect.md と実構成の差分を埋める専門 Agent。",
                  canEdit: "architect.md（修正） + 実装ファイル",
                  outputs: ["乖離修正 PR", "architect.md 更新"],
                },
              ].map((agent) => (
                <div key={agent.name} className={`rounded-xl border p-4 ${agent.color}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{agent.icon}</span>
                    <div>
                      <div className={`font-bold text-sm ${agent.titleColor}`}>{agent.name}</div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${agent.badge}`}>{agent.role}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">{agent.desc}</p>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">編集可能：</span>{agent.canEdit}
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">成果物：</span>{agent.outputs.join(" / ")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">権限マトリクス</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-600">Agent</th>
                    <th className="border border-gray-200 px-3 py-2 text-center font-semibold text-gray-600">architect.md</th>
                    <th className="border border-gray-200 px-3 py-2 text-center font-semibold text-gray-600">実装ファイル</th>
                    <th className="border border-gray-200 px-3 py-2 text-center font-semibold text-gray-600">PR 作成</th>
                    <th className="border border-gray-200 px-3 py-2 text-center font-semibold text-gray-600">PR 承認</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["analyst", "✅ 初回生成のみ", "❌", "❌", "❌"],
                    ["developer", "❌", "✅", "✅", "❌"],
                    ["reviewer", "❌", "❌", "❌", "✅"],
                    ["drift-fixer", "✅ 修正", "✅", "✅", "❌"],
                  ].map(([name, ...cells]) => (
                    <tr key={name} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-3 py-2 font-medium text-gray-700">{name}</td>
                      {cells.map((cell, i) => (
                        <td key={i} className="border border-gray-200 px-3 py-2 text-center text-gray-600">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* スキル */}
      {tab === "skills" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">スキルライブラリ（skills/）</h3>
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                <code className="bg-white px-1 rounded text-indigo-700">skills/SKILL-INDEX.md</code> が常時読み込まれ、
                Agent はタスクに応じて最大3個のスキルを動的に選択して参照する（精度低下防止のため上限あり）。
                スキルを積み上げるほど Agent 精度が継続改善する。
              </p>
            </div>
            <div className="space-y-3">
              {[
                {
                  file: "SKILL-INDEX.md",
                  icon: "📑",
                  desc: "全スキルの索引。Agent が最初に参照するマスターインデックス。常時読み込み対象。",
                  color: "bg-yellow-50 border-yellow-200 text-yellow-700",
                },
                {
                  file: "SKILL-AUTHORING.md",
                  icon: "✍️",
                  desc: "新しいスキルの作成ガイド。スキルのフォーマット・命名規則・登録手順を定義する。",
                  color: "bg-gray-50 border-gray-200 text-gray-600",
                },
                {
                  file: "ANALYZE-PROJECT.md",
                  icon: "🔍",
                  desc: "プロジェクト分析スキル。analyst が Issue 分析・計画立案時に参照する手順書。",
                  color: "bg-blue-50 border-blue-200 text-blue-700",
                },
                {
                  file: "IMPLEMENT-FEATURE.md",
                  icon: "⚙️",
                  desc: "機能実装スキル。developer が実装タスクを進める際の標準手順・チェックリスト。",
                  color: "bg-green-50 border-green-200 text-green-700",
                },
                {
                  file: "CODE-REVIEW.md",
                  icon: "✅",
                  desc: "コードレビュースキル。reviewer が PR レビュー時に参照する評価基準・指摘テンプレート。",
                  color: "bg-purple-50 border-purple-200 text-purple-700",
                },
              ].map((skill) => (
                <div key={skill.file} className={`rounded-xl border p-4 ${skill.color.split(" ").slice(0, 2).join(" ")}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span>{skill.icon}</span>
                    <code className={`text-xs font-bold ${skill.color.split(" ")[2]}`}>{skill.file}</code>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{skill.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-700 mb-3">スキル参照ルール</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { num: "最大 3 個", label: "同時参照上限", desc: "Agent が1タスクで参照できるスキルの上限。精度低下を防ぐため厳守。", color: "bg-red-50 border-red-200 text-red-700" },
                { num: "常時 1 個", label: "SKILL-INDEX.md", desc: "索引ファイルは常時読み込み。残り2枠をタスクに応じて選択する。", color: "bg-blue-50 border-blue-200 text-blue-700" },
                { num: "随時追加", label: "スキル蓄積", desc: "プロジェクト固有の知見を skills/ に追加してライブラリを育てる。", color: "bg-green-50 border-green-200 text-green-700" },
              ].map((item) => (
                <div key={item.label} className={`rounded-xl border p-4 text-center ${item.color.split(" ").slice(0, 2).join(" ")}`}>
                  <div className={`text-xl font-bold mb-1 ${item.color.split(" ")[2]}`}>{item.num}</div>
                  <div className="text-xs font-semibold text-gray-700 mb-2">{item.label}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* CI / ADR */}
      {tab === "ci" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">Anti-Drift CI</h3>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">⚙️</span>
                <code className="text-sm font-bold text-green-700">.github/workflows/architecture-drift-check.yml</code>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                PR ごとに <code className="bg-white px-1 rounded">drift-check.sh</code> を実行し、
                <code className="bg-white px-1 rounded">design/architect.md</code> と実構成の乖離を自動検出する。
                乖離が検出された場合は CI が失敗し、drift-fixer Agent への修正依頼が通知される。
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-600">CI フロー</h4>
              {[
                { step: "1", label: "PR 作成", desc: "developer が実装 PR を作成するとワークフローが起動する。", icon: "📤" },
                { step: "2", label: "drift-check.sh 実行", desc: "architect.md のアーキテクチャ定義と実コードのディレクトリ構造・依存関係を比較する。", icon: "🔍" },
                { step: "3a", label: "乖離なし → CI ✅", desc: "reviewer Agent が PR をレビュー・承認し、マージへ進む。", icon: "✅" },
                { step: "3b", label: "乖離あり → CI ❌", desc: "乖離箇所を PR コメントに出力し、drift-fixer Agent に修正を依頼する。", icon: "🔧" },
                { step: "4", label: "drift-fixer が修正 PR を作成", desc: "architect.md または実装ファイルを修正して CI を通過させる。", icon: "🔄" },
              ].map((item) => (
                <div key={item.step} className="flex gap-3 items-start bg-gray-50 rounded-lg p-3">
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-gray-700">{item.step}. {item.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">ADR（Architecture Decision Record）</h3>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                設計上の意思決定を <code className="bg-white px-1 rounded text-amber-700">design/adr/</code> に ADR として残す。
                「なぜこの設計を選んだか」を記録することで、Agent がコンテキストを誤って解釈するリスクを低減する。
              </p>
            </div>
            <div className="bg-gray-900 rounded-xl p-5 font-mono text-xs text-gray-300 leading-relaxed">
              <div className="text-amber-400 mb-2"># design/adr/000-template.md</div>
              {[
                ["# ADR-NNN: タイトル", ""],
                ["", ""],
                ["## ステータス", "Proposed / Accepted / Deprecated"],
                ["## コンテキスト", "背景・制約"],
                ["## 決定", "採用した設計と理由"],
                ["## 影響", "良い影響 / 悪い影響 / リスク"],
                ["## 代替案", "検討したが採用しなかった案"],
              ].map(([code, comment], i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-gray-300">{code}</span>
                  {comment && <span className="text-gray-500">← {comment}</span>}
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
            <h3 className="text-base font-bold text-gray-700 mb-4">新規プロジェクトへの適用手順</h3>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  title: "テンプレートをコピー",
                  desc: "GitHub の「Use this template」でリポジトリを作成する。",
                  code: "gh repo create <project-name> --template agentic-dev-template",
                  color: "border-blue-200 bg-blue-50",
                  numColor: "bg-blue-600",
                },
                {
                  step: "2",
                  title: "プレースホルダーを置換",
                  desc: "[PROJECT_NAME] など各ファイルのプレースホルダーをプロジェクト固有の値に置換する。",
                  code: "# CLAUDE.md / copilot-instructions.md / architect.md 内の\n# [PROJECT_NAME] をプロジェクト名に置換",
                  color: "border-orange-200 bg-orange-50",
                  numColor: "bg-orange-500",
                },
                {
                  step: "3",
                  title: "analyst に architect.md を初回生成させる",
                  desc: "プロジェクトの技術スタック・構成を伝えて analyst Agent に architect.md を生成してもらう。",
                  code: "# Issue を作成して analyst に依頼\n# 「このプロジェクトの architect.md を初回生成してください」",
                  color: "border-green-200 bg-green-50",
                  numColor: "bg-green-600",
                },
                {
                  step: "4",
                  title: "Issue → 開発サイクルを回す",
                  desc: "以降は Issue → analyst 計画 → developer 実装 → reviewer レビュー → drift-fixer 乖離修正 のサイクルで開発する。",
                  code: "Issue（ゴール状態のみ記述）\n  → analyst: 計画立案\n  → developer: 実装 PR\n  → reviewer: PR レビュー\n  → drift-fixer: CI 乖離修正（必要時）",
                  color: "border-indigo-200 bg-indigo-50",
                  numColor: "bg-indigo-600",
                },
                {
                  step: "5",
                  title: "スキルをプロジェクト固有に拡充",
                  desc: "プロジェクトで蓄積した知見を skills/ に追加し、SKILL-INDEX.md を更新する。",
                  code: "skills/\n  SKILL-INDEX.md      ← 更新\n  MY-SKILL.md         ← 新規追加",
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
            <h3 className="text-base font-bold text-gray-700 mb-3">Issue 記述のルール</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="text-sm font-bold text-green-700 mb-2">✅ 正しい記述（ゴール状態）</div>
                <pre className="text-xs text-gray-700 leading-relaxed bg-white rounded p-2">{`## Goal
ユーザーログイン機能が実装されている。
- メール + パスワードで認証できる
- 認証失敗時はエラーメッセージを表示
- JWT トークンを発行する`}</pre>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="text-sm font-bold text-red-700 mb-2">❌ 避けるべき記述（現状分析）</div>
                <pre className="text-xs text-gray-700 leading-relaxed bg-white rounded p-2">{`## 現状
現在 auth.ts の 42 行目に
バグがあり、login() が
null を返す場合がある。
→ 並列 PR で即座に陳腐化`}</pre>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
