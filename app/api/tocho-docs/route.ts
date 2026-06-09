import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextRequest } from "next/server";

const ALLOWED_FILES: Record<string, string[]> = {
  "33314827_仕様書.pdf": ["spec", "original", "33314827_仕様書.pdf"],
  "33314827_仕様書別紙1.pdf": ["spec", "original", "33314827_仕様書別紙１.pdf"],
  "33314827_仕様書別紙１.pdf": ["spec", "original", "33314827_仕様書別紙１.pdf"],
  "33314827_入札説明書.pdf": ["spec", "original", "33314827_入札説明書.pdf"],
  "33314827_総合評価資料.pdf": ["spec", "original", "33314827_総合評価資料.pdf"],
};

function resolveTochoRoot() {
  // nri_manual と同階層の tocho-geospatial-platform を参照する。
  return path.resolve(process.cwd(), "..", "tocho-geospatial-platform");
}

export async function GET(request: NextRequest) {
  const fileName = request.nextUrl.searchParams.get("file") || "";
  const relativeParts = ALLOWED_FILES[fileName];

  if (!relativeParts) {
    return new Response("Unsupported file", { status: 400 });
  }

  const absPath = path.join(resolveTochoRoot(), ...relativeParts);

  try {
    const data = await readFile(absPath);
    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(fileName)}`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("File not found", { status: 404 });
  }
}
