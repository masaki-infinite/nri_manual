import Link from "next/link";
import SnowflakeSubNav from "../SnowflakeSubNav";

export default function SnowflakeMcpGatewayPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Snowflake × MCP ゲートウェイ</h2>
      <SnowflakeSubNav />

      <div className="space-y-8">

        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                <span>🔌</span>
                Snowflake Summit 2026 発表
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                Natoma 買収 —「接続」ではなく「標準化とガバナンス」
              </h3>
              <p className="text-slate-700 leading-7 max-w-3xl">
                2026年5月、Snowflake は MCP ゲートウェイ企業 <strong>Natoma</strong> の買収意向を発表しました。
              </p>
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 leading-6 max-w-3xl">
                <strong>重要な前提：</strong>外部ツールとの接続自体は買収前から可能でした。
                External Function・Snowpark・Streamlit・Cortex Agents など複数の連携手段がすでに存在します。
                Natoma が持ち込む本質的な価値は、AI エージェントの外部アクション（tool-call）を
                <strong>MCP プロトコルで標準化し</strong>、Snowflake の RBAC・監査基盤で
                <strong>ガバナンスできるようにする</strong>点です。
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur border border-indigo-100 rounded-xl p-4 shadow-sm min-w-56">
              <div className="text-sm text-slate-500 mb-2">要点</div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>・外部連携の手段は以前から存在</li>
                <li>・Natoma = MCP 標準化 + AI 行動ガバナンス</li>
                <li>・tool-call 単位でブロック・監査</li>
                <li>・Data Platform → AI Control Plane</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 1. MCPとは */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. MCP（Model Context Protocol）とは</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-gray-700 leading-7">
                MCP は <strong>Anthropic が策定した、AI モデルと外部ツール・データソースをつなぐ標準プロトコル</strong>です。
                AI エージェントが「Slack にメッセージを送る」「Jira のチケットを作る」
                「Snowflake にクエリを実行する」といった外部アクションを、標準化された形で行えるようにします。
              </p>
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-sm text-sky-900 leading-6">
                <strong>プロトコル標準化の意味</strong><br />
                MCP がない世界では、各エージェントが Jira REST API・Slack Bolt SDK・GitHub API を
                それぞれ個別に知っている必要があります。
                MCP があると、エージェントは <code className="bg-sky-100 px-1 rounded">create_ticket()</code> を呼ぶだけでよく、
                API の詳細は MCP サーバ側に隠蔽されます。
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="font-semibold text-gray-700 mb-3 text-sm">MCP の基本構成</div>
              <div className="space-y-2 text-sm">
                {[
                  { role: "MCP Client", desc: "AIエージェント（CoWork / Claude / Copilot など）", color: "bg-indigo-100 text-indigo-800" },
                  { role: "MCP Gateway", desc: "Natoma — 認証・認可・監査・ルーティングを担う", color: "bg-violet-100 text-violet-800" },
                  { role: "MCP Server", desc: "各ツール（Slack / Jira / GitHub）のコネクタ", color: "bg-sky-100 text-sky-800" },
                  { role: "ツール", desc: "実際の SaaS / API / データベース", color: "bg-gray-100 text-gray-700" },
                ].map((item) => (
                  <div key={item.role} className="flex items-start gap-3">
                    <span className={`${item.color} text-xs font-bold px-2 py-1 rounded shrink-0`}>{item.role}</span>
                    <span className="text-gray-600 leading-5">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. 買収前の連携方法 */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">2. Natoma 買収前から存在した外部連携手段</h3>
          <p className="text-gray-600 leading-7 mb-5">
            Snowflake はもともと外部 API と接続する手段を複数備えていました。Natoma の価値を理解するには、
            まず既存手段を整理しておくことが重要です。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                num: "①",
                title: "External Function（外部関数）",
                color: "border-gray-200 bg-white",
                numColor: "bg-gray-100 text-gray-600",
                flow: ["Snowflake SQL", "External Function", "API Gateway (AWS/Azure)", "外部 REST API"],
                desc: "SQL の中から直接 Lambda 経由で外部 API を呼ぶ方法。データ変換パイプラインの中で外部サービスを挟む際に使われます。",
                limit: "API Gateway・Lambda の設定が必要。呼び出しレイテンシが高く、AIエージェントのリアルタイム操作向けではない。",
              },
              {
                num: "②",
                title: "Snowpark Python（requests ライブラリ）",
                color: "border-blue-100 bg-blue-50",
                numColor: "bg-blue-100 text-blue-700",
                flow: ["Snowflake", "Snowpark UDF/Procedure", "Python requests", "外部 API"],
                desc: "Snowpark で Python を実行し、requests で外部 API を直接呼び出す方法。最も柔軟で広く使われていました。",
                limit: "APIトークン・OAuth シークレットの管理がコード・Secret Manager に分散。監査ログは各ツール側に残り、Snowflake から一元参照できない。",
              },
              {
                num: "③",
                title: "Streamlit in Snowflake",
                color: "border-pink-100 bg-pink-50",
                numColor: "bg-pink-100 text-pink-700",
                flow: ["ユーザー", "Streamlit アプリ（Snowflake 内）", "外部 SDK / API", "SaaS"],
                desc: "Snowflake 上で動く Streamlit アプリから外部サービスを操作する方法。UI を通じてインタラクティブに使う用途向け。",
                limit: "ユーザー操作前提のため自動実行・エージェント実行には向かない。外部接続の設定はアプリごとに個別管理。",
              },
              {
                num: "④",
                title: "Cortex Agents + Connector",
                color: "border-indigo-100 bg-indigo-50",
                numColor: "bg-indigo-100 text-indigo-700",
                flow: ["自然言語プロンプト", "Cortex Agent", "Connector（Slack / Google）", "SaaS"],
                desc: "最も AI ネイティブな方法。Cortex Agent が Connector を使って外部 SaaS に接続する、MCP の前身的なアプローチ。",
                limit: "Natoma 以前は対応ツール数が限られ、tool-call 単位のポリシー制御・監査が弱かった。",
              },
            ].map((p) => (
              <div key={p.num} className={`rounded-xl border ${p.color} p-5`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`${p.numColor} text-xs font-bold px-2.5 py-1 rounded-full`}>{p.num}</span>
                  <span className="font-semibold text-gray-800 text-sm">{p.title}</span>
                </div>
                <div className="flex items-center gap-1 flex-wrap mb-3">
                  {p.flow.map((step, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <span className="text-xs bg-white border border-gray-200 rounded px-2 py-0.5 text-gray-700">{step}</span>
                      {i < p.flow.length - 1 && <span className="text-gray-400 text-xs">→</span>}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-700 leading-5 mb-2">{p.desc}</p>
                <div className="text-xs text-orange-700 bg-orange-50 border border-orange-100 rounded px-2 py-1.5 leading-5">
                  <strong>限界：</strong>{p.limit}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 従来方式の課題 */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. 従来方式の課題：AIエージェント時代にスケールしない</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-gray-700 leading-7">
                人間が1つのツールを操作する場合、従来手段でも問題なく機能します。
                しかし<strong>複数の AI エージェントが複数のツールを自動的に操作する</strong>ようになると、
                次のような問題が表面化します。
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: "🔑",
                    title: "ツールごとに個別の認証管理",
                    body: "Jira・Slack・GitHub・Google Drive それぞれに OAuth クライアント・リフレッシュトークン・シークレットが必要。エージェントが増えるほどシークレットの数が爆発します。",
                  },
                  {
                    icon: "📋",
                    title: "監査ログが各ツールに分散",
                    body: "「AI エージェントが先週何をしたか」を調べるには、Jira の監査ログ・Slack のエクスポート・GitHub の audit log をそれぞれ手作業で突き合わせる必要があります。",
                  },
                  {
                    icon: "🚫",
                    title: "tool-call を止める仕組みがない",
                    body: "LLM が「このチケットを削除しよう」と判断しても、途中でブロックする仕組みが各ツール側に存在せず、コード側で防ぐしかありません。",
                  },
                  {
                    icon: "⚙️",
                    title: "エージェントごとに API 知識が必要",
                    body: "各エージェントが Jira の REST API・Slack の Bolt SDK を個別に理解している必要があり、ツールの API 変更がすべてのエージェントコードに影響します。",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-3">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm mb-1">{item.title}</div>
                      <p className="text-xs text-gray-600 leading-5">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <div className="font-semibold text-red-800 mb-3">具体例：3エージェント × 5ツールの場合</div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr className="bg-red-100">
                      <th className="text-left px-2 py-2 text-red-800 font-semibold"></th>
                      <th className="text-center px-2 py-2 text-red-800 font-semibold">Jira</th>
                      <th className="text-center px-2 py-2 text-red-800 font-semibold">Slack</th>
                      <th className="text-center px-2 py-2 text-red-800 font-semibold">GitHub</th>
                      <th className="text-center px-2 py-2 text-red-800 font-semibold">Drive</th>
                      <th className="text-center px-2 py-2 text-red-800 font-semibold">Mail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["CoWork", "社内 Bot", "分析エージェント"].map((agent) => (
                      <tr key={agent} className="border-t border-red-200">
                        <td className="px-2 py-2 font-medium text-red-900">{agent}</td>
                        {[0, 1, 2, 3, 4].map((i) => (
                          <td key={i} className="text-center px-2 py-2">🔑</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-red-700 mt-3 leading-5">
                🔑 = 個別に OAuth / シークレットを管理<br />
                3エージェント × 5ツール = <strong>15個のシークレット管理</strong>が発生。<br />
                さらにエージェントが増えるほど管理コストは線形に増加します。
              </p>
              <div className="mt-3 bg-white border border-red-200 rounded-lg p-3 text-xs text-red-800 leading-5">
                <strong>MCP ゲートウェイを使うと：</strong>すべてのエージェントがゲートウェイ1点に接続するだけ。
                OAuth トークンはゲートウェイが管理し、エージェントは認証を意識しません。
              </div>
            </div>
          </div>
        </section>

        {/* 4. MCPが解決すること */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. MCP ゲートウェイが解決すること</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                icon: "🧩",
                title: "API の詳細を隠蔽",
                before: "エージェントが Jira REST API のエンドポイント・認証方式・ペイロード構造を知っている必要がある",
                after: "エージェントは create_ticket(title, project) を呼ぶだけ。API の詳細は MCP サーバが担う",
              },
              {
                icon: "🔐",
                title: "認証の一元化",
                before: "各エージェントがツールごとの OAuth トークンを保持・更新する必要がある",
                after: "ゲートウェイが全ツールの認証を一括管理。エージェントはゲートウェイへの接続のみを意識",
              },
              {
                icon: "🛡️",
                title: "ポリシーの一点集中",
                before: "「このエージェントはチケット削除禁止」というルールをコードで実装するしかない",
                after: "ゲートウェイのポリシーで tool-call 単位に「許可／拒否」を宣言的に設定できる",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">{item.title}</h4>
                <div className="space-y-2 text-xs">
                  <div className="bg-red-50 border border-red-100 rounded p-2 text-red-800 leading-5">
                    <strong>Before：</strong>{item.before}
                  </div>
                  <div className="bg-green-50 border border-green-100 rounded p-2 text-green-800 leading-5">
                    <strong>After：</strong>{item.after}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 rounded-xl p-5 text-sm">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">コード例：Jira チケット作成（エージェント側）</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-red-400 text-xs mb-2">▶ Before（直接 API 呼び出し）</div>
                <pre className="text-green-300 text-xs leading-6 overflow-x-auto whitespace-pre">{`import requests, os

token = os.environ["JIRA_TOKEN"]
requests.post(
  "https://nri.atlassian.net/rest/api/3/issue",
  headers={"Authorization": f"Bearer {token}"},
  json={
    "fields": {
      "project": {"key": "NRI"},
      "issuetype": {"name": "Task"},
      "summary": title,
    }
  }
)`}</pre>
              </div>
              <div>
                <div className="text-green-400 text-xs mb-2">▶ After（MCP 経由）</div>
                <pre className="text-green-300 text-xs leading-6 overflow-x-auto whitespace-pre">{`# エージェントはこれだけ
# 認証・エンドポイント・
# ペイロード構造は不要

mcp.call("jira", "create_ticket",
  title=title,
  project="NRI"
)
# Natoma がポリシーを確認し
# ルーティングして実行`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Natomaの真の価値 */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">5. Natoma の真の価値：ガバナンスの「行動」への拡張</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "🛡️",
                title: "tool-call 単位のガバナンス",
                body: "エージェントが「どのツールを」「誰の権限で」「何のために」呼び出したかを tool-call 1回のレベルで検証・記録します。LLM が「実行しよう」と判断しても、ゲートウェイ側で決定論的にブロックできます。",
              },
              {
                icon: "🔗",
                title: "100+ システムへの安全接続",
                body: "検証済みの MCP サーバ群を通じて Google Drive・Gmail・Zoom・Jira・Slack・GitHub・Microsoft 365 などに接続できます。個別実装不要で、エンタープライズグレードのコネクタを即利用できます。",
              },
              {
                icon: "📋",
                title: "監査ログの Snowflake 統合",
                body: "Snowflake の Query History と同様に、エージェントの外部アクションログを Snowflake 側に保存できます。データアクセスと AI のアクションを同じ基盤で監査できるようになります。",
              },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-2">{card.title}</h4>
                <p className="text-sm text-gray-600 leading-6">{card.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-violet-50 border border-violet-200 rounded-xl p-5 text-sm text-violet-900 leading-6">
            <strong>まとめると：</strong>MCP プロトコル自体は OSS であり、Natoma なしでも自前でゲートウェイを構築できます。
            Natoma の価値は「接続できるようになる」ことではなく、
            <strong>Snowflake の RBAC・監査基盤と深く統合された、エンタープライズ向けのガバナンスレイヤー</strong>を提供する点にあります。
            自前実装だと「MCP サーバを立てて終わり」ですが、Natoma があると「tool-call ログが Snowflake に入り、既存の権限モデルでアクセス制御できる」状態になります。
          </div>
        </section>

        {/* 6. アーキテクチャ */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">6. Snowflake MCP ゲートウェイのアーキテクチャ</h3>
          <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 overflow-x-auto">
            <div className="min-w-[700px] space-y-2">

              {/* Layer 1: AI Agents */}
              <div className="border-2 border-dashed border-indigo-300 rounded-2xl bg-indigo-50/60 p-5">
                <div className="text-center text-xs font-bold text-indigo-500 uppercase tracking-widest mb-5">AI エージェント層</div>
                <div className="flex justify-center gap-6 flex-wrap">

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-sky-200 shadow-sm flex items-center justify-center">
                      <svg viewBox="0 0 32 32" fill="none" className="w-10 h-10">
                        <line x1="16" y1="3" x2="16" y2="29" stroke="#29B5E8" strokeWidth="3" strokeLinecap="round"/>
                        <line x1="3" y1="9.5" x2="29" y2="22.5" stroke="#29B5E8" strokeWidth="3" strokeLinecap="round"/>
                        <line x1="3" y1="22.5" x2="29" y2="9.5" stroke="#29B5E8" strokeWidth="3" strokeLinecap="round"/>
                        <line x1="10" y1="4" x2="16" y2="9" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="22" y1="4" x2="16" y2="9" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="10" y1="28" x2="16" y2="23" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="22" y1="28" x2="16" y2="23" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-700 text-center">CoWork</div>
                    <div className="text-xs text-gray-400 text-center">Snowflake</div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-orange-200 shadow-sm flex items-center justify-center">
                      <svg viewBox="0 0 32 32" className="w-10 h-10">
                        <path d="M16 4C16 4 7 12 7 20c0 5 4 8 9 8s9-3 9-8c0-8-9-16-9-16z" fill="#CC785C"/>
                        <path d="M16 14c0 0-4 3.5-4 7 0 2.2 1.8 4 4 4s4-1.8 4-4c0-3.5-4-7-4-7z" fill="#E8A88A"/>
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-700 text-center">Claude</div>
                    <div className="text-xs text-gray-400 text-center">Anthropic</div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center">
                      <svg viewBox="0 0 32 32" fill="none" className="w-10 h-10">
                        <circle cx="16" cy="14" r="9" fill="#1f2328"/>
                        <ellipse cx="13" cy="14" rx="2" ry="2.5" fill="white"/>
                        <ellipse cx="19" cy="14" rx="2" ry="2.5" fill="white"/>
                        <ellipse cx="13" cy="14.8" rx="1" ry="1.3" fill="#1f2328"/>
                        <ellipse cx="19" cy="14.8" rx="1" ry="1.3" fill="#1f2328"/>
                        <path d="M9 20 Q10 26 16 27 Q22 26 23 20" fill="#1f2328"/>
                        <circle cx="13" cy="27" r="1.5" fill="#6E40C9"/>
                        <circle cx="19" cy="27" r="1.5" fill="#6E40C9"/>
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-700 text-center">GitHub</div>
                    <div className="text-xs text-gray-400 text-center">Copilot</div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center">
                      <svg viewBox="0 0 32 32" fill="none" className="w-10 h-10">
                        <rect x="6" y="10" width="20" height="14" rx="3" fill="#6B7280"/>
                        <rect x="10" y="6" width="12" height="5" rx="2" fill="#9CA3AF"/>
                        <circle cx="12" cy="17" r="2" fill="white"/>
                        <circle cx="20" cy="17" r="2" fill="white"/>
                        <path d="M13 22 Q16 24 19 22" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="16" y1="6" x2="16" y2="4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                        <circle cx="16" cy="3" r="1.5" fill="#6366F1"/>
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-700 text-center">カスタム</div>
                    <div className="text-xs text-gray-400 text-center">エージェント</div>
                  </div>

                </div>
              </div>

              {/* Arrow 1 */}
              <div className="flex flex-col items-center gap-0.5 py-1">
                <div className="w-0.5 h-4 bg-gray-400"/>
                <span className="text-xs text-gray-500 bg-white border border-gray-200 rounded-full px-3 py-1 font-medium">MCP (Model Context Protocol)</span>
                <div className="w-0.5 h-4 bg-gray-400"/>
                <div className="text-gray-400">▼</div>
              </div>

              {/* Layer 2: Natoma Gateway */}
              <div className="border-2 border-violet-400 rounded-2xl bg-white p-5">
                <div className="text-center text-xs font-bold text-violet-500 uppercase tracking-widest mb-0.5">MCP ゲートウェイ</div>
                <div className="text-center text-sm font-bold text-violet-800 mb-5">
                  <svg viewBox="0 0 20 20" className="w-4 h-4 inline mr-1 mb-0.5" fill="#7C3AED"><path d="M10 1L2 5v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V5l-8-4z"/></svg>
                  Natoma（Snowflake 買収）
                </div>
                <div className="flex justify-center gap-4 flex-wrap">
                  {[
                    { icon: "🔐", label: "認証・認可", sub: "RBAC / OAuth" },
                    { icon: "✅", label: "tool-call 検証", sub: "ポリシー判定" },
                    { icon: "📋", label: "監査ログ", sub: "Snowflake 統合" },
                    { icon: "🚦", label: "レート制限", sub: "ルーティング" },
                  ].map((item) => (
                    <div key={item.label} className="bg-violet-50 border border-violet-200 rounded-xl px-5 py-3 text-center min-w-28">
                      <div className="text-xl mb-1">{item.icon}</div>
                      <div className="text-xs font-semibold text-violet-800">{item.label}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="flex flex-col items-center gap-0.5 py-1">
                <div className="w-0.5 h-4 bg-gray-400"/>
                <span className="text-xs text-gray-500 bg-white border border-gray-200 rounded-full px-3 py-1 font-medium">MCP Server 群（検証済みコネクタ 100+）</span>
                <div className="w-0.5 h-4 bg-gray-400"/>
                <div className="text-gray-400">▼</div>
              </div>

              {/* Layer 3: External Tools */}
              <div className="border-2 border-dashed border-emerald-300 rounded-2xl bg-emerald-50/30 p-5">
                <div className="text-center text-xs font-bold text-emerald-600 uppercase tracking-widest mb-5">外部ツール・データソース</div>
                <div className="flex justify-center gap-5 flex-wrap">

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-[#e8f7fd] rounded-2xl border border-[#29B5E8]/30 shadow-sm flex items-center justify-center">
                      <svg viewBox="0 0 32 32" fill="none" className="w-10 h-10">
                        <line x1="16" y1="3" x2="16" y2="29" stroke="#29B5E8" strokeWidth="3" strokeLinecap="round"/>
                        <line x1="3" y1="9.5" x2="29" y2="22.5" stroke="#29B5E8" strokeWidth="3" strokeLinecap="round"/>
                        <line x1="3" y1="22.5" x2="29" y2="9.5" stroke="#29B5E8" strokeWidth="3" strokeLinecap="round"/>
                        <line x1="10" y1="4" x2="16" y2="9" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="22" y1="4" x2="16" y2="9" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="10" y1="28" x2="16" y2="23" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="22" y1="28" x2="16" y2="23" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-700 text-center">Snowflake</div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center">
                      <svg viewBox="0 0 32 32" className="w-10 h-10">
                        <path d="M8 20a3 3 0 1 1-3-3h3v3zm1.5 0a3 3 0 0 1 6 0v7.5a3 3 0 0 1-6 0V20z" fill="#E01E5A"/>
                        <path d="M12 8a3 3 0 1 1 3-3v3h-3zm0 1.5a3 3 0 0 1 0 6H4.5a3 3 0 0 1 0-6H12z" fill="#36C5F0"/>
                        <path d="M24 12a3 3 0 1 1 3 3h-3v-3zm-1.5 0a3 3 0 0 1-6 0V4.5a3 3 0 0 1 6 0V12z" fill="#2EB67D"/>
                        <path d="M20 24a3 3 0 1 1-3 3v-3h3zm0-1.5a3 3 0 0 1 0-6h7.5a3 3 0 0 1 0 6H20z" fill="#ECB22E"/>
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-700 text-center">Slack</div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center">
                      <svg viewBox="0 0 32 32" className="w-10 h-10">
                        <path fillRule="evenodd" d="M16 3C8.82 3 3 8.96 3 16.31c0 5.87 3.74 10.85 8.94 12.61.65.12.89-.29.89-.64v-2.26c-3.63.81-4.4-1.78-4.4-1.78-.59-1.53-1.45-1.94-1.45-1.94-1.18-.83.09-.81.09-.81 1.31.09 2 1.37 2 1.37 1.16 2.03 3.05 1.44 3.79 1.1.12-.86.46-1.44.83-1.77-2.89-.34-5.93-1.48-5.93-6.59 0-1.46.51-2.65 1.34-3.58-.13-.34-.58-1.7.13-3.54 0 0 1.1-.36 3.59 1.37A12.3 12.3 0 0116 9.8c1.11.01 2.22.15 3.26.45 2.49-1.73 3.58-1.37 3.58-1.37.72 1.84.27 3.2.13 3.54.84.93 1.34 2.12 1.34 3.58 0 5.12-3.05 6.25-5.95 6.58.47.41.89 1.22.89 2.46v3.65c0 .35.23.77.9.64C25.27 27.16 29 22.18 29 16.31 29 8.96 23.18 3 16 3z" fill="#1f2328"/>
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-700 text-center">GitHub</div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center">
                      <svg viewBox="0 0 32 32" className="w-10 h-10">
                        <defs>
                          <linearGradient id="jiraGrad" x1="100%" y1="0%" x2="18%" y2="73%">
                            <stop offset="0%" stopColor="#2684FF"/>
                            <stop offset="100%" stopColor="#0052CC"/>
                          </linearGradient>
                        </defs>
                        <path d="M16.4 3L7 12.4l5.6 5.6 9.4-9.4z" fill="url(#jiraGrad)"/>
                        <path d="M7 12.4L3 16.4l9 9 4-4.1z" fill="#2684FF"/>
                        <path d="M16.4 12.8L12 17.2l4.4 4.4 9-9-4.6-3.8z" fill="#2684FF"/>
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-700 text-center">Jira</div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center">
                      <svg viewBox="0 0 32 32" className="w-10 h-10">
                        <path d="M3 24.5l5.5-9.5h15L29 24.5z" fill="#0066DA"/>
                        <path d="M11.5 8l5.5 9.5-5.5 7H3.5l8-16.5z" fill="#00AC47"/>
                        <path d="M20.5 8H11.5l5.5 9.5H27z" fill="#FFBA00"/>
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-700 text-center">Google Drive</div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center">
                      <svg viewBox="0 0 32 32" className="w-10 h-10">
                        <rect x="3" y="3" width="12" height="12" rx="1" fill="#F25022"/>
                        <rect x="17" y="3" width="12" height="12" rx="1" fill="#7FBA00"/>
                        <rect x="3" y="17" width="12" height="12" rx="1" fill="#00A4EF"/>
                        <rect x="17" y="17" width="12" height="12" rx="1" fill="#FFB900"/>
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-700 text-center">Microsoft 365</div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center justify-center">
                      <svg viewBox="0 0 32 32" className="w-10 h-10">
                        <path d="M3 8h26v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" fill="white" stroke="#DADCE0" strokeWidth="1"/>
                        <path d="M3 8l13 9 13-9" fill="none" stroke="#DADCE0" strokeWidth="1"/>
                        <path d="M3 8L16 17l13-9v16H3z" fill="#F44336"/>
                        <path d="M3 8L16 17l13-9" fill="#B71C1C"/>
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-700 text-center">Gmail</div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-[#e8f2ff] rounded-2xl border border-[#2D8CFF]/30 shadow-sm flex items-center justify-center">
                      <svg viewBox="0 0 32 32" className="w-10 h-10">
                        <rect x="2" y="9" width="19" height="14" rx="3" fill="#2D8CFF"/>
                        <path d="M21 13.5l8-5v15l-8-5z" fill="#2D8CFF"/>
                        <rect x="5" y="12" width="10" height="8" rx="1.5" fill="white" opacity="0.3"/>
                      </svg>
                    </div>
                    <div className="text-xs font-semibold text-gray-700 text-center">Zoom</div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. 買収前後の比較 */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">7. 買収前後：Snowflake の位置づけの変化</h3>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left px-4 py-3 bg-slate-100 font-semibold text-slate-800">観点</th>
                  <th className="text-left px-4 py-3 bg-red-50 font-semibold text-red-800">Natoma 以前</th>
                  <th className="text-left px-4 py-3 bg-green-50 font-semibold text-green-800">Natoma 統合後</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    aspect: "Snowflake の役割",
                    before: "データプラットフォーム（分析・AI）",
                    after: "AI Agent Control Plane（データ + AI の行動をすべて制御）",
                  },
                  {
                    aspect: "ガバナンスの対象",
                    before: "データへのクエリ・アクセス（Query History・RBAC）",
                    after: "データアクセス ＋ AI エージェントの tool-call（外部アクション）",
                  },
                  {
                    aspect: "外部ツール連携",
                    before: "ツールごとに個別実装（External Function / Snowpark / Streamlit）",
                    after: "MCP ゲートウェイ一本で 100+ ツールに統一接続",
                  },
                  {
                    aspect: "認証・シークレット管理",
                    before: "エージェント・アプリごとに個別管理",
                    after: "Natoma が一括管理（エージェントは認証を意識しない）",
                  },
                  {
                    aspect: "監査ログ",
                    before: "Snowflake Query History ＋ 各ツール側ログ（分散）",
                    after: "すべてのアクション（データ + AI）を Snowflake で一元監査",
                  },
                  {
                    aspect: "AI の種類",
                    before: "回答するAI（RAGで調べて答える）",
                    after: "実行するAI（調べて → 判断して → 行動するまでガバナンス下で完結）",
                  },
                ].map((row, i) => (
                  <tr key={row.aspect} className={`border-t border-gray-200 align-top ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-4 py-3 font-semibold text-slate-800">{row.aspect}</td>
                    <td className="px-4 py-3 text-red-800 leading-6">{row.before}</td>
                    <td className="px-4 py-3 text-green-800 leading-6 font-medium">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. RAG + MCP + Agent */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">8. RAG + MCP + Agent：AI 基盤の全体像</h3>
          <p className="text-gray-700 leading-7 mb-5">
            Snowflake は「データを読んで答える AI（RAG）」から「データを読んで行動できる AI（Agentic）」への
            移行を Cortex AI・MCP ゲートウェイ・CoWork を組み合わせて実現します。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {[
              {
                icon: "📚",
                badge: "Cortex Search / RAG",
                badgeColor: "bg-sky-100 text-sky-800",
                title: "読む・調べる",
                subtitle: "回答するAI",
                body: "社内文書・仕様書・議事録を Cortex Search でインデックス化。AI が質問に対して「ドキュメントを参照して根拠付きで回答」できる状態。",
                border: "border-sky-200",
                bg: "bg-sky-50",
              },
              {
                icon: "🔌",
                badge: "MCP ゲートウェイ",
                badgeColor: "bg-violet-100 text-violet-800",
                title: "動く・実行する",
                subtitle: "行動するAI",
                body: "MCP ゲートウェイ経由で Jira チケット作成・Slack 通知・GitHub PR 作成を実行できる。AI が「情報を返すだけでなく、アクションを起こす」状態。",
                border: "border-violet-200",
                bg: "bg-violet-50",
              },
              {
                icon: "🤖",
                badge: "CoWork + Cortex Agent",
                badgeColor: "bg-indigo-100 text-indigo-800",
                title: "自律的にループする",
                subtitle: "エージェントAI",
                body: "目標を与えると「調べる → 判断する → 実行する → 確認する」のサイクルを自律的に回す。毎朝の定例レポート生成・Slack 送信もエージェントが自動実行。",
                border: "border-indigo-200",
                bg: "bg-indigo-50",
              },
            ].map((item) => (
              <div key={item.title} className={`rounded-xl border ${item.border} ${item.bg} p-5`}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${item.badgeColor} mb-2`}>{item.badge}</div>
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <div className="text-xs text-gray-500 mb-2">{item.subtitle}</div>
                <p className="text-sm text-gray-700 leading-6">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 rounded-xl p-5 text-white">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Snowflake が担う制御の一元化</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="text-sky-400 shrink-0 font-bold">RAG</span>
                  <span className="text-slate-300 leading-6">何を読んでいいか → Cortex Search の RBAC（列・行レベルでフィルタ）</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-violet-400 shrink-0 font-bold">MCP</span>
                  <span className="text-slate-300 leading-6">何を実行していいか → Natoma のポリシーと RBAC（tool-call 単位でブロック）</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-indigo-400 shrink-0 font-bold">監査</span>
                  <span className="text-slate-300 leading-6">何をしたか → すべての読み取り・実行ログを Snowflake に統合保存</span>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-slate-200 leading-6 text-sm">
                <strong className="text-white">Snowflake の提案ポジション：</strong><br />
                「AI エージェントが情報を読む権限」も「外部システムを操作する権限」も、
                すべて Snowflake の RBAC で一元管理できる唯一のプラットフォーム。
                NRI の提案では<strong className="text-sky-300">「Control Plane for Agentic Enterprise」</strong>
                というフレームで訴求できます。
              </div>
            </div>
          </div>
        </section>

        {/* 9. CoWork との関係 */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">9. CoWork（Snowflake Intelligence）との関係</h3>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-3">
                <p className="text-gray-700 leading-7">
                  <strong>CoWork</strong>（旧 Snowflake Intelligence）は Snowflake が提供する
                  「個人専属ワークエンジン」です。マルチエージェントの振り分け・ユーザーメモリ・
                  スケジュール実行・MCP 経由の外部ツール連携を備えています。
                  RAG（Cortex Search）で情報を読み、MCP ゲートウェイで行動する、
                  Snowflake の Agentic 戦略の中心的な製品です。
                </p>
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-900 leading-6">
                  <strong>Summit 2026 デモ</strong><br />
                  MCP 連携により「毎朝 6 時にブリーフがメールで届き、
                  分析結果が Slack に共有される」自動実行がデモされました。
                  ユーザーが情報を取りに行くだけでなく、<strong>必要な情報が向こうから届く</strong>設計です。
                  これは RAG（読む）+ MCP（Slack・メールに送る）の組み合わせで実現します。
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 min-w-52">
                <div className="text-sm font-semibold text-gray-700 mb-3">CoWork の主な機能</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>🤖 マルチエージェントの振り分け</li>
                  <li>🧠 ユーザーメモリ（文脈の継続）</li>
                  <li>⏰ スケジュール実行</li>
                  <li>📚 Cortex Search（RAG）で調べる</li>
                  <li>📬 メール・Slack 連携（MCP 経由）</li>
                  <li>🔒 ガバナンス付きデータアクセス</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Copilot RAG との違い */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">10. Copilot RAG との違い・使い分け</h3>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  {["観点", "Snowflake MCP ゲートウェイ", "GitHub Copilot + MCP Server"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-slate-800">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["ゲートウェイの場所", "Snowflake 側（Natoma）で一元管理", "各プロジェクトで MCP Server を個別に立てる"],
                  ["監査ログ", "Snowflake に自動統合、一元検索可能", "各 MCP Server 側で別途実装が必要"],
                  ["権限管理", "Snowflake RBAC と統合", "MCP Server ごとに設計"],
                  ["接続ツール数", "100+ の検証済みコネクタ（Natoma）", "自前で MCP Server を実装・管理"],
                  ["向いているケース", "本番運用・監査要件あり・大規模組織", "PoC・小規模・開発者中心のチーム"],
                  ["コスト・管理コスト", "Snowflake 契約に統合（管理負荷低）", "MCP Server の運用コストが別途発生"],
                ].map((row, i) => (
                  <tr key={i} className={`border-t border-gray-200 align-top ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{row[0]}</td>
                    <td className="px-4 py-3 text-sky-800 leading-6">{row[1]}</td>
                    <td className="px-4 py-3 text-slate-600 leading-6">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 11. NRI案件への示唆 */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">11. NRI 案件への示唆</h3>
          <div className="space-y-4">
            {[
              {
                icon: "🏛️",
                title: "行政案件（都庁など）",
                body: "監査要件・データ主権の観点から、エージェントのアクション履歴を Snowflake 側に残せる MCP ゲートウェイは説明責任の担保に直結します。「AI が何をしたか」をデータとして残す要件に対して、Snowflake の Query History と AI のアクションログを同じ基盤で監査できる点は強力な訴求になります。",
                color: "border-sky-200 bg-sky-50",
              },
              {
                icon: "🏢",
                title: "大企業・金融・製造",
                body: "複数部門が異なるエージェントを使う場面では、ゲートウェイ一点で権限・監査を集約できる点が刺さります。「部署ごとに MCP Server を立てない、中央集権のガバナンス」として提案できます。従来の External Function / Snowpark での個別連携から MCP ゲートウェイへの移行は、管理コスト削減の文脈でも訴求できます。",
                color: "border-indigo-200 bg-indigo-50",
              },
              {
                icon: "🚀",
                title: "PoC から本番への移行シナリオ",
                body: "PoC では Copilot + MCP Server で素早く立ち上げ、本番移行時に Snowflake MCP ゲートウェイに切り替えるというロードマップが自然です。あるいは、すでに External Function / Snowpark で個別連携している案件を「MCP 標準化 + Natoma ガバナンス」に統合するリアーキテクチャ提案も有効です。",
                color: "border-emerald-200 bg-emerald-50",
              },
              {
                icon: "📊",
                title: "提案のフレーム：Control Plane for Agentic Enterprise",
                body: "「Snowflake はデータウェアハウスではなく、AI エージェントが情報を読む権限も外部システムを操作する権限も一元管理できる Control Plane だ」というポジショニングで提案できます。RAG（読む）+ MCP（行動する）+ Snowflake RBAC（制御する）= エンタープライズ向け AI 基盤の完成形、という訴求です。",
                color: "border-violet-200 bg-violet-50",
              },
            ].map((card) => (
              <div key={card.title} className={`rounded-xl border ${card.color} p-5`}>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{card.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{card.title}</h4>
                    <p className="text-sm text-gray-700 leading-6">{card.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* まとめ */}
        <section className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">まとめ</h3>
          <p className="text-slate-200 leading-7 mb-4 max-w-4xl">
            Natoma 買収の本質は「外部 SaaS に接続できるようになった」ではありません。
            接続手段は External Function・Snowpark・Streamlit・Cortex Agents など以前から複数存在していました。
            Natoma が持ち込む価値は、AI エージェントの外部アクション（tool-call）を
            MCP プロトコルで標準化し、<strong>Snowflake の RBAC・監査基盤でガバナンスできる</strong>点です。
            これにより Snowflake は「データへのアクセスをガバナンスするプラットフォーム」から
            「AI の行動もガバナンスする Control Plane」へと進化します。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm mb-6">
            <div className="rounded-xl bg-white/10 px-4 py-3">・接続手段は以前から存在</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・Natoma = MCP 標準化 + ガバナンス</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・RAG + MCP = 読んで行動する AI</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・Control Plane for Agentic Enterprise</div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/training/snowflake/data-platform"
              className="inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              データ基盤の位置づけへ →
            </Link>
            <Link
              href="/training/copilot-rag"
              className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Copilot RAG との比較へ →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
