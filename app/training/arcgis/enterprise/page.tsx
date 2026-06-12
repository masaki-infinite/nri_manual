import Link from "next/link";
import ProEnterpriseRelationDiagram from "../ProEnterpriseRelationDiagram";

type CompareRow = {
  aspect: string;
  enterprise: string;
  online: string;
};

type FeatureRow = {
  num: string;
  title: string;
  items: string[];
  image: string;
  alt: string;
};

const compareRows: CompareRow[] = [
  {
    aspect: "提供形態",
    enterprise: "自社サーバーまたはプライベートクラウド上に構築（オンプレ／クラウド）",
    online: "Esri がホストする SaaS（クラウドのみ）",
  },
  {
    aspect: "データの置き場所",
    enterprise: "組織内で一元管理。閉域網・社内ネットワークに閉じられる",
    online: "ArcGIS Online（Esri クラウド）上にホスト",
  },
  {
    aspect: "カスタマイズ",
    enterprise: "ポータル・サーバー設定・連携を組織要件に合わせて拡張しやすい",
    online: "標準機能中心。迅速な導入に向く",
  },
  {
    aspect: "解析機能",
    enterprise: "空間解析・ネットワーク解析・画像解析・リアルタイム／ビッグデータ解析",
    online: "空間解析・ネットワーク解析・ジオコーディング等",
  },
  {
    aspect: "導入のしやすさ",
    enterprise: "インフラ設計・運用体制が必要。中長期の基盤として向く",
    online: "すぐに利用開始でき PoC に向く",
  },
  {
    aspect: "閉域案件での位置づけ",
    enterprise: "GIS 配信基盤。Portal + Server で閉域運用",
    online: "クラウド SaaS。手軽な PoC や参考構成向き",
  },
];

const featureRows: FeatureRow[] = [
  {
    num: "01",
    title: "様々な環境で構成可能",
    items: ["オンプレミス", "クラウド", "GIS コンテンツのネットワーク共有"],
    image: "/training/arcgis/enterprise/img_enterprise01.png",
    alt: "ArcGIS Enterprise — 様々な環境で構成可能（参考: NTTテクノクロス）",
  },
  {
    num: "02",
    title: "データの一元管理と利活用",
    items: ["ポータルサイトの構築", "各種データの統合管理・共有"],
    image: "/training/arcgis/enterprise/img_enterprise02.png",
    alt: "ArcGIS Enterprise — データの一元管理と利活用（参考: NTTテクノクロス）",
  },
  {
    num: "03",
    title: "豊富な解析機能",
    items: ["空間解析", "ネットワーク解析", "画像解析", "リアルタイム／ビッグデータ解析"],
    image: "/training/arcgis/enterprise/img_enterprise03.png",
    alt: "ArcGIS Enterprise — 豊富な解析機能（参考: NTTテクノクロス）",
  },
];

const lineup = [
  {
    name: "ArcGIS Enterprise",
    tag: "サーバー",
    summary: "地理情報の力を最大限に引き出すプラットフォーム",
    traits: ["オンプレミス／クラウド", "組織内データ管理", "カスタマイズ", "ノーコード・ローコード"],
    href: "/training/arcgis/enterprise",
    active: true,
  },
  {
    name: "ArcGIS Online",
    tag: "クラウドサービス",
    summary: "手軽に始められるクラウド GIS サービス",
    traits: ["クラウド", "すぐに利用開始", "ノーコード・ローコード"],
    href: "/training/arcgis/online",
    active: false,
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

export default function ArcGisEnterprisePage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">ArcGIS Enterprise とは？</h2>
      <p className="text-gray-700 leading-7 mb-8 max-w-4xl">
        ArcGIS Enterprise は、組織のサーバーまたはプライベートクラウド上に構築する
        <span className="font-semibold"> GIS 基盤プラットフォーム</span>です。
        地理データのマッピング・解析・視覚化・共有を組織内で一元管理でき、
        閉域網や社内ネットワークでの運用に向きます。
        典型的な Enterprise GIS 構成では Portal for ArcGIS + ArcGIS Enterprise + Pro を組み合わせ、
        社内閉域で Hosted Feature Layer を配信します。
      </p>

      <div className="space-y-8">
        <section id="overview" className="scroll-mt-28 bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-violet-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                <span>🏢</span>
                サーバープラットフォーム
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">地理情報の力を最大限に引き出すプラットフォーム</h3>
              <p className="text-slate-700 leading-7">
                企業や政府機関のニーズに応じた柔軟なソリューションを提供し、地理情報を活用した意思決定を支援します。
                オンプレミスやプライベートクラウドなど多様な環境で構築でき、コンテンツやデータ管理を一元化します。
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs">
                {["オンプレミス／クラウド", "組織内データ管理", "カスタマイズ", "ノーコード・ローコード"].map((t) => (
                  <li key={t} className="bg-white/80 border border-violet-200 rounded-full px-3 py-1 text-violet-900 font-medium">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center gap-3 w-full md:w-auto">
              <div className="bg-white rounded-lg px-4 py-3 shadow-sm border border-violet-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/training/arcgis/enterprise/logo_enterprise_cr.svg"
                  alt="ArcGIS Enterprise ロゴ"
                  className="h-auto w-52 max-w-full"
                />
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm border border-violet-100 w-full max-w-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/training/arcgis/enterprise/figure_enterprise.svg"
                  alt="ArcGIS Enterprise 構成イメージ"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <ProEnterpriseRelationDiagram />
        </section>

        <section id="lineup" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">ArcGIS 製品ラインナップ</h3>
          <p className="text-sm text-gray-600 mb-4 leading-6">
            ArcGIS は Enterprise・Online・Pro の 3 ソリューションで業務課題を解決する包括的プラットフォームです。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {lineup.map((item) => (
              <div
                key={item.name}
                className={`rounded-xl border p-4 ${
                  item.active
                    ? "border-violet-400 bg-violet-50 ring-2 ring-violet-200"
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
                  <span className="text-xs font-semibold text-violet-700">このページ</span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">主な機能</h3>
          <div className="space-y-6">
            {featureRows.map((row) => (
              <div key={row.num} className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center border border-gray-100 rounded-xl p-4">
                <div>
                  <div className="text-violet-600 font-bold text-sm mb-1">{row.num}</div>
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

        <section id="compare" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">ArcGIS Online との違い</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">観点</th>
                  <th className="text-left px-4 py-3 font-semibold text-violet-800">ArcGIS Enterprise</th>
                  <th className="text-left px-4 py-3 font-semibold text-cyan-800">ArcGIS Online</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.aspect} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">{row.aspect}</td>
                    <td className="px-4 py-3 text-gray-700">{row.enterprise}</td>
                    <td className="px-4 py-3 text-gray-600">{row.online}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="infra" className="scroll-mt-28 bg-white border border-violet-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">サーバーの置き場所（インフラ）</h3>
          <p className="text-sm text-gray-600 mb-4 leading-6">
            ArcGIS Enterprise の Portal・Server・Data Store は、<span className="font-semibold">Esri クラウド（Online）ではなく組織が管理するインフラ</span>
            に載せます。Snowflake や Next.js（SPCS）とは別系統です。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-4">
              <div className="font-bold text-violet-900 mb-2">オンプレミス</div>
              <p className="text-sm text-gray-700 leading-6">
                組織の<span className="font-semibold">データセンター／サーバールーム</span>に、
                <span className="font-semibold">物理サーバーまたは VM</span>として Portal for ArcGIS・ArcGIS Server・ArcGIS Data Store を構築する形です。
                社内 LAN からのみ到達可能にし、GIS データを組織内に閉じて運用します。
              </p>
            </div>
            <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
              <div className="font-bold text-indigo-900 mb-2">閉域クラウド（プライベートクラウド）</div>
              <p className="text-sm text-gray-700 leading-6">
                組織専用の<span className="font-semibold">プライベートクラウド</span>上に Enterprise コンポーネントを載せる形です。
                見え方はクラウドでも、<span className="font-semibold">インターネット上の Esri SaaS ではなく社内閉域内</span>で完結させる点はオンプレと同じです。
              </p>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-gray-700 leading-6">
            <span className="font-semibold text-slate-800">典型的な Enterprise GIS 構成では</span>
            構成図の「社内 GIS（閉域）」がこの Enterprise 群を指します。
            Maps SDK（エンドユーザーのブラウザ）が REST で参照する先であり、Snowflake 上には載りません。
            具体的なラック配置・台数・DEV/UAT/PROD の分離は基盤準備フェーズで確定します。
          </div>
        </section>

        <section id="position" className="scroll-mt-28 bg-sky-50 border border-sky-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">閉域案件での位置づけ</h3>
          <p className="text-sm text-gray-700 leading-6 mb-3">
            典型的な構成では、GIS データは <span className="font-semibold">ArcGIS Pro</span> で整備し、
            <span className="font-semibold"> Portal for ArcGIS</span> 経由で
            <span className="font-semibold"> ArcGIS Enterprise</span> 上の Hosted Feature Layer として配信します。
            Maps SDK（Web 地図画面）がその REST URL を参照します。
          </p>
          <p className="text-sm text-gray-700 leading-6">
            社内閉域でのデータ自社管理・権限統制の要件から Online ではなく Enterprise を採用することが多いです。
            Snowflake から Enterprise への GIS 同期は Phase 2 以降の任意拡張です。
          </p>
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
            href="/training/arcgis/portal"
            className="text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 hover:bg-amber-100"
          >
            ポータル（Portal）とは？ →
          </Link>
          <Link
            href="/training/arcgis"
            className="text-sm font-medium text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg px-4 py-2 hover:bg-cyan-100"
          >
            ArcGIS 概要 →
          </Link>
          <Link
            href="/training/arcgis/pro"
            className="text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-2 hover:bg-indigo-100"
          >
            ArcGIS Pro とは？ →
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
