function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-1 shrink-0">
      <div className="text-gray-400 text-lg font-bold">→</div>
      {label ? <div className="text-[9px] text-gray-500 whitespace-nowrap mt-0.5">{label}</div> : null}
    </div>
  );
}

function DownArrow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="text-amber-600 text-sm font-bold">↓</div>
      <div className="text-[9px] text-amber-700 font-medium">{label}</div>
    </div>
  );
}

type BoxProps = {
  title: string;
  subtitle?: string;
  items?: string[];
  tone: "emerald" | "amber" | "blue" | "violet" | "slate";
  icon?: string;
};

const toneMap = {
  emerald: {
    head: "text-emerald-800 bg-emerald-100 border-emerald-300",
    body: "border-emerald-200 bg-emerald-50/80 text-emerald-900",
    card: "bg-white border-emerald-200",
  },
  amber: {
    head: "text-amber-900 bg-amber-100 border-amber-300",
    body: "border-amber-200 bg-amber-50/80 text-amber-900",
    card: "bg-white border-amber-200",
  },
  blue: {
    head: "text-blue-800 bg-blue-100 border-blue-300",
    body: "border-blue-200 bg-blue-50/80 text-blue-900",
    card: "bg-white border-blue-200",
  },
  violet: {
    head: "text-violet-800 bg-violet-100 border-violet-300",
    body: "border-violet-200 bg-violet-50/80 text-violet-900",
    card: "bg-white border-violet-200",
  },
  slate: {
    head: "text-slate-800 bg-slate-100 border-slate-300",
    body: "border-slate-200 bg-slate-50/80 text-slate-900",
    card: "bg-white border-slate-200",
  },
};

function FlowBox({ title, subtitle, items, tone, icon }: BoxProps) {
  const t = toneMap[tone];
  return (
    <div className="flex flex-col h-full">
      <div className={`text-center font-bold border rounded-t-lg px-2 py-1.5 text-[10px] ${t.head}`}>
        {title}
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

export function OnlinePortalFlow() {
  return (
    <div className="rounded-xl border border-cyan-200 bg-gradient-to-b from-cyan-50/50 to-white p-4">
      <div className="text-sm font-bold text-cyan-900 mb-1">パターン A：ArcGIS Online（クラウド・参考）</div>
      <p className="text-[10px] text-cyan-800 mb-3 leading-relaxed">
        ポータル機能は Online に内蔵。Pro は「組織ポータル」に向けて共有する
      </p>
      <div className="overflow-x-auto pb-1">
        <div className="flex items-stretch min-w-[640px] text-[10px]">
          <div className="w-[130px] shrink-0">
            <FlowBox
              tone="emerald"
              title="ArcGIS Pro"
              icon="🖥️"
              items={["データ整備", "「共有」で公開"]}
            />
          </div>
          <Arrow label="共有" />
          <div className="w-[200px] shrink-0">
            <FlowBox
              tone="amber"
              title="ポータル（Online 内蔵）"
              subtitle="◯◯.maps.arcgis.com"
              items={["認証・権限", "アイテム登録", "Hosted Layer 作成指示"]}
            />
          </div>
          <Arrow label="ホスト" />
          <div className="w-[170px] shrink-0">
            <FlowBox
              tone="blue"
              title="ArcGIS Online"
              items={["Hosted Feature Layer", "REST API URL 発行"]}
            />
          </div>
          <Arrow label="参照" />
          <div className="w-[120px] shrink-0">
            <FlowBox tone="slate" title="Maps SDK" icon="🗺️" items={["Web アプリ"]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function EnterprisePortalFlow() {
  return (
    <div className="rounded-xl border border-violet-200 bg-gradient-to-b from-violet-50/50 to-white p-4">
      <div className="text-sm font-bold text-violet-900 mb-1">パターン B：ArcGIS Enterprise（オンプレ／閉域）</div>
      <p className="text-[10px] text-violet-800 mb-3 leading-relaxed">
        Portal for ArcGIS が独立コンポーネントとして存在し、Server と連携する
      </p>
      <div className="overflow-x-auto pb-1">
        <div className="flex items-stretch min-w-[700px] text-[10px]">
          <div className="w-[120px] shrink-0">
            <FlowBox tone="emerald" title="ArcGIS Pro" icon="🖥️" items={["整備・共有"]} />
          </div>
          <Arrow label="共有" />
          <div className="w-[170px] shrink-0 flex flex-col">
            <FlowBox
              tone="amber"
              title="Portal for ArcGIS"
              subtitle="portal.自組織.com"
              items={["ユーザー管理", "コンテンツカタログ", "公開・権限の司令塔"]}
            />
            <DownArrow label="ホスト指示" />
          </div>
          <Arrow label="連携" />
          <div className="w-[150px] shrink-0">
            <FlowBox
              tone="violet"
              title="ArcGIS Server"
              items={["Feature Service 実行", "Map Service"]}
            />
          </div>
          <Arrow />
          <div className="w-[150px] shrink-0">
            <FlowBox
              tone="violet"
              title="Data Store"
              items={["組織内にデータ保管", "閉域ネットワーク"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
