"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "💪 Snowflake の強み", href: "/training/snowflake/strengths" },
  { label: "🗂️ データ基盤の位置づけ", href: "/training/snowflake/data-platform" },
  { label: "❄️ SPCS の基本", href: "/training/snowflake" },
  { label: "🧠 Cortex AI", href: "/training/snowflake/cortex" },
  { label: "🔍 RAG 構築", href: "/training/snowflake/rag" },
  { label: "🔌 MCP ゲートウェイ", href: "/training/snowflake/mcp-gateway" },
  { label: "🗺️ ArcGIS 連携", href: "/training/snowflake-arcgis" },
];

export default function SnowflakeSubNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-100 rounded-xl w-fit">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
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
