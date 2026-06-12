"use client";

function Arrow() {
  return (
    <div className="flex flex-col items-center justify-center px-1 flex-shrink-0 text-slate-400 font-bold text-sm">
      →
    </div>
  );
}

export default function SnowflakeCortexCodeDiagram() {
  const steps = [
    { n: "1", t: "開発者", d: "自然言語で依頼", c: "bg-blue-50 border-blue-300 text-blue-900" },
    { n: "2", t: "Cortex Code", d: "CLI / Desktop / Snowsight", c: "bg-cyan-100 border-cyan-400 text-cyan-900 ring-2 ring-cyan-300" },
    { n: "3", t: "エージェントループ", d: "計画・ツール選択・実行", c: "bg-indigo-50 border-indigo-300 text-indigo-900" },
    { n: "4", t: "Snowflake 文脈", d: "RBAC・スキーマ・系譜", c: "bg-emerald-50 border-emerald-400 text-emerald-900" },
    { n: "5", t: "成果物", d: "SQL・dbt・パイプライン", c: "bg-sky-50 border-sky-300 text-sky-900" },
  ];

  const surfaces = [
    { icon: "💻", name: "CLI", desc: "ターミナル・CI/CD・ローカルファイル操作" },
    { icon: "🖥️", name: "Desktop / Snowsight", desc: "IDE 体験・Notebook・SQL ワークスペース" },
    { icon: "🧩", name: "VS Code / ACP", desc: "既存エディタにエージェントを埋め込み" },
    { icon: "🔌", name: "MCP / Agent SDK", desc: "GitHub・Jira 連携・独自アプリ組み込み" },
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
        {surfaces.map((t) => (
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
        汎用コーディングエージェントと異なり、Snowflake のスキーマ・権限・Semantic View を前提にコードを生成
      </p>
    </div>
  );
}
