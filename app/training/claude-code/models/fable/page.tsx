import Link from "next/link";

export default function FablePage() {
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
        <span className="bg-fuchsia-100 text-fuchsia-700 text-xs font-bold px-3 py-1 rounded-full">
          Claude Code
        </span>
        <span className="bg-fuchsia-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          最上位モデル
        </span>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Claude Fable 5</h2>
      <p className="text-gray-600 text-sm mb-8 max-w-3xl leading-relaxed">
        2026年6月9日リリース。Anthropic が一般公開している<strong>最も能力の高いモデル</strong>です。
        Mythos クラスの知能にセーフガードを載せ、長時間の自律作業向けに設計されています。
      </p>

      <div className="space-y-8">
        <section id="overview" className="scroll-mt-28 bg-gradient-to-br from-fuchsia-50 to-violet-50 border border-fuchsia-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-fuchsia-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            API ID: claude-fable-5
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">一言でいうと</h3>
          <p className="text-slate-700 leading-7 max-w-4xl mb-4">
            「数日かけて粘り強く問題を解く、最上位の自律エージェント」。
            Opus 4.8 より高い推論力と持続力を持ち、コーディング・調査・分析・法務など
            横断的な難題に向きます。料金は Opus の 2 倍です。
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              { label: "コンテキスト", value: "1M tokens" },
              { label: "最大出力", value: "128k tokens" },
              { label: "料金", value: "$10 / $50" },
              { label: "リリース", value: "2026-06-09" },
            ].map((item) => (
              <div key={item.label} className="bg-white/80 border border-fuchsia-100 rounded-lg px-3 py-2">
                <div className="text-xs text-fuchsia-600 font-medium">{item.label}</div>
                <div className="font-semibold text-gray-900">{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="capabilities" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">できること</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: "🏃",
                title: "長時間の自律作業",
                body: "介入なしで数日単位のタスクを継続。大規模リファクタや横断調査に向く。",
              },
              {
                icon: "🔬",
                title: "最難問の推論",
                body: "コーディング、コンピュータ操作、リサーチ、財務・法務分析など複合タスクに強い。",
              },
              {
                icon: "🧪",
                title: "自己検証",
                body: "成果物を自分でテストし、品質を確認してから返す傾向が強い。",
              },
              {
                icon: "🧠",
                title: "Adaptive thinking（常時 ON）",
                body: "推論深度の無効化は不可。常に深い思考モードで動作する。",
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

        <section id="safeguards" className="scroll-mt-28 bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-amber-900 mb-3">セーフガードとフォールバック</h3>
          <p className="text-sm text-amber-900/90 leading-6 mb-4">
            Fable 5 は Mythos クラスの能力を一般公開するため、サイバーセキュリティ・生物学・化学など
            高リスク領域のリクエストを自動判定する<strong>セーフティ分類器</strong>が付いています。
          </p>
          <div className="space-y-3 text-sm text-amber-900/90 leading-6">
            <div className="bg-white/80 border border-amber-200 rounded-lg p-4">
              <div className="font-semibold text-amber-900 mb-1">フラグされたリクエスト</div>
              <p>
                セーフガードに引っかかった場合、API はエラーではなく <code className="bg-amber-100 px-1 rounded text-xs">refusal</code> で応答し、
                <strong>自動的に Opus 4.8 へルーティング</strong>されます。Fable 料金は課金されません。
              </p>
            </div>
            <div className="bg-white/80 border border-amber-200 rounded-lg p-4">
              <div className="font-semibold text-amber-900 mb-1">Claude Mythos 5 との関係</div>
              <p>
                同一の基盤モデルで、Mythos 5 はセーフガードを外した限定提供版（Project Glasswing 等）。
                一般ユーザーが使えるのは Fable 5 です。
              </p>
            </div>
          </div>
        </section>

        <section id="claude-code" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Claude Code での使い方</h3>
          <div className="space-y-4 text-sm text-gray-700 leading-6">
            <div className="border border-fuchsia-100 rounded-xl p-4 bg-fuchsia-50/40">
              <h4 className="font-semibold text-fuchsia-900 mb-2">1. デフォルトにしない</h4>
              <p>
                日常の実装は Opus 4.8 のまま。Fable 5 は「Opus で解けなかった」「数日かかる規模」など、
                明確な理由があるタスクに限定して使うとコスト効率が良いです。
              </p>
            </div>
            <div className="border border-fuchsia-100 rounded-xl p-4 bg-fuchsia-50/40">
              <h4 className="font-semibold text-fuchsia-900 mb-2">2. 長時間ワークフロー向け</h4>
              <p>
                大規模マイグレーション、モノレポ全体の品質改善、複数サービス横断の設計など、
                途中で人が何度も介入しなくてよい作業に向きます。
              </p>
            </div>
            <div className="border border-fuchsia-100 rounded-xl p-4 bg-fuchsia-50/40">
              <h4 className="font-semibold text-fuchsia-900 mb-2">3. フォールバックを想定する</h4>
              <p>
                セキュリティ調査やバイオ系の文脈が強いプロンプトは Opus 4.8 に回ることがあるため、
                セッション設計時に「Fable → Opus フォールバック」も正常系として扱います。
              </p>
            </div>
          </div>
          <pre className="mt-4 bg-gray-900 text-green-300 rounded-lg p-4 text-xs leading-relaxed overflow-auto">{`# Claude Code で Fable 5 を指定
claude --model claude-fable-5

# 長時間・高難度タスクの例
claude --model claude-fable-5 --effort max`}</pre>
        </section>

        <section id="pricing" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">料金</h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  {["項目", "Fable 5", "Opus 4.8（比較）"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-slate-800">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Input", "$10 / MTok", "$5 / MTok"],
                  ["Output", "$50 / MTok", "$25 / MTok"],
                  ["プロンプトキャッシュ", "入力 90% 割引", "入力 90% 割引"],
                  ["データ保持", "Covered Model（30日）", "通常ポリシー"],
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
            出力トークンが多いタスクでは Opus の 2 倍コストになるため、タスク成功率で ROI を測るのが重要です。
          </p>
        </section>

        <section id="when" className="scroll-mt-28 bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">使い分けの目安</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <div className="font-semibold text-emerald-300 mb-2">Fable 5 が向く</div>
              <ul className="space-y-1.5 text-slate-200 leading-6">
                <li>・数日かかる大規模リファクタ</li>
                <li>・Opus 4.8 で手が止まった最難問</li>
                <li>・横断調査＋実装を一気通貫で任せたい</li>
                <li>・高い自律性が必要なエージェント作業</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-amber-300 mb-2">Opus 4.8 に戻す</div>
              <ul className="space-y-1.5 text-slate-200 leading-6">
                <li>・日常の PR 単位の実装</li>
                <li>・軽い修正・説明・レビュー</li>
                <li>・コストを抑えたい反復タスク</li>
                <li>・セーフガードで Opus にルーティングされた場合</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/training/claude-code/models/opus-4-8"
              className="inline-flex items-center gap-1.5 bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Opus 4.8 の詳細 →
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
