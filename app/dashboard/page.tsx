"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type CustomProject = {
  id: string;
  name: string;
  category: string;
  createdAt: string;
};

type ProjectTask = {
  id: string;
  text: string;
  description?: string;
  startDate: string;
  deadline: string;
  completed: boolean;
  company?: string;
};

type DashboardTask = {
  id: string;
  text: string;
  deadline?: string;
  completed: boolean;
};

export default function DashboardPage() {
  const [customProjects, setCustomProjects] = useState<CustomProject[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectCategory, setProjectCategory] = useState("提案段階");
  const [overdueTasks, setOverdueTasks] = useState<Array<ProjectTask & { companyName: string }>>([]);
  const [tasks, setTasks] = useState<DashboardTask[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [projectHours, setProjectHours] = useState<Record<string, number>>({});

  useEffect(() => {
    const stored = localStorage.getItem("customProjects");
    if (stored) {
      setCustomProjects(JSON.parse(stored));
    }

    // 期限切れタスクを読み込む
    loadOverdueTasks();
    loadDashboardTasks();
    loadProjectHours();
  }, []);

  const loadProjectHours = () => {
    // カスタムプロジェクトの工数を読み込む
    const stored = localStorage.getItem("customProjects");
    const map: Record<string, number> = {};
    
    if (stored) {
      try {
        const projects: CustomProject[] = JSON.parse(stored);
        projects.forEach((p) => {
          const proj = localStorage.getItem(`project_${p.id}`);
          if (!proj) {
            map[p.id] = 0;
            return;
          }
          try {
            const data = JSON.parse(proj);
            map[p.id] = data.totalHours || 0;
          } catch (e) {
            map[p.id] = 0;
          }
        });
      } catch (e) {
        console.error("failed to parse customProjects for hours", e);
      }
    }

    // 固定プロジェクト（kbs, subaru, takenaka など）の工数も読み込む
    const fixedProjects = ["kbs", "subaru", "takenaka", "snowflake-internal", "snowflake-external", "github-internal", "github-external", "github-group"];
    fixedProjects.forEach((pid) => {
      const proj = localStorage.getItem(`project_${pid}`);
      if (proj) {
        try {
          const data = JSON.parse(proj);
          map[pid] = data.totalHours || 0;
        } catch (e) {
          map[pid] = 0;
        }
      }
    });

    setProjectHours(map);
  };

  useEffect(() => {
    const handler = () => loadProjectHours();
    window.addEventListener("projectsUpdated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("projectsUpdated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const loadDashboardTasks = () => {
    const stored = localStorage.getItem("dashboardTasks");
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as DashboardTask[];
      setTasks(parsed);
    } catch (e) {
      console.error("failed to parse dashboardTasks", e);
    }
  };

  const saveTasks = (next: DashboardTask[]) => {
    setTasks(next);
    localStorage.setItem("dashboardTasks", JSON.stringify(next));
  };

  const addTask = () => {
    if (!newTaskText.trim()) return;
    const t: DashboardTask = {
      id: `task-${Date.now()}`,
      text: newTaskText.trim(),
      deadline: newTaskDeadline || undefined,
      completed: false,
    };
    const next = [t, ...tasks];
    saveTasks(next);
    setNewTaskText("");
    setNewTaskDeadline("");
  };

  const toggleTaskComplete = (id: string) => {
    const next = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    saveTasks(next);
  };

  const deleteTask = (id: string) => {
    if (!confirm("タスクを削除しますか？")) return;
    const next = tasks.filter((t) => t.id !== id);
    saveTasks(next);
  };

  const loadOverdueTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const overdue: Array<ProjectTask & { companyName: string }> = [];

    // 旧共有キーと新個別キーの両方からタスクを読み込む
    const keysToCheck = [
      "project_github-group",
      "project_github-group-nri-digital",
      "project_github-group-nri-netcom",
      "project_github-group-nri-data-itech",
      "project_github-group-nri-secure",
      "project_github-external",
      "project_github-external-square-enix",
      "project_github-external-abits",
      "project_github-external-kansei-kogyo",
      "project_github-external-mitsubishi",
      "project_github-external-proto-corporation",
      "project_github-external-tele-marker",
    ];

    const seenTaskIds = new Set<string>();

    keysToCheck.forEach((key) => {
      const stored = localStorage.getItem(key);
      if (!stored) return;
      try {
        const project = JSON.parse(stored);
        project.tasks?.forEach((task: ProjectTask) => {
          if (seenTaskIds.has(task.id)) return;
          if (!task.completed && task.deadline && task.company) {
            const deadlineDate = new Date(task.deadline);
            deadlineDate.setHours(0, 0, 0, 0);
            if (deadlineDate < today) {
              seenTaskIds.add(task.id);
              overdue.push({ ...task, companyName: task.company || "不明" });
            }
          }
        });
      } catch {
        // ignore parse errors
      }
    });

    setOverdueTasks(overdue);
  };

  const addProject = () => {
    if (!projectName.trim()) return;

    const newProject: CustomProject = {
      id: `custom-${Date.now()}`,
      name: projectName,
      category: projectCategory,
      createdAt: new Date().toISOString(),
    };

    const updated = [...customProjects, newProject];
    localStorage.setItem("customProjects", JSON.stringify(updated));
    setCustomProjects(updated);
    setProjectName("");
    setProjectCategory("提案段階");
    setShowAddForm(false);

    // イベントを発行してサイドバーを更新
    window.dispatchEvent(new Event("projectsUpdated"));
  };

  const deleteProject = (id: string) => {
    if (!confirm("この案件を削除しますか？")) return;

    const updated = customProjects.filter((p) => p.id !== id);
    localStorage.setItem("customProjects", JSON.stringify(updated));
    setCustomProjects(updated);

    // プロジェクトデータも削除
    localStorage.removeItem(`project_${id}`);

    // イベントを発行してサイドバーを更新
    window.dispatchEvent(new Event("projectsUpdated"));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        ようこそ、社内マニュアルへ
      </h2>

      {/* 全案件の工数合計 */}
      <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <div className="flex items-center gap-4">
          <span className="text-3xl">⏱️</span>
          <div>
            <p className="text-sm text-indigo-600 font-medium">全案件の合計工数</p>
            <p className="text-2xl font-bold text-indigo-900">
              {Math.round(Object.values(projectHours).reduce((sum, h) => sum + h, 0) * 100) / 100} 時間
            </p>
          </div>
        </div>
      </div>

      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          このサイトでは、社内の重要なマニュアルやガイドラインを確認できます。
          左側のメニューから必要な情報を選択してください。
        </p>

        {/* 期限切れタスク警告 */}
        {overdueTasks.length > 0 && (
          <div className="bg-red-50 border-2 border-red-500 rounded-lg p-6 mb-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-900 mb-3">
                  期限切れタスク {overdueTasks.length}件
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto min-w-0">
                  {overdueTasks.map((task) => (
                    <div key={task.id} className="bg-white border border-red-300 rounded-lg p-4 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">
                              {task.companyName}
                            </span>
                            <span className="text-xs text-red-600 font-bold">
                              期限: {task.deadline}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 break-words">{task.text}</p>
                          {task.description && (
                            <p className="text-xs text-gray-600 mt-1 break-words">{task.description}</p>
                          )}
                        </div>
                        <Link
                          href={`/dashboard/projects/github-group/${
                            task.companyName === "NRIネットコム"
                              ? "nri-netcom"
                              : task.companyName === "NRIデジタル"
                              ? "nri-digital"
                              : "nri-data-itech"
                          }`}
                          className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                        >
                          確認
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8">
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              契約関係
            </h3>
            <p className="text-gray-600 text-sm">
              契約書の作成方法、契約フロー、注意事項などをまとめています。
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              提案書作成
            </h3>
            <p className="text-gray-600 text-sm">
              提案書のテンプレート、作成のポイント、参考資料などを掲載しています。
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              勉強会
            </h3>
            <p className="text-gray-600 text-sm">
              過去の勉強会資料、スケジュール、技術情報などを確認できます。
            </p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📌 お知らせ
          </h3>
          <ul className="text-blue-800 text-sm space-y-2">
            <li>• 2026/01/20: 新しい契約フローを追加しました</li>
            <li>• 2026/01/15: 提案書テンプレートを更新しました</li>
            <li>• 2026/01/10: 次回の勉強会は1/30です</li>
          </ul>
        </div>

        {/* 案件管理セクション */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">案件管理</h3>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {showAddForm ? "キャンセル" : "+ 新規案件追加"}
            </button>
          </div>

          {showAddForm && (
            <div className="mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">新規案件を追加</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    案件名
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="例: 野村證券システム刷新"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリ
                  </label>
                  <select
                    value={projectCategory}
                    onChange={(e) => setProjectCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="案件リスト直下">案件リスト直下</option>
                    <option value="提案段階">提案段階</option>
                    <option value="顧客案件">顧客案件</option>
                    <option value="社内">社内</option>
                    <option value="内販">内販</option>
                    <option value="外販">外販</option>
                    <option value="その他">その他</option>
                  </select>
                </div>
                <button
                  onClick={addProject}
                  className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  案件を追加
                </button>
              </div>
            </div>
          )}

          {/* 案件リスト */}
          {customProjects.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h4 className="font-semibold text-gray-800">登録済み案件</h4>
              </div>
              <div className="divide-y divide-gray-200">
                {customProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <Link
                      href={`/dashboard/projects/custom/${project.id}`}
                      className="flex-1"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📁</span>
                        <div>
                          <h5 className="font-semibold text-gray-800 hover:text-indigo-600">
                            {project.name}
                          </h5>
                          <p className="text-sm text-gray-500">
                            カテゴリ: {project.category} • 作成日: {" "}
                            {new Date(project.createdAt).toLocaleDateString("ja-JP")}
                            {projectHours[project.id] !== undefined && (
                              <span className="ml-2 text-xs text-gray-700">合計工数: <strong>{Math.round(projectHours[project.id] * 100) / 100}</strong> 時間</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="ml-4 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
                      削除
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {customProjects.length === 0 && !showAddForm && (
            <div className="text-center py-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500 mb-4">まだ案件が登録されていません</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                最初の案件を追加
              </button>
            </div>
          )}

          {/* 簡単なタスク */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">簡単なタスク</h3>
            </div>

            <div className="mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="タスク内容を入力"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />

                <input
                  type="date"
                  value={newTaskDeadline}
                  onChange={(e) => setNewTaskDeadline(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />

                <button
                  onClick={addTask}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  タスクを追加
                </button>
              </div>
            </div>

            {tasks.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-800">タスクリスト</h4>
                </div>
                <div className="divide-y divide-gray-200">
                  {tasks.map((t) => (
                    <div key={t.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={t.completed}
                          onChange={() => toggleTaskComplete(t.id)}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className={`${t.completed ? "line-through text-gray-400" : "text-gray-800"} font-medium`}>{t.text}</p>
                          {t.deadline && (
                            <p className="text-xs text-gray-500">期限: {t.deadline}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <button onClick={() => deleteTask(t.id)} className="ml-4 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">削除</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-gray-500">タスクはありません</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
