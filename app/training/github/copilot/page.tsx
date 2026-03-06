import Link from "next/link";

export default function GitHubCopilotPage() {
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
        GitHub Copilot 勉強会資料
      </h2>

      <div className="prose max-w-none">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🤖</span>
            <h3 className="text-lg font-semibold text-blue-900">
              GitHub Copilot - AI ペアプログラミング
            </h3>
          </div>
          <p className="text-blue-800 text-sm">
            開催日: 2026年1月30日
            <br />
            講師: 技術部 田中太郎
          </p>
        </div>

        {/* セクション1: 概要 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📘 GitHub Copilotとは
          </h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              GitHub CopilotはOpenAIのCodexモデルをベースとしたAIペアプログラマーです。
              コードの自動補完、関数の生成、コメントからのコード生成など、
              開発者の生産性を大幅に向上させます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-gray-800 mb-2">高速コーディング</h4>
                <p className="text-sm text-gray-600">
                  リアルタイムでコード提案を表示し、開発速度を向上
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-800 mb-2">文脈理解</h4>
                <p className="text-sm text-gray-600">
                  プロジェクト全体のコンテキストを理解して適切な提案
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">🌐</div>
                <h4 className="font-semibold text-gray-800 mb-2">多言語対応</h4>
                <p className="text-sm text-gray-600">
                  Python、JavaScript、TypeScriptなど幅広い言語をサポート
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* GoogleスライドとPDF表示 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📊 勉強会スライド
          </h3>
          
          {/* Googleスライド埋め込み */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">プレゼンテーション資料</h4>
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-600 text-sm mb-4">
                📎 Googleスライドを表示するには、以下のようにiframeを使用します：
              </p>
              <div className="bg-white p-4 rounded text-left">
                <code className="text-xs text-gray-700 block whitespace-pre-wrap break-all">
{`<iframe
  src="https://docs.google.com/presentation/d/e/YOUR_SLIDE_ID/embed?start=false&loop=false&delayms=3000"
  frameBorder="0"
  width="100%"
  height="569"
  allowFullScreen={true}
  className="rounded-lg"
></iframe>`}
                </code>
              </div>
              <p className="text-gray-500 text-xs mt-4">
                ※ GoogleスライドのURLを「ファイル」→「共有」→「ウェブに公開」から取得してください
              </p>
            </div>
          </div>

          {/* PDF表示 */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">PDF資料</h4>
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-600 text-sm mb-4">
                📄 PDFを表示するには、public/pdfsフォルダに配置して以下のように使用します：
              </p>
              <div className="bg-white p-4 rounded text-left">
                <code className="text-xs text-gray-700 block whitespace-pre-wrap break-all">
{`<iframe
  src="/pdfs/training/github-copilot/slide.pdf"
  width="100%"
  height="600"
  className="rounded-lg border"
></iframe>`}
                </code>
              </div>
              <p className="text-gray-500 text-xs mt-4">
                ファイル配置先: <code className="bg-gray-200 px-2 py-1 rounded">public/pdfs/training/github-copilot/</code>
              </p>
            </div>
            
            {/* ダウンロードリンク例 */}
            <div className="mt-4 flex gap-3">
              <a
                href="/pdfs/training/github-copilot/slide.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
              >
                <span>📥</span>
                スライドをダウンロード (PDF)
              </a>
              <a
                href="/pdfs/training/github-copilot/handout.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                <span>📥</span>
                配布資料をダウンロード (PDF)
              </a>
            </div>
          </div>
        </div>

        {/* セクション2: 主な機能 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            ✨ 主な機能
          </h3>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-xl">💡</span>
                コード補完
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                入力中のコードを予測して、次に書くべきコードを自動提案します。
                Tabキーで提案を受け入れることができます。
              </p>
              <div className="bg-white rounded p-3 font-mono text-xs text-gray-700">
                <span className="text-gray-400">// 関数名を入力するだけで...</span>
                <br />
                <span className="text-blue-600">function</span> calculateTotal
                <span className="text-gray-400"> → Copilotが実装を提案</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-xl">💬</span>
                コメントからコード生成
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                自然言語のコメントを書くと、その内容に基づいてコードを生成します。
              </p>
              <div className="bg-white rounded p-3 font-mono text-xs text-gray-700">
                <span className="text-gray-400">
                  // ユーザーの年齢が18歳以上かチェックする関数
                </span>
                <br />
                <span className="text-gray-400">
                  → Copilotが関数を自動生成
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-xl">🔄</span>
                複数の提案
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                Alt + ] または Alt + [ で複数の提案を切り替えることができます。
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-xl">🧪</span>
                テストコード生成
              </h4>
              <p className="text-gray-600 text-sm">
                既存の関数に対して、テストコードを自動生成できます。
              </p>
            </div>
          </div>
        </div>

        {/* セクション3: 使い方 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            🚀 使い方
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">インストール</h4>
                <p className="text-gray-600 text-sm">
                  VS CodeまたはJetBrains IDEの拡張機能マーケットプレイスから
                  「GitHub Copilot」をインストールします。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">
                  GitHubアカウントで認証
                </h4>
                <p className="text-gray-600 text-sm">
                  拡張機能をインストール後、GitHubアカウントでサインインします。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">コーディング開始</h4>
                <p className="text-gray-600 text-sm">
                  通常通りコーディングを開始すると、自動的に提案が表示されます。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* セクション4: ベストプラクティス */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            💡 ベストプラクティス
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-sm">
                  明確なコメントを書く - Copilotは自然言語の指示をよく理解します
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-sm">
                  関数名と変数名は分かりやすく - 適切な命名で精度の高い提案を得られます
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-sm">
                  生成されたコードをレビュー - 必ず内容を確認してから使用しましょう
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-sm">
                  複数の提案を比較 - 最適な実装を選択するため、複数の提案を確認しましょう
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">
            ⚠️ 注意事項
          </h3>
          <ul className="text-yellow-800 text-sm space-y-2 list-disc list-inside">
            <li>
              生成されたコードには著作権やライセンスの問題がある可能性があります
            </li>
            <li>機密情報やパスワードを含むコメントは書かないでください</li>
            <li>
              生成されたコードは必ずレビューし、セキュリティ上の問題がないか確認してください
            </li>
            <li>Copilotはあくまで補助ツールです。最終的な判断は開発者が行ってください</li>
          </ul>
        </div>

        {/* 関連リンク */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🔗 関連リンク</h3>
          <div className="space-y-2">
            <a
              href="https://github.com/features/copilot"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-indigo-600 hover:text-indigo-700 text-sm"
            >
              → GitHub Copilot 公式サイト
            </a>
            <a
              href="https://docs.github.com/ja/copilot"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-indigo-600 hover:text-indigo-700 text-sm"
            >
              → GitHub Copilot ドキュメント
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
