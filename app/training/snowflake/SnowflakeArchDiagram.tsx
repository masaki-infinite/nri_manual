function HArrow({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center px-1 shrink-0 ${className}`}>
      <div className="flex items-center gap-0.5 text-sky-600">
        <span className="text-[10px]">━</span>
        <span className="text-sm font-bold">▶</span>
      </div>
      {label ? (
        <div className="text-[8px] text-sky-800 font-medium whitespace-nowrap mt-0.5 text-center leading-tight">
          {label}
        </div>
      ) : null}
    </div>
  );
}

function BiArrow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-0.5 shrink-0">
      <div className="text-sky-600 text-xs font-bold">⇄</div>
      <div className="text-[7px] text-sky-800 font-medium whitespace-nowrap text-center leading-tight max-w-[52px]">
        {label}
      </div>
    </div>
  );
}

function VArrow({ label, dashed }: { label: string; dashed?: boolean }) {
  return (
    <div className="flex flex-col items-center py-0.5">
      <div className={`w-px h-3 ${dashed ? "border-l border-dashed border-sky-400" : "bg-sky-500"}`} />
      <div className="text-sky-600 text-[10px] font-bold leading-none">▼</div>
      <div className="text-[7px] text-sky-800 font-medium text-center leading-tight px-1">{label}</div>
    </div>
  );
}

function Cylinder({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-7 relative">
        <div className="absolute inset-x-0 top-0 h-2 bg-sky-200 border border-sky-400 rounded-[50%]" />
        <div className="absolute inset-x-0 top-1 bottom-0 bg-sky-50 border-x border-b border-sky-400 rounded-b-sm" />
      </div>
      <div className="text-[7px] font-mono font-semibold text-sky-900 mt-0.5 text-center">{label}</div>
      {sub ? <div className="text-[6px] text-sky-700 text-center">{sub}</div> : null}
    </div>
  );
}

function TableIcon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-9 h-7 border border-slate-400 bg-white rounded-sm overflow-hidden">
        <div className="h-2 bg-slate-200 border-b border-slate-400" />
        <div className="grid grid-cols-3 gap-px p-px">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-1 bg-slate-100" />
          ))}
        </div>
      </div>
      <div className="text-[7px] font-mono text-slate-800 mt-0.5">{label}</div>
    </div>
  );
}

function DocIcon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-6 h-7 border border-slate-400 bg-white rounded-sm flex items-end justify-center pb-0.5">
        <div className="w-3 h-3 bg-slate-100 border border-slate-300" />
      </div>
      <div className="text-[7px] font-mono text-slate-800 mt-0.5">{label}</div>
    </div>
  );
}

function WarehouseIcon({ size }: { size: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="w-12 h-8 border-2 border-emerald-500 bg-emerald-50 rounded flex items-center justify-center">
        <span className="text-[8px] font-bold text-emerald-800">WH</span>
      </div>
      <div className="text-[7px] font-mono font-semibold text-emerald-900">{size}</div>
    </div>
  );
}

export default function SnowflakeArchDiagram() {
  return (
    <div className="rounded-2xl border-2 border-sky-300 bg-gradient-to-b from-sky-50/80 to-white p-4 md:p-6 shadow-sm">
      <div className="text-center mb-4">
        <h3 className="text-base md:text-lg font-bold text-sky-900">
          Snowflake におけるウェアハウス・テーブル・ステージ等の関係図
        </h3>
        <p className="text-xs text-sky-800 mt-1">
          コンピューティング（ウェアハウス）とストレージが分離されたアーキテクチャ
        </p>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-[920px] text-[10px] flex flex-col">
          {/* 上段: クライアント → ウェアハウス → データベース */}
          <div className="flex items-stretch gap-0 shrink-0">
            {/* クライアント / ツール */}
            <div className="w-[148px] shrink-0 border-2 border-blue-400 bg-blue-50/60 rounded-lg p-2.5">
              <div className="font-bold text-blue-900 text-[10px] mb-2 text-center border-b border-blue-200 pb-1">
                クライアント / ツール
              </div>
              <ul className="space-y-1.5 text-[8px] text-blue-900 leading-snug">
                <li className="bg-white/80 border border-blue-200 rounded px-1.5 py-1">Web UI（Snowsight）</li>
                <li className="bg-white/80 border border-blue-200 rounded px-1.5 py-1">SQL Client（JDBC / ODBC）</li>
                <li className="bg-white/80 border border-blue-200 rounded px-1.5 py-1">Snowflake Connector</li>
                <li className="bg-white/80 border border-blue-200 rounded px-1.5 py-1">Python / Spark 等</li>
              </ul>
              <div className="mt-2 text-[7px] text-blue-700 bg-blue-100/60 rounded px-1.5 py-1 leading-snug">
                例: Next.js BFF（snowflake-sdk）・snow sql・Terraform
              </div>
            </div>

            <HArrow label="SQL 実行（接続）" />

            {/* ウェアハウス（コンピューティング） */}
            <div className="w-[168px] shrink-0 border-2 border-emerald-500 bg-emerald-50/50 rounded-lg p-2.5">
              <div className="font-bold text-emerald-900 text-[10px] mb-2 text-center border-b border-emerald-200 pb-1">
                ウェアハウス
                <div className="text-[8px] font-normal text-emerald-700">（コンピューティング）</div>
              </div>
              <div className="flex justify-around items-end mb-2 px-1">
                <WarehouseIcon size="X-Small" />
                <WarehouseIcon size="Medium" />
                <WarehouseIcon size="Large" />
              </div>
              <div className="text-[7px] text-center text-emerald-800 font-mono mb-1.5">WAREHOUSE_A … WAREHOUSE_N</div>
              <ul className="space-y-0.5 text-[7px] text-emerald-900 leading-snug">
                <li>・クエリ実行・データ処理・変換</li>
                <li>・必要時のみ起動（停止で課金停止）</li>
                <li>・複数 WH が同一データを並列参照可</li>
              </ul>
              <div className="mt-2 text-[7px] text-emerald-800 bg-white/70 border border-emerald-200 rounded px-1.5 py-1">
                例: SEARCH_WH / TRANSFORM_WH
              </div>
            </div>

            <BiArrow label="クエリ実行・メタデータ参照" />

            {/* データベース（メタデータ管理） */}
            <div className="flex-1 min-w-[520px] border-2 border-sky-400 bg-sky-50/30 rounded-lg p-2.5">
              <div className="font-bold text-sky-900 text-[10px] mb-2 text-center">
                データベース（メタデータ管理）
              </div>
              <div className="grid grid-cols-4 gap-2">
                {/* データベース列 */}
                <div className="border border-sky-300 bg-white/80 rounded-lg p-2">
                  <div className="text-[8px] font-bold text-sky-900 text-center mb-2 border-b border-sky-100 pb-1">
                    データベース
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Cylinder label="DB_A" />
                    <Cylinder label="DB_B" />
                    <Cylinder label="DB_N" sub="…" />
                  </div>
                  <div className="text-[7px] text-sky-800 mt-2 text-center">論理 DB の単位</div>
                </div>

                {/* スキーマ列 */}
                <div className="border border-sky-300 bg-white/80 rounded-lg p-2">
                  <div className="text-[8px] font-bold text-sky-900 text-center mb-2 border-b border-sky-100 pb-1">
                    スキーマ
                  </div>
                  <div className="space-y-1">
                    {["SCHEMA_1", "SCHEMA_2", "SCHEMA_N"].map((s) => (
                      <div key={s} className="text-[7px] font-mono bg-sky-50 border border-sky-200 rounded px-1.5 py-0.5 text-center">
                        {s}
                      </div>
                    ))}
                  </div>
                  <div className="text-[7px] text-sky-800 mt-2 text-center">テーブル・Stage の名前空間</div>
                </div>

                {/* テーブル等 */}
                <div className="border border-sky-300 bg-white/80 rounded-lg p-2">
                  <div className="text-[8px] font-bold text-sky-900 text-center mb-2 border-b border-sky-100 pb-1">
                    テーブルなど
                    <div className="font-normal text-[7px]">（データオブジェクト）</div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mb-1">
                    <TableIcon label="TABLE_1" />
                    <TableIcon label="TABLE_2" />
                    <TableIcon label="TABLE_N" />
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mb-1">
                    <DocIcon label="VIEW_1" />
                    <DocIcon label="VIEW_2" />
                  </div>
                  <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                      <Cylinder label="MV_1" sub="Materialized View" />
                    </div>
                  </div>
                  <div className="text-[6px] text-slate-600 text-center mt-1.5 leading-snug">
                    Sequences / Functions / Stored Procedures
                  </div>
                </div>

                {/* ステージ */}
                <div className="border border-amber-300 bg-amber-50/50 rounded-lg p-2">
                  <div className="text-[8px] font-bold text-amber-900 text-center mb-2 border-b border-amber-100 pb-1">
                    ステージ（Stage）
                  </div>
                  <div className="space-y-1">
                    {[
                      { n: "@~", d: "User Stage" },
                      { n: "@%DB_A", d: "Database Stage" },
                      { n: "@%DB_A.SCHEMA_1", d: "Schema Stage" },
                      { n: "@mystage", d: "Named Stage" },
                    ].map((s) => (
                      <div key={s.n} className="bg-white border border-amber-200 rounded px-1.5 py-1">
                        <div className="font-mono font-bold text-[7px] text-amber-900">{s.n}</div>
                        <div className="text-[6px] text-amber-800">{s.d}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-[6px] text-amber-800 mt-1.5 leading-snug">
                    一時ファイル置き場・COPY INTO の入出力・非構造化データ取込
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 下段: 縦矢印 + ストレージ（DB 列と揃える） */}
          <div className="flex items-stretch gap-0 shrink-0">
            <div className="w-[148px] shrink-0" />
            <div className="w-[52px] shrink-0" />
            <div className="w-[168px] shrink-0" />
            <div className="w-[52px] shrink-0" />
            <div className="flex-1 min-w-[520px] flex flex-col items-center">
              <div className="flex gap-12 mb-0.5">
                <VArrow label="データの読み書き（クエリ実行時）" />
                <VArrow label="メタデータの管理（定義情報の保存）" dashed />
              </div>
              <div className="w-full border-2 border-indigo-400 bg-indigo-50/40 rounded-lg p-3">
            <div className="font-bold text-indigo-900 text-[10px] text-center mb-2">
              ストレージ（Snowflake 管理の共有ストレージ）
            </div>
            <div className="flex flex-col md:flex-row gap-3 items-stretch">
              <div className="flex items-center justify-center gap-3 md:w-[200px] shrink-0">
                <div className="text-center">
                  <div className="text-lg">☁️</div>
                  <div className="text-[7px] font-semibold text-indigo-800">AWS S3</div>
                </div>
                <div className="text-center">
                  <div className="text-lg">☁️</div>
                  <div className="text-[7px] font-semibold text-indigo-800">Azure Blob</div>
                </div>
                <div className="text-center">
                  <div className="text-lg">☁️</div>
                  <div className="text-[7px] font-semibold text-indigo-800">GCS</div>
                </div>
              </div>
              <div className="flex-1 text-[8px] text-indigo-900 leading-relaxed">
                <p className="mb-1.5">
                  クラウドストレージ上に<span className="font-semibold">暗号化して保存</span>。
                  ユーザーは S3 バケットを直接触らず、Snowflake が一元管理します。
                </p>
                <div className="font-semibold text-indigo-800 mb-1">保存される主なデータ</div>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                  <li>・テーブルデータ（マイクロパーティション）</li>
                  <li>・ステージ上のファイル</li>
                  <li>・クエリ結果（結果キャッシュ等）</li>
                  <li>・メタデータ（定義情報・統計情報）</li>
                </ul>
              </div>
            </div>
            <div className="mt-2 text-[7px] text-indigo-800 bg-white/60 border border-indigo-200 rounded px-2 py-1 text-center">
              例: 国内リージョン — 文書 PDF・チャンク・ベクトル索引をクラウドストレージに蓄積
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ポイント & 凡例 */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <div className="font-bold text-amber-900 text-sm mb-2">💡 ポイント</div>
          <ul className="space-y-1 text-[11px] text-gray-700 leading-relaxed">
            <li>1. ウェアハウス（コンピューティング）とストレージは<span className="font-semibold">完全に分離</span>されている</li>
            <li>2. 複数のウェアハウスが<span className="font-semibold">同じデータ（テーブル・ステージ）に同時アクセス</span>できる</li>
            <li>3. スケールはウェアハウス単位。データは共有ストレージ上で<span className="font-semibold">一元管理</span>される</li>
          </ul>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <div className="font-bold text-slate-800 text-sm mb-2">凡例</div>
          <div className="space-y-1.5 text-[11px] text-gray-700">
            <div className="flex items-center gap-2">
              <span className="w-4 h-3 border-2 border-sky-400 rounded-sm shrink-0" />
              <span>青枠 — メタデータ管理領域（Database / Schema / Table / Stage）</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-3 border-2 border-emerald-500 rounded-sm shrink-0" />
              <span>緑枠 — コンピューティング（仮想ウェアハウス）</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-3 border-2 border-indigo-400 rounded-sm shrink-0" />
              <span>紫枠 — 物理ストレージ（Snowflake 管理のクラウドストレージ）</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
