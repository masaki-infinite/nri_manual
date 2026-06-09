import Link from "next/link";

export default function RandDTrainingPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">R&D</h2>
      <p className="text-gray-700 leading-7 mb-8">
        R&D（Research and Development）向けの勉強会ページです。検証テーマ、実験結果、
        技術選定メモを集約し、PoC から本番化までの学びを整理します。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">現在の重点テーマ</h3>
          <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
            <li>Snowflake における地理空間データ処理</li>
            <li>Copilot / Snowflake RAG の比較評価</li>
            <li>運用監査を前提にした根拠提示設計</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">進め方</h3>
          <ol className="text-sm text-gray-700 space-y-1 list-decimal pl-5">
            <li>検証テーマを定義</li>
            <li>最小実装で検証</li>
            <li>結果と課題を記録</li>
            <li>標準化候補を抽出</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
