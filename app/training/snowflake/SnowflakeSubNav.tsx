"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const tabs = [
  { label: "💪 Snowflake の強み", href: "/training/snowflake/strengths" },
  { label: "🗂️ データ基盤の位置づけ", href: "/training/snowflake/data-platform" },
  { label: "🗺️ 地理空間データ活用", href: "/training/snowflake/geospatial" },
  { label: "📐 構成図", href: "/training/snowflake", hash: "" },
  { label: "❄️ SPCS の基本", href: "/training/snowflake#spcs", hash: "#spcs" },
  { label: "🔌 Snowflake Adaptor", href: "/training/snowflake/adaptor" },
  { label: "✨ Snowflake Intelligence", href: "/training/snowflake/intelligence" },
  { label: "⌨️ Cortex Code", href: "/training/snowflake/cortex-code" },
  { label: "🧠 Cortex AI", href: "/training/snowflake/cortex" },
  { label: "🔍 RAG 構築", href: "/training/snowflake/rag" },
  { label: "🔗 Snowflake × ArcGIS 連携", href: "/training/snowflake-arcgis" },
];

export default function SnowflakeSubNav() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <nav className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-100 rounded-xl w-fit">
      {tabs.map((tab) => {
        const isSnowflakeHome = pathname === "/training/snowflake";
        const isActive =
          "hash" in tab && isSnowflakeHome
            ? (tab.hash ?? "") === hash
            : pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              isActive
                ? "bg-white text-indigo-700 shadow-sm font-semibold"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
