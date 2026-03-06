"use client";

import { useState, useEffect } from "react";

type ExternalLink = {
  id: string;
  name: string;
  url: string;
};

function getServiceInfo(url: string): { icon: string; label: string } {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    if (hostname.includes("notion.so") || hostname.includes("notion.site"))
      return { icon: "📝", label: "Notion" };
    if (hostname.includes("atlassian.net") || hostname.includes("jira"))
      return { icon: "🎯", label: "Jira" };
    if (hostname.includes("docs.google.com"))
      return { icon: "📄", label: "Google Docs" };
    if (hostname.includes("drive.google.com"))
      return { icon: "📁", label: "Google Drive" };
    if (hostname.includes("slides.google.com"))
      return { icon: "📊", label: "Google Slides" };
    if (hostname.includes("sharepoint.com") || hostname.includes("onedrive"))
      return { icon: "☁️", label: "SharePoint" };
    if (hostname.includes("miro.com"))
      return { icon: "🎨", label: "Miro" };
    if (hostname.includes("figma.com"))
      return { icon: "🎨", label: "Figma" };
    if (hostname.includes("github.com"))
      return { icon: "🐙", label: "GitHub" };
    if (hostname.includes("slack.com"))
      return { icon: "💬", label: "Slack" };
    if (hostname.includes("teams.microsoft.com"))
      return { icon: "💬", label: "Teams" };
    if (hostname.includes("confluence"))
      return { icon: "📖", label: "Confluence" };
    if (hostname.includes("backlog"))
      return { icon: "📋", label: "Backlog" };
    if (hostname.includes("trello.com"))
      return { icon: "📋", label: "Trello" };
  } catch {
    // invalid URL
  }
  return { icon: "🔗", label: "リンク" };
}

type Props = {
  storageKey: string;
};

export default function ExternalLinks({ storageKey }: Props) {
  const [links, setLinks] = useState<ExternalLink[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const STORAGE_KEY = `project_${storageKey}_links`;

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setLinks(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, [STORAGE_KEY]);

  const save = (newLinks: ExternalLink[]) => {
    setLinks(newLinks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLinks));
  };

  const addLink = () => {
    if (!nameInput.trim() || !urlInput.trim()) return;
    let url = urlInput.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
    const newLink: ExternalLink = {
      id: Date.now().toString(),
      name: nameInput.trim(),
      url,
    };
    save([...links, newLink]);
    setNameInput("");
    setUrlInput("");
    setShowForm(false);
  };

  const removeLink = (id: string) => {
    save(links.filter((l) => l.id !== id));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          🔗 外部リンク
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {showForm ? "キャンセル" : "+ リンク追加"}
        </button>
      </div>

      {showForm && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                リンク名
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                placeholder="例: Notion議事録、Jiraボード、パワポ資料"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addLink()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                placeholder="https://..."
              />
            </div>
          </div>
          <button
            onClick={addLink}
            disabled={!nameInput.trim() || !urlInput.trim()}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            追加
          </button>
        </div>
      )}

      {links.length === 0 ? (
        <p className="text-sm text-gray-400">
          リンクが登録されていません。Notion、Jira、パワポ資料フォルダなどのリンクを追加してください。
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {links.map((link) => {
            const { icon, label } = getServiceInfo(link.url);
            return (
              <div
                key={link.id}
                className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg group hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
              >
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline truncate block"
                  >
                    {link.name}
                  </a>
                  <span className="text-xs text-gray-400">{label}</span>
                </div>
                <button
                  onClick={() => removeLink(link.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all flex-shrink-0"
                  title="削除"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
