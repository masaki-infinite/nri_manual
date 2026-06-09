import Link from "next/link";

const evaluationRows = [
  {
    item: "概要",
    detail:
      "仮想OLAP（V-OLAP）技術を用いたエンタープライズ向けセマンティックレイヤー。DWH上に統一されたメトリクスと高速クエリエンジンを提供。",
    evaluation:
      "案件一般: 最高。特にBIツールの乱立やKPIの不統一に悩む大規模企業に最適なソリューション。",
  },
  {
    item: "ライセンス形態",
    detail:
      "カスタム見積もりが基本。主にデプロイされるセマンティックオブジェクト（仮想キューブなど）の数に基づく年間契約。ユーザー数やクエリ数は無制限を謳うことが多い。",
    evaluation:
      "案件一般: 中。年間数万ドル以上となり、導入コストは比較的高額。",
  },
  {
    item: "サポート体制",
    detail: "エンタープライズレベルのサポートを提供。SLAベースのサポートも可能。",
    evaluation: "案件一般: 高。",
  },
];

const semanticCapabilityRows = [
  {
    item: "モデリング方式",
    detail:
      "Virtual Cube（仮想OLAPキューブ）とSemantic Modelが中心。複数の事実テーブルやディメンションをGUIおよびコードでモデリング。",
    evaluation:
      "案件一般: 最高。OLAP操作（Drill-Downなど）をDWH上で仮想的に実現でき、階層分析に強い。",
  },
  {
    item: "メトリクス定義方式",
    detail:
      "Measures（集計メトリクス）、Dimensions、Calculationsを定義。GUIツールとコードベースの両方で管理可能。",
    evaluation: "R&D適性: 高。コードベースの定義をサポートしており、LLMによる自動生成の対象となる。",
  },
  {
    item: "ディメンション管理",
    detail:
      "仮想キューブ内でディメンションを定義し、BIツールに提示。多次元分析（OLAP）の概念に基づき、階層構造の定義に特に優れている。",
    evaluation: "案件一般: 高。",
  },
  {
    item: "階層構造対応",
    detail: "Hierarchies機能により、時間や地理の多段階階層を厳密に定義。",
    evaluation: "案件一般: 最高。OLAP機能の核であり、複雑な階層分析を高速化する。",
  },
  {
    item: "計算フィールド作成",
    detail:
      "Semantic Model内のCalculations（計算定義）により、複雑な計算ロジックをMAQL/DAXに近い抽象度で記述。",
    evaluation: "案件一般: 高。",
  },
];

const engineeringRows = [
  {
    item: "開発言語（コード管理）",
    detail:
      "XMLやAPIを通じてSemantic Modelの定義を管理。GUIでの操作も可能だが、エンタープライズ運用ではコードベースでの管理が推奨される。",
    evaluation: "R&D適性: 高。モデル定義はコードとして管理可能であり、DevOpsフローに乗せやすい。",
  },
  {
    item: "DevOps対応",
    detail:
      "APIによる宣言的な構成管理、メトリクス変更のバージョン管理、影響分析（Impact Analysis）機能により、CI/CDとの連携をサポート。",
    evaluation: "案件一般: 高。変更管理とガバナンスが非常に強固。",
  },
  {
    item: "パフォーマンス最適化機能",
    detail:
      "Intelligent Query EngineとAdaptive Aggregation（自動集計テーブル生成）により、クエリ性能を自動で最適化。",
    evaluation:
      "案件一般: 最高。大規模な複雑クエリに対する高速応答とDWHコスト削減に貢献する。",
  },
];

const securityRows = [
  {
    item: "ネットワークセキュリティ機能有無",
    detail:
      "クラウドDWH（Snowflake/Databricksなど）との接続において、プライベート接続、VPCピアリングなどのセキュアな接続に対応。DWHおよびBIツール側のセキュリティに依存。",
    evaluation: "案件一般: 高。",
  },
  {
    item: "アクセス制御",
    detail:
      "RLS（行レベルセキュリティ）、列レベルセキュリティ、ロールベース制御、パススルー認証（DWH側権限との整合）に標準対応。",
    evaluation:
      "案件一般: 最高。セマンティックレイヤーとして、企業要件を完全に満たす強固なセキュリティ機能を持つ。",
  },
];

const aiLinkRows = [
  {
    item: "自然言語クエリ対応",
    detail:
      "AI-Linkを通じて、セマンティックモデル（Measures, Dims, Join Logic）をLLMに提供し、高精度なNLQを可能にする。",
    evaluation: "R&D適性: 最高。LLMによる分析クエリの自動生成の検証に最適。",
  },
  {
    item: "SQL生成精度",
    detail:
      "LLMが生成した自然言語クエリは、AtScaleのSemantic Modelを参照して、最適なSQL/MDX/DAXに変換される。クエリロジックの解釈ミスを大幅に削減。",
    evaluation:
      "R&D適性: 最高。Looker/dbt SLと並び、コードベースのセマンティクスをガードレールとして活用できる。",
  },
  {
    item: "AIモデル連携",
    detail: "LLMとの連携を積極的に推進。企業のAI分析基盤の中核として位置づけられている。",
    evaluation: "R&D適性: 高。",
  },
  {
    item: "プロンプトエンジニアリング機能",
    detail:
      "LLMに対し、共通メトリクス辞書（Business Glossary）をコンテキストとして提供可能。",
    evaluation:
      "R&D適性: 高。LLMを用いたメトリクス定義の自動生成やNLQの精度向上に直結。",
  },
];

const governanceRows = [
  {
    feature: "コスト・価格データマスキング",
    detail:
      "対応。セマンティックレイヤーの機能として、列レベルセキュリティ（CLS）を用いて特定の列を非表示にしたり、DWH側のマスキングポリシーを透過的に適用したりすることで対応可能です。",
  },
  {
    feature: "監査ログ",
    detail:
      "対応。すべてのクエリ、ユーザーアクティビティ、セマンティックモデルの変更に関する完全なクエリログと監査証跡を提供します。",
  },
  {
    feature: "コンプライアンス対応",
    detail: "対応。エンタープライズ向け製品として、主要なコンプライアンスおよびセキュリティ要件に対応しています。",
  },
  {
    feature: "データ保持ポリシー",
    detail: "対応。Adaptive Aggregation機能で作成される集計テーブルの保持期間を管理できます。",
  },
  {
    feature: "暗号化機能",
    detail:
      "対応。データはDWH側に格納されるため、DWHの暗号化（KMSなど）を利用しつつ、AtScaleへの接続はTLS/SSLで暗号化されます。",
  },
  {
    feature: "ネットワークセキュリティ機能",
    detail: "対応。DWHへの接続はVPCピアリングやPrivate Linkなどのセキュアな接続に対応しています。",
  },
  {
    feature: "脆弱性対応の有無",
    detail: "対応。継続的なセキュリティ更新と脆弱性対応を実施しています。",
  },
  {
    feature: "セキュリティ認証の有無",
    detail: "対応。エンタープライズ向け要件を満たす認証（SOC 2など）を保持していることが多いです。",
  },
  {
    feature: "アクセス制御",
    detail:
      "RBAC（ロールベース）による権限管理に対応。さらにRLS/CLSをセマンティックモデル層で定義し、DWH権限と統合して適用します。",
  },
  {
    feature: "データプライバシー",
    detail: "厳格なアクセス制御機能とデータマスキング機能により、GDPR/個人情報保護への対応を支援します。",
  },
];

const pricingRows = [
  {
    item: "課金モデル",
    detail:
      "カスタムサブスクリプションモデル。主にデプロイされたセマンティックモデル数、またはデータ規模に基づく年間契約。ユーザー数やクエリ数は無制限を謳うことが多い。",
  },
  {
    item: "初期費用",
    detail:
      "なし（SaaSまたはソフトウェアライセンスのため）。ただし、契約には通常、高額な年間最低利用料が設定されます。",
  },
  {
    item: "月額/年額費用",
    detail:
      "カスタム見積もり。年間数万ドル以上が目安となり、大規模な導入ほど費用対効果が高くなります。",
  },
  {
    item: "従量課金項目",
    detail:
      "基本的には固定費用。ただし、特定の高度な機能や大規模データ処理に追加費用が発生する場合があります。DWH側コンピュート費用は別途発生します。",
  },
];

const architectureRows = [
  {
    component: "Semantic Model",
    role: "メトリクスとリレーションシップの定義。ビジネスロジックをコード/GUIで一元管理する。",
  },
  {
    component: "Virtual OLAP Engine",
    role:
      "仮想キューブエンジン。物理的なデータ集計（マテリアライズ）なしに、DWH上のデータをOLAPのように扱えるよう抽象化する。",
  },
  {
    component: "Intelligent Query Engine",
    role:
      "BIツールからのDAX/MDX/SQLクエリをDWHに最適なSQLへ変換し、Adaptive Aggregationと連携して性能を向上させる。",
  },
  {
    component: "Adaptive Aggregation",
    role: "クエリパターンを学習し、最適な集計テーブルをDWH上に自動で作成・管理する。",
  },
];

const executionModelRows = [
  {
    item: "対応データソース",
    detail:
      "非常に広範。Snowflake、Google BigQuery、Databricks、Amazon Redshift、Azure Synapse Analyticsなど、主要なクラウドDWHに幅広く対応。",
  },
  {
    item: "データ処理方式",
    detail:
      "プッシュダウン方式。BIツールが発行する複雑なクエリ（DAX/MDX）を、DWHに最適なSQLに変換して処理をプッシュダウンする。",
  },
  {
    item: "処理可能データ量",
    detail:
      "DWHに依存。接続するDWHの性能に準ずるが、Adaptive Aggregationにより、ペタバイト規模の大規模データセットに対するBIクエリの応答時間を大幅に改善できる。",
  },
];

const marketStrengthRows = [
  {
    item: "導入数",
    detail:
      "エンタープライズ向けセマンティックレイヤーとして成熟。特にKPI統制を厳格に行いたい大企業や、OLAPキューブをクラウドDWHに移行したい企業で採用実績が多い。",
  },
  {
    item: "製品の強み",
    detail:
      "BIツール横断性: Excel、Power BI、Tableau、Qlikなど、主要BIツールへ統一メトリクスを提供。\nパフォーマンス自動最適化: Adaptive Aggregationにより、DWHコンピュートコスト削減と高速応答を両立。\n企業ガバナンス: 厳格なセキュリティ機能とBusiness GlossaryによるKPI定義の統制。\nAI-Link: LLM連携に特化したコネクタで高精度な自然言語クエリ生成を支援。",
  },
];

const devOpsOperationRows = [
  {
    item: "対応開発ツール/IDE",
    detail:
      "モデリングGUIがメインだが、APIを通じてモデル定義（XML/JSON）を操作可能。ExcelやPower BIなどのフロントエンドBIツールを事実上の開発・テスト環境として利用。",
  },
  {
    item: "テスト機能/デバッグ機能",
    detail:
      "テスト機能: モデルのバリデーション機能、影響分析（Impact Analysis）機能により、メトリクス変更が他レポートへ与える影響を事前に把握。\nデバッグ機能: 発行されたMDX/DAXクエリがDWHに変換されたSQLをトレースできる機能、詳細なクエリログ。",
  },
  {
    item: "学習コストの目安",
    detail:
      "セマンティックモデリング（多次元分析）とOLAPの概念理解が必要で、中〜高程度の学習コスト。ただし、エンドユーザーは使い慣れたBIツールを使えるため、分析側の学習コストは低い。",
  },
  {
    item: "運用監視機能の有無と項目",
    detail:
      "対応。Admin Consoleおよび監査ログを通じて監視。監視項目は、DWHへのクエリ負荷、Adaptive Aggregationの動作状況、キャッシュヒット率、ユーザーアクティビティ、モデル整合性チェック。",
  },
  {
    item: "パフォーマンス最適化機能",
    detail:
      "クエリ最適化: BI言語（DAX/MDX）を最適なSQLに自動翻訳し、プッシュダウン。\nキャッシュ戦略: Adaptive Aggregation（自動マテリアライズドビュー）による永続的な集計キャッシュ。\nインデックス管理: Adaptive Aggregationによる実質的なインデックス最適化。",
  },
  {
    item: "マルチテナント対応",
    detail:
      "対応。プロジェクトによる環境分離、RLS/CLS（行/列レベルセキュリティ）、パススルー認証による厳格なデータ分離。",
  },
];

const realtimeIntegrationRows = [
  {
    feature: "ストリーミングデータ対応",
    detail:
      "データソースがリアルタイム更新されている場合（例: DWH上のライブビュー）、AtScaleはそのライブビューを参照し、ニアリアルタイムでの分析データを提供可能です。",
  },
  {
    feature: "CDC（変更データキャプチャ）",
    detail:
      "CDC自体はDWH側の機能に依存しますが、AtScaleはLive Queryモードで動作し、DWHの最新データを即座に反映します。",
  },
];

const cloudIntegrationRows = [
  {
    service: "AWS/Azure/GCP",
    detail:
      "AWS（Redshift/S3）、Azure（Synapse/ADLS）、GCP（BigQuery）など、主要クラウドのDWHとデータレイクをサポートします。",
  },
  {
    service: "ネットワークセキュリティ",
    detail:
      "クラウドベンダーごとのPrivate LinkやVPCピアリングを利用して、DWHとの接続をセキュアに行うことが可能です。",
  },
];

export default function AtScaleTrainingPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/training"
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">AtScale 勉強会資料</h2>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">AtScaleとは</h3>
          <p className="text-slate-700 leading-7">
            AtScaleは、主要なクラウドDWHの上に統一されたセマンティックモデル（仮想キューブ）を構築し、
            Excel、Power BI、Tableauなど、すべてのBIツールに共通のメトリクスと最適化されたクエリ体験を
            提供することに特化した、成熟したエンタープライズ製品です。
          </p>
          <p className="text-slate-700 leading-7 mt-4">
            AtScaleのセマンティクス機能は、LookerのLookMLやdbt SLと同様に、メトリクスの厳密なコード管理と
            階層構造の定義を可能にしますが、特にMDX/DAXへの変換と最適化に強みを持ちます。
          </p>
          <p className="text-slate-700 leading-7 mt-4">
            時系列データ処理は、時間というディメンションに沿ってデータを集計、比較、分析するための機能です。
          </p>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">R&D / 案件一般向け評価</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">項目</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">詳細</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">評価（R&D/案件一般）</th>
                </tr>
              </thead>
              <tbody>
                {evaluationRows.map((row) => (
                  <tr key={row.item} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.item}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.detail}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.evaluation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">セマンティクス機能の詳細評価</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">項目</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">AtScale の対応</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">評価（R&D/案件一般）</th>
                </tr>
              </thead>
              <tbody>
                {semanticCapabilityRows.map((row) => (
                  <tr key={row.item} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.item}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.detail}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.evaluation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">開発・DevOps・性能最適化の評価</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">項目</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">AtScale の対応</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">評価（R&D/案件一般）</th>
                </tr>
              </thead>
              <tbody>
                {engineeringRows.map((row) => (
                  <tr key={row.item} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.item}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.detail}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.evaluation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">セキュリティ評価</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">項目</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">AtScale の対応</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">評価（R&D/案件一般）</th>
                </tr>
              </thead>
              <tbody>
                {securityRows.map((row) => (
                  <tr key={row.item} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.item}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.detail}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.evaluation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">AI-Link 連携評価（R&D / 開発高速化）</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">項目</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">AtScale の対応（AI-Link 連携）</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">評価（R&D/開発高速化）</th>
                </tr>
              </thead>
              <tbody>
                {aiLinkRows.map((row) => (
                  <tr key={row.item} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.item}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.detail}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.evaluation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">セキュリティ・ガバナンス機能一覧</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">機能</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">詳細</th>
                </tr>
              </thead>
              <tbody>
                {governanceRows.map((row) => (
                  <tr key={row.feature} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.feature}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">価格モデル</h3>
          <p className="text-slate-700 mb-4 leading-7">
            AtScaleは、大規模なエンタープライズ顧客向けに設計されており、利用規模に応じたカスタム契約が基本となります。
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">項目</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">詳細</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row) => (
                  <tr key={row.item} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.item}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">AtScaleの構成（ミドルウェアレイヤー）</h3>
          <p className="text-slate-700 mb-4 leading-7">
            AtScaleは、DWH（データウェアハウス）の上に位置し、BIツールとDWHの間を仲介するミドルウェアレイヤーとして機能します。
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">構成要素</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">役割</th>
                </tr>
              </thead>
              <tbody>
                {architectureRows.map((row) => (
                  <tr key={row.component} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.component}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">データ処理アーキテクチャ特性</h3>
          <p className="text-slate-700 mb-4 leading-7">
            AtScale自体はデータ処理の実行環境ではなく、DWHに処理をプッシュダウンします。そのうえで、クエリ変換と最適化に独自の強みがあります。
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">項目</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">詳細</th>
                </tr>
              </thead>
              <tbody>
                {executionModelRows.map((row) => (
                  <tr key={row.item} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.item}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">導入実績と製品強み</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">項目</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">詳細</th>
                </tr>
              </thead>
              <tbody>
                {marketStrengthRows.map((row) => (
                  <tr key={row.item} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.item}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6 whitespace-pre-line">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">開発・テスト・運用詳細</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">項目</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">詳細</th>
                </tr>
              </thead>
              <tbody>
                {devOpsOperationRows.map((row) => (
                  <tr key={row.item} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.item}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6 whitespace-pre-line">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">リアルタイム連携</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">機能</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">詳細</th>
                </tr>
              </thead>
              <tbody>
                {realtimeIntegrationRows.map((row) => (
                  <tr key={row.feature} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.feature}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">マルチクラウド連携（オーバーレイ）</h3>
          <p className="text-slate-700 mb-4 leading-7">
            AtScaleは主要なクラウドベンダーすべてに対応する、クラウドDWHに依存しないオーバーレイアーキテクチャを持ちます。
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">クラウドサービス</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">詳細な連携機能</th>
                </tr>
              </thead>
              <tbody>
                {cloudIntegrationRows.map((row) => (
                  <tr key={row.service} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.service}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.detail}</td>
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
