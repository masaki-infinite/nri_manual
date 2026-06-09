import Link from "next/link";
import SnowflakeSubNav from "../SnowflakeSubNav";

type PatternRow = {
  pattern: string;
  architecture: string;
  strengths: string;
  cautions: string;
  fit: string;
};

type BuildStep = {
  step: string;
  activity: string;
  output: string;
};

const patternRows: PatternRow[] = [
  {
    pattern: "A. Cortex Search中心（最短構築）",
    architecture:
      "Snowflake内データ -> チャンク化/埋め込み -> Cortex Search インデックス -> LLM応答",
    strengths:
      "構築が速い。Snowflake内でデータ・権限・監査を一体運用しやすい。PoCに向く。",
    cautions:
      "高度な再ランキングや独自検索ロジックは後段の拡張が必要。",
    fit: "まず業務適合性を確認したい案件",
  },
  {
    pattern: "B. SPCSで自前RAG（高自由度）",
    architecture:
      "Snowflake + SPCS(FastAPI/推論サーバ) + 独自Retriever/再ランキング + 応答API",
    strengths:
      "モデル選択、検索戦略、プロンプト制御、API設計の自由度が高い。",
    cautions:
      "運用設計（監視・コスト・モデル更新）をしっかり作る必要がある。",
    fit: "要件が複雑で独自実装が必要な案件",
  },
  {
    pattern: "C. ハイブリッド（段階拡張）",
    architecture:
      "初期は Cortex Search、要件が増えた部分のみ SPCS マイクロサービスで補完",
    strengths:
      "初期スピードと将来拡張のバランスが良い。リスクを分割できる。",
    cautions:
      "責務分離（どこまで標準機能でどこから自前か）を明確にする必要がある。",
    fit: "本番展開を見据えた中長期案件",
  },
  {
    pattern: "D. 外部検索基盤連携（既存資産活用）",
    architecture:
      "既存ベクトルDB/検索基盤を活かし、Snowflakeをデータ統制・分析の中核として併用",
    strengths:
      "既存投資を活かせる。移行期間の業務影響を抑えやすい。",
    cautions:
      "権限/監査/同期の責任境界を明確にしないと運用が複雑化しやすい。",
    fit: "既存RAG基盤がある大規模組織",
  },
];

const buildSteps: BuildStep[] = [
  {
    step: "1. ユースケース定義",
    activity: "業務質問の種類、期待精度、回答SLA、禁止回答ルールを定義",
    output: "要件一覧、評価観点、成功基準",
  },
  {
    step: "2. データ準備",
    activity: "文書収集、チャンク設計、メタデータ設計、アクセス権マッピング",
    output: "インデックス対象データと権限モデル",
  },
  {
    step: "3. 検索設計",
    activity: "埋め込み方式、検索条件、フィルタ、再ランキング方針を決定",
    output: "検索フロー設計書",
  },
  {
    step: "4. 生成設計",
    activity: "プロンプトテンプレート、引用表示、ガードレール、応答フォーマットを設計",
    output: "回答仕様・安全設計",
  },
  {
    step: "5. 評価と改善",
    activity: "正答率・再現率・根拠率・応答時間・コストを計測し改善サイクル運用",
    output: "評価レポートと改善バックログ",
  },
  {
    step: "6. 本番運用",
    activity: "監査ログ、アラート、モデル更新手順、問い合わせフローを整備",
    output: "運用Runbook、SLA、障害対応手順",
  },
];

export default function SnowflakeRagTrainingPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">SnowflakeでRAGを構築する方法</h2>
      <SnowflakeSubNav />
      <p className="text-gray-700 leading-7 mb-8">
        SnowflakeでRAGを作る方法は1つではありません。要件（スピード、自由度、既存資産、統制）に応じて、
        構成を選ぶのが成功のポイントです。本ページでは、実務で使いやすい代表パターンを比較して整理します。
      </p>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-indigo-50 to-sky-50 border border-indigo-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">最初に押さえる方針</h3>
          <ul className="space-y-2 text-slate-700 leading-7">
            <li>・短期間で価値検証するなら「Cortex Search中心」</li>
            <li>・複雑な業務ロジックや独自UIが必要なら「SPCS自前RAG」</li>
            <li>・迷ったら「ハイブリッド」で段階拡張（最も失敗しにくい）</li>
            <li>・既存資産が強い場合は「外部検索基盤連携」も有力</li>
          </ul>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">RAG構成パターン比較</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">パターン</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">構成イメージ</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">強み</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">注意点</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">向いている案件</th>
                </tr>
              </thead>
              <tbody>
                {patternRows.map((row) => (
                  <tr key={row.pattern} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.pattern}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.architecture}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.strengths}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.cautions}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">実装ステップ（共通）</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">ステップ</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">作業内容</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">成果物</th>
                </tr>
              </thead>
              <tbody>
                {buildSteps.map((row) => (
                  <tr key={row.step} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{row.step}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.activity}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">推奨アプローチ（実務向け）</h3>
          <p className="text-slate-200 leading-7 mb-4 max-w-4xl">
            多くの案件では、まず Cortex Search中心で業務効果を検証し、差別化が必要な部分だけ SPCS 自前RAGへ拡張する
            「ハイブリッド」方式が最もバランスに優れます。初期速度と将来の自由度を両立できます。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-white/10 px-4 py-3">・初期立ち上げが速い</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・統制を維持しやすい</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・要件増に追従しやすい</div>
          </div>
        </section>
      </div>
    </div>
  );
}
