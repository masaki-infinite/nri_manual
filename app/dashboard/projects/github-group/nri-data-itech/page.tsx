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
};

type ProjectFile = {
  id: string;
  name: string;
  path: string;
  type: string;
  uploadedAt: string;
};

type ProjectData = {
  id: string;
  name: string;
  status: string;
  tasks: ProjectTask[];
  memo: string;
  files: ProjectFile[];
  miroUrl?: string;
  requirement?: string;
  solution?: string;
  assignee?: string;
};

const PROJECT_ID = "github-group-nri-data-itech";
const COMPANY_NAME = "NRIデータiテック";

export default function NRIDataItechProjectPage() {
  const [project, setProject] = useState<ProjectData>({
    id: PROJECT_ID,
    name: COMPANY_NAME,
    status: "進行中",
    tasks: [],
    memo: "",
    files: [],
    miroUrl: "",
    requirement: "",
    solution: "",
    assignee: "",
  });
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [editingTask, setEditingTask] = useState<ProjectTask | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "wbs">("list");
  const [memo, setMemo] = useState("");
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [assigneeInput, setAssigneeInput] = useState("");
  const [assignee, setAssignee] = useState("");

  useEffect(() => {
    const OLD_PROJECT_ID = "github-group";
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
        files: data.files || [],
        miroUrl: data.miroUrl || "",
        requirement: data.requirement || "",
        solution: data.solution || "",
      });
    }
    
    // メモを読み込む
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
      };
      saveProject({ ...project, tasks: [...project.tasks, newTask] });
    }

    setShowTaskForm(false);
    setEditingTask(null);
    setTaskText("");
    setTaskDescription("");
    setTaskStartDate("");
    setTaskDeadline("");
  };

  const editTask = (task: ProjectTask) => {
    setEditingTask(task);
    setTaskText(task.text);
    setTaskDescription(task.description || "");
    setTaskStartDate(task.startDate);
    setTaskDeadline(task.deadline);
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    return deadlineDate.getTime() === today.getTime();
  };

  const saveMemo = () => {
    localStorage.setItem(`project_${PROJECT_ID}_${COMPANY_NAME}_memo`, memo);
  };

  // NRIデータiテックのタスクのみフィルター
  const companyTasks = project.tasks.filter((task) => task.company === COMPANY_NAME);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard/projects/github-group"
            className="text-indigo-600 hover:text-indigo-700 text-sm mb-2 inline-block"
          >
            ← GitHubグループ会社に戻る
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">{COMPANY_NAME}</h1>
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
          <p className="text-gray-600 mt-1">GitHubグループ会社案件管理</p>
        </div>

        {/* タスクセクション */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">タスク管理</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded-lg transition-colors text-sm ${
                  viewMode === "list"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                リスト表示
              </button>
              <button
                onClick={() => setViewMode("wbs")}
                className={`px-3 py-1 rounded-lg transition-colors text-sm ${
                  viewMode === "wbs"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                WBS表示
              </button>
              <button
                onClick={() => {
                  setShowTaskForm(!showTaskForm);
                  setEditingTask(null);
                  setTaskText("");
                  setTaskStartDate("");
                  setTaskDeadline("");
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
                placeholder="タスクタイトル"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="詳細説明（任意）"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows={3}
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
                    setTaskStartDate("");
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
          {companyTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              タスクがまだ登録されていません
            </p>
          ) : viewMode === "list" ? (
            <div className="space-y-2">
              {companyTasks
                .sort((a, b) => a.deadline.localeCompare(b.deadline))
                .map((task) => {
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
                            <p className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-xs px-2 py-0.5 rounded ${
                                overdueFlag
                                  ? "bg-red-200 text-red-800 font-bold"
                                  : todayFlag
                                  ? "bg-orange-200 text-orange-800 font-bold"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {overdueFlag && "⚠️ "}
                              {todayFlag && "📅 "}
                              期限: {task.deadline}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editTask(task)}
                            className="text-indigo-600 hover:text-indigo-700 text-xs"
                          >
                            編集
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-600 hover:text-red-700 text-xs"
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
            <div className="border rounded-lg">
              <div className="overflow-x-auto max-w-[784px]">
                <div className="inline-block min-w-full">
                  {(() => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const allDates = companyTasks
                      .filter((t) => t.startDate || t.deadline)
                      .flatMap((t) =>
                        [
                          t.startDate ? new Date(t.startDate).getTime() : null,
                          t.deadline ? new Date(t.deadline).getTime() : null,
                        ].filter((d) => d !== null) as number[]
                      );

                    let startDate, endDate, dates;
                    if (allDates.length === 0) {
                      startDate = new Date(today);
                      startDate.setDate(startDate.getDate() - 7);
                      endDate = new Date(today);
                      endDate.setDate(endDate.getDate() + 7);
                    } else {
                      const minDate = new Date(Math.min(...allDates));
                      const maxDate = new Date(Math.max(...allDates));
                      minDate.setHours(0, 0, 0, 0);
                      maxDate.setHours(0, 0, 0, 0);
                      startDate = new Date(minDate);
                      startDate.setDate(startDate.getDate() - 7);
                      endDate = new Date(maxDate);
                      endDate.setDate(endDate.getDate() + 7);
                    }

                    dates = [];
                    const currentDate = new Date(startDate);
                    while (currentDate <= endDate) {
                      dates.push(new Date(currentDate));
                      currentDate.setDate(currentDate.getDate() + 1);
                    }

                    return (
                      <>
                        {/* WBS ヘッダー */}
                        <div className="flex bg-gray-50 border-b sticky top-0 z-10">
                          <div className="w-64 flex-shrink-0 p-2 text-xs font-semibold text-gray-600 border-r">
                            タスク
                          </div>
                          <div className="flex gap-1 p-2">
                            {dates.map((date, idx) => {
                              const isToday = date.getTime() === today.getTime();
                              return (
                                <div
                                  key={idx}
                                  className={`text-center w-12 flex-shrink-0 ${
                                    isToday ? "bg-blue-100 rounded" : ""
                                  }`}
                                >
                                  <div
                                    className={`text-xs ${
                                      isToday ? "font-bold text-blue-600" : "text-gray-700"
                                    }`}
                                  >
                                    {date.getMonth() + 1}/{date.getDate()}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {["日", "月", "火", "水", "木", "金", "土"][date.getDay()]}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* WBS タスク */}
                        <div className="divide-y">
                          {companyTasks
                            .sort((a, b) =>
                              (a.startDate || a.deadline || "").localeCompare(
                                b.startDate || b.deadline || ""
                              )
                            )
                            .map((task) => {
                              if (!task.deadline && !task.startDate) return null;
                              const overdueFlag = isOverdue(task.deadline, task.completed);
                              const todayFlag = isToday(task.deadline, task.completed);
                              const taskStartDate = task.startDate
                                ? new Date(task.startDate)
                                : today;
                              taskStartDate.setHours(0, 0, 0, 0);
                              const taskEndDate = task.deadline
                                ? new Date(task.deadline)
                                : taskStartDate;
                              taskEndDate.setHours(0, 0, 0, 0);

                              return (
                                <div
                                  key={task.id}
                                  className={`flex ${
                                    overdueFlag
                                      ? "bg-red-50"
                                      : todayFlag
                                      ? "bg-orange-50"
                                      : task.completed
                                      ? "bg-gray-50 opacity-60"
                                      : "bg-white"
                                  }`}
                                >
                                  <div className="w-64 flex-shrink-0 flex items-center gap-2 p-2 border-r">
                                    <input
                                      type="checkbox"
                                      checked={task.completed}
                                      onChange={() => toggleTask(task.id)}
                                      className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 flex-shrink-0"
                                    />
                                    <span
                                      className={`text-sm break-words ${
                                        task.completed
                                          ? "line-through text-gray-500"
                                          : "text-gray-800"
                                      }`}
                                    >
                                      {task.text}
                                    </span>
                                  </div>
                                  <div className="flex gap-1 p-2 relative">
                                    {dates.map((date, idx) => {
                                      const dateTime = date.getTime();
                                      const isInRange =
                                        dateTime >= taskStartDate.getTime() &&
                                        dateTime <= taskEndDate.getTime();
                                      const isStartDate = dateTime === taskStartDate.getTime();
                                      const isEndDate = dateTime === taskEndDate.getTime();

                                      return (
                                        <div
                                          key={idx}
                                          className="w-12 h-8 flex-shrink-0 flex items-center justify-center relative"
                                        >
                                          {isInRange && (
                                            <div
                                              className={`absolute inset-y-1 ${
                                                isStartDate && isEndDate
                                                  ? "inset-x-1 rounded"
                                                  : isStartDate
                                                  ? "left-1 right-0 rounded-l"
                                                  : isEndDate
                                                  ? "left-0 right-1 rounded-r"
                                                  : "inset-x-0"
                                              } ${
                                                overdueFlag
                                                  ? "bg-red-400"
                                                  : todayFlag
                                                  ? "bg-orange-400"
                                                  : task.completed
                                                  ? "bg-gray-300"
                                                  : "bg-indigo-400"
                                              }`}
                                            />
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 外部リンク */}
        <ExternalLinks storageKey={PROJECT_ID} />

        {/* メモセクション */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">メモ</h2>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            onBlur={saveMemo}
            placeholder="メモを入力..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={6}
          />
        </div>
      </div>
    </div>
  );
}
