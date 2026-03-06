export default function ProposalsPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">提案書作成</h2>

      <div className="prose max-w-none">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            ✍️ 提案書作成のポイント
          </h3>
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="border-l-4 border-indigo-600 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                1. お客様の課題を明確に
              </h4>
              <p className="text-gray-600 text-sm">
                提案書の冒頭で、お客様が抱えている課題や問題点を明確に記載します。
                お客様と同じ視点に立つことが重要です。
              </p>
            </div>

            <div className="border-l-4 border-indigo-600 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                2. 解決策を具体的に
              </h4>
              <p className="text-gray-600 text-sm">
                課題に対する解決策を具体的に提示します。
                実現可能性やメリットを明確に示すことが重要です。
              </p>
            </div>

            <div className="border-l-4 border-indigo-600 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                3. 実績・事例の活用
              </h4>
              <p className="text-gray-600 text-sm">
                類似の実績や事例を紹介することで、信頼性と説得力を高めます。
                具体的な数値や成果を含めると効果的です。
              </p>
            </div>

            <div className="border-l-4 border-indigo-600 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                4. スケジュールと費用
              </h4>
              <p className="text-gray-600 text-sm">
                プロジェクトのスケジュールと費用を明確に提示します。
                フェーズ分けや段階的な実施も検討しましょう。
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📑 提案書テンプレート
          </h3>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-indigo-600">📄</span>
                    システム開発提案書テンプレート
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    システム開発プロジェクトの提案書として使用できる標準テンプレートです。
                    課題分析から実装計画まで網羅しています。
                  </p>
                  <div className="flex gap-3">
                    <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                      PowerPoint版 →
                    </button>
                    <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                      Word版 →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-indigo-600">📄</span>
                    コンサルティング提案書テンプレート
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    業務改善やIT戦略のコンサルティング提案に使用できるテンプレートです。
                  </p>
                  <div className="flex gap-3">
                    <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                      PowerPoint版 →
                    </button>
                    <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                      Word版 →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-indigo-600">📄</span>
                    RFP対応提案書テンプレート
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    お客様のRFPに対応するための提案書テンプレートです。
                    要求事項に対する回答形式で構成されています。
                  </p>
                  <div className="flex gap-3">
                    <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                      Excel版 →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            🎯 参考事例
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                製造業向けERPシステム導入
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                生産管理の効率化を目的としたERP導入プロジェクト。
                導入後、在庫管理コストを30%削減に成功。
              </p>
              <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                詳細を見る →
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                金融機関向けセキュリティ強化
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                次世代セキュリティシステムの導入により、
                サイバー攻撃への対応力を大幅に向上。
              </p>
              <button className="text-green-600 text-sm font-medium hover:text-green-700">
                詳細を見る →
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                小売業向けオムニチャネル構築
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                ECとリアル店舗を統合したシステム構築。
                顧客満足度が40%向上。
              </p>
              <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
                詳細を見る →
              </button>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                自治体向けDX推進支援
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                行政手続きのデジタル化により、
                処理時間を50%短縮。
              </p>
              <button className="text-orange-600 text-sm font-medium hover:text-orange-700">
                詳細を見る →
              </button>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            💡 提案書レビューサービス
          </h3>
          <p className="text-blue-800 text-sm mb-3">
            提案書の作成に不安がある場合は、営業企画部のレビューサービスをご利用ください。
            経験豊富なメンバーが内容をチェックし、改善点をアドバイスします。
          </p>
          <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
            レビュー依頼フォーム →
          </button>
        </div>
      </div>
    </div>
  );
}
