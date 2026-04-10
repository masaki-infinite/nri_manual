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

  useEffect(() => {
    const storedCollapsed = localStorage.getItem(`${PROJECT_ID}_collapsedThemes`);
    if (storedCollapsed) {
      try { setCollapsedThemes(JSON.parse(storedCollapsed)); } catch { /* ignore */ }
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
      localStorage.setItem(`${PROJECT_ID}_collapsedThemes`, JSON.stringify(next));
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

  useEffect(() => { setAssigneeInput(project.assignee || ""); }, [project.assignee]);
  useEffect(() => { setHoursInput(project.totalHours?.toString() || ""); }, [project.totalHours]);

  const addTask = () => {
    if (!taskText || !taskStartDate || !taskDeadline) return;
    if (editingTask) {
      saveProject({
        ...project,
        tasks: project.tasks.map((t) =>
          t.id === editingTask.id
            ? { ...t, text: taskText, description: taskDescription, startDate: taskStartDate, deadline: taskDeadline, parentTheme: taskParentTheme || undefined }
            : t
        ),
      });
    } else {
      const newTask: ProjectTask = {
        id: Date.now().toString(), text: taskText, description: taskDescription,
        startDate: taskStartDate, deadline: taskDeadline, completed: false,
        parentTheme: taskParentTheme || undefined,
      };
      saveProject({ ...project, tasks: [...project.tasks, newTask] });
    }
    setTaskText(""); setTaskDescription(""); setTaskParentTheme("");
    setTaskStartDate(""); setTaskDeadline(""); setShowTaskForm(false); setEditingTask(null);
  };

  const toggleTask = (taskId: string) => {
    saveProject({ ...project, tasks: project.tasks.map((t) => t.id === taskId ? { ...t, completed: !t.completed } : t) });
  };

  const deleteTask = (taskId: string) => {
    if (confirm("このタスクを削除しますか？")) {
      saveProject({ ...project, tasks: project.tasks.filter((t) => t.id !== taskId) });
    }
  };

  const editTask = (task: ProjectTask) => {
    setEditingTask(task); setTaskText(task.text); setTaskDescription(task.description || "");
    setTaskParentTheme(task.parentTheme || ""); setTaskStartDate(task.startDate || "");
    setTaskDeadline(task.deadline); setShowTaskForm(true);
  };

  const updateStatus = (status: string) => saveProject({ ...project, status });
  const updateMemo = (memo: string) => saveProject({ ...project, memo });
  const updateMiroUrl = (miroUrl: string) => saveProject({ ...project, miroUrl });
  const updateGoogleSlidesUrl = (url: string) => saveProject({ ...project, googleSlidesUrl: url });
  const updateRequirement = (requirement: string) => saveProject({ ...project, requirement });
  const updateSolution = (solution: string) => saveProject({ ...project, solution });

  const updateTaskFromModal = (updated: ProjectTask) => {
    saveProject({ ...project, tasks: project.tasks.map((t) => (t.id === updated.id ? updated : t)) });
    setSelectedTask(null);
  };
  const deleteTaskFromModal = (taskId: string) => {
    saveProject({ ...project, tasks: project.tasks.filter((t) => t.id !== taskId) });
    setSelectedTask(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      const newFile: ProjectFile = { id: Date.now().toString(), name: file.name, path: base64, type: file.type, uploadedAt: new Date().toISOString() };
      saveProject({ ...project, files: [...project.files, newFile] });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const deleteFile = (fileId: string) => {
    if (confirm("このファイルを削除しますか？")) {
      saveProject({ ...project, files: project.files.filter((f) => f.id !== fileId) });
    }
  };

  const downloadFile = (file: ProjectFile) => {
    const link = document.createElement("a"); link.href = file.path; link.download = file.name; link.click();
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "xlsx": case "xls": return "📊";
      case "pptx": case "ppt": return "📽️";
      case "docx": case "doc": return "📄";
      case "pdf": return "📕";
      default: return "📎";
    }
  };

  const bulkImportTasks = () => {
    const text = bulkImportText.trim();
    if (!text) { setBulkImportError("テキストを入力してください"); return; }
    const newTasks: ProjectTask[] = [];
    try {
      const lines = text.split("\n").map(l => l.trim()).filter(l => l);
      if (bulkImportFormat === "csv") {
        const firstLine = lines[0].toLowerCase();
        const startIdx = (firstLine.includes("タイトル") || firstLine.includes("title")) ? 1 : 0;
        for (let i = startIdx; i < lines.length; i++) {
          const cols = lines[i].split(",").map(c => c.trim());
          if (cols.length < 3) continue;
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!cols[0] || !dateRegex.test(cols[1]) || !dateRegex.test(cols[2])) continue;
          newTasks.push({ id: (Date.now() + i).toString(), text: cols[0], startDate: cols[1], deadline: cols[2], completed: false, parentTheme: cols[3] || undefined, description: cols[4] || undefined, priority: (cols[5] as "high"|"medium"|"low") || undefined, taskAssignee: cols[6] || undefined });
        }
      } else {
        const filtered = lines.filter(l => !l.match(/^\|[\s\-|]+\|$/));
        const startIdx = filtered[0]?.includes("タイトル") ? 1 : 0;
        for (let i = startIdx; i < filtered.length; i++) {
          const cols = filtered[i].split("|").map(c => c.trim()).filter(c => c);
          if (cols.length < 3) continue;
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!cols[0] || !dateRegex.test(cols[1]) || !dateRegex.test(cols[2])) continue;
          newTasks.push({ id: (Date.now() + i).toString(), text: cols[0], startDate: cols[1], deadline: cols[2], completed: false, parentTheme: cols[3] || undefined, description: cols[4] || undefined, priority: (cols[5] as "high"|"medium"|"low") || undefined, taskAssignee: cols[6] || undefined });
        }
      }
      if (newTasks.length === 0) { setBulkImportError("有効なタスクが見つかりませんでした。"); return; }
      saveProject({ ...project, tasks: [...project.tasks, ...newTasks] });
      setShowBulkImport(false); setBulkImportText(""); setBulkImportError("");
    } catch { setBulkImportError("パースエラーが発生しました。"); }
  };

  const isOverdue = (deadline: string, completed: boolean) => {
    if (completed) return false;
    return deadline < new Date().toISOString().split("T")[0];
  };
  const isToday = (deadline: string, completed: boolean) => {
    if (completed) return false;
    return deadline === new Date().toISOString().split("T")[0];
  };

  const overdueTasks = project.tasks.filter((t) => isOverdue(t.deadline, t.completed));

  return (
    <div>
      <div className="mb-4">
        <Link href="/dashboard/projects" className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center gap-1">← 案件リスト一覧に戻る</Link>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">📺 {PROJECT_NAME}</h2>
        {!isEditingAssignee ? (
          <button onClick={() => setIsEditingAssignee(true)} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            {project.assignee ? `担当: ${project.assignee}` : "+ 担当者を設定"}
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <input type="text" value={assigneeInput} onChange={(e) => setAssigneeInput(e.target.value)} placeholder="担当者名" className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" autoFocus />
            <button onClick={saveAssignee} className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">保存</button>
            <button onClick={() => { setIsEditingAssignee(false); setAssigneeInput(project.assignee || ""); }} className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">キャンセル</button>
          </div>
        )}
        {!isEditingHours ? (
          <button onClick={() => setIsEditingHours(true)} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
            {project.totalHours ? `⏱️ 工数: ${project.totalHours}時間` : "+ 工数を設定"}
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <input type="number" value={hoursInput} onChange={(e) => setHoursInput(e.target.value)} placeholder="工数（時間）" className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-32" step="0.5" min="0" autoFocus />
            <span className="text-sm text-gray-600">時間</span>
            <button onClick={saveHours} className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">保存</button>
            <button onClick={() => { setIsEditingHours(false); setHoursInput(project.totalHours?.toString() || ""); }} className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">キャンセル</button>
          </div>
        )}
      </div>

      {overdueTasks.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6 animate-pulse">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <h3 className="text-lg font-semibold text-red-800">期限切れのタスクが{overdueTasks.length}件あります</h3>
              <p className="text-sm text-red-600">早急に対応が必要です</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">ステータス</h3>
        <div className="flex gap-2">
          {["進行中", "保留", "完了"].map((status) => (
            <button key={status} onClick={() => updateStatus(status)} className={`px-4 py-2 rounded-lg transition-colors ${project.status === status ? (status === "進行中" ? "bg-blue-500 text-white" : status === "完了" ? "bg-green-500 text-white" : "bg-gray-500 text-white") : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>{status}</button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">メモ・現状</h3>
        <textarea value={project.memo} onChange={(e) => updateMemo(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" rows={5} placeholder="案件の現状や特記事項を記入してください" />
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-gray-700">添付ファイル</h4>
            <label className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm cursor-pointer">
              ＋ ファイル追加
              <input type="file" onChange={handleFileUpload} className="hidden" accept=".xlsx,.xls,.pptx,.ppt,.docx,.doc,.pdf" />
            </label>
          </div>
          {project.files.length > 0 && (
            <div className="space-y-2">
              {project.files.map((file) => (
                <div key={file.id} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-2xl">{getFileIcon(file.name)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{new Date(file.uploadedAt).toLocaleString("ja-JP")}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <button onClick={() => downloadFile(file)} className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition-colors">ダウンロード</button>
                    <button onClick={() => deleteFile(file.id)} className="text-red-600 hover:text-red-700 text-sm">削除</button>
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

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Miroボード</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Miro埋め込みURL</label>
          <input type="text" value={project.miroUrl || ""} onChange={(e) => updateMiroUrl(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="https://miro.com/app/live-embed/..." />
        </div>
        {project.miroUrl && (
          <div className="border border-gray-300 rounded-lg overflow-hidden" style={{ height: "600px" }}>
            <iframe src={project.miroUrl} className="w-full h-full" allowFullScreen />
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">📊 Googleスライド</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Googleスライド埋め込みURL</label>
          <input type="text" value={project.googleSlidesUrl || ""} onChange={(e) => updateGoogleSlidesUrl(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" placeholder="https://docs.google.com/presentation/d/.../embed?..." />
          <p className="text-xs text-gray-500 mt-1">Googleスライドの「ファイル」→「共有」→「ウェブに公開」で埋め込みリンクを取得してください</p>
        </div>
        {project.googleSlidesUrl && (
          <div className="border border-gray-300 rounded-lg overflow-hidden" style={{ height: "500px" }}>
            <iframe src={project.googleSlidesUrl} className="w-full h-full" allowFullScreen />
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 min-w-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">やることリスト</h3>
          <div className="flex gap-2">
            <button onClick={() => { setShowBulkImport(true); setBulkImportError(""); }} className="px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">📥 一括登録</button>
            <button onClick={() => { setShowTaskForm(true); setEditingTask(null); setTaskText(""); setTaskParentTheme(""); setTaskStartDate(""); setTaskDeadline(""); }} className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">＋ タスク追加</button>
          </div>
        </div>

        {showBulkImport && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-800">📥 タスク一括登録</h4>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button onClick={() => setBulkImportFormat("csv")} className={`px-3 py-1 text-xs transition-colors ${bulkImportFormat === "csv" ? "bg-emerald-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}>CSV</button>
                <button onClick={() => setBulkImportFormat("markdown")} className={`px-3 py-1 text-xs transition-colors ${bulkImportFormat === "markdown" ? "bg-emerald-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}>Markdown</button>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
              <p className="text-[10px] text-gray-500">※ <strong>必須列</strong>: タイトル・開始日・終了日　｜　<strong>任意列</strong>: 親テーマ・説明・優先度(high/medium/low)・担当者</p>
            </div>
            <textarea value={bulkImportText} onChange={(e) => { setBulkImportText(e.target.value); setBulkImportError(""); }} placeholder={bulkImportFormat === "csv" ? "タイトル,開始日,終了日,親テーマ,説明,優先度,担当者\n..." : "| タイトル | 開始日 | 終了日 | ... |"} className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono text-sm" rows={8} />
            {bulkImportError && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 mb-2">⚠️ {bulkImportError}</div>}
            <div className="flex gap-2">
              <button onClick={bulkImportTasks} className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold">📥 インポート実行</button>
              <button onClick={() => { setShowBulkImport(false); setBulkImportText(""); setBulkImportError(""); }} className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">キャンセル</button>
            </div>
          </div>
        )}

        {showTaskForm && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <div className="mb-2">
              <label className="block text-xs text-gray-600 mb-1">親テーマ（WBSグループ化用）</label>
              <input type="text" value={taskParentTheme} onChange={(e) => setTaskParentTheme(e.target.value)} placeholder="例: 体制・プロセス整備" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" list={`parent-theme-list-${PROJECT_ID}`} />
              <datalist id={`parent-theme-list-${PROJECT_ID}`}>
                {Array.from(new Set(project.tasks.map(t => t.parentTheme).filter(Boolean))).map(theme => (<option key={theme} value={theme} />))}
              </datalist>
            </div>
            <input type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} placeholder="タスクタイトル" className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder="詳細を入力してください" className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" rows={3} />
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div><label className="block text-xs text-gray-600 mb-1">開始日</label><input type="date" value={taskStartDate} onChange={(e) => setTaskStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" /></div>
              <div><label className="block text-xs text-gray-600 mb-1">終了日（期限）</label><input type="date" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" /></div>
            </div>
            <div className="flex gap-2">
              <button onClick={addTask} className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">{editingTask ? "更新" : "追加"}</button>
              <button onClick={() => { setShowTaskForm(false); setEditingTask(null); setTaskText(""); setTaskDeadline(""); }} className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">キャンセル</button>
            </div>
          </div>
        )}

        {project.tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">タスクがまだ登録されていません</p>
        ) : (
          <>
            <WbsGanttChart tasks={project.tasks} monthOffset={monthOffset} setMonthOffset={setMonthOffset} collapsedThemes={collapsedThemes} toggleThemeCollapsed={toggleThemeCollapsed} isOverdue={isOverdue} isToday={isToday} toggleTask={toggleTask} onSelectTask={setSelectedTask} />
            <h4 className="text-md font-semibold text-gray-700 mt-6 mb-3">タスク一覧</h4>
            <div className="space-y-2 min-w-0 max-h-[400px] overflow-y-auto">
              {project.tasks.sort((a, b) => a.deadline.localeCompare(b.deadline)).map((task) => {
                const overdueFlag = isOverdue(task.deadline, task.completed);
                const todayFlag = isToday(task.deadline, task.completed);
                return (
                  <div key={task.id} onClick={() => setSelectedTask(task)} className={`border rounded-lg p-3 transition-colors cursor-pointer min-w-0 ${overdueFlag ? "border-red-300 bg-red-50 hover:bg-red-100" : todayFlag ? "border-orange-300 bg-orange-50 hover:bg-orange-100" : task.completed ? "border-gray-200 bg-gray-50 opacity-60 hover:opacity-80" : "border-gray-200 bg-white hover:bg-indigo-50"}`}>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" checked={task.completed} onChange={(e) => { e.stopPropagation(); toggleTask(task.id); }} className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500" />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium break-words ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>{task.text}</p>
                        <p className="text-xs text-gray-600 mt-1">{task.startDate} → 期限: {task.deadline}</p>
                        {task.parentTheme && <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded mt-1 inline-block">{task.parentTheme}</span>}
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

      {selectedTask && (
        <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} onUpdate={updateTaskFromModal} onDelete={deleteTaskFromModal} />
      )}
    </div>
  );
}

// ============================
// WBS ガントチャート
// ============================
type WbsGanttChartProps = {
  tasks: ProjectTask[]; monthOffset: number; setMonthOffset: (v: number) => void;
  collapsedThemes: Record<string, boolean>; toggleThemeCollapsed: (theme: string) => void;
  isOverdue: (deadline: string, completed: boolean) => boolean;
  isToday: (deadline: string, completed: boolean) => boolean;
  toggleTask: (taskId: string) => void; onSelectTask: (task: ProjectTask) => void;
};

function WbsGanttChart({ tasks, monthOffset, setMonthOffset, collapsedThemes, toggleThemeCollapsed, isOverdue, isToday, toggleTask, onSelectTask }: WbsGanttChartProps) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const VISIBLE_MONTHS = 6;
  const allDates = tasks.filter(t => t.startDate || t.deadline).flatMap(t => { const r: number[] = []; if (t.startDate) r.push(new Date(t.startDate).getTime()); if (t.deadline) r.push(new Date(t.deadline).getTime()); return r; });
  let minMonthOffset = -12;
  if (allDates.length > 0) { const m = new Date(Math.min(...allDates)); minMonthOffset = (m.getFullYear() - today.getFullYear()) * 12 + (m.getMonth() - today.getMonth()); }
  const startDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + VISIBLE_MONTHS, 0);
  const dates: Date[] = []; const cd = new Date(startDate); while (cd <= endDate) { dates.push(new Date(cd)); cd.setDate(cd.getDate() + 1); }
  const months: { label: string; span: number }[] = []; let pm = "";
  dates.forEach(d => { const k = d.getFullYear() + "/" + (d.getMonth() + 1) + "月"; if (k !== pm) { months.push({ label: k, span: 1 }); pm = k; } else { months[months.length - 1].span++; } });
  const sorted = [...tasks].filter(t => t.deadline || t.startDate).sort((a, b) => (a.startDate || a.deadline || "").localeCompare(b.startDate || b.deadline || ""));
  const tm = new Map<string, ProjectTask[]>(); sorted.forEach(t => { const th = t.parentTheme || "未分類"; if (!tm.has(th)) tm.set(th, []); tm.get(th)!.push(t); });
  const tg: { theme: string; tasks: ProjectTask[] }[] = []; tm.forEach((ts, th) => { if (th !== "未分類") tg.push({ theme: th, tasks: ts }); }); if (tm.has("未分類")) tg.push({ theme: "未分類", tasks: tm.get("未分類")! });
  const tc = [
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
      <div className="flex items-center gap-4 px-2 py-2 border-b">
        <div className="text-sm text-gray-600">表示開始月:</div>
        <div className="text-sm font-semibold">{startDate.getFullYear()}/{startDate.getMonth() + 1}月〜</div>
        <input type="range" min={minMonthOffset} max={0} value={monthOffset} onChange={(e) => setMonthOffset(Number(e.target.value))} className="w-64" />
        <div className="text-xs text-gray-500">過去にスライドして表示できます</div>
      </div>
      <div className="overflow-auto max-h-[70vh]">
        <div className="inline-block min-w-full">
          <div className="flex bg-gray-100 border-b sticky top-0 z-30">
            <div className="w-96 flex-shrink-0 p-2 text-xs font-bold text-gray-700 border-r flex items-center sticky left-0 z-30 bg-gray-100">WBSガントチャート</div>
            <div className="flex">{months.map((m, i) => (<div key={i} className="text-center text-xs font-semibold text-gray-700 border-r border-gray-300 py-1" style={{ width: m.span * 36 + "px" }}>{m.label}</div>))}</div>
          </div>
          <div className="flex bg-gray-50 border-b sticky top-[33px] z-30">
            <div className="w-96 flex-shrink-0 border-r sticky left-0 z-30 bg-gray-50"><div className="grid grid-cols-[1fr_60px_60px_40px] px-2 py-1 text-xs font-semibold text-gray-500"><span>タスク名</span><span className="text-center">開始</span><span className="text-center">終了</span><span className="text-center">状態</span></div></div>
            <div className="flex">{dates.map((d, i) => { const isTd = d.getTime() === today.getTime(); const isWe = d.getDay() === 0 || d.getDay() === 6; return (<div key={i} className={"text-center flex-shrink-0 py-1" + (isTd ? " bg-blue-100" : isWe ? " bg-gray-100" : "")} style={{ width: "36px" }}><div className={"text-[10px] leading-tight" + (isTd ? " font-bold text-blue-600" : " text-gray-600")}>{d.getDate()}</div><div className={"text-[10px] leading-tight" + (isTd ? " text-blue-500 font-bold" : isWe ? " text-red-400" : " text-gray-400")}>{["日","月","火","水","木","金","土"][d.getDay()]}</div></div>); })}</div>
          </div>
          <div>
            {tg.map((g, gi) => {
              const c = g.theme === "未分類" ? { bg: "bg-gray-50", border: "border-l-gray-400", text: "text-gray-600", dot: "bg-gray-400" } : tc[gi % tc.length];
              const done = g.tasks.filter(t => t.completed).length;
              return (
                <div key={g.theme}>
                  <div className={"flex border-b border-l-4 " + c.bg + " " + c.border}>
                    <div className={"w-96 flex-shrink-0 border-r px-3 py-2 flex items-center gap-2 sticky left-0 z-20 " + c.bg}>
                      <button onClick={(e) => { e.stopPropagation(); toggleThemeCollapsed(g.theme); }} className="text-xs text-gray-500 hover:text-gray-700 w-5 h-5 flex items-center justify-center">{collapsedThemes[g.theme] ? "▶" : "▼"}</button>
                      <span className={"w-2.5 h-2.5 rounded-full flex-shrink-0 " + c.dot} />
                      <span className={"text-xs font-bold break-words " + c.text} title={g.theme}>{g.theme}</span>
                      <span className="text-[10px] text-gray-400 ml-auto flex-shrink-0">{done}/{g.tasks.length}</span>
                    </div>
                    <div className="flex items-center">{dates.map((d, i) => { const isTd = d.getTime() === today.getTime(); const isWe = d.getDay() === 0 || d.getDay() === 6; return (<div key={i} className={"h-7 flex-shrink-0" + (isTd ? " bg-blue-50" : isWe ? " bg-gray-50" : "")} style={{ width: "36px" }}>{isTd && <div className="h-full w-0.5 mx-auto bg-blue-500 opacity-40" />}</div>); })}</div>
                  </div>
                  {!collapsedThemes[g.theme] && (<div className="divide-y divide-gray-100">{g.tasks.map(t => (<WbsTaskRow key={t.id} task={t} dates={dates} today={today} color={c} isOverdue={isOverdue} isToday={isToday} toggleTask={toggleTask} onSelectTask={onSelectTask} />))}</div>)}
                </div>
              );
            })}
          </div>
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

type WbsTaskRowProps = {
  task: ProjectTask; dates: Date[]; today: Date;
  color: { bg: string; border: string; text: string; dot: string };
  isOverdue: (deadline: string, completed: boolean) => boolean;
  isToday: (deadline: string, completed: boolean) => boolean;
  toggleTask: (taskId: string) => void; onSelectTask: (task: ProjectTask) => void;
};

function WbsTaskRow({ task, dates, today, color, isOverdue, isToday, toggleTask, onSelectTask }: WbsTaskRowProps) {
  const overdueFlag = isOverdue(task.deadline, task.completed);
  const todayFlag = isToday(task.deadline, task.completed);
  const ts = task.startDate ? new Date(task.startDate) : new Date(today); ts.setHours(0,0,0,0);
  const te = task.deadline ? new Date(task.deadline) : new Date(ts); te.setHours(0,0,0,0);
  const sc = task.subtasks?.length || 0; const sd = task.subtasks?.filter(s => s.completed).length || 0;
  const tp = sc > 0 ? Math.round((sd / sc) * 100) : (task.progress || 0);
  const td = Math.max(1, Math.ceil((te.getTime() - ts.getTime()) / (1000*60*60*24)) + 1);
  const pd = Math.floor(td * (tp / 100));
  let rb = "bg-white hover:bg-indigo-50";
  if (overdueFlag) rb = "bg-red-50 hover:bg-red-50"; else if (todayFlag) rb = "bg-orange-50 hover:bg-orange-50"; else if (task.completed) rb = "bg-gray-50 opacity-60 hover:opacity-80";
  let sb = "bg-white";
  if (overdueFlag) sb = "bg-red-50"; else if (todayFlag) sb = "bg-orange-50"; else if (task.completed) sb = "bg-gray-50";

  return (
    <div onClick={() => onSelectTask(task)} className={"flex cursor-pointer group transition-colors border-l-4 " + color.border + " " + rb}>
      <div className={"w-96 flex-shrink-0 border-r sticky left-0 z-20 " + sb}>
        <div className="grid grid-cols-[1fr_60px_60px_40px] items-center px-2 py-2 pl-5">
          <div className="flex items-center gap-2 min-w-0">
            <input type="checkbox" checked={task.completed} onChange={(e) => { e.stopPropagation(); toggleTask(task.id); }} className="w-3.5 h-3.5 text-indigo-600 rounded focus:ring-1 focus:ring-indigo-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <span className={"text-xs block break-words " + (task.completed ? "line-through text-gray-400" : "text-gray-800 font-medium")} title={task.text}>{task.text}</span>
              {task.taskAssignee && <span className="text-[10px] text-gray-400 block truncate">👤 {task.taskAssignee}</span>}
            </div>
          </div>
          <span className="text-[10px] text-gray-500 text-center">{task.startDate ? (new Date(task.startDate).getMonth()+1)+"/"+new Date(task.startDate).getDate() : "-"}</span>
          <span className={"text-[10px] text-center " + (overdueFlag ? "text-red-600 font-bold" : "text-gray-500")}>{task.deadline ? (new Date(task.deadline).getMonth()+1)+"/"+new Date(task.deadline).getDate() : "-"}</span>
          <div className="flex justify-center">{task.completed ? <span className="text-[10px] text-green-600">✅</span> : overdueFlag ? <span className="text-[10px] text-red-600">⚠️</span> : tp > 0 ? <span className="text-[10px] text-blue-600">{tp}%</span> : <span className="text-[10px] text-gray-400">-</span>}</div>
        </div>
      </div>
      <div className="flex items-center relative">
        {dates.map((d, i) => {
          const isTd = d.getTime() === today.getTime(); const isWe = d.getDay() === 0 || d.getDay() === 6;
          const isBt = d >= ts && d <= te; const isSt = d.getTime() === ts.getTime(); const isEn = d.getTime() === te.getTime();
          const di = isBt ? Math.ceil((d.getTime() - ts.getTime()) / (1000*60*60*24)) : -1;
          const isPf = isBt && di < pd;
          let cb = ""; if (isTd) cb = " bg-blue-50"; else if (isWe) cb = " bg-gray-50";
          let bc = "bg-indigo-200", bf = "bg-indigo-400", be = "bg-indigo-600";
          if (overdueFlag) { bc = "bg-red-200"; bf = "bg-red-400"; be = "bg-red-600"; } else if (todayFlag) { bc = "bg-orange-200"; bf = "bg-orange-400"; be = "bg-orange-600"; } else if (task.completed) { bc = "bg-green-200"; be = "bg-green-600"; }
          const rc = isSt && isEn ? " rounded" : isSt ? " rounded-l" : isEn ? " rounded-r" : "";
          return (
            <div key={i} className={"h-10 relative flex-shrink-0" + cb} style={{ width: "36px" }}>
              {isBt && (<div className="absolute top-2 bottom-2 left-0 right-0"><div className={"absolute inset-0 " + bc + rc} />{isPf && !task.completed && <div className={"absolute inset-y-0 left-0 right-0 " + bf + (isSt && !isEn ? " rounded-l" : isSt && isEn ? " rounded" : di === pd - 1 ? " rounded-r" : "")} />}{task.completed && <div className={"absolute inset-0 bg-green-400" + rc} />}{isSt && <div className={"absolute left-0 top-0 bottom-0 w-1 rounded-l " + be} />}{isEn && <div className={"absolute right-0 top-0 bottom-0 w-1 rounded-r " + be} />}</div>)}
              {isTd && <div className="absolute inset-y-0 left-1/2 w-0.5 bg-blue-500 opacity-60 z-10" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
