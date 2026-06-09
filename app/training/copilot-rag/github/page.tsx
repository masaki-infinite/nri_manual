import Link from "next/link";

export default function CopilotRagGithubPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/training/copilot-rag" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← Copilot RAG に戻る
        </Link>
        <span className="text-gray-300">/</span>
        <Link href="/training/github" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          GitHub 勉強会へ
        </Link>
      </div>

      <section className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-200 rounded-2xl p-6 md:p-8 mb-8">
        <div className="text-4xl mb-4">🐙</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">GitHub で始める Copilot RAG</h2>
        <p className="text-gray-700 leading-7 max-w-4xl mb-4">
          GitHub 環境では、まず MCP ベースの PoC から始めるのが最も説明しやすいです。
          Copilot Agent に対して外部システム検索を与え、Confluence / Jira / SharePoint / PDF を横断して回答させます。
        </p>
        <p className="text-gray-700 leading-7 max-w-4xl">
          ここでのポイントは、Copilot 自体に巨大なナレッジを持たせるのではなく、検索と取得を担当する RAG 基盤を別に用意し、
          GitHub Copilot から利用させることです。
        </p>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">まず結論: フロントページは必須ではない</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-xl border border-violet-200 bg-violet-50/40 p-5">
            <h4 className="font-semibold text-gray-800 mb-2">必須ではない理由</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-6">
              <li>・GitHub Copilot Agent から MCP を直接呼べるため、専用ポータルなしでも動く</li>
              <li>・PoC なら、チャット入力だけで十分に価値を見せられる</li>
              <li>・本番では Copilot が入口なので、UI を別途作り込まなくても成立する</li>
            </ul>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-5">
            <h4 className="font-semibold text-gray-800 mb-2">作ると良い場面</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-6">
              <li>・勉強会やデモで全体像を見せたい</li>
              <li>・検索対象や利用方法を一覧で案内したい</li>
              <li>・Copilot からの問い合わせ前に、利用者が入口を選びたい</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600 leading-6">
          このページの役割は「フロントアプリを作ること」ではなく、Copilot がどう RAG 基盤を使うのかを説明することです。
          そのため、フロントページはあくまで説明用・導線用の補助です。
        </p>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">構築手順書</h3>
        <p className="text-gray-700 leading-7 mb-5">
          まずは MCP ベースの PoC として、Copilot から社内ナレッジを引ける最小構成を作ります。
          その後、文書量や運用要件に応じて Azure AI Search や Bedrock などの本格基盤へ拡張します。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-violet-200 bg-violet-50/40 p-4">
            <div className="text-xs font-bold text-violet-700 mb-2">STEP 1</div>
            <h4 className="font-semibold text-gray-800 mb-2">対象ナレッジを決める</h4>
            <p className="text-sm text-gray-700 leading-6">
              Confluence、Jira、SharePoint、PDF など、検索対象を絞って開始します。
            </p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50/40 p-4">
            <div className="text-xs font-bold text-violet-700 mb-2">STEP 2</div>
            <h4 className="font-semibold text-gray-800 mb-2">MCP Server を用意する</h4>
            <p className="text-sm text-gray-700 leading-6">
              Copilot から呼び出せる検索 API を作り、外部システムへの接続口をまとめます。
            </p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50/40 p-4">
            <div className="text-xs font-bold text-violet-700 mb-2">STEP 3</div>
            <h4 className="font-semibold text-gray-800 mb-2">検索結果の形を揃える</h4>
            <p className="text-sm text-gray-700 leading-6">
              タイトル、要約、参照元、更新日時のような形式に整え、Copilot が扱いやすい応答にします。
            </p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50/40 p-4">
            <div className="text-xs font-bold text-violet-700 mb-2">STEP 4</div>
            <h4 className="font-semibold text-gray-800 mb-2">質問セットで検証する</h4>
            <p className="text-sm text-gray-700 leading-6">
              運用手順、FAQ、問い合わせ、規程などで回答品質を確認し、必要なら本格RAGへ移行します。
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-dashed border-violet-300 bg-violet-50/50 p-4 text-sm text-violet-900">
          詳しい汎用手順は <Link href="/training/copilot-rag/build-guide" className="font-semibold underline">構築手順書</Link> を参照できます。
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">ナレッジはどこに置くのか</h3>
        <p className="text-gray-700 leading-7 mb-4">
          原本データは各システムを正本として残し、Copilot 用には検索インデックスや中継 API を作ります。
          つまり、Confluence / Jira / SharePoint / PDF を「Copilot に移す」のではなく、そこから取得して使います。
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-slate-800">ナレッジ源</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-800">正本の置き場所</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-800">Copilot 用の置き場所</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-800">ポイント</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200 align-top">
                <td className="px-4 py-3 font-medium text-slate-900">Confluence</td>
                <td className="px-4 py-3 text-slate-700">Confluence 本体</td>
                <td className="px-4 py-3 text-slate-700">MCP Server が取得する検索対象 / キャッシュ</td>
                <td className="px-4 py-3 text-slate-700 leading-6">更新頻度が高いので、同期頻度を決める</td>
              </tr>
              <tr className="border-t border-gray-200 align-top">
                <td className="px-4 py-3 font-medium text-slate-900">Jira</td>
                <td className="px-4 py-3 text-slate-700">Jira 本体</td>
                <td className="px-4 py-3 text-slate-700">課題情報を抽出した検索インデックス</td>
                <td className="px-4 py-3 text-slate-700 leading-6">課題・担当・期限を構造化して扱う</td>
              </tr>
              <tr className="border-t border-gray-200 align-top">
                <td className="px-4 py-3 font-medium text-slate-900">SharePoint</td>
                <td className="px-4 py-3 text-slate-700">SharePoint / Microsoft Graph</td>
                <td className="px-4 py-3 text-slate-700">Azure AI Search などの検索基盤</td>
                <td className="px-4 py-3 text-slate-700 leading-6">権限トリミングを必ず効かせる</td>
              </tr>
              <tr className="border-t border-gray-200 align-top">
                <td className="px-4 py-3 font-medium text-slate-900">PDF</td>
                <td className="px-4 py-3 text-slate-700">SharePoint / Box / ファイルサーバー / S3 など</td>
                <td className="px-4 py-3 text-slate-700">分割済みテキスト、要約、索引用メタデータ</td>
                <td className="px-4 py-3 text-slate-700 leading-6">原本はそのまま、検索用に派生データを作る</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-xl border border-dashed border-gray-300 bg-slate-50 p-4 text-sm text-slate-700 leading-6">
          置き場所のルールはシンプルです。<strong>正本は元システム</strong>、<strong>Copilot 用は検索インデックス</strong>、<strong>権限は元システムか基盤側で継承</strong>です。
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">構成図</h3>
        <p className="text-gray-700 leading-7 mb-5">
          添付イメージに合わせて、システム群ごとに枠で分けた図にしています。
          フローは「質問受付 → MCP中継 → Azure検索基盤 → 回答返却」です。
        </p>

        <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-5 mb-5 overflow-x-auto">
          <div className="text-sm text-violet-700 font-semibold mb-4">処理フロー（業務図）</div>
          <svg viewBox="0 0 1180 560" className="min-w-[1040px] w-full h-auto" role="img" aria-label="Copilot RAG 構成図">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#4f46e5" />
              </marker>
            </defs>

            <rect x="20" y="150" width="250" height="220" rx="20" fill="#ffffff" stroke="#94a3b8" strokeDasharray="6 6" />
            <text x="145" y="178" textAnchor="middle" fontSize="15" fill="#0f172a" fontWeight="700">フロント群</text>

            <rect x="45" y="200" width="200" height="62" rx="10" fill="#eef2ff" stroke="#6366f1" />
            <text x="145" y="226" textAnchor="middle" fontSize="13" fill="#1f2937" fontWeight="700">GitHub Copilot Agent</text>
            <text x="145" y="245" textAnchor="middle" fontSize="11" fill="#475569">ユーザー質問受付</text>

            <rect x="45" y="280" width="200" height="62" rx="10" fill="#f8fafc" stroke="#94a3b8" />
            <text x="145" y="306" textAnchor="middle" fontSize="13" fill="#1f2937" fontWeight="700">チャットUI / IDE</text>
            <text x="145" y="325" textAnchor="middle" fontSize="11" fill="#475569">回答表示・引用表示</text>

            <rect x="310" y="120" width="280" height="280" rx="20" fill="#ffffff" stroke="#94a3b8" strokeDasharray="6 6" />
            <text x="450" y="150" textAnchor="middle" fontSize="15" fill="#0f172a" fontWeight="700">中継・制御群</text>

            <rect x="335" y="185" width="230" height="64" rx="10" fill="#f5f3ff" stroke="#8b5cf6" />
            <text x="450" y="212" textAnchor="middle" fontSize="13" fill="#1f2937" fontWeight="700">MCP Server</text>
            <text x="450" y="232" textAnchor="middle" fontSize="11" fill="#475569">質問を Azure 側 API に転送</text>

            <rect x="335" y="268" width="230" height="64" rx="10" fill="#eef2ff" stroke="#6366f1" />
            <text x="450" y="295" textAnchor="middle" fontSize="13" fill="#1f2937" fontWeight="700">プロンプト整形・権限制御</text>
            <text x="450" y="315" textAnchor="middle" fontSize="11" fill="#475569">問い合わせ文脈 / 利用者情報を付与</text>

            <rect x="630" y="80" width="280" height="320" rx="20" fill="#ffffff" stroke="#38bdf8" strokeDasharray="6 6" />
            <text x="770" y="110" textAnchor="middle" fontSize="15" fill="#0f172a" fontWeight="700">Azure RAG 基盤群</text>

            <rect x="655" y="140" width="230" height="64" rx="10" fill="#e0f2fe" stroke="#0284c7" />
            <text x="770" y="167" textAnchor="middle" fontSize="13" fill="#1f2937" fontWeight="700">Azure AI Search</text>
            <text x="770" y="187" textAnchor="middle" fontSize="11" fill="#475569">関連ドキュメントを検索</text>

            <rect x="655" y="223" width="230" height="64" rx="10" fill="#cffafe" stroke="#0891b2" />
            <text x="770" y="250" textAnchor="middle" fontSize="13" fill="#1f2937" fontWeight="700">Azure OpenAI</text>
            <text x="770" y="270" textAnchor="middle" fontSize="11" fill="#475569">要約・回答文を生成</text>

            <rect x="655" y="306" width="230" height="64" rx="10" fill="#ecfeff" stroke="#14b8a6" />
            <text x="770" y="333" textAnchor="middle" fontSize="13" fill="#1f2937" fontWeight="700">引用・根拠整形</text>
            <text x="770" y="353" textAnchor="middle" fontSize="11" fill="#475569">参照元URL / 文書名を整形</text>

            <rect x="930" y="150" width="230" height="260" rx="20" fill="#ffffff" stroke="#94a3b8" strokeDasharray="6 6" />
            <text x="1045" y="178" textAnchor="middle" fontSize="15" fill="#0f172a" fontWeight="700">ナレッジ保管群</text>

            <rect x="955" y="205" width="180" height="46" rx="10" fill="#f8fafc" stroke="#94a3b8" />
            <text x="1045" y="233" textAnchor="middle" fontSize="12" fill="#1f2937">SharePoint / Graph</text>

            <rect x="955" y="262" width="180" height="46" rx="10" fill="#f8fafc" stroke="#94a3b8" />
            <text x="1045" y="290" textAnchor="middle" fontSize="12" fill="#1f2937">Confluence / Jira</text>

            <rect x="955" y="319" width="180" height="46" rx="10" fill="#f8fafc" stroke="#94a3b8" />
            <text x="1045" y="347" textAnchor="middle" fontSize="12" fill="#1f2937">PDF / 規程文書</text>

            <line x1="245" y1="231" x2="335" y2="217" stroke="#4f46e5" strokeWidth="2.2" markerEnd="url(#arrow)" />
            <text x="287" y="205" textAnchor="middle" fontSize="11" fill="#4338ca">質問</text>

            <line x1="565" y1="217" x2="655" y2="172" stroke="#4f46e5" strokeWidth="2.2" markerEnd="url(#arrow)" />
            <text x="611" y="175" textAnchor="middle" fontSize="11" fill="#4338ca">検索要求</text>

            <line x1="885" y1="172" x2="955" y2="228" stroke="#0ea5e9" strokeWidth="2.2" markerEnd="url(#arrow)" />
            <text x="920" y="198" textAnchor="middle" fontSize="11" fill="#0369a1">参照</text>

            <line x1="955" y1="262" x2="885" y2="245" stroke="#0ea5e9" strokeWidth="2.2" markerEnd="url(#arrow)" />
            <text x="920" y="252" textAnchor="middle" fontSize="11" fill="#0369a1">検索結果</text>

            <line x1="655" y1="333" x2="565" y2="300" stroke="#4f46e5" strokeWidth="2.2" markerEnd="url(#arrow)" />
            <text x="610" y="329" textAnchor="middle" fontSize="11" fill="#4338ca">回答候補</text>

            <line x1="335" y1="300" x2="245" y2="311" stroke="#4f46e5" strokeWidth="2.2" markerEnd="url(#arrow)" />
            <text x="287" y="335" textAnchor="middle" fontSize="11" fill="#4338ca">根拠付き回答</text>

            <rect x="290" y="440" width="600" height="84" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
            <text x="590" y="468" textAnchor="middle" fontSize="13" fill="#1f2937" fontWeight="700">要点</text>
            <text x="590" y="490" textAnchor="middle" fontSize="12" fill="#475569">Copilot はフロント、MCP は中継、Azure 側が検索・ナレッジ管理を担当</text>
            <text x="590" y="509" textAnchor="middle" fontSize="12" fill="#475569">原本は元システムに保持し、検索用インデックスを Azure 側に作る</text>
          </svg>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5">
          <h4 className="font-semibold text-gray-800 mb-3">見せたいメッセージ</h4>
          <ul className="space-y-3 text-sm text-gray-700 leading-6">
            <li>・Copilot は質問の入口（UI）</li>
            <li>・MCP は接続と中継のレイヤ</li>
            <li>・検索とナレッジ保持は Azure 側の責務</li>
            <li>・回答は MCP を通じてフロントへ返却される</li>
          </ul>

          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-bold text-slate-600 mb-2">参考リンク</div>
            <Link href="/training/copilot-rag/build-guide" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              構築手順書を開く →
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">おすすめ構成</h3>
          <pre className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 overflow-auto whitespace-pre-wrap">
{`Confluence
Jira
SharePoint
PDF
   ↓
MCP Server
   ↓
GitHub Copilot Agent`}
          </pre>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">この構成の強み</h3>
          <ul className="space-y-3 text-gray-700 leading-7 text-sm">
            <li>・すぐ作れるので勉強会や PoC に向く</li>
            <li>・GitHub Enterprise と合わせて説明しやすい</li>
            <li>・ベクトル DB を増やさずに始められる</li>
          </ul>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">注意点</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-800 mb-2">向いているケース</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-6">
              <li>・小さく始めたい PoC</li>
              <li>・GitHub 管理の資料が多い組織</li>
              <li>・MCP を使った拡張を見せたい場面</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h4 className="font-semibold text-gray-800 mb-2">限界</h4>
            <ul className="space-y-2 text-sm text-gray-700 leading-6">
              <li>・大量文書になると検索品質が落ちやすい</li>
              <li>・厳密な RAG というより検索連携に近い</li>
              <li>・本番運用では基盤分離を検討した方がよい</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
