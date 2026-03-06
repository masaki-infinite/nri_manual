import Link from "next/link";

export default function GitHubActionsPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/training/github"
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          ← GitHub勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        GitHub Actions 勉強会資料
      </h2>

      <div className="prose max-w-none">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⚙️</span>
            <h3 className="text-lg font-semibold text-blue-900">
              GitHub Actions - CI/CD自動化
            </h3>
          </div>
          <p className="text-blue-800 text-sm">
            開催日: 2026年2月20日
            <br />
            講師: DevOps部 鈴木太郎
          </p>
        </div>

        {/* PDF表示 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📊 勉強会資料（PDF）
          </h3>
          
          <div className="mb-6">
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <iframe
                src="/pdfs/training/github-actions/Github_actions.pdf"
                width="100%"
                height="800"
                className="w-full"
                title="GitHub Actions資料"
              ></iframe>
            </div>
            <p className="text-gray-500 text-xs mt-2">
              ※ PDFが表示されない場合は、下のダウンロードボタンからファイルを取得してください
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="/pdfs/training/github-actions/Github_actions.pdf"
              download
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              <span>📥</span>
              資料をダウンロード (PDF)
            </a>
          </div>
        </div>

        {/* セクション1: GitHub Actionsとは */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📘 GitHub Actionsとは
          </h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              GitHub ActionsはGitHubが提供するCI/CD（継続的インテグレーション/継続的デリバリー）
              プラットフォームです。コードのビルド、テスト、デプロイメントを自動化できます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">🔄</div>
                <h4 className="font-semibold text-gray-800 mb-2">自動化</h4>
                <p className="text-sm text-gray-600">
                  プッシュやプルリクエストをトリガーに自動実行
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">🧩</div>
                <h4 className="font-semibold text-gray-800 mb-2">柔軟性</h4>
                <p className="text-sm text-gray-600">
                  豊富なアクションとカスタマイズ可能なワークフロー
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">🆓</div>
                <h4 className="font-semibold text-gray-800 mb-2">無料枠</h4>
                <p className="text-sm text-gray-600">
                  パブリックリポジトリは無料、プライベートも月2,000分無料
                </p>
              </div>
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
                <span className="text-xl">🧪</span>
                自動テスト
              </h4>
              <p className="text-gray-600 text-sm">
                コードがプッシュされるたびに自動的にテストを実行。
                問題を早期に発見できます。
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-xl">🚀</span>
                自動デプロイ
              </h4>
              <p className="text-gray-600 text-sm">
                mainブランチへのマージ時に自動的に本番環境へデプロイ。
                手動作業を削減します。
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-xl">🔍</span>
                コード品質チェック
              </h4>
              <p className="text-gray-600 text-sm">
                リンターやフォーマッターを自動実行してコード品質を維持。
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <span className="text-xl">📦</span>
                パッケージ公開
              </h4>
              <p className="text-gray-600 text-sm">
                npm、Docker Hub、GitHub Packagesなどへの自動公開。
              </p>
            </div>
          </div>
        </div>

        {/* セクション3: ワークフロー例 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📝 基本的なワークフロー例
          </h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-800 mb-3">
              Node.jsアプリのCI/CDワークフロー
            </h4>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-xs font-mono">
{`name: Node.js CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build
      run: npm run build
      
    - name: Deploy
      if: github.ref == 'refs/heads/main'
      run: npm run deploy`}
              </pre>
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
                  <strong>シークレット管理</strong> - 
                  APIキーやパスワードは必ずGitHub Secretsに保存
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-sm">
                  <strong>キャッシュ活用</strong> - 
                  依存関係のキャッシュで実行時間を短縮
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-sm">
                  <strong>並列実行</strong> - 
                  複数のジョブを並列実行してビルド時間を最適化
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-sm">
                  <strong>マトリックスビルド</strong> - 
                  複数のバージョンや環境でテストを実行
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">✓</span>
                <span className="text-sm">
                  <strong>通知設定</strong> - 
                  Slackなどへの通知でチームの可視性を向上
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* セクション5: よく使うアクション */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            🔧 よく使うアクション
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                actions/checkout
              </h4>
              <p className="text-gray-600 text-sm">
                リポジトリのコードをチェックアウト
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                actions/setup-node
              </h4>
              <p className="text-gray-600 text-sm">
                Node.js環境をセットアップ
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                actions/cache
              </h4>
              <p className="text-gray-600 text-sm">
                依存関係をキャッシュして高速化
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                docker/build-push-action
              </h4>
              <p className="text-gray-600 text-sm">
                Dockerイメージをビルドしてプッシュ
              </p>
            </div>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">
            ⚠️ 注意事項
          </h3>
          <ul className="text-yellow-800 text-sm space-y-2 list-disc list-inside">
            <li>Secretsに保存した情報はログに出力されないよう注意してください</li>
            <li>パブリックリポジトリではワークフローの実行時間に制限があります</li>
            <li>外部アクションを使用する際は、信頼できるソースか確認してください</li>
            <li>並列実行数には制限があるため、適切に設計してください</li>
          </ul>
        </div>

        {/* 関連リンク */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🔗 関連リンク
          </h3>
          <div className="space-y-2">
            <a
              href="https://docs.github.com/ja/actions"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-indigo-600 hover:text-indigo-700 text-sm"
            >
              → GitHub Actions 公式ドキュメント
            </a>
            <a
              href="https://github.com/marketplace?type=actions"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-indigo-600 hover:text-indigo-700 text-sm"
            >
              → GitHub Actions Marketplace
            </a>
            <a
              href="https://github.com/sdras/awesome-actions"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-indigo-600 hover:text-indigo-700 text-sm"
            >
              → Awesome Actions（便利なアクション集）
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
