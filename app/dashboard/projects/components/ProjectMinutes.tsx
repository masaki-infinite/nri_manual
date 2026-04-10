"use client";

import { useState, useEffect, useCallback } from "react";

type Minutes = {
  id: string;
  company: string;
  date: string;
  title: string;
  content: string;
  attendees: string;
  createdAt: string;
};

type ProjectMinutesProps = {
  /** localStorage のキーではなく、議事録の company フィールドに使う企業名 */
  companyName: string;
};

/** 全議事録の共有ストレージキー（dashboard/minutes と同じ） */
const STORAGE_KEY = "minutes";

export default function ProjectMinutes({ companyName }: ProjectMinutesProps) {
  const [allMinutes, setAllMinutes] = useState<Minutes[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMinute, setEditingMinute] = useState<Minutes | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    content: "",
    attendees: "",
  });

  // --- load ---
  const loadMinutes = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setAllMinutes(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    loadMinutes();
    // 他のタブ／コンポーネントからの更新を検知
    const handler = () => loadMinutes();
    window.addEventListener("minutesUpdated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("minutesUpdated", handler);
      window.removeEventListener("storage", handler);
    };
  }, [loadMinutes]);

  // --- save ---
  const persist = (data: Minutes[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setAllMinutes(data);
    window.dispatchEvent(new Event("minutesUpdated"));
  };

  // --- 自案件の議事録 ---
  const projectMinutes = allMinutes
    .filter((m) => m.company === companyName)
    .sort((a, b) => b.date.localeCompare(a.date));

  // --- form helpers ---
  const resetForm = () => {
    setFormData({ date: "", title: "", content: "", attendees: "" });
    setEditingMinute(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMinute) {
      const updated = allMinutes.map((m) =>
        m.id === editingMinute.id ? { ...m, ...formData, company: companyName } : m
      );
      persist(updated);
    } else {
      const newMinute: Minutes = {
        id: Date.now().toString(),
        company: companyName,
        ...formData,
        createdAt: new Date().toISOString(),
      };
      persist([...allMinutes, newMinute]);
    }
    resetForm();
  };

  const handleEdit = (minute: Minutes) => {
    setEditingMinute(minute);
    setFormData({
      date: minute.date,
      title: minute.title,
      content: minute.content,
      attendees: minute.attendees,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("この議事録を削除しますか？")) {
      persist(allMinutes.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          📋 議事録
          {projectMinutes.length > 0 && (
            <span className="text-sm font-normal text-gray-500">
              ({projectMinutes.length}件)
            </span>
          )}
        </h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingMinute(null);
            setFormData({
              date: new Date().toISOString().split("T")[0],
              title: "",
              content: "",
              attendees: "",
            });
          }}
          className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
        >
          ＋ 議事録を追加
        </button>
      </div>

      {/* 登録／編集フォーム（インライン） */}
      {showForm && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            {editingMinute ? "議事録を編集" : "議事録を追加"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  日付 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  タイトル <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="例: 定例ミーティング"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">参加者</label>
              <input
                type="text"
                value={formData.attendees}
                onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                placeholder="例: 田中、佐藤、鈴木"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                placeholder={"議事録の内容を入力してください\n\n例:\n### アクションアイテム\n- タスク1を完了する"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
              >
                {editingMinute ? "更新" : "登録"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 議事録一覧 */}
      {projectMinutes.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-6">
          議事録がまだ登録されていません
        </p>
      ) : (
        <div className="space-y-2">
          {projectMinutes.map((minute) => {
            const isExpanded = expandedId === minute.id;
            return (
              <div
                key={minute.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
              >
                {/* ヘッダー（クリックで展開） */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : minute.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs text-gray-500 flex-shrink-0 w-24">
                      📅 {minute.date}
                    </span>
                    <span className="text-sm font-medium text-gray-800 truncate">
                      {minute.title}
                    </span>
                    {minute.attendees && (
                      <span className="text-xs text-gray-400 truncate hidden sm:inline">
                        ({minute.attendees})
                      </span>
                    )}
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 展開内容 */}
                {isExpanded && (
                  <div className="border-t border-gray-200 px-4 py-4 bg-gray-50/50">
                    {minute.attendees && (
                      <div className="mb-3">
                        <span className="text-xs font-semibold text-gray-500 uppercase">参加者</span>
                        <p className="text-sm text-gray-700 mt-0.5">{minute.attendees}</p>
                      </div>
                    )}
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-gray-500 uppercase">内容</span>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap mt-1 leading-relaxed">
                        {minute.content}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-gray-200">
                      <button
                        onClick={() => handleEdit(minute)}
                        className="text-indigo-600 hover:text-indigo-700 text-xs font-medium"
                      >
                        ✏️ 編集
                      </button>
                      <button
                        onClick={() => handleDelete(minute.id)}
                        className="text-red-600 hover:text-red-700 text-xs font-medium"
                      >
                        🗑️ 削除
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
