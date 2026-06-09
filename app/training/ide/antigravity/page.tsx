import Link from "next/link";

export default function AntigravityTrainingPage() {
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

      <h2 className="text-3xl font-bold text-gray-800 mb-6">Antigravity 勉強会資料</h2>

      <div className="space-y-4">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">概要</h3>
          <p className="text-sm text-purple-900/90 leading-6">
            Antigravity を使ったワークフロー設計、運用パターン、品質管理のポイントを扱うページです。
            実案件で得た知見をここに集約して運用できます。
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">基礎: 導入時に決めること</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
            <li>対象範囲: 設計、実装、テスト、リリースのどこまで自動化するか</li>
            <li>品質基準: Lint、型チェック、テスト成功率などのゲート条件</li>
            <li>運用責任: 失敗時のエスカレーション先と手動介入ルール</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">実務での使い方（最小構成）</h3>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-700">
            <li>テンプレート化した依頼文でタスクを起票する</li>
            <li>生成された変更を PR 単位でレビューする</li>
            <li>検証結果を蓄積して、次回のプロンプト改善に反映する</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
