"use client";

import Link from "next/link";
import { useState } from "react";

const SECTIONS = [
  { id: 0, title: "プロジェクトのセットアップ", icon: "🔧" },
  { id: 1, title: "Agentic Workflow とは", icon: "🧠" },
  { id: 2, title: "Auto Healing DevOps", icon: "🔧" },
  { id: 3, title: "ドキュメントの自動更新", icon: "📝" },
  { id: 4, title: "Copilot Web Relay（上級編）", icon: "🚀" },
  { id: 5, title: "設計書の確認と Copilot CLI", icon: "📋" },
  { id: 6, title: "Vibe Coding で実装しよう", icon: "⚡" },
  { id: 7, title: "コードを理解＆改善しよう", icon: "🔍" },
  { id: 8, title: "参考リンク", icon: "🔗" },
];

/* ========================================
   コマンド一覧テーブル用のヘルパー
   ======================================== */
function CmdTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b w-48">コマンド</th>
            <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">説明</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map(([cmd, desc], i) => (
            <tr key={i}>
              <td className="px-4 py-2 font-mono text-indigo-700 text-xs">{cmd}</td>
              <td className="px-4 py-2 text-gray-600">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ========================================
   ターミナル風のプロンプト表示
   ======================================== */
function Prompt({ children }: { children: string }) {
  return (
    <div className="bg-gray-900 text-green-400 rounded-lg p-4 text-sm font-mono whitespace-pre-wrap">
      {children}
    </div>
  );
}

/* ========================================
   各セクション
   ======================================== */
function Section0() {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <p className="text-gray-700 mb-4">このワークショップでは、以下のGitHubリポジトリを使用します。</p>
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <p className="text-sm font-semibold text-gray-600 mb-1">プロジェクトURL</p>
        <a href="https://github.com/NRI-Enablement-Lab/moulongzhang" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 text-sm break-all">
          https://github.com/NRI-Enablement-Lab/moulongzhang
        </a>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
          テンプレートからリポジトリを作成する
        </h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
            <li>プロジェクトURLをブラウザで開く</li>
            <li>右上の <code className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-semibold">Use this template</code> → <strong>Create a new repository</strong> を選択</li>
            <li>テンプレートからの作成が完了すると、あなたのGitHubアカウントに新しいリポジトリが作成されます</li>
          </ol>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
          開発環境のセットアップ
        </h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
            <li>作成したリポジトリのページを開く</li>
            <li>緑色の <code className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-semibold">Code</code> ボタンをクリック</li>
            <li><strong>Codespaces</strong> タブを選択</li>
            <li><code className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-semibold">Create codespace on main</code> をクリック</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <p className="text-gray-700 mb-4">
        Agentic Workflow は、GitHub Actions のワークフロー内で Copilot（AI）を活用し、
        コードの変更に応じた<strong>自律的なタスク</strong>を実行する仕組みです。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-2xl mb-2">🔄</div>
          <h4 className="font-semibold text-gray-800 mb-2">自動検知</h4>
          <p className="text-sm text-gray-600">CI/CDジョブの失敗やコード変更を自動的に検知</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-2xl mb-2">🤖</div>
          <h4 className="font-semibold text-gray-800 mb-2">AI分析</h4>
          <p className="text-sm text-gray-600">Copilotが原因を分析し、修正提案やドキュメント更新を自動実行</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="text-2xl mb-2">⚡</div>
          <h4 className="font-semibold text-gray-800 mb-2">自律的修正</h4>
          <p className="text-sm text-gray-600">Issue作成、Copilotアサイン、ドキュメント同期など全自動化</p>
        </div>
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <p className="text-gray-700 mb-4">CI/CD のジョブが失敗した時にそれらを検知し、修正するワークフローを作成します。</p>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span className="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
          一つ目のプロンプト
        </h4>
        <p className="text-gray-700 text-sm mb-3">Copilot に以下のプロンプトを入力してください：</p>
        <Prompt>{`以下のURLを参照して GitHub Agentic Workflow を作成してください。
https://github.com/github/gh-aw/blob/main/create.md

ワークフローの目的は以下のとおりです：
リポジトリで失敗したワークフロー実行を検知し、原因を分析してIssueを自動作成する。
作成したissueにはCopilotを自動アサインする。`}</Prompt>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span className="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
          二つ目のプロンプト（動作確認）
        </h4>
        <p className="text-gray-700 text-sm mb-3">ワークフローが作成できたら、意図的にビルドを失敗させて動作を確認します：</p>
        <Prompt>{`System.out.println("Hello World!"); を System.out.println("Hell World!"); にして push して`}</Prompt>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
        <p className="text-yellow-800 text-sm flex items-start gap-2">
          <span className="text-lg leading-5">💡</span>
          <span>Push 後、GitHub Actions のワークフローが失敗を検知し、Copilot が自動的に Issue を作成してアサインされることを確認しましょう。</span>
        </p>
      </div>
    </div>
  );
}

function Section3() {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <p className="text-gray-700 mb-4">コードに変更が加わった際に、関連するドキュメントを自動更新するワークフローを作成します。</p>

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span className="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
          プロンプト
        </h4>
        <p className="text-gray-700 text-sm mb-3">Copilot に以下のプロンプトを入力してください：</p>
        <Prompt>{`以下のURLを参照して GitHub Agentic Workflow を作成してください。
https://github.com/github/gh-aw/blob/main/create.md

ワークフローの目的は以下のとおりです：
- copilotWebRelay 配下のコードが更新された時に実行されます
- copilotWebRelay 配下のコードの内容に応じて copilotWebRelay/docs のドキュメンテーションを更新し、ソースコードとドキュメンテーションが常に一致するようにします`}</Prompt>
      </div>
    </div>
  );
}

function Section4() {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <p className="text-gray-700 mb-4">
        ブラウザから GitHub Copilot CLI にアクセスできる Web アプリケーションを構築します。
        事前に用意された設計書を Copilot に読み込ませ、設計書をもとに対話しながら段階的に実装していく
        <strong> Vibe Coding </strong>ワークフローを体験します。
      </p>

      <h4 className="text-lg font-semibold text-gray-800 mb-3">アーキテクチャ概要</h4>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">コンポーネント</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">技術スタック</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 border-b">役割</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr><td className="px-4 py-3 font-medium text-gray-800">Browser</td><td className="px-4 py-3 text-gray-600">React + TypeScript + Vite</td><td className="px-4 py-3 text-gray-600">ターミナル表示（xterm.js）、セッション管理</td></tr>
            <tr><td className="px-4 py-3 font-medium text-gray-800">Backend Server</td><td className="px-4 py-3 text-gray-600">Python (FastAPI) + WebSocket</td><td className="px-4 py-3 text-gray-600">Copilot CLI プロセスの管理、WebSocket ブリッジ</td></tr>
            <tr><td className="px-4 py-3 font-medium text-gray-800">CLI Bridge</td><td className="px-4 py-3 text-gray-600">Python (asyncio + pexpect)</td><td className="px-4 py-3 text-gray-600">Copilot CLI の PTY（疑似端末）制御、入出力のストリーミング</td></tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-2">通信フロー</p>
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Browser</span><span>↔</span>
          <span className="text-gray-400 text-xs">WebSocket（双方向通信）</span><span>↔</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Backend Server</span><span>↔</span>
          <span className="text-gray-400 text-xs">PTY/stdin/stdout</span><span>↔</span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">Copilot CLI</span>
        </div>
      </div>

      <h4 className="text-lg font-semibold text-gray-800 mb-3">開発の進め方</h4>
      <div className="space-y-3 mb-6">
        {[
          ["設計書を確認", "プロジェクトに配布された設計書を確認し、アプリケーションの全体像を理解する"],
          ["GitHub Copilot CLI", "ターミナルで CLI を立ち上げ、問題なく動作することを確認する"],
          ["AI 駆動開発", "設計書を活用し、GitHub Copilot CLI と対話しながら Vibe Coding で実装する"],
        ].map(([title, desc], i) => (
          <div key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
            <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
            <div><p className="font-semibold text-gray-800 text-sm">{title}</p><p className="text-gray-600 text-xs mt-1">{desc}</p></div>
          </div>
        ))}
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-purple-800 text-sm flex items-start gap-2">
          <span className="text-lg leading-5">🎯</span>
          <span><strong>このセクションのポイント:</strong> Copilotのハイエンドモデルを GitHub Copilot の最新機能と組み合わせて利用した時に実現できるタスクの質と量を体感いただくことがゴールです。設計書を事前に用意しておくことで、Copilotに対して「何を作るか」の文脈を明確に伝えられます。</span>
        </p>
      </div>
    </div>
  );
}

function Section5() {
  return (
    <div className="space-y-8">
      {/* 1. 設計書の確認 */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
          設計書の確認
        </h4>
        <p className="text-gray-700 text-sm mb-4">
          プロジェクト内の <code className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded text-xs">copilotWebRelay/planning.md</code> に、Copilot Web Relay の設計書が配布されています。まずはこのファイルを開いて、アプリケーションの全体像を確認しましょう。
        </p>
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">設計書に含まれる内容</p>
          <ul className="text-sm text-gray-600 space-y-1.5">
            <li className="flex items-start gap-2"><span className="text-indigo-500 mt-0.5">▸</span><span><strong>アーキテクチャ:</strong> Browser ↔ WebSocket ↔ FastAPI ↔ PTY ↔ Copilot CLI の構成</span></li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 mt-0.5">▸</span><span><strong>コンポーネント構成:</strong> Frontend（React/TS）、Backend（FastAPI）、CLI Bridge（pexpect）</span></li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 mt-0.5">▸</span><span><strong>機能要件:</strong> Phase 1（MVP）と Phase 2（チャット UI 強化）</span></li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 mt-0.5">▸</span><span><strong>WebSocket プロトコル設計:</strong> メッセージ形式と状態管理の仕様</span></li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 mt-0.5">▸</span><span><strong>ディレクトリ構造:</strong> ファイル配置と各ファイルの役割</span></li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 mt-0.5">▸</span><span><strong>実装タスク一覧:</strong> タスク間の依存関係</span></li>
            <li className="flex items-start gap-2"><span className="text-indigo-500 mt-0.5">▸</span><span><strong>実装上の重要な注意事項:</strong> つまずきやすいポイントの事前対策</span></li>
          </ul>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm flex items-start gap-2">
            <span className="text-lg leading-5">💡</span>
            <span><strong>設計書を活用するコツ:</strong> 実装フェーズでは、GitHub Copilot CLI に対してプロンプトを投げる際に「planning.md を参照して」と指示することで、Copilot が設計書の文脈を理解した上でコードを生成してくれます。</span>
          </p>
        </div>
      </div>

      {/* 2. GitHub Copilot CLI の起動確認 */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
          GitHub Copilot CLI の起動確認
        </h4>
        <p className="text-gray-700 text-sm mb-3">VS Code のターミナルを開き、以下のコマンドを入力して GitHub Copilot CLI を起動してみましょう：</p>
        <Prompt>copilot</Prompt>
        <p className="text-gray-600 text-sm mt-3 mb-4">
          正常に起動すると、対話型のインターフェースが表示されます。<code className="bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded text-xs">/help</code> と入力して、利用可能なコマンドを確認してみましょう。
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <p className="text-amber-800 text-sm font-semibold mb-2">GitHub Copilot CLI のセットアップについて</p>
          <p className="text-amber-700 text-sm mb-2">
            通常、GitHub Copilot CLI を利用するには GitHub CLI (gh) のインストールと Copilot 拡張機能のセットアップが必要です。今回のワークショップでは、DevContainer に設定が含まれているため Codespaces を起動すれば <code className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-xs">copilot</code> コマンドがすぐに利用できます。
          </p>
          <p className="text-amber-700 text-sm font-semibold mb-1">自身の環境でセットアップする場合：</p>
          <ol className="list-decimal list-inside text-sm text-amber-700 space-y-1">
            <li>GitHub CLI をインストール: <code className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-xs">brew install gh</code>（macOS）</li>
            <li>GitHub CLI で認証: <code className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-xs">gh auth login</code></li>
            <li>Copilot 拡張機能をインストール: <code className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-xs">gh extension install github/copilot-cli</code></li>
          </ol>
        </div>
      </div>

      {/* 3. コマンド一覧 */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">3</span>
          GitHub Copilot CLI のコマンド一覧
        </h4>
        <p className="text-gray-700 text-sm mb-4">
          <code className="bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded text-xs">/</code> で始まるスラッシュコマンドを使用できます。
        </p>

        <div className="space-y-5">
          <div>
            <p className="font-semibold text-gray-700 text-sm mb-2">コード関連</p>
            <CmdTable rows={[
              ["/ide", "IDE ワークスペースに接続"],
              ["/diff", "現在のディレクトリの変更差分を確認"],
              ["/review", "コードレビューエージェントを実行して変更を分析"],
              ["/lsp", "言語サーバーの設定を管理"],
              ["/terminal-setup", "マルチライン入力のターミナル設定"],
            ]} />
          </div>
          <div>
            <p className="font-semibold text-gray-700 text-sm mb-2">パーミッション</p>
            <CmdTable rows={[
              ["/allow-all", "すべてのパーミッションを有効化"],
              ["/add-dir", "ファイルアクセスの許可ディレクトリを追加"],
              ["/list-dirs", "許可されたディレクトリの一覧を表示"],
              ["/cwd", "作業ディレクトリを変更または表示"],
              ["/reset-allowed-tools", "許可ツールのリストをリセット"],
            ]} />
          </div>
          <div>
            <p className="font-semibold text-gray-700 text-sm mb-2">セッション管理</p>
            <CmdTable rows={[
              ["/resume", "別のセッションに切り替え"],
              ["/rename", "現在のセッション名を変更"],
              ["/context", "トークン使用量を表示"],
              ["/usage", "使用状況メトリクスと統計を表示"],
              ["/session", "セッション情報とワークスペースサマリーを表示"],
              ["/compact", "会話履歴を要約してコンテキスト使用量を削減"],
              ["/share", "セッションを Markdown/GitHub Gist としてエクスポート"],
            ]} />
          </div>
          <div>
            <p className="font-semibold text-gray-700 text-sm mb-2">ヘルプ・フィードバック</p>
            <CmdTable rows={[
              ["/help", "対話コマンドのヘルプを表示"],
              ["/changelog", "CLI バージョンの変更履歴を表示"],
              ["/feedback", "CLI に関するフィードバックを送信"],
              ["/theme", "ターミナルテーマの確認・設定"],
              ["/experimental", "実験的機能の表示・切り替え"],
            ]} />
          </div>
          <div>
            <p className="font-semibold text-gray-700 text-sm mb-2">その他</p>
            <CmdTable rows={[
              ["/model", "使用する AI モデルを選択（GPT、Claude、Gemini 等）"],
              ["/clear, /new", "会話履歴をクリア"],
              ["/plan", "コーディング前に実装計画を作成"],
              ["/instructions", "カスタム指示ファイルの表示・切り替え"],
              ["/diagnose", "現在のセッションログを分析"],
              ["/login, /logout", "Copilot へのログイン・ログアウト"],
              ["/exit, /quit", "CLI を終了"],
            ]} />
          </div>
        </div>

        {/* カスタム指示ファイル */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">カスタム指示ファイル</p>
          <p className="text-gray-600 text-sm mb-2">Copilot CLI は以下の場所にあるカスタム指示ファイルを自動的に読み込みます：</p>
          <ul className="text-sm text-gray-600 space-y-1 font-mono">
            <li>• CLAUDE.md / GEMINI.md / AGENTS.md（git ルート＆カレントディレクトリ）</li>
            <li>• .github/instructions/**/*.instructions.md</li>
            <li>• .github/copilot-instructions.md</li>
            <li>• $HOME/.copilot/copilot-instructions.md</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <p className="text-blue-800 text-sm flex items-start gap-2">
            <span className="text-lg leading-5">💡</span>
            <span><strong>CLI のヒント:</strong> <code className="bg-blue-100 text-blue-700 px-1 rounded text-xs">/model</code> コマンドでモデルを切り替えられます。<code className="bg-blue-100 text-blue-700 px-1 rounded text-xs">/plan</code> コマンドを使うと実装計画を自動生成できるので、設計書と組み合わせると効果的です。</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Section6() {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <p className="text-gray-700 mb-6">
        設計書の確認と GitHub Copilot CLI の動作確認ができたら、いよいよ <strong>Vibe Coding</strong> で Copilot Web Relay を実装していきます。以下の 4 ステップを順番に実行するだけで、Copilot が設計書をもとにアプリケーションを構築してくれます。
      </p>

      <div className="space-y-6">
        {/* Step 1 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            Copilot CLI を起動する
          </h4>
          <Prompt>copilot</Prompt>
        </div>

        {/* Step 2 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            すべてのパーミッションを許可する
          </h4>
          <Prompt>/allow-all</Prompt>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-3">
            <p className="text-amber-800 text-sm">
              <strong>/allow-all</strong> は、ファイルの読み書き・コマンド実行・外部通信のすべてのパーミッションを一括で許可するコマンドです。現在のセッションに対してのみ有効で、信頼できるプロジェクトでのみ使用してください。個別に許可したい場合は <code className="bg-amber-100 text-amber-800 px-1 rounded text-xs">/add-dir</code> を使用します。
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">3</span>
            ハイエンドモデルを選択する
          </h4>
          <Prompt>/model Claude Opus 4.6</Prompt>
          <p className="text-gray-600 text-sm mt-2">複数コンポーネントを持つ Web アプリケーションの構築には、推論能力の高いハイエンドモデルが効果的です。</p>
        </div>

        {/* Step 4 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="bg-purple-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">4</span>
            Fleet モードで一気に実装する
          </h4>
          <Prompt>{`/fleet Copilot Web Relay — ブラウザから GitHub Copilot CLI にアクセスできる Web アプリケーションを構築します。copilotWebRelay/planning.md の計画に沿って実装を進めてください。不明なことがあれば事前に私に聞いてください。`}</Prompt>

          <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Fleet モードとは</p>
            <p className="text-gray-600 text-sm mb-3">複数のサブエージェントを並行して起動し、大規模なタスクを分割・同時実行するためのコマンドです。</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                ["タスクの分解", "設計書を読み取り、実装すべきコンポーネントを特定"],
                ["並行実装", "バックエンドとフロントエンドを同時に実装"],
                ["依存関係の解決", "パッケージのインストール、設定ファイルの生成"],
                ["統合テスト", "実装後の動作確認"],
              ].map(([title, desc], i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <p className="font-semibold text-gray-800 text-xs">{title}</p>
                  <p className="text-gray-600 text-xs mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* つまずいた場合 */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">つまずいた場合のヒント</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2 mb-4">
          <p className="text-sm text-gray-700">• エラーメッセージをそのまま Copilot に共有:「このエラーを修正してください」と伝えるだけで修正してくれます</p>
          <p className="text-sm text-gray-700">• <code className="bg-gray-100 text-gray-800 px-1 rounded text-xs">/diff</code> で変更内容を確認: 意図しない変更がないかチェック</p>
          <p className="text-sm text-gray-700">• <code className="bg-gray-100 text-gray-800 px-1 rounded text-xs">/model</code> でモデルを変更: 別のモデルに切り替えて再試行</p>
          <p className="text-sm text-gray-700">• 設計書の注意事項を確認: planning.md の「実装上の重要な注意事項」セクションを確認</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm font-semibold mb-2">よくあるつまずきポイント</p>
          <ul className="text-sm text-red-700 space-y-1.5">
            <li>• <strong>Vite の WebSocket プロキシ:</strong> target に <code className="bg-red-100 text-red-800 px-1 rounded text-xs">ws://</code> ではなく <code className="bg-red-100 text-red-800 px-1 rounded text-xs">http://</code> を指定する</li>
            <li>• <strong>React StrictMode:</strong> useEffect が2回実行される問題で WebSocket 接続が不安定になることがある</li>
            <li>• <strong>FastAPI のルーティング順序:</strong> StaticFiles は WebSocket エンドポイントの後に定義する</li>
            <li>• <strong>xterm.js v5:</strong> <code className="bg-red-100 text-red-800 px-1 rounded text-xs">xterm-addon-fit</code> ではなく <code className="bg-red-100 text-red-800 px-1 rounded text-xs">@xterm/addon-fit</code> を使用</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Section7() {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <p className="text-gray-700 mb-6">
        Vibe Coding で実装した Copilot Web Relay のコードを、Copilot に解説してもらい理解を深めましょう。その後、問題点を見つけて改善まで行います。
      </p>

      <div className="space-y-8">
        {/* 1. コード全体の解説 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            コード全体の解説を依頼
          </h4>
          <p className="text-gray-700 text-sm mb-3">エージェントモードで以下のプロンプトを入力してください：</p>
          <Prompt>{`この Copilot Web Relay アプリケーションのコード全体を確認して、アーキテクチャ、各ファイルの役割、主要な処理の流れを解説してください。`}</Prompt>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
            <p className="text-blue-800 text-xs">💡 エージェントモードでは、Copilot が自動的にプロジェクト内のファイルを参照して回答してくれるため、手動でファイルをコンテキストに追加する必要がありません。</p>
          </div>
        </div>

        {/* 2. 問題点を見つける */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            問題点を見つける
          </h4>
          <p className="text-gray-700 text-sm mb-3">コードの品質やセキュリティの観点から問題点を洗い出してもらいましょう：</p>
          <div className="space-y-3">
            <Prompt>{`この Copilot Web Relay アプリケーション全体を見て、どのような問題点や改善点がありますか？設計パターン、コードの品質、保守性、セキュリティの観点から教えてください。`}</Prompt>
            <p className="text-gray-600 text-sm">特定のコンポーネントに絞って深掘りすることもできます：</p>
            <Prompt>{`backend/cli_bridge.py のエラーハンドリングとリソース管理に問題はありますか？改善案を提案してください。`}</Prompt>
            <Prompt>{`frontend/src/App.tsx の WebSocket 接続管理に問題はありますか？React のベストプラクティスに従っているか確認してください。`}</Prompt>
          </div>
        </div>

        {/* 3. 改善案を実装する */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">3</span>
            改善案を実装する
          </h4>
          <p className="text-gray-700 text-sm mb-3">見つかった問題点を実際に修正してもらいましょう：</p>
          <Prompt>{`提示してくれたすべての改善案を実装してください。`}</Prompt>
          <p className="text-gray-600 text-sm mt-2">Copilot はコードに対して直接変更を提案します。変更内容を確認し、チャット欄の「保持」もしくは「元に戻す」ボタンで受け入れるかどうかを決定しましょう。</p>
        </div>

        {/* 4. 動作確認 */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">4</span>
            動作確認
          </h4>
          <p className="text-gray-700 text-sm mb-3">改善を実装した後は、アプリケーションが引き続き正常に動作することを確認しましょう：</p>
          <Prompt>{`改善を実装した結果、アプリケーションが正常に動作することを確認してください。バックエンドの起動、フロントエンドのビルド、ブラウザでの動作確認を行ってください。`}</Prompt>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
        <p className="text-amber-800 text-sm flex items-start gap-2">
          <span className="text-lg leading-5">⚠️</span>
          <span><strong>重要:</strong> エージェントモードでは、Copilot がより自律的に動作するため、提案される変更内容をよく確認してから受け入れるようにしましょう。エージェントはコード変更後にエラーが発生した場合、自動的に検出して修正を試みることもあります。</span>
        </p>
      </div>
    </div>
  );
}

function Section8() {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="space-y-3">
        <a href="https://github.com/github/gh-aw/blob/main/create.md" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <span className="text-xl">📄</span>
          <div><p className="font-semibold text-indigo-600 text-sm">GitHub Agentic Workflow 作成ガイド</p><p className="text-gray-500 text-xs">github.com/github/gh-aw</p></div>
        </a>
        <a href="https://github.com/NRI-Enablement-Lab/moulongzhang" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <span className="text-xl">🛠️</span>
          <div><p className="font-semibold text-indigo-600 text-sm">ワークショップ テンプレートリポジトリ</p><p className="text-gray-500 text-xs">github.com/NRI-Enablement-Lab/moulongzhang</p></div>
        </a>
        <a href="https://moulongzhang.github.io/2026-Github-Copilot-Workshop/github-copilot-workshop/custom/nri/index.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <span className="text-xl">📊</span>
          <div><p className="font-semibold text-indigo-600 text-sm">ワークショップ スライド</p><p className="text-gray-500 text-xs">moulongzhang.github.io</p></div>
        </a>
      </div>
    </div>
  );
}

/* ========================================
   セクション切り替えマップ
   ======================================== */
const SECTION_COMPONENTS: Record<number, () => React.JSX.Element> = {
  0: Section0,
  1: Section1,
  2: Section2,
  3: Section3,
  4: Section4,
  5: Section5,
  6: Section6,
  7: Section7,
  8: Section8,
};

export default function AgenticWorkflowPage() {
  const [currentSection, setCurrentSection] = useState(0);

  const goNext = () => { setCurrentSection((p) => Math.min(p + 1, SECTIONS.length - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goPrev = () => { setCurrentSection((p) => Math.max(p - 1, 0)); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const CurrentContent = SECTION_COMPONENTS[currentSection];

  return (
    <div>
      <div className="mb-6">
        <Link href="/training/github" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← GitHub勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        GitHub Copilot Agentic Workflow 勉強会資料
      </h2>

      {/* ヘッダー情報 */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <p className="text-sm font-semibold text-purple-900">GitHub Copilot Agentic Workflow - 自律的なAI駆動の開発</p>
            <p className="text-purple-700 text-xs">
              参考: <a href="https://moulongzhang.github.io/2026-Github-Copilot-Workshop/github-copilot-workshop/custom/nri/index.html" target="_blank" rel="noopener noreferrer" className="underline">GitHub Copilot Workshop</a>
            </p>
          </div>
        </div>
      </div>

      {/* セクションナビゲーション（目次） */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <p className="text-xs font-semibold text-gray-500 mb-2">目次</p>
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => { setCurrentSection(s.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                currentSection === s.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s.icon} {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* プログレスバー */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>セクション {currentSection + 1} / {SECTIONS.length}</span>
          <span>{Math.round(((currentSection + 1) / SECTIONS.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentSection + 1) / SECTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* セクションタイトル */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        {SECTIONS[currentSection].icon} {SECTIONS[currentSection].title}
      </h3>

      {/* セクション内容 */}
      <div className="prose max-w-none mb-8">
        <CurrentContent />
      </div>

      {/* ナビゲーションボタン */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <button
          onClick={goPrev}
          disabled={currentSection === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            currentSection === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          ← 前へ
          {currentSection > 0 && (
            <span className="text-xs text-gray-400 ml-1 hidden sm:inline">({SECTIONS[currentSection - 1].title})</span>
          )}
        </button>

        <button
          onClick={goNext}
          disabled={currentSection === SECTIONS.length - 1}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            currentSection === SECTIONS.length - 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          {currentSection < SECTIONS.length - 1 && (
            <span className="text-xs text-purple-200 mr-1 hidden sm:inline">({SECTIONS[currentSection + 1].title})</span>
          )}
          次へ →
        </button>
      </div>
    </div>
  );
}
