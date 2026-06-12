import Link from "next/link";

const models = [
  {
    name: "Claude Opus 4.8",
    slug: "opus-4-8",
    badge: "デフォルト推奨",
    badgeColor: "bg-violet-600",
    apiId: "claude-opus-4-8",
    price: "$5 / $25（In/Out MTok）",
    summary:
      "複雑なコーディングとエージェント作業の主力モデル。Claude Code の日常運用はまずここから。",
    traits: ["1M コンテキスト", "Adaptive thinking", "Effort 制御", "Dynamic Workflows"],
    color: "border-violet-200 bg-violet-50/50",
  },
  {
    name: "Claude Fable 5",
    slug: "fable",
    badge: "最上位",
    badgeColor: "bg-fuchsia-600",
    apiId: "claude-fable-5",
    price: "$10 / $50（In/Out MTok）",
    summary:
      "数日単位の自律作業や最難問向け。セーフガードにより一部リクエストは Opus 4.8 へフォールバック。",
    traits: ["Mythos クラス", "長時間自律", "Adaptive thinking 常時 ON", "セーフガード付き"],
    color: "border-fuchsia-200 bg-fuchsia-50/50",
  },
  {
    name: "Claude Sonnet 4.6",
    slug: null,
    badge: "バランス型",
    badgeColor: "bg-sky-500",
    apiId: "claude-sonnet-4-6",
    price: "$3 / $15（In/Out MTok）",
    summary: "速度と品質のバランス。軽めの実装・調査・レビュー向け。",
    traits: ["1M コンテキスト", "Extended thinking", "高速"],
    color: "border-sky-200 bg-sky-50/40",
  },
  {
    name: "Claude Haiku 4.5",
    slug: null,
    badge: "高速",
    badgeColor: "bg-emerald-500",
    apiId: "claude-haiku-4-5",
    price: "$1 / $5（In/Out MTok）",
    summary: "最速・最安。定型タスク、要約、単純な修正向け。",
    traits: ["200k コンテキスト", "最速レイテンシ"],
    color: "border-emerald-200 bg-emerald-50/40",
  },
];

export default function ClaudeCodeModelsPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/training/claude-code"
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          ← Claude Code 概要に戻る
        </Link>
      </div>

      <div className="mb-6">
        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">
          Claude Code
        </span>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">モデル一覧</h2>
      <p className="text-gray-600 text-sm mb-8 max-w-3xl leading-relaxed">
        Claude Code で選べる主要モデルの比較です。
        日常の開発は <strong>Opus 4.8</strong>、最難問・長時間の自律作業は <strong>Fable 5</strong> を検討します。
      </p>

      <div className="space-y-8">
        <section id="lineup" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">モデル比較</h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  {["モデル", "API ID", "コンテキスト", "出力上限", "料金（In/Out）", "Claude Code での位置づけ"].map(
                    (h) => (
                      <th key={h} className="text-left px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Opus 4.8", "claude-opus-4-8", "1M", "128k", "$5 / $25", "主力・デフォルト推奨"],
                  ["Fable 5", "claude-fable-5", "1M", "128k", "$10 / $50", "最上位・長時間自律"],
                  ["Sonnet 4.6", "claude-sonnet-4-6", "1M", "64k", "$3 / $15", "速度重視の実装"],
                  ["Haiku 4.5", "claude-haiku-4-5", "200k", "64k", "$1 / $5", "定型・軽作業"],
                ].map((row, i) => (
                  <tr key={row[0]} className={`border-t border-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-4 py-3 leading-6 ${j === 0 ? "font-semibold text-gray-900" : j === 1 ? "font-mono text-xs text-gray-600" : "text-gray-700"}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="selection" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">選び方（Claude Code 向け）</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "まず Opus 4.8",
                body: "本番品質のコード、リファクタ、マルチファイル変更、エージェント的な調査は Opus 4.8 が第一候補。Effort を上げれば難題にも対応。",
                color: "border-violet-200 bg-violet-50",
              },
              {
                title: "足りないとき Fable 5",
                body: "大規模リポジトリ横断、数日かかる自律作業、Opus で手が止まる難問に Fable 5。コストは 2 倍なのでタスク単位で使う。",
                color: "border-fuchsia-200 bg-fuchsia-50",
              },
              {
                title: "軽く回すなら Sonnet",
                body: "小さな修正、ドキュメント追記、単一ファイルの説明などは Sonnet 4.6 で十分なことが多い。",
                color: "border-sky-200 bg-sky-50",
              },
              {
                title: "定型は Haiku",
                body: "コメント整形、簡単な変換、ログ要約など反復的な軽作業。品質より速度・コストを優先。",
                color: "border-emerald-200 bg-emerald-50",
              },
            ].map((card) => (
              <div key={card.title} className={`rounded-xl border p-5 ${card.color}`}>
                <h4 className="font-semibold text-gray-900 mb-2">{card.title}</h4>
                <p className="text-sm text-gray-700 leading-6">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="effort" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Effort 設定（Opus 4.8）</h3>
          <p className="text-sm text-gray-600 leading-6 mb-4">
            Claude Code では Opus 4.8 の推論深度を Effort で調整できます。デフォルトは high です。
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  {["設定", "Claude Code 表記", "向いている作業"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-slate-800">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["High（デフォルト）", "high", "日常の実装・調査。品質とトークン消費のバランスが良い"],
                  ["Extra", "xhigh / extra", "難しいバグ、設計判断、長いコンテキストの横断読み"],
                  ["Max", "max", "最難問・長時間の非同期ワークフロー。トークン消費大"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-gray-200">
                    <td className="px-4 py-3 font-medium text-gray-800">{row[0]}</td>
                    <td className="px-4 py-3 font-mono text-xs text-violet-700">{row[1]}</td>
                    <td className="px-4 py-3 text-gray-700 leading-6">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="links" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">詳細ページ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {models
              .filter((m) => m.slug)
              .map((model) => (
                <Link key={model.slug} href={`/training/claude-code/models/${model.slug}`}>
                  <div className={`h-full rounded-xl border p-5 hover:shadow-md transition-shadow cursor-pointer ${model.color}`}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-gray-900">{model.name}</h4>
                      <span className={`${model.badgeColor} text-white text-xs font-bold px-2 py-0.5 rounded-full shrink-0`}>
                        {model.badge}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-gray-500 mb-2">{model.apiId}</p>
                    <p className="text-sm text-gray-700 leading-6 mb-3">{model.summary}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {model.traits.map((t) => (
                        <span key={t} className="text-xs bg-white/80 border border-gray-200 rounded-full px-2 py-0.5 text-gray-600">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 text-sm font-medium text-purple-700">詳細を見る →</div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
