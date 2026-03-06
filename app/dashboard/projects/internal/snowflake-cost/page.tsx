"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ExternalLinks from "@/app/dashboard/projects/components/ExternalLinks";

type ProjectTask = {
  id: string;
  text: string;
  description?: string;
  startDate: string;
  deadline: string;
  completed: boolean;
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

const PROJECT_ID = "internal-snowflake-cost";
const PROJECT_NAME = "Snowflakeコスト算出";

export default function SnowflakeCostProjectPage() {
  const [project, setProject] = useState<ProjectData>({
    id: PROJECT_ID,
    name: PROJECT_NAME,
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
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [assigneeInput, setAssigneeInput] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(`project_${PROJECT_ID}`);
    if (stored) {
      const data = JSON.parse(stored);
      setProject({
        ...data,
        files: data.files || [],
        miroUrl: data.miroUrl || "",
        requirement: data.requirement || "",
        solution: data.solution || "",
        assignee: data.assignee || "",
      });
    }
  }, []);

  const saveProject = (data: ProjectData) => {
    localStorage.setItem(`project_${PROJECT_ID}`, JSON.stringify(data));
    setProject(data);
  };

  const saveAssignee = () => {
    saveProject({ ...project, assignee: assigneeInput });
    setIsEditingAssignee(false);
  };

  useEffect(() => {
    setAssigneeInput(project.assignee || "");
  }, [project.assignee]);

  const addTask = () => {
    if (!taskText || !taskStartDate || !taskDeadline) return;

    if (editingTask) {
      const updated = {
        ...project,
        tasks: project.tasks.map((t) =>
          t.id === editingTask.id
            ? { ...t, text: taskText, description: taskDescription, startDate: taskStartDate, deadline: taskDeadline }
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
      };
      saveProject({ ...project, tasks: [...project.tasks, newTask] });
    }

    setTaskText("");
    setTaskDescription("");
    setTaskStartDate("");
    setTaskDeadline("");
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const editTask = (task: ProjectTask) => {
    setTaskText(task.text);
    setTaskDescription(task.description || "");
    setTaskStartDate(task.startDate);
    setTaskDeadline(task.deadline);
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const deleteTask = (id: string) => {
    if (!confirm("タスクを削除しますか？")) return;
    saveProject({
      ...project,
      tasks: project.tasks.filter((t) => t.id !== id),
    });
  };

  const toggleTask = (id: string) => {
    saveProject({
      ...project,
      tasks: project.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    });
  };

  const updateMemo = (memo: string) => {
    saveProject({ ...project, memo });
  };

  const updateMiroUrl = (url: string) => {
    saveProject({ ...project, miroUrl: url });
  };

  const updateRequirement = (requirement: string) => {
    saveProject({ ...project, requirement });
  };

  const updateSolution = (solution: string) => {
    saveProject({ ...project, solution });
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

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/projects"
          className="text-indigo-600 hover:text-indigo-700 text-sm mb-4 inline-block"
        >
          ← 案件リスト
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-800">{PROJECT_NAME}</h1>
          {!isEditingAssignee ? (
            <button
              onClick={() => setIsEditingAssignee(true)}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {project.assignee ? `担当: ${project.assignee}` : "+ 担当者を設定"}
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
                  setAssigneeInput(project.assignee || "");
                }}
                className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                キャンセル
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <select
            value={project.status}
            onChange={(e) => saveProject({ ...project, status: e.target.value })}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="提案中">提案中</option>
            <option value="進行中">進行中</option>
            <option value="完了">完了</option>
            <option value="保留">保留</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">要件</h2>
          <textarea
            value={project.requirement || ""}
            onChange={(e) => updateRequirement(e.target.value)}
            placeholder="プロジェクトの要件を記入..."
            className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">ソリューション</h2>
          <textarea
            value={project.solution || ""}
            onChange={(e) => updateSolution(e.target.value)}
            placeholder="提案するソリューションを記入..."
            className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>
      </div>

      {/* 外部リンク */}
      <ExternalLinks storageKey={PROJECT_ID} />

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Miro ボード</h2>
        <input
          type="url"
          value={project.miroUrl || ""}
          onChange={(e) => updateMiroUrl(e.target.value)}
          placeholder="Miro ボードのURLを入力..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 mb-4"
        />
        {project.miroUrl && (
          <div className="border rounded-lg overflow-hidden" style={{ height: "600px" }}>
            <iframe
              src={project.miroUrl}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">タスク</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              リスト表示
            </button>
            <button
              onClick={() => setViewMode("wbs")}
              className={`px-4 py-2 rounded-lg transition-colors ${
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
                if (showTaskForm) {
                  setTaskText("");
                  setTaskStartDate("");
                  setTaskDeadline("");
                  setEditingTask(null);
                }
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {showTaskForm ? "キャンセル" : "+ タスク追加"}
            </button>
          </div>
        </div>

        {showTaskForm && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="タスクタイトル"
              className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="詳細を入力してください"
              className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">開始日</label>
                <input
                  type="date"
                  value={taskStartDate}
                  onChange={(e) => setTaskStartDate(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">期限</label>
                <input
                  type="date"
                  value={taskDeadline}
                  onChange={(e) => setTaskDeadline(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <button
              onClick={addTask}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {editingTask ? "更新" : "追加"}
            </button>
          </div>
        )}

        {viewMode === "list" ? (
          <div className="space-y-2">
            {project.tasks
              .sort((a, b) => (a.startDate || a.deadline || '').localeCompare(b.startDate || b.deadline || ''))
              .map((task) => {
                const overdueFlag = isOverdue(task.deadline, task.completed);
                const todayFlag = isToday(task.deadline, task.completed);

                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      overdueFlag
                        ? "bg-red-50 border-red-200"
                        : todayFlag
                        ? "bg-orange-50 border-orange-200"
                        : task.completed
                        ? "bg-gray-50 border-gray-200 opacity-60"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="mt-1 w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                        />
                        <div className="flex-1">
                          <span
                            className={`text-base font-medium ${
                              task.completed
                                ? "line-through text-gray-500"
                                : "text-gray-800"
                            }`}
                          >
                            {task.text}
                          </span>
                          {task.description && (
                            <p className="text-xs text-gray-600 mt-1 whitespace-pre-wrap">
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-2">
                            {task.startDate && (
                              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                                開始: {task.startDate}
                              </span>
                            )}
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
              
              const allDates = project.tasks
                .filter(t => t.startDate || t.deadline)
                .flatMap(t => [
                  t.startDate ? new Date(t.startDate).getTime() : null,
                  t.deadline ? new Date(t.deadline).getTime() : null
                ].filter(d => d !== null) as number[]);
              
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
                          <div key={idx} className={`text-center w-12 flex-shrink-0 ${isToday ? 'bg-blue-100 rounded' : ''}`}>
                            <div className={`text-xs ${isToday ? 'font-bold text-blue-600' : 'text-gray-700'}`}>
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
                    {project.tasks
                      .sort((a, b) => (a.startDate || a.deadline || '').localeCompare(b.startDate || b.deadline || ''))
                      .map((task) => {
                        if (!task.deadline && !task.startDate) return null;
                        const overdueFlag = isOverdue(task.deadline, task.completed);
                        const todayFlag = isToday(task.deadline, task.completed);
                        const taskStartDate = task.startDate ? new Date(task.startDate) : today;
                        taskStartDate.setHours(0, 0, 0, 0);
                        const taskEndDate = task.deadline ? new Date(task.deadline) : taskStartDate;
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
                                  task.completed ? "line-through text-gray-500" : "text-gray-800"
                                }`}
                              >
                                {task.text}
                              </span>
                            </div>
                            <div className="flex gap-1 p-2 items-center">
                              {dates.map((date, idx) => {
                                  const isToday = date.getTime() === today.getTime();
                                  const isStart = date.getTime() === taskStartDate.getTime();
                                  const isEnd = date.getTime() === taskEndDate.getTime();
                                  const isBetween = date >= taskStartDate && date <= taskEndDate;
                                  const showBar = isBetween;
                                  
                                  return (
                                    <div key={idx} className="h-8 w-12 relative flex-shrink-0">
                                      {showBar && (
                                        <div
                                          className={`absolute inset-0 rounded ${
                                            overdueFlag
                                              ? "bg-red-300"
                                              : todayFlag
                                              ? "bg-orange-300"
                                              : task.completed
                                              ? "bg-gray-300"
                                              : "bg-indigo-300"
                                          } ${(isStart || isEnd) ? 'border-2 ' + (overdueFlag ? 'border-red-600' : todayFlag ? 'border-orange-600' : task.completed ? 'border-gray-600' : 'border-indigo-600') : ''}`}
                                          title={`${isStart ? `開始: ${task.startDate}` : isEnd ? `期限: ${task.deadline}` : ''}`}
                                        />
                                      )}
                                      {isToday && (
                                        <div className="absolute inset-y-0 left-1/2 w-0.5 bg-blue-500 opacity-70 z-10" />
                                      )}
                                    </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })
                      .filter(Boolean)}
                  </div>
                </>
              );
            })()}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">メモ</h2>
        <textarea
          value={project.memo}
          onChange={(e) => updateMemo(e.target.value)}
          placeholder="プロジェクトに関するメモを記入..."
          className="w-full h-40 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>
    </div>
  );
}
