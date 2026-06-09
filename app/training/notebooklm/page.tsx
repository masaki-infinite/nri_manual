import Link from "next/link";

const features = [
  {
    icon: "📄",
    title: "ソースアップロード",
    body: "PDF・Google ドキュメント・ウェブページ・YouTube 動画・音声ファイルなど最大 50 ソースをノートブックに追加。NotebookLM がソースを読み込んだ上で回答するため、ハルシネーションを大幅に抑制できる。",
  },
  {
    icon: "💬",
    title: "根拠付き Q&A",
    body: "アップロードしたソースだけを参照して回答し、回答に使用した出典ページを引用表示する。「この仕様書のどこに書いてある？」という確認作業に最適。",
  },
  {
    icon: "🎙️",
    title: "Audio Overview（音声概要）",
    body: "アップロードしたドキュメントを 2 人の AI ホストがポッドキャスト形式で解説する音声ファイルを自動生成。移動中や流し聞きでのインプットに活用できる。",
  },
  {
    icon: "📝",
    title: "ノート生成",
    body: "FAQ・学習ガイド・目次・ブリーフィングドキュメントなどを 1 クリックで自動生成。提案書や勉強会資料のたたき台として活用可能。",
  },
  {
    icon: "🔗",
    title: "共有・コラボレーション",
    body: "ノートブックを URL で共有でき、チームで同じソースを参照しながら議論できる。Google Workspace アカウントで利用可能。",
  },
];

const useCases = [
  {
    scene: "提案書作成前の情報収集",
    how: "競合製品ドキュメント・公開仕様書・技術ブログを複数まとめてアップロード → 「Snowflake と Databricks の主な違いを教えて」のように横断的に質問",
  },
  {
    scene: "RFP・仕様書の読み込み",
    how: "入札説明書・仕様書 PDF をアップロード → 「必須要件の一覧を表にして」「スケジュールを整理して」で要点を素早く抽出",
  },
  {
    scene: "勉強会資料の事前学習",
    how: "勉強会の PDF 資料を登録 → Audio Overview で音声生成して通勤中にインプット。本番は疑問点だけ深掘り",
  },
  {
    scene: "議事録・会議メモの整理",
    how: "会議の文字起こしテキストをアップロード → アクションアイテム・決定事項をまとめさせる",
  },
];

const comparison = [
  { item: "参照範囲", notebooklm: "アップロードしたソースのみ", chatgpt: "学習データ全般（RAG なしの場合）" },
  { item: "ハルシネーション", notebooklm: "低（ソース外の情報は回答しない）", chatgpt: "比較的高い" },
  { item: "引用表示", notebooklm: "ページ単位で表示", chatgpt: "なし（標準）" },
  { item: "音声概要", notebooklm: "あり（自動生成）", chatgpt: "なし" },
  { item: "料金", notebooklm: "無料（Google アカウント）/ NotebookLM Plus は有料", chatgpt: "無料〜 $20/月" },
  { item: "ソース数上限", notebooklm: "最大 50 ソース / ノートブック", chatgpt: "ファイル添付は都度" },
];

export default function NotebookLMPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">📓</span>
          <h2 className="text-3xl font-bold">Google NotebookLM</h2>
        </div>
        <p className="text-blue-100 text-lg">
          アップロードしたドキュメントを根拠に回答する Google の AI リサーチアシスタント
        </p>
        <div className="flex gap-3 mt-4 flex-wrap">
          {["Google 提供", "無料（基本機能）", "ソース根拠付き回答", "音声概要生成"].map((t) => (
            <span key={t} className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">{t}</span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">主な機能</h3>
        <div className="grid grid-cols-1 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-white border border-gray-200 rounded-lg p-5 flex gap-4">
              <span className="text-3xl flex-shrink-0">{f.icon}</span>
              <div>
                <div className="font-semibold text-gray-800 mb-1">{f.title}</div>
                <div className="text-sm text-gray-600 leading-relaxed">{f.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">業務活用シーン</h3>
        <div className="grid grid-cols-2 gap-4">
          {useCases.map((u) => (
            <div key={u.scene} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="font-semibold text-blue-800 mb-2">📌 {u.scene}</div>
              <div className="text-sm text-gray-700 leading-relaxed">{u.how}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">ChatGPT との比較</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">項目</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">NotebookLM</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-semibold">ChatGPT</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={row.item} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-200 px-4 py-2 font-medium text-gray-700">{row.item}</td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-600">{row.notebooklm}</td>
                  <td className="border border-gray-200 px-4 py-2 text-gray-600">{row.chatgpt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
        <h4 className="font-semibold text-amber-800 mb-2">⚠️ 利用時の注意点</h4>
        <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
          <li>アップロードしたデータは Google のサーバーに送信される。機密情報・個人情報を含む資料のアップロードは社内ポリシーを確認すること</li>
          <li>ソース外の情報は回答しないため、汎用的な知識が必要な質問には不向き</li>
          <li>Audio Overview は英語生成が主流で、日本語は品質にばらつきがある（2025 年時点）</li>
          <li>NotebookLM Plus（有料）ではソース数上限拡張・カスタム音声・チーム共有の強化が利用可能</li>
        </ul>
      </div>
    </div>
  );
}
