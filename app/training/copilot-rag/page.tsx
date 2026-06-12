import Link from "next/link";

export default function CopilotRagHomePage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training/github" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← GitHub 勉強会に戻る
        </Link>
      </div>

      <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-6 md:p-8 mb-8">
        <div className="text-4xl mb-4">🧩</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Copilot RAG の構築方法</h2>
        <p className="text-gray-700 leading-7 mb-4 max-w-4xl">
          企業ナレッジ向けの RAG を Copilot で実現したいなら、「Copilot に RAG を作る」のではなく、
          「RAG 基盤を作って Copilot から利用する」という考え方が現実的です。
        </p>
        <p className="text-gray-700 leading-7 max-w-4xl">
          この勉強会では、GitHub / Azure / AWS の3つの視点から、Copilot から利用する RAG の作り方を整理します。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <Link href="/training/copilot-rag/github">
          <div className="h-full border border-violet-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white">
            <div className="text-4xl mb-3">🐙</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">GitHub</h3>
            <p className="text-gray-600 text-sm leading-6">
              MCP ベースの PoC から始める構成。Confluence / Jira / PDF などを Copilot Agent から横断検索します。
            </p>
            <div className="mt-4 text-violet-700 text-sm font-medium">GitHub 版を見る →</div>
          </div>
        </Link>

        <Link href="/training/copilot-rag/azure">
          <div className="h-full border border-sky-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-sky-50/30">
            <div className="text-4xl mb-3">☁️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Azure</h3>
            <p className="text-gray-600 text-sm leading-6">
              Microsoft 365 環境に寄せた本命構成。SharePoint / Azure AI Search / Azure OpenAI を組み合わせます。
            </p>
            <div className="mt-4 text-sky-700 text-sm font-medium">Azure 版を見る →</div>
          </div>
        </Link>

        <Link href="/training/copilot-rag/aws">
          <div className="h-full border border-amber-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-amber-50/30">
            <div className="text-4xl mb-3">🌩️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">AWS</h3>
            <p className="text-gray-600 text-sm leading-6">
              AWS 中心の企業に向けた構成。Bedrock Knowledge Base と OpenSearch を軸に Copilot 連携を組みます。
            </p>
            <div className="mt-4 text-amber-700 text-sm font-medium">AWS 版を見る →</div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">基本方針</h3>
          <ul className="space-y-3 text-gray-700 leading-7 text-sm">
            <li>1. Copilot はフロントエンド、RAG は検索基盤として分離する</li>
            <li>2. PoC は MCP ベースで早く作り、本番は検索基盤を分離して強化する</li>
            <li>3. 企業ナレッジは GitHub / Azure / AWS のどこに寄せるかで設計を分ける</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">おすすめの見せ方</h3>
          <ul className="space-y-3 text-gray-700 leading-7 text-sm">
            <li>・Phase 1: GitHub Copilot + MCP で PoC</li>
            <li>・Phase 2: Azure AI Search か Bedrock Knowledge Base で本格化</li>
            <li>・Phase 3: 業務システムまで接続して Agent 化</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
