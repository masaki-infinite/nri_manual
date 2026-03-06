"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type ProjectTask = {
  id: string;
  text: string;
  deadline: string;
  completed: boolean;
};

type ProjectData = {
  id: string;
  name: string;
  status: string;
  tasks: ProjectTask[];
};

const PROJECT_IDS = [
  "takenaka",
  "subaru",
  "snowflake-internal",
  "snowflake-external",
  "github-internal",
  "github-external",
];

const PROJECT_NAMES: Record<string, string> = {
  takenaka: "竹中工務店",
  subaru: "株式会社スバル",
  "snowflake-internal": "Snowflake内販",
  "snowflake-external": "Snowflake外販",
  "github-internal": "GitHub内販",
  "github-external": "GitHub外販",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Record<string, ProjectData>>({});

  useEffect(() => {
    // プロジェクトデータを読み込む
    const loadedProjects: Record<string, ProjectData> = {};
    PROJECT_IDS.forEach((id) => {
      const stored = localStorage.getItem(`project_${id}`);
      if (stored) {
        loadedProjects[id] = JSON.parse(stored);
      } else {
        loadedProjects[id] = {
          id,
          name: PROJECT_NAMES[id],
          status: "進行中",
          tasks: [],
        };
      }
    });
    setProjects(loadedProjects);
  }, []);

  // 期限切れタスク数を計算
  const getOverdueTasks = (tasks: ProjectTask[]) => {
    const today = new Date().toISOString().split("T")[0];
    return tasks.filter((task) => !task.completed && task.deadline < today);
  };

  // 今日が期限のタスク数を計算
  const getTodayTasks = (tasks: ProjectTask[]) => {
    const today = new Date().toISOString().split("T")[0];
    return tasks.filter((task) => !task.completed && task.deadline === today);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📊 案件リスト</h2>

      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          各案件の進捗状況とタスクを管理できます。期限切れのタスクは赤色で表示されます。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {PROJECT_IDS.map((projectId) => {
            const project = projects[projectId];
            if (!project) return null;

            const overdueTasks = getOverdueTasks(project.tasks);
            const todayTasks = getTodayTasks(project.tasks);
            const totalTasks = project.tasks.filter((t) => !t.completed).length;

            return (
              <Link
                key={projectId}
                href={`/dashboard/projects/${projectId}`}
                className="block no-underline"
              >
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-indigo-300 relative">
                  {/* アラートバッジ */}
                  {overdueTasks.length > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center animate-pulse">
                      {overdueTasks.length}
                    </div>
                  )}

                  <div className="text-4xl mb-4">🏢</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {project.name}
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">ステータス:</span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          project.status === "進行中"
                            ? "bg-blue-100 text-blue-700"
                            : project.status === "完了"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">未完了タスク:</span>
                      <span className="font-semibold text-gray-800">
                        {totalTasks}件
                      </span>
                    </div>

                    {overdueTasks.length > 0 && (
                      <div className="flex items-center gap-2 text-red-600">
                        <span>⚠️ 期限切れ:</span>
                        <span className="font-bold">{overdueTasks.length}件</span>
                      </div>
                    )}

                    {todayTasks.length > 0 && (
                      <div className="flex items-center gap-2 text-orange-600">
                        <span>📅 本日期限:</span>
                        <span className="font-bold">{todayTasks.length}件</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 全体のアラート */}
        <div className="mt-8">
          {PROJECT_IDS.some(
            (id) =>
              projects[id] && getOverdueTasks(projects[id].tasks).length > 0
          ) && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    期限切れタスクがあります
                  </h3>
                  <ul className="space-y-1 text-sm text-red-700">
                    {PROJECT_IDS.map((id) => {
                      const project = projects[id];
                      if (!project) return null;
                      const overdue = getOverdueTasks(project.tasks);
                      if (overdue.length === 0) return null;
                      return (
                        <li key={id}>
                          <Link
                            href={`/dashboard/projects/${id}`}
                            className="text-red-700 hover:text-red-900 underline"
                          >
                            {project.name}: {overdue.length}件
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
