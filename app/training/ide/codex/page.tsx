import Link from "next/link";

export default function CodexTrainingPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-4 text-sm">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 font-medium">
          ← 勉強会一覧
        </Link>
        <Link href="/training/ide" className="text-indigo-600 hover:text-indigo-700 font-medium">
          IDE 一覧
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">CodeX 勉強会資料</h2>

      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">概要</h3>
          <p className="text-sm text-blue-900/90 leading-6">
            CodeX を使った実装補助、コードレビュー、リファクタリングの進め方を扱うページです。
            具体例やチーム運用ルールをこのページに追記して利用してください。
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">基礎: まず覚える 3 点</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
            <li>依頼文は「目的・制約・完了条件」の 3 点を明記する</li>
            <li>ファイル単位で小さく修正を進め、都度ビルド/テストで検証する</li>
            <li>レビュー時はバグ、回帰リスク、テスト不足を優先して確認する</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">推奨ワークフロー</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm text-gray-700">
            <div className="rounded border border-gray-200 p-3">1. タスク分解</div>
            <div className="rounded border border-gray-200 p-3">2. 実装</div>
            <div className="rounded border border-gray-200 p-3">3. 検証</div>
            <div className="rounded border border-gray-200 p-3">4. 要約共有</div>
          </div>
        </div>
      </div>
    </div>
  );
}
