"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ExternalLinks from "@/app/dashboard/projects/components/ExternalLinks";
import ProjectMinutes from "@/app/dashboard/projects/components/ProjectMinutes";

type ProjectTask = {
  id: string;
  text: string;
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

const PROJECT_ID = "github-group";
const PROJECT_NAME = "GitHubグループ会社";

export default function GitHubGroupProjectPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-500">読み込み中...</div>}>
      <GitHubGroupProjectContent />
    </Suspense>
  );
}

function GitHubGroupProjectContent() {
  const searchParams = useSearchParams();
  const companyParam = searchParams.get("company");
  
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
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskCompany, setTaskCompany] = useState<string>("NRIネットコム");
  const [editingTask, setEditingTask] = useState<ProjectTask | null>(null);
  const [filterCompany, setFilterCompany] = useState<string>(companyParam || "all");
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [assigneeInput, setAssigneeInput] = useState("");

  // URLパラメータが変更されたときにフィルターを更新
  useEffect(() => {
    if (companyParam) {
      setFilterCompany(companyParam);
    }
  }, [companyParam]);

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
            ? { ...t, text: taskText, startDate: taskStartDate, deadline: taskDeadline, company: taskCompany }
            : t
        ),
      };
      saveProject(updated);
    } else {
      const newTask: ProjectTask = {
        id: Date.now().toString(),
        text: taskText,
        startDate: taskStartDate,
        deadline: taskDeadline,
        completed: false,
        company: taskCompany,
      };
      saveProject({ ...project, tasks: [...project.tasks, newTask] });
    }

    setTaskText("");
    setTaskStartDate("");
    setTaskDeadline("");
    setTaskCompany("NRIネットコム");
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
    setTaskStartDate(task.startDate || "");
    setTaskDeadline(task.deadline);
    setTaskCompany(task.company || "NRIネットコム");
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
                  className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
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

      {/* 議事録 */}
      <ProjectMinutes companyName={PROJECT_NAME} />

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

      {/* タスク */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            やることリスト
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowTaskForm(true);
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
              placeholder="タスク内容"
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
              <label className="block text-xs text-gray-600 mb-1">会社</label>
              <select
                value={taskCompany}
                onChange={(e) => setTaskCompany(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="NRIネットコム">NRIネットコム</option>
                <option value="NRIデジタル">NRIデジタル</option>
              </select>
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
                  setTaskDeadline("");
                }}
                className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}

        {/* 会社フィルター */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilterCompany("all")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterCompany === "all"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => setFilterCompany("NRIネットコム")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterCompany === "NRIネットコム"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            NRIネットコム
          </button>
          <button
            onClick={() => setFilterCompany("NRIデジタル")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterCompany === "NRIデジタル"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            NRIデジタル
          </button>
        </div>

        {/* タスクリスト */}
        {project.tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            タスクがまだ登録されていません
          </p>
        ) : (
          <>
          <div className="space-y-2">
            {project.tasks
              .filter((task) => filterCompany === "all" || task.company === filterCompany)
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
                          className={`text-sm break-words ${
                            task.completed ? "line-through text-gray-500" : "text-gray-800"
                          }`}
                        >
                          {task.text}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {task.company && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded font-medium ${
                                task.company === "NRIネットコム"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {task.company}
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

          {/* WBS ガントチャート（常時表示） */}
          <div className="mt-6">
            <h4 className="text-md font-semibold text-gray-700 mb-3">WBS ガントチャート</h4>
          <div className="border rounded-lg">
            <div className="overflow-x-auto max-w-[784px]">
              <div className="inline-block min-w-full">
            {(() => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              
              const filteredTasks = project.tasks.filter((task) => filterCompany === "all" || task.company === filterCompany);
              
              const allDates = filteredTasks
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
                    {filteredTasks
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
          </div>
          </>
        )}
      </div>
    </div>
  );
}
