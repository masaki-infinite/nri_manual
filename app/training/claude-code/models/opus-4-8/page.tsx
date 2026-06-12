import Link from "next/link";

export default function Opus48Page() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/training/claude-code/models"
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          ← モデル一覧に戻る
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full">
          Claude Code
        </span>
        <span className="bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          主力モデル
        </span>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Claude Opus 4.8</h2>
      <p className="text-gray-600 text-sm mb-8 max-w-3xl leading-relaxed">
        2026年5月28日リリース。複雑なコーディング・エージェント・知識作業向けのフラッグシップモデルです。
        Claude Code の日常運用では、<strong>まず Opus 4.8 を選ぶ</strong>のが基本です。
      </p>

      <div className="space-y-8">
        <section id="overview" className="scroll-mt-28 bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-violet-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            API ID: claude-opus-4-8
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">一言でいうと</h3>
          <p className="text-slate-700 leading-7 max-w-4xl mb-4">
            「本番品質のコードを毎日出すためのデイリードライバー」。
            1M トークンのコンテキストと Adaptive thinking により、大規模リポジトリの横断理解や
            長いエージェントループでも安定して動きます。
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              { label: "コンテキスト", value: "1M tokens" },
              { label: "最大出力", value: "128k tokens" },
              { label: "料金", value: "$5 / $25" },
              { label: "リリース", value: "2026-05-28" },
            ].map((item) => (
              <div key={item.label} className="bg-white/80 border border-violet-100 rounded-lg px-3 py-2">
                <div className="text-xs text-violet-600 font-medium">{item.label}</div>
                <div className="font-semibold text-gray-900">{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">主な特徴</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: "🧠",
                title: "Adaptive thinking",
                body: "タスクの難易度に応じて推論深度を自動調整。簡単な修正は軽く、設計判断は深く考える。",
              },
              {
                icon: "📏",
                title: "1M コンテキスト（デフォルト）",
                body: "4.7 の 200k から拡大。大規模コードベース全体を一度に渡しやすい。",
              },
              {
                icon: "💬",
                title: "会話途中の system メッセージ",
                body: "長いセッションの途中で指示を追記でき、プロンプトキャッシュを活かしつらコストを抑えられる。",
              },
              {
                icon: "⚡",
                title: "Fast mode（研究プレビュー）",
                body: "約 2.5 倍速。料金は $10 / $50 で、以前の fast mode より大幅に安価化。",
              },
              {
                icon: "🔀",
                title: "Dynamic Workflows",
                body: "Claude Code で大規模問題を計画し、並列サブエージェントに分割してマージする機能。",
              },
              {
                icon: "✅",
                title: "正直な不確実性の表明",
                body: "根拠が薄いときに結論を急がない傾向が強化。レビュー・設計相談で信頼しやすい。",
              },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="text-2xl mb-2">{card.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-2">{card.title}</h4>
                <p className="text-sm text-gray-600 leading-6">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="claude-code" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Claude Code での使い方</h3>
          <div className="space-y-4 text-sm text-gray-700 leading-6">
            <div className="border border-violet-100 rounded-xl p-4 bg-violet-50/40">
              <h4 className="font-semibold text-violet-900 mb-2">1. デフォルトモデルとして使う</h4>
              <p>
                特に理由がなければ Opus 4.8 + Effort high で開始。マルチファイル実装、テスト追加、
                既存コードの調査はこの組み合わせで大半が回ります。
              </p>
            </div>
            <div className="border border-violet-100 rounded-xl p-4 bg-violet-50/40">
              <h4 className="font-semibold text-violet-900 mb-2">2. 難題は Effort を上げる</h4>
              <p>
                再現困難なバグ、大規模リファクタ、設計のトレードオフ整理では <code className="bg-white px-1 rounded text-xs">extra</code>（xhigh）や{" "}
                <code className="bg-white px-1 rounded text-xs">max</code> を指定。トークン消費は増えますが、
                手戻りが減ることが多いです。
              </p>
            </div>
            <div className="border border-violet-100 rounded-xl p-4 bg-violet-50/40">
              <h4 className="font-semibold text-violet-900 mb-2">3. Dynamic Workflows で並列化</h4>
              <p>
                モノレポ全体の棚卸し、大規模マイグレーション計画などは、1 セッション内で
                サブエージェントを並列起動して結果を統合する Workflows が有効です。
              </p>
            </div>
          </div>
          <pre className="mt-4 bg-gray-900 text-green-300 rounded-lg p-4 text-xs leading-relaxed overflow-auto">{`# Claude Code でのモデル指定例（CLI）
claude --model claude-opus-4-8

# Effort を上げる例
claude --model claude-opus-4-8 --effort extra`}</pre>
        </section>

        <section id="pricing" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">料金</h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  {["モード", "Input", "Output", "備考"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-slate-800">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["通常", "$5 / MTok", "$25 / MTok", "4.7 と同価格"],
                  ["Fast mode", "$10 / MTok", "$50 / MTok", "約 2.5 倍速・研究プレビュー"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-gray-200">
                    {row.map((cell, j) => (
                      <td key={j} className={`px-4 py-3 ${j === 0 ? "font-medium text-gray-800" : "text-gray-700"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            プロンプトキャッシュで入力最大 90% 割引、バッチ処理で 50% 割引が利用可能です。
          </p>
        </section>

        <section id="when" className="scroll-mt-28 bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">使い分けの目安</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <div className="font-semibold text-emerald-300 mb-2">Opus 4.8 が向く</div>
              <ul className="space-y-1.5 text-slate-200 leading-6">
                <li>・本番コードの実装・レビュー</li>
                <li>・マルチファイルのリファクタ</li>
                <li>・エージェント的な調査・デバッグ</li>
                <li>・設計ドキュメント・ADR の起草</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-amber-300 mb-2">Fable 5 を検討する</div>
              <ul className="space-y-1.5 text-slate-200 leading-6">
                <li>・Opus で何度も手が止まる最難問</li>
                <li>・数日かかる自律的な大規模作業</li>
                <li>・並列サブエージェントでも足りない規模</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/training/claude-code/models/fable"
              className="inline-flex items-center gap-1.5 bg-fuchsia-500 hover:bg-fuchsia-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Fable 5 の詳細 →
            </Link>
            <Link
              href="/training/claude-code/models"
              className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              モデル一覧 ←
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
