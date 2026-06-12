import Link from "next/link";

type CompareRow = {
  item: string;
  python: string;
  javascript: string;
};

type UseCaseRow = {
  title: string;
  description: string;
  example: string;
};

const compareRows: CompareRow[] = [
  {
    item: "正式名称",
    python: "ArcGIS API for Python（パッケージ名: arcgis）",
    javascript: "ArcGIS Maps SDK for JavaScript（@arcgis/core）",
  },
  {
    item: "実行環境",
    python: "Python 3.x（サーバー・バッチ・Jupyter・Pro 内）",
    javascript: "Web ブラウザ（クライアント JavaScript）",
  },
  {
    item: "主な用途",
    python: "Portal / Enterprise の自動化、データ入出力、一括更新、スクリプト解析",
    javascript: "地図 UI の表示・操作・レイヤ切替",
  },
  {
    item: "実装例での役割",
    python: "運用バッチ・データ整備の補助（必須ではない）",
    javascript: "Web 地図画面の表示（必須）",
  },
  {
    item: "認証",
    python: "ユーザー名/パスワード、OAuth、証明書（Portal 管理者向け）",
    javascript: "公開 Feature Layer URL または Portal トークン（アプリ設計次第）",
  },
];

const useCaseRows: UseCaseRow[] = [
  {
    title: "Hosted Feature Layer の一括公開",
    description: "Shapefile / GeoJSON をアップロードし、Portal 上にレイヤを作成・更新する",
    example: "GIS.fromitem() / FeatureLayerCollection / append / overwrite",
  },
  {
    title: "メタデータ・権限の管理",
    description: "グループ共有、タグ、説明文をスクリプトで揃える",
    example: "gis.content.search() / item.update() / item.share()",
  },
  {
    title: "空間データの前処理",
    description: "座標変換、属性結合、ジオメトリ修復を Pro の代替または補助として実行",
    example: "GeoAccessor / spatial モジュール",
  },
  {
    title: "定期同期ジョブ",
    description: "外部 DB やファイルと Enterprise レイヤの差分更新（Phase 2 拡張向け）",
    example: "スケジューラ + arcgis + Snowflake 出力 CSV の組み合わせ",
  },
  {
    title: "Notebook での検証",
    description: "レイヤ品質チェック、サンプルクエリ、PoC 用の可視化（matplotlib 等）",
    example: "ArcGIS Pro の Notebook または Jupyter",
  },
];

export default function MapsSdkPythonPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">ArcGIS API for Python とは？</h2>
      <p className="text-gray-600 text-sm mb-6 max-w-4xl leading-relaxed">
        正式には <span className="font-semibold">ArcGIS API for Python</span>（
        <span className="font-mono text-xs">arcgis</span> パッケージ）と呼ばれます。
        Portal / Enterprise / Online を Python から操作し、データ公開・更新・管理を自動化するための SDK です。
        ブラウザ地図表示用の Maps SDK for JavaScript とは役割が異なります。
      </p>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-lime-50 to-emerald-50 border border-lime-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-lime-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span>🐍</span>
            サーバー / バッチ向け
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">
            「地図を見せる」ではなく「Portal / Enterprise を操作する」
          </h3>
          <p className="text-slate-700 leading-7 max-w-4xl">
            JavaScript 版がエンドユーザーのブラウザでの表示を担うのに対し、Python 版は
            GIS 管理者・開発者がバックグラウンドでデータパイプラインや運用タスクを回すときに使います。
            ArcGIS Pro の GUI 作業をスクリプト化したり、CI/CD からレイヤ更新を流したりする用途が中心です。
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">JavaScript 版との違い</h3>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">観点</th>
                  <th className="text-left px-4 py-3 font-semibold text-lime-800">ArcGIS API for Python</th>
                  <th className="text-left px-4 py-3 font-semibold text-sky-800">Maps SDK for JavaScript</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={row.item}
                    className={`border-t border-gray-200 align-top ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">{row.item}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.python}</td>
                    <td className="px-4 py-3 text-slate-600 leading-6">{row.javascript}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">代表的なユースケース</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {useCaseRows.map((uc) => (
              <div key={uc.title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">{uc.title}</h4>
                <p className="text-sm text-gray-600 leading-6 mb-2">{uc.description}</p>
                <p className="text-xs font-mono text-lime-800 bg-lime-50 border border-lime-100 rounded px-2 py-1.5">
                  {uc.example}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">接続とレイヤ公開の最小例</h3>
          <pre className="bg-gray-900 text-green-300 rounded-lg p-4 text-xs leading-relaxed overflow-auto">{`# pip install arcgis
from arcgis.gis import GIS

# Portal / Enterprise に接続（社内ホスト）
gis = GIS("https://<portal-host>/portal", "username", "password")

# 既存アイテムの検索
items = gis.content.search("title:津波浸水想定 AND type:Feature Service", max_items=5)

# ローカル Shapefile をアップロードして Hosted Feature Layer 化
from arcgis.features import FeatureLayerCollection
item = gis.content.add({"title": "hazard_tsunami", "type": "Shapefile"}, data="./tsunami.zip")
published = item.publish())`}</pre>
          <p className="text-xs text-gray-600 mt-3 leading-relaxed">
            本番運用ではパスワード直書きを避け、シークレット管理・サービスアカウント・OAuth を使います。
            社内閉域の Portal URL は Enterprise 構築時に確定します。
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h4 className="font-semibold text-slate-800 mb-2">いつ使うか</h4>
            <ul className="text-sm text-gray-700 space-y-1.5 leading-6">
              <li>・初期開発: Pro + Portal GUI が主。Python は任意</li>
              <li>・レイヤ数が増えたときの一括更新・夜間バッチ</li>
              <li>・Snowflake mart → Enterprise 同期を自動化する Phase 2</li>
              <li>・品質チェック（件数・範囲・属性）の自動検証</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h4 className="font-semibold text-amber-900 mb-2">使わない場面</h4>
            <ul className="text-sm text-gray-700 space-y-1.5 leading-6">
              <li>・エンドユーザー向け地図 UI の表示（→ Maps SDK for JavaScript）</li>
              <li>・RAG・チャット（→ Snowflake Cortex）</li>
              <li>・Next.js BFF からの通常 API（→ snowflake-sdk）</li>
            </ul>
          </div>
        </section>

        <section className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold text-emerald-900 mb-3">関連ページ</h3>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/training/arcgis/maps-sdk-js" className="text-sky-700 hover:text-sky-900 underline">
              Maps SDK for JavaScript →
            </Link>
            <Link href="/training/arcgis/import" className="text-emerald-800 hover:text-emerald-900 underline">
              GIS 取り込み手順 →
            </Link>
            <Link href="/training/arcgis/pro" className="text-indigo-700 hover:text-indigo-900 underline">
              ArcGIS Pro →
            </Link>
            <Link href="/training/snowflake-arcgis" className="text-teal-700 hover:text-teal-900 underline">
              Snowflake × ArcGIS 連携 →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
