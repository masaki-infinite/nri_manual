function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-1 shrink-0">
      <div className="text-gray-400 text-lg font-bold">→</div>
      {label ? <div className="text-[9px] text-gray-500 whitespace-nowrap mt-0.5">{label}</div> : null}
    </div>
  );
}

function DownArrow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="text-blue-500 text-sm font-bold">↓</div>
      <div className="text-[9px] text-blue-600 font-medium">{label}</div>
    </div>
  );
}

export default function HostedFeatureLayerDiagram() {
  const features = [
    { title: "簡単な公開・共有", body: "データをアップロードするだけで Web 公開" },
    { title: "標準 API 連携", body: "REST API で各種アプリ・システムと接続" },
    { title: "セキュアな運用", body: "アクセス制御・暗号化で安全に管理" },
    { title: "高い拡張性", body: "大規模データ・高トラフィックに対応" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 md:p-6">
      <div className="text-center mb-4">
        <h4 className="text-base md:text-lg font-bold text-slate-800">
          Hosted Feature Layer（ホストされたフィーチャレイヤ）構成図
        </h4>
        <p className="text-[11px] md:text-xs text-slate-500 mt-1 leading-relaxed">
          地理データ（点・線・面）と属性を Portal 経由で ArcGIS Enterprise 上にホストし、REST API 経由で Maps SDK から利用
        </p>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex items-stretch gap-0 min-w-[720px] text-[10px]">
          {/* 左: データ作成・管理 */}
          <div className="w-[200px] shrink-0 flex flex-col">
            <div className="text-center font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 rounded-t-lg px-2 py-1.5">
              データ作成・管理
            </div>
            <div className="flex-1 border border-emerald-200 border-t-0 rounded-b-lg bg-emerald-50/80 p-3 space-y-3">
              <div>
                <div className="font-semibold text-emerald-900 mb-1.5">地理データ（ジオメトリ）</div>
                <div className="flex gap-2 justify-center">
                  {[
                    { icon: "📍", label: "点" },
                    { icon: "〰️", label: "線" },
                    { icon: "⬡", label: "面" },
                  ].map((g) => (
                    <div
                      key={g.label}
                      className="bg-white border border-emerald-200 rounded-lg px-2 py-1.5 text-center min-w-[48px]"
                    >
                      <div className="text-base">{g.icon}</div>
                      <div className="text-[9px] text-emerald-800">{g.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-semibold text-emerald-900 mb-1">属性データ（例）</div>
                <div className="bg-white border border-emerald-200 rounded text-[8px] overflow-hidden">
                  <div className="grid grid-cols-2 bg-emerald-100 font-semibold text-emerald-900">
                    <div className="px-1.5 py-0.5 border-r border-emerald-200">施設名</div>
                    <div className="px-1.5 py-0.5">住所</div>
                  </div>
                  <div className="grid grid-cols-2 border-t border-emerald-100 text-gray-600">
                    <div className="px-1.5 py-0.5 border-r border-emerald-100">○○避難所</div>
                    <div className="px-1.5 py-0.5">○○区…</div>
                  </div>
                  <div className="grid grid-cols-2 border-t border-emerald-100 text-gray-600">
                    <div className="px-1.5 py-0.5 border-r border-emerald-100">収容人数</div>
                    <div className="px-1.5 py-0.5">災害種別</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/70 border border-emerald-200 rounded-lg px-2 py-1.5">
                <span className="text-lg">🖥️</span>
                <span className="text-[9px] text-emerald-800 leading-snug">ArcGIS Pro 等で作成・更新</span>
              </div>
            </div>
          </div>

          <Arrow label="作成・更新" />

          {/* 中央: Portal + ArcGIS Enterprise */}
          <div className="w-[240px] shrink-0 flex flex-col">
            <div className="text-center font-bold text-violet-800 bg-violet-100 border border-violet-300 rounded-t-lg px-2 py-1.5">
              ArcGIS Enterprise
            </div>
            <div className="flex-1 border border-violet-200 border-t-0 rounded-b-lg bg-violet-50/80 p-3">
              <div className="bg-amber-50 border border-amber-300 rounded px-1.5 py-1 mb-1.5 text-center">
                <div className="font-semibold text-amber-900 text-[8px]">Portal for ArcGIS</div>
                <div className="text-amber-800 text-[7px]">認証・共有・カタログ</div>
              </div>
              <div className="bg-white border-2 border-violet-400 rounded-lg p-2 mb-2">
                <div className="font-bold text-blue-900 text-center text-[11px] mb-1">
                  Hosted Feature Layer
                </div>
                <div className="flex gap-1 justify-center mb-1">
                  <div className="w-8 h-6 bg-teal-200 border border-teal-400 rounded-sm" title="レイヤ" />
                  <div className="w-8 h-6 bg-sky-200 border border-sky-400 rounded-sm" />
                  <div className="w-8 h-6 bg-indigo-200 border border-indigo-400 rounded-sm" />
                </div>
                <div className="text-[8px] text-center text-gray-500">属性テーブル（OBJECTID, 施設名…）</div>
              </div>
              <ul className="space-y-1 text-[9px] text-violet-900 mb-2">
                <li className="flex gap-1"><span>🏢</span><span>社内インフラにホスト（閉域）</span></li>
                <li className="flex gap-1"><span>📈</span><span>Server + Data Store で配信</span></li>
                <li className="flex gap-1"><span>🔄</span><span>Pro からの共有を Portal が受付</span></li>
              </ul>
              <DownArrow label="公開・ホスト" />
              <div className="bg-violet-600 text-white rounded-lg px-2 py-2 text-center">
                <div className="font-bold text-[10px]">ArcGIS REST API</div>
                <div className="text-[8px] text-blue-100 mt-0.5">HTTPS / REST（Query・Feature Service）</div>
              </div>
            </div>
          </div>

          <Arrow label="REST API" />

          {/* 右: Web アプリ */}
          <div className="w-[200px] shrink-0 flex flex-col">
            <div className="text-center font-bold text-violet-800 bg-violet-100 border border-violet-300 rounded-t-lg px-2 py-1.5">
              Web アプリ / Maps SDK で利用
            </div>
            <div className="flex-1 border border-violet-200 border-t-0 rounded-b-lg bg-violet-50/80 p-3 space-y-2">
              <div className="bg-white border border-violet-200 rounded-lg p-2 text-center">
                <div className="text-[9px] font-semibold text-violet-900 mb-1">Web アプリケーション</div>
                <div className="text-[8px] text-gray-500 mb-1">例: Next.js</div>
                <div className="h-12 bg-gradient-to-br from-sky-100 to-emerald-100 border border-gray-200 rounded flex items-center justify-center text-lg">
                  🗺️
                </div>
              </div>
              <div className="bg-white border border-violet-200 rounded-lg p-2 text-center">
                <div className="text-[9px] font-semibold text-violet-900">Maps SDK for JavaScript</div>
                <div className="text-[8px] text-gray-500 mt-0.5">{`FeatureLayer({ url })`}</div>
              </div>
              <div className="bg-violet-100 border border-violet-200 rounded-lg p-2">
                <div className="text-[9px] font-semibold text-violet-900 mb-1">利用者（職員・関係者）</div>
                <ul className="text-[8px] text-violet-800 space-y-0.5">
                  <li>・地図の閲覧・操作</li>
                  <li>・検索・フィルタ</li>
                  <li>・情報確認・分析</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-center"
          >
            <div className="text-[10px] font-bold text-slate-800">{f.title}</div>
            <div className="text-[9px] text-slate-500 mt-0.5 leading-snug">{f.body}</div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-slate-400 text-center mt-3">
        典型構成：Pro → Portal → Enterprise（Hosted Feature Layer）→ Maps SDK。Snowflake 経由は不要
      </p>
    </div>
  );
}
