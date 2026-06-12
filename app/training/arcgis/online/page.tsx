import Link from "next/link";

type CompareRow = {
  aspect: string;
  online: string;
  other: string;
};

type EbCompareRow = {
  aspect: string;
  online: string;
  experienceBuilder: string;
};

type FeatureRow = {
  num: string;
  title: string;
  items: string[];
  image: string;
  alt: string;
};

const enterpriseCompare: CompareRow[] = [
  {
    aspect: "提供形態",
    online: "Esri がホストする SaaS。ブラウザですぐ利用開始",
    other: "自社サーバー／プライベートクラウドに構築",
  },
  {
    aspect: "データ管理",
    online: "Hosted Feature Layer 等をクラウド上で公開・権限管理",
    other: "組織内ネットワークで一元管理。閉域運用向き",
  },
  {
    aspect: "導入コスト",
    online: "初期費用を抑えて PoC しやすい",
    other: "インフラ・運用設計が必要。中長期基盤向き",
  },
];

const proCompare: CompareRow[] = [
  {
    aspect: "役割",
    online: "地図資産の運用・公開・共有の場",
    other: "データ編集・解析・品質管理の作業場",
  },
  {
    aspect: "操作",
    online: "ブラウザ中心。設定・公開・権限管理",
    other: "デスクトップ GIS。高精度の編集・解析",
  },
  {
    aspect: "連携",
    online: "Pro から共有したレイヤをホスト・配信",
    other: "整備したデータを Online へ「共有」で公開",
  },
];

const ebCompareRows: EbCompareRow[] = [
  {
    aspect: "位置づけ",
    online: "地理空間データの公開・共有・管理を行うクラウド GIS 基盤",
    experienceBuilder: "Online 上のデータを使って業務アプリを構築する UI ビルダー",
  },
  {
    aspect: "主な機能",
    online: "Web マップ、3D シーン、ホストレイヤ、権限管理、組織運用",
    experienceBuilder: "画面レイアウト、ウィジェット連携、条件表示、ページ遷移",
  },
  {
    aspect: "開発スタイル",
    online: "設定中心（ノーコード）",
    experienceBuilder: "ノーコード中心。Developer Edition で拡張も可能",
  },
  {
    aspect: "カスタム UI との関係",
    online: "Hosted Feature Layer 公開基盤（Maps SDK が URL 参照）",
    experienceBuilder: "ノーコードアプリの参考。カスタム UI なら Next.js + Maps SDK",
  },
];

const featureRows: FeatureRow[] = [
  {
    num: "01",
    title: "すぐに利用可能なコンテンツ",
    items: ["背景図（地形図、道路地図、衛星画像）", "統計情報、地震被害想定、気象情報など"],
    image: "/training/arcgis/online/img_online01.png",
    alt: "ArcGIS Online — すぐに利用可能なコンテンツ（参考: NTTテクノクロス）",
  },
  {
    num: "02",
    title: "マップ作成と GIS サービス",
    items: ["空間解析", "ネットワーク解析", "ジオコーディング"],
    image: "/training/arcgis/online/img_online02.png",
    alt: "ArcGIS Online — マップ作成と GIS サービス（参考: NTTテクノクロス）",
  },
  {
    num: "03",
    title: "お客様専用ポータルサイト",
    items: ["コンテンツ管理", "ユーザー管理", "サイトのデザイン"],
    image: "/training/arcgis/online/img_online03.png",
    alt: "ArcGIS Online — お客様専用ポータルサイト（参考: NTTテクノクロス）",
  },
];

const lineup = [
  {
    name: "ArcGIS Enterprise",
    tag: "サーバー",
    summary: "地理情報の力を最大限に引き出すプラットフォーム",
    traits: ["オンプレミス／クラウド", "組織内データ管理", "カスタマイズ"],
    href: "/training/arcgis/enterprise",
    active: false,
  },
  {
    name: "ArcGIS Online",
    tag: "クラウドサービス",
    summary: "手軽に始められるクラウド GIS サービス",
    traits: ["クラウド", "すぐに利用開始", "ノーコード・ローコード"],
    href: "/training/arcgis/online",
    active: true,
  },
  {
    name: "ArcGIS Pro",
    tag: "デスクトップ",
    summary: "プロフェッショナル向け GIS 作業を効率化",
    traits: ["デスクトップアプリ", "高度な分析／解析", "データ作成・編集"],
    href: "/training/arcgis/pro",
    active: false,
  },
];

const projectFlow = [
  { step: "1", title: "ArcGIS Pro", body: "Shapefile 等を取り込み・編集（任意だが推奨）" },
  { step: "2", title: "ArcGIS Online", body: "Hosted Feature Layer として公開・権限設定" },
  { step: "3", title: "Maps SDK", body: "Web 地図画面が REST URL を読み込み、レイヤを切替表示" },
];

export default function ArcGisOnlinePage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">ArcGIS Online とは？</h2>
      <p className="text-gray-700 leading-7 mb-8 max-w-4xl">
        ArcGIS Online は、Esri が提供する <span className="font-semibold">クラウド GIS サービス（SaaS）</span>です。
        地理データの作成・共有・分析をブラウザで行え、初期費用を抑えてすぐに GIS を活用できます。
        クラウド GIS 案件では、<span className="font-semibold">Hosted Feature Layer の公開基盤</span>として使い、
        Next.js の Maps SDK がその URL を参照する構成が一般的です。
      </p>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-200 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                <span>☁️</span>
                クラウド GIS
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">手軽に始められるクラウド GIS サービス</h3>
              <p className="text-slate-700 leading-7">
                企業、政府機関、教育機関などで広く利用されており、地理情報を活用した意思決定を支援する強力なツールです。
                地理的視点からの分析や可視化を通じて、部門横断で地図データを活用する基盤として使われます。
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs">
                {["クラウド", "すぐに利用開始", "ノーコード・ローコード"].map((t) => (
                  <li key={t} className="bg-white/80 border border-cyan-200 rounded-full px-3 py-1 text-cyan-900 font-medium">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center gap-3 w-full md:w-auto">
              <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-cyan-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/training/arcgis/online/logo_online_cr.svg"
                  alt="ArcGIS Online ロゴ"
                  className="h-auto w-52 max-w-full"
                />
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm border border-cyan-100 w-full max-w-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/training/arcgis/online/figure_online.svg"
                  alt="ArcGIS Online 構成イメージ"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">ArcGIS 製品ラインナップ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {lineup.map((item) => (
              <div
                key={item.name}
                className={`rounded-xl border p-4 ${
                  item.active
                    ? "border-cyan-400 bg-cyan-50 ring-2 ring-cyan-200"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1">{item.tag}</div>
                <div className="font-bold text-gray-900 mb-1">{item.name}</div>
                <p className="text-xs text-gray-600 leading-5 mb-2">{item.summary}</p>
                <ul className="text-[11px] text-gray-600 space-y-0.5 mb-3">
                  {item.traits.map((t) => (
                    <li key={t}>・{t}</li>
                  ))}
                </ul>
                {!item.active ? (
                  <Link href={item.href} className="text-xs font-medium text-indigo-600 hover:underline">
                    詳細を見る →
                  </Link>
                ) : (
                  <span className="text-xs font-semibold text-cyan-700">このページ</span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">主な機能</h3>
          <div className="space-y-6">
            {featureRows.map((row) => (
              <div key={row.num} className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center border border-gray-100 rounded-xl p-4">
                <div>
                  <div className="text-cyan-600 font-bold text-sm mb-1">{row.num}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{row.title}</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {row.items.map((item) => (
                      <li key={item}>・{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-3 flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={row.image}
                    alt={row.alt}
                    className="h-auto w-full max-w-md rounded"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">典型的な構成での位置づけ</h3>
          <p className="text-sm text-gray-700 leading-6 mb-4">
            GIS データのマスタは <span className="font-semibold">ArcGIS Pro</span> で整備し、
            <span className="font-semibold"> ArcGIS Online</span> で Hosted Feature Layer として公開します。
            Snowflake への GIS 格納は開発初期には不要です。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {projectFlow.map((f) => (
              <div key={f.step} className="bg-white rounded-xl border border-emerald-200 p-4">
                <div className="text-emerald-600 font-bold text-lg mb-1">{f.step}</div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{f.title}</div>
                <p className="text-xs text-gray-600 leading-5">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">ArcGIS Enterprise との違い</h3>
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
                {enterpriseCompare.map((row) => (
                  <tr key={row.aspect} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">{row.aspect}</td>
                    <td className="px-4 py-3 text-gray-700">{row.online}</td>
                    <td className="px-4 py-3 text-gray-600">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">ArcGIS Pro との違い</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">観点</th>
                  <th className="text-left px-4 py-3 font-semibold text-cyan-800">ArcGIS Online</th>
                  <th className="text-left px-4 py-3 font-semibold text-indigo-800">ArcGIS Pro</th>
                </tr>
              </thead>
              <tbody>
                {proCompare.map((row) => (
                  <tr key={row.aspect} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">{row.aspect}</td>
                    <td className="px-4 py-3 text-gray-700">{row.online}</td>
                    <td className="px-4 py-3 text-gray-600">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Experience Builder との違い</h3>
          <p className="text-sm text-gray-600 mb-4 leading-6">
            Experience Builder は Online 上の地図を使ってノーコードで業務アプリを作るツールです。
            カスタム UI が必要な場合は Next.js + Maps SDK を採用しますが、
            ノーコードで地図アプリを試す際の参考になります。
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">観点</th>
                  <th className="text-left px-4 py-3 font-semibold text-cyan-800">ArcGIS Online</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">Experience Builder</th>
                </tr>
              </thead>
              <tbody>
                {ebCompareRows.map((row) => (
                  <tr key={row.aspect} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">{row.aspect}</td>
                    <td className="px-4 py-3 text-gray-700">{row.online}</td>
                    <td className="px-4 py-3 text-gray-600">{row.experienceBuilder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 leading-5">
          <p className="font-semibold text-slate-700 mb-1">参考・画像出典</p>
          <p>
            本ページの説明・画像は{" "}
            <a
              href="https://www.ntt-tx.co.jp/products/arcgis/lineup/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline"
            >
              NTTテクノクロス株式会社「ArcGIS 製品紹介」
            </a>
            を参考にしています。画像は研修資料用にローカル保存しています。
            ArcGIS は Esri の登録商標です。
          </p>
        </section>

        <section className="flex flex-wrap gap-3">
          <Link
            href="/training/arcgis/layer"
            className="text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-lg px-4 py-2 hover:bg-teal-100"
          >
            Hosted Feature Layer →
          </Link>
          <Link
            href="/training/arcgis/import"
            className="text-sm font-medium text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg px-4 py-2 hover:bg-cyan-100"
          >
            GIS 取り込み手順 →
          </Link>
          <Link
            href="/training/arcgis/pro"
            className="text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-2 hover:bg-indigo-100"
          >
            ArcGIS Pro とは？ →
          </Link>
        </section>
      </div>
    </div>
  );
}
