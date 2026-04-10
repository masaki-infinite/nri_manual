"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ExternalLinks from "@/app/dashboard/projects/components/ExternalLinks";
import ProjectMinutes from "@/app/dashboard/projects/components/ProjectMinutes";
import TaskDetailModal, { type ProjectTask } from "@/app/dashboard/projects/components/TaskDetailModal";

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
  totalHours?: number;
};

const PROJECT_ID = "subaru";
const PROJECT_NAME = "株式会社スバル";

export default function SubaruProjectPage() {
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
  const [taskParentTheme, setTaskParentTheme] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [editingTask, setEditingTask] = useState<ProjectTask | null>(null);
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [assigneeInput, setAssigneeInput] = useState("");
  const [isEditingHours, setIsEditingHours] = useState(false);
  const [hoursInput, setHoursInput] = useState("");
  const [monthOffset, setMonthOffset] = useState(0);
  const [collapsedThemes, setCollapsedThemes] = useState<Record<string, boolean>>({});

  // 一括インポート
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [bulkImportText, setBulkImportText] = useState("");
  const [bulkImportFormat, setBulkImportFormat] = useState<"csv" | "markdown">("csv");
  const [bulkImportError, setBulkImportError] = useState("");

  // localStorage からプロジェクトデータ読み込み
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
        totalHours: data.totalHours || 0,
      });
      setHoursInput(data.totalHours?.toString() || "");
    }
  }, []);

  // collapsedThemes の初期化: デフォルトで全テーマを折りたたみ / localStorage から復元
  useEffect(() => {
    const storedCollapsed = localStorage.getItem("subaru_collapsedThemes");
    if (storedCollapsed) {
      try {
        setCollapsedThemes(JSON.parse(storedCollapsed));
      } catch {
        const allThemes = Array.from(new Set(project.tasks.map(t => t.parentTheme || "未分類")));
        const collapsed: Record<string, boolean> = {};
        allThemes.forEach(t => { collapsed[t] = true; });
        setCollapsedThemes(collapsed);
      }
    } else {
      const allThemes = Array.from(new Set(project.tasks.map(t => t.parentTheme || "未分類")));
      if (allThemes.length > 0) {
        const collapsed: Record<string, boolean> = {};
        allThemes.forEach(t => { collapsed[t] = true; });
        setCollapsedThemes(collapsed);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.tasks.length]);

  const toggleThemeCollapsed = (theme: string) => {
    setCollapsedThemes(prev => {
      const next = { ...prev, [theme]: !prev[theme] };
      localStorage.setItem("subaru_collapsedThemes", JSON.stringify(next));
      return next;
    });
  };

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

  useEffect(() => {
    setHoursInput(project.totalHours?.toString() || "");
  }, [project.totalHours]);

  const addTask = () => {
    if (!taskText || !taskStartDate || !taskDeadline) return;

    if (editingTask) {
      const updated = {
        ...project,
        tasks: project.tasks.map((t) =>
          t.id === editingTask.id
            ? { ...t, text: taskText, description: taskDescription, startDate: taskStartDate, deadline: taskDeadline, parentTheme: taskParentTheme || undefined }
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
        parentTheme: taskParentTheme || undefined,
      };
      saveProject({ ...project, tasks: [...project.tasks, newTask] });
    }

    setTaskText("");
    setTaskDescription("");
    setTaskParentTheme("");
    setTaskStartDate("");
    setTaskDeadline("");
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
    setTaskParentTheme(task.parentTheme || "");
    setTaskStartDate(task.startDate || "");
    setTaskDeadline(task.deadline);
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

  const updateRequirement = (requirement: string) => {
    saveProject({ ...project, requirement });
  };

  const updateSolution = (solution: string) => {
    saveProject({ ...project, solution });
  };

  const updateTaskFromModal = (updated: ProjectTask) => {
    const newProject = {
      ...project,
      tasks: project.tasks.map((t) => (t.id === updated.id ? updated : t)),
    };
    saveProject(newProject);
    setSelectedTask(null);
  };

  const deleteTaskFromModal = (taskId: string) => {
    const newProject = {
      ...project,
      tasks: project.tasks.filter((t) => t.id !== taskId),
    };
    saveProject(newProject);
    setSelectedTask(null);
  };

  // ファイル関連
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      const newFile: ProjectFile = {
        id: Date.now().toString(),
        name: file.name,
        path: base64,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      };
      saveProject({ ...project, files: [...project.files, newFile] });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
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

  // 一括インポート
  const bulkImportTasks = () => {
    const text = bulkImportText.trim();
    if (!text) {
      setBulkImportError("テキストを入力してください");
      return;
    }

    const newTasks: ProjectTask[] = [];

    try {
      if (bulkImportFormat === "csv") {
        const lines = text.split("\n").map(l => l.trim()).filter(l => l);
        const firstLine = lines[0].toLowerCase();
        const startIdx = (firstLine.includes("タイトル") || firstLine.includes("title")) ? 1 : 0;

        for (let i = startIdx; i < lines.length; i++) {
          const cols = lines[i].split(",").map(c => c.trim());
          if (cols.length < 3) continue;
          const title = cols[0];
          const start = cols[1];
          const end = cols[2];
          if (!title || !start || !end) continue;
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(start) || !dateRegex.test(end)) continue;

          newTasks.push({
            id: (Date.now() + i).toString(),
            text: title,
            startDate: start,
            deadline: end,
            completed: false,
            parentTheme: cols[3] || undefined,
            description: cols[4] || undefined,
            priority: (cols[5] as "high" | "medium" | "low") || undefined,
            taskAssignee: cols[6] || undefined,
          });
        }
      } else {
        // Markdown table
        const lines = text.split("\n").map(l => l.trim()).filter(l => l && !l.match(/^\|[\s\-|]+\|$/));
        const startIdx = lines[0]?.includes("タイトル") ? 1 : 0;

        for (let i = startIdx; i < lines.length; i++) {
          const cols = lines[i].split("|").map(c => c.trim()).filter(c => c);
          if (cols.length < 3) continue;
          const title = cols[0];
          const start = cols[1];
          const end = cols[2];
          if (!title || !start || !end) continue;
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(start) || !dateRegex.test(end)) continue;

          newTasks.push({
            id: (Date.now() + i).toString(),
            text: title,
            startDate: start,
            deadline: end,
            completed: false,
            parentTheme: cols[3] || undefined,
            description: cols[4] || undefined,
            priority: (cols[5] as "high" | "medium" | "low") || undefined,
            taskAssignee: cols[6] || undefined,
          });
        }
      }

      if (newTasks.length === 0) {
        setBulkImportError("有効なタスクが見つかりませんでした。フォーマットを確認してください。");
        return;
      }

      saveProject({ ...project, tasks: [...project.tasks, ...newTasks] });
      setShowBulkImport(false);
      setBulkImportText("");
      setBulkImportError("");
    } catch {
      setBulkImportError("パースエラーが発生しました。フォーマットを確認してください。");
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
        <h2 className="text-3xl font-bold text-gray-800">🏢 {PROJECT_NAME}</h2>
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
        {/* 工数入力 */}
        {!isEditingHours ? (
          <button
            onClick={() => setIsEditingHours(true)}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            {project.totalHours ? `⏱️ 工数: ${project.totalHours}時間` : "+ 工数を設定"}
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={hoursInput}
              onChange={(e) => setHoursInput(e.target.value)}
              placeholder="工数（時間）"
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-32"
              step="0.5"
              min="0"
              autoFocus
            />
            <span className="text-sm text-gray-600">時間</span>
            <button
              onClick={saveHours}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              保存
            </button>
            <button
              onClick={() => {
                setIsEditingHours(false);
                setHoursInput(project.totalHours?.toString() || "");
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
              <p className="text-sm text-red-600">早急に対応が必要です</p>
            </div>
          </div>
        </div>
      )}

      {/* ステータス */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">ステータス</h3>
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

      {/* メモ */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">メモ・現状</h3>
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
            <h4 className="text-sm font-semibold text-gray-700">添付ファイル</h4>
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
                  className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-2xl">{getFileIcon(file.name)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
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

      {/* 議事録 */}
      <ProjectMinutes companyName={PROJECT_NAME} />

      {/* 外部リンク */}
      <ExternalLinks storageKey={PROJECT_ID} />

      {/* Miroボード */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Miroボード</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Miro埋め込みURL</label>
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
            <iframe src={project.miroUrl} className="w-full h-full" allowFullScreen />
          </div>
        )}
      </div>

      {/* タスク */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 min-w-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">やることリスト</h3>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowBulkImport(true);
                setBulkImportError("");
              }}
              className="px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
            >
              📥 一括登録
            </button>
            <button
              onClick={() => {
                setShowTaskForm(true);
                setEditingTask(null);
                setTaskText("");
                setTaskParentTheme("");
                setTaskStartDate("");
                setTaskDeadline("");
              }}
              className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
            >
              ＋ タスク追加
            </button>
          </div>
        </div>

        {/* 一括インポートフォーム */}
        {showBulkImport && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-800">📥 タスク一括登録</h4>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setBulkImportFormat("csv")}
                  className={`px-3 py-1 text-xs transition-colors ${
                    bulkImportFormat === "csv"
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  CSV
                </button>
                <button
                  onClick={() => setBulkImportFormat("markdown")}
                  className={`px-3 py-1 text-xs transition-colors ${
                    bulkImportFormat === "markdown"
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Markdown
                </button>
              </div>
            </div>

            {/* テンプレート */}
            <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-gray-600">📋 テンプレート（コピーして使ってください）</span>
                <button
                  onClick={() => {
                    const csvTpl = "タイトル,開始日,終了日,親テーマ,説明,優先度,担当者\n要件定義書作成,2026-03-10,2026-03-20,体制・プロセス整備,要件を整理してドキュメント化,high,田中\n設計レビュー,2026-03-15,2026-03-25,開発,設計書のレビュー実施,medium,佐藤\nテスト計画策定,2026-03-20,2026-04-05,テスト,,low,";
                    const mdTpl = "| タイトル | 開始日 | 終了日 | 親テーマ | 説明 | 優先度 | 担当者 |\n| --- | --- | --- | --- | --- | --- | --- |\n| 要件定義書作成 | 2026-03-10 | 2026-03-20 | 体制・プロセス整備 | 要件を整理してドキュメント化 | high | 田中 |\n| 設計レビュー | 2026-03-15 | 2026-03-25 | 開発 | 設計書のレビュー実施 | medium | 佐藤 |\n| テスト計画策定 | 2026-03-20 | 2026-04-05 | テスト | | low | |";
                    setBulkImportText(bulkImportFormat === "csv" ? csvTpl : mdTpl);
                  }}
                  className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors"
                >
                  テンプレートを入力欄にコピー
                </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-2">
                ※ <strong>必須列</strong>: タイトル・開始日・終了日　｜　<strong>任意列</strong>: 親テーマ・説明・優先度(high/medium/low)・担当者
              </p>
            </div>

            <textarea
              value={bulkImportText}
              onChange={(e) => { setBulkImportText(e.target.value); setBulkImportError(""); }}
              placeholder={bulkImportFormat === "csv"
                ? "タイトル,開始日,終了日,親テーマ,説明,優先度,担当者\n..."
                : "| タイトル | 開始日 | 終了日 | ... |"}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono text-sm"
              rows={8}
            />

            {bulkImportError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mb-2">
                ⚠️ {bulkImportError}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={bulkImportTasks}
                className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
              >
                📥 インポート実行
              </button>
              <button
                onClick={() => { setShowBulkImport(false); setBulkImportText(""); setBulkImportError(""); }}
                className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

        {/* タスク追加フォーム */}
        {showTaskForm && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="mb-2">
              <label className="block text-xs text-gray-600 mb-1">親テーマ（WBSグループ化用）</label>
              <input
                type="text"
                value={taskParentTheme}
                onChange={(e) => setTaskParentTheme(e.target.value)}
                placeholder="例: 体制・プロセス整備"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                list="parent-theme-list"
              />
              <datalist id="parent-theme-list">
                {Array.from(new Set(project.tasks.map(t => t.parentTheme).filter(Boolean))).map(theme => (
                  <option key={theme} value={theme} />
                ))}
              </datalist>
            </div>
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
              placeholder="詳細を入力してください"
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
                onClick={() => { setShowTaskForm(false); setEditingTask(null); setTaskText(""); setTaskDeadline(""); }}
                className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

        {/* タスクリスト & WBS */}
        {project.tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">タスクがまだ登録されていません</p>
        ) : (
          <>
            {/* WBS ガントチャート（常時表示） */}
            <WbsGanttChart
              tasks={project.tasks}
              monthOffset={monthOffset}
              setMonthOffset={setMonthOffset}
              collapsedThemes={collapsedThemes}
              toggleThemeCollapsed={toggleThemeCollapsed}
              isOverdue={isOverdue}
              isToday={isToday}
              toggleTask={toggleTask}
              onSelectTask={setSelectedTask}
            />

            {/* タスク一覧 */}
            <h4 className="text-md font-semibold text-gray-700 mt-6 mb-3">タスク一覧</h4>
            <div className="space-y-2 min-w-0 max-h-[400px] overflow-y-auto">
              {project.tasks
                .sort((a, b) => a.deadline.localeCompare(b.deadline))
                .map((task) => {
                  const overdueFlag = isOverdue(task.deadline, task.completed);
                  const todayFlag = isToday(task.deadline, task.completed);
                  return (
                    <div
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className={`border rounded-lg p-3 transition-colors cursor-pointer min-w-0 ${
                        overdueFlag
                          ? "border-red-300 bg-red-50 hover:bg-red-100"
                          : todayFlag
                          ? "border-orange-300 bg-orange-50 hover:bg-orange-100"
                          : task.completed
                          ? "border-gray-200 bg-gray-50 opacity-60 hover:opacity-80"
                          : "border-gray-200 bg-white hover:bg-indigo-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={(e) => { e.stopPropagation(); toggleTask(task.id); }}
                          className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium break-words ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                            {task.text}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">{task.startDate} → 期限: {task.deadline}</p>
                          {task.parentTheme && (
                            <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded mt-1 inline-block">
                              {task.parentTheme}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                          <button onClick={() => editTask(task)} className="text-indigo-600 hover:text-indigo-700 text-xs">編集</button>
                          <button onClick={() => deleteTask(task.id)} className="text-red-600 hover:text-red-700 text-xs">削除</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>

      {/* タスク詳細モーダル */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={updateTaskFromModal}
          onDelete={deleteTaskFromModal}
        />
      )}
    </div>
  );
}

// ============================
// WBS ガントチャート コンポーネント
// ============================
type WbsGanttChartProps = {
  tasks: ProjectTask[];
  monthOffset: number;
  setMonthOffset: (v: number) => void;
  collapsedThemes: Record<string, boolean>;
  toggleThemeCollapsed: (theme: string) => void;
  isOverdue: (deadline: string, completed: boolean) => boolean;
  isToday: (deadline: string, completed: boolean) => boolean;
  toggleTask: (taskId: string) => void;
  onSelectTask: (task: ProjectTask) => void;
};

function WbsGanttChart({
  tasks,
  monthOffset,
  setMonthOffset,
  collapsedThemes,
  toggleThemeCollapsed,
  isOverdue,
  isToday,
  toggleTask,
  onSelectTask,
}: WbsGanttChartProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const VISIBLE_MONTHS = 6;

  // 最も古いタスクの日付から最小オフセットを決定
  const allDates = tasks
    .filter(t => t.startDate || t.deadline)
    .flatMap(t => {
      const result: number[] = [];
      if (t.startDate) result.push(new Date(t.startDate).getTime());
      if (t.deadline) result.push(new Date(t.deadline).getTime());
      return result;
    });

  let minMonthOffset = -12;
  if (allDates.length > 0) {
    const minDate = new Date(Math.min(...allDates));
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    minMonthOffset = (minDate.getFullYear() - currentYear) * 12 + (minDate.getMonth() - currentMonth);
  }

  // 表示範囲
  const startDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + VISIBLE_MONTHS, 0);

  // 日ごとの配列
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // 月ヘッダー用データ
  const months: { label: string; span: number }[] = [];
  let prevMonth = "";
  dates.forEach((date) => {
    const monthKey = date.getFullYear() + "/" + (date.getMonth() + 1) + "月";
    if (monthKey !== prevMonth) {
      months.push({ label: monthKey, span: 1 });
      prevMonth = monthKey;
    } else {
      months[months.length - 1].span++;
    }
  });

  // テーマ別グループ化
  const sortedTasks = [...tasks]
    .filter(t => t.deadline || t.startDate)
    .sort((a, b) => (a.startDate || a.deadline || "").localeCompare(b.startDate || b.deadline || ""));

  const themeMap = new Map<string, ProjectTask[]>();
  sortedTasks.forEach(task => {
    const theme = task.parentTheme || "未分類";
    if (!themeMap.has(theme)) themeMap.set(theme, []);
    themeMap.get(theme)!.push(task);
  });

  const themeGroups: { theme: string; tasks: ProjectTask[] }[] = [];
  themeMap.forEach((groupTasks, theme) => {
    if (theme !== "未分類") themeGroups.push({ theme, tasks: groupTasks });
  });
  if (themeMap.has("未分類")) {
    themeGroups.push({ theme: "未分類", tasks: themeMap.get("未分類")! });
  }

  const themeColors = [
    { bg: "bg-purple-50", border: "border-l-purple-500", text: "text-purple-700", dot: "bg-purple-500" },
    { bg: "bg-blue-50", border: "border-l-blue-500", text: "text-blue-700", dot: "bg-blue-500" },
    { bg: "bg-emerald-50", border: "border-l-emerald-500", text: "text-emerald-700", dot: "bg-emerald-500" },
    { bg: "bg-amber-50", border: "border-l-amber-500", text: "text-amber-700", dot: "bg-amber-500" },
    { bg: "bg-rose-50", border: "border-l-rose-500", text: "text-rose-700", dot: "bg-rose-500" },
    { bg: "bg-cyan-50", border: "border-l-cyan-500", text: "text-cyan-700", dot: "bg-cyan-500" },
    { bg: "bg-indigo-50", border: "border-l-indigo-500", text: "text-indigo-700", dot: "bg-indigo-500" },
  ];

  return (
    <div className="border rounded-lg mb-6 min-w-0">
      {/* 表示開始月コントロール（スクロール外） */}
      <div className="flex items-center gap-4 px-2 py-2 border-b">
        <div className="text-sm text-gray-600">表示開始月:</div>
        <div className="text-sm font-semibold">
          {startDate.getFullYear()}/{startDate.getMonth() + 1}月〜
        </div>
        <input
          type="range"
          min={minMonthOffset}
          max={0}
          value={monthOffset}
          onChange={(e) => setMonthOffset(Number(e.target.value))}
          className="w-64"
        />
        <div className="text-xs text-gray-500">過去にスライドして表示できます</div>
      </div>
      <div className="overflow-auto max-h-[70vh]">
        <div className="inline-block min-w-full">
          {/* 月ヘッダー */}
          <div className="flex bg-gray-100 border-b sticky top-0 z-30">
            <div className="w-96 flex-shrink-0 p-2 text-xs font-bold text-gray-700 border-r flex items-center sticky left-0 z-30 bg-gray-100">
              WBSガントチャート
            </div>
            <div className="flex">
              {months.map((month, idx) => (
                <div
                  key={idx}
                  className="text-center text-xs font-semibold text-gray-700 border-r border-gray-300 py-1"
                  style={{ width: month.span * 36 + "px" }}
                >
                  {month.label}
                </div>
              ))}
            </div>
          </div>

          {/* 日付ヘッダー */}
          <div className="flex bg-gray-50 border-b sticky top-[33px] z-30">
            <div className="w-96 flex-shrink-0 border-r sticky left-0 z-30 bg-gray-50">
              <div className="grid grid-cols-[1fr_60px_60px_40px] px-2 py-1 text-xs font-semibold text-gray-500">
                <span>タスク名</span>
                <span className="text-center">開始</span>
                <span className="text-center">終了</span>
                <span className="text-center">状態</span>
              </div>
            </div>
            <div className="flex">
              {dates.map((date, idx) => {
                const isTodayCol = date.getTime() === today.getTime();
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                return (
                  <div
                    key={idx}
                    className={"text-center flex-shrink-0 py-1" + (isTodayCol ? " bg-blue-100" : isWeekend ? " bg-gray-100" : "")}
                    style={{ width: "36px" }}
                  >
                    <div className={"text-[10px] leading-tight" + (isTodayCol ? " font-bold text-blue-600" : " text-gray-600")}>
                      {date.getDate()}
                    </div>
                    <div className={"text-[10px] leading-tight" + (isTodayCol ? " text-blue-500 font-bold" : isWeekend ? " text-red-400" : " text-gray-400")}>
                      {["日", "月", "火", "水", "木", "金", "土"][date.getDay()]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* テーマ別タスク行 */}
          <div>
            {themeGroups.map((group, groupIdx) => {
              const color = group.theme === "未分類"
                ? { bg: "bg-gray-50", border: "border-l-gray-400", text: "text-gray-600", dot: "bg-gray-400" }
                : themeColors[groupIdx % themeColors.length];
              const themeDoneCount = group.tasks.filter(t => t.completed).length;

              return (
                <div key={group.theme}>
                  {/* テーマヘッダー行 */}
                  <div className={"flex border-b border-l-4 " + color.bg + " " + color.border}>
                    <div className={"w-96 flex-shrink-0 border-r px-3 py-2 flex items-center gap-2 sticky left-0 z-20 " + color.bg}>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleThemeCollapsed(group.theme); }}
                        aria-expanded={!collapsedThemes[group.theme]}
                        className="text-xs text-gray-500 hover:text-gray-700 w-5 h-5 flex items-center justify-center"
                      >
                        {collapsedThemes[group.theme] ? "▶" : "▼"}
                      </button>
                      <span className={"w-2.5 h-2.5 rounded-full flex-shrink-0 " + color.dot} />
                      <span className={"text-xs font-bold break-words " + color.text} title={group.theme}>
                        {group.theme}
                      </span>
                      <span className="text-[10px] text-gray-400 ml-auto flex-shrink-0">
                        {themeDoneCount}/{group.tasks.length}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {dates.map((date, idx) => {
                        const isTodayCol = date.getTime() === today.getTime();
                        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                        return (
                          <div
                            key={idx}
                            className={"h-7 flex-shrink-0" + (isTodayCol ? " bg-blue-50" : isWeekend ? " bg-gray-50" : "")}
                            style={{ width: "36px" }}
                          >
                            {isTodayCol && <div className="h-full w-0.5 mx-auto bg-blue-500 opacity-40" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* テーマ配下のタスク行 */}
                  {!collapsedThemes[group.theme] && (
                    <div className="divide-y divide-gray-100">
                      {group.tasks.map((task) => (
                        <WbsTaskRow
                          key={task.id}
                          task={task}
                          dates={dates}
                          today={today}
                          color={color}
                          isOverdue={isOverdue}
                          isToday={isToday}
                          toggleTask={toggleTask}
                          onSelectTask={onSelectTask}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 凡例 */}
          <div className="flex items-center gap-4 px-4 py-2 bg-gray-50 border-t text-[10px] text-gray-500">
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-indigo-300 rounded inline-block" /> 進行中</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-green-400 rounded inline-block" /> 完了</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-red-300 rounded inline-block" /> 期限超過</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-orange-300 rounded inline-block" /> 本日期限</span>
            <span className="flex items-center gap-1"><span className="w-0.5 h-3 bg-blue-500 inline-block" /> 今日</span>
            <span className="ml-auto text-gray-400">※タスクをクリックして詳細を表示</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================
// WBS タスク行 コンポーネント
// ============================
type WbsTaskRowProps = {
  task: ProjectTask;
  dates: Date[];
  today: Date;
  color: { bg: string; border: string; text: string; dot: string };
  isOverdue: (deadline: string, completed: boolean) => boolean;
  isToday: (deadline: string, completed: boolean) => boolean;
  toggleTask: (taskId: string) => void;
  onSelectTask: (task: ProjectTask) => void;
};

function WbsTaskRow({ task, dates, today, color, isOverdue, isToday, toggleTask, onSelectTask }: WbsTaskRowProps) {
  const overdueFlag = isOverdue(task.deadline, task.completed);
  const todayFlag = isToday(task.deadline, task.completed);

  const taskStart = task.startDate ? new Date(task.startDate) : new Date(today);
  taskStart.setHours(0, 0, 0, 0);
  const taskEnd = task.deadline ? new Date(task.deadline) : new Date(taskStart);
  taskEnd.setHours(0, 0, 0, 0);

  const subtaskCount = task.subtasks?.length || 0;
  const subtaskDone = task.subtasks?.filter(s => s.completed).length || 0;
  const taskProgress = subtaskCount > 0 ? Math.round((subtaskDone / subtaskCount) * 100) : (task.progress || 0);

  const totalDays = Math.max(1, Math.ceil((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24)) + 1);
  const progressDays = Math.floor(totalDays * (taskProgress / 100));

  let rowBg = "bg-white hover:bg-indigo-50";
  if (overdueFlag) rowBg = "bg-red-50 hover:bg-red-50";
  else if (todayFlag) rowBg = "bg-orange-50 hover:bg-orange-50";
  else if (task.completed) rowBg = "bg-gray-50 opacity-60 hover:opacity-80";

  let stickyBg = "bg-white";
  if (overdueFlag) stickyBg = "bg-red-50";
  else if (todayFlag) stickyBg = "bg-orange-50";
  else if (task.completed) stickyBg = "bg-gray-50";

  return (
    <div
      onClick={() => onSelectTask(task)}
      className={"flex cursor-pointer group transition-colors border-l-4 " + color.border + " " + rowBg}
    >
      {/* タスク情報 */}
      <div className={"w-96 flex-shrink-0 border-r sticky left-0 z-20 " + stickyBg}>
        <div className="grid grid-cols-[1fr_60px_60px_40px] items-center px-2 py-2 pl-5">
          <div className="flex items-center gap-2 min-w-0">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => { e.stopPropagation(); toggleTask(task.id); }}
              className="w-3.5 h-3.5 text-indigo-600 rounded focus:ring-1 focus:ring-indigo-500 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span
                className={"text-xs block break-words " + (task.completed ? "line-through text-gray-400" : "text-gray-800 font-medium")}
                title={task.text}
              >
                {task.text}
              </span>
              {task.taskAssignee && (
                <span className="text-[10px] text-gray-400 block truncate">
                  👤 {task.taskAssignee}
                </span>
              )}
            </div>
          </div>
          <span className="text-[10px] text-gray-500 text-center">
            {task.startDate ? (new Date(task.startDate).getMonth() + 1) + "/" + new Date(task.startDate).getDate() : "-"}
          </span>
          <span className={"text-[10px] text-center " + (overdueFlag ? "text-red-600 font-bold" : "text-gray-500")}>
            {task.deadline ? (new Date(task.deadline).getMonth() + 1) + "/" + new Date(task.deadline).getDate() : "-"}
          </span>
          <div className="flex justify-center">
            {task.completed ? (
              <span className="text-[10px] text-green-600">✅</span>
            ) : overdueFlag ? (
              <span className="text-[10px] text-red-600">⚠️</span>
            ) : taskProgress > 0 ? (
              <span className="text-[10px] text-blue-600">{taskProgress}%</span>
            ) : (
              <span className="text-[10px] text-gray-400">-</span>
            )}
          </div>
        </div>
      </div>

      {/* ガントチャート部分 */}
      <div className="flex items-center relative">
        {dates.map((date, idx) => {
          const isTodayCol = date.getTime() === today.getTime();
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const isBetween = date >= taskStart && date <= taskEnd;
          const isStart = date.getTime() === taskStart.getTime();
          const isEnd = date.getTime() === taskEnd.getTime();
          const dayIndex = isBetween ? Math.ceil((date.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24)) : -1;
          const isProgressFilled = isBetween && dayIndex < progressDays;

          let cellBg = "";
          if (isTodayCol) cellBg = " bg-blue-50";
          else if (isWeekend) cellBg = " bg-gray-50";

          let barColor = "bg-indigo-200";
          let barFillColor = "bg-indigo-400";
          let barEdgeColor = "bg-indigo-600";
          if (overdueFlag) {
            barColor = "bg-red-200"; barFillColor = "bg-red-400"; barEdgeColor = "bg-red-600";
          } else if (todayFlag) {
            barColor = "bg-orange-200"; barFillColor = "bg-orange-400"; barEdgeColor = "bg-orange-600";
          } else if (task.completed) {
            barColor = "bg-green-200"; barEdgeColor = "bg-green-600";
          }

          const roundClass = isStart && isEnd ? " rounded" : isStart ? " rounded-l" : isEnd ? " rounded-r" : "";

          return (
            <div
              key={idx}
              className={"h-10 relative flex-shrink-0" + cellBg}
              style={{ width: "36px" }}
            >
              {isBetween && (
                <div className="absolute top-2 bottom-2 left-0 right-0">
                  <div className={"absolute inset-0 " + barColor + roundClass} />
                  {isProgressFilled && !task.completed && (
                    <div
                      className={"absolute inset-y-0 left-0 right-0 " + barFillColor + (isStart && !isEnd ? " rounded-l" : isStart && isEnd ? " rounded" : dayIndex === progressDays - 1 ? " rounded-r" : "")}
                    />
                  )}
                  {task.completed && (
                    <div className={"absolute inset-0 bg-green-400" + roundClass} />
                  )}
                  {isStart && (
                    <div className={"absolute left-0 top-0 bottom-0 w-1 rounded-l " + barEdgeColor} />
                  )}
                  {isEnd && (
                    <div className={"absolute right-0 top-0 bottom-0 w-1 rounded-r " + barEdgeColor} />
                  )}
                </div>
              )}
              {isTodayCol && (
                <div className="absolute inset-y-0 left-1/2 w-0.5 bg-blue-500 opacity-60 z-10" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
