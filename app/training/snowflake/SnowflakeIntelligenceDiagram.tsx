"use client";

function Arrow() {
  return (
    <div className="flex flex-col items-center justify-center px-1 flex-shrink-0 text-slate-400 font-bold text-sm">
      →
    </div>
  );
}

export default function SnowflakeIntelligenceDiagram() {
  const steps = [
    { n: "1", t: "ビジネスユーザー", d: "自然言語で質問", c: "bg-blue-50 border-blue-300 text-blue-900" },
    { n: "2", t: "Snowflake Intelligence", d: "Snowsight 会話 UI", c: "bg-violet-100 border-violet-400 text-violet-900 ring-2 ring-violet-300" },
    { n: "3", t: "Cortex Agent API", d: "推論・計画・オーケスト", c: "bg-indigo-50 border-indigo-300 text-indigo-900" },
    { n: "4", t: "ツール実行", d: "Analyst / Search / MCP", c: "bg-emerald-50 border-emerald-400 text-emerald-900" },
    { n: "5", t: "回答・操作", d: "根拠付き応答・アクション", c: "bg-sky-50 border-sky-300 text-sky-900" },
  ];

  const tools = [
    { icon: "📊", name: "Cortex Analyst", desc: "Semantic View から自然言語 → SQL" },
    { icon: "🔍", name: "Cortex Search", desc: "非構造化文書のハイブリッド検索" },
    { icon: "⚙️", name: "Custom Tools", desc: "UDF / ストアドプロシージャ" },
    { icon: "🔌", name: "MCP コネクタ", desc: "Jira・Salesforce 等の外部システム" },
  ];

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto pb-1">
        <div className="flex items-stretch gap-0.5 min-w-[680px] text-[10px]">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-stretch flex-1">
              <div className={`border-2 rounded-xl p-2.5 flex-1 ${s.c}`}>
                <div className="font-bold text-[10px]">{s.n}. {s.t}</div>
                <div className="text-[8.5px] mt-0.5 opacity-90">{s.d}</div>
              </div>
              {i < steps.length - 1 ? <Arrow /> : null}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px]">
        {tools.map((t) => (
          <div key={t.name} className="bg-white border border-slate-200 rounded-lg px-2.5 py-2">
            <div className="font-bold text-slate-800">
              <span className="mr-1">{t.icon}</span>
              {t.name}
            </div>
            <div className="text-slate-600 mt-0.5 leading-snug">{t.desc}</div>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-slate-500 text-center">
        エージェントは Snowflake 権限の範囲内でツールを選択・実行。オーケストレーションループは Snowflake がマネージド提供
      </p>
    </div>
  );
}
