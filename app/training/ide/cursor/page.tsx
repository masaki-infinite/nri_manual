import Link from "next/link";

export default function CursorTrainingPage() {
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

      <h2 className="text-3xl font-bold text-gray-800 mb-6">Cursor 勉強会資料</h2>

      <div className="space-y-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-emerald-900 mb-2">概要</h3>
          <p className="text-sm text-emerald-900/90 leading-6">
            Cursor のプロンプト運用、差分確認、レビュー連携など実務で使うための要点をまとめるページです。
            チーム向けルールや Tips をここに追加して使ってください。
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">基礎: Cursor 活用の流れ</h3>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-700">
            <li>変更対象ファイルを先に絞り込む</li>
            <li>実装要件と制約を短く明示して指示する</li>
            <li>生成差分をレビューし、テスト実行で確認する</li>
            <li>レビュー観点をテンプレート化して再利用する</li>
          </ol>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">Cursor Skills について</h3>
          <p className="text-sm text-amber-900/90 leading-6 mb-3">
            ここでいう Skills は、反復する作業を標準化するための「再利用プロンプト/手順セット」です。
            実装、レビュー、バグ調査などを定型化して、誰が使っても同じ品質で進められる状態を目指します。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-900/90">
            <div className="bg-white/80 border border-amber-200 rounded p-3">
              <div className="font-semibold mb-1">例1: 実装 Skill</div>
              <div>入力: 要件、対象ファイル、禁止事項</div>
              <div>出力: 変更方針、差分、テスト結果</div>
            </div>
            <div className="bg-white/80 border border-amber-200 rounded p-3">
              <div className="font-semibold mb-1">例2: レビュー Skill</div>
              <div>入力: PR 差分、重要観点</div>
              <div>出力: 重大度つき指摘、再現手順、修正案</div>
            </div>
          </div>
          <div className="mt-3 text-sm text-amber-900/90">
            運用のコツ: Skill は 1 つの目的に絞り、入力フォーマットと完了条件を固定すると品質が安定します。
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">チーム運用の最小ルール</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
            <li>大きな変更は分割し、1 PR 1 目的で管理する</li>
            <li>AI 出力は必ず人がレビューしてからマージする</li>
            <li>有効だったプロンプトは Skills としてドキュメント化する</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
