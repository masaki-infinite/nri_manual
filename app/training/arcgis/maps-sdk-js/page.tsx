import Link from "next/link";
import MapsSDKJsFlowDiagram from "./MapsSDKJsFlowDiagram";

type CompareRow = {
  item: string;
  mapsSdk: string;
  alternative: string;
};

type CapabilityRow = {
  name: string;
  description: string;
  project: string;
};

const compareRows: CompareRow[] = [
  {
    item: "用途",
    mapsSdk: "Web ブラウザで 2D/3D 地図を描画・操作するクライアント SDK",
    alternative: "Experience Builder はノーコード UI、GeoServer+MapLibre は OSS 自前構成",
  },
  {
    item: "実行場所",
    mapsSdk: "エンドユーザーのブラウザ（クライアント側 JavaScript）",
    alternative: "サーバー側レンダリングではない（Feature Layer は REST で取得）",
  },
  {
    item: "データ参照",
    mapsSdk: "Hosted Feature Layer の REST URL を FeatureLayer で読み込み",
    alternative: "地図タイルだけなら TileLayer、背景は Basemap",
  },
  {
    item: "ライセンス",
    mapsSdk: "SDK 自体は無料。参照先レイヤ・解析クレジットは Enterprise 側",
    alternative: "Online でも同型。閉域案件では Enterprise が多い",
  },
  {
    item: "実装例",
    mapsSdk: "Web 地図画面専用。RAG・分析は Next.js + Snowflake",
    alternative: "RAG・文書系は Maps SDK 不要",
  },
];

const capabilityRows: CapabilityRow[] = [
  {
    name: "Map / MapView",
    description: "2D 地図の表示・ズーム・パン・レイヤ重ね合わせ",
    project: "ハザードマップ・避難所の 2D 表示",
  },
  {
    name: "SceneView",
    description: "3D シーン表示（建物・地形の立体可視化）",
    project: "将来の PLATEAU / 3D 拡張",
  },
  {
    name: "FeatureLayer",
    description: "ベクターレイヤの動的読込・フィルタ・スタイル変更",
    project: "災害種別・規模に応じたレイヤ visible 切替",
  },
  {
    name: "Popup / Widget",
    description: "地物クリック時の属性表示、ズーム・凡例等 UI 部品",
    project: "施設名・浸水深などの確認 UI",
  },
  {
    name: "geometryEngine / analysis",
    description: "クライアント側の空間演算（バッファ・交差等）",
    project: "簡易な範囲判定（重い解析は Server 側）",
  },
];

export default function MapsSdkJsPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Maps SDK for JavaScript とは？</h2>
      <p className="text-gray-600 text-sm mb-6 max-w-4xl leading-relaxed">
        Esri が提供するブラウザ向け GIS ライブラリです。WebGL で 2D/3D 地図を描画し、
        ArcGIS Enterprise や Online 上の Hosted Feature Layer を REST で参照します。
        Web 地図画面で Next.js と組み合わせて使うのが一般的です。
      </p>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span>🌐</span>
            クライアント側 GIS
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">
            「地図を表示する」のはブラウザ、データの正は Enterprise
          </h3>
          <p className="text-slate-700 leading-7 max-w-4xl mb-4">
            Maps SDK for JavaScript（旧 JS API）は、npm パッケージ{" "}
            <span className="font-mono text-sm">@arcgis/core</span> として提供されます。
            地図の描画・レイヤ切替・ポップアップはすべてクライアントで行いますが、
            地理データ本体は Portal 経由で公開された Enterprise の Hosted Feature Layer に置かれます。
          </p>
          <MapsSDKJsFlowDiagram />
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">他手段との比較</h3>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">観点</th>
                  <th className="text-left px-4 py-3 font-semibold text-sky-800">Maps SDK for JavaScript</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">代替・補足</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.item}
                    className={`border-t border-gray-200 align-top ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{row.item}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.mapsSdk}</td>
                    <td className="px-4 py-3 text-slate-600 leading-6">{row.alternative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">主なコンポーネント</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilityRows.map((cap) => (
              <div key={cap.name} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2 font-mono text-sm">{cap.name}</h4>
                <p className="text-sm text-gray-600 leading-6 mb-2">{cap.description}</p>
                <p className="text-xs text-sky-700 bg-sky-50 border border-sky-100 rounded-lg px-2 py-1.5">
                  例: {cap.project}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Next.js への組み込み（基本）</h3>
          <ol className="space-y-2 text-sm text-gray-700 leading-6 list-decimal list-inside mb-4">
            <li>
              <span className="font-mono">npm install @arcgis/core</span> — CSS もインポートが必要
            </li>
            <li>クライアントコンポーネント（<span className="font-mono">&quot;use client&quot;</span>）で MapView を初期化</li>
            <li>Portal / Enterprise から取得した Feature Service URL を FeatureLayer に渡す</li>
            <li>災害種別・規模の state に応じて <span className="font-mono">layer.visible</span> や definitionExpression を切替</li>
          </ol>
          <pre className="bg-gray-900 text-green-300 rounded-lg p-4 text-xs leading-relaxed overflow-auto">{`"use client";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import "@arcgis/core/assets/esri/themes/light/main.css";

const tsunamiLayer = new FeatureLayer({
  url: "https://<enterprise-host>/arcgis/rest/services/.../FeatureServer/0",
  outFields: ["*"],
  definitionExpression: "hazard_type = 'tsunami'",
});

const map = new Map({ basemap: "streets-vector", layers: [tsunamiLayer] });
const view = new MapView({ container: "viewDiv", map, center: [139.69, 35.68], zoom: 10 });`}</pre>
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-4">
            Next.js App Router では SSR と相性が悪いため、地図コンポーネントは dynamic import（
            <span className="font-mono">ssr: false</span>）で遅延読込するのが一般的です。
          </p>
        </section>

        <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold text-emerald-900 mb-3">典型的な構成での位置づけ</h3>
          <ul className="space-y-2 text-sm text-gray-700 leading-6">
            <li>・地図表示専用。RAG・分析・ダッシュボードは Snowflake + Next.js で完結する構成が多い</li>
            <li>・GIS データは Pro → Portal → Enterprise で整備・公開し、Maps SDK は REST 参照のみ</li>
            <li>・Snowflake とは直接つながらない（必要なら mart → Enterprise 同期は別経路）</li>
            <li>・閉域運用の場合、Feature Service URL は社内 LAN から到達可能な Enterprise ホストを指す</li>
          </ul>
          <div className="flex flex-wrap gap-3 mt-4">
            <Link
              href="/training/arcgis/layer"
              className="text-sm font-semibold text-emerald-800 hover:text-emerald-900 underline"
            >
              Hosted Feature Layer の説明 →
            </Link>
            <Link
              href="/training/arcgis/enterprise"
              className="text-sm font-semibold text-emerald-800 hover:text-emerald-900 underline"
            >
              ArcGIS Enterprise の説明 →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
