"use client";

type Section = {
  id: string;
  label: string;
};

type Props = {
  sections: Section[];
  accent?: { active: string; idle: string };
};

const defaultAccent = {
  active: "bg-slate-200 text-slate-800 font-semibold",
  idle: "text-gray-600 hover:bg-gray-100",
};

export default function TrainingInPageToc({ sections, accent = defaultAccent }: Props) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50/80 p-4 lg:hidden">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">このページの目次</div>
      <div className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollTo(s.id)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${accent.idle}`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TrainingSectionAnchor({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-28 ${className}`}>
      {children}
    </section>
  );
}
