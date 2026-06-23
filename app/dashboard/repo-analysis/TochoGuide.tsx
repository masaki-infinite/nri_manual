"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import Image from "next/image";

type TabId = "overview" | "architecture" | "wbs" | "steps" | "docs" | "artifacts" | "slides" | "proposal" | "qa";

type TochoDoc = {
  id: string;
  label: string;
  file: string;
};

const tochoDocs: TochoDoc[] = [
  { id: "spec", label: "仕様書", file: "33314827_仕様書.pdf" },
  { id: "appendix", label: "仕様書別紙１", file: "33314827_仕様書別紙１.pdf" },
  { id: "bid", label: "入札説明書", file: "33314827_入札説明書.pdf" },
  { id: "eval", label: "総合評価資料", file: "33314827_総合評価資料.pdf" },
];

const tabs: { id: TabId; label: string }[] = [
  { id: "slides", label: "🎯 説明スライド" },
  { id: "proposal", label: "📝 提案書作成" },
  { id: "overview", label: "🗼 概要" },
  { id: "architecture", label: "🏗️ 構成図" },
  { id: "wbs", label: "📅 WBS" },
  { id: "steps", label: "📋 手順書" },
  { id: "docs", label: "📌 重要ポイント" },
  { id: "artifacts", label: "📁 成果物" },
  { id: "qa", label: "❓ Q&A" },
];

function DocLinks({ onDocOpen }: { onDocOpen: (file: string) => void }) {
  return (
    <div className="mt-6 pt-4 border-t border-gray-100">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">📄 関連仕様書</h3>
      <div className="flex gap-2 flex-wrap">
        {tochoDocs.map((doc) => (
          <button
            key={doc.id}
            onClick={() => onDocOpen(doc.file)}
            className="px-3 py-1.5 rounded-md text-xs font-semibold border bg-white text-rose-700 border-rose-300 hover:bg-rose-50 transition-colors"
          >
            📄 {doc.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Overview({ onDocOpen }: { onDocOpen: (file: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
        <h3 className="font-semibold text-rose-800 mb-2">tocho-geospatial-platform とは？</h3>
        <p className="text-sm text-rose-700">
          東京都庁向けの geospatial プラットフォーム案件です。Snowflake をデータ中核に、
          ArcGIS Enterprise（Portal + Server）と Maps SDK for JavaScript、Next.js を組み合わせ、
          部局横断で利用できる地図・3D可視化・RAG検索基盤を庁内閉域で構築します。
        </p>
      </div>

      <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
        <h3 className="font-semibold text-violet-900 mb-2">ArcGIS Enterprise の置き場所</h3>
        <p className="text-sm text-gray-700 leading-6">
          Portal・Server・Data Store は Snowflake 上ではなく、
          <span className="font-semibold">都庁のデータセンター／サーバールームの VM・物理サーバー（オンプレ）</span>
          または
          <span className="font-semibold">庁内専用プライベートクラウド（閉域クラウド）</span>
          に構築します。③ Maps SDK はこの庁内 GIS を REST で参照します。
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-3">着手の順番（4 ステップ）</h3>
        <ol className="space-y-3">
          {[
            { title: "仕様ソース確認", text: "spec/original 配下の仕様書・別紙・入札説明書を確認" },
            { title: "設計方針同期", text: "design.yaml と design/requirements を最新化" },
            { title: "実装対象分割", text: "web / data / infra の担当境界を決める" },
            { title: "実装と検証", text: "小さな単位で実装し、受入条件と紐づけて検証" },
          ].map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-rose-600 text-white rounded-full text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-800">{step.title}</p>
                <p className="text-xs text-gray-600 mt-1">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <DocLinks onDocOpen={onDocOpen} />
      <GlossarySection terms={["図上訓練", "RAG（Retrieval-Augmented Generation）", "Cortex AI", "BFF（Backend for Frontend）", "ArcGIS Maps SDK for JavaScript", "ハザードマップ"]} />
    </div>
  );
}

function UIMock() {
  const [activeFeature, setActiveFeature] = useState<"chat" | "check" | "generate" | "doc" | "sim" | "decision">("chat");

  const featureTabs = [
    { id: "chat",     label: "① チャット",         color: "bg-blue-600" },
    { id: "check",    label: "① 整合性チェック",   color: "bg-blue-600" },
    { id: "generate", label: "① シナリオ生成",     color: "bg-blue-600" },
    { id: "doc",      label: "② 文書作成・修正",   color: "bg-rose-600" },
    { id: "sim",      label: "③ 被害予想シミュ",   color: "bg-emerald-600" },
    { id: "decision", label: "④ 判断支援",         color: "bg-violet-600" },
  ] as const;

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden shadow-sm text-xs">
      <div className="bg-blue-700 px-4 py-2 flex items-center justify-between">
        <span className="text-white font-bold">🔷 図上訓練支援AI</span>
        <div className="flex gap-4 text-blue-200">
          <span>東京都防災部門　都職員A ▼</span>
          <span>ログアウト</span>
        </div>
      </div>

      <div className="flex h-[460px]">
        <div className="w-48 bg-slate-50 border-r border-gray-200 flex flex-col flex-shrink-0">
          <div className="p-2 space-y-0.5">
            <p className="text-gray-400 font-semibold px-2 pt-2 pb-1 uppercase tracking-wide" style={{ fontSize: "10px" }}>機能選択</p>
            {featureTabs.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFeature(f.id)}
                className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors ${
                  activeFeature === f.id ? `${f.color} text-white font-semibold` : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="px-2 pt-2 border-t border-gray-200 mt-1">
            <p className="text-gray-400 font-semibold px-2 pb-1 uppercase tracking-wide" style={{ fontSize: "10px" }}>参照ファイル (3/5)</p>
            {["首都直下地震対処計画.pdf", "図上訓練実施手順書.pdf", "各局被害想定.xlsx"].map((f) => (
              <div key={f} className="px-2 py-0.5 text-gray-600 truncate">📄 {f}</div>
            ))}
            <button className="text-blue-500 px-2 py-1 hover:underline">＋ ファイル追加</button>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-white min-w-0">
          {activeFeature === "chat" && (
            <>
              <div className="px-4 py-2 bg-blue-50 border-b border-blue-100 font-semibold text-blue-800">チャットボット — 首都直下型地震</div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="flex justify-end">
                  <div className="bg-blue-100 text-blue-900 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[70%]">第２章の避難誘導手順について、最新計画書との整合性を確認してください</div>
                </div>
                <div className="flex gap-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold" style={{ fontSize: "10px" }}>AI</div>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[75%] space-y-1">
                    <p className="font-semibold text-gray-800">照合結果（参照: p.23, p.31）</p>
                    <p className="text-red-600">⚠ p.23「避難開始基準」— 最新版では震度６弱以上に変更</p>
                    <p className="text-green-700">✓ p.31「集合場所」— 計画書と一致</p>
                    <p className="text-gray-400 mt-1" style={{ fontSize: "10px" }}>根拠: 首都直下地震対処計画 第２章</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 p-3 flex gap-2">
                <input readOnly value="第３章の参集基準を確認して..." className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-gray-400 bg-gray-50" />
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-lg font-semibold">送信</button>
              </div>
            </>
          )}
          {activeFeature === "check" && (
            <>
              <div className="px-4 py-2 bg-blue-50 border-b border-blue-100 font-semibold text-blue-800">訓練シナリオ整合性チェック</div>
              <div className="flex-1 p-4 space-y-3">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center text-gray-400">
                  <p className="text-2xl mb-1">📄</p>
                  <p>チェック対象のシナリオファイルをドロップ</p>
                  <p style={{ fontSize: "10px" }}>.pdf / .docx / .xlsx 対応</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-1">
                  <p className="font-semibold text-amber-800">チェック結果 — 訓練シナリオv3.docx</p>
                  {[{ icon: "🔴", text: 'p.8「参集人員」が計画書の基準値と不一致' }, { icon: "🟡", text: 'p.15「物資配送ルート」— 道路閉塞想定が古い可能性' }, { icon: "🟢", text: 'p.22〜28「通信手続き」— 整合性OK' }].map((item) => (
                    <div key={item.text} className="flex gap-2 text-gray-700"><span>{item.icon}</span><span>{item.text}</span></div>
                  ))}
                </div>
              </div>
            </>
          )}
          {activeFeature === "generate" && (
            <>
              <div className="px-4 py-2 bg-blue-50 border-b border-blue-100 font-semibold text-blue-800">訓練シナリオ自動生成</div>
              <div className="flex-1 p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {[{ label: "災害種別", value: "首都直下地震（M7.3）" }, { label: "訓練対象", value: "第３局 防災部門" }, { label: "実施日時", value: "令和9年1月 予定" }, { label: "訓練形式", value: "図上訓練（机上）" }].map((f) => (
                    <div key={f.label}><p className="text-gray-500 mb-0.5">{f.label}</p><div className="border border-gray-300 rounded px-2 py-1 bg-white text-gray-700">{f.value}</div></div>
                  ))}
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold">シナリオを生成する</button>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-gray-700">
                  <p className="font-semibold text-blue-800 mb-1">生成結果（プレビュー）</p>
                  <p>【第1フェーズ: 発災直後 0〜3時間】</p>
                  <p className="text-gray-500">震度6強発生。各局は初動体制を確立し、被害状況の収集を開始する。参集基準に従い…</p>
                </div>
              </div>
            </>
          )}
          {activeFeature === "doc" && (
            <>
              <div className="px-4 py-2 bg-rose-50 border-b border-rose-200 font-semibold text-rose-800">② 計画・マニュアル 見直し修正</div>
              <div className="flex-1 flex gap-0 min-h-0">
                <div className="w-48 border-r border-gray-200 p-2 space-y-1 flex-shrink-0">
                  <p className="text-gray-400 font-semibold pb-1" style={{ fontSize: "10px" }}>文書リスト</p>
                  {["首都直下地震対処計画_v4.docx", "避難誘導マニュアル_v2.docx", "広域応援受援計画.docx"].map((d, i) => (
                    <div key={d} className={`px-2 py-1 rounded text-gray-700 truncate cursor-pointer ${i === 0 ? "bg-rose-100 text-rose-800 font-semibold" : "hover:bg-gray-100"}`}>📝 {d}</div>
                  ))}
                </div>
                <div className="flex-1 flex flex-col p-3 gap-2 min-w-0">
                  <div className="bg-rose-50 border border-rose-200 rounded p-2 text-rose-800">
                    <span className="font-semibold">AI提案:</span> 第３章「参集基準」を最新の被害想定（震度６弱以上）に合わせて改訂することを推奨します。
                  </div>
                  <div className="flex-1 border border-gray-200 rounded p-2 text-gray-700 bg-white overflow-y-auto">
                    <p className="text-gray-400 mb-1 font-semibold" style={{ fontSize: "10px" }}>編集中: 第３章 参集基準</p>
                    <p>発災時の参集については、以下の基準を適用する。</p>
                    <p className="mt-1 bg-yellow-100 border-l-2 border-yellow-400 pl-2">震度<span className="line-through text-red-500">５強</span> <span className="text-green-700 font-semibold">６弱</span>以上が観測された場合、全職員は直ちに参集する。</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-rose-600 text-white px-3 py-1 rounded font-semibold">保存</button>
                    <button className="border border-gray-300 px-3 py-1 rounded text-gray-600">差分確認</button>
                    <button className="border border-gray-300 px-3 py-1 rounded text-gray-600">承認申請</button>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeFeature === "sim" && (
            <>
              <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-200 font-semibold text-emerald-800">③ 被害予想シミュレーション</div>
              <div className="flex-1 flex gap-0 min-h-0">
                <div className="w-52 border-r border-gray-200 p-3 space-y-2 flex-shrink-0 overflow-y-auto">
                  <p className="text-gray-500 font-semibold" style={{ fontSize: "10px" }}>条件設定</p>
                  <div>
                    <p className="text-gray-500 mb-0.5">災害種別</p>
                    <select className="w-full border border-gray-300 rounded px-2 py-1 bg-white text-gray-700">
                      <option>首都直下地震（M7.3）</option>
                      <option>南海トラフ巨大地震</option>
                      <option>津波（相模湾）</option>
                      <option>富士山噴火（降灰）</option>
                      <option>大規模風水害</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-0.5">発生時刻</p>
                    <select className="w-full border border-gray-300 rounded px-2 py-1 bg-white text-gray-700">
                      <option>冬・平日・深夜 18時</option>
                      <option>夏・休日・昼間</option>
                      <option>朝ラッシュ時</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-0.5">表示レイヤー</p>
                    <div className="space-y-0.5">
                      {["震度分布", "津波浸水域", "建物倒壊リスク", "避難所位置"].map((l) => (
                        <label key={l} className="flex items-center gap-1.5 text-gray-700 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-3 h-3" />
                          {l}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-emerald-600 text-white py-1.5 rounded font-semibold">シミュレーション実行</button>
                  <div className="border border-emerald-200 rounded p-2 bg-emerald-50 space-y-0.5 text-gray-700">
                    <p className="font-semibold text-emerald-800">推計被害（23区）</p>
                    <p>死者: 約 6,100人</p>
                    <p>建物全壊: 約 175,000棟</p>
                    <p>避難者: 約 339,000人</p>
                    <p>浸水面積: —</p>
                  </div>
                </div>
                <div className="flex-1 relative bg-slate-200 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                    <div className="text-center text-slate-600">
                      <p className="text-3xl mb-1">🗺️</p>
                      <p className="font-semibold">ArcGIS 地図ビュー</p>
                      <p style={{ fontSize: "10px" }}>震度分布・浸水域・建物倒壊リスクを重ね合わせ表示</p>
                      <p style={{ fontSize: "10px" }} className="mt-1">ハザードマップレイヤー動的切替対応</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <button className="bg-white border border-gray-300 rounded px-2 py-0.5 text-gray-600 shadow-sm">2D</button>
                    <button className="bg-emerald-600 text-white rounded px-2 py-0.5 shadow-sm">3D</button>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeFeature === "decision" && (
            <>
              <div className="px-4 py-2 bg-violet-50 border-b border-violet-200 font-semibold text-violet-800">④ 判断支援ダッシュボード</div>
              <div className="flex-1 p-3 grid grid-cols-2 gap-2 overflow-y-auto">
                <div className="border border-amber-200 rounded-lg p-3 bg-amber-50">
                  <p className="font-semibold text-amber-800 mb-1">現況サマリー</p>
                  <p className="text-gray-700">震度6強 / 都内広域被害</p>
                  <p className="text-red-600">✦ 要対応: 避難所3箇所 収容超過</p>
                  <p className="text-orange-600">✦ 注意: 交通遮断路線 12本</p>
                </div>
                <div className="border border-violet-200 rounded-lg p-3 bg-violet-50">
                  <p className="font-semibold text-violet-800 mb-1">AI推奨アクション</p>
                  <ol className="text-gray-700 space-y-0.5 list-decimal pl-4">
                    <li>△△避難所の収容人数を近隣に分散</li>
                    <li>広域輸送ルートの迂回路設定</li>
                    <li>医療機関への搬送優先エリア指定</li>
                  </ol>
                </div>
                <div className="border border-blue-200 rounded-lg p-3 bg-blue-50 col-span-2">
                  <p className="font-semibold text-blue-800 mb-1">関連文書・シミュレーション</p>
                  <div className="flex gap-2 flex-wrap">
                    {["首都直下地震対処計画 p.15", "避難所一覧マップ", "被害予想シミュ（最新）", "広域応援要請手順"].map((d) => (
                      <span key={d} className="bg-white border border-blue-200 rounded px-2 py-0.5 text-blue-700 cursor-pointer hover:bg-blue-100">{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type ArchSub = "overview" | "dev" | "chatbot" | "consistency" | "scenario" | "slidescript";

type FlowNode = { icon: string; bg: string; title: string; sub: string; snow?: boolean; arrow?: string | null };

function FlowLane({ nodes, accent }: { nodes: FlowNode[]; accent: "violet" | "blue" | "rose" | "sky" }) {
  const arrowColor = { violet: "text-violet-400", blue: "text-blue-400", rose: "text-rose-400", sky: "text-sky-400" }[accent];
  const labelColor = { violet: "text-violet-600", blue: "text-blue-600", rose: "text-rose-600", sky: "text-sky-600" }[accent];
  return (
    <div className="flex items-stretch min-w-max">
      {nodes.map((n, i, arr) => (
        <Fragment key={n.title}>
          <div className="w-36 flex-shrink-0 flex flex-col items-center text-center">
            <div className="relative">
              <div className={`w-12 h-12 rounded-xl ${n.bg} text-white text-2xl flex items-center justify-center shadow-sm`}>{n.icon}</div>
              {n.snow && <span className="absolute -top-1.5 -right-1.5 text-[12px] bg-white rounded-full shadow border border-sky-200 leading-none px-0.5">❄️</span>}
            </div>
            <div className="text-[12px] font-bold text-gray-800 leading-tight mt-1.5">{n.title}</div>
            <div className="text-[10px] text-gray-500 leading-snug mt-0.5">{n.sub}</div>
          </div>
          {i < arr.length - 1 && (
            <div className="flex flex-col items-center justify-start pt-4 w-16 flex-shrink-0">
              <span className={`text-[9px] ${labelColor} font-semibold leading-tight text-center mb-0.5`}>{n.arrow}</span>
              <span className={`${arrowColor} text-xl leading-none`}>→</span>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

function ConsistencyFlow({ onDocOpen }: { onDocOpen: (file: string) => void }) {
  return (
    <div className="space-y-6 text-sm">
      <div className="bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200 rounded-xl p-5">
        <h3 className="font-bold text-rose-900 text-base mb-1.5">🛡️ 訓練シナリオ整合性チェックのデータフロー</h3>
        <p className="text-gray-700 leading-relaxed">
          チャットボットが「1 つの質問に回答」するのに対し、整合性チェックは <span className="font-semibold text-rose-800">複数文書の記述を突き合わせて矛盾・不足を検出</span> します。
          計画書を改訂した後などに、訓練シナリオ・被害想定との食い違いを一括点検する用途です。
          検索基盤は <span className="font-semibold">チャットボットと同じ Cortex Search の索引</span> を共用します。
        </p>
      </div>

      <div className="bg-white border-2 border-gray-300 rounded-xl p-4 space-y-3 overflow-x-auto">
        <div className="inline-flex items-center gap-1.5 bg-rose-600 text-white text-[11px] font-bold rounded-md px-2.5 py-1">実行時フロー<span className="font-normal text-rose-100">／ ❄️ は Snowflake 内で完結</span></div>
        <div className="border-2 border-rose-200 bg-rose-50/40 rounded-lg p-3">
          <FlowLane
            accent="rose"
            nodes={[
              { icon: "👤", bg: "bg-slate-600", title: "対象文書を選択", sub: "計画書 / シナリオ / 被害想定", arrow: "チェック実行" },
              { icon: "🟧", bg: "bg-orange-500", title: "Next.js API（/api/consistency）", sub: "チェックジョブ起動", arrow: "記述抽出" },
              { icon: "🧩", bg: "bg-violet-600", title: "記述・基準を抽出", sub: "数値・参集基準・手順を列挙", snow: true, arrow: "クロス参照" },
              { icon: "🔎", bg: "bg-emerald-600", title: "Cortex Search クロス参照", sub: "各記述に関連する他文書を取得", snow: true, arrow: "矛盾判定" },
              { icon: "🛡️", bg: "bg-rose-600", title: "AI_CLASSIFY / COMPLETE", sub: "矛盾 / 要確認 / 整合 に分類", snow: true, arrow: "集約" },
              { icon: "📋", bg: "bg-green-600", title: "結果集約・修正提案", sub: "根拠ページ付きで一覧化", snow: true, arrow: "表示" },
              { icon: "🖥️", bg: "bg-sky-600", title: "画面表示", sub: "差分ハイライト・推奨修正反映", arrow: null },
            ]}
          />
        </div>
        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <span className="text-rose-500 font-bold">⤺</span>
          <span>チャットボットと違い、<span className="font-semibold text-rose-700">検索→判定を文書内の記述ごとに反復</span>し、ペア間の矛盾をまとめて出力します。</span>
        </div>
      </div>

      <section className="space-y-2">
        <h3 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-rose-700 text-white rounded px-2 py-0.5 text-xs">P</span>この機能のポイント</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {[
            { t: "クロス文書比較", b: "1 文書内ではなく計画書×シナリオ×被害想定の横断で、参集基準・数値・手順の食い違いを検出。" },
            { t: "判定の自動分類", b: "AI_CLASSIFY / COMPLETE で「矛盾／要確認／整合」に分類し、優先度を付けて提示。" },
            { t: "根拠と修正提案", b: "矛盾ペアごとに該当ページ（doc_name・page_no）と AI 推奨修正案を添付し、ワンクリックで反映。" },
          ].map((c) => (
            <div key={c.t} className="bg-rose-50 border border-rose-200 rounded-lg p-3">
              <div className="font-bold text-rose-800 mb-1">{c.t}</div>
              <div className="text-gray-700 leading-relaxed">{c.b}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-900 text-green-300 rounded-lg p-3 font-mono text-[11px] leading-relaxed overflow-auto">
          <div className="text-gray-400">// 記述ペアの矛盾判定（イメージ）</div>
          <div>SELECT SNOWFLAKE.CORTEX.COMPLETE(</div>
          <div className="text-yellow-300">{"  'claude-3-5-sonnet',"}</div>
          <div>{"  '次の2記述に矛盾があれば JSON で指摘: ' || a.chunk_text || ' / ' || b.chunk_text"}</div>
          <div>{") AS verdict"}</div>
          <div>FROM plan_chunks a JOIN scenario_chunks b ON ... ;</div>
        </div>
      </section>

      <DocLinks onDocOpen={onDocOpen} />
    </div>
  );
}

function ScenarioFlow({ onDocOpen }: { onDocOpen: (file: string) => void }) {
  return (
    <div className="space-y-6 text-sm">
      <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 rounded-xl p-5">
        <h3 className="font-bold text-sky-900 text-base mb-1.5">⚡ 訓練シナリオ自動生成のデータフロー</h3>
        <p className="text-gray-700 leading-relaxed">
          災害条件（種別・規模・時刻・対象局）を指定すると、<span className="font-semibold text-sky-800">過去の訓練・計画書・手順書を検索して文脈に取り込み</span>、
          時系列（T+0 / T+30 分 …）のシナリオ素案を自動生成します。約 2 時間分の訓練設計を 20 秒程度で叩き台化できます。
          検索基盤は <span className="font-semibold">チャットボットと同じ Cortex Search の索引</span> を共用します。
        </p>
      </div>

      <div className="bg-white border-2 border-gray-300 rounded-xl p-4 space-y-3 overflow-x-auto">
        <div className="inline-flex items-center gap-1.5 bg-sky-600 text-white text-[11px] font-bold rounded-md px-2.5 py-1">実行時フロー<span className="font-normal text-sky-100">／ ❄️ は Snowflake 内で完結</span></div>
        <div className="border-2 border-sky-200 bg-sky-50/40 rounded-lg p-3">
          <FlowLane
            accent="sky"
            nodes={[
              { icon: "👤", bg: "bg-slate-600", title: "災害条件を設定", sub: "種別 / 規模 / 時刻 / 対象局", arrow: "生成実行" },
              { icon: "🟧", bg: "bg-orange-500", title: "Next.js API（/api/scenario）", sub: "生成ジョブ起動", arrow: "素材検索" },
              { icon: "🔎", bg: "bg-emerald-600", title: "Cortex Search", sub: "過去訓練・手順書から関連素材取得", snow: true, arrow: "文脈付与" },
              { icon: "📝", bg: "bg-green-600", title: "プロンプト組立", sub: "条件+素材+出力フォーマット(時系列)", snow: true, arrow: "生成" },
              { icon: "⚡", bg: "bg-indigo-600", title: "Cortex COMPLETE", sub: "タイムライン素案を生成（約20秒）", snow: true, arrow: "整形" },
              { icon: "📄", bg: "bg-teal-600", title: "整形・docx 化", sub: "章立て・根拠ページ付与", snow: true, arrow: "出力" },
              { icon: "🖥️", bg: "bg-sky-600", title: "画面表示 / docx 出力", sub: "確認・編集・ダウンロード", arrow: null },
            ]}
          />
        </div>
        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <span className="text-sky-500 font-bold">＊</span>
          <span>チャットボットの「検索→生成」を踏襲しつつ、<span className="font-semibold text-sky-700">出力をタイムライン形式に構造化</span>し、docx として書き出します。</span>
        </div>
      </div>

      <section className="space-y-2">
        <h3 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-sky-700 text-white rounded px-2 py-0.5 text-xs">P</span>この機能のポイント</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {[
            { t: "条件駆動の生成", b: "災害種別・規模・時刻・対象局を組み合わせ、複数パターンのシナリオを即座に叩き台化。" },
            { t: "過去事例の再利用", b: "Cortex Search で過去訓練・計画書・手順書を取り込み、現実的で根拠のある展開を生成。" },
            { t: "構造化出力", b: "T+0 / T+30 分 … のタイムライン形式に整形し、根拠ページ付き docx として出力・編集。" },
          ].map((c) => (
            <div key={c.t} className="bg-sky-50 border border-sky-200 rounded-lg p-3">
              <div className="font-bold text-sky-800 mb-1">{c.t}</div>
              <div className="text-gray-700 leading-relaxed">{c.b}</div>
            </div>
          ))}
        </div>
      </section>

      <DocLinks onDocOpen={onDocOpen} />
    </div>
  );
}

function Architecture({
  onDocOpen,
  sub,
  setSub,
  archSlideIdx,
  setArchSlideIdx,
  archShowScript,
  setArchShowScript,
}: {
  onDocOpen: (file: string) => void;
  sub: ArchSub;
  setSub: (s: ArchSub) => void;
  archSlideIdx: number;
  setArchSlideIdx: (i: number) => void;
  archShowScript: boolean;
  setArchShowScript: (v: boolean) => void;
}) {
  const [showDetailedScript, setShowDetailedScript] = useState(false);
  const subTabs: { id: ArchSub; label: string }[] = [
    { id: "overview", label: "🏗️ 全体構成" },
    { id: "dev", label: "🛠️ 開発環境" },
    { id: "chatbot", label: "💬 チャットボット（RAG）" },
    { id: "consistency", label: "🛡️ 整合性チェック" },
    { id: "scenario", label: "⚡ シナリオ生成" },
    { id: "slidescript", label: "🎤 スライド" },
  ];
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-1.5 bg-slate-100 rounded-xl p-1">
        {subTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setSub(t.id)}
            className={`text-[13px] font-semibold px-3.5 py-1.5 rounded-lg transition ${sub === t.id ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {sub === "overview" && <ArchOverview onDocOpen={onDocOpen} />}
      {sub === "dev" && <DevArchOverview onDocOpen={onDocOpen} />}
      {sub === "chatbot" && (
        <div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 mb-5 text-xs text-amber-800 leading-relaxed">
            <span className="font-bold">💬 チャットボット</span> は RAG（Retrieval-Augmented Generation）構成そのものです。文書の保存からチャンク・検索・生成・画面表示までのデータフローを以下に示します。整合性チェック・シナリオ生成もこの検索基盤（Cortex Search の索引）を共用します。
          </div>
          <Rag onDocOpen={onDocOpen} />
        </div>
      )}
      {sub === "consistency" && <ConsistencyFlow onDocOpen={onDocOpen} />}
      {sub === "scenario" && <ScenarioFlow onDocOpen={onDocOpen} />}
      {sub === "slidescript" && (
        <div className="space-y-6">
          <SlideScript idx={archSlideIdx} setIdx={setArchSlideIdx} showScript={archShowScript} setShowScript={setArchShowScript} />
          <div className="flex items-center justify-center pt-1">
            <button
              onClick={() => setShowDetailedScript((v) => !v)}
              aria-pressed={showDetailedScript}
              className={`flex items-center gap-1.5 text-[12px] font-bold px-3.5 py-2 rounded-lg border transition ${showDetailedScript ? "bg-slate-700 text-white border-slate-700" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"}`}
            >
              <span>📖</span>
              <span>{showDetailedScript ? "詳細台本を隠す" : "詳細台本を表示"}</span>
            </button>
          </div>
          {showDetailedScript && <Script />}
        </div>
      )}
    </div>
  );
}

function HorizArrow({ label, icon = "→", dashed = false }: { label?: string; icon?: string; dashed?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center px-0.5 flex-shrink-0 self-stretch min-w-[28px]">
      {label ? (
        <span className={`text-[8.5px] text-center leading-tight mb-0.5 max-w-[56px] ${dashed ? "text-slate-400" : "text-slate-500"}`}>
          {label}
        </span>
      ) : null}
      <span
        className={`font-bold text-base leading-none ${dashed ? "text-slate-300 border-b-2 border-dashed border-slate-400 w-6" : "text-slate-400"}`}
      >
        {icon}
      </span>
    </div>
  );
}

function VertArrow({ label, icon = "↓", dashed = false, tone = "slate" }: { label?: string; icon?: string; dashed?: boolean; tone?: "slate" | "emerald" | "sky" }) {
  const tones = {
    slate: { line: "bg-slate-400", text: "text-slate-500", icon: "text-slate-400" },
    emerald: { line: "bg-emerald-500", text: "text-emerald-700", icon: "text-emerald-500" },
    sky: { line: "bg-sky-400", text: "text-sky-600", icon: "text-sky-400" },
  };
  const t = tones[tone];
  return (
    <div className="flex flex-col items-center justify-center py-0.5 flex-shrink-0 min-h-[24px]">
      {label ? <span className={`text-[7.5px] font-semibold mb-0.5 whitespace-nowrap ${t.text}`}>{label}</span> : null}
      <div className={`w-0.5 h-3 ${dashed ? "border-l-2 border-dashed border-sky-400 bg-transparent w-0" : t.line}`} />
      <span className={`font-bold text-sm leading-none ${dashed ? "text-slate-300" : t.icon}`}>{icon}</span>
    </div>
  );
}

function VertBarrier({ title, sub, tone = "slate" }: { title: string; sub?: string; tone?: "slate" | "violet" | "purple" | "sky" }) {
  const tones = {
    slate: "bg-slate-200/80 border-slate-400 text-slate-700",
    violet: "bg-violet-100 border-violet-400 text-violet-800",
    purple: "bg-purple-100 border-purple-500 text-purple-800",
    sky: "bg-sky-100 border-sky-400 text-sky-800",
  };
  return (
    <div className={`flex flex-col items-center justify-center border-2 rounded-md flex-shrink-0 self-stretch px-1.5 py-2 min-w-[44px] max-w-[52px] ${tones[tone]}`}>
      <span className="text-[9px] font-bold tracking-wider" style={{ writingMode: "vertical-rl" }}>{title}</span>
      {sub ? <span className="text-[7.5px] mt-1 opacity-80 text-center leading-tight">{sub}</span> : null}
    </div>
  );
}

function InternetCloud({ label = "Internet" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center flex-shrink-0 self-stretch px-1">
      <div className="w-12 h-8 border-2 border-slate-300 rounded-full bg-white flex items-center justify-center text-[8px] text-slate-500 font-semibold shadow-sm">{label}</div>
    </div>
  );
}

function DevArchDiagram() {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex items-stretch gap-0.5 min-w-[880px] text-[10px]">
        {/* 左: 開発者 PC */}
        <div className="w-[155px] flex-shrink-0 flex flex-col gap-1.5">
          <div className="bg-violet-50 border-2 border-violet-400 rounded-lg p-2 flex-1">
            <div className="font-bold text-violet-900 text-[11px] mb-1.5">💻 開発者 PC</div>
            {[
              { t: "Git", d: "アプリ / IaC / SQL" },
              { t: "IDE", d: "VS Code / Cursor" },
              { t: ".env.local", d: "PAT（gitignore）" },
              { t: "config.toml", d: "Snowflake CLI" },
            ].map((x) => (
              <div key={x.t} className="bg-white border border-violet-200 rounded px-1.5 py-1 mb-1 last:mb-0">
                <div className="font-bold text-violet-800 text-[9.5px]">{x.t}</div>
                <div className="text-violet-600 text-[8.5px]">{x.d}</div>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            {[
              { c: "bg-amber-50 border-amber-300 text-amber-900", t: "① IaC", d: "terraform apply" },
              { c: "bg-blue-50 border-blue-300 text-blue-900", t: "② データ", d: "PUT / snow sql" },
              { c: "bg-orange-50 border-orange-300 text-orange-900", t: "③ アプリ", d: "npm run dev" },
            ].map((x) => (
              <div key={x.t} className={`border rounded px-1.5 py-0.5 ${x.c}`}>
                <span className="font-bold">{x.t}</span>
                <span className="ml-1 font-mono text-[8.5px] opacity-80">{x.d}</span>
              </div>
            ))}
          </div>
        </div>

        <InternetCloud label="TLS" />
        <VertBarrier title="PAT認証" sub="Key Pair" tone="violet" />

        {/* 中央: Snowflake */}
        <div className="flex-1 border-2 border-green-500 bg-green-50/40 rounded-xl p-2.5 min-w-[340px]">
          <div className="bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded inline-block mb-1.5">❄️ Snowflake（開発アカウント・東京リージョン）</div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { t: "インフラ（IaC）", d: "TOCHO_BOUSAI DB / RAW・RAG・APP\nROLE×3 / SEARCH_WH / Network Policy", c: "border-amber-300 bg-amber-50/60" },
              { t: "データ格納", d: "DOCS_STAGE / DOCUMENTS\nCHUNKS / Directory Table", c: "border-blue-300 bg-blue-50/60" },
              { t: "検索・AI", d: "Cortex Search Service\nAI_PARSE_DOCUMENT / COMPLETE", c: "border-emerald-300 bg-emerald-50/60" },
              { t: "ガバナンス", d: "GRANT 最小権限 / Secrets\n監査ログ", c: "border-slate-300 bg-white/80" },
            ].map((x) => (
              <div key={x.t} className={`border rounded-lg p-1.5 ${x.c}`}>
                <div className="font-bold text-green-900 text-[9.5px]">{x.t}</div>
                <div className="text-green-800 text-[8.5px] mt-0.5 whitespace-pre-line leading-snug">{x.d}</div>
              </div>
            ))}
          </div>
          <div className="mt-1.5 text-[8.5px] text-green-700 bg-white/70 border border-green-200 rounded px-2 py-0.5 text-center">
            ① terraform → ② PUT/SQL → ③ snowflake-sdk（いずれも PAT / Key Pair）
          </div>
        </div>

        <VertBarrier title="本番時" sub="OAuth" tone="purple" />

        {/* 右: 本番 SPCS（参考） */}
        <div className="w-[130px] flex-shrink-0 border border-orange-300 bg-orange-50/50 rounded-lg p-2 flex flex-col justify-center">
          <div className="font-bold text-orange-800 text-[10px]">SPCS 本番</div>
          <div className="text-orange-700 text-[8.5px] mt-1 leading-snug">
            /snowflake/session/token
            <br />
            Next.js コンテナ内 OAuth
            <br />
            <span className="italic opacity-70">開発時は未使用</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RuntimeArchDiagram() {
  const features = [
    { id: "①", t: "AI機能群", d: "チャット / 整合性 / シナリオ", c: "bg-amber-50 border-amber-300 text-amber-800", gis: false },
    { id: "②", t: "計画・文書", d: "エディタ / 版管理", c: "bg-rose-50 border-rose-300 text-rose-800", gis: false },
    { id: "③", t: "被害予想", d: "ArcGIS 2D/3D", c: "bg-emerald-100 border-emerald-500 text-emerald-900", gis: true },
    { id: "④", t: "判断支援", d: "統合ダッシュボード", c: "bg-violet-50 border-violet-300 text-violet-800", gis: false },
  ];
  return (
    <div className="overflow-x-auto pb-1 pt-0.5">
      <div className="flex items-stretch gap-0.5 min-w-[1020px] text-[10px]">
        {/* 左: 利用者・クライアント */}
        <div className="w-[130px] flex-shrink-0 flex flex-col gap-1">
          <div className="bg-blue-50 border border-blue-300 rounded-lg p-2 text-center">
            <div className="font-bold text-blue-800 text-[11px]">👤 都職員</div>
            <div className="text-blue-600 text-[8.5px]">20名・ブラウザ</div>
          </div>
          {features.map((f) => (
            <div key={f.id} className={`border rounded px-1.5 py-1 ${f.c} ${f.gis ? "border-2" : ""}`}>
              <div className="font-bold text-[9.5px]">{f.id} {f.t}</div>
              <div className="text-[8.5px] opacity-85">{f.d}</div>
              {f.gis ? <div className="text-[7.5px] font-bold mt-0.5 text-emerald-700">★ ArcGIS SDK</div> : null}
            </div>
          ))}
        </div>

        <HorizArrow label="HTTPS" />
        <InternetCloud />
        <VertBarrier title="アプリ認証" sub="セッション" tone="violet" />
        <HorizArrow label="HTTPS" />

        {/* フロントエンド / バックエンド（Snowflake の下に庁内 GIS） */}
        <div className="flex items-stretch gap-0.5 flex-1 min-w-[480px]">
          {/* フロントエンド */}
          <div className="w-[158px] flex-shrink-0 flex flex-col self-stretch">
            <div className="text-[8px] font-bold text-orange-700 tracking-wide mb-1">フロントエンド</div>
            <div className="border-2 border-orange-400 bg-orange-50/40 rounded-xl p-2.5 flex flex-col flex-1">
              <div className="bg-orange-600 text-white text-[9px] font-bold px-2 py-0.5 rounded inline-block mb-1 self-start">Next.js（BFF）</div>
              <div className="text-[8px] text-orange-800 mb-1.5">API Route・セッション・画面出し分け・履歴</div>
              <div className="flex flex-col gap-1">
                {features.map((f) => (
                  <div
                    key={f.id}
                    className={`border rounded px-2 py-1.5 bg-white/80 ${f.c} ${f.gis ? "border-2 ring-1 ring-emerald-300" : ""}`}
                  >
                    <div className="font-bold text-[9px]">{f.id}</div>
                    <div className="text-[8.5px]">{f.gis ? "Maps SDK" : "Next.js UI"}</div>
                    {f.gis ? <div className="text-[7px] text-emerald-700 font-semibold text-right mt-0.5">→ REST③</div> : null}
                  </div>
                ))}
              </div>
              <div className="flex-1 min-h-[8px]" />
              <div className="mt-1.5 bg-white/80 border border-orange-200 rounded px-1.5 py-0.5 text-[8px] text-orange-700 text-center">
                snowflake-sdk（サーバー側のみ）
              </div>
            </div>
          </div>

          {/* 接続矢印：上=SQL（BFF→Snowflake）、下=REST③（③ Maps SDK→庁内 GIS） */}
          <div className="flex flex-col justify-between self-stretch py-4 min-w-[32px]">
            <HorizArrow label="SQL" />
            <HorizArrow label="REST③" />
          </div>
          <VertBarrier title="IP制限" sub="RBAC" tone="sky" />

          {/* バックエンド + 庁内 GIS（Snowflake の下に縦配置） */}
          <div className="flex-1 min-w-[200px] flex flex-col self-stretch">
            <div className="text-[8px] font-bold text-sky-700 tracking-wide mb-1">バックエンド</div>
            <div className="border-2 border-sky-400 bg-sky-50/50 rounded-xl p-2.5 flex flex-col flex-1">
              <div className="bg-sky-600 text-white text-[9px] font-bold px-2 py-0.5 rounded inline-block mb-1.5 self-start">❄️ Snowflake（東京）</div>
              <div className="grid grid-cols-1 gap-1">
                <div className="bg-white border border-green-500 rounded p-1.5">
                  <div className="font-bold text-green-800 text-[9px]">Cortex AI</div>
                  <div className="text-green-700 text-[8px]">Search / COMPLETE</div>
                </div>
                <div className="bg-white border border-green-500 rounded p-1.5">
                  <div className="font-bold text-green-800 text-[9px]">データ基盤</div>
                  <div className="text-green-700 text-[8px]">文書 / 履歴（+ GIS mart 任意）</div>
                </div>
              </div>
              <div className="mt-1 text-[7.5px] text-sky-700 bg-white/70 border border-sky-200 rounded px-1.5 py-0.5 text-center">
                SPCS：バッチ / API ジョブ（任意）
              </div>
            </div>

            <VertArrow label="同期（任意）" dashed tone="sky" />

            <div className="text-[8px] font-bold text-teal-700 tracking-wide mb-0.5">庁内 GIS（閉域）</div>
            <div className="border-2 border-teal-500 bg-teal-50/60 rounded-xl p-2 flex-shrink-0 space-y-1">
              <div className="font-bold text-teal-900 text-[9px]">ArcGIS Enterprise</div>
              <div className="bg-white/90 border border-amber-300 rounded px-1.5 py-1">
                <div className="font-semibold text-amber-900 text-[8px]">Portal for ArcGIS</div>
                <div className="text-amber-800 text-[7px]">認証・共有・カタログ</div>
              </div>
              <div className="bg-white/90 border border-violet-300 rounded px-1.5 py-1">
                <div className="font-semibold text-violet-900 text-[8px]">Server + Data Store</div>
                <div className="text-violet-800 text-[7px]">Hosted Feature Layer · ③のみ</div>
              </div>
            </div>
          </div>
        </div>

        <HorizArrow label="取込" icon="←" />

        {/* 右: データソース */}
        <div className="w-[125px] flex-shrink-0 flex flex-col gap-1">
          <div className="bg-slate-50 border border-slate-300 rounded-lg p-1.5 flex-1">
            <div className="font-bold text-slate-700 text-[9px]">📄 訓練文書</div>
            <div className="text-slate-600 text-[8px] mt-0.5 leading-snug">計画書 / 手順書 / シナリオ（PDF・docx・xlsx）</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-1.5 flex-1">
            <div className="font-bold text-slate-700 text-[9px]">🗺️ 地理空間（③用）</div>
            <div className="text-slate-600 text-[8px] mt-0.5 leading-snug">Pro → Portal → Enterprise で Hosted Feature Layer 化</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-0.5 mt-1.5 text-[9px] text-slate-500">
        <span>左 → 右：利用者 → フロントエンド（BFF）→ バックエンド（Snowflake + 庁内 GIS）</span>
        <span className="hidden sm:inline">｜</span>
        <span>実線：HTTPS / SQL（BFF→Snowflake）/ REST③（③ Maps SDK→庁内 GIS）</span>
        <span className="hidden sm:inline">｜</span>
        <span className="border-b border-dashed border-slate-400">点線：Snowflake → Enterprise 同期（Phase 2・任意）</span>
        <span className="hidden sm:inline">｜</span>
        <span>取込：訓練文書 → Snowflake ｜ GIS → Pro → Portal（Enterprise）</span>
        <span className="hidden sm:inline">｜</span>
        <span>庁内 GIS：DC／サーバールームの VM・物理機（オンプレ）または庁内プライベートクラウド</span>
      </div>
    </div>
  );
}

function DevArchOverview({ onDocOpen }: { onDocOpen: (file: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-800">開発環境構成図</h3>
        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
          ローカル IDE から Snowflake のインフラ・データを構築・投入するときの接続関係です。本番（SPCS）は OAuth トークンですが、
          <span className="font-semibold">開発時は PAT（Programmatic Access Token）または Key Pair</span> で CLI / Terraform / Next.js から接続します。
        </p>
      </div>

      <DevArchDiagram />

      <div className="space-y-3 text-xs">
        {/* 本番との違い */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <div className="font-bold text-slate-800 text-[11px] mb-1.5">開発 vs 本番（認証の違い）</div>
            <table className="w-full text-[10px]">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="pb-1 pr-2">環境</th>
                  <th className="pb-1 pr-2">接続元</th>
                  <th className="pb-1">認証</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="py-1 pr-2 font-semibold">開発</td>
                  <td className="py-1 pr-2">ローカル IDE / CLI</td>
                  <td className="py-1 font-mono">PAT / Key Pair</td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 font-semibold">本番</td>
                  <td className="py-1 pr-2">SPCS 内 Next.js</td>
                  <td className="py-1 font-mono">OAuth（/snowflake/session/token）</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="font-bold text-red-800 text-[11px] mb-1">⚠️ セキュリティ注意</div>
            <ul className="text-[10px] text-red-700/90 space-y-0.5">
              <li>• PAT / rsa_key は .env・.gitignore にのみ保存（リポジトリにコミットしない）</li>
              <li>• 開発用ロールは最小権限（本番 ADMIN ロールをローカルに置かない）</li>
              <li>• Network Policy で開発者 IP のみ許可する運用も可</li>
            </ul>
          </div>
        </div>

        {/* 典型的な初回セットアップフロー */}
        <div className="bg-indigo-50/50 border border-indigo-200 rounded-xl p-4">
          <div className="font-bold text-indigo-900 text-[11px] mb-2">典型的な初回セットアップフロー</div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px]">
            {[
              "Snowflake で PAT 発行",
              "→ terraform apply（DB/Role/WH）",
              "→ snow sql で GRANT 確認",
              "→ PUT 文書を Stage へ",
              "→ チャンク化・Search 作成 SQL",
              "→ .env に PAT 設定",
              "→ npm run dev で API 接続確認",
            ].map((s, i) => (
              <span key={i} className={i % 2 === 0 ? "bg-white border border-indigo-200 rounded px-2 py-1 text-indigo-800" : "text-indigo-400 font-bold"}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <DocLinks onDocOpen={onDocOpen} />
      <GlossarySection terms={["IaC（Infrastructure as Code）", "PAT（Programmatic Access Token）", "BFF（Backend for Frontend）", "SPCS（Snowpark Container Services）"]} />
    </div>
  );
}

function ArchOverview({ onDocOpen }: { onDocOpen: (file: string) => void }) {
  return (
    <div className="space-y-6">
      <nav className="text-xs text-slate-500" aria-label="構成図の階層">
        構成図 <span className="text-slate-400 mx-1">›</span> 全体構成 <span className="text-slate-400 mx-1">›</span>
        <span className="font-semibold text-slate-700">システム構成図（ランタイム）</span>
      </nav>
      <h3 className="font-semibold text-gray-800 -mt-2">システム構成図（ランタイム）</h3>
      <p className="text-[10.5px] text-slate-500 -mt-4">
        左から右へ：利用者 → フロントエンド（Next.js BFF）→ バックエンド（Snowflake）→ データソース。
        地図配信は庁内の ArcGIS Enterprise（Portal + Server）が担う
      </p>

      <RuntimeArchDiagram />

      <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-gray-700 leading-6">
        <div className="font-bold text-violet-900 mb-2">庁内 GIS（閉域）のサーバーはどこに置くか</div>
        <p className="mb-2">
          構成図の <span className="font-semibold">庁内 GIS（閉域）</span>＝ Portal for ArcGIS・ArcGIS Server・ArcGIS Data Store の稼働先です。
          Snowflake（東京リージョン）や SPCS 上の Next.js とは<span className="font-semibold">別インフラ</span>に載せます。
        </p>
        <ul className="space-y-1.5 text-[13px]">
          <li>
            ・<span className="font-semibold">オンプレミス</span>：都庁のデータセンター／サーバールームの物理サーバーまたは VM
          </li>
          <li>
            ・<span className="font-semibold">閉域クラウド</span>：庁内専用のプライベートクラウド（インターネット上の Esri SaaS ではない）
          </li>
          <li>
            ・<span className="font-semibold">接続</span>：都職員ブラウザの ③ Maps SDK が庁内 LAN 経由で REST 参照（機能③のみ）
          </li>
        </ul>
        <p className="text-xs text-violet-800/90 mt-2">
          詳細は研修ページ「ArcGIS Enterprise › サーバーの置き場所」も参照。ホスト名・区画・台数は基盤準備で確定。
        </p>
      </div>

      <NextjsSnowflakeConnection />

      <h3 className="font-semibold text-gray-800">想定UI モック</h3>
      <UIMock />

      <DevDetail />

      <DocLinks onDocOpen={onDocOpen} />
      <GlossarySection terms={["RAG（Retrieval-Augmented Generation）", "Cortex AI", "BFF（Backend for Frontend）", "SPCS（Snowpark Container Services）", "ArcGIS Maps SDK for JavaScript", "GIS mart", "Feature Layer", "PLATEAU", "ハザードマップ", "IaC（Infrastructure as Code）", "マルチターン対話"]} />
    </div>
  );
}

function NextjsSnowflakeConnection() {
  return (
    <div className="space-y-4 border border-indigo-200 bg-indigo-50/30 rounded-xl p-5">
      <div>
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <span className="bg-indigo-700 text-white rounded px-2 py-0.5 text-xs">接続</span>
          Next.js と Snowflake の接続方法（技術）
        </h3>
        <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
          構成図のレイヤー間をつなぐ具体的な接続方式です。ブラウザは Next.js の <span className="font-semibold">API Route（BFF）</span> にだけアクセスし、
          Snowflake への接続は <span className="font-semibold">サーバー側の snowflake-sdk</span> が担います（HVD / jcg_snowflake と同じパターン）。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 接続フロー（横方向） */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="text-sm font-bold text-gray-800 mb-2">接続フロー（実行時・左→右）</div>
          <div className="overflow-x-auto pb-1">
            <div className="flex items-stretch gap-0.5 min-w-[520px] text-[10px]">
              {[
                { c: "bg-blue-50 border-blue-200", t: "ブラウザ", b: "HTTPS / SSE" },
                { c: "bg-orange-50 border-orange-200", t: "BFF", b: "API Route" },
                { c: "bg-teal-50 border-teal-200", t: "snowflake-sdk", b: "SQL 実行" },
                { c: "bg-green-50 border-green-200", t: "Snowflake", b: "検索+生成" },
                { c: "bg-violet-50 border-violet-200", t: "レスポンス", b: "ストリーム返却" },
              ].map((x, i, arr) => (
                <div key={x.t} className="flex items-stretch">
                  <div className={`border rounded-lg px-2 py-1.5 flex-1 min-w-[88px] ${x.c}`}>
                    <div className="font-bold text-gray-800">{x.t}</div>
                    <div className="text-gray-600 text-[9px] mt-0.5">{x.b}</div>
                  </div>
                  {i < arr.length - 1 ? <HorizArrow /> : null}
                </div>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-gray-500 mt-2">fetch(&apos;/api/chat&apos;) → lib/db/client.ts → SEARCH_PREVIEW / CORTEX.COMPLETE。資格情報は BFF 内のみ。</p>
        </div>

        {/* 右: 認証・環境変数・コード */}
        <div className="space-y-3">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-bold text-gray-800 mb-2">認証方式（2 パターン）</div>
            <div className="space-y-2 text-xs">
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-2.5">
                <div className="font-bold text-teal-800">本番（SPCS 内）</div>
                <div className="text-gray-700 mt-1 leading-relaxed">
                  コンテナに注入される <span className="font-mono">/snowflake/session/token</span> を OAuth トークンとして使用。
                  <span className="font-mono"> SNOWFLAKE_HOST</span>（内部ホスト）経由で接続。ユーザー/ロール/WH はサービス spec が決定。
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                <div className="font-bold text-slate-800">開発（ローカル / Vercel 等）</div>
                <div className="text-gray-700 mt-1 leading-relaxed">
                  <span className="font-mono">SNOWFLAKE_PAT</span>（Programmatic Access Token）+ ユーザー名で接続。
                  接続情報は <span className="font-mono">.env</span>（gitignore）のみ。Terraform / CLI でのインフラ構築も同じ PAT を使用 → 詳細は「構成図 › 開発環境」。
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-sm font-bold text-gray-800 mb-2">環境変数（BFF が参照）</div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
              {["SNOWFLAKE_ACCOUNT", "SNOWFLAKE_USER", "SNOWFLAKE_PAT", "SNOWFLAKE_ROLE", "SNOWFLAKE_WAREHOUSE", "SNOWFLAKE_DATABASE", "SNOWFLAKE_SCHEMA", "SNOWFLAKE_HOST (SPCS)"].map((v) => (
                <span key={v} className="bg-slate-100 text-slate-700 rounded px-2 py-1">{v}</span>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 text-green-300 rounded-lg p-3 font-mono text-[10.5px] leading-relaxed overflow-auto">
            <div className="text-gray-400">// lib/db/client.ts（サーバー側のみ）</div>
            <div>import snowflake from &apos;snowflake-sdk&apos;</div>
            <div className="mt-1">const conn = snowflake.createConnection({"{"}</div>
            <div>{"  account: process.env.SNOWFLAKE_ACCOUNT,"}</div>
            <div>{"  username: process.env.SNOWFLAKE_USER,"}</div>
            <div>{"  token: process.env.SNOWFLAKE_PAT,"}</div>
            <div>{"  authenticator: 'OAUTH', // SPCS 時"}</div>
            <div>{"  database: 'TOCHO_BOUSAI', schema: 'RAG',"}</div>
            <div>{"});"}</div>
            <div className="mt-1 text-gray-400">// app/api/chat/route.ts</div>
            <div>{"const rows = await execute(sql, [sysPrompt, query]);"}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        {[
          { i: "🚫", t: "やらないこと", b: "ブラウザから Snowflake へ直接接続（snowflake-sdk をクライアントに載せない）" },
          { i: "🔐", t: "セキュリティ境界", b: "IP 制限・データ RBAC は Snowflake 側（Network Policy / GRANT）。アプリ認証は Next.js 側" },
          { i: "📎", t: "詳細フロー", b: "RAG の SQL 手順は「構成図 › チャットボット（RAG）」の D/E セクション・技術スライド「呼び出しフロー」も参照" },
        ].map((n) => (
          <div key={n.t} className="bg-white border border-indigo-100 rounded-lg p-3 flex gap-2">
            <span className="text-base flex-shrink-0">{n.i}</span>
            <div>
              <div className="font-bold text-indigo-800">{n.t}</div>
              <div className="text-gray-600 mt-0.5 leading-snug">{n.b}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FrontendConnectionDiagram({ compact = false }: { compact?: boolean }) {
  const fs = compact ? "text-[8px]" : "text-[9.5px]";
  const flows: {
    id: string;
    name: string;
    ui: string;
    uiTone: string;
    api: string;
    transport: string;
    bffWork: string;
    backend: string;
    backendTone: string;
    req: string;
    res: string;
    gis: boolean;
    gisNote?: string;
  }[] = [
    {
      id: "①",
      name: "AI機能群",
      ui: "Chat / 整合性 / シナリオ",
      uiTone: "bg-amber-50 border-amber-300 text-amber-900",
      api: "/api/chat · /consistency · /scenario",
      transport: "POST → SSE/JSON",
      bffWork: "SEARCH_PREVIEW → COMPLETE（RAG 3 API）",
      backend: "Snowflake Cortex",
      backendTone: "bg-green-50 border-green-400 text-green-900",
      req: "{ query, docIds, conditions }",
      res: "stream / issues[] / timeline[]",
      gis: false,
    },
    {
      id: "②",
      name: "計画・文書",
      ui: "DocEditor / 版管理",
      uiTone: "bg-rose-50 border-rose-300 text-rose-900",
      api: "/api/documents",
      transport: "GET/POST → JSON",
      bffWork: "版保存・履歴・エディタ同期",
      backend: "Snowflake APP スキーマ",
      backendTone: "bg-green-50 border-green-400 text-green-900",
      req: "{ docId, content, version }",
      res: "{ saved, history[] }",
      gis: false,
    },
    {
      id: "③",
      name: "被害予想",
      ui: "MapView / SceneView",
      uiTone: "bg-emerald-100 border-emerald-500 text-emerald-900",
      api: "（BFF 非経由）",
      transport: "REST③ 直接",
      bffWork: "レイヤー配信は担わない",
      backend: "庁内 ArcGIS Enterprise",
      backendTone: "bg-teal-50 border-teal-500 text-teal-900",
      req: "layerUrl + where / geometry",
      res: "GeoJSON / FeatureSet",
      gis: true,
      gisNote: "Maps SDK → Feature Service（庁内 LAN）",
    },
    {
      id: "④",
      name: "判断支援",
      ui: "Dashboard 統合",
      uiTone: "bg-violet-50 border-violet-300 text-violet-900",
      api: "/api/chat + REST③",
      transport: "SSE + REST",
      bffWork: "地図要約をプロンプトに注入",
      backend: "Snowflake + Enterprise",
      backendTone: "bg-gradient-to-r from-green-50 to-teal-50 border-sky-400 text-slate-800",
      req: "{ query, geoSummary }",
      res: "統合レポート + 地図連動",
      gis: true,
      gisNote: "③ と同経路で GIS、回答は BFF 経由",
    },
  ];

  return (
    <div className="space-y-2">
      <div className={`overflow-x-auto pb-1 ${compact ? "pt-0" : "pt-0.5"}`}>
        <div className={`flex flex-col gap-1 ${fs}`} style={{ minWidth: compact ? 880 : 1040 }}>
          {/* レイヤーヘッダー */}
          <div className="grid grid-cols-[118px_28px_1fr_28px_1fr] gap-0.5 items-stretch mb-0.5">
            <div className="bg-blue-50 border border-blue-300 rounded-lg px-2 py-1.5 text-center">
              <div className="font-bold text-blue-800 text-[10px]">👤 ブラウザ</div>
              <div className="text-blue-600 text-[7.5px]">React UI / Maps SDK</div>
            </div>
            <div />
            <div className="bg-orange-50 border-2 border-orange-400 rounded-lg px-2 py-1.5 text-center">
              <div className="font-bold text-orange-800 text-[10px]">Next.js BFF（SPCS）</div>
              <div className="text-orange-700 text-[7.5px]">API Route · snowflake-sdk（サーバー側のみ）</div>
            </div>
            <div />
            <div className="bg-sky-50 border-2 border-sky-400 rounded-lg px-2 py-1.5 text-center">
              <div className="font-bold text-sky-800 text-[10px]">バックエンド</div>
              <div className="text-sky-700 text-[7.5px]">Snowflake（①②④）｜庁内 GIS（③④）</div>
            </div>
          </div>

          {/* 機能別フロー行 */}
          {flows.map((f) => (
            <div key={f.id} className="grid grid-cols-[118px_28px_1fr_28px_1fr] gap-0.5 items-stretch">
              <div className={`border rounded-lg px-2 py-1.5 flex flex-col justify-center ${f.uiTone} ${f.gis ? "border-2" : ""}`}>
                <div className="font-bold">{f.id} {f.name}</div>
                <div className="opacity-85 text-[8px] mt-0.5">{f.ui}</div>
                {f.gis ? <div className="text-[7px] font-bold text-emerald-700 mt-0.5">★ Maps SDK</div> : null}
              </div>

              <div className="flex flex-col items-center justify-center gap-0.5 py-1">
                <span className={`font-bold text-[8px] text-center leading-tight ${f.gis ? "text-emerald-600" : "text-slate-500"}`}>
                  {f.transport.split(" ")[0]}
                </span>
                <HorizArrow label={f.gis && f.id === "③" ? "REST③" : undefined} />
                {f.transport.includes("SSE") ? <span className="text-[7px] text-violet-600 font-semibold">SSE</span> : null}
              </div>

              <div className="border border-orange-300 bg-orange-50/50 rounded-lg px-2 py-1.5 flex flex-col justify-center">
                <div className="font-mono font-bold text-orange-900 text-[8.5px]">{f.api}</div>
                <div className="text-orange-800 text-[7.5px] mt-0.5">{f.bffWork}</div>
                <div className="grid grid-cols-2 gap-1 mt-1 text-[7px]">
                  <span className="bg-white/80 border border-orange-200 rounded px-1 py-0.5">
                    <span className="text-orange-600 font-semibold">req </span>{f.req}
                  </span>
                  <span className="bg-white/80 border border-orange-200 rounded px-1 py-0.5">
                    <span className="text-orange-600 font-semibold">res </span>{f.res}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-1">
                {f.gis && f.id === "③" ? (
                  <span className="text-[7px] text-teal-700 font-bold text-center leading-tight">庁内<br />LAN</span>
                ) : (
                  <HorizArrow label="SQL" />
                )}
              </div>

              <div className={`border rounded-lg px-2 py-1.5 flex flex-col justify-center ${f.backendTone} ${f.gis ? "border-2" : ""}`}>
                <div className="font-bold text-[8.5px]">{f.backend}</div>
                {f.gisNote ? <div className="text-[7px] mt-0.5 opacity-90">{f.gisNote}</div> : null}
                {f.id === "①" ? (
                  <div className="text-[7px] mt-0.5 text-green-800">DOC_SEARCH · COMPLETE · シナリオ docx</div>
                ) : null}
                {f.id === "②" ? (
                  <div className="text-[7px] mt-0.5 text-green-800">APP.DOCUMENTS · 版履歴</div>
                ) : null}
                {f.id === "③" ? (
                  <div className="text-[7px] mt-0.5 text-teal-800">Hosted Feature Layer · ハザード / PLATEAU</div>
                ) : null}
              </div>
            </div>
          ))}

          {/* 双方向・境界 */}
          <div className="grid grid-cols-[118px_28px_1fr_28px_1fr] gap-0.5 items-center mt-1">
            <div className="col-span-5 border border-dashed border-slate-300 rounded-lg px-2 py-1.5 bg-slate-50/80">
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-[7.5px] text-slate-600">
                <span><span className="font-bold text-emerald-700">③→① 連携:</span> 地図選択範囲の要約を /api/chat の geoSummary に載せて RAG へ</span>
                <span className="hidden sm:inline text-slate-300">｜</span>
                <span><span className="font-bold text-orange-700">引用ジャンプ:</span> citations[].page_no → 文書ビューア（② 画面）</span>
                <span className="hidden sm:inline text-slate-300">｜</span>
                <span><span className="font-bold text-red-700">🚫</span> ブラウザから Snowflake 直接接続しない（PAT / OAuth は BFF のみ）</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 ${compact ? "text-[7.5px]" : "text-[9px]"} text-slate-500`}>
        <span>実線：①②④ は BFF 経由で Snowflake（HTTPS / SQL）</span>
        <span className="hidden sm:inline">｜</span>
        <span>③ は Maps SDK が庁内 Enterprise へ REST③ 直接（タイル・Feature は BFF を通さない）</span>
        <span className="hidden sm:inline">｜</span>
        <span className="border-b border-dashed border-slate-400">点線（別図）：Snowflake → Enterprise 同期は Phase 2・任意</span>
      </div>
    </div>
  );
}

function Script() {
  const sections: {
    no: string;
    title: string;
    time: string;
    screen: string;
    color: string;
    lines: string[];
  }[] = [
    {
      no: "0",
      title: "オープニング",
      time: "約1分",
      screen: "タイトル / 概要",
      color: "border-slate-300 bg-slate-50",
      lines: [
        "本日は、本システムの中核となるAI機能群を「なぜこの構成で作るのか」、その設計判断の理由を中心にご説明します。",
        "私たちが重視したのは3点です。1つ目は『回答の正確さと根拠の明示』、2つ目は『行政システムとしてのセキュリティと中立性』、3つ目は『他事業者への引継ぎ容易性』です。これら3つを同時に満たす答えが、今回の『Snowflake内で完結するRAG構成』でした。これからその理由を、データの流れに沿って順にご説明します。",
      ],
    },
    {
      no: "1",
      title: "なぜRAGなのか —— 「それらしい嘘」を許さないため",
      time: "約1.5分",
      screen: "構成図 → チャットボット（RAG）／全体図",
      color: "border-amber-300 bg-amber-50",
      lines: [
        "まず大前提として、防災計画のような業務では、AIが『それらしいが間違った回答』を返すことは許されません。一般的な大規模言語モデルは、学習時点の一般知識でもっともらしく答えてしまうため、最新の計画書や都庁固有のルールには対応できません。",
        "そこで採用したのがRAG（Retrieval-Augmented Generation）です。これは『まず計画書から関連箇所を検索し、その内容を根拠としてAIに渡してから回答させる』仕組みです。これにより、ハルシネーションを抑え、『計画書の何ページに、こう書いてある』という根拠付きの回答が実現します。",
        "画面の全体図のとおり、処理は『事前処理（文書を検索できる状態にする）』と『実行時（質問に答える）』の2つに分かれます。この“検索してから生成する”流れが、正確性を担保する土台になっています。",
      ],
    },
    {
      no: "2",
      title: "なぜSnowflake内で完結させるのか —— セキュリティと中立性",
      time: "約2分",
      screen: "構成図 → 全体構成／セキュリティ設計",
      color: "border-emerald-300 bg-emerald-50",
      lines: [
        "次に『どこで処理するか』です。私たちはデータを一切Snowflakeの外に出さない構成を選びました。理由は2つあります。",
        "1つ目はセキュリティです。防災計画には非公開の参集基準や被害想定が含まれます。これらを外部のAIサービスに送信するのは大きなリスクです。Snowflakeであれば、文書の保存・テキスト化・検索・AIによる生成まで、すべて同一のセキュリティ境界の中で完結します。さらに、東京リージョンでの稼働、保存時・転送時の暗号化、IPアドレス制限、3ロールのアクセス権限管理、そしてアップロードした文書をモデルの学習に使わせない設定（オプトアウト）まで、行政要件を標準機能で満たせます。",
        "2つ目は中立性です。本調達では特定製品への過度な依存を避けることが求められます。Snowflake CortexのAI呼び出しは標準SQLで書け、COMPLETE関数のモデル名を変えるだけでLLMを差し替えられます。特定のAIベンダーに縛られない設計です。",
      ],
    },
    {
      no: "3",
      title: "なぜCortex Searchを検索基盤に選んだのか —— 運用負荷の最小化",
      time: "約2分",
      screen: "構成図 → 全体構成／RAG構築方法の選択肢",
      color: "border-indigo-300 bg-indigo-50",
      lines: [
        "検索の作り方にはいくつか選択肢があります。自前でベクトルDB（pgvectorやElasticsearch等）を立てる方法もありますが、それには別途インフラの構築・監視・スケーリングが必要になり、運用負荷と引継ぎコストが増大します。",
        "私たちが採用したのはCortex Search（マネージド検索）です。理由は、埋め込み生成・インデックス作成・更新をSnowflakeが自動で管理してくれるためです。SQLで検索サービスを1つ定義するだけで済み、追加のインフラは要りません。",
        "しかも内部では、ベクトル検索（意味の近さ）＋キーワード検索（語句の一致）＋セマンティック再ランクを組み合わせた“ハイブリッド検索”が標準で動きます。『参集』と『招集』のような表記ゆれにも強く、特別なチューニングなしで高い検索精度が得られます。文書を追加すれば設定した間隔で索引が自動更新されるため、運用も無人化できます。",
      ],
    },
    {
      no: "4",
      title: "なぜこのデータの持ち方なのか —— 文書・画像・テーブル設計",
      time: "約2分",
      screen: "構成図 → 全体構成／D1〜D4",
      color: "border-blue-300 bg-blue-50",
      lines: [
        "データの持ち方も、検索精度とコストを両立するよう設計しています。",
        "文書の実体（PDFやWord、画像）は内部ステージにそのまま保管し、ファイル一覧はディレクトリテーブルからSQLで参照できます。AIに渡す必要があるときはFILE型を介して直接連携します。",
        "検索の中心になるのがチャンク（文書を意味のまとまりで分割した断片）です。AI_PARSE_DOCUMENTで表や見出しを保ったままテキスト化し、SPLIT_TEXT_RECURSIVE_CHARACTERで分割します。各チャンクには文書名・ページ番号・章節（見出し）といったメタデータを付けます。これがあるおかげで、『計画書だけを対象に』といった絞り込みや、『何ページが根拠か』という引用表示が可能になります。",
        "図表については、画像そのものを検索するのではなく、図のキャプションや要約をテキストとしてチャンクに含めることで検索可能にし、図の中身の理解が必要なときだけ、マルチモーダルのAIに画像を渡して解釈させます。こうしてテーブルは、文書マスタ・チャンク・要約・会話履歴・版管理と、役割ごとに分けて設計しています。",
      ],
    },
    {
      no: "5",
      title: "なぜトークン削減にこだわるのか —— コストと速度",
      time: "約1.5分",
      screen: "構成図 → 全体構成／D5・D6",
      color: "border-rose-300 bg-rose-50",
      lines: [
        "生成AIの費用と応答速度は、AIに渡す情報量（トークン数）にほぼ比例します。そこで“必要なものだけを、必要なだけ渡す”ことを徹底しています。",
        "具体的には、チャンクをSnowflake推奨の512トークン以下に保ち、検索で取得する件数も上位3〜5件に絞ります。メタデータで先に対象文書を絞り込み、無関係な情報はそもそも渡しません。会話履歴は直近の数ターンだけ保持し、古い部分は要約して圧縮します。出力の長さにも上限を設けます。",
        "これらは単なるコスト削減ではなく、渡す情報を絞ることで回答の精度も上がり、応答も速くなるという、品質とコストの両取りの設計です。",
      ],
    },
    {
      no: "6",
      title: "なぜ整合性チェックも同じ構成で実現できるのか",
      time: "約1.5分",
      screen: "構成図 → 整合性チェック",
      color: "border-rose-300 bg-rose-50",
      lines: [
        "ここが本構成の大きな利点です。整合性チェックは、チャットボットとまったく同じCortex Searchの検索基盤を再利用して実現します。",
        "チャットボットが『1つの質問に1つの答え』を返すのに対し、整合性チェックは複数の文書の記述を突き合わせて、矛盾や不足を検出します。たとえば計画書の参集基準と、訓練シナリオや被害想定の記述に食い違いがないかを、文書を横断して点検します。",
        "仕組みとしては、各記述に関連する他文書のチャンクを検索で集め、AI_CLASSIFYやCOMPLETEで『矛盾／要確認／整合』に分類し、根拠ページと推奨修正案を添えて一覧化します。新しい検索エンジンを作る必要はなく、同じ基盤の上で“使い方”を変えるだけ。これが、限られた予算と工期で複数機能を提供できる理由です。",
      ],
    },
    {
      no: "7",
      title: "なぜシナリオ自動生成も自然に乗るのか",
      time: "約1分",
      screen: "構成図 → シナリオ生成",
      color: "border-sky-300 bg-sky-50",
      lines: [
        "シナリオ自動生成も同じ発想です。災害の条件（種別・規模・時刻・対象局）を指定すると、同じ検索基盤で過去の訓練・計画書・手順書から関連素材を取り込み、時系列のシナリオ素案を生成します。約2時間分の訓練設計を20秒程度で叩き台化できます。",
        "つまり、チャットボット・整合性チェック・シナリオ生成という3機能は、『検索してから生成する』という1つの共通基盤を共有しています。これが、保守のしやすさと拡張性につながっています。",
      ],
    },
    {
      no: "8",
      title: "なぜNext.js＋ArcGISの構成なのか",
      time: "約1.5分",
      screen: "構成図 → 全体構成（アプリ層）／RAG フロント接続",
      color: "border-orange-300 bg-orange-50",
      lines: [
        "利用者が触れる画面はNext.jsで作り、Snowflakeへの接続は必ずサーバー側（BFF）を経由させます。これにより、接続情報や資格情報をブラウザに一切露出させません。回答は逐次表示（ストリーミング）で、待ち時間を感じさせない設計です。",
        "地図はArcGIS Maps SDKを採用し、ハザードマップや被害想定を2D/3Dで可視化します。AIの回答に含まれる避難所や浸水域を地図にプロットし、逆に地図上の被害推計を要約してAIの判断材料に渡す、という双方向の連携が可能です。Next.jsがこの両者を1画面に統合し、判断支援を実現します。",
      ],
    },
  ];

  const evalPoints = [
    { k: "正確性", v: "RAGによる根拠付き回答でハルシネーションを抑制" },
    { k: "セキュリティ", v: "Snowflake内で完結し、暗号化・アクセス制御・学習オプトアウトを標準で具備" },
    { k: "中立性／ロックイン回避", v: "標準SQLとモデル差し替え可能な設計で特定ベンダー依存を回避" },
    { k: "引継ぎ容易性", v: "構成をIaCでコード管理し、版管理機能とあわせて他事業者への移行を容易に" },
    { k: "コスト効率", v: "マネージドサービスとトークン最適化で運用負荷と費用を最小化" },
  ];

  return (
    <div className="space-y-5 text-sm max-w-4xl">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white rounded-xl p-5">
        <h3 className="font-bold text-lg mb-1">🎤 説明台本：なぜこの構成でRAG・整合性チェックを構築したのか</h3>
        <p className="text-indigo-100 text-xs leading-relaxed">
          想定時間：約12〜15分／聞き手：東京都ご担当者・評価者。各セクションの「画面」は提示するタブ・スライドの目安です。そのまま読み上げ用に使えます。
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
          <span className="bg-white/15 border border-white/30 rounded-full px-3 py-1">3つの軸：正確さ／セキュリティ・中立性／引継ぎ容易性</span>
          <span className="bg-white/15 border border-white/30 rounded-full px-3 py-1">話の流れ：データの流れに沿って説明</span>
        </div>
      </div>

      {/* 本編セクション */}
      {sections.map((s) => (
        <div key={s.no} className={`border rounded-xl p-4 ${s.color}`}>
          <div className="flex items-start gap-3 mb-2">
            <span className="w-8 h-8 rounded-full bg-white border border-slate-300 text-slate-700 font-bold flex items-center justify-center flex-shrink-0 shadow-sm">{s.no}</span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-800 leading-tight">{s.title}</div>
              <div className="flex flex-wrap gap-2 mt-1 text-[11px]">
                <span className="bg-white/70 border border-slate-300 rounded-full px-2 py-0.5 text-slate-600">⏱ {s.time}</span>
                <span className="bg-white/70 border border-slate-300 rounded-full px-2 py-0.5 text-slate-600">🖥 {s.screen}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 pl-11">
            {s.lines.map((line, i) => (
              <p key={i} className="text-gray-700 leading-relaxed bg-white/60 rounded-lg px-3 py-2 border border-white/80">{line}</p>
            ))}
          </div>
        </div>
      ))}

      {/* クロージング */}
      <div className="border border-purple-300 bg-purple-50 rounded-xl p-4">
        <div className="flex items-start gap-3 mb-2">
          <span className="w-8 h-8 rounded-full bg-white border border-purple-300 text-purple-700 font-bold flex items-center justify-center flex-shrink-0 shadow-sm">9</span>
          <div>
            <div className="font-bold text-gray-800 leading-tight">クロージング —— 評価軸との対応とまとめ</div>
            <div className="flex flex-wrap gap-2 mt-1 text-[11px]">
              <span className="bg-white/70 border border-slate-300 rounded-full px-2 py-0.5 text-slate-600">⏱ 約1分</span>
              <span className="bg-white/70 border border-slate-300 rounded-full px-2 py-0.5 text-slate-600">🖥 評価ポイント スライド</span>
            </div>
          </div>
        </div>
        <div className="pl-11 space-y-2">
          <p className="text-gray-700 leading-relaxed bg-white/60 rounded-lg px-3 py-2 border border-white/80">最後に、本構成がなぜ調達の評価軸に適合するかをまとめます。</p>
          <div className="space-y-1.5">
            {evalPoints.map((e) => (
              <div key={e.k} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2 border border-purple-100">
                <span className="text-purple-600 font-bold flex-shrink-0">✓</span>
                <div><span className="font-bold text-purple-800">{e.k}：</span><span className="text-gray-700">{e.v}</span></div>
              </div>
            ))}
          </div>
          <p className="text-gray-700 leading-relaxed bg-white/60 rounded-lg px-3 py-2 border border-white/80">
            以上が、私たちがこの構成を選んだ理由です。『正確さ・安全性・中立性・引継ぎ』を同時に満たす最も合理的な選択として、Snowflakeを基盤としたRAG構成をご提案します。
          </p>
        </div>
      </div>

      {/* 短縮版ガイド */}
      <div className="bg-slate-800 text-white rounded-xl p-4">
        <div className="font-bold mb-1.5">⏩ 短縮版（5分）にする場合の優先順位</div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {["0 オープニング", "1 RAGの理由", "2 Snowflake完結", "6 整合性チェック再利用", "9 クロージング"].map((t, i, arr) => (
            <Fragment key={t}>
              <span className="bg-white/15 border border-white/25 rounded-full px-2.5 py-1">{t}</span>
              {i < arr.length - 1 && <span className="text-slate-400 font-bold">›</span>}
            </Fragment>
          ))}
        </div>
        <p className="text-slate-300 text-[11px] mt-2">※ セクション 3・4・5・7・8 は時間に応じて省略・要約してください。</p>
      </div>
    </div>
  );
}

function DevDetail() {
  const code = "bg-gray-900 text-green-300 rounded-lg p-3 font-mono text-[11px] leading-relaxed overflow-auto whitespace-pre";
  return (
    <div className="mt-2 border-t-2 border-dashed border-slate-200 pt-5 space-y-6 text-sm">
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl p-5">
        <h3 className="font-bold text-base mb-1.5">🛠️ 開発者向け詳細設計（Snowflake RAG 実装）</h3>
        <p className="text-slate-200 leading-relaxed text-xs">
          「文書・画像をどう持つか」「検索しやすくするには」「トークンをどう減らすか」「どんなテーブルが要るか」を実装レベルで整理します。
          本案件は <span className="font-semibold text-white">Cortex Search（マネージド・ハイブリッド検索）＋ AI_PARSE_DOCUMENT（文書解析）＋ Cortex COMPLETE（生成）</span> を中核とし、すべて Snowflake 内で完結させます。
        </p>
      </div>

      {/* D1. オブジェクト構成 */}
      <section className="space-y-2">
        <h4 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-slate-700 text-white rounded px-2 py-0.5 text-xs">D1</span>Snowflake オブジェクト構成（全体マップ）</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <pre className={code}>{`DATABASE  TOCHO_BOUSAI
├─ SCHEMA RAW          -- 取込・解析の中間
│   ├─ STAGE  DOCS_STAGE        (内部Stage / Directory有効 / SSE暗号化)
│   └─ TABLE  DOC_RAW           (解析済みテキスト/Markdown)
├─ SCHEMA RAG          -- 検索・知識ベース
│   ├─ TABLE  DOCUMENTS         (文書マスタ + FILE型)
│   ├─ TABLE  DOCUMENT_CHUNKS   (チャンク本文 + メタデータ)
│   ├─ TABLE  DOC_SUMMARIES     (要約: トークン削減用)
│   └─ CORTEX SEARCH SERVICE  DOC_SEARCH   (chunk_text を索引)
├─ SCHEMA APP          -- アプリ運用
│   ├─ TABLE  CHAT_SESSIONS
│   ├─ TABLE  CHAT_MESSAGES     (引用・トークン記録)
│   └─ TABLE  DOC_VERSIONS      (版管理・引継ぎ)
└─ WAREHOUSE  SEARCH_WH (XS)    -- 取込/索引更新用
   ROLE  TOCHO_ADMIN / EDITOR / VIEWER  (RBAC 3ロール)`}</pre>
          <div className="space-y-2 text-xs">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <div className="font-semibold text-slate-700 mb-1">設計方針</div>
              <ul className="space-y-1 text-gray-700">
                <li className="flex gap-1.5"><span className="text-slate-400 flex-shrink-0">▸</span><span>取込（RAW）/ 知識ベース（RAG）/ 運用（APP）を <span className="font-semibold">スキーマで分離</span>し、権限とライフサイクルを独立管理</span></li>
                <li className="flex gap-1.5"><span className="text-slate-400 flex-shrink-0">▸</span><span>生成（Cortex COMPLETE）は <span className="font-semibold">サーバーレス</span>でウェアハウス不要。WH は取込・索引更新だけに使い、コストを最小化</span></li>
                <li className="flex gap-1.5"><span className="text-slate-400 flex-shrink-0">▸</span><span>すべて <span className="font-semibold">IaC（Snowflake CLI / Terraform）</span>でコード管理し、他事業者引継ぎに対応</span></li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-gray-700">
              <span className="font-semibold text-amber-800">制限の把握:</span> 1 検索サービス最大 <span className="font-mono">1 億チャンク</span>／1 クエリ最大 <span className="font-mono">500 件</span>取得。文書規模に対し十分だが、doc_type 別にサービス分割する設計余地も確保。
            </div>
          </div>
        </div>
      </section>

      {/* D2. 文書・画像の持ち方 */}
      <section className="space-y-2">
        <h4 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-blue-700 text-white rounded px-2 py-0.5 text-xs">D2</span>文書・画像の持ち方（Stage / FILE型 / マルチモーダル）</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="font-semibold text-blue-800 mb-1">📦 実体（バイナリ）= 内部 Stage に保持</div>
              <ul className="space-y-1 text-gray-700">
                <li className="flex gap-1.5"><span className="text-blue-400 flex-shrink-0">▸</span><span>PDF / docx / xlsx / 画像 を <span className="font-semibold">Stage にそのまま格納</span>。Directory Table でファイル一覧・メタを SQL 参照</span></li>
                <li className="flex gap-1.5"><span className="text-blue-400 flex-shrink-0">▸</span><span><span className="font-mono">FILE</span> 型カラムに参照を持たせ、マルチモーダル関数へ直接渡す（<span className="font-mono">TO_FILE</span>）</span></li>
                <li className="flex gap-1.5"><span className="text-blue-400 flex-shrink-0">▸</span><span>画面表示は <span className="font-mono">GET_PRESIGNED_URL</span> / <span className="font-mono">BUILD_SCOPED_FILE_URL</span> で一時URLを払い出し</span></li>
              </ul>
            </div>
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
              <div className="font-semibold text-teal-800 mb-1">🖼️ 図表・画像の扱い</div>
              <ul className="space-y-1 text-gray-700">
                <li className="flex gap-1.5"><span className="text-teal-500 flex-shrink-0">▸</span><span><span className="font-semibold">テキスト検索の対象は本文のみ</span>。図は「図N: キャプション＋AI要約」をチャンクに含めて検索可能化（画像自体は索引しない）</span></li>
                <li className="flex gap-1.5"><span className="text-teal-500 flex-shrink-0">▸</span><span><span className="font-mono">AI_PARSE_DOCUMENT</span> の <span className="font-mono">extract_images=true</span>（LAYOUTモード）で埋め込み画像を抽出（最大50枚/文書）</span></li>
                <li className="flex gap-1.5"><span className="text-teal-500 flex-shrink-0">▸</span><span>図の理解が必要な質問は <span className="font-semibold">マルチモーダル AI_COMPLETE</span> に画像を渡して解釈</span></li>
                <li className="flex gap-1.5"><span className="text-teal-500 flex-shrink-0">▸</span><span>スキャンPDFは <span className="font-mono">mode=OCR</span> で文字認識</span></li>
              </ul>
            </div>
          </div>
          <pre className={code}>{`-- Stage（Directory Table 有効・暗号化）
CREATE STAGE RAG.DOCS_STAGE
  DIRECTORY = (ENABLE = TRUE)
  ENCRYPTION = (TYPE = 'SNOWFLAKE_SSE');

-- ファイル一覧を SQL で参照
SELECT relative_path, size, last_modified
FROM DIRECTORY(@RAG.DOCS_STAGE);

-- 図を含む文書をマルチモーダルで解釈
SELECT AI_COMPLETE(
  'claude-3-5-sonnet',
  'この図の浸水想定エリアを要約して',
  TO_FILE('@RAG.DOCS_STAGE', 'maps/hazard_p12.png')
) AS image_summary;

-- 画面表示用の一時URL
SELECT GET_PRESIGNED_URL(@RAG.DOCS_STAGE, 'plans/plan_v4.pdf', 3600);`}</pre>
        </div>
      </section>

      {/* D3. テーブル設計 DDL */}
      <section className="space-y-2">
        <h4 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-violet-700 text-white rounded px-2 py-0.5 text-xs">D3</span>必要なテーブル設計（DDL）</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <pre className={code}>{`-- 文書マスタ
CREATE TABLE RAG.DOCUMENTS (
  doc_id      STRING DEFAULT UUID_STRING(),
  doc_name    STRING,            -- ファイル名
  doc_type    STRING,            -- 計画書/ハザード/シナリオ/手順書
  stage_path  STRING,            -- @DOCS_STAGE/plans/xxx.pdf
  doc_file    FILE,              -- マルチモーダル参照
  page_count  NUMBER,
  version     STRING,            -- v1.2
  status      STRING,            -- active/archived
  uploaded_by STRING,
  uploaded_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (doc_id)
);

-- チャンク（検索の中心テーブル）
CREATE TABLE RAG.DOCUMENT_CHUNKS (
  chunk_id     STRING DEFAULT UUID_STRING(),
  doc_id       STRING,
  doc_name     STRING,
  doc_type     STRING,           -- ← 検索フィルタ用
  page_no      NUMBER,           -- ← 引用表示用
  heading_path STRING,           -- 第3章>3.2 参集基準（文脈）
  chunk_index  NUMBER,
  chunk_text   TEXT,             -- ← 索引対象
  token_est    NUMBER,           -- 概算トークン
  has_image    BOOLEAN,
  image_path   STRING,           -- 関連図のStageパス
  PRIMARY KEY (chunk_id)
);`}</pre>
          <pre className={code}>{`-- 要約（粗検索・トークン削減用）
CREATE TABLE RAG.DOC_SUMMARIES (
  doc_id  STRING, section STRING,
  summary TEXT,        -- AI_SUMMARIZE_AGG で生成
  PRIMARY KEY (doc_id, section)
);

-- チャット履歴（マルチターン）
CREATE TABLE APP.CHAT_SESSIONS (
  session_id STRING DEFAULT UUID_STRING(),
  user_id STRING, role STRING,      -- admin/editor/viewer
  feature STRING,                   -- chat/consistency/scenario
  started_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);
CREATE TABLE APP.CHAT_MESSAGES (
  message_id STRING DEFAULT UUID_STRING(),
  session_id STRING, turn_no NUMBER,
  msg_role STRING,                  -- user/assistant/system
  content  TEXT,
  citations VARIANT,                -- [{doc_name,page_no}]
  tokens_in NUMBER, tokens_out NUMBER,
  created_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);

-- 版管理（引継ぎ要件）
CREATE TABLE APP.DOC_VERSIONS (
  doc_id STRING, version STRING,
  diff_summary TEXT, edited_by STRING,
  edited_at TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
);`}</pre>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
          {[
            { t: "DOCUMENTS", d: "文書マスタ・版・FILE参照" },
            { t: "DOCUMENT_CHUNKS", d: "検索の中心。本文+メタ" },
            { t: "DOC_SUMMARIES", d: "要約で粗検索・節約" },
            { t: "CHAT_SESSIONS / MESSAGES", d: "会話履歴・引用・トークン記録" },
            { t: "DOC_VERSIONS", d: "改訂履歴・引継ぎ" },
            { t: "DOC_RAW", d: "解析直後の中間テキスト" },
            { t: "DOC_SEARCH (Service)", d: "Cortex Search 索引" },
            { t: "AUDIT (ACCESS_HISTORY)", d: "監査はACCOUNT_USAGE活用" },
          ].map((r) => (
            <div key={r.t} className="bg-violet-50 border border-violet-200 rounded p-2">
              <div className="font-mono font-semibold text-violet-800 break-all">{r.t}</div>
              <div className="text-gray-600 mt-0.5">{r.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* D4. パイプライン */}
      <section className="space-y-2">
        <h4 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-emerald-700 text-white rounded px-2 py-0.5 text-xs">D4</span>取り込み → 解析 → チャンク → 索引（実装SQL）</h4>
        <pre className={code}>{`-- ① アップロード（CLI / Snowsight / PUT）
PUT file://plan_v4.pdf @RAG.DOCS_STAGE/plans/ AUTO_COMPRESS=FALSE;

-- ② 解析（LAYOUTモード: 表・見出しをMarkdown化、ページ分割）
INSERT INTO RAG.DOC_RAW (relative_path, page_index, content)
SELECT d.relative_path, f.value:index::int, f.value:content::string
FROM DIRECTORY(@RAG.DOCS_STAGE) d,
LATERAL FLATTEN(
  AI_PARSE_DOCUMENT(@RAG.DOCS_STAGE, d.relative_path,
    {'mode':'LAYOUT','page_split':true}):pages
) f;

-- ③ チャンク分割（Markdown境界・512トークン・15%重複）
INSERT INTO RAG.DOCUMENT_CHUNKS
  (doc_id, doc_name, doc_type, page_no, chunk_index, chunk_text)
SELECT r.doc_id, r.doc_name, r.doc_type, r.page_index, c.index,
       r.heading_path || ' | ' || c.value::string   -- 見出しを前置し文脈補強
FROM RAG.DOC_RAW r,
LATERAL FLATTEN(
  SNOWFLAKE.CORTEX.SPLIT_TEXT_RECURSIVE_CHARACTER(
    r.content, 'markdown', 512, 75)   -- ≤512 token 推奨
) c;

-- ④ Cortex Search Service（属性でフィルタ可能に）
CREATE CORTEX SEARCH SERVICE RAG.DOC_SEARCH
  ON chunk_text
  ATTRIBUTES doc_name, doc_type, page_no, heading_path
  WAREHOUSE = SEARCH_WH
  TARGET_LAG = '1 hour'         -- 文書更新の反映頻度
AS SELECT chunk_text, doc_name, doc_type, page_no, heading_path
   FROM RAG.DOCUMENT_CHUNKS;

-- ⑤ 検索（doc_type で母集団を絞り、TOP-K=5）
SELECT PARSE_JSON(SNOWFLAKE.CORTEX.SEARCH_PREVIEW('RAG.DOC_SEARCH',
  '{"query":"参集基準は震度いくつ？",
    "columns":["chunk_text","doc_name","page_no"],
    "filter":{"@eq":{"doc_type":"計画書"}},
    "limit":5}')):results;`}</pre>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-gray-700">
          <span className="font-semibold text-emerald-800">自動化:</span> Stream（差分検知）＋ Task（定期実行）で「Stage への追加 → 解析 → チャンク → 索引更新」を無人化。TARGET_LAG で鮮度を保証。
        </div>
      </section>

      {/* D5. 検索しやすくする */}
      <section className="space-y-2">
        <h4 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-indigo-700 text-white rounded px-2 py-0.5 text-xs">D5</span>検索しやすくする工夫（精度向上）</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {[
            { t: "ハイブリッド検索（標準装備）", b: "Cortex Search は ベクトル＋キーワード＋セマンティック再ランク を内部で実行。表記ゆれ・同義にも強く、チューニング不要で高品質。" },
            { t: "属性フィルタで母集団を絞る", b: "doc_type / heading_path 等を ATTRIBUTES に指定し、@eq・@contains で検索範囲を限定。ノイズ減＋トークン減＋高速化。" },
            { t: "見出しをチャンクに前置", b: "「第3章>3.2 参集基準 | 本文…」のように heading_path を本文頭に付け、短いチャンクでも文脈が通るようにする。" },
            { t: "略語・同義語の正規化", b: "「参集=招集」等の辞書をチャンクに併記、または前処理で正規化し、検索ヒット率を底上げ。" },
            { t: "マルチインデックス / サービス分割", b: "doc_type 別にサービスを分けるか、複数列を持つマルチインデックス検索で対象を明確化（2026 GA）。" },
            { t: "重複・極小チャンクの除去", b: "50トークン未満は前チャンクへ結合、重複は除去。索引の質とコスト効率を両立。" },
          ].map((c) => (
            <div key={c.t} className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
              <div className="font-bold text-indigo-800 mb-0.5">{c.t}</div>
              <div className="text-gray-700 leading-relaxed">{c.b}</div>
            </div>
          ))}
        </div>
      </section>

      {/* D6. トークン削減 */}
      <section className="space-y-2">
        <h4 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-rose-700 text-white rounded px-2 py-0.5 text-xs">D6</span>トークン数を減らす工夫（コスト・速度）</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 text-xs">
            {[
              { t: "チャンクは ≤512 トークン", b: "Snowflake 推奨。大きすぎる塊を渡さず、必要箇所だけを精密に取得。" },
              { t: "TOP-K を 3〜5 に制限", b: "取得件数を絞れば LLM へ渡す文脈量が直接減る。再現率を見ながら最小化。" },
              { t: "二段検索（要約→本文）", b: "まず DOC_SUMMARIES で当たりを付け、関連文書の本文チャンクだけを精密取得。" },
              { t: "メタフィルタで母集団縮小", b: "doc_type / 期間で先に絞れば、無関係チャンクをそもそも渡さない。" },
            ].map((c) => (
              <div key={c.t} className="bg-rose-50 border border-rose-200 rounded-lg p-2.5">
                <div className="font-bold text-rose-800">{c.t}</div>
                <div className="text-gray-700 mt-0.5">{c.b}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-xs">
            {[
              { t: "会話履歴のスライディング窓", b: "直近 N ターンのみ保持。古い履歴は AI_SUMMARIZE_AGG で1行に圧縮して持つ。" },
              { t: "出力 max_tokens を制限", b: "回答長を用途に応じ上限設定。冗長な生成を防ぎ出力トークンを節約。" },
              { t: "system prompt を簡潔・定型化", b: "固定指示はテンプレ化し最小限に。毎回送る固定コストを削減。" },
              { t: "必要列のみ取得", b: "検索結果は chunk_text＋最小メタのみ取得し、余計な列を文脈に入れない。" },
            ].map((c) => (
              <div key={c.t} className="bg-rose-50 border border-rose-200 rounded-lg p-2.5">
                <div className="font-bold text-rose-800">{c.t}</div>
                <div className="text-gray-700 mt-0.5">{c.b}</div>
              </div>
            ))}
          </div>
        </div>
        <pre className={code}>{`-- 古い会話の圧縮（履歴トークン削減）
SELECT AI_SUMMARIZE_AGG(content) AS history_summary
FROM APP.CHAT_MESSAGES
WHERE session_id = :sid AND turn_no < :recent_window;

-- 出力長の制御（max_tokens）
SELECT AI_COMPLETE('claude-3-5-sonnet', :prompt,
   {'max_tokens': 800, 'temperature': 0.2}) AS answer;`}</pre>
      </section>

      {/* D7. 運用・コスト */}
      <section className="space-y-2">
        <h4 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-teal-700 text-white rounded px-2 py-0.5 text-xs">D7</span>ウェアハウス / コスト / 運用</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {[
            { t: "ウェアハウス", b: "取込・索引更新は SEARCH_WH（XS〜S, AUTO_SUSPEND=60s）。生成はサーバーレスでWH不要。" },
            { t: "コスト監視", b: "ACCOUNT_USAGE.CORTEX_FUNCTIONS_USAGE_HISTORY・METERING_HISTORY で関数別トークン/クレジットを定期計測。" },
            { t: "鮮度 vs コスト", b: "TARGET_LAG を業務要件（例: 1時間）に合わせ、索引再構築頻度とコストを調整。" },
          ].map((c) => (
            <div key={c.t} className="bg-teal-50 border border-teal-200 rounded-lg p-3">
              <div className="font-bold text-teal-800 mb-0.5">{c.t}</div>
              <div className="text-gray-700 leading-relaxed">{c.b}</div>
            </div>
          ))}
        </div>
      </section>

      {/* D8. 開発チェックリスト */}
      <section className="space-y-2">
        <h4 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-slate-700 text-white rounded px-2 py-0.5 text-xs">D8</span>開発タスク チェックリスト</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
          {[
            "DB / Schema / Role(3) / Warehouse を IaC で作成",
            "内部 Stage（Directory有効・SSE暗号化）を作成",
            "AI_PARSE_DOCUMENT で解析パイプライン（LAYOUT/OCR/画像抽出）",
            "SPLIT_TEXT_RECURSIVE_CHARACTER でチャンク化（≤512tok）",
            "DOCUMENTS / DOCUMENT_CHUNKS / SUMMARIES テーブル構築",
            "Cortex Search Service を ATTRIBUTES 付きで作成",
            "Stream + Task で取込〜索引更新を自動化",
            "Next.js BFF（/api/chat・/consistency・/scenario）実装",
            "ストリーミング（SSE）・引用ジャンプ・履歴管理",
            "RBAC + Network Policy + 学習オプトアウト + 暗号化",
            "監査（ACCESS_HISTORY / QUERY_HISTORY）整備",
            "評価: 精度・再現率・トークン/コストを計測する仕組み",
          ].map((t) => (
            <div key={t} className="flex items-start gap-1.5 text-gray-700">
              <span className="text-emerald-600 font-bold flex-shrink-0 mt-0.5">☑</span>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* D9. 参考ドキュメント */}
      <section className="space-y-2">
        <h4 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-blue-700 text-white rounded px-2 py-0.5 text-xs">D9</span>参考ドキュメント（Snowflake における RAG 構築）</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {[
            { t: "Cortex Search 概要（RAG エンジン）", u: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/cortex-search-overview" },
            { t: "Cortex Search で RAG チャットを作る チュートリアル", u: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-search/tutorials/cortex-search-tutorial-3-chat-advanced" },
            { t: "AI_PARSE_DOCUMENT（文書解析・画像抽出）ガイド", u: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/parse-document" },
            { t: "AI_PARSE_DOCUMENT 関数リファレンス", u: "https://docs.snowflake.com/en/sql-reference/functions/ai_parse_document" },
            { t: "SPLIT_TEXT_RECURSIVE_CHARACTER（チャンク分割）", u: "https://docs.snowflake.com/sql-reference/functions/split_text_recursive_character-snowflake-cortex" },
            { t: "Cortex AI Functions: Documents（文書処理関数群）", u: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/ai-documents" },
            { t: "Cortex LLM Functions（COMPLETE / モデル一覧）", u: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/llm-functions" },
            { t: "AISQL（AI_COMPLETE マルチモーダル等）", u: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/aisql" },
            { t: "ベクトル埋め込み / 類似度検索", u: "https://docs.snowflake.com/en/user-guide/snowflake-cortex/vector-embeddings" },
            { t: "Directory Tables（Stage 上の非構造化データ）", u: "https://docs.snowflake.com/en/user-guide/data-load-dirtables" },
          ].map((d) => (
            <a key={d.u} href={d.u} target="_blank" rel="noreferrer" className="flex items-start gap-1.5 bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-2 hover:bg-blue-100 transition">
              <span className="text-blue-500 flex-shrink-0">🔗</span>
              <span className="text-blue-800 font-medium underline decoration-blue-300 break-all">{d.t}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function Rag({ onDocOpen }: { onDocOpen: (file: string) => void }) {
  return (
    <div className="space-y-8 text-sm">
      {/* イントロ */}
      <div className="bg-gradient-to-r from-indigo-50 to-teal-50 border border-indigo-200 rounded-xl p-5">
        <h3 className="font-bold text-indigo-900 text-base mb-1.5">🧠 本案件の RAG 構成（データ保存 → チャンク → 検索 → 生成 → 画面表示）</h3>
        <p className="text-gray-700 leading-relaxed">
          AI 機能群（チャットボット・整合性チェック・シナリオ生成）の中核は RAG（Retrieval-Augmented Generation）です。
          Snowflake には RAG を構築する方法が複数あり、本案件では <span className="font-semibold text-indigo-800">Cortex Search（検索）＋ Cortex COMPLETE（生成）のマネージド構成</span> を採用します。
          以下では、Snowflake での RAG 構築方法の選択肢を整理したうえで、今回の開発における
          <span className="font-semibold">データの保存・チャンク処理・フロントエンド（Next.js / ArcGIS）との接続</span> まで一気通貫で示します。
        </p>
        {/* 全体パイプライン */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { t: "① 文書格納", c: "bg-blue-100 text-blue-800 border-blue-300" },
            { t: "② テキスト化（PARSE_DOCUMENT 等）", c: "bg-teal-100 text-teal-800 border-teal-300" },
            { t: "③ チャンク分割＋メタデータ", c: "bg-violet-100 text-violet-800 border-violet-300" },
            { t: "④ Cortex Search（検索）", c: "bg-emerald-100 text-emerald-800 border-emerald-300" },
            { t: "⑤ Cortex COMPLETE（生成）", c: "bg-indigo-100 text-indigo-800 border-indigo-300" },
            { t: "⑥ Next.js / ArcGIS で表示", c: "bg-orange-100 text-orange-800 border-orange-300" },
          ].map((s, i, arr) => (
            <Fragment key={s.t}>
              <span className={`border rounded-full px-2.5 py-1 font-semibold ${s.c}`}>{s.t}</span>
              {i < arr.length - 1 && <span className="text-gray-400 font-bold">›</span>}
            </Fragment>
          ))}
        </div>
      </div>

      {/* ★ データフロー全体図 */}
      <section className="space-y-3">
        <h3 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-indigo-700 text-white rounded px-2 py-0.5 text-xs">図</span>RAG データフロー全体図（事前処理 → 実行時）</h3>
        <p className="text-gray-600 text-xs">文書を「いつ・どこで・どう処理して」検索・回答に至るのかを 2 つのパイプラインで示します。<span className="font-semibold">❄️ マークは Snowflake 内部で完結する処理</span>です（データを外に出しません）。</p>

        <div className="bg-white border-2 border-gray-300 rounded-xl p-4 space-y-5 overflow-x-auto">
          {/* 凡例 */}
          <div className="flex items-center gap-5 text-[11px] text-gray-500">
            <span className="flex items-center gap-1.5"><span className="inline-block w-6 border-t-2 border-gray-500" />処理の流れ</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-6 border-t-2 border-dashed border-violet-400" />事前処理（文書追加時のバッチ）</span>
            <span className="flex items-center gap-1.5"><span className="text-[12px]">❄️</span>Snowflake 内で完結</span>
          </div>

          {/* レーン①: 事前処理（インジェスト） */}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-violet-600 text-white text-[11px] font-bold rounded-md px-2.5 py-1 mb-2">① 事前処理（インジェスト）<span className="font-normal text-violet-100">／ 文書を「検索できる状態」にする</span></div>
            <div className="border-2 border-dashed border-violet-300 bg-violet-50/40 rounded-lg p-3">
              <div className="flex items-stretch min-w-max">
                {[
                  { icon: "📄", bg: "bg-slate-500", title: "文書群", sub: "PDF / Word / Excel / 画像", snow: false, arrow: "取込（COPY INTO）" },
                  { icon: "🗄️", bg: "bg-blue-600", title: "Stage + Directory Table", sub: "バイナリのまま格納", snow: true, arrow: "抽出" },
                  { icon: "📃", bg: "bg-teal-600", title: "テキスト化", sub: "PARSE_DOCUMENT / UDF / OCR", snow: true, arrow: "分割" },
                  { icon: "🧩", bg: "bg-violet-600", title: "チャンク + メタデータ", sub: "SPLIT_TEXT_RECURSIVE", snow: true, arrow: "自動索引化" },
                  { icon: "🔎", bg: "bg-emerald-600", title: "Cortex Search Service", sub: "埋め込み＆ハイブリッド索引", snow: true, arrow: null },
                ].map((n, i, arr) => (
                  <Fragment key={n.title}>
                    <div className="w-36 flex-shrink-0 flex flex-col items-center text-center">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-xl ${n.bg} text-white text-2xl flex items-center justify-center shadow-sm`}>{n.icon}</div>
                        {n.snow && <span className="absolute -top-1.5 -right-1.5 text-[12px] bg-white rounded-full shadow border border-sky-200 leading-none px-0.5">❄️</span>}
                      </div>
                      <div className="text-[12px] font-bold text-gray-800 leading-tight mt-1.5">{n.title}</div>
                      <div className="text-[10px] text-gray-500 leading-snug mt-0.5">{n.sub}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex flex-col items-center justify-start pt-4 w-16 flex-shrink-0">
                        <span className="text-[9px] text-violet-600 font-semibold leading-tight text-center mb-0.5">{n.arrow}</span>
                        <span className="text-violet-400 text-xl leading-none">→</span>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* レーン②: 実行時（クエリ） */}
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-[11px] font-bold rounded-md px-2.5 py-1 mb-2">② 実行時（クエリ）<span className="font-normal text-blue-100">／ 質問に根拠付きで回答する</span></div>
            <div className="border-2 border-blue-200 bg-blue-50/40 rounded-lg p-3">
              <div className="flex items-stretch min-w-max">
                {[
                  { icon: "👤", bg: "bg-slate-600", title: "ブラウザ", sub: "質問入力（チャット / 整合 / シナリオ）", snow: false, arrow: "HTTPS" },
                  { icon: "🟧", bg: "bg-orange-500", title: "Next.js API（BFF）", sub: "認証・RBAC・サニタイズ / SPCS", snow: false, arrow: "① 検索" },
                  { icon: "🔎", bg: "bg-emerald-600", title: "Cortex Search", sub: "関連チャンク TOP-K=5 取得", snow: true, arrow: "② 文脈付与" },
                  { icon: "📝", bg: "bg-green-600", title: "プロンプト組立", sub: "システム+履歴+チャンク+質問", snow: true, arrow: "③ 生成" },
                  { icon: "🧠", bg: "bg-indigo-600", title: "Cortex COMPLETE", sub: "LLM 生成（ストリーミング）", snow: true, arrow: "④ 回答+引用" },
                  { icon: "💬", bg: "bg-sky-600", title: "回答表示 + 🗺️ 地図", sub: "引用付き回答 / ArcGIS プロット", snow: false, arrow: null },
                ].map((n, i, arr) => (
                  <Fragment key={n.title}>
                    <div className="w-36 flex-shrink-0 flex flex-col items-center text-center">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-xl ${n.bg} text-white text-2xl flex items-center justify-center shadow-sm`}>{n.icon}</div>
                        {n.snow && <span className="absolute -top-1.5 -right-1.5 text-[12px] bg-white rounded-full shadow border border-sky-200 leading-none px-0.5">❄️</span>}
                      </div>
                      <div className="text-[12px] font-bold text-gray-800 leading-tight mt-1.5">{n.title}</div>
                      <div className="text-[10px] text-gray-500 leading-snug mt-0.5">{n.sub}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex flex-col items-center justify-start pt-4 w-16 flex-shrink-0">
                        <span className="text-[9px] text-blue-600 font-semibold leading-tight text-center mb-0.5">{n.arrow}</span>
                        <span className="text-blue-400 text-xl leading-none">→</span>
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* つながり注記 */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <span className="text-violet-500 font-bold">↑</span>
            <span><span className="font-semibold text-violet-700">①で構築した Cortex Search の索引</span>を、<span className="font-semibold text-blue-700">②の検索ステップ</span>がそのまま利用します（文書追加時のみ①を再実行）。</span>
          </div>
        </div>
      </section>

      {/* 0. Snowflake での RAG 構築方法の選択肢 */}
      <section className="space-y-3">
        <h3 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-gray-800 text-white rounded px-2 py-0.5 text-xs">A</span>Snowflake での RAG 構築方法（選択肢）</h3>
        <p className="text-gray-600 text-xs">Snowflake では大きく以下の方式で RAG を構築できます。本案件では運用負荷と中立性（標準 SQL・特定製品非依存）を重視し、<span className="font-semibold text-emerald-700">方式①（Cortex Search マネージド）</span> を採用します。</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              tag: "採用", tagColor: "bg-emerald-600",
              border: "border-emerald-300 bg-emerald-50",
              title: "① Cortex Search（マネージド検索）",
              body: "埋め込み生成・インデックス・ハイブリッド検索（ベクトル＋キーワード）を Snowflake が自動管理。チャンク列を指定して CREATE CORTEX SEARCH SERVICE するだけ。運用が最も軽い。",
              fn: "CORTEX SEARCH SERVICE / SEARCH_PREVIEW()",
            },
            {
              tag: "代替", tagColor: "bg-slate-500",
              border: "border-slate-200 bg-slate-50",
              title: "② 手動ベクトル検索",
              body: "EMBED_TEXT_1024 で埋め込みを生成し VECTOR 型カラムに保存。VECTOR_COSINE_SIMILARITY で類似検索を自前実装。検索ロジックを細かく制御したい場合に選択。",
              fn: "EMBED_TEXT_1024 / VECTOR_COSINE_SIMILARITY",
            },
            {
              tag: "生成", tagColor: "bg-indigo-600",
              border: "border-indigo-200 bg-indigo-50",
              title: "③ Cortex COMPLETE / AISQL",
              body: "検索で取得したチャンクをコンテキストとして LLM に渡し回答を生成。モデル名を変えるだけで LLM 切替が可能（中立性要件に合致）。",
              fn: "COMPLETE() / AI_COMPLETE() / AI_CLASSIFY()",
            },
          ].map((m) => (
            <div key={m.title} className={`border rounded-lg p-3 ${m.border}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`${m.tagColor} text-white text-[10px] font-bold rounded px-1.5 py-0.5`}>{m.tag}</span>
                <span className="font-bold text-gray-800 text-[13px]">{m.title}</span>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">{m.body}</p>
              <div className="mt-1.5 font-mono text-[10.5px] text-gray-500 bg-white border border-gray-200 rounded px-1.5 py-1">{m.fn}</div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-gray-700">
          <span className="font-semibold text-blue-800">補助関数:</span> 文書のテキスト抽出に <span className="font-mono">PARSE_DOCUMENT()</span>、チャンク分割に <span className="font-mono">SPLIT_TEXT_RECURSIVE_CHARACTER()</span> を利用。いずれも Snowflake 内で完結し、外部サービスにデータを出さずに前処理できます。
        </div>
      </section>

      {/* 1. データ保存（ナレッジ格納） */}
      <section className="space-y-3">
        <h3 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-teal-700 text-white rounded px-2 py-0.5 text-xs">B</span>データの保存（ナレッジ格納）</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="font-semibold text-gray-700">📂 Snowflake 取り込み対応形式</div>
            <div>
              <div className="text-xs font-semibold text-blue-700 mb-0.5">① 構造化・半構造化（COPY INTO でネイティブ取込み）</div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1.5 flex flex-wrap gap-1.5 text-gray-700 text-xs">
                {["CSV / TSV", "JSON", "Parquet", "Avro", "ORC", "XML"].map((f) => (
                  <span key={f} className="bg-white border border-blue-200 rounded px-2 py-0.5 font-mono font-semibold text-blue-800">{f}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-700 mb-0.5">② 非構造化（Stage + Directory Table に格納）</div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 flex flex-wrap gap-1.5 text-gray-700 text-xs">
                {["PDF", "Word (.docx)", "Excel (.xlsx)", "PowerPoint (.pptx)", "画像 (PNG/JPEG/TIFF)", "テキスト / CSV", "HTML", "任意のバイナリ"].map((f) => (
                  <span key={f} className="bg-white border border-slate-300 rounded px-2 py-0.5 font-semibold text-slate-700">{f}</span>
                ))}
              </div>
              <div className="text-gray-500 mt-0.5 text-[11px]">※ Stage はバイナリをそのまま保持。読み取り・解析は後続処理で行う</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-teal-700 mb-0.5">③ Cortex Search（RAG）用テキスト化</div>
              <div className="bg-teal-50 border border-teal-200 rounded-lg px-2.5 py-1.5 space-y-1 text-gray-700 text-xs">
                <div className="flex gap-1.5 items-start"><span className="text-teal-600 font-bold flex-shrink-0">✓</span><span><span className="font-semibold">PDF / DOCX</span> — PARSE_DOCUMENT でネイティブ抽出（追加実装不要）</span></div>
                <div className="flex gap-1.5 items-start"><span className="text-teal-600 font-bold flex-shrink-0">✓</span><span><span className="font-semibold">XLSX / PPTX / HTML 等</span> — Snowpark Python UDF（openpyxl・python-pptx 等）でテキスト化</span></div>
                <div className="flex gap-1.5 items-start"><span className="text-teal-600 font-bold flex-shrink-0">✓</span><span><span className="font-semibold">画像・スキャン PDF</span> — Snowflake Multimodal または pytesseract（OCR）で文字認識</span></div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-gray-700">🔒 セキュリティ設計</div>
            {[
              { color: "bg-indigo-50 border-indigo-200", title: "3 ロール RBAC", body: "管理者（全操作）/ 担当者（チャット・編集）/ 閲覧者（チャットのみ）。Snowflake GRANT で最小権限を強制。" },
              { color: "bg-blue-50 border-blue-200", title: "IP アクセス制限", body: "Network Policy で東京都庁内ネットワーク（固定 IP）からのみ接続を許可。" },
              { color: "bg-green-50 border-green-200", title: "学習利用不可設定", body: "アップロードした文書が Snowflake のモデル学習に使われない設定（オプトアウト）。" },
              { color: "bg-purple-50 border-purple-200", title: "国内リージョン + 暗号化", body: "Tokyo リージョンで稼働。保存は AES-256、転送は TLS 1.3 で保護。" },
              { color: "bg-amber-50 border-amber-200", title: "監査ログ", body: "QUERY_HISTORY・ACCESS_HISTORY で全クエリ・ファイルアクセスを記録。" },
            ].map((r) => (
              <div key={r.title} className={`border rounded-lg p-2 text-xs ${r.color}`}>
                <div className="font-semibold text-gray-800 mb-0.5">{r.title}</div>
                <div className="text-gray-700">{r.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. チャンク処理 */}
      <section className="space-y-3">
        <h3 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-violet-700 text-white rounded px-2 py-0.5 text-xs">C</span>チャンク処理（分割設計とメタデータ）</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="font-semibold text-gray-700">⚙️ チャンク基本パラメータ</div>
            <div className="bg-violet-50 border border-violet-200 rounded-lg p-3 space-y-2 text-xs">
              {[
                { param: "チャンクサイズ", val: "512 〜 1,024 tokens", note: "仕様書・計画書など長文は 1,024 tokens が最適" },
                { param: "オーバーラップ", val: "10 〜 20%（約 100 tokens）", note: "文境界での意味の分断を防ぎ前後文脈を保持" },
                { param: "分割境界", val: "章 > 節 > 段落 > 文", note: "見出し（##, 第X条）を優先的に境界とする" },
                { param: "最小チャンク", val: "50 tokens 以下は前へ結合", note: "短すぎるチャンクはノイズになるため除外" },
              ].map((r) => (
                <div key={r.param} className="flex gap-2">
                  <div className="w-24 font-semibold text-violet-800 flex-shrink-0">{r.param}</div>
                  <div><div className="font-medium text-gray-800">{r.val}</div><div className="text-gray-600 mt-0.5">{r.note}</div></div>
                </div>
              ))}
            </div>
            <div className="bg-gray-900 text-green-300 rounded-lg p-3 font-mono text-[11px] leading-relaxed">
              CREATE CORTEX SEARCH SERVICE chat_search<br />
              {"  "}ON chunk_text<br />
              {"  "}ATTRIBUTES doc_name, page_no, section<br />
              {"  "}WAREHOUSE = xs_wh<br />
              {"  "}TARGET_LAG = &apos;1 hour&apos;;
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-gray-700">🏷️ メタデータ設計（各チャンクに付与）</div>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {[
                { field: "doc_id", type: "VARCHAR", desc: "ファイル識別 UUID" },
                { field: "doc_name", type: "VARCHAR", desc: "元ファイル名" },
                { field: "doc_type", type: "ENUM", desc: "計画書 / ハザードマップ / シナリオ" },
                { field: "page_no", type: "INT", desc: "PDF ページ番号" },
                { field: "section", type: "VARCHAR", desc: "章・節タイトル" },
                { field: "uploaded_at", type: "TIMESTAMP", desc: "格納日時" },
                { field: "chunk_index", type: "INT", desc: "文書内チャンク連番" },
                { field: "chunk_text", type: "TEXT", desc: "チャンク本文（検索対象）" },
              ].map((r) => (
                <div key={r.field} className="bg-slate-50 border border-slate-200 rounded px-2 py-1.5">
                  <div className="font-mono font-semibold text-slate-800">{r.field}</div>
                  <div className="text-slate-500">{r.type}</div>
                  <div className="text-gray-600 mt-0.5">{r.desc}</div>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-xs text-gray-700">
              <span className="font-semibold text-amber-800">検索時のフィルタ活用:</span> doc_type = &apos;計画書&apos; AND section LIKE &apos;%参集%&apos; のようにメタデータで絞り込み、検索精度を向上
            </div>
          </div>
        </div>
      </section>

      {/* 3. 呼び出しフロー */}
      <section className="space-y-3">
        <h3 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-blue-700 text-white rounded px-2 py-0.5 text-xs">D</span>呼び出しフロー（Next.js → Snowflake）</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            {[
              { step: "1", color: "bg-blue-100 border-blue-300 text-blue-800", title: "ユーザー入力（ブラウザ）", body: "質問テキスト + マルチターン履歴（最大 10 回）+ session_id を送信" },
              { step: "2", color: "bg-orange-100 border-orange-300 text-orange-800", title: "Next.js API Route（/api/chat）", body: "server-side で snowflake-sdk を呼出し。JWT を安全に管理し、入力はサニタイズ後に渡す" },
              { step: "3", color: "bg-teal-100 border-teal-300 text-teal-800", title: "Cortex Search（Retrieval）", body: "SEARCH_PREVIEW() で関連チャンクを TOP-K=5 件取得。doc_type フィルタで範囲限定" },
              { step: "4", color: "bg-green-100 border-green-300 text-green-800", title: "プロンプト組み立て", body: "システムプロンプト + 取得チャンク + 会話履歴 + 質問を結合し 200K トークン枠内に収める" },
              { step: "5", color: "bg-indigo-100 border-indigo-300 text-indigo-800", title: "Cortex COMPLETE（LLM 生成）", body: "COMPLETE('claude-3-5-sonnet', messages) でストリーミング生成。モデル名変更のみで LLM 切替" },
              { step: "6", color: "bg-violet-100 border-violet-300 text-violet-800", title: "レスポンス返却", body: "回答 + 引用ソース（doc_name, page_no）を JSON で返却し、フロントでストリーミング表示" },
            ].map((s) => (
              <div key={s.step} className={`border rounded-lg px-3 py-1.5 flex gap-2 items-start text-xs ${s.color}`}>
                <span className="font-bold text-base leading-none flex-shrink-0">{s.step}</span>
                <div><div className="font-semibold">{s.title}</div><div className="text-gray-700 mt-0.5">{s.body}</div></div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="bg-gray-900 text-green-300 rounded-lg p-3 font-mono text-[11px] leading-relaxed overflow-auto">
              <div className="text-gray-400">// app/api/chat/route.ts</div>
              <div>{"const result = await snowflake.execute({"}</div>
              <div>{"  sqlText: `"}</div>
              <div>{"    SELECT SNOWFLAKE.CORTEX.COMPLETE("}</div>
              <div className="text-yellow-300">{"      'claude-3-5-sonnet',"}</div>
              <div>{"      ARRAY_CONSTRUCT("}</div>
              <div>{"        {'role':'system','content': :sys},"}</div>
              <div>{"        {'role':'user','content': :q}"}</div>
              <div>{"      )"}</div>
              <div>{"    ) AS answer`,"}</div>
              <div>{"  binds: [sysPrompt, userQuery]"}</div>
              <div>{"});"}</div>
            </div>
            {[
              { icon: "⚡", title: "ストリーミング対応", body: "ReadableStream + SSE で逐次表示し応答遅延を体感させない" },
              { icon: "🔐", title: "認証管理", body: "Snowflake 接続情報は SPCS シークレット（環境変数）で管理。クライアントに露出しない" },
              { icon: "🔁", title: "エラーハンドリング", body: "Cortex タイムアウト（30 秒）でリトライ 1 回 → 超過時はフォールバック" },
            ].map((n) => (
              <div key={n.title} className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 flex gap-2 text-xs">
                <span className="flex-shrink-0">{n.icon}</span>
                <div><span className="font-semibold text-blue-800">{n.title}:</span><span className="text-gray-700"> {n.body}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. フロントエンド接続（Next.js / ArcGIS）※補足 */}
      <section className="space-y-3">
        <h3 className="font-bold text-gray-800 flex items-center gap-2"><span className="bg-orange-600 text-white rounded px-2 py-0.5 text-xs">E</span>フロントエンド接続（Next.js / ArcGIS）<span className="text-[10px] font-semibold bg-orange-100 text-orange-700 rounded-full px-2 py-0.5">補足</span></h3>
        <p className="text-gray-600 text-xs">RAG の検索・生成結果を、利用者が使う画面（Next.js）と地図（ArcGIS）にどう接続するかを示します。Snowflake への接続は必ず Next.js のサーバー側（BFF）を経由し、クライアントに資格情報を出しません。</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Next.js 接続 */}
          <div className="border border-orange-200 bg-orange-50/60 rounded-lg p-3 space-y-2">
            <div className="font-semibold text-orange-800">🟧 Next.js（BFF / SPCS）との接続</div>
            <ul className="space-y-1.5 text-xs text-gray-700">
              <li className="flex gap-1.5"><span className="text-orange-500 font-bold flex-shrink-0">▸</span><span><span className="font-semibold">API Route が唯一の入口:</span> /api/chat・/api/consistency・/api/scenario など機能別にサーバー関数を用意し、snowflake-sdk をサーバー側でのみ実行</span></li>
              <li className="flex gap-1.5"><span className="text-orange-500 font-bold flex-shrink-0">▸</span><span><span className="font-semibold">ストリーミング表示:</span> Cortex の生成結果を SSE / ReadableStream でフロントに逐次転送し、チャット UI に流し込む</span></li>
              <li className="flex gap-1.5"><span className="text-orange-500 font-bold flex-shrink-0">▸</span><span><span className="font-semibold">引用の画面連携:</span> 回答に付く doc_name・page_no を使い、文書ビューア（仕様書タブ等）の該当ページへジャンプ</span></li>
              <li className="flex gap-1.5"><span className="text-orange-500 font-bold flex-shrink-0">▸</span><span><span className="font-semibold">SPCS でホスティング:</span> Next.js を Snowpark Container Services 上で稼働させ、Snowflake と同一境界内で完結（外部公開面を最小化）</span></li>
            </ul>
          </div>
          {/* ArcGIS 接続 */}
          <div className="border border-emerald-200 bg-emerald-50/60 rounded-lg p-3 space-y-2">
            <div className="font-semibold text-emerald-800">🟩 ArcGIS Maps SDK との接続</div>
            <ul className="space-y-1.5 text-xs text-gray-700">
              <li className="flex gap-1.5"><span className="text-emerald-500 font-bold flex-shrink-0">▸</span><span><span className="font-semibold">回答 → 地図プロット:</span> RAG 回答に含まれる地点・エリア（避難所・浸水域・参集拠点など）を GraphicsLayer / FeatureLayer に描画</span></li>
              <li className="flex gap-1.5"><span className="text-emerald-500 font-bold flex-shrink-0">▸</span><span><span className="font-semibold">条件 → レイヤー切替:</span> 被害予想シミュの条件（災害種別・規模・時刻）に応じてハザードマップ Feature Layer を動的に切替</span></li>
              <li className="flex gap-1.5"><span className="text-emerald-500 font-bold flex-shrink-0">▸</span><span><span className="font-semibold">空間 → 文脈付与:</span> 地図上の被害推計（震度・浸水域等）を要約し、RAG のプロンプトに地理コンテキストとして渡す</span></li>
              <li className="flex gap-1.5"><span className="text-emerald-500 font-bold flex-shrink-0">▸</span><span><span className="font-semibold">3D 可視化:</span> PLATEAU（CityGML）を 3D Scene View に取り込み、建物単位の被害イメージを提示</span></li>
            </ul>
          </div>
        </div>
        {/* フロント↔バックエンド データ連携（機能別） */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
          <div className="text-sm font-bold text-gray-800">フロント↔バックエンド データ連携（機能別）</div>
          <p className="text-[11px] text-gray-500">①②④ は Next.js BFF 経由で Snowflake。③ は Maps SDK が庁内 Enterprise へ REST③ 直接。④ は両方を 1 画面に統合します。</p>
          <FrontendConnectionDiagram />
        </div>
      </section>

      <DocLinks onDocOpen={onDocOpen} />
      <GlossarySection terms={["RAG（Retrieval-Augmented Generation）", "Cortex Search", "Cortex COMPLETE", "チャンク（Chunking）", "埋め込み（Embedding）", "PARSE_DOCUMENT", "Stage / Directory Table", "BFF（Backend for Frontend）", "ArcGIS Maps SDK for JavaScript", "GIS mart", "Feature Layer"]} />
    </div>
  );
}

const GLOSSARY: { term: string; en: string; category: string; body: string }[] = [
  {
    term: "ロックインリスク",
    en: "Vendor Lock-in Risk",
    category: "アーキテクチャ",
    body: "特定のベンダーやサービスへの依存度が高まり、他のサービスへの乗り換えが技術的・コスト的に困難になるリスク。本案件では Snowflake 固有の API（Cortex SQL 関数・Cortex Search）に依存するコードが多いほど、将来の移行コストが上昇する。LLM 呼び出しを薄い抽象レイヤーに集約し、環境変数でモデルを切り替えられるよう設計することで軽減できる。",
  },
  {
    term: "図上訓練",
    en: "Tabletop Exercise / Map Exercise",
    category: "防災",
    body: "実際に現場を動かさず、地図や資料を使って災害対応の手順・意思決定を机上でシミュレーションする訓練手法。東京都庁では首都直下地震を想定した図上訓練を定期実施しており、本システムはその訓練シナリオの自動生成・被害予想の可視化・計画書との整合性チェックを支援する。令和9年1月に実証予定。",
  },
  {
    term: "RAG（Retrieval-Augmented Generation）",
    en: "RAG",
    category: "AI",
    body: "LLM が回答を生成する際に、事前に関連文書をベクトル検索で取得し、その内容を文脈として付与する手法。ハルシネーション（でたらめな回答）を抑制し、「計画書の何ページに書いてある」といった根拠付き回答を実現する。本案件では Snowflake Cortex Search が RAG のベクトルストアを担う。pgvector や Elasticsearch も同様の役割を担えるが、Snowflake 外のインフラ管理が必要になる。",
  },
  {
    term: "SPCS（Snowpark Container Services）",
    en: "Snowpark Container Services",
    category: "Snowflake",
    body: "Snowflake 内でコンテナ（Docker イメージ）を実行できるマネージドサービス。Next.js アプリや Python ジョブを Snowflake のセキュリティ境界内にデプロイできる。ただし Snowflake 固有の仕組みであるため、他クラウドへの移行時にはコンテナをそのまま Vercel や App Service などへ移動させる作業が発生する。「SPCS だから移行できる」という理解は誤りで、移行容易性とは別の話。",
  },
  {
    term: "ArcGIS Maps SDK for JavaScript",
    en: "ArcGIS Maps SDK for JS",
    category: "GIS",
    body: "Esri 社が提供する Web ブラウザ向け GIS ライブラリ。WebGL を使った 2D/3D 地図描画、Feature Layer（ハザードマップ等）の動的切替、空間解析エンジンを提供する。SDK 自体は無料で利用でき、有償部分は ArcGIS Enterprise 上のホスト型レイヤーや分析クレジット。本案件では機能③（被害予想シミュ）専用。①②④は Next.js + Snowflake のみで完結する。",
  },
  {
    term: "庁内 GIS（閉域）",
    en: "On-Prem / Private Cloud GIS",
    category: "GIS",
    body: "Portal for ArcGIS・ArcGIS Server・ArcGIS Data Store が稼働する庁内専用の GIS 基盤。オンプレなら都庁のデータセンター／サーバールーム上の VM または物理サーバー、閉域クラウドなら庁内専用プライベートクラウドに構築する。インターネット上の Esri SaaS（ArcGIS Online）や Snowflake 上には載らない。③ Maps SDK が REST で参照する配信先。",
  },
  {
    term: "IaC（Infrastructure as Code）",
    en: "Infrastructure as Code",
    category: "DevOps",
    body: "サーバー・ネットワーク・クラウドリソースなどのインフラ構成をコード（Terraform・Snowflake CLI 等）で記述・管理する手法。コードをリポジトリで管理することで、環境の再現性・変更履歴の追跡・他事業者への引継ぎが容易になる。仕様書の「他事業者引継ぎ」要件（×3 係数・最大 15pt）を満たすための重要な手段。",
  },
  {
    term: "PAT（Programmatic Access Token）",
    en: "Programmatic Access Token",
    category: "認証",
    body: "Snowflake が発行するプログラム用アクセストークン。開発時に Terraform・Snowflake CLI・snowsql・Next.js（snowflake-sdk）から Snowflake に接続する際に使用する。パスワードの代わりに .env や config.toml に設定し、git にはコミットしない。本番（SPCS 内）ではコンテナに注入される OAuth セッショントークンを使い、PAT は使わない。Key Pair 認証（rsa_key.pem）も開発で併用可能。",
  },
  {
    term: "ハザードマップ",
    en: "Hazard Map",
    category: "防災",
    body: "自然災害（地震・津波・洪水・土砂崩れ・火山噴火等）が発生した場合に想定される被害範囲・危険度を地図上に示したもの。国土交通省・各自治体が公開しており、本案件では ArcGIS の Feature Layer として読み込み、条件設定（災害種別・規模）に応じて動的に表示切替する。",
  },
  {
    term: "Cortex AI",
    en: "Snowflake Cortex AI",
    category: "Snowflake",
    body: "Snowflake が提供する LLM・ML 機能群の総称。`SNOWFLAKE.CORTEX.COMPLETE()` 関数で Claude / Mixtral / Llama 等の LLM を SQL から直接呼び出せる。入力データをモデル学習に使用しない（オプトアウト済み）・東京リージョン対応・200K+ トークンの長文入力対応といった特徴を持ち、行政システムへの適用に適している。",
  },
  {
    term: "マルチターン対話",
    en: "Multi-turn Conversation",
    category: "AI",
    body: "チャットボットが過去の会話履歴を記憶したまま連続した質問に答える対話形式。単発の Q&A と異なり「さっき言った計画書の第3章について詳しく教えて」のような文脈依存の質問に対応できる。本案件では過去 10 回のやり取りを履歴として保持する仕様。",
  },
  {
    term: "pgvector",
    en: "pgvector",
    category: "OSS / DB",
    body: "PostgreSQL の拡張機能として動作するベクトル検索エンジン。RAG のベクトルストアとして OSS で広く使われており、AWS RDS や Supabase 等のマネージドサービスでも提供される。Snowflake Cortex Search の OSS 代替として検討される場合があるが、別途 PostgreSQL インフラの構築・運用コストが発生する。",
  },
  {
    term: "Elasticsearch",
    en: "Elasticsearch",
    category: "OSS / 検索エンジン",
    body: "Elastic 社が提供するオープンソースの全文検索・ベクトル検索エンジン。RAG のベクトルストアや文書検索バックエンドとして広く使われる。Snowflake Cortex Search の代替として利用可能だが、クラスター管理・インデックス設計・スケーリングを自前で行う必要があり、Snowflake のマネージドサービスと比較して運用コストが高い傾向がある。",
  },
  {
    term: "BFF（Backend for Frontend）",
    en: "Backend for Frontend",
    category: "アーキテクチャ",
    body: "フロントエンド専用のサーバー側 API 層。本案件では Next.js の API Routes（/api/chat・/consistency・/scenario 等）が BFF を担い、ブラウザから Snowflake や ArcGIS へ直接接続せず、必ずサーバー側を経由する。これにより Snowflake の接続情報・資格情報をクライアントに露出させず、認証（ログイン/セッション）・アプリ権限（画面/機能の出し分け）・API ゲートウェイ・対話履歴管理・入力サニタイズを一箇所に集約できる。生成結果は SSE でストリーミング配信する。",
  },
  {
    term: "Cortex Search",
    en: "Snowflake Cortex Search",
    category: "Snowflake",
    body: "Snowflake が提供するマネージド・ハイブリッド検索サービス。ベクトル検索＋キーワード検索＋セマンティック再ランキングを内部で自動実行し、埋め込み生成・索引更新も Snowflake が管理する。DOCUMENT_CHUNKS テーブルを索引元に DOC_SEARCH サービスを作成して利用する。",
  },
  {
    term: "Cortex COMPLETE",
    en: "Snowflake Cortex COMPLETE",
    category: "Snowflake",
    body: "Snowflake Cortex の LLM 生成関数（`SNOWFLAKE.CORTEX.COMPLETE`）。Cortex Search で取得したチャンクを文脈として渡し、回答を生成する。モデル名を文字列で指定するだけで差し替え可能（ただし東京リージョンでは Llama/Mistral がネイティブ、Claude/GPT はクロスリージョン推論が必要な場合あり）。",
  },
  {
    term: "Feature Layer",
    en: "ArcGIS Feature Layer",
    category: "GIS",
    body: "ArcGIS Maps SDK for JavaScript で表示するベクター地図レイヤー。ハザードマップ（津波浸水域・震度分布・建物倒壊リスク等）を Feature Layer として読み込み、災害種別や条件設定に応じて動的に表示切替する。本案件の機能③（被害予想シミュレーション）の中核。",
  },
  {
    term: "GIS mart",
    en: "GIS Mart (dbt Mart Layer)",
    category: "データ基盤",
    body: "【Phase 2 以降・任意】dbt で Snowflake 上に構築する地理空間データマート（例: mart_arcgis_features）。初期開発では GIS データは ArcGIS Pro で整備し、Portal for ArcGIS 経由で ArcGIS Enterprise 上の Hosted Feature Layer として配信するため必須ではない。複数ソースの統合・文書・業務データとの SQL 結合・dbt による品質管理が必要になった段階で追加する拡張オプション。追加すると、RAW 層の Shapefile・GeoJSON・オープンデータ等を座標系（JGD2011 / EPSG 等）・属性名・主キーで標準化し、バッチまたは API で Enterprise の Hosted Feature Layer へ同期できる。",
  },
  {
    term: "PLATEAU",
    en: "PLATEAU Project",
    category: "GIS / 3D",
    body: "国土交通省が推進する3D都市モデル（CityGML）のオープンデータプロジェクト。東京都の建物・地形の3Dデータとして活用可能。本案件の令和8年度スコープでは ArcGIS 2D 地図が中心だが、将来の3D可視化拡張時に PLATEAU データとの連携が検討される。",
  },
];

function GlossarySection({ terms }: { terms: string[] }) {
  const filtered = GLOSSARY.filter((g) => terms.includes(g.term));
  if (!filtered.length) return null;
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">📖 用語集</h3>
      <div className="grid grid-cols-1 gap-2">
        {filtered.map((g) => (
          <div key={g.term} className="bg-white border border-gray-200 rounded-lg px-5 py-3 flex gap-4">
            <div className="flex-shrink-0 w-52">
              <div className="font-bold text-gray-900 text-sm">{g.term}</div>
              <div className="text-xs text-gray-400 mt-0.5">{g.en}</div>
              <span className="inline-block mt-1.5 bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">{g.category}</span>
            </div>
            <div className="flex-1 text-sm text-gray-600 leading-relaxed">{g.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

type QAItem = {
  q: string;
  tags: string[];
  sections: { heading?: string; body: string; type?: "warn" | "ok" | "info" | "note" }[];
};

const QA_ITEMS: QAItem[] = [
    {
      q: "ArcGIS がないと開発できない？",
      tags: ["技術構成", "GIS", "依存性"],
      sections: [
        {
          heading: "結論：機能③（被害予想シミュレーション）は ArcGIS なしでは代替困難",
          body: "仕様書では「GISを活用した被害想定データ等の可視化」が要件として明記されています。ArcGIS Maps SDK for JavaScript は WebGL ベースの 2D/3D 地図描画、Feature Layer 動的切替、複数ハザードマップレイヤーの重ね合わせを単一 SDK で提供しており、これを丸ごと代替できる OSS は現時点では存在しません。",
          type: "warn",
        },
        {
          heading: "ArcGIS なしで実現できる範囲",
          body: "機能①（AI チャット・整合性チェック・シナリオ生成）・機能②（文書作成）・機能④（判断支援）の 3 機能は Snowflake Cortex + Next.js だけで実装できます。提案全体の約 60〜70% は ArcGIS に依存しません。",
          type: "ok",
        },
        {
          heading: "OSS 代替（MapLibre GL JS + GeoServer）を使った場合のコスト",
          body: "MapLibre GL JS + GeoServer + PostGIS でハザードマップ配信は可能ですが、次の追加コストが発生します：\n・GeoServer / PostGIS の構築・運用（インフラ設計が必要）\n・PLATEAU CityGML → MVT 変換パイプライン自前実装\n・3D シーン管理・レンダリング最適化の自前実装\n・Esri ハザードマップレイヤー（津波・地震・洪水）相当の自前整備\n\n結果として開発コスト増・納期リスク増・品質低下のリスクが生じるため、本案件では ArcGIS Enterprise を採用するのが合理的です。",
          type: "note",
        },
        {
          heading: "ライセンスコストの観点",
          body: "ArcGIS Maps SDK for JavaScript 自体は無料（JSAPI）。有償部分は ArcGIS Enterprise 上のホスト型レイヤーや分析クレジットです。ハザードマップを国土数値情報（無料）やオープンデータで自社整備すれば、Enterprise のクレジット消費を最小限に抑えることも可能です。",
          type: "info",
        },
      ],
    },
    {
      q: "Snowflake から他ツールに移行するとき問題なく移行できる？SPCS だから大丈夫？",
      tags: ["引継ぎ", "ロックイン", "SPCS", "移行性"],
      sections: [
        {
          heading: "結論：SPCS 依存は移行コストを高める要因になり得る ― ただし設計次第で軽減できる",
          body: "SPCS（Snowpark Container Services）はコンテナを Snowflake 内で動かす仕組みで、Snowflake 固有のサービスです。「SPCS だから大丈夫」という整理は正しくありません。むしろ SPCS の内部にアプリを閉じ込めるほど移行難度が上がります。",
          type: "warn",
        },
        {
          heading: "移行が困難になる部分（ロックイン要素）",
          body: "① Cortex AI の API 呼び出し（`SNOWFLAKE.CORTEX.COMPLETE` 関数）は Snowflake 専用 SQL です。他 LLM サービス（Azure OpenAI / AWS Bedrock 等）に移行する際は API 呼び出し部分の書き換えが必要です。\n② Cortex Search（ベクトル検索）はSnowflake 独自のサービスで、pgvector や Elasticsearch に置き換える場合はインデックス再構築が必要です。\n③ Snowflake の RBAC・ネットワークポリシー・Secrets はクラウド移行先で再設計が必要です。",
          type: "warn",
        },
        {
          heading: "移行が比較的容易な部分",
          body: "① データストレージは標準 SQL（Snowflake SQL は PostgreSQL 互換が高い）。\n② ドキュメント・チャット履歴は構造化テーブルに保存するため、CSV / Parquet でエクスポートしてどこへでも移行可能。\n③ フロントエンド（Next.js）は Snowflake に依存しない。API レイヤーのエンドポイント URL を変更するだけで他 LLM バックエンドに切り替え可能。\n④ IaC（Terraform / Snowflake CLI）でインフラをコード管理すれば、構成の再現性・引継ぎが容易。\n⑤ Next.js アプリ本体は標準的な Docker コンテナのため、SPCS から他のコンテナ基盤（AKS・ECS・Cloud Run 等）へのコンテナ移植自体は容易（ただし Cortex AI / Cortex Search 等の Snowflake 固有 API 呼び出し部分は別途書き換えが必要）。",
          type: "ok",
        },
        {
          heading: "仕様書の「他事業者引継ぎ」要件との関係",
          body: "仕様書では「他事業者が容易に保守・運用できること」が求められています。これを満たすには：\n① LLM 呼び出しを薄い抽象レイヤー（1 関数）に集約し、モデル名・エンドポイントを環境変数で管理する\n② SPCS はオプション扱いにし、Next.js アプリは Snowflake 外（例：Vercel / App Service）でも動作するよう設計する\n③ ドキュメント・IaC・環境構築手順を整備し、Snowflake アカウントなしでもローカル再現できる状態にする\n\nこの 3 点を提案書に明記することで「引継ぎ性」評価（×3 係数・最大 15pt）で高得点を狙えます。",
          type: "info",
        },
        {
          heading: "まとめ：「SPCS だから移行可能」は誤解",
          body: "SPCS はホスティングの仕組みであり、移行容易性とは別の話です。移行容易性を高めるのは「LLM 呼び出しの抽象化」「標準 SQL の徹底」「IaC によるインフラのコード化」です。これらを設計段階から組み込むことで、将来の移行コストを大幅に下げられます。",
          type: "note",
        },
      ],
    },
];

function QA({ openIdx, setOpenIdx }: { openIdx: number | null; setOpenIdx: (i: number | null) => void }) {
  const typeStyle: Record<string, string> = {
    warn: "border-l-4 border-amber-400 bg-amber-50",
    ok: "border-l-4 border-green-500 bg-green-50",
    info: "border-l-4 border-blue-400 bg-blue-50",
    note: "border-l-4 border-gray-400 bg-gray-50",
  };
  const typeIcon: Record<string, string> = {
    warn: "⚠️",
    ok: "✅",
    info: "ℹ️",
    note: "📌",
  };

  return (
    <div className="space-y-4">
      {QA_ITEMS.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-start justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors text-left gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-800 text-base leading-snug">Q. {item.q}</div>
              <div className="flex gap-1.5 flex-wrap mt-1.5">
                {item.tags.map((t) => (
                  <span key={t} className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-medium">{t}</span>
                ))}
              </div>
            </div>
            <span className="text-gray-400 text-lg mt-0.5 flex-shrink-0">{openIdx === i ? "▲" : "▼"}</span>
          </button>

          {openIdx === i && (
            <div className="bg-white border-t border-gray-100 px-6 py-5 space-y-4">
              {item.sections.map((s, j) => (
                <div key={j} className={`rounded-lg p-4 ${typeStyle[s.type ?? "note"]}`}>
                  {s.heading && (
                    <div className="font-semibold text-gray-800 text-sm mb-1.5 flex gap-2 items-start">
                      <span className="flex-shrink-0">{typeIcon[s.type ?? "note"]}</span>
                      <span>{s.heading}</span>
                    </div>
                  )}
                  <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed pl-6">
                    {s.body}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <GlossarySection terms={["ロックインリスク", "SPCS（Snowpark Container Services）", "IaC（Infrastructure as Code）", "RAG（Retrieval-Augmented Generation）", "Cortex AI", "マルチターン対話", "pgvector", "Elasticsearch"]} />
    </div>
  );
}

const SLIDE_BASE_W = 1280;
const SLIDE_BASE_H = 720;

function SlideCanvas({ children, overlay }: { children: React.ReactNode; overlay?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / SLIDE_BASE_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl border border-gray-200 shadow"
      style={{ height: SLIDE_BASE_H * scale }}
    >
      <div
        style={{
          width: SLIDE_BASE_W,
          height: SLIDE_BASE_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
      {overlay}
    </div>
  );
}

type Slide = { label: string; node: React.ReactNode; script?: string[] };

function buildSlides(): Slide[] {
  return [
    {
      label: "タイトル",
      node: (
        <div className="h-full bg-white flex flex-col">
          {/* ヒーロー */}
          <div className="relative bg-gradient-to-br from-[#0a1f44] via-[#11357a] to-[#0a2a6b] text-white px-10 pt-7 pb-8 overflow-hidden">
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none select-none">
              <div className="absolute right-8 top-3 text-[120px] leading-none">🗾</div>
              <div className="absolute right-44 top-2 text-5xl">☁️</div>
              <div className="absolute right-16 top-32 text-4xl">🗄️</div>
            </div>
            <div className="relative">
              <div className="text-sky-300 text-[13px] font-semibold tracking-[0.25em] uppercase mb-2">東京都 × 生成AI × 地理空間情報</div>
              <h1 className="text-[36px] font-bold leading-tight">東京の災害対応力の向上に向けた<br />生成AI を活用した図上訓練構築支援委託</h1>
              <p className="text-sky-100 text-[16px] mt-3 font-medium">Snowflake Cortex × ArcGIS による地図連動型 AI 訓練支援システム</p>
              <div className="flex gap-2.5 flex-wrap mt-4">
                {[
                  { icon: "🏛", t: "東京都庁" },
                  { icon: "📅", t: "令和8〜10年度" },
                  { icon: "👥", t: "都職員 20名" },
                ].map((c) => (
                  <span key={c.t} className="bg-white/15 border border-white/20 text-white px-3.5 py-1.5 rounded-lg text-[13px] flex items-center gap-1.5">
                    <span>{c.icon}</span>{c.t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 本委託の目的 */}
          <div className="flex-1 flex flex-col px-9 pt-4 pb-3 min-h-0">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-sky-400" />
                <span className="text-[17px] font-bold text-slate-800">本委託の目的</span>
                <span className="h-px w-10 bg-gradient-to-l from-transparent to-sky-400" />
              </div>
              <p className="text-[13px] text-slate-600 mt-2 leading-relaxed">
                生成AI と地理空間情報を連携させることで、災害対応の意思決定を支援し、<br />
                実践的な図上訓練の <span className="text-sky-700 font-semibold">高度化・効率化</span> を実現します。
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3 mt-3 flex-1 min-h-0">
              {[
                {
                  no: "01", icon: "🤖", title: "AI 機能群", numBg: "bg-amber-500", titleColor: "text-amber-700", card: "border-amber-200 bg-amber-50/50",
                  desc: "チャット・整合性チェック・シナリオ自動生成", img: "/images/1_01.png", phase: "year1",
                },
                {
                  no: "02", icon: "📝", title: "計画・文書作成", numBg: "bg-rose-500", titleColor: "text-rose-700", card: "border-rose-200 bg-rose-50/50",
                  desc: "AI 改訂提案・エディタ編集・版管理", img: "/images/1_02.png", phase: "year2",
                },
                {
                  no: "03", icon: "🗺️", title: "被害予想シミュ", numBg: "bg-emerald-500", titleColor: "text-emerald-700", card: "border-emerald-200 bg-emerald-50/50",
                  desc: "GIS 地図・ハザードマップ 5 種可視化", img: "/images/1_03.png", phase: "year2",
                },
                {
                  no: "04", icon: "🛡️", title: "判断支援", numBg: "bg-violet-500", titleColor: "text-violet-700", card: "border-violet-200 bg-violet-50/50",
                  desc: "情報統合・AI 推奨アクション生成", img: "/images/1_04.png", phase: "year2",
                },
              ].map((f) => (
                <div key={f.no} className={`border rounded-2xl p-3 flex flex-col shadow-sm ${f.card}`}>
                  <div className="flex items-center gap-2">
                    <span className={`${f.numBg} text-white text-[12px] font-bold rounded-md w-7 h-7 flex items-center justify-center flex-shrink-0`}>{f.no}</span>
                    <span className="text-xl">{f.icon}</span>
                    <span className={`text-[15px] font-bold ${f.titleColor}`}>{f.title}</span>
                    <span className={`ml-auto text-[9.5px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${f.phase === "year1" ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`}>{f.phase === "year1" ? "初年度" : "2年目〜"}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1.5 leading-snug">{f.desc}</div>
                  <div className="mt-2 flex-1 relative bg-white border border-slate-200 rounded-lg overflow-hidden">
                    <Image src={f.img} alt={f.title} fill sizes="280px" className="object-contain p-1.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 下部バー */}
          <div className="bg-slate-100 border-t border-slate-200 px-9 py-3 grid grid-cols-4 gap-4">
            {[
              { icon: "🎯", title: "迅速な意思決定支援", text: "AI とデータで判断をスピードアップ" },
              { icon: "📊", title: "訓練の高度化", text: "リアルなシミュレーションで実践力向上" },
              { icon: "👥", title: "業務効率化", text: "作業の自動化で負担を軽減" },
              { icon: "🛡️", title: "災害対応力の向上", text: "継続的な改善で強靭な組織へ" },
            ].map((d) => (
              <div key={d.title} className="flex items-center gap-2">
                <span className="text-lg flex-shrink-0">{d.icon}</span>
                <div>
                  <div className="text-[12.5px] font-bold text-slate-800 leading-tight">{d.title}</div>
                  <div className="text-[10.5px] text-slate-500 leading-snug mt-0.5">{d.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      script: [
        "本日は、東京の災害対応力の向上に向けた、生成AIを活用した図上訓練構築支援についてご説明します。",
        "東京都庁向けに、Snowflake Cortex による生成AIと、ArcGIS による地図表示を、Next.js で統合した、地図連動型のAI訓練支援システムです。",
        "令和8年度から10年度までの3年間、都職員およそ20名の利用を想定し、段階的に機能を拡充していきます。",
      ],
    },
    {
      label: "課題",
      node: (
        <div className="h-full bg-slate-50 flex flex-col">
          <div className="bg-gradient-to-r from-[#0b1f3a] via-[#13315c] to-[#1c3d6e] text-white px-9 py-5 flex items-end justify-between">
            <div className="flex items-stretch gap-4">
              <div className="w-1.5 rounded-full bg-sky-400" />
              <div>
                <div className="text-[13px] text-sky-300 font-semibold uppercase tracking-[0.3em]">Background</div>
                <h2 className="text-[34px] font-bold leading-tight mt-0.5">現状の課題</h2>
              </div>
            </div>
            <div className="text-right text-sky-100 text-[15px] leading-relaxed">
              訓練環境の高度化・効率化に向けて<br />解決すべき <span className="text-white font-bold">4 つの課題</span>
            </div>
          </div>

          <div className="flex-1 px-7 py-5 grid grid-cols-2 grid-rows-2 gap-4">
            {[
              {
                no: "01", icon: "📋", grad: "from-teal-500 to-emerald-600", numBg: "bg-teal-600", chip: "bg-teal-50 text-teal-700 border-teal-200",
                title: "整合性チェックが手作業",
                body: "防災計画書・訓練シナリオ・ハザードマップは別々に管理されており、改訂のたびに担当者が目視で整合性を確認している。更新漏れや記述の矛盾が生じやすく、訓練本番で不整合が発覚するリスクがある。",
                source: "仕様書 §1 背景・目的",
              },
              {
                no: "02", icon: "⏱️", grad: "from-cyan-500 to-sky-600", numBg: "bg-cyan-600", chip: "bg-cyan-50 text-cyan-700 border-cyan-200",
                title: "シナリオ作成の工数大",
                body: "首都直下地震を想定した 1 シナリオの作成だけで数週間を要している。南海トラフ・津波・富士山噴火・大規模風水害など複数災害への拡張が困難で、年度をまたいだ計画の見直しにも多大な時間を費やしている。",
                source: "仕様書 §2 業務内容①",
              },
              {
                no: "03", icon: "🗺️", grad: "from-violet-500 to-purple-600", numBg: "bg-violet-600", chip: "bg-violet-50 text-violet-700 border-violet-200",
                title: "被害可視化ツールの不足",
                body: "現行の訓練環境では、津波浸水域・建物倒壊リスク・避難経路などを地図上でリアルタイムに重ね合わせて確認できるツールがない。被害規模の直感的な把握が難しく、意思決定の遅延につながっている。",
                source: "仕様書別紙１ §3 GIS 活用要件",
              },
              {
                no: "04", icon: "🤝", grad: "from-amber-500 to-orange-600", numBg: "bg-orange-600", chip: "bg-orange-50 text-orange-700 border-orange-200",
                title: "他事業者への引継ぎ困難",
                body: "現行システムが特定ベンダーに依存した構成となっており、他事業者が保守・運用・機能追加を行える状態になっていない。複数年度にわたる事業継続性を担保するため、引継ぎ可能な設計が必須要件として明示されている。",
                source: "仕様書 §4 引継ぎ要件（必須）",
              },
            ].map((c) => (
              <div key={c.no} className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col shadow-sm">
                <div className="flex items-start gap-3">
                  <div className={`${c.numBg} text-white text-lg font-bold rounded-lg w-10 h-10 flex items-center justify-center flex-shrink-0`}>{c.no}</div>
                  <h3 className="text-[19px] font-bold text-slate-800 leading-tight flex-1 self-center">{c.title}</h3>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${c.grad} flex items-center justify-center text-3xl flex-shrink-0 shadow-inner`}>{c.icon}</div>
                </div>
                <p className="text-[13.5px] text-slate-600 leading-relaxed mt-2.5 flex-1">{c.body}</p>
                <div className={`mt-3 inline-flex items-center gap-1.5 self-start text-[12px] font-medium border rounded-full px-3 py-1 ${c.chip}`}>
                  <span>📄</span><span>出典: {c.source}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#0b1f3a] to-[#1c3d6e] text-white px-7 py-3.5 flex items-center gap-5">
            <span className="text-[15px] font-bold whitespace-nowrap bg-white/10 rounded-md px-3 py-1.5">解決の方向性</span>
            <div className="grid grid-cols-4 gap-4 flex-1">
              {[
                { icon: "🎯", text: "整合性の自動化で人的ミスを削減" },
                { icon: "⏱️", text: "シナリオ作成を効率化し計画立案を迅速に" },
                { icon: "🗂️", text: "リアルタイム可視化で状況把握を直感的に" },
                { icon: "🤝", text: "オープンな設計で持続可能な運用を実現" },
              ].map((d) => (
                <div key={d.text} className="flex items-center gap-2">
                  <span className="text-lg flex-shrink-0">{d.icon}</span>
                  <span className="text-[12.5px] text-sky-100 leading-snug">{d.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      script: [
        "まず現状の課題です。大きく4つあります。",
        "1点目は整合性チェックが手作業で、計画書・シナリオ・ハザードマップの矛盾が見落とされやすいこと。2点目はシナリオ作成の工数が大きく、1シナリオに数週間かかることです。",
        "3点目は被害をリアルタイムに地図で重ね合わせて確認できるツールがないこと。4点目は特定ベンダー依存で、他事業者への引継ぎが困難なことです。",
        "これらを、整合性の自動化・シナリオ作成の効率化・リアルタイム可視化・オープンな設計の4方向で解決します。",
      ],
    },
    {
      label: "解決策",
      node: (
        <div className="h-full bg-slate-50 flex flex-col">
          <div className="bg-gradient-to-r from-[#9f1239] via-[#b91c3c] to-[#be123c] text-white px-9 py-5 flex items-end justify-between">
            <div className="flex items-stretch gap-4">
              <div className="w-1.5 rounded-full bg-rose-300" />
              <div>
                <div className="text-[13px] text-rose-200 font-semibold uppercase tracking-[0.3em]">Solution</div>
                <h2 className="text-[32px] font-bold leading-tight mt-0.5">4 つの機能による解決アプローチ</h2>
              </div>
            </div>
            <div className="text-right text-rose-100 text-[15px] leading-relaxed">
              災害対応の精度とスピードを、<br /><span className="text-white font-bold">4 つの機能</span>で強力にサポート
            </div>
          </div>

          <div className="flex-1 px-7 py-5 relative">
            <div className="h-full grid grid-cols-2 grid-rows-2 gap-4">
              {[
                {
                  no: "01", icon: "🤖", numBg: "bg-amber-500", card: "bg-amber-50/70 border-amber-200", title: "AI 機能群", phase: "year1",
                  body: "チャットボット / 整合性チェック / シナリオ自動生成で計画書管理を効率化",
                  img: "/images/04_01.png",
                  preview: (
                    <div className="mt-auto bg-white border border-amber-200 rounded-lg p-2.5 text-[12px] space-y-1.5 shadow-sm">
                      <div className="flex gap-2 items-start"><span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold flex-shrink-0">Q</span><span className="text-slate-600">首都直下型の参集基準は？</span></div>
                      <div className="flex gap-2 items-start"><span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold flex-shrink-0">A</span><span className="text-slate-600">対処計画 p.23 に記載。震度 5 強以上で全局参集… <span className="text-amber-600 font-medium">（根拠付き）</span></span></div>
                    </div>
                  ),
                },
                {
                  no: "02", icon: "📝", numBg: "bg-rose-500", card: "bg-rose-50/70 border-rose-200", title: "計画・文書作成", phase: "year2",
                  body: "AI が改訂ポイントを提案。エディタで直接編集し計画書を常に最新に",
                  img: "/images/04_02.png",
                  preview: (
                    <div className="mt-auto bg-white border border-rose-200 rounded-lg p-2.5 text-[12px] space-y-1.5 shadow-sm">
                      <div className="text-slate-500 font-semibold">首都直下地震対処計画_v4.docx</div>
                      <div className="flex gap-1.5 flex-wrap">
                        <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded">⚠ p.23 参集基準 更新</span>
                        <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded">⚠ p.41 物資配送 更新</span>
                      </div>
                    </div>
                  ),
                },
                {
                  no: "03", icon: "🗺️", numBg: "bg-emerald-500", card: "bg-emerald-50/70 border-emerald-200", title: "被害予想シミュレーション", phase: "year2",
                  body: "条件設定 → ArcGIS 地図上でリアルタイム可視化。5 種ハザードマップ対応",
                  img: null,
                  preview: (
                    <div className="mt-auto space-y-1.5">
                      <div className="bg-white border border-emerald-200 rounded-lg p-2 text-[12px] flex gap-2 items-center shadow-sm">
                        <div className="space-y-0.5 flex-shrink-0 text-slate-600 leading-tight">
                          <div>災害: 首都直下 M7.3</div>
                          <div>時刻: 冬平日深夜</div>
                        </div>
                        <div className="relative flex-1 self-stretch min-h-[42px] rounded overflow-hidden bg-slate-100">
                          <Image src="/images/04_03.png" alt="被害予想ヒートマップ" fill sizes="200px" className="object-cover" />
                        </div>
                        <div className="space-y-0.5 flex-shrink-0 text-slate-600 leading-tight">
                          <div>死者: 6,100 人</div>
                          <div>全壊: 175,000 棟</div>
                        </div>
                      </div>
                      <div className="relative h-6">
                        <Image src="/images/04_03_01.png" alt="対応災害種別" fill sizes="560px" className="object-contain" />
                      </div>
                    </div>
                  ),
                },
                {
                  no: "04", icon: "📊", numBg: "bg-violet-500", card: "bg-violet-50/70 border-violet-200", title: "判断支援ダッシュボード", phase: "year2",
                  body: "被害予想 × 文書 × AI 推奨アクションを一画面に統合し意思決定を支援",
                  img: "/images/04_04.png",
                  preview: (
                    <div className="mt-auto bg-white border border-violet-200 rounded-lg p-2.5 text-[12px] space-y-1 shadow-sm">
                      <div className="text-amber-700 font-semibold">⚠ 避難所 3 箇所が収容超過</div>
                      <div className="text-slate-600">AI 推奨: ①避難所分散 ②迂回ルート設定 ③医療優先エリア指定</div>
                    </div>
                  ),
                },
              ].map((c) => (
                <div key={c.no} className={`border rounded-2xl p-3.5 flex flex-col shadow-sm ${c.card}`}>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className={`${c.numBg} text-white text-base font-bold rounded-lg w-9 h-9 flex items-center justify-center flex-shrink-0`}>{c.no}</div>
                    <span className="text-2xl">{c.icon}</span>
                    <span className="text-[19px] font-bold text-slate-800">{c.title}</span>
                    <span className={`ml-auto text-[10.5px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${c.phase === "year1" ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`}>{c.phase === "year1" ? "初年度開発" : "2年目以降"}</span>
                  </div>
                  <div className="flex gap-2 flex-1 min-h-0">
                    <div className="flex flex-col flex-1 min-h-0">
                      <p className="text-[13px] text-slate-600 leading-relaxed mb-2">{c.body}</p>
                      {c.preview}
                    </div>
                    {c.img && (
                      <div className="relative w-[30%] flex-shrink-0 self-stretch min-h-[88px]">
                        <Image src={c.img} alt={c.title} fill sizes="200px" className="object-contain" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[132px] h-[132px] rounded-full bg-white shadow-xl border-4 border-rose-100 flex flex-col items-center justify-center text-center px-3 z-10">
              <span className="text-3xl">🛡️</span>
              <span className="text-[12.5px] font-bold text-rose-700 leading-tight mt-1">迅速・的確な<br />意思決定を支援</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#9f1239] to-[#be123c] text-white px-7 py-3.5 flex items-center gap-5">
            <span className="text-[15px] font-bold whitespace-nowrap bg-white/10 rounded-md px-3 py-1.5">期待できる効果</span>
            <div className="grid grid-cols-4 gap-4 flex-1">
              {[
                { icon: "⏱️", title: "対応スピードの向上", text: "情報収集・分析・判断を大幅に短縮" },
                { icon: "🎯", title: "計画の精度向上", text: "データと AI による根拠ある計画立案を実現" },
                { icon: "👥", title: "関係者の連携強化", text: "最新情報を共有し組織全体で一貫した対応" },
                { icon: "🛡️", title: "リスクの最小化", text: "被害予測と最適な行動で被害を最小限に抑制" },
              ].map((d) => (
                <div key={d.title} className="flex items-start gap-2">
                  <span className="text-lg flex-shrink-0 mt-0.5">{d.icon}</span>
                  <div>
                    <div className="text-[13px] font-bold leading-tight">{d.title}</div>
                    <div className="text-[11.5px] text-rose-100 leading-snug mt-0.5">{d.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      script: [
        "解決策として、4つの機能を提案します。",
        "機能①はAI機能群で、チャットボット・整合性チェック・シナリオ自動生成です。機能②は計画・マニュアルの見直し修正、機能③は地図連動の被害予想シミュレーション、機能④は判断支援ダッシュボードです。",
        "機能①を初年度に開発し、②③④は2年目以降に段階的に展開します。",
        "これにより、対応スピードの向上、計画精度の向上、関係者の連携強化、リスクの最小化という4つの効果が期待できます。",
      ],
    },
    {
      label: "機能①",
      node: (
        <div className="h-full bg-slate-50 flex flex-col">
          <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500 text-white px-9 py-5 flex items-center justify-between">
            <div className="flex items-stretch gap-4">
              <div className="w-1.5 rounded-full bg-white/60" />
              <div>
                <div className="text-[13px] text-white/90 font-semibold uppercase tracking-[0.3em]">Feature 01</div>
                <h2 className="text-[27px] font-bold leading-tight mt-0.5">① AI 機能群<span className="text-[18px] font-semibold opacity-90">（チャットボット・整合性チェック・シナリオ自動生成）</span></h2>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <span className="bg-emerald-500 text-white text-[13px] font-bold px-3.5 py-1.5 rounded-full shadow-sm whitespace-nowrap">初年度開発（令和8年度）</span>
              <div className="text-5xl opacity-80">🤖</div>
            </div>
          </div>

          <div className="flex-1 px-7 py-4 grid grid-cols-3 gap-4 min-h-0">
            {/* デモ① チャットボット */}
            <div className="border border-amber-200 rounded-2xl overflow-hidden bg-white flex flex-col min-h-0 shadow-sm">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3.5 py-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[14px]">💬 チャットボット</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">根拠付き回答</span>
                </div>
                <div className="text-[10px] text-amber-100 mt-0.5">Cortex Search で計画書を横断検索</div>
              </div>
              <div className="px-2.5 py-1.5 bg-amber-50 border-b border-amber-100">
                <div className="flex items-center gap-1 text-[9.5px] text-amber-800 leading-tight flex-wrap">
                  <span className="font-bold bg-amber-200 rounded px-1 py-0.5 flex-shrink-0">使い方</span>
                  <span>質問を入力</span><span className="text-amber-400 font-bold">›</span>
                  <span>AI が計画書を横断検索</span><span className="text-amber-400 font-bold">›</span>
                  <span>根拠付きで回答</span>
                </div>
                <div className="text-[9px] text-amber-700/80 mt-0.5 leading-snug">例）訓練構築中に「○○の手順は？」と疑問が出たらその場で質問</div>
              </div>
              <div className="p-3 bg-slate-50 flex-1 space-y-2 overflow-hidden">
                <div className="flex justify-end">
                  <div className="max-w-[88%] bg-amber-100 border border-amber-200 rounded-2xl rounded-tr-sm px-3 py-2 text-[12px] text-slate-800">
                    第 3 局の初動手順を教えて。参照元も表示して。
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">AI</span>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm">
                    <div className="font-bold text-slate-800 mb-0.5 text-[12.5px]">初動手順（要約）</div>
                    <div className="text-slate-700 text-[11.5px] leading-snug">避難所開設判断 → 導線確保 → 被害一次集約の順で実施。</div>
                    <div className="mt-1.5 flex gap-1 flex-wrap">
                      {["仕様書 p.12", "別紙1 p.4", "入札 p.23"].map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-2.5 py-2 bg-white border-t border-slate-200 flex items-center gap-2">
                <div className="flex-1 bg-slate-100 rounded-full px-3 py-1.5 text-[11px] text-slate-400">メッセージを入力…</div>
                <span className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-[12px] flex-shrink-0">➤</span>
              </div>
            </div>

            {/* デモ② 整合性チェック */}
            <div className="border border-rose-200 rounded-2xl overflow-hidden bg-white flex flex-col min-h-0 shadow-sm">
              <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-3.5 py-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[14px]">🛡️ 整合性チェック</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">AI 自動検出</span>
                </div>
                <div className="text-[10px] text-rose-100 mt-0.5">Cortex が文書間の記述差分を抽出</div>
              </div>
              <div className="px-2.5 py-1.5 bg-rose-50 border-b border-rose-100">
                <div className="flex items-center gap-1 text-[9.5px] text-rose-800 leading-tight flex-wrap">
                  <span className="font-bold bg-rose-200 rounded px-1 py-0.5 flex-shrink-0">使い方</span>
                  <span>対象文書を選択</span><span className="text-rose-400 font-bold">›</span>
                  <span>チェック実行</span><span className="text-rose-400 font-bold">›</span>
                  <span>矛盾点を一覧で確認</span><span className="text-rose-400 font-bold">›</span>
                  <span>推奨修正を反映</span>
                </div>
                <div className="text-[9px] text-rose-700/80 mt-0.5 leading-snug">例）計画書を改訂した後、訓練シナリオ・被害想定との食い違いを一括点検</div>
              </div>
              <div className="p-3 bg-slate-50 flex-1 flex flex-col gap-2 overflow-hidden">
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  {[
                    { n: "24", l: "対象文書", c: "text-slate-700" },
                    { n: "3", l: "検出", c: "text-rose-600" },
                    { n: "1", l: "未対応", c: "text-amber-600" },
                  ].map((s) => (
                    <div key={s.l} className="bg-white border border-slate-200 rounded-lg py-1">
                      <div className={`text-[16px] font-bold leading-none ${s.c}`}>{s.n}</div>
                      <div className="text-[9.5px] text-slate-500 mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white border border-rose-200 rounded-lg p-2">
                  <div className="text-[10px] font-bold text-rose-600 mb-1">⚠ 要修正</div>
                  <div className="flex items-center gap-1 text-[10.5px]">
                    <span className="bg-slate-100 text-slate-700 rounded px-1.5 py-0.5">対処計画 p.23<br />震度5強で参集</span>
                    <span className="text-rose-500 font-bold">≠</span>
                    <span className="bg-slate-100 text-slate-700 rounded px-1.5 py-0.5">被害想定 p.5<br />震度6弱</span>
                  </div>
                </div>
                <div className="bg-white border border-amber-200 rounded-lg p-2">
                  <div className="text-[10px] font-bold text-amber-600 mb-1">△ 要確認</div>
                  <div className="text-[10.5px] text-slate-600 leading-snug">組織図 v3 と 規定 p.8 で班体制の記載に差異</div>
                </div>
                <div className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-2 py-1 leading-snug">💡 AI 推奨修正: p.23 を「震度6弱以上」に統一</div>
              </div>
            </div>

            {/* デモ③ シナリオ生成 */}
            <div className="border border-sky-200 rounded-2xl overflow-hidden bg-white flex flex-col min-h-0 shadow-sm">
              <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-3.5 py-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[14px]">⚡ シナリオ生成</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">約 20 秒</span>
                </div>
                <div className="text-[10px] text-sky-100 mt-0.5">Cortex COMPLETE が RAG で自動作成</div>
              </div>
              <div className="px-2.5 py-1.5 bg-sky-50 border-b border-sky-100">
                <div className="flex items-center gap-1 text-[9.5px] text-sky-800 leading-tight flex-wrap">
                  <span className="font-bold bg-sky-200 rounded px-1 py-0.5 flex-shrink-0">使い方</span>
                  <span>災害条件を設定</span><span className="text-sky-400 font-bold">›</span>
                  <span>生成実行</span><span className="text-sky-400 font-bold">›</span>
                  <span>タイムライン素案を確認</span><span className="text-sky-400 font-bold">›</span>
                  <span>docx 出力・編集</span>
                </div>
                <div className="text-[9px] text-sky-700/80 mt-0.5 leading-snug">例）新しい訓練を企画する際、災害・時刻・対象局を選ぶだけで叩き台を自動作成</div>
              </div>
              <div className="p-3 bg-slate-50 flex-1 flex flex-col gap-2 overflow-hidden">
                <div className="flex gap-1 flex-wrap">
                  {["首都直下 M7.3", "冬平日深夜", "第3局"].map((c) => (
                    <span key={c} className="text-[10px] bg-white border border-slate-200 text-slate-600 rounded-full px-2 py-0.5">{c}</span>
                  ))}
                </div>
                <div className="flex-1 space-y-1.5">
                  {[
                    { t: "T+0分", e: "初動判断・避難所開設", ref: "p.12" },
                    { t: "T+30分", e: "全局参集・配備体制確立", ref: "p.23" },
                    { t: "T+2時間", e: "被害一次集約・応援要請", ref: "p.41" },
                  ].map((p) => (
                    <div key={p.t} className="flex items-stretch gap-2">
                      <span className="bg-sky-600 text-white text-[10px] font-bold rounded px-1.5 flex items-center flex-shrink-0">{p.t}</span>
                      <div className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 flex items-center justify-between">
                        <span className="text-[10.5px] text-slate-700">{p.e}</span>
                        <span className="text-[9px] text-sky-700 bg-sky-50 border border-sky-200 rounded px-1">{p.ref}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">2 時間訓練を 20 秒で生成</span>
                  <span className="text-[10px] bg-sky-600 text-white rounded-md px-2 py-1">⬇ docx 出力</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 border-t border-slate-200 px-7 py-3.5 grid grid-cols-4 gap-4">
            {[
              { icon: "🎯", title: "迅速な意思決定", text: "必要な情報を即座に取得し、初動対応を加速。" },
              { icon: "🛡️", title: "精度の高い整合性", text: "最新版との差異を自動検出し、リスクを可視化。" },
              { icon: "⚡", title: "シナリオ作成の自動化", text: "訓練設計を大幅に効率化し、準備時間を短縮。" },
              { icon: "📊", title: "監査・説明責任の強化", text: "根拠ページの明示と記録で、監査対応をスムーズに。" },
            ].map((d) => (
              <div key={d.title} className="flex items-start gap-2">
                <span className="text-lg flex-shrink-0 mt-0.5">{d.icon}</span>
                <div>
                  <div className="text-[13px] font-bold text-slate-800 leading-tight">{d.title}</div>
                  <div className="text-[11.5px] text-slate-500 leading-snug mt-0.5">{d.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      script: [
        "機能①のAI機能群です。3つのデモでご説明します。これは初年度・令和8年度に開発します。",
        "チャットボットは、Cortex Search で計画書を横断検索し、出典ページ付きで回答します。訓練構築中に生じた疑問を、その場で根拠付きに解消できます。",
        "整合性チェックは、文書間の記述差分をAIが自動検出します。例えば参集基準の震度が、対処計画と被害想定で食い違う箇所を抽出し、推奨修正まで提示します。",
        "シナリオ生成は、災害・時刻・対象局を選ぶだけで、Cortex COMPLETE がおよそ20秒でタイムライン素案を作成し、docx として出力・編集できます。",
      ],
    },
    {
      label: "機能②",
      node: (
        <div className="h-full bg-slate-50 flex flex-col">
          <div className="relative overflow-hidden bg-gradient-to-r from-rose-500 via-rose-600 to-rose-600 text-white px-9 py-5 flex items-center justify-between">
            <div className="absolute -right-10 -top-16 w-72 h-72 rounded-full bg-white/10" />
            <div className="absolute right-24 -bottom-20 w-56 h-56 rounded-full bg-white/10" />
            <div className="flex items-stretch gap-4 relative z-10">
              <div className="w-1.5 rounded-full bg-white/60" />
              <div>
                <div className="text-[13px] text-white/85 font-semibold uppercase tracking-[0.3em]">Feature 02</div>
                <h2 className="text-[27px] font-bold leading-tight mt-0.5">② 計画・マニュアル見直し修正</h2>
                <div className="text-[13px] text-rose-50/90 mt-1">AI を活用して計画・文書を継続的に改善し、最新かつ実効性の高い内容を維持します</div>
              </div>
            </div>
            <span className="relative z-10 bg-white/15 border border-white/40 text-white text-[14px] font-bold px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0">2年目以降開発</span>
          </div>

          <div className="flex-1 px-8 py-5 flex gap-5 min-h-0">
            <div className="flex-1 flex flex-col gap-3.5 min-h-0">
              {/* 01 改訂ポイント自動提案 */}
              <div className="flex-1 bg-white border border-rose-100 rounded-2xl shadow-sm px-5 py-4 flex items-center gap-4">
                <span className="w-11 h-11 rounded-full bg-rose-600 text-white text-[17px] font-bold flex items-center justify-center flex-shrink-0">01</span>
                <span className="w-16 h-16 rounded-2xl bg-rose-50 text-3xl flex items-center justify-center flex-shrink-0">🧠</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[18px] font-bold text-rose-700 leading-tight">AI が改訂ポイントを自動提案</div>
                  <div className="text-[12.5px] text-slate-600 leading-snug mt-1">最新の災害傾向・ハザードマップ・既存計画書を照合し、更新が必要な箇所をページ単位で提案します。</div>
                </div>
                <div className="w-28 h-16 bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-col justify-center gap-1.5 flex-shrink-0">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500 text-white text-[7px] flex items-center justify-center flex-shrink-0">✓</span>
                      <span className="h-1.5 rounded-full bg-slate-200" style={{ width: `${64 - i * 12}px` }} />
                    </div>
                  ))}
                </div>
              </div>
              {/* 02 エディタ差分確認 */}
              <div className="flex-1 bg-white border border-rose-100 rounded-2xl shadow-sm px-5 py-4 flex items-center gap-4">
                <span className="w-11 h-11 rounded-full bg-rose-600 text-white text-[17px] font-bold flex items-center justify-center flex-shrink-0">02</span>
                <span className="w-16 h-16 rounded-2xl bg-rose-50 text-3xl flex items-center justify-center flex-shrink-0">📝</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[18px] font-bold text-rose-700 leading-tight">エディタで直接編集・差分確認</div>
                  <div className="text-[12.5px] text-slate-600 leading-snug mt-1">ブラウザ上で文書を編集し、変更前後の差分を色付きハイライトで即確認。承認フローも組み込み済み。</div>
                </div>
                <div className="w-28 h-16 bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-col justify-center gap-1 flex-shrink-0">
                  <span className="h-1.5 rounded-full bg-rose-200 w-full" />
                  <span className="h-1.5 rounded-full bg-emerald-300 w-3/4" />
                  <span className="h-1.5 rounded-full bg-rose-200 w-5/6" />
                  <span className="h-1.5 rounded-full bg-emerald-300 w-2/3" />
                </div>
              </div>
              {/* 03 版管理・引継ぎ */}
              <div className="flex-1 bg-white border border-rose-100 rounded-2xl shadow-sm px-5 py-4 flex items-center gap-4">
                <span className="w-11 h-11 rounded-full bg-rose-600 text-white text-[17px] font-bold flex items-center justify-center flex-shrink-0">03</span>
                <span className="w-16 h-16 rounded-2xl bg-rose-50 text-3xl flex items-center justify-center flex-shrink-0">☁️</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[18px] font-bold text-rose-700 leading-tight">版管理・引継ぎ対応</div>
                  <div className="text-[12.5px] text-slate-600 leading-snug mt-1">改訂履歴を Snowflake に保存。他事業者への引継ぎ時も版渡しが完全に行えるため、移行が容易。</div>
                </div>
                <div className="w-36 flex-shrink-0">
                  <div className="flex items-center">
                    {["v1.0", "v1.1", "v1.2"].map((v, i) => (
                      <Fragment key={v}>
                        <div className="flex flex-col items-center">
                          <span className={`text-[9px] font-bold mb-1 ${i === 2 ? "text-rose-600" : "text-slate-400"}`}>{v}</span>
                          <span className={`w-3 h-3 rounded-full ${i === 2 ? "bg-rose-600 ring-4 ring-rose-100" : "bg-slate-300"}`} />
                        </div>
                        {i < 2 && <span className="flex-1 h-0.5 bg-slate-300 mt-3.5" />}
                      </Fragment>
                    ))}
                  </div>
                  <div className="text-right text-[9px] font-bold text-rose-600 mt-1.5">最新版</div>
                </div>
              </div>
            </div>

            {/* 右カラム */}
            <div className="w-52 flex-shrink-0 flex flex-col gap-3.5">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-14 h-16 bg-slate-100 rounded-md border border-slate-300 flex items-end justify-center pb-1.5">
                    <span className="text-[9px] font-bold text-white bg-sky-600 rounded px-1 py-0.5">DOCX</span>
                  </div>
                </div>
                <div className="text-[12.5px] font-bold text-slate-700 mt-2 leading-snug">首都直下地震対処計画<br />_v4.docx</div>
                <button className="mt-3 w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white text-[13px] font-bold py-2 rounded-full shadow-sm">✦ AI 解析</button>
              </div>
              <div className="bg-white border border-rose-200 rounded-2xl shadow-sm p-4 flex-1">
                <div className="text-center text-[14px] font-bold text-rose-600 mb-2.5">提案箇所 3 件</div>
                <div className="space-y-2">
                  {["p.23 参集基準", "p.41 物資配送", "p.67 通信手順"].map((t) => (
                    <div key={t} className="flex items-center gap-2 bg-rose-50/60 border border-rose-100 rounded-lg px-2.5 py-2">
                      <span className="text-rose-500 text-[15px] flex-shrink-0">📄</span>
                      <span className="text-[12.5px] text-slate-700 font-medium">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      script: [
        "機能②は計画・マニュアルの見直し修正です。2年目以降の開発です。",
        "AIが最新の災害傾向やハザードマップと既存の計画書を照合し、改訂が必要な箇所をページ単位で自動提案します。",
        "ブラウザのエディタで直接編集し、変更前後の差分を色付きで確認できます。改訂履歴はSnowflakeに保存され、版管理と他事業者への引継ぎが容易です。",
      ],
    },
    {
      label: "機能③",
      node: (
        <div className="h-full bg-slate-50 flex flex-col">
          <div className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-emerald-700 to-green-800 text-white px-9 py-5 flex items-center justify-between">
            <div className="absolute -right-10 -top-16 w-72 h-72 rounded-full bg-white/5" />
            <div className="absolute right-28 -bottom-20 w-56 h-56 rounded-full bg-white/5" />
            <div className="flex items-stretch gap-4 relative z-10">
              <div className="w-1.5 rounded-full bg-white/60" />
              <div>
                <div className="text-[13px] text-emerald-200 font-semibold uppercase tracking-[0.3em]">Feature 03 — Key</div>
                <h2 className="text-[27px] font-bold leading-tight mt-0.5">③ 被害予想シミュレーション（地図連動・GIS）</h2>
                <div className="text-[13px] text-emerald-50/90 mt-1">ハザードマップと連動した高精度な被害予測シミュレーションで、意思決定を支援します。</div>
              </div>
            </div>
            <span className="relative z-10 bg-white/15 border border-white/40 text-white text-[14px] font-bold px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0">2年目以降開発</span>
          </div>

          <div className="flex-1 px-6 py-4 flex gap-4 min-h-0">
            {/* 左: 条件設定 */}
            <div className="w-56 flex-shrink-0 flex flex-col gap-2.5 min-h-0">
              <div className="text-[14px] font-bold text-emerald-800 flex items-center gap-1.5">⚙️ 条件設定</div>
              {[
                { icon: "🌊", label: "災害種別", val: "津波 / 首都直下地震 / 南海トラフ / 富士山噴火 / 大規模風水害" },
                { icon: "🕐", label: "規模・時刻", val: "M7.3・冬平日深夜 など 複数パターンに対応" },
                { icon: "🗂️", label: "表示レイヤー", val: "震度分布 / 浸水域 / 建物倒壊リスク / 避難所位置" },
              ].map((f) => (
                <div key={f.label} className="bg-white border border-slate-200 rounded-xl px-3 py-2 flex gap-2.5 items-start shadow-sm">
                  <span className="text-[18px] flex-shrink-0">{f.icon}</span>
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-bold text-slate-700">{f.label}</div>
                    <div className="text-[11px] text-slate-500 leading-snug mt-0.5">{f.val}</div>
                  </div>
                </div>
              ))}
              <button className="bg-gradient-to-r from-emerald-600 to-green-600 text-white text-center py-2.5 rounded-xl font-bold text-[14px] shadow-sm flex items-center justify-center gap-1.5">▶ シミュレーション実行</button>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex-1 min-h-0">
                <div className="text-[12.5px] font-bold text-emerald-800 flex items-center gap-1 mb-2">📊 推計結果（23区・M7.3）</div>
                <div className="space-y-1.5">
                  {[
                    { icon: "🏥", l: "死者（人）", v: "6,100" },
                    { icon: "🏚️", l: "建物全壊（棟）", v: "175,000" },
                    { icon: "👥", l: "避難者（人）", v: "339,000" },
                    { icon: "🚶", l: "帰宅困難者（人）", v: "1,230,000" },
                  ].map((s) => (
                    <div key={s.l} className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-600 flex items-center gap-1"><span>{s.icon}</span>{s.l}</span>
                      <span className="text-[13px] font-bold text-emerald-700">{s.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 中央: 地図ビュー */}
            <div className="flex-1 relative rounded-2xl overflow-hidden border border-slate-300 shadow-sm bg-slate-200 min-w-0">
              <Image src="/images/tokyo_heatmap.png" alt="GIS 地図ビュー" fill className="object-cover" style={{ objectPosition: "center" }} sizes="640px" />
              <div className="absolute inset-0 bg-slate-900/0" />
              {/* タイトル */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow">
                <div className="text-[14px] font-bold text-emerald-800 flex items-center gap-1">🛰️ GIS 地図ビュー</div>
                <div className="text-[10px] text-slate-600 leading-snug mt-0.5">震度分布・浸水深・建物倒壊リスクを重ね合わせ<br />複数レイヤーでリアルタイム評価</div>
              </div>
              {/* 2D/3D */}
              <div className="absolute top-3 right-3 flex gap-0.5 bg-white/90 rounded-md p-0.5 shadow text-[11px] font-bold">
                <span className="text-slate-500 px-2 py-0.5 rounded">2D</span>
                <span className="bg-emerald-600 text-white px-2 py-0.5 rounded">3D</span>
              </div>
              {/* マップコントロール */}
              <div className="absolute top-14 right-3 flex flex-col gap-1">
                {["▤", "⌂", "＋", "−", "◎"].map((c, i) => (
                  <span key={i} className="w-7 h-7 bg-white/90 rounded-md shadow flex items-center justify-center text-[13px] text-slate-600">{c}</span>
                ))}
              </div>
              {/* 凡例 */}
              <div className="absolute bottom-3 left-3 right-3 bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-3 flex-wrap">
                <span className="text-[10px] font-bold text-white">凡例</span>
                {[
                  { c: "bg-red-600", l: "震度6強以上" },
                  { c: "bg-orange-500", l: "震度6弱" },
                  { c: "bg-yellow-400", l: "震度5強" },
                  { c: "bg-green-500", l: "震度5弱以下" },
                  { c: "bg-blue-500", l: "浸水 0.5m〜" },
                  { c: "bg-purple-500", l: "倒壊高リスク" },
                  { c: "bg-emerald-300", l: "📍 避難所" },
                ].map((l) => (
                  <span key={l.l} className="flex items-center gap-1 text-[9.5px] text-white/90"><span className={`w-2.5 h-2.5 rounded-full ${l.c}`} />{l.l}</span>
                ))}
              </div>
            </div>

            {/* 右: リスク指標 */}
            <div className="w-52 flex-shrink-0 flex flex-col gap-3 min-h-0">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-3.5">
                <div className="text-[12.5px] font-bold text-slate-700 mb-2.5">主要リスク指標（選択地点）</div>
                <div className="space-y-2.5">
                  {[
                    { icon: "📊", l: "震度", v: "6強", c: "text-rose-600" },
                    { icon: "🌊", l: "最大浸水深", v: "0.7 m", c: "text-sky-600" },
                    { icon: "🏢", l: "建物倒壊リスク", v: "高", c: "text-rose-600" },
                    { icon: "📍", l: "近隣避難所", v: "3 箇所", c: "text-emerald-600" },
                  ].map((s) => (
                    <div key={s.l} className="flex items-center justify-between">
                      <span className="text-[11.5px] text-slate-600 flex items-center gap-1.5"><span className="text-[14px]">{s.icon}</span>{s.l}</span>
                      <span className={`text-[15px] font-bold ${s.c}`}>{s.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl shadow-sm p-3.5 flex-1">
                <div className="text-[12.5px] font-bold text-emerald-800 mb-2">おすすめアクション</div>
                <div className="space-y-2">
                  {["避難所の受け入れ体制の確認", "浸水エリアの資機材移動", "倒壊リスク建物の点検・補強"].map((a) => (
                    <div key={a} className="flex items-start gap-1.5 text-[11.5px] text-slate-700 leading-snug">
                      <span className="text-emerald-600 font-bold flex-shrink-0 mt-0.5">✓</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      script: [
        "機能③は被害予想シミュレーションで、地図連動・GISが核となる機能です。2年目以降の開発です。",
        "災害種別・規模・時刻・表示レイヤーを設定して実行すると、地図上に、震度分布・浸水域・建物倒壊リスク・避難所位置を重ねてリアルタイムに可視化します。",
        "選択地点の主要リスク指標と、おすすめアクションを併せて表示し、被害規模の直感的な把握と、迅速な意思決定を支援します。",
      ],
    },
    {
      label: "機能③ 実装",
      node: (
        <div className="h-full bg-slate-50 flex flex-col">
          <div className="relative overflow-hidden bg-gradient-to-r from-emerald-700 via-emerald-700 to-teal-800 text-white px-9 py-5 flex items-center justify-between">
            <div className="absolute -right-10 -top-16 w-72 h-72 rounded-full bg-white/5" />
            <div className="absolute right-28 -bottom-20 w-56 h-56 rounded-full bg-white/5" />
            <div className="flex items-stretch gap-4 relative z-10">
              <div className="w-1.5 rounded-full bg-white/60" />
              <div>
                <div className="text-[13px] text-emerald-200 font-semibold uppercase tracking-[0.3em]">Feature 03 — Implementation</div>
                <h2 className="text-[27px] font-bold leading-tight mt-0.5">被害予想シミュレーションの実際の実装</h2>
                <div className="text-[13px] text-emerald-50/90 mt-1">MapLibre GL JS ＋ deck.gl ＋ Snowflake で構築した動作する PoC（地震・津波・火災）</div>
              </div>
            </div>
            <span className="relative z-10 bg-white/15 border border-white/40 text-white text-[13px] font-bold px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0">tocho-geospatial-platform / web</span>
          </div>

          <div className="flex-1 px-7 py-4 flex gap-4 min-h-0">
            {/* 左: 技術スタック */}
            <div className="w-[300px] flex-shrink-0 flex flex-col gap-2.5 min-h-0">
              <div className="text-[14px] font-bold text-emerald-800 flex items-center gap-1.5">🧱 技術スタック</div>
              {[
                { icon: "⚛️", label: "フロントエンド", val: "Next.js 16（App Router）/ React 19 / TypeScript" },
                { icon: "🗺️", label: "ベースマップ", val: "MapLibre GL JS v5 — CARTO Dark Matter スタイル（OSM ラスターにフォールバック）" },
                { icon: "📊", label: "データ可視化", val: "deck.gl v9 — MapboxOverlay で MapLibre 上にレイヤーを重畳" },
                { icon: "🧊", label: "空間集計", val: "H3（h3-js）/ CARTO Native App 連携も検討余地あり" },
                { icon: "❄️", label: "データ基盤", val: "Snowflake（GEOGRAPHY 型 / ST_ASGEOJSON・ST_CENTROID・HAVERSINE）REST SQL API v2・社内プロキシ対応" },
              ].map((f) => (
                <div key={f.label} className="bg-white border border-slate-200 rounded-xl px-3 py-2 flex gap-2.5 items-start shadow-sm">
                  <span className="text-[18px] flex-shrink-0">{f.icon}</span>
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-bold text-slate-700">{f.label}</div>
                    <div className="text-[11px] text-slate-500 leading-snug mt-0.5">{f.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 中央: データフロー */}
            <div className="flex-1 flex flex-col gap-2.5 min-w-0">
              <div className="text-[14px] font-bold text-emerald-800 flex items-center gap-1.5">🔄 データフロー（地震シミュレーションの例）</div>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 flex-1 flex flex-col justify-between">
                {[
                  { step: "1", t: "UI 操作", d: "断層プリセット選択・地図クリックで震源 / マグニチュード / 震源深さを設定", c: "bg-emerald-500" },
                  { step: "2", t: "リアクティブ計算（useMemo）", d: "震度ゾーン・建物被害（全壊/半壊/一部損壊）・人的被害・施設稼働状況を推計", c: "bg-emerald-500" },
                  { step: "3", t: "Snowflake クエリ", d: "ST_ASGEOJSON で浸水ゾーン GeoJSON、HAVERSINE で半径内の施設 POI を取得", c: "bg-sky-500" },
                  { step: "4", t: "deck.gl レイヤー更新", d: "PolygonLayer / ScatterplotLayer / GeoJsonLayer / HeatmapLayer を再構成", c: "bg-violet-500" },
                  { step: "5", t: "MapLibre 描画", d: "MapboxOverlay で重畳描画＋影響圏内施設は HTML マーカー（Lucide アイコン）", c: "bg-rose-500" },
                ].map((s, i, arr) => (
                  <div key={s.step}>
                    <div className="flex gap-3 items-start">
                      <span className={`w-6 h-6 rounded-full ${s.c} text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0`}>{s.step}</span>
                      <div className="min-w-0">
                        <div className="text-[13px] font-bold text-slate-800">{s.t}</div>
                        <div className="text-[11.5px] text-slate-500 leading-snug">{s.d}</div>
                      </div>
                    </div>
                    {i < arr.length - 1 && <div className="ml-3 my-1 w-px h-3 bg-slate-300" />}
                  </div>
                ))}
              </div>
            </div>

            {/* 右: 実装済みシミュレータ + レイヤー */}
            <div className="w-[230px] flex-shrink-0 flex flex-col gap-3 min-h-0">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-3.5">
                <div className="text-[12.5px] font-bold text-slate-700 mb-2.5">実装済みシミュレータ</div>
                <div className="space-y-2">
                  {[
                    { icon: "🌐", l: "地震被害", c: "text-rose-600", sub: "震度ゾーン・液状化・人的被害" },
                    { icon: "🌊", l: "津波浸水", c: "text-sky-600", sub: "波前線・浸水深時系列" },
                    { icon: "🔥", l: "火災延焼", c: "text-orange-600", sub: "風向風速・延焼面積アニメ" },
                  ].map((s) => (
                    <div key={s.l} className="flex items-start gap-2">
                      <span className="text-[16px] flex-shrink-0">{s.icon}</span>
                      <div className="min-w-0">
                        <div className={`text-[12.5px] font-bold ${s.c}`}>{s.l}</div>
                        <div className="text-[10.5px] text-slate-500 leading-snug">{s.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl shadow-sm p-3.5 flex-1">
                <div className="text-[12.5px] font-bold text-emerald-800 mb-2">使用 deck.gl レイヤー</div>
                <div className="flex flex-wrap gap-1.5">
                  {["PolygonLayer", "ScatterplotLayer", "GeoJsonLayer", "HeatmapLayer", "ArcLayer"].map((l) => (
                    <span key={l} className="bg-white border border-emerald-200 text-emerald-700 text-[10.5px] font-bold px-2 py-1 rounded-full">{l}</span>
                  ))}
                </div>
                <div className="text-[10.5px] text-slate-500 leading-snug mt-2.5">※ 現状はモック係数による PoC。仕様の ArcGIS は概念図であり、実装は OSS スタックで再現。</div>
              </div>
            </div>
          </div>
        </div>
      ),
      script: [
        "こちらが、被害予想シミュレーションの実際の実装です。仕様書の概念図では ArcGIS を想定していましたが、PoC は OSS 中心の構成で実装し、すでに地震・津波・火災の3つのシミュレータが動作しています。",
        "ベースマップは MapLibre GL JS、その上に deck.gl のレイヤーを MapboxOverlay で重ねています。データはすべて Snowflake の GEOGRAPHY 型から、ST_ASGEOJSON や HAVERSINE といった空間関数で取得しています。",
        "フローとしては、UI 操作から React の useMemo で被害量を推計し、deck.gl のレイヤーを再構成して MapLibre 上に描画します。フロントエンドは Next.js 16 と React 19 です。",
      ],
    },
    {
      label: "機能③ 比較",
      node: (
        <div className="h-full bg-slate-50 flex flex-col">
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white px-9 py-5 flex items-center justify-between">
            <div className="flex items-stretch gap-4">
              <div className="w-1.5 rounded-full bg-white/60" />
              <div>
                <div className="text-[13px] text-emerald-200 font-semibold uppercase tracking-[0.3em]">Feature 03 — Library Comparison</div>
                <h2 className="text-[27px] font-bold leading-tight mt-0.5">被害予想シミュレーションで使う地図ライブラリ比較</h2>
                <div className="text-[13px] text-emerald-50/90 mt-1">採用: MapLibre GL JS ＋ deck.gl（PoC 実装の推奨構成）</div>
              </div>
            </div>
            <span className="bg-white/15 border border-white/40 text-white text-[13px] font-bold px-4 py-2 rounded-full whitespace-nowrap">比較観点: 役割 / 強み / 適性</span>
          </div>

          <div className="flex-1 px-7 py-3 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2.5">
              {[
                {
                  name: "MapLibre GL JS",
                  role: "ベースマップ",
                  price: "無料（OSS / BSD）",
                  priceNote: "ライセンス費ゼロ。地図タイル配信費のみ",
                  points: ["完全 OSS・ライセンス費なし", "高速なベクター描画", "スタイル自由度が高い"],
                  badge: "採用",
                  tone: "emerald",
                },
                {
                  name: "deck.gl",
                  role: "データ可視化",
                  price: "無料（OSS / MIT）",
                  priceNote: "ライセンス費ゼロ",
                  points: ["100万点級も WebGL で描画", "H3/Heatmap 等レイヤー豊富", "フレームワーク非依存"],
                  badge: "採用",
                  tone: "emerald",
                },
                {
                  name: "MapLibre + deck.gl",
                  role: "推奨構成",
                  price: "無料（OSS 組合せ）",
                  priceNote: "タイル配信費のみで本番運用可",
                  points: ["ベースマップ＋可視化を統合", "MapboxOverlay で簡単連携", "本番実装の推奨パターン"],
                  badge: "本採用",
                  tone: "teal",
                },
                {
                  name: "Google Maps JS API",
                  role: "エンタープライズ",
                  price: "従量課金",
                  priceNote: "Dynamic Maps 約 $7/1,000 ロード。表示数に応じて增加",
                  points: ["普及した UI/UX・高信頼", "StreetView・Places 連携", "API キー有料・持出制約"],
                  badge: "比較",
                  tone: "sky",
                },
                {
                  name: "CARTO (deck.gl)",
                  role: "空間分析",
                  price: "年額サブスク",
                  priceNote: "Enterprise 契約。年額数万ドル〜（要見積）",
                  points: ["Snowflake Native App 対応", "H3/S2 空間インデックス", "CARTO アカウントが必要"],
                  badge: "比較",
                  tone: "amber",
                },
                {
                  name: "ArcGIS Maps SDK",
                  role: "商用 GIS（仕様想定）",
                  price: "高額（ライセンス＋サーバー）",
                  priceNote: "Pro: Creator 約$700～1,000 / Professional 約$2,500～3,500（年）。Enterprise Standard 100～300万円 / Advanced 300～800万円（要見積）",
                  points: ["2D/3D・業務 GIS 機能が充実", "庁内 ArcGIS Enterprise と整合", "ライセンス費用が高く PoC では不採用"],
                  badge: "不採用",
                  tone: "rose",
                },
              ].map((lib) => {
                const toneMap = {
                  emerald: {
                    card: "bg-emerald-50 border-emerald-200",
                    head: "text-emerald-800",
                    chip: "bg-emerald-600 text-white",
                    fit: "text-emerald-700",
                  },
                  teal: {
                    card: "bg-teal-50 border-teal-300 ring-2 ring-teal-300",
                    head: "text-teal-800",
                    chip: "bg-teal-600 text-white",
                    fit: "text-teal-700",
                  },
                  sky: {
                    card: "bg-sky-50 border-sky-200",
                    head: "text-sky-800",
                    chip: "bg-sky-600 text-white",
                    fit: "text-sky-700",
                  },
                  amber: {
                    card: "bg-amber-50 border-amber-200",
                    head: "text-amber-800",
                    chip: "bg-amber-600 text-white",
                    fit: "text-amber-700",
                  },
                  violet: {
                    card: "bg-violet-50 border-violet-200",
                    head: "text-violet-800",
                    chip: "bg-violet-600 text-white",
                    fit: "text-violet-700",
                  },
                  rose: {
                    card: "bg-rose-50 border-rose-200",
                    head: "text-rose-800",
                    chip: "bg-rose-600 text-white",
                    fit: "text-rose-700",
                  },
                } as const;
                const t = toneMap[lib.tone as keyof typeof toneMap];
                return (
                  <div key={lib.name} className={`border rounded-2xl px-3 py-2.5 flex flex-col min-h-[150px] ${t.card}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className={`text-[13px] font-bold leading-tight ${t.head}`}>{lib.name}</div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${t.chip}`}>{lib.badge}</span>
                    </div>
                    <div className="mt-1.5 text-[11.5px] text-slate-600">役割: <span className={`font-bold ${t.fit}`}>{lib.role}</span></div>
                    <div className="mt-1.5 bg-white/70 border border-slate-200 rounded-lg px-2 py-1">
                      <div className="text-[10px] text-slate-500 leading-none">💰 価格</div>
                      <div className={`text-[12px] font-bold leading-tight mt-0.5 ${t.fit}`}>{lib.price}</div>
                      <div className="text-[9.5px] text-slate-500 leading-snug mt-0.5">{lib.priceNote}</div>
                    </div>
                    <ul className="mt-1.5 space-y-1 text-[11px] text-slate-700 leading-snug">
                      {lib.points.map((p) => (
                        <li key={p} className="flex gap-1.5"><span className="font-bold text-slate-400">•</span><span>{p}</span></li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
              <div className="bg-white border border-emerald-200 rounded-xl p-3.5">
                <div className="text-[12.5px] font-bold text-emerald-800 mb-1">tocho-geospatial-platform の判断</div>
                <div className="text-[12px] text-slate-700 leading-relaxed">
                  被害予想シミュレーションは、OSS でライセンス費を抑えつつ大規模データ可視化に強い <b>MapLibre GL JS ＋ deck.gl</b> を採用。Snowflake の GEOGRAPHY データを直接可視化できる構成を本番推奨パターンとした。
                </div>
              </div>
              <div className="flex items-center justify-center text-slate-400 text-xl font-bold">→</div>
              <div className="bg-white border border-slate-200 rounded-xl p-3.5">
                <div className="text-[12.5px] font-bold text-slate-800 mb-1">ArcGIS を不採用とした理由</div>
                <div className="text-[12px] text-slate-700 leading-relaxed">
                  ArcGIS Maps SDK は業務 GIS 機能が充実し仕様想定も ArcGIS だが、<b>ライセンス費用が高く</b> PoC では不採用。Snowflake 連携の空間分析は CARTO、Google 連携が必要なら Google Maps を将来検討。
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      script: [
        "機能③の補足として、被害予想シミュレーションで実際に利用する地図ライブラリを比較しています。仕様書では ArcGIS を想定していましたが、PoC では OSS スタックで実装しました。",
        "ベースマップ描画の MapLibre GL JS と、大規模データ可視化に強い deck.gl を組み合わせた『MapLibre ＋ deck.gl』を本採用としています。MapboxOverlay で両者を簡単に統合でき、本番実装の推奨パターンです。",
        "仕様書が想定していた ArcGIS Maps SDK は業務 GIS 機能が充実していますが、ライセンス費用が高く、PoC では不採用としました。CARTO や Google Maps も比較対象とし、要件と運用体制に応じて使い分ける前提です。",
      ],
    },
    {
      label: "機能④",
      node: (
        <div className="h-full bg-slate-50 flex flex-col">
          <div className="relative overflow-hidden bg-gradient-to-r from-violet-700 via-violet-700 to-purple-800 text-white px-9 py-5 flex items-center justify-between">
            <div className="absolute -right-10 -top-16 w-72 h-72 rounded-full bg-white/5" />
            <div className="absolute right-28 -bottom-20 w-56 h-56 rounded-full bg-white/5" />
            <div className="flex items-stretch gap-4 relative z-10">
              <div className="w-1.5 rounded-full bg-white/60" />
              <div>
                <div className="text-[13px] text-violet-200 font-semibold uppercase tracking-[0.3em]">Feature 04</div>
                <h2 className="text-[27px] font-bold leading-tight mt-0.5">④ 判断支援ダッシュボード</h2>
                <div className="text-[13px] text-violet-50/90 mt-1">情報を統合し、AI が最適な判断をサポート。意思決定をワンストップで加速します。</div>
              </div>
            </div>
            <span className="relative z-10 bg-white/15 border border-white/40 text-white text-[14px] font-bold px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0">2年目以降開発</span>
          </div>

          <div className="flex-1 px-8 py-5 flex gap-5 min-h-0">
            {/* 左: 機能カード */}
            <div className="flex-1 flex flex-col gap-3.5 min-h-0">
              {[
                { no: "01", icon: "📊", title: "情報統合ビュー", body: "被害予想シミュ・チャット回答・計画書を 1 画面に集約。判断に必要な情報をワンストップで参照できます。" },
                { no: "02", icon: "🪄", title: "AI 推奨アクション生成", body: "現況データを Cortex に入力し、優先対応タスクリストを自動生成。判断スピードを大幅に短縮。" },
                { no: "03", icon: "🏢", title: "区市町村展開を見据えた設計", body: "局・課単位のロール付与 UI。2 年目以降の区市町村展開に対応できる権限構造を採用。" },
              ].map((c) => (
                <div key={c.no} className="flex-1 bg-white border border-violet-100 rounded-2xl shadow-sm px-5 py-4 flex items-center gap-4">
                  <span className="w-11 h-11 rounded-full bg-violet-700 text-white text-[17px] font-bold flex items-center justify-center flex-shrink-0">{c.no}</span>
                  <span className="w-16 h-16 rounded-2xl bg-violet-50 text-3xl flex items-center justify-center flex-shrink-0">{c.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[18px] font-bold text-violet-700 leading-tight">{c.title}</div>
                    <div className="text-[12.5px] text-slate-600 leading-snug mt-1">{c.body}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 右: アラート・推奨・リンク */}
            <div className="flex-1 flex flex-col gap-3.5 min-h-0">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl shadow-sm p-4 flex gap-3 items-start">
                <span className="w-10 h-10 rounded-full bg-amber-500 text-white text-[18px] flex items-center justify-center flex-shrink-0">🔔</span>
                <div>
                  <div className="text-[15px] font-bold text-amber-700">現況アラート</div>
                  <div className="text-[12.5px] text-slate-700 leading-snug mt-1">⚠ 想定避難所 3 箇所が収容超過 / 交通遮断 12 件発生</div>
                </div>
              </div>
              <div className="bg-white border border-violet-200 rounded-2xl shadow-sm p-4 flex-1">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-8 h-8 rounded-full bg-violet-600 text-white text-[15px] flex items-center justify-center flex-shrink-0">🪄</span>
                  <span className="text-[15px] font-bold text-violet-700">AI 推奨アクション</span>
                </div>
                <div className="space-y-2">
                  {[
                    "公立避難所の収容分散（近隣 2 箇所へ）",
                    "広域輸送迂回ルート設定",
                    "医療機関搬送優先エリア指定",
                  ].map((a, i) => (
                    <div key={a} className="flex items-center gap-2.5 bg-violet-50/60 border border-violet-100 rounded-lg px-3 py-2">
                      <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      <span className="text-[12.5px] text-slate-700 font-medium">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-sky-50 border border-sky-200 rounded-2xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-8 h-8 rounded-full bg-sky-500 text-white text-[14px] flex items-center justify-center flex-shrink-0">🔗</span>
                  <span className="text-[15px] font-bold text-sky-700">関連文書クイックリンク</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["対処計画 p.15", "避難所マップ", "被害シミュ", "応援要請手順"].map((l) => (
                    <span key={l} className="flex items-center gap-1.5 bg-white border border-sky-200 rounded-lg px-2.5 py-1.5 text-[12px] text-sky-700 font-medium">📄 {l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      script: [
        "機能④は判断支援ダッシュボードです。2年目以降の開発です。",
        "被害予想シミュレーション・チャット回答・計画書を1画面に統合し、現況アラートと、Cortex によるAI推奨アクションを提示します。",
        "局・課単位のロール付与に対応し、2年目以降の区市町村展開も見据えた権限構造を採用しています。",
      ],
    },
    {
      label: "技術構成",
      node: (
        <div className="h-full bg-white flex flex-col">
          <div className="bg-slate-700 text-white px-6 py-3">
            <div className="text-xs text-slate-300 font-semibold uppercase tracking-widest">Technology</div>
            <h2 className="text-lg font-bold">Snowflake × ArcGIS による技術構成</h2>
          </div>
          <div className="flex-1 p-4 grid grid-cols-2 gap-4 text-xs">
            {/* 左列: アーキテクチャ図 */}
            <div className="flex flex-col gap-1.5">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-0.5">システム構成図（ランタイム）</div>
              {/* ユーザー層 */}
              <div className="bg-indigo-100 border border-indigo-300 rounded-lg px-3 py-2 text-center">
                <div className="font-bold text-indigo-800">👤 都職員ブラウザ（20名）</div>
                <div className="text-indigo-600 text-xs">IP アクセス制限 · 3 ロール RBAC</div>
              </div>
              <div className="text-center text-gray-400 text-base leading-none">↕</div>
              {/* フロントエンド層 */}
              <div className="bg-orange-100 border border-orange-300 rounded-lg px-3 py-2 text-center">
                <div className="font-bold text-orange-800">🌐 Next.js Web アプリ（SPCS）</div>
                <div className="text-orange-700">ファイル取込み（PDF/docx/xlsx）· マルチターン履歴管理</div>
              </div>
              <div className="text-center text-gray-400 text-base leading-none">↕</div>
              {/* AI + GIS 層 */}
              <div className="flex gap-2">
                <div className="flex-1 bg-green-100 border border-green-300 rounded-lg px-2 py-2 text-center">
                  <div className="font-bold text-green-800">❄️ Snowflake</div>
                  <div className="text-green-700 text-xs">Cortex AI · RAG</div>
                  <div className="mt-1 flex justify-center gap-1 flex-wrap">
                    {["機能①","機能②","機能④"].map(f => <span key={f} className="bg-green-200 text-green-800 px-1 rounded text-xs">{f}</span>)}
                  </div>
                </div>
                <div className="flex-1 bg-teal-100 border border-teal-300 rounded-lg px-2 py-2 text-center">
                  <div className="font-bold text-teal-800">🗺️ Portal + Enterprise</div>
                  <div className="text-teal-700 text-xs">Maps SDK · Feature Layer</div>
                  <div className="mt-1 flex justify-center">
                    <span className="bg-teal-200 text-teal-800 px-1 rounded text-xs">機能③</span>
                  </div>
                </div>
              </div>
              <div className="text-center text-gray-400 text-base leading-none">↕</div>
              {/* データ層 */}
              <div className="flex gap-2">
                <div className="flex-1 bg-slate-100 border border-slate-300 rounded-lg px-2 py-1.5 text-center">
                  <div className="font-bold text-slate-700">📄 文書データ</div>
                  <div className="text-slate-600 text-xs">計画書 / シナリオ / 過去事例</div>
                </div>
                <div className="flex-1 bg-emerald-100 border border-emerald-300 rounded-lg px-2 py-1.5 text-center">
                  <div className="font-bold text-emerald-700">🌊 被害想定データ</div>
                  <div className="text-emerald-600 text-xs">津波・地震・噴火・洪水・土砂</div>
                </div>
              </div>
            </div>
            {/* 右列: なぜArcGIS + 仕様対応 */}
            <div className="flex flex-col gap-2">
              <div className="bg-amber-50 border border-amber-300 rounded-lg p-3">
                <div className="font-bold text-amber-800 mb-2">❓ なぜ ArcGIS が必要か</div>
                <ul className="text-gray-700 space-y-1.5">
                  <li className="flex gap-1.5"><span className="text-teal-600 font-bold flex-shrink-0">✓</span><span>仕様書に「GIS を活用した被害想定データ等の可視化」が<span className="font-semibold text-gray-800">必須要件</span>として明記</span></li>
                  <li className="flex gap-1.5"><span className="text-teal-600 font-bold flex-shrink-0">✓</span><span>WebGL 地図描画 · ハザードマップ 5 種 · Feature Layer 動的切替を単一 SDK で提供できる OSS は現時点では存在しない</span></li>
                  <li className="flex gap-1.5"><span className="text-amber-500 font-bold flex-shrink-0">⚠</span><span>OSS 代替（MapLibre + GeoServer）は自前インフラ · データ整備が必要で<span className="font-semibold">開発コスト増・納期リスク</span>が発生</span></li>
                  <li className="flex gap-1.5"><span className="text-blue-500 font-bold flex-shrink-0">ℹ</span><span>機能①②④は Snowflake のみで完結。ArcGIS は<span className="font-semibold">機能③専用</span>で依存を最小化</span></li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="font-bold text-blue-800 mb-2">✅ 仕様要件への対応</div>
                <div className="grid grid-cols-2 gap-1.5 text-gray-700">
                  {[
                    { icon: "✓", text: "必須要件 全項目充足" },
                    { icon: "✓", text: "引継ぎ: 標準 SQL + IaC" },
                    { icon: "✓", text: "LLM 切替: モデル名変更のみ" },
                    { icon: "✓", text: "運用コスト: 従量課金で最適化" },
                  ].map((r) => (
                    <div key={r.text} className="flex gap-1 items-start bg-white rounded px-2 py-1 border border-blue-100">
                      <span className="text-green-600 font-bold flex-shrink-0">{r.icon}</span>
                      <span>{r.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      script: [
        "技術構成です。都職員のブラウザから、SPCS 上の Next.js アプリにアクセスし、IPアクセス制限と3ロールのRBACで保護します。",
        "機能①②④は Snowflake Cortex のみで完結し、機能③だけ ArcGIS SDK を使います。WebGL の地図描画やハザードマップ5種、Feature Layer の動的切替を単一SDKで提供できるOSSが現状ないためです。",
        "ArcGIS への依存は機能③に限定して最小化し、引継ぎは標準SQL＋IaC、LLMはモデル名の変更のみで切替、運用コストは従量課金で最適化します。",
      ],
    },
    {
      label: "ロードマップ",
      node: (
        <div className="h-full bg-slate-50 flex flex-col">
          <div className="bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#2563eb] text-white px-9 py-5 flex items-center justify-between">
            <div className="flex items-stretch gap-4">
              <div className="w-1.5 rounded-full bg-sky-300" />
              <div>
                <div className="text-[13px] text-sky-200 font-semibold uppercase tracking-[0.3em]">Roadmap</div>
                <h2 className="text-[32px] font-bold leading-tight mt-0.5">3 年間の開発ロードマップ</h2>
                <p className="text-[14px] text-sky-100 mt-1">段階的に機能を拡充し、災害対応の高度化と効率化を実現します</p>
              </div>
            </div>
            <div className="text-5xl opacity-80 flex-shrink-0">🚩</div>
          </div>

          <div className="flex-1 px-7 py-5">
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-0 items-stretch h-full">
              {[
                {
                  badge: "1年目", badgeColor: "bg-blue-600", icon: "⛰️", accent: "text-blue-700", subBg: "bg-blue-50", numBg: "bg-blue-600", goalBg: "bg-blue-50 border-blue-200", goalText: "text-blue-800",
                  title: "令和8年度（1年目）",
                  sub: "ロードマップ策定・方向性検討",
                  items: [
                    { icon: "🤖", text: "チャットボット・整合性チェック・シナリオ生成 初期開発（首都直下型）" },
                    { icon: "📅", text: "令和9年1月 図上訓練での実証" },
                    { icon: "👥", text: "②③④ 実施方法の検討・提案" },
                    { icon: "📊", text: "区市町村展開の実施方法検討" },
                    { icon: "📍", text: "区市町村展開の実施方法検討" },
                  ],
                  goal: "初期機能の実証と、全体方針・展開方法の確立",
                },
                {
                  badge: "2年目", badgeColor: "bg-emerald-600", icon: "🏛️", accent: "text-emerald-700", subBg: "bg-emerald-50", numBg: "bg-emerald-600", goalBg: "bg-emerald-50 border-emerald-200", goalText: "text-emerald-800",
                  title: "2年目",
                  sub: "対象範囲拡大・運用開始",
                  items: [
                    { icon: "🌊", text: "対象範囲拡大（南海トラフ・風水害・津波・火山等）" },
                    { icon: "🤖", text: "チャットボット運用開始" },
                    { icon: "📝", text: "計画・マニュアル修正 初期開発" },
                    { icon: "🧭", text: "③④ 被害予想・判断支援 要件整理・方向性検討" },
                    { icon: "🏢", text: "区市町村展開 要件整理・方式検討" },
                  ],
                  goal: "対象災害の拡大と運用基盤の構築",
                },
                {
                  badge: "3年目", badgeColor: "bg-amber-600", icon: "🚀", accent: "text-amber-700", subBg: "bg-amber-50", numBg: "bg-amber-600", goalBg: "bg-amber-50 border-amber-200", goalText: "text-amber-800",
                  title: "3年目",
                  sub: "機能拡充・本格展開",
                  items: [
                    { icon: "📄", text: "計画・マニュアル修正 機能拡充（他災害対応）" },
                    { icon: "🖥️", text: "被害予想シミュレーション 初期開発" },
                    { icon: "🧭", text: "判断支援 初期開発" },
                    { icon: "👥", text: "区市町村のツール展開・導入支援" },
                    { icon: "🔧", text: "継続的な改善・機能追加検討" },
                  ],
                  goal: "多様な災害に対応する本格的なシステム展開",
                },
              ].map((col, ci) => (
                <Fragment key={col.badge}>
                  {ci > 0 && (
                    <div className="flex items-center justify-center px-1">
                      <span className="text-2xl text-slate-300 font-bold">›</span>
                    </div>
                  )}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
                    <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className={`${col.badgeColor} text-white text-[12px] font-bold rounded-md px-2 py-1`}>{col.badge}</span>
                        <span className={`text-[18px] font-bold ${col.accent}`}>{col.title}</span>
                      </div>
                      <span className="text-2xl">{col.icon}</span>
                    </div>
                    <div className={`${col.subBg} px-4 py-1.5 flex items-center gap-1.5`}>
                      <span className="text-[12px]">🎯</span>
                      <span className={`text-[12.5px] font-semibold ${col.accent}`}>{col.sub}</span>
                    </div>
                    <div className="flex-1 px-3.5 py-2.5 space-y-1.5">
                      {col.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className={`${col.numBg} text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5`}>{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-base flex-shrink-0 leading-none mt-0.5">{item.icon}</span>
                          <span className="text-[12px] text-slate-700 leading-snug">{item.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className={`m-3 mt-1 rounded-xl border p-2.5 ${col.goalBg}`}>
                      <div className={`text-[12px] font-bold flex items-center gap-1 ${col.goalText}`}>🏆 ゴール</div>
                      <div className="text-[11.5px] text-slate-600 mt-0.5 leading-snug">{col.goal}</div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>

          <div className="bg-slate-100 border-t border-slate-200 px-7 py-3 flex items-center gap-5">
            <span className="text-[14px] font-bold text-slate-700 whitespace-nowrap">🎯 全体の目指す姿</span>
            <div className="grid grid-cols-4 gap-4 flex-1">
              {[
                { icon: "🛡️", title: "災害対応の高度化", text: "迅速かつ的確な意思決定を支援" },
                { icon: "⚡", title: "業務の効率化", text: "自動化・可視化で負担を軽減" },
                { icon: "🔗", title: "全域への展開", text: "区市町村までスムーズに展開" },
                { icon: "📈", title: "継続的な進化", text: "改善を重ね、価値を最大化" },
              ].map((d) => (
                <div key={d.title} className="flex items-start gap-2">
                  <span className="text-lg flex-shrink-0 mt-0.5">{d.icon}</span>
                  <div>
                    <div className="text-[12.5px] font-bold text-slate-800 leading-tight">{d.title}</div>
                    <div className="text-[11px] text-slate-500 leading-snug mt-0.5">{d.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      script: [
        "3年間の開発ロードマップです。段階的に機能を拡充します。",
        "1年目・令和8年度は、機能①を首都直下型で初期開発し、令和9年1月の図上訓練で実証します。あわせて②③④や区市町村展開の実施方法も検討します。",
        "2年目は対象災害を南海トラフ・風水害・津波・火山等へ拡大し、チャットボットを運用開始。3年目は被害予想シミュレーションや判断支援の開発と、区市町村へのツール展開を進めます。",
      ],
    },
    {
      label: "評価ポイント",
      node: (
        <div className="h-full bg-slate-50 flex flex-col">
          <div className="bg-gradient-to-r from-[#c2410c] via-[#ea580c] to-[#f59e0b] text-white px-9 py-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-3xl flex-shrink-0">📋</div>
            <div>
              <div className="text-[13px] text-orange-100 font-semibold uppercase tracking-[0.3em]">Evaluation</div>
              <h2 className="text-[32px] font-bold leading-tight mt-0.5">総合評価での強み（技術点 200 点）</h2>
            </div>
          </div>

          <div className="flex-1 px-7 py-5 grid grid-cols-[1.15fr_1fr] gap-5">
            <div className="flex flex-col gap-3">
              {[
                { no: "01", score: "30pt", icon: "💡", label: "業務への理解度", body: "3 年間ロードマップ策定の必要性を理解。①〜④の段階的な実現計画を具体的に提示" },
                { no: "02", score: "30pt", icon: "📈", label: "業務受託実績等", body: "AI・GIS・自治体防災領域の実績を根拠として提示" },
                { no: "03", score: "105pt", icon: "⚙️", label: "業務実施計画・手法等", body: "GIS × 生成 AI の技術統合、ハザードマップ多種対応、LLM 柔軟切替など詳細な実装手法を提案" },
                { no: "04", score: "35pt", icon: "👥", label: "業務実施体制", body: "防災専門知識を有する人材の参画を必須要件として充足（未充足で無効）" },
              ].map((c) => (
                <div key={c.no} className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 flex items-center gap-3 flex-1 shadow-sm">
                  <div className="bg-amber-500 text-white text-[15px] font-bold rounded-lg w-11 h-11 flex items-center justify-center flex-shrink-0">{c.no}</div>
                  <div className="w-11 h-11 rounded-lg bg-amber-100 flex items-center justify-center text-2xl flex-shrink-0">{c.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[17px] font-bold text-slate-800">{c.label}</span>
                    </div>
                    <div className="text-[12.5px] text-slate-600 leading-snug mt-0.5">{c.body}</div>
                  </div>
                  <div className="bg-amber-500 text-white text-[15px] font-bold rounded-lg px-3 py-1.5 flex-shrink-0">{c.score}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 flex-1 shadow-sm">
                <div className="font-bold text-rose-700 mb-1 flex items-center gap-2 text-[15px]">🚫 必須確認事項（未充足で無効）</div>
                <div className="text-[13px] text-slate-700 leading-relaxed">防災専門知識を有する人材の参画または助言体制を提案書に明確に示すこと</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex-1 shadow-sm">
                <div className="font-bold text-emerald-700 mb-1.5 flex items-center gap-2 text-[15px]">⭐ 高得点が狙えるポイント</div>
                <div className="text-[12.5px] text-slate-700 space-y-1">
                  <div>• 引継ぎ設計（※3 係数・15pt）：IaC + 標準 SQL</div>
                  <div>• 運用コスト抑制（※4 係数・20pt）：Snowflake 従量課金</div>
                  <div>• 生成 AI 進捗への柔軟性：モデル切替コスト最小化</div>
                </div>
              </div>
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 flex-1 shadow-sm">
                <div className="font-bold text-sky-700 mb-1 flex items-center gap-2 text-[15px]">💰 価格点（100pt）</div>
                <div className="text-[13px] text-slate-700 leading-relaxed">入札書には消費税抜き（契約希望金額の 110 分の 100）を記入。運用コスト最適化で価格競争力も訴求</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#c2410c] to-[#ea580c] text-white px-7 py-3.5 flex items-center gap-5">
            <span className="text-[15px] font-bold whitespace-nowrap flex items-center gap-1.5">🏆 高評価のポイント</span>
            <div className="grid grid-cols-3 gap-5 flex-1">
              {[
                { title: "段階的かつ現実的な計画", text: "3 年間のロードマップを具体的に提示" },
                { title: "技術力と実績の裏付け", text: "AI・GIS・防災領域の実績を明確に提示" },
                { title: "体制とコストの最適化", text: "専門人材の確保と持続可能な運用提案" },
              ].map((d) => (
                <div key={d.title} className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0 mt-0.5">✅</span>
                  <div>
                    <div className="text-[13px] font-bold leading-tight">{d.title}</div>
                    <div className="text-[11.5px] text-orange-100 leading-snug mt-0.5">{d.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      script: [
        "総合評価での強みです。技術点200点の内訳に沿って訴求します。",
        "業務理解30点、業務受託実績30点、業務実施計画・手法105点、業務実施体制35点。特に配点の大きい実施計画では、GISと生成AIの統合、ハザードマップ多種対応、LLMの柔軟な切替を詳細に提案します。",
        "防災専門知識を有する人材の参画は、未充足だと無効になる必須要件のため確実に満たします。引継ぎ設計・運用コスト抑制・モデル切替といった係数加点や、価格点100点も意識した提案とします。",
      ],
    },
    {
      label: "弱み・留意点",
      node: (
        <div className="h-full bg-slate-50 flex flex-col">
          <div className="bg-gradient-to-r from-[#9f1239] via-[#b91c3c] to-[#be123c] text-white px-9 py-5 flex items-center justify-between">
            <div className="flex items-stretch gap-4">
              <div className="w-1.5 rounded-full bg-rose-300" />
              <div>
                <div className="text-[13px] text-rose-200 font-semibold uppercase tracking-[0.3em]">Risk &amp; Mitigation</div>
                <h2 className="text-[30px] font-bold leading-tight mt-0.5">総合評価での弱み — ロックインリスクと対策</h2>
              </div>
            </div>
            <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center text-3xl flex-shrink-0">🔒</div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-5 px-7 py-5 min-h-0">
            {/* Left: lock-in elements */}
            <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-4 flex flex-col">
              <div className="font-bold text-rose-700 text-[15px] mb-3 flex items-center gap-2">⚠️ ロックイン要素（リスク）</div>
              <div className="flex-1 flex flex-col gap-2.5">
                {[
                  { no: "01", icon: "🔒", title: "独自 SQL 関数", body: "SNOWFLAKE.CORTEX.COMPLETE / SEARCH は Snowflake 専用構文。他 DB にそのまま移植不可。" },
                  { no: "02", icon: "📦", title: "ベクトルインデックス非可搬", body: "Cortex Search のインデックスは Snowflake 内に閉じており、標準フォーマットでのエクスポートは不可。" },
                  { no: "03", icon: "🧩", title: "SPCS は Snowflake 基盤前提", body: "コンテナ実行環境が Snowflake に依存。Kubernetes への移行には再設計が必要。ただし Next.js コンテナ自体は AKS・ECS・Cloud Run 等への移植が容易。" },
                  { no: "04", icon: "💰", title: "コスト予測の難しさ", body: "LLM トークン消費量はクエリ内容次第で変動し、Snowflake クレジット超過のリスクがある。" },
                ].map((r) => (
                  <div key={r.no} className="bg-white border border-rose-100 rounded-xl p-2.5 flex gap-3 items-start flex-1 shadow-sm">
                    <span className="bg-rose-500 text-white text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">{r.no}</span>
                    <span className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center text-lg flex-shrink-0">{r.icon}</span>
                    <div>
                      <div className="font-bold text-rose-700 text-[14px]">{r.title}</div>
                      <div className="text-[12px] text-slate-600 mt-0.5 leading-snug">{r.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: migration alternatives */}
            <div className="bg-sky-50/50 border border-sky-200 rounded-2xl p-4 flex flex-col">
              <div className="font-bold text-sky-800 text-[15px] mb-3 flex items-center gap-2">🔄 移行先の選択肢（CORTEX SEARCH 代替）</div>
              <div className="flex-1 flex flex-col gap-3">
                {[
                  {
                    name: "AWS", badge: "bg-orange-500", border: "border-orange-200",
                    items: [
                      ["Bedrock Knowledge Bases", "RAG パイプラインをフルマネージドで提供。移行コスト低"],
                      ["pgvector on Aurora", "PostgreSQL 互換。SQL ほぼそのまま移行可"],
                      ["OpenSearch Service", "全文検索 + ベクトル検索。移行コスト中〜高"],
                    ],
                  },
                  {
                    name: "GCP", badge: "bg-blue-600", border: "border-blue-200",
                    items: [
                      ["Vertex AI Search", "エンタープライズ向けマネージド RAG。移行コスト低〜中"],
                      ["AlloyDB + pgvector", "PostgreSQL 互換。SQL 移行性が高い"],
                      ["Vertex AI Vector Search", "大規模ベクトル専用。移行コスト中"],
                    ],
                  },
                  {
                    name: "Azure", badge: "bg-sky-500", border: "border-sky-200",
                    items: [
                      ["Azure AI Search", "エンタープライズ向けマネージド RAG・ベクトル検索。移行コスト低〜中"],
                      ["Azure Database for PostgreSQL + pgvector", "PostgreSQL 互換。SQL 移行性が高い"],
                      ["Azure OpenAI Service", "LLM 呼出し先の移行先として最適。抽象化レイヤー経由で切替容易"],
                    ],
                  },
                ].map((p) => (
                  <div key={p.name} className={`bg-white border ${p.border} rounded-xl p-3 flex-1 shadow-sm`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`${p.badge} text-white text-[11px] font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0`}>{p.name === "AWS" ? "aws" : p.name === "GCP" ? "GCP" : "Azure"}</span>
                      <span className="text-[17px] font-bold text-slate-800">{p.name}</span>
                    </div>
                    <div className="space-y-1 text-[12px] text-slate-600">
                      {p.items.map(([k, v]) => (
                        <div key={k}>• <span className="font-semibold text-slate-700">{k}</span> — {v}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom: countermeasures */}
          <div className="bg-slate-100 border-t border-slate-200 px-7 py-3.5 flex items-center gap-5">
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xl">🎯</span>
              <span className="text-[14px] font-bold text-slate-700 leading-tight">対策方針<br /><span className="text-[11px] font-normal text-slate-500">（提案に明記）</span></span>
            </div>
            <div className="grid grid-cols-3 gap-5 flex-1">
              {[
                "LLM 呼出しを抽象化レイヤーで分離し、モデル・基盤切替コストを最小化",
                "標準 SQL + IaC でインフラをコード管理し、引継ぎ容易性を確保",
                "Snowflake の Tokyo リージョン・学習利用不可設定でデータガバナンスを担保",
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="bg-rose-600 text-white text-[10px] font-bold rounded-md w-6 h-6 flex items-center justify-center flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[12px] text-slate-700 leading-snug">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      script: [
        "弱みも正直にお示しします。Snowflake へのロックインリスクです。",
        "Cortex の独自SQL関数やベクトルインデックスは他DBへ移植しにくく、SPCS も Snowflake 基盤が前提です。さらにトークン消費量に応じてコストが変動します。",
        "対策として、移行先は AWS の Bedrock や GCP の Vertex AI Search 等を整理済みです。LLM 呼出しを抽象化レイヤーで分離して切替コストを下げ、標準SQL＋IaC で引継ぎ容易性を確保し、東京リージョン・学習利用不可設定でデータガバナンスを担保します。",
      ],
    },
    {
      label: "まとめ",
      node: (
        <div className="h-full bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center text-white text-center px-12 space-y-6">
          <div className="text-slate-300 text-xs font-semibold tracking-widest uppercase">Summary</div>
          <h2 className="text-2xl font-bold">Snowflake × ArcGIS で実現する<br />次世代の図上訓練支援</h2>
          <div className="grid grid-cols-2 gap-3 w-full max-w-2xl text-left">
            {[
              { icon: "🤖", title: "AI 機能群（①）", body: "計画書との整合性チェック・シナリオ生成を自動化" },
              { icon: "📝", title: "文書作成（②）", body: "AI 提案付きエディタで計画書を常に最新状態に" },
              { icon: "🗺️", title: "被害予想シミュ（③）", body: "条件設定 → 地図リアルタイム可視化（津波・噴火・洪水）" },
              { icon: "🧭", title: "判断支援（④）", body: "情報統合 + AI 推奨アクションで迅速な意思決定" },
            ].map((c) => (
              <div key={c.title} className="bg-white/10 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span>{c.icon}</span>
                  <span className="font-semibold text-sm">{c.title}</span>
                </div>
                <div className="text-slate-300 text-xs">{c.body}</div>
              </div>
            ))}
          </div>
          <div className="text-slate-400 text-sm">令和8年10月末納品 → 令和9年1月 図上訓練実証 → 3 年間で段階的に拡充</div>
        </div>
      ),
      script: [
        "まとめです。Snowflake と ArcGIS の組み合わせで、次世代の図上訓練支援を実現します。",
        "AI機能群・文書作成・被害予想シミュレーション・判断支援の4機能で、災害対応の精度とスピードを高めます。",
        "令和8年10月末に納品し、令和9年1月の図上訓練で実証、その後3年間で段階的に拡充していきます。本日のご説明は以上です。",
      ],
    },
    // ── アーキテクチャ詳細スライドを末尾に連結 ──
    ...buildArchSlides(),
  ];
}

function SlideViewer({ slides, idx, setIdx }: { slides: Slide[]; idx: number; setIdx: (i: number) => void }) {
  return (
    <div>
      <SlideCanvas
        overlay={
            <>
              <button
                onClick={() => setIdx(Math.max(0, idx - 1))}
                disabled={idx === 0}
                aria-label="前のスライド"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/35 text-white text-xl flex items-center justify-center backdrop-blur-sm hover:bg-black/55 disabled:opacity-0 disabled:cursor-default transition-all"
              >
                ‹
              </button>
              <button
                onClick={() => setIdx(Math.min(slides.length - 1, idx + 1))}
                disabled={idx === slides.length - 1}
                aria-label="次のスライド"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/35 text-white text-xl flex items-center justify-center backdrop-blur-sm hover:bg-black/55 disabled:opacity-0 disabled:cursor-default transition-all"
              >
                ›
              </button>
            </>
          }
        >
        {slides[idx].node}
      </SlideCanvas>
      {/* ページネーション: canvas外に配置して重なりを防ぐ */}
      <div className="flex items-center justify-center gap-3 bg-slate-800 rounded-b-xl px-3 py-2">
        <div className="flex gap-1.5 items-center">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              title={s.label}
              aria-label={s.label}
              className={`rounded-full transition-all duration-150 ${
                i === idx ? "bg-white w-5 h-2" : "bg-white/45 w-2 h-2 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] font-medium tabular-nums text-white border-l border-white/30 pl-2.5">
          {idx + 1} / {slides.length}
        </span>
      </div>
    </div>
  );
}

function Slides({
  idx,
  setIdx,
  showScript: controlledShowScript,
  setShowScript: controlledSetShowScript,
}: {
  idx: number;
  setIdx: (i: number) => void;
  showScript?: boolean;
  setShowScript?: (v: boolean) => void;
}) {
  const [internalShowScript, setInternalShowScript] = useState(false);
  const showScript = controlledShowScript ?? internalShowScript;
  const setShowScript = controlledSetShowScript ?? setInternalShowScript;
  const slides = buildSlides();
  const current = slides[idx];
  const lines = current.script ?? [];
  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-[#0b1f3a] via-[#13315c] to-[#1c3d6e] text-white rounded-xl p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sky-200 text-xs font-semibold mb-1">提案プレゼンテーション</div>
            <h3 className="font-bold text-base truncate">東京の災害対応力の向上に向けた 生成AI を活用した図上訓練構築支援委託</h3>
          </div>
          <button
            onClick={() => setShowScript(!showScript)}
            aria-pressed={showScript}
            className={`flex-shrink-0 flex items-center gap-1.5 text-[12px] font-bold px-3.5 py-2 rounded-lg border transition ${showScript ? "bg-white text-[#13315c] border-white" : "bg-white/15 text-white border-white/40 hover:bg-white/25"}`}
          >
            <span>🗣️</span>
            <span>{showScript ? "台本を隠す" : "台本を表示"}</span>
          </button>
        </div>
      </div>

      <div className={showScript ? "grid lg:grid-cols-[1.5fr_1fr] gap-4 items-start" : ""}>
        <SlideViewer slides={slides} idx={idx} setIdx={setIdx} />

        {showScript && (
          <div className="bg-white border border-sky-200 rounded-xl shadow-sm flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-sky-100 bg-sky-50/60 rounded-t-xl">
              <span className="text-[12px] font-bold text-sky-700 bg-white border border-sky-200 rounded-full px-2.5 py-0.5 tabular-nums">{idx + 1} / {slides.length}</span>
              <span className="text-[13px] font-bold text-slate-700">{current.label}</span>
            </div>
            <div className="p-4 space-y-2 flex-1">
              <div className="text-[11px] font-semibold text-sky-600 flex items-center gap-1">🗣️ このスライドの台本</div>
              {lines.length > 0 ? (
                lines.map((l, i) => (
                  <p key={i} className="text-[12.5px] text-gray-700 leading-relaxed bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">{l}</p>
                ))
              ) : (
                <p className="text-[12px] text-slate-400">（このスライドの台本は未設定です）</p>
              )}
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-sky-100">
              <button
                onClick={() => setIdx(Math.max(0, idx - 1))}
                disabled={idx === 0}
                className="text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-default transition"
              >
                ‹ 前へ
              </button>
              <button
                onClick={() => setIdx(Math.min(slides.length - 1, idx + 1))}
                disabled={idx === slides.length - 1}
                className="text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-40 disabled:cursor-default transition"
              >
                次へ ›
              </button>
            </div>
          </div>
        )}
      </div>

      <GlossarySection terms={["図上訓練", "RAG（Retrieval-Augmented Generation）", "Cortex AI", "ArcGIS Maps SDK for JavaScript", "PLATEAU", "ハザードマップ"]} />
    </div>
  );
}

function buildProposalSlides(): Slide[] {
  return [
    {
      label: "表紙",
      node: (
        <div className="h-full bg-gradient-to-br from-[#0a1f44] via-[#11357a] to-[#0a2a6b] text-white flex flex-col justify-center px-14 relative overflow-hidden">
          <div className="absolute -top-6 right-8 text-white/10 text-[170px] leading-none select-none pointer-events-none">🗼</div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-4 py-1.5 text-[13px] font-bold mb-6">企画提案書</div>
            <h1 className="text-[40px] font-bold leading-tight mb-4">東京の災害対応力の向上に向けた<br />生成AI を活用した図上訓練構築支援</h1>
            <p className="text-sky-100 text-[16px] mb-10 max-w-[80%]">過去資料を活かした RAG 検索と地理空間可視化による、実践的な訓練シナリオ生成基盤のご提案</p>
            <div className="flex items-center gap-3 text-[13px] text-white/85">
              <span className="bg-white/10 border border-white/25 rounded-lg px-3 py-1.5">提案：株式会社野村総合研究所</span>
              <span className="bg-white/10 border border-white/25 rounded-lg px-3 py-1.5">2026年</span>
            </div>
          </div>
        </div>
      ),
      script: ["表紙です。本提案は、東京都の災害対応力向上に向けて、生成AIを活用した図上訓練の構築を支援するものです。"],
    },
    {
      label: "背景と課題",
      node: (
        <SlideShell tag="背景" accent="rose" title="背景と課題" subtitle="従来の図上訓練が抱える3つの構造的課題">
          <div className="h-full grid grid-cols-3 gap-5 text-[12px]">
            {[
              { icon: "📚", t: "過去資料の死蔵", d: "訓練記録・マニュアル・過去シナリオが部署や紙に分散し、十分に再利用されていない。" },
              { icon: "🧑‍🏫", t: "シナリオ作成の属人化", d: "質の高い訓練シナリオの作成が一部の熟練職員に依存し、作成工数も大きい。" },
              { icon: "🗺️", t: "地理空間情報との分断", d: "被害想定やハザード情報が地図と訓練シナリオで連動せず、現場の実感に結びつきにくい。" },
            ].map((c) => (
              <div key={c.t} className="bg-white border border-rose-200 rounded-xl p-5 flex flex-col shadow-sm">
                <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-[24px] mb-3">{c.icon}</div>
                <div className="font-bold text-slate-800 text-[15px] mb-2">{c.t}</div>
                <p className="text-slate-600 leading-relaxed text-[12px]">{c.d}</p>
              </div>
            ))}
          </div>
        </SlideShell>
      ),
      script: ["従来の図上訓練には、過去資料の死蔵、シナリオ作成の属人化、地理空間情報との分断という3つの構造的な課題があります。"],
    },
    {
      label: "ご提案の全体像",
      node: (
        <SlideShell tag="提案概要" accent="indigo" title="ご提案の全体像" subtitle="過去資料 → RAG 検索 → シナリオ生成 → 地図連動を一気通貫で支援">
          <div className="h-full flex flex-col justify-center gap-6">
            <div className="border-2 border-indigo-200 bg-indigo-50/40 rounded-xl p-5 overflow-x-auto">
              <FlowLane
                accent="sky"
                nodes={[
                  { icon: "📚", bg: "bg-slate-500", title: "過去資料", sub: "マニュアル/訓練記録/ハザード", arrow: "取込・索引" },
                  { icon: "🔎", bg: "bg-emerald-600", title: "Cortex Search", sub: "ハイブリッド検索", snow: true, arrow: "文脈付与" },
                  { icon: "🧠", bg: "bg-indigo-600", title: "シナリオ生成", sub: "AI_COMPLETE", snow: true, arrow: "地図連動" },
                  { icon: "🗺️", bg: "bg-rose-500", title: "地図可視化", sub: "ArcGIS Maps SDK", arrow: null },
                ]}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-[12px]">
              {[
                { t: "蓄積を資産化", d: "散在する過去資料を検索可能な知識基盤へ" },
                { t: "誰でも高品質", d: "熟練者の知見を AI が再現しシナリオ化" },
                { t: "地図で実感", d: "被害想定を地図上に重ね、訓練を立体化" },
              ].map((c) => (
                <div key={c.t} className="bg-white border border-slate-200 rounded-lg px-4 py-3">
                  <div className="font-bold text-indigo-700 text-[13px] mb-1">{c.t}</div>
                  <div className="text-slate-600 leading-snug">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </SlideShell>
      ),
      script: ["全体像です。過去資料を取り込んで索引化し、Cortex Search で検索、AIでシナリオを生成し、ArcGISで地図に連動させる一気通貫の基盤をご提案します。"],
    },
    {
      label: "ソリューションの特長",
      node: (
        <SlideShell tag="特長" accent="teal" title="ソリューションの3つの特長" subtitle="マネージドAI × 地理空間 × 行政グレードのセキュリティ">
          <div className="h-full grid grid-cols-3 gap-5 text-[12px]">
            {[
              { icon: "⚙️", t: "運用負荷の小さいマネージド RAG", d: "Cortex Search が索引作成・更新・スケーリングを自動管理。専用インフラ不要で運用コストを最小化します。", bd: "border-emerald-200" },
              { icon: "🗺️", t: "地理空間との統合可視化", d: "ArcGIS Maps SDK と PLATEAU により、被害想定や避難経路を 2D/3D 地図で表現。シナリオと地図を連動させます。", bd: "border-sky-200" },
              { icon: "🛡️", t: "行政グレードのセキュリティ", d: "RBAC・IP制限・学習オプトアウト・国内リージョン暗号化・監査ログを標準機能で実現します。", bd: "border-violet-200" },
            ].map((c) => (
              <div key={c.t} className={"bg-white border rounded-xl p-5 flex flex-col shadow-sm " + c.bd}>
                <div className="text-[30px] mb-2">{c.icon}</div>
                <div className="font-bold text-slate-800 text-[14px] mb-2 leading-snug">{c.t}</div>
                <p className="text-slate-600 leading-relaxed flex-1">{c.d}</p>
              </div>
            ))}
          </div>
        </SlideShell>
      ),
      script: ["特長は3つです。運用負荷の小さいマネージドRAG、地理空間との統合可視化、そして行政グレードのセキュリティです。"],
    },
    {
      label: "期待効果",
      node: (
        <SlideShell tag="効果" accent="violet" title="期待される効果" subtitle="作成工数の削減と、訓練の質・実効性の向上">
          <div className="h-full grid grid-cols-3 gap-5 text-center">
            {[
              { m: "大幅削減", l: "シナリオ作成工数", d: "過去資料の検索・下書き生成を AI が支援" },
              { m: "標準化", l: "訓練品質のばらつき", d: "熟練者依存を解消し、一定品質を担保" },
              { m: "立体化", l: "訓練のリアリティ", d: "地図・被害想定との連動で実感を向上" },
            ].map((c) => (
              <div key={c.l} className="bg-violet-50 border border-violet-200 rounded-xl p-5 flex flex-col justify-center">
                <div className="text-[24px] font-bold text-violet-700 mb-2">{c.m}</div>
                <div className="font-bold text-slate-800 text-[13px] mb-1">{c.l}</div>
                <div className="text-slate-600 text-[11px] leading-snug">{c.d}</div>
              </div>
            ))}
          </div>
        </SlideShell>
      ),
      script: ["期待効果です。シナリオ作成工数の削減、訓練品質の標準化、そして地図連動による訓練のリアリティ向上が見込まれます。"],
    },
    {
      label: "実施体制・スケジュール",
      node: (
        <SlideShell tag="体制" accent="blue" title="実施体制とスケジュール" subtitle="段階的に構築し、早期に価値を提供">
          <div className="h-full flex flex-col justify-center gap-5">
            <div className="grid grid-cols-4 gap-3 text-[11.5px]">
              {[
                { p: "Phase 1", t: "基盤構築", d: "資料取込・Cortex Search 索引・基本チャット", c: "bg-blue-50 border-blue-200 text-blue-700" },
                { p: "Phase 2", t: "シナリオ生成", d: "ラベル付け・シナリオ生成・整合性チェック", c: "bg-sky-50 border-sky-200 text-sky-700" },
                { p: "Phase 3", t: "地図連動", d: "ArcGIS 可視化・被害想定の重ね合わせ", c: "bg-teal-50 border-teal-200 text-teal-700" },
                { p: "Phase 4", t: "運用定着", d: "ユーザー教育・運用設計・改善", c: "bg-emerald-50 border-emerald-200 text-emerald-700" },
              ].map((x) => (
                <div key={x.p} className={"border rounded-xl p-3 " + x.c}>
                  <div className="font-bold text-[12px] mb-1">{x.p}</div>
                  <div className="font-bold text-slate-800 text-[12.5px] mb-1">{x.t}</div>
                  <div className="text-slate-600 text-[10.5px] leading-snug">{x.d}</div>
                </div>
              ))}
            </div>
            <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-[11.5px] text-slate-600 flex items-center gap-3">
              <span className="font-bold text-slate-700 flex-shrink-0">推進体制：</span>
              <span>PM ＋ AI/データエンジニア ＋ GIS スペシャリスト ＋ 都庁ご担当者による協働体制。各フェーズでレビューゲートを設置します。</span>
            </div>
          </div>
        </SlideShell>
      ),
      script: ["実施体制とスケジュールです。基盤構築・シナリオ生成・地図連動・運用定着の4フェーズで段階的に構築し、早期から価値を提供します。"],
    },
    {
      label: "なぜ当社か",
      node: (
        <SlideShell tag="強み" accent="orange" title="なぜ当社にお任せいただけるか" subtitle="Snowflake・生成AI・GIS の実装知見を一気通貫で提供">
          <div className="h-full grid grid-cols-3 gap-5 text-[12px]">
            {[
              { icon: "❄️", t: "Snowflake 実装力", d: "Cortex AI・データ基盤の構築実績と、マネージドRAGの設計ノウハウ。" },
              { icon: "🗺️", t: "地理空間の専門性", d: "ArcGIS / PLATEAU を用いた可視化・被害想定シミュレーションの知見。" },
              { icon: "🏛️", t: "行政案件の知見", d: "セキュリティ・調達要件を踏まえた、行政グレードの開発・運用体制。" },
            ].map((c) => (
              <div key={c.t} className="bg-white border border-orange-200 rounded-xl p-5 flex flex-col shadow-sm">
                <div className="text-[30px] mb-2">{c.icon}</div>
                <div className="font-bold text-slate-800 text-[14px] mb-2">{c.t}</div>
                <p className="text-slate-600 leading-relaxed flex-1">{c.d}</p>
              </div>
            ))}
          </div>
        </SlideShell>
      ),
      script: ["最後に、当社の強みです。Snowflakeの実装力、地理空間の専門性、行政案件の知見を一気通貫でご提供できる点が、当社にお任せいただける理由です。"],
    },
  ];
}

function ProposalDeck({
  idx,
  setIdx,
  showScript,
  setShowScript,
}: {
  idx: number;
  setIdx: (i: number) => void;
  showScript: boolean;
  setShowScript: (v: boolean) => void;
}) {
  const slides = buildProposalSlides();
  const safeIdx = Math.min(idx, slides.length - 1);
  const current = slides[safeIdx];
  const lines = current.script ?? [];
  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-[#3a0b2e] via-[#5c1346] to-[#6e1c3d] text-white rounded-xl p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-pink-200 text-xs font-semibold mb-1">📝 提案書スライド（デザイン検討用ドラフト）</div>
            <h3 className="font-bold text-base truncate">東京都庁 図上訓練構築支援 ― 企画提案書</h3>
          </div>
          <button
            onClick={() => setShowScript(!showScript)}
            aria-pressed={showScript}
            className={`flex-shrink-0 flex items-center gap-1.5 text-[12px] font-bold px-3.5 py-2 rounded-lg border transition ${showScript ? "bg-white text-[#6e1c3d] border-white" : "bg-white/15 text-white border-white/40 hover:bg-white/25"}`}
          >
            <span>🗣️</span>
            <span>{showScript ? "台本を隠す" : "台本を表示"}</span>
          </button>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-[12px] text-amber-800 flex items-center gap-2">
        <span>🎨</span>
        <span>このタブは提案書スライドの<span className="font-semibold">デザイン検討用</span>です。構成・配色・文言はこれからブラッシュアップしていきます。ご要望をお知らせください。</span>
      </div>

      <div className={showScript ? "grid lg:grid-cols-[1.5fr_1fr] gap-4 items-start" : ""}>
        <SlideViewer slides={slides} idx={safeIdx} setIdx={setIdx} />

        {showScript && (
          <div className="bg-white border border-rose-200 rounded-xl shadow-sm flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-rose-100 bg-rose-50/60 rounded-t-xl">
              <span className="text-[12px] font-bold text-rose-700 bg-white border border-rose-200 rounded-full px-2.5 py-0.5 tabular-nums">{safeIdx + 1} / {slides.length}</span>
              <span className="text-[13px] font-bold text-slate-700">{current.label}</span>
            </div>
            <div className="p-4 space-y-2 flex-1">
              <div className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">🗣️ このスライドの台本</div>
              {lines.length > 0 ? (
                lines.map((l, i) => (
                  <p key={i} className="text-[12.5px] text-gray-700 leading-relaxed bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">{l}</p>
                ))
              ) : (
                <p className="text-[12px] text-slate-400">（このスライドの台本は未設定です）</p>
              )}
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-rose-100">
              <button
                onClick={() => setIdx(Math.max(0, safeIdx - 1))}
                disabled={safeIdx === 0}
                className="text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-default transition"
              >
                ‹ 前へ
              </button>
              <button
                onClick={() => setIdx(Math.min(slides.length - 1, safeIdx + 1))}
                disabled={safeIdx === slides.length - 1}
                className="text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-40 disabled:cursor-default transition"
              >
                次へ ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type ArchSlide = { label: string; node: React.ReactNode; script: string[] };

function SlideShell({ tag, title, subtitle, accent = "indigo", children }: { tag: string; title: string; subtitle?: string; accent?: string; children: React.ReactNode }) {
  const grad: Record<string, string> = {
    indigo: "from-indigo-600 to-blue-600",
    slate: "from-slate-700 to-slate-600",
    teal: "from-teal-600 to-emerald-600",
    violet: "from-violet-600 to-fuchsia-600",
    blue: "from-blue-600 to-cyan-600",
    rose: "from-rose-600 to-orange-500",
    sky: "from-sky-600 to-indigo-600",
    orange: "from-orange-500 to-amber-500",
  };
  return (
    <div className="h-full bg-slate-50 flex flex-col">
      <div className={"bg-gradient-to-r text-white px-10 py-5 flex items-center gap-4 flex-shrink-0 " + (grad[accent] ?? grad.indigo)}>
        <span className="text-[12px] font-bold bg-white/20 border border-white/30 rounded-lg px-2.5 py-1 tracking-wider whitespace-nowrap">{tag}</span>
        <div className="min-w-0">
          <h2 className="text-[25px] font-bold leading-tight">{title}</h2>
          {subtitle ? <p className="text-white/85 text-[13px] mt-0.5">{subtitle}</p> : null}
        </div>
      </div>
      <div className="flex-1 px-10 py-5 min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}

function SnowflakeRagPlatformComparison({ compact = false }: { compact?: boolean }) {
  const platforms = [
    {
      id: "snowflake",
      name: "Snowflake Cortex",
      badge: "採用",
      badgeCls: "bg-sky-600 text-white",
      border: "border-sky-500 ring-2 ring-sky-300",
      headerBg: "bg-gradient-to-br from-sky-600 to-sky-800 text-white",
      stack: ["Stage / Directory Table", "PARSE_DOCUMENT → CHUNKS", "Cortex Search（索引）", "COMPLETE（生成）", "SPCS（Next.js BFF）"],
      stackNote: "1 プラットフォーム・1 権限体系",
    },
    {
      id: "azure",
      name: "Azure RAG",
      badge: "比較",
      badgeCls: "bg-slate-500 text-white",
      border: "border-slate-300",
      headerBg: "bg-gradient-to-br from-[#0078d4] to-[#005a9e] text-white",
      stack: ["Blob / SharePoint", "Document Intelligence", "Azure AI Search", "Azure OpenAI", "App Service / Functions"],
      stackNote: "5+ サービス横断・Entra ID 連携",
    },
    {
      id: "aws",
      name: "AWS RAG",
      badge: "比較",
      badgeCls: "bg-slate-500 text-white",
      border: "border-slate-300",
      headerBg: "bg-gradient-to-br from-[#ff9900] to-[#cc7a00] text-white",
      stack: ["S3", "Textract / Lambda 前処理", "OpenSearch または Bedrock KB", "Bedrock（Claude 等）", "Lambda + API GW / App Runner"],
      stackNote: "5+ サービス横断・IAM 設計",
    },
  ];

  const rows: { label: string; snow: string; azure: string; aws: string; snowWin?: boolean }[] = [
    {
      label: "RAG パイプライン",
      snow: "文書取込〜チャンク〜索引〜生成が同一 DB 内。SQL / IaC で一気通貫",
      azure: "Blob 取込 → AI Search indexer + skillset → OpenAI。設定がサービスごとに分散",
      aws: "S3 → ingestion job → KB / OpenSearch → Bedrock。パイプライン部品が多い",
      snowWin: true,
    },
    {
      label: "検索（Retrieval）",
      snow: "Cortex Search：ベクトル＋キーワード＋再ランクをマネージド。CREATE SERVICE のみ",
      azure: "Azure AI Search：高精度だが index・skillset・スキーマを自前設計",
      aws: "Bedrock KB（マネージド）または OpenSearch（チューニング・運用が必要）",
      snowWin: true,
    },
    {
      label: "3 機能の索引共有",
      snow: "チャット・整合性・シナリオが DOC_SEARCH を共用。開発・保守が 1 基盤",
      azure: "機能ごとに index 分割 or フィルタ設計。横断再利用は設計次第",
      aws: "KB / index を機能別に分けると重複取込・同期コスト増",
      snowWin: true,
    },
    {
      label: "セキュリティ・監査",
      snow: "RBAC・Network Policy・ACCESS_HISTORY がデータと AI で一貫",
      azure: "Entra ID + Key Vault + 各 PaaS の RBAC を横断設計",
      aws: "IAM + KMS + CloudTrail をサービスごとに束ねる設計",
      snowWin: true,
    },
    {
      label: "国内リージョン",
      snow: "東京リージョン（ap-northeast-1）で Cortex 利用可。学習オプトアウト標準",
      azure: "Japan East 利用可。OpenAI はリージョン・モデル制約に注意",
      aws: "ap-northeast-1 利用可。Bedrock モデルはリージョン差あり",
    },
    {
      label: "LLM 中立性",
      snow: "COMPLETE のモデル名差替で複数 LLM。SQL 抽象化で切替容易",
      azure: "Azure OpenAI 中心。他モデルは追加連携が必要",
      aws: "Bedrock は複数モデル。ただし KB / OpenSearch 側は別管理",
      snowWin: true,
    },
    {
      label: "運用・引継ぎ",
      snow: "Terraform + snow sql で DB/Role/Search をコード管理。1 リポジトリ",
      azure: "Bicep/Terraform が Search・OpenAI・Storage で分散",
      aws: "CDK/Terraform が S3・OpenSearch・Bedrock・Lambda で分散",
      snowWin: true,
    },
    {
      label: "本案件との相性",
      snow: "◎ Next.js BFF + 庁内 GIS 分離と整合。文書 RAG に特化",
      azure: "△ M365 / SharePoint 連携が主戦場の構成に寄りやすい",
      aws: "△ AWS 全般向け。GIS（Enterprise）は別系統で同様",
    },
  ];

  const fs = compact ? "text-[9px]" : "text-[10.5px]";
  const headerFs = compact ? "text-[10px]" : "text-[11px]";

  return (
    <div className={`space-y-2 ${fs}`}>
      {/* 3 プラットフォームのスタック */}
      <div className="grid grid-cols-3 gap-2">
        {platforms.map((p) => (
          <div key={p.id} className={`rounded-xl border overflow-hidden ${p.border} ${p.id === "snowflake" ? "shadow-md" : ""}`}>
            <div className={`${p.headerBg} px-2.5 py-1.5 flex items-center justify-between gap-1`}>
              <span className={`font-bold ${compact ? "text-[11px]" : "text-[12px]"}`}>{p.name}</span>
              <span className={`${p.badgeCls} text-[8px] font-bold rounded px-1.5 py-0.5`}>{p.badge}</span>
            </div>
            <div className={`p-2 space-y-0.5 ${p.id === "snowflake" ? "bg-sky-50/60" : "bg-slate-50"}`}>
              {p.stack.map((s, i) => (
                <div key={s} className="flex items-stretch gap-1">
                  {i > 0 ? <span className="text-slate-300 text-[8px] w-3 text-center flex-shrink-0">↓</span> : <span className="w-3 flex-shrink-0" />}
                  <div className={`flex-1 border rounded px-1.5 py-0.5 ${p.id === "snowflake" ? "bg-white border-sky-200 text-sky-900" : "bg-white border-slate-200 text-slate-700"}`}>
                    {s}
                  </div>
                </div>
              ))}
              <div className={`text-[7.5px] mt-1 text-center font-semibold ${p.id === "snowflake" ? "text-sky-700" : "text-slate-500"}`}>{p.stackNote}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 比較表 */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className={`grid grid-cols-[88px_1fr_1fr_1fr] gap-px bg-slate-200 ${headerFs} font-bold`}>
          <div className="bg-slate-100 px-2 py-1.5 text-slate-600">観点</div>
          <div className="bg-sky-100 px-2 py-1.5 text-sky-800 text-center">❄️ Snowflake</div>
          <div className="bg-blue-50 px-2 py-1.5 text-blue-800 text-center">Azure</div>
          <div className="bg-orange-50 px-2 py-1.5 text-orange-800 text-center">AWS</div>
        </div>
        {rows.map((r) => (
          <div key={r.label} className={`grid grid-cols-[88px_1fr_1fr_1fr] gap-px bg-slate-100 ${fs}`}>
            <div className="bg-slate-50 px-2 py-1.5 font-semibold text-slate-700 flex items-center">{r.label}</div>
            <div className={`px-2 py-1.5 leading-snug flex items-start gap-1 ${r.snowWin ? "bg-sky-50/80 text-sky-900" : "bg-white text-slate-700"}`}>
              {r.snowWin ? <span className="text-emerald-600 flex-shrink-0 font-bold">✓</span> : null}
              <span>{r.snow}</span>
            </div>
            <div className="bg-white px-2 py-1.5 text-slate-600 leading-snug">{r.azure}</div>
            <div className="bg-white px-2 py-1.5 text-slate-600 leading-snug">{r.aws}</div>
          </div>
        ))}
      </div>

      <div className={`grid grid-cols-4 gap-1.5 ${compact ? "text-[8.5px]" : "text-[9.5px]"}`}>
        {[
          { t: "1 基盤完結", b: "取込・索引・生成・監査が Snowflake 内。サービス間連携設計が不要" },
          { t: "索引の使い回し", b: "3 AI 機能が同一 Cortex Search を共用し開発コスト最小" },
          { t: "行政セキュリティ", b: "東京 DC・学習不可・RBAC・監査ログを標準機能で一括" },
          { t: "引継ぎ容易", b: "SQL + IaC 1 本。Azure/AWS はマルチサービス Runbook が増える" },
        ].map((c) => (
          <div key={c.t} className="bg-emerald-50 border border-emerald-200 rounded-lg px-2 py-1.5">
            <div className="font-bold text-emerald-800">{c.t}</div>
            <div className="text-slate-600 leading-snug mt-0.5">{c.b}</div>
          </div>
        ))}
      </div>
      <p className={`text-center text-slate-500 ${compact ? "text-[7.5px]" : "text-[9px]"}`}>
        ※ Azure / AWS も優れた RAG は構築可能。本案件は「訓練文書 RAG + 庁内 GIS 分離 + 他事業者引継ぎ」で Snowflake 完結が最も合理的
      </p>
    </div>
  );
}

function buildArchSlides(): ArchSlide[] {
  return [
    {
      label: "構成の全体像",
      node: (
        <div className="h-full bg-white flex flex-col">
          <div className="relative bg-gradient-to-br from-[#0a1f44] via-[#11357a] to-[#0a2a6b] text-white px-10 pt-6 pb-6 overflow-hidden flex-shrink-0">
            <div className="absolute -top-6 right-6 text-white/10 text-[110px] leading-none select-none pointer-events-none">❄️</div>
            <div className="relative">
              <div className="text-sky-300 text-[12px] font-semibold tracking-[0.25em] uppercase mb-1.5">Architecture Overview</div>
              <h1 className="text-[30px] font-bold leading-tight">構成図 ― AI機能群を支える Snowflake RAG 基盤</h1>
              <p className="text-sky-100 text-[14px] mt-2">RAG は Snowflake Cortex 内で完結。地図は Pro → Portal → ArcGIS Enterprise。Next.js が統合</p>
            </div>
          </div>
          <div className="flex-1 px-9 py-4 flex flex-col justify-between gap-3 min-h-0">
            <div className="text-center text-[13px] text-slate-600">3つの AI 機能は、いずれも <span className="font-bold text-indigo-700">同じ Cortex Search の索引</span> を共有します</div>

            {/* 3 機能カード */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: "💬", t: "チャットボット", d: "自然言語で質問し、社内データや計画書から回答を生成", ring: "bg-blue-100", c: "border-blue-200 bg-blue-50/60" },
                { icon: "🛡️", t: "整合性チェック", d: "複数文書の矛盾や整合性を自動で検出・レポート出力", ring: "bg-rose-100", c: "border-rose-200 bg-rose-50/60" },
                { icon: "⚡", t: "シナリオ生成", d: "防災計画の前提条件から多様なシナリオを自動生成", ring: "bg-amber-100", c: "border-amber-200 bg-amber-50/60" },
              ].map((f) => (
                <div key={f.t} className={"border rounded-2xl p-4 " + f.c}>
                  <div className="flex items-center gap-3">
                    <div className={"w-10 h-10 rounded-xl flex items-center justify-center text-[19px] " + f.ring}>{f.icon}</div>
                    <div className="font-bold text-slate-800 text-[16px]">{f.t}</div>
                  </div>
                  <div className="text-[12px] text-slate-600 mt-2 leading-snug">{f.d}</div>
                  <div className="flex gap-2 mt-2.5">
                    <span className="inline-flex items-center gap-1 bg-white border border-slate-200 rounded-md px-2 py-0.5 text-[10px] font-semibold text-slate-600"><span className="text-emerald-600">🔍</span>Cortex Search</span>
                    <span className="inline-flex items-center gap-1 bg-white border border-slate-200 rounded-md px-2 py-0.5 text-[10px] font-semibold text-slate-600"><span className="text-indigo-600">✦</span>Cortex COMPLETE</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center text-slate-400 text-[12px] tracking-wide">▼ 共通基盤 ▲</div>

            {/* 共通基盤（緑ボックス・4本柱） */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl px-5 py-3.5 shadow-sm">
              <div className="text-center">
                <div className="text-[18px] font-bold flex items-center justify-center gap-2">❄️ Cortex Search ＋ Cortex COMPLETE</div>
                <div className="text-emerald-50 text-[12px] mt-0.5">ハイブリッド検索（ベクトル＋キーワード）と生成AIを統合提供</div>
              </div>
              <div className="grid grid-cols-4 gap-3 mt-3">
                {[
                  { icon: "🗄️", t: "共通索引", d: "全AI機能が同じ索引を共有し一貫した検索結果を提供" },
                  { icon: "🔍", t: "ハイブリッド検索", d: "ベクトル検索＋キーワード検索で高精度な検索を実現" },
                  { icon: "✦", t: "生成AI (Cortex COMPLETE)", d: "検索結果をもとに要約・分析・回答生成を実施" },
                  { icon: "🛡️", t: "セキュア & ガバナンス", d: "Snowflake内でデータガバナンス・アクセス制御を完結" },
                ].map((x) => (
                  <div key={x.t} className="bg-white/15 border border-white/25 rounded-xl px-3 py-2.5">
                    <div className="text-[17px]">{x.icon}</div>
                    <div className="font-bold text-[12px] mt-1 leading-tight">{x.t}</div>
                    <div className="text-emerald-50/90 text-[10px] mt-1 leading-snug">{x.d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* データフロー（5ステップ） */}
            <div className="flex items-stretch gap-1">
              {[
                { icon: "📑", t: "データソース", items: ["計画書 / 参考資料", "防災データ / 統計データ", "地図データ（ArcGIS）など"] },
                { icon: "☁️", t: "データ取り込み", items: ["ファイル取り込み", "テーブル連携", "ストリーミング連携"] },
                { icon: "❄️", t: "Snowflake データプラットフォーム", items: ["構造化 / 非構造化データを統合", "安全なデータ共有", "高い処理性能と拡張性"] },
                { icon: "🔍", t: "Cortex Search（共通索引）", items: ["埋め込み生成", "索引化", "ハイブリッド検索"] },
                { icon: "▲", t: "アプリケーション層（Next.js）", items: ["チャットボット", "整合性チェック", "シナリオ生成"] },
              ].map((s, i) => (
                <div key={s.t} className="contents">
                  {i > 0 ? <div className="flex items-center text-blue-400 text-[15px] font-bold px-0.5">→</div> : null}
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[14px]">{s.icon}</span>
                      <span className="font-bold text-slate-700 text-[10.5px] leading-tight">{s.t}</span>
                    </div>
                    <ul className="space-y-0.5 text-[9.5px] text-slate-600 leading-snug">
                      {s.items.map((it) => (<li key={it}>・{it}</li>))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      script: [
        "ここからは、AI機能群を支える技術構成をご説明します。チャットボット・整合性チェック・シナリオ生成の3機能は、いずれもRAGで動きます。",
        "ポイントは、3機能が同じ Cortex Search の索引を共有することです。検索基盤を1つにまとめることで、開発・保守コストを抑えながら複数機能を提供できます。",
        "そして文書の保存・テキスト化・検索・生成まで、すべて Snowflake 内で完結させ、データを外部に出さない構成とすることができます。",
      ],
    },
    {
      label: "システム全体構成",
      node: (
        <SlideShell tag="全体構成" accent="indigo" title="システム全体構成（フロントエンド / バックエンド）" subtitle="都職員 → フロントエンド（Next.js BFF）→ バックエンド（Snowflake）／ 地図は Portal + ArcGIS Enterprise（③のみ）">
          <div className="h-full flex flex-col justify-center py-1">
            <RuntimeArchDiagram />
            <div className="mt-2 flex-shrink-0 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-1 text-center text-[9.5px] text-indigo-800">
              フロント：HTTPS / SSE（BFF）｜ BFF→Snowflake：SQL ｜ ③ Maps SDK→Enterprise：REST③
            </div>
          </div>
        </SlideShell>
      ),
      script: [
        "全体構成は、フロントエンドとバックエンドを明確に分けて整理しています。フロントエンドは Next.js の BFF が担い、ブラウザから Snowflake や ArcGIS へ直接つながず、必ずサーバー側を経由します。資格情報をクライアントに露出しないための設計です。",
        "フロントエンドは4機能に対応した UI です。①②④は Next.js UI のみで、②の文書エディタや版管理に ArcGIS は不要です。ArcGIS Maps SDK は機能③の被害予想シミュ専用で、2D/3D 地図と Feature Layer 切替を担います。④は③の地図結果を埋め込んで統合表示します。",
        "バックエンドは Snowflake が担い、Cortex AI とデータ基盤で文書の保存・検索・生成を行います。Next.js BFF は SQL で Snowflake に接続し、機能③の地図は Portal for ArcGIS 経由の ArcGIS Enterprise（Hosted Feature Layer）を REST で参照します。GIS データは ArcGIS Pro で整備し、Portal に共有して Enterprise 上にホストします。Snowflake の GIS mart への格納と Enterprise への同期は、文書・業務データとの統合が必要になった Phase 2 以降の任意拡張です。",
        "右端の訓練文書は Snowflake に取り込み、地理空間データは Pro → Portal → Enterprise の流れで Feature Layer 化します。本番のホスティング先（SPCS 等）はデプロイ方式の話であり、論理構成上のフロント／バックの分離とは別です。開発時の接続は『構成図 › 開発環境』を参照してください。",
      ],
    },
    {
      label: "RAG 構築方式の選択",
      node: (
        <div className="h-full bg-white flex flex-col">
          <div className="relative bg-gradient-to-br from-[#0a1f44] via-[#11357a] to-[#0a2a6b] text-white px-9 pt-5 pb-5 overflow-hidden flex-shrink-0">
            <div className="absolute -top-4 right-7 text-white/10 text-[88px] leading-none select-none pointer-events-none">❄️</div>
            <div className="relative flex items-center gap-3">
              <span className="text-[12px] font-bold bg-white/20 border border-white/30 rounded-lg px-2.5 py-1 tracking-wider whitespace-nowrap">方式選択</span>
              <div className="min-w-0">
                <h2 className="text-[26px] font-bold leading-tight">Snowflake での RAG 構築方式 ― なぜ Cortex Search か</h2>
                <p className="text-sky-100 text-[13px] mt-1">マネージド・ハイブリッド検索（ベクトル＋キーワード＋再ランキング）で運用負荷と中立性を両立</p>
              </div>
            </div>
          </div>
          <div className="flex-1 px-9 py-3.5 flex flex-col gap-2.5 min-h-0">
            {/* 採用構成バー */}
            <div className="bg-emerald-50 border border-emerald-300 rounded-lg px-3 py-1.5 text-center text-[12.5px] font-bold text-emerald-800 flex-shrink-0 flex items-center justify-center gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center flex-shrink-0">✓</span>
              採用構成：マネージド RAG ＝ Cortex Search（検索）＋ Cortex COMPLETE / AISQL（生成）
            </div>

            {/* 2大カード */}
            <div className="grid grid-cols-2 gap-5 flex-1 min-h-0">
              {[
                {
                  badge: "🔍 検索", badgeBg: "bg-emerald-500", role: "検索 Retrieval", roleColor: "text-emerald-600",
                  title: "Cortex Search（マネージド・ハイブリッド検索）", titleColor: "text-emerald-700",
                  body: "埋め込み生成・索引作成・更新を Snowflake が自動管理。内部でベクトル＋キーワード＋セマンティック再ランキングのハイブリッド検索を高精度で実現し、運用とコストを最適化。SEARCH SERVICE を API 経由で公開し、外部公開も容易。CREATE CORTEX SEARCH SERVICE するだけで追加インフラ不要。",
                  subBg: "bg-emerald-50 border-emerald-100", subIcon: "text-emerald-600",
                  subs: [
                    { icon: "🎯", t: "高精度ハイブリッド検索", d: "ベクトル＋キーワード＋リランキング" },
                    { icon: "🗄️", t: "完全マネージド", d: "インデックス作成・更新・スケーリングを自動化" },
                    { icon: "🛡️", t: "セキュア & 統合", d: "Snowflakeの権限・監査・暗号化をそのまま継承" },
                    { icon: "🌐", t: "外部公開が容易", d: "SEARCH SERVICE を API 経由で提供" },
                  ],
                  fn: "CREATE CORTEX SEARCH SERVICE / SEARCH_PREVIEW()",
                },
                {
                  badge: "✦ 生成", badgeBg: "bg-violet-500", role: "Generation", roleColor: "text-violet-600",
                  title: "Cortex COMPLETE / AISQL", titleColor: "text-violet-700",
                  body: "Cortex Search で得たチャンクを文脈として LLM に渡し回答を生成。検索とセットで使うことで、モデル名を変えるだけで LLM（中立性要件）を容易に切替可能。",
                  subBg: "bg-violet-50 border-violet-100", subIcon: "text-violet-600",
                  subs: [
                    { icon: "🧠", t: "高精度なRAG回答", d: "検索結果を文脈化して回答品質を向上" },
                    { icon: "🔄", t: "モデル中立性", d: "AISQL 経由でモデル切替が容易" },
                    { icon: "⚙️", t: "簡単な実装", d: "SQL / AISQL ですぐに利用可能" },
                    { icon: "🔒", t: "安全な生成", d: "データは Snowflake 内に保持し安全性を維持" },
                  ],
                  fn: "COMPLETE() / AI_COMPLETE() / AI_CLASSIFY()",
                },
              ].map((m) => (
                <div key={m.title} className="border border-slate-200 rounded-2xl p-4 flex flex-col bg-white shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={"text-white text-[11px] font-bold rounded-md px-2 py-0.5 " + m.badgeBg}>{m.badge}</span>
                    <span className={"text-[12px] font-semibold " + m.roleColor}>{m.role}</span>
                  </div>
                  <div className={"font-bold text-[17px] mb-1.5 " + m.titleColor}>{m.title}</div>
                  <p className="text-slate-600 text-[11px] leading-relaxed mb-2.5">{m.body}</p>
                  <div className="grid grid-cols-4 gap-2 flex-1">
                    {m.subs.map((s) => (
                      <div key={s.t} className={"border rounded-lg px-2 py-2 text-center " + m.subBg}>
                        <div className={"text-[16px] " + m.subIcon}>{s.icon}</div>
                        <div className="font-bold text-slate-700 text-[10px] mt-1 leading-tight">{s.t}</div>
                        <div className="text-slate-500 text-[9px] mt-0.5 leading-snug">{s.d}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2.5 font-mono text-[10px] text-slate-500 bg-slate-50 border border-slate-200 rounded px-2 py-1">{m.fn}</div>
                </div>
              ))}
            </div>

            {/* 参考・不採用 */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-[11px] text-slate-600 flex-shrink-0 flex items-start gap-2">
              <span className="text-slate-400 text-[14px] flex-shrink-0">🧩</span>
              <div><span className="font-bold text-slate-700">参考・不採用：</span> 手動ベクトル検索（<span className="font-mono">EMBED_TEXT_1024</span> + <span className="font-mono">VECTOR_COSINE_SIMILARITY</span>）も実現可能だが、埋め込み生成・索引設計・再ランキングを自前で持つ必要があり運用が重い。Cortex Search が同等以上をマネージドで提供するため採用しない。</div>
            </div>

            {/* 採用理由 */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2 flex-shrink-0 flex items-center gap-3">
              <span className="text-[14px] flex-shrink-0">💡</span>
              <span className="font-bold text-emerald-800 text-[12px] flex-shrink-0">採用理由</span>
              <div className="grid grid-cols-3 gap-4 flex-1">
                {[
                  { t: "開発・運用コストの最小化", d: "インフラ・索引・スケーリングを Snowflake が自動管理" },
                  { t: "検索精度と柔軟性の両立", d: "ハイブリッド検索＋リランキングで高い検索品質" },
                  { t: "セキュリティ & ガバナンス", d: "既存の権限・監査・データガバナンスをそのまま適用" },
                ].map((r) => (
                  <div key={r.t} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 text-[12px] flex-shrink-0 mt-0.5">✓</span>
                    <div className="leading-snug"><div className="font-bold text-slate-700 text-[11px]">{r.t}</div><div className="text-slate-500 text-[10px]">{r.d}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
      script: [
        "RAG は検索と生成の2段で作ります。本案件はどちらも Snowflake のマネージド機能を組み合わせます。検索は Cortex Search、生成は Cortex COMPLETE です。",
        "検索の Cortex Search は、埋め込み生成・索引・更新を自動管理し、内部でベクトル＋キーワード＋セマンティック再ランクのハイブリッド検索が標準で動きます。『参集』と『招集』のような表記ゆれにも強く、チューニング不要で高い精度が得られます。",
        "生成の Cortex COMPLETE は、検索で得たチャンクを文脈として LLM に渡し回答します。モデル名を変えるだけで差し替えでき、中立性要件にも合致します。",
        "なお、埋め込みを自前で持つ手動ベクトル検索も技術的には可能ですが、索引更新や再ランクを自分で実装する必要があり運用が重いため、マネージドの Cortex Search が同等以上を提供する本案件では採用しません。",
      ],
    },
    {
      label: "避難訓練シナリオ：方式適性",
      node: (
        <SlideShell tag="方式適性" accent="teal" title="避難訓練シナリオ生成 ― なぜ Cortex Search（パターンA）が向くか" subtitle="非構造化ドキュメント RAG ＋ 固有名詞一致 ＋ 関連度順序が品質を左右する">
          <div className="h-full flex flex-col gap-2.5 text-[11px]">
            {/* 結論バナー */}
            <div className="bg-emerald-50 border border-emerald-300 rounded-lg px-3 py-1.5 flex items-center gap-2 flex-shrink-0">
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] flex items-center justify-center flex-shrink-0">✓</span>
              <span className="text-[12.5px] font-bold text-emerald-800">「過去資料から避難訓練シナリオを生成」＝典型的な非構造化 RAG。原則 Cortex Search（パターンA）が向く</span>
              <span className="text-[10px] text-emerald-600 ml-auto whitespace-nowrap">※「絶対 B はダメ」ではなく要件が Search の強みと重なる</span>
            </div>

            <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
              {/* 左：なぜ向くか */}
              <div className="flex flex-col gap-2 min-h-0">
                <div className="font-bold text-slate-700 text-[12.5px] flex items-center gap-1.5"><span className="text-emerald-600">🎯</span> なぜ向くか（Retrieve 品質が生成品質を決める）</div>
                {/* RAGフロー */}
                <div className="bg-teal-50 border border-teal-200 rounded-lg px-3 py-2 flex items-center justify-between gap-1 text-center flex-shrink-0">
                  {(() => {
                    const nodes = [
                      { i: "📚", t: "過去資料", d: "マニュアル/訓練記録/フロア図/過去シナリオ" },
                      { i: "🔎", t: "Retrieve", d: "関連箇所を検索" },
                      { i: "✦", t: "Generate", d: "新しい訓練シナリオを生成" },
                    ];
                    return nodes.map((n, i) => (
                      <Fragment key={n.t}>
                        <div className="flex-1">
                          <div className="text-[16px]">{n.i}</div>
                          <div className="font-bold text-slate-700 text-[10.5px]">{n.t}</div>
                          <div className="text-slate-500 text-[9px] leading-tight">{n.d}</div>
                        </div>
                        {i < nodes.length - 1 && <span className="text-teal-400 font-bold flex-shrink-0">→</span>}
                      </Fragment>
                    ));
                  })()}
                </div>
                {/* 4観点 */}
                <div className="space-y-1.5 flex-1">
                  {[
                    { k: "Hybrid 検索", v: "「避難経路/非常階段」の意味近似と「3F東側/A棟」の固有名詞・略語一致の両方が効く" },
                    { k: "リランキング", v: "「避難」関連 chunk は多い。シナリオ作成に本当に効く past case を上位に並べる" },
                    { k: "top-k の順序", v: "取得した過去事例の並びが、そのまま生成シナリオの質に直結する" },
                    { k: "メタデータフィルタ", v: "建物・階・訓練種別（火災/地震）で ai_labels 等により絞り込める" },
                  ].map((r) => (
                    <div key={r.k} className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 flex gap-2">
                      <span className="w-[84px] font-bold text-teal-800 flex-shrink-0 text-[10.5px]">{r.k}</span>
                      <span className="text-slate-600 leading-snug text-[10px]">{r.v}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded px-2.5 py-1.5 text-[10px] text-amber-800 leading-snug flex-shrink-0">
                  ⚠️ パターン B でも RAG は組めるが、Hybrid / Rerank を自前で足さないと「ベストな過去事例」が先頭に来ないことがある。シナリオ生成は Retrieve 品質依存が大きいため A の方が楽に品質を出しやすい。
                </div>
              </div>

              {/* 右：使い分け */}
              <div className="flex flex-col gap-2 min-h-0">
                <div className="font-bold text-slate-700 text-[12.5px] flex items-center gap-1.5"><span className="text-violet-600">🧭</span> ツールの使い分け（混同しやすい点）</div>
                <div className="space-y-1.5">
                  {[
                    { tool: "Cortex Search", data: "PDF・Word・訓練記録テキスト等", fit: "◎ メインの Retrieve 層", cls: "border-emerald-300 bg-emerald-50", fc: "text-emerald-700" },
                    { tool: "Cortex Analyst", data: "テーブル化された数値・一覧（参加者数・実施日）", fit: "△ 補助（過去3年の実施回数 等）", cls: "border-slate-300 bg-slate-50", fc: "text-slate-600" },
                    { tool: "パターンB（VECTOR + AI_EMBED）", data: "同上だが自前運用", fit: "○ 可能だが品質・運用は自前", cls: "border-amber-300 bg-amber-50", fc: "text-amber-700" },
                  ].map((r) => (
                    <div key={r.tool} className={"border rounded-lg px-2.5 py-1.5 " + r.cls}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-800 text-[11px]">{r.tool}</span>
                        <span className={"font-bold text-[10.5px] whitespace-nowrap " + r.fc}>{r.fit}</span>
                      </div>
                      <div className="text-slate-500 text-[9.5px] mt-0.5">{r.data}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-[10px] text-slate-600 leading-snug">
                  「過去の資料から」が <span className="font-semibold text-slate-700">文書・PDF・議事録</span> なら Search 系。<span className="font-semibold text-slate-700">スプレッドシート/DB だけ</span>なら Analyst の話になる。
                </div>
                {/* パターンBで十分なケース */}
                <div className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 flex-1">
                  <div className="font-bold text-slate-700 text-[10.5px] mb-1">パターン B でも十分なケース</div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9.5px] text-slate-600">
                    {["資料が少ない（数十〜数百 chunk）", "「だいたい意味が近い」検索で足りる", "自前で Rerank/FTS を足す余力がある", "Search サービス課金を避けたい"].map((c) => (
                      <div key={c} className="flex gap-1"><span className="text-slate-400 flex-shrink-0">・</span><span className="leading-tight">{c}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 実務的おすすめ構成 */}
            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              <div className="bg-violet-50 border border-violet-200 rounded-lg px-3 py-1.5">
                <div className="font-bold text-violet-800 text-[10.5px] mb-0.5">🗂️ 登録時</div>
                <div className="text-[9.5px] text-slate-600 leading-snug">過去資料 → Document AI/チャンク化 → <span className="font-mono">AI_CLASSIFY</span>（火災/地震/避難経路 等ラベル） → Cortex Search に索引</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
                <div className="font-bold text-blue-800 text-[10.5px] mb-0.5">💬 質問時</div>
                <div className="text-[9.5px] text-slate-600 leading-snug">「3F火災想定で初参加者向けシナリオを」 → メタフィルタ(3F,火災) → Search Retrieve(Hybrid+Rerank) → <span className="font-mono">AI_COMPLETE</span> 生成</div>
              </div>
            </div>
          </div>
        </SlideShell>
      ),
      script: [
        "このスライドは、過去資料から避難訓練のシナリオを生成するという具体的な用途で、どの方式が向くかを整理したものです。結論から言うと、これは典型的な非構造化ドキュメント RAG なので、原則としてマネージドの Cortex Search、つまりパターン A が向きます。絶対に B が駄目という意味ではなく、要件が Search の強みと重なるケースです。",
        "理由は、シナリオの生成品質が検索すなわち Retrieve の品質に強く依存するからです。避難経路のような意味の近さと、3F 東側や A 棟といった固有名詞の一致の両方が効くハイブリッド検索、関連する過去事例を上位に並べるリランキング、取得した事例の並び順、そして建物や階・火災か地震かといったメタデータでの絞り込みが、いずれもこの用途に効きます。",
        "混同しやすいのが Cortex Analyst との違いです。Analyst はテーブル化された数値や一覧を扱うもので、過去3年の実施回数のような補助に向きます。対象が文書・PDF・議事録なら Search 系、スプレッドシートや DB だけなら Analyst の話になります。",
        "パターン B でも構築自体は可能ですが、ハイブリッドや再ランク相当を自前で足す前提です。資料が少なく、課金を避けたい場合には現実的です。実務的には、登録時にラベル付けして索引化し、質問時はメタフィルタと Search、COMPLETE で生成する構成が自然で、教材の比較表の意図どおり Search が第一候補になります。",
      ],
    },
    {
      label: "データ保存とセキュリティ",
      node: (
        <div className="h-full bg-white flex flex-col">
          <div className="relative bg-gradient-to-br from-[#063b34] via-[#0a6b57] to-[#0a5246] text-white px-9 pt-5 pb-5 overflow-hidden flex-shrink-0">
            <div className="absolute -top-4 right-7 text-white/10 text-[88px] leading-none select-none pointer-events-none">🔒</div>
            <div className="relative flex items-center gap-3">
              <span className="text-[12px] font-bold bg-emerald-400/25 border border-emerald-200/40 rounded-lg px-2.5 py-1 tracking-wider whitespace-nowrap">B 保存</span>
              <div className="min-w-0">
                <h2 className="text-[26px] font-bold leading-tight">データの保存とセキュリティ</h2>
                <p className="text-emerald-50 text-[13px] mt-1">仕様書必須は PDF/docx/xlsx。Snowflake は他形式も取込可能（拡張余地）</p>
              </div>
            </div>
          </div>
          <div className="flex-1 px-9 py-4 grid grid-cols-2 gap-6 min-h-0">
            {/* 左：取り込みとテキスト化 */}
            <div className="flex flex-col gap-2.5 min-h-0">
              <div className="font-bold text-slate-700 text-[14px] flex items-center gap-2"><span className="text-emerald-600">📑</span>取り込みとテキスト化</div>
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">1</span>
                  <span className="font-bold text-slate-800 text-[13px]">仕様書で必須のファイル形式</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[{ l: "PDF", i: "📕", c: "text-red-600 border-red-200" }, { l: "DOCX", i: "📘", c: "text-blue-600 border-blue-200" }, { l: "XLSX", i: "📗", c: "text-green-600 border-green-200" }].map((f) => (
                    <span key={f.l} className={"inline-flex items-center gap-1 bg-white border rounded-md px-2.5 py-1 font-semibold text-[11px] " + f.c}><span>{f.i}</span>{f.l}</span>
                  ))}
                </div>
                <div className="text-[10px] text-rose-600 mt-2 leading-snug">別紙1 に明記。入力 数百KB〜数十MB / 5ファイル以上、出力は CSV</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">2</span>
                  <span className="font-bold text-slate-800 text-[13px]">Snowflake では他形式も取込可能 <span className="text-[10px] font-normal text-slate-500">（将来拡張の余地）</span></span>
                </div>
                <div className="text-[10px] text-slate-500 mb-1">構造化・半構造化（COPY INTO）</div>
                <div className="flex flex-wrap gap-1.5 mb-2">{["CSV", "JSON", "Parquet", "Avro", "ORC", "XML"].map((f) => (<span key={f} className="bg-white border border-blue-200 rounded px-2 py-0.5 font-mono font-semibold text-blue-700 text-[10.5px]">{f}</span>))}</div>
                <div className="text-[10px] text-slate-500 mb-1">画像・スキャン（Stage + Directory Table）</div>
                <div className="flex flex-wrap gap-1.5">{["画像(PNG/JPEG/TIFF)", "HTML", "txt", "任意バイナリ"].map((f) => (<span key={f} className="bg-white border border-slate-300 rounded px-2 py-0.5 font-semibold text-slate-600 text-[10.5px]">{f}</span>))}</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">3</span>
                  <span className="font-bold text-slate-800 text-[13px]">Cortex Search 用テキスト化</span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-700">
                  <div className="flex gap-1.5"><span className="text-emerald-600 flex-shrink-0">✓</span><span>PDF / DOCX — <span className="font-mono">PARSE_DOCUMENT</span> でネイティブ抽出</span></div>
                  <div className="flex gap-1.5"><span className="text-emerald-600 flex-shrink-0">✓</span><span>XLSX / PPTX / HTML — Snowpark Python UDF</span></div>
                  <div className="flex gap-1.5"><span className="text-emerald-600 flex-shrink-0">✓</span><span>画像・スキャン PDF — Multimodal / OCR</span></div>
                </div>
              </div>
            </div>
            {/* 右：セキュリティ設計（5本柱） */}
            <div className="flex flex-col gap-2 min-h-0">
              <div className="font-bold text-slate-700 text-[14px] flex items-center gap-2"><span className="text-emerald-600">🛡️</span>セキュリティ設計（5本柱）</div>
              {[
                { icon: "👥", ring: "bg-blue-100", bd: "border-l-blue-400", bg: "bg-blue-50/50", t: "3ロール RBAC", b: "管理者 / 担当者 / 閲覧者。GRANT で最小権限を強制。" },
                { icon: "🌐", ring: "bg-sky-100", bd: "border-l-sky-400", bg: "bg-sky-50/50", t: "IP アクセス制限", b: "Network Policy で都庁内ネットワーク（固定IP）のみ許可。" },
                { icon: "🎓", ring: "bg-green-100", bd: "border-l-green-400", bg: "bg-green-50/50", t: "学習利用不可（オプトアウト）", b: "アップロード文書をモデル学習に使わせない設定。" },
                { icon: "🔒", ring: "bg-purple-100", bd: "border-l-purple-400", bg: "bg-purple-50/50", t: "国内リージョン + 暗号化", b: "東京リージョン稼働。保存 AES-256 / 転送 TLS1.3。" },
                { icon: "📋", ring: "bg-amber-100", bd: "border-l-amber-400", bg: "bg-amber-50/50", t: "監査ログ", b: "QUERY_HISTORY・ACCESS_HISTORY で全操作を記録。" },
              ].map((r) => (
                <div key={r.t} className={"flex items-center gap-3 border border-slate-200 border-l-4 rounded-lg px-3 py-2 flex-1 " + r.bd + " " + r.bg}>
                  <div className={"w-9 h-9 rounded-full flex items-center justify-center text-[17px] flex-shrink-0 " + r.ring}>{r.icon}</div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 text-[12.5px]">{r.t}</div>
                    <div className="text-slate-600 text-[11px] leading-snug mt-0.5">{r.b}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      script: [
        "データの保存です。仕様書で必須とされているのは PDF・docx・xlsx の3形式で、別紙1に明記されています。入力は数百KB〜数十MB・5ファイル以上、出力は CSV です。",
        "一方、Snowflake 自体は CSV や JSON などの構造化データから、pptx・画像・HTML・任意バイナリまで幅広く取り込めます。仕様書要件は最小限ですが、将来の機能拡張に備えた取込みの余地が十分にあります。",
        "検索に使うテキスト化は、PDF・DOCX は PARSE_DOCUMENT で、Excel や PowerPoint は Python UDF で、画像やスキャン PDF は OCR で行います。すべて Snowflake 内で完結します。",
        "セキュリティは、3ロールの RBAC、IP アクセス制限、学習オプトアウト、東京リージョンでの暗号化、そして監査ログの5本柱で、行政要件を標準機能で満たします。",
      ],
    },
    {
      label: "チャンク処理とメタデータ",
      node: (
        <SlideShell tag="C チャンク" accent="violet" title="チャンク処理とメタデータ設計" subtitle="検索精度を左右する分割パラメータと付与情報">
          <div className="h-full grid grid-cols-2 gap-5 text-[12px]">
            <div className="space-y-2.5">
              <div className="font-bold text-slate-700 text-[13px]">⚙️ チャンク基本パラメータ</div>
              <div className="bg-violet-50 border border-violet-200 rounded-lg p-3 space-y-2">
                {[
                  { p: "チャンクサイズ", v: "512 〜 1,024 tokens", n: "長文の計画書は 1,024 が最適" },
                  { p: "オーバーラップ", v: "10 〜 20%（約100tok）", n: "文境界での意味の分断を防ぐ" },
                  { p: "分割境界", v: "章 > 節 > 段落 > 文", n: "見出し（##・第X条）を優先" },
                  { p: "最小チャンク", v: "50tok 以下は前へ結合", n: "短すぎる断片はノイズ化を防止" },
                ].map((r) => (
                  <div key={r.p} className="flex gap-2">
                    <div className="w-24 font-semibold text-violet-800 flex-shrink-0">{r.p}</div>
                    <div><div className="font-medium text-slate-800">{r.v}</div><div className="text-slate-600">{r.n}</div></div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-900 text-green-300 rounded-lg p-3 font-mono text-[11px] leading-relaxed">
                {["CREATE CORTEX SEARCH SERVICE chat_search", "  ON chunk_text", "  ATTRIBUTES doc_name, page_no, section", "  WAREHOUSE = xs_wh", "  TARGET_LAG = '1 hour';"].map((l) => (<div key={l}>{l}</div>))}
              </div>
            </div>
            <div className="space-y-2.5">
              <div className="font-bold text-slate-700 text-[13px]">🏷️ メタデータ設計（各チャンクに付与）</div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { f: "doc_id", t: "識別 UUID" },
                  { f: "doc_name", t: "元ファイル名" },
                  { f: "doc_type", t: "計画書/ハザード/シナリオ" },
                  { f: "page_no", t: "ページ番号（引用用）" },
                  { f: "heading_path", t: "章・節（文脈補強）" },
                  { f: "chunk_index", t: "文書内連番" },
                  { f: "chunk_text", t: "本文（検索対象）" },
                  { f: "uploaded_at", t: "格納日時" },
                ].map((r) => (
                  <div key={r.f} className="bg-slate-50 border border-slate-200 rounded px-2 py-1.5">
                    <div className="font-mono font-semibold text-slate-800">{r.f}</div>
                    <div className="text-slate-600">{r.t}</div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-slate-700">
                <span className="font-bold text-amber-800">フィルタ活用：</span> doc_type='計画書' AND section LIKE '%参集%' のようにメタデータで絞り込み、検索精度を底上げ。
              </div>
            </div>
          </div>
        </SlideShell>
      ),
      script: [
        "検索の精度を左右するのがチャンク設計です。チャンクは512〜1024トークン、前後を10〜20%重複させ、章・節・段落・文の順に意味の切れ目で分割します。",
        "各チャンクには文書名・文書種別・ページ番号・章節などのメタデータを付けます。これにより『計画書だけを対象に』といった絞り込みや、『何ページが根拠か』の引用表示ができます。",
        "索引は CREATE CORTEX SEARCH SERVICE で、チャンク本文を対象にメタデータを属性として登録します。",
      ],
    },
    {
      label: "RAG データフロー",
      node: (
        <SlideShell tag="データフロー" accent="indigo" title="RAG データフロー（事前処理 → 実行時）" subtitle="❄️ は Snowflake 内で完結／索引は事前処理で作り実行時が再利用">
          <div className="h-full flex flex-col justify-center gap-5">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-violet-600 text-white text-[11px] font-bold rounded-md px-2.5 py-1 mb-2">① 事前処理（インジェスト）<span className="font-normal text-violet-100">／ 文書を「検索できる状態」にする</span></div>
              <div className="border-2 border-dashed border-violet-300 bg-violet-50/40 rounded-lg p-3">
                <FlowLane
                  accent="violet"
                  nodes={[
                    { icon: "📄", bg: "bg-slate-500", title: "文書群", sub: "PDF / Word / Excel / 画像", arrow: "取込" },
                    { icon: "🗄️", bg: "bg-blue-600", title: "Stage + Directory", sub: "バイナリのまま格納", snow: true, arrow: "抽出" },
                    { icon: "📃", bg: "bg-teal-600", title: "テキスト化", sub: "PARSE_DOCUMENT / OCR", snow: true, arrow: "分割" },
                    { icon: "🧩", bg: "bg-violet-600", title: "チャンク + メタ", sub: "SPLIT_TEXT_RECURSIVE", snow: true, arrow: "索引化" },
                    { icon: "🔎", bg: "bg-emerald-600", title: "Cortex Search", sub: "埋め込み＆ハイブリッド索引", snow: true, arrow: null },
                  ]}
                />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-[11px] font-bold rounded-md px-2.5 py-1 mb-2">② 実行時（クエリ）<span className="font-normal text-blue-100">／ 質問に根拠付きで回答する</span></div>
              <div className="border-2 border-blue-200 bg-blue-50/40 rounded-lg p-3">
                <FlowLane
                  accent="blue"
                  nodes={[
                    { icon: "👤", bg: "bg-slate-600", title: "ブラウザ", sub: "質問入力", arrow: "HTTPS" },
                    { icon: "🟧", bg: "bg-orange-500", title: "Next.js API（BFF）", sub: "認証・RBAC / SPCS", arrow: "① 検索" },
                    { icon: "🔎", bg: "bg-emerald-600", title: "Cortex Search", sub: "関連チャンク TOP-K=5", snow: true, arrow: "② 文脈付与" },
                    { icon: "📝", bg: "bg-green-600", title: "プロンプト組立", sub: "システム+履歴+チャンク", snow: true, arrow: "③ 生成" },
                    { icon: "🧠", bg: "bg-indigo-600", title: "Cortex COMPLETE", sub: "LLM 生成（逐次）", snow: true, arrow: "④ 回答" },
                    { icon: "💬", bg: "bg-sky-600", title: "回答 + 🗺️ 地図", sub: "引用付き / ArcGIS", arrow: null },
                  ]}
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-600 bg-slate-100 border border-slate-200 rounded-lg px-3 py-2">
              <span className="text-violet-500 font-bold">↑</span>
              <span><span className="font-semibold text-violet-700">①で構築した索引</span>を<span className="font-semibold text-blue-700">②の検索ステップ</span>がそのまま利用。文書追加時のみ①を再実行します。</span>
            </div>
          </div>
        </SlideShell>
      ),
      script: [
        "処理は2つのパイプラインに分かれます。上の事前処理は、文書を Stage に格納し、テキスト化・チャンク化して Cortex Search の索引を作る、文書追加時のバッチ処理です。",
        "下の実行時は、質問が来るたびに動きます。Next.js の BFF が検索を行い、取得したチャンクを文脈としてプロンプトを組み立て、COMPLETE で回答を生成します。",
        "重要なのは、事前処理で作った索引を実行時がそのまま使う点です。文書を追加したときだけ事前処理を再実行すればよく、❄️マークのとおり処理は Snowflake 内で完結します。",
      ],
    },
    {
      label: "呼び出しフロー",
      node: (
        <SlideShell tag="D 呼び出し" accent="blue" title="呼び出しフロー（Next.js → Snowflake）" subtitle="サーバー側（BFF）経由で資格情報をブラウザに出さない">
          <div className="h-full grid grid-cols-[1.6fr_1fr] gap-5">
            <div className="grid grid-cols-2 gap-2 text-[11.5px] content-start">
              {[
                { s: "1", c: "bg-blue-100 border-blue-300 text-blue-800", t: "ユーザー入力", b: "質問 + 履歴（最大10回）+ session_id を送信" },
                { s: "2", c: "bg-orange-100 border-orange-300 text-orange-800", t: "Next.js API Route", b: "server-side で snowflake-sdk 実行。JWT 安全管理・入力サニタイズ" },
                { s: "3", c: "bg-teal-100 border-teal-300 text-teal-800", t: "Cortex Search（検索）", b: "SEARCH_PREVIEW() で TOP-K=5 取得。doc_type で範囲限定" },
                { s: "4", c: "bg-green-100 border-green-300 text-green-800", t: "プロンプト組立", b: "システム + チャンク + 履歴 + 質問を結合" },
                { s: "5", c: "bg-indigo-100 border-indigo-300 text-indigo-800", t: "Cortex COMPLETE（生成）", b: "ストリーミング生成。モデル名変更のみで LLM 切替" },
                { s: "6", c: "bg-violet-100 border-violet-300 text-violet-800", t: "レスポンス返却", b: "回答 + 引用（doc_name, page_no）を JSON で返却" },
              ].map((x) => (
                <div key={x.s} className={"border rounded-lg px-2.5 py-2 flex gap-2 items-start " + x.c}>
                  <span className="font-bold text-[15px] leading-none flex-shrink-0">{x.s}</span>
                  <div><div className="font-semibold">{x.t}</div><div className="text-slate-700 mt-0.5 leading-snug">{x.b}</div></div>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-[11.5px]">
              <div className="font-bold text-slate-700 text-[13px]">設計上の要点</div>
              {[
                { i: "⚡", t: "ストリーミング", b: "ReadableStream + SSE で逐次表示し遅延を体感させない" },
                { i: "🔐", t: "認証管理", b: "接続情報は SPCS シークレットで管理。クライアントに露出しない" },
                { i: "🔁", t: "エラーハンドリング", b: "タイムアウト30秒でリトライ1回 → 超過時フォールバック" },
              ].map((n) => (
                <div key={n.t} className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 flex gap-2">
                  <span className="flex-shrink-0">{n.i}</span>
                  <div><span className="font-semibold text-blue-800">{n.t}：</span><span className="text-slate-700">{n.b}</span></div>
                </div>
              ))}
              <div className="bg-slate-900 text-green-300 rounded-lg p-2.5 font-mono text-[10.5px] leading-relaxed">
                {["// app/api/chat/route.ts", "SELECT SNOWFLAKE.CORTEX.COMPLETE(", "  'claude-3-5-sonnet',", "  ARRAY_CONSTRUCT(", "   {'role':'system','content':sys},", "   {'role':'user','content':q})", ") AS answer;"].map((l) => (<div key={l}>{l}</div>))}
              </div>
            </div>
          </div>
        </SlideShell>
      ),
      script: [
        "実行時の呼び出しを6ステップで具体化します。ブラウザの質問は Next.js の API Route が受け、サーバー側でのみ Snowflake に接続します。資格情報はブラウザに出しません。",
        "まず Cortex Search で関連チャンクを上位5件取得し、システムプロンプト・会話履歴・チャンク・質問を結合します。これを COMPLETE に渡してストリーミング生成します。",
        "回答には根拠の文書名とページ番号を添えて返します。タイムアウト時は1回リトライし、超過時はフォールバックする設計です。",
      ],
    },
    {
      label: "整合性チェックのフロー",
      node: (
        <SlideShell tag="整合性" accent="rose" title="整合性チェックのデータフロー" subtitle="チャットと同じ検索基盤を再利用し、複数文書の矛盾を検出">
          <div className="h-full flex flex-col justify-center gap-5">
            <div className="border-2 border-rose-200 bg-rose-50/40 rounded-lg p-3 overflow-hidden">
              <div className="origin-left" style={{ transform: "scale(0.83)" }}>
                <FlowLane
                  accent="rose"
                  nodes={[
                    { icon: "👤", bg: "bg-slate-600", title: "対象文書を選択", sub: "計画書 / シナリオ / 被害想定", arrow: "実行" },
                    { icon: "🟧", bg: "bg-orange-500", title: "Next.js API", sub: "/api/consistency", arrow: "記述抽出" },
                    { icon: "🧩", bg: "bg-violet-600", title: "記述・基準を抽出", sub: "数値・参集基準・手順", snow: true, arrow: "クロス参照" },
                    { icon: "🔎", bg: "bg-emerald-600", title: "Cortex Search", sub: "関連する他文書を取得", snow: true, arrow: "矛盾判定" },
                    { icon: "🛡️", bg: "bg-rose-600", title: "AI_CLASSIFY / COMPLETE", sub: "矛盾/要確認/整合 に分類", snow: true, arrow: "集約" },
                    { icon: "📋", bg: "bg-green-600", title: "結果集約・修正提案", sub: "根拠ページ付きで一覧化", snow: true, arrow: "表示" },
                    { icon: "🖥️", bg: "bg-sky-600", title: "画面表示", sub: "差分ハイライト・推奨反映", arrow: null },
                  ]}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-[12px]">
              {[
                { t: "クロス文書比較", b: "計画書×シナリオ×被害想定の横断で、参集基準・数値・手順の食い違いを検出。" },
                { t: "判定の自動分類", b: "AI_CLASSIFY / COMPLETE で「矛盾/要確認/整合」に分類し、優先度を付けて提示。" },
                { t: "根拠と修正提案", b: "矛盾ペアごとに該当ページと AI 推奨修正案を添付し、ワンクリックで反映。" },
              ].map((c) => (
                <div key={c.t} className="bg-rose-50 border border-rose-200 rounded-lg p-3">
                  <div className="font-bold text-rose-800 mb-1">{c.t}</div>
                  <div className="text-slate-700 leading-relaxed">{c.b}</div>
                </div>
              ))}
            </div>
          </div>
        </SlideShell>
      ),
      script: [
        "整合性チェックは、チャットボットと同じ Cortex Search の索引を再利用します。違いは、1問1答ではなく、複数文書の記述を突き合わせて矛盾・不足を検出する点です。",
        "対象文書から参集基準や数値・手順を抽出し、各記述に関連する他文書をクロス参照で集め、AI_CLASSIFY や COMPLETE で『矛盾／要確認／整合』に分類します。",
        "結果は根拠ページと推奨修正案を添えて一覧化します。新しい検索エンジンを作らず、同じ基盤の使い方を変えるだけで実現できます。",
      ],
    },
    {
      label: "シナリオ生成のフロー",
      node: (
        <SlideShell tag="シナリオ" accent="sky" title="シナリオ自動生成のデータフロー" subtitle="同じ検索基盤で過去素材を取り込み、時系列素案を生成">
          <div className="h-full flex flex-col justify-center gap-5">
            <div className="border-2 border-sky-200 bg-sky-50/40 rounded-lg p-3 overflow-hidden">
              <div className="origin-left" style={{ transform: "scale(0.83)" }}>
                <FlowLane
                  accent="sky"
                  nodes={[
                    { icon: "👤", bg: "bg-slate-600", title: "災害条件を設定", sub: "種別 / 規模 / 時刻 / 対象局", arrow: "生成実行" },
                    { icon: "🟧", bg: "bg-orange-500", title: "Next.js API", sub: "/api/scenario", arrow: "素材検索" },
                    { icon: "🔎", bg: "bg-emerald-600", title: "Cortex Search", sub: "過去訓練・手順書から取得", snow: true, arrow: "文脈付与" },
                    { icon: "📝", bg: "bg-green-600", title: "プロンプト組立", sub: "条件+素材+出力形式(時系列)", snow: true, arrow: "生成" },
                    { icon: "⚡", bg: "bg-indigo-600", title: "Cortex COMPLETE", sub: "タイムライン素案（約20秒）", snow: true, arrow: "整形" },
                    { icon: "📄", bg: "bg-teal-600", title: "整形・docx 化", sub: "章立て・根拠ページ付与", snow: true, arrow: "出力" },
                    { icon: "🖥️", bg: "bg-sky-600", title: "画面表示 / docx", sub: "確認・編集・DL", arrow: null },
                  ]}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-[12px]">
              {[
                { t: "条件駆動の生成", b: "災害種別・規模・時刻・対象局を組み合わせ、複数パターンを即座に叩き台化。" },
                { t: "過去事例の再利用", b: "Cortex Search で過去訓練・計画書・手順書を取り込み、根拠のある展開を生成。" },
                { t: "構造化出力", b: "T+0 / T+30分 … のタイムライン形式に整形し、根拠ページ付き docx で出力・編集。" },
              ].map((c) => (
                <div key={c.t} className="bg-sky-50 border border-sky-200 rounded-lg p-3">
                  <div className="font-bold text-sky-800 mb-1">{c.t}</div>
                  <div className="text-slate-700 leading-relaxed">{c.b}</div>
                </div>
              ))}
            </div>
          </div>
        </SlideShell>
      ),
      script: [
        "シナリオ生成も同じ検索基盤を使います。災害条件（種別・規模・時刻・対象局）を指定すると、過去の訓練・計画書・手順書から関連素材を検索して文脈に取り込みます。",
        "プロンプトを時系列の出力フォーマットで組み立て、COMPLETE でタイムライン素案を生成します。約2時間分の訓練設計を20秒程度で叩き台化できます。",
        "出力は章立てと根拠ページ付きで docx に整形し、画面で確認・編集・ダウンロードできます。",
      ],
    },
    {
      label: "フロントエンド接続",
      node: (
        <SlideShell tag="E 接続" accent="orange" title="フロントエンド接続（Next.js / ArcGIS）" subtitle="機能別の API・データの流れ — ①②④は BFF→Snowflake、③は Maps SDK→庁内 GIS">
          <div className="h-full flex flex-col gap-2.5 text-[12px] min-h-0">
            <div className="border-2 border-orange-200 bg-orange-50/30 rounded-lg p-2.5 flex-1 min-h-0 overflow-hidden">
              <div className="origin-top-left" style={{ transform: "scale(0.88)", width: "113.6%" }}>
                <FrontendConnectionDiagram compact />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 flex-shrink-0 text-[10.5px]">
              {[
                { t: "BFF が Snowflake 窓口", b: "/api/chat 等で snowflake-sdk をサーバー側のみ実行。PAT/OAuth はブラウザに出さない。" },
                { t: "③ は REST③ 直行", b: "Hosted Feature Layer の取得は Maps SDK が庁内 Enterprise へ直接。タイルは BFF を通さない。" },
                { t: "双方向連携", b: "地図要約 → /api/chat、引用 page_no → 文書ビューア。④ で RAG と地図を 1 画面に統合。" },
              ].map((c) => (
                <div key={c.t} className="bg-white border border-orange-200 rounded-lg px-2.5 py-2">
                  <div className="font-bold text-orange-800 mb-0.5">{c.t}</div>
                  <div className="text-slate-600 leading-snug">{c.b}</div>
                </div>
              ))}
            </div>
          </div>
        </SlideShell>
      ),
      script: [
        "この図は機能ごとに、ブラウザ・Next.js BFF・バックエンドの間で何が流れるかを示しています。①②④は必ず BFF 経由で Snowflake に接続し、リクエストとレスポンスの型も API Route 単位で分かれます。",
        "③被害予想だけが例外で、Maps SDK が庁内 ArcGIS Enterprise の Feature Layer を REST③ で直接参照します。レイヤーのタイルや属性は BFF を通しません。",
        "④判断支援では両方を統合し、地図上の要約を geoSummary としてチャット API に渡す双方向連携も可能です。資格情報はすべてサーバー側に閉じます。",
      ],
    },
    {
      label: "オブジェクト / テーブル設計",
      node: (
        <div className="h-full bg-white flex flex-col">
          <div className="relative bg-gradient-to-br from-[#0a1f44] via-[#11357a] to-[#0a2a6b] text-white px-9 pt-5 pb-5 overflow-hidden flex-shrink-0">
            <div className="absolute top-3 right-8 flex items-center gap-3 text-white/15 text-[40px] leading-none select-none pointer-events-none">
              <span>🗄️</span><span className="text-[34px]">❄️</span>
            </div>
            <div className="relative flex items-center gap-3">
              <span className="text-[12px] font-bold bg-white/20 border border-white/30 rounded-lg px-2.5 py-1 tracking-wider whitespace-nowrap">🗄 実装</span>
              <div className="min-w-0">
                <h2 className="text-[26px] font-bold leading-tight">Snowflake オブジェクト / テーブル設計</h2>
                <p className="text-sky-100 text-[13px] mt-1">スキーマ分離・チャンク索引・役割別テーブル（IaC 管理）</p>
              </div>
            </div>
          </div>
          <div className="flex-1 px-9 py-4 grid grid-cols-[1.05fr_1fr] gap-6 min-h-0">
            {/* 左：スキーマ構成 */}
            <div className="flex flex-col gap-2.5 min-h-0">
              <div className="font-bold text-slate-700 text-[14px] flex items-center gap-2"><span className="text-indigo-600">🗂️</span>スキーマ構成（全体マップ）</div>
              <div className="bg-[#0e1726] rounded-xl p-3.5 font-mono text-[11.5px] leading-[1.65] flex-1">
                {[
                  { m: "DATABASE  TOCHO_BOUSAI", c: "text-amber-300", cm: "" },
                  { m: "├─ 📁 SCHEMA RAW", c: "text-emerald-300", cm: "取込・解析の中間" },
                  { m: "│  ├─ STAGE DOCS_STAGE  (Directory/SSE)", c: "text-sky-300", cm: "" },
                  { m: "│  └─ TABLE DOC_RAW", c: "text-sky-300", cm: "解析済テキスト" },
                  { m: "├─ 📁 SCHEMA RAG", c: "text-emerald-300", cm: "検索・知識ベース" },
                  { m: "│  ├─ TABLE DOCUMENTS", c: "text-sky-300", cm: "文書マスタ" },
                  { m: "│  ├─ TABLE DOCUMENT_CHUNKS", c: "text-sky-300", cm: "本文+メタ" },
                  { m: "│  ├─ TABLE DOC_SUMMARIES", c: "text-sky-300", cm: "要約" },
                  { m: "│  └─ 🔍 CORTEX SEARCH SERVICE DOC_SEARCH", c: "text-sky-300", cm: "" },
                  { m: "├─ 📁 SCHEMA APP", c: "text-emerald-300", cm: "アプリ運用" },
                  { m: "│  ├─ TABLE CHAT_SESSIONS / MESSAGES", c: "text-sky-300", cm: "" },
                  { m: "│  └─ TABLE DOC_VERSIONS", c: "text-sky-300", cm: "版管理" },
                  { m: "└─ 🏛 WAREHOUSE SEARCH_WH (XS) / ROLE ×3", c: "text-pink-300", cm: "" },
                ].map((l) => (
                  <div key={l.m}><span className={l.c}>{l.m}</span>{l.cm && <span className="text-slate-500">{"  -- " + l.cm}</span>}</div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-[11px] text-slate-700 flex items-start gap-2">
                <span className="text-amber-500 text-[14px] flex-shrink-0">🛡️</span>
                <div><span className="font-bold text-amber-800">制限：</span>1サービス最大1億チャンク／1クエリ最大500件取得。doc_type 別のサービス分割余地も確保。</div>
              </div>
            </div>
            {/* 右：主要テーブルの役割 */}
            <div className="flex flex-col gap-2.5 min-h-0">
              <div className="font-bold text-slate-700 text-[14px] flex items-center gap-2"><span className="text-indigo-600">🗂️</span>主要テーブルの役割</div>
              <div className="grid grid-cols-2 gap-2 text-[11px] flex-1">
                {[
                  { i: "📄", t: "DOCUMENTS", d: "文書マスタ・版・FILE参照" },
                  { i: "🧱", t: "DOCUMENT_CHUNKS", d: "検索の中心。本文+メタ" },
                  { i: "📑", t: "DOC_SUMMARIES", d: "要約で粗検索・節約" },
                  { i: "🔍", t: "DOC_SEARCH (Service)", d: "Cortex Search 索引" },
                  { i: "💬", t: "CHAT_SESSIONS/MESSAGES", d: "会話履歴・引用・トークン記録" },
                  { i: "🏷️", t: "DOC_VERSIONS", d: "改訂履歴・引継ぎ" },
                  { i: "🗄️", t: "DOC_RAW", d: "解析直後の中間テキスト" },
                  { i: "🛡️", t: "ACCESS_HISTORY", d: "監査は ACCOUNT_USAGE 活用" },
                ].map((r) => (
                  <div key={r.t} className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-start gap-2">
                    <span className="text-[15px] flex-shrink-0">{r.i}</span>
                    <div className="min-w-0">
                      <div className="font-mono font-bold text-indigo-700 text-[11px] break-all leading-tight">{r.t}</div>
                      <div className="text-slate-600 mt-0.5 leading-snug">{r.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-[11px] text-slate-700 space-y-1.5">
                <div className="flex gap-2 items-start"><span className="text-emerald-500 flex-shrink-0">▶</span><span>取込(RAW)/知識ベース(RAG)/運用(APP)を<span className="font-semibold">スキーマ分離</span></span></div>
                <div className="flex gap-2 items-start"><span className="text-emerald-500 flex-shrink-0">▶</span><span>生成は<span className="font-semibold">サーバーレス</span>でWH不要。WHは取込・索引更新のみ</span></div>
                <div className="flex gap-2 items-start"><span className="text-emerald-500 flex-shrink-0">▶</span><span>全構成を<span className="font-semibold">IaC（CLI / Terraform）</span>でコード管理</span></div>
              </div>
            </div>
          </div>
        </div>
      ),
      script: [
        "実装の骨格です。データベースは取込の RAW、知識ベースの RAG、運用の APP にスキーマを分け、権限とライフサイクルを独立管理します。",
        "中心となるのはチャンクを保持する DOCUMENT_CHUNKS と、それを索引する Cortex Search Service です。文書マスタ・要約・会話履歴・版管理を役割ごとにテーブル分割します。",
        "生成はサーバーレスでウェアハウス不要。ウェアハウスは取込と索引更新だけに使い、コストを抑えます。すべて IaC でコード管理し、他事業者への引継ぎに備えます。",
      ],
    },
    {
      label: "検索精度・トークン削減・運用",
      node: (
        <div className="h-full bg-white flex flex-col">
          <div className="relative bg-gradient-to-r from-[#e11d48] via-[#ef4444] to-[#f97316] text-white px-9 pt-5 pb-5 overflow-hidden flex-shrink-0">
            <div className="absolute -top-3 right-8 text-white/15 text-[80px] leading-none select-none pointer-events-none">🎯</div>
            <div className="relative flex items-center gap-3">
              <span className="text-[12px] font-bold bg-white/20 border border-white/30 rounded-lg px-2.5 py-1 tracking-wider whitespace-nowrap">📈 最適化</span>
              <div className="min-w-0">
                <h2 className="text-[26px] font-bold leading-tight">検索精度・トークン削減・運用</h2>
                <p className="text-rose-50 text-[13px] mt-1">精度とコストを同時に最適化する設計（D5〜D7）</p>
              </div>
            </div>
          </div>
          <div className="flex-1 px-8 py-4 grid grid-cols-3 gap-4 min-h-0">
            {[
              {
                hIcon: "🔍", hRing: "bg-blue-500", title: "検索精度の向上", tc: "text-blue-700",
                cardBd: "border-blue-100", iconBg: "bg-blue-50", itemTc: "text-blue-700",
                items: [
                  { i: "🔍", t: "ハイブリッド検索（標準）", b: "ベクトル＋キーワード＋再ランクを内部実行。表記ゆれに強くチューニング不要。" },
                  { i: "🔽", t: "属性フィルタで母集団を絞る", b: "doc_type / heading_path で範囲限定。ノイズ減・高速化。" },
                  { i: "📌", t: "見出しをチャンクに前置", b: "短いチャンクでも文脈が通るよう heading_path を本文頭に付与。" },
                  { i: "🔤", t: "略語・同義語の正規化", b: "参集=招集 等の辞書併記でヒット率を底上げ。" },
                ],
              },
              {
                hIcon: "📊", hRing: "bg-rose-500", title: "トークン削減", tc: "text-rose-600",
                cardBd: "border-rose-100", iconBg: "bg-rose-50", itemTc: "text-rose-600",
                items: [
                  { i: "📄", t: "チャンク ≤512 トークン", b: "大きすぎる塊を渡さず必要箇所だけ精密取得。" },
                  { i: "🎯", t: "TOP-K を 3〜5 に制限", b: "渡す文脈量を直接削減。再現率を見つつ最小化。" },
                  { i: "✂️", t: "二段検索（要約→本文）", b: "要約で当たりを付け、関連本文だけを取得。" },
                  { i: "📈", t: "履歴は要約圧縮 / 出力上限", b: "直近Nターン保持＋古い履歴を1行に圧縮、max_tokens 制限。" },
                ],
              },
              {
                hIcon: "⚙️", hRing: "bg-green-500", title: "運用・コスト", tc: "text-green-700",
                cardBd: "border-green-100", iconBg: "bg-green-50", itemTc: "text-green-700",
                items: [
                  { i: "🖥️", t: "ウェアハウス戦略", b: "取込・索引更新は SEARCH_WH（XS, AUTO_SUSPEND=60s）。生成はWH不要。" },
                  { i: "💴", t: "コスト監視", b: "ACCOUNT_USAGE の関数別トークン/クレジットを定期計測。" },
                  { i: "📊", t: "鮮度 vs コスト", b: "TARGET_LAG を業務要件（例:1時間）に合わせ調整。" },
                  { i: "🔀", t: "自動化", b: "Stream + Task で取込〜索引更新を無人化。" },
                  { i: "🛡️", t: "ガバナンス", b: "権限・監査・データ分類でセキュアに運用。" },
                ],
              },
            ].map((col) => (
              <div key={col.title} className="flex flex-col gap-2 min-h-0">
                <div className="flex items-center gap-2.5 pb-1.5 border-b border-slate-100">
                  <span className={"w-8 h-8 rounded-full flex items-center justify-center text-[15px] text-white flex-shrink-0 " + col.hRing}>{col.hIcon}</span>
                  <span className={"font-bold text-[14px] " + col.tc}>{col.title}</span>
                </div>
                {col.items.map((c) => (
                  <div key={c.t} className={"bg-white border rounded-lg px-2.5 py-2 flex items-start gap-2 flex-1 " + col.cardBd}>
                    <span className={"w-7 h-7 rounded-md flex items-center justify-center text-[13px] flex-shrink-0 " + col.iconBg}>{c.i}</span>
                    <div className="min-w-0">
                      <div className={"font-bold text-[11.5px] leading-tight " + col.itemTc}>{c.t}</div>
                      <div className="text-slate-600 text-[10.5px] mt-0.5 leading-snug">{c.b}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ),
      script: [
        "最後に最適化です。検索精度は、ベクトルとキーワードを組み合わせたハイブリッド検索が標準で効くうえ、属性フィルタで母集団を絞り、見出しをチャンクに前置して文脈を補強します。",
        "トークン削減は、チャンクを512トークン以下に保ち、取得は上位3〜5件、会話履歴は要約で圧縮し、出力長にも上限を設けます。これはコスト削減と精度向上を両立します。",
        "運用は、取込・索引更新だけウェアハウスを使い、ACCOUNT_USAGE で関数別のトークンとコストを継続監視します。索引の鮮度は TARGET_LAG で業務要件に合わせて調整します。",
      ],
    },
    {
      label: "Snowflake RAG 比較",
      node: (
        <div className="h-full bg-white flex flex-col">
          <div className="relative bg-gradient-to-br from-[#0c4a6e] via-[#0369a1] to-[#0ea5e9] text-white px-9 pt-5 pb-5 overflow-hidden flex-shrink-0">
            <div className="absolute -top-2 right-6 flex items-center gap-2 text-white/12 text-[52px] leading-none select-none pointer-events-none">
              <span>❄️</span><span className="text-[36px]">⚖️</span>
            </div>
            <div className="relative flex items-center gap-3">
              <span className="text-[12px] font-bold bg-white/20 border border-white/30 rounded-lg px-2.5 py-1 tracking-wider whitespace-nowrap">比較</span>
              <div className="min-w-0">
                <h2 className="text-[26px] font-bold leading-tight">なぜ Snowflake RAG か — Azure / AWS との比較</h2>
                <p className="text-sky-100 text-[13px] mt-1">マルチクラウドでも RAG は構築できる。本案件では「1 基盤完結・索引共有・行政ガバナンス」で Snowflake が最適</p>
              </div>
            </div>
          </div>
          <div className="flex-1 px-6 py-3 min-h-0 overflow-hidden">
            <div className="origin-top-left h-full" style={{ transform: "scale(0.92)", width: "108.7%" }}>
              <SnowflakeRagPlatformComparison compact />
            </div>
          </div>
        </div>
      ),
      script: [
        "最後に、なぜ Snowflake で RAG を構築するのか。Azure や AWS でも同等の RAG は可能ですが、本案件の要件では Snowflake が最も合理的です。",
        "まずアーキテクチャの違いです。Snowflake は Stage から PARSE、チャンク、Cortex Search、COMPLETE、SPCS 上の Next.js までが 1 プラットフォームに収まります。Azure は Blob、AI Search、OpenAI、App Service など、AWS は S3、OpenSearch または Bedrock KB、Bedrock、Lambda など、複数サービスの横断設計が必要です。",
        "本案件の強みは、チャット・整合性チェック・シナリオ生成の 3 機能が同じ Cortex Search 索引を共用できることです。Azure や AWS では機能ごとに index や KB を分けると取込と同期が重複し、保守コストが上がります。",
        "セキュリティ面では、Snowflake の RBAC・Network Policy・監査ログがデータと AI で一貫します。東京リージョンと学習オプトアウトも行政要件に直結します。引継ぎは SQL と IaC 1 本で済み、他事業者への移管がしやすい点も評価ポイントです。",
        "まとめると、Azure は M365 連携、AWS は AWS 全般向けに強い一方、本案件の『訓練文書 RAG + 庁内 GIS 分離』には Snowflake 完結が最もバランスが良い選択です。",
      ],
    },
  ];
}

type TochoSearchTarget = {
  tab: TabId;
  archSub?: ArchSub;
  presentationSlideIdx?: number;
  archSlideIdx?: number;
  qaIdx?: number;
};

type TochoSearchEntry = {
  id: string;
  category: string;
  title: string;
  body: string;
  location: string;
  target: TochoSearchTarget;
};

type TochoSearchHit = TochoSearchEntry & { snippet: string };

function buildTochoSearchIndex(): TochoSearchEntry[] {
  const entries: TochoSearchEntry[] = [];

  for (const g of GLOSSARY) {
    entries.push({
      id: `glossary-${g.term}`,
      category: "用語集",
      title: g.term,
      body: `${g.en} ${g.category} ${g.body}`,
      location: "各タブ下部の用語集",
      target: { tab: "overview" },
    });
  }

  for (const t of tabs) {
    entries.push({
      id: `tab-${t.id}`,
      category: "タブ",
      title: t.label,
      body: t.label,
      location: "メインタブ",
      target: { tab: t.id },
    });
  }

  const archSubTabs: { id: ArchSub; label: string }[] = [
    { id: "overview", label: "全体構成" },
    { id: "dev", label: "開発環境" },
    { id: "chatbot", label: "チャットボット（RAG）" },
    { id: "consistency", label: "整合性チェック" },
    { id: "scenario", label: "シナリオ生成" },
    { id: "slidescript", label: "技術スライド" },
  ];
  for (const st of archSubTabs) {
    entries.push({
      id: `arch-${st.id}`,
      category: "構成図",
      title: st.label,
      body: st.label,
      location: "構成図タブ",
      target: { tab: "architecture", archSub: st.id },
    });
  }

  buildSlides().forEach((s, i) => {
    entries.push({
      id: `slide-pres-${i}`,
      category: "提案スライド",
      title: s.label,
      body: (s.script ?? []).join(" "),
      location: `説明スライド › ${s.label}`,
      target: { tab: "slides", presentationSlideIdx: i },
    });
  });

  buildArchSlides().forEach((s, i) => {
    entries.push({
      id: `slide-arch-${i}`,
      category: "技術スライド",
      title: s.label,
      body: s.script.join(" "),
      location: `構成図 › 技術スライド › ${s.label}`,
      target: { tab: "architecture", archSub: "slidescript", archSlideIdx: i },
    });
  });

  QA_ITEMS.forEach((item, i) => {
    const body = [
      item.q,
      ...item.tags,
      ...item.sections.map((s) => `${s.heading ?? ""} ${s.body}`),
    ].join(" ");
    entries.push({
      id: `qa-${i}`,
      category: "Q&A",
      title: item.q,
      body,
      location: "Q&Aタブ",
      target: { tab: "qa", qaIdx: i },
    });
  });

  const sections: { title: string; body: string; tab: TabId; location: string; archSub?: ArchSub }[] = [
    {
      title: "tocho-geospatial-platform 概要",
      body: "東京都庁向け geospatial プラットフォーム Snowflake ArcGIS Enterprise Portal Next.js 地図 3D可視化 RAG検索基盤 閉域",
      tab: "overview",
      location: "概要タブ",
    },
    {
      title: "Next.js BFF 認証 RBAC",
      body: "Next.js BFF サーバー側 API 資格情報 露出しない 認証 ログイン セッション アプリ権限 IP制限は Snowflake Network Policy RBAC GRANT",
      tab: "architecture",
      location: "構成図タブ",
      archSub: "overview",
    },
    {
      title: "Next.js と Snowflake の接続方法",
      body: "snowflake-sdk API Route BFF lib/db/client.ts HTTPS SSE OAuth PAT SNOWFLAKE_ACCOUNT SNOWFLAKE_PAT SPCS セッショントークン サーバー側のみ 直接接続しない /api/chat /api/consistency /api/scenario",
      tab: "architecture",
      location: "構成図 › 全体構成",
      archSub: "overview",
    },
    {
      title: "開発環境構成図 Terraform PAT",
      body: "開発環境 ローカル IDE Terraform Snowflake CLI snowsql dbt PUT Stage PAT Key Pair rsa_key config.toml env.local terraform apply npm run dev インフラ データ投入",
      tab: "architecture",
      location: "構成図 › 開発環境",
      archSub: "dev",
    },
    {
      title: "参照成果物",
      body: "design.yaml design/1-15-requirements.yaml docs/snowflake-rag-vs-copilot-rag.html IaC",
      tab: "artifacts",
      location: "成果物タブ",
    },
  ];
  for (const s of sections) {
    entries.push({
      id: `section-${s.title}`,
      category: "セクション",
      title: s.title,
      body: s.body,
      location: s.location,
      target: { tab: s.tab, archSub: s.archSub },
    });
  }

  return entries;
}

const TOCHO_SEARCH_INDEX = buildTochoSearchIndex();

function makeSnippet(text: string, query: string, maxLen = 120): string {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return text.slice(0, maxLen) + (text.length > maxLen ? "…" : "");
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + query.length + 60);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return prefix + text.slice(start, end).replace(/\s+/g, " ").trim() + suffix;
}

function searchTochoGuide(query: string): TochoSearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  return TOCHO_SEARCH_INDEX
    .map((entry) => {
      const haystack = `${entry.title} ${entry.body} ${entry.location}`.toLowerCase();
      if (!tokens.every((t) => haystack.includes(t))) return null;
      const snippet = makeSnippet(entry.body || entry.title, tokens[0]);
      return { ...entry, snippet };
    })
    .filter((h): h is TochoSearchHit => h !== null)
    .slice(0, 24);
}

function TochoGuideSearch({
  onNavigate,
}: {
  onNavigate: (target: TochoSearchTarget) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hits = searchTochoGuide(query);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const categoryColor: Record<string, string> = {
    用語集: "bg-emerald-100 text-emerald-700",
    タブ: "bg-slate-100 text-slate-600",
    構成図: "bg-indigo-100 text-indigo-700",
    提案スライド: "bg-sky-100 text-sky-700",
    技術スライド: "bg-violet-100 text-violet-700",
    "Q&A": "bg-amber-100 text-amber-700",
    セクション: "bg-rose-100 text-rose-700",
  };

  return (
    <div ref={containerRef} className="relative mb-5">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            placeholder="ガイド内を検索（例: BFF, Cortex Search, 整合性）"
            className="w-full pl-9 pr-24 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 bg-white"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline text-[10px] text-slate-400 bg-slate-100 border border-slate-200 rounded px-1.5 py-0.5">⌘K</kbd>
        </div>
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); }}
            className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1"
          >
            クリア
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
          {hits.length === 0 ? (
            <div className="px-4 py-6 text-sm text-slate-500 text-center">
              「{query}」に一致する結果はありません
            </div>
          ) : (
            <ul className="py-1">
              {hits.map((hit) => (
                <li key={hit.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(hit.target);
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-rose-50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${categoryColor[hit.category] ?? "bg-gray-100 text-gray-600"}`}>
                        {hit.category}
                      </span>
                      <span className="text-sm font-semibold text-gray-800 truncate">{hit.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{hit.location}</div>
                    <div className="text-xs text-slate-600 mt-0.5 line-clamp-2">{hit.snippet}</div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function SlideScript({
  idx,
  setIdx,
  showScript: controlledShowScript,
  setShowScript: controlledSetShowScript,
}: {
  idx: number;
  setIdx: (i: number) => void;
  showScript?: boolean;
  setShowScript?: (v: boolean) => void;
}) {
  const slides = buildArchSlides();
  const [internalShowScript, setInternalShowScript] = useState(false);
  const showScript = controlledShowScript ?? internalShowScript;
  const setShowScript = controlledSetShowScript ?? setInternalShowScript;
  const current = slides[idx];
  const lines = current.script;
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white rounded-xl p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-indigo-100 text-xs font-semibold mb-1">説明スライド</div>
            <h3 className="font-bold text-base truncate">{current.label}</h3>
          </div>
          <button
            onClick={() => setShowScript(!showScript)}
            aria-pressed={showScript}
            className={`flex-shrink-0 flex items-center gap-1.5 text-[12px] font-bold px-3.5 py-2 rounded-lg border transition ${showScript ? "bg-white text-indigo-700 border-white" : "bg-white/15 text-white border-white/40 hover:bg-white/25"}`}
          >
            <span>🗣️</span>
            <span>{showScript ? "台本を隠す" : "台本を表示"}</span>
          </button>
        </div>
      </div>

      <div className={showScript ? "grid lg:grid-cols-[1.5fr_1fr] gap-4 items-start" : ""}>
        <SlideViewer slides={slides} idx={idx} setIdx={setIdx} />

        {showScript && (
          <div className="bg-white border border-indigo-200 rounded-xl shadow-sm flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-indigo-100 bg-indigo-50/60 rounded-t-xl">
              <span className="text-[12px] font-bold text-indigo-700 bg-white border border-indigo-200 rounded-full px-2.5 py-0.5 tabular-nums">{idx + 1} / {slides.length}</span>
              <span className="text-[13px] font-bold text-slate-700">{current.label}</span>
            </div>
            <div className="p-4 space-y-2 flex-1">
              <div className="text-[11px] font-semibold text-indigo-500 flex items-center gap-1">🗣️ このスライドの台本</div>
              {lines.length > 0 ? (
                lines.map((l, i) => (
                  <p key={i} className="text-[12.5px] text-gray-700 leading-relaxed bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">{l}</p>
                ))
              ) : (
                <p className="text-[12px] text-slate-400">（このスライドの台本は未設定です）</p>
              )}
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-t border-indigo-100">
              <button
                onClick={() => setIdx(Math.max(0, idx - 1))}
                disabled={idx === 0}
                className="text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-default transition"
              >
                ‹ 前へ
              </button>
              <button
                onClick={() => setIdx(Math.min(slides.length - 1, idx + 1))}
                disabled={idx === slides.length - 1}
                className="text-[12px] font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-default transition"
              >
                次へ ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Wbs() {
  type ActivityType = "plan" | "dev" | "expand" | "ops" | "next";
  type Activity = { text: string; type: ActivityType };
  type WbsRow = { section: string; name: string; y1: Activity[]; y2: Activity[]; y3: Activity[] };

  const s: Record<ActivityType, string> = {
    plan:   "bg-cyan-100 text-cyan-900 border border-cyan-300",
    next:   "bg-sky-50 text-sky-700 border border-sky-200",
    dev:    "bg-green-200 text-green-900 border border-green-400",
    expand: "bg-green-500 text-white",
    ops:    "bg-green-800 text-white",
  };

  const rows: WbsRow[] = [
    {
      section: "共通", name: "共通事項",
      y1: [{ text: "ロードマップ策定・方向性検討", type: "plan" }, { text: "次年度検討", type: "next" }],
      y2: [{ text: "次年度検討", type: "next" }],
      y3: [{ text: "次年度検討", type: "next" }],
    },
    {
      section: "①", name: "チャットボット機能",
      y1: [{ text: "初期開発（首都直下型）", type: "dev" }, { text: "訓練構築活用", type: "dev" }],
      y2: [{ text: "対象範囲拡大（南海トラフ・風水害・津波・火山 等）", type: "expand" }, { text: "チャットボット運用開始", type: "ops" }],
      y3: [],
    },
    {
      section: "①", name: "訓練シナリオ整合性チェック機能",
      y1: [{ text: "初期開発（首都直下型）※対象ファイルは限定", type: "dev" }, { text: "訓練構築活用", type: "dev" }],
      y2: [{ text: "機能拡充（首都直下型）※訓練シナリオ全ファイル", type: "expand" }, { text: "精度向上（首都直下型）", type: "expand" }, { text: "対象範囲拡大（南海トラフ・風水害 等）", type: "expand" }],
      y3: [],
    },
    {
      section: "①", name: "訓練シナリオ自動生成機能",
      y1: [{ text: "初期開発（首都直下型）", type: "dev" }, { text: "訓練構築活用", type: "dev" }],
      y2: [{ text: "機能拡充（首都直下型）", type: "expand" }, { text: "精度向上（首都直下型）", type: "expand" }],
      y3: [],
    },
    {
      section: "②", name: "計画・マニュアル見直し修正",
      y1: [{ text: "実施方法の検討・提案", type: "plan" }],
      y2: [{ text: "初期開発（首都直下型）", type: "dev" }],
      y3: [{ text: "機能拡充（首都直下型）※対象ファイル増加", type: "expand" }, { text: "対象範囲拡大（他災害）", type: "expand" }],
    },
    {
      section: "③", name: "被害予想",
      y1: [{ text: "実施方法の検討・提案", type: "plan" }],
      y2: [{ text: "要件整理・方向性検討", type: "plan" }],
      y3: [{ text: "初期開発", type: "dev" }],
    },
    {
      section: "④", name: "判断支援",
      y1: [{ text: "実施方法の検討・提案", type: "plan" }],
      y2: [{ text: "要件整理・方向性検討", type: "plan" }],
      y3: [{ text: "初期開発", type: "dev" }],
    },
    {
      section: "⑤", name: "区市町村展開",
      y1: [{ text: "実施方法の検討・提案", type: "plan" }],
      y2: [{ text: "要件整理・方式検討・調整", type: "plan" }],
      y3: [{ text: "ツール展開検討", type: "plan" }],
    },
  ];

  const legend: { type: ActivityType; label: string }[] = [
    { type: "plan", label: "検討・計画" },
    { type: "next", label: "次年度検討" },
    { type: "dev", label: "初期開発" },
    { type: "expand", label: "機能拡充・拡大" },
    { type: "ops", label: "運用開始" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {legend.map(({ type, label }) => (
          <span key={type} className={`text-xs px-2 py-0.5 rounded ${s[type]}`}>{label}</span>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="text-left bg-gray-100 border border-gray-200 px-3 py-2 text-gray-600 w-52">タスク</th>
              <th className="bg-blue-50 border border-gray-200 px-3 py-2 text-blue-700 text-center">令和8年度（1年目）</th>
              <th className="bg-emerald-50 border border-gray-200 px-3 py-2 text-emerald-700 text-center">2年目</th>
              <th className="bg-amber-50 border border-gray-200 px-3 py-2 text-amber-700 text-center">3年目</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                <td className="border border-gray-200 px-3 py-2 align-top">
                  {row.section !== "共通" && (
                    <span className="font-bold text-rose-600 mr-1">{row.section}</span>
                  )}
                  <span className="text-gray-800 font-medium">{row.name}</span>
                </td>
                {([row.y1, row.y2, row.y3] as Activity[][]).map((acts, yi) => (
                  <td key={yi} className="border border-gray-200 px-2 py-2 align-top">
                    <div className="flex flex-col gap-1">
                      {acts.map((a, ai) => (
                        <span key={ai} className={`inline-block px-2 py-0.5 rounded text-xs leading-snug ${s[a.type]}`}>
                          {a.text}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400">出典: 業務委託仕様書 別紙 スケジュール</p>
      <GlossarySection terms={["図上訓練", "IaC（Infrastructure as Code）"]} />
    </div>
  );
}

function Steps() {
  const steps = [
    {
      phase: "R0", color: "bg-blue-100 text-blue-700", title: "現状把握・要件確認",
      items: [
        "都職員へのインタビュー — 現行訓練の課題・痛点を機能別（①②③④）に整理",
        "既存ハザードマップ・計画書・訓練シナリオの棚卸しと品質評価",
        "KPI設定: チャット回答精度・チェック誤検知率・シミュ表示速度・文書改訂リードタイム",
      ],
    },
    {
      phase: "R1", color: "bg-indigo-100 text-indigo-700", title: "データ設計",
      items: [
        "Snowflake スキーマ設計（文書テーブル・チャット履歴・監査ログ・ユーザー管理）",
        "文書分類体系の定義（計画書 / 手順書 / 訓練シナリオ / 事例集 / 被害想定）",
        "GIS データカタログ整備 — 利用可能なハザードデータのフォーマット・座標系・更新頻度確認",
      ],
    },
    {
      phase: "R2", color: "bg-green-100 text-green-700", title: "AI 基盤構築（Snowflake）",
      items: [
        "Snowflake Cortex 環境構築（国内リージョン・LLM モデル選定・オプトアウト設定）",
        "RAG パイプライン構築 — Cortex Search + 文書取込み自動化（PDF/docx/xlsx パース）",
        "IP アクセス制限・RBAC（3 ロール）・Secrets 管理・APIキー環境変数化",
      ],
    },
    {
      phase: "R3", color: "bg-emerald-100 text-emerald-700", title: "GIS 基盤構築（ArcGIS）",
      items: [
        "ArcGIS Maps SDK for JavaScript 環境構築（WebGL・Feature Layer・3D Scene View）",
        "ハザードマップデータ取込み — 津波浸水・首都直下地震震度分布・南海トラフ・富士山噴火降灰・風水害",
        "ハザードマップ表示性能検証 — 複数レイヤー同時表示時の描画速度・切替レスポンスの確認",
      ],
    },
    {
      phase: "R4", color: "bg-amber-100 text-amber-700", title: "機能① 実装（AI機能群）",
      items: [
        "チャットボット実装 — Cortex COMPLETE + RAG + マルチターン履歴（過去 10 回分）",
        "訓練シナリオ整合性チェック実装 — 文書比較・差異箇所ハイライト・根拠ページ表示",
        "訓練シナリオ自動生成実装 — 条件パラメータ（災害種別・規模・対象局）→ LLM シナリオ生成",
      ],
    },
    {
      phase: "R5", color: "bg-rose-100 text-rose-700", title: "機能② 実装（計画・文書作成）",
      items: [
        "計画書・マニュアル取込みエディタ実装（docx 読込・段落単位編集・差分ハイライト）",
        "AI 改訂提案機能実装 — 最新被害想定データ・ハザードマップとの整合性を自動チェックし提案生成",
        "版管理・差分表示・承認フロー設計（編集者→管理者→確定の権限フロー）",
      ],
    },
    {
      phase: "R6", color: "bg-teal-100 text-teal-700", title: "機能③ 実装（被害予想シミュレーション）",
      items: [
        "条件設定 UI 実装 — 災害種別・規模・発生時刻・対象地域のパラメータ入力フォーム",
        "ArcGIS Feature Layer 動的切替 — 津波 / 震度分布 / 噴火降灰 / 洪水・土砂災害 レイヤーをパラメータ連動で切替",
        "被害推計結果の地図重ね合わせ — 建物倒壊棟数・浸水面積・推定避難者数をポリゴン着色で表示",
        "被害推計結果の可視化精度向上 — ポリゴン着色・凡例表示・エクスポート機能の実装",
      ],
    },
    {
      phase: "R7", color: "bg-violet-100 text-violet-700", title: "機能④ 実装（判断支援）",
      items: [
        "情報統合ダッシュボード実装 — 被害予想・チャット・文書を一画面で参照できる統合ビュー",
        "AI 推奨アクション生成 — 現況データを Cortex に渡し、優先対応リストと根拠を自動生成",
        "区市町村展開を見据えた組織・権限設定 UI（局・課単位でのロール付与）",
      ],
    },
    {
      phase: "R8", color: "bg-orange-100 text-orange-700", title: "統合検証・図上訓練実証",
      items: [
        "全機能統合テスト — KPI 計測・性能検証（シミュ描画速度・チャット応答速度）",
        "令和9年1月 首都直下地震図上訓練での実証運用（都職員による実際の訓練での利用）",
        "フィードバック収集 → 精度向上・UI 改善・シナリオ追加対応",
      ],
    },
    {
      phase: "R9", color: "bg-gray-100 text-gray-700", title: "引継ぎ・保守体制整備",
      items: [
        "他事業者への移行設計 — 標準 SQL・IaC（Terraform）・環境再現手順書の整備",
        "運用手順書・技術引継ぎ資料の作成（Snowflake 権限棚卸・ArcGIS レイヤー管理手順含む）",
        "KPI 評価報告書の取りまとめ・令和9年2月26日までに提出",
      ],
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-800">開発手順（R0-R9）</h3>
      {steps.map((row) => (
        <div key={row.phase} className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${row.color}`}>{row.phase}</span>
            <span className="text-sm font-semibold text-gray-800">{row.title}</span>
          </div>
          <ul className="space-y-1">
            {row.items.map((item, i) => (
              <li key={i} className="text-sm text-gray-600 flex gap-2">
                <span className="text-gray-400 flex-shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <GlossarySection terms={["RAG（Retrieval-Augmented Generation）", "Cortex AI", "SPCS（Snowpark Container Services）", "ArcGIS Maps SDK for JavaScript", "PLATEAU", "IaC（Infrastructure as Code）", "マルチターン対話"]} />
    </div>
  );
}

type KeyPoint = {
  text: string;
  tag?: "必須" | "評価対象" | "技術要件" | "スケジュール" | "体制" | "入札手続";
  snowflake?: { ok: "yes" | "partial" | "no"; note: string };
};

type DocKeyPoints = {
  id: string;
  summary: string;
  points: KeyPoint[];
};

const docKeyPoints: Record<string, DocKeyPoints> = {
  "33314827_仕様書.pdf": {
    id: "spec",
    summary: "業務委託仕様書 — 要件・体制・スケジュール・著作権など業務全般の要求事項",
    points: [
      { text: "受託者は、防災に関する知見を活用した検討が可能となるよう、専門的知識を有する人材の参画又は助言を受けられる体制を確保すること。", tag: "必須" },
      { text: "業務責任者は、災害事象及び行政の災害対処の実例等に関する知見を有し、日本語に堪能でなければならない。", tag: "体制" },
      { text: "本事業は複数年度に渡るプロジェクトを予定しており、作成したツールは令和８年度以降も引継ぎ、さらなる充実・強化を図っていくことを想定している。", tag: "スケジュール" },
      { text: "本システムの運用保守は、受託者に依存することなく、他事業者でも変更及び引継ぎが可能であること。", tag: "必須", snowflake: { ok: "yes", note: "Snowflake は標準 SQL ベース。Cortex / SPCS の設定はコードで管理でき、他事業者でも引継ぎ・変更が可能。" } },
      { text: "利用するAI（LLM）のプロバイダ及びモデルの変更を容易に行える構成とすること。", tag: "技術要件", snowflake: { ok: "yes", note: "Cortex COMPLETE の第一引数（モデル名）を変更するだけで切り替え可能。コード変更は1行。" } },
      { text: "特定の技術や製品に依存せず、継続的に安定した品質保証が受けられるオープンな標準に基づいた技術を採用すること。", tag: "技術要件", snowflake: { ok: "partial", note: "Snowflake 自体は独自 SaaS だが、標準 SQL・S3互換ストレージ・REST API でアクセス可能。ロックインリスクへの説明が必要。" } },
      { text: "システム更改時において、円滑なデータ移行が可能なシステム構成であること。", tag: "技術要件", snowflake: { ok: "yes", note: "標準 SQL・CSV/Parquet/JSON でのエクスポートに対応。Snowflake 独自フォーマットへの依存なし。" } },
      { text: "令和８年10月末までに納品すること。", tag: "スケジュール" },
      { text: "令和９年１月実施予定の首都直下地震図上訓練での活用・検証を行うこと。", tag: "スケジュール" },
      { text: "打合わせの頻度は２週間に１回を標準とする。", tag: "体制" },
      { text: "本業務の全部又は主要な部分を一括して第三者に委託してはならない。", tag: "必須" },
      { text: "成果物の著作権は引渡し時に委託者に無償で譲渡する。", tag: "必須" },
    ],
  },
  "33314827_仕様書別紙１.pdf": {
    id: "appendix",
    summary: "機能要件別紙１（別紙1-1〜1-5）— LLM・RAG・セキュリティ・ユーザー管理の詳細要件",
    points: [
      { text: "対象ユーザーは都職員等 20名。3機能：チャットボット、訓練資料整合性チェック、訓練シナリオ自動作成。", tag: "技術要件", snowflake: { ok: "yes", note: "Cortex COMPLETE + Cortex Search で3機能すべて実装可能。Streamlit in Snowflake または SPCS で UI 提供。20名規模は問題なし。" } },
      { text: "LLMの入力トークン数は200,000以上（必要に応じ1,000,000程度まで拡張可能であることが望ましい）。", tag: "技術要件", snowflake: { ok: "yes", note: "Cortex で Claude 3.5 Sonnet（200K コンテキスト）を提供。Claude 3.7 Sonnet は 1M トークン対応で望ましい要件も充足。" } },
      { text: "LLMの出力トークン数は8,000以上（必要に応じ16,000程度まで拡張可能であることが望ましい）。", tag: "技術要件", snowflake: { ok: "yes", note: "Cortex の Claude 3.5 Sonnet は最大 8,192 トークン出力対応。Claude 3.7 では 16K 超も可能。" } },
      { text: "生成AIサービス側で、入力データが学習に利用されない設定（オプトアウト）とすること。", tag: "必須", snowflake: { ok: "yes", note: "Snowflake Cortex はお客様データをモデル学習に使用しないことを利用規約・DPA で保証。追加手続き不要。" } },
      { text: "国内リージョンでの提供が可能なモデルであること。", tag: "必須", snowflake: { ok: "yes", note: "Snowflake 東京リージョン（AWS ap-northeast-1）で Cortex AI が利用可能。データが国内に留まる。" } },
      { text: "容易に最新の生成AIモデルへ切り替えられること。", tag: "技術要件", snowflake: { ok: "yes", note: "COMPLETE('model-name', ...) のモデル名引数を変更するだけ。Snowflake 側でモデル追加され次第即利用可能。" } },
      { text: "RAGのデータ保存量は最大10GB程度。ファイル入力は5つ以上選択可能（PDF・docx・xlsx形式など）。", tag: "技術要件", snowflake: { ok: "yes", note: "Cortex Search + Snowflake Stage で PDF/docx/xlsx を取込み・ベクトル化。10GB は容量制限に余裕で対応。" } },
      { text: "各機能ごとに過去10回程度のやりとりまで記録できること（マルチターン対応）。", tag: "技術要件", snowflake: { ok: "yes", note: "会話履歴を Snowflake テーブルに保存し COMPLETE の messages 配列に渡すことでマルチターンを実現。" } },
      { text: "IPアドレスによるアクセス制限を行えること。", tag: "必須", snowflake: { ok: "yes", note: "Snowflake ネットワークポリシーで IP ホワイトリスト設定が可能。アカウント・ユーザー単位で制御できる。" } },
      { text: "APIキーは環境変数等で管理し、コードベースにハードコーディングしないこと。", tag: "必須", snowflake: { ok: "yes", note: "SPCS の Secrets オブジェクト または環境変数で API キーを安全管理。Cortex を使う場合はキー不要（Snowflake 認証で完結）。" } },
      { text: "管理者・編集者・一般ユーザーの3種類のロール設定が可能であること。", tag: "技術要件", snowflake: { ok: "yes", note: "Snowflake RBAC でロールを自由に定義できる。3ロール構成はネイティブに対応。" } },
    ],
  },
  "33314827_入札説明書.pdf": {
    id: "bid",
    summary: "入札説明書 — 入札資格・スケジュール・手続きの詳細",
    points: [
      { text: "入札方法: 総合評価一般競争入札（入札書＋技術提案書の両方を提出すること）。", tag: "入札手続" },
      { text: "参加資格: 東京都令和7・8年度物品買入れ等 営業種目121「情報処理業務」Ａ等級（スタートアップはＢ・Ｃ等級も可）。", tag: "入札手続" },
      { text: "参加資格確認申請書の提出期間: 令和8年6月2日（火）〜6月5日（金）。", tag: "スケジュール" },
      { text: "入札期間（電子調達システム）: 資格確認結果通知日〜令和8年7月7日（火）午後4時。", tag: "スケジュール" },
      { text: "開札: 令和8年7月22日（水）午前10時、東京都庁第一本庁舎南側35階 第１入札室。", tag: "スケジュール" },
      { text: "入札書には消費税抜きの金額（契約希望金額の110分の100）を記入すること。落札金額確定時に10%加算。", tag: "入札手続" },
      { text: "入札保証金及び契約保証金は免除。", tag: "入札手続" },
      { text: "契約期間: 契約確定の日の翌日から令和9年3月26日まで。", tag: "スケジュール" },
    ],
  },
  "33314827_総合評価資料.pdf": {
    id: "eval",
    summary: "総合評価資料 — 落札者決定基準・評価配点・提案書作成留意事項",
    points: [
      { text: "技術点200点＋価格点100点＝合計300点で落札者決定。技術点の内訳: 業務理解度30点、受託実績等30点、実施計画・手法等105点、体制35点。", tag: "評価対象" },
      { text: "防災専門知識を有する人材の参画または助言体制を確保すること（必須要件 — 未充足で無効）。", tag: "必須" },
      { text: "他事業者への引継ぎ方法が評価項目（第３章第２の４、係数×3で15点）。", tag: "評価対象", snowflake: { ok: "yes", note: "Snowflake は標準 SQL ベースで IaC 管理可能（Terraform/Snowflake CLI）。引継ぎ資料の作成が容易で高評価が見込める。" } },
      { text: "運用保守コストの抑制方法・技術力が評価対象（係数×4で20点）。", tag: "評価対象", snowflake: { ok: "yes", note: "Snowflake は従量課金（使った分だけ）。Cortex も API コール単位課金でサーバー管理不要。コスト最適化を具体的に訴求できる。" } },
      { text: "本ツールが最終的に目指す目標・方向性への理解、3年間での達成手段、生成AI技術進歩への柔軟性が評価軸。", tag: "評価対象", snowflake: { ok: "yes", note: "Cortex のモデルは Snowflake が継続更新。新モデル対応もモデル名変更のみで柔軟に対応できる点を訴求可能。" } },
      { text: "図上訓練が抱える課題の把握・ロードマップ策定が不可欠な視点として明示されている。", tag: "評価対象" },
      { text: "提案書提出後、開札日までにヒアリング実施（30分程度/事業者）。", tag: "入札手続" },
    ],
  },
};

const tagColors: Record<string, string> = {
  必須: "bg-red-100 text-red-700",
  評価対象: "bg-amber-100 text-amber-700",
  技術要件: "bg-blue-100 text-blue-700",
  スケジュール: "bg-green-100 text-green-700",
  体制: "bg-purple-100 text-purple-700",
  入札手続: "bg-gray-100 text-gray-700",
};

function DocViewer({ activeDoc, setActiveDoc }: { activeDoc: string; setActiveDoc: (f: string) => void }) {
  const current = docKeyPoints[activeDoc] ?? docKeyPoints["33314827_仕様書.pdf"];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {tochoDocs.map((doc) => (
          <button
            key={doc.id}
            onClick={() => setActiveDoc(doc.file)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
              activeDoc === doc.file
                ? "bg-rose-600 text-white border-rose-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {doc.label}
          </button>
        ))}
      </div>

      <div className="bg-rose-50 border border-rose-200 rounded-lg px-4 py-3">
        <p className="text-xs text-rose-700">{current.summary}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 items-start">
        <div className="space-y-2">
          {current.points.map((point, i) => (
            <div key={i} className="flex gap-3 bg-white border border-gray-100 rounded-lg px-4 py-3 hover:border-rose-200 transition-colors">
              <span className="flex-shrink-0 mt-0.5 w-5 h-5 bg-rose-100 text-rose-600 rounded-full text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 leading-relaxed">{point.text}</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {point.tag && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tagColors[point.tag]}`}>
                      {point.tag}
                    </span>
                  )}
                  {point.snowflake && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      point.snowflake.ok === "yes" ? "bg-sky-100 text-sky-700" :
                      point.snowflake.ok === "partial" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      ❄️ {point.snowflake.ok === "yes" ? "充足" : point.snowflake.ok === "partial" ? "要説明" : "非充足"}
                    </span>
                  )}
                </div>
                {point.snowflake && (
                  <p className="mt-1.5 text-xs text-gray-500 leading-relaxed border-l-2 border-sky-200 pl-2">
                    {point.snowflake.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <iframe
            title="tocho-doc-viewer"
            src={`/api/tocho-docs?file=${encodeURIComponent(activeDoc)}`}
            className="w-full h-[720px]"
          />
        </div>
      </div>
      <GlossarySection terms={["図上訓練", "RAG（Retrieval-Augmented Generation）", "Cortex AI", "ArcGIS Maps SDK for JavaScript", "ハザードマップ"]} />
    </div>
  );
}

function Artifacts() {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-gray-800">参照成果物</h3>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
          <li>design.yaml</li>
          <li>design/1-15-requirements.yaml</li>
          <li>docs/snowflake-rag-vs-copilot-rag.html</li>
        </ul>
      </div>
      <p className="text-xs text-gray-500">資料更新時は、仕様ソース → design.yaml → ガイドの順で追従させます。</p>
      <GlossarySection terms={["IaC（Infrastructure as Code）"]} />
    </div>
  );
}

export default function TochoGuide() {
  const [tab, setTab] = useState<TabId>("overview");
  const [activeDoc, setActiveDoc] = useState<string>(tochoDocs[0].file);
  const [archSub, setArchSub] = useState<ArchSub>("overview");
  const [presentationSlideIdx, setPresentationSlideIdx] = useState(0);
  const [archSlideIdx, setArchSlideIdx] = useState(0);
  const [presentationShowScript, setPresentationShowScript] = useState(false);
  const [archShowScript, setArchShowScript] = useState(false);
  const [qaOpenIdx, setQaOpenIdx] = useState<number | null>(null);
  const [proposalSlideIdx, setProposalSlideIdx] = useState(0);
  const [proposalShowScript, setProposalShowScript] = useState(false);

  const openDoc = (file: string) => {
    setActiveDoc(file);
    setTab("docs");
  };

  const handleSearchNavigate = (target: TochoSearchTarget) => {
    setTab(target.tab);
    if (target.archSub) setArchSub(target.archSub);
    if (target.presentationSlideIdx !== undefined) {
      setPresentationSlideIdx(target.presentationSlideIdx);
      setPresentationShowScript(true);
    }
    if (target.archSlideIdx !== undefined) {
      setArchSlideIdx(target.archSlideIdx);
      setArchShowScript(true);
    }
    if (target.qaIdx !== undefined) setQaOpenIdx(target.qaIdx);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">🗼 tocho-geospatial-platform</h2>
        <p className="text-sm text-gray-500 mt-1">HVD(Next.js + SPCS)と同じ粒度で整理した、東京都庁案件の開発ガイド</p>
      </div>

      <TochoGuideSearch onNavigate={handleSearchNavigate} />

      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-4 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id ? "bg-rose-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "slides" && (
        <Slides
          idx={presentationSlideIdx}
          setIdx={setPresentationSlideIdx}
          showScript={presentationShowScript}
          setShowScript={setPresentationShowScript}
        />
      )}
      {tab === "proposal" && (
        <ProposalDeck
          idx={proposalSlideIdx}
          setIdx={setProposalSlideIdx}
          showScript={proposalShowScript}
          setShowScript={setProposalShowScript}
        />
      )}
      {tab === "overview" && <Overview onDocOpen={openDoc} />}
      {tab === "architecture" && (
        <Architecture
          onDocOpen={openDoc}
          sub={archSub}
          setSub={setArchSub}
          archSlideIdx={archSlideIdx}
          setArchSlideIdx={setArchSlideIdx}
          archShowScript={archShowScript}
          setArchShowScript={setArchShowScript}
        />
      )}
      {tab === "wbs" && <Wbs />}
      {tab === "steps" && <Steps />}
      {tab === "docs" && <DocViewer activeDoc={activeDoc} setActiveDoc={setActiveDoc} />}
      {tab === "artifacts" && <Artifacts />}
      {tab === "qa" && <QA openIdx={qaOpenIdx} setOpenIdx={setQaOpenIdx} />}
    </div>
  );
}
