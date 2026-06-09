import Link from "next/link";

type StackRow = {
  layer: string;
  service: string;
  role: string;
  notes: string;
};

type StepRow = {
  phase: string;
  what: string;
  deliverable: string;
};

type BuildChoiceRow = {
  topic: string;
  arcgisOnly: string;
  withJavaScript: string;
  recommendation: string;
};

const stackRows: StackRow[] = [
  {
    layer: "データ基盤",
    service: "Snowflake (HVD_TOCHO_DEV/UAT/PROD)",
    role: "地理空間データ・業務データ・履歴を統合し、分析と配信の中核を担う",
    notes: "dbtでmartを構築し ArcGIS 連携用データセットを標準化",
  },
  {
    layer: "地図/3D可視化",
    service: "ArcGIS Maps SDK for JavaScript (4.x)",
    role: "SceneView / MapView を使って3D都市モデル・各種レイヤを高い自由度で表示",
    notes: "独自UI、複雑な地図連動、外部API連携に強い",
  },
  {
    layer: "データ保管",
    service: "ArcGIS Online Hosted Feature Layer",
    role: "用途地域、建物属性、避難所、人口メッシュ等をレイヤ化",
    notes: "権限管理をグループ単位で実施",
  },
  {
    layer: "3Dモデル格納",
    service: "Scene Layer / I3S",
    role: "建物・地形・インフラの3Dデータ配信",
    notes: "LOD別運用で表示性能を確保",
  },
  {
    layer: "データ連携",
    service: "dbt + ArcGIS Data Pipelines + API",
    role: "Snowflakeを起点にバッチ連携とAPI連携を組み合わせたハイブリッド連携を実施",
    notes: "初期は日次バッチ、拡張時にAPI連携を増やす",
  },
  {
    layer: "フロントエンド",
    service: "React / Next.js + ArcGIS Maps SDK for JavaScript",
    role: "部局向けWebアプリをコードベースで開発。画面遷移・状態管理・認可制御を柔軟に実装",
    notes: "庁内要件に合わせたカスタム実装が可能",
  },
  {
    layer: "API/ジョブ実行",
    service: "Snowpark Container Services (SPCS)",
    role: "連携API、RAG API、非同期ジョブをコンテナとして実行",
    notes: "compute pool と image repository を分離して運用",
  },
  {
    layer: "業務アプリ",
    service: "ArcGIS Experience Builder",
    role: "軽量ポータルや検証環境として併用",
    notes: "JavaScriptアプリを補完する用途で活用",
  },
  {
    layer: "分析",
    service: "ArcGIS Dashboards / Insights",
    role: "KPI可視化、時系列比較、地域別分析",
    notes: "幹部レポートと現場モニタリングを両立",
  },
  {
    layer: "ID/認証",
    service: "SAML (Azure AD 等)",
    role: "庁内SSO連携、ロールベース制御",
    notes: "閲覧/編集/公開の権限を分離",
  },
];

const stepRows: StepRow[] = [
  {
    phase: "1. 目的定義",
    what: "対象業務（都市計画、防災、道路、上下水、建築確認）を選定し、Snowflake中心の活用KPIを設定",
    deliverable: "ユースケース定義書、KPI一覧",
  },
  {
    phase: "2. データ設計",
    what: "PLATEAU由来3D都市モデルと庁内GISデータを Snowflake モデルに統合し、dbtマートを定義",
    deliverable: "データ標準マッピング表、dbtモデル設計",
  },
  {
    phase: "3. 基盤準備",
    what: "ArcGIS Online組織設定に加え、Snowflake環境（DEV/UAT/PROD）とSPCS実行基盤を準備",
    deliverable: "運用設計書、権限マトリクス",
  },
  {
    phase: "4. 3Dレイヤ実装",
    what: "Scene Layer 化とシンボル設計、属性ポップアップ、空間検索条件を実装",
    deliverable: "3Dシーン（部局共通版）",
  },
  {
    phase: "5. アプリ開発",
    what: "ArcGIS Maps SDK for JavaScript + React/Next.js で業務画面を開発し、操作導線を最適化",
    deliverable: "都市計画向け/防災向けカスタムWebアプリ",
  },
  {
    phase: "6. 連携自動化",
    what: "dbt + Data Pipelines + SPCS APIで日次/週次更新とオンデマンド連携を自動化",
    deliverable: "運用ジョブ定義、SPCSサービス仕様、エラー通知フロー",
  },
  {
    phase: "7. 検証・展開",
    what: "庁内PoC（2-3部局）後に段階展開、利用ログからUI改善",
    deliverable: "PoC報告書、本番展開計画",
  },
];

const quickWins = [
  "災害時の浸水想定・避難導線を3Dで即時共有",
  "再開発エリアの景観・日影・交通影響を関係者で同時確認",
  "工事・点検計画を地図/台帳/写真で一元管理",
  "首長・幹部向けのダッシュボードで説明時間を短縮",
  "Snowflake基盤に集約し、部局横断データ活用を標準化",
];

const buildChoiceRows: BuildChoiceRow[] = [
  {
    topic: "3D地図閲覧・フィルタ",
    arcgisOnly: "Scene Viewer / Experience Builder の標準ウィジェットで実装可能",
    withJavaScript: "ArcGIS Maps SDK for JavaScript で複雑なUI・連動処理を実装可能",
    recommendation: "都庁案件は JavaScript 前提で実装",
  },
  {
    topic: "業務フォーム連携",
    arcgisOnly: "Survey123 / Experience Builder で対応可能",
    withJavaScript: "庁内システム連携や入力制御を細かく実装できる",
    recommendation: "既存業務システム連携を前提に JavaScript で設計",
  },
  {
    topic: "高度な空間分析フロー",
    arcgisOnly: "標準分析ツールで基本要件は対応可能",
    withJavaScript: "条件分岐や複数API連携を含む独自ワークフローを構築可能",
    recommendation: "複雑分析は JavaScript 実装を標準化",
  },
  {
    topic: "認証・権限の独自制御",
    arcgisOnly: "ArcGISグループ/ロールで標準管理",
    withJavaScript: "トークン連携、画面単位制御、外部ID統合を柔軟化",
    recommendation: "庁内SSOと細粒度制御のため JavaScript で統合",
  },
  {
    topic: "運用保守コスト",
    arcgisOnly: "低い。内製メンバーでも運用しやすい",
    withJavaScript: "高くなる。開発者体制とテスト運用が必要",
    recommendation: "共通部品化と設計標準を整えて運用コストを制御",
  },
];

const hvdRagSteps = [
  {
    phase: "R1 目的整理",
    action: "仕様書・別紙・入札説明書から、回答対象業務とKPIを明確化",
    deliverable: "目的定義メモ、評価指標",
  },
  {
    phase: "R2 データ設計",
    action: "Snowflake 上の検索対象データ、権限境界、監査観点を定義",
    deliverable: "データモデル案、権限設計",
  },
  {
    phase: "R3 機能設計",
    action: "検索API、根拠表示UI、監査ログ設計を画面導線と合わせて設計",
    deliverable: "画面設計、API I/F",
  },
  {
    phase: "R4 実装",
    action: "Snowflake RAG + Web UI + 監査ログの最小構成を実装",
    deliverable: "PoC実装、動作確認ログ",
  },
  {
    phase: "R5 受入試験",
    action: "受入条件に沿って、回答再現性と根拠提示を検証",
    deliverable: "受入結果、課題一覧",
  },
  {
    phase: "R6 運用化",
    action: "運用手順・権限棚卸・継続改善サイクルを定着",
    deliverable: "運用手順書、改善バックログ",
  },
];

export default function TochoProjectPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/dashboard/projects" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 案件リストに戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">東京都庁: 3D都市モデル活用アプリ開発方法</h2>
      <p className="text-gray-700 leading-7 mb-8">
        tocho-geospatial-platform の実装方針に合わせて、Snowflake x ArcGIS Maps SDK for JavaScript x Next.js x SPCS を中核とした
        東京都庁向けの実装ガイドとして整理しています。PLATEAU系3D都市モデルと庁内データを統合し、都市計画・防災・インフラ運用に展開します。
      </p>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">採用方針（ArcGIS Maps SDK for JavaScript 前提）</h3>
          <p className="text-slate-700 leading-7 mb-4">
            独立リポジトリ tocho-geospatial-platform では、ハイブリッド連携（バッチ + API）を初期方針として採用しています。
            ArcGIS Maps SDK for JavaScript を中心に据えつつ、Snowflake をデータ中核、SPCS をAPI/ジョブ実行基盤として組み合わせることで、
            3D表示、業務導線、既存システム連携、認証制御を一体で柔軟に実装します。
          </p>
          <div className="mb-4 rounded-lg border border-sky-200 bg-white/80 p-4 text-sm text-slate-700">
            リポジトリ配置: C:\\Users\\cab02322\\src\\nomura\\tocho-geospatial-platform
            <br />
            初期構成: design / dbt / web / infra/spcs
          </div>
          <ul className="grid md:grid-cols-2 gap-3 text-sm">
            {quickWins.map((item) => (
              <li key={item} className="bg-white/70 rounded-lg border border-sky-200 px-4 py-3 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">ArcGIS Maps SDK for JavaScript とは</h3>
          <p className="text-slate-700 leading-7 mb-4">
            ArcGIS Maps SDK for JavaScript は、Webブラウザ上で2D/3D地図アプリを開発するための開発キットです。
            ArcGIS Online のレイヤ資産を利用しながら、標準ビルダーでは難しい独自UIや業務ロジックを実装できます。
          </p>
          <ul className="space-y-2 text-slate-700 leading-7">
            <li>・3D都市モデル（Scene Layer / I3S）を使った高機能ビューアを構築可能</li>
            <li>・React/Next.js と組み合わせて、庁内システム連携や状態管理を統合可能</li>
            <li>・検索、フィルタ、ポップアップ、編集、時系列表示などを業務要件に合わせて実装可能</li>
          </ul>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">推奨SaaS構成（ArcGIS Online中心）</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">レイヤ</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">サービス</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">役割</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">運用メモ</th>
                </tr>
              </thead>
              <tbody>
                {stackRows.map((row) => (
                  <tr key={row.layer} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.layer}</td>
                    <td className="px-4 py-3 text-slate-700">{row.service}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.role}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">構成図（ArcGIS Maps SDK for JavaScript 前提）</h3>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 overflow-x-auto">
            <svg viewBox="0 0 1180 470" className="min-w-[1040px] w-full h-auto" role="img" aria-label="ArcGIS Maps SDK for JavaScript 前提の構成図">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#475569" />
                </marker>
              </defs>

              <rect x="20" y="30" width="220" height="120" rx="12" fill="#e0f2fe" stroke="#0284c7" />
              <text x="130" y="70" textAnchor="middle" fontSize="16" fill="#0f172a">庁内データ源</text>
              <text x="130" y="95" textAnchor="middle" fontSize="12" fill="#334155">台帳 / CSV / API / センサー</text>
              <text x="130" y="115" textAnchor="middle" fontSize="12" fill="#334155">PLATEAU 3D都市モデル</text>

              <rect x="300" y="30" width="220" height="120" rx="12" fill="#dbeafe" stroke="#2563eb" />
              <text x="410" y="70" textAnchor="middle" fontSize="16" fill="#0f172a">Data Pipelines</text>
              <text x="410" y="95" textAnchor="middle" fontSize="12" fill="#334155">整形 / 更新 / 品質チェック</text>
              <text x="410" y="115" textAnchor="middle" fontSize="12" fill="#334155">定期ETL</text>

              <rect x="580" y="20" width="250" height="140" rx="12" fill="#dcfce7" stroke="#16a34a" />
              <text x="705" y="55" textAnchor="middle" fontSize="16" fill="#0f172a">ArcGIS Online</text>
              <text x="705" y="80" textAnchor="middle" fontSize="12" fill="#334155">Hosted Feature Layer</text>
              <text x="705" y="100" textAnchor="middle" fontSize="12" fill="#334155">Scene Layer (I3S)</text>
              <text x="705" y="120" textAnchor="middle" fontSize="12" fill="#334155">グループ / 権限 / 監査</text>

              <rect x="560" y="200" width="290" height="110" rx="12" fill="#ffedd5" stroke="#ea580c" />
              <text x="705" y="236" textAnchor="middle" fontSize="16" fill="#0f172a">Custom Web App</text>
              <text x="705" y="258" textAnchor="middle" fontSize="12" fill="#334155">ArcGIS Maps SDK for JavaScript</text>
              <text x="705" y="278" textAnchor="middle" fontSize="12" fill="#334155">React / Next.js</text>

              <rect x="560" y="330" width="290" height="72" rx="12" fill="#eef2ff" stroke="#6366f1" />
              <text x="705" y="360" textAnchor="middle" fontSize="16" fill="#0f172a">Experience Builder（補助）</text>
              <text x="705" y="380" textAnchor="middle" fontSize="12" fill="#334155">簡易検証 / 部分導入向け</text>

              <rect x="890" y="330" width="250" height="72" rx="12" fill="#fae8ff" stroke="#a21caf" />
              <text x="1015" y="360" textAnchor="middle" fontSize="16" fill="#0f172a">Dashboards / Insights</text>
              <text x="1015" y="380" textAnchor="middle" fontSize="12" fill="#334155">KPI可視化</text>

              <rect x="900" y="60" width="240" height="170" rx="12" fill="#f1f5f9" stroke="#64748b" />
              <text x="1020" y="95" textAnchor="middle" fontSize="16" fill="#0f172a">利用者</text>
              <text x="1020" y="120" textAnchor="middle" fontSize="12" fill="#334155">都市計画部門</text>
              <text x="1020" y="140" textAnchor="middle" fontSize="12" fill="#334155">防災・インフラ部門</text>
              <text x="1020" y="160" textAnchor="middle" fontSize="12" fill="#334155">幹部・意思決定者</text>
              <text x="1020" y="180" textAnchor="middle" fontSize="12" fill="#334155">庁内システム利用者</text>

              <line x1="240" y1="90" x2="300" y2="90" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="520" y1="90" x2="580" y2="90" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="705" y1="160" x2="705" y2="200" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="850" y1="250" x2="900" y2="145" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="850" y1="366" x2="890" y2="366" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="705" y1="310" x2="705" y2="330" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="1015" y1="330" x2="1015" y2="230" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
            </svg>
          </div>
          <p className="text-sm text-slate-600 mt-3">
            本案件では ArcGIS Maps SDK for JavaScript を標準実装として採用し、Experience Builder は補助用途として活用します。
          </p>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">開発ステップ（PoCから本番まで）</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">フェーズ</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">実施内容</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">成果物</th>
                </tr>
              </thead>
              <tbody>
                {stepRows.map((row) => (
                  <tr key={row.phase} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{row.phase}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.what}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.deliverable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">都庁向けの実装ポイント</h3>
          <ul className="space-y-3 text-slate-700 leading-7">
            <li>1. データは「庁内限定」「公開可能」「機微情報」を事前に分類し、ArcGISグループ権限に落とし込む。</li>
            <li>2. 3D表示性能は、対象エリア分割とLOD段階表示を前提に設計する。</li>
            <li>3. まずは防災・都市計画の2部局でPoCを回し、共通テンプレートを固めてから全庁展開する。</li>
            <li>4. 運用開始後は、ダッシュボードで利用率/KPIを可視化し、次年度予算化につなげる。</li>
          </ul>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">ArcGISだけで開発できる？ JavaScriptは必要？</h3>
          <p className="text-slate-700 leading-7 mb-4">
            結論として、ArcGIS 標準機能だけでも構築は可能ですが、都庁案件では汎用性と将来拡張性を優先し、ArcGIS Maps SDK for JavaScript を前提に開発します。
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">論点</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">ArcGISのみ</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">JavaScript併用</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">推奨判断</th>
                </tr>
              </thead>
              <tbody>
                {buildChoiceRows.map((row) => (
                  <tr key={row.topic} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900">{row.topic}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.arcgisOnly}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.withJavaScript}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-slate-700 space-y-2">
            <p>・標準構築: ArcGIS Maps SDK for JavaScript + React/Next.js を採用</p>
            <p>・補助利用: Experience Builder は簡易画面・検証用途に限定</p>
            <p>・運用方針: 共通コンポーネント化で開発速度と保守性を両立</p>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Snowflake RAG 比較資料（HVD形式）</h3>
          <p className="text-slate-700 leading-7 mb-4">
            tocho-geospatial-platform 側に、スライド表示で閲覧できる比較資料を配置しています。構成図と開発手順を含み、
            Arrow キーで前後移動できる形式です。
          </p>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 space-y-1">
            <p>・資料: tocho-geospatial-platform/docs/snowflake-rag-vs-copilot-rag.html</p>
            <p>・参照: spec/original/33314827_仕様書.pdf / 仕様書別紙1 / 入札説明書</p>
            <p>・補足: スライド表示ボタンで 1 画面 1 セクション表示に切り替え可能</p>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">HVD型 開発手順書（RAG導入）</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">フェーズ</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">実施内容</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">成果物</th>
                </tr>
              </thead>
              <tbody>
                {hvdRagSteps.map((row) => (
                  <tr key={row.phase} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{row.phase}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.action}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.deliverable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">RAG構成図（HVD寄せ）</h3>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 overflow-x-auto">
            <svg viewBox="0 0 1180 430" className="min-w-[1020px] w-full h-auto" role="img" aria-label="tocho向け Snowflake RAG 構成図">
              <defs>
                <marker id="rag-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="#475569" />
                </marker>
              </defs>

              <rect x="20" y="50" width="230" height="120" rx="12" fill="#e0f2fe" stroke="#0284c7" />
              <text x="135" y="88" textAnchor="middle" fontSize="16" fill="#0f172a">利用者 / 部局職員</text>
              <text x="135" y="112" textAnchor="middle" fontSize="12" fill="#334155">質問入力・業務文脈指定</text>
              <text x="135" y="132" textAnchor="middle" fontSize="12" fill="#334155">根拠リンク確認</text>

              <rect x="300" y="50" width="260" height="120" rx="12" fill="#ffedd5" stroke="#ea580c" />
              <text x="430" y="88" textAnchor="middle" fontSize="16" fill="#0f172a">Web UI (Next.js)</text>
              <text x="430" y="112" textAnchor="middle" fontSize="12" fill="#334155">対話UI・引用表示・操作ログ</text>
              <text x="430" y="132" textAnchor="middle" fontSize="12" fill="#334155">SPCS経由でAPI接続</text>

              <rect x="620" y="20" width="260" height="170" rx="12" fill="#dcfce7" stroke="#16a34a" />
              <text x="750" y="55" textAnchor="middle" fontSize="16" fill="#0f172a">Snowflake RAG 基盤</text>
              <text x="750" y="82" textAnchor="middle" fontSize="12" fill="#334155">文書/構造化データ検索</text>
              <text x="750" y="102" textAnchor="middle" fontSize="12" fill="#334155">SQL + Semantic層</text>
              <text x="750" y="122" textAnchor="middle" fontSize="12" fill="#334155">監査ログ・権限制御</text>
              <text x="750" y="142" textAnchor="middle" fontSize="12" fill="#334155">回答根拠の追跡</text>

              <rect x="620" y="240" width="260" height="120" rx="12" fill="#eef2ff" stroke="#6366f1" />
              <text x="750" y="278" textAnchor="middle" fontSize="16" fill="#0f172a">仕様書ソース群</text>
              <text x="750" y="302" textAnchor="middle" fontSize="12" fill="#334155">仕様書 / 別紙 / 入札説明書</text>
              <text x="750" y="322" textAnchor="middle" fontSize="12" fill="#334155">design.yaml / requirements</text>

              <rect x="940" y="90" width="220" height="120" rx="12" fill="#f8fafc" stroke="#64748b" />
              <text x="1050" y="128" textAnchor="middle" fontSize="16" fill="#0f172a">監査・運用</text>
              <text x="1050" y="152" textAnchor="middle" fontSize="12" fill="#334155">権限棚卸 / 証跡管理</text>
              <text x="1050" y="172" textAnchor="middle" fontSize="12" fill="#334155">改善サイクル</text>

              <line x1="250" y1="110" x2="300" y2="110" stroke="#475569" strokeWidth="2" markerEnd="url(#rag-arrow)" />
              <line x1="560" y1="110" x2="620" y2="110" stroke="#475569" strokeWidth="2" markerEnd="url(#rag-arrow)" />
              <line x1="750" y1="190" x2="750" y2="240" stroke="#475569" strokeWidth="2" markerEnd="url(#rag-arrow)" />
              <line x1="880" y1="110" x2="940" y2="130" stroke="#475569" strokeWidth="2" markerEnd="url(#rag-arrow)" />
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
}
