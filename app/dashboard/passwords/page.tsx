"use client";

import { useState, useEffect } from "react";

type PasswordEntry = {
  id: string;
  category: string;
  service: string;
  username: string;
  password: string;
  url: string;
  note: string;
  createdAt: string;
  updatedAt: string;
};

export default function PasswordsPage() {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPassword, setEditingPassword] = useState<PasswordEntry | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [formData, setFormData] = useState({
    category: "",
    service: "",
    username: "",
    password: "",
    url: "",
    note: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("passwords");
    if (stored) {
      setPasswords(JSON.parse(stored));
    }
  }, []);

  const saveToLocalStorage = (data: PasswordEntry[]) => {
    localStorage.setItem("passwords", JSON.stringify(data));
    setPasswords(data);
  };

  const resetForm = () => {
    setFormData({
      category: "",
      service: "",
      username: "",
      password: "",
      url: "",
      note: "",
    });
    setEditingPassword(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPassword) {
      const updated = passwords.map((p) =>
        p.id === editingPassword.id
          ? { ...p, ...formData, updatedAt: new Date().toISOString() }
          : p
      );
      saveToLocalStorage(updated);
    } else {
      const newPassword: PasswordEntry = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveToLocalStorage([...passwords, newPassword]);
    }

    resetForm();
  };

  const handleEdit = (password: PasswordEntry) => {
    setEditingPassword(password);
    setFormData({
      category: password.category,
      service: password.service,
      username: password.username,
      password: password.password,
      url: password.url,
      note: password.note,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("このパスワードを削除しますか？")) {
      saveToLocalStorage(passwords.filter((p) => p.id !== id));
    }
  };

  const togglePasswordVisibility = (id: string) => {
    const newVisible = new Set(visiblePasswords);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisiblePasswords(newVisible);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label}をクリップボードにコピーしました`);
  };

  const generatePassword = () => {
    const length = 16;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setFormData({ ...formData, password });
  };

  // フィルタリング
  const filteredPasswords = passwords.filter((password) => {
    const matchesSearch =
      searchQuery === "" ||
      password.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      password.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      password.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || password.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // カテゴリ一覧
  const categories = Array.from(new Set(passwords.map((p) => p.category))).sort();

  // カテゴリごとにグループ化
  const groupedPasswords = filteredPasswords.reduce((acc, password) => {
    if (!acc[password.category]) {
      acc[password.category] = [];
    }
    acc[password.category].push(password);
    return acc;
  }, {} as Record<string, PasswordEntry[]>);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">🔐 パスワード管理</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          ＋ パスワード追加
        </button>
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">検索</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="サービス名、ユーザー名、カテゴリで検索..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">カテゴリ</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">すべて</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        {(searchQuery || selectedCategory !== "all") && (
          <div className="mt-3 text-sm text-gray-600">
            検索結果: {filteredPasswords.length}件 / 全{passwords.length}件
          </div>
        )}
      </div>

      {/* パスワード登録フォーム（モーダル） */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingPassword ? "パスワードを編集" : "パスワードを追加"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  カテゴリ
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="例: AWS, GitHub, 社内システム"
                  list="category-suggestions"
                />
                <datalist id="category-suggestions">
                  {categories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  サービス名
                </label>
                <input
                  type="text"
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="例: AWS Console, GitHub Enterprise"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ユーザー名 / メールアドレス
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="例: user@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  パスワード
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
                    placeholder="パスワードを入力"
                  />
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm whitespace-nowrap"
                  >
                    自動生成
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="例: https://console.aws.amazon.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  メモ
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="補足情報や注意事項"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {editingPassword ? "更新" : "追加"}
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

      {/* パスワード一覧 */}
      {filteredPasswords.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">
            {passwords.length === 0 ? (
              <>
                パスワードがまだ登録されていません。
                <br />
                右上の「パスワード追加」ボタンから追加してください。
              </>
            ) : (
              <>
                検索条件に一致するパスワードがありません。
                <br />
                検索条件を変更してください。
              </>
            )}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedPasswords)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([category, passwordList]) => (
              <div
                key={category}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="bg-indigo-50 px-6 py-3 border-b border-gray-200">
                  <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    <span>📁</span>
                    {category}
                  </h4>
                </div>
                <div className="p-4 space-y-3">
                  {passwordList.map((password) => (
                    <div
                      key={password.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
                            {password.service}
                            {password.url && (
                              <a
                                href={password.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:text-indigo-700 text-sm"
                              >
                                🔗
                              </a>
                            )}
                          </h5>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(password)}
                            className="text-indigo-600 hover:text-indigo-700 text-sm"
                          >
                            編集
                          </button>
                          <button
                            onClick={() => handleDelete(password.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            削除
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600 w-24">ユーザー名:</span>
                          <span className="font-mono text-gray-800 flex-1">
                            {password.username}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(password.username, "ユーザー名")
                            }
                            className="text-gray-500 hover:text-gray-700 text-xs"
                          >
                            📋 コピー
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-gray-600 w-24">パスワード:</span>
                          <span className="font-mono text-gray-800 flex-1">
                            {visiblePasswords.has(password.id)
                              ? password.password
                              : "••••••••••••"}
                          </span>
                          <button
                            onClick={() => togglePasswordVisibility(password.id)}
                            className="text-gray-500 hover:text-gray-700 text-xs"
                          >
                            {visiblePasswords.has(password.id) ? "👁️ 非表示" : "👁️ 表示"}
                          </button>
                          <button
                            onClick={() =>
                              copyToClipboard(password.password, "パスワード")
                            }
                            className="text-gray-500 hover:text-gray-700 text-xs"
                          >
                            📋 コピー
                          </button>
                        </div>

                        {password.note && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <span className="text-gray-600 text-xs">メモ:</span>
                            <p className="text-gray-700 text-xs mt-1 whitespace-pre-wrap">
                              {password.note}
                            </p>
                          </div>
                        )}

                        <div className="text-xs text-gray-500 mt-2">
                          更新: {new Date(password.updatedAt).toLocaleString("ja-JP")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 注意事項 */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-yellow-800 mb-2 flex items-center gap-2">
          ⚠️ セキュリティに関する注意事項
        </h3>
        <ul className="text-xs text-yellow-700 space-y-1">
          <li>• パスワードはブラウザのlocalStorageに保存されます</li>
          <li>• 共有PCでは使用を避けてください</li>
          <li>• 定期的にパスワードを変更することを推奨します</li>
          <li>• 重要なパスワードは専用のパスワードマネージャーの使用を検討してください</li>
        </ul>
      </div>
    </div>
  );
}
