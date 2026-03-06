import Link from "next/link";

export default function SemanticLayerPage() {
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

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        セマンティックレイヤー 勉強会資料
      </h2>

      <div className="prose max-w-none">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📊</span>
            <h3 className="text-lg font-semibold text-green-900">
              セマンティックレイヤー - データの意味を統一する
            </h3>
          </div>
          <p className="text-green-800 text-sm">
            開催予定: 2026年4月
            <br />
            講師: データ分析部 山田次郎
          </p>
        </div>

        {/* GoogleスライドとPDF表示エリア */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📊 勉強会資料
          </h3>
          
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">プレゼンテーション資料</h4>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://docs.google.com/presentation/d/1GHRj2fbBEN1rtTdAX01soOtnnhEmK5QjnIudgE6-In8/embed?start=false&loop=false&delayms=3000"
                frameBorder="0"
                width="100%"
                height="569"
                allowFullScreen={true}
                className="w-full"
              ></iframe>
            </div>
            <p className="text-gray-500 text-xs mt-2">
              ※ フルスクリーンで表示するには、右下のアイコンをクリックしてください
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="https://docs.google.com/presentation/d/1GHRj2fbBEN1rtTdAX01soOtnnhEmK5QjnIudgE6-In8/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <span>📊</span>
              Googleスライドで開く
            </a>
            <a
              href="/pdfs/training/semantic-layer/slide.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              <span>📥</span>
              PDFをダウンロード
            </a>
            <a
              href="/pdfs/training/semantic-layer/handout.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              <span>📥</span>
              配布資料をダウンロード
            </a>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📘 セマンティックレイヤーとは
          </h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              セマンティックレイヤーは、データウェアハウスやデータレイクの上に構築される
              抽象化レイヤーです。ビジネス用語とデータベースのテーブル・カラムを
              マッピングし、一貫したデータの意味を提供します。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">🔄</div>
                <h4 className="font-semibold text-gray-800 mb-2">データ統一</h4>
                <p className="text-sm text-gray-600">
                  複数のデータソースを統一した見方で扱える
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-800 mb-2">ビジネス寄り</h4>
                <p className="text-sm text-gray-600">
                  ビジネス用語でデータにアクセス可能
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-gray-800 mb-2">効率化</h4>
                <p className="text-sm text-gray-600">
                  重複したメトリクス定義を削減
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            🎯 主なメリット
          </h3>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                一貫性のあるメトリクス
              </h4>
              <p className="text-gray-600 text-sm">
                「売上」「顧客数」などのメトリクスを組織全体で統一的に定義。
                部署ごとに異なる計算方法を防ぎます。
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                セルフサービス分析
              </h4>
              <p className="text-gray-600 text-sm">
                ビジネスユーザーが技術的な知識なしでデータにアクセスできます。
                SQLを書かずにレポートを作成可能。
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                変更の容易性
              </h4>
              <p className="text-gray-600 text-sm">
                データソースの変更があっても、セマンティックレイヤーを更新するだけで
                すべてのレポートに反映されます。
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                ガバナンスと権限管理
              </h4>
              <p className="text-gray-600 text-sm">
                データへのアクセス権限を一元管理し、セキュリティとコンプライアンスを確保。
              </p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            🛠️ 主要なツール
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span>❄️</span>
                dbt Semantic Layer
              </h4>
              <p className="text-gray-600 text-sm">
                dbtに統合されたセマンティックレイヤー。
                メトリクスをコードとして管理できます。
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span>🎲</span>
                Cube.js
              </h4>
              <p className="text-gray-600 text-sm">
                オープンソースのセマンティックレイヤー。
                APIファーストでモダンな構成。
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span>📊</span>
                Looker LookML
              </h4>
              <p className="text-gray-600 text-sm">
                Lookerのモデリング言語。
                BIツールに統合されたセマンティックレイヤー。
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span>⚡</span>
                AtScale
              </h4>
              <p className="text-gray-600 text-sm">
                エンタープライズ向けセマンティックレイヤープラットフォーム。
              </p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📋 実装のポイント
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">1.</span>
                <div className="flex-1">
                  <strong className="text-sm">ビジネス用語の定義</strong>
                  <p className="text-sm text-gray-600 mt-1">
                    まず、組織で使われるビジネス用語（メトリクス、ディメンション）を明確に定義します。
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">2.</span>
                <div className="flex-1">
                  <strong className="text-sm">データモデルの設計</strong>
                  <p className="text-sm text-gray-600 mt-1">
                    スタースキーマやスノーフレークスキーマなど、適切なデータモデルを設計します。
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">3.</span>
                <div className="flex-1">
                  <strong className="text-sm">メトリクスの標準化</strong>
                  <p className="text-sm text-gray-600 mt-1">
                    計算方法、集計ルール、フィルター条件を統一的に定義します。
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">4.</span>
                <div className="flex-1">
                  <strong className="text-sm">アクセス権限の設定</strong>
                  <p className="text-sm text-gray-600 mt-1">
                    データのセキュリティとプライバシーを考慮した権限設計を行います。
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            🔗 参考リンク
          </h3>
          <div className="space-y-2 text-sm">
            <a
              href="https://www.getdbt.com/product/semantic-layer"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-green-700 hover:text-green-800"
            >
              → dbt Semantic Layer
            </a>
            <a
              href="https://cube.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-green-700 hover:text-green-800"
            >
              → Cube.js 公式サイト
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
