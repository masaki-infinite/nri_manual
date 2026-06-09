import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Entry = {
  path: string;
  type: "blob" | "tree";
  size?: number;
  sha: string;
};

const SKIP_DIRS = new Set([
  ".git", "node_modules", ".next", "dist", "build",
  "__pycache__", ".venv", "venv", ".mypy_cache", ".pytest_cache",
]);

function walk(dir: string, base: string, entries: Entry[]) {
  let items: fs.Dirent[];
  try {
    items = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const item of items) {
    const rel = (base ? base + "/" + item.name : item.name);
    if (item.isDirectory()) {
      if (SKIP_DIRS.has(item.name)) continue;
      entries.push({ path: rel, type: "tree", sha: "" });
      walk(path.join(dir, item.name), rel, entries);
    } else if (item.isFile()) {
      let size: number | undefined;
      try { size = fs.statSync(path.join(dir, item.name)).size; } catch {}
      entries.push({ path: rel, type: "blob", size, sha: "" });
    }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dirPath = searchParams.get("path");
  if (!dirPath) {
    return NextResponse.json({ error: "path is required" }, { status: 400 });
  }

  let stat: fs.Stats;
  try {
    stat = fs.statSync(dirPath);
  } catch {
    return NextResponse.json({ error: "ディレクトリが見つかりません" }, { status: 404 });
  }
  if (!stat.isDirectory()) {
    return NextResponse.json({ error: "指定パスはディレクトリではありません" }, { status: 400 });
  }

  const entries: Entry[] = [];
  walk(dirPath, "", entries);
  return NextResponse.json({ entries });
}
