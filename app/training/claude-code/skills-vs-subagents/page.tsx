"use client";

import { useState } from "react";
import Link from "next/link";

type Section =
  | "intro"
  | "skills"
  | "subagents"
  | "comparison"
  | "skills-tasks"
  | "subagents-tasks"
  | "order"
  | "checklist";

export default function SkillsVsSubAgentsPage() {
  const [activeSection, setActiveSection] = useState<Section>("intro");

  const toc: { id: Section; label: string }[] = [
    { id: "intro", label: "結論: 初心者はSkillsから" },
    { id: "skills", label: "Skillsは手順" },
    { id: "subagents", label: "SubAgentsは役割" },
    { id: "comparison", label: "比較表" },
    { id: "skills-tasks", label: "Skillsが向いている作業" },
    { id: "subagents-tasks", label: "SubAgentsが向いている作業" },
    { id: "order", label: "作る順番" },
    { id: "checklist", label: "判断チェックリスト" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* パンくず */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/training" className="hover:text-indigo-600 transition-colors">
          勉強会
        </Link>
        <span>›</span>
        <Link href="/training/claude-code" className="hover:text-indigo-600 transition-colors">
          Claude Code
        </Link>
        <span>›</span>
        <span className="text-gray-700 font-medium">Skills vs SubAgents</span>
      </div>

      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
            Claude Code
          </span>
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
            初心者向け
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Skills vs SubAgents ― どちらを先に作るか
        </h1>
        <p className="text-gray-500 text-sm">
          Claude Code を使い始めた人が最初に迷う2つの概念を整理します。
        </p>
      </div>

      <div className="flex gap-8">
        {/* 目次（左サイドバー） */}
        <div className="w-56 flex-shrink-0">
          <div className="sticky top-24">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">目次</div>
            <nav className="space-y-1">
              {toc.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-orange-100 text-orange-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* 本文 */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* 結論 */}
          {activeSection === "intro" && (
            <section className="space-y-5">
              <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-5">
                <h2 className="text-lg font-bold text-orange-800 mb-1">結論: 初心者はSkillsから</h2>
                <p className="text-sm text-orange-700">
                  Claude Code を少し使うと、次に迷う言葉があります。<br />
                  <strong>Skills</strong> と <strong>SubAgents</strong> です。
                </p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-700 mb-4">
                  どちらも便利そうに見えます。どちらも Claude Code を強くしそうに見えます。
                  ただ、<strong className="text-orange-600">初心者が最初に作るべきなのは Skills</strong> です。
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-xs font-bold text-gray-500 uppercase mb-3">理由は3つ</div>
                  <div className="space-y-2">
                    {[
                      { icon: "📦", text: "小さく作れる" },
                      { icon: "🎯", text: "成果物が分かりやすい" },
                      { icon: "🔧", text: "失敗しても直しやすい" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 border border-gray-100">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm font-medium text-gray-700">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl border border-green-200 p-4">
                  <div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">Skills に向いている</div>
                  <p className="text-sm text-green-800">
                    記事企画、議事録整理、調査要約のような<strong>定型作業</strong>
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
                  <div className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">SubAgents に向いている</div>
                  <p className="text-sm text-blue-800">
                    レビュー担当、調査担当、実装担当のような<strong>役割分担</strong>
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
                最初から SubAgents へ行くと、<strong>設計が重くなります</strong>。
                まず Skills で作業手順を固めてから、役割を分けてください。
              </div>
            </section>
          )}

          {/* Skillsは手順 */}
          {activeSection === "skills" && (
            <section className="space-y-5">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">
                Skillsは手順
              </h2>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-700 mb-4">
                  Skills は、<strong>作業手順</strong>です。
                  毎回同じ順番でやる仕事を <code className="bg-gray-100 text-orange-700 px-1.5 py-0.5 rounded text-xs">SKILL.md</code> へ書きます。
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="text-xs font-bold text-gray-500 mb-3">
                    例: <code className="text-orange-700">article-planner</code> skill
                  </div>
                  <div className="space-y-2">
                    {[
                      "1. 参考素材を読む",
                      "2. 読者を決める",
                      "3. タイトル案を出す",
                      "4. H2構成を作る",
                      "5. 不足点を指摘する",
                    ].map((step) => (
                      <div key={step} className="flex items-center gap-3 bg-white rounded-lg px-3 py-2 border border-gray-100">
                        <span className="text-sm text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                  <p className="text-sm text-orange-800 font-medium">
                    つまり、Skills は「<strong>この仕事はこの順番で進める</strong>」という手順書です。
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">SKILL.md の基本構造</div>
                <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto">{`# article-planner

## 目的
記事企画を体系的に作成する

## 手順
1. 参考素材を読む
   - URLや文章を受け取って要点を抽出
2. 読者を設定する
   - ペルソナ・課題・目標を明確化
3. タイトル案を3つ出す
4. H2見出し構成（5〜7本）を作る
5. 不足している視点を指摘する

## 出力形式
- タイトル: [候補3案]
- 構成: [H2リスト]
- 補足: [不足点]`}</pre>
              </div>
            </section>
          )}

          {/* SubAgentsは役割 */}
          {activeSection === "subagents" && (
            <section className="space-y-5">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">
                SubAgentsは役割
              </h2>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-700 mb-4">
                  SubAgents は、<strong>役割</strong>です。
                  同じタスクでも、<strong>見方が違う担当</strong>を分けたい時に使います。
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { icon: "🔍", name: "リサーチ担当", desc: "情報収集・調査" },
                    { icon: "✅", name: "レビュー担当", desc: "品質確認・指摘" },
                    { icon: "⚙️", name: "実装担当", desc: "コード・文章作成" },
                    { icon: "🔒", name: "セキュリティ確認担当", desc: "リスク検査" },
                  ].map((agent) => (
                    <div key={agent.name} className="bg-blue-50 rounded-lg border border-blue-100 px-4 py-3 flex items-start gap-3">
                      <span className="text-2xl">{agent.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-blue-800">{agent.name}</div>
                        <div className="text-xs text-blue-600">{agent.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <p className="text-sm text-yellow-800">
                    <strong>初心者がいきなり使うと、役割が増えすぎます。</strong><br />
                    まずは、自分の作業手順が固まってからで十分です。
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* 比較表 */}
          {activeSection === "comparison" && (
            <section className="space-y-5">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">
                比較表
              </h2>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-gray-600 font-bold">項目</th>
                      <th className="text-center px-4 py-3 text-orange-700 font-bold bg-orange-50">
                        Skills
                      </th>
                      <th className="text-center px-4 py-3 text-blue-700 font-bold bg-blue-50">
                        SubAgents
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { item: "概念", skills: "手順書", subagents: "役割定義" },
                      { item: "作るもの", skills: "SKILL.md", subagents: "Agent 設定ファイル" },
                      { item: "向いている場面", skills: "定型作業・繰り返し", subagents: "複数視点・専門分業" },
                      { item: "難易度", skills: "低（初心者向け）", subagents: "中〜高（中級以降）" },
                      { item: "失敗のリスク", skills: "小さい", subagents: "役割過多になりやすい" },
                      { item: "成果物の明確さ", skills: "高い", subagents: "設計次第" },
                      { item: "おすすめタイミング", skills: "最初から", subagents: "手順が固まった後" },
                    ].map((row, i) => (
                      <tr key={row.item} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-medium text-gray-700">{row.item}</td>
                        <td className="px-4 py-3 text-center text-orange-800 bg-orange-50/30">{row.skills}</td>
                        <td className="px-4 py-3 text-center text-blue-800 bg-blue-50/30">{row.subagents}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 text-center">
                <p className="text-sm text-gray-700">
                  初心者がまず覚えるべきことは、<br />
                  <strong className="text-orange-600">Skills は手順</strong>、
                  <strong className="text-blue-600">SubAgents は役割</strong> です。
                </p>
              </div>
            </section>
          )}

          {/* Skillsが向いている作業 */}
          {activeSection === "skills-tasks" && (
            <section className="space-y-5">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">
                Skillsが向いている作業
              </h2>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-700 mb-4">
                  Skills が向いているのは、<strong>成果物が決まっている作業</strong>です。
                  毎回の手順が似ているから、skill 化できます。
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "📝", task: "note記事企画", desc: "タイトル・構成・読者定義を毎回同じ手順で" },
                    { icon: "📋", task: "議事録整理", desc: "発言→要点→アクションアイテムの抽出" },
                    { icon: "🔍", task: "調査要約", desc: "情報収集→整理→サマリー形式で出力" },
                    { icon: "✅", task: "PRレビュー前チェック", desc: "コード確認の観点リストを順番に実行" },
                    { icon: "🖼️", task: "サムネイル案出し", desc: "テーマ・ターゲット・キャッチコピーを生成" },
                    { icon: "✉️", task: "メール下書き整理", desc: "目的→要件→丁寧な文章に変換" },
                  ].map((item) => (
                    <div key={item.task} className="bg-orange-50 rounded-xl border border-orange-100 p-4 flex items-start gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-orange-800">{item.task}</div>
                        <div className="text-xs text-orange-600 mt-1">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* SubAgentsが向いている作業 */}
          {activeSection === "subagents-tasks" && (
            <section className="space-y-5">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">
                SubAgentsが向いている作業
              </h2>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-700 mb-4">
                  SubAgents が向いているのは、<strong>視点を分けたい作業</strong>です。
                  つまり、<strong>SubAgents は中級以降</strong>です。
                </p>

                <div className="space-y-3 mb-5">
                  {[
                    { icon: "⚙️✅", label: "実装とレビューを分ける", desc: "コードを書く Agent とレビューする Agent を独立させる" },
                    { icon: "🔍📊", label: "調査と戦略を分ける", desc: "情報収集の Agent と意思決定の Agent を分離" },
                    { icon: "🔒", label: "セキュリティ確認を別役割にする", desc: "専門的なセキュリティ観点のみに集中した Agent" },
                    { icon: "🎨", label: "デザインレビューを別視点にする", desc: "UX・アクセシビリティ専門の Agent を独立配置" },
                  ].map((item) => (
                    <div key={item.label} className="bg-blue-50 rounded-xl border border-blue-100 p-4">
                      <div className="text-sm font-bold text-blue-800 mb-1">{item.label}</div>
                      <div className="text-xs text-blue-600">{item.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    作業手順が固まっていない状態で役割を増やすと、<strong>混乱します</strong>。<br />
                    まず Skills で「自分の仕事のやり方」を言語化してから使いましょう。
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* 作る順番 */}
          {activeSection === "order" && (
            <section className="space-y-5">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">
                作る順番
              </h2>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-700 mb-5">
                  おすすめの順番はこれです。この順番なら、<strong>土台から積み上がります</strong>。
                </p>

                <div className="space-y-3">
                  {[
                    {
                      step: 1,
                      label: "CLAUDE.md",
                      desc: "Claude Code への基本指示（プロジェクトの目的・禁止事項・言語設定）",
                      color: "bg-gray-100 border-gray-300 text-gray-700",
                      badge: "bg-gray-600 text-white",
                    },
                    {
                      step: 2,
                      label: "article-planner skill",
                      desc: "記事企画の手順書（最初に作りやすい定型タスク）",
                      color: "bg-orange-50 border-orange-200 text-orange-800",
                      badge: "bg-orange-500 text-white",
                    },
                    {
                      step: 3,
                      label: "meeting-summary skill",
                      desc: "議事録整理の手順書（繰り返し使えてすぐ効果を実感できる）",
                      color: "bg-orange-50 border-orange-200 text-orange-800",
                      badge: "bg-orange-500 text-white",
                    },
                    {
                      step: 4,
                      label: "research-brief skill",
                      desc: "調査要約の手順書（成果物の形式が明確で作りやすい）",
                      color: "bg-orange-50 border-orange-200 text-orange-800",
                      badge: "bg-orange-500 text-white",
                    },
                    {
                      step: 5,
                      label: "必要になったら SubAgents",
                      desc: "複数の専門視点が必要になった時点で設計する",
                      color: "bg-blue-50 border-blue-200 text-blue-800",
                      badge: "bg-blue-500 text-white",
                    },
                  ].map((item) => (
                    <div key={item.step} className={`rounded-xl border p-4 flex items-start gap-4 ${item.color}`}>
                      <span className={`flex-shrink-0 w-7 h-7 rounded-full ${item.badge} flex items-center justify-center text-xs font-bold`}>
                        {item.step}
                      </span>
                      <div>
                        <div className="text-sm font-bold">{item.label}</div>
                        <div className="text-xs mt-0.5 opacity-80">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 bg-gray-50 rounded-lg p-4 border border-gray-200 text-sm text-gray-700 text-center">
                  最初から SubAgents を作る必要はありません。
                </div>
              </div>
            </section>
          )}

          {/* 判断チェックリスト */}
          {activeSection === "checklist" && (
            <section className="space-y-5">
              <h2 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">
                判断チェックリスト
              </h2>

              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-700 mb-4">
                  迷ったら、このチェックです。
                </p>

                <div className="space-y-3 mb-5">
                  {[
                    "毎回同じ手順か",
                    "成果物が決まっているか",
                    "1人のClaudeで処理できるか",
                    "役割分担なしで進むか",
                  ].map((q, i) => (
                    <div key={q} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                      <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-700">{q}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 rounded-xl border border-orange-200 p-4 text-center">
                    <div className="text-2xl mb-2">✅</div>
                    <div className="text-sm font-bold text-orange-800">全部「はい」</div>
                    <div className="text-xs text-orange-600 mt-1">→ Skills で作る</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 text-center">
                    <div className="text-2xl mb-2">🤔</div>
                    <div className="text-sm font-bold text-blue-800">複数の専門視点が必要</div>
                    <div className="text-xs text-blue-600 mt-1">→ SubAgents を検討</div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-xl p-5">
                <p className="text-sm font-bold text-orange-800 mb-1">まとめ</p>
                <p className="text-sm text-orange-700">
                  初心者は、まず <strong>Skills で十分</strong>です。<br />
                  手順が固まってから、役割を分けてください。
                </p>
              </div>

              {/* ナビゲーション */}
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <Link
                  href="/training/claude-code"
                  className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  ← Claude Code 概要に戻る
                </Link>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
