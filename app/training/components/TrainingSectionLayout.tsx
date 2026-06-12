"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { trainingPageSections } from "../trainingPageSections";

export type TrainingTocItem = {
  label: string;
  href: string;
  hash?: string;
};

type Accent = {
  active: string;
  idle: string;
  sectionActive?: string;
  sectionIdle?: string;
};

type Props = {
  items: TrainingTocItem[];
  accent: Accent;
  children: React.ReactNode;
};

function isItemActive(pathname: string, hash: string, item: TrainingTocItem): boolean {
  const base = item.href.split("#")[0];
  if (pathname !== base) return false;
  if (item.hash) return item.hash === hash;
  if (hash && base === "/training/snowflake") return false;
  return true;
}

export default function TrainingSectionLayout({ items, accent, children }: Props) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(window.location.hash.replace("#", ""));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const pageSections = trainingPageSections[pathname] ?? [];
  const sectionActive = accent.sectionActive ?? "bg-gray-200 text-gray-800 font-medium";
  const sectionIdle = accent.sectionIdle ?? "text-gray-500 hover:bg-gray-100 hover:text-gray-700";

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
      setHash(id);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-56 shrink-0">
        <div className="lg:sticky lg:top-24 space-y-5">
          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">目次</div>
            <nav className="space-y-1">
              {items.map((item) => {
                const active = isItemActive(pathname, hash ? `#${hash}` : "", item);
                const href = item.hash ? `${item.href}${item.hash}` : item.href;
                return (
                  <Link
                    key={`${item.href}${item.hash ?? ""}`}
                    href={href}
                    className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      active ? accent.active : accent.idle
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {pageSections.length > 0 ? (
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">このページ</div>
              <nav className="space-y-1 border-l-2 border-gray-200 pl-2">
                {pageSections.map((section) => {
                  const active = hash === section.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left text-xs px-2 py-1.5 rounded-md transition-colors ${
                        active ? sectionActive : sectionIdle
                      }`}
                    >
                      {section.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          ) : null}
        </div>
      </aside>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
