import Link from "next/link";
import SnowflakeSubNav from "../SnowflakeSubNav";

export default function SnowflakeGeospatialPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Snowflake で地理空間情報を見る方法</h2>
      <SnowflakeSubNav />

      <p className="text-gray-600 text-sm mb-6 max-w-4xl leading-relaxed">
        Snowflake公式ブログ「Snowflakeで地理空間インサイトを活用するための上級ガイド（CARTO連携）」をもとに、
        地理空間データの取り込み・変換・分析・可視化の実践パターンを整理します。
      </p>

      <div className="space-y-8">
        <section id="overview" className="scroll-mt-28 bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span>🗺️</span>
            Geospatial in Snowflake
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">まず押さえるべきコア機能</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-white border border-cyan-200 rounded-xl p-4">
              <div className="font-semibold text-cyan-800 mb-1">GEOGRAPHY / GEOMETRY</div>
              <p className="text-gray-700 leading-6">地球楕円体（GEOGRAPHY）と平面座標（GEOMETRY）を使い分けて、距離・包含・交差判定をSQLで実行。</p>
            </div>
            <div className="bg-white border border-cyan-200 rounded-xl p-4">
              <div className="font-semibold text-cyan-800 mb-1">H3 グリッド</div>
              <p className="text-gray-700 leading-6">位置を六角形セルに正規化して集計。解像度変更で粗視化/詳細化を切り替えやすい。</p>
            </div>
            <div className="bg-white border border-cyan-200 rounded-xl p-4">
              <div className="font-semibold text-cyan-800 mb-1">Cortex + Marketplace</div>
              <p className="text-gray-700 leading-6">Cortex COMPLETE で住所整形/感情分類、Marketplaceデータでジオコーディングや外部特徴量を補完。</p>
            </div>
          </div>
        </section>

        {/* ===== データ型・ファイル形式 ===== */}
        <section id="data-types" className="scroll-mt-28 bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span>📦</span>
            Data Types &amp; Formats
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">どんな地理空間情報を格納できる？ファイル形式は？</h3>

          {/* --- 格納できる地理データ型 --- */}
          <h4 className="text-base font-semibold text-violet-800 mb-3">■ 格納できるジオメトリ型</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-6">
            {[
              {
                label: "GEOGRAPHY",
                badge: "球面（WGS84）",
                desc: "緯度・経度で地球楕円体上に定義する型。現実世界の距離・面積計算に使う。国土・移動履歴・施設位置など実地理データの標準。",
                ex: "TO_GEOGRAPHY('POINT(139.69 35.68)')",
              },
              {
                label: "GEOMETRY",
                badge: "平面座標",
                desc: "デカルト座標系（投影座標）。CAD図面・都市計画の局所エリア・ゲームマップなど平面精度が必要な場面で使う。",
                ex: "TO_GEOMETRY('POLYGON((0 0,1 0,1 1,0 0))')",
              },
            ].map((t) => (
              <div key={t.label} className="bg-white border border-violet-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-violet-900">{t.label}</span>
                  <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">{t.badge}</span>
                </div>
                <p className="text-gray-700 leading-6 mb-2">{t.desc}</p>
                <pre className="bg-gray-900 text-green-300 rounded px-3 py-2 text-xs overflow-auto">{t.ex}</pre>
              </div>
            ))}
          </div>

          {/* --- サブタイプ --- */}
          <h4 className="text-base font-semibold text-violet-800 mb-3">■ 格納できるシェイプ（サブタイプ）</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-xs text-center mb-6">
            {[
              { icon: "⚫", name: "POINT", desc: "点（施設・センサー位置）" },
              { icon: "〰️", name: "LINESTRING", desc: "線（道路・河川・経路）" },
              { icon: "⬡", name: "POLYGON", desc: "面（行政区・建物・湖）" },
              { icon: "⚫⚫", name: "MULTI系", desc: "MULTIPOINT / LINE / POLYGON" },
              { icon: "🗂️", name: "COLLECTION", desc: "GEOMETRYCOLLECTION（複合）" },
            ].map((s) => (
              <div key={s.name} className="bg-white border border-violet-200 rounded-xl p-3">
                <div className="text-lg mb-1">{s.icon}</div>
                <div className="font-semibold text-violet-900 mb-1">{s.name}</div>
                <div className="text-gray-600">{s.desc}</div>
              </div>
            ))}
          </div>

          {/* --- ファイル形式 --- */}
          <h4 className="text-base font-semibold text-violet-800 mb-3">■ 対応ファイル形式（取り込み・書き出し）</h4>
          <div className="overflow-x-auto rounded-xl border border-violet-200 mb-4">
            <table className="min-w-full text-sm">
              <thead className="bg-violet-100">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-violet-900">形式</th>
                  <th className="text-left px-4 py-2 font-semibold text-violet-900">種別</th>
                  <th className="text-left px-4 py-2 font-semibold text-violet-900">主な用途</th>
                  <th className="text-left px-4 py-2 font-semibold text-violet-900">Snowflake 取り込み関数</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["GeoJSON", "ベクタ（JSON）", "Web API・Mapbox・Leaflet 連携", "TO_GEOGRAPHY() / ST_GEOGRAPHYFROMGEOJSON()"],
                  ["WKT（Well-Known Text）", "ベクタ（テキスト）", "DB 間データ交換・人が読みやすい", "ST_GEOGRAPHYFROMWKT() / TO_GEOGRAPHY()"],
                  ["WKB（Well-Known Binary）", "ベクタ（バイナリ）", "高速ストレージ・処理、GIS ソフト連携", "ST_GEOGRAPHYFROMWKB()"],
                  ["CSV（緯度・経度列）", "表形式", "最も一般的な取り込み元。COPY INTO 使用", "ST_POINT(lon_col, lat_col)"],
                  ["Shapefile (.shp)", "ベクタ（バイナリ）", "ESRI 標準。ArcGIS・QGIS のネイティブ形式", "pyshp 等で GeoJSON 変換後に取り込み"],
                  ["GeoTIFF (.tif)", "ラスター（画像）", "衛星画像・標高（DEM）・土地利用", "外部ステージから Python/Snowpark で処理"],
                  ["GeoParquet (.parquet)", "カラム型", "大量ベクタの高速バルクロード", "COPY INTO（Parquet）後 TO_GEOGRAPHY()"],
                  ["KML / KMZ", "ベクタ（XML）", "Google Earth・行政が配布する境界データ", "XML → WKT 変換後に TO_GEOGRAPHY()"],
                  ["GeoPackage (.gpkg)", "ベクタ（SQLite）", "OfflineGIS・QGIS 出力", "ogr2ogr で GeoJSON 変換後に取り込み"],
                  ["PostGIS / 他 DB", "DB 接続", "既存 GIS DB からの移行・CDC", "Snowpipe / Kafka Connector 経由"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-violet-100 hover:bg-violet-50">
                    <td className="px-4 py-2 font-medium text-slate-900">{row[0]}</td>
                    <td className="px-4 py-2 text-slate-700">{row[1]}</td>
                    <td className="px-4 py-2 text-slate-700">{row[2]}</td>
                    <td className="px-4 py-2 text-slate-600 font-mono text-xs">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- ベクタ vs ラスター --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-white border border-violet-200 rounded-xl p-4">
              <h5 className="font-semibold text-violet-900 mb-2">ベクタデータ（Snowflake 得意領域）</h5>
              <p className="text-gray-700 leading-6">
                点・線・ポリゴンで構成される地物データ。GEOGRAPHY/GEOMETRY 型でネイティブ管理でき、
                SQL の空間関数（ST_DISTANCE, ST_INTERSECTS など）で直接処理できる。
              </p>
            </div>
            <div className="bg-white border border-violet-200 rounded-xl p-4">
              <h5 className="font-semibold text-violet-900 mb-2">ラスターデータ（Snowpark で処理）</h5>
              <p className="text-gray-700 leading-6">
                GeoTIFF などのグリッド画像は BLOB として外部ステージに保存し、
                Snowpark (Python) + rasterio / GDAL で処理する。ラスター専用 SQL 関数は現時点で限定的。
              </p>
            </div>
          </div>
        </section>

        <section id="methods" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">地理空間情報を見る方法（6パターン）</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "1. 位置データを地理型へ変換",
                body: "住所・緯度経度を ST_POINT で地理型へ変換。点/線/ポリゴンを作り、空間演算の土台を作る。",
              },
              {
                title: "2. ジオコーディング / リバースジオコーディング",
                body: "Cortex COMPLETE + 住所データを組み合わせ、文字列住所と座標を相互変換。",
              },
              {
                title: "3. 時系列予測を地理で強化",
                body: "H3で空間グリッド化した時系列を SNOWFLAKE.ML.FORECAST で予測。イベント特徴量で精度を改善。",
              },
              {
                title: "4. 位置別センチメント可視化",
                body: "テキストをLLMでスコア化し、H3セルで集計して色分け。地域ごとの傾向差を可視化。",
              },
              {
                title: "5. ラスター/シェープの近傍分析",
                body: "GeoTIFFとShapefileを読み込み、ST_DWITHIN等で最近傍分析。必要に応じH3で行数圧縮。",
              },
              {
                title: "6. インタラクティブマップ",
                body: "Kepler.gl系UI（Dekartなど）で多レイヤー表示。境界・道路・POI・密度を重ねて探索。",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-6">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="sql" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">主要 SQL 例（まず試す）</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="text-sm font-semibold text-gray-800 mb-2">座標から GEOGRAPHY 列を作る</div>
              <pre className="bg-gray-900 text-green-300 rounded-lg p-3 text-xs overflow-auto">{`SELECT
  id,
  ST_POINT(lon, lat) AS geom
FROM raw_points
WHERE lon BETWEEN -180 AND 180
  AND lat BETWEEN -90 AND 90;`}</pre>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="text-sm font-semibold text-gray-800 mb-2">H3 セルへ変換して時系列集計</div>
              <pre className="bg-gray-900 text-green-300 rounded-lg p-3 text-xs overflow-auto">{`SELECT
  H3_POINT_TO_CELL_STRING(ST_POINT(lon, lat), 8) AS h3_cell,
  TIME_SLICE(event_ts, 1, 'HOUR') AS ts_hour,
  COUNT(*) AS pickups
FROM taxi_events
GROUP BY 1,2;`}</pre>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="text-sm font-semibold text-gray-800 mb-2">最近傍候補を半径条件で抽出</div>
              <pre className="bg-gray-900 text-green-300 rounded-lg p-3 text-xs overflow-auto">{`SELECT a.id, b.id AS nearest_id
FROM elev_points a
JOIN weather_points b
  ON ST_DWITHIN(a.geom, b.geom, 5000)
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY a.id
  ORDER BY ST_DISTANCE(a.geom, b.geom)
) = 1;`}</pre>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="text-sm font-semibold text-gray-800 mb-2">Cortex で住所文字列を整形</div>
              <pre className="bg-gray-900 text-green-300 rounded-lg p-3 text-xs overflow-auto">{`SELECT SNOWFLAKE.CORTEX.COMPLETE(
  'mixtral-8x7b',
  '次の住所を都道府県/市区町村/番地に分解してJSONで返して: ' || raw_address
) AS addr_json
FROM raw_addresses;`}</pre>
            </div>
          </div>
        </section>

        <section id="stack" className="scroll-mt-28">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">可視化スタックの考え方</h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">用途</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">推奨</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">補足</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["探索・分析", "Dekart / Kepler.gl 系", "多レイヤーの重ね合わせとズーム探索に強い"],
                  ["軽量アプリ", "Streamlit + PyDeck", "H3セル可視化やPoCに向く"],
                  ["業務アプリ統合", "Next.js + ArcGIS/Map SDK", "認証/権限/既存画面との統合がしやすい"],
                  ["データ供給", "Snowflake Marketplace", "住所・POI・イベント・地図関連データを補完"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-gray-200">
                    <td className="px-4 py-3 font-medium text-slate-900">{row[0]}</td>
                    <td className="px-4 py-3 text-slate-700">{row[1]}</td>
                    <td className="px-4 py-3 text-slate-700">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="map-library-compare" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Next.js で使える地図ライブラリ比較（PoCコスト考慮）</h3>
          <p className="text-sm text-gray-700 leading-6 mb-4">
            「まずはPoCでなるべくお金をかけずに、細かい地図表現をしたい」前提で比較しています。
            コストと表現力のバランスを優先するなら、MapLibre + deck.gl が最有力です。
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">候補</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">細かい表現力</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">PoCコスト感</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">向いている用途</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">注意点</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "MapLibre GL + deck.gl",
                    "高（3D、ヒートマップ、H3、数十万点表示）",
                    "低（OSS中心、タイル運用次第）",
                    "高解像度の地図分析UI、H3可視化",
                    "初期実装はやや複雑。タイル戦略の設計が必要",
                  ],
                  [
                    "Google Maps JavaScript API",
                    "中〜高（標準機能は強いが自由描画は制約あり）",
                    "中（従量課金）",
                    "住所検索・ルート・店舗表示",
                    "トラフィック増で費用が上がりやすい",
                  ],
                  [
                    "CARTO（+ Snowflake）",
                    "高（分析ワークフローは強い）",
                    "中〜高（SaaS利用前提）",
                    "分析ダッシュボード、業務部門向け探索",
                    "UI完全カスタムはアプリ側追加実装が必要",
                  ],
                  [
                    "Leaflet",
                    "中（軽量2D中心）",
                    "低（OSS）",
                    "軽量PoC、シンプル地図",
                    "大量データや3D表現は工夫が必要",
                  ],
                  [
                    "OpenLayers",
                    "高（GIS機能が豊富）",
                    "低（OSS）",
                    "本格GIS寄り要件",
                    "学習コストが高め",
                  ],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{row[0]}</td>
                    <td className="px-4 py-3 text-slate-700">{row[1]}</td>
                    <td className="px-4 py-3 text-slate-700">{row[2]}</td>
                    <td className="px-4 py-3 text-slate-700">{row[3]}</td>
                    <td className="px-4 py-3 text-slate-600">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h4 className="font-semibold text-emerald-900 mb-2">PoC低コストの推奨構成</h4>
              <p className="text-emerald-800 leading-6">
                Next.js + MapLibre GL + deck.gl + OSM系タイル + Snowflake(H3集計) が、
                コストを抑えつつ細かい地図表現を出しやすい構成です。
              </p>
            </div>
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
              <h4 className="font-semibold text-sky-900 mb-2">Google Maps / CARTO を使う判断軸</h4>
              <p className="text-sky-800 leading-6">
                住所検索や経路案内を重視するなら Google Maps、分析運用を短期で立ち上げるなら CARTO。
                ただしPoC予算が厳しい場合は従量課金の上振れを先に見積もるのが安全です。
              </p>
            </div>
          </div>
        </section>

        <section id="carto-case" className="scroll-mt-28 bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200 rounded-2xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span>📍</span>
            Case Study
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">Snowflake + CARTO で地理空間インサイトを出す事例</h3>
          <p className="text-slate-700 text-sm leading-7 max-w-4xl mb-4">
            Snowflake に蓄積した移動・購買・施設データを CARTO 側で地図表現し、
            H3 集計と空間演算の結果を意思決定に使うパターンです。ポイントは、
            データ加工は Snowflake、可視化と探索は CARTO に役割分担することです。
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
            {[
              {
                title: "需要ヒートマップ",
                body: "エリア別来訪数を H3 で集計し、時間帯別に濃淡表示。店舗配置や要員計画の判断材料にする。",
              },
              {
                title: "商圏・到達圏分析",
                body: "施設からの移動圏と人口データを重ね、候補地比較やサービス提供範囲の見直しに使う。",
              },
              {
                title: "イベント影響分析",
                body: "イベント日程や天候データを結合し、通常日との差分を地図上で比較して施策効果を検証。",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-emerald-200 rounded-xl p-4">
                <h4 className="font-semibold text-emerald-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-700 leading-6">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">実装フロー（最小構成）</h4>
              <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
                <li>Snowflake で位置データを GEOGRAPHY 化し、H3 集計テーブルを作成。</li>
                <li>必要な列だけをビュー化して CARTO から参照。</li>
                <li>CARTO でレイヤー設定（セル塗り分け、境界、POI）を定義。</li>
                <li>フィルタ（日時/カテゴリ/行政区）を付けてダッシュボード公開。</li>
              </ol>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-800 mb-2">評価指標の例</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>分析リードタイム: CSV手作業集計比で短縮できた時間</li>
                <li>意思決定の粒度: 市区町村単位から H3 セル単位への解像度向上</li>
                <li>説明性: 施策前後を地図上で比較し、根拠を共有しやすいか</li>
                <li>運用性: データ更新時に同じダッシュボードを再利用できるか</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="practice" className="scroll-mt-28 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">PoC 導入ステップ（汎用）</h3>
          <ol className="space-y-3 text-sm text-gray-700 list-decimal pl-5">
            <li>住所・座標を整理し、GEOGRAPHY/GEOMETRY列を作る（型正規化）。</li>
            <li>H3 で空間グリッド化し、時系列集計テーブルを作る。</li>
            <li>必要なら Marketplace データで住所補完・イベント特徴量を追加。</li>
            <li>予測/センチメントなど用途別モデルを作成し、評価指標（例: SMAPE）を測る。</li>
            <li>可視化UI（Streamlit/Dekart/業務画面）へ接続して探索性を確認。</li>
            <li>監査ログ・権限モデルを本番運用要件に合わせて固定化。</li>
          </ol>
        </section>

        <section id="links" className="scroll-mt-28 bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">参考リンク</h3>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li>
              Snowflakeブログ: Snowflakeで地理空間インサイトを活用するための上級ガイド（CARTO）
              <a className="ml-2 text-indigo-600 hover:text-indigo-700" href="https://www.snowflake.com/ja/blog/geospatial-data-insghts-carto/" target="_blank" rel="noreferrer">リンク</a>
            </li>
            <li>
              Quickstart: Geo for Machine Learning
              <a className="ml-2 text-indigo-600 hover:text-indigo-700" href="https://quickstarts.snowflake.com/guide/geo-for-machine-learning/index.html#0" target="_blank" rel="noreferrer">リンク</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
