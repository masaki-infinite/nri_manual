import Link from "next/link";

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

      <h2 className="text-3xl font-bold text-gray-800 mb-4">ArcGIS 勉強会資料</h2>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">ArcGIS Onlineとは</h3>
          <p className="text-slate-700 leading-7 mb-4">
            ArcGIS Onlineは、地理空間データをクラウドで管理・共有・可視化するためのGISプラットフォームです。
            Webマップや3Dシーン、ホスト型レイヤ管理、権限制御を一体で運用できるため、
            部門横断で地図データを活用する基盤として使われます。
          </p>
          <ul className="space-y-2 text-slate-700 leading-7">
            <li>・地図データの登録、更新、公開範囲設定をブラウザで実施</li>
            <li>・組織単位のアクセス制御（グループ、ロール）に対応</li>
            <li>・ダッシュボードやアプリ開発ツールとネイティブ連携</li>
          </ul>
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
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">ArcGIS Online と Experience Builder の違い</h3>
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
