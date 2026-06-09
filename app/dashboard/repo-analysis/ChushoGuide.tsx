"use client";

import { useState } from "react";

type TabId = "overview" | "architecture" | "steps" | "artifacts";

const tabs: { id: TabId; label: string }[] = [
  { id: "overview", label: "🏢 概要" },
  { id: "architecture", label: "🏗️ 構成図" },
  { id: "steps", label: "📋 手順書" },
  { id: "artifacts", label: "📁 成果物" },
];

function Overview() {
  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <h3 className="font-semibold text-emerald-800 mb-2">chusho-kigyocho-project とは？</h3>
        <p className="text-sm text-emerald-700">
          中小企業庁案件の実装リポジトリです。提案書を仕様原本に据え、source-spec と
          requirements-traceability を中核に要件追跡しながら、HVD型の設計・実装・検証を進めます。
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-3">最初の確認ポイント</h3>
        <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
          <li>docs/source/提案書_20260608_2.pdf（仕様原本）</li>
          <li>docs/source-spec.md（要件再整理）</li>
          <li>docs/requirements-traceability.md（要求と成果物の紐づけ）</li>
          <li>design/architect.md（制約とアーキテクチャ方針）</li>
        </ul>
      </div>
    </div>
  );
}

function Architecture() {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-gray-800">構成図（仕様起点モデル）</h3>
      <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 overflow-x-auto">
        <svg viewBox="0 0 980 360" className="min-w-[860px] w-full h-auto" role="img" aria-label="chusho architecture">
          <rect x="20" y="40" width="220" height="100" rx="10" fill="#ecfeff" stroke="#0891b2" />
          <text x="130" y="78" textAnchor="middle" fontSize="14" fill="#0f172a">仕様原本群</text>
          <text x="130" y="100" textAnchor="middle" fontSize="11" fill="#334155">提案書 / 別紙</text>
          <text x="130" y="120" textAnchor="middle" fontSize="11" fill="#334155">入札説明書</text>

          <rect x="290" y="40" width="230" height="100" rx="10" fill="#dcfce7" stroke="#16a34a" />
          <text x="405" y="78" textAnchor="middle" fontSize="14" fill="#0f172a">要件整理層</text>
          <text x="405" y="100" textAnchor="middle" fontSize="11" fill="#334155">source-spec</text>
          <text x="405" y="120" textAnchor="middle" fontSize="11" fill="#334155">traceability</text>

          <rect x="570" y="20" width="220" height="120" rx="10" fill="#eef2ff" stroke="#6366f1" />
          <text x="680" y="58" textAnchor="middle" fontSize="14" fill="#0f172a">設計/実装層</text>
          <text x="680" y="80" textAnchor="middle" fontSize="11" fill="#334155">architect.md</text>
          <text x="680" y="100" textAnchor="middle" fontSize="11" fill="#334155">web/api/data</text>

          <rect x="570" y="190" width="220" height="120" rx="10" fill="#ffedd5" stroke="#ea580c" />
          <text x="680" y="228" textAnchor="middle" fontSize="14" fill="#0f172a">検証/運用層</text>
          <text x="680" y="250" textAnchor="middle" fontSize="11" fill="#334155">受入試験・証跡</text>
          <text x="680" y="270" textAnchor="middle" fontSize="11" fill="#334155">運用手順・改善</text>

          <rect x="840" y="90" width="120" height="90" rx="10" fill="#f8fafc" stroke="#64748b" />
          <text x="900" y="128" textAnchor="middle" fontSize="13" fill="#0f172a">利用者</text>
          <text x="900" y="148" textAnchor="middle" fontSize="11" fill="#334155">関係部局</text>

          <line x1="240" y1="90" x2="290" y2="90" stroke="#475569" strokeWidth="2" />
          <line x1="520" y1="90" x2="570" y2="90" stroke="#475569" strokeWidth="2" />
          <line x1="680" y1="140" x2="680" y2="190" stroke="#475569" strokeWidth="2" />
          <line x1="790" y1="90" x2="840" y2="120" stroke="#475569" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}

function Steps() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800">開発手順（HVD寄せ）</h3>
      {[
        { phase: "R1", title: "仕様解釈", body: "原本提案書を起点に、要求IDを採番して整理" },
        { phase: "R2", title: "要件確定", body: "source-spec と traceability に反映し、合意形成" },
        { phase: "R3", title: "設計", body: "architect.md に制約・構成・リスクを記述" },
        { phase: "R4", title: "実装", body: "機能単位で実装し、要求IDとの紐づけを維持" },
        { phase: "R5", title: "検証", body: "受入条件に沿った試験を実施し証跡を残す" },
        { phase: "R6", title: "運用", body: "運用手順へ引き継ぎ、改善バックログを管理" },
      ].map((row) => (
        <div key={row.phase} className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">{row.phase}</span>
            <span className="text-sm font-semibold text-gray-800">{row.title}</span>
          </div>
          <p className="text-sm text-gray-600">{row.body}</p>
        </div>
      ))}
    </div>
  );
}

function Artifacts() {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-gray-800">参照成果物</h3>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
          <li>docs/source/提案書_20260608_2.pdf</li>
          <li>docs/source-spec.md</li>
          <li>docs/requirements-traceability.md</li>
          <li>design/architect.md</li>
          <li>README.md</li>
        </ul>
      </div>
      <p className="text-xs text-gray-500">変更時は、要件文書 → 設計文書 → 実装 → 検証結果の順で更新します。</p>
    </div>
  );
}

export default function ChushoGuide() {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">🏢 chusho-kigyocho-project</h2>
        <p className="text-sm text-gray-500 mt-1">HVD(Next.js + SPCS)と同じ粒度で整理した、中小企業庁案件の開発ガイド</p>
      </div>

      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-4 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && <Overview />}
      {tab === "architecture" && <Architecture />}
      {tab === "steps" && <Steps />}
      {tab === "artifacts" && <Artifacts />}
    </div>
  );
}
