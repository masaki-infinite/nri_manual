import Link from "next/link";

const coreComponents = [
  {
    component: "Apache Spark",
    role: "データの高速な分散処理エンジン（プラットフォームの心臓部）",
  },
  {
    component: "Delta Lake",
    role: "データレイク上でデータの更新・削除を安全・確実に行う仕組み（ACIDトランザクションの提供）",
  },
  {
    component: "MLflow",
    role: "機械学習モデルの実験履歴、パラメータ、本番導入までを一元管理する機能",
  },
  {
    component: "Databricks SQL",
    role: "アナリストが使い慣れたSQLを使って、データレイク上のデータを直接かつ高速に分析できる機能",
  },
  {
    component: "Unity Catalog",
    role: "組織内のすべてのデータやAIモデルへのアクセス権限を統合的に管理・監査する機能",
  },
];

const comparisonRows = [
  {
    axis: "得意なデータ構造",
    databricks: "非構造化、半構造化、構造化すべて",
    snowflake: "構造化、半構造化が非常に得意（非構造化も対応強化中）",
  },
  {
    axis: "主な対象ユーザー",
    databricks: "データサイエンティスト、AIエンジニア",
    snowflake: "データアナリスト、BIエンジニア、ビジネス層",
  },
  {
    axis: "主要な言語",
    databricks: "Python, SQL, Scala, R",
    snowflake: "SQL, Python (Snowpark), Java",
  },
  {
    axis: "インフラ管理",
    databricks: "クラスター（計算ノード）の起動構成など、一定の調整が必要",
    snowflake: "完全マネージド。インフラを意識せず瞬時に自動スケール",
  },
  {
    axis: "AI / 機械学習",
    databricks: "業界標準（MLflowなど内蔵）。LLM開発やAIモデル運用に圧倒的強み",
    snowflake: "Cortex機能などを追加中。SQLやPythonで手軽にAIを利用可能",
  },
  {
    axis: "データ共有",
    databricks: "Delta Sharing（オープンソース基準）",
    snowflake: "Snowflake Data Marketplace（安全かつ瞬時に企業間共有）",
  },
];

export default function DatabricksTrainingPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/training"
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">Databricks 勉強会資料</h2>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">
            Databricksとは
          </h3>
          <p className="text-slate-700 leading-7">
            DatabricksとSnowflakeは、もともと全く異なる出発点からスタートしましたが、現在では互いの領域を
            カバーし合うように進化しており、データ基盤の選定で最も比較される2大プラットフォームです。
          </p>
          <p className="text-slate-800 font-semibold mt-4">
            一言で言えば、「AI・データエンジニアリング重視のDatabricks」か、
            「BI・データウェアハウス重視のSnowflake」か、という違いです。
          </p>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Databricksの主要コンポーネント</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">コンポーネント</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">役割</th>
                </tr>
              </thead>
              <tbody>
                {coreComponents.map((item) => (
                  <tr key={item.component} className="border-t border-gray-200">
                    <td className="px-4 py-3 font-medium text-slate-900">{item.component}</td>
                    <td className="px-4 py-3 text-slate-700">{item.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. 出自とアプローチの違い</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <h4 className="font-semibold text-red-900 mb-2">Databricks（コード・ファースト）</h4>
              <p className="text-sm text-slate-700 leading-6">
                非構造化データも含めた大量データ処理とAI・機械学習を出発点とする、
                エンジニア/データサイエンティスト向けプラットフォームです。
              </p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50 p-5">
              <h4 className="font-semibold text-sky-900 mb-2">Snowflake（SQL・ファースト）</h4>
              <p className="text-sm text-slate-700 leading-6">
                構造化データの高速分析と完全マネージド運用を出発点とする、
                アナリスト向けプラットフォームです。
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. 徹底比較表（Databricks vs Snowflake）</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">比較軸</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">Databricks</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">Snowflake</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.axis} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.axis}</td>
                    <td className="px-4 py-3 text-slate-700">{row.databricks}</td>
                    <td className="px-4 py-3 text-slate-700">{row.snowflake}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <h3 className="text-xl font-semibold text-red-900 mb-3">3. Databricksの強みと弱み</h3>
            <p className="text-sm text-slate-700 leading-6 mb-2">
              <span className="font-semibold">強み:</span> 大規模ETLとAI/機械学習（生成AI含む）の開発・運用が強力。
              データレイクのオープン思想でベンダーロックインを避けやすい。
            </p>
            <p className="text-sm text-slate-700 leading-6">
              <span className="font-semibold">弱み:</span> 自由度が高い反面、クラスター設定やチューニングにスキルが必要で、
              初期導入ハードルはやや高め。
            </p>
          </div>

          <div className="rounded-xl border border-sky-200 bg-sky-50 p-6">
            <h3 className="text-xl font-semibold text-sky-900 mb-3">3. Snowflakeの強みと弱み</h3>
            <p className="text-sm text-slate-700 leading-6 mb-2">
              <span className="font-semibold">強み:</span> セットアップが簡単でSQL分析が高速。
              BI連携と企業間データ共有（マーケットプレイス）に強い。
            </p>
            <p className="text-sm text-slate-700 leading-6">
              <span className="font-semibold">弱み:</span> 高度な機械学習実験やモデル管理はDatabricksに一日の長がある。
            </p>
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold mb-4">4. 用途の使い分け（どちらを選ぶべきか）</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl bg-white/10 p-4">
              <h4 className="font-semibold mb-2">Databricksを選ぶべきケース</h4>
              <ul className="space-y-1 text-slate-200">
                <li>・AI、機械学習、生成AI（LLM）構築が主目的</li>
                <li>・PythonやSpark人材が豊富</li>
                <li>・非構造化データを大量に扱う</li>
              </ul>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <h4 className="font-semibold mb-2">Snowflakeを選ぶべきケース</h4>
              <ul className="space-y-1 text-slate-200">
                <li>・DWH移行とBI分析/レポーティング高速化が目的</li>
                <li>・SQL中心で分析を進める</li>
                <li>・インフラ管理負荷を最小化したい</li>
                <li>・安全かつ簡単に外部共有したい</li>
              </ul>
            </div>
          </div>
          <div className="mt-5 rounded-xl bg-emerald-500/20 border border-emerald-300/40 p-4 text-sm text-emerald-100 leading-6">
            近年は「Databricksで加工・AI学習、SnowflakeでBI可視化」という併用構成を採る企業も増えています。
          </div>
        </section>
      </div>
    </div>
  );
}
