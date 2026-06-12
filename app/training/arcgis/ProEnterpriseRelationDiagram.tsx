function Arrow({ label, dashed }: { label?: string; dashed?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center px-1 shrink-0">
      <div className={`text-lg font-bold ${dashed ? "text-slate-400" : "text-violet-500"}`}>
        {dashed ? "⇢" : "→"}
      </div>
      {label ? (
        <div
          className={`text-[8px] font-medium whitespace-nowrap mt-0.5 text-center leading-tight max-w-[72px] ${
            dashed ? "text-slate-500" : "text-violet-700"
          }`}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
}

function DownArrow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center py-0.5">
      <div className="text-violet-600 text-xs font-bold">↓</div>
      <div className="text-[8px] text-violet-700 font-medium text-center leading-tight">{label}</div>
    </div>
  );
}

type BoxProps = {
  title: string;
  subtitle?: string;
  items?: string[];
  tone: "indigo" | "amber" | "violet" | "teal" | "slate" | "rose";
  icon?: string;
  badge?: string;
};

const toneMap = {
  indigo: {
    head: "text-indigo-900 bg-indigo-100 border-indigo-300",
    body: "border-indigo-200 bg-indigo-50/80 text-indigo-900",
  },
  amber: {
    head: "text-amber-900 bg-amber-100 border-amber-300",
    body: "border-amber-200 bg-amber-50/80 text-amber-900",
  },
  violet: {
    head: "text-violet-900 bg-violet-100 border-violet-300",
    body: "border-violet-200 bg-violet-50/80 text-violet-900",
  },
  teal: {
    head: "text-teal-900 bg-teal-100 border-teal-300",
    body: "border-teal-200 bg-teal-50/80 text-teal-900",
  },
  slate: {
    head: "text-slate-800 bg-slate-100 border-slate-300",
    body: "border-slate-200 bg-slate-50/80 text-slate-900",
  },
  rose: {
    head: "text-rose-900 bg-rose-100 border-rose-300",
    body: "border-rose-200 bg-rose-50/80 text-rose-900",
  },
};

function FlowBox({ title, subtitle, items, tone, icon, badge }: BoxProps) {
  const t = toneMap[tone];
  return (
    <div className="flex flex-col h-full">
      <div className={`text-center font-bold border rounded-t-lg px-2 py-1.5 text-[10px] relative ${t.head}`}>
        {title}
        {badge ? (
          <span className="absolute -top-1.5 -right-1 text-[7px] bg-white border border-current rounded px-1">
            {badge}
          </span>
        ) : null}
      </div>
      <div className={`flex-1 border border-t-0 rounded-b-lg p-2.5 ${t.body}`}>
        {icon ? <div className="text-center text-xl mb-1">{icon}</div> : null}
        {subtitle ? <div className="text-[9px] font-semibold text-center mb-1.5">{subtitle}</div> : null}
        {items ? (
          <ul className="space-y-0.5 text-[8px] leading-snug">
            {items.map((item) => (
              <li key={item}>・{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default function ProEnterpriseRelationDiagram() {
  return (
    <div className="rounded-2xl border-2 border-violet-200 bg-gradient-to-b from-violet-50/60 to-white p-4 md:p-5">
      <div className="text-base font-bold text-violet-900 mb-1">ArcGIS Pro と ArcGIS Enterprise の関係図</div>
      <p className="text-[11px] text-violet-800 mb-4 leading-relaxed max-w-4xl">
        Pro はデスクトップの「作業場」、Enterprise は社内サーバーの「配信基盤」。
        <span className="font-semibold">自動リアルタイム同期ではなく</span>、共有・上書き公開のタイミングで Enterprise 側が更新されます。
      </p>

      {/* メインフロー */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[860px] text-[10px]">
          <div className="text-[9px] font-bold text-slate-600 mb-1.5 uppercase tracking-wide">公開フロー（典型的なパターン）</div>
          <div className="flex items-stretch">
            <div className="w-[155px] shrink-0">
              <FlowBox
                tone="indigo"
                title="ArcGIS Pro"
                icon="🖥️"
                subtitle="担当者 PC（Windows）"
                badge="作業場"
                items={["*.aprx プロジェクト", "ローカル GDB / Shapefile", "整備・解析・スタイル設計"]}
              />
            </div>
            <Arrow label="共有（Web レイヤ）" />
            <div className="w-[165px] shrink-0 flex flex-col">
              <FlowBox
                tone="amber"
                title="Portal for ArcGIS"
                subtitle="portal.社内"
                items={["認証・権限", "アイテム登録", "公開の司令塔"]}
              />
              <DownArrow label="ホスト指示" />
            </div>
            <Arrow label="連携" />
            <div className="w-[175px] shrink-0">
              <FlowBox
                tone="violet"
                title="ArcGIS Enterprise"
                subtitle="社内 DC / プライベートクラウド"
                badge="配信基盤"
                items={["ArcGIS Server", "ArcGIS Data Store", "Hosted Feature Layer"]}
              />
            </div>
            <Arrow label="REST URL" />
            <div className="w-[130px] shrink-0">
              <FlowBox
                tone="teal"
                title="Maps SDK"
                icon="🗺️"
                subtitle="エンドユーザーブラウザ"
                items={["Web 地図画面", "FeatureLayer 参照"]}
              />
            </div>
          </div>

          {/* データの置き場所 */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3">
              <div className="text-[10px] font-bold text-indigo-900 mb-2">📁 Pro 側のデータ（編集作業中）</div>
              <ul className="text-[8px] text-indigo-900 space-y-1 leading-snug">
                <li>・<span className="font-semibold">置き場所</span>：担当者 PC または部署共有フォルダ</li>
                <li>・<span className="font-semibold">形式</span>：File GDB（.gdb）、Shapefile、GeoJSON 等</li>
                <li>・<span className="font-semibold">Pro で保存</span>：ローカルファイルが更新される（Enterprise はまだ変わらない）</li>
              </ul>
            </div>
            <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-3">
              <div className="text-[10px] font-bold text-violet-900 mb-2">🏢 Enterprise 側のデータ（公開後・アプリが参照）</div>
              <ul className="text-[8px] text-violet-900 space-y-1 leading-snug">
                <li>・<span className="font-semibold">置き場所</span>：Data Store（サーバーインフラ上）</li>
                <li>・<span className="font-semibold">形式</span>：Hosted Feature Layer（Feature Service）</li>
                <li>・<span className="font-semibold">更新</span>：Pro から「上書き共有」または API / Python で再公開</li>
              </ul>
            </div>
          </div>

          {/* 2パターン */}
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="text-[10px] font-bold text-slate-800 mb-1.5">
                パターン A：ローカル編集 → 共有（よくあるパターン）
              </div>
              <div className="flex items-center flex-wrap gap-1 text-[8px] text-slate-700 mb-1.5">
                <span className="bg-indigo-100 px-1.5 py-0.5 rounded">PC で編集</span>
                <span>→</span>
                <span className="bg-amber-100 px-1.5 py-0.5 rounded">共有ボタン</span>
                <span>→</span>
                <span className="bg-violet-100 px-1.5 py-0.5 rounded">Enterprise にコピー</span>
              </div>
              <p className="text-[8px] text-slate-600 leading-snug">
                リアルタイム同期ではない。公開のたびに Enterprise 側が更新される。
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="text-[10px] font-bold text-slate-800 mb-1.5">
                パターン B：Hosted Layer に Pro で直接接続
              </div>
              <div className="flex items-center flex-wrap gap-1 text-[8px] text-slate-700 mb-1.5">
                <span className="bg-indigo-100 px-1.5 py-0.5 rounded">Pro が Server に接続</span>
                <span>→</span>
                <span className="bg-violet-100 px-1.5 py-0.5 rounded">保存で Server 更新</span>
              </div>
              <p className="text-[8px] text-slate-600 leading-snug">
                マスタが Enterprise 上にある場合。保存操作がトリガー（常時自動同期ではない）。
              </p>
            </div>
          </div>

          {/* 誤解しやすい点 */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[8px] text-slate-500 border-t border-violet-100 pt-2">
            <span>❌ Pro で保存 ≠ 常に Enterprise 自動更新</span>
            <span className="hidden sm:inline">｜</span>
            <span>❌ Maps SDK は Pro を参照しない</span>
            <span className="hidden sm:inline">｜</span>
            <span>✅ 配信の正は Enterprise の Hosted Feature Layer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
