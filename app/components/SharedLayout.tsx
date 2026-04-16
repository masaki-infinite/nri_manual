"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

type MenuItem = {
  name: string;
  href: string;
  subItems?: MenuItem[];
};

type ActionItem = {
  id: string;
  text: string;
  company: string;
  date: string;
  minuteId: string;
  completed: boolean;
};

type Minutes = {
  id: string;
  company: string;
  date: string;
  title: string;
  content: string;
  attendees: string;
  createdAt: string;
};

export default function SharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [showActionItems, setShowActionItems] = useState(false);
  const [customProjects, setCustomProjects] = useState<Array<{id: string; name: string; category: string}>>([]);
  const [todayLabel, setTodayLabel] = useState("");

  // 今日の日付を設定（深夜0時に自動更新）
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
      });
      setTodayLabel(formatted);
      return now;
    };

    const now = updateDate();

    // 次の深夜0時までのミリ秒を計算してタイマーをセット
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    const timeout = setTimeout(() => {
      updateDate();
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  // カスタムプロジェクトを読み込む
  useEffect(() => {
    const loadCustomProjects = () => {
      const stored = localStorage.getItem("customProjects");
      if (stored) {
        setCustomProjects(JSON.parse(stored));
      }
    };

    loadCustomProjects();

    const handleProjectsUpdate = () => {
      loadCustomProjects();
    };

    window.addEventListener("projectsUpdated", handleProjectsUpdate);
    window.addEventListener("storage", handleProjectsUpdate);

    return () => {
      window.removeEventListener("projectsUpdated", handleProjectsUpdate);
      window.removeEventListener("storage", handleProjectsUpdate);
    };
  }, []);

  // 議事録からアクションアイテムを抽出
  useEffect(() => {
    const extractActionItems = () => {
      const stored = localStorage.getItem("minutes");
      if (!stored) return [];

      const minutes: Minutes[] = JSON.parse(stored);
      const items: ActionItem[] = [];

      minutes.forEach((minute) => {
        const content = minute.content;
        const actionItemMatch = content.match(/###\s*アクションアイテム([\s\S]*?)(?=###|$)/i);
        
        if (actionItemMatch) {
          const actionSection = actionItemMatch[1];
          const lines = actionSection.split('\n');
          
          lines.forEach((line, index) => {
            const trimmed = line.trim();
            const checkboxMatch = trimmed.match(/^[-*•]\s*\[([ xX])\]\s*(.+)$/);
            if (checkboxMatch) {
              items.push({
                id: `${minute.id}-${index}`,
                text: checkboxMatch[2].trim(),
                company: minute.company,
                date: minute.date,
                minuteId: minute.id,
                completed: checkboxMatch[1].toLowerCase() === 'x',
              });
            }
            else if (trimmed.match(/^[-*•]\s+(.+)$/)) {
              const textMatch = trimmed.match(/^[-*•]\s+(.+)$/);
              if (textMatch) {
                items.push({
                  id: `${minute.id}-${index}`,
                  text: textMatch[1].trim(),
                  company: minute.company,
                  date: minute.date,
                  minuteId: minute.id,
                  completed: false,
                });
              }
            }
          });
        }
      });

      return items;
    };

    const items = extractActionItems();
    
    const storedCompleted = localStorage.getItem("actionItemsCompleted");
    if (storedCompleted) {
      const completedMap = JSON.parse(storedCompleted);
      items.forEach((item) => {
        if (completedMap[item.id] !== undefined) {
          item.completed = completedMap[item.id];
        }
      });
    }
    
    setActionItems(items);

    const handleStorageChange = () => {
      const items = extractActionItems();
      const storedCompleted = localStorage.getItem("actionItemsCompleted");
      if (storedCompleted) {
        const completedMap = JSON.parse(storedCompleted);
        items.forEach((item) => {
          if (completedMap[item.id] !== undefined) {
            item.completed = completedMap[item.id];
          }
        });
      }
      setActionItems(items);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("minutesUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("minutesUpdated", handleStorageChange);
    };
  }, []);

  const toggleActionItem = (id: string) => {
    const updated = actionItems.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setActionItems(updated);

    const completedMap: Record<string, boolean> = {};
    updated.forEach((item) => {
      completedMap[item.id] = item.completed;
    });
    localStorage.setItem("actionItemsCompleted", JSON.stringify(completedMap));
  };

  const pendingCount = actionItems.filter((item) => !item.completed).length;

  const projectsByCategory = customProjects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = [];
    }
    acc[project.category].push(project);
    return acc;
  }, {} as Record<string, typeof customProjects>);

  const directProjects = (projectsByCategory["案件リスト直下"] || []).map(p => ({
    name: p.name,
    href: `/dashboard/projects/custom/${p.id}`,
  }));

  const customProjectItems: MenuItem[] = Object.entries(projectsByCategory)
    .filter(([category]) => category !== "案件リスト直下")
    .map(([category, projects]) => ({
      name: category,
      href: `/dashboard/projects/category/${category}`,
      subItems: projects.map(p => ({
        name: p.name,
        href: `/dashboard/projects/custom/${p.id}`,
      })),
    }));

  const menuItems: MenuItem[] = [
    { name: "ホーム", href: "/dashboard" },
    {
      name: "契約関係",
      href: "/contracts",
      subItems: [
        {
          name: "Snowflake",
          href: "/contracts/snowflake",
          subItems: [
            { name: "Snowflake内販", href: "/contracts/snowflake/internal" },
            { name: "Docusign電子署名", href: "/contracts/snowflake/docusign" },
          ],
        },
        { name: "GitHub", href: "/contracts/github" },
      ],
    },
    { name: "提案書作成", href: "/proposals" },
    {
      name: "勉強会",
      href: "/training",
      subItems: [
        {
          name: "GitHub",
          href: "/training/github",
          subItems: [
            { name: "GitHub Copilot", href: "/training/github/copilot" },
            { name: "GitHub Actions", href: "/training/github/actions" },
            { name: "Agentic Workflow", href: "/training/github/agentic-workflow" },
          ],
        },
        { name: "Claude Code", href: "/training/claude-code" },
        { name: "セマンティックレイヤー", href: "/training/semantic-layer" },
      ],
    },
    { name: "議事録", href: "/dashboard/minutes" },
    {
      name: "案件リスト",
      href: "/dashboard/projects",
      subItems: [
        { name: "竹中工務店", href: "/dashboard/projects/takenaka" },
        { name: "株式会社KBS", href: "/dashboard/projects/kbs" },
        { name: "株式会社スバル", href: "/dashboard/projects/subaru" },
        { name: "Snowflake内販", href: "/dashboard/projects/snowflake-internal" },
        { name: "Snowflake外販", href: "/dashboard/projects/snowflake-external" },
        { name: "GitHub内販", href: "/dashboard/projects/github-internal" },
        {
          name: "GitHubグループ会社",
          href: "/dashboard/projects/github-group",
          subItems: [
            { name: "NRIネットコム", href: "/dashboard/projects/github-group/nri-netcom" },
            { name: "NRIセキュア", href: "/dashboard/projects/github-group/nri-secure" },
            { name: "NRIデジタル", href: "/dashboard/projects/github-group/nri-digital" },
            { name: "NRIデータiテック", href: "/dashboard/projects/github-group/nri-data-itech" },
          ],
        },
        {
          name: "GitHub外販",
          href: "/dashboard/projects/github-external",
          subItems: [
            { name: "テレ・マーカーグループ株式会社", href: "/dashboard/projects/github-external/tele-marker" },
            { name: "株式会社エービッツ", href: "/dashboard/projects/github-external/abits" },
            { name: "株式会社スクウェア・エニックス", href: "/dashboard/projects/github-external/square-enix" },
            { name: "管清工業株式会社", href: "/dashboard/projects/github-external/kansei-kogyo" },
            { name: "三菱電機ビルソリューションズ", href: "/dashboard/projects/github-external/mitsubishi-electric-building-solutions" },
            { name: "株式会社プロトコーポレーション", href: "/dashboard/projects/github-external/proto-corporation" },
          ],
        },
        {
          name: "社内",
          href: "/dashboard/projects/internal",
          subItems: [
            { name: "Snowflakeコスト算出", href: "/dashboard/projects/internal/snowflake-cost" },
            { name: "dbt疎通", href: "/dashboard/projects/internal/dbt-connection" },
          ],
        },
        ...directProjects,
        ...customProjectItems,
      ],
    },
    { name: "パスワード", href: "/dashboard/passwords" },
  ];

  const toggleMenu = (key: string) => {
    const newOpenMenus = new Set(openMenus);
    if (newOpenMenus.has(key)) {
      newOpenMenus.delete(key);
    } else {
      newOpenMenus.add(key);
    }
    setOpenMenus(newOpenMenus);
  };

  const renderMenuItem = (item: MenuItem, parentKey = "") => {
    const key = parentKey ? `${parentKey}-${item.name}` : item.name;
    const isActive = pathname === item.href;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openMenus.has(key);

    return (
      <li key={key}>
        <div className="flex items-center">
          {hasSubItems ? (
            <>
              <button
                onClick={() => toggleMenu(key)}
                className={`flex-1 text-left px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </button>
              <button
                onClick={() => toggleMenu(key)}
                className="px-2 py-2 text-gray-500 hover:text-gray-700"
              >
                {isOpen ? "▼" : "▶"}
              </button>
            </>
          ) : (
            <Link
              href={item.href}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          )}
        </div>
        {hasSubItems && isOpen && (
          <ul className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
            {item.subItems!.map((subItem) => renderMenuItem(subItem, key))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">社内マニュアル</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowActionItems(!showActionItems)}
              className="relative px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm flex items-center gap-2"
            >
              ✓ やることリスト
              {pendingCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {pendingCount}
                </span>
              )}
            </button>
            <span className="text-sm text-gray-500">{todayLabel}</span>
            <span className="text-sm text-gray-600">{session?.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              ログアウト
            </button>
          </div>
        </div>
      </header>

      <div className="pt-[73px] flex">
        {/* 左サイドバー（ナビゲーション） */}
        <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-[73px] bottom-0 overflow-y-auto">
          <nav className="p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => renderMenuItem(item))}
            </ul>
          </nav>
        </aside>

        {/* メインコンテンツ */}
        <main className={`flex-1 ml-64 p-8 min-w-0 transition-all duration-300 ${showActionItems ? 'mr-96' : ''}`}>
          {children}
        </main>

        {/* 右サイドバー（アクションアイテム） */}
        {showActionItems && (
          <aside className="w-96 bg-white border-l border-gray-200 fixed right-0 top-[73px] bottom-0 overflow-y-auto shadow-lg">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  ✓ やることリスト
                  <span className="text-sm font-normal text-gray-500">
                    ({pendingCount}/{actionItems.length})
                  </span>
                </h2>
                <button
                  onClick={() => setShowActionItems(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {actionItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  アクションアイテムがありません
                  <br />
                  議事録に「### アクションアイテム」セクションを追加してください
                </div>
              ) : (
                <div className="space-y-4">
                  {/* 未完了のアクションアイテム */}
                  {actionItems.filter((item) => !item.completed).length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <span className="text-orange-500">●</span> 未完了
                      </h3>
                      <div className="space-y-2">
                        {actionItems
                          .filter((item) => !item.completed)
                          .map((item) => (
                            <div
                              key={item.id}
                              className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                            >
                              <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={item.completed}
                                  onChange={() => toggleActionItem(item.id)}
                                  className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-gray-800 break-words">
                                    {item.text}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                      {item.company}
                                    </span>
                                    <span>{item.date}</span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* 完了済みのアクションアイテム */}
                  {actionItems.filter((item) => item.completed).length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <span className="text-green-500">✓</span> 完了
                      </h3>
                      <div className="space-y-2">
                        {actionItems
                          .filter((item) => item.completed)
                          .map((item) => (
                            <div
                              key={item.id}
                              className="bg-gray-50 rounded-lg p-3 opacity-60 hover:opacity-80 transition-opacity"
                            >
                              <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={item.completed}
                                  onChange={() => toggleActionItem(item.id)}
                                  className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-gray-800 break-words line-through">
                                    {item.text}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                      {item.company}
                                    </span>
                                    <span>{item.date}</span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
