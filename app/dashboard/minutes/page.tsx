"use client";

import { useState, useEffect } from "react";

type Minutes = {
  id: string;
  company: string;
  date: string;
  title: string;
  content: string;
  attendees: string;
  createdAt: string;
};

export default function MinutesPage() {
  const [minutes, setMinutes] = useState<Minutes[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMinute, setEditingMinute] = useState<Minutes | null>(null);
  const [formData, setFormData] = useState({
    company: "",
    date: "",
    title: "",
    content: "",
    attendees: "",
  });
  const [searchCompany, setSearchCompany] = useState("");
  const [searchDateFrom, setSearchDateFrom] = useState("");
  const [searchDateTo, setSearchDateTo] = useState("");

  // ローカルストレージから議事録を読み込む
  useEffect(() => {
    const stored = localStorage.getItem("minutes");
    if (stored) {
      setMinutes(JSON.parse(stored));
    }
  }, []);

  // ローカルストレージに保存
  const saveToLocalStorage = (data: Minutes[]) => {
    localStorage.setItem("minutes", JSON.stringify(data));
    // カスタムイベントを発火してレイアウトに通知
    window.dispatchEvent(new Event("minutesUpdated"));
  };

  // フォームリセット
  const resetForm = () => {
    setFormData({
      company: "",
      date: "",
      title: "",
      content: "",
      attendees: "",
    });
    setEditingMinute(null);
    setShowForm(false);
  };

  // 議事録の保存
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMinute) {
      // 編集
      const updated = minutes.map((m) =>
        m.id === editingMinute.id
          ? { ...editingMinute, ...formData }
          : m
      );
      setMinutes(updated);
      saveToLocalStorage(updated);
    } else {
      // 新規作成
      const newMinute: Minutes = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      };
      const updated = [...minutes, newMinute];
      setMinutes(updated);
      saveToLocalStorage(updated);
    }
    
    resetForm();
  };

  // 編集開始
  const handleEdit = (minute: Minutes) => {
    setEditingMinute(minute);
    setFormData({
      company: minute.company,
      date: minute.date,
      title: minute.title,
      content: minute.content,
      attendees: minute.attendees,
    });
    setShowForm(true);
  };

  // 削除
  const handleDelete = (id: string) => {
    if (confirm("この議事録を削除しますか？")) {
      const updated = minutes.filter((m) => m.id !== id);
      setMinutes(updated);
      saveToLocalStorage(updated);
    }
  };

  // 検索フィルター
  const filteredMinutes = minutes.filter((minute) => {
    const companyMatch = searchCompany === "" || 
      minute.company.toLowerCase().includes(searchCompany.toLowerCase());
    
    const dateFromMatch = searchDateFrom === "" || minute.date >= searchDateFrom;
    const dateToMatch = searchDateTo === "" || minute.date <= searchDateTo;
    
    return companyMatch && dateFromMatch && dateToMatch;
  });

  // 企業一覧を取得
  const companies = Array.from(new Set(minutes.map((m) => m.company))).sort();

  // 企業ごと、日付ごとにグループ化
  const groupedMinutes = filteredMinutes.reduce((acc, minute) => {
    if (!acc[minute.company]) {
      acc[minute.company] = {};
    }
    if (!acc[minute.company][minute.date]) {
      acc[minute.company][minute.date] = [];
    }
    acc[minute.company][minute.date].push(minute);
    return acc;
  }, {} as Record<string, Record<string, Minutes[]>>);

  // 検索クリア
  const clearSearch = () => {
    setSearchCompany("");
    setSearchDateFrom("");
    setSearchDateTo("");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">📋 議事録</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          ＋ 議事録を登録
        </button>
      </div>

      {/* 検索フィルター */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">🔍 検索フィルター</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">企業名</label>
            <input
              type="text"
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
              placeholder="企業名で検索..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">日付（開始）</label>
            <input
              type="date"
              value={searchDateFrom}
              onChange={(e) => setSearchDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">日付（終了）</label>
            <input
              type="date"
              value={searchDateTo}
              onChange={(e) => setSearchDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={clearSearch}
              className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              クリア
            </button>
          </div>
        </div>
        {(searchCompany || searchDateFrom || searchDateTo) && (
          <div className="mt-3 text-sm text-gray-600">
            検索結果: {filteredMinutes.length}件 / 全{minutes.length}件
          </div>
        )}
      </div>

      {/* 議事録登録フォーム（モーダル） */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingMinute ? "議事録を編集" : "議事録を登録"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  企業名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="例: 株式会社ABC"
                  list="company-suggestions"
                />
                <datalist id="company-suggestions">
                  {companies.map((company) => (
                    <option key={company} value={company} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  日付 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  タイトル <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="例: キックオフミーティング"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  参加者
                </label>
                <input
                  type="text"
                  value={formData.attendees}
                  onChange={(e) =>
                    setFormData({ ...formData, attendees: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="例: 田中、佐藤、鈴木"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                  placeholder="議事録の内容を入力してください&#10;&#10;例:&#10;### アクションアイテム&#10;- タスク1を完了する&#10;- タスク2を確認する"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {editingMinute ? "更新" : "登録"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 議事録一覧 */}
      {filteredMinutes.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">
            {minutes.length === 0 ? (
              <>
                議事録がまだ登録されていません。
                <br />
                右上の「議事録を登録」ボタンから追加してください。
              </>
            ) : (
              <>
                検索条件に一致する議事録がありません。
                <br />
                検索条件を変更してください。
              </>
            )}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedMinutes)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([company, dateGroups]) => (
              <div
                key={company}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="bg-indigo-50 px-6 py-3 border-b border-gray-200">
                  <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    <span>🏢</span>
                    {company}
                  </h4>
                </div>
                <div className="p-4 space-y-4">
                  {Object.entries(dateGroups)
                    .sort(([a], [b]) => b.localeCompare(a))
                    .map(([date, minutesList]) => (
                      <div key={date}>
                        <div className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                          <span>📅</span>
                          {date}
                        </div>
                        <div className="space-y-2 ml-6">
                          {minutesList.map((minute) => (
                            <div
                              key={minute.id}
                              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="font-semibold text-gray-800 mb-1">
                                    {minute.title}
                                  </h5>
                                  {minute.attendees && (
                                    <p className="text-xs text-gray-500 mb-2">
                                      参加者: {minute.attendees}
                                    </p>
                                  )}
                                  <p className="text-sm text-gray-600 whitespace-pre-wrap line-clamp-3">
                                    {minute.content}
                                  </p>
                                </div>
                                <div className="flex gap-2 ml-4">
                                  <button
                                    onClick={() => handleEdit(minute)}
                                    className="text-indigo-600 hover:text-indigo-700 text-sm"
                                  >
                                    編集
                                  </button>
                                  <button
                                    onClick={() => handleDelete(minute.id)}
                                    className="text-red-600 hover:text-red-700 text-sm"
                                  >
                                    削除
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
