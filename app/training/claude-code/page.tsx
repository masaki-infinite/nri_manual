import Link from "next/link";

export default function ClaudeCodePage() {
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
        Claude Code 勉強会資料
      </h2>

      <div className="prose max-w-none">
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🤖</span>
            <h3 className="text-lg font-semibold text-purple-900">
              Claude Code - AI開発アシスタント
            </h3>
          </div>
          <p className="text-purple-800 text-sm">
            開催予定: 2026年3月
            <br />
            講師: 開発部 佐藤花子
          </p>
        </div>

        {/* GoogleスライドとPDF表示エリア */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📊 勉強会資料
          </h3>
          
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
            <p className="text-gray-600 text-sm mb-4">
              📎 PDF資料をここに表示
            </p>
            <p className="text-gray-500 text-xs">
              ファイル配置先: <code className="bg-gray-200 px-2 py-1 rounded">public/pdfs/training/claude-code/</code>
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/pdfs/training/claude-code/slide.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              <span>📥</span>
              スライドをダウンロード
            </a>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📘 Claude Codeとは
          </h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Claude CodeはAnthropicが開発したAI開発アシスタントです。
              高度な推論能力と長いコンテキスト理解により、
              複雑なコーディングタスクをサポートします。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">🧠</div>
                <h4 className="font-semibold text-gray-800 mb-2">高度な推論</h4>
                <p className="text-sm text-gray-600">
                  複雑な問題を論理的に分解して解決策を提案
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">📚</div>
                <h4 className="font-semibold text-gray-800 mb-2">長いコンテキスト</h4>
                <p className="text-sm text-gray-600">
                  大規模なコードベース全体を理解
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">🔒</div>
                <h4 className="font-semibold text-gray-800 mb-2">安全性重視</h4>
                <p className="text-sm text-gray-600">
                  セキュアで信頼性の高いコード生成
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            ✨ 主な特徴
          </h3>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                コード理解と説明
              </h4>
              <p className="text-gray-600 text-sm">
                既存のコードを分析し、その動作を自然言語で説明します。
                複雑なレガシーコードの理解に役立ちます。
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                リファクタリング提案
              </h4>
              <p className="text-gray-600 text-sm">
                コードの改善点を特定し、より効率的で読みやすいコードへの
                リファクタリング案を提示します。
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                バグ検出とデバッグ
              </h4>
              <p className="text-gray-600 text-sm">
                潜在的なバグを検出し、修正方法を提案します。
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                ドキュメント生成
              </h4>
              <p className="text-gray-600 text-sm">
                コードから自動的にドキュメントやコメントを生成します。
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📌 今後の予定
          </h3>
          <p className="text-blue-800 text-sm">
            詳細な使用方法や実践例については、今後の勉強会でご紹介します。
            資料は随時更新予定です。
          </p>
        </div>
      </div>
    </div>
  );
}
