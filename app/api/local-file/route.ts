import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BINARY_EXT = new Set([
  "png", "jpg", "jpeg", "gif", "ico", "webp", "bmp", "pdf",
  "zip", "gz", "tar", "woff", "woff2", "ttf", "eot",
  "mp4", "mp3", "wav", "exe", "bin", "class", "jar", "so", "dll",
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dir = searchParams.get("dir");
  const file = searchParams.get("file");
  if (!dir || !file) {
    return NextResponse.json({ error: "dir and file are required" }, { status: 400 });
  }

  const resolvedDir = path.resolve(dir);
  const resolvedFull = path.resolve(path.join(dir, file));
  if (!resolvedFull.startsWith(resolvedDir + path.sep) && resolvedFull !== resolvedDir) {
    return NextResponse.json({ error: "不正なパスです" }, { status: 403 });
  }

  const ext = file.includes(".") ? file.split(".").pop()!.toLowerCase() : "";
  if (BINARY_EXT.has(ext)) {
    return NextResponse.json({ error: "バイナリファイルのためプレビュー不可" }, { status: 400 });
  }

  let stat: fs.Stats;
  try {
    stat = fs.statSync(resolvedFull);
  } catch {
    return NextResponse.json({ error: "ファイルが見つかりません" }, { status: 404 });
  }
  if (stat.size > 500_000) {
    return NextResponse.json({ error: "ファイルが大きすぎます（500KB 超）" }, { status: 400 });
  }

  try {
    const content = fs.readFileSync(resolvedFull, "utf-8");
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ error: "ファイルの読み込みに失敗しました" }, { status: 500 });
  }
}
