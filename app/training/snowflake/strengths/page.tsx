import Link from "next/link";
import SnowflakeSubNav from "../SnowflakeSubNav";

export default function SnowflakeStrengthsPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Snowflake の強み</h2>
      <SnowflakeSubNav />

      <div className="space-y-8">

        {/* Hero */}
        <section className="bg-gradient-to-br from-sky-50 via-white to-indigo-50 border border-sky-200 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-[#29B5E8] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5">
                  <line x1="10" y1="1" x2="10" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="1" y1="5.5" x2="19" y2="14.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="1" y1="14.5" x2="19" y2="5.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                なぜ Snowflake なのか
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                「速い DWH」ではなく「ガバナンス付き AI データ基盤」
              </h3>
              <p className="text-slate-700 leading-7 max-w-3xl">
                Snowflake はクラウドデータウェアハウスとして知られていますが、
                その本質は<strong>「データを動かさずに分析・AI・共有・エージェントをすべて安全に行えるプラットフォーム」</strong>です。
                競合と比較したとき、ガバナンス・データ共有・マルチクラウド・AI ネイティブの4点で
                一貫した差別化を持ちます。
              </p>
            </div>
            <div className="flex flex-col gap-2 md:min-w-56">
              {[
                { label: "①", text: "ストレージとコンピューティングの分離", color: "bg-sky-100 text-sky-800 border-sky-200" },
                { label: "②", text: "ガバナンスがプラットフォーム標準", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
                { label: "③", text: "ゼロコピーデータ共有", color: "bg-violet-100 text-violet-800 border-violet-200" },
                { label: "④", text: "真のマルチクラウド", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
                { label: "⑤", text: "AI をデータの近くで動かす", color: "bg-amber-100 text-amber-800 border-amber-200" },
              ].map((item) => (
                <div key={item.label} className={`flex items-center gap-2 text-xs font-semibold border rounded-lg px-3 py-2 ${item.color}`}>
                  <span className="font-bold">{item.label}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 強み① ストレージ / コンピューティング分離 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-sky-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">強み①</span>
            <h3 className="text-2xl font-semibold text-gray-800">ストレージとコンピューティングの分離</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-gray-700 leading-7">
                Snowflake が 2012 年に持ち込んだ最大のアーキテクチャ革新です。
                データの<strong>「保存」と「処理」を完全に分離</strong>し、それぞれを独立してスケールできます。
                従来の DWH（Teradata・Oracle など）ではストレージとコンピューティングが一体で、
                「もっと速く処理したい」ためにサーバごと増やす必要がありました。
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: "⚡",
                    title: "処理速度をいつでも変えられる",
                    body: "仮想ウェアハウス（処理エンジン）のサイズを SQL 1行で XS→4XL まで変更可能。重いバッチは大きく、日常クエリは小さく。",
                  },
                  {
                    icon: "🔀",
                    title: "部門ごとに独立したエンジンを持てる",
                    body: "分析チーム・ETL チーム・BI ツール・AI 処理がそれぞれ別ウェアハウスを使い、互いに干渉しない。重いジョブが他のユーザーに影響しない。",
                  },
                  {
                    icon: "💴",
                    title: "使った分だけ課金",
                    body: "ウェアハウスは使用中のみ課金。自動サスペンド・自動再開で夜間・週末のアイドルコストをゼロにできる。",
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

            {/* アーキテクチャ図 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center mb-1">アーキテクチャ</div>

              {/* ユーザー */}
              <div className="flex justify-center gap-3 flex-wrap">
                {["分析チーム", "ETL / dbt", "BI ツール", "AI / SPCS"].map((u) => (
                  <div key={u} className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 font-medium">{u}</div>
                ))}
              </div>
              <div className="flex justify-center">
                <div className="w-0.5 h-4 bg-gray-300" />
              </div>

              {/* コンピューティング層 */}
              <div className="border-2 border-sky-300 rounded-xl bg-sky-50 p-3">
                <div className="text-center text-xs font-bold text-sky-600 mb-2">コンピューティング層（仮想ウェアハウス）</div>
                <div className="flex justify-center gap-2 flex-wrap">
                  {[
                    { label: "WH-分析", size: "L" },
                    { label: "WH-ETL", size: "XL" },
                    { label: "WH-BI", size: "S" },
                    { label: "WH-AI", size: "2XL" },
                  ].map((wh) => (
                    <div key={wh.label} className="bg-white border border-sky-200 rounded-lg px-3 py-2 text-center">
                      <div className="text-xs font-semibold text-sky-800">{wh.label}</div>
                      <div className="text-xs text-sky-500">{wh.size}</div>
                    </div>
                  ))}
                </div>
                <div className="text-center text-xs text-sky-600 mt-2 font-medium">↕ 独立してスケール・停止できる</div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-4 bg-gray-300" />
              </div>

              {/* ストレージ層 */}
              <div className="border-2 border-indigo-300 rounded-xl bg-indigo-50 p-3 text-center">
                <div className="text-xs font-bold text-indigo-600 mb-1">ストレージ層（クラウドオブジェクトストレージ）</div>
                <div className="text-xs text-indigo-700">S3 / Azure Blob / GCS — マイクロパーティション形式で自動最適化</div>
                <div className="text-xs text-indigo-500 mt-1">※ ストレージとコンピューティングは完全に分離</div>
              </div>
            </div>
          </div>
        </section>

        {/* 強み② ガバナンス */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">強み②</span>
            <h3 className="text-2xl font-semibold text-gray-800">ガバナンスがプラットフォーム標準として組み込まれている</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-gray-700 leading-7">
                他のプラットフォームでは「後からセキュリティ製品を追加」するアプローチが多い中、
                Snowflake は<strong>設計段階からガバナンスをコアに組み込んで</strong>います。
                追加料金・追加ツールなしで、エンタープライズ水準のアクセス制御と監査が使えます。
              </p>
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <table className="min-w-full text-sm">
                  <thead className="bg-indigo-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-bold text-indigo-800">機能</th>
                      <th className="text-left px-4 py-3 text-xs font-bold text-indigo-800">概要</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { fn: "RBAC", desc: "ロールベースのアクセス制御。DB・スキーマ・テーブル・列単位で権限を付与" },
                      { fn: "Dynamic Data Masking", desc: "ロールに応じて個人情報・秘匿値を自動マスク。元データは変更しない" },
                      { fn: "Row-Level Security", desc: "同じテーブルを参照しても、部門・ユーザーによって見える行が変わる" },
                      { fn: "Column-Level Security", desc: "特定カラムへのアクセスをロール単位で制限" },
                      { fn: "Query History", desc: "誰が・いつ・何を・どのくらい実行したかを 365 日間保持" },
                      { fn: "Time Travel", desc: "過去 90 日間のデータ状態を参照・復元できる。誤操作・監査対応に有効" },
                      { fn: "Fail-safe", desc: "Time Travel 後もさらに 7 日間、Snowflake 側でデータを保護" },
                      { fn: "Object Tagging", desc: "テーブル・カラムにタグを付け、ポリシーや分類を自動適用" },
                    ].map((row, i) => (
                      <tr key={row.fn} className={`border-t border-gray-100 align-top ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                        <td className="px-4 py-2.5 font-semibold text-xs text-indigo-800 whitespace-nowrap">{row.fn}</td>
                        <td className="px-4 py-2.5 text-xs text-gray-600 leading-5">{row.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
                <h4 className="font-semibold text-indigo-900 mb-3 text-sm">「後付け」vs「組み込み」の差</h4>
                <div className="space-y-3 text-xs">
                  <div className="bg-red-50 border border-red-100 rounded-lg p-3 text-red-800 leading-5">
                    <strong>他プラットフォームのアプローチ：</strong><br />
                    コアの DWH は高速化・コスト最適化を優先して設計。
                    ガバナンスは外部ツール（Apache Ranger, AWS Lake Formation など）を後から追加。
                    ツールをまたぐ管理画面・権限体系の複雑さが運用コストになる。
                  </div>
                  <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 text-indigo-800 leading-5">
                    <strong>Snowflake のアプローチ：</strong><br />
                    RBAC・マスキング・監査ログが標準機能として同じ管理コンソールで完結。
                    追加製品を検討・購入・統合する工数がゼロ。都庁のような厳格な監査要件も標準機能で担保できる。
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">Dynamic Data Masking の動作例</div>
                <div className="space-y-2 text-xs">
                  <div className="bg-gray-50 rounded-lg p-3 font-mono text-gray-700 leading-5">
                    SELECT name, phone FROM customers;
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-lg p-2.5 leading-5 text-emerald-800">
                      <strong>管理者ロール</strong><br />
                      鈴木 太郎 | 090-1234-5678
                    </div>
                    <div className="flex-1 bg-orange-50 border border-orange-100 rounded-lg p-2.5 leading-5 text-orange-800">
                      <strong>一般ユーザーロール</strong><br />
                      鈴木 太郎 | 090-****-****
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs leading-5">※ クエリは同じ。ロールによって結果が自動的に異なる</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 強み③ ゼロコピーデータ共有 */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-violet-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">強み③</span>
            <h3 className="text-2xl font-semibold text-gray-800">ゼロコピーデータ共有</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-gray-700 leading-7">
                Snowflake の<strong>Data Sharing</strong>は、データを物理的にコピー・転送せずに
                別のアカウントや組織へリアルタイムで共有できる仕組みです。
                他の DWH が CSV/ETL でデータをコピーするのに対し、Snowflake は
                <strong>ストレージ上の同じデータを共有する権限を渡すだけ</strong>です。
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: "🔄",
                    title: "常に最新データが届く",
                    body: "共有元が更新すると共有先にもリアルタイムで反映。ETL のラグや同期遅延がゼロ。",
                  },
                  {
                    icon: "💾",
                    title: "ストレージコストの重複なし",
                    body: "データをコピーしないのでストレージコストが共有先で発生しない。共有先が増えてもコストは変わらない。",
                  },
                  {
                    icon: "🛡️",
                    title: "共有元のガバナンスが維持される",
                    body: "共有先アカウントは SELECT のみ可能。共有元のマスキング・行レベルセキュリティはそのまま適用される。",
                  },
                  {
                    icon: "🌐",
                    title: "クラウドをまたいで共有できる",
                    body: "共有元が AWS でも共有先が Azure のアカウントにデータを共有できる（Cross-cloud）。",
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
            <div className="space-y-4">
              {/* Before / After 図 */}
              <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5">
                <div className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-4">従来方式 vs Snowflake Data Sharing</div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-red-700 mb-2">従来（ETL コピー）</div>
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <div className="bg-white border border-red-200 rounded-lg px-3 py-2 text-red-800">組織A DWH</div>
                      <span className="text-red-400 font-bold">→ ETL →</span>
                      <div className="bg-white border border-red-200 rounded-lg px-3 py-2 text-red-800">コピー</div>
                      <span className="text-red-400 font-bold">→</span>
                      <div className="bg-white border border-red-200 rounded-lg px-3 py-2 text-red-800">組織B DWH</div>
                    </div>
                    <div className="text-xs text-red-600 mt-1.5 leading-5">・データが古くなる（同期ラグ）<br />・ストレージコストが2倍<br />・ETL パイプラインの運用コスト</div>
                  </div>
                  <div className="border-t border-violet-200 pt-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-2">Snowflake Data Sharing</div>
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <div className="bg-white border border-emerald-200 rounded-lg px-3 py-2 text-emerald-800">組織A アカウント</div>
                      <span className="text-emerald-500 font-bold">→ 権限付与のみ →</span>
                      <div className="bg-white border border-emerald-200 rounded-lg px-3 py-2 text-emerald-800">組織B アカウント</div>
                    </div>
                    <div className="text-xs text-emerald-700 mt-1.5 leading-5">・常にリアルタイム最新<br />・ストレージコストゼロ（コピーなし）<br />・ETL 不要</div>
                  </div>
                </div>
              </div>
              {/* Zero-Copy Clone */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">ゼロコピークローン（Zero-Copy Clone）</div>
                <p className="text-xs text-gray-600 leading-5 mb-2">
                  テーブル・スキーマ・DB を<strong>瞬時に・コストゼロでクローン</strong>できます。
                  変更があった部分だけ別途保存されるため、本番データのコピーを開発・テスト環境に
                  即座に展開できます。
                </p>
                <div className="bg-slate-900 rounded-lg p-3">
                  <pre className="text-green-300 text-xs leading-5 whitespace-pre">{`-- 本番DBのクローンを作成（ほぼ瞬時・課金なし）
CREATE DATABASE dev_db
  CLONE prod_db;

-- テーブル単体も可
CREATE TABLE orders_backup
  CLONE orders;`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 強み④ マルチクラウド */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">強み④</span>
            <h3 className="text-2xl font-semibold text-gray-800">真のマルチクラウド — ベンダーロックインなし</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-gray-700 leading-7">
                Snowflake は AWS・Azure・GCP の3クラウドすべてで<strong>同じ機能・同じ操作感</strong>で動きます。
                BigQuery は GCP 専用、Redshift は AWS 専用、Synapse は Azure 専用ですが、
                Snowflake はどのクラウドを選んでも同じ SQL・API・管理コンソールが使えます。
              </p>
              <div className="space-y-3">
                {[
                  {
                    icon: "🔓",
                    title: "クラウド方針に縛られない提案ができる",
                    body: "顧客が「AWS で始めて後から Azure に移行する」場合も、Snowflake の機能・データはそのまま。クラウド戦略の変更にデータ基盤が追従できる。",
                  },
                  {
                    icon: "🤝",
                    title: "異なるクラウド間でデータ共有",
                    body: "共有元が AWS Snowflake、共有先が Azure Snowflake でも Data Sharing が機能する。組織間・部門間でクラウドが違っても連携できる。",
                  },
                  {
                    icon: "📋",
                    title: "同一の監査基準を維持",
                    body: "マルチクラウド環境でも Query History・RBAC・監査設定はすべて Snowflake の統一されたコンソールで管理できる。",
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
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-4">主要 DWH のクラウド対応比較</div>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="min-w-full text-xs">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="text-left px-3 py-2.5 font-semibold text-slate-700">DWH</th>
                      <th className="text-center px-3 py-2.5 font-semibold text-slate-700">AWS</th>
                      <th className="text-center px-3 py-2.5 font-semibold text-slate-700">Azure</th>
                      <th className="text-center px-3 py-2.5 font-semibold text-slate-700">GCP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Snowflake", aws: true, azure: true, gcp: true, highlight: true },
                      { name: "Databricks", aws: true, azure: true, gcp: true, highlight: false },
                      { name: "BigQuery", aws: false, azure: false, gcp: true, highlight: false },
                      { name: "Redshift", aws: true, azure: false, gcp: false, highlight: false },
                      { name: "Synapse / Fabric", aws: false, azure: true, gcp: false, highlight: false },
                    ].map((row) => (
                      <tr key={row.name} className={`border-t border-gray-100 ${row.highlight ? "bg-emerald-50" : ""}`}>
                        <td className={`px-3 py-2 font-semibold ${row.highlight ? "text-emerald-800" : "text-slate-700"}`}>{row.name}</td>
                        {[row.aws, row.azure, row.gcp].map((has, i) => (
                          <td key={i} className="text-center px-3 py-2">
                            {has
                              ? <span className="text-emerald-600 font-bold">✓</span>
                              : <span className="text-gray-300">—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-xs text-emerald-700 leading-5">
                ※ Databricks も 3 クラウド対応ですが、機能やパフォーマンスに差があります。
                Snowflake は 3 クラウドで同一の機能体系・ガバナンスを保証しています。
              </div>
            </div>
          </div>
        </section>

        {/* 強み⑤ AI をデータの近くで動かす */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">強み⑤</span>
            <h3 className="text-2xl font-semibold text-gray-800">AI をデータの近くで動かす</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {[
              {
                icon: "🧠",
                title: "Cortex AI",
                body: "LLM 推論・意味検索・自然言語 SQL・AI エージェントを Snowflake 内で完結。データを外部 AI サービスに送らずに処理できる。",
                link: { label: "Cortex AI ページへ →", href: "/training/snowflake/cortex" },
                color: "border-amber-200 bg-amber-50",
              },
              {
                icon: "📦",
                title: "SPCS（Snowpark Container Services）",
                body: "カスタム AI モデル・FastAPI・独自アプリをコンテナとして Snowflake 内で実行。データを外に出さずにカスタム ML を動かせる。",
                link: { label: "SPCS ページへ →", href: "/training/snowflake" },
                color: "border-orange-200 bg-orange-50",
              },
              {
                icon: "🔌",
                title: "MCP ゲートウェイ（Natoma）",
                body: "AI エージェントが外部 SaaS を操作する際の tool-call を Snowflake の RBAC で制御・監査。「行動のガバナンス」まで Snowflake が担う。",
                link: { label: "MCP ゲートウェイへ →", href: "/training/snowflake/mcp-gateway" },
                color: "border-violet-200 bg-violet-50",
              },
            ].map((item) => (
              <div key={item.title} className={`rounded-xl border ${item.color} p-5 flex flex-col`}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-700 leading-6 flex-1">{item.body}</p>
                <Link href={item.link.href} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 mt-3 inline-block">
                  {item.link.label}
                </Link>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-900 leading-6">
            <strong>なぜ「データの近く」が重要か</strong><br />
            AI 処理でボトルネックになるのはしばしばデータ転送です。数百 GB のデータを外部 AI サービスに送ると
            時間もコストもかかり、機密データが組織外に出るリスクも生じます。
            Snowflake は AI の処理をデータがある場所（Snowflake 内）で実行するため、
            データ転送のレイテンシがなく、情報漏洩リスクもありません。
          </div>
        </section>

        {/* 競合との比較 */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">競合との比較：Snowflake が勝る場面・劣る場面</h3>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">競合</th>
                  <th className="text-left px-4 py-3 font-semibold text-emerald-700">Snowflake が勝る点</th>
                  <th className="text-left px-4 py-3 font-semibold text-red-700">Snowflake が劣る / 注意点</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    competitor: "Databricks",
                    win: "ガバナンス・Data Sharing・マルチクラウドの統一性・SQL ユーザーの学習コスト低",
                    lose: "OSS（Delta Lake・MLflow）との親和性・Python/ML 開発者が多いチームでは Databricks が慣れ親しみやすい",
                  },
                  {
                    competitor: "BigQuery",
                    win: "マルチクラウド・Data Sharing・SPCS によるコンテナ実行・Snowpark の柔軟性",
                    lose: "GCP 環境に最適化された案件では BigQuery の方がエコシステム統合が楽。サーバーレス課金で予測不能なコストが出にくい",
                  },
                  {
                    competitor: "Azure Synapse / Fabric",
                    win: "マルチクラウド・Data Sharing・Cortex AI の AI ネイティブ性・RBAC の一元管理",
                    lose: "M365/Teams/Power BI との深い統合が必要なら Fabric の方が統合コストが低い",
                  },
                  {
                    competitor: "Redshift",
                    win: "マルチクラウド・Data Sharing・Snowpark・時間スケール変更の容易さ・Cortex AI",
                    lose: "AWS に完全に最適化した案件では Redshift Serverless との価格競争力に注意",
                  },
                ].map((row, i) => (
                  <tr key={row.competitor} className={`border-t border-gray-200 align-top ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{row.competitor}</td>
                    <td className="px-4 py-3 text-emerald-800 leading-6 text-xs">{row.win}</td>
                    <td className="px-4 py-3 text-red-800 leading-6 text-xs">{row.lose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 leading-6">
            <strong>正直なポジショニングが信頼につながる：</strong>
            すべての案件に Snowflake が最適なわけではありません。
            M365 中心の案件は Fabric、ML エンジニアが主役の案件は Databricks を検討する場面もあります。
            「なぜこの案件に Snowflake が適切か」を具体的に語れると提案の説得力が上がります。
          </div>
        </section>

        {/* NRI 案件への示唆 */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">NRI 案件での強みの活かし方</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: "🏛️",
                title: "行政案件（都庁・省庁）",
                strengths: ["強み②（ガバナンス）", "強み③（ゼロコピー共有）"],
                body: "監査要件・データ主権の観点から Snowflake の RBAC・Query History・Dynamic Data Masking は直接訴求できます。複数部局でデータを共有する場面では Data Sharing がコピーなし・常に最新で機能します。",
                color: "border-sky-200 bg-sky-50",
              },
              {
                icon: "🤖",
                title: "AI / RAG 案件",
                strengths: ["強み⑤（AI ネイティブ）", "強み②（ガバナンス）"],
                body: "社内文書 RAG には Cortex Search + COMPLETE が最短構成です。機密文書を外部 AI に送らず Snowflake 内で処理できる点は、セキュリティ要件の厳しい案件で特に有効です。",
                color: "border-amber-200 bg-amber-50",
              },
              {
                icon: "🏢",
                title: "大企業・金融・製造",
                strengths: ["強み①（コンピューティング分離）", "強み②（ガバナンス）"],
                body: "部門ごとに独立した仮想ウェアハウスを割り当て、コスト可視化と分離ができます。ETL チームが重いバッチを走らせても BI ユーザーのクエリに影響しない設計が評価されます。",
                color: "border-indigo-200 bg-indigo-50",
              },
              {
                icon: "🌐",
                title: "マルチクラウド・ハイブリッド案件",
                strengths: ["強み④（マルチクラウド）", "強み③（ゼロコピー共有）"],
                body: "「今は AWS だが将来 Azure に移行するかも」という顧客には Snowflake のクラウド非依存性が刺さります。グループ会社・関係省庁間でクラウドが違っても Data Sharing で連携できます。",
                color: "border-emerald-200 bg-emerald-50",
              },
            ].map((card) => (
              <div key={card.title} className={`rounded-xl border ${card.color} p-5`}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{card.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{card.title}</h4>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {card.strengths.map((s) => (
                        <span key={s} className="text-xs bg-white border border-gray-200 rounded px-2 py-0.5 text-gray-600">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-6">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* まとめ */}
        <section className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">まとめ</h3>
          <p className="text-slate-200 leading-7 mb-4 max-w-4xl">
            Snowflake の強みは「速い DWH」ではなく、
            <strong>「ガバナンスを崩さずに分析・AI・データ共有・エージェントをすべて同じプラットフォームで行える」</strong>点です。
            競合と比較したとき、ストレージ/コンピューティング分離・ゼロコピーデータ共有・組み込みガバナンス・
            真のマルチクラウド・AI ネイティブの5点が一貫した差別化ポイントです。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs mb-6">
            {[
              "① ストレージ/コンピューティング分離",
              "② ガバナンスが標準組み込み",
              "③ ゼロコピーデータ共有",
              "④ 真のマルチクラウド",
              "⑤ AI をデータの近くで動かす",
            ].map((s) => (
              <div key={s} className="rounded-xl bg-white/10 px-3 py-3 leading-5">{s}</div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/training/snowflake/data-platform"
              className="inline-flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              データ基盤の位置づけへ →
            </Link>
            <Link
              href="/training/snowflake/cortex"
              className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Cortex AI を詳しく見る →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
