import Link from "next/link";

export default function IdeTrainingPage() {
  return (
    <div>
      <div className="mb-6">
        <Link
          href="/training"
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">IDE 勉強会資料</h2>

      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          AI 開発で利用する主要 IDE / 開発環境の使い方をまとめています。
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">はじめに（基礎編）</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-700">
            <div className="bg-white border border-slate-200 rounded p-3">
              <div className="font-semibold mb-1">1. 目的を決める</div>
              <div>実装支援、レビュー、設計整理など、AI に任せる範囲を最初に明確化します。</div>
            </div>
            <div className="bg-white border border-slate-200 rounded p-3">
              <div className="font-semibold mb-1">2. ルールを固定する</div>
              <div>コーディング規約、命名規則、レビュー観点を先に共有すると出力品質が安定します。</div>
            </div>
            <div className="bg-white border border-slate-200 rounded p-3">
              <div className="font-semibold mb-1">3. 小さく検証する</div>
              <div>大きな変更を一度に依頼せず、差分を小分けにしてテストしながら進めます。</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link href="/training/ide/codex">
            <div className="border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer bg-blue-50/30">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">CodeX</h3>
              <p className="text-gray-600 text-sm">CodeX の特徴、使いどころ、実務での活用ポイントを解説します。</p>
              <div className="mt-4 text-blue-600 text-sm font-medium">資料を見る →</div>
            </div>
          </Link>

          <Link href="/training/ide/antigravity">
            <div className="border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer bg-purple-50/30">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Antigravity</h3>
              <p className="text-gray-600 text-sm">Antigravity の基本機能、ワークフロー設計、導入時の注意点を整理します。</p>
              <div className="mt-4 text-purple-600 text-sm font-medium">資料を見る →</div>
            </div>
          </Link>

          <Link href="/training/ide/cursor">
            <div className="border border-emerald-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer bg-emerald-50/30">
              <div className="text-4xl mb-4">🖱️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cursor</h3>
              <p className="text-gray-600 text-sm">Cursor の実践的な使い方、プロジェクト適用時の運用ルールをまとめています。</p>
              <div className="mt-4 text-emerald-600 text-sm font-medium">資料を見る →</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
