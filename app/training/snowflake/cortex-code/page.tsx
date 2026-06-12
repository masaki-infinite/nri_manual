import Link from "next/link";
import SnowflakeCortexCodeDiagram from "../SnowflakeCortexCodeDiagram";

export default function SnowflakeCortexCodePage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Cortex Code</h2>

      <p className="text-gray-600 text-sm mb-6 max-w-3xl leading-relaxed">
        Cortex Code は、<strong>開発者向けのデータネイティブ AI コーディングエージェント</strong>です。
        Snowflake のスキーマ・RBAC・系譜・Semantic View を理解したうえで、
        SQL・dbt モデル・ML パイプライン・エージェント定義を自然言語から生成します。
        ビジネスユーザー向けの <span className="font-semibold">Snowflake Intelligence</span> と対になるビルダー層です。
      </p>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span>⌨️</span>
            概要
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">
            「データの文脈を知っている」コーディングエージェント
          </h3>
          <p className="text-slate-700 leading-7 max-w-4xl mb-4">
            汎用の AI コーディングアシスタントは外部から Snowflake に接続するだけですが、
            Cortex Code は Snowflake プラットフォームに組み込まれ、
            実在するテーブル名・権限・ベストプラクティスを前提にコードを書きます。
            データエンジニアリング、分析、ML、エージェント構築を会話ベースで加速し、
            生成物は RBAC と Query History の枠内で実行・検証できます。
          </p>
          <SnowflakeCortexCodeDiagram />
          <p className="text-xs text-cyan-800/80 mt-3 bg-cyan-100/60 border border-cyan-200 rounded-lg px-3 py-2">
            命名メモ：Summit 2026 以降、製品ブランドは <span className="font-semibold">CoCo</span>（Snowflake CoCo）としても案内されています。
            機能・ドキュメント上は引き続き <span className="font-semibold">Cortex Code</span> の表記が併用されます。
          </p>
        </section>

        <section id="interfaces" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. 利用できるインターフェース</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Snowsight（Web）",
                body: "ブラウザ上で SQL・Notebook・分析ワークフローを会話ベースで支援。Open Preview として提供。",
              },
              {
                title: "CLI（ターミナル）",
                body: "macOS / Linux で GA。ローカルファイルの読み書き、git、dbt プロジェクト操作、シェルコマンド実行に対応。",
              },
              {
                title: "Desktop IDE",
                body: "ネイティブデスクトップアプリ。プロジェクト文脈を保持したエージェント開発体験。",
              },
              {
                title: "VS Code / ACP 連携",
                body: "Agent Client Protocol（ACP）経由で VS Code・Cursor・Zed 等のエディタに Cortex Code を埋め込み。",
              },
            ].map((c) => (
              <div key={c.title} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">{c.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="usecases" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. 主なユースケース</h3>
          <div className="space-y-3">
            {[
              {
                tag: "SQL / 分析",
                desc: "自然言語から本番スキーマに沿った SQL を生成。複雑な JOIN・ウィンドウ関数・集計クエリの試行錯誤を短縮。",
              },
              {
                tag: "dbt / データエンジニアリング",
                desc: "モデル・マクロ・DAG のスキャフォールド、リファクタ、ドキュメント生成。ローカルリポジトリと Snowflake を横断。",
              },
              {
                tag: "Semantic View / Analyst",
                desc: "Cortex Analyst 用のセマンティックモデル定義の検証・曖昧性の指摘・ER 図生成。",
              },
              {
                tag: "ML / Snowpark",
                desc: "特徴量エンジニアリング、学習パイプライン、推論用ストアドプロシージャの生成支援。",
              },
              {
                tag: "エージェント構築",
                desc: "Cortex Agents の定義、ツール登録、MCP コネクタ設定をコードとして生成・デプロイ。",
              },
              {
                tag: "データガバナンス",
                desc: "スキーマ差分、系譜の確認、マスキングポリシー設計のレビュー支援。",
              },
            ].map((f) => (
              <div
                key={f.tag}
                className="flex flex-col sm:flex-row sm:items-start gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
              >
                <span className="font-bold text-cyan-700 text-sm shrink-0 sm:w-44">{f.tag}</span>
                <span className="text-sm text-slate-600 leading-relaxed">{f.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="intelligence" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Intelligence との関係</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border-2 border-violet-300 bg-violet-50/50 rounded-xl p-5">
              <h4 className="font-bold text-violet-900 mb-2">Snowflake Intelligence（ビジネス向け）</h4>
              <ul className="text-sm text-slate-700 space-y-2 leading-relaxed">
                <li>・Snowsight 上の会話 UI で質問・レポート・自動化</li>
                <li>・Cortex Agents をマネージドに利用（オーケストレーション不要）</li>
                <li>・ビジネスユーザー・分析担当者が主な利用者</li>
              </ul>
            </div>
            <div className="border-2 border-cyan-300 bg-cyan-50/50 rounded-xl p-5">
              <h4 className="font-bold text-cyan-900 mb-2">Cortex Code（ビルダー向け）</h4>
              <ul className="text-sm text-slate-700 space-y-2 leading-relaxed">
                <li>・SQL・dbt・パイプライン・エージェント定義をコードとして生成</li>
                <li>・CLI / IDE でローカル開発・CI と統合</li>
                <li>・データエンジニア・開発者が主な利用者</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 leading-relaxed">
            同じ Cortex Agents・Cortex Search・Analyst 基盤の上に、
            Intelligence は「利用」、Cortex Code は「構築・運用」のインターフェースが載ります。
          </p>
        </section>

        <section id="extensions" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. 拡張と連携</h3>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden text-sm">
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  {["方式", "概要", "典型的な用途"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-slate-800">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    way: "MCP（Model Context Protocol）",
                    summary: "GitHub・Jira・Slack 等の外部ツールをエージェントセッションに接続",
                    use: "チケット参照しながら dbt 修正、PR 作成と SQL 検証を一連化",
                  },
                  {
                    way: "Agent SDK（Python / TypeScript）",
                    summary: "Cortex Code のエージェントループを自社アプリやバッチに組み込み",
                    use: "社内ポータルからデータパイプライン生成、定期メンテ自動化",
                  },
                  {
                    way: "ACP（Agent Client Protocol）",
                    summary: "VS Code・Cursor 等のエディタが Cortex Code をバックエンドとして利用",
                    use: "普段使いの IDE で diff 表示・ファイル編集を維持したままエージェント利用",
                  },
                  {
                    way: "Built-in Skills",
                    summary: "エージェント作成・ML・データエンジニアリング向けの定型スキル",
                    use: "セマンティックカタログ検索、dbt DAG 生成、データ差分チェック",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.way}
                    className={`border-t border-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="px-4 py-3 font-semibold text-cyan-800 whitespace-nowrap">{row.way}</td>
                    <td className="px-4 py-3 text-slate-700 leading-relaxed">{row.summary}</td>
                    <td className="px-4 py-3 text-slate-600 leading-relaxed">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="approaches" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">5. 他アプローチとの使い分け</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  {["観点", "Cortex Code", "カスタム BFF（snowflake-sdk）", "汎用 AI エディタ"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-slate-800">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["主な用途", "データ基盤の構築・運用・エージェント開発", "本番アプリの API・UI 連携", "一般的なアプリ開発全般"],
                  ["Snowflake 文脈", "スキーマ・RBAC・系譜を内蔵", "実装者が SQL を明示的に記述", "接続設定のみ（文脈は薄い）"],
                  ["成果物", "SQL・dbt・パイプライン・DDL", "REST API・Next.js 画面", "任意のソースコード"],
                  ["向くフェーズ", "設計・実装・リファクタ・運用", "本番サービスの安定稼働", "Snowflake 外の開発"],
                ].map((row, i) => (
                  <tr key={row[0]} className={`border-t border-gray-200 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-4 py-3 leading-relaxed ${j === 0 ? "font-semibold text-slate-800 whitespace-nowrap" : "text-slate-600"}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3 leading-relaxed">
            本番アプリのユーザー向け画面は引き続き Next.js + Snowflake Adaptor が担い、
            Cortex Code はデータ層・パイプライン・エージェント定義の開発加速に使う、という分担が現実的です。
          </p>
        </section>

        <section id="cli" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">6. CLI の最小利用イメージ</h3>
          <pre className="bg-gray-900 text-green-300 rounded-lg p-4 text-xs leading-relaxed overflow-auto">{`# Cortex Code CLI（ターミナル）
# Snowflake アカウントに接続済みの状態で起動

> 売上テーブルの月次集計ビューを dbt モデルとして作成して

# エージェントがスキーマを参照し、models/marts/ 以下に SQL を生成
# ! プレフィックスでローカルコマンドも実行可能
> ! dbt run --select monthly_sales`}</pre>
          <p className="text-xs text-gray-600 mt-3 leading-relaxed">
            Snowsight 版はブラウザ上で同様の会話が可能です。認証は既存の Snowflake ログイン（SSO / Key Pair 等）を利用します。
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">7. 関連リンク（社内資料）</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/training/snowflake/intelligence", label: "Snowflake Intelligence", desc: "ビジネス向けエージェント UI" },
              { href: "/training/snowflake/adaptor", label: "Snowflake Adaptor", desc: "Next.js BFF 接続層" },
              { href: "/training/snowflake/rag", label: "RAG 構築", desc: "Cortex Search + COMPLETE" },
              { href: "/training/snowflake/cortex", label: "Cortex AI", desc: "LLM・Search・Analyst" },
              { href: "/training/snowflake/mcp-gateway", label: "MCP ゲートウェイ", desc: "外部ツール連携" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block rounded-xl border border-gray-200 bg-white hover:border-cyan-300 hover:bg-cyan-50/50 transition-colors px-4 py-3 min-w-[140px]"
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
            Cortex Code は、Snowflake 環境を理解した開発者向け AI コーディングエージェントです。
            SQL・dbt・ML・エージェント構築を会話ベースで加速し、Intelligence が担うビジネス利用と対になるビルダー層を提供します。
            CLI・IDE・MCP・Agent SDK により、既存の開発フローに組み込みやすい点が特徴です。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-white/10 px-4 py-3">・データネイティブな文脈理解</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・CLI / IDE / Snowsight 多端末</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・MCP・Agent SDK で拡張</div>
          </div>
        </section>
      </div>
    </div>
  );
}
