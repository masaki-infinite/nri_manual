import Link from "next/link";

export default function CopilotRagAzurePage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/training/copilot-rag" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← Copilot RAG に戻る
        </Link>
        <span className="text-gray-300">/</span>
        <Link href="/training/arcgis" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          Azure と相性が良い周辺資料へ
        </Link>
      </div>

      <section className="bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-200 rounded-2xl p-6 md:p-8 mb-8">
        <div className="text-4xl mb-4">☁️</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Azure 中心で作る Copilot RAG</h2>
        <p className="text-gray-700 leading-7 max-w-4xl mb-4">
          Microsoft 365 を使っているお客様なら、Azure AI Search と Azure OpenAI を中心にした構成が最も説明しやすく、
          SharePoint や PDF のナレッジを Copilot から引き出す導線も作りやすいです。
        </p>
        <p className="text-gray-700 leading-7 max-w-4xl">
          「Copilot に RAG を持たせる」のではなく、「Azure 側で検索基盤を用意し、Copilot から使う」ことで、
          権限管理や監査の説明もしやすくなります。
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">おすすめ構成</h3>
          <pre className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 overflow-auto whitespace-pre-wrap">
{`SharePoint
Confluence
PDF
   ↓
Azure AI Search
   ↓
Azure OpenAI Embedding
   ↓
MCP Server
   ↓
GitHub Copilot`}
          </pre>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">この構成の強み</h3>
          <ul className="space-y-3 text-gray-700 leading-7 text-sm">
            <li>・SharePoint をそのまま使いやすい</li>
            <li>・Entra ID / Microsoft 365 と合わせて説明しやすい</li>
            <li>・全社ナレッジ検索の本命構成として示しやすい</li>
          </ul>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">向いているお客様</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-800 mb-2">おすすめ</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-6">
              <li>・Microsoft 365 を広く使っている</li>
              <li>・SharePoint が業務文書の中心</li>
              <li>・Entra ID で権限管理している</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-800 mb-2">説明のポイント</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-6">
              <li>・検索基盤を Azure に寄せると統制がしやすい</li>
              <li>・Copilot は利用窓口として見せる</li>
              <li>・本格運用の本命として提案しやすい</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
