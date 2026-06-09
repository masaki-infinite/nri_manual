import Link from "next/link";

export default function CopilotRagBuildGuidePage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/training/copilot-rag/github" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← GitHub 版に戻る
        </Link>
        <span className="text-gray-300">/</span>
        <Link href="/training/copilot-rag" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          Copilot RAG トップへ
        </Link>
      </div>

      <section className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-200 rounded-2xl p-6 md:p-8 mb-8">
        <div className="text-4xl mb-4">🧭</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Copilot RAG 構築手順書</h2>
        <p className="text-gray-700 leading-7 max-w-4xl">
          このページは、GitHub Copilot を入口にして外部 RAG 基盤を使うときの共通手順をまとめたものです。
          PoC から本番まで、そのまま順番に進められるように整理しています。
        </p>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">フロントページは必要か</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-xl border border-violet-200 bg-violet-50/40 p-5">
            <h4 className="font-semibold text-gray-800 mb-2">必須ではない</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-6">
              <li>・GitHub Copilot Agent は MCP を直接呼べる</li>
              <li>・PoC はチャット入力だけでも成立する</li>
              <li>・本番運用は検索基盤側の設計が主役になる</li>
            </ul>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-5">
            <h4 className="font-semibold text-gray-800 mb-2">作ると便利</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-6">
              <li>・勉強会で全体像を説明したいとき</li>
              <li>・検索対象や入口を一覧化したいとき</li>
              <li>・利用者が迷わない導線を作りたいとき</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">共通ステップ</h3>
          <ol className="space-y-3 text-gray-700 leading-7 text-sm list-decimal pl-5">
            <li>仕様書とナレッジソースを整理する</li>
            <li>取得対象データを決める</li>
            <li>検索基盤を作る</li>
            <li>MCP Server または RAG API を実装する</li>
            <li>Copilot から呼び出す</li>
            <li>監査・権限・ログを確認する</li>
            <li>代表的な質問で精度を評価する</li>
          </ol>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">判断のポイント</h3>
          <ul className="space-y-3 text-gray-700 leading-7 text-sm">
            <li>・PoC は MCP ベースで素早く始める</li>
            <li>・本番は Azure AI Search か Bedrock Knowledge Base に寄せる</li>
            <li>・Copilot は入口、RAG は別基盤という役割分担を守る</li>
            <li>・権限外の情報を返さないことを最優先にする</li>
          </ul>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">構築パターンの選び方</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border border-violet-200 bg-violet-50/40 p-4">
            <div className="text-xs font-bold text-violet-700 mb-2">GitHub</div>
            <h4 className="font-semibold text-gray-800 mb-2">PoC 向け</h4>
            <p className="text-sm text-gray-700 leading-6">Confluence / Jira / PDF などを MCP でつなぎ、すばやく体験させる。</p>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-4">
            <div className="text-xs font-bold text-sky-700 mb-2">Azure</div>
            <h4 className="font-semibold text-gray-800 mb-2">本命構成</h4>
            <p className="text-sm text-gray-700 leading-6">SharePoint / Azure AI Search / Azure OpenAI で全社ナレッジ検索を作る。</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
            <div className="text-xs font-bold text-amber-700 mb-2">AWS</div>
            <h4 className="font-semibold text-gray-800 mb-2">AWS 中心</h4>
            <p className="text-sm text-gray-700 leading-6">S3 / Bedrock Knowledge Base / OpenSearch で Copilot 連携を組む。</p>
          </div>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">ナレッジの置き場所</h3>
        <p className="text-gray-700 leading-7 mb-4">
          原本は元の業務システムに残し、Copilot 用には検索インデックスや中継 API を置く構成が基本です。
          つまり、Confluence / Jira / SharePoint / PDF を Copilot へ移すのではなく、そこから取得して使います。
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-800">データ</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-800">正本</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-800">Copilot 用</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-800">補足</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200 align-top">
                <td className="px-4 py-3 font-medium text-slate-900">Confluence</td>
                <td className="px-4 py-3 text-slate-700">Confluence 本体</td>
                <td className="px-4 py-3 text-slate-700">MCP Server の取得対象</td>
                <td className="px-4 py-3 text-slate-700 leading-6">検索結果は要約して返す</td>
              </tr>
              <tr className="border-t border-gray-200 align-top">
                <td className="px-4 py-3 font-medium text-slate-900">Jira</td>
                <td className="px-4 py-3 text-slate-700">Jira 本体</td>
                <td className="px-4 py-3 text-slate-700">課題情報の検索インデックス</td>
                <td className="px-4 py-3 text-slate-700 leading-6">課題・担当・期限を構造化する</td>
              </tr>
              <tr className="border-t border-gray-200 align-top">
                <td className="px-4 py-3 font-medium text-slate-900">SharePoint</td>
                <td className="px-4 py-3 text-slate-700">SharePoint / Graph</td>
                <td className="px-4 py-3 text-slate-700">Azure AI Search など</td>
                <td className="px-4 py-3 text-slate-700 leading-6">権限トリミングが必須</td>
              </tr>
              <tr className="border-t border-gray-200 align-top">
                <td className="px-4 py-3 font-medium text-slate-900">PDF</td>
                <td className="px-4 py-3 text-slate-700">SharePoint / Box / S3 / ファイルサーバー</td>
                <td className="px-4 py-3 text-slate-700">分割テキスト + メタデータ</td>
                <td className="px-4 py-3 text-slate-700 leading-6">原本はそのまま保持する</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">評価チェックリスト</h3>
        <ul className="space-y-3 text-gray-700 leading-7 text-sm">
          <li>・回答の正確性が十分か</li>
          <li>・根拠を明確に出せるか</li>
          <li>・権限外情報を返さないか</li>
          <li>・運用のしやすさはどうか</li>
          <li>・PoC から本番へ移行しやすいか</li>
        </ul>
      </section>
    </div>
  );
}
