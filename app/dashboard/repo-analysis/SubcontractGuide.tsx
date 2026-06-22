"use client";

import { Fragment, useMemo, useState } from "react";
import {
  SiSnowflake,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTerraform,
  SiDbt,
} from "react-icons/si";
import {
  FaSearch,
  FaRobot,
  FaShieldAlt,
  FaDatabase,
  FaUsersSlash,
  FaExclamationTriangle,
  FaFileSignature,
  FaArrowRight,
  FaArrowDown,
  FaAws,
  FaIndustry,
  FaStore,
  FaBalanceScale,
  FaGavel,
  FaUniversalAccess,
  FaPalette,
  FaExchangeAlt,
  FaDesktop,
  FaServer,
  FaLock,
  FaPen,
  FaTable,
  FaUser,
  FaPaperPlane,
  FaReply,
  FaFileExcel,
  FaClipboardList,
  FaIdCard,
  FaProjectDiagram,
  FaChartBar,
  FaFilter,
  FaBell,
  FaCircle,
  FaCheckCircle,
  FaWindowMaximize,
  FaCoins,
  FaTimesCircle,
  FaBolt,
  FaUsers,
  FaFileImport,
  FaCut,
  FaSyncAlt,
  FaLayerGroup,
} from "react-icons/fa";

type TabId = "slides" | "overview" | "architecture" | "wbs" | "steps" | "docs" | "artifacts" | "qa";

type SlideKind = "default" | "challenge" | "rag" | "stack" | "relationship" | "dads" | "datarequest" | "poc" | "cortex";

type Slide = {
  title: string;
  keyMessage: string;
  bullets: string[];
  refs: string[];
  kind?: SlideKind;
};

type Faq = {
  q: string;
  a: string;
};

const tabs: { id: TabId; label: string }[] = [
  { id: "slides", label: "🎯 説明スライド" },
  { id: "overview", label: "🧾 概要" },
  { id: "architecture", label: "🏗️ 構成図" },
  { id: "wbs", label: "📅 WBS" },
  { id: "steps", label: "📋 手順書" },
  { id: "docs", label: "📌 重要ポイント" },
  { id: "artifacts", label: "📁 成果物" },
  { id: "qa", label: "❓ Q&A" },
];

const faqList: Faq[] = [
  {
    q: "このプロジェクトは実装済みですか、それとも設計中心ですか？",
    a: "設計SSOTとモックUIが先行する段階です。design.yaml を中心に設計を確定し、web は stage=mock で画面導線を検証しています。R2まで承認済み、R3以降が今後の実装本流です。",
  },
  {
    q: "RAG の検索基盤には何を使いますか？",
    a: "Cortex Search Service は採用せず、AI_EMBED + VECTOR_COSINE_SIMILARITY と Semantic View を組み合わせます。固定費を発生させない（no-fixed-cost）方針に沿った設計です。",
  },
  {
    q: "機密データはどのように統制しますか？",
    a: "機密性を level_1〜3 で区分し、特に過去相談データ（通報者保護）は機密性3として Secure View と監査ログ（QUERY_HISTORY 1年保持）で統制します。Standard Edition のため Masking/RAP ではなく Secure View で機密分離します。",
  },
  {
    q: "画面仕様と機能仕様は対応づけて追えますか？",
    a: "追えます。design/1-55-ui.yaml の pages と design/1-45-features.yaml の feature_refs が紐づき、html のワイヤーフレームが視覚的な根拠になる三点対応構造です。",
  },
  {
    q: "なぜ CRON / 定期実行を使わないのですか？",
    a: "ADR方針で固定費最小化が求められているためです。データ更新は on-demand（手動one-shot / dbt run-operation）に統一し、常時稼働コストを抑えます。",
  },
  {
    q: "AIはどこまで判断しますか？",
    a: "AIは suggestive（提案型）として根拠付きで候補・理由を提示します。立入検査やヒアリングの最終判断は officer / policy_reviewer が行う human-in-the-loop 設計です。",
  },
];

function ChallengeDiagram() {
  const pains = [
    { icon: <FaExclamationTriangle />, title: "違反疑義の見落とし", desc: "膨大な取引・相談・調査データから優先すべき事業者を人手で絞り込めない" },
    { icon: <FaUsersSlash />, title: "Gメンの属人化", desc: "ヒアリング対象の選定・巡回計画が担当者の経験に依存し再現性が低い" },
    { icon: <FaFileSignature />, title: "計画策定の負荷", desc: "立入検査計画書・巡回計画書（様式1/様式2）の作成に多大な工数" },
  ];
  return (
    <div className="bg-white border border-rose-100 rounded-lg p-4">
      <div className="text-xs font-semibold text-rose-700 mb-3">お客様（中小企業庁）の課題</div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-center">
        <div className="space-y-2">
          {pains.map((p) => (
            <div key={p.title} className="flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3">
              <span className="text-rose-600 text-lg mt-0.5">{p.icon}</span>
              <div>
                <div className="text-sm font-semibold text-rose-900">{p.title}</div>
                <div className="text-xs text-rose-700 leading-5">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex md:flex-col items-center justify-center text-indigo-500">
          <FaArrowRight className="hidden md:block text-2xl" />
          <FaArrowDown className="md:hidden text-2xl" />
          <span className="text-[10px] font-bold text-indigo-600 mt-1">AIで解決</span>
        </div>
        <div className="rounded-lg border border-indigo-200 bg-gradient-to-br from-indigo-50 to-sky-50 p-4 text-center">
          <FaRobot className="text-indigo-600 text-3xl mx-auto mb-2" />
          <div className="text-sm font-bold text-indigo-900">生成AI執行支援基盤</div>
          <div className="text-xs text-indigo-700 leading-5 mt-1">
            データを横断し、根拠付きで「優先すべき事業者」「ヒアリング候補」「計画ドラフト」を提示
          </div>
        </div>
      </div>
    </div>
  );
}

type CostKind = "none" | "compute" | "ai" | "storage";
function CostTag({ kind, note }: { kind: CostKind; note?: string }) {
  const map: Record<CostKind, { label: string; cls: string; icon: JSX.Element }> = {
    none: { label: "課金なし", cls: "bg-gray-100 text-gray-500 border-gray-200", icon: <FaCircle className="text-gray-300" /> },
    compute: { label: "WH従量", cls: "bg-amber-100 text-amber-700 border-amber-200", icon: <FaServer className="text-amber-500" /> },
    ai: { label: "AIトークン", cls: "bg-violet-100 text-violet-700 border-violet-200", icon: <FaRobot className="text-violet-500" /> },
    storage: { label: "ストレージ", cls: "bg-sky-100 text-sky-700 border-sky-200", icon: <FaDatabase className="text-sky-500" /> },
  };
  const m = map[kind];
  return (
    <span className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] font-semibold ${m.cls}`}>
      {m.icon}{m.label}{note ? `：${note}` : ""}
    </span>
  );
}

function RagDiagram() {
  const steps = [
    { icon: <FaDatabase />, color: "bg-blue-600", title: "①データ統合", desc: "勧告・相談・取引DB・JFTC/METI公開資料を Snowflake に集約" },
    { icon: <SiSnowflake />, color: "bg-sky-500", title: "②ベクトル化", desc: "Function SP 経由の AI_EMBED（arctic-embed）で埋め込み生成。Cortex Search は不採用" },
    { icon: <FaSearch />, color: "bg-violet-600", title: "③意味検索", desc: "VECTOR_COSINE_SIMILARITY + Semantic View で関連根拠を抽出" },
    { icon: <FaRobot />, color: "bg-emerald-600", title: "④回答生成", desc: "Cortex Agent が根拠付きで候補・理由・計画案を提示" },
  ];
  return (
    <div className="space-y-4">
      {/* RAG フロー */}
      <div className="bg-white border border-indigo-100 rounded-lg p-4">
        <div className="text-xs font-semibold text-indigo-700 mb-3">RAG（検索拡張生成）の流れ ― Cortex Search を使わない構成</div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-2 items-stretch">
          {steps.map((s, i) => (
            <Fragment key={s.title}>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full ${s.color} text-white flex items-center justify-center mb-2`}>
                  {s.icon}
                </div>
                <div className="text-sm font-semibold text-gray-800">{s.title}</div>
                <div className="text-xs text-gray-600 leading-5 mt-1">{s.desc}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex items-center justify-center text-gray-400">
                  <FaArrowRight className="hidden md:block" />
                  <FaArrowDown className="md:hidden" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
        <div className="mt-3 rounded-md bg-sky-50 border border-sky-200 p-2 text-xs text-sky-800">
          <SiSnowflake className="inline text-sky-500 mr-1" />
          検索段（Retrieval）は Cortex Search の代わりに <span className="font-mono">AI_EMBED</span> ＋{" "}
          <span className="font-mono">VECTOR_COSINE_SIMILARITY</span> を Function SP に自前実装。固定費のかかる索引を持たない（no-fixed-cost）。
        </div>
      </div>

      {/* フロント ↔ Snowflake 境界 */}
      <div className="bg-white border border-indigo-100 rounded-lg p-4">
        <div className="text-xs font-semibold text-indigo-700 mb-3">フロントエンド ↔ Snowflake の処理境界（3経路）</div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.4fr] gap-3 items-stretch">
          {/* フロント側 */}
          <div className="rounded-lg border-2 border-slate-300 bg-slate-50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <FaDesktop className="text-slate-700" />
              <span className="text-sm font-bold text-slate-800">フロントエンド</span>
            </div>
            <div className="text-[11px] text-slate-500 mb-2">Next.js 16（SPCS 上で稼働）</div>
            <ul className="space-y-1.5 text-[11px]">
              <li className="flex items-center gap-1.5 rounded bg-white border border-blue-200 px-2 py-1">
                <FaTable className="text-blue-600 flex-shrink-0" />
                <span><span className="font-semibold text-blue-800">Read</span>：Kysely + zod で SELECT</span>
              </li>
              <li className="flex items-center gap-1.5 rounded bg-white border border-amber-200 px-2 py-1">
                <FaPen className="text-amber-600 flex-shrink-0" />
                <span><span className="font-semibold text-amber-800">Write</span>：Action SP を呼ぶのみ</span>
              </li>
              <li className="flex items-center gap-1.5 rounded bg-white border border-emerald-200 px-2 py-1">
                <FaRobot className="text-emerald-600 flex-shrink-0" />
                <span><span className="font-semibold text-emerald-800">AI</span>：問い＋文脈を Agent へ渡すのみ</span>
              </li>
            </ul>
          </div>

          {/* 境界の矢印 */}
          <div className="flex md:flex-col items-center justify-center gap-1 text-gray-400">
            <FaArrowRight className="hidden md:block text-lg" />
            <FaArrowDown className="md:hidden text-lg" />
            <span className="text-[10px] font-bold text-gray-500 text-center leading-3">SP / Agent<br/>呼び出し</span>
          </div>

          {/* Snowflake 側 */}
          <div className="rounded-lg border-2 border-sky-300 bg-sky-50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <FaServer className="text-sky-700" />
              <SiSnowflake className="text-sky-500" />
              <span className="text-sm font-bold text-sky-800">Snowflake（計算はここで完結）</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5 text-[11px]">
              <div className="rounded bg-white border border-blue-200 px-2 py-1">
                <FaLock className="inline text-blue-600 mr-1" />
                <span className="font-semibold text-blue-800">Secure View</span>：Read 経路の参照先（書込不可・機密分離）
              </div>
              <div className="rounded bg-white border border-amber-200 px-2 py-1">
                <FaPen className="inline text-amber-600 mr-1" />
                <span className="font-semibold text-amber-800">Action SP</span>：唯一の書込口（hybrid table が SSOT）
              </div>
              <div className="rounded bg-white border-2 border-emerald-300 px-2 py-1">
                <FaRobot className="inline text-emerald-600 mr-1" />
                <span className="font-semibold text-emerald-800">Cortex Agent</span>：オーケストレーター
                <ul className="list-disc pl-5 mt-1 text-emerald-700 leading-5">
                  <li><span className="font-semibold">Function SP</span>（AI_EMBED + VECTOR_COSINE）＝非構造テキストの意味検索</li>
                  <li><span className="font-semibold">Cortex Analyst + Semantic View</span>＝構造化データの NL→SQL 集計</li>
                  <li>結果を LLM で合成し<span className="font-semibold">出典付き</span>で返却</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 rounded-md bg-amber-50 border border-amber-200 p-2 text-xs text-amber-800">
          <FaShieldAlt className="inline mr-1" />
          フロントは埋め込み・ベクトル類似度・NL→SQL・LLM 推論のいずれにも直接触れない。個人情報を含む文書を外部 LLM へ送らない境界も「計算は Snowflake 内で完結」で担保。
        </div>
      </div>

      {/* 質問→回答の往復シーケンス */}
      <div className="bg-white border border-indigo-100 rounded-lg p-4">
        <div className="text-xs font-semibold text-indigo-700 mb-3">
          ユーザーが質問したときの往復（フロント → Snowflake → フロント）
        </div>
        {/* レーン見出し */}
        <div className="grid grid-cols-3 gap-2 mb-2 text-center text-[11px] font-bold">
          <div className="flex items-center justify-center gap-1.5 text-gray-700">
            <FaUser className="text-gray-500" /> ユーザー
          </div>
          <div className="flex items-center justify-center gap-1.5 text-slate-700">
            <FaDesktop className="text-slate-500" /> フロントエンド
          </div>
          <div className="flex items-center justify-center gap-1.5 text-sky-700">
            <SiSnowflake className="text-sky-500" /> Snowflake
          </div>
        </div>

        {(() => {
          const seq = [
            { lane: 0, dir: "right", n: 1, label: "質問を入力", desc: "「業種別の買いたたき疑いを優先度順に」など" },
            { lane: 1, dir: "right", n: 2, label: "Cortex Agent を呼び出し", desc: "問い＋文脈を渡す（生のSQLやベクトルは送らない）" },
            { lane: 2, dir: "none", n: 3, label: "Agent がツールを判断・実行", desc: "Function SP（意味検索）/ Cortex Analyst（NL→SQL集計）を呼ぶ" },
            { lane: 2, dir: "none", n: 4, label: "LLM で合成", desc: "検索・集計結果を根拠付きで要約（出典を付与）" },
            { lane: 1, dir: "left", n: 5, label: "結果を受信", desc: "Snowflake から出典付きの回答JSONが返る" },
            { lane: 0, dir: "left", n: 6, label: "画面に表示", desc: "候補・理由・出典・計画ドラフトを表示" },
          ];
          const laneCol = ["", "", ""];
          return (
            <div className="space-y-1.5">
              {seq.map((s) => (
                <div key={s.n} className="grid grid-cols-3 gap-2 items-stretch">
                  {laneCol.map((_, col) => {
                    if (col !== s.lane) {
                      return <div key={col} className="border-l-2 border-dashed border-gray-200 mx-auto w-px" />;
                    }
                    const tone =
                      s.lane === 0
                        ? "border-gray-300 bg-gray-50"
                        : s.lane === 1
                        ? "border-slate-300 bg-slate-50"
                        : "border-sky-300 bg-sky-50";
                    return (
                      <div key={col} className={`rounded-lg border ${tone} p-2`}>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                            {s.n}
                          </span>
                          <span className="text-[12px] font-semibold text-gray-800">{s.label}</span>
                          {s.dir === "right" && <FaPaperPlane className="text-indigo-500 text-[11px]" title="送信" />}
                          {s.dir === "left" && <FaReply className="text-emerald-500 text-[11px]" title="返却" />}
                        </div>
                        <div className="text-[10px] text-gray-600 leading-4 pl-6">{s.desc}</div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })()}

        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-gray-600">
          <span className="flex items-center gap-1"><FaPaperPlane className="text-indigo-500" /> フロント→Snowflake（送信）</span>
          <span className="flex items-center gap-1"><FaReply className="text-emerald-500" /> Snowflake→フロント（返却）</span>
          <span className="text-gray-400">※ ③④は Snowflake 内で完結し、フロントは結果だけを受け取る</span>
        </div>
      </div>

      {/* ナレッジを Snowflake に保存するまで（事前バッチ：取込・索引構築） */}
      <div className="bg-white border border-indigo-100 rounded-lg p-4">
        <div className="text-xs font-semibold text-indigo-700 mb-1">
          ナレッジを Snowflake に保存するまでの流れ（事前バッチ：取込・索引構築）
        </div>
        <div className="text-[11px] text-gray-600 leading-5 mb-3">
          上の往復は<span className="font-semibold">「すでに検索できる状態」</span>を前提にした実行時の処理。そのための<span className="font-semibold">ベクトル付きデータは、事前に下記の取込フローで Snowflake 内に作り込んでおく</span>（リアルタイムではなく定期実行）。下は<span className="font-semibold">時系列（上から下）</span>で、誰が処理するかをレーンで表したもの。
        </div>
        {/* レーン見出し */}
        <div className="grid grid-cols-3 gap-2 mb-2 text-center text-[11px] font-bold">
          <div className="flex items-center justify-center gap-1.5 text-gray-700">
            <FaUser className="text-gray-500" /> ユーザー（運用担当）
          </div>
          <div className="flex items-center justify-center gap-1.5 text-slate-700">
            <FaDesktop className="text-slate-500" /> フロントエンド
          </div>
          <div className="flex items-center justify-center gap-1.5 text-sky-700">
            <SiSnowflake className="text-sky-500" /> Snowflake
          </div>
        </div>
        {(() => {
          const flow: { lane: number; mark: string; icon: JSX.Element; label: string; desc: string; cost: CostKind[] }[] = [
            { lane: 0, mark: "send", icon: <FaFileImport />, label: "ソース文書を準備・登録", desc: "勧告・相談・取引DB・JFTC/METI公開資料（PDF/Excel/CSV）を用意", cost: ["none"] },
            { lane: 1, mark: "send", icon: <FaPen />, label: "取込画面から「データ登録」を実行", desc: "ファイルを Stage へ連携する指示を送るのみ", cost: ["none"] },
            { lane: 2, mark: "proc", icon: <FaFileImport />, label: "Stage にファイル受領", desc: "内部/外部ステージに格納", cost: ["storage"] },
            { lane: 2, mark: "proc", icon: <SiDbt className="text-white" />, label: "ロード・整形", desc: "COPY INTO でテーブル化 → dbt-core で raw/staging/mart に構造化・クレンジング", cost: ["compute"] },
            { lane: 2, mark: "proc", icon: <FaCut />, label: "チャンク分割", desc: "文書を意味単位（段落・条文）に分割し、出典・日付・機密区分などメタデータ付与", cost: ["compute"] },
            { lane: 2, mark: "proc", icon: <SiSnowflake className="text-white" />, label: "ベクトル化（Function SP 経由）", desc: "Function SP に集約した AI_EMBED（arctic-embed）で各チャンクを埋め込み生成。取込時も検索時も同一の Function SP を通す → VECTOR 型カラムへ", cost: ["ai"] },
            { lane: 2, mark: "proc", icon: <FaDatabase />, label: "mart 層テーブルに保存（＋ベクトル列）", desc: "本文＋メタ＋ベクトルを mart（派生テーブル）へ格納。raw→staging→mart の単方向で hybrid には置かない（stg→hybrid 逆流禁止）。Semantic View / 検索対象を定義", cost: ["storage"] },
            { lane: 1, mark: "return", icon: <FaReply />, label: "取込完了を表示", desc: "登録件数・ステータスを画面に反映", cost: ["none"] },
            { lane: 0, mark: "return", icon: <FaCheckCircle />, label: "登録完了を確認", desc: "以降この文書は検索対象に（往復フローで参照可能）", cost: ["none"] },
            { lane: 2, mark: "batch", icon: <FaSyncAlt />, label: "増分更新（定期バッチ）", desc: "新規・更新分のみ再処理し、差分だけを反映", cost: ["compute", "ai"] },
          ];
          const laneTone = ["border-gray-300 bg-gray-50", "border-slate-300 bg-slate-50", "border-sky-300 bg-sky-50"];
          const markDot: Record<string, string> = { send: "bg-indigo-500", return: "bg-emerald-500", proc: "bg-sky-500", batch: "bg-slate-500" };
          return (
            <div className="space-y-1.5">
              {flow.map((s, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2 items-stretch">
                  {[0, 1, 2].map((col) => {
                    if (col !== s.lane) {
                      return <div key={col} className="border-l-2 border-dashed border-gray-200 mx-auto w-px" />;
                    }
                    return (
                      <div key={col} className={`rounded-lg border ${laneTone[s.lane]} p-2`}>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`w-5 h-5 rounded-full ${markDot[s.mark]} text-white text-[10px] flex items-center justify-center flex-shrink-0`}>
                            {s.icon}
                          </span>
                          <span className="text-[12px] font-semibold text-gray-800">{s.label}</span>
                          {s.mark === "send" && <FaPaperPlane className="text-indigo-500 text-[11px]" title="送信" />}
                          {s.mark === "return" && <FaReply className="text-emerald-500 text-[11px]" title="返却" />}
                          {s.mark === "batch" && <FaSyncAlt className="text-slate-500 text-[11px]" title="定期実行" />}
                        </div>
                        <div className="text-[10px] text-gray-600 leading-4 pl-6">{s.desc}</div>
                        <div className="flex flex-wrap gap-1 mt-1 pl-6">
                          {s.cost.map((c, ci) => <CostTag key={ci} kind={c} />)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })()}
        <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-gray-600">
          <span className="flex items-center gap-1"><FaPaperPlane className="text-indigo-500" /> ユーザー/フロント→Snowflake（送信）</span>
          <span className="flex items-center gap-1"><FaReply className="text-emerald-500" /> Snowflake→フロント/ユーザー（返却）</span>
          <span className="flex items-center gap-1"><FaSyncAlt className="text-slate-500" /> 定期バッチ</span>
          <span className="text-gray-400">※ 中央のロード〜保存は Snowflake 内で完結</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-gray-500">
          <span className="font-semibold text-gray-600">課金凡例：</span>
          <CostTag kind="compute" /><CostTag kind="ai" /><CostTag kind="storage" /><CostTag kind="none" />
          <span>いずれも従量。固定的サービング費（Cortex Search）は持たない。</span>
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px]">
          <div className="rounded bg-sky-50 border border-sky-200 p-2 leading-4">
            <SiSnowflake className="inline text-sky-500 mr-1" />
            検索専用の<span className="font-semibold">常駐索引（Cortex Search）は作らない</span>。VECTOR 型カラム＋<span className="font-mono">VECTOR_COSINE_SIMILARITY</span> で十分なため、保存先は通常テーブルのまま。
          </div>
          <div className="rounded bg-amber-50 border border-amber-200 p-2 leading-4">
            <FaLayerGroup className="inline text-amber-600 mr-1" />
            取込の保存先は<span className="font-semibold">mart（ベクトル列付き派生テーブル）</span>。<span className="font-semibold">hybrid table はユーザー操作起点の書込（Action SP）専用の SSOT</span> に限定し、取込バッチは hybrid に書かない（<span className="font-mono">stg→hybrid</span> 逆流禁止）。フロントは取込パイプラインに直接触れない。
          </div>
        </div>
      </div>
    </div>
  );
}

function StackDiagram() {
  const stack = [
    { icon: <SiNextdotjs className="text-black" />, name: "Next.js 16", role: "フロントエンド / Server Actions" },
    { icon: <SiReact className="text-sky-500" />, name: "React 19", role: "UI コンポーネント" },
    { icon: <SiTypescript className="text-blue-600" />, name: "TypeScript", role: "型安全（zod / Kysely）" },
    { icon: <SiSnowflake className="text-sky-500" />, name: "Snowflake", role: "Standard Edition / Cortex" },
    { icon: <SiDbt className="text-orange-600" />, name: "dbt-core 1.8", role: "データ変換 / モデリング" },
    { icon: <SiTerraform className="text-violet-600" />, name: "Terraform", role: "IaC / 環境構築" },
    { icon: <FaAws className="text-orange-500" />, name: "AWS", role: "ap-northeast-1 / SPCS" },
  ];
  return (
    <div className="bg-white border border-emerald-100 rounded-lg p-4">
      <div className="text-xs font-semibold text-emerald-700 mb-3">採用サービス / 技術スタック</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {stack.map((s) => (
          <div key={s.name} className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center flex flex-col items-center">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-xs font-bold text-gray-800">{s.name}</div>
            <div className="text-[10px] text-gray-500 leading-4 mt-0.5">{s.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const termDescriptions: Record<string, string> = {
  "各種調査（書面調査：親調/下調）":
    "親事業者（親調）と下請事業者（下調）に対する書面調査。取引条件・支払状況・代金決定方法などを定期的に把握し、違反の端緒を検出する基礎データとなる。",
  "取引Gメン":
    "中小企業庁の取引調査員。現場ヒアリングや巡回を通じて、書面に表れにくい価格交渉・支払実態・しわ寄せの状況を聞き取り、執行の根拠を収集する。",
  "取引かけこみ寺":
    "中小企業が取引上のトラブルを無料で相談できる窓口。相談カードとして寄せられた声が、違反疑義や被害実態の重要なシグナルになる。",
  "企業間取引DB":
    "企業間の受発注・取引関係を蓄積したデータベース。受注ネットワークやサプライチェーン構造を可視化し、影響範囲の大きい事業者の特定に用いる。",
  買いたたき:
    "通常支払われる対価に比べ著しく低い代金を不当に定めること。原材料費・労務費の上昇分を価格に反映させない場合などが該当する。",
  支払遅延:
    "下請代金を、給付受領日から起算して60日以内に定めた支払期日までに支払わないこと。期日経過後は遅延利息の対象となる。",
  代金減額:
    "下請事業者に責任がないのに、あらかじめ定めた下請代金の額を発注後に減額すること。歩引き・協力金などの名目による減額も含む。",
  型の無償保管:
    "量産終了後も金型・木型等を、費用を負担せず下請事業者に長期間保管させること。保管・メンテナンス費用のしわ寄せが問題となる。",
  手形払い:
    "支払を現金ではなく手形で行い、下請事業者に割引料等のコストや長期の資金繰り負担を負わせること。サイトの長い手形が特に問題視される。",
  価格転嫁拒否:
    "労務費・原材料費・エネルギーコスト等の上昇分について、価格転嫁を求める協議に応じない、または一方的に据え置くこと。",
};

function TermTooltip({ term, children }: { term: string; children: React.ReactNode }) {
  const desc = termDescriptions[term];
  if (!desc) return <>{children}</>;
  return (
    <span className="relative inline-block group/term cursor-help">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 bottom-full z-20 mb-2 w-64 -translate-x-1/2 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-[11px] leading-5 text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/term:opacity-100"
      >
        <span className="block font-bold mb-1">{term}</span>
        {desc}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </span>
    </span>
  );
}

function RelationshipDiagram() {
  const violations = ["買いたたき", "支払遅延", "代金減額", "型の無償保管", "手形払い", "価格転嫁拒否"];
  const collect = ["各種調査（書面調査：親調/下調）", "取引Gメン", "取引かけこみ寺", "企業間取引DB"];
  return (
    <div className="bg-white border border-rose-100 rounded-lg p-4 space-y-4">
      <div className="text-xs font-semibold text-rose-700">取引構造と取適法違反 ― 中小企業 ⇔ 中小企業庁</div>

      {/* 上段：民間の取引関係 */}
      <div>
        <div className="text-[11px] font-semibold text-gray-500 mb-2">① 民間の取引関係（違反が発生する場所）</div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-center">
          <div className="rounded-lg border border-slate-300 bg-slate-50 p-3 text-center">
            <FaIndustry className="text-slate-700 text-2xl mx-auto mb-1" />
            <div className="text-sm font-bold text-slate-800">委託事業者（親事業者・発注側）</div>
            <div className="text-[11px] text-slate-600 mt-0.5">違反の主体</div>
          </div>
          <div className="flex flex-col items-center text-rose-500">
            <FaExchangeAlt className="text-xl" />
            <span className="text-[10px] font-bold text-rose-600 mt-1">発注 / 納品</span>
          </div>
          <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-center">
            <FaStore className="text-emerald-700 text-2xl mx-auto mb-1" />
            <div className="text-sm font-bold text-emerald-800">中小受託事業者（下請・受注側）</div>
            <div className="text-[11px] text-emerald-700 mt-0.5">被害を受ける側</div>
          </div>
        </div>
        <div className="mt-2 rounded-md bg-rose-50 border border-rose-200 p-2">
          <div className="text-[11px] font-bold text-rose-700 mb-1 flex items-center gap-1">
            <FaExclamationTriangle /> 取適法違反となりうる商習慣
          </div>
          <div className="flex flex-wrap gap-1.5">
            {violations.map((v) => (
              <TermTooltip key={v} term={v}>
                <span className="text-[11px] bg-white border border-rose-300 text-rose-700 rounded-full px-2 py-0.5 hover:bg-rose-100">
                  {v}
                </span>
              </TermTooltip>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center text-indigo-500">
        <FaArrowDown className="text-xl" />
        <span className="text-[10px] font-bold text-indigo-600 ml-1">相談・通報 / 調査回答で実態が中小企業庁へ</span>
      </div>

      {/* 下段：中小企業庁 取引課 */}
      <div>
        <div className="text-[11px] font-semibold text-gray-500 mb-2">② 中小企業庁 取引課（把握 → 本事業AI → 執行）</div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 items-stretch">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <FaDatabase className="text-blue-600 text-xl mb-1" />
            <div className="text-sm font-semibold text-blue-900">取引実態の把握</div>
            <ul className="text-[11px] text-blue-700 leading-5 mt-1 list-disc pl-4">
              {collect.map((c) => (
                <li key={c}>
                  <TermTooltip term={c}>
                    <span className="underline decoration-dotted decoration-blue-400 hover:text-blue-900">{c}</span>
                  </TermTooltip>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center text-gray-400">
            <FaArrowRight className="hidden md:block" />
            <FaArrowDown className="md:hidden" />
          </div>
          <div className="rounded-lg border-2 border-indigo-300 bg-indigo-50 p-3">
            <FaRobot className="text-indigo-600 text-xl mb-1" />
            <div className="text-sm font-bold text-indigo-900">本事業：生成AIツール</div>
            <div className="text-[11px] text-indigo-700 leading-5 mt-1">
              違反疑義の検知・優先度提示 / ヒアリング先リコメンド
            </div>
          </div>
          <div className="flex items-center justify-center text-gray-400">
            <FaArrowRight className="hidden md:block" />
            <FaArrowDown className="md:hidden" />
          </div>
          <div className="rounded-lg border border-violet-200 bg-violet-50 p-3">
            <FaGavel className="text-violet-600 text-xl mb-1" />
            <div className="text-sm font-semibold text-violet-900">執行</div>
            <div className="text-[11px] text-violet-700 leading-5 mt-1">
              立入検査 → 勧告・指導（発注側へ是正）
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md bg-amber-50 border border-amber-200 p-2 text-[11px] text-amber-800 flex items-start gap-1">
        <FaBalanceScale className="mt-0.5 flex-shrink-0" />
        <span>本事業のAIは「情報収集」と「執行」の間（＝分析）に入り、違反疑義の検知とヒアリング先選定を支援する。</span>
      </div>
    </div>
  );
}

function DadsDiagram() {
  const panels = [
    {
      icon: <FaPalette />,
      color: "text-indigo-600",
      title: "政府統一指針への対応（表2 No.1）",
      desc: "デジタル庁デザインシステム(DADS)準拠。配色・字体・余白・角丸・状態色を公式デザイントークンで統一",
    },
    {
      icon: <FaSearch />,
      color: "text-blue-600",
      title: "画面構成・操作性（表2 No.2〜6）",
      desc: "直感的な画面 / 最小操作 / 視認性の高いフォント / 処理中表示 / エラー強調と修正導線 / ヘルプ参照",
    },
    {
      icon: <FaUniversalAccess />,
      color: "text-emerald-600",
      title: "アクセシビリティ（表3）",
      desc: "JIS X 8341 シリーズ / みんなの公共サイト運用ガイドライン / 色のみに依存しない情報伝達",
    },
    {
      icon: <FaShieldAlt />,
      color: "text-rose-600",
      title: "品質担保の仕組み",
      desc: "デザイントークン整合を機械的に検証（verify:dads）し、政府統一基準からの逸脱を継続的に防止",
    },
  ];
  return (
    <div className="bg-white border border-indigo-100 rounded-lg p-4">
      <div className="text-xs font-semibold text-indigo-700 mb-3">ユーザビリティ・アクセシビリティ要件への対応</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {panels.map((p) => (
          <div key={p.title} className="rounded-lg border border-gray-200 bg-gray-50 p-3 flex items-start gap-2">
            <span className={`${p.color} text-xl mt-0.5`}>{p.icon}</span>
            <div>
              <div className="text-sm font-semibold text-gray-800">{p.title}</div>
              <div className="text-xs text-gray-600 leading-5 mt-0.5">{p.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-md bg-emerald-50 border border-emerald-200 p-2 text-xs text-emerald-800 font-semibold text-center">
        政府統一基準に準拠した一貫した UX（@digital-go-jp/tailwind-theme-plugin + verify-dads-tokens で実装担保）
      </div>
    </div>
  );
}

function DataRequestDiagram() {
  const aiData = [
    { no: 1, name: "過去の勧告案件", fmt: "PDF + Excel/CSV", scale: "数十〜数百件", use: "UC① 違反疑義判定・影響度根拠" },
    { no: 2, name: "過去の立入検査結果", fmt: "Excel/CSV", scale: "過去数年分", use: "UC① 立入検査先の教師データ" },
    { no: 3, name: "過去相談データ", fmt: "Excel/CSV", scale: "年約1万件", use: "UC① 違反疑義シグナル（通報者保護）" },
    { no: 4, name: "過去調査結果（各種調査）", fmt: "Excel/CSV", scale: "約81.4万件", use: "UC① 一覧/判定・UC② 候補選定" },
    { no: 5, name: "取引Gメンヒアリングデータ", fmt: "Excel/CSV", scale: "年約1万件", use: "UC② 候補提示・理由生成" },
  ];
  const surveys = [
    { name: "価格交渉促進月間フォローアップ", target: "受注側", n: 30 },
    { name: "委託元との調査", target: "受注側", n: 24 },
    { name: "取引条件改善状況調査", target: "受注側", n: 8 },
    { name: "受託事業者との調査", target: "発注側", n: 5.5 },
    { name: "インボイス調査", target: "—", n: 5 },
    { name: "パートナーシップ構築宣言企業", target: "宣言企業", n: 5 },
    { name: "取引条件改善状況調査", target: "発注側", n: 1 },
    { name: "自主行動計画フォローアップ", target: "94団体会員", n: 0.9 },
  ];
  const maxN = 30;
  const masters = [
    { no: 6, name: "事業者基礎情報マスタ", desc: "法人番号・所在地・業種・資本金・従業員数・上場区分", scale: "数十万〜数百万件" },
    { no: 7, name: "企業間取引データベース", desc: "委託⇔受注の取引関係（種別・金額推定・頻度）※商用DB含む", scale: "数百万〜数千万リレーション" },
  ];
  const env = [
    { no: 8, name: "利用者アカウント情報", phase: "Ph2 導入前" },
    { no: 9, name: "接続環境情報（GSS / Sure Click）", phase: "Ph1〜Ph2" },
    { no: 10, name: "稼働時間・運用条件", phase: "Ph1" },
    { no: 11, name: "既存システム連携情報", phase: "Ph1" },
    { no: 12, name: "検証観点・評価基準（ベースライン値）", phase: "Ph2 開始前" },
    { no: 13, name: "法令・参考資料（取適法/振興法）", phase: "Ph1" },
  ];

  return (
    <div className="space-y-4">
      {/* 前提 */}
      <div className="bg-white border border-indigo-100 rounded-lg p-4">
        <div className="text-xs font-semibold text-indigo-700 mb-2">提供元・前提</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
          <div className="rounded bg-slate-50 border border-slate-200 px-2 py-1.5">
            <span className="font-semibold text-slate-700">提供元：</span> 中小企業庁 取引課
          </div>
          <div className="rounded bg-amber-50 border border-amber-200 px-2 py-1.5">
            <span className="font-semibold text-amber-800">機密区分：</span> 機密性2まで（機密性3は対象外）
          </div>
          <div className="rounded bg-emerald-50 border border-emerald-200 px-2 py-1.5">
            <span className="font-semibold text-emerald-800">形式：</span> 機械判読可能（Excel/CSV）希望
          </div>
        </div>
      </div>

      {/* 1. AI学習・分析用データ */}
      <div className="bg-white border border-blue-100 rounded-lg p-4 overflow-x-auto">
        <div className="text-xs font-semibold text-blue-700 mb-3 flex items-center gap-1.5">
          <FaFileExcel className="text-blue-600" /> ① AI学習・分析用データ（仕様書「6. 調達の範囲」で提供明記）
        </div>
        <table className="min-w-full text-[11px]">
          <thead className="bg-blue-50 text-blue-900">
            <tr>
              <th className="text-left px-2 py-1.5 border border-blue-100 w-8">No</th>
              <th className="text-left px-2 py-1.5 border border-blue-100">データ名</th>
              <th className="text-left px-2 py-1.5 border border-blue-100">想定形式</th>
              <th className="text-left px-2 py-1.5 border border-blue-100">想定規模</th>
              <th className="text-left px-2 py-1.5 border border-blue-100">主な利用機能</th>
            </tr>
          </thead>
          <tbody>
            {aiData.map((d) => (
              <tr key={d.no} className="odd:bg-white even:bg-blue-50/40">
                <td className="px-2 py-1.5 border border-blue-100 font-bold text-blue-700">{d.no}</td>
                <td className="px-2 py-1.5 border border-blue-100 font-semibold text-gray-800">{d.name}</td>
                <td className="px-2 py-1.5 border border-blue-100 text-gray-600">{d.fmt}</td>
                <td className="px-2 py-1.5 border border-blue-100 text-gray-600">{d.scale}</td>
                <td className="px-2 py-1.5 border border-blue-100 text-gray-600">{d.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 1-2. 81.4万件内訳 */}
      <div className="bg-white border border-blue-100 rounded-lg p-4">
        <div className="text-xs font-semibold text-blue-700 mb-3 flex items-center gap-1.5">
          <FaClipboardList className="text-blue-600" /> No.4「過去調査結果」の内訳（合計 約81.4万件規模）
        </div>
        <div className="space-y-1.5">
          {surveys.map((s) => (
            <div key={s.name + s.target} className="flex items-center gap-2 text-[11px]">
              <span className="w-48 flex-shrink-0 text-gray-700 truncate" title={s.name}>{s.name}</span>
              <span className="w-14 flex-shrink-0 text-gray-400">{s.target}</span>
              <div className="flex-1 bg-gray-100 rounded h-3.5 overflow-hidden">
                <div className="h-full bg-blue-500 rounded" style={{ width: `${(s.n / maxN) * 100}%` }} />
              </div>
              <span className="w-16 flex-shrink-0 text-right tabular-nums text-gray-700">
                {s.n >= 1 ? `${s.n}万` : `${s.n * 10}千`}件
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-[10px] text-gray-500">※ 設問マスタ（設問IDと設問文の対応表）も併せて提供依頼。調査年度・調査票・選択/自由記述が分かれて存在する想定。</div>
      </div>

      {/* 2. 機能実現用データ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white border border-emerald-100 rounded-lg p-4">
          <div className="text-xs font-semibold text-emerald-700 mb-3 flex items-center gap-1.5">
            <FaIdCard className="text-emerald-600" /> ② 機能実現用データ（マスタ・取引リレーション）
          </div>
          <div className="space-y-2">
            {masters.map((m) => (
              <div key={m.no} className="rounded border border-emerald-200 bg-emerald-50 p-2">
                <div className="flex items-center gap-1.5 text-[12px] font-semibold text-emerald-900">
                  {m.no === 7 ? <FaProjectDiagram className="text-emerald-600" /> : <FaIdCard className="text-emerald-600" />}
                  No.{m.no} {m.name}
                </div>
                <div className="text-[10px] text-gray-600 leading-4 mt-0.5">{m.desc}</div>
                <div className="text-[10px] text-emerald-700 mt-0.5">規模：{m.scale}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-[10px] text-amber-700">※ 商用DB（帝国データバンク/東商等）の場合、二次利用・AI学習可否のライセンス条件を Ph1 で確認。</div>
        </div>

        {/* 3. 環境・運用 */}
        <div className="bg-white border border-violet-100 rounded-lg p-4">
          <div className="text-xs font-semibold text-violet-700 mb-3 flex items-center gap-1.5">
            <FaServer className="text-violet-600" /> ③ 環境・アカウント・運用情報
          </div>
          <ul className="space-y-1.5 text-[11px]">
            {env.map((e) => (
              <li key={e.no} className="flex items-center justify-between gap-2 rounded border border-violet-200 bg-violet-50 px-2 py-1">
                <span className="text-gray-700"><span className="font-semibold text-violet-700">No.{e.no}</span> {e.name}</span>
                <span className="text-[10px] text-violet-600 bg-white border border-violet-200 rounded-full px-2 py-0.5 flex-shrink-0">{e.phase}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* お願い事項 */}
      <div className="rounded-md bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-800">
        <div className="font-bold mb-1">ご提供にあたってのお願い</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5">
          <span>・列定義/コード値/設問マスタ/更新頻度を添付</span>
          <span>・機密区分（2まで）を明示、機密性3は対象外</span>
          <span>・個人情報/通報者特定情報は仮名化・マスキング</span>
          <span>・商用DBはAI学習・本事業利用の可否を確認</span>
          <span>・実形式/スキーマ/粒度は Ph1 で確定</span>
          <span>・Ph1（契約後〜約1か月）で順次提供</span>
        </div>
      </div>
    </div>
  );
}

function PocDiagram() {
  const [screen, setScreen] = useState<"summary" | "inspection">("summary");
  const nav = [
    { id: "summary", icon: <FaChartBar />, label: "ホーム", sub: "業務サマリ" },
    { id: "inspection", icon: <FaExclamationTriangle />, label: "立入検査候補", sub: "取適法 / 振興法の違反疑義企業" },
    { id: "hearing", icon: <FaSearch />, label: "ヒアリング先候補", sub: "委託事業者とサプライチェーン" },
    { id: "help", icon: <FaCircle />, label: "操作ヘルプ", sub: "画面の使い方と AI の見方" },
  ];
  const kpis = [
    { label: "優先 A 候補", tag: "最大", value: "101", unit: "社", tone: "rose" },
    { label: "優先 B 候補", tag: "注意", value: "90", unit: "社", tone: "amber" },
    { label: "評価対象企業", tag: "情報", value: "100", unit: "社", tone: "blue" },
    { label: "ネガティブシグナル", tag: "", value: "484", unit: "件", tone: "slate" },
  ];
  const kpiTone: Record<string, { bar: string; text: string; chip: string }> = {
    rose: { bar: "border-l-rose-500", text: "text-rose-600", chip: "bg-rose-100 text-rose-700" },
    amber: { bar: "border-l-amber-500", text: "text-amber-600", chip: "bg-amber-100 text-amber-700" },
    blue: { bar: "border-l-blue-500", text: "text-blue-600", chip: "bg-blue-100 text-blue-700" },
    slate: { bar: "border-l-slate-500", text: "text-slate-700", chip: "bg-slate-100 text-slate-700" },
  };
  // 違反類型ごとの件数（ドーナツ）
  const donut = [
    { label: "買いたたき", v: 62, color: "#1d4ed8" },
    { label: "支払遅延", v: 48, color: "#38bdf8" },
    { label: "不当な返品", v: 46, color: "#f97316" },
    { label: "金型保管費の不当負担", v: 45, color: "#10b981" },
    { label: "不当な経済上の利益要求", v: 39, color: "#4338ca" },
    { label: "割引困難な手形交付", v: 30, color: "#f43f5e" },
  ];
  const donutTotal = donut.reduce((s, d) => s + d.v, 0);
  let acc = 0;
  const stops = donut
    .map((d) => {
      const start = (acc / donutTotal) * 360;
      acc += d.v;
      const end = (acc / donutTotal) * 360;
      return `${d.color} ${start}deg ${end}deg`;
    })
    .join(", ");
  // 月次の検知トレンド
  const trend = [60, 53, 65, 55, 49];
  const trendMax = 70;
  const pts = trend
    .map((v, i) => `${(i / (trend.length - 1)) * 100},${40 - (v / trendMax) * 36}`)
    .join(" ");
  // 業種別の違反疑義件数（上位）
  const industries = [
    { name: "建設資材", v: 21, color: "bg-blue-700" },
    { name: "包装資材", v: 21, color: "bg-emerald-500" },
    { name: "電子部品", v: 19, color: "bg-orange-500" },
    { name: "樹脂成形", v: 18, color: "bg-blue-500" },
    { name: "金属・治具", v: 17, color: "bg-indigo-600" },
    { name: "食品加工", v: 16, color: "bg-sky-500" },
    { name: "印刷", v: 16, color: "bg-violet-500" },
  ];
  // 優先度の分布
  const priority = [
    { label: "A（立入検査推奨）", v: 101, color: "bg-rose-500" },
    { label: "B（詳細調査推奨）", v: 90, color: "bg-amber-500" },
    { label: "C（経過観察）", v: 109, color: "bg-slate-500" },
  ];
  const prMax = 109;

  // 立入検査候補（一覧）
  const candidates = [
    {
      name: "有限会社大久保繊維",
      meta: "樹脂成形 / 茨城県 / 従業員 118 名",
      score: 95,
      types: ["不当な返品"],
      basis: 4,
      desc: "契約外検品基準による返品。過去事例 R05-018（類似度 79%）と類似。",
    },
    {
      name: "荒川化学株式会社",
      meta: "物流 / 京都府 / 従業員 356 名",
      score: 95,
      types: ["割引困難な手形交付", "不当な経済上の利益要求", "不当な返品"],
      basis: 4,
      desc: "90 日サイト超の手形交付と現金拒否。過去事例 R04-112（類似度 88%）と一致。",
    },
    {
      name: "菅原金型株式会社",
      meta: "セラミックス / 宮崎県 / 従業員 643 名",
      score: 95,
      types: ["不当な返品", "割引困難な手形交付", "金型保管費の不当負担"],
      basis: 4,
      desc: "契約外検品基準による返品と金型の無償保管。過去事例 R05-018（類似度 79%）と類似。",
    },
    {
      name: "浅野重機有限会社",
      meta: "精密機器 / 佐賀県 / 従業員 1,486 名",
      score: 94,
      types: ["買いたたき", "割引困難な手形交付"],
      basis: 4,
      desc: "精密ベアリング価格上昇下での単価据置と協議拒否の証言が複数。過去事例 R06-088（類似度 72%）と一致。",
    },
  ];

  const isSummary = screen === "summary";

  return (
    <div className="space-y-3">
      {/* 画面切替 */}
      <div className="flex items-center gap-2 text-[11px]">
        <FaWindowMaximize className="text-gray-400" />
        <span className="text-gray-500">PoC画面イメージ（モック）：</span>
        <div className="inline-flex rounded-md border border-gray-300 overflow-hidden">
          <button
            type="button"
            onClick={() => setScreen("summary")}
            className={`px-2.5 py-1 ${isSummary ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            業務サマリ
          </button>
          <button
            type="button"
            onClick={() => setScreen("inspection")}
            className={`px-2.5 py-1 border-l border-gray-300 ${!isSummary ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            立入検査候補
          </button>
        </div>
      </div>

      {/* ブラウザウィンドウ */}
      <div className="rounded-lg border border-gray-300 shadow-sm overflow-hidden bg-white">
        {/* ブラウザバー */}
        <div className="flex items-center gap-2 bg-gray-100 border-b border-gray-200 px-3 py-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <div className="ml-2 flex-1 bg-white border border-gray-200 rounded px-2 py-0.5 text-[10px] text-gray-400">
            https://poc.subcontract-compliance.go.jp / {isSummary ? "home" : "inspection-candidates"}
          </div>
          <FaBell className="text-gray-400 text-xs" />
        </div>

        <div className="flex">
          {/* サイドナビ（実アプリ：白基調） */}
          <div className="w-48 flex-shrink-0 bg-white border-r border-gray-200 p-2 space-y-1">
            <div className="px-2 py-2 mb-1 border-b border-gray-100">
              <div className="text-[10px] text-gray-500">中小企業庁</div>
              <div className="text-[11px] font-bold text-gray-800 leading-tight">取適法・振興法<br />執行支援</div>
            </div>
            {nav.map((n) => {
              const active = n.id === screen;
              return (
                <div
                  key={n.label}
                  className={`flex items-start gap-2 px-2 py-1.5 rounded ${
                    active ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                  }`}
                >
                  <span className={`text-[11px] mt-0.5 ${active ? "text-blue-600" : "text-gray-400"}`}>{n.icon}</span>
                  <div className="min-w-0">
                    <div className={`text-[10px] font-semibold flex items-center gap-1 ${active ? "text-blue-700" : "text-gray-700"}`}>
                      {n.label}
                      {active && <span className="text-[8px] bg-blue-600 text-white rounded px-1 py-px">表示中</span>}
                    </div>
                    <div className="text-[8px] text-gray-400 leading-tight truncate">{n.sub}</div>
                  </div>
                </div>
              );
            })}
            <div className="px-2 pt-2 text-[9px] text-gray-400 border-t border-gray-100 mt-1">別メニュー ▼</div>
          </div>

          {/* メイン：業務サマリ */}
          {isSummary ? (
          <div className="flex-1 p-3 space-y-3 bg-gray-50 min-w-0">
            <div>
              <div className="text-[9px] text-gray-400">中小企業庁 / 取適法・振興法 執行支援プラットフォーム</div>
              <div className="text-sm font-bold text-gray-800">業務サマリ</div>
              <div className="text-[9px] text-gray-500">
                調査回答・ヒアリング記録・取引データ・公表事例を AI が横断分析し、「立入検査候補」と「ヒアリング先候補」を提示します。
              </div>
            </div>

            {/* KPI */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {kpis.map((k) => (
                <div key={k.label} className={`bg-white border border-gray-200 border-l-4 ${kpiTone[k.tone].bar} rounded-md p-2`}>
                  <div className="flex items-center justify-between">
                    <div className="text-[9px] text-gray-500">{k.label}</div>
                    {k.tag && <span className={`text-[8px] rounded px-1 ${kpiTone[k.tone].chip}`}>{k.tag}</span>}
                  </div>
                  <div className={`text-lg font-bold tabular-nums ${kpiTone[k.tone].text}`}>
                    {k.value}
                    <span className="text-[9px] font-normal text-gray-400 ml-0.5">{k.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 本日の業務 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-white border border-gray-200 rounded-md p-2">
                <div className="text-[10px] font-semibold text-gray-700 flex items-center gap-1.5">
                  <FaExclamationTriangle className="text-amber-500" /> 立入検査候補を確認する →
                </div>
                <div className="text-[8px] text-gray-400 mt-0.5">300社が候補に挙がっています（A: 101 / B: 90）</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-md p-2">
                <div className="text-[10px] font-semibold text-gray-700 flex items-center gap-1.5">
                  <FaSearch className="text-blue-500" /> ヒアリング先を選定する →
                </div>
                <div className="text-[8px] text-gray-400 mt-0.5">100社の委託企業 / 484件のネガティブシグナル</div>
              </div>
            </div>

            {/* データ基盤 集計結果 */}
            <div className="text-[10px] font-semibold text-gray-600 flex items-center gap-1.5">
              <FaChartBar className="text-gray-400" /> データ基盤 集計結果
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {/* 違反類型ドーナツ */}
              <div className="bg-white border border-gray-200 rounded-md p-2">
                <div className="text-[9px] font-semibold text-gray-700 mb-1">違反類型ごとの件数</div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-16 h-16 rounded-full flex-shrink-0"
                    style={{ background: `conic-gradient(${stops})` }}
                  >
                    <div className="w-8 h-8 bg-white rounded-full m-4" />
                  </div>
                  <div className="grid grid-cols-1 gap-0.5 text-[8px] leading-tight">
                    {donut.map((d) => (
                      <div key={d.label} className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                        <span className="text-gray-600 truncate">{d.label}</span>
                        <span className="text-gray-400 tabular-nums">{d.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 月次トレンド */}
              <div className="bg-white border border-gray-200 rounded-md p-2">
                <div className="text-[9px] font-semibold text-gray-700 mb-1">月次の検知トレンド</div>
                <svg viewBox="0 0 100 42" className="w-full h-16" preserveAspectRatio="none">
                  <polygon points={`0,42 ${pts} 100,42`} fill="#dbeafe" />
                  <polyline points={pts} fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                </svg>
                <div className="flex justify-between text-[7px] text-gray-400">
                  <span>2026-02</span><span>2026-03</span><span>2026-04</span><span>2026-05</span>
                </div>
              </div>

              {/* 業種別バー */}
              <div className="bg-white border border-gray-200 rounded-md p-2">
                <div className="text-[9px] font-semibold text-gray-700 mb-1">業種別の違反疑義件数（上位）</div>
                <div className="space-y-1">
                  {industries.map((i) => (
                    <div key={i.name} className="flex items-center gap-1.5 text-[8px]">
                      <span className="w-14 flex-shrink-0 text-gray-600 truncate">{i.name}</span>
                      <div className="flex-1 bg-gray-100 rounded h-2.5 overflow-hidden">
                        <div className={`h-full rounded ${i.color}`} style={{ width: `${(i.v / 21) * 100}%` }} />
                      </div>
                      <span className="w-4 text-right tabular-nums text-gray-500">{i.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 優先度分布 */}
              <div className="bg-white border border-gray-200 rounded-md p-2">
                <div className="text-[9px] font-semibold text-gray-700 mb-1">優先度の分布</div>
                <div className="flex items-end justify-around h-20 px-2">
                  {priority.map((p) => (
                    <div key={p.label} className="flex flex-col items-center gap-1 w-1/3">
                      <span className="text-[9px] font-bold text-gray-600 tabular-nums">{p.v}</span>
                      <div
                        className={`w-8 rounded-t ${p.color}`}
                        style={{ height: `${(p.v / prMax) * 56}px` }}
                      />
                      <span className="text-[7px] text-gray-400 text-center leading-tight">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          ) : (
          /* メイン：立入検査候補 */
          <div className="flex-1 p-3 space-y-3 bg-gray-50 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-bold text-gray-800">立入検査候補</div>
                <div className="text-[9px] text-gray-500">
                  取引データ・ヒアリング証言・各種調査回答・過去事例から、AI が違反の蓋然性が高い委託事業者を抽出しました。
                </div>
              </div>
              <span className="text-[8px] text-gray-500 border border-gray-300 rounded px-1.5 py-0.5 flex-shrink-0">? この画面のヘルプ</span>
            </div>

            {/* フィルタ */}
            <div className="bg-white border border-gray-200 rounded-md p-2 flex flex-wrap items-center gap-1.5">
              <div className="flex items-center gap-1 flex-1 min-w-[120px] border border-gray-200 rounded px-2 py-1 text-[9px] text-gray-400">
                <FaSearch className="text-[8px]" /> 企業名で検索
              </div>
              <span className="text-[9px] text-gray-500 border border-gray-200 rounded px-2 py-1">全ての違反類型 ▾</span>
              <span className="text-[9px] text-gray-500 border border-gray-200 rounded px-2 py-1">全ての優先度 ▾</span>
              <span className="text-[9px] text-gray-500 border border-gray-200 rounded px-2 py-1">AI スコア順 ▾</span>
              <span className="text-[9px] text-white bg-blue-600 rounded px-2 py-1">絞り込む</span>
            </div>

            <div className="flex items-center justify-between text-[8px] text-gray-400">
              <span>該当 300 件 / 全 300 件 ・ 結果 300 件中 1〜20 件を表示</span>
              <span>1 / 15 ページ</span>
            </div>

            {/* 候補カード */}
            <div className="space-y-2">
              {candidates.map((c) => (
                <div key={c.name} className="bg-white border border-gray-200 rounded-md p-2 flex gap-2">
                  <div className="flex flex-col items-center justify-center w-14 flex-shrink-0 border-r border-gray-100 pr-2">
                    <span className="text-[8px] bg-rose-600 text-white rounded px-1.5 py-px font-bold">優先度 A</span>
                    <span className="text-base font-bold text-gray-800 tabular-nums leading-tight mt-1">{c.score}</span>
                    <span className="text-[7px] text-gray-400">AI スコア</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-bold text-gray-800">{c.name}</span>
                      <span className="text-[8px] text-gray-400">{c.meta}</span>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap my-1">
                      {c.types.map((t) => (
                        <span key={t} className="text-[8px] bg-rose-50 text-rose-700 border border-rose-200 rounded px-1.5 py-px">
                          {t}
                        </span>
                      ))}
                      <span className="text-[8px] bg-blue-50 text-blue-700 border border-blue-200 rounded px-1.5 py-px">立入検査</span>
                      <span className="text-[8px] text-gray-500 border border-gray-200 rounded px-1.5 py-px">根拠 {c.basis} 件</span>
                    </div>
                    <div className="text-[8px] text-gray-500 leading-tight">{c.desc}</div>
                  </div>
                  <FaArrowRight className="text-gray-300 text-[10px] self-center flex-shrink-0" />
                </div>
              ))}
            </div>
            <div className="text-[8px] text-gray-400 text-center">… 残り 296 件（スコア降順）</div>
          </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
        <div className="rounded bg-slate-50 border border-slate-200 px-2 py-1.5 flex items-center gap-1.5">
          <FaCircle className="text-[6px] text-sky-500" /> DADSデザイントークン準拠の配色・余白
        </div>
        <div className="rounded bg-slate-50 border border-slate-200 px-2 py-1.5 flex items-center gap-1.5">
          <FaCircle className="text-[6px] text-violet-500" /> AI抽出はスコア・根拠・類似事例を提示
        </div>
        <div className="rounded bg-slate-50 border border-slate-200 px-2 py-1.5 flex items-center gap-1.5">
          <FaCircle className="text-[6px] text-amber-500" /> PoCはモックAction、本番でAction SPへ置換
        </div>
      </div>
    </div>
  );
}

function CortexSearchDiagram() {
  const cols = [
    {
      key: "use",
      head: "Cortex Search を使う",
      icon: <FaSnowflakeChip />,
      tone: "sky",
      tag: "マネージド検索サービス",
      pros: [
        "ハイブリッド検索（ベクトル＋キーワード）を標準提供し、検索精度（再現率）が出やすい",
        "埋め込み・索引・再ランクをSnowflakeが自動運用、実装・チューニング工数が小さい",
        "大規模・高頻度・低レイテンシ要件に強い（索引が常時最適化）",
      ],
      cons: [
        "検索サービスが常駐し、データ量に応じた固定的なサービング費用が継続発生",
        "Enterprise Edition 相当の機能前提・対象モデル/リージョン制約を受ける",
        "小規模・低頻度では「使っていない時間」もコストが乗りやすい",
      ],
    },
    {
      key: "self",
      head: "使わない（本事業の選択）",
      icon: <FaSearch className="text-violet-600" />,
      tone: "violet",
      tag: "AI_EMBED + VECTOR_COSINE_SIMILARITY",
      pros: [
        "固定費のかかる検索索引を持たない no-fixed-cost。実行した分だけの従量課金",
        "Standard Edition + SQL関数で完結し、構成がシンプルで監査しやすい",
        "対象は数十万件規模・低頻度バッチ寄りで、自前ベクトル検索でも十分な精度",
      ],
      cons: [
        "ハイブリッド検索・自動再ランクは自前実装・チューニングが必要",
        "件数増・高頻度・低レイテンシ化が進むと全件類似度計算のコスト/遅延が増える",
        "再現率はチャンク設計・埋め込みモデル選定・前処理品質に依存",
      ],
    },
  ];
  const toneMap: Record<string, { border: string; head: string; tag: string }> = {
    sky: { border: "border-sky-200", head: "text-sky-700", tag: "bg-sky-50 text-sky-700 border-sky-200" },
    violet: { border: "border-violet-200", head: "text-violet-700", tag: "bg-violet-50 text-violet-700 border-violet-200" },
  };

  return (
    <div className="space-y-4">
      {/* 結論バナー */}
      <div className="rounded-lg bg-gradient-to-r from-violet-50 to-sky-50 border border-violet-200 p-3">
        <div className="text-xs font-bold text-violet-800 flex items-center gap-1.5">
          <FaBalanceScale className="text-violet-600" /> 結論：本事業は Cortex Search を「使わない」
        </div>
        <div className="text-[11px] text-gray-700 mt-1 leading-5">
          対象データは数十万件規模・低頻度のバッチ分析が中心で、リアルタイム大量検索の要件は薄い。固定費が継続発生する Cortex Search より、
          <span className="font-mono">AI_EMBED</span> ＋ <span className="font-mono">VECTOR_COSINE_SIMILARITY</span> を Function SP に自前実装する
          <span className="font-semibold"> no-fixed-cost</span> 構成の方が、必要十分な精度を保ちつつ総コストを最小化できる。
        </div>
      </div>

      {/* 2カラム比較 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cols.map((c) => (
          <div key={c.key} className={`bg-white border ${toneMap[c.tone].border} rounded-lg p-3`}>
            <div className={`text-xs font-bold flex items-center gap-1.5 ${toneMap[c.tone].head}`}>
              {c.icon} {c.head}
            </div>
            <div className={`inline-block text-[10px] font-mono border rounded px-1.5 py-0.5 mt-1.5 ${toneMap[c.tone].tag}`}>
              {c.tag}
            </div>
            <div className="mt-2 space-y-1">
              {c.pros.map((p) => (
                <div key={p} className="flex items-start gap-1.5 text-[11px] text-gray-700">
                  <FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" /> {p}
                </div>
              ))}
              {c.cons.map((p) => (
                <div key={p} className="flex items-start gap-1.5 text-[11px] text-gray-500">
                  <FaTimesCircle className="text-rose-400 mt-0.5 flex-shrink-0" /> {p}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 精度とコストの軸 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* 精度 */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
            <FaBolt className="text-amber-500" /> RAGの正確性（精度）の考え方
          </div>
          <ul className="space-y-1.5 text-[11px] text-gray-600 leading-5">
            <li>・精度は「検索段の再現率」と「生成段の出典追従」の掛け算で決まる。検索手法だけで決まらない。</li>
            <li>・本事業は<span className="font-semibold">出典必須（根拠リンク）</span>と<span className="font-semibold">Cortex Analyst の NL→SQL 集計</span>を併用し、ハルシネーションを抑制。</li>
            <li>・Cortex Search の強みは大規模・曖昧クエリでの再現率。本事業の規模では自前検索でも目標精度に到達可能。</li>
            <li>・精度はチャンク設計・埋め込みモデル（arctic-embed）・前処理品質の作り込みで底上げする。</li>
          </ul>
        </div>
        {/* コスト */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="text-xs font-semibold text-gray-700 flex items-center gap-1.5 mb-2">
            <FaCoins className="text-amber-500" /> コスト構造の違い
          </div>
          <div className="space-y-2 text-[11px]">
            <div className="rounded bg-sky-50 border border-sky-200 p-2">
              <div className="font-semibold text-sky-700">Cortex Search</div>
              <div className="text-gray-600 leading-5">検索サービスが常駐 → データ量連動の<span className="font-semibold">固定的サービング費＋埋め込み費</span>。使わない時間も課金されやすい。</div>
            </div>
            <div className="rounded bg-violet-50 border border-violet-200 p-2">
              <div className="font-semibold text-violet-700">自前ベクトル検索（本事業）</div>
              <div className="text-gray-600 leading-5">索引常駐なし → <span className="font-semibold">実行時のウェアハウス従量＋埋め込み費のみ</span>。低頻度バッチで総額が小さい。</div>
            </div>
            <div className="text-[10px] text-gray-500">※ 件数・検索頻度・レイテンシ要件が大幅に増えるなら、Cortex Search へ切替えた方が安くなる損益分岐点が存在する。</div>
          </div>
        </div>
      </div>

      {/* 「リアルタイム大量検索」とは */}
      <div className="bg-white border border-sky-200 rounded-lg p-3">
        <div className="text-xs font-bold text-sky-700 flex items-center gap-1.5 mb-1">
          <FaBolt className="text-sky-500" /> 「リアルタイム大量検索」とは（Cortex Search が本領を発揮する利用形態）
        </div>
        <div className="text-[11px] text-gray-600 leading-5 mb-2">
          本事業（数十万件・低頻度バッチ）とは対照的な、以下のようなシナリオを指す。
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            {
              n: 1,
              icon: <FaUsers className="text-sky-600" />,
              title: "多数の利用者が同時に検索（高同時実行・高頻度）",
              points: [
                "全国の取引Gメンや相談員が窓口で「この事業者の過去相談・調査履歴は？」を日中ずっと即時検索",
                "1日数千〜数万クエリが断続的に飛ぶ運用",
              ],
            },
            {
              n: 2,
              icon: <FaBolt className="text-sky-600" />,
              title: "即応性が求められる（低レイテンシ）",
              points: [
                "入力のたびに候補が出るインクリメンタルサーチ（検索ボックスのサジェスト）",
                "画面操作のたびに数百ミリ秒で結果を返す対話UI",
              ],
            },
            {
              n: 3,
              icon: <FaDatabase className="text-sky-600" />,
              title: "検索対象が大規模・常時更新（大量データ＋鮮度）",
              points: [
                "数百万〜数千万件規模の文書・取引レコードを横断",
                "新しい相談・調査が入るたびに索引へ反映し、すぐ検索可能にする",
              ],
            },
            {
              n: 4,
              icon: <FaSearch className="text-sky-600" />,
              title: "曖昧・自然文クエリでの高再現率",
              points: [
                "「下請けに不利な支払条件を強いている疑いのある事業者」のような曖昧な問い",
                "ベクトル＋キーワードのハイブリッドで取りこぼしなく拾う",
              ],
            },
          ].map((s) => (
            <div key={s.n} className="rounded border border-sky-100 bg-sky-50/50 p-2">
              <div className="text-[11px] font-semibold text-gray-800 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-sky-600 text-white text-[9px] flex items-center justify-center flex-shrink-0">{s.n}</span>
                {s.icon} {s.title}
              </div>
              <ul className="mt-1 space-y-0.5">
                {s.points.map((p) => (
                  <li key={p} className="text-[10px] text-gray-600 leading-4 flex items-start gap-1">
                    <span className="text-sky-400 mt-0.5">・</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* なぜ本事業はこれに当たらないか */}
      <div className="bg-white border border-violet-200 rounded-lg p-3">
        <div className="text-xs font-bold text-violet-700 flex items-center gap-1.5 mb-1">
          <FaBalanceScale className="text-violet-600" /> なぜ本事業はこれに当たらないか ― 中核は「バッチ的な分析」
        </div>
        <ul className="space-y-1 text-[11px] text-gray-600 leading-5">
          <li className="flex items-start gap-1.5"><FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />違反疑義スコアリングや立入検査候補の抽出は、夜間/定期バッチで計算 → 翌朝ダッシュボードで確認する流れ</li>
          <li className="flex items-start gap-1.5"><FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />検索は「常時・大量・即時」ではなく「分析実行時にまとめて」走る</li>
          <li className="flex items-start gap-1.5"><FaCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" />対象も数十万件規模で、全件ベクトル類似度計算でも実用時間に収まる</li>
        </ul>
        <div className="mt-2 rounded bg-violet-50 border border-violet-200 p-2 text-[11px] text-violet-800 leading-5">
          つまり「常駐索引で待ち受けて即答する」必要が薄いため、固定費のかかる Cortex Search より、実行時だけ課金される自前ベクトル検索（<span className="font-mono">AI_EMBED</span> ＋ <span className="font-mono">VECTOR_COSINE_SIMILARITY</span>）が合う、という整理。
        </div>
      </div>

      {/* Cortex Search のコスト内訳（補足） */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <div className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1">
          <FaCoins className="text-amber-500" /> Cortex Search のコスト内訳 ― 「固定費」の正体
        </div>
        <div className="text-[11px] text-gray-600 leading-5 mb-2">
          Snowflake のサービスは<span className="font-semibold">基本すべてクレジット消費（従量課金）</span>で、Cortex Search も定額の月額固定費ではない。ただし下表②の<span className="font-semibold">サービングコストは「サービスが起動している限り常時」発生</span>するため、低頻度用途では実質的に固定費のように積み上がる。
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-200 px-2 py-1.5 text-left font-semibold w-[26%]">費用要素</th>
                <th className="border border-gray-200 px-2 py-1.5 text-left font-semibold">課金契機</th>
                <th className="border border-gray-200 px-2 py-1.5 text-left font-semibold w-[24%]">性質</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  el: "① 埋め込み（Embedding）",
                  trigger: "初回インデックス作成時＋データ更新時のトークン量",
                  nature: "使った分だけ",
                  tone: "ok",
                },
                {
                  el: "② サービングコンピュート",
                  trigger: "サービスが起動している間ずっと（索引を低レイテンシで待機させる層）",
                  nature: "クエリ0でも発生＝準固定的",
                  tone: "warn",
                },
                {
                  el: "③ ウェアハウス（更新処理）",
                  trigger: "インデックスのリフレッシュ実行時",
                  nature: "使った分だけ",
                  tone: "ok",
                },
                {
                  el: "④ ストレージ",
                  trigger: "インデックス保管量",
                  nature: "保管量従量",
                  tone: "ok",
                },
              ].map((r) => (
                <tr key={r.el} className={`align-top ${r.tone === "warn" ? "bg-rose-50/60" : ""}`}>
                  <td className="border border-gray-200 px-2 py-1.5 font-semibold text-gray-800">{r.el}</td>
                  <td className="border border-gray-200 px-2 py-1.5 text-gray-600 leading-4">{r.trigger}</td>
                  <td className="border border-gray-200 px-2 py-1.5">
                    {r.tone === "warn" ? (
                      <span className="inline-flex items-center gap-1 text-rose-600 font-semibold"><FaBell /> {r.nature}</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold"><FaCheckCircle /> {r.nature}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px]">
          <div className="rounded bg-sky-50 border border-sky-200 p-2 leading-4">
            <div className="font-semibold text-sky-700 mb-0.5 flex items-center gap-1"><FaSnowflakeChip /> Cortex Search</div>
            従量課金ではあるが<span className="font-semibold">「サービス存在＝常時課金（②）」</span>。低頻度バッチ用途だと、アイドル時間のサービング費が<span className="font-semibold">無駄コスト</span>になりやすい。
          </div>
          <div className="rounded bg-violet-50 border border-violet-200 p-2 leading-4">
            <div className="font-semibold text-violet-700 mb-0.5 flex items-center gap-1"><FaBolt className="text-violet-500" /> AI_EMBED + VECTOR_COSINE_SIMILARITY（本事業）</div>
            <span className="font-mono">クエリを実行した瞬間のWH稼働＋埋め込みトークン</span>しか発生しない。<span className="font-semibold">常駐コストがゼロ</span>。
          </div>
        </div>
        <div className="mt-2 rounded bg-amber-50 border border-amber-200 p-2 text-[10px] text-amber-800 leading-4">
          つまり論点は「固定費 vs 従量費」ではなく、正確には<span className="font-semibold">「常時課金（準固定）vs 実行時のみ課金」</span>の違い。本事業は低頻度バッチのため、②の常駐コストを持たない自前ベクトル検索が有利。
        </div>
      </div>

      {/* コスト比較表 */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <div className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-2">
          <FaCoins className="text-amber-500" /> コンポーネント別コスト比較
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-200 px-2 py-1.5 text-left font-semibold">コンポーネント</th>
                <th className="border border-gray-200 px-2 py-1.5 text-left font-semibold">課金モデル</th>
                <th className="border border-gray-200 px-2 py-1.5 text-center font-semibold">固定費</th>
                <th className="border border-gray-200 px-2 py-1.5 text-left font-semibold">コストドライバー</th>
                <th className="border border-gray-200 px-2 py-1.5 text-center font-semibold">本事業での採否</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Cortex Search",
                  mono: false,
                  model: "サービング常駐＋自動更新＋埋め込み",
                  fixed: "high",
                  driver: "索引データ量・更新頻度に連動。アイドル時も課金されやすい",
                  use: "no",
                },
                {
                  name: "Cortex Agent / Analyst",
                  mono: false,
                  model: "トークン従量（LLM推論）",
                  fixed: "none",
                  driver: "リクエスト数・入出力トークン数。NL→SQL／要約の実行回数",
                  use: "yes",
                },
                {
                  name: "AI_EMBED + VECTOR_COSINE_SIMILARITY",
                  mono: true,
                  model: "埋め込みトークン従量＋WH従量",
                  fixed: "none",
                  driver: "埋め込み対象件数＋類似度計算を回すWH稼働時間（実行時のみ）",
                  use: "yes",
                },
                {
                  name: "Stage（内部／外部ステージ）",
                  mono: false,
                  model: "データ転送・取込処理（COPY/WH）",
                  fixed: "none",
                  driver: "取込ファイル量とロード処理のWH稼働。保管自体は下記Storage扱い",
                  use: "yes",
                },
                {
                  name: "Storage（テーブル／ステージ保管）",
                  mono: false,
                  model: "保管量従量（TB単価／月）",
                  fixed: "low",
                  driver: "格納データ量＋Time Travel／Fail-safe保持分。圧縮後サイズで課金",
                  use: "yes",
                },
              ].map((r) => (
                <tr key={r.name} className="align-top">
                  <td className="border border-gray-200 px-2 py-1.5">
                    <span className={r.mono ? "font-mono font-semibold text-violet-700" : "font-semibold text-gray-800"}>{r.name}</span>
                  </td>
                  <td className="border border-gray-200 px-2 py-1.5 text-gray-600">{r.model}</td>
                  <td className="border border-gray-200 px-2 py-1.5 text-center">
                    {r.fixed === "high" && <span className="inline-block rounded bg-rose-100 text-rose-700 px-1.5 py-0.5 font-semibold">大</span>}
                    {r.fixed === "low" && <span className="inline-block rounded bg-amber-100 text-amber-700 px-1.5 py-0.5 font-semibold">小</span>}
                    {r.fixed === "none" && <span className="inline-block rounded bg-emerald-100 text-emerald-700 px-1.5 py-0.5 font-semibold">なし</span>}
                  </td>
                  <td className="border border-gray-200 px-2 py-1.5 text-gray-600 leading-4">{r.driver}</td>
                  <td className="border border-gray-200 px-2 py-1.5 text-center">
                    {r.use === "yes" ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold"><FaCheckCircle /> 採用</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-500 font-semibold"><FaTimesCircle /> 不採用</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-2 rounded bg-violet-50 border border-violet-200 p-2 text-[10px] text-violet-800 leading-4">
          ポイント：本事業は<span className="font-semibold">固定的サービング費の発生する Cortex Search を外し</span>、<span className="font-mono">AI_EMBED ＋ VECTOR_COSINE_SIMILARITY</span> による実行時従量の自前検索を採用。LLM処理は Cortex Agent / Analyst のトークン従量、データは Stage 経由で取込み Storage に保管 ― いずれも<span className="font-semibold">使った分だけ課金（no-fixed-cost方針）</span>に揃える。
        </div>
      </div>

      {/* 判断基準 */}
      <div className="rounded-md bg-amber-50 border border-amber-200 p-3">
        <div className="text-[11px] font-bold text-amber-800 mb-1">どちらを選ぶかの判断基準</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5 text-[11px] text-amber-800">
          <span>・大規模/高頻度/低レイテンシ・曖昧検索が主 → Cortex Search</span>
          <span>・数十万件規模/低頻度バッチ・固定費回避が最優先 → 自前検索</span>
          <span>・運用工数を抑えマネージドに寄せたい → Cortex Search</span>
          <span>・Standard Edition / no-fixed-cost 方針 → 自前検索（本事業）</span>
        </div>
      </div>
    </div>
  );
}

function FaSnowflakeChip() {
  return <SiSnowflake className="text-sky-500" />;
}

function SlideDiagram({ kind }: { kind?: SlideKind }) {
  if (kind === "challenge") return <ChallengeDiagram />;
  if (kind === "rag") return <RagDiagram />;
  if (kind === "stack") return <StackDiagram />;
  if (kind === "relationship") return <RelationshipDiagram />;
  if (kind === "dads") return <DadsDiagram />;
  if (kind === "datarequest") return <DataRequestDiagram />;
  if (kind === "poc") return <PocDiagram />;
  if (kind === "cortex") return <CortexSearchDiagram />;
  return null;
}

function Slides() {
  const [idx, setIdx] = useState(0);

  const slides: Slide[] = useMemo(
    () => [
      {
        title: "Slide 1: お客様の課題",
        kind: "challenge",
        keyMessage:
          "中小企業庁は、取適法（下請法）・振興法の執行強化にあたり、膨大な取引・相談・調査データから「優先すべき違反疑義事業者」を絞り込めず、Gメンのヒアリングや立入検査計画の策定が属人化・高負荷になっている。",
        bullets: [
          "違反疑義の見落とし：人手では優先度判断が困難",
          "Gメンの属人化：対象選定・巡回計画が経験依存で再現性が低い",
          "計画策定の負荷：様式1（法執行計画案）/様式2（巡回計画書）作成に多大な工数",
        ],
        refs: ["consulting.yaml", "design/1-40-scenarios.yaml", "proposal/proposal.yaml"],
      },
      {
        title: "Slide 2: 取引構造と取適法違反",
        kind: "relationship",
        keyMessage:
          "取適法違反は委託事業者（親事業者・発注側）と中小受託事業者（下請・受注側）の取引の中で発生する。中小企業庁 取引課は各種調査・取引Gメン・取引かけこみ寺・企業間取引DBで実態を把握し、立入検査→勧告・指導で是正する。本事業のAIは「収集」と「執行」の間（＝分析）を支援する。",
        bullets: [
          "違反の主体は発注側（親事業者）、被害を受けるのは受注側（下請）",
          "受注側からの相談・通報、双方からの調査回答で実態が取引課へ集まる",
          "AIが違反疑義検知・優先度提示・ヒアリング先リコメンドを担い、執行へ接続",
        ],
        refs: ["design/1-10-purpose.yaml", "design/1-40-scenarios.yaml", "consulting.yaml"],
      },
      {
        title: "Slide 3: 解決アプローチ（RAG / 生成AI）",
        kind: "rag",
        keyMessage:
          "Cortex Search を使わなくても RAG は構築できる。検索段を AI_EMBED + VECTOR_COSINE_SIMILARITY（Function SP）で自前実装し、Cortex Agent が意味検索（非構造）と Cortex Analyst + Semantic View（構造化集計）を統括して出典付きで回答する。固定費のかかる索引を持たない no-fixed-cost 設計。",
        bullets: [
          "Cortex Agent＝オーケストレーター：問いに応じて意味検索 / NL→SQL を使い分け、LLMで合成",
          "フロント↔Snowflake は Read（Secure View）/ Write（Action SP）/ AI（Agent）の3経路のみ",
          "埋め込み・ベクトル類似度・NL→SQL・LLM推論は全て Snowflake 内で完結し、外部LLMへ生データを送らない",
        ],
        refs: ["design/1-80-system-sketch.yaml", "design/1-48-architecture.yaml", "design/1-20-datasources.yaml"],
      },
      {
        title: "Slide 4: Cortex Search を使うべきか",
        kind: "cortex",
        keyMessage:
          "RAGの検索段に Snowflake Cortex Search（マネージド検索）を使うべきか否かを、精度とコストの観点で整理する。本事業は対象が数十万件規模・低頻度バッチで、固定費が継続発生する Cortex Search よりも AI_EMBED + VECTOR_COSINE_SIMILARITY（Function SP）の自前実装（no-fixed-cost）が総合的に有利と判断する。",
        bullets: [
          "Cortex Search＝大規模・高頻度・低レイテンシ・曖昧検索に強いが固定的なサービング費が継続",
          "自前ベクトル検索＝索引常駐なしで実行分のみ課金、Standard Edition で完結しシンプル",
          "精度は検索手法だけでなく出典必須・NL→SQL併用・チャンク/前処理の作り込みで担保",
        ],
        refs: ["design/1-48-architecture.yaml", "design/1-80-system-sketch.yaml", "snowflake.yaml"],
      },
      {
        title: "Slide 5: プロジェクトの位置付け",
        keyMessage:
          "subcontract-compliance は、取適法（下請法）・振興法の執行強化を目的に、違反疑義事業者の選定と取引Gメンのヒアリング計画を生成AIで補助する業務基盤を設計・実証する。",
        bullets: [
          "法執行担当（officer）と取引Gメン（g_gmen）の意思決定を同一基盤で支援",
          "生成AIは suggestive（提案型）として扱い、最終判断は人が実施",
          "中小企業庁向けの情報管理・監査要件を設計段階から内包",
        ],
        refs: ["design.yaml", "consulting.yaml", "progress.yaml"],
      },
      {
        title: "Slide 6: 業務機能の中核",
        keyMessage:
          "機能カタログは11件を8ドメインに分解し、執行・ヒアリング・データ品質・レビュー・評価基準管理を MVP スコープで網羅する。",
        bullets: [
          "F-ENF-001/002：違反疑義ダッシュボードと立入検査決定",
          "F-HEAR-001/002：取引先検索とAI推薦ヒアリング候補",
          "F-DATA-001 / F-REVIEW-001/002 / F-CRITERIA-001 で運用統制を担保",
        ],
        refs: ["design/1-45-features.yaml", "design/1-40-scenarios.yaml"],
      },
      {
        title: "Slide 7: データソース戦略",
        keyMessage:
          "データソースは論理9系統（中小企業庁提供6 + 公開リファレンス3）を定義し、raw→staging→marts→hybrid の責務分離で扱う。",
        bullets: [
          "提供：過去勧告・過去相談・Gメンヒアリング録・企業間取引DB 他",
          "公開：JFTC勧告 corpus / METIフォローアップ調査 / METI業種別ガイドライン",
          "on-demand 取込を原則とし CRON 不採用、機密性3は権限分離",
        ],
        refs: ["design/1-20-datasources.yaml", "scripts/fetch_jftc_recommendations.py", "scripts/fetch_meti_followup_survey.py"],
      },
      {
        title: "Slide 8: データ提供依頼リスト",
        kind: "datarequest",
        keyMessage:
          "生成AIの開発・学習・検証にあたり、中小企業庁取引課から提供いただくデータを整理する。仕様書「6. 調達の範囲」に基づき過去勧告・相談・調査結果等を提供いただき、実形式・スキーマ・粒度は Ph1 の意見交換で確定する。扱う情報は機密性2まで。",
        bullets: [
          "AI学習用5種：勧告案件 / 立入検査結果 / 相談データ / 各種調査結果（約81.4万件）/ Gメンヒアリング",
          "機能実現用：事業者基礎情報マスタ / 企業間取引DB（商用DBはライセンス条件を確認）",
          "環境・運用：アカウント / GSS接続 / 検証ベースライン / 法令資料 等を Ph1〜Ph2 で提供",
        ],
        refs: ["仕様書 6.調達の範囲", "提案書 第1章", "design/1-20-datasources.yaml"],
      },
      {
        title: "Slide 9: アーキテクチャ方針",
        kind: "stack",
        keyMessage:
          "Next.js 16 + SPCS + Snowflake Standard Edition を軸に、CQRS（読み書き分離）と Secure View で実装統制する。",
        bullets: [
          "Read：Kysely + zod、Write：Action SP に集約",
          "Cortex Search は不採用、AI_EMBED + VECTOR_COSINE_SIMILARITY",
          "DADS + shadcn の二層共存で公共案件UI要件へ対応",
        ],
        refs: ["design/1-48-architecture.yaml", "design/1-80-system-sketch.yaml", "web/README.md"],
      },
      {
        title: "Slide 10: UI と設計進捗",
        keyMessage:
          "画面導線は officer / g_gmen / data_steward / policy_reviewer の役割別に固定し、判断責任を分離する。",
        bullets: [
          "主要画面：violation_suspect_dashboard / trading_search / master_data_admin",
          "レビュー：inspection_plan_review / hearing_plan_review",
          "evaluation_criteria_admin で検証観点を継続更新",
        ],
        refs: ["design/1-55-ui.yaml", "web/README.md", "html/"],
      },
      {
        title: "Slide 11: PoC画面イメージ",
        kind: "poc",
        keyMessage:
          "PoCでは「取適法・振興法 執行支援プラットフォーム」を構築する。ホーム（業務サマリ）で優先A/B候補・ネガティブシグナルを俯瞰し、「立入検査候補」「ヒアリング先候補」へ導線を分ける。調査回答・ヒアリング記録・取引データ・公表事例をAIが横断分析し、スコアと根拠を提示する。",
        bullets: [
          "業務サマリ：優先A 101社 / 優先B 90社 / 評価対象100社 / ネガティブシグナル484件を可視化",
          "立入検査候補：AIスコア・違反類型・根拠件数・過去事例との類似度で抽出",
          "ヒアリング先候補：委託事業者→受注側サプライチェーンと各種調査結果を確認",
        ],
        refs: ["html/violation_suspect_dashboard.html", "design/1-55-ui.yaml", "web/lib/mock-actions.ts"],
      },
      {
        title: "Slide 12: ユーザビリティ・アクセシビリティ（DADS準拠）",
        kind: "dads",
        keyMessage:
          "仕様書 表2 ユーザビリティ要件 No.1 は「政府全体で一貫したデザイン・操作性のため、デジタル庁が公表するデザインシステム（DADS）を参考にすること」を求めている。Web画面を DADS 公式デザイントークンに準拠して構築し、表3 アクセシビリティ要件（JIS X 8341 等）にも対応する。",
        bullets: [
          "配色・字体・余白・角丸・状態色を DADS 公式トークンで統一",
          "色のみに依存しない情報伝達・視認性・処理中表示・エラー導線を全画面に適用",
          "デザイントークン整合を verify:dads で機械検証し逸脱を継続防止",
        ],
        refs: ["design/1-47-branding.yaml", "spec/md/2-07-1-system-functional-requirements.md", "web/tailwind.config.ts"],
      },
      {
        title: "Slide 13: 実施計画とゲート",
        keyMessage:
          "Phase 1-3 を 16週間で設計し、R1-R6 のレビューゲートで品質を段階保証する。progress.yaml 上は R2 まで承認済み。",
        bullets: [
          "Phase 1：基盤構築・初期データ投入（5週）",
          "Phase 2：AI Agent 実装・PoC評価（7週）",
          "Phase 3：運用移行・引継ぎ（4週）",
        ],
        refs: ["design/1-80-system-sketch.yaml", "progress.yaml"],
      },
      {
        title: "Slide 14: 納品・本番移行",
        keyMessage:
          "設計・モック・提案資料・取得スクリプトを一体で納品可能な形にし、令和9年度以降の本番導入判断へ接続する。",
        bullets: [
          "提案書は12種納品物 + 最終報告10章構成を定義",
          "要件対応は ch4、納品物は ch6 で明文化",
          "運用時は mock-actions を実 Action SP へ段階置換",
        ],
        refs: ["proposal/proposal.yaml", "proposal/slides/ch6-deliverables.yaml", "web/lib/mock-actions.ts"],
      },
    ],
    []
  );

  const current = slides[idx];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-sky-50 p-5">
        <div className="flex items-center justify-between gap-3 mb-2">
          <h3 className="text-lg font-bold text-indigo-900">{current.title}</h3>
          <span className="text-xs font-bold text-indigo-700 bg-white border border-indigo-200 rounded-full px-2.5 py-0.5 tabular-nums">
            {idx + 1} / {slides.length}
          </span>
        </div>

        <div className="h-[600px] overflow-y-auto pr-2">
          <p className="text-sm text-indigo-900 leading-6 mb-4">{current.keyMessage}</p>

          {current.kind && (
            <div className="mb-4">
              <SlideDiagram kind={current.kind} />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white border border-indigo-100 rounded-lg p-4">
              <div className="text-xs font-semibold text-indigo-700 mb-2">ポイント</div>
              <ul className="list-disc pl-5 text-sm text-gray-700 leading-6 space-y-1">
                {current.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-indigo-100 rounded-lg p-4">
              <div className="text-xs font-semibold text-indigo-700 mb-2">参照ソース</div>
              <ul className="text-xs text-gray-700 space-y-1">
                {current.refs.map((r) => (
                  <li key={r} className="font-mono break-all">{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => setIdx((i) => Math.max(i - 1, 0))}
          disabled={idx === 0}
          className="px-3 py-1.5 rounded border border-gray-300 text-sm text-gray-700 disabled:opacity-50"
        >
          ← 前へ
        </button>
        <div className="flex flex-wrap justify-center gap-1">
          {slides.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setIdx(i)}
              className={`px-2 py-1 rounded text-xs border ${
                i === idx ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setIdx((i) => Math.min(i + 1, slides.length - 1))}
          disabled={idx === slides.length - 1}
          className="px-3 py-1.5 rounded border border-gray-300 text-sm text-gray-700 disabled:opacity-50"
        >
          次へ →
        </button>
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <h3 className="font-semibold text-slate-900 mb-2">プロジェクト概要</h3>
        <p className="text-sm text-gray-700 leading-6">
          <span className="font-semibold">subcontract-compliance</span> は、中小企業庁向けの「取適法（下請法）・振興法 執行強化AI実証プロジェクト」です。
          違反疑義事業者の優先度付け、取引Gメンによるヒアリング対象の選定、立入検査計画の策定を、Snowflake Standard Edition と生成AI（Cortex Agent / Cortex Analyst）で補助します。
          設計はSSOT（design.yaml 等）を中心に確定し、web は <span className="font-mono text-xs">stage=mock</span> で画面導線を先行検証する段階です。
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-xs text-blue-700 font-semibold mb-1">データソース</div>
          <div className="text-2xl font-bold text-blue-900">9</div>
          <div className="text-xs text-blue-800">提供6 + 公開3</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <div className="text-xs text-emerald-700 font-semibold mb-1">機能カタログ</div>
          <div className="text-2xl font-bold text-emerald-900">11</div>
          <div className="text-xs text-emerald-800">F-ENF / F-HEAR 他</div>
        </div>
        <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
          <div className="text-xs text-violet-700 font-semibold mb-1">フェーズ</div>
          <div className="text-2xl font-bold text-violet-900">3</div>
          <div className="text-xs text-violet-800">基盤 / AI / 移行</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="text-xs text-amber-700 font-semibold mb-1">実施計画</div>
          <div className="text-2xl font-bold text-amber-900">16週</div>
          <div className="text-xs text-amber-800">R1〜R6 レビュー</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
        <section className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">登場ロール</h4>
          <ul className="space-y-1.5 text-gray-700">
            <li><span className="font-semibold">officer</span>：法執行担当（最終判断）</li>
            <li><span className="font-semibold">g_gmen</span>：取引Gメン（ヒアリング実施）</li>
            <li><span className="font-semibold">data_steward</span>：データ運用・品質管理</li>
            <li><span className="font-semibold">policy_reviewer</span>：計画レビュー・承認</li>
            <li><span className="font-semibold">transaction_division_officer</span>：取引課担当</li>
          </ul>
        </section>

        <section className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">5大重点課題（取適法）</h4>
          <ul className="space-y-1.5 text-gray-700">
            <li>① 買いたたき</li>
            <li>② 型の無償保管</li>
            <li>③ 手形等による支払手段</li>
            <li>④ 支払遅延</li>
            <li>⑤ 振込手数料の負担強要</li>
          </ul>
          <p className="text-xs text-gray-500 mt-2">法令優先：フリーランス保護法 ＞ 取適法 ＞ 振興法</p>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
        <section className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">主要SSOT</h4>
          <ul className="space-y-1 text-gray-700">
            <li className="font-mono">design.yaml</li>
            <li className="font-mono">consulting.yaml</li>
            <li className="font-mono">progress.yaml</li>
            <li className="font-mono">proposal/proposal.yaml</li>
          </ul>
        </section>

        <section className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">主要UI資産</h4>
          <ul className="space-y-1 text-gray-700">
            <li className="font-mono">html/violation_suspect_dashboard.html</li>
            <li className="font-mono">html/trading_search.html</li>
            <li className="font-mono">html/master_data_admin.html</li>
            <li className="font-mono">design/1-55-ui.yaml</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function Architecture() {
  return (
    <div className="space-y-5">
      <section>
        <h3 className="font-semibold text-gray-800 mb-3">論理アーキテクチャ（層と責務）</h3>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-3 items-stretch">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <SiNextdotjs className="text-black text-lg" />
              <SiReact className="text-sky-500 text-lg" />
              <span className="font-semibold text-blue-900">プレゼンテーション層</span>
            </div>
            <div className="text-gray-700">Next.js 16 + shadcn/ui</div>
            <div className="text-gray-700">DADS プラグイン（デジタル庁）</div>
            <div className="mt-2"><CostTag kind="compute" note="SPCS稼働" /></div>
          </div>
          <div className="flex items-center justify-center text-gray-400 font-bold text-lg">→</div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <SiTypescript className="text-blue-600 text-lg" />
              <FaServer className="text-indigo-600 text-lg" />
              <span className="font-semibold text-indigo-900">アプリケーション層</span>
            </div>
            <div className="text-gray-700">Server Actions（SPCS）</div>
            <div className="text-gray-700">Read：Kysely + zod</div>
            <div className="text-gray-700">Write：Action SP</div>
            <div className="mt-2"><CostTag kind="compute" note="WH/SPCS" /></div>
          </div>
          <div className="flex items-center justify-center text-gray-400 font-bold text-lg">→</div>
          <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <FaRobot className="text-violet-600 text-lg" />
              <span className="font-semibold text-violet-900">AI 層（Cortex）</span>
            </div>
            <div className="text-gray-700">Cortex Agent / Analyst</div>
            <div className="text-gray-700">AI_EMBED + VECTOR_COSINE</div>
            <div className="text-gray-700">Semantic View</div>
            <div className="mt-2 flex flex-wrap gap-1"><CostTag kind="ai" note="トークン" /><CostTag kind="compute" note="WH" /></div>
          </div>
          <div className="flex items-center justify-center text-gray-400 font-bold text-lg">→</div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm">
            <div className="flex items-center gap-2 mb-2">
              <SiSnowflake className="text-sky-500 text-lg" />
              <span className="font-semibold text-emerald-900">データ層</span>
            </div>
            <div className="text-gray-700">RAW / STAGING / MARTS</div>
            <div className="text-gray-700">HYBRID / SECURE</div>
            <div className="text-gray-700">Secure View ガバナンス</div>
            <div className="mt-2"><CostTag kind="storage" note="保管" /></div>
          </div>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
          <FaLayerGroup className="text-emerald-600" /> データ層モデル（RAW → STAGING → MARTS）とデータの流れ
        </h4>
        <p className="text-[11px] text-gray-600 leading-5 mb-3">
          取込んだデータは<span className="font-semibold">単方向</span>に RAW → STAGING → MARTS と変換される。書込SSOTの <span className="font-mono">HYBRID</span> は別系統で、<span className="font-mono">stg → hybrid</span> の逆流は禁止。各層でどこに課金が乗るかも併記。
        </p>
        {(() => {
          const layers: { key: string; icon: JSX.Element; dot: string; tone: string; title: string; role: string; how: string; cost: CostKind[] }[] = [
            { key: "src", icon: <FaFileImport />, dot: "bg-gray-400", tone: "border-gray-300 bg-gray-50", title: "ソース（外部由来）", role: "勧告・相談・取引DB・JFTC/METI 公開資料", how: "PDF / Excel / CSV を Stage へ連携", cost: ["none"] },
            { key: "raw", icon: <FaDatabase />, dot: "bg-slate-500", tone: "border-slate-300 bg-slate-50", title: "RAW 層", role: "無加工で read-only に着地（原本を保持）", how: "Stage → COPY INTO でテーブル化", cost: ["storage"] },
            { key: "stg", icon: <SiDbt className="text-white" />, dot: "bg-amber-500", tone: "border-amber-300 bg-amber-50", title: "STAGING 層", role: "正規化・型統一・クレンジング・チャンク整形", how: "dbt-core でモデル変換・テスト", cost: ["compute"] },
            { key: "mart", icon: <SiSnowflake className="text-white" />, dot: "bg-emerald-600", tone: "border-emerald-300 bg-emerald-50", title: "MARTS 層（＋ベクトル列）", role: "分析向け派生テーブル＋埋め込み（VECTOR）を保持", how: "dbt で集計 + Function SP（AI_EMBED）でベクトル生成", cost: ["compute", "ai", "storage"] },
          ];
          return (
            <div className="flex flex-col md:flex-row md:items-stretch gap-2">
              {layers.map((l, i) => (
                <Fragment key={l.key}>
                  <div className={`flex-1 rounded-lg border ${l.tone} p-3`}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`w-6 h-6 rounded-full ${l.dot} text-white flex items-center justify-center text-[11px] flex-shrink-0`}>{l.icon}</span>
                      <span className="text-[12px] font-bold text-gray-800">{l.title}</span>
                    </div>
                    <div className="text-[11px] text-gray-700 leading-4 mb-1">{l.role}</div>
                    <div className="text-[10px] text-gray-500 leading-4 mb-1.5">{l.how}</div>
                    <div className="flex flex-wrap gap-1">{l.cost.map((c, ci) => <CostTag key={ci} kind={c} />)}</div>
                  </div>
                  {i < layers.length - 1 && (
                    <div className="flex items-center justify-center text-gray-400">
                      <FaArrowRight className="hidden md:block" />
                      <FaArrowDown className="md:hidden" />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          );
        })()}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px]">
          <div className="rounded bg-emerald-50 border border-emerald-200 p-2 leading-4">
            <FaSearch className="inline text-emerald-600 mr-1" />
            <span className="font-semibold">MARTS の参照先</span>：意味検索は <span className="font-mono">VECTOR_COSINE_SIMILARITY</span>（Function SP）、構造化集計は Semantic View 経由で Cortex Analyst。Read 経路は Secure View で公開する。
          </div>
          <div className="rounded bg-amber-50 border border-amber-200 p-2 leading-4">
            <FaPen className="inline text-amber-600 mr-1" />
            <span className="font-semibold">HYBRID は別系統</span>：ユーザー操作起点の書込（Action SP → MERGE）専用の SSOT。取込パイプライン（RAW/STG/MART）から hybrid へは書かない（<span className="font-mono">stg→hybrid</span> 逆流禁止）。
          </div>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] text-gray-500">
          <span className="font-semibold text-gray-600">課金凡例：</span>
          <CostTag kind="storage" /><CostTag kind="compute" /><CostTag kind="ai" /><CostTag kind="none" />
          <span>変換は dbt（WH 従量）、ベクトル化のみ AI トークン、保管はストレージ。</span>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FaExchangeAlt className="text-indigo-600" />
          CQRS：読み書きの責務分離と各オブジェクトの関係
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1.3fr] gap-3 items-stretch">
          {/* フロント */}
          <div className="rounded-lg border-2 border-slate-300 bg-slate-50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <FaDesktop className="text-slate-700" />
              <span className="text-sm font-bold text-slate-800">フロントエンド</span>
            </div>
            <div className="text-[11px] text-slate-500 mb-2">Next.js（SPCS）</div>
            <div className="space-y-1.5 text-[11px]">
              <div className="rounded bg-white border border-blue-200 px-2 py-1 flex items-center gap-1.5">
                <FaTable className="text-blue-600" />
                <span><span className="font-semibold text-blue-800">Read</span>：Kysely + zod</span>
              </div>
              <div className="rounded bg-white border border-amber-200 px-2 py-1 flex items-center gap-1.5">
                <FaPen className="text-amber-600" />
                <span><span className="font-semibold text-amber-800">Write</span>：CALL ACTION_*</span>
              </div>
              <div className="rounded bg-white border border-emerald-200 px-2 py-1 flex items-center gap-1.5">
                <FaRobot className="text-emerald-600" />
                <span><span className="font-semibold text-emerald-800">AI</span>：Cortex Agent</span>
              </div>
            </div>
          </div>

          <div className="flex lg:flex-col items-center justify-center text-gray-400">
            <FaArrowRight className="hidden lg:block text-lg" />
            <FaArrowDown className="lg:hidden text-lg" />
          </div>

          {/* Snowflake オブジェクト関係 */}
          <div className="rounded-lg border-2 border-sky-300 bg-sky-50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <SiSnowflake className="text-sky-500" />
              <span className="text-sm font-bold text-sky-800">Snowflake オブジェクトの動き</span>
            </div>
            <div className="space-y-2 text-[11px]">
              {/* Read flow */}
              <div className="flex items-center gap-2">
                <FaTable className="text-blue-600 flex-shrink-0" />
                <span className="font-semibold text-blue-800">Read</span>
                <FaArrowRight className="text-gray-400 flex-shrink-0" />
                <span className="rounded bg-white border border-blue-200 px-2 py-0.5 flex items-center gap-1">
                  <FaLock className="text-blue-600" /> Secure View
                </span>
                <span className="text-gray-500">（機密分離・書込不可）</span>
              </div>
              {/* Write flow */}
              <div className="flex items-center gap-2 flex-wrap">
                <FaPen className="text-amber-600 flex-shrink-0" />
                <span className="font-semibold text-amber-800">Write</span>
                <FaArrowRight className="text-gray-400 flex-shrink-0" />
                <span className="rounded bg-white border border-amber-200 px-2 py-0.5">Action SP（ACTION_）</span>
                <span className="text-gray-500">検証→差分監査ログ→MERGE</span>
                <FaArrowRight className="text-gray-400 flex-shrink-0" />
                <span className="rounded bg-white border-2 border-emerald-300 px-2 py-0.5 flex items-center gap-1">
                  <FaDatabase className="text-emerald-600" /> hybrid table（書込SSOT）
                </span>
              </div>
              {/* Secure View reads from hybrid */}
              <div className="flex items-center gap-2 pl-5 text-gray-500">
                <FaArrowDown className="text-gray-400" />
                <span>Secure View は MARTS / hybrid table を参照して Read 側へ提供</span>
              </div>
              {/* AI flow */}
              <div className="flex items-center gap-2 flex-wrap">
                <FaRobot className="text-violet-600 flex-shrink-0" />
                <span className="font-semibold text-violet-800">AI</span>
                <FaArrowRight className="text-gray-400 flex-shrink-0" />
                <span className="rounded bg-white border border-violet-200 px-2 py-0.5">Cortex Agent</span>
                <FaArrowRight className="text-gray-400 flex-shrink-0" />
                <span className="rounded bg-white border border-violet-200 px-2 py-0.5">Function SP（AI_EMBED/VECTOR）</span>
                <span className="text-gray-400">＋</span>
                <span className="rounded bg-white border border-violet-200 px-2 py-0.5">Cortex Analyst（Semantic View）</span>
              </div>
            </div>
            <div className="mt-2 rounded bg-amber-50 border border-amber-200 px-2 py-1 text-[11px] text-amber-800">
              書込みは Action SP の一本化により、誰が・いつ・何を変えたかを差分監査ログで一元記録（最小権限）。
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
          <FaCoins className="text-amber-500" /> 実行時のデータフローと課金ポイント（4経路）
        </h4>
        <p className="text-[11px] text-gray-600 leading-5 mb-4">
          操作は <span className="font-semibold text-indigo-700">① 質問→回答（AI）</span> ／ <span className="font-semibold text-amber-700">② 書き込み</span> ／ <span className="font-semibold text-blue-700">③ フィルター検索（非AI）</span> ／ <span className="font-semibold text-teal-700">④ ドキュメント取込（事前バッチ）</span> の4経路に分かれる。<span className="font-semibold">各色枠が1経路</span>で、時系列（上から下）に「どこで処理・課金が発生するか」をレーンで表す。④ では取込んだデータが <span className="font-mono">RAW→STAGING→MARTS</span> と単方向に流れる。固定費なし（Cortex Search 不採用）。
        </p>

        {/* ① Read/AI 経路 */}
        <div className="rounded-lg border-2 border-indigo-200 bg-indigo-50/40 p-3 mb-4">
        <h5 className="font-bold text-indigo-800 mb-1 flex items-center gap-2">
          <FaRobot className="text-indigo-600" /> ① 質問 → 回答（Read / AI）経路
        </h5>
        <p className="text-[11px] text-gray-600 leading-5 mb-3">
          自然文の問いに対し、Cortex Agent が意味検索・NL→SQL を使い分けて出典付きで回答する。<span className="font-semibold">「使った分だけ」</span>クレジットを消費。
        </p>
        {/* レーン見出し */}
        <div className="grid grid-cols-3 gap-2 mb-2 text-center text-[11px] font-bold">
          <div className="flex items-center justify-center gap-1.5 text-gray-700">
            <FaUser className="text-gray-500" /> ユーザー
          </div>
          <div className="flex items-center justify-center gap-1.5 text-slate-700">
            <FaDesktop className="text-slate-500" /> フロントエンド
          </div>
          <div className="flex items-center justify-center gap-1.5 text-sky-700">
            <SiSnowflake className="text-sky-500" /> Snowflake
          </div>
        </div>
        {(() => {
          const rt: { lane: number; mark: string; icon: JSX.Element; label: string; desc: string; cost: CostKind[] }[] = [
            { lane: 0, mark: "send", icon: <FaUser />, label: "質問を入力", desc: "「業種別の買いたたき疑いを優先度順に」など", cost: ["none"] },
            { lane: 1, mark: "send", icon: <FaRobot />, label: "Cortex Agent を呼び出し", desc: "問い＋文脈を渡すのみ（生SQL・ベクトルは送らない）", cost: ["none"] },
            { lane: 2, mark: "proc", icon: <FaRobot />, label: "Agent がツールを判断・実行", desc: "オーケストレーション（どのSP/Analystを使うか）", cost: ["ai"] },
            { lane: 2, mark: "proc", icon: <FaSearch />, label: "Function SP：意味検索", desc: "AI_EMBED + VECTOR_COSINE_SIMILARITY", cost: ["ai", "compute"] },
            { lane: 2, mark: "proc", icon: <FaTable />, label: "Cortex Analyst：NL→SQL 集計", desc: "Semantic View 経由で構造化データを集計", cost: ["ai", "compute"] },
            { lane: 2, mark: "proc", icon: <FaLock />, label: "Secure View 参照", desc: "機密分離された構造化 Read（裏で hybrid table / MARTS を参照）", cost: ["compute"] },
            { lane: 2, mark: "proc", icon: <FaRobot />, label: "LLM で合成・出典付与", desc: "検索・集計結果を根拠付きで要約", cost: ["ai"] },
            { lane: 1, mark: "return", icon: <FaReply />, label: "回答を受信・画面表示", desc: "出典付きの候補・理由・計画ドラフトを表示", cost: ["none"] },
            { lane: 0, mark: "return", icon: <FaCheckCircle />, label: "結果を確認", desc: "根拠リンクから一次資料へ辿れる", cost: ["none"] },
          ];
          const laneTone = ["border-gray-300 bg-gray-50", "border-slate-300 bg-slate-50", "border-sky-300 bg-sky-50"];
          const markDot: Record<string, string> = { send: "bg-indigo-500", return: "bg-emerald-500", proc: "bg-sky-500" };
          return (
            <div className="space-y-1.5">
              {rt.map((s, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2 items-stretch">
                  {[0, 1, 2].map((col) => {
                    if (col !== s.lane) {
                      return <div key={col} className="border-l-2 border-dashed border-gray-200 mx-auto w-px" />;
                    }
                    return (
                      <div key={col} className={`rounded-lg border ${laneTone[s.lane]} p-2`}>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`w-5 h-5 rounded-full ${markDot[s.mark]} text-white text-[10px] flex items-center justify-center flex-shrink-0`}>
                            {s.icon}
                          </span>
                          <span className="text-[12px] font-semibold text-gray-800">{s.label}</span>
                          {s.mark === "send" && <FaPaperPlane className="text-indigo-500 text-[11px]" title="送信" />}
                          {s.mark === "return" && <FaReply className="text-emerald-500 text-[11px]" title="返却" />}
                        </div>
                        <div className="text-[10px] text-gray-600 leading-4 pl-6">{s.desc}</div>
                        <div className="flex flex-wrap gap-1 mt-1 pl-6">
                          {s.cost.map((c, ci) => <CostTag key={ci} kind={c} />)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })()}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] text-gray-500">
          <span className="font-semibold text-gray-600">課金種別：</span>
          <CostTag kind="compute" /><CostTag kind="ai" /><CostTag kind="storage" /><CostTag kind="none" />
          <span>固定的サービング費（常駐索引）は持たない＝アイドル時の課金ゼロ。</span>
        </div>
        <div className="mt-2 rounded bg-amber-50 border border-amber-200 px-2 py-1.5 text-[10px] text-amber-800 leading-4">
          <FaDatabase className="inline text-emerald-600 mr-1" />
          上は<span className="font-semibold">質問→回答（Read/AI）経路</span>のため、データは <span className="font-semibold">Secure View 経由</span>で参照（hybrid table は View の裏のソース）。<span className="font-semibold">書込み</span>（ステータス更新・申し送り等）は別経路で、<span className="font-semibold">フロント → Action SP → MERGE 先＝hybrid table（書込SSOT）</span>を通る。
        </div>
        </div>

        {/* ② 書き込み経路 */}
        <div className="rounded-lg border-2 border-amber-200 bg-amber-50/40 p-3 mb-4">
        <h5 className="font-bold text-amber-800 mb-1 flex items-center gap-2">
          <FaPen className="text-amber-600" /> ② 書き込み経路（ステータス更新・申し送り等）
        </h5>
        <p className="text-[11px] text-gray-600 leading-5 mb-3">
          フロントは<span className="font-semibold">生SQLを投げず Action SP を呼ぶだけ</span>。検証→差分監査ログ→MERGE を Snowflake 内で実行し、<span className="font-semibold">hybrid table を書込SSOT</span>として一元更新する。
        </p>
        {/* レーン見出し */}
        <div className="grid grid-cols-3 gap-2 mb-2 text-center text-[11px] font-bold">
          <div className="flex items-center justify-center gap-1.5 text-gray-700">
            <FaUser className="text-gray-500" /> ユーザー
          </div>
          <div className="flex items-center justify-center gap-1.5 text-slate-700">
            <FaDesktop className="text-slate-500" /> フロントエンド
          </div>
          <div className="flex items-center justify-center gap-1.5 text-sky-700">
            <SiSnowflake className="text-sky-500" /> Snowflake
          </div>
        </div>
        {(() => {
          const wf: { lane: number; mark: string; icon: JSX.Element; label: string; desc: string; cost: CostKind[] }[] = [
            { lane: 0, mark: "send", icon: <FaPen />, label: "ステータス変更・申し送りを入力", desc: "例：「立入検査対象に確定」「対応コメントを追記」", cost: ["none"] },
            { lane: 1, mark: "send", icon: <FaServer />, label: "Action SP を呼び出し（CALL ACTION_*）", desc: "生SQLは投げず、入力値だけを渡す", cost: ["none"] },
            { lane: 2, mark: "proc", icon: <FaShieldAlt />, label: "入力検証", desc: "型・制約・権限（最小権限）をチェックし不正値を弾く", cost: ["compute"] },
            { lane: 2, mark: "proc", icon: <FaClipboardList />, label: "差分監査ログを記録", desc: "誰が・いつ・何を変えたかを before/after で残す", cost: ["compute", "storage"] },
            { lane: 2, mark: "proc", icon: <FaDatabase />, label: "hybrid table へ MERGE", desc: "書込SSOT（正本）を更新。Secure View にも即時反映", cost: ["compute", "storage"] },
            { lane: 1, mark: "return", icon: <FaReply />, label: "完了を受信・画面反映", desc: "更新後の値・ステータスを再表示", cost: ["none"] },
            { lane: 0, mark: "return", icon: <FaCheckCircle />, label: "更新結果を確認", desc: "変更が反映されたことを確認", cost: ["none"] },
          ];
          const laneTone = ["border-gray-300 bg-gray-50", "border-slate-300 bg-slate-50", "border-sky-300 bg-sky-50"];
          const markDot: Record<string, string> = { send: "bg-amber-500", return: "bg-emerald-500", proc: "bg-sky-500" };
          return (
            <div className="space-y-1.5">
              {wf.map((s, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2 items-stretch">
                  {[0, 1, 2].map((col) => {
                    if (col !== s.lane) {
                      return <div key={col} className="border-l-2 border-dashed border-gray-200 mx-auto w-px" />;
                    }
                    return (
                      <div key={col} className={`rounded-lg border ${laneTone[s.lane]} p-2`}>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`w-5 h-5 rounded-full ${markDot[s.mark]} text-white text-[10px] flex items-center justify-center flex-shrink-0`}>
                            {s.icon}
                          </span>
                          <span className="text-[12px] font-semibold text-gray-800">{s.label}</span>
                          {s.mark === "send" && <FaPaperPlane className="text-amber-500 text-[11px]" title="送信" />}
                          {s.mark === "return" && <FaReply className="text-emerald-500 text-[11px]" title="返却" />}
                        </div>
                        <div className="text-[10px] text-gray-600 leading-4 pl-6">{s.desc}</div>
                        <div className="flex flex-wrap gap-1 mt-1 pl-6">
                          {s.cost.map((c, ci) => <CostTag key={ci} kind={c} />)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })()}
        <div className="mt-2 rounded bg-emerald-50 border border-emerald-200 px-2 py-1.5 text-[10px] text-emerald-800 leading-4">
          <FaLock className="inline text-emerald-600 mr-1" />
          書込口を Action SP に一本化することで、<span className="font-semibold">直接の UPDATE/INSERT を禁止</span>。すべての変更が監査ログに残り、整合性と追跡性を担保する。
        </div>
        </div>

        {/* ③ フィルター検索（非AI）経路 */}
        <div className="rounded-lg border-2 border-blue-200 bg-blue-50/40 p-3">
        <h5 className="font-bold text-blue-800 mb-1 flex items-center gap-2">
          <FaFilter className="text-blue-600" /> ③ フィルター検索（企業名・更新順など）経路
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200 px-2 py-0.5 text-[10px] font-semibold">
            <FaRobot className="text-gray-400" /> AI機能は不使用
          </span>
        </h5>
        <p className="text-[11px] text-gray-600 leading-5 mb-3">
          「企業名で検索」「更新順に並べ替え」「違反類型で絞り込み」など<span className="font-semibold">条件が決まった構造化検索</span>は、Cortex Agent も埋め込みも通さない。<span className="font-semibold">Kysely + zod で組み立てた SQL を Secure View に実行するだけ</span>の決定的な Read 経路で、<span className="font-semibold">AIトークン課金は発生しない</span>。
        </p>
        {/* レーン見出し */}
        <div className="grid grid-cols-3 gap-2 mb-2 text-center text-[11px] font-bold">
          <div className="flex items-center justify-center gap-1.5 text-gray-700">
            <FaUser className="text-gray-500" /> ユーザー
          </div>
          <div className="flex items-center justify-center gap-1.5 text-slate-700">
            <FaDesktop className="text-slate-500" /> フロントエンド
          </div>
          <div className="flex items-center justify-center gap-1.5 text-sky-700">
            <SiSnowflake className="text-sky-500" /> Snowflake
          </div>
        </div>
        {(() => {
          const ff: { lane: number; mark: string; icon: JSX.Element; label: string; desc: string; cost: CostKind[] }[] = [
            { lane: 0, mark: "send", icon: <FaFilter />, label: "条件を指定（企業名・更新順・違反類型）", desc: "例：「○○株式会社」で検索／更新日時の降順／優先度A で絞り込み", cost: ["none"] },
            { lane: 1, mark: "send", icon: <FaTable />, label: "Kysely + zod で SELECT を構築", desc: "パラメタ化クエリを生成（生SQL手書きなし）。Agent・AI_EMBED は呼ばない", cost: ["none"] },
            { lane: 2, mark: "proc", icon: <FaLock />, label: "Secure View に SQL 実行", desc: "WHERE 企業名 LIKE / ORDER BY 更新日時 / LIMIT・OFFSET", cost: ["compute"] },
            { lane: 2, mark: "proc", icon: <FaTable />, label: "結果セットを返却（ページング）", desc: "該当件数＋表示ページ分のレコードのみ返す", cost: ["compute"] },
            { lane: 1, mark: "return", icon: <FaReply />, label: "一覧・テーブルに表示", desc: "ソート/フィルタ状態を保持して再描画", cost: ["none"] },
            { lane: 0, mark: "return", icon: <FaCheckCircle />, label: "結果を確認・絞り込み継続", desc: "さらに条件を変えて再検索（同じ経路を繰り返す）", cost: ["none"] },
          ];
          const laneTone = ["border-gray-300 bg-gray-50", "border-slate-300 bg-slate-50", "border-sky-300 bg-sky-50"];
          const markDot: Record<string, string> = { send: "bg-blue-500", return: "bg-emerald-500", proc: "bg-sky-500" };
          return (
            <div className="space-y-1.5">
              {ff.map((s, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2 items-stretch">
                  {[0, 1, 2].map((col) => {
                    if (col !== s.lane) {
                      return <div key={col} className="border-l-2 border-dashed border-gray-200 mx-auto w-px" />;
                    }
                    return (
                      <div key={col} className={`rounded-lg border ${laneTone[s.lane]} p-2`}>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`w-5 h-5 rounded-full ${markDot[s.mark]} text-white text-[10px] flex items-center justify-center flex-shrink-0`}>
                            {s.icon}
                          </span>
                          <span className="text-[12px] font-semibold text-gray-800">{s.label}</span>
                          {s.mark === "send" && <FaPaperPlane className="text-blue-500 text-[11px]" title="送信" />}
                          {s.mark === "return" && <FaReply className="text-emerald-500 text-[11px]" title="返却" />}
                        </div>
                        <div className="text-[10px] text-gray-600 leading-4 pl-6">{s.desc}</div>
                        <div className="flex flex-wrap gap-1 mt-1 pl-6">
                          {s.cost.map((c, ci) => <CostTag key={ci} kind={c} />)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })()}
        <div className="mt-2 rounded bg-blue-50 border border-blue-200 px-2 py-1.5 text-[10px] text-blue-800 leading-4">
          <FaRobot className="inline text-gray-400 mr-1" />
          <span className="font-semibold">AIを使う／使わないの境界</span>：自然文の問い（「買いたたき疑いを優先度順に」）は<span className="font-semibold">AI経路</span>、条件が確定した検索・並べ替え・絞り込みは<span className="font-semibold">非AIの構造化Read経路</span>。同じ一覧画面でも、入力の種類で通る経路と課金が変わる。
        </div>
        </div>

        {/* ④ 取込経路（事前バッチ / データ層モデル） */}
        <div className="rounded-lg border-2 border-teal-200 bg-teal-50/40 p-3 mt-4">
        <h5 className="font-bold text-teal-800 mb-1 flex items-center gap-2">
          <FaFileImport className="text-teal-600" /> ④ ドキュメント取込経路（事前バッチ）
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-100 text-teal-700 border border-teal-200 px-2 py-0.5 text-[10px] font-semibold">
            <FaLayerGroup className="text-teal-500" /> RAW→STAGING→MARTS
          </span>
        </h5>
        <p className="text-[11px] text-gray-600 leading-5 mb-3">
          新規ドキュメント・ファイルの保存は <span className="font-semibold">②書込経路とは別系統</span>。取込んだデータは <span className="font-mono">RAW（着地）→ STAGING（整形）→ MARTS（集計＋ベクトル列）</span> と単方向に変換され、<span className="font-semibold">hybrid には書かない</span>（<span className="font-mono">stg→hybrid</span> 逆流禁止）。
        </p>
        {/* レーン見出し */}
        <div className="grid grid-cols-3 gap-2 mb-2 text-center text-[11px] font-bold">
          <div className="flex items-center justify-center gap-1.5 text-gray-700">
            <FaUser className="text-gray-500" /> ユーザー（運用担当）
          </div>
          <div className="flex items-center justify-center gap-1.5 text-slate-700">
            <FaDesktop className="text-slate-500" /> フロントエンド
          </div>
          <div className="flex items-center justify-center gap-1.5 text-sky-700">
            <SiSnowflake className="text-sky-500" /> Snowflake
          </div>
        </div>
        {(() => {
          const ig: { lane: number; mark: string; icon: JSX.Element; label: string; desc: string; cost: CostKind[] }[] = [
            { lane: 0, mark: "send", icon: <FaFileImport />, label: "ソース文書を準備・登録を実行", desc: "勧告・相談・取引DB・JFTC/METI 公開資料（PDF/Excel/CSV）", cost: ["none"] },
            { lane: 1, mark: "send", icon: <FaPen />, label: "取込画面から「データ登録」", desc: "ファイルを Stage へ連携する指示のみ（生SQLなし）", cost: ["none"] },
            { lane: 2, mark: "proc", icon: <FaFileImport />, label: "Stage に受領", desc: "内部/外部ステージに格納", cost: ["storage"] },
            { lane: 2, mark: "proc", icon: <FaServer />, label: "RAW 層へロード", desc: "COPY INTO で無加工のまま read-only 着地（原本保持）", cost: ["storage"] },
            { lane: 2, mark: "proc", icon: <SiDbt className="text-white" />, label: "STAGING 層で整形", desc: "dbt：正規化・型統一・クレンジング → チャンク分割＋メタ付与", cost: ["compute"] },
            { lane: 2, mark: "proc", icon: <SiSnowflake className="text-white" />, label: "MARTS 層へ集計＋ベクトル化", desc: "派生テーブルを生成し、Function SP（AI_EMBED）で VECTOR 列を付与", cost: ["compute", "ai", "storage"] },
            { lane: 2, mark: "proc", icon: <FaSearch />, label: "検索対象として公開", desc: "Semantic View / Secure View を定義（以降 ①③ から参照可能）", cost: ["compute"] },
            { lane: 1, mark: "return", icon: <FaReply />, label: "取込完了を表示", desc: "登録件数・ステータスを画面に反映", cost: ["none"] },
            { lane: 0, mark: "return", icon: <FaCheckCircle />, label: "登録完了を確認", desc: "この文書は以降の検索対象に", cost: ["none"] },
            { lane: 2, mark: "batch", icon: <FaSyncAlt />, label: "増分更新（定期バッチ）", desc: "新規・更新分のみ RAW→STAGING→MARTS を再処理", cost: ["compute", "ai"] },
          ];
          const laneTone = ["border-gray-300 bg-gray-50", "border-slate-300 bg-slate-50", "border-sky-300 bg-sky-50"];
          const markDot: Record<string, string> = { send: "bg-teal-500", return: "bg-emerald-500", proc: "bg-sky-500", batch: "bg-slate-500" };
          return (
            <div className="space-y-1.5">
              {ig.map((s, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2 items-stretch">
                  {[0, 1, 2].map((col) => {
                    if (col !== s.lane) {
                      return <div key={col} className="border-l-2 border-dashed border-gray-200 mx-auto w-px" />;
                    }
                    return (
                      <div key={col} className={`rounded-lg border ${laneTone[s.lane]} p-2`}>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`w-5 h-5 rounded-full ${markDot[s.mark]} text-white text-[10px] flex items-center justify-center flex-shrink-0`}>
                            {s.icon}
                          </span>
                          <span className="text-[12px] font-semibold text-gray-800">{s.label}</span>
                          {s.mark === "send" && <FaPaperPlane className="text-teal-500 text-[11px]" title="送信" />}
                          {s.mark === "return" && <FaReply className="text-emerald-500 text-[11px]" title="返却" />}
                          {s.mark === "batch" && <FaSyncAlt className="text-slate-500 text-[11px]" title="定期実行" />}
                        </div>
                        <div className="text-[10px] text-gray-600 leading-4 pl-6">{s.desc}</div>
                        <div className="flex flex-wrap gap-1 mt-1 pl-6">
                          {s.cost.map((c, ci) => <CostTag key={ci} kind={c} />)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })()}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-[10px]">
          <div className="rounded bg-slate-50 border border-slate-200 p-2 leading-4">
            <FaServer className="inline text-slate-500 mr-1" />
            <span className="font-semibold">RAW</span>：外部由来データを無加工で read-only 着地。原本をそのまま保持。
          </div>
          <div className="rounded bg-amber-50 border border-amber-200 p-2 leading-4">
            <SiDbt className="inline text-amber-600 mr-1" />
            <span className="font-semibold">STAGING</span>：dbt で正規化・型統一・クレンジングし、チャンク整形まで行う中間層。
          </div>
          <div className="rounded bg-emerald-50 border border-emerald-200 p-2 leading-4">
            <SiSnowflake className="inline text-sky-500 mr-1" />
            <span className="font-semibold">MARTS</span>：分析向け派生テーブル＋<span className="font-semibold">ベクトル列</span>。検索・Semantic View の参照先。
          </div>
        </div>
        <div className="mt-2 rounded bg-teal-50 border border-teal-200 px-2 py-1.5 text-[10px] text-teal-800 leading-4">
          <FaLayerGroup className="inline text-teal-600 mr-1" />
          取込は<span className="font-semibold">フロントがパイプラインに直接触れず</span>、Stage 連携を指示するだけ。変換はすべて Snowflake 内で <span className="font-mono">RAW→STAGING→MARTS</span> の単方向で完結し、<span className="font-semibold">hybrid（書込SSOT）には逆流させない</span>。
        </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">主要設計判断（ADR 抜粋）</h4>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li><span className="font-mono">AD-001</span>：Enterprise ではなく Standard Edition を採用</li>
            <li><span className="font-mono">AD-003</span>：Cortex Search Service は不採用</li>
            <li><span className="font-mono">AD-004</span>：CRON / 定期タスクは不使用</li>
            <li><span className="font-mono">AD-005</span>：書込みは Action SP に集約</li>
            <li><span className="font-mono">AD-008</span>：DADS + shadcn の二層共存</li>
            <li><span className="font-mono">AD-009</span>：CQRS（Read=View / Write=Action SP）</li>
          </ul>
        </section>

        <section className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">技術スタック / 制約</h4>
          <div className="flex flex-wrap gap-3 mb-3">
            <span className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md px-2 py-1"><SiSnowflake className="text-sky-500" /> Snowflake Std</span>
            <span className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md px-2 py-1"><FaAws className="text-orange-500" /> AWS ap-northeast-1</span>
            <span className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md px-2 py-1"><SiDbt className="text-orange-600" /> dbt-core 1.8</span>
            <span className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md px-2 py-1"><SiTerraform className="text-violet-600" /> Terraform</span>
          </div>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>機密性 level_1〜3、機密3は Secure View 分離</li>
            <li>ISMAP / GSS / HP Sure Click の制約に準拠</li>
            <li>監査ログ：QUERY_HISTORY を1年保持</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function Wbs() {
  return (
    <div className="space-y-5">
      <section className="bg-white border border-gray-200 rounded-lg p-4 overflow-x-auto">
        <h3 className="font-semibold text-gray-800 mb-3">WBS（全16週・3フェーズ）</h3>
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="text-left px-3 py-2 border border-gray-200">フェーズ</th>
              <th className="text-left px-3 py-2 border border-gray-200">期間</th>
              <th className="text-left px-3 py-2 border border-gray-200">目的</th>
              <th className="text-left px-3 py-2 border border-gray-200">主な成果物</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="px-3 py-2 border border-gray-200 font-semibold">Phase 1<br/>基盤構築</td>
              <td className="px-3 py-2 border border-gray-200">W1〜W5</td>
              <td className="px-3 py-2 border border-gray-200">基盤構築・初期データ投入</td>
              <td className="px-3 py-2 border border-gray-200">システムスケッチ、基盤モデル、データ取込み設定、RBAC/Secure View 初期構築</td>
            </tr>
            <tr className="bg-slate-50">
              <td className="px-3 py-2 border border-gray-200 font-semibold">Phase 2<br/>AI実装</td>
              <td className="px-3 py-2 border border-gray-200">W6〜W12</td>
              <td className="px-3 py-2 border border-gray-200">AI Agent 実装・PoC評価</td>
              <td className="px-3 py-2 border border-gray-200">Cortex Agent 導線、優先度スコアリング、UIパターン、評価サイクル</td>
            </tr>
            <tr className="bg-white">
              <td className="px-3 py-2 border border-gray-200 font-semibold">Phase 3<br/>運用移行</td>
              <td className="px-3 py-2 border border-gray-200">W13〜W16</td>
              <td className="px-3 py-2 border border-gray-200">知見継承機能・運用移行</td>
              <td className="px-3 py-2 border border-gray-200">手順書、納品物一式、ロードマップパッケージ、引継ぎ</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3">レビューゲート（R1〜R6 / progress.yaml）</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <div className="font-bold text-amber-900">R1</div>
            <div className="text-amber-700 mt-1">進行中</div>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
            <div className="font-bold text-emerald-900">R2</div>
            <div className="text-emerald-700 mt-1">承認済み</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="font-bold text-gray-700">R3</div>
            <div className="text-gray-500 mt-1">未着手</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="font-bold text-gray-700">R4</div>
            <div className="text-gray-500 mt-1">未着手</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="font-bold text-gray-700">R5</div>
            <div className="text-gray-500 mt-1">未着手</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="font-bold text-gray-700">R6</div>
            <div className="text-gray-500 mt-1">未着手</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Steps() {
  return (
    <div className="space-y-5">
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">実装手順書</h3>
        <ol className="list-decimal pl-5 text-sm text-gray-700 leading-6 space-y-2">
          <li>SSOTを確認：design.yaml / consulting.yaml / progress.yaml を読み、現状の承認状態（R2まで承認）を把握。</li>
          <li>機能と画面の対応を整理：design/1-45-features.yaml と design/1-55-ui.yaml の feature_refs を突き合わせ。</li>
          <li>役割別の導線を検証：html ワイヤーフレームで officer / g_gmen / data_steward の判断責任を確認。</li>
          <li>web モックを起動し、違反疑義ダッシュボード〜立入検査決定の主要フローを検証。</li>
          <li>必要に応じ scripts/fetch_*.py で JFTC 勧告・METI 調査等の参照 corpus を再取得（on-demand）。</li>
          <li>更新を提案スライド・納品物パッケージに反映し、次レビュー（R3以降）に備える。</li>
        </ol>
      </section>

      <section className="bg-slate-900 rounded-lg p-4 text-xs font-mono text-green-300 overflow-auto">
        <div className="text-slate-400 mb-1"># web モックの起動と検証</div>
        <div>cd C:\Users\cab02322\src\nomura\subcontract-compliance\web</div>
        <div>npm install</div>
        <div>npm run dev</div>
        <div>npm run verify:dads</div>
      </section>
    </div>
  );
}

function Docs() {
  return (
    <div className="space-y-4">
      <section className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-2">重要ポイント</h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 leading-6 space-y-1.5">
          <li><span className="font-semibold">要件トレーサビリティ</span>：spec/md → design → proposal が明示的に紐づき、根拠を追跡できる。</li>
          <li><span className="font-semibold">固定費最小化方針</span>：Cortex Search 不採用・CRON 不使用が検索・スケジューリング設計を規定する。</li>
          <li><span className="font-semibold">機密ガバナンス</span>：機密性3（過去相談データ等）は Secure View と監査ログで分離・追跡する。</li>
          <li><span className="font-semibold">モックファースト</span>：stage=mock で本番結合前に画面・導線を早期検証できる。</li>
          <li><span className="font-semibold">優先度スコア</span>：S = w1·R_viol + w2·S_impact + w3·V_uncoop で違反疑義をランク付け。</li>
          <li><span className="font-semibold">human-in-the-loop</span>：AIは提案まで、立入検査・ヒアリングの最終判断は人が実施。</li>
        </ul>
      </section>
    </div>
  );
}

function Artifacts() {
  const items = [
    "design.yaml",
    "consulting.yaml",
    "progress.yaml",
    "design/1-20-datasources.yaml",
    "design/1-45-features.yaml",
    "design/1-48-architecture.yaml",
    "design/1-55-ui.yaml",
    "proposal/proposal.yaml",
    "proposal/slides/ch4-requirements-response.yaml",
    "proposal/slides/ch6-deliverables.yaml",
    "web/README.md",
    "html/violation_suspect_dashboard.html",
    "scripts/fetch_jftc_recommendations.py",
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold text-gray-800 mb-2">主要成果物・参照ファイル</h3>
      <ul className="text-xs text-gray-700 space-y-1">
        {items.map((item) => (
          <li key={item} className="font-mono break-all">{item}</li>
        ))}
      </ul>
    </div>
  );
}

function QA() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <h3 className="font-semibold text-gray-800 mb-2">よくある質問</h3>
        {faqList.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={item.q} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : i)}
                className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-50"
              >
                <span className="text-sm font-semibold text-gray-800">{item.q}</span>
                <span className="text-gray-500 text-xs">{isOpen ? "▲" : "▼"}</span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-sm text-gray-700 leading-6 border-t border-gray-100 bg-slate-50">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </section>

      <Glossary />
    </div>
  );
}

type GlossaryItem = { term: string; category: string; desc: string };

const glossaryList: GlossaryItem[] = [
  { term: "Action SP", category: "アプリ/書込", desc: "本プロジェクトの命名規約。Snowflake の Stored Procedure を役割で分けたうちの「書込み専用」側（ACTION_ 接頭辞）。フロントからの全更新はこのSP経由でのみ行い、監査・整合・権限を一元化する（CQRS / ADR-0009）。" },
  { term: "Function SP", category: "アプリ/読取", desc: "副作用のない計算・検索用の Stored Procedure。AI_EMBED によるベクトル化や VECTOR_COSINE_SIMILARITY による意味検索など、状態を変えない処理を担う。" },
  { term: "Stored Procedure (SP)", category: "Snowflake", desc: "Snowflake 上で動くサーバーサイドの手続き。複数SQLをトランザクションとしてまとめ、ロジックや権限制御をデータの隣（DB内）で実行できる。" },
  { term: "Kysely", category: "アプリ/読取", desc: "TypeScript 製の型安全な SQL クエリビルダー。Read 経路で Secure View を SELECT する際に使用し、コンパイル時に列・型の整合を検査する。" },
  { term: "zod", category: "アプリ/検証", desc: "TypeScript のスキーマ定義・バリデーションライブラリ。DBからの結果や入力値を実行時に検証し、型と実データの不一致を防ぐ。" },
  { term: "CQRS", category: "設計", desc: "Command Query Responsibility Segregation。状態を変える書込み（Command＝Action SP）と参照（Query＝Secure View）の責務を分離する設計原則（ADR-0009）。" },
  { term: "Secure View", category: "Snowflake/データ", desc: "ビュー定義や元データを保護する Snowflake のビュー。Read 経路の参照先であり、機密性3データの機密分離（Standard Edition のため Masking/RAP の代替）に用いる。書込み不可。" },
  { term: "hybrid table", category: "Snowflake/データ", desc: "行指向の高速な読み書きに対応した Snowflake のテーブル。本設計では書込みの SSOT（正本）であり、Action SP からの MERGE 先となる。" },
  { term: "Cortex Agent", category: "AI", desc: "Snowflake Cortex のオーケストレーター。ユーザーの問いに応じて意味検索（Function SP）と構造化集計（Cortex Analyst）を使い分け、LLMで出典付きの回答を合成する。" },
  { term: "Cortex Analyst", category: "AI", desc: "Semantic View をもとに自然言語の問いを SQL に変換（NL→SQL）し、業種別・地域別の集計など構造化データ分析を行う Cortex 機能。" },
  { term: "Semantic View", category: "AI/データ", desc: "テーブルの列にビジネス上の意味（メトリクス・ディメンション）を付与した意味モデル。Cortex Analyst が正確な集計SQLを生成するための土台。" },
  { term: "AI_EMBED", category: "AI", desc: "テキストをベクトル（埋め込み）に変換する Snowflake の関数。モデルは snowflake-arctic-embed-l-v2.0。Cortex Search を使わず検索段を自前実装するための部品。" },
  { term: "VECTOR_COSINE_SIMILARITY", category: "AI", desc: "2つのベクトル間のコサイン類似度を計算する Snowflake の関数。AI_EMBED で作った埋め込み同士を比較し、意味的に近い文書を検索する。" },
  { term: "Cortex Search", category: "AI", desc: "検索段をマネージドで提供する Snowflake サービス。本プロジェクトでは固定費を持たない方針（no-fixed-cost / ADR）により不採用。" },
  { term: "SPCS", category: "基盤", desc: "Snowpark Container Services。コンテナを Snowflake 内で実行する基盤。本プロジェクトでは Next.js フロントをここで稼働させる。" },
  { term: "DADS", category: "UI", desc: "デジタル庁デザインシステム。政府統一のデザイン・操作性を満たすため、配色・字体・余白等を公式デザイントークンで準拠する（仕様書 表2 No.1）。" },
  { term: "dbt-core", category: "データ", desc: "SQLベースのデータ変換・モデリングツール（1.8.x）。RAW→STAGING→MARTS のモデル変換とテストを管理する。" },
  { term: "MARTS（mart 層）", category: "Snowflake/データ", desc: "データ層モデル RAW→STAGING→MARTS の最終層。分析向けに集計・整形した派生テーブル群で、本設計では AI_EMBED の埋め込み結果（ベクトル列）もここに保持する。検索（VECTOR_COSINE_SIMILARITY）と Semantic View の参照先。RAW/STAGING からの単方向変換で生成し、書込SSOTの hybrid table とは役割が異なる（取込結果は hybrid に逆流させない）。" },
  { term: "RAW（raw 層）", category: "Snowflake/データ", desc: "外部由来データを加工せず read-only で着地させる最初の層。Stage からの COPY INTO のロード先。" },
  { term: "STAGING（staging 層）", category: "Snowflake/データ", desc: "RAW を正規化・型統一・クレンジングし、チャンク整形まで行う中間層。dbt で変換し、MARTS の入力となる。" },
  { term: "Terraform", category: "基盤", desc: "インフラをコードで管理する IaC ツール。Snowflake オブジェクトや環境構築を宣言的に管理する。" },
];

function Glossary() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      glossaryList.filter(
        (g) =>
          g.term.toLowerCase().includes(query.toLowerCase()) ||
          g.desc.toLowerCase().includes(query.toLowerCase()) ||
          g.category.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <h3 className="font-semibold text-gray-800">用語集</h3>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="用語を検索（例: Action SP, zod, Secure View）"
          className="text-sm border border-gray-300 rounded-md px-3 py-1.5 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      </div>
      <dl className="divide-y divide-gray-100">
        {filtered.map((g) => (
          <div key={g.term} className="py-3 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-3">
            <dt className="flex flex-col gap-1 min-w-0">
              <span className="font-mono text-sm font-bold text-indigo-800 break-all">{g.term}</span>
              <span className="text-[10px] text-gray-500 bg-gray-100 rounded-full px-2 py-0.5 w-fit">{g.category}</span>
            </dt>
            <dd className="text-sm text-gray-700 leading-6 min-w-0 break-words">{g.desc}</dd>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-6 text-center text-sm text-gray-400">該当する用語が見つかりません</div>
        )}
      </dl>
    </section>
  );
}

export default function SubcontractGuide() {
  const [tab, setTab] = useState<TabId>("slides");

  return (
    <div className="space-y-6">
      <section className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-800 mb-1">subcontract-compliance 開発手順書</h2>
          <p className="text-sm text-gray-600">取適法・振興法 執行強化AI実証プロジェクト（SSOTベースのリポジトリ分析・実装ガイド）</p>
          <div className="font-mono text-xs text-slate-700 break-all mt-2">C:\Users\cab02322\src\nomura\subcontract-compliance</div>
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-200 pb-4 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === t.id ? "bg-slate-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "slides" && <Slides />}
        {tab === "overview" && <Overview />}
        {tab === "architecture" && <Architecture />}
        {tab === "wbs" && <Wbs />}
        {tab === "steps" && <Steps />}
        {tab === "docs" && <Docs />}
        {tab === "artifacts" && <Artifacts />}
        {tab === "qa" && <QA />}
      </section>
    </div>
  );
}
