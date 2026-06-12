import Image from "next/image";
import Link from "next/link";
import HostedFeatureLayerDiagram from "./HostedFeatureLayerDiagram";

type CompareRow = {
  item: string;
  hosted: string;
  other: string;
};

type LayerTypeRow = {
  type: string;
  data: string;
  use: string;
  project: string;
};

type StepRow = {
  step: string;
  action: string;
  output: string;
};

const compareRows: CompareRow[] = [
  {
    item: "データの置き場所",
    hosted: "ArcGIS Online（Esri クラウド）にホストされる",
    other: "参照レイヤは外部 DB や Enterprise 上のデータを指すだけ",
  },
  {
    item: "公開のしかた",
    hosted: "ファイルアップロードや Pro から「共有」で自動作成",
    other: "既存サービス URL を ArcGIS Online に登録して参照",
  },
  {
    item: "更新方法",
    hosted: "再アップロード、Pro 上書き、API（Feature Service）で追記・更新",
    other: "元データ側の更新がそのまま反映（接続設定次第）",
  },
  {
    item: "Web / SDK からの見え方",
    hosted: "FeatureLayer として REST URL で読み込み（一般的なパターン）",
    other: "同じく FeatureLayer だが、元システム障害の影響を受けやすい",
  },
  {
    item: "実装例での使い方",
    hosted: "ArcGIS Pro で整備し公開したハザードマップ・施設等を配信（初期開発の基本）",
    other: "既存 GIS への直接参照は運用が複雑なため PoC では非推奨",
  },
];

const layerTypeRows: LayerTypeRow[] = [
  {
    type: "Hosted Feature Layer",
    data: "ベクター（点・線・面）+ 属性テーブル",
    use: "ハザードマップ、避難所、用途地域など動的に切替したいレイヤ",
    project: "Web 地図の中核。Maps SDK が REST で参照",
  },
  {
    type: "Hosted Tile Layer",
    data: "ラスタタイル（画像のタイル分割）",
    use: "大容量底図・航空写真など表示専用",
    project: "必要に応じて背景地図として併用",
  },
  {
    type: "Map Image Layer",
    data: "サーバー側描画の地図イメージ",
    use: "複雑なシンボルやレガシー MXD 資産の配信",
    project: "主役ではない（Feature Layer を優先）",
  },
  {
    type: "Scene Layer（3D）",
    data: "3D メッシュ・建物（I3S）",
    use: "3D 都市モデル、建物の立体表示",
    project: "将来拡張（PLATEAU 連携）で検討",
  },
];

const stepRows: StepRow[] = [
  {
    step: "1. データ整備",
    action: "Shapefile / GeoJSON 等を ArcGIS Online または Pro で取り込み",
    output: "座標系・属性が整った GIS データ",
  },
  {
    step: "2. Hosted Feature Layer 化",
    action: "「ホストされたフィーチャレイヤ」として公開",
    output: "Feature Service URL（REST エンドポイント）",
  },
  {
    step: "3. Web マップに追加",
    action: "ArcGIS Online でレイヤを重ね、スタイル・表示範囲を設定",
    output: "運用・確認用 Web マップ（任意）",
  },
  {
    step: "4. Maps SDK で参照",
    action: "Next.js から `FeatureLayer({ url })` で読み込み、条件で visible 切替",
    output: "Web 地図の 2D/3D 表示",
  },
  {
    step: "5. 更新運用",
    action: "Pro で上書き公開、または Feature Service API で差分更新（Phase 2 で Snowflake 同期も可）",
    output: "鮮度を保った Hosted Feature Layer",
  },
];

export default function ArcGisHostedLayerPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">ArcGIS Hosted Feature Layer とは？</h2>
      <p className="text-gray-700 leading-7 mb-8 max-w-4xl">
        <span className="font-semibold">Hosted Feature Layer（ホストされたフィーチャレイヤ）</span>
        は、点・線・面の地理データと属性を Portal 経由で ArcGIS Enterprise（または Online）上にホストし、
        REST API 経由で Web アプリや Maps SDK から読み込めるレイヤです。
        典型的な Enterprise GIS 構成では Enterprise 上に公開し、
        Web 地図画面の<span className="font-semibold">配信基盤</span>として使います。
      </p>

      <div className="space-y-8">
        <section id="basics" className="scroll-mt-28 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span>🗂️</span>
            レイヤの基本
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">一言でいうと</h3>
          <p className="text-gray-700 leading-7 mb-4">
            「地図上のオブジェクト（避難所の点、浸水区域の面、道路の線など）と、その属性（名称・住所・想定水深など）を
            セットにしてクラウド配信する仕組み」です。ブラウザの Maps SDK は、このレイヤの URL を指定するだけで
            地図に描画できます。
          </p>
          <ul className="space-y-2 text-sm text-gray-700 leading-6">
            <li>・<span className="font-semibold">ホスト（Hosted）</span>：データ本体が Portal 配下の GIS 基盤（Enterprise または Online）に保存される</li>
            <li>・<span className="font-semibold">フィーチャ（Feature）</span>：1 件＝1 地物（1 避難所、1 浸水ポリゴンなど）</li>
            <li>・<span className="font-semibold">レイヤ（Layer）</span>：同じ種類のフィーチャをまとめた表示単位（津波レイヤ、震度レイヤ等）</li>
          </ul>
        </section>

        <section id="arch" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-1">全体構成</h3>
          <p className="text-sm text-gray-500 mb-4">
            データ作成から Portal 経由の Enterprise ホスト、REST API 経由の Maps SDK 利用までの流れです。
          </p>
          <div className="hidden md:block rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
            <Image
              src="/training/arcgis/layer/hosted-feature-layer-arch.png"
              alt="Hosted Feature Layer 構成図 — データ作成・ArcGIS Online・REST API・Maps SDK の連携"
              width={1200}
              height={680}
              className="w-full h-auto"
              priority
            />
          </div>
          <div className="md:hidden">
            <HostedFeatureLayerDiagram />
          </div>
          <details className="mt-4 md:hidden group">
            <summary className="text-sm text-teal-700 cursor-pointer font-medium hover:text-teal-800">
              参考画像（フルサイズ）を表示
            </summary>
            <div className="mt-3 rounded-xl border border-slate-200 overflow-hidden">
              <Image
                src="/training/arcgis/layer/hosted-feature-layer-arch.png"
                alt="Hosted Feature Layer 構成図（参考画像）"
                width={1200}
                height={680}
                className="w-full h-auto"
              />
            </div>
          </details>
        </section>

        <section id="position" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-1">典型的な構成での位置づけ</h3>
          <p className="text-sm text-gray-500 mb-4">GIS データは ArcGIS Pro で整備し、Portal 経由で Enterprise にホスト。Snowflake への GIS 格納は不要です。</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            {[
              {
                title: "ArcGIS Pro",
                body: "Shapefile / GeoJSON 等の取り込み・編集・品質確認。データのマスタ。",
                color: "border-indigo-200 bg-indigo-50 text-indigo-900",
              },
              {
                title: "Hosted Feature Layer",
                body: "Pro から Portal へ「共有」。Enterprise 上の配信レイヤ。",
                color: "border-teal-200 bg-teal-50 text-teal-900",
              },
              {
                title: "Maps SDK（Next.js）",
                body: "Web 地図画面がレイヤ URL を読み込み、条件で表示切替。",
                color: "border-orange-200 bg-orange-50 text-orange-900",
              },
            ].map((x) => (
              <div key={x.title} className={`rounded-xl border p-4 ${x.color}`}>
                <div className="font-bold mb-1">{x.title}</div>
                <p className="leading-5 opacity-90">{x.body}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4 leading-6">
            地図表示は ArcGIS が配信し、Next.js（Maps SDK）が読み込むという分担です。
            Snowflake は RAG・文書・分析のバックエンドとして使い、GIS データ本体は ArcGIS Enterprise 側で完結する構成が一般的です。
          </p>
        </section>

        <section id="snowflake" className="scroll-mt-28 bg-sky-50 border border-sky-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            Phase 2 以降・任意
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Snowflake GIS mart を足すと可能になること</h3>
          <p className="text-sm text-gray-700 leading-6 mb-4">
            データソースを最初から ArcGIS Pro で管理する前提なら、開発初期に Snowflake へ GIS を置く必要はありません。
            文書・業務データとの統合や dbt による品質管理が必要になった段階で、GIS mart（例: mart_arcgis_features）を追加する拡張オプションです。
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 leading-6">
            <li>・複数ソース（オープンデータ等）の座標系・属性を dbt で標準化してから ArcGIS へ同期</li>
            <li>・RAG 回答・業務テーブルと GIS 属性を SQL で横断結合</li>
            <li>・シミュレーション結果や集計を mart 化してから Feature Layer へ配信</li>
            <li>・更新履歴・監査を Snowflake のデータ基盤で一元管理</li>
          </ul>
          <p className="text-xs text-sky-800 mt-4">
            詳細は{" "}
            <Link href="/training/snowflake-arcgis" className="underline font-medium">
              Snowflake × ArcGIS 連携
            </Link>
            を参照。
          </p>
        </section>

        <section id="hosted-vs-ref" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Hosted と参照レイヤの違い</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">観点</th>
                  <th className="text-left px-4 py-3 font-semibold text-teal-800">Hosted Feature Layer</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">参照（Referenced）レイヤ</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.item} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">{row.item}</td>
                    <td className="px-4 py-3 text-gray-700">{row.hosted}</td>
                    <td className="px-4 py-3 text-gray-600">{row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="types" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">レイヤ種別の整理</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">種別</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">データ形式</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">主な用途</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">実装例</th>
                </tr>
              </thead>
              <tbody>
                {layerTypeRows.map((row) => (
                  <tr key={row.type} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-semibold text-gray-800">{row.type}</td>
                    <td className="px-4 py-3 text-gray-700">{row.data}</td>
                    <td className="px-4 py-3 text-gray-700">{row.use}</td>
                    <td className="px-4 py-3 text-gray-600">{row.project}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="flow" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">作成から Maps SDK 利用まで</h3>
          <div className="space-y-3">
            {stepRows.map((row) => (
              <div key={row.step} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 border border-gray-100 rounded-xl p-4">
                <div className="font-bold text-teal-700 text-sm w-36 shrink-0">{row.step}</div>
                <div className="flex-1 text-sm text-gray-700">{row.action}</div>
                <div className="text-xs text-gray-500 sm:w-48 shrink-0">→ {row.output}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Maps SDK での読み込みイメージ</h3>
          <p className="text-sm text-gray-600 mb-3">
            Web 地図画面では、災害種別や規模に応じて複数の Hosted Feature Layer の表示を切り替えます。
          </p>
          <pre className="bg-slate-900 text-slate-100 text-xs rounded-xl p-4 overflow-x-auto leading-6">
{`import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

// Hosted Feature Layer の REST URL（ArcGIS Online で発行）
const tsunamiLayer = new FeatureLayer({
  url: "https://services.arcgis.com/.../FeatureServer/0",
  visible: disasterType === "tsunami",
});

map.add(tsunamiLayer);`}
          </pre>
          <p className="text-xs text-gray-500 mt-3">
            URL の末尾 <code className="bg-white px-1 rounded">/FeatureServer/0</code> がレイヤ番号。
            属性フィルタや definitionExpression で浸水深度・区域を絞り込めます。
          </p>
        </section>

        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5 md:p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-2">運用時の注意</h3>
          <ul className="text-sm text-amber-900/90 space-y-1.5 leading-6">
            <li>・座標系は公開前に JGD2011 等へ統一（位置ずれ防止）</li>
            <li>・属性名は英数字スネークケースに揃えると SDK 連携が楽</li>
            <li>・大容量ポリゴンは簡略化やタイル化を検討（表示性能）</li>
            <li>・更新は Pro 上書きが基本。Snowflake 連携を入れる場合はバッチ / API の方式を別途設計</li>
            <li>・クレジット消費はストレージ・トランザクション・分析に依存（要見積もり）</li>
          </ul>
        </section>

        <section className="flex flex-wrap gap-3">
          <Link
            href="/training/arcgis/import"
            className="text-sm font-medium text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg px-4 py-2 hover:bg-cyan-100"
          >
            GIS 取り込み手順 →
          </Link>
          <Link
            href="/training/snowflake-arcgis"
            className="text-sm font-medium text-teal-700 bg-teal-50 border border-teal-200 rounded-lg px-4 py-2 hover:bg-teal-100"
          >
            Snowflake × ArcGIS 連携 →
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
