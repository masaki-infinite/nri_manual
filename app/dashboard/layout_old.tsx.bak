"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type MenuItem = {
  name: string;
  path: string;
  icon?: string;
  subItems?: MenuItem[];
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Set<string>>(  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [showActionItems, setShowActionItems] = useState(false);

  // 議事録からアクションアイテムを抽出
  useEffect(() => {
    const extractActionItems = () => {
      const stored = localStorage.getItem("minutes");
      if (!stored) return [];

      const minutes: Minutes[] = JSON.parse(stored);
      const items: ActionItem[] = [];

      minutes.forEach((minute) => {
        const content = minute.content;
        // ### アクションアイテム 以下を抽出
        const actionItemMatch = content.match(/###\s*アクションアイテム([\s\S]*?)(?=###|$)/i);
        
        if (actionItemMatch) {
          const actionSection = actionItemMatch[1];
          // リスト項目を抽出（-, *, •で始まる行、またはチェックボックス形式）
          const lines = actionSection.split('\n');
          
          lines.forEach((line, index) => {
            const trimmed = line.trim();
            // - [ ] や - [x] 形式のチェックボックス
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
            // 通常のリスト項目
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
    
    // localStorageから完了状態を復元
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

    // storageイベントをリッスンして更新
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
    // カスタムイベントでも更新（同じタブ内での更新用）
    window.addEventListener("minutesUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("minutesUpdated", handleStorageChange);
    };
  }, []);

  // アクションアイテムの完了状態を切り替え
  const toggleActionItem = (id: string) => {
    const updated = actionItems.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setActionItems(updated);

    // 完了状態をlocalStorageに保存
    const completedMap: Record<string, boolean> = {};
    updated.forEach((item) => {
      completedMap[item.id] = item.completed;
    });
    localStorage.setItem("actionItemsCompleted", JSON.stringify(completedMap));
  };

  // 未完了のアクションアイテム数
  const pendingCount = actionItems.filter((item) => !item.completed).length;    new Set(
      pathname.startsWith("/contracts") ? ["contracts"] : 
      pathname.startsWith("/training") ? ["training", "training-github"] : []
    )
  );

  const menuItems: MenuItem[] = [
    { name: "ホーム", path: "/dashboard", icon: "🏠" },
    {
      name: "契約関係",
      path: "/contracts",
      icon: "📝",
      subItems: [
        { name: "Snowflake", path: "/contracts/snowflake" },
        { name: "GitHub", path: "/contracts/github" },
      ],
    },
    { name: "提案書作成", path: "/proposals", icon: "📊" },
    {
      name: "勉強会",
      path: "/training",
      icon: "📚",
      subItems: [
        { 
          name: "GitHub", 
          path: "/training/github",
          subItems: [
            { name: "GitHub Copilot", path: "/training/github/copilot" },
            { name: "GitHub Actions", path: "/training/github/actions" }
          ]
        },
        { name: "Claude Code", path: "/training/claude-code" },
        { name: "セマンティックレイヤー", path: "/training/semantic-layer" },
      ],
    },
  ];

  const toggleMenu = (menuKey: string) => {
    setOpenMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(menuKey)) {
        newSet.delete(menuKey);
      } else {
        newSet.add(menuKey);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-indigo-600">社内マニュアル</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {session?.user?.name}さん
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-sm text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-4 space-y-2">
              {menuItems.map((item) => (
                <div key={item.path}>
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleMenu(item.path.split("/").pop()!)}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
                          pathname.startsWith(item.path)
                            ? "bg-indigo-50 text-indigo-600 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                        <span className="text-sm">
                          {openMenus.has(item.path.split("/").pop()!)
                            ? "▼"
                            : "▶"}
                        </span>
                      </button>
                      {openMenus.has(item.path.split("/").pop()!) && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.subItems.map((subItem) => (
                            <div key={subItem.path}>
                              {subItem.subItems ? (
                                <>
                                  <button
                                    onClick={() => toggleMenu(`${item.path.split("/").pop()}-${subItem.name.toLowerCase().replace(/\s+/g, '-')}`)}
                                    className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-colors ${
                                      pathname.startsWith(subItem.path)
                                        ? "bg-indigo-100 text-indigo-700 font-medium"
                                        : "text-gray-600 hover:bg-gray-50"
                                    }`}
                                  >
                                    <span>{subItem.name}</span>
                                    <span className="text-xs">
                                      {openMenus.has(`${item.path.split("/").pop()}-${subItem.name.toLowerCase().replace(/\s+/g, '-')}`)
                                        ? "▼"
                                        : "▶"}
                                    </span>
                                  </button>
                                  {openMenus.has(`${item.path.split("/").pop()}-${subItem.name.toLowerCase().replace(/\s+/g, '-')}`) && (
                                    <div className="ml-4 mt-1 space-y-1">
                                      {subItem.subItems.map((subSubItem) => (
                                        <Link
                                          key={subSubItem.path}
                                          href={subSubItem.path}
                                          className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                                            pathname === subSubItem.path
                                              ? "bg-indigo-200 text-indigo-800 font-medium"
                                              : "text-gray-600 hover:bg-gray-50"
                                          }`}
                                        >
                                          {subSubItem.name}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <Link
                                  href={subItem.path}
                                  className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                                    pathname === subItem.path
                                      ? "bg-indigo-100 text-indigo-700 font-medium"
                                      : "text-gray-600 hover:bg-gray-50"
                                  }`}
                                >
                                  {subItem.name}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        pathname === item.path
                          ? "bg-indigo-50 text-indigo-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-lg shadow-sm p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
