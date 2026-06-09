"use client";

import { useState } from "react";

type TabId = "overview" | "architecture" | "wbs" | "steps" | "docs" | "artifacts" | "slides" | "qa";

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
          ArcGIS Maps SDK for JavaScript と Next.js を組み合わせ、部局横断で利用できる
          地図・3D可視化・RAG検索基盤を構築します。
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
      <GlossarySection terms={["図上訓練", "RAG（Retrieval-Augmented Generation）", "Cortex AI", "ArcGIS Maps SDK for JavaScript", "ハザードマップ"]} />
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

function Architecture({ onDocOpen }: { onDocOpen: (file: string) => void }) {
  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-gray-800">システム構成図</h3>

      <div className="space-y-2 text-xs">
        {/* Layer 1: Users */}
        <div className="flex justify-center">
          <div className="bg-blue-50 border border-blue-300 rounded-lg px-8 py-2 text-center">
            <div className="font-bold text-blue-800 text-sm">利用者 / 都職員（20名）</div>
            <div className="text-blue-600 mt-0.5">質問・条件設定・文書編集・訓練実施</div>
          </div>
        </div>
        <div className="text-center text-gray-400">↓ ↓ ↓ ↓</div>

        {/* Layer 2: Feature UIs */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-amber-50 border border-amber-300 rounded-lg p-3">
            <div className="font-bold text-amber-800 mb-1">① AI機能群</div>
            <div className="text-amber-700 space-y-0.5">
              <div>• チャットボット（RAG Q&A）</div>
              <div>• 訓練シナリオ整合性チェック</div>
              <div>• 訓練シナリオ自動生成</div>
            </div>
          </div>
          <div className="bg-rose-50 border border-rose-300 rounded-lg p-3">
            <div className="font-bold text-rose-800 mb-1">② 計画・文書作成</div>
            <div className="text-rose-700 space-y-0.5">
              <div>• AI提案付きエディタ</div>
              <div>• 計画書・マニュアル改訂</div>
              <div>• 版管理・差分表示・承認</div>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-3">
            <div className="font-bold text-emerald-800 mb-1">③ 被害予想シミュレーション</div>
            <div className="text-emerald-700 space-y-0.5">
              <div>• 条件設定UI（災害種別・規模）</div>
              <div>• ArcGIS 2D/3D 地図ビュー</div>
              <div>• 津波・震度・噴火・洪水レイヤー</div>
            </div>
          </div>
          <div className="bg-violet-50 border border-violet-300 rounded-lg p-3">
            <div className="font-bold text-violet-800 mb-1">④ 判断支援</div>
            <div className="text-violet-700 space-y-0.5">
              <div>• 情報統合ダッシュボード</div>
              <div>• AI推奨アクション生成</div>
              <div>• 被害予想×文書×チャット連携</div>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400">↓</div>

        {/* Layer 3: App Server */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-orange-100 border border-orange-400 rounded-lg p-3">
            <div className="font-bold text-orange-800">Web アプリ（Next.js / SPCS）</div>
            <div className="text-orange-700 mt-1">認証・IPアクセス制限・RBAC（3ロール）・APIゲートウェイ・マルチターン履歴管理</div>
          </div>
          <div className="bg-green-200 border border-green-600 rounded-lg p-3">
            <div className="font-bold text-green-900">ArcGIS Maps SDK for JavaScript</div>
            <div className="text-green-800 mt-1">WebGL 描画 / Feature Layer 動的切替 / 3D Scene View / 空間クエリ</div>
          </div>
        </div>
        <div className="text-center text-gray-400">↓</div>

        {/* Layer 4: Backend Services */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-green-50 border border-green-500 rounded-lg p-3">
            <div className="font-bold text-green-800">Snowflake Cortex AI</div>
            <div className="text-green-700 mt-1 space-y-0.5">
              <div>• LLM（Claude / Mixtral）200K+ トークン</div>
              <div>• RAG Embedding・Cortex Search</div>
              <div>• 国内リージョン（東京）対応</div>
              <div>• 入力データ学習不使用（オプトアウト）</div>
            </div>
          </div>
          <div className="bg-green-50 border border-green-500 rounded-lg p-3">
            <div className="font-bold text-green-800">Snowflake データ基盤</div>
            <div className="text-green-700 mt-1 space-y-0.5">
              <div>• 文書ストレージ（RAG用 10GB+）</div>
              <div>• チャット履歴・監査ログ</div>
              <div>• RBAC・ネットワークポリシー</div>
              <div>• APIキー Secrets 管理</div>
            </div>
          </div>
          <div className="bg-teal-50 border border-teal-500 rounded-lg p-3">
            <div className="font-bold text-teal-800">ArcGIS Platform</div>
            <div className="text-teal-700 mt-1 space-y-0.5">
              <div>• ハザードマップ配信（Feature Layer）</div>
              <div>• 空間解析・ジオプロセシング</div>
              <div>• PLATEAU CityGML → 3D シーン変換</div>
              <div>• 被害推計レイヤー管理</div>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400">↓</div>

        {/* Layer 5: Data Sources */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 border border-slate-300 rounded-lg p-3">
            <div className="font-bold text-slate-700">訓練文書・参照データ</div>
            <div className="text-slate-600 mt-1">計画書 / 手順書 / 訓練シナリオ / 過去事例 / 各局被害想定（PDF・docx・xlsx）</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-3">
            <div className="font-bold text-slate-700">地理空間データ / 被害想定データ</div>
            <div className="text-slate-600 mt-1">津波浸水想定 / 首都直下地震 震度分布 / 南海トラフ / 富士山噴火降灰シミュ / 大規模風水害・土砂災害</div>
          </div>
        </div>
      </div>

      <h3 className="font-semibold text-gray-800">想定UI モック</h3>
      <UIMock />

      <DocLinks onDocOpen={onDocOpen} />
      <GlossarySection terms={["RAG（Retrieval-Augmented Generation）", "Cortex AI", "SPCS（Snowpark Container Services）", "ArcGIS Maps SDK for JavaScript", "PLATEAU", "ハザードマップ", "IaC（Infrastructure as Code）", "マルチターン対話"]} />
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
    body: "Esri 社が提供する Web ブラウザ向け GIS ライブラリ。WebGL を使った 2D/3D 地図描画、Feature Layer（ハザードマップ等）の動的切替、空間解析エンジンを提供する。SDK 自体は無料で利用でき、有償部分は ArcGIS Platform のホスト型レイヤーや分析クレジット。本案件では津波・地震・噴火・洪水の被害予想を地図上でリアルタイム可視化するために使用。",
  },
  {
    term: "IaC（Infrastructure as Code）",
    en: "Infrastructure as Code",
    category: "DevOps",
    body: "サーバー・ネットワーク・クラウドリソースなどのインフラ構成をコード（Terraform・Snowflake CLI 等）で記述・管理する手法。コードをリポジトリで管理することで、環境の再現性・変更履歴の追跡・他事業者への引継ぎが容易になる。仕様書の「他事業者引継ぎ」要件（×3 係数・最大 15pt）を満たすための重要な手段。",
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

function QA() {
  const [open, setOpen] = useState<number | null>(null);

  type QAItem = {
    q: string;
    tags: string[];
    sections: { heading?: string; body: string; type?: "warn" | "ok" | "info" | "note" }[];
  };

  const items: QAItem[] = [
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
          body: "MapLibre GL JS + GeoServer + PostGIS でハザードマップ配信は可能ですが、次の追加コストが発生します：\n・GeoServer / PostGIS の構築・運用（インフラ設計が必要）\n・PLATEAU CityGML → MVT 変換パイプライン自前実装\n・3D シーン管理・レンダリング最適化の自前実装\n・ArcGIS Platform が提供するハザードマップレイヤー（津波・地震・洪水）の自前整備\n\n結果として開発コスト増・納期リスク増・品質低下のリスクが生じるため、本案件ではArcGIS を採用するのが合理的です。",
          type: "note",
        },
        {
          heading: "ライセンスコストの観点",
          body: "ArcGIS Maps SDK for JavaScript 自体は無料（JSAPI）。有償部分は ArcGIS Platform のホスト型レイヤーや分析クレジットです。ハザードマップを国土数値情報（無料）やオープンデータで代替すれば、ArcGIS Platform のクレジット消費を最小限に抑えることも可能です。",
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
          body: "① データストレージは標準 SQL（Snowflake SQL は PostgreSQL 互換が高い）。\n② ドキュメント・チャット履歴は構造化テーブルに保存するため、CSV / Parquet でエクスポートしてどこへでも移行可能。\n③ フロントエンド（Next.js）は Snowflake に依存しない。API レイヤーのエンドポイント URL を変更するだけで他 LLM バックエンドに切り替え可能。\n④ IaC（Terraform / Snowflake CLI）でインフラをコード管理すれば、構成の再現性・引継ぎが容易。",
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
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => setOpen(open === i ? null : i)}
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
            <span className="text-gray-400 text-lg mt-0.5 flex-shrink-0">{open === i ? "▲" : "▼"}</span>
          </button>

          {open === i && (
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

function Slides() {
  const [idx, setIdx] = useState(0);

  type Slide = { label: string; node: React.ReactNode };

  const slides: Slide[] = [
    {
      label: "タイトル",
      node: (
        <div className="h-full bg-gradient-to-br from-blue-800 to-blue-950 flex flex-col text-white px-10 pt-7 pb-5">
          <div className="text-center mb-4">
            <div className="text-blue-300 text-xs font-semibold tracking-widest uppercase mb-2">東京都 × 生成AI × 地理空間情報</div>
            <h1 className="text-2xl font-bold leading-snug">東京の災害対応力の向上に向けた<br />生成AI を活用した図上訓練構築支援委託</h1>
            <p className="text-blue-200 text-sm mt-2">Snowflake Cortex × ArcGIS による地図連動型 AI 訓練支援システム</p>
            <div className="flex gap-2 flex-wrap justify-center mt-3">
              {["東京都庁", "令和8〜10年度", "都職員 20名", "契約番号 08-02016"].map((t) => (
                <span key={t} className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">{t}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-auto">
            {[
              { num: "①", icon: "🤖", title: "AI 機能群", desc: "チャット・整合性チェック・シナリオ自動生成", color: "border-amber-400/50 bg-amber-400/10" },
              { num: "②", icon: "📝", title: "計画・文書作成", desc: "AI 改訂提案・エディタ編集・版管理", color: "border-rose-400/50 bg-rose-400/10" },
              { num: "③", icon: "🗺️", title: "被害予想シミュ", desc: "GIS 地図・ハザードマップ 5 種可視化", color: "border-emerald-400/50 bg-emerald-400/10" },
              { num: "④", icon: "🧭", title: "判断支援", desc: "情報統合・AI 推奨アクション生成", color: "border-violet-400/50 bg-violet-400/10" },
            ].map((f) => (
              <div key={f.num} className={`border rounded-xl p-3 ${f.color}`}>
                <div className="text-2xl mb-1">{f.icon}</div>
                <div className="text-sm font-bold">{f.num} {f.title}</div>
                <div className="text-xs text-blue-200 mt-1 leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "課題",
      node: (
        <div className="h-full bg-white flex flex-col">
          <div className="bg-gray-800 text-white px-8 py-4">
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Background</div>
            <h2 className="text-xl font-bold">現状の課題</h2>
          </div>
          <div className="flex-1 p-5 grid grid-cols-2 gap-3">
            {[
              {
                icon: "📋",
                title: "整合性チェックが手作業",
                body: "防災計画書・訓練シナリオ・ハザードマップは別々に管理されており、改訂のたびに担当者が目視で整合性を確認している。更新漏れや記述の矛盾が生じやすく、訓練本番で不整合が発覚するリスクがある。",
                source: "仕様書 §1 背景・目的",
              },
              {
                icon: "⏱️",
                title: "シナリオ作成の工数大",
                body: "首都直下地震を想定した1シナリオの作成だけで数週間を要している。南海トラフ・津波・富士山噴火・大規模風水害など複数災害への拡張が困難で、年度をまたいだ計画の見直しにも多大な時間を費やしている。",
                source: "仕様書 §2 業務内容①",
              },
              {
                icon: "🗺️",
                title: "被害可視化ツールの不足",
                body: "現行の訓練環境では、津波浸水域・建物倒壊リスク・避難経路などを地図上でリアルタイムに重ね合わせて確認できるツールがない。被害規模の直感的な把握が難しく、意思決定の遅延につながっている。",
                source: "仕様書別紙１ §3 GIS 活用要件",
              },
              {
                icon: "🔄",
                title: "他事業者への引継ぎ困難",
                body: "現行システムが特定ベンダーに依存した構成となっており、他事業者が保守・運用・機能追加を行える状態になっていない。複数年度にわたる事業継続性を担保するため、引継ぎ可能な設計が必須要件として明示されている。",
                source: "仕様書 §4 引継ぎ要件（必須）",
              },
            ].map((c) => (
              <div key={c.title} className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex flex-col">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl">{c.icon}</span>
                  <span className="font-semibold text-gray-800 text-sm">{c.title}</span>
                </div>
                <div className="text-xs text-gray-600 leading-relaxed flex-1">{c.body}</div>
                <div className="mt-2 text-xs text-gray-400 italic border-t border-gray-200 pt-1.5">出典: {c.source}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "解決策",
      node: (
        <div className="h-full bg-white flex flex-col">
          <div className="bg-rose-700 text-white px-8 py-3">
            <div className="text-xs text-rose-200 font-semibold uppercase tracking-widest">Solution</div>
            <h2 className="text-lg font-bold">4 つの機能による解決アプローチ</h2>
          </div>
          <div className="flex-1 p-4 grid grid-cols-2 gap-3">
            {[
              {
                num: "①", bg: "bg-amber-50 border-amber-300", accent: "text-amber-700", hdr: "bg-amber-100",
                title: "AI機能群", body: "チャットボット / 整合性チェック / シナリオ自動生成で計画書管理を効率化",
                preview: (
                  <div className="mt-2 bg-white border border-amber-200 rounded p-2 text-xs space-y-1">
                    <div className="flex gap-2 items-start"><span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold flex-shrink-0">Q</span><span className="text-gray-600">首都直下型の参集基準は？</span></div>
                    <div className="flex gap-2 items-start"><span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold flex-shrink-0">A</span><span className="text-gray-600">対処計画 p.23 に記載。震度5強以上で全局参集…<span className="text-amber-600">（根拠付き）</span></span></div>
                  </div>
                ),
              },
              {
                num: "②", bg: "bg-rose-50 border-rose-300", accent: "text-rose-700", hdr: "bg-rose-100",
                title: "計画・文書作成", body: "AI が改訂ポイントを提案。エディタで直接編集し計画書を常に最新に",
                preview: (
                  <div className="mt-2 bg-white border border-rose-200 rounded p-2 text-xs space-y-1">
                    <div className="text-gray-500 font-semibold">首都直下地震対処計画_v4.docx</div>
                    <div className="flex gap-1 flex-wrap">
                      <span className="bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">⚠ p.23 参集基準 要更新</span>
                      <span className="bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded">⚠ p.41 物資配送 要更新</span>
                    </div>
                  </div>
                ),
              },
              {
                num: "③", bg: "bg-emerald-50 border-emerald-300", accent: "text-emerald-700", hdr: "bg-emerald-100",
                title: "被害予想シミュレーション", body: "条件設定 → ArcGIS 地図上でリアルタイム可視化。5 種ハザードマップ対応",
                preview: (
                  <div className="mt-2 bg-white border border-emerald-200 rounded p-2 text-xs flex gap-2">
                    <div className="space-y-0.5 flex-shrink-0 text-gray-600">
                      <div>災害: 首都直下地震 M7.3</div>
                      <div>時刻: 冬平日深夜</div>
                    </div>
                    <div className="flex-1 bg-slate-100 rounded flex items-center justify-center text-slate-500 text-lg">🗺️</div>
                    <div className="space-y-0.5 flex-shrink-0 text-gray-600">
                      <div>死者: 6,100人</div>
                      <div>全壊: 175,000棟</div>
                    </div>
                  </div>
                ),
              },
              {
                num: "④", bg: "bg-violet-50 border-violet-300", accent: "text-violet-700", hdr: "bg-violet-100",
                title: "判断支援ダッシュボード", body: "被害予想 × 文書 × AI 推奨アクションを一画面に統合し意思決定を支援",
                preview: (
                  <div className="mt-2 bg-white border border-violet-200 rounded p-2 text-xs space-y-1">
                    <div className="text-amber-700 font-semibold">⚠ 避難所 3 箇所が収容超過</div>
                    <div className="text-gray-600">AI 推奨: ①避難所分散 ②迂回ルート設定 ③医療優先エリア指定</div>
                  </div>
                ),
              },
            ].map((c) => (
              <div key={c.num} className={`border rounded-lg p-3 flex flex-col ${c.bg}`}>
                <div className={`font-bold text-sm mb-1 ${c.accent}`}>{c.num} {c.title}</div>
                <div className="text-xs text-gray-700">{c.body}</div>
                {c.preview}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      label: "機能①",
      node: (
        <div className="h-full bg-white flex flex-col text-xs">
          <div className="bg-amber-500 text-white px-8 py-3">
            <div className="text-xs text-amber-100 font-semibold uppercase tracking-widest">Feature 01</div>
            <h2 className="text-lg font-bold">① AI 機能群（チャットボット・整合性チェック・シナリオ自動生成）</h2>
          </div>
          <div className="flex-1 p-4 grid grid-cols-[1.35fr_1fr] gap-3 min-h-0">
            <div className="border border-amber-200 rounded-xl overflow-hidden bg-white flex flex-col min-h-0">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-2 flex items-center justify-between">
                <span className="font-bold">都庁 図上訓練支援AI</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">根拠表示ON</span>
              </div>
              <div className="p-3 bg-slate-50 flex-1 space-y-2 overflow-y-auto">
                <div className="flex justify-end">
                  <div className="max-w-[78%] bg-amber-100 border border-amber-200 rounded-xl rounded-tr-sm px-2.5 py-2 text-gray-800">
                    第3局の初動手順を教えて。計画書の参照元も表示して。
                  </div>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">AI</span>
                  <div className="max-w-[80%] bg-white border border-slate-200 rounded-xl rounded-tl-sm px-2.5 py-2">
                    <div className="font-semibold text-slate-800 mb-1">初動手順（要約）</div>
                    <div className="text-gray-700">避難所開設判断 → 導線確保 → 被害一次集約の順で実施。</div>
                    <div className="mt-1.5 flex gap-1 flex-wrap">
                      {[
                        "仕様書 p.12",
                        "別紙1 p.4",
                        "入札説明書 p.23",
                      ].map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-white border border-slate-200 rounded-lg p-2">
                    <div className="text-[10px] text-gray-500">整合性チェック</div>
                    <div className="text-[11px] text-red-600 font-semibold">p.23 参集基準が最新版と不一致</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg p-2">
                    <div className="text-[10px] text-gray-500">シナリオ生成</div>
                    <div className="text-[11px] text-emerald-700 font-semibold">2時間訓練を20秒で生成</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 min-h-0">
              {[
                {
                  icon: "💬",
                  title: "チャットボット",
                  body: "質問に対して根拠ページ付きで回答。ハルシネーションを抑制。",
                  tone: "border-amber-200 bg-amber-50",
                },
                {
                  icon: "✅",
                  title: "整合性チェック",
                  body: "計画書・想定・組織図の差異をページ単位で自動検出。",
                  tone: "border-red-200 bg-red-50",
                },
                {
                  icon: "⚡",
                  title: "シナリオ自動生成",
                  body: "災害条件を指定するとフェーズ別訓練案を即時作成。",
                  tone: "border-blue-200 bg-blue-50",
                },
                {
                  icon: "📊",
                  title: "導入効果",
                  body: "手作業数日 → 数分へ短縮、根拠提示と監査対応を同時実現。",
                  tone: "border-emerald-200 bg-emerald-50",
                },
              ].map((c) => (
                <div key={c.title} className={`border rounded-lg p-2.5 ${c.tone}`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-sm">{c.icon}</span>
                    <span className="font-bold text-gray-800">{c.title}</span>
                  </div>
                  <div className="text-[11px] text-gray-700 leading-relaxed">{c.body}</div>
                </div>
              ))}

              <div className="border border-slate-200 rounded-lg p-2.5 bg-white">
                <div className="font-semibold text-slate-700 mb-1">ミニフロー</div>
                <div className="flex items-center justify-between text-[10px] text-slate-600">
                  <span className="px-2 py-0.5 rounded bg-sky-100">質問</span>
                  <span>→</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100">検索/根拠抽出</span>
                  <span>→</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100">回答生成</span>
                  <span>→</span>
                  <span className="px-2 py-0.5 rounded bg-violet-100">監査記録</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "機能②",
      node: (
        <div className="h-full bg-white flex flex-col">
          <div className="bg-rose-600 text-white px-8 py-4">
            <div className="text-xs text-rose-200 font-semibold uppercase tracking-widest">Feature 02</div>
            <h2 className="text-xl font-bold">② 計画・マニュアル 見直し修正</h2>
          </div>
          <div className="flex-1 p-6 flex gap-6">
            <div className="flex-1 space-y-3">
              {[
                { title: "AI が改訂ポイントを自動提案", body: "最新の被害想定・ハザードマップと既存計画書を照合し、更新が必要な箇所をページ単位で提案する" },
                { title: "エディタで直接編集・差分確認", body: "ブラウザ上で文書を編集し、変更前後の差分を色付きハイライトで即確認。承認フローも組み込み済み" },
                { title: "版管理・引継ぎ対応", body: "改訂履歴を Snowflake に保存。他事業者への引継ぎ時も版履歴が完全に残り、移行が容易" },
              ].map((c) => (
                <div key={c.title} className="bg-rose-50 border border-rose-200 rounded-lg p-3">
                  <div className="font-semibold text-rose-800 text-sm mb-1">{c.title}</div>
                  <div className="text-xs text-gray-700">{c.body}</div>
                </div>
              ))}
            </div>
            <div className="w-44 flex-shrink-0 flex flex-col gap-3 justify-center">
              <div className="bg-gray-100 rounded-xl p-3 text-center text-sm text-gray-500">
                <div className="text-2xl mb-1">📄</div>
                <div className="font-semibold text-xs">首都直下地震対処計画_v4.docx</div>
              </div>
              <div className="text-center text-gray-400">↓ AI 解析</div>
              <div className="bg-rose-100 rounded-xl p-3 text-center text-xs text-rose-800">
                <div className="font-semibold mb-1">提案箇所 3 件</div>
                <div>p.23 参集基準</div>
                <div>p.41 物資配送</div>
                <div>p.67 通信手順</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "機能③",
      node: (
        <div className="h-full bg-white flex flex-col">
          <div className="bg-emerald-700 text-white px-8 py-4">
            <div className="text-xs text-emerald-200 font-semibold uppercase tracking-widest">Feature 03 — Key</div>
            <h2 className="text-xl font-bold">③ 被害予想シミュレーション（地図連動・GIS）</h2>
          </div>
          <div className="flex-1 p-5 flex gap-4">
            <div className="w-52 flex-shrink-0 space-y-2 text-xs">
              <div className="font-semibold text-gray-700">条件設定</div>
              {[
                { label: "災害種別", val: "津波 / 首都直下地震 / 南海トラフ / 富士山噴火 / 大規模風水害" },
                { label: "規模・時刻", val: "M7.3・冬平日深夜 など複数パターン" },
                { label: "表示レイヤー", val: "震度分布 / 浸水域 / 建物倒壊リスク / 避難所位置" },
              ].map((f) => (
                <div key={f.label} className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                  <div className="text-gray-500 font-semibold">{f.label}</div>
                  <div className="text-gray-700 mt-0.5">{f.val}</div>
                </div>
              ))}
              <div className="bg-emerald-600 text-white text-center py-1.5 rounded-lg font-semibold">シミュレーション実行</div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 space-y-0.5 text-gray-700">
                <div className="font-semibold text-emerald-800">推計被害（23 区・M7.3）</div>
                <div>死者: 約 6,100 人</div>
                <div>建物全壊: 約 175,000 棟</div>
                <div>避難者: 約 339,000 人</div>
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex flex-col items-center justify-center gap-3 relative">
              <div className="absolute top-3 right-3 flex gap-1 text-xs">
                <span className="bg-white text-gray-600 px-2 py-0.5 rounded border">2D</span>
                <span className="bg-emerald-600 text-white px-2 py-0.5 rounded">3D</span>
              </div>
              <div className="text-5xl">🗺️</div>
              <div className="text-center text-slate-700 space-y-1">
                <div className="font-bold">ArcGIS 地図ビュー</div>
                <div className="text-xs">震度分布・津波浸水域・建物倒壊リスクを重ね合わせ</div>
                <div className="text-xs">複数ハザードマップレイヤーを条件連動で動的切替</div>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {["🔴 震度6強以上", "🟠 浸水 0.5m〜", "🟡 倒壊高リスク", "🟢 避難所"].map((l) => (
                  <span key={l} className="bg-white/80 text-slate-700 text-xs px-2 py-0.5 rounded-full">{l}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "機能④",
      node: (
        <div className="h-full bg-white flex flex-col">
          <div className="bg-violet-700 text-white px-8 py-4">
            <div className="text-xs text-violet-200 font-semibold uppercase tracking-widest">Feature 04</div>
            <h2 className="text-xl font-bold">④ 判断支援ダッシュボード</h2>
          </div>
          <div className="flex-1 p-5 grid grid-cols-2 gap-4">
            <div className="space-y-3 text-xs">
              {[
                { title: "情報統合ビュー", body: "被害予想シミュ・チャット回答・計画書を 1 画面に集約。判断に必要な情報をワンストップで参照できる" },
                { title: "AI 推奨アクション生成", body: "現況データを Cortex に入力し、優先対応タスクリストと根拠を自動生成。判断スピードを大幅短縮" },
                { title: "区市町村展開を見据えた設計", body: "局・課単位のロール付与 UI。2 年目以降の区市町村展開に対応できる権限構造を最初から設計" },
              ].map((c) => (
                <div key={c.title} className="bg-violet-50 border border-violet-200 rounded-lg p-3">
                  <div className="font-semibold text-violet-800 mb-1">{c.title}</div>
                  <div className="text-gray-700">{c.body}</div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col justify-center space-y-2 text-xs">
              <div className="bg-amber-50 border border-amber-200 rounded p-2">
                <div className="font-semibold text-amber-800">現況アラート</div>
                <div className="text-gray-700 mt-0.5">⚠ 避難所 3 箇所が収容超過 / 交通遮断 12 路線</div>
              </div>
              <div className="bg-violet-50 border border-violet-200 rounded p-2">
                <div className="font-semibold text-violet-800">AI 推奨アクション</div>
                <ol className="text-gray-700 mt-0.5 list-decimal pl-4 space-y-0.5">
                  <li>△△避難所の収容分散（近隣 2 箇所へ）</li>
                  <li>広域輸送迂回ルート設定</li>
                  <li>医療機関搬送優先エリア指定</li>
                </ol>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-2">
                <div className="font-semibold text-blue-800">関連文書クイックリンク</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {["対処計画 p.15", "避難所マップ", "被害シミュ", "応援要請手順"].map((l) => (
                    <span key={l} className="bg-white border border-blue-200 rounded px-1.5 py-0.5 text-blue-700">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
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
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-0.5">システム構成図</div>
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
                  <div className="font-bold text-teal-800">🗺️ ArcGIS SDK</div>
                  <div className="text-teal-700 text-xs">GIS 地図 · Feature Layer</div>
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
    },
    {
      label: "ナレッジ格納",
      node: (
        <div className="h-full bg-white flex flex-col text-xs">
          <div className="bg-teal-700 text-white px-8 py-3">
            <div className="text-xs text-teal-100 font-semibold uppercase tracking-widest">RAG Knowledge Base</div>
            <h2 className="text-lg font-bold">Snowflake へのナレッジ格納設計 ── ファイル対応とセキュリティ</h2>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3 px-5 pt-4 pb-3 min-h-0">
            {/* Left: 対応ファイル形式 */}
            <div className="space-y-2">
              <div className="font-bold text-gray-700 uppercase tracking-wide mb-1">📂 Snowflake 取り込み対応形式</div>

              {/* 構造化データ */}
              <div>
                <div className="text-xs font-semibold text-blue-700 mb-0.5">① 構造化・半構造化（COPY INTO でネイティブ取込み）</div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1.5 flex flex-wrap gap-1.5 text-gray-700">
                  {["CSV / TSV", "JSON", "Parquet", "Avro", "ORC", "XML"].map((f) => (
                    <span key={f} className="bg-white border border-blue-200 rounded px-2 py-0.5 font-mono font-semibold text-blue-800">{f}</span>
                  ))}
                </div>
              </div>

              {/* 非構造化データ */}
              <div>
                <div className="text-xs font-semibold text-slate-700 mb-0.5">② 非構造化（Stage + Directory Table に格納、種類は問わない）</div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 flex flex-wrap gap-1.5 text-gray-700">
                  {["PDF", "Word (.docx)", "Excel (.xlsx)", "PowerPoint (.pptx)", "画像 (PNG/JPEG/TIFF)", "音声 (MP3/WAV)", "動画 (MP4)", "テキスト / CSV", "HTML", "任意のバイナリ"].map((f) => (
                    <span key={f} className="bg-white border border-slate-300 rounded px-2 py-0.5 font-semibold text-slate-700">{f}</span>
                  ))}
                </div>
                <div className="text-gray-500 mt-0.5 text-xs">※ Stage はバイナリをそのまま保持。読み取り・解析は後続処理で行う</div>
              </div>

              {/* RAGへの変換 */}
              <div>
                <div className="text-xs font-semibold text-teal-700 mb-0.5">③ Cortex Search（RAG）用テキスト化</div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg px-2.5 py-1.5 space-y-1 text-gray-700">
                  <div className="flex gap-1.5 items-start">
                    <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                    <span><span className="font-semibold">PDF / DOCX</span> — PARSE_DOCUMENT でネイティブ抽出（追加実装不要）</span>
                  </div>
                  <div className="flex gap-1.5 items-start">
                    <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                    <span><span className="font-semibold">XLSX / PPTX / HTML 等</span> — Snowpark Python UDF（openpyxl・python-pptx 等）でテキスト化</span>
                  </div>
                  <div className="flex gap-1.5 items-start">
                    <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                    <span><span className="font-semibold">画像・スキャン PDF</span> — Snowflake Multimodal または pytesseract（OCR）で文字認識</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right: セキュリティ設計 */}
            <div className="space-y-2">
              <div className="font-bold text-gray-700 uppercase tracking-wide mb-1">🔒 セキュリティ設計</div>
              {[
                {
                  color: "bg-indigo-50 border-indigo-200",
                  title: "3 ロール RBAC",
                  body: "管理者（全操作）/ 担当者（チャット・編集）/ 閲覧者（チャットのみ）。Snowflake GRANT で最小権限を強制。",
                },
                {
                  color: "bg-blue-50 border-blue-200",
                  title: "IP アクセス制限",
                  body: "Network Policy で東京都庁内ネットワーク（固定 IP）からのみ接続を許可。外部からの直接アクセスを遮断。",
                },
                {
                  color: "bg-green-50 border-green-200",
                  title: "学習利用不可設定",
                  body: "PREVENT_AI_DATA_SHARING = TRUE を設定。アップロードしたドキュメントが Snowflake のモデル学習に使われない。",
                },
                {
                  color: "bg-purple-50 border-purple-200",
                  title: "国内リージョン + 暗号化",
                  body: "Tokyo リージョン（ap-northeast-1）で稼働。保存データは AES-256 暗号化、転送は TLS 1.3 で保護。",
                },
                {
                  color: "bg-amber-50 border-amber-200",
                  title: "監査ログ",
                  body: "QUERY_HISTORY・ACCESS_HISTORY ビューで全クエリ・ファイルアクセスを記録。コンプライアンス対応済み。",
                },
              ].map((r) => (
                <div key={r.title} className={`border rounded-lg p-2 ${r.color}`}>
                  <div className="font-semibold text-gray-800 mb-0.5">{r.title}</div>
                  <div className="text-gray-700">{r.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "チャンク設計",
      node: (
        <div className="h-full bg-white flex flex-col text-xs">
          <div className="bg-violet-700 text-white px-8 py-3">
            <div className="text-xs text-violet-100 font-semibold uppercase tracking-widest">Chunking Strategy</div>
            <h2 className="text-lg font-bold">チャンク設計 ── RAG 検索精度を左右する文書分割戦略</h2>
          </div>
          <div className="flex-1 px-5 pt-4 pb-3 grid grid-cols-2 gap-4 min-h-0">
            {/* Left: チャンク基本設計 */}
            <div className="space-y-2">
              <div className="font-bold text-gray-700 uppercase tracking-wide mb-1">⚙️ チャンク基本パラメータ</div>
              <div className="bg-violet-50 border border-violet-200 rounded-lg p-3 space-y-2">
                {[
                  { param: "チャンクサイズ", val: "512 〜 1,024 tokens", note: "仕様書・計画書など長文ドキュメントは 1,024 tokens が最適" },
                  { param: "オーバーラップ", val: "10 〜 20%（約 100 tokens）", note: "文境界での意味の分断を防ぐ。前後の文脈を保持" },
                  { param: "分割境界", val: "章 > 節 > 段落 > 文", note: "ルールベースで見出し（##, 第X条）を優先的に境界とする" },
                  { param: "最小チャンク", val: "50 tokens 以下は前のチャンクに結合", note: "短すぎるチャンクはノイズになるため除外" },
                ].map((r) => (
                  <div key={r.param} className="flex gap-2">
                    <div className="w-28 font-semibold text-violet-800 flex-shrink-0">{r.param}</div>
                    <div>
                      <div className="font-medium text-gray-800">{r.val}</div>
                      <div className="text-gray-600 mt-0.5">{r.note}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 space-y-1 text-gray-700">
                <div className="font-semibold text-gray-800 mb-1">📌 Cortex Search への登録</div>
                <div className="font-mono bg-white border border-gray-200 rounded px-2 py-1 text-xs">
                  CREATE CORTEX SEARCH SERVICE chat_search<br />
                  {"  "}ON chunk_text<br />
                  {"  "}ATTRIBUTES doc_name, page_no, section<br />
                  {"  "}WAREHOUSE = xs_wh<br />
                  {"  "}TARGET_LAG = '1 hour';
                </div>
              </div>
            </div>
            {/* Right: メタデータ設計 */}
            <div className="space-y-2">
              <div className="font-bold text-gray-700 uppercase tracking-wide mb-1">🏷️ メタデータ設計（各チャンクに付与）</div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { field: "doc_id", type: "VARCHAR", desc: "ファイル識別 UUID" },
                  { field: "doc_name", type: "VARCHAR", desc: "元ファイル名" },
                  { field: "doc_type", type: "ENUM", desc: "計画書 / ハザードマップ / シナリオ / 訓練記録" },
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
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-gray-700">
                <span className="font-semibold text-amber-800">検索時のフィルタ活用:</span> doc_type = &apos;計画書&apos; AND section LIKE &apos;%参集%&apos; のようにメタデータで絞り込み、検索精度を向上
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "呼び出しフロー",
      node: (
        <div className="h-full bg-white flex flex-col text-xs">
          <div className="bg-blue-700 text-white px-8 py-3">
            <div className="text-xs text-blue-100 font-semibold uppercase tracking-widest">API Call Architecture</div>
            <h2 className="text-lg font-bold">Next.js → Snowflake 呼び出しフロー ── RAG チャットの処理の流れ</h2>
          </div>
          <div className="flex-1 px-5 pt-4 pb-3 grid grid-cols-2 gap-4 min-h-0">
            {/* Left: step-by-step flow */}
            <div className="space-y-1.5">
              <div className="font-bold text-gray-700 uppercase tracking-wide mb-1">🔄 リクエスト処理ステップ</div>
              {[
                {
                  step: "1",
                  color: "bg-blue-100 border-blue-300 text-blue-800",
                  title: "ユーザー入力（ブラウザ）",
                  body: "質問テキスト + マルチターン履歴（最大 10 回）+ 会話 session_id を送信",
                },
                {
                  step: "2",
                  color: "bg-orange-100 border-orange-300 text-orange-800",
                  title: "Next.js API Route（/api/chat）",
                  body: "server-side で snowflake-sdk を呼び出し。JWT 認証トークンをセキュアに管理。ユーザー入力はサニタイズ後に渡す",
                },
                {
                  step: "3",
                  color: "bg-teal-100 border-teal-300 text-teal-800",
                  title: "Cortex Search（Retrieval）",
                  body: "SNOWFLAKE.CORTEX.SEARCH_PREVIEW() でクエリに関連するチャンクを TOP-K=5 件取得。doc_type フィルタで検索範囲を限定",
                },
                {
                  step: "4",
                  color: "bg-green-100 border-green-300 text-green-800",
                  title: "プロンプト組み立て（Prompt Engineering）",
                  body: "システムプロンプト + 取得チャンク（コンテキスト）+ 会話履歴 + ユーザー質問を結合。200K トークン枠内に収める",
                },
                {
                  step: "5",
                  color: "bg-indigo-100 border-indigo-300 text-indigo-800",
                  title: "Cortex Complete（LLM 生成）",
                  body: "SNOWFLAKE.CORTEX.COMPLETE('claude-3-5-sonnet', messages) でストリーミング生成。モデル名変更のみで LLM 切替可能",
                },
                {
                  step: "6",
                  color: "bg-violet-100 border-violet-300 text-violet-800",
                  title: "レスポンス返却",
                  body: "回答テキスト + 引用ソース（doc_name, page_no）を JSON で返却。フロントエンドでストリーミング表示",
                },
              ].map((s) => (
                <div key={s.step} className={`border rounded-lg px-3 py-1.5 flex gap-2 items-start ${s.color}`}>
                  <span className="font-bold text-lg leading-none flex-shrink-0">{s.step}</span>
                  <div>
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-gray-700 mt-0.5">{s.body}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Right: code snippet + notes */}
            <div className="space-y-2">
              <div className="font-bold text-gray-700 uppercase tracking-wide mb-1">💻 コード概要（API Route）</div>
              <div className="bg-gray-900 text-green-300 rounded-lg p-3 font-mono text-xs leading-relaxed overflow-auto">
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
              <div className="space-y-1.5">
                {[
                  { icon: "⚡", title: "ストリーミング対応", body: "ReadableStream + Server-Sent Events で逐次表示。応答遅延を体感させない" },
                  { icon: "🔐", title: "認証管理", body: "Snowflake 接続情報は環境変数（SPCS シークレット）で管理。クライアントには一切露出しない" },
                  { icon: "🔁", title: "エラーハンドリング", body: "Cortex タイムアウト（30 秒）でリトライ 1 回 → 超過時はフォールバックメッセージを返す" },
                  { icon: "📊", title: "トークン管理", body: "会話履歴は最新 10 回 × 要約圧縮で 200K 枠を超えないよう動的に調整" },
                ].map((n) => (
                  <div key={n.title} className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 flex gap-2">
                    <span className="flex-shrink-0">{n.icon}</span>
                    <div>
                      <span className="font-semibold text-blue-800">{n.title}:</span>
                      <span className="text-gray-700"> {n.body}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "ロードマップ",
      node: (
        <div className="h-full bg-white flex flex-col">
          <div className="bg-blue-800 text-white px-8 py-4">
            <div className="text-xs text-blue-200 font-semibold uppercase tracking-widest">Roadmap</div>
            <h2 className="text-xl font-bold">3 年間の開発ロードマップ</h2>
          </div>
          <div className="flex-1 p-5">
            <div className="grid grid-cols-3 gap-3 h-full">
              {[
                {
                  year: "令和8年度（1年目）", hColor: "bg-blue-100 text-blue-800",
                  items: [
                    { cat: "共通", text: "ロードマップ策定・方向性検討" },
                    { cat: "①", text: "チャットボット・整合性チェック・シナリオ生成 初期開発（首都直下型）" },
                    { cat: "①", text: "令和9年1月 図上訓練での実証" },
                    { cat: "②③④", text: "実施方法の検討・提案" },
                    { cat: "⑤", text: "区市町村展開の実施方法検討" },
                  ],
                },
                {
                  year: "2年目", hColor: "bg-emerald-100 text-emerald-800",
                  items: [
                    { cat: "①", text: "対象範囲拡大（南海トラフ・風水害・津波・火山等）" },
                    { cat: "①", text: "チャットボット運用開始" },
                    { cat: "②", text: "計画・マニュアル修正 初期開発" },
                    { cat: "③④", text: "被害予想・判断支援 要件整理・方向性検討" },
                    { cat: "⑤", text: "区市町村展開 要件整理・方式検討" },
                  ],
                },
                {
                  year: "3年目", hColor: "bg-amber-100 text-amber-800",
                  items: [
                    { cat: "②", text: "計画・マニュアル修正 機能拡充（他災害対応）" },
                    { cat: "③", text: "被害予想シミュレーション 初期開発" },
                    { cat: "④", text: "判断支援 初期開発" },
                    { cat: "⑤", text: "区市町村ツール展開検討" },
                  ],
                },
              ].map((col) => (
                <div key={col.year} className="border border-gray-200 rounded-xl overflow-hidden flex flex-col">
                  <div className={`px-3 py-2 font-bold text-sm ${col.hColor}`}>{col.year}</div>
                  <div className="flex-1 p-3 space-y-1.5 text-xs">
                    {col.items.map((item, i) => (
                      <div key={i} className="flex gap-1.5">
                        <span className="font-bold text-gray-400 flex-shrink-0">{item.cat}</span>
                        <span className="text-gray-700">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "評価ポイント",
      node: (
        <div className="h-full bg-white flex flex-col">
          <div className="bg-amber-600 text-white px-8 py-4">
            <div className="text-xs text-amber-100 font-semibold uppercase tracking-widest">Evaluation</div>
            <h2 className="text-xl font-bold">総合評価での強み（技術点 200 点）</h2>
          </div>
          <div className="flex-1 p-5 grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              {[
                { score: "30pt", label: "業務への理解度", body: "3 年間ロードマップ策定の必要性を理解。①→④の段階的実現計画を具体的に提示" },
                { score: "30pt", label: "業務受託実績等", body: "AI・GIS・自治体防災領域の実績を根拠として提示" },
                { score: "105pt", label: "業務実施計画・手法等", body: "GIS × 生成 AI の技術統合、ハザードマップ多種対応・LLM 柔軟切替など詳細な実装手法を提案" },
                { score: "35pt", label: "業務実施体制", body: "防災専門知識を有する人材の参画を必須要件として充足（未充足で無効）" },
              ].map((c) => (
                <div key={c.label} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-amber-500 text-white font-bold px-2 py-0.5 rounded">{c.score}</span>
                    <span className="font-semibold text-gray-800">{c.label}</span>
                  </div>
                  <div className="text-gray-700">{c.body}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="bg-red-50 border border-red-300 rounded-lg p-3">
                <div className="font-semibold text-red-800 mb-1">必須確認事項（未充足で無効）</div>
                <div className="text-gray-700">防災専門知識を有する人材の参画または助言体制を提案書に明確に示すこと</div>
              </div>
              <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                <div className="font-semibold text-green-800 mb-1">高得点が狙えるポイント</div>
                <div className="text-gray-700 space-y-1">
                  <div>• 引継ぎ設計（×3 係数・15pt）：IaC + 標準 SQL</div>
                  <div>• 運用コスト抑制（×4 係数・20pt）：Snowflake 従量課金</div>
                  <div>• 生成 AI 進歩への柔軟性：モデル切替コスト最小化</div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="font-semibold text-blue-800 mb-1">価格点（100pt）</div>
                <div className="text-gray-700">入札書には消費税抜き（契約希望金額の 110 分の 100）を記入。運用コスト最適化で価格競争力も訴求</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "弱み・留意点",
      node: (
        <div className="h-full bg-white flex flex-col text-xs">
          <div className="bg-rose-700 text-white px-8 py-3">
            <div className="text-xs text-rose-100 font-semibold uppercase tracking-widest">Risk &amp; Mitigation</div>
            <h2 className="text-lg font-bold">総合評価での弱み ── ロックインリスクと対策</h2>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3 px-5 pt-4 pb-2 min-h-0">
            {/* Left: lock-in elements */}
            <div className="space-y-2">
              <div className="font-bold text-gray-700 text-xs uppercase tracking-wide mb-1">⚠ ロックイン要素</div>
              {[
                {
                  icon: "🔒",
                  title: "独自 SQL 関数",
                  body: "SNOWFLAKE.CORTEX.COMPLETE / SEARCH は Snowflake 専用構文。他 DB にそのまま移植不可。",
                },
                {
                  icon: "📦",
                  title: "ベクトルインデックス非可搬",
                  body: "Cortex Search のインデックスは Snowflake 内に閉じており、標準フォーマットでのエクスポートは不可。",
                },
                {
                  icon: "🏗️",
                  title: "SPCS はSnowflake 基盤前提",
                  body: "コンテナ実行環境が Snowflake に依存。Kubernetes への移行には再設計が必要。",
                },
                {
                  icon: "💰",
                  title: "コスト予測の難しさ",
                  body: "LLM トークン消費量はクエリ内容次第で変動し、Snowflake クレジット超過のリスクがある。",
                },
              ].map((r) => (
                <div key={r.title} className="bg-rose-50 border border-rose-200 rounded-lg p-2 flex gap-2">
                  <span className="text-base flex-shrink-0">{r.icon}</span>
                  <div>
                    <div className="font-semibold text-rose-800">{r.title}</div>
                    <div className="text-gray-700 mt-0.5">{r.body}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Right: migration alternatives */}
            <div className="space-y-2">
              <div className="font-bold text-gray-700 text-xs uppercase tracking-wide mb-1">🔄 移行先の選択肢（Cortex Search 代替）</div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                <div className="font-semibold text-orange-700 mb-1">AWS</div>
                <div className="space-y-1 text-gray-700">
                  <div>• <span className="font-medium">Bedrock Knowledge Bases</span> ── RAG パイプラインをフルマネージドで提供。移行コスト低</div>
                  <div>• <span className="font-medium">pgvector on Aurora</span> ── PostgreSQL 互換。SQL ほぼそのまま移行可</div>
                  <div>• <span className="font-medium">OpenSearch Service</span> ── 全文検索 + ベクトル検索。移行コスト中〜高</div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                <div className="font-semibold text-blue-700 mb-1">GCP</div>
                <div className="space-y-1 text-gray-700">
                  <div>• <span className="font-medium">Vertex AI Search</span> ── エンタープライズ向けマネージド RAG。移行コスト低〜中</div>
                  <div>• <span className="font-medium">AlloyDB + pgvector</span> ── PostgreSQL 互換。SQL 移行性が高い</div>
                  <div>• <span className="font-medium">Vertex AI Vector Search</span> ── 大規模ベクトル専用。移行コスト中</div>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom: countermeasures */}
          <div className="bg-slate-100 border-t border-slate-200 px-5 py-2 flex gap-4">
            <span className="font-bold text-slate-700 flex-shrink-0">✅ 対策方針（提案に明記）</span>
            <div className="flex gap-4 flex-wrap text-gray-700">
              <span>① LLM 呼出しを抽象化レイヤーで分離しモデル・基盤切替コストを最小化</span>
              <span>② 標準 SQL + IaC でインフラをコード管理し引継ぎ容易性を確保</span>
              <span>③ Snowflake の Tokyo リージョン・学習利用不可設定でデータガバナンスを担保</span>
            </div>
          </div>
        </div>
      ),
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
    },
  ];

  return (
    <div className="space-y-3">
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow aspect-video">
        {slides[idx].node}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setIdx(Math.max(0, idx - 1))}
          disabled={idx === 0}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium"
        >
          ← 前へ
        </button>

        <div className="flex gap-1.5 items-center">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              title={s.label}
              className={`rounded-full transition-all duration-150 ${
                i === idx ? "bg-rose-600 w-6 h-2.5" : "bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setIdx(Math.min(slides.length - 1, idx + 1))}
          disabled={idx === slides.length - 1}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium"
        >
          次へ →
        </button>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <span className="font-medium text-gray-700">{slides[idx].label}</span>
        <span>{idx + 1} / {slides.length}</span>
      </div>
      <GlossarySection terms={["図上訓練", "RAG（Retrieval-Augmented Generation）", "Cortex AI", "ArcGIS Maps SDK for JavaScript", "PLATEAU", "ハザードマップ"]} />
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

  const openDoc = (file: string) => {
    setActiveDoc(file);
    setTab("docs");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">🗼 tocho-geospatial-platform</h2>
        <p className="text-sm text-gray-500 mt-1">HVD(Next.js + SPCS)と同じ粒度で整理した、東京都庁案件の開発ガイド</p>
      </div>

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

      {tab === "slides" && <Slides />}
      {tab === "overview" && <Overview onDocOpen={openDoc} />}
      {tab === "architecture" && <Architecture onDocOpen={openDoc} />}
      {tab === "wbs" && <Wbs />}
      {tab === "steps" && <Steps />}
      {tab === "docs" && <DocViewer activeDoc={activeDoc} setActiveDoc={setActiveDoc} />}
      {tab === "artifacts" && <Artifacts />}
      {tab === "qa" && <QA />}
    </div>
  );
}
