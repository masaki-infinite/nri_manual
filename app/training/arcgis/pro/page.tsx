import Link from "next/link";
import ProEnterpriseRelationDiagram from "../ProEnterpriseRelationDiagram";

type CompareRow = {
  aspect: string;
  pro: string;
  online: string;
};

type TaskRow = {
  task: string;
  whyPro: string;
  output: string;
};

const compareRows: CompareRow[] = [
  {
    aspect: "製品形態",
    pro: "Windows 向けデスクトップ GIS アプリ（インストール型）",
    online: "ブラウザで使うクラウド GIS プラットフォーム",
  },
  {
    aspect: "主な用途",
    pro: "データ編集、解析、品質管理、高度な地図作成",
    online: "公開・共有・権限管理・Web マップ運用",
  },
  {
    aspect: "操作スタイル",
    pro: "GIS 専門家向け。ツール豊富で編集精度が高い",
    online: "設定中心で手軽。組織運用に最適",
  },
  {
    aspect: "大容量データ",
    pro: "ローカル処理で安定。ラスタ・3D の編集に強い",
    online: "ホスト型レイヤとして公開する前提で設計",
  },
  {
    aspect: "成果物の行き先",
    pro: "整備したデータを ArcGIS Online / Enterprise へ共有",
    online: "Web マップ・アプリ・API として利用者へ提供",
  },
  {
    aspect: "実装例での位置づけ",
    pro: "ハザードマップ整備・座標系修正など前処理（任意）",
    online: "Feature Layer 公開と Maps SDK 参照の基盤",
  },
];

const taskRows: TaskRow[] = [
  {
    task: "Shapefile / GDB の取り込みと属性整備",
    whyPro: "フィールド型・コード値・ジオメトリ修正を一括で行える",
    output: "品質を担保したローカル GIS データ",
  },
  {
    task: "座標系変換（例: 平面直角 → JGD2011）",
    whyPro: "変換定義を確認しながら安全に実施できる",
    output: "位置ずれのないレイヤ",
  },
  {
    task: "複数レイヤの重ね合わせ・スタイル設計",
    whyPro: "本番表示に近い見え方をデスクトップで検証できる",
    output: "Web マップ作成前の設計モデル",
  },
  {
    task: "ジオプロセシング（バッファ、クリップ、集計）",
    whyPro: "防災シミュレーション前処理を再現可能な手順として残せる",
    output: "解析済み Feature Class",
  },
  {
    task: "ArcGIS Online への公開",
    whyPro: "「共有」から Hosted Feature Layer を直接発行できる",
    output: "アプリが参照する REST URL",
  },
];

export default function ArcGisProPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">ArcGIS Pro とは？</h2>
      <p className="text-gray-700 leading-7 mb-8 max-w-4xl">
        ArcGIS Pro は、Esri が提供する <span className="font-semibold">デスクトップ GIS アプリケーション</span>です。
        地図作成・データ編集・空間解析を高精度で行い、整備したデータを ArcGIS Online へ公開する
        「制作・品質管理の作業場」として使われます。必須ではありませんが、
        GIS データの前処理や検証に使うと後工程が安定します。
      </p>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span>🖥️</span>
            デスクトップ GIS
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">ひとことで言うと</h3>
          <p className="text-slate-700 leading-7 max-w-4xl">
            ArcGIS Online が「地図資産の運用・公開の場」だとすると、
            ArcGIS Pro は「その前にデータを丁寧に作る・直す・解析する場」です。
            Photoshop と CMS の関係に近く、
            <span className="font-semibold text-slate-900"> Pro で整備 → Online で公開 → アプリで利用</span>
            という流れが基本になります。
          </p>
        </section>

        <section>
          <ProEnterpriseRelationDiagram />
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">ArcGIS Pro の主な機能</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "🗺️",
                title: "マップ・シーン作成",
                body: "2D マップと 3D シーンを同一プロジェクトで管理。本番表示の試作に使える。",
              },
              {
                icon: "✏️",
                title: "データ編集",
                body: "ポイント/ライン/ポリゴンの作成・修正、属性編集、トポロジ検証に対応。",
              },
              {
                icon: "🧮",
                title: "空間解析",
                body: "バッファ、オーバーレイ、近接分析など GIS 解析ツールを GUI で実行。",
              },
              {
                icon: "📦",
                title: "多形式の読み込み",
                body: "Shapefile、File GDB、CAD、ラスタ、表データなど幅広い形式に対応。",
              },
              {
                icon: "☁️",
                title: "Online への共有",
                body: "整備済みレイヤを Hosted Feature Layer / Tile Layer として公開できる。",
              },
              {
                icon: "🐍",
                title: "自動化（任意）",
                body: "Python（ArcPy）や ModelBuilder で繰り返し作業を定型化できる。",
              },
            ].map((item) => (
              <div key={item.title} className="border border-gray-200 rounded-xl p-5 bg-slate-50/50">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-6">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">ArcGIS Pro と ArcGIS Online の違い</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">観点</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">ArcGIS Pro</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">ArcGIS Online</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.aspect} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{row.aspect}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.pro}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.online}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">ArcGIS Pro が向いている作業</h3>
          <div className="space-y-3">
            {taskRows.map((row) => (
              <div key={row.task} className="border border-gray-200 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-1">{row.task}</h4>
                <p className="text-sm text-gray-600 leading-6 mb-1">
                  <span className="font-semibold text-indigo-700">Pro を使う理由：</span>
                  {row.whyPro}
                </p>
                <p className="text-sm text-teal-700">
                  <span className="font-semibold">成果物：</span>
                  {row.output}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">典型的な作業フロー（Pro → Online → アプリ）</h3>
          <div className="overflow-x-auto pb-1 mb-4">
            <div className="flex items-stretch gap-1 min-w-[700px] text-xs">
              {[
                { t: "原データ取得", d: "自治体/国交省データ", c: "bg-slate-100 border-slate-300" },
                { t: "ArcGIS Pro", d: "整備・解析", c: "bg-indigo-50 border-indigo-300" },
                { t: "共有", d: "Hosted Layer", c: "bg-cyan-50 border-cyan-300" },
                { t: "ArcGIS Online", d: "Web マップ", c: "bg-sky-50 border-sky-300" },
                { t: "アプリ", d: "ExB / Maps SDK", c: "bg-violet-50 border-violet-300" },
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
          <ol className="space-y-2 text-sm text-gray-700 leading-6 list-decimal list-inside">
            <li>Pro でプロジェクトを作成し、データを追加（座標系を確認）</li>
            <li>属性・ジオメトリを編集し、表示スタイルを調整</li>
            <li>必要ならジオプロセシングで解析レイヤを作成</li>
            <li>
              <span className="font-semibold">共有</span> タブから ArcGIS Online 組織へ Web レイヤとして公開
            </li>
            <li>Online 上で Web マップ化し、Experience Builder または Maps SDK から参照</li>
          </ol>
          <p className="text-sm text-gray-600 mt-4">
            ブラウザのみで完結させる手順は
            <Link href="/training/arcgis/import" className="text-cyan-600 underline mx-1">
              GIS 取り込みページ
            </Link>
            を参照してください。
          </p>
        </section>

        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">ライセンスと導入の注意</h3>
          <ul className="space-y-2 text-sm text-gray-700 leading-6">
            <li>・ArcGIS Pro は通常、<span className="font-semibold">Named User ライセンス</span>（ArcGIS Online / Enterprise アカウントと紐づく）で利用</li>
            <li>・Windows PC が必要（macOS では直接利用不可。仮想環境やリモートデスクトップは要検討）</li>
            <li>・Online だけで十分なケースも多い。Pro は「データ品質が重要」「複雑な前処理がある」場合に導入</li>
            <li>・Web 地図画面は最終的に Maps SDK で表示するため、Pro は前処理担当、Online / Enterprise は公開基盤という分担が現実的</li>
          </ul>
        </section>

        <section className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">まとめ</h3>
          <p className="text-slate-200 leading-7 mb-4 max-w-4xl">
            ArcGIS Pro は、GIS データを「正しく作る・直す・解析する」デスクトップツールです。
            ArcGIS Online や Maps SDK と組み合わせることで、ハザードマップなどの品質を担保しながら
            Web アプリへ載せる流れを作れます。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/training/arcgis/import"
              className="inline-flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              GIS 取り込みへ →
            </Link>
            <Link
              href="/training/arcgis"
              className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              ArcGIS 概要へ ←
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
