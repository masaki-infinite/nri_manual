import Link from "next/link";

type FormatRow = {
  format: string;
  examples: string;
  notes: string;
};

type PathRow = {
  path: string;
  tool: string;
  flow: string;
  fit: string;
};

const formatRows: FormatRow[] = [
  {
    format: "Shapefile (.shp + 関連ファイル)",
    examples: "浸水想定区域、用途地域、避難所ポイント",
    notes: "文字コード（Shift_JIS）と .prj（座標系）をセットで管理。ZIP にまとめてアップロード可。",
  },
  {
    format: "GeoJSON / GeoPackage",
    examples: "オープンデータ変換後、API 経由の配信データ",
    notes: "Web 連携で扱いやすい。大容量はタイル化や簡略化を検討。",
  },
  {
    format: "CSV（緯度経度 or XY）",
    examples: "避難所一覧、施設台帳、観測点",
    notes: "住所ジオコーディングが必要な場合は Geocoding Service を利用。",
  },
  {
    format: "KML / KMZ",
    examples: "既存の可視化資産、外部配布データ",
    notes: "取り込みは容易だが、属性設計は Hosted Feature Layer 化後に見直し推奨。",
  },
  {
    format: "File Geodatabase / CAD / Imagery",
    examples: "自治体既存 GIS、設計図、航空写真",
    notes: "ArcGIS Pro 経由の公開が安定。大容量ラスタは Tile Layer 化を検討。",
  },
];

const pathRows: PathRow[] = [
  {
    path: "A. ArcGIS Online に直接アップロード",
    tool: "ArcGIS Online（ブラウザ）",
    flow: "コンテンツ > アイテムの追加 > ファイルをアップロード > Hosted Feature Layer として公開",
    fit: "まず地図資産を作りたいときの最短ルート。PoC に最適。",
  },
  {
    path: "B. ArcGIS Pro で整備して公開",
    tool: "ArcGIS Pro",
    flow: "データ追加 > 座標系・属性を整備 > 共有 > Web レイヤとして ArcGIS Online へ公開",
    fit: "複雑な編集、ジオメトリ修正、大規模データの品質管理が必要な場合（詳細は ArcGIS Pro ページ）。",
  },
  {
    path: "C. Experience Builder でアプリ化",
    tool: "Experience Builder",
    flow: "公開済み Web マップ / Feature Layer をウィジェットに割り当て > フィルタ・画面遷移を設計",
    fit: "ノーコードで部門向けポータルを作る場合。",
  },
  {
    path: "D. Maps SDK for JavaScript で組み込み",
    tool: "Next.js + ArcGIS Maps SDK",
    flow: "FeatureLayer / MapImageLayer の URL を指定 > 2D/3D ビューに追加 > 条件で表示切替",
    fit: "シミュレーション画面などカスタム UI が必要な場合。",
  },
];

export default function ArcGisImportPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">GIS情報を ArcGIS アプリに取り込む方法</h2>
      <p className="text-gray-700 leading-7 mb-8 max-w-4xl">
        ハザードマップや施設データなどの GIS 情報を、ArcGIS Online・Experience Builder・Maps SDK で使える形にする手順を整理します。
        典型的な構成では、最終的に <span className="font-semibold">Hosted Feature Layer の URL</span> を
        Next.js（Web 地図画面）から読み込みます（詳細は
        <Link href="/training/arcgis/layer" className="text-teal-600 underline mx-0.5">
          レイヤーページ
        </Link>
        ）。
      </p>

      <div className="space-y-8">
        <section id="overview" className="scroll-mt-28 bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">取り込みの全体像（左 → 右）</h3>
          <div className="overflow-x-auto pb-1">
            <div className="flex items-stretch gap-1 min-w-[780px] text-xs">
              {[
                { t: "GIS 原データ", d: "shp / GeoJSON / CSV", c: "bg-slate-100 border-slate-300" },
                { t: "整備・公開", d: "AGOL / Pro", c: "bg-cyan-50 border-cyan-300" },
                { t: "Hosted Layer", d: "Feature / Tile", c: "bg-emerald-50 border-emerald-300" },
                { t: "Web マップ", d: "レイヤ重ね合わせ", c: "bg-sky-50 border-sky-300" },
                { t: "アプリ", d: "ExB / SDK", c: "bg-violet-50 border-violet-300" },
              ].map((s, i, arr) => (
                <div key={s.t} className="flex items-stretch flex-1">
                  <div className={`border rounded-lg p-2.5 flex-1 ${s.c}`}>
                    <div className="font-bold text-gray-800">{s.t}</div>
                    <div className="text-gray-600 mt-0.5">{s.d}</div>
                  </div>
                  {i < arr.length - 1 ? (
                    <span className="flex items-center px-1 text-slate-400 font-bold">→</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-4 leading-6">
            ポイントは、生データをそのままアプリに載せるのではなく、
            <span className="font-semibold text-slate-800"> ArcGIS Online 上のレイヤ資産</span>
            として一度公開し、URL / レイヤ ID でアプリから参照することです。
          </p>
        </section>

        <section id="formats" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. 取り込み前に確認するデータ形式</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">形式</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">例（防災・都市 GIS）</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">注意点</th>
                </tr>
              </thead>
              <tbody>
                {formatRows.map((row) => (
                  <tr key={row.format} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{row.format}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.examples}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="paths" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. 取り込み経路の選び方</h3>
          <div className="space-y-4">
            {pathRows.map((row) => (
              <div key={row.path} className="border border-gray-200 rounded-xl p-5">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h4 className="font-semibold text-gray-800">{row.path}</h4>
                  <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full">{row.tool}</span>
                </div>
                <p className="text-sm text-gray-600 leading-6 mb-2">{row.flow}</p>
                <p className="text-sm text-teal-700">
                  <span className="font-semibold">向くケース：</span>
                  {row.fit}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="agol" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">3. ArcGIS Online への取り込み（基本手順）</h3>
          <p className="text-sm text-gray-600 leading-6 mb-4">
            ブラウザだけで GIS データを Hosted Feature Layer 化する最短手順です。
          </p>
          <ol className="space-y-3 text-sm text-gray-700 leading-6 list-decimal list-inside">
            <li>
              <span className="font-semibold text-gray-800">コンテンツ</span> タブを開き、
              <span className="font-semibold"> アイテムの追加 &gt; ファイルから</span> を選択
            </li>
            <li>Shapefile（ZIP）や GeoJSON をアップロードし、<span className="font-semibold">ホストされたフィーチャレイヤ</span>として公開</li>
            <li>座標系（WKID）と属性フィールド名を確認。必要ならフィールド別名・表示名を整備</li>
            <li>
              <span className="font-semibold">Web マップ</span>を新規作成し、公開したレイヤを追加して保存
            </li>
            <li>共有範囲（組織内 / グループ）とタグ・メタデータを設定</li>
            <li>レイヤの <span className="font-mono text-xs">REST URL</span> を控え、後段のアプリから参照</li>
          </ol>
          <div className="mt-4 bg-gray-900 text-green-300 rounded-lg p-4 text-xs leading-relaxed overflow-auto">
            {`// Maps SDK for JavaScript での参照例
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const tsunamiLayer = new FeatureLayer({
  url: "https://services.arcgis.com/.../FeatureServer/0",
  outFields: ["*"],
  popupEnabled: true,
});

map.add(tsunamiLayer);`}
          </div>
        </section>

        <section id="exb" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">4. Experience Builder での利用</h3>
          <ol className="space-y-2 text-sm text-gray-700 leading-6 list-decimal list-inside">
            <li>Experience Builder で新規エクスペリエンスを作成</li>
            <li>Map ウィジェットに ArcGIS Online の Web マップを割り当て</li>
            <li>Filter / Query / List ウィジェットで災害種別・区域などの条件 UI を実装</li>
            <li>ページ遷移で「一覧 &gt; 詳細 &gt; 地図」の業務導線を設計</li>
            <li>公開後、URL を関係者に共有（組織ポータル内）</li>
          </ol>
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-4">
            カスタム UI（Next.js + Maps SDK）を採用する場合、Experience Builder は必須ではありませんが、
            PoC や部門向け簡易画面の試作には有効です。
          </p>
        </section>

        <section id="qa" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">5. 品質チェック（取り込み後に必ず実施）</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              { t: "座標系", b: "JGD2011 / EPSG:6668 など意図した WKID か。位置ずれがないか。" },
              { t: "ジオメトリ", b: "ポリゴン閉合、自己交差、ヌル地物がないか。" },
              { t: "属性", b: "フィールド名・型・コード値（災害種別等）が仕様と一致するか。" },
              { t: "表示性能", b: "件数が多い場合は簡略化、LOD、タイルレイヤ化を検討。" },
              { t: "権限", b: "公開範囲・グループ・ロールが要件どおりか。" },
              { t: "更新運用", b: "差分更新手順、版管理、更新頻度（日次/訓練前）を決める。" },
            ].map((item) => (
              <div key={item.t} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="font-semibold text-gray-800 mb-1">{item.t}</div>
                <div className="text-gray-600 leading-6">{item.b}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="example" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">6. 防災 GIS の実装例</h3>
          <ul className="space-y-2 text-sm text-gray-700 leading-6">
            <li>・津波浸水想定・震度分布・噴火降灰・風水害などを ArcGIS Pro で整備し、Hosted Feature Layer として公開</li>
            <li>・条件 UI（災害種別・規模）に応じて、表示するレイヤを Maps SDK で動的切替</li>
            <li>・Snowflake 連携が必要になった場合は <Link href="/training/snowflake-arcgis" className="text-teal-600 underline">Snowflake × ArcGIS 連携</Link> を参照</li>
            <li>・地図表示は ArcGIS、RAG・分析は Snowflake と分担する構成が一般的</li>
          </ul>
        </section>

        <section className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">まとめ</h3>
          <p className="text-slate-200 leading-7 mb-4 max-w-4xl">
            GIS 情報の取り込みは「ファイルをアップロードして Hosted Feature Layer 化し、Web マップ / アプリから URL 参照する」流れが基本です。
            データ形式と座標系を先に揃えると、後工程（Experience Builder・Maps SDK）が安定します。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/training/arcgis"
              className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              ArcGIS 概要へ ←
            </Link>
            <Link
              href="/training/snowflake-arcgis"
              className="inline-flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Snowflake 連携へ →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
