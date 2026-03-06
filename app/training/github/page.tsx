import Link from "next/link";

export default function GitHubTrainingPage() {
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
        GitHub関連 勉強会資料
      </h2>

      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          GitHubとその関連ツールに関する勉強会資料をまとめています。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link href="/training/github/copilot">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                GitHub Copilot
              </h3>
              <p className="text-gray-600 text-sm">
                AIペアプログラミングツールGitHub Copilotの使い方とベストプラクティス
              </p>
              <div className="mt-4 text-indigo-600 text-sm font-medium">
                資料を見る →
              </div>
            </div>
          </Link>

          <Link href="/training/github/actions">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                GitHub Actions
              </h3>
              <p className="text-gray-600 text-sm">
                CI/CD自動化のためのGitHub Actionsの基礎と実践
              </p>
              <div className="mt-4 text-indigo-600 text-sm font-medium">
                資料を見る →
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📌 GitHubツールについて
          </h3>
          <p className="text-blue-800 text-sm">
            GitHubの各種ツールやサービスに関する勉強会資料をこちらにまとめています。
            新しい勉強会が開催されると、随時資料が追加されます。
          </p>
        </div>
      </div>
    </div>
  );
}
