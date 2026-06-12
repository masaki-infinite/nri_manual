"use client";

function HorizArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-1 flex-shrink-0 self-stretch min-w-[32px]">
      {label ? (
        <span className="text-[8px] text-slate-500 text-center leading-tight mb-0.5">{label}</span>
      ) : null}
      <span className="text-slate-400 font-bold text-base">→</span>
    </div>
  );
}

export default function SnowflakeAdaptorDiagram() {
  const layers = [
    {
      title: "ブラウザ",
      sub: "React UI",
      items: ["fetch /api/*", "SSE ストリーム受信"],
      cls: "bg-blue-50 border-blue-300 text-blue-900",
    },
    {
      title: "Next.js BFF",
      sub: "API Route（サーバー側）",
      items: ["/api/chat", "/api/consistency", "セッション・RBAC"],
      cls: "bg-orange-50 border-orange-400 text-orange-900",
    },
    {
      title: "Snowflake Adaptor",
      sub: "snowflake-sdk",
      items: ["createConnection / Pool", "execute() · binds", "PAT / OAuth 切替"],
      cls: "bg-teal-50 border-teal-500 text-teal-900 ring-2 ring-teal-300",
    },
    {
      title: "Snowflake",
      sub: "東京リージョン",
      items: ["Cortex Search", "COMPLETE", "RAG テーブル"],
      cls: "bg-sky-50 border-sky-400 text-sky-900",
    },
  ];

  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex items-stretch gap-0.5 min-w-[720px] text-[10px]">
        {layers.map((l, i) => (
          <div key={l.title} className="flex items-stretch flex-1">
            <div className={`border-2 rounded-xl p-3 flex-1 flex flex-col ${l.cls}`}>
              <div className="font-bold text-[11px]">{l.title}</div>
              <div className="text-[8.5px] opacity-80 mb-1.5">{l.sub}</div>
              <ul className="space-y-0.5 flex-1">
                {l.items.map((it) => (
                  <li key={it} className="text-[8.5px] leading-snug">
                    · {it}
                  </li>
                ))}
              </ul>
            </div>
            {i < layers.length - 1 ? <HorizArrow label={i === 1 ? "import" : "HTTPS/SQL"} /> : null}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 mt-2 text-[9px] text-slate-500">
        <span>Adaptor = アプリと Snowflake の間の接続・認証・SQL 実行を担うサーバー側モジュール</span>
        <span className="hidden sm:inline">｜</span>
        <span className="text-red-600 font-semibold">🚫 ブラウザに snowflake-sdk を載せない</span>
      </div>
    </div>
  );
}
