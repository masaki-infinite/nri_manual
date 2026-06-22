import Link from "next/link";

type MethodRow = {
  method: string;
  flow: string;
  pros: string;
  cautions: string;
  recommendedFor: string;
};

type StepRow = {
  step: string;
  task: string;
  output: string;
};

const methodRows: MethodRow[] = [
  {
    method: "A. バッチ連携（最初の一歩）",
    flow: "Snowflakeテーブル -> 定期抽出(CSV/GeoJSON) -> ArcGIS Hosted Feature Layer更新",
    pros: "実装がシンプルでPoC向き。運用チームに引き継ぎやすい。",
    cautions: "リアルタイム性は低い。更新間隔の設計が必要。",
    recommendedFor: "日次/週次更新で十分な業務ダッシュボード",
  },
  {
    method: "B. API連携（準リアルタイム）",
    flow: "Snowflakeで集約ビュー作成 -> API化 -> ArcGISから参照/同期",
    pros: "鮮度を上げやすく、業務イベントに追従しやすい。",
    cautions: "API監視、エラーハンドリング、認証設計が必要。",
    recommendedFor: "防災・交通など更新頻度が高い用途",
  },
  {
    method: "C. Snowpark/SPCS連携（高度要件）",
    flow: "Snowpark/SPCSで変換・空間前処理 -> ArcGISレイヤへ配信",
    pros: "複雑な前処理・推論・ワークフローを統合できる。",
    cautions: "開発・運用の難易度が上がる。チーム体制が必要。",
    recommendedFor: "高度分析・AI併用・大規模連携案件",
  },
  {
    method: "D. ハイブリッド（推奨）",
    flow: "基幹データはバッチ、重要データはAPI連携で段階的に構成",
    pros: "コスト、速度、保守性のバランスが良い。",
    cautions: "データ責務分割と監査方針を最初に明確化する必要。",
    recommendedFor: "本番を見据えた中長期導入",
  },
];

const stepRows: StepRow[] = [
  {
    step: "1. ユースケース整理",
    task: "誰が・何を・どの頻度で見るかを定義し、更新SLAを決める",
    output: "要件定義書（鮮度/精度/セキュリティ）",
  },
  {
    step: "2. データモデル整備",
    task: "Snowflake側で空間キー、座標、属性、履歴を正規化",
    output: "連携対象テーブル/ビュー仕様",
  },
  {
    step: "3. 連携方式選定",
    task: "バッチ/API/SPCSのどれで連携するかを業務要件で決定",
    output: "連携アーキテクチャ案",
  },
  {
    step: "4. ArcGIS実装",
    task: "Hosted Feature Layer、Scene Layer、Experience Builder/SDK画面を構築",
    output: "利用者向け画面プロトタイプ",
  },
  {
    step: "5. 運用設計",
    task: "ジョブ監視、障害通知、データ品質チェック、監査ログを整備",
    output: "運用Runbookと監視ダッシュボード",
  },
  {
    step: "6. 展開",
    task: "部門PoC -> 横展開の順で導入し、KPIで効果を評価",
    output: "展開計画書と効果測定レポート",
  },
];

export default function SnowflakeArcGisTrainingPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Snowflake × ArcGIS 接続開発方法</h2>
      <p className="text-gray-700 leading-7 mb-4 max-w-4xl">
        SnowflakeとArcGISを接続する方法は1つではありません。更新頻度、運用体制、セキュリティ要件に応じて
        連携方式を選ぶことが重要です。本ページでは、実務で使いやすい方式と進め方を整理します。
      </p>
      <p className="text-sm text-sky-800 bg-sky-50 border border-sky-200 rounded-lg px-4 py-3 mb-8 max-w-4xl leading-6">
        <span className="font-semibold">典型的な Phase 1 では GIS データは ArcGIS Pro で管理</span>し、Hosted Feature Layer として配信します。
        Snowflake への GIS 格納は開発初期には不要なことが多いです。文書・業務データとの統合が必要になった段階で、本ページの連携方式を検討してください。
      </p>

      <div className="space-y-8">
        {/* ===== Snowflake の限界 ===== */}
        <section id="snowflake-limits" className="scroll-mt-28 bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span>⚠️</span>
            Snowflake だけでは限界がある領域
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-2">ArcGIS でしかできないこと</h3>
          <p className="text-slate-600 text-sm leading-7 mb-5 max-w-3xl">
            Snowflake は SQL・データ加工・AI/ML に優れますが、<strong>地図描画・GIS 専門作業・ノーコード可視化</strong>
            の領域はネイティブに対応しておらず、ArcGIS が不可欠になります。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              {
                icon: "🌐",
                title: "WebGL ベース高品質地図描画",
                snowflake: "地図描画エンジンを持たない。ST_ASGEOJSON で座標を取り出せるだけで、ブラウザに地図として描画する仕組みがない。",
                arcgis: "ArcGIS Maps SDK for JavaScript が WebGL で 2D/3D マップをネイティブ描画。衛星画像・ハザードマップ・標高を重ね合わせ、ズーム/回転も即時。",
              },
              {
                icon: "📐",
                title: "GIS 専門ツール（ArcGIS Pro）",
                snowflake: "SQL で空間演算はできるが、トポロジー検証・投影変換・ジオプロセシングパイプラインを GUI で組む手段がない。",
                arcgis: "ArcGIS Pro でシェープファイル整備・投影変換・Network Analyst（最短ルート・サービス圏）・ラスタ解析を専門 GUI で実行できる。",
              },
              {
                icon: "🛠️",
                title: "ノーコード地図アプリ作成",
                snowflake: "フロントエンドは別途自前実装が必要。ノーコードの地図アプリ作成ツールは存在しない。",
                arcgis: "Experience Builder・StoryMaps・Dashboard でノーコードのインタラクティブ地図アプリを作成・公開できる。IT スキルなしで利用者に届けられる。",
              },
              {
                icon: "🗂️",
                title: "組織単位のコンテンツ共有（Portal）",
                snowflake: "データは共有できても、地図レイヤー・スタイル・ポップアップ設定ごとパッケージして組織共有する仕組みがない。",
                arcgis: "Portal for ArcGIS / ArcGIS Online で地図コンテンツをグループ・組織単位でアクセス制御し、共有・バージョン管理できる。",
              },
              {
                icon: "📡",
                title: "Hosted Feature Layer（REST 配信）",
                snowflake: "テーブルをそのまま REST GeoJSON として外部に安全配信する仕組みがない（別途 API 実装が必要）。",
                arcgis: "Feature Layer を Portal にホストするだけで REST エンドポイントが自動生成。クライアントは SDK 1行で参照でき、権限も Portal で制御。",
              },
              {
                icon: "📱",
                title: "オフライン編集（Field Maps）",
                snowflake: "モバイルオフライン編集・現地調査フォームを提供しない。",
                arcgis: "ArcGIS Field Maps でモバイルオフライン編集が可能。現地でデータを収集し、ネットワーク復帰時に Portal へ同期できる。",
              },
              {
                icon: "🌍",
                title: "Living Atlas（Esri 公式データ）",
                snowflake: "行政境界・人口統計・衛星画像等を即座に重ねる仕組みがない。Marketplace からは別途購入が必要。",
                arcgis: "Living Atlas of the World から世界の行政境界・人口・ハザード・衛星画像・気候データを即座に追加できる（ライセンス範囲内で無償）。",
              },
              {
                icon: "🔄",
                title: "リアルタイムストリーミング（Velocity）",
                snowflake: "ストリームインジェストは可能だが、地図へのリアルタイム反映エンジンを持たない。",
                arcgis: "ArcGIS Velocity でセンサー・IoT データをリアルタイムに取り込み、地図上でアニメーション・アラート表示できる。",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-rose-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{item.icon}</span>
                  <h4 className="font-semibold text-slate-900">{item.title}</h4>
                </div>
                <div className="space-y-2 text-xs leading-5">
                  <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    <span className="font-semibold text-red-700">Snowflake の限界: </span>
                    <span className="text-red-800">{item.snowflake}</span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                    <span className="font-semibold text-emerald-700">ArcGIS でできること: </span>
                    <span className="text-emerald-800">{item.arcgis}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 連携メリット ===== */}
        <section id="integration-benefits" className="scroll-mt-28 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span>✨</span>
            連携メリット
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-2">連携することで得られるメリット</h3>
          <p className="text-slate-600 text-sm leading-7 mb-5 max-w-3xl">
            Snowflake（データ基盤・AI）と ArcGIS（地図・GIS）はそれぞれ得意領域が異なります。
            組み合わせることで「<strong>大規模データ処理 × リッチな地図表現</strong>」を同時に実現できます。
          </p>

          {/* 役割分担図 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 text-sm text-center">
            <div className="bg-sky-100 border border-sky-300 rounded-xl p-4">
              <div className="text-2xl mb-1">❄️</div>
              <div className="font-bold text-sky-900 mb-2">Snowflake が担う</div>
              <ul className="text-sky-800 text-xs space-y-1 text-left list-disc pl-4">
                <li>大量データの格納・SQL 集計</li>
                <li>Cortex AI（RAG・予測・分類）</li>
                <li>属性データの更新・管理</li>
                <li>コスト効率の高いデータ基盤</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-center items-center">
              <div className="text-3xl mb-2">🔗</div>
              <div className="font-bold text-gray-700">API / バッチ / SPCS</div>
              <div className="text-xs text-gray-500 mt-1">で連携</div>
            </div>
            <div className="bg-violet-100 border border-violet-300 rounded-xl p-4">
              <div className="text-2xl mb-1">🗺️</div>
              <div className="font-bold text-violet-900 mb-2">ArcGIS が担う</div>
              <ul className="text-violet-800 text-xs space-y-1 text-left list-disc pl-4">
                <li>2D/3D 地図描画（WebGL）</li>
                <li>ノーコードアプリ公開</li>
                <li>Living Atlas データ追加</li>
                <li>Portal 組織共有・権限管理</li>
              </ul>
            </div>
          </div>

          {/* メリット一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              {
                icon: "🚀",
                title: "AI 分析結果を地図に即反映",
                body: "Snowflake Cortex でリスク予測・異常検知を行い、その結果を ArcGIS Feature Layer に同期。地図上で AI のアウトプットを直感的に確認できる。",
              },
              {
                icon: "💾",
                title: "既存 GIS 資産をそのまま活用",
                body: "ArcGIS Pro で整備した GIS データ・Portal の権限設定・Dashboard をそのまま維持しつつ、Snowflake 側の属性データだけを追加できる。移行コストが低い。",
              },
              {
                icon: "📊",
                title: "業務データ × 地理の統合分析",
                body: "ERPや業務システムのデータを Snowflake に集約し、住所・座標で地理結合。「売上の地域分布」「工場周辺のリスク」など地理軸の分析が可能になる。",
              },
              {
                icon: "🔒",
                title: "セキュリティの役割分離",
                body: "Snowflake 側で行レベルセキュリティ・マスキングを行い、ArcGIS 側で Portal のグループ権限で地図アクセスを制御。二重のガバナンスが成立する。",
              },
              {
                icon: "⚡",
                title: "リアルタイム更新と地図の同期",
                body: "Snowflake へのデータ更新を API 連携で ArcGIS Feature Layer に伝播させることで、地図が常に最新状態を反映。防災・交通管理に有効。",
              },
              {
                icon: "📉",
                title: "コスト最適化（役割に応じた選択）",
                body: "大量の属性データは Snowflake の分離コンピューティングで格安管理し、表示用の軽量 GeoJSON のみ ArcGIS に渡す。ストレージと処理を最適配置できる。",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-indigo-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.icon}</span>
                  <h4 className="font-semibold text-indigo-900">{item.title}</h4>
                </div>
                <p className="text-gray-700 leading-6 text-xs">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="design-policy" className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">設計の基本方針</h3>
          <ul className="space-y-2 text-slate-700 leading-7">
            <li>・Phase 1：GIS のマスタは ArcGIS Pro、配信は Hosted Feature Layer（Snowflake 不要）</li>
            <li>・Phase 2 以降：必要に応じて Snowflake に GIS mart を置き、ArcGIS へ同期する拡張を検討</li>
            <li>・連携を入れる場合は、更新頻度・監査・障害時復旧を最初に設計しておく</li>
          </ul>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">連携方式の比較</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">方式</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">データフロー</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">メリット</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">注意点</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">向いている案件</th>
                </tr>
              </thead>
              <tbody>
                {methodRows.map((row) => (
                  <tr key={row.method} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.method}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.flow}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.pros}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.cautions}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.recommendedFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">実装ステップ（推奨）</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">ステップ</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">作業</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">成果物</th>
                </tr>
              </thead>
              <tbody>
                {stepRows.map((row) => (
                  <tr key={row.step} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{row.step}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.task}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">実務での推奨</h3>
          <p className="text-slate-200 leading-7 mb-4 max-w-4xl">
            まずはバッチ連携で早く価値を出し、重要ユースケースからAPI連携へ拡張するハイブリッド方式が、
            速度・保守性・将来拡張のバランスに優れます。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-white/10 px-4 py-3">・短期PoCと本番移行を両立しやすい</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・運用チームに引き継ぎやすい</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・要件拡張に段階対応できる</div>
          </div>
        </section>
      </div>
    </div>
  );
}
