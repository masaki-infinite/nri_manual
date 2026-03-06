export default function ContractsPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">契約関係</h2>

      <div className="prose max-w-none">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📋 契約書作成の流れ
          </h3>
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">事前確認</h4>
                <p className="text-gray-600 text-sm">
                  契約内容、取引先情報、必要な条項などを確認します。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">ドラフト作成</h4>
                <p className="text-gray-600 text-sm">
                  テンプレートを使用して契約書のドラフトを作成します。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">法務部レビュー</h4>
                <p className="text-gray-600 text-sm">
                  法務部による内容確認とレビューを実施します。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">承認・締結</h4>
                <p className="text-gray-600 text-sm">
                  関係者の承認を得て、契約を締結します。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📄 契約書テンプレート
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-800 mb-2">業務委託契約書</h4>
              <p className="text-gray-600 text-sm mb-3">
                標準的な業務委託契約のテンプレートです。
              </p>
              <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                ダウンロード →
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-800 mb-2">秘密保持契約書</h4>
              <p className="text-gray-600 text-sm mb-3">
                NDA（秘密保持契約）のテンプレートです。
              </p>
              <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                ダウンロード →
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-800 mb-2">
                ソフトウェア使用許諾契約書
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                ソフトウェアライセンス契約のテンプレートです。
              </p>
              <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                ダウンロード →
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-800 mb-2">保守契約書</h4>
              <p className="text-gray-600 text-sm mb-3">
                システム保守契約のテンプレートです。
              </p>
              <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                ダウンロード →
              </button>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">
            ⚠️ 注意事項
          </h3>
          <ul className="text-yellow-800 text-sm space-y-2">
            <li>• 契約書の作成前に必ず法務部に相談してください</li>
            <li>• 金額が1000万円を超える契約は役員承認が必要です</li>
            <li>• 契約締結後は必ず契約管理システムに登録してください</li>
            <li>• 契約書の原本は指定の保管場所に保管してください</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
