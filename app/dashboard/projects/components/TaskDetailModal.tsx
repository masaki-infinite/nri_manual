"use client";

import { useState, useEffect, useRef } from "react";

// サブタスク型
export type SubTask = {
  id: string;
  text: string;
  completed: boolean;
};

// コメント型
export type TaskComment = {
  id: string;
  text: string;
  createdAt: string;
};

// 拡張タスク型
export type ProjectTask = {
  id: string;
  text: string;
  description?: string;
  startDate: string;
  deadline: string;
  completed: boolean;
  priority?: "high" | "medium" | "low";
  tags?: string[];
  subtasks?: SubTask[];
  comments?: TaskComment[];
  progress?: number;
  taskAssignee?: string;
  content?: string; // Notion風のリッチコンテンツ
  parentTheme?: string; // 親テーマ（WBSグループ化用）
  images?: string[]; // 画像 URL リスト
  miroUrl?: string; // Miro ボード URL
};

type TaskDetailModalProps = {
  task: ProjectTask;
  onClose: () => void;
  onUpdate: (task: ProjectTask) => void;
  onDelete: (taskId: string) => void;
};

export default function TaskDetailModal({
  task,
  onClose,
  onUpdate,
  onDelete,
}: TaskDetailModalProps) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(task.text);
  // content（旧ノート）があれば description に統合
  const mergedDescription = (() => {
    const desc = task.description || "";
    const cont = task.content || "";
    if (cont && !desc.includes(cont)) {
      return desc ? `${desc}\n\n${cont}` : cont;
    }
    return desc;
  })();
  const [description, setDescription] = useState(mergedDescription);
  const [parentTheme, setParentTheme] = useState(task.parentTheme || "");
  const [editingParentTheme, setEditingParentTheme] = useState(false);
  const [priority, setPriority] = useState<"high" | "medium" | "low">(
    task.priority || "medium"
  );
  const [tags, setTags] = useState<string[]>(task.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [subtasks, setSubtasks] = useState<SubTask[]>(task.subtasks || []);
  const [newSubtaskText, setNewSubtaskText] = useState("");
  const [comments, setComments] = useState<TaskComment[]>(task.comments || []);
  const [newCommentText, setNewCommentText] = useState("");
  const [progress, setProgress] = useState(task.progress || 0);
  const [taskAssignee, setTaskAssignee] = useState(task.taskAssignee || "");
  const [editingAssignee, setEditingAssignee] = useState(false);
  const [startDate, setStartDate] = useState(task.startDate);
  const [deadline, setDeadline] = useState(task.deadline);
  const [images, setImages] = useState<string[]>(task.images || []);
  const [miroUrl, setMiroUrl] = useState(task.miroUrl || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "unsaved" | "saving">("saved");
  const titleRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // タイトル編集時にフォーカス
  useEffect(() => {
    if (editingTitle && titleRef.current) {
      titleRef.current.focus();
    }
  }, [editingTitle]);

  // 背景クリックで閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // 変更検知（未保存マーク）
  useEffect(() => {
    setSaveStatus("unsaved");
  }, [
    titleInput,
    description,
    priority,
    tags,
    subtasks,
    comments,
    progress,
    taskAssignee,
    startDate,
    deadline,
    parentTheme,
    images,
    miroUrl,
  ]);

  // 手動保存
  const handleSave = () => {
    setSaveStatus("saving");
    onUpdate({
      ...task,
      text: titleInput,
      description,
      content: "",
      priority,
      tags,
      subtasks,
      comments,
      progress,
      taskAssignee,
      startDate,
      deadline,
      parentTheme,
      images,
      miroUrl,
    });
    setTimeout(() => setSaveStatus("saved"), 300);
  };

  // サブタスク追加
  const addSubtask = () => {
    if (!newSubtaskText.trim()) return;
    const newSubtask: SubTask = {
      id: Date.now().toString(),
      text: newSubtaskText.trim(),
      completed: false,
    };
    setSubtasks([...subtasks, newSubtask]);
    setNewSubtaskText("");
  };

  // サブタスク完了トグル
  const toggleSubtask = (id: string) => {
    setSubtasks(
      subtasks.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );
  };

  // サブタスク削除
  const deleteSubtask = (id: string) => {
    setSubtasks(subtasks.filter((s) => s.id !== id));
  };

  // コメント追加
  const addComment = () => {
    if (!newCommentText.trim()) return;
    const newComment: TaskComment = {
      id: Date.now().toString(),
      text: newCommentText.trim(),
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
    setNewCommentText("");
  };

  // コメント削除
  const deleteComment = (id: string) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  // タグ追加
  const addTag = () => {
    if (!tagInput.trim() || tags.includes(tagInput.trim())) return;
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  // タグ削除
  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // 進捗の計算（サブタスクベース）
  const subtaskProgress =
    subtasks.length > 0
      ? Math.round(
          (subtasks.filter((s) => s.completed).length / subtasks.length) * 100
        )
      : progress;

  // 期限状態
  const isOverdue = () => {
    if (task.completed) return false;
    const today = new Date().toISOString().split("T")[0];
    return deadline < today;
  };

  const isToday = () => {
    if (task.completed) return false;
    const today = new Date().toISOString().split("T")[0];
    return deadline === today;
  };

  // 残り日数
  const daysRemaining = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    const diff = Math.ceil(
      (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff;
  };

  const priorityConfig = {
    high: {
      label: "高",
      color: "bg-red-100 text-red-700 border-red-300",
      icon: "🔴",
    },
    medium: {
      label: "中",
      color: "bg-yellow-100 text-yellow-700 border-yellow-300",
      icon: "🟡",
    },
    low: {
      label: "低",
      color: "bg-green-100 text-green-700 border-green-300",
      icon: "🟢",
    },
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-4xl my-8 mx-4 rounded-xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: "calc(100vh - 64px)" }}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-gray-50/50 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onUpdate({
                  ...task,
                  completed: !task.completed,
                  text: titleInput,
                  description,
                  content: "",
                  priority,
                  tags,
                  subtasks,
                  comments,
                  progress,
                  taskAssignee,
                  startDate,
                  deadline,
                  parentTheme,
                  images,
                  miroUrl,
                });
              }}
              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                task.completed
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-300 hover:border-green-400"
              }`}
            >
              {task.completed && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <span
              className={`text-sm font-medium ${
                task.completed ? "text-green-600" : "text-gray-500"
              }`}
            >
              {task.completed ? "完了" : "進行中"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {/* 保存状態表示 */}
            {saveStatus === "unsaved" && (
              <span className="text-xs text-orange-500 font-medium">● 未保存</span>
            )}
            {saveStatus === "saving" && (
              <span className="text-xs text-blue-500 font-medium">保存中...</span>
            )}
            {saveStatus === "saved" && (
              <span className="text-xs text-green-500 font-medium">✓ 保存済み</span>
            )}
            <button
              onClick={handleSave}
              className={`px-4 py-1.5 text-sm rounded-lg transition-colors font-medium ${
                saveStatus === "unsaved"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              💾 保存
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              🗑️ 削除
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-500"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-8 py-6">
            {/* タイトル */}
            {editingTitle ? (
              <input
                ref={titleRef}
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onBlur={() => setEditingTitle(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setEditingTitle(false);
                }}
                className="text-3xl font-bold text-gray-900 w-full border-none outline-none focus:ring-0 bg-transparent px-0"
                placeholder="タスクタイトル"
              />
            ) : (
              <h1
                onClick={() => setEditingTitle(true)}
                className={`text-3xl font-bold cursor-text hover:bg-gray-50 rounded px-1 -mx-1 py-1 transition-colors ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-900"
                }`}
              >
                {titleInput || "無題のタスク"}
              </h1>
            )}

            {/* プロパティセクション */}
            <div className="mt-6 space-y-3">
              {/* 親テーマ */}
              <div className="flex items-center gap-4">
                <span className="w-24 text-sm text-gray-500 flex-shrink-0">親テーマ</span>
                {editingParentTheme ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={parentTheme}
                      onChange={(e) => setParentTheme(e.target.value)}
                      placeholder="例: 体制・プロセス整備"
                      className="text-sm px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
                      autoFocus
                      onBlur={() => setEditingParentTheme(false)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setEditingParentTheme(false);
                      }}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingParentTheme(true)}
                    className="text-sm text-gray-700 hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors"
                  >
                    {parentTheme ? (
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full" />
                        {parentTheme}
                      </span>
                    ) : (
                      <span className="text-gray-400">+ 親テーマを追加</span>
                    )}
                  </button>
                )}
              </div>

              {/* 優先度 */}
              <div className="flex items-center gap-4">
                <span className="w-24 text-sm text-gray-500 flex-shrink-0">優先度</span>
                <div className="flex gap-2">
                  {(["high", "medium", "low"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`px-3 py-1 text-xs rounded-full border transition-all ${
                        priority === p
                          ? priorityConfig[p].color + " font-semibold"
                          : "border-gray-200 text-gray-400 hover:border-gray-400"
                      }`}
                    >
                      {priorityConfig[p].icon} {priorityConfig[p].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 担当者 */}
              <div className="flex items-center gap-4">
                <span className="w-24 text-sm text-gray-500 flex-shrink-0">担当者</span>
                {editingAssignee ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={taskAssignee}
                      onChange={(e) => setTaskAssignee(e.target.value)}
                      placeholder="担当者名を入力"
                      className="text-sm px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      autoFocus
                      onBlur={() => setEditingAssignee(false)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setEditingAssignee(false);
                      }}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingAssignee(true)}
                    className="text-sm text-gray-700 hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors"
                  >
                    {taskAssignee ? (
                      <span className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs">
                          {taskAssignee.charAt(0)}
                        </span>
                        {taskAssignee}
                      </span>
                    ) : (
                      <span className="text-gray-400">+ 担当者を追加</span>
                    )}
                  </button>
                )}
              </div>

              {/* 期間 */}
              <div className="flex items-center gap-4">
                <span className="w-24 text-sm text-gray-500 flex-shrink-0">期間</span>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-sm px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <span className="text-gray-400">→</span>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="text-sm px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  {deadline && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        isOverdue()
                          ? "bg-red-100 text-red-700 font-bold"
                          : isToday()
                          ? "bg-orange-100 text-orange-700 font-bold"
                          : daysRemaining() <= 3
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {isOverdue()
                        ? `⚠️ ${Math.abs(daysRemaining())}日超過`
                        : isToday()
                        ? "📅 今日が期限"
                        : `残り${daysRemaining()}日`}
                    </span>
                  )}
                </div>
              </div>

              {/* 進捗 */}
              <div className="flex items-center gap-4">
                <span className="w-24 text-sm text-gray-500 flex-shrink-0">進捗</span>
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-1 max-w-xs bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all ${
                        subtaskProgress >= 100
                          ? "bg-green-500"
                          : subtaskProgress >= 50
                          ? "bg-blue-500"
                          : "bg-indigo-500"
                      }`}
                      style={{ width: `${subtaskProgress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {subtaskProgress}%
                  </span>
                  {subtasks.length === 0 && (
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className="w-24 h-1 accent-indigo-600"
                    />
                  )}
                </div>
              </div>

              {/* タグ */}
              <div className="flex items-start gap-4">
                <span className="w-24 text-sm text-gray-500 flex-shrink-0 pt-1">タグ</span>
                <div className="flex flex-wrap items-center gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-200"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-indigo-400 hover:text-indigo-600 ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      placeholder="+ タグ追加"
                      className="text-xs px-2 py-1 border border-transparent hover:border-gray-300 focus:border-indigo-300 rounded-lg focus:ring-1 focus:ring-indigo-500 bg-transparent w-20 focus:w-32 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 区切り線 */}
            <hr className="my-6 border-gray-200" />

            {/* 説明・ノート */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                📝 説明・ノート
              </h3>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={"タスクの説明やメモを自由に記入できます。\n\n・タスクの概要\n・議事メモ\n・技術検討事項\n・調査結果\n・メンバーとの共有事項"}
                className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y text-sm leading-relaxed text-gray-700 min-h-[240px] bg-gray-50/50"
                rows={10}
              />
            </div>

            {/* 画像 */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                🖼️ 画像
              </h3>
              {/* 画像プレビュー */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {images.map((url, idx) => (
                    <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={url}
                        alt={`添付画像 ${idx + 1}`}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "";
                          (e.target as HTMLImageElement).alt = "画像を読み込めませんでした";
                          (e.target as HTMLImageElement).className = "w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400 text-sm";
                        }}
                      />
                      <button
                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                      >
                        ✕
                      </button>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-2 right-2 bg-black/50 text-white rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                      >
                        拡大
                      </a>
                    </div>
                  ))}
                </div>
              )}
              {/* 画像 URL 追加 */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="画像 URL を貼り付け..."
                  className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const url = (e.target as HTMLInputElement).value.trim();
                      if (url) {
                        setImages([...images, url]);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }
                  }}
                />
                <label className="px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm cursor-pointer border border-indigo-200 flex items-center gap-1">
                  <span>📁 ファイル</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (!files) return;
                      Array.from(files).forEach((file) => {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          const dataUrl = ev.target?.result as string;
                          if (dataUrl) {
                            setImages((prev) => [...prev, dataUrl]);
                          }
                        };
                        reader.readAsDataURL(file);
                      });
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-400 mt-1">URLを入力してEnter、またはファイルを選択して追加</p>
            </div>

            {/* Miro 埋め込み */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                📌 Miro ボード
              </h3>
              <input
                type="text"
                value={miroUrl}
                onChange={(e) => setMiroUrl(e.target.value)}
                placeholder="Miro ボードのURLを貼り付け... (https://miro.com/app/board/...)"
                className="w-full text-sm px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-3"
              />
              {miroUrl && (() => {
                // Miro URL から埋め込みURLを生成
                let embedUrl = miroUrl.trim();
                // miro.com/app/board/xxx → miro.com/app/live-embed/xxx
                const boardMatch = embedUrl.match(/miro\.com\/app\/board\/([^/?#]+)/);
                if (boardMatch) {
                  embedUrl = `https://miro.com/app/live-embed/${boardMatch[1]}/`;
                }
                // 既に live-embed URL ならそのまま使用
                const isEmbed = embedUrl.includes("live-embed");
                if (!isEmbed && !boardMatch) {
                  return (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-yellow-700 text-sm">⚠️ Miro のURL形式が正しくありません。<br/><code className="text-xs bg-yellow-100 px-1 rounded">https://miro.com/app/board/...</code> 形式で入力してください。</p>
                    </div>
                  );
                }
                return (
                  <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <iframe
                      src={embedUrl}
                      className="w-full border-0"
                      style={{ height: "400px" }}
                      allow="fullscreen; clipboard-read; clipboard-write"
                      allowFullScreen
                    />
                    <a
                      href={miroUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-indigo-600 text-xs px-2 py-1 rounded shadow-sm border border-gray-200 transition-colors"
                    >
                      ↗ Miroで開く
                    </a>
                  </div>
                );
              })()}
            </div>

            {/* サブタスク */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                ✅ サブタスク
                {subtasks.length > 0 && (
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    ({subtasks.filter((s) => s.completed).length}/{subtasks.length})
                  </span>
                )}
              </h3>

              {/* サブタスク進捗バー */}
              {subtasks.length > 0 && (
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full transition-all"
                      style={{
                        width: `${
                          (subtasks.filter((s) => s.completed).length /
                            subtasks.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                {subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center gap-3 group px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <button
                      onClick={() => toggleSubtask(subtask.id)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        subtask.completed
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                    >
                      {subtask.completed && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <span
                      className={`flex-1 text-sm ${
                        subtask.completed
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {subtask.text}
                    </span>
                    <button
                      onClick={() => deleteSubtask(subtask.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* サブタスク追加 */}
              <div className="flex items-center gap-2 mt-2 px-3">
                <input
                  type="text"
                  value={newSubtaskText}
                  onChange={(e) => setNewSubtaskText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSubtask();
                    }
                  }}
                  placeholder="+ サブタスクを追加..."
                  className="flex-1 text-sm px-3 py-2 border border-transparent hover:border-gray-300 focus:border-indigo-300 rounded-lg focus:ring-1 focus:ring-indigo-500 bg-transparent transition-all"
                />
                {newSubtaskText && (
                  <button
                    onClick={addSubtask}
                    className="text-sm px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    追加
                  </button>
                )}
              </div>
            </div>

            {/* コメント */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                💬 コメント・活動ログ
              </h3>

              <div className="space-y-3">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex gap-3 group"
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-gray-600">
                      👤
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {comment.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-400">
                          {new Date(comment.createdAt).toLocaleString("ja-JP")}
                        </span>
                        <button
                          onClick={() => deleteComment(comment.id)}
                          className="text-xs text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* コメント追加 */}
              <div className="flex gap-3 mt-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 text-xs text-indigo-600">
                  ✍️
                </div>
                <div className="flex-1">
                  <textarea
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        addComment();
                      }
                    }}
                    placeholder="コメントを追加... (Ctrl+Enterで送信)"
                    className="w-full text-sm px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    rows={2}
                  />
                  {newCommentText && (
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={addComment}
                        className="text-sm px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        投稿
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 削除確認 */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-60 rounded-xl">
            <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm mx-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                タスクを削除しますか？
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                「{titleInput}」を削除します。この操作は取り消せません。
              </p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={() => {
                    onDelete(task.id);
                    onClose();
                  }}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  削除する
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
