import Link from "next/link";
import SnowflakeSubNav from "../SnowflakeSubNav";

export default function SnowflakeCortexPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Cortex AI — Snowflake ネイティブの AI 機能群</h2>
      <SnowflakeSubNav />

      <div className="space-y-8">

        {/* Hero */}
        <section className="bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                <span>🧠</span>
                Snowflake Cortex AI
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                データを動かさずに AI を動かす
              </h3>
              <p className="text-slate-700 leading-7 max-w-3xl">
                Cortex AI は Snowflake に内蔵された AI 機能群です。
                外部の AI サービスにデータを送ることなく、Snowflake 内のデータに対して
                <strong>LLM 推論・意味検索・自然言語 SQL・AI エージェント</strong>を実行できます。
                すべてのアクセス・実行ログは Snowflake の RBAC と Query History で一元管理されます。
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur border border-sky-100 rounded-xl p-4 shadow-sm min-w-56">
              <div className="text-sm text-slate-500 mb-2">Cortex AI の 4 機能</div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>🔤 <strong>Cortex Functions</strong> — SQL から LLM 呼び出し</li>
                <li>🔍 <strong>Cortex Search</strong> — 意味検索・RAG 基盤</li>
                <li>📊 <strong>Cortex Analyst</strong> — 自然言語 → SQL</li>
                <li>🤖 <strong>Cortex Agents</strong> — AI エージェント</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 1. 機能マップ */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Cortex AI 機能マップ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: "🔤",
                name: "Cortex Functions",
                badge: "SQL 関数",
                badgeColor: "bg-blue-100 text-blue-800",
                desc: "SELECT 文の中で LLM を呼べる関数群。テキスト生成・要約・翻訳・感情分析・ベクトル埋め込みを SQL 1行で実行できます。",
                use: "既存テーブルのデータを AI で加工・分析したいとき",
                example: "COMPLETE, SUMMARIZE, TRANSLATE, SENTIMENT, EMBED_TEXT_768",
                border: "border-blue-200",
                bg: "bg-blue-50",
              },
              {
                icon: "🔍",
                name: "Cortex Search",
                badge: "意味検索サービス",
                badgeColor: "bg-emerald-100 text-emerald-800",
                desc: "テキストデータを自動でチャンク化・ベクトル化し、意味検索（セマンティック検索）サービスとして公開します。RAG の検索エンジンとして使われます。",
                use: "社内文書・FAQ・仕様書を AI が検索して回答させたいとき",
                example: "CREATE CORTEX SEARCH SERVICE ... ON COLUMN content",
                border: "border-emerald-200",
                bg: "bg-emerald-50",
              },
              {
                icon: "📊",
                name: "Cortex Analyst",
                badge: "NL2SQL",
                badgeColor: "bg-amber-100 text-amber-800",
                desc: "業務用語とテーブル構造をセマンティックモデルとして定義すると、自然言語の質問を SQL に変換して回答します。BI ツールなしでビジネスユーザーが分析できます。",
                use: "データ分析を技術者以外のユーザーにも開放したいとき",
                example: "semantic_model.yaml + Analyst API",
                border: "border-amber-200",
                bg: "bg-amber-50",
              },
              {
                icon: "🤖",
                name: "Cortex Agents",
                badge: "AI エージェント",
                badgeColor: "bg-violet-100 text-violet-800",
                desc: "Cortex Search・SQL 実行・外部ツール（MCP 経由）を組み合わせて、複数ステップのタスクを自律的に実行するエージェント基盤です。CoWork の内部エンジンでもあります。",
                use: "「調べて → 判断して → 実行する」自動化ワークフローを作りたいとき",
                example: "Agent API + tool_resources (search, sql, mcp)",
                border: "border-violet-200",
                bg: "bg-violet-50",
              },
            ].map((item) => (
              <div key={item.name} className={`rounded-xl border ${item.border} ${item.bg} p-5`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-800">{item.name}</div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-6 mb-2">{item.desc}</p>
                <div className="text-xs text-gray-500 mb-1"><strong>使いどき：</strong>{item.use}</div>
                <div className="text-xs font-mono bg-white/70 border border-gray-200 rounded px-2 py-1 text-gray-600">{item.example}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Cortex Functions */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Cortex Functions — SQL から LLM を直接呼ぶ</h3>
          <p className="text-gray-700 leading-7 mb-5">
            Cortex Functions は <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">SNOWFLAKE.CORTEX</code> スキーマ配下の SQL 関数です。
            既存のクエリに組み込むだけで LLM の能力をデータパイプラインに加えられます。
          </p>

          {/* 関数一覧テーブル */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-5">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  {["関数名", "目的", "主な用途"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-slate-800">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    fn: "COMPLETE(model, prompt)",
                    desc: "テキスト生成・Q&A・要約など汎用 LLM 呼び出し",
                    use: "社内文書への質問回答、RAG の生成ステップ、メール下書き生成",
                  },
                  {
                    fn: "SUMMARIZE(text)",
                    desc: "テキストの要約を返す",
                    use: "会議録・報告書・ニュースの自動要約",
                  },
                  {
                    fn: "TRANSLATE(text, source, target)",
                    desc: "指定言語への翻訳",
                    use: "多言語ドキュメントの一括翻訳・多言語対応チャットボット",
                  },
                  {
                    fn: "SENTIMENT(text)",
                    desc: "ポジティブ / ネガティブ / ニュートラル の判定",
                    use: "カスタマーフィードバック・レビューの感情分析",
                  },
                  {
                    fn: "EXTRACT_ANSWER(question, context)",
                    desc: "コンテキスト文章から質問への回答を抽出",
                    use: "仕様書から特定条件を抽出、FAQ の自動回答",
                  },
                  {
                    fn: "CLASSIFY_TEXT(text, categories)",
                    desc: "テキストを指定カテゴリに分類",
                    use: "問い合わせチケットの自動振り分け、文書の種別分類",
                  },
                  {
                    fn: "EMBED_TEXT_768/1024(model, text)",
                    desc: "テキストをベクトル（埋め込み）に変換",
                    use: "Cortex Search のインデックス作成、類似文書検索",
                  },
                ].map((row, i) => (
                  <tr key={row.fn} className={`border-t border-gray-200 align-top ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-4 py-3 font-mono text-xs text-sky-800 whitespace-nowrap">{row.fn}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.desc}</td>
                    <td className="px-4 py-3 text-slate-600 leading-6">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SQL例 */}
          <div className="bg-slate-900 rounded-xl p-5">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">SQL 使用例</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <div className="text-sky-400 mb-2 font-semibold">COMPLETE — テキスト生成</div>
                <pre className="text-green-300 leading-6 overflow-x-auto whitespace-pre">{`SELECT
  id,
  SNOWFLAKE.CORTEX.COMPLETE(
    'llama3.1-70b',
    '次のメールを3行で要約してください:\\n' || email_body
  ) AS summary
FROM customer_emails;`}</pre>
              </div>
              <div>
                <div className="text-sky-400 mb-2 font-semibold">SENTIMENT — 感情分析</div>
                <pre className="text-green-300 leading-6 overflow-x-auto whitespace-pre">{`SELECT
  review_id,
  review_text,
  SNOWFLAKE.CORTEX.SENTIMENT(review_text)
    AS sentiment_score  -- -1(負) 〜 1(正)
FROM product_reviews
WHERE sentiment_score < -0.3;`}</pre>
              </div>
              <div>
                <div className="text-sky-400 mb-2 font-semibold">TRANSLATE — 翻訳</div>
                <pre className="text-green-300 leading-6 overflow-x-auto whitespace-pre">{`SELECT
  doc_id,
  SNOWFLAKE.CORTEX.TRANSLATE(
    content, 'en', 'ja'
  ) AS translated
FROM technical_docs
WHERE language = 'en';`}</pre>
              </div>
              <div>
                <div className="text-sky-400 mb-2 font-semibold">EMBED_TEXT — ベクトル化</div>
                <pre className="text-green-300 leading-6 overflow-x-auto whitespace-pre">{`SELECT
  chunk_id,
  chunk_text,
  SNOWFLAKE.CORTEX.EMBED_TEXT_768(
    'snowflake-arctic-embed-m-v1.5',
    chunk_text
  ) AS embedding
FROM document_chunks;`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Cortex Search */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Cortex Search — 意味検索・RAG の基盤</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div className="space-y-4">
              <p className="text-gray-700 leading-7">
                Cortex Search は Snowflake のテーブルカラムを指定するだけで、
                <strong>自動チャンク化・ベクトル化・ハイブリッド検索インデックス</strong>を構築するサービスです。
                外部のベクトル DB（Pinecone・Weaviate など）を用意する必要がなく、
                Snowflake のガバナンスを維持したまま RAG の検索部分を実装できます。
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-900 leading-6">
                <strong>ハイブリッド検索とは</strong><br />
                キーワード検索（BM25）と意味検索（ベクトル類似度）を組み合わせた検索方式です。
                「完全一致しないが意味が近い」文書も、「特定キーワードを含む」文書も両方取得でき、
                単純なキーワード検索より回答品質が高くなります。
              </div>
            </div>
            <div className="space-y-3">
              <div className="font-semibold text-gray-700 text-sm mb-2">Cortex Search の仕組み</div>
              {[
                { step: "1", label: "データ準備", desc: "テキストデータを Snowflake テーブルに格納（PDF・HTML・Markdown も可）", color: "bg-emerald-100 text-emerald-800" },
                { step: "2", label: "サービス作成", desc: "CREATE CORTEX SEARCH SERVICE でカラムを指定。チャンク化・ベクトル化は自動実行", color: "bg-sky-100 text-sky-800" },
                { step: "3", label: "インクリメンタル更新", desc: "テーブルにデータが追加されると自動でインデックスが更新される", color: "bg-indigo-100 text-indigo-800" },
                { step: "4", label: "検索 API", desc: "REST API または SEARCH() 関数で意味検索を実行。RAG の検索ステップとして組み込む", color: "bg-violet-100 text-violet-800" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-3">
                  <span className={`${item.color} text-xs font-bold px-2 py-1 rounded-full shrink-0`}>{item.step}</span>
                  <div>
                    <div className="font-semibold text-gray-800 text-xs mb-0.5">{item.label}</div>
                    <div className="text-xs text-gray-600 leading-5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-5">
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Cortex Search — 作成と検索</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <div className="text-sky-400 mb-2 font-semibold">サービス作成（DDL）</div>
                <pre className="text-green-300 leading-6 overflow-x-auto whitespace-pre">{`CREATE OR REPLACE CORTEX SEARCH SERVICE
  doc_search_svc
ON COLUMN chunk_text        -- 検索対象カラム
ATTRIBUTES doc_title, source_url  -- フィルタ用メタデータ
WAREHOUSE = my_wh
TARGET_LAG = '1 hour'       -- 更新ラグ
AS (
  SELECT
    chunk_text,
    doc_title,
    source_url
  FROM document_chunks
);`}</pre>
              </div>
              <div>
                <div className="text-sky-400 mb-2 font-semibold">検索（Python SDK / REST API）</div>
                <pre className="text-green-300 leading-6 overflow-x-auto whitespace-pre">{`from snowflake.core.cortex.search import (
    CortexSearchService
)

svc = root.databases["MY_DB"] \\
    .schemas["MY_SCHEMA"] \\
    .cortex_search_services["doc_search_svc"]

results = svc.search(
    query="Snowflake の RBAC 設定方法",
    columns=["chunk_text", "doc_title"],
    limit=5
)

# results.results に検索結果リストが入る`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Cortex Analyst */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. Cortex Analyst — 自然言語で分析する</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-gray-700 leading-7">
                Cortex Analyst はビジネスユーザーが自然言語で分析できる機能です。
                <strong>セマンティックモデル（semantic_model.yaml）</strong>でテーブル・カラム・業務用語の
                定義をあらかじめ与えると、ユーザーの質問を SQL に変換して回答します。
                BI ツールや SQL の知識がなくてもデータ分析が可能になります。
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 leading-6">
                <strong>セマンティックモデルの役割</strong><br />
                「売上」という言葉が <code className="bg-amber-100 px-1 rounded">sales_amount</code> カラムを指す、
                「顧客」は <code className="bg-amber-100 px-1 rounded">customer</code> テーブルと <code className="bg-amber-100 px-1 rounded">account</code> テーブルの
                結合で表される、といった業務知識を YAML で定義します。
                これにより LLM が正確な SQL を生成できるようになります。
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-sm font-semibold text-gray-700 mb-3">アーキテクチャ</div>
                <div className="space-y-2 text-xs">
                  {[
                    { from: "ユーザー", to: "自然言語の質問", color: "bg-gray-100 text-gray-700" },
                    { from: "Cortex Analyst API", to: "セマンティックモデルで SQL に変換", color: "bg-amber-100 text-amber-800" },
                    { from: "Snowflake SQL エンジン", to: "SQL を実行してデータを取得", color: "bg-sky-100 text-sky-800" },
                    { from: "Analyst", to: "結果を自然言語で回答（+ SQL 表示）", color: "bg-emerald-100 text-emerald-800" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className={`${item.color} text-xs font-bold px-2 py-1 rounded shrink-0`}>{item.from}</span>
                      <span className="text-gray-500">→</span>
                      <span className="text-gray-600 leading-5">{item.to}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-900 rounded-xl p-4">
                <div className="text-sky-400 text-xs font-semibold mb-2">semantic_model.yaml（抜粋）</div>
                <pre className="text-green-300 text-xs leading-6 overflow-x-auto whitespace-pre">{`name: NRI Sales Model
tables:
  - name: SALES
    base_table:
      database: NRI_DB
      schema: ANALYTICS
      table: FACT_SALES
    dimensions:
      - name: 顧客名
        expr: customer_name
      - name: 商品カテゴリ
        expr: product_category
    measures:
      - name: 売上金額
        expr: revenue
        default_aggregation: sum
      - name: 案件数
        expr: count(deal_id)
filters:
  - name: 今月
    expr: "date_trunc('month', date) = date_trunc('month', current_date())"`}</pre>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm">
                <div className="font-semibold text-gray-700 mb-2">対話例</div>
                <div className="space-y-2 text-xs leading-5">
                  <div className="bg-gray-100 rounded-lg px-3 py-2 text-gray-700">
                    👤 「今月の商品カテゴリ別の売上を教えて」
                  </div>
                  <div className="bg-sky-50 border border-sky-100 rounded-lg px-3 py-2 text-sky-800">
                    🤖 「今月の商品カテゴリ別売上です：<br/>
                    ・クラウド基盤: ¥42,000,000<br/>
                    ・AIソリューション: ¥28,500,000<br/>
                    ・コンサルティング: ¥15,200,000<br/>
                    <span className="text-sky-600">（使用した SQL を表示）</span>
                    」
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Cortex Agents */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">5. Cortex Agents — 複数ステップを自律実行</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-gray-700 leading-7">
                Cortex Agents は Cortex Search・SQL 実行・外部ツール（MCP 経由）を
                <strong>ツール</strong>として持ち、ユーザーの指示を達成するために
                自律的にどのツールをどの順番で使うかを決定します。
                CoWork（旧 Snowflake Intelligence）の内部エンジンでもあります。
              </p>
              <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-violet-900 leading-6">
                <strong>ReAct パターン</strong><br />
                「考える（Reason）→ 行動する（Act）→ 観察する（Observe）」を繰り返す推論方式です。
                例：「先月の売上が低かった商品を調べて、在庫状況を確認し、担当者に Slack で通知する」という
                タスクを受け取ると、①SQL で売上分析 → ②在庫テーブルを検索 → ③Slack に MCP 経由で送信 を自律的に実行します。
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-sm font-semibold text-gray-700 mb-3">Cortex Agent が使えるツール</div>
                <div className="space-y-2 text-xs">
                  {[
                    { tool: "Cortex Search", desc: "社内文書・FAQ をセマンティック検索", icon: "🔍" },
                    { tool: "SQL 実行", desc: "Snowflake のデータを SELECT / 集計", icon: "📊" },
                    { tool: "MCP ツール", desc: "Slack・Jira・GitHub など外部 SaaS を操作（Natoma 経由）", icon: "🔌" },
                    { tool: "Python 関数", desc: "カスタムロジック・計算・外部 API 呼び出し", icon: "🐍" },
                  ].map((item) => (
                    <div key={item.tool} className="flex items-start gap-3 bg-gray-50 rounded-lg p-2.5">
                      <span className="text-base shrink-0">{item.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-800">{item.tool}</div>
                        <div className="text-gray-500 leading-5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900 rounded-xl p-4">
                <div className="text-sky-400 text-xs font-semibold mb-2">Cortex Agent 呼び出し例（Python）</div>
                <pre className="text-green-300 text-xs leading-6 overflow-x-auto whitespace-pre">{`from snowflake.cortex import Agent

agent = Agent(
    model="llama3.1-70b",
    tools=[
        {"tool_spec": {
            "type": "cortex_search",
            "name": "doc_search_svc"
        }},
        {"tool_spec": {
            "type": "cortex_analyst_text_to_sql",
            "name": "sales_model"
        }},
    ]
)

response = agent.run(
    "先月売上が前月比20%以上落ちた商品を"
    "調べて、担当者に報告用メモを作成して"
)`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* 6. 利用可能モデル */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">6. 利用可能な LLM モデル</h3>
          <p className="text-gray-700 leading-7 mb-5">
            Cortex Functions・Cortex Agents で使用するモデルは <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">model</code> パラメータで指定します。
            すべてのモデルは Snowflake のインフラ内で実行されるため、データが外部に送信されません。
          </p>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  {["モデル名", "提供元", "規模", "特徴・使いどき"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-slate-800">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    model: "llama3.1-8b",
                    provider: "Meta",
                    size: "8B",
                    note: "高速・低コスト。単純な要約・分類・翻訳など大量処理向き",
                    providerColor: "bg-blue-100 text-blue-800",
                  },
                  {
                    model: "llama3.1-70b",
                    provider: "Meta",
                    size: "70B",
                    note: "速度と品質のバランスが良い。RAG の回答生成・Analyst に推奨",
                    providerColor: "bg-blue-100 text-blue-800",
                  },
                  {
                    model: "llama3.1-405b",
                    provider: "Meta",
                    size: "405B",
                    note: "最高品質。複雑な推論・長文生成・エージェントの複雑タスク向き",
                    providerColor: "bg-blue-100 text-blue-800",
                  },
                  {
                    model: "claude-3-5-sonnet",
                    provider: "Anthropic",
                    size: "—",
                    note: "高い推論精度・長文対応。コーディング・詳細な分析タスクに優秀",
                    providerColor: "bg-orange-100 text-orange-800",
                  },
                  {
                    model: "mistral-large2",
                    provider: "Mistral",
                    size: "123B",
                    note: "多言語対応に強い。日本語・欧州言語を扱う案件に向く",
                    providerColor: "bg-indigo-100 text-indigo-800",
                  },
                  {
                    model: "snowflake-arctic-instruct",
                    provider: "Snowflake",
                    size: "480B MoE",
                    note: "Snowflake 製 OSS モデル。エンタープライズ SQL タスクに最適化",
                    providerColor: "bg-sky-100 text-sky-800",
                  },
                  {
                    model: "snowflake-arctic-embed-m-v1.5",
                    provider: "Snowflake",
                    size: "埋め込み",
                    note: "EMBED_TEXT_768 で使用。Cortex Search のデフォルト埋め込みモデル",
                    providerColor: "bg-sky-100 text-sky-800",
                  },
                ].map((row, i) => (
                  <tr key={row.model} className={`border-t border-gray-200 align-top ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-4 py-3 font-mono text-xs text-sky-800">{row.model}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.providerColor}`}>{row.provider}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{row.size}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-sky-50 border border-sky-200 rounded-xl p-4 text-sm text-sky-900 leading-6">
            <strong>コスト感の目安：</strong>
            Cortex Functions の課金は <strong>トークン数</strong>（入力 + 出力）に比例します。
            大量データをバッチ処理する場合は 8b〜70b モデルで十分なことが多く、
            エージェントの複雑な推論や高品質な回答が必要な場面で 405b や Claude を使うのがバランスよいです。
            Cortex Search は <strong>検索クレジット</strong>（インデックスサイズ × 更新頻度）での課金です。
          </div>
        </section>

        {/* 7. Cortex機能の選択ガイド */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">7. 機能選択ガイド：何を使えばいいか</h3>
          <div className="space-y-3">
            {[
              {
                scenario: "既存テーブルのテキストデータを一括で AI 処理したい",
                answer: "Cortex Functions（SUMMARIZE / TRANSLATE / SENTIMENT）",
                detail: "SQL の SELECT に組み込むだけ。ETL パイプラインや dbt の変換処理として使える。",
                icon: "🔤",
                color: "border-blue-200 bg-blue-50",
                answerColor: "text-blue-800",
              },
              {
                scenario: "社内文書・仕様書に対して AI が質問に答えるシステムを作りたい",
                answer: "Cortex Search + COMPLETE（RAG パターン）",
                detail: "Cortex Search で関連文書を取得し、COMPLETE で回答生成。RAG 構築ページも参照。",
                icon: "🔍",
                color: "border-emerald-200 bg-emerald-50",
                answerColor: "text-emerald-800",
              },
              {
                scenario: "ビジネスユーザーが自然言語でデータ分析したい",
                answer: "Cortex Analyst",
                detail: "セマンティックモデルの整備が事前に必要。Streamlit や外部アプリに API として組み込める。",
                icon: "📊",
                color: "border-amber-200 bg-amber-50",
                answerColor: "text-amber-800",
              },
              {
                scenario: "「調べて → 判断して → 外部ツールを操作する」を自動化したい",
                answer: "Cortex Agents（+ MCP ゲートウェイ）",
                detail: "エージェントが Cortex Search・SQL・MCP ツールを組み合わせて自律実行。CoWork 経由でも使える。",
                icon: "🤖",
                color: "border-violet-200 bg-violet-50",
                answerColor: "text-violet-800",
              },
              {
                scenario: "テキストの意味的な類似度計算や独自ベクトル検索を実装したい",
                answer: "EMBED_TEXT_768/1024 + VECTOR_COSINE_SIMILARITY",
                detail: "Cortex Search より低レベルな実装。独自の検索ロジックが必要な場合に使う。",
                icon: "📐",
                color: "border-gray-200 bg-white",
                answerColor: "text-gray-800",
              },
            ].map((item) => (
              <div key={item.scenario} className={`rounded-xl border ${item.color} p-5`}>
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800 mb-1">「{item.scenario}」</div>
                    <div className={`text-sm font-bold ${item.answerColor} mb-1`}>→ {item.answer}</div>
                    <div className="text-xs text-gray-600 leading-5">{item.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. NRI案件での活用パターン */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">8. NRI 案件での活用パターン</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: "🏛️",
                title: "行政案件：仕様書 RAG",
                layers: [
                  { label: "データ", desc: "仕様書・法令・ガイドラインを Snowflake Stage に格納" },
                  { label: "インデックス", desc: "Cortex Search でチャンク化・ベクトル化" },
                  { label: "検索", desc: "Cortex Search API で関連チャンクを取得" },
                  { label: "生成", desc: "COMPLETE（llama3.1-70b）で根拠付き回答を生成" },
                  { label: "監査", desc: "全クエリ・回答ログを Query History に自動保存" },
                ],
                border: "border-sky-200 bg-sky-50",
              },
              {
                icon: "🏢",
                title: "企業案件：自然言語BI",
                layers: [
                  { label: "モデル定義", desc: "売上・顧客・在庫テーブルのセマンティックモデルを YAML で定義" },
                  { label: "インターフェース", desc: "Streamlit in Snowflake に Analyst API を組み込み" },
                  { label: "分析", desc: "ビジネスユーザーが自然言語で質問 → SQL 変換 → 回答" },
                  { label: "拡張", desc: "重要な KPI 変化を Cortex Agent が検知 → Slack に通知" },
                ],
                border: "border-indigo-200 bg-indigo-50",
              },
            ].map((pattern) => (
              <div key={pattern.title} className={`rounded-xl border ${pattern.border} p-5`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{pattern.icon}</span>
                  <h4 className="font-semibold text-gray-800">{pattern.title}</h4>
                </div>
                <div className="space-y-2">
                  {pattern.layers.map((layer, i) => (
                    <div key={i} className="flex items-start gap-2 bg-white border border-gray-100 rounded-lg px-3 py-2">
                      <span className="text-xs font-bold text-gray-500 shrink-0 w-16">{layer.label}</span>
                      <span className="text-xs text-gray-700 leading-5">{layer.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* まとめ */}
        <section className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">まとめ</h3>
          <p className="text-slate-200 leading-7 mb-4 max-w-4xl">
            Cortex AI は SQL から呼べる LLM 関数（Functions）・意味検索サービス（Search）・
            自然言語 SQL（Analyst）・AI エージェント（Agents）の 4 機能で構成されます。
            すべてが Snowflake 内で完結するため、データを外部に送ることなく AI を活用でき、
            RBAC・監査ログもそのまま維持されます。RAG 構築や MCP ゲートウェイと組み合わせることで、
            「調べて → 判断して → 行動する」フルスタックの AI 基盤が実現します。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm mb-6">
            <div className="rounded-xl bg-white/10 px-4 py-3">・Functions: SQL から LLM</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・Search: RAG の検索基盤</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・Analyst: 自然言語BI</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・Agents: 自律実行エンジン</div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/training/snowflake/rag"
              className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              RAG 構築へ →
            </Link>
            <Link
              href="/training/snowflake/mcp-gateway"
              className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              MCP ゲートウェイへ →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
