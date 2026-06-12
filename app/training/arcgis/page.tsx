import Link from "next/link";
import ProEnterpriseRelationDiagram from "./ProEnterpriseRelationDiagram";

type ComparisonRow = {
  perspective: string;
  arcgisOnline: string;
  experienceBuilder: string;
};

type UseCaseRow = {
  useCase: string;
  implementation: string;
  value: string;
};

const comparisonRows: ComparisonRow[] = [
  {
    perspective: "位置づけ",
    arcgisOnline: "地理空間データの公開・共有・管理を行うクラウドGIS基盤",
    experienceBuilder: "ArcGIS Online上のデータを使って業務アプリを構築するUIビルダー",
  },
  {
    perspective: "主な機能",
    arcgisOnline: "Webマップ、3Dシーン、ホストレイヤ、権限管理、組織運用",
    experienceBuilder: "画面レイアウト設計、ウィジェット連携、条件表示、ページ遷移",
  },
  {
    perspective: "向いている作業",
    arcgisOnline: "データ整備、可視化、公開範囲の制御、地図資産の運用",
    experienceBuilder: "利用者向けポータル作成、業務導線設計、複数地図の統合表示",
  },
  {
    perspective: "開発スタイル",
    arcgisOnline: "設定中心（ノーコード）",
    experienceBuilder: "ノーコード中心。必要に応じてDeveloper Editionで拡張可能",
  },
  {
    perspective: "成果物",
    arcgisOnline: "運用可能な地図データ基盤",
    experienceBuilder: "部門業務に直結するWebアプリ",
  },
];

const useCaseRows: UseCaseRow[] = [
  {
    useCase: "防災ダッシュボード",
    implementation: "浸水想定レイヤと避難所レイヤを統合し、フィルタ条件で対象区域を切替",
    value: "災害対応時の状況把握と意思決定を迅速化",
  },
  {
    useCase: "都市計画レビュー",
    implementation: "3Dシーンに用途地域・容積率・建物情報を重ね、候補地を比較",
    value: "関係者説明の説得力向上と合意形成の短縮",
  },
  {
    useCase: "インフラ保全",
    implementation: "設備台帳と点検履歴を地図連携し、更新時期を色分け表示",
    value: "保守優先度の可視化と計画保全の効率化",
  },
];

export default function ArcGisTrainingPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">ArcGIS 勉強会資料</h2>
      <p className="text-gray-600 text-sm mb-6">
        ArcGIS Online・Enterprise・ポータル・Pro の概要に加え、Hosted Feature Layer、Maps SDK for JavaScript、ArcGIS API for Python、GIS データの取り込み手順も別ページで整理しています。
      </p>

      <section className="mb-8 bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
        <div className="text-sm font-semibold text-gray-700 mb-3">このセクションのページ</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          <Link href="/training/arcgis/online">
            <div className="h-full rounded-xl border border-cyan-200 bg-cyan-50/50 hover:bg-cyan-50 hover:border-cyan-300 transition-colors p-4 cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-800 leading-5">ArcGIS Online とは？</span>
                <span className="bg-cyan-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shrink-0">
                  NEW
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-5">
                クラウド GIS。Phase 1 の Hosted Feature Layer 公開基盤と Maps SDK 連携。
              </p>
            </div>
          </Link>
          <Link href="/training/arcgis/enterprise">
            <div className="h-full rounded-xl border border-violet-200 bg-violet-50/50 hover:bg-violet-50 hover:border-violet-300 transition-colors p-4 cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-800 leading-5">ArcGIS Enterprise とは？</span>
                <span className="bg-violet-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shrink-0">
                  NEW
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-5">
                サーバー型 GIS 基盤。Online / Pro との違いと、社内閉域運用での位置づけ。
              </p>
            </div>
          </Link>
          <Link href="/training/arcgis/portal">
            <div className="h-full rounded-xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 hover:border-amber-300 transition-colors p-4 cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-800 leading-5">ポータル（Portal）とは？</span>
                <span className="bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shrink-0">
                  NEW
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-5">
                Pro と Online / Enterprise の間のハブ。オンプレ自社管理は Enterprise 向き。
              </p>
            </div>
          </Link>
          <Link href="/training/arcgis/pro">
            <div className="h-full rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 hover:border-indigo-300 transition-colors p-4 cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-800 leading-5">ArcGIS Pro とは？</span>
                <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shrink-0">
                  NEW
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-5">
                デスクトップ GIS の役割、Online との違い、整備から公開までの作業フロー。
              </p>
            </div>
          </Link>
          <Link href="/training/arcgis/layer">
            <div className="h-full rounded-xl border border-teal-200 bg-teal-50/50 hover:bg-teal-50 hover:border-teal-300 transition-colors p-4 cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-800 leading-5">
                  Hosted Feature Layer とは？
                </span>
                <span className="bg-teal-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shrink-0">
                  NEW
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-5">
                ホスト型フィーチャレイヤの仕組み、Maps SDK との関係、Enterprise 配信基盤としての役割。
              </p>
            </div>
          </Link>
          <Link href="/training/arcgis/maps-sdk-js">
            <div className="h-full rounded-xl border border-sky-200 bg-sky-50/50 hover:bg-sky-50 hover:border-sky-300 transition-colors p-4 cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-800 leading-5">Maps SDK for JavaScript</span>
                <span className="bg-sky-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shrink-0">NEW</span>
              </div>
              <p className="text-xs text-gray-600 leading-5">
                ブラウザ向け GIS SDK。@arcgis/core、FeatureLayer、Web 地図画面との関係。
              </p>
            </div>
          </Link>
          <Link href="/training/arcgis/maps-sdk-python">
            <div className="h-full rounded-xl border border-lime-200 bg-lime-50/50 hover:bg-lime-50 hover:border-lime-300 transition-colors p-4 cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-800 leading-5">ArcGIS API for Python</span>
                <span className="bg-lime-700 text-white text-xs font-bold px-2 py-0.5 rounded-full shrink-0">NEW</span>
              </div>
              <p className="text-xs text-gray-600 leading-5">
                arcgis パッケージ。Portal 自動化・一括公開・バッチ更新（Maps SDK for JavaScript との違い）。
              </p>
            </div>
          </Link>
          <Link href="/training/arcgis/import">
            <div className="h-full rounded-xl border border-cyan-200 bg-cyan-50/50 hover:bg-cyan-50 hover:border-cyan-300 transition-colors p-4 cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-semibold text-gray-800 leading-5">
                  GIS情報を ArcGIS アプリに取り込む方法
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-5">
                Shapefile / GeoJSON 等の取り込み、Hosted Feature Layer 化、Web マップ・Maps SDK での利用手順。
              </p>
            </div>
          </Link>
        </div>
      </section>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-slate-50 to-cyan-50 border border-slate-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">ArcGIS とは</h3>
          <p className="text-slate-700 leading-7 mb-4">
            <span className="font-semibold">ArcGIS</span> は、Esri（エスリ）が提供する
            <span className="font-semibold">地理空間情報（GIS）の統合プラットフォーム</span>
            です。地図データの作成・編集・解析から、組織内での共有・Web 公開、アプリ連携までを
            一連の製品群でカバーします。単一のアプリではなく、
            <span className="font-semibold">Pro（作業場）・ポータル（共有のハブ）・Online / Enterprise（配信基盤）</span>
            が組み合わさって GIS 基盤を形作ります。
          </p>
          <p className="text-slate-700 leading-7 mb-4">
            典型的な Enterprise GIS 構成では、ハザードマップや施設などの地理データを
            <span className="font-semibold"> ArcGIS Pro</span> で整備し、
            <span className="font-semibold"> Portal for ArcGIS</span> 経由で
            <span className="font-semibold"> ArcGIS Enterprise</span> 上の Hosted Feature Layer として公開、
            <span className="font-semibold"> Maps SDK for JavaScript</span> が REST API 経由で参照する流れが基本です。
            社内閉域でデータを自社管理する要件に合わせ、Online ではなく Enterprise を採用することが多いです。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <Link
              href="/training/arcgis/pro"
              className="rounded-xl border border-indigo-200 hover:border-indigo-300 p-3 hover:shadow-sm transition-shadow bg-white"
            >
              <div className="text-sm font-semibold text-indigo-800 mb-1">ArcGIS Pro</div>
              <p className="text-xs text-gray-600 leading-5">デスクトップ GIS。データ整備・解析</p>
            </Link>
            <Link
              href="/training/arcgis/portal"
              className="rounded-xl border border-amber-200 hover:border-amber-300 p-3 hover:shadow-sm transition-shadow bg-white"
            >
              <div className="text-sm font-semibold text-amber-800 mb-1">ポータル</div>
              <p className="text-xs text-gray-600 leading-5">認証・共有・公開のハブ</p>
            </Link>
            <Link
              href="/training/arcgis/online"
              className="rounded-xl border border-cyan-200 hover:border-cyan-300 p-3 hover:shadow-sm transition-shadow bg-white"
            >
              <div className="text-sm font-semibold text-cyan-800 mb-1">ArcGIS Online</div>
              <p className="text-xs text-gray-600 leading-5">クラウド配信基盤（参考）</p>
            </Link>
            <Link
              href="/training/arcgis/enterprise"
              className="rounded-xl border border-violet-200 hover:border-violet-300 p-3 hover:shadow-sm transition-shadow bg-white ring-1 ring-violet-100"
            >
              <div className="text-sm font-semibold text-violet-800 mb-1">ArcGIS Enterprise</div>
              <p className="text-xs text-gray-600 leading-5">閉域向け配信基盤</p>
            </Link>
          </div>
          <p className="text-sm text-slate-600 leading-6 mb-5">
            各製品の詳細は上のカードリンク、またはページ上部のタブから参照してください。
          </p>
          <ProEnterpriseRelationDiagram />
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Experience Builderとは</h3>
          <p className="text-slate-700 leading-7 mb-4">
            Experience Builderは、ArcGIS Online上の地図やレイヤを利用して、
            業務アプリをノーコード中心で作成できるビルダーです。地図、表、フィルタ、検索、
            チャートなどのウィジェットを組み合わせて、部門向けポータルを短期間で構築できます。
          </p>
          <ul className="space-y-2 text-slate-700 leading-7">
            <li>・画面レイアウトをドラッグ&ドロップで設計</li>
            <li>・地図連動フィルタや条件表示で業務導線を実装</li>
            <li>・Developer EditionでReactベースの拡張も可能</li>
          </ul>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-1">ArcGIS Online と Experience Builder の違い</h3>
          <p className="text-sm text-gray-500 mb-4">
            詳細は <Link href="/training/arcgis/online" className="text-cyan-600 underline">ArcGIS Online ページ</Link> も参照。
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">観点</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">ArcGIS Online</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">Experience Builder</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.perspective} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.perspective}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.arcgisOnline}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.experienceBuilder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">業務ユースケース例</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">ユースケース</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">実装イメージ</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">期待効果</th>
                </tr>
              </thead>
              <tbody>
                {useCaseRows.map((row) => (
                  <tr key={row.useCase} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.useCase}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.implementation}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
