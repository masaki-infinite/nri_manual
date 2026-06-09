"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type UnitRole = {
  unit: string;
  role: string;
};

type AgencyModel = {
  key: string;
  name: string;
  overview: string;
  levels: string[][];
  roles: UnitRole[];
  proposalFocus: string[];
};

const agencies: AgencyModel[] = [
  {
    key: "smea",
    name: "中小企業庁",
    overview:
      "中小企業政策の企画・実施を担う中核機関。経営支援、金融支援、事業承継、イノベーション支援を所掌。",
    levels: [
      ["中小企業庁長官"],
      ["長官官房", "事業環境部", "経営支援部"],
      ["財務課", "金融課", "取引課", "技術・経営革新課", "商業課", "創業・新事業促進課"],
    ],
    roles: [
      { unit: "長官官房", role: "庁全体の企画調整、予算・人事、政策総合管理" },
      { unit: "事業環境部", role: "資金繰り、取引適正化、価格転嫁、共済制度など事業環境整備" },
      { unit: "経営支援部", role: "生産性向上、事業承継、創業支援、地域商業活性化" },
      { unit: "金融課", role: "信用保証・政府系金融機関施策、危機時の資金繰り支援" },
      { unit: "技術・経営革新課", role: "ものづくり補助、DX/イノベーション推進、研究開発支援" },
    ],
    proposalFocus: [
      "補助金審査・執行の可視化（案件進捗、地域別採択、予算消化率）",
      "中小企業相談窓口データの統合分析（業種別・地域別課題抽出）",
      "金融支援施策の効果モニタリング（支援後の生産性/雇用指標）",
    ],
  },
  {
    key: "digital",
    name: "デジタル庁",
    overview:
      "行政DX・デジタル社会実装を推進する司令塔。共通基盤整備、標準化、ガバナンスを所掌。",
    levels: [
      ["デジタル監", "デジタル大臣"],
      ["戦略・組織グループ", "国民向けサービスグループ", "政府共通基盤グループ"],
      ["ガバナンス", "データ戦略", "ID連携", "クラウド/セキュリティ"],
    ],
    roles: [
      { unit: "戦略・組織グループ", role: "全体戦略、制度・ガイドライン整備、KPI管理" },
      { unit: "国民向けサービスグループ", role: "マイナポータル等の住民向けデジタルサービス企画運用" },
      { unit: "政府共通基盤グループ", role: "ガバメントクラウド、共通ID、共通API等の整備" },
      { unit: "データ戦略", role: "行政データ標準化、データ連携方針、品質管理" },
    ],
    proposalFocus: [
      "共通APIカタログ整備と連携可視化",
      "データ標準準拠率ダッシュボード",
      "セキュリティ・監査ログの統合モニタリング",
    ],
  },
  {
    key: "mlit",
    name: "国土交通省",
    overview:
      "都市計画、インフラ、交通、防災を所掌。PLATEAUを含む都市データ利活用の中核省庁。",
    levels: [
      ["国土交通大臣"],
      ["都市局", "道路局", "住宅局", "総合政策局"],
      ["都市計画課", "街路交通施設課", "防災課", "技術政策課"],
    ],
    roles: [
      { unit: "都市局", role: "都市政策・まちづくり、都市計画制度、デジタル活用推進" },
      { unit: "道路局", role: "道路計画、維持管理、交通ネットワーク整備" },
      { unit: "住宅局", role: "住宅政策、建築行政、ストック活用推進" },
      { unit: "総合政策局", role: "政策横断調整、データ利活用、EBPM推進" },
    ],
    proposalFocus: [
      "3D都市モデル活用（都市計画、防災、インフラ維持管理）",
      "道路・河川・公共施設データの統合ビュー",
      "自治体横断の施策効果分析基盤",
    ],
  },
  {
    key: "soumu",
    name: "総務省",
    overview:
      "地方行政、情報通信、消防・防災、統計を所掌し、自治体基盤の制度面・技術面を支える。",
    levels: [
      ["総務大臣"],
      ["自治行政局", "情報流通行政局", "統計局", "消防庁"],
      ["地域政策課", "情報通信政策課", "統計企画", "防災課"],
    ],
    roles: [
      { unit: "自治行政局", role: "自治体行政運営、地方制度、地域政策推進" },
      { unit: "情報流通行政局", role: "通信政策、デジタルインフラ、情報流通促進" },
      { unit: "統計局", role: "公的統計整備、調査設計、統計データ公開" },
      { unit: "消防庁", role: "消防防災行政、災害対応体制整備" },
    ],
    proposalFocus: [
      "自治体向け共通ダッシュボードの標準化",
      "統計データと行政業務データの連携活用",
      "防災情報のリアルタイム共有基盤",
    ],
  },
];

export default function GovernmentProposalsPage() {
  const [activeKey, setActiveKey] = useState<string>(agencies[0].key);

  const activeAgency = useMemo(
    () => agencies.find((a) => a.key === activeKey) ?? agencies[0],
    [activeKey]
  );

  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">省庁提案: 組織図と役割整理</h2>
      <p className="text-gray-700 leading-7 mb-8">
        省庁向け提案を作るための基礎資料として、各行政機関の主要組織と役割を整理しています。
        中小企業庁を含む代表的な機関について、組織図と提案観点を並べて確認できます。
      </p>

      <div className="space-y-8">
        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">対象機関</h3>
          <div className="flex flex-wrap gap-2">
            {agencies.map((agency) => {
              const isActive = agency.key === activeAgency.key;
              return (
                <button
                  key={agency.key}
                  onClick={() => setActiveKey(agency.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {agency.name}
                </button>
              );
            })}
          </div>
        </section>

        <section className="bg-gradient-to-br from-indigo-50 to-sky-50 border border-indigo-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">{activeAgency.name} の概要</h3>
          <p className="text-slate-700 leading-7">{activeAgency.overview}</p>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">組織図（簡易）</h3>
          <div className="space-y-4">
            {activeAgency.levels.map((level, levelIndex) => (
              <div key={`level-${levelIndex}`}>
                <div className="flex flex-wrap justify-center gap-3">
                  {level.map((unit) => (
                    <div
                      key={unit}
                      className="min-w-[180px] text-center bg-white border border-sky-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-800 shadow-sm"
                    >
                      {unit}
                    </div>
                  ))}
                </div>
                {levelIndex < activeAgency.levels.length - 1 && (
                  <div className="flex justify-center mt-2 text-slate-400">↓</div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">各組織の役割</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">組織</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">主な役割</th>
                </tr>
              </thead>
              <tbody>
                {activeAgency.roles.map((row) => (
                  <tr key={row.unit} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{row.unit}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">提案時の注力ポイント</h3>
          <ul className="space-y-3 text-slate-700 leading-7">
            {activeAgency.proposalFocus.map((item) => (
              <li key={item}>・{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
