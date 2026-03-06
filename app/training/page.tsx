export default function TrainingPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">勉強会</h2>

      <div className="prose max-w-none">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📅 今後の勉強会スケジュール
          </h3>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 bg-green-50 rounded-lg p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded">
                      次回
                    </span>
                    <span className="text-gray-700 font-semibold">
                      2026年1月30日（木）18:00-19:30
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    生成AI活用入門 - ChatGPT & Copilot実践
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    最新の生成AIツールを業務でどう活用するか、実例を交えて解説します。
                    初心者の方も大歓迎です。
                  </p>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <span>👤 講師: 技術部 田中太郎</span>
                    <span>•</span>
                    <span>📍 第1会議室</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-indigo-500 bg-indigo-50 rounded-lg p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gray-700 font-semibold">
                      2026年2月13日（木）18:00-19:30
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    クラウドセキュリティの最新動向
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    ゼロトラストアーキテクチャやSASE（Secure Access Service Edge）など、
                    最新のセキュリティ対策について学びます。
                  </p>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <span>👤 講師: セキュリティ部 佐藤花子</span>
                    <span>•</span>
                    <span>📍 第2会議室</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 bg-purple-50 rounded-lg p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gray-700 font-semibold">
                      2026年2月27日（木）18:00-19:30
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    アジャイル開発実践ワークショップ
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    スクラムやカンバンなど、アジャイル開発手法を実践的に学ぶワークショップです。
                  </p>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <span>👤 講師: 開発部 山田次郎</span>
                    <span>•</span>
                    <span>📍 オンライン</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📚 過去の勉強会資料
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="text-3xl">🤖</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    機械学習入門
                  </h4>
                  <p className="text-sm text-gray-500 mb-2">2025年12月 開催</p>
                  <p className="text-gray-600 text-sm mb-3">
                    機械学習の基礎から実践的な活用方法まで。
                  </p>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                    資料ダウンロード →
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="text-3xl">☁️</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    AWSサービス活用術
                  </h4>
                  <p className="text-sm text-gray-500 mb-2">2025年11月 開催</p>
                  <p className="text-gray-600 text-sm mb-3">
                    AWSの主要サービスと効果的な活用方法。
                  </p>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                    資料ダウンロード →
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="text-3xl">🔒</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    情報セキュリティ対策
                  </h4>
                  <p className="text-sm text-gray-500 mb-2">2025年10月 開催</p>
                  <p className="text-gray-600 text-sm mb-3">
                    最新のサイバー攻撃と対策手法。
                  </p>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                    資料ダウンロード →
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="text-3xl">📱</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    モバイルアプリ開発
                  </h4>
                  <p className="text-sm text-gray-500 mb-2">2025年9月 開催</p>
                  <p className="text-gray-600 text-sm mb-3">
                    React NativeとFlutterの比較と選定。
                  </p>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                    資料ダウンロード →
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="text-3xl">🗄️</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    データベース設計の基本
                  </h4>
                  <p className="text-sm text-gray-500 mb-2">2025年8月 開催</p>
                  <p className="text-gray-600 text-sm mb-3">
                    正規化からパフォーマンス最適化まで。
                  </p>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                    資料ダウンロード →
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="text-3xl">🎨</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    UI/UXデザイン思考
                  </h4>
                  <p className="text-sm text-gray-500 mb-2">2025年7月 開催</p>
                  <p className="text-gray-600 text-sm mb-3">
                    ユーザー中心設計とプロトタイピング。
                  </p>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                    資料ダウンロード →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              🎤 勉強会を開催したい方へ
            </h3>
            <p className="text-blue-800 text-sm mb-3">
              社内で勉強会を開催したい方は、研修担当までご連絡ください。
              会議室の手配やオンライン配信のサポートを行います。
            </p>
            <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
              開催申請フォーム →
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              💬 テーマリクエスト
            </h3>
            <p className="text-green-800 text-sm mb-3">
              学びたいテーマや技術があればリクエストしてください。
              多くのリクエストがあったテーマについて勉強会を企画します。
            </p>
            <button className="text-green-600 text-sm font-semibold hover:text-green-700">
              リクエストフォーム →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
