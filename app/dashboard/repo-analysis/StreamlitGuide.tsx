"use client";

import { useState } from "react";

type TabId = "start" | "arch" | "steps" | "templates";

const tabs: { id: TabId; label: string }[] = [
  { id: "start", label: "🚀 始め方" },
  { id: "arch", label: "🏗️ 構成図" },
  { id: "steps", label: "📋 手順書" },
  { id: "templates", label: "📁 テンプレ" },
];

function StartGuide() {
  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h3 className="font-semibold text-orange-800 mb-2">Streamlit PoC とは？</h3>
        <p className="text-sm text-orange-700">
          Python + Streamlit でローカル環境から直接 Snowflake に接続し、データ可視化アプリを素早く立ち上げる
          軽量フレームワークです。HVD（Next.js + SPCS）への移行を前提とした <strong>短期 PoC 用途</strong> に最適化されています。
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-3">セットアップ（5 ステップ）</h3>
        <ol className="space-y-3">
          {[
            {
              title: ".env を作成する",
              code: "cp .env.example .env\n# SNOWFLAKE_ACCOUNT / USER / PAT を設定",
            },
            {
              title: "依存パッケージをインストールする",
              code: "pip install -r requirements.txt",
            },
            {
              title: "テンプレをコピーして PoC を作成する",
              code: "cp -r templates/basic projects/<your-project-name>",
            },
            {
              title: "Claude Code に話しかける",
              code: null,
              description: "VSCode で streamlit_snowflake/ を開いて自然言語で依頼",
            },
            {
              title: "アプリを起動する",
              code: "streamlit run app.py\n# → http://localhost:8501 で確認",
            },
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{step.title}</p>
                {step.code && (
                  <pre className="mt-1 bg-gray-900 text-green-400 text-xs rounded p-2 font-mono overflow-x-auto">
                    {step.code}
                  </pre>
                )}
                {step.description && (
                  <p className="mt-1 text-xs text-gray-500">{step.description}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Claude Code との会話例</h3>
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <p className="text-xs text-blue-500 font-medium mb-1">シンプルな依頼</p>
            <p className="text-sm text-gray-700">
              「CUSTOMERS テーブルから月別の新規登録数を棒グラフで表示する Streamlit アプリを
              projects/customer-analysis/ に作ってください」
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
            <p className="text-xs text-blue-500 font-medium mb-1">詳細な依頼</p>
            <p className="text-sm text-gray-700">
              「以下の要件で Streamlit アプリを作ってください：<br />
              - データソース: SALES_DB.PUBLIC.ORDERS<br />
              - 表示: KPI カード（合計売上・件数）+ 月別折れ線グラフ<br />
              - フィルター: 日付範囲・カテゴリ（サイドバー）<br />
              - 場所: projects/sales-dashboard/」
            </p>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="font-semibold text-red-800 mb-2">アンチパターン</h3>
        <ul className="text-sm text-red-700 space-y-1">
          <li>❌ .env をコミットする（.gitignore に必ず追加）</li>
          <li>❌ PAT を app.py にハードコードする</li>
          <li>❌ Streamlit のままで本番リリースを目指す（→ HVD フレームワークへ移行）</li>
          <li>❌ クエリを app.py に直書きする（→ lib/queries.py に分離）</li>
        </ul>
      </div>
    </div>
  );
}

function ArchDiagram() {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-gray-800">アーキテクチャ図</h3>

      {/* Architecture diagram */}
      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          {/* Developer box */}
          <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-4 w-64 text-center">
            <p className="text-xs text-blue-500 font-medium">開発者のローカル PC</p>
            <p className="font-semibold text-blue-800 mt-1">VS Code + Claude Code</p>
            <p className="text-xs text-gray-600 mt-1">streamlit_snowflake/</p>
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <div className="w-16 border-t border-dashed border-gray-400"></div>
            <span>コード生成</span>
            <div className="w-16 border-t border-dashed border-gray-400"></div>
          </div>

          {/* Streamlit box */}
          <div className="bg-orange-100 border-2 border-orange-400 rounded-lg p-4 w-64 text-center">
            <p className="text-xs text-orange-500 font-medium">ローカルサーバー</p>
            <p className="font-semibold text-orange-800 mt-1">Streamlit App</p>
            <p className="text-xs text-gray-600 mt-1">http://localhost:8501</p>
          </div>

          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <div className="w-16 border-t border-gray-400"></div>
            <span>PAT 認証 + HTTPS</span>
            <div className="w-16 border-t border-gray-400"></div>
          </div>

          {/* Snowflake box */}
          <div className="bg-cyan-100 border-2 border-cyan-400 rounded-lg p-4 w-64 text-center">
            <p className="text-xs text-cyan-500 font-medium">クラウド</p>
            <p className="font-semibold text-cyan-800 mt-1">❄️ Snowflake</p>
            <div className="mt-2 flex flex-wrap gap-1 justify-center">
              <span className="text-xs bg-cyan-200 px-2 py-0.5 rounded">Warehouse</span>
              <span className="text-xs bg-cyan-200 px-2 py-0.5 rounded">Tables / Views</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">認証方式</h4>
          <p className="text-sm text-gray-600">
            <strong>PAT（Personal Access Token）</strong> 認証を使用。
            Snowflake UI → Settings → Authentication → Programmatic access tokens → Generate token で発行。
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">本番への移行パス</h4>
          <p className="text-sm text-gray-600">
            PoC 完成後は <strong>HVD フレームワーク</strong>（jcg_snowflake）で
            Next.js + SPCS に移行して本番グレードのアプリを構築します。
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-yellow-800 mb-2">HVD との違い</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left">
                <th className="pr-4 py-1 text-gray-600">項目</th>
                <th className="pr-4 py-1 text-orange-700">Streamlit PoC</th>
                <th className="py-1 text-blue-700">HVD（Next.js + SPCS）</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr><td className="pr-4 py-1">目的</td><td className="pr-4 py-1">短期 PoC</td><td className="py-1">本番 AI サービス</td></tr>
              <tr><td className="pr-4 py-1">期間</td><td className="pr-4 py-1">数時間〜数日</td><td className="py-1">数週間〜数ヶ月</td></tr>
              <tr><td className="pr-4 py-1">言語</td><td className="pr-4 py-1">Python</td><td className="py-1">TypeScript + SQL</td></tr>
              <tr><td className="pr-4 py-1">実行環境</td><td className="pr-4 py-1">ローカル PC</td><td className="py-1">Snowflake SPCS</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ProcedureSteps() {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-gray-800">詳細手順書</h3>

      <div className="space-y-4">
        {[
          {
            phase: "準備",
            color: "bg-purple-100 border-purple-300",
            headerColor: "text-purple-800",
            steps: [
              {
                title: "PAT を発行する",
                detail: [
                  "Snowflake UI にログインする",
                  "左下の Settings をクリック",
                  "Authentication タブを開く",
                  "Programmatic access tokens → Create PAT to authenticate into Snowflake をクリック",
                  "トークン名（例: local-streamlit-poc）を入力して Generate token",
                  "表示されたトークンを安全な場所にコピー（再表示不可）",
                ],
              },
              {
                title: ".env を設定する",
                detail: [
                  "cp .env.example .env でファイルを作成",
                  "SNOWFLAKE_ACCOUNT に接続先アカウントを設定（例: abc12345.us-east-1）",
                  "SNOWFLAKE_PAT に取得したトークンを設定",
                  ".gitignore に .env が含まれていることを確認",
                ],
              },
            ],
          },
          {
            phase: "開発",
            color: "bg-blue-100 border-blue-300",
            headerColor: "text-blue-800",
            steps: [
              {
                title: "PoC プロジェクトを作成する",
                detail: [
                  "cp -r templates/basic projects/<project-name> でテンプレをコピー",
                  "cd projects/<project-name> に移動",
                  "VSCode で streamlit_snowflake/ を開く",
                ],
              },
              {
                title: "Claude Code に実装を依頼する",
                detail: [
                  "Claude Code を起動（VSCode 拡張またはターミナルで claude コマンド）",
                  "「〇〇テーブルのデータを××グラフで表示したい」と話しかける",
                  "Claude が lib/queries.py と app.py を実装してくれる",
                  "必要に応じて「フィルターを追加して」「グラフを変更して」と指示する",
                ],
              },
              {
                title: "アプリを起動して確認する",
                detail: [
                  "streamlit run app.py を実行",
                  "http://localhost:8501 をブラウザで開く",
                  "サイドバーの「接続テスト」ボタンで接続を確認",
                  "期待通りのデータが表示されることを確認",
                ],
              },
            ],
          },
          {
            phase: "デモ・移行",
            color: "bg-green-100 border-green-300",
            headerColor: "text-green-800",
            steps: [
              {
                title: "PoC をデモする",
                detail: [
                  "ローカルで起動したまま画面共有でデモ",
                  "または ngrok 等のツールで一時的に外部公開（要注意: .env の認証情報は共有しない）",
                ],
              },
              {
                title: "本番移行を検討する",
                detail: [
                  "PoC で要件が確認できたら HVD フレームワーク（jcg_snowflake）に移行を検討",
                  "jcg_snowflake/ を VSCode で開いて「md-scope を実行して」と依頼",
                  "Claude が Next.js + SPCS の本番アプリを設計・実装してくれる",
                ],
              },
            ],
          },
        ].map((phase, pi) => (
          <div key={pi} className={`border rounded-lg overflow-hidden ${phase.color}`}>
            <div className={`px-4 py-2 font-semibold text-sm ${phase.headerColor}`}>
              フェーズ {pi + 1}: {phase.phase}
            </div>
            <div className="bg-white p-4 space-y-3">
              {phase.steps.map((step, si) => (
                <div key={si}>
                  <p className="text-sm font-medium text-gray-800 mb-1">
                    {pi + 1}.{si + 1} {step.title}
                  </p>
                  <ul className="space-y-0.5">
                    {step.detail.map((d, di) => (
                      <li key={di} className="text-xs text-gray-600 flex gap-2">
                        <span className="text-gray-400">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TemplateGuide() {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-gray-800">テンプレート構成</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic template */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-orange-50 px-4 py-2 border-b border-orange-100">
            <p className="text-sm font-semibold text-orange-800">basic テンプレ</p>
            <p className="text-xs text-orange-600">1 画面 PoC（シンプルな可視化）</p>
          </div>
          <div className="p-4">
            <pre className="text-xs text-gray-700 font-mono leading-relaxed">
{`templates/basic/
├── app.py              ← メイン画面
└── lib/
    ├── snowflake_conn.py ← 接続ヘルパ
    └── queries.py       ← クエリ関数`}
            </pre>
            <div className="mt-3 space-y-2">
              {[
                { file: "app.py", desc: "st.title() / st.dataframe() / st.plotly_chart() で UI を構成" },
                { file: "lib/snowflake_conn.py", desc: "@st.cache_resource で接続を再利用" },
                { file: "lib/queries.py", desc: "@st.cache_data(ttl=300) でクエリ結果を 5 分キャッシュ" },
              ].map((item, i) => (
                <div key={i} className="text-xs">
                  <span className="font-mono text-orange-700">{item.file}</span>
                  <span className="text-gray-500"> — {item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Multipage template */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-blue-50 px-4 py-2 border-b border-blue-100">
            <p className="text-sm font-semibold text-blue-800">multipage テンプレ</p>
            <p className="text-xs text-blue-600">複数画面 PoC（ダッシュボード + 詳細）</p>
          </div>
          <div className="p-4">
            <pre className="text-xs text-gray-700 font-mono leading-relaxed">
{`templates/multipage/
├── app.py              ← エントリポイント
├── pages/
│   ├── 01_dashboard.py ← KPI + グラフ
│   └── 02_detail.py    ← 詳細テーブル
└── lib/
    └── snowflake_conn.py ← 接続ヘルパ`}
            </pre>
            <div className="mt-3 space-y-2">
              {[
                { file: "app.py", desc: "ホーム画面（ページ一覧・説明）" },
                { file: "pages/01_dashboard.py", desc: "metric カード + Plotly グラフ" },
                { file: "pages/02_detail.py", desc: "フィルター + データテーブル + CSV DL" },
              ].map((item, i) => (
                <div key={i} className="text-xs">
                  <span className="font-mono text-blue-700">{item.file}</span>
                  <span className="text-gray-500"> — {item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">接続ヘルパのコア実装</h4>
        <pre className="text-xs text-gray-800 font-mono bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`@st.cache_resource
def get_connection():
    return snowflake.connector.connect(
        account=os.environ["SNOWFLAKE_ACCOUNT"],
        user=os.environ["SNOWFLAKE_USER"],
        authenticator="oauth",
        token=os.environ["SNOWFLAKE_PAT"],
        role=os.environ.get("SNOWFLAKE_ROLE", "SYSADMIN"),
        warehouse=os.environ.get("SNOWFLAKE_WAREHOUSE", ""),
    )`}
        </pre>
        <p className="text-xs text-gray-500 mt-2">
          <code>@st.cache_resource</code> により Streamlit セッション中に 1 回だけ接続します。
          PAT（Personal Access Token）による OAuth 認証を使用しています。
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">フレームワークディレクトリ</h4>
        <pre className="text-xs text-gray-700 font-mono leading-relaxed">
{`streamlit_snowflake/       ← このフレームワーク
├── CLAUDE.md              ← Claude Code 向けガイド
├── .env.example           ← 環境変数テンプレ
├── requirements.txt       ← 依存パッケージ
├── guide/                 ← 手順書
│   └── 00-getting-started.md
├── templates/             ← PoC テンプレ（コピーして使う）
│   ├── basic/
│   └── multipage/
└── projects/              ← 実 PoC はここに作成
    └── <your-project>/    ← テンプレからコピーして開発`}
        </pre>
      </div>
    </div>
  );
}

export default function StreamlitGuide() {
  const [section, setSection] = useState<TabId>("start");

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Streamlit PoC フレームワーク</h2>
        <p className="text-sm text-gray-500 mt-1">
          Python + Streamlit でローカル環境から Snowflake に接続して PoC を素早く立ち上げる
        </p>
      </div>

      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSection(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              section === tab.id
                ? "bg-white border border-b-white border-gray-200 text-orange-600 -mb-px"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-64">
        {section === "start" && <StartGuide />}
        {section === "arch" && <ArchDiagram />}
        {section === "steps" && <ProcedureSteps />}
        {section === "templates" && <TemplateGuide />}
      </div>
    </div>
  );
}
