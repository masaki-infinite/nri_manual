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

const PROJECT_ID = "github-external-square-enix";
const COMPANY_NAME = "株式会社スクウェア・エニックス";

export default function SquareEnixProjectPage() {
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
    
    // メモを読み込む。旧形式からの移行を試みる。
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

    setShowTaskForm(false);
    setEditingTask(null);
    setTaskText("");
    setTaskDescription("");
    setTaskStartDate("");
    setTaskDeadline("");
    setTaskHours("");
  };

  const editTask = (task: ProjectTask) => {
    setEditingTask(task);
    setTaskText(task.text);
    setTaskDescription(task.description || "");
    setTaskStartDate(task.startDate);
    setTaskDeadline(task.deadline);
    setTaskHours(task.hours ? String(task.hours) : "");
    setShowTaskForm(true);
  };

  const deleteTask = (taskId: string) => {
    if (confirm("このタスクを削除しますか？")) {
      saveProject({
        ...project,
        tasks: project.tasks.filter((t) => t.id !== taskId),
      });
    }
  };

  const toggleTask = (taskId: string) => {
    saveProject({
      ...project,
      tasks: project.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ),
    });
  };

  const isOverdue = (deadline: string, completed: boolean) => {
    if (completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    return deadlineDate < today;
  };

  const isToday = (deadline: string, completed: boolean) => {
    if (completed) return false;
    const today = new Date().toISOString().split("T")[0];
    return deadline === today;
  };

  const overdueTasks = project.tasks.filter((t) => t.company === COMPANY_NAME && isOverdue(t.deadline, t.completed));

  const displayTasks = project.tasks
    .filter((t) => t.company === COMPANY_NAME)
    .sort((a, b) => a.deadline.localeCompare(b.deadline));

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/dashboard/projects/github-external"
          className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center gap-1"
        >
          ← GitHub外販に戻る
        </Link>
      </div>

      <div className="mb-2 text-sm text-gray-600">合計工数: <strong>{project.tasks.filter(t => t.company === COMPANY_NAME).reduce((s, t) => s + (t.hours || 0), 0)}</strong> 時間</div>

      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">🎮 {COMPANY_NAME}</h2>
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

      {/* 期限切れアラート */}
      {overdueTasks.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6 animate-pulse">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <h3 className="text-lg font-semibold text-red-800">
                期限切れのタスクが{overdueTasks.length}件あります
              </h3>
              <p className="text-sm text-red-600">
                早急に対応が必要です
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ステータス */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          ステータス
        </h3>
        <div className="flex gap-2">
          {["進行中", "保留", "完了"].map((status) => (
            <button
              key={status}
              onClick={() => saveProject({ ...project, status })}
              className={`px-4 py-2 rounded-lg transition-colors ${
                project.status === status
                  ? status === "進行中"
                    ? "bg-blue-500 text-white"
                    : status === "完了"
                    ? "bg-green-500 text-white"
                    : "bg-gray-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* メモ */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          メモ
        </h3>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          onBlur={(e) => {
            localStorage.setItem(`project_${PROJECT_ID}_${COMPANY_NAME}_memo`, e.target.value);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows={5}
          placeholder="メモを入力してください"
        />
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

      {/* タスク */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            やることリスト
          </h3>
          <div className="flex gap-2">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 text-sm transition-colors ${
                  viewMode === "list"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                リスト表示
              </button>
              <button
                onClick={() => setViewMode("wbs")}
                className={`px-3 py-1 text-sm transition-colors ${
                  viewMode === "wbs"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                WBS表示
              </button>
            </div>
            <button
              onClick={() => {
                setShowTaskForm(true);
                setEditingTask(null);
                setTaskText("");
                setTaskDescription("");
                setTaskStartDate("");
                setTaskDeadline("");
                setTaskHours("");
              }}
              className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              ＋ タスク追加
            </button>
          </div>
        </div>

        {/* タスク追加フォーム */}
        {showTaskForm && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="タスクのタイトル"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="詳細を入力してください"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">開始日</label>
                <input
                  type="date"
                  value={taskStartDate}
                  onChange={(e) => setTaskStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">終了日（期限）</label>
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
                placeholder="例: 2"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={addTask}
                className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {editingTask ? "更新" : "追加"}
              </button>
              <button
                onClick={() => {
                  setShowTaskForm(false);
                  setEditingTask(null);
                  setTaskText("");
                  setTaskDescription("");
                  setTaskDeadline("");
                }}
                className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

        {/* タスクリスト */}
        {displayTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            タスクがまだ登録されていません
          </p>
        ) : viewMode === "list" ? (
          <div className="space-y-2">
            {displayTasks.map((task) => {
              const overdueFlag = isOverdue(task.deadline, task.completed);
              const todayFlag = isToday(task.deadline, task.completed);

              return (
                <div
                  key={task.id}
                  className={`border rounded-lg p-3 transition-colors ${
                    overdueFlag
                      ? "border-red-300 bg-red-50"
                      : todayFlag
                      ? "border-orange-300 bg-orange-50"
                      : task.completed
                      ? "border-gray-200 bg-gray-50 opacity-60"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium break-words ${
                          task.completed ? "line-through text-gray-500" : "text-gray-800"
                        }`}
                      >
                        {task.text}
                      </p>
                      {task.description && (
                        <p className="text-xs text-gray-600 mt-1 break-words">
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            overdueFlag
                              ? "bg-red-100 text-red-800"
                              : todayFlag
                              ? "bg-orange-100 text-orange-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {task.startDate} → {task.deadline}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => editTask(task)}
                        className="text-indigo-600 hover:text-indigo-700 text-sm px-2"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:text-red-700 text-sm px-2"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                    完了
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    タスク
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                    開始日
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                    期限
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayTasks.map((task) => {
                  const overdueFlag = isOverdue(task.deadline, task.completed);
                  const todayFlag = isToday(task.deadline, task.completed);

                  return (
                    <tr
                      key={task.id}
                      className={
                        overdueFlag
                          ? "bg-red-50"
                          : todayFlag
                          ? "bg-orange-50"
                          : task.completed
                          ? "bg-gray-50 opacity-60"
                          : ""
                      }
                    >
                      <td className="px-3 py-2">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              task.completed ? "line-through text-gray-500" : "text-gray-800"
                            }`}
                          >
                            {task.text}
                          </p>
                          {task.description && (
                            <p className="text-xs text-gray-600 mt-1">
                              {task.description}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-sm text-gray-600">
                        {task.startDate}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`text-sm px-2 py-1 rounded ${
                            overdueFlag
                              ? "bg-red-100 text-red-800"
                              : todayFlag
                              ? "bg-orange-100 text-orange-800"
                              : "text-gray-600"
                          }`}
                        >
                          {task.deadline}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex gap-1">
                          <button
                            onClick={() => editTask(task)}
                            className="text-indigo-600 hover:text-indigo-700 text-sm"
                          >
                            編集
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            削除
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
