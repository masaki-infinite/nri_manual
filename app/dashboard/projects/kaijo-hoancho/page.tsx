"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type FitStatus = "適合" | "一部適合" | "不足";

type FitItem = {
  theme: string;
  requirement: string;
  status: FitStatus;
  current: string;
  gap: string;
  action: string;
};

type FeaturePriority = "Must" | "Should" | "Could";

type FeatureItem = {
  title: string;
  priority: FeaturePriority;
  purpose: string;
  implementation: string;
};

type OrgUnit = {
  name: string;
  description: string;
};

type OrgTab = {
  key: string;
  label: string;
  units: OrgUnit[];
};

const fitItems: FitItem[] = [
  {
    theme: "目的整合",
    requirement: "業務負担軽減・生産性向上を目的にRAGを導入",
    status: "適合",
    current: "業務Copilot + 個人資料分析 + 管理ダッシュボードを提供",
    gap: "主要方向性は整合",
    action: "導入効果の定量指標を提案書文言に合わせて表示",
  },
  {
    theme: "RAG要件",
    requirement: "業務データ参照・根拠付き回答・改善ループ",
    status: "適合",
    current: "RAG前提の回答設計、評価イベント/チューニング記録の基盤あり",
    gap: "なし（実装済み領域が中心）",
    action: "お客様画面で「根拠表示」の操作例を追加",
  },
  {
    theme: "LLM要件",
    requirement: "OpenAI GPT等の利用方針明確化",
    status: "一部適合",
    current: "Snowflake基盤でのモデル活用方針を想定",
    gap: "OpenAI GPT採用方針の明示が弱い",
    action: "提案書向けにモデル選定方針（OpenAI/Azure OpenAI/Cortex）を明記",
  },
  {
    theme: "利用規模",
    requirement: "初期最大1,200人、将来15,000人への拡張性",
    status: "不足",
    current: "機能実装の説明中心でスケール計画が未記載",
    gap: "キャパシティ計画・段階拡張の説明不足",
    action: "同時接続想定と段階拡張ロードマップを追加",
  },
  {
    theme: "セキュリティ",
    requirement: "専用領域・ログ閲覧・漏洩防止・法令準拠",
    status: "一部適合",
    current: "専用環境/ログ管理前提、運用メモあり",
    gap: "ISMAP準拠説明、漏洩ブロック機能説明が不足",
    action: "セキュリティ要件対応表（要件IDごと）を追加",
  },
  {
    theme: "運用保守",
    requirement: "24/365、SLA、問い合わせ窓口、障害報告",
    status: "不足",
    current: "システム構築進捗の記載が中心",
    gap: "運用体制/SLA/問合せ導線が未提示",
    action: "運用体制図・SLA・障害時フローを提案書ページに追加",
  },
  {
    theme: "研修",
    requirement: "職員向け研修2回以上（8月/9月想定）",
    status: "不足",
    current: "研修計画の記載なし",
    gap: "導入後の定着支援が見えない",
    action: "研修計画（初級/実践）と教材イメージを追加",
  },
  {
    theme: "効果分析",
    requirement: "中間/最終の定量分析レポート提出",
    status: "不足",
    current: "期待効果の定性表現のみ",
    gap: "指標設計・報告物定義が不足",
    action: "KPIダッシュボード案と報告書テンプレートを追加",
  },
];

const statusStyle: Record<FitStatus, string> = {
  適合: "bg-emerald-100 text-emerald-800 border border-emerald-300",
  一部適合: "bg-amber-100 text-amber-800 border border-amber-300",
  不足: "bg-rose-100 text-rose-800 border border-rose-300",
};

const featureItems: FeatureItem[] = [
  {
    title: "報告書ドラフト自動作成",
    priority: "Must",
    purpose: "資料整理に時間がかかる業務を短縮し、報告書作成を効率化する",
    implementation: "資料要約・過去報告書テンプレートを使って報告書ドラフトを自動生成し、根拠出典を自動添付",
  },
  {
    title: "出張メモ・現場メモの一元保存",
    priority: "Must",
    purpose: "現場で作成したメモを散在させず、後から検索・再利用できるようにする",
    implementation: "テキスト/音声/画像メモを案件単位で保存し、タグ・日付・場所で整理。報告書作成時に再利用可能にする",
  },
  {
    title: "NASデータ探索の高速化（横断検索）",
    priority: "Must",
    purpose: "NAS内の資料探索時間を短縮し、必要データにすぐ到達できるようにする",
    implementation: "NAS既存フォルダを定期取り込みしてインデックス化。ファイル名だけでなく本文・メタ情報で横断検索できるようにする",
  },
  {
    title: "RAGスコープ拡張（課 / 部全体の共有RAG）",
    priority: "Must",
    purpose: "実装済みの個人専用RAGに加え、課・部で共有できる検索基盤を整備する",
    implementation: "現状の owner_id 制御を維持しつつ、group_id / org_id の共有スコープと権限設定を追加",
  },
  {
    title: "課ごとのデータ領域管理",
    priority: "Must",
    purpose: "課単位で資料を共有し、部署内ナレッジ活用を加速する",
    implementation: "課ID付きコーパス管理、課管理者によるアップロード承認、利用者紐付け設定",
  },
  {
    title: "出典表示と根拠確認",
    priority: "Must",
    purpose: "回答の説明可能性を担保し、お客様の信頼を確保する",
    implementation: "回答ごとに参照文書名・参照箇所を表示、クリックで該当箇所へ遷移",
  },
  {
    title: "権限テンプレート（一般職員 / 課管理者 / 部門管理者）",
    priority: "Should",
    purpose: "運用開始時の設定負荷を下げ、権限誤設定を防止する",
    implementation: "ロールごとに既定権限を用意し、画面から付与・変更可能にする",
  },
  {
    title: "利用状況の組織別ダッシュボード",
    priority: "Should",
    purpose: "課別・部別の利用率と効果を可視化し、展開判断に活用する",
    implementation: "組織フィルタ付きKPI（利用回数、満足度、削減時間、トークン消費）を表示",
  },
  {
    title: "導入効果レポート自動生成",
    priority: "Could",
    purpose: "中間・最終報告を効率化し、提案書要件への準拠を強化する",
    implementation: "指定期間の指標とコメントをまとめてPDF出力（中間/最終テンプレート）",
  },
];

const featurePriorityStyle: Record<FeaturePriority, string> = {
  Must: "bg-rose-100 text-rose-800 border border-rose-300",
  Should: "bg-amber-100 text-amber-800 border border-amber-300",
  Could: "bg-sky-100 text-sky-800 border border-sky-300",
};

const orgTabs: OrgTab[] = [
  {
    key: "somu",
    label: "総務部",
    units: [
      { name: "政務課", description: "公文書の管理や法令の審査、組織に関することを担当。施策に関する業務を推進。" },
      { name: "政策評価広報室", description: "海上保安庁業務に関する広報、保有情報の発信、政策評価を担当。" },
      { name: "予算執行管理室", description: "売買、賃借、請負その他契約の締結及び収入に関する業務を担当。" },
      { name: "秘書課", description: "職員の健康管理、福利厚生、共済組合に関する事務を担当。" },
      { name: "人事課", description: "任免、給与、懲戒、服務など職員人事に関する業務を担当。" },
      { name: "情報通信課", description: "海上保安庁が使用する情報通信システムの整備・管理を担当。" },
      { name: "教育訓練管理官", description: "職員の教養及び訓練に関する業務、教育機関との連携を担当。" },
      { name: "主計管理官", description: "経費・収入の予算及び決算に関する事務を担当。" },
      { name: "国際戦略官", description: "国際機関、国際会議等その他の国際的枠組みに関する業務を担当。" },
      { name: "危機管理官", description: "所掌に係る危機管理に関する業務を担当。" },
      { name: "海上保安試験研究センター", description: "立川市の広域防災基地内で試験研究業務を実施。" },
    ],
  },
  {
    key: "soubi",
    label: "装備技術部",
    units: [
      { name: "管理課", description: "装備技術部所掌事務の総合調整、装備管理に関する業務を担当。" },
      { name: "施設補給課", description: "物品検収、国有財産管理、補給関連業務を担当。" },
      { name: "船舶課", description: "使用船舶の基本計画、建造監督など建造に関する業務を担当。" },
      { name: "航空機課", description: "使用航空機の建造・維持に関する業務を担当。" },
    ],
  },
  {
    key: "keibi",
    label: "警備救難部",
    units: [
      { name: "管理課", description: "警備救難部所掌事務の総合調整、業務利用資機材に関する業務を担当。" },
      { name: "刑事課", description: "海上における法令違反防止、犯罪捜査等に関する業務を担当。" },
      { name: "国際刑事課", description: "薬物・銃器等の国際的犯罪対策に関する業務を担当。" },
      { name: "警備課", description: "テロ対策、不審船・工作船対策など警備業務を担当。" },
      { name: "警備情報課", description: "警備情報の収集、分析、調査及び管理を担当。" },
      { name: "救難課", description: "海難時の人命・積荷・船舶救助及び救済に関する業務を担当。" },
      { name: "環境防災課", description: "危険物荷役災害防止、海上防災・環境保全に関する業務を担当。" },
    ],
  },
  {
    key: "kaiyo",
    label: "海洋情報部",
    units: [
      { name: "企画課", description: "海洋情報業務の総合調整、企画・立案、水路図誌関連業務を担当。" },
      { name: "技術・国際課", description: "海洋情報業務の技術事項の企画・立案、国際連携を担当。" },
      { name: "沿岸調査課", description: "沿岸水路測量、沿岸海象観測に関する業務を担当。" },
      { name: "大洋調査課", description: "大陸棚測量、沖合水路測量、沖合海象観測に関する業務を担当。" },
      { name: "情報管理課", description: "海洋情報の収集・管理、管轄海域情報管理等を担当。" },
      { name: "情報利用推進課", description: "水路図誌・航空図誌の調製供給、水路通報・航行警報発出等を担当。" },
    ],
  },
  {
    key: "kotsu",
    label: "交通部",
    units: [
      { name: "企画課", description: "交通部所掌事務の総合調整、海上交通重要事項の企画立案を担当。" },
      { name: "航行安全課", description: "船舶交通障害の除去、関係者への指導等を担当。" },
      { name: "安全対策課", description: "海難調査、海難防止計画など安全対策業務を担当。" },
      { name: "整備課", description: "航路標識用施設建設、航路標識機器調達等を担当。" },
    ],
  },
  {
    key: "kansatsukan",
    label: "首席監察官",
    units: [
      { name: "首席監察官", description: "本庁・管区に設置され、国民の視点で公正かつ客観的に庁内監察を実施。" },
    ],
  },
  {
    key: "kyoiku",
    label: "教育機関",
    units: [
      { name: "海上保安大学校", description: "幹部職員の養成教育機関。" },
      { name: "海上保安学校", description: "現場職員の基礎教育機関。" },
      { name: "海上保安学校 門司分校", description: "地域分校としての教育訓練を実施。" },
      { name: "海上保安学校 宮城分校", description: "地域分校としての教育訓練を実施。" },
      { name: "北九州航空研修センター", description: "航空分野の専門研修を実施。" },
    ],
  },
  {
    key: "hombu",
    label: "本部（地方）",
    units: [
      { name: "第一管区海上保安本部", description: "地方本部" },
      { name: "第二管区海上保安本部", description: "地方本部" },
      { name: "第三管区海上保安本部", description: "地方本部" },
      { name: "第四管区海上保安本部", description: "地方本部" },
      { name: "第五管区海上保安本部", description: "地方本部" },
      { name: "第六管区海上保安本部", description: "地方本部" },
      { name: "第七管区海上保安本部", description: "地方本部" },
      { name: "第八管区海上保安本部", description: "地方本部" },
      { name: "第九管区海上保安本部", description: "地方本部" },
      { name: "第十管区海上保安本部", description: "地方本部" },
      { name: "第十一管区海上保安本部", description: "地方本部" },
    ],
  },
];

export default function KaijoHoanchoProjectPage() {
  const fitCount = fitItems.filter((x) => x.status === "適合").length;
  const partialCount = fitItems.filter((x) => x.status === "一部適合").length;
  const gapCount = fitItems.filter((x) => x.status === "不足").length;
  const [activeMainTab, setActiveMainTab] = useState<"app" | "org" | "materials" | "topic">("app");
  const [activeOrgTab, setActiveOrgTab] = useState(orgTabs[0].key);
  const [activeMaterialTab, setActiveMaterialTab] = useState<"proposal" | "sbir">("proposal");

  const activeOrg = useMemo(
    () => orgTabs.find((tab) => tab.key === activeOrgTab) ?? orgTabs[0],
    [activeOrgTab]
  );

  return (
    <div className="pb-10">
      <div className="mb-6">
        <Link
          href="/dashboard/projects"
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          ← 案件リストに戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">海上保安庁向け 生成AI導入 提案スライド</h2>
      <p className="text-gray-600 mb-8">
        提案書 PDF の要求事項に照らして、本アプリの適合度と不足項目をスライド形式で可視化しています。
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setActiveMainTab("app")}
          className={`px-4 py-2 rounded-full text-sm border transition ${
            activeMainTab === "app"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
          }`}
        >
          アプリについて
        </button>
        <button
          type="button"
          onClick={() => setActiveMainTab("org")}
          className={`px-4 py-2 rounded-full text-sm border transition ${
            activeMainTab === "org"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
          }`}
        >
          組織タブ
        </button>
        <button
          type="button"
          onClick={() => setActiveMainTab("materials")}
          className={`px-4 py-2 rounded-full text-sm border transition ${
            activeMainTab === "materials"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
          }`}
        >
          資料タブ
        </button>
        <button
          type="button"
          onClick={() => setActiveMainTab("topic")}
          className={`px-4 py-2 rounded-full text-sm border transition ${
            activeMainTab === "topic"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
          }`}
        >
          トピックタブ
        </button>
      </div>

      <div className="space-y-8">
        {activeMainTab === "app" && (
          <>
        <section className="min-h-[64vh] rounded-2xl border border-slate-200 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-8 md:p-10 shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-amber-700 text-sm tracking-wide">Slide 01</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">海上保安庁の実状（現場課題）</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-5">
            <div className="rounded-xl bg-white border border-amber-200 p-5">
              <div className="font-semibold text-amber-900 mb-2">現状の背景</div>
              <ul className="space-y-2 text-slate-700">
                <li>・違法操業や海洋調査などへの対応で業務量が増加</li>
                <li>・人材確保難や離職増加により現場負荷が高止まり</li>
                <li>・NAS中心運用で、必要資料を探す時間が長い</li>
              </ul>
            </div>
            <div className="rounded-xl bg-white border border-amber-200 p-5">
              <div className="font-semibold text-amber-900 mb-2">実務上の困りごと</div>
              <ul className="space-y-2 text-slate-700">
                <li>・報告書や議事録作成に時間がかかる</li>
                <li>・出張時メモや現場知見が散在し、再利用しづらい</li>
                <li>・根拠資料の確認・提示に手戻りが発生しやすい</li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900 text-slate-100 p-5 mt-5">
            <div className="text-sm text-slate-300 mb-2">このアプリで狙う改善</div>
            <p className="leading-7">
              NAS横断検索で探索時間を短縮し、根拠付き回答で確認工数を削減。<br />
              報告書ドラフト生成と出張メモの一元管理により、現場から管理部門までの業務効率化を実現します。
            </p>
          </div>
        </section>

        <section className="min-h-[64vh] rounded-2xl border border-slate-200 bg-white p-8 md:p-10 shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 text-sm tracking-wide">Slide 02</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">提案書要件との適合性一覧</h3>
            </div>
            <div className="text-xs text-slate-500">出典: 提案書PDF(生成AI導入にかかる実証業務)</div>
          </div>

          <div className="space-y-3">
            {fitItems.map((item) => (
              <div key={item.theme} className="rounded-xl border border-slate-200 p-4 bg-slate-50/60">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <div className="text-lg font-semibold text-slate-900">{item.theme}</div>
                  <span className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[item.status]}`}>
                    {item.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-slate-500 mb-1">提案書の要求</div>
                    <div className="text-slate-800">{item.requirement}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">現在のアプリ状態</div>
                    <div className="text-slate-800">{item.current}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">不足・リスク</div>
                    <div className="text-slate-800">{item.gap}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">提案アクション</div>
                    <div className="text-slate-800">{item.action}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="min-h-[64vh] rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8 md:p-10 shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-indigo-600 text-sm tracking-wide">Slide 03</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">このアプリに実装すべき機能</h3>
            </div>
            <div className="text-xs text-slate-500">テーマ: 個人単位・課単位・部全体RAGの実装</div>
          </div>

          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 mb-5 text-sm text-indigo-900">
            方針: 個人専用RAGは実装済み。次段階として、課・部で共有できるRAGスコープを追加し、3階層で使い分け可能にする。
          </div>

          <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 mb-5 text-sm text-cyan-900">
            現場課題の反映: 資料整理の負荷軽減、報告書作成の時短、出張時メモの蓄積、NAS内データ探索の短縮を重点テーマとして追加。
          </div>

          <div className="space-y-3">
            {featureItems.map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <div className="text-lg font-semibold text-slate-900">{item.title}</div>
                  <span
                    className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold ${featurePriorityStyle[item.priority]}`}
                  >
                    {item.priority}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-slate-500 mb-1">目的</div>
                    <div className="text-slate-800">{item.purpose}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">実装内容</div>
                    <div className="text-slate-800">{item.implementation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

          </>
        )}

        {activeMainTab === "org" && (
        <section className="min-h-[64vh] rounded-2xl border border-slate-200 bg-white p-8 md:p-10 shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-slate-500 text-sm tracking-wide">Slide 05</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">海上保安庁の組織タブ</h3>
            </div>
            <div className="text-xs text-slate-500">組織情報を部門ごとに切替表示</div>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {orgTabs.map((tab) => {
              const isActive = tab.key === activeOrgTab;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveOrgTab(tab.key)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    isActive
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-4">
            <div className="text-lg font-semibold text-slate-900">{activeOrg.label}</div>
            <div className="text-sm text-slate-600">部署一覧と概要（詳しく見る想定）</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeOrg.units.map((unit) => (
              <div key={unit.name} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-semibold text-slate-900">{unit.name}</h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-100 text-cyan-800">詳しく見る</span>
                </div>
                <p className="text-sm text-slate-700 leading-6">{unit.description}</p>
              </div>
            ))}
          </div>
        </section>
        )}

        {activeMainTab === "materials" && (
          <section className="min-h-[70vh] rounded-2xl border border-slate-200 bg-white p-8 md:p-10 shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-slate-500 text-sm tracking-wide">Slide 04</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-2">資料タブ（PDF表示）</h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              <button
                type="button"
                onClick={() => setActiveMaterialTab("proposal")}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${
                  activeMaterialTab === "proposal"
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}
              >
                提案書PDF
              </button>
              <button
                type="button"
                onClick={() => setActiveMaterialTab("sbir")}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${
                  activeMaterialTab === "sbir"
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}
              >
                SBIR PDF
              </button>
            </div>

            <div className="flex justify-end mb-3">
              <a
                href={activeMaterialTab === "proposal" ? "/kaiho-proposal.pdf" : "/kaiho-sbir.pdf"}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                別タブで開く
              </a>
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
              <iframe
                src={activeMaterialTab === "proposal" ? "/kaiho-proposal.pdf" : "/kaiho-sbir.pdf"}
                title={activeMaterialTab === "proposal" ? "海上保安庁 提案書 PDF" : "海上保安庁 SBIR PDF"}
                className="w-full h-[72vh]"
              />
            </div>
          </section>
        )}

        {activeMainTab === "topic" && (
          <section className="min-h-[70vh] rounded-2xl border border-slate-200 bg-white p-8 md:p-10 shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-slate-500 text-sm tracking-wide">Slide 06</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-2">海上保安庁が取り組んでいる主な先端技術</h3>
              </div>
            </div>

            <div className="space-y-5 text-sm">
              <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-5">
                <h4 className="text-lg font-semibold text-cyan-900 mb-2">1. AIによる船舶衝突リスク予測</h4>
                <p className="text-slate-700 leading-7 mb-3">
                  海上保安庁は富士通と共同で、AIS（船舶自動識別装置）の航行データをAIに学習させ、
                  船舶同士の衝突リスクを予測する実証実験を実施しました。
                </p>
                <div className="rounded-lg bg-white border border-cyan-200 p-4">
                  <div className="font-semibold text-slate-900 mb-2">成果</div>
                  <ul className="space-y-1 text-slate-700">
                    <li>・衝突リスクの高い船舶を早期検知</li>
                    <li>・不要な警報を約90％削減</li>
                    <li>・東京湾の海上交通管制業務への活用可能性を確認</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">
                <h4 className="text-lg font-semibold text-indigo-900 mb-2">2. 生成AI導入実証</h4>
                <p className="text-slate-700 leading-7 mb-3">
                  2026年には海上保安庁が「生成AI導入にかかる実証業務」を公募しており、
                  行政業務への生成AI活用を本格的に検討し始めています。
                </p>
                <div className="rounded-lg bg-white border border-indigo-200 p-4">
                  <div className="font-semibold text-slate-900 mb-2">想定される用途</div>
                  <ul className="space-y-1 text-slate-700">
                    <li>・文書作成支援</li>
                    <li>・報告書要約</li>
                    <li>・法令・マニュアル検索</li>
                    <li>・ナレッジ共有</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
