"use client";

import { useState, useEffect } from "react";
import { migrateCompanyMemo } from "@/lib/memoMigration";
import Link from "next/link";
import ExternalLinks from "@/app/dashboard/projects/components/ExternalLinks";

type ProjectTask = {
  id: string;
  text: string;
  description?: string;
  startDate: string;
  deadline: string;
  completed: boolean;
  company?: string;
  hours?: number;
};

type ProjectData = {
  id: string;
  name: string;
  status: string;
  tasks: ProjectTask[];
  memo: string;
  miroUrl?: string;
  googleSlidesUrl?: string;
  assignee?: string;
};

const PROJECT_ID = "github-external-abits";
const COMPANY_NAME = "株式会社エービッツ";

export default function AbitsProjectPage() {
  const [project, setProject] = useState<ProjectData>({
    id: PROJECT_ID,
    name: COMPANY_NAME,
    status: "進行中",
    tasks: [],
    memo: "",
    miroUrl: "",
    googleSlidesUrl: "",
    assignee: "",
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [editingTask, setEditingTask] = useState<ProjectTask | null>(null);
  const [taskHours, setTaskHours] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "wbs">("list");
  const [memo, setMemo] = useState("");
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [assigneeInput, setAssigneeInput] = useState("");
  const [assignee, setAssignee] = useState("");

  useEffect(() => {
    const OLD_PROJECT_ID = "github-external";
    let stored = localStorage.getItem(`project_${PROJECT_ID}`);
    // 旧共有キーからの移行
    if (!stored) {
      const oldStored = localStorage.getItem(`project_${OLD_PROJECT_ID}`);
      if (oldStored) {
        const oldData = JSON.parse(oldStored);
        const myTasks = (oldData.tasks || []).filter((t: ProjectTask) => t.company === COMPANY_NAME);
        const migrated = { ...oldData, id: PROJECT_ID, name: COMPANY_NAME, tasks: myTasks };
        localStorage.setItem(`project_${PROJECT_ID}`, JSON.stringify(migrated));
        stored = JSON.stringify(migrated);
      }
    }
    if (stored) {
      const data = JSON.parse(stored);
      setProject({
        ...data,
        name: COMPANY_NAME,
        miroUrl: data.miroUrl || "",
        googleSlidesUrl: data.googleSlidesUrl || "",
      });
    }
    
    // メモを読み込む。もし個別キーがなければ旧来的に保存していた
    // `${PROJECT_ID}_company_memos` から切り出して移行する。
    let storedMemo = localStorage.getItem(`project_${PROJECT_ID}_${COMPANY_NAME}_memo`);
    if (!storedMemo) {
      const migrated = migrateCompanyMemo(PROJECT_ID, COMPANY_NAME);
      if (migrated) storedMemo = migrated;
    }
    if (storedMemo) {
      setMemo(storedMemo);
    }

    // 担当者を読み込む
    const storedAssignee = localStorage.getItem(`project_${PROJECT_ID}_${COMPANY_NAME}_assignee`);
    if (storedAssignee) {
      setAssignee(storedAssignee);
      setAssigneeInput(storedAssignee);
    }
  }, []);

  const saveProject = (data: ProjectData) => {
    localStorage.setItem(`project_${PROJECT_ID}`, JSON.stringify(data));
    setProject({ ...data, name: COMPANY_NAME });
  };

  const saveAssignee = () => {
    localStorage.setItem(`project_${PROJECT_ID}_${COMPANY_NAME}_assignee`, assigneeInput);
    setAssignee(assigneeInput);
    setIsEditingAssignee(false);
  };

  const addTask = () => {
    if (!taskText || !taskStartDate || !taskDeadline) return;

    if (editingTask) {
      const updated = {
        ...project,
        tasks: project.tasks.map((t) =>
          t.id === editingTask.id
            ? { ...t, text: taskText, description: taskDescription, startDate: taskStartDate, deadline: taskDeadline, company: COMPANY_NAME }
            : t
        ),
      };
      saveProject(updated);
    } else {
      const newTask: ProjectTask = {
        id: Date.now().toString(),
        text: taskText,
        description: taskDescription,
        startDate: taskStartDate,
        deadline: taskDeadline,
        completed: false,
        company: COMPANY_NAME,
        hours: taskHours ? parseFloat(taskHours) : 0,
      };
      saveProject({ ...project, tasks: [...project.tasks, newTask] });
    }

    setTaskText("");
    setTaskDescription("");
    setTaskStartDate("");
    setTaskDeadline("");
    setTaskHours("");
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    if (confirm("このタスクを削除しますか？")) {
      saveProject({
        ...project,
        tasks: project.tasks.filter((t) => t.id !== id),
      });
    }
  };

  const toggleTask = (id: string) => {
    saveProject({
      ...project,
      tasks: project.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    });
  };

  const startEditTask = (task: ProjectTask) => {
    setEditingTask(task);
    setTaskText(task.text);
    setTaskDescription(task.description || "");
    setTaskStartDate(task.startDate);
    setTaskDeadline(task.deadline);
    setTaskHours(task.hours ? String(task.hours) : "");
    setShowTaskForm(true);
  };

  const updateStatus = (status: string) => {
    saveProject({ ...project, status });
  };

  const saveMemo = () => {
    localStorage.setItem(`project_${PROJECT_ID}_${COMPANY_NAME}_memo`, memo);
    alert("メモを保存しました");
  };

  // 表示するタスクをフィルタリング（このCompany専用）
  const displayTasks = project.tasks.filter(
    (task) => task.company === COMPANY_NAME
  );

  // 期限が過ぎたタスクを取得
  const today = new Date().toISOString().split("T")[0];
  const overdueTasks = displayTasks.filter(
    (task) => !task.completed && task.deadline < today
  );

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Link
              href="/dashboard/projects"
              className="text-indigo-600 hover:text-indigo-800"
            >
              案件リスト
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/dashboard/projects/github-external"
              className="text-indigo-600 hover:text-indigo-800"
            >
              GitHub外販
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{COMPANY_NAME}</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <h1 className="text-3xl font-bold text-gray-900">
              💼 {project.name}
            </h1>
            {!isEditingAssignee ? (
              <button
                onClick={() => setIsEditingAssignee(true)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {assignee ? `担当: ${assignee}` : "+ 担当者を設定"}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={assigneeInput}
                  onChange={(e) => setAssigneeInput(e.target.value)}
                  placeholder="担当者名"
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  autoFocus
                />
                <button
                  onClick={saveAssignee}
                  className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  保存
                </button>
                <button
                  onClick={() => {
                    setIsEditingAssignee(false);
                    setAssigneeInput(assignee || "");
                  }}
                  className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  キャンセル
                </button>
              </div>
            )}
          </div>
          <div className="mb-2 text-sm text-gray-600">合計工数: <strong>{project.tasks.filter(t => t.company === COMPANY_NAME).reduce((s, t) => s + (t.hours || 0), 0)}</strong> 時間</div>
        </div>
        <div className="flex space-x-2">
          <select
            value={project.status}
            onChange={(e) => updateStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="進行中">進行中</option>
            <option value="保留">保留</option>
            <option value="完了">完了</option>
          </select>
        </div>
      </div>

      {/* 期限切れアラート */}
      {overdueTasks.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-red-600 text-xl mr-2">⚠️</span>
            <div>
              <h3 className="text-red-800 font-semibold">
                期限切れタスクが {overdueTasks.length} 件あります
              </h3>
              <ul className="mt-2 space-y-1">
                {overdueTasks.map((task) => (
                  <li key={task.id} className="text-red-700 text-sm">
                    • {task.text} (期限: {task.deadline})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* メモ */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📝 メモ</h2>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows={6}
          placeholder="プロジェクトに関するメモを記入してください"
        />
        <button
          onClick={saveMemo}
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          メモを保存
        </button>
      </div>

      {/* 外部リンク */}
      <ExternalLinks storageKey={PROJECT_ID} />

      {/* Googleスライド */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          📊 Googleスライド
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Googleスライド埋め込みURL
          </label>
          <input
            type="text"
            value={project.googleSlidesUrl || ""}
            onChange={(e) => saveProject({ ...project, googleSlidesUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="https://docs.google.com/presentation/d/.../embed?..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Googleスライドの「ファイル」→「共有」→「ウェブに公開」で埋め込みリンクを取得してください
          </p>
        </div>
        {project.googleSlidesUrl && (
          <div className="border border-gray-300 rounded-lg overflow-hidden" style={{ height: "500px" }}>
            <iframe
              src={project.googleSlidesUrl}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )}
      </div>

      {/* タスク管理 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            ✅ やることリスト ({displayTasks.filter((t) => !t.completed).length}/
            {displayTasks.length})
          </h2>
          <div className="flex items-center space-x-2">
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 text-sm ${
                  viewMode === "list"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                リスト
              </button>
              <button
                onClick={() => setViewMode("wbs")}
                className={`px-3 py-1 text-sm ${
                  viewMode === "wbs"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                WBS
              </button>
            </div>
            <button
              onClick={() => {
                const opening = !showTaskForm;
                setShowTaskForm(opening);
                if (opening) {
                  setEditingTask(null);
                  setTaskText("");
                  setTaskDescription("");
                  setTaskStartDate("");
                  setTaskDeadline("");
                  setTaskHours("");
                }
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {showTaskForm ? "キャンセル" : "+ タスクを追加"}
            </button>
          </div>
        </div>

        {showTaskForm && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="タスク名"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="タスクの詳細（オプション）"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={3}
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  開始日
                </label>
                <input
                  type="date"
                  value={taskStartDate}
                  onChange={(e) => setTaskStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  期限
                </label>
                <input
                  type="date"
                  value={taskDeadline}
                  onChange={(e) => setTaskDeadline(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-xs text-gray-600 mb-1">工数（時間）</label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={taskHours}
                onChange={(e) => setTaskHours(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="例: 1.5"
              />
            </div>
            <button
              onClick={addTask}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {editingTask ? "タスクを更新" : "タスクを追加"}
            </button>
          </div>
        )}

        {viewMode === "list" ? (
          <div className="space-y-2">
            {displayTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                タスクがありません
              </p>
            ) : (
              displayTasks.map((task) => {
                const isOverdue = !task.completed && task.deadline < today;
                return (
                  <div
                    key={task.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border ${
                      task.completed
                        ? "bg-gray-50 border-gray-200"
                        : isOverdue
                        ? "bg-red-50 border-red-200"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <div
                        className={`font-medium ${
                          task.completed
                            ? "line-through text-gray-500"
                            : isOverdue
                            ? "text-red-800"
                            : "text-gray-900"
                        }`}
                      >
                        {task.text}
                      </div>
                      {task.description && (
                        <div className="text-xs text-gray-600 mt-1">
                          {task.description}
                        </div>
                      )}
                      <div
                        className={`text-sm mt-1 ${
                          task.completed
                            ? "text-gray-400"
                            : isOverdue
                            ? "text-red-600 font-semibold"
                            : "text-gray-600"
                        }`}
                      >
                        {task.startDate} 〜 {task.deadline}
                        {isOverdue && " ⚠️ 期限切れ"}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditTask(task)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    タスク名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    詳細
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    開始日
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    期限
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayTasks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      タスクがありません
                    </td>
                  </tr>
                ) : (
                  displayTasks.map((task) => {
                    const isOverdue = !task.completed && task.deadline < today;
                    return (
                      <tr
                        key={task.id}
                        className={
                          task.completed
                            ? "bg-gray-50"
                            : isOverdue
                            ? "bg-red-50"
                            : ""
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </td>
                        <td
                          className={`px-6 py-4 ${
                            task.completed
                              ? "line-through text-gray-500"
                              : isOverdue
                              ? "text-red-800 font-semibold"
                              : "text-gray-900"
                          }`}
                        >
                          {task.text}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {task.description || "-"}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            task.completed ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {task.startDate}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${
                            task.completed
                              ? "text-gray-400"
                              : isOverdue
                              ? "text-red-600 font-semibold"
                              : "text-gray-600"
                          }`}
                        >
                          {task.deadline}
                          {isOverdue && " ⚠️"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button
                            onClick={() => startEditTask(task)}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            編集
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            削除
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
