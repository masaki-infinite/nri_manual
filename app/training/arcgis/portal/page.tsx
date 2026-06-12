import Link from "next/link";
import ProEnterpriseRelationDiagram from "../ProEnterpriseRelationDiagram";
import { EnterprisePortalFlow, OnlinePortalFlow } from "./PortalFlowDiagram";

type PortalRoleRow = {
  role: string;
  description: string;
};

type CompareRow = {
  aspect: string;
  online: string;
  enterprise: string;
};

type MythRow = {
  question: string;
  answer: string;
};

const portalRoles: PortalRoleRow[] = [
  {
    role: "認証・権限の門番",
    description: "誰がどの地図・レイヤにアクセスできるかを管理する。組織アカウント・グループ・ロールで制御。",
  },
  {
    role: "コンテンツの目録（カタログ）",
    description: "Web マップ、レイヤ、アプリ、ダッシュボードなどを検索・一覧・メタデータ管理する。",
  },
  {
    role: "公開の受け口",
    description: "ArcGIS Pro やブラウザからの「共有」「アップロード」を受け取り、ホスト型レイヤやサービスを登録する。",
  },
  {
    role: "利用者向け Web サイト",
    description: "組織専用の GIS ポータル画面を提供。現場担当者がブラウザから地図を閲覧・運用できる。",
  },
];

const compareRows: CompareRow[] = [
  {
    aspect: "製品としての見え方",
    online: "ArcGIS Online にポータル機能が内蔵（別途 Portal を買わない）",
    enterprise: "Portal for ArcGIS を自組織のサーバーに構築する",
  },
  {
    aspect: "データの物理的な置き場所",
    online: "Esri クラウド（米国等のデータセンター。契約・リージョン設定による）",
    enterprise: "自社データセンター／社内ネットワーク（オンプレ・プライベートクラウド）",
  },
  {
    aspect: "Pro からの公開先",
    online: "Pro がサインインする「ArcGIS Online 組織」＝ポータル",
    enterprise: "Pro がサインインする「Portal for ArcGIS」の URL",
  },
  {
    aspect: "ホスティングの実体",
    online: "Esri が管理するホスティング基盤が Feature Layer を保持",
    enterprise: "Portal が ArcGIS Server・Data Store にホストを指示",
  },
  {
    aspect: "閉域・オンプレ要件",
    online: "インターネット経由のクラウド利用が前提。完全閉域には向かない",
    enterprise: "社内 LAN のみで完結可能。データを自社管理しやすい",
  },
  {
    aspect: "閉域案件での位置づけ",
    online: "Hosted Feature Layer 公開と Maps SDK 参照の基盤（クラウド向け）",
    enterprise: "大規模統合・閉域一元運用が必要な場合の第一候補",
  },
];

const mythRows: MythRow[] = [
  {
    question: "Pro は Online に「直接」ファイルを上げるのか？",
    answer:
      "ユーザーの操作感では「Pro から Online へ共有」ですが、仕組み上は必ずポータル（Online 組織）を経由します。Pro が Online をバイパスして別ストレージに直送することはありません。Online ではポータルが一体化しているため、図に Portal が目立たないだけです。",
  },
  {
    question: "ポータルは Enterprise だけにあるのか？",
    answer:
      "いいえ。Online にもポータル機能があります（組織用 Web サイト・コンテンツ管理）。Enterprise では Portal for ArcGIS が独立コンポーネントとして Server の前段に立つため、構成図で Portal がはっきり描かれます。",
  },
  {
    question: "オンプレで自社管理したいなら Online ではなく Enterprise？",
    answer:
      "はい、概ね合っています。地理データを組織内インフラに置き、閉域網で完結させたい場合は ArcGIS Enterprise（Portal + Server + Data Store 等）を選びます。ArcGIS Online は Esri クラウド上のマルチテナント SaaS で、データ主権・ネットワーク境界の要件が厳しい場合は Enterprise が第一候補です。",
  },
  {
    question: "Enterprise を選べば Pro は不要になるのか？",
    answer:
      "いいえ。Enterprise は配信・運用基盤であり、高精度の編集・解析は引き続き ArcGIS Pro（または同等のデスクトップ GIS）が担います。Pro → Portal（Enterprise）→ Server という流れは Online 版と同型です。",
  },
];

const portalTasks = [
  { who: "GIS 担当（Pro）", action: "レイヤを整備し「共有」で Web レイヤとして公開", result: "ポータルにアイテム登録" },
  { who: "運用担当（ブラウザ）", action: "ポータルで権限・グループ・公開範囲を設定", result: "関係者だけが参照可能に" },
  { who: "アプリ開発（Maps SDK）", action: "ポータルで発行された REST URL を参照", result: "Web 地図画面で表示" },
];

export default function ArcGisPortalPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">ポータル（Portal）とは？</h2>
      <p className="text-gray-700 leading-7 mb-8 max-w-4xl">
        <span className="font-semibold">ポータル（Portal for ArcGIS）</span>
        は、ArcGIS の
        <span className="font-semibold"> コンテンツ管理・共有・認証のハブ</span>
        です。Pro で作ったデータが「どこに」「誰に」公開されるかを司ります。
        ArcGIS Online ではポータル機能がプラットフォームに内蔵され、Enterprise では Portal for ArcGIS が
        Server の前段として独立して存在します。
      </p>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span>🚪</span>
            ひとことで言うと
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">GIS 資産の「玄関・受付・図書館の目録」</h3>
          <p className="text-slate-700 leading-7 mb-4">
            ポータルはデータそのものを置く倉庫というより、
            <span className="font-semibold">公開リクエストの受け口と運用の司令塔</span>
            です。ArcGIS Pro からの共有、ブラウザからのアップロード、Maps SDK が使う REST URL の発行は、
            いずれもポータル（または Online 内蔵のポータル層）を通じて行われます。
          </p>
          <div className="bg-white/80 border border-amber-200 rounded-xl p-4 text-sm text-amber-950 leading-6">
            <span className="font-bold">オンプレでデータを自社管理したい → Enterprise を選ぶ、という理解は正しいです。</span>
            Online は Esri クラウド上の SaaS で、組織内ネットワークだけでデータを完結させたい要件には Enterprise（Portal + Server + Data Store）が向きます。
            ただし「Enterprise ＝ ポータルだけ」ではなく、ポータルは Enterprise 構成の中核コンポーネントの一つです。
          </div>
        </section>

        <section>
          <ProEnterpriseRelationDiagram />
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">ポータルの 4 つの役割</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {portalRoles.map((row) => (
              <div key={row.role} className="rounded-xl border border-amber-100 bg-amber-50/40 p-4">
                <div className="font-semibold text-amber-900 mb-1">{row.role}</div>
                <p className="text-sm text-gray-700 leading-6">{row.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">データの流れ（2 パターン）</h3>
          <p className="text-sm text-gray-600 mb-4 leading-6">
            Pro は Online / Enterprise どちらにも「共有」で公開しますが、ポータルの見え方とデータの置き場所が異なります。
          </p>
          <div className="space-y-4">
            <OnlinePortalFlow />
            <EnterprisePortalFlow />
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Online のポータル vs Enterprise のポータル</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">観点</th>
                  <th className="text-left px-4 py-3 font-semibold text-cyan-800">ArcGIS Online</th>
                  <th className="text-left px-4 py-3 font-semibold text-violet-800">ArcGIS Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.aspect} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">{row.aspect}</td>
                    <td className="px-4 py-3 text-gray-700">{row.online}</td>
                    <td className="px-4 py-3 text-gray-700">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">よくある誤解と正しい理解</h3>
          <div className="space-y-4">
            {mythRows.map((row) => (
              <div key={row.question} className="border border-gray-100 rounded-xl p-4">
                <div className="font-semibold text-gray-900 mb-2">Q. {row.question}</div>
                <p className="text-sm text-gray-700 leading-6">A. {row.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Enterprise 構成での役割分担</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
            <table className="min-w-full text-sm">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-emerald-900">担当</th>
                  <th className="text-left px-4 py-3 font-semibold text-emerald-900">ポータルでの操作</th>
                  <th className="text-left px-4 py-3 font-semibold text-emerald-900">結果</th>
                </tr>
              </thead>
              <tbody>
                {portalTasks.map((row) => (
                  <tr key={row.who} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">{row.who}</td>
                    <td className="px-4 py-3 text-gray-700">{row.action}</td>
                    <td className="px-4 py-3 text-gray-700">{row.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-700 leading-6">
            Enterprise GIS 構成では Portal for ArcGIS 経由で ArcGIS Enterprise 上に Hosted Feature Layer を載せ、
            Maps SDK が REST URL を参照します。Portal・Server は
            <span className="font-semibold">自社データセンター／サーバールームの VM・物理サーバー（オンプレ）</span>
            または
            <span className="font-semibold">組織専用プライベートクラウド</span>
            に置き、Snowflake とは別系統です。
          </p>
        </section>

        <section className="bg-sky-50 border border-sky-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Online と Enterprise の選び方（まとめ）</h3>
          <ul className="text-sm text-gray-700 space-y-2 leading-6">
            <li>
              ・<span className="font-semibold">すぐ始めたい・クラウドで十分</span> → ArcGIS Online（ポータル内蔵）
            </li>
            <li>
              ・<span className="font-semibold">オンプレ／閉域でデータを自社管理したい</span> → ArcGIS Enterprise（Portal for ArcGIS + Server）
            </li>
            <li>
              ・<span className="font-semibold">どちらでも</span> ArcGIS Pro は整備・解析の作業場。公開はポータル経由
            </li>
            <li>
              ・<span className="font-semibold">閉域・自社管理が必要</span> → Portal + ArcGIS Enterprise
            </li>
          </ul>
        </section>

        <section className="flex flex-wrap gap-3">
          <Link
            href="/training/arcgis/online"
            className="text-sm font-medium text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg px-4 py-2 hover:bg-cyan-100"
          >
            ArcGIS Online →
          </Link>
          <Link
            href="/training/arcgis/enterprise"
            className="text-sm font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-lg px-4 py-2 hover:bg-violet-100"
          >
            ArcGIS Enterprise →
          </Link>
          <Link
            href="/training/arcgis/pro"
            className="text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-2 hover:bg-indigo-100"
          >
            ArcGIS Pro →
          </Link>
          <Link
            href="/training/arcgis/layer"
            className="text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-lg px-4 py-2 hover:bg-teal-100"
          >
            Hosted Feature Layer →
          </Link>
        </section>
      </div>
    </div>
  );
}
