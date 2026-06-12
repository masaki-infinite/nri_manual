"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "🗺️ ArcGIS 概要", href: "/training/arcgis" },
  { label: "☁️ Online", href: "/training/arcgis/online" },
  { label: "🏢 Enterprise", href: "/training/arcgis/enterprise" },
  { label: "🚪 ポータル", href: "/training/arcgis/portal" },
  { label: "🖥️ ArcGIS Pro", href: "/training/arcgis/pro" },
  { label: "📥 GIS 取り込み", href: "/training/arcgis/import" },
  { label: "🗂️ レイヤー", href: "/training/arcgis/layer" },
  { label: "🌐 Maps SDK (JS)", href: "/training/arcgis/maps-sdk-js" },
  { label: "🐍 ArcGIS API for Python", href: "/training/arcgis/maps-sdk-python" },
];

export default function ArcGISSubNav() {
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
                ? "bg-white text-cyan-700 shadow-sm font-semibold"
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
