function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-1 shrink-0">
      <div className="text-sky-600 text-lg font-bold">→</div>
      {label ? <div className="text-[9px] text-sky-700 font-medium whitespace-nowrap mt-0.5">{label}</div> : null}
    </div>
  );
}

function Box({
  title,
  subtitle,
  items,
  tone,
}: {
  title: string;
  subtitle?: string;
  items?: string[];
  tone: "blue" | "emerald" | "violet" | "amber";
}) {
  const colors = {
    blue: "border-blue-300 bg-blue-50/80 text-blue-900 head:bg-blue-100 head:border-blue-300 head:text-blue-800",
    emerald: "border-emerald-300 bg-emerald-50/80 text-emerald-900 head:bg-emerald-100 head:border-emerald-300 head:text-emerald-800",
    violet: "border-violet-300 bg-violet-50/80 text-violet-900 head:bg-violet-100 head:border-violet-300 head:text-violet-800",
    amber: "border-amber-300 bg-amber-50/80 text-amber-900 head:bg-amber-100 head:border-amber-300 head:text-amber-800",
  };
  const [body, head] = colors[tone].split(" head:");
  return (
    <div className="flex flex-col h-full">
      <div className={`text-center font-bold border rounded-t-lg px-2 py-1.5 text-[10px] ${head}`}>{title}</div>
      <div className={`flex-1 border border-t-0 rounded-b-lg p-2.5 ${body}`}>
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

export default function MapsSDKJsFlowDiagram() {
  return (
    <div className="rounded-xl border border-sky-200 bg-gradient-to-b from-sky-50/50 to-white p-4">
      <div className="text-sm font-bold text-sky-900 mb-1">典型的なデータの流れ（Web 地図）</div>
      <p className="text-[10px] text-sky-800 mb-3 leading-relaxed">
        ブラウザ上の Maps SDK が、社内 Enterprise の Hosted Feature Layer を REST で参照する
      </p>
      <div className="overflow-x-auto pb-1">
        <div className="flex items-stretch min-w-[720px] text-[10px]">
          <div className="w-[110px] shrink-0">
            <Box tone="blue" title="利用者" subtitle="ブラウザ" items={["Web 地図画面"]} />
          </div>
          <Arrow label="HTTPS" />
          <div className="w-[130px] shrink-0">
            <Box
              tone="amber"
              title="Next.js"
              subtitle="SPCS / BFF"
              items={["React UI", "条件フォーム", "Maps SDK 埋込"]}
            />
          </div>
          <Arrow label="REST③" />
          <div className="w-[150px] shrink-0">
            <Box
              tone="emerald"
              title="Maps SDK for JS"
              subtitle="@arcgis/core"
              items={["Map / SceneView", "FeatureLayer", "空間解析（クライアント）"]}
            />
          </div>
          <Arrow label="REST" />
          <div className="w-[170px] shrink-0">
            <Box
              tone="violet"
              title="社内 GIS"
              subtitle="ArcGIS Enterprise"
              items={["Hosted Feature Layer", "Feature Service URL", "Portal 経由で公開"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
