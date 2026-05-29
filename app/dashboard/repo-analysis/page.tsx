"use client";

import { useState, useEffect, useCallback } from "react";

type GitTreeEntry = {
  path: string;
  type: "blob" | "tree";
  size?: number;
  sha: string;
};

type TreeNode = {
  name: string;
  path: string;
  type: "blob" | "tree";
  size?: number;
  children: TreeNode[];
};

type SavedRepo = {
  owner: string;
  repo: string;
  branch: string;
  savedAt: string;
};

const TOKEN_KEY = "repoAnalysisToken";
const REPOS_KEY = "repoAnalysisRepos";

const notesKey = (owner: string, repo: string) =>
  `repoAnalysisNotes_${owner}/${repo}`;

// owner/repo と branch を URL や短縮形から抽出する
function parseRepoInput(input: string): { owner: string; repo: string; branch?: string } | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // https://github.com/owner/repo(.git)(/tree/branch/...)
  const urlMatch = trimmed.match(
    /github\.com[/:]([^/]+)\/([^/#?]+?)(?:\.git)?(?:\/tree\/([^/#?]+))?(?:[/#?].*)?$/i
  );
  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2], branch: urlMatch[3] };
  }

  // owner/repo 形式
  const shortMatch = trimmed.match(/^([^/\s]+)\/([^/\s]+)$/);
  if (shortMatch) {
    return { owner: shortMatch[1], repo: shortMatch[2] };
  }

  return null;
}

// flat なツリー一覧から階層構造を組み立てる
function buildTree(entries: GitTreeEntry[]): TreeNode {
  const root: TreeNode = { name: "", path: "", type: "tree", children: [] };

  const sorted = [...entries].sort((a, b) => a.path.localeCompare(b.path));

  for (const entry of sorted) {
    const parts = entry.path.split("/");
    let current = root;
    let accumulated = "";

    parts.forEach((part, idx) => {
      accumulated = accumulated ? `${accumulated}/${part}` : part;
      const isLast = idx === parts.length - 1;
      let child = current.children.find((c) => c.name === part);

      if (!child) {
        child = {
          name: part,
          path: accumulated,
          type: isLast ? entry.type : "tree",
          size: isLast ? entry.size : undefined,
          children: [],
        };
        current.children.push(child);
      }
      current = child;
    });
  }

  // フォルダを先に、その後ファイル。各階層を名前順に
  const sortNode = (node: TreeNode) => {
    node.children.sort((a, b) => {
      if (a.type !== b.type) return a.type === "tree" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    node.children.forEach(sortNode);
  };
  sortNode(root);

  return root;
}

// ファイル名・拡張子から役割を推定するヒント
function guessRole(node: TreeNode): string {
  const name = node.name.toLowerCase();
  const path = node.path.toLowerCase();

  if (node.type === "tree") {
    const folderHints: Record<string, string> = {
      src: "ソースコードのルート",
      app: "アプリ本体 / ルーティング（Next.js App Router など）",
      pages: "ページ・ルーティング定義（Next.js Pages Router）",
      components: "再利用される UI コンポーネント群",
      lib: "共通ロジック・ユーティリティ・外部連携",
      utils: "汎用ユーティリティ関数",
      hooks: "React カスタムフック",
      public: "静的アセット（画像・フォント等）",
      assets: "静的アセット",
      styles: "スタイル定義（CSS など）",
      api: "API エンドポイント / サーバー処理",
      test: "テストコード",
      tests: "テストコード",
      __tests__: "テストコード",
      docs: "ドキュメント",
      config: "設定ファイル群",
      scripts: "ビルド・運用スクリプト",
      types: "型定義",
      models: "データモデル定義",
      services: "ビジネスロジック・サービス層",
      controllers: "コントローラ層（リクエスト処理）",
      middleware: "ミドルウェア",
      migrations: "DB マイグレーション",
      node_modules: "依存パッケージ（自動生成・編集不要）",
      ".git": "Git 管理データ（編集不要）",
      ".github": "GitHub 設定（Actions ワークフロー等）",
      dist: "ビルド成果物（自動生成）",
      build: "ビルド成果物（自動生成）",
    };
    return folderHints[name] || "フォルダ";
  }

  const fileHints: Record<string, string> = {
    "package.json": "依存関係・スクリプト定義（npm/yarn）",
    "package-lock.json": "依存関係のロックファイル（自動生成）",
    "yarn.lock": "依存関係のロックファイル（自動生成）",
    "pnpm-lock.yaml": "依存関係のロックファイル（自動生成）",
    "tsconfig.json": "TypeScript コンパイラ設定",
    "next.config.ts": "Next.js 設定",
    "next.config.js": "Next.js 設定",
    "next.config.mjs": "Next.js 設定",
    ".gitignore": "Git の除外対象設定",
    ".env": "環境変数（機密情報を含む場合あり）",
    "readme.md": "プロジェクト概要・使い方",
    "dockerfile": "Docker イメージのビルド定義",
    "docker-compose.yml": "複数コンテナの構成定義",
    "middleware.ts": "リクエスト前処理（認証・リダイレクト等）",
    "eslint.config.mjs": "ESLint（静的解析）設定",
    "postcss.config.mjs": "PostCSS 設定",
    "tailwind.config.ts": "Tailwind CSS 設定",
    "layout.tsx": "ページ共通レイアウト（Next.js）",
    "page.tsx": "ページ本体（Next.js App Router）",
    "route.ts": "API ルートハンドラ（Next.js）",
    "index.ts": "エントリーポイント / 再エクスポート",
    "index.tsx": "エントリーポイント / コンポーネント",
    "main.ts": "アプリのエントリーポイント",
    "pom.xml": "Maven ビルド設定（Java）",
    "requirements.txt": "Python 依存パッケージ一覧",
    "makefile": "ビルド・タスク定義",
  };
  if (fileHints[name]) return fileHints[name];

  const ext = name.includes(".") ? name.split(".").pop()! : "";
  const extHints: Record<string, string> = {
    ts: "TypeScript ソース",
    tsx: "React コンポーネント（TypeScript）",
    js: "JavaScript ソース",
    jsx: "React コンポーネント（JavaScript）",
    py: "Python ソース",
    java: "Java ソース",
    go: "Go ソース",
    rb: "Ruby ソース",
    rs: "Rust ソース",
    php: "PHP ソース",
    css: "スタイルシート",
    scss: "スタイルシート（Sass）",
    html: "HTML テンプレート",
    json: "設定・データ（JSON）",
    yml: "設定（YAML）",
    yaml: "設定（YAML）",
    md: "ドキュメント（Markdown）",
    sql: "SQL クエリ / スキーマ",
    sh: "シェルスクリプト",
    toml: "設定（TOML）",
    xml: "設定・データ（XML）",
    svg: "ベクター画像",
    png: "画像",
    jpg: "画像",
    ico: "アイコン画像",
  };
  if (path.includes(".test.") || path.includes(".spec.")) return "テストコード";
  return extHints[ext] || "ファイル";
}

const BINARY_EXT = new Set([
  "png", "jpg", "jpeg", "gif", "ico", "webp", "bmp", "pdf", "zip", "gz",
  "tar", "woff", "woff2", "ttf", "eot", "mp4", "mp3", "wav", "exe", "bin",
  "class", "jar", "so", "dll", "lock",
]);

function isLikelyBinary(path: string): boolean {
  const ext = path.includes(".") ? path.split(".").pop()!.toLowerCase() : "";
  return BINARY_EXT.has(ext);
}

// GitHub の base64 を UTF-8 として安全にデコード
function decodeBase64Utf8(b64: string): string {
  const binary = atob(b64.replace(/\n/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder("utf-8").decode(bytes);
}

export default function RepoAnalysisPage() {
  const [input, setInput] = useState("");
  const [token, setToken] = useState("");
  const [showTokenSettings, setShowTokenSettings] = useState(false);

  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [branch, setBranch] = useState("");
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<TreeNode | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [fileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState("");

  const [notes, setNotes] = useState<Record<string, string>>({});
  const [savedRepos, setSavedRepos] = useState<SavedRepo[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem(TOKEN_KEY) || "");
    const repos = localStorage.getItem(REPOS_KEY);
    if (repos) {
      try {
        setSavedRepos(JSON.parse(repos));
      } catch {
        // ignore
      }
    }
  }, []);

  const loadNotes = useCallback((o: string, r: string) => {
    const stored = localStorage.getItem(notesKey(o, r));
    if (stored) {
      try {
        setNotes(JSON.parse(stored));
        return;
      } catch {
        // ignore
      }
    }
    setNotes({});
  }, []);

  const saveNote = (path: string, value: string) => {
    if (!owner || !repo) return;
    setNotes((prev) => {
      const next = { ...prev };
      if (value.trim()) {
        next[path] = value;
      } else {
        delete next[path];
      }
      localStorage.setItem(notesKey(owner, repo), JSON.stringify(next));
      return next;
    });
  };

  const ghHeaders = useCallback((): HeadersInit => {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };
    if (token.trim()) headers.Authorization = `Bearer ${token.trim()}`;
    return headers;
  }, [token]);

  const rememberRepo = (o: string, r: string, b: string) => {
    setSavedRepos((prev) => {
      const filtered = prev.filter((x) => !(x.owner === o && x.repo === r));
      const next: SavedRepo[] = [
        { owner: o, repo: r, branch: b, savedAt: new Date().toISOString() },
        ...filtered,
      ].slice(0, 12);
      localStorage.setItem(REPOS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const analyze = useCallback(
    async (o: string, r: string, requestedBranch?: string) => {
      setLoading(true);
      setError("");
      setTree(null);
      setSelected(null);
      setFileContent("");
      setFileError("");

      try {
        let targetBranch = requestedBranch;

        if (!targetBranch) {
          const repoRes = await fetch(
            `https://api.github.com/repos/${o}/${r}`,
            { headers: ghHeaders() }
          );
          if (!repoRes.ok) {
            throw new Error(
              repoRes.status === 404
                ? "リポジトリが見つかりません（private の場合はトークンが必要です）"
                : `リポジトリ情報の取得に失敗しました (HTTP ${repoRes.status})`
            );
          }
          const repoData = await repoRes.json();
          targetBranch = repoData.default_branch || "main";
        }

        const treeRes = await fetch(
          `https://api.github.com/repos/${o}/${r}/git/trees/${targetBranch}?recursive=1`,
          { headers: ghHeaders() }
        );
        if (!treeRes.ok) {
          if (treeRes.status === 403) {
            throw new Error(
              "GitHub API のレート制限に達した可能性があります。トークンを設定してください。"
            );
          }
          throw new Error(`ツリーの取得に失敗しました (HTTP ${treeRes.status})`);
        }
        const treeData = await treeRes.json();
        const entries: GitTreeEntry[] = (treeData.tree || []).map(
          (e: GitTreeEntry) => ({
            path: e.path,
            type: e.type,
            size: e.size,
            sha: e.sha,
          })
        );

        const built = buildTree(entries);

        setOwner(o);
        setRepo(r);
        setBranch(targetBranch!);
        setTree(built);
        // 第一階層は開いておく
        setExpanded(new Set(built.children.filter((c) => c.type === "tree").map((c) => c.path)));
        loadNotes(o, r);
        rememberRepo(o, r, targetBranch!);

        if (treeData.truncated) {
          setError(
            "⚠️ ファイル数が多くツリーが一部省略されています（GitHub API の制限）。"
          );
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "解析に失敗しました");
      } finally {
        setLoading(false);
      }
    },
    [ghHeaders, loadNotes]
  );

  const handleAnalyze = () => {
    const parsed = parseRepoInput(input);
    if (!parsed) {
      setError("リポジトリの形式が不正です（例: owner/repo または GitHub URL）");
      return;
    }
    analyze(parsed.owner, parsed.repo, parsed.branch);
  };

  const selectNode = async (node: TreeNode) => {
    setSelected(node);
    setFileContent("");
    setFileError("");

    if (node.type !== "blob") return;
    if (isLikelyBinary(node.path)) {
      setFileError("バイナリ/ロックファイルのためプレビューは表示しません。");
      return;
    }
    if ((node.size || 0) > 500_000) {
      setFileError("ファイルが大きいためプレビューを省略しました（500KB 超）。");
      return;
    }

    setFileLoading(true);
    try {
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(
          node.path
        ).replace(/%2F/g, "/")}?ref=${branch}`,
        { headers: ghHeaders() }
      );
      if (!res.ok) {
        throw new Error(`ファイル取得に失敗しました (HTTP ${res.status})`);
      }
      const data = await res.json();
      if (data.content) {
        setFileContent(decodeBase64Utf8(data.content));
      } else {
        setFileError("内容を取得できませんでした。");
      }
    } catch (e) {
      setFileError(e instanceof Error ? e.message : "ファイル取得に失敗しました");
    } finally {
      setFileLoading(false);
    }
  };

  const toggleExpand = (path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const noteCount = Object.keys(notes).length;

  // 検索でマッチするパスを含むノードのみ残す（祖先は保持）
  const matchesSearch = useCallback(
    (node: TreeNode): boolean => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      if (node.path.toLowerCase().includes(q)) return true;
      return node.children.some(matchesSearch);
    },
    [search]
  );

  const deleteSavedRepo = (o: string, r: string) => {
    setSavedRepos((prev) => {
      const next = prev.filter((x) => !(x.owner === o && x.repo === r));
      localStorage.setItem(REPOS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const TreeView = ({ node, depth }: { node: TreeNode; depth: number }) => {
    if (!matchesSearch(node)) return null;
    const isFolder = node.type === "tree";
    const isOpen = expanded.has(node.path) || (!!search.trim() && isFolder);
    const isSelected = selected?.path === node.path;
    const hasNote = !!notes[node.path];

    return (
      <div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer text-sm ${
            isSelected ? "bg-indigo-100 text-indigo-800" : "hover:bg-gray-100 text-gray-700"
          }`}
          style={{ paddingLeft: `${depth * 14 + 8}px` }}
          onClick={() => {
            if (isFolder) toggleExpand(node.path);
            selectNode(node);
          }}
        >
          {isFolder ? (
            <span className="text-gray-400 w-3">{isOpen ? "▼" : "▶"}</span>
          ) : (
            <span className="w-3" />
          )}
          <span>{isFolder ? "📁" : "📄"}</span>
          <span className="truncate flex-1">{node.name}</span>
          {hasNote && <span title="メモあり">📝</span>}
        </div>
        {isFolder && isOpen &&
          node.children.map((child) => (
            <TreeView key={child.path} node={child} depth={depth + 1} />
          ))}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">GitHub リポジトリ解析</h2>
      <p className="text-gray-600 mb-6">
        他人のリポジトリのフォルダ・ファイル構成を読み解き、それぞれの役割を自分用メモとして整理できます。
      </p>

      {/* 入力フォーム */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            placeholder="owner/repo または https://github.com/owner/repo"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? "解析中..." : "解析する"}
          </button>
        </div>

        <button
          onClick={() => setShowTokenSettings(!showTokenSettings)}
          className="mt-3 text-sm text-gray-500 hover:text-gray-700"
        >
          {showTokenSettings ? "▼" : "▶"} アクセストークン設定（private・レート制限緩和）
        </button>
        {showTokenSettings && (
          <div className="mt-3 p-4 bg-gray-50 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GitHub Personal Access Token（任意・端末内 localStorage に保存）
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_..."
                className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => {
                  localStorage.setItem(TOKEN_KEY, token.trim());
                  setShowTokenSettings(false);
                }}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 text-sm"
              >
                保存
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              未設定の場合は public リポジトリのみ・1時間あたり60回までの制限があります。
            </p>
          </div>
        )}

        {/* 履歴 */}
        {savedRepos.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 mb-2">最近解析したリポジトリ</p>
            <div className="flex flex-wrap gap-2">
              {savedRepos.map((r) => (
                <span
                  key={`${r.owner}/${r.repo}`}
                  className="group inline-flex items-center gap-1 bg-gray-100 hover:bg-indigo-50 rounded-full pl-3 pr-1 py-1 text-xs"
                >
                  <button
                    onClick={() => {
                      setInput(`${r.owner}/${r.repo}`);
                      analyze(r.owner, r.repo, r.branch);
                    }}
                    className="text-gray-700"
                  >
                    {r.owner}/{r.repo}
                  </button>
                  <button
                    onClick={() => deleteSavedRepo(r.owner, r.repo)}
                    className="text-gray-400 hover:text-red-500 px-1"
                    title="履歴から削除"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-amber-50 border border-amber-300 text-amber-800 px-4 py-3 rounded-lg text-sm mb-6">
          {error}
        </div>
      )}

      {/* 解析結果 */}
      {tree && (
        <>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-800">
              {owner}/{repo}
              <span className="ml-2 text-sm font-normal text-gray-500">
                branch: {branch}
              </span>
            </h3>
            <span className="text-sm text-gray-500">メモ: {noteCount}件</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 左: ファイルツリー */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-3 border-b border-gray-200 bg-gray-50">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ファイル名で絞り込み..."
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="p-2 max-h-[70vh] overflow-y-auto">
                {tree.children.map((child) => (
                  <TreeView key={child.path} node={child} depth={0} />
                ))}
              </div>
            </div>

            {/* 右: 詳細・メモ・プレビュー */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              {!selected ? (
                <div className="p-8 text-center text-gray-400 text-sm">
                  左のツリーからフォルダ・ファイルを選択してください
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{selected.type === "tree" ? "📁" : "📄"}</span>
                      <span className="font-mono text-sm text-gray-800 break-all">
                        {selected.path}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-block px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded">
                        推定: {guessRole(selected)}
                      </span>
                      {selected.type === "blob" && selected.size !== undefined && (
                        <span className="text-xs text-gray-400">
                          {(selected.size / 1024).toFixed(1)} KB
                        </span>
                      )}
                    </div>
                  </div>

                  {/* メモ */}
                  <div className="p-4 border-b border-gray-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      📝 自分用メモ（この{selected.type === "tree" ? "フォルダ" : "ファイル"}の役割）
                    </label>
                    <textarea
                      value={notes[selected.path] || ""}
                      onChange={(e) => saveNote(selected.path, e.target.value)}
                      placeholder="例: ここで認証トークンを検証して未ログインなら /login にリダイレクトしている"
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
                    />
                    <p className="text-xs text-gray-400 mt-1">入力内容は自動保存されます</p>
                  </div>

                  {/* プレビュー */}
                  {selected.type === "blob" && (
                    <div className="flex-1 overflow-hidden flex flex-col">
                      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600">
                        ソースプレビュー
                      </div>
                      <div className="overflow-auto max-h-[35vh]">
                        {fileLoading ? (
                          <div className="p-4 text-sm text-gray-400">読み込み中...</div>
                        ) : fileError ? (
                          <div className="p-4 text-sm text-gray-500">{fileError}</div>
                        ) : (
                          <pre className="p-4 text-xs text-gray-800 whitespace-pre-wrap break-words font-mono">
                            {fileContent}
                          </pre>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* メモ一覧 */}
          {noteCount > 0 && (
            <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h4 className="font-semibold text-gray-800">📋 メモ一覧（{noteCount}件）</h4>
              </div>
              <div className="divide-y divide-gray-100">
                {Object.entries(notes).map(([path, note]) => (
                  <div key={path} className="p-4 hover:bg-gray-50">
                    <p className="font-mono text-xs text-indigo-700 break-all mb-1">{path}</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
