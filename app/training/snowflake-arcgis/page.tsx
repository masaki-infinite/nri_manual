import Link from "next/link";

type MethodRow = {
  method: string;
  flow: string;
  pros: string;
  cautions: string;
  recommendedFor: string;
};

type StepRow = {
  step: string;
  task: string;
  output: string;
};

const methodRows: MethodRow[] = [
  {
    method: "A. バッチ連携（最初の一歩）",
    flow: "Snowflakeテーブル -> 定期抽出(CSV/GeoJSON) -> ArcGIS Hosted Feature Layer更新",
    pros: "実装がシンプルでPoC向き。運用チームに引き継ぎやすい。",
    cautions: "リアルタイム性は低い。更新間隔の設計が必要。",
    recommendedFor: "日次/週次更新で十分な業務ダッシュボード",
  },
  {
    method: "B. API連携（準リアルタイム）",
    flow: "Snowflakeで集約ビュー作成 -> API化 -> ArcGISから参照/同期",
    pros: "鮮度を上げやすく、業務イベントに追従しやすい。",
    cautions: "API監視、エラーハンドリング、認証設計が必要。",
    recommendedFor: "防災・交通など更新頻度が高い用途",
  },
  {
    method: "C. Snowpark/SPCS連携（高度要件）",
    flow: "Snowpark/SPCSで変換・空間前処理 -> ArcGISレイヤへ配信",
    pros: "複雑な前処理・推論・ワークフローを統合できる。",
    cautions: "開発・運用の難易度が上がる。チーム体制が必要。",
    recommendedFor: "高度分析・AI併用・大規模連携案件",
  },
  {
    method: "D. ハイブリッド（推奨）",
    flow: "基幹データはバッチ、重要データはAPI連携で段階的に構成",
    pros: "コスト、速度、保守性のバランスが良い。",
    cautions: "データ責務分割と監査方針を最初に明確化する必要。",
    recommendedFor: "本番を見据えた中長期導入",
  },
];

const stepRows: StepRow[] = [
  {
    step: "1. ユースケース整理",
    task: "誰が・何を・どの頻度で見るかを定義し、更新SLAを決める",
    output: "要件定義書（鮮度/精度/セキュリティ）",
  },
  {
    step: "2. データモデル整備",
    task: "Snowflake側で空間キー、座標、属性、履歴を正規化",
    output: "連携対象テーブル/ビュー仕様",
  },
  {
    step: "3. 連携方式選定",
    task: "バッチ/API/SPCSのどれで連携するかを業務要件で決定",
    output: "連携アーキテクチャ案",
  },
  {
    step: "4. ArcGIS実装",
    task: "Hosted Feature Layer、Scene Layer、Experience Builder/SDK画面を構築",
    output: "利用者向け画面プロトタイプ",
  },
  {
    step: "5. 運用設計",
    task: "ジョブ監視、障害通知、データ品質チェック、監査ログを整備",
    output: "運用Runbookと監視ダッシュボード",
  },
  {
    step: "6. 展開",
    task: "部門PoC -> 横展開の順で導入し、KPIで効果を評価",
    output: "展開計画書と効果測定レポート",
  },
];

export default function SnowflakeArcGisTrainingPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Snowflake × ArcGIS 接続開発方法</h2>
      <p className="text-gray-700 leading-7 mb-4 max-w-4xl">
        SnowflakeとArcGISを接続する方法は1つではありません。更新頻度、運用体制、セキュリティ要件に応じて
        連携方式を選ぶことが重要です。本ページでは、実務で使いやすい方式と進め方を整理します。
      </p>
      <p className="text-sm text-sky-800 bg-sky-50 border border-sky-200 rounded-lg px-4 py-3 mb-8 max-w-4xl leading-6">
        <span className="font-semibold">典型的な Phase 1 では GIS データは ArcGIS Pro で管理</span>し、Hosted Feature Layer として配信します。
        Snowflake への GIS 格納は開発初期には不要なことが多いです。文書・業務データとの統合が必要になった段階で、本ページの連携方式を検討してください。
      </p>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">設計の基本方針</h3>
          <ul className="space-y-2 text-slate-700 leading-7">
            <li>・Phase 1：GIS のマスタは ArcGIS Pro、配信は Hosted Feature Layer（Snowflake 不要）</li>
            <li>・Phase 2 以降：必要に応じて Snowflake に GIS mart を置き、ArcGIS へ同期する拡張を検討</li>
            <li>・連携を入れる場合は、更新頻度・監査・障害時復旧を最初に設計しておく</li>
          </ul>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">連携方式の比較</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">方式</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">データフロー</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">メリット</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">注意点</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">向いている案件</th>
                </tr>
              </thead>
              <tbody>
                {methodRows.map((row) => (
                  <tr key={row.method} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.method}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.flow}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.pros}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.cautions}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.recommendedFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">実装ステップ（推奨）</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">ステップ</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">作業</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">成果物</th>
                </tr>
              </thead>
              <tbody>
                {stepRows.map((row) => (
                  <tr key={row.step} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{row.step}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.task}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">実務での推奨</h3>
          <p className="text-slate-200 leading-7 mb-4 max-w-4xl">
            まずはバッチ連携で早く価値を出し、重要ユースケースからAPI連携へ拡張するハイブリッド方式が、
            速度・保守性・将来拡張のバランスに優れます。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-white/10 px-4 py-3">・短期PoCと本番移行を両立しやすい</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・運用チームに引き継ぎやすい</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・要件拡張に段階対応できる</div>
          </div>
        </section>
      </div>
    </div>
  );
}
