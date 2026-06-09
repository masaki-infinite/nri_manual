import Link from "next/link";

export default function CopilotRagAwsPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/training/copilot-rag" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← Copilot RAG に戻る
        </Link>
        <span className="text-gray-300">/</span>
        <Link href="/training/snowflake" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          AWS 周辺の勉強会へ
        </Link>
      </div>

      <section className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 md:p-8 mb-8">
        <div className="text-4xl mb-4">🌩️</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">AWS 中心で作る Copilot RAG</h2>
        <p className="text-gray-700 leading-7 max-w-4xl mb-4">
          AWS を中心に使う企業では、Bedrock Knowledge Base と OpenSearch を軸に Copilot 連携を考えるのが自然です。
          既存の S3 や社内文書保管の構成にも寄せやすく、AWS 標準サービスとして整理できます。
        </p>
        <p className="text-gray-700 leading-7 max-w-4xl">
          Copilot は利用の入口、Bedrock 側は検索基盤という役割分担にすると、Azure 構成と同様に「基盤を作って Copilot から使う」整理ができます。
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">おすすめ構成</h3>
          <pre className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 overflow-auto whitespace-pre-wrap">
{`S3
Confluence
Jira
   ↓
Bedrock Knowledge Base
   ↓
OpenSearch
   ↓
MCP Server
   ↓
GitHub Copilot`}
          </pre>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">この構成の強み</h3>
          <ul className="space-y-3 text-gray-700 leading-7 text-sm">
            <li>・AWS 中心の企業にそのまま合わせやすい</li>
            <li>・Bedrock を使う前提で説明しやすい</li>
            <li>・S3 ベースの文書保管と親和性が高い</li>
          </ul>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">向いているお客様</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-800 mb-2">おすすめ</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-6">
              <li>・AWS が基盤の中心</li>
              <li>・Bedrock を利用している</li>
              <li>・OpenSearch を検索基盤として使いたい</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-800 mb-2">説明のポイント</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-6">
              <li>・Copilot をフロントに寄せる</li>
              <li>・検索基盤は Bedrock 側で標準化する</li>
              <li>・AWS の標準サービスとして提案しやすい</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
