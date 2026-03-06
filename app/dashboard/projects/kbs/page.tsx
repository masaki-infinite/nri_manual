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
  hours?: number;
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
  googleSlidesUrl?: string;
  requirement?: string;
  solution?: string;
  assignee?: string;
  totalHours?: number;
};

const PROJECT_ID = "kbs";
const PROJECT_NAME = "株式会社KBS";

export default function KBSProjectPage() {
  const [project, setProject] = useState<ProjectData>({
    id: PROJECT_ID,
    name: PROJECT_NAME,
    status: "進行中",
    tasks: [],
    memo: "",
    files: [],
    miroUrl: "",
    googleSlidesUrl: "",
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
  const [taskHours, setTaskHours] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "wbs">("list");
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [assigneeInput, setAssigneeInput] = useState("");
  const [isEditingHours, setIsEditingHours] = useState(false);
  const [hoursInput, setHoursInput] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(`project_${PROJECT_ID}`);
    if (stored) {
      const data = JSON.parse(stored);
      setProject({
        ...data,
        files: data.files || [],
        miroUrl: data.miroUrl || "",
        googleSlidesUrl: data.googleSlidesUrl || "",
        requirement: data.requirement || "",
        solution: data.solution || "",
        assignee: data.assignee || "",
        totalHours: data.totalHours || 0,
      });
      setHoursInput(String(data.totalHours || 0));
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

  const saveHours = () => {
    const hours = parseFloat(hoursInput) || 0;
    saveProject({ ...project, totalHours: hours });
    setIsEditingHours(false);
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
            ? { ...t, text: taskText, description: taskDescription, startDate: taskStartDate, deadline: taskDeadline, hours: taskHours ? parseFloat(taskHours) : 0 }
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

  const toggleTask = (taskId: string) => {
    const updated = {
      ...project,
      tasks: project.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ),
    };
    saveProject(updated);
  };

  const deleteTask = (taskId: string) => {
    if (confirm("このタスクを削除しますか？")) {
      const updated = {
        ...project,
        tasks: project.tasks.filter((t) => t.id !== taskId),
      };
      saveProject(updated);
    }
  };

  const editTask = (task: ProjectTask) => {
    setEditingTask(task);
    setTaskText(task.text);
    setTaskDescription(task.description || "");
    setTaskStartDate(task.startDate || "");
    setTaskDeadline(task.deadline);
    setTaskHours(task.hours ? String(task.hours) : "");
    setShowTaskForm(true);
  };

  const updateStatus = (status: string) => {
    saveProject({ ...project, status });
  };

  const updateMemo = (memo: string) => {
    saveProject({ ...project, memo });
  };

  const updateMiroUrl = (miroUrl: string) => {
    saveProject({ ...project, miroUrl });
  };

  const updateGoogleSlidesUrl = (googleSlidesUrl: string) => {
    saveProject({ ...project, googleSlidesUrl });
  };

  const updateRequirement = (requirement: string) => {
    saveProject({ ...project, requirement });
  };

  const updateSolution = (solution: string) => {
    saveProject({ ...project, solution });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newFile: ProjectFile = {
      id: Date.now().toString(),
      name: file.name,
      path: URL.createObjectURL(file),
      type: file.type,
      uploadedAt: new Date().toISOString(),
    };

    saveProject({ ...project, files: [...project.files, newFile] });
  };

  const deleteFile = (fileId: string) => {
    if (confirm("このファイルを削除しますか？")) {
      saveProject({
        ...project,
        files: project.files.filter((f) => f.id !== fileId),
      });
    }
  };

  const downloadFile = (file: ProjectFile) => {
    const link = document.createElement("a");
    link.href = file.path;
    link.download = file.name;
    link.click();
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "xlsx":
      case "xls":
        return "📊";
      case "pptx":
      case "ppt":
        return "📽️";
      case "docx":
      case "doc":
        return "📄";
      case "pdf":
        return "📕";
      default:
        return "📎";
    }
  };

  const isOverdue = (deadline: string, completed: boolean) => {
    if (completed) return false;
    const today = new Date().toISOString().split("T")[0];
    return deadline < today;
  };

  const isToday = (deadline: string, completed: boolean) => {
    if (completed) return false;
    const today = new Date().toISOString().split("T")[0];
    return deadline === today;
  };

  const overdueTasks = project.tasks.filter((t) => isOverdue(t.deadline, t.completed));

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/dashboard/projects"
          className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center gap-1"
        >
          ← 案件リスト一覧に戻る
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">📺 {PROJECT_NAME}</h2>
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
        {!isEditingHours ? (
          <button
            onClick={() => setIsEditingHours(true)}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {project.totalHours ? `工数: ${project.totalHours}h` : "+ 工数を設定"}
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.5"
              min="0"
              value={hoursInput}
              onChange={(e) => setHoursInput(e.target.value)}
              placeholder="工数（時間）"
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-24"
              autoFocus
            />
            <button
              onClick={saveHours}
              className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              保存
            </button>
            <button
              onClick={() => {
                setIsEditingHours(false);
                setHoursInput(String(project.totalHours || 0));
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
              onClick={() => updateStatus(status)}
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

      {/* 要件と実現方法 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              要件
            </h3>
            <textarea
              value={project.requirement || ""}
              onChange={(e) => updateRequirement(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={5}
              placeholder="案件の要件を記入してください"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              実現方法
            </h3>
            <textarea
              value={project.solution || ""}
              onChange={(e) => updateSolution(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={5}
              placeholder="実現方法を記入してください"
            />
          </div>
        </div>
      </div>

      {/* メモ */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          メモ・現状
        </h3>
        <textarea
          value={project.memo}
          onChange={(e) => updateMemo(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows={5}
          placeholder="案件の現状や特記事項を記入してください"
        />

        {/* ファイル添付 */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-700">
              添付ファイル
            </h4>
            <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm cursor-pointer">
              ＋ ファイル追加
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".xlsx,.xls,.pptx,.ppt,.docx,.doc,.pdf"
              />
            </label>
          </div>

          {project.files.length > 0 && (
            <div className="space-y-2">
              {project.files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-2xl">{getFileIcon(file.name)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(file.uploadedAt).toLocaleString("ja-JP")}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => downloadFile(file)}
                      className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors"
                    >
                      ダウンロード
                    </button>
                    <button
                      onClick={() => deleteFile(file.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 外部リンク */}
      <ExternalLinks storageKey={PROJECT_ID} />

      {/* Miroボード */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Miroボード
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Miro埋め込みURL
          </label>
          <input
            type="text"
            value={project.miroUrl || ""}
            onChange={(e) => updateMiroUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="https://miro.com/app/live-embed/..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Miroボードの「Share」→「Get embed code」からURLを取得してください
          </p>
        </div>
        {project.miroUrl && (
          <div className="border border-gray-300 rounded-lg overflow-hidden" style={{ height: "600px" }}>
            <iframe
              src={project.miroUrl}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )}
      </div>

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
            onChange={(e) => updateGoogleSlidesUrl(e.target.value)}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-2"
                placeholder="例: 1.5"
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
        {project.tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            タスクがまだ登録されていません
          </p>
        ) : viewMode === "list" ? (
          <div className="space-y-2">
            {project.tasks
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
                          <span className="text-xs text-gray-600 ml-2 flex items-center gap-1">
                            工数:
                            <input
                              type="number"
                              step="0.5"
                              min="0"
                              value={task.hours || 0}
                              onChange={(e) => {
                                const newHours = parseFloat(e.target.value) || 0;
                                saveProject({
                                  ...project,
                                  tasks: project.tasks.map((t) =>
                                    t.id === task.id ? { ...t, hours: newHours } : t
                                  ),
                                });
                              }}
                              className="w-16 px-1 py-0.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
                            />
                            h
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
                    工数
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {project.tasks
                  .sort((a, b) => a.deadline.localeCompare(b.deadline))
                  .map((task) => {
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
                        <td className="px-3 py-2 text-sm text-gray-600">{task.hours || 0}h</td>
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
