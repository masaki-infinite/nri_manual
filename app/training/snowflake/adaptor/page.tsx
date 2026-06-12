import Link from "next/link";
import SnowflakeAdaptorDiagram from "../SnowflakeAdaptorDiagram";

export default function SnowflakeAdaptorPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Snowflake Adaptor</h2>

      <p className="text-gray-600 text-sm mb-6 max-w-3xl leading-relaxed">
        Next.js（BFF）と Snowflake をつなぐ<strong>接続アダプタ層</strong>の設計です。
        公式の <span className="font-mono text-xs">snowflake-sdk</span>（Node.js ドライバ）をサーバー側だけで使い、
        認証・接続プール・SQL 実行を一箇所に集約します。SPCS 本番とローカル開発の両方で同じパターンが使えます。
      </p>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-teal-50 to-sky-50 border border-teal-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span>🔌</span>
            Adaptor の役割
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">
            BFF と Snowflake の「翻訳層」— 資格情報はここだけに閉じる
          </h3>
          <p className="text-slate-700 leading-7 max-w-4xl mb-4">
            Snowflake Adaptor は独立製品名ではなく、本資料での呼び方です。
            実体は <span className="font-mono text-sm">lib/db/snowflake.ts</span> などにまとめた
            <span className="font-semibold"> snowflake-sdk ラッパー</span>で、API Route から SQL を実行する窓口になります。
            ブラウザは HTTPS で BFF だけを呼び、PAT・OAuth トークン・秘密鍵はサーバー環境変数または SPCS 注入ファイルに限定します。
          </p>
          <SnowflakeAdaptorDiagram />
        </section>

        <section id="auth" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. 認証方式（開発 vs 本番）</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold">環境</th>
                  <th className="text-left px-4 py-2.5 font-semibold">接続元</th>
                  <th className="text-left px-4 py-2.5 font-semibold">認証</th>
                  <th className="text-left px-4 py-2.5 font-semibold">Adaptor の設定</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
                <tr>
                  <td className="px-4 py-3 font-semibold">開発</td>
                  <td className="px-4 py-3">ローカル <span className="font-mono text-xs">npm run dev</span></td>
                  <td className="px-4 py-3 font-mono text-xs">PAT または Key Pair</td>
                  <td className="px-4 py-3 text-xs leading-relaxed">
                    <span className="font-mono">.env.local</span> の SNOWFLAKE_PAT / rsa_key.pem。
                    <span className="font-mono"> authenticator: SNOWFLAKE_JWT</span>（Key Pair 時）
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">本番</td>
                  <td className="px-4 py-3">SPCS 内 Next.js Service</td>
                  <td className="px-4 py-3 font-mono text-xs">OAuth（セッショントークン）</td>
                  <td className="px-4 py-3 text-xs leading-relaxed">
                    <span className="font-mono">/snowflake/session/token</span> を読み
                    <span className="font-mono"> authenticator: OAUTH</span>。
                    PAT はコンテナに置かない
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="pattern" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Adaptor 実装パターン</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">接続のシングルトン（Next.js 向け）</h4>
              <p className="text-sm text-gray-600 leading-6 mb-3">
                開発時のホットリロードで接続が増殖しないよう、モジュールスコープで Connection / Pool を保持します。
                本番 SPCS ではコンテナ単位で 1 プールが一般的です。
              </p>
              <pre className="bg-gray-900 text-green-300 rounded-lg p-4 text-xs leading-relaxed overflow-auto">{`// lib/db/snowflake.ts
import snowflake from "snowflake-sdk";

let pool: snowflake.ConnectionPool | null = null;

function getToken(): string {
  if (process.env.SNOWFLAKE_HOST) {
    const fs = require("fs");
    return fs.readFileSync("/snowflake/session/token", "utf8");
  }
  return process.env.SNOWFLAKE_PAT!;
}

export function getPool() {
  if (!pool) {
    pool = snowflake.createPool(
      {
        account: process.env.SNOWFLAKE_ACCOUNT!,
        host: process.env.SNOWFLAKE_HOST,
        username: process.env.SNOWFLAKE_USER,
        token: getToken(),
        authenticator: process.env.SNOWFLAKE_HOST
          ? "OAUTH"
          : "PROGRAMMATIC_ACCESS_TOKEN",
        role: process.env.SNOWFLAKE_ROLE,
        warehouse: process.env.SNOWFLAKE_WAREHOUSE,
        database: process.env.SNOWFLAKE_DATABASE,
        schema: process.env.SNOWFLAKE_SCHEMA,
      },
      { max: 5, min: 0 }
    );
  }
  return pool;
}`}</pre>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold text-gray-800 mb-2">API Route からの呼び出し</h4>
              <p className="text-sm text-gray-600 leading-6 mb-3">
                Route Handler は Adaptor 経由でだけ Snowflake に触れます。
                RAG では SEARCH_PREVIEW と COMPLETE を順に実行し、生成結果を SSE で返します。
              </p>
              <pre className="bg-gray-900 text-green-300 rounded-lg p-4 text-xs leading-relaxed overflow-auto">{`// app/api/chat/route.ts
import { executeSql } from "@/lib/db/snowflake";

export async function POST(req: Request) {
  const { message } = await req.json();

  const chunks = await executeSql(\`
    SELECT * FROM TABLE(
      SEARCH_PREVIEW(
        SERVICE => 'MY_APP_DB.RAG.DOC_SEARCH',
        QUERY => ?
      )
    ) LIMIT 5
  \`, [message]);

  // COMPLETE でストリーム生成 → ReadableStream で返却
  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream" },
  });
}`}</pre>
            </div>
          </div>
        </section>

        <section id="env" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. 環境変数一覧</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
            {[
              "SNOWFLAKE_ACCOUNT",
              "SNOWFLAKE_USER",
              "SNOWFLAKE_PAT",
              "SNOWFLAKE_ROLE",
              "SNOWFLAKE_WAREHOUSE",
              "SNOWFLAKE_DATABASE",
              "SNOWFLAKE_SCHEMA",
              "SNOWFLAKE_HOST",
            ].map((v) => (
              <span key={v} className="bg-slate-100 text-slate-700 rounded-lg px-3 py-2 border border-slate-200">
                {v}
              </span>
            ))}
          </div>
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3">
            SNOWFLAKE_HOST は SPCS 本番のみ。ローカルでは account + PAT で接続します。いずれも .env に置き git には含めません。
          </p>
        </section>

        <section id="runtime" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">4. 他言語・他ランタイムとの対応</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                lang: "Node.js / Next.js",
                pkg: "snowflake-sdk",
                use: "Next.js BFF（よく使うパターン）",
                color: "border-teal-300 bg-teal-50",
              },
              {
                lang: "Python",
                pkg: "snowflake-connector-python",
                use: "Snowpark UDF・バッチ・ArcGIS API for Python 連携",
                color: "border-slate-200 bg-white",
              },
              {
                lang: "Java / JDBC",
                pkg: "snowflake-jdbc",
                use: "既存エンタープライズ連携・ETL ツール",
                color: "border-slate-200 bg-white",
              },
            ].map((r) => (
              <div key={r.lang} className={`rounded-xl border p-4 ${r.color}`}>
                <div className="font-bold text-gray-800">{r.lang}</div>
                <div className="font-mono text-xs text-teal-700 mt-1">{r.pkg}</div>
                <div className="text-sm text-gray-600 mt-2 leading-relaxed">{r.use}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h4 className="font-semibold text-red-800 mb-2">やらないこと</h4>
            <ul className="text-sm text-red-700/90 space-y-2 leading-relaxed">
              <li>・ブラウザ（クライアントコンポーネント）から snowflake-sdk を import しない</li>
              <li>・PAT / 秘密鍵を NEXT_PUBLIC_* に置かない</li>
              <li>・Adaptor を経由せず API Route ごとに接続コードを重複させない</li>
            </ul>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <h4 className="font-semibold text-emerald-800 mb-2">設計の要点</h4>
            <ul className="text-sm text-emerald-900/90 space-y-2 leading-relaxed">
              <li>・Adaptor 1 箇所で認証切替（開発 PAT / 本番 OAuth）</li>
              <li>・Connection Pool でレイテンシと接続数を抑制</li>
              <li>・SQL とバインドを Adaptor に集約し監査・テストを容易に</li>
            </ul>
          </div>
        </section>

        <section id="summary" className="scroll-mt-28 bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">まとめ</h3>
          <p className="text-slate-200 leading-7 mb-4 max-w-4xl">
            Snowflake Adaptor は、Next.js BFF が Snowflake と安全に話すための接続層です。
            snowflake-sdk をサーバー専用に閉じ、開発は PAT・本番は SPCS OAuth に切り替えるのが一般的な設計です。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/training/snowflake#spcs"
              className="inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              SPCS の基本へ →
            </Link>
            <Link
              href="/training/snowflake/rag"
              className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              RAG 構築へ →
            </Link>
            <Link
              href="/training/snowflake/rag"
              className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              RAG 構築へ →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
