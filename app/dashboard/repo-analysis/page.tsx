"use client";

import { useState, useEffect, useCallback } from "react";
import DevGuide from "./DevGuide";
import StreamlitGuide from "./StreamlitGuide";
import HackathonGuide from "./HackathonGuide";
import AgenticGuide from "./AgenticGuide";
import JcgGuide from "./JcgGuide";
import TochoGuide from "./TochoGuide";
import ChushoGuide from "./ChushoGuide";
import ComparisonSlide from "./ComparisonSlide";

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

type Mode = "github" | "local";

type SavedLocalPath = {
  path: string;
  label: string;
  savedAt: string;
};

type LastState = {
  mode: Mode;
  localPath?: string;
  owner?: string;
  repo?: string;
  branch?: string;
};

const TOKEN_KEY = "repoAnalysisToken";
const REPOS_KEY = "repoAnalysisRepos";
const LOCAL_PATHS_KEY = "repoAnalysisLocalPaths";
const LAST_STATE_KEY = "repoAnalysisLastState";
const JCG_DEFAULT_PATH = "C:\\Users\\cab02322\\src\\nomura\\jcg_snowflake";

const PRESET_REPOS = [
  {
    label: "jcg_snowflake",
    path: "C:\\Users\\cab02322\\src\\nomura\\jcg_snowflake",
    description: "HVD フレームワーク（Next.js + SPCS）",
    icon: "❄️",
  },
  {
    label: "tocho-geospatial-platform",
    path: "C:\\Users\\cab02322\\src\\nomura\\tocho-geospatial-platform",
    description: "東京都庁向け Snowflake x ArcGIS x Next.js x SPCS",
    icon: "🗼",
  },
  {
    label: "streamlit_snowflake",
    path: "C:\\Users\\cab02322\\src\\nomura\\streamlit_snowflake",
    description: "Streamlit PoC フレームワーク",
    icon: "🐍",
  },
  {
    label: "aslead_dev",
    path: "C:\\Users\\cab02322\\src\\nomura\\aslead_dev",
    description: "aslead 開発プロジェクト",
    icon: "📦",
  },
  {
    label: "ECC",
    path: "C:\\Users\\cab02322\\src\\nomura\\ECC",
    description: "ECC（affaan-m/ECC）",
    icon: "🔐",
  },
  {
    label: "agentic-dev-template",
    path: "C:\\Users\\cab02322\\src\\nomura\\agentic-dev-template",
    description: "Agentic開発テンプレート",
    icon: "🧭",
  },
  {
    label: "gh-aw",
    path: "C:\\Users\\cab02322\\src\\nomura\\gh-aw",
    description: "GitHub Agentic Workflow",
    icon: "⚙️",
  },
  {
    label: "hackathon-lib-check",
    path: "C:\\Users\\cab02322\\src\\nomura\\hackathon-lib-check",
    description: "ハッカソンライブラリ（masaki-infinite）",
    icon: "🏆",
  },
  {
    label: "aidlc-workflows",
    path: "C:\\Users\\cab02322\\src\\nomura\\aidlc-workflows",
    description: "AI-DLC（awslabs公式）3フェーズ適応型ワークフロー",
    icon: "🤖",
  },
  {
    label: "claude-code-best-practice",
    path: "C:\\Users\\cab02322\\src\\nomura\\claude-code-best-practice",
    description: "Claude Code ベストプラクティス集",
    icon: "📘",
  },
];

const notesKey = (owner: string, repo: string) => `repoAnalysisNotes_${owner}/${repo}`;
const localNotesKey = (p: string) => `repoAnalysisNotes_local:${p}`;

function parseRepoInput(input: string): { owner: string; repo: string; branch?: string } | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const urlMatch = trimmed.match(
    /github\.com[/:]([^/]+)\/([^/#?]+?)(?:\.git)?(?:\/tree\/([^/#?]+))?(?:[/#?].*)?$/i
  );
  if (urlMatch) return { owner: urlMatch[1], repo: urlMatch[2], branch: urlMatch[3] };
  const shortMatch = trimmed.match(/^([^/\s]+)\/([^/\s]+)$/);
  if (shortMatch) return { owner: shortMatch[1], repo: shortMatch[2] };
  return null;
}

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

function guessRole(node: TreeNode): string {
  const name = node.name.toLowerCase();
  const p = node.path.toLowerCase();

  // ── テストファイル（パス優先）─────────────────────────
  if (p.includes(".test.") || p.includes(".spec.") || p.includes("_test.")) return "テストコード";

  // ── ルート直下の特定ファイル ──────────────────────────
  if (p === ".env.example") return "Snowflake 接続情報テンプレート（.env のひな型・認証情報は .env に書く）";
  if (p === "load-env.ps1") return ".env + design.yaml から環境変数を一括 export（dbt/Terraform 実行前に必ず実行）";
  if (p === ".gitignore") return "Git 管理除外設定（.env / node_modules / .next / tfstate 等）";
  if (p === ".gitattributes") return "Git 属性設定（改行コード LF/CRLF 制御・diff・マージ戦略）";
  if (p === "verify-warnings.txt") return "検証スクリプトの 🟡 warning ログ（次スプリントの課題リスト）";
  if (p === "readme.md") return "リポジトリ README — 人間向け入口ドキュメント（Claude Code は CLAUDE.md を参照）";
  if (p === "memo.txt") return "一時メモファイル";
  if (p === "plan" && node.type === "tree") return "開発ロードマップ・計画ドキュメント格納フォルダ";
  if (p === ".github" && node.type === "tree") return "GitHub Actions CI/CD ワークフロー（verify/lint/skill-validate）";

  // ── biz/ ─────────────────────────────────────────────
  if (p === "biz/01-strategy/01-vision-mission-and-theme.md") return "経営ビジョン・ミッション・大テーマ定義（AI 駆動経営への到達目標）";
  if (p === "biz/01-strategy/02-why-now.md") return "なぜ今 AI を使わなければならないか — 時代背景と競争優位";
  if (p === "biz/01-strategy/03-ai-accelerator-program.md") return "AI アクセラレータープログラム — 5 ステップ顧客支援モデル";
  if (p === "biz/01-strategy/04-solution-stack.md") return "ソリューションスタック — プログラム × アプリ × スキル × 設計情報の 4 点セット";
  if (p === "biz/01-strategy/05-standard-apps-and-rollout.md") return "標準アプリ戦略 — 1 号機で標準形、2 号機以降で横展開";
  if (p === "biz/01-strategy/06-two-pillar-engineers.md") return "二本柱エンジニア — PdE（製品）と FDE（現場）の役割分担";
  if (p === "biz/01-strategy/07-customers-and-engagement.md") return "顧客定義とエンゲージメントモデル（立ち上げ期：自社 as lead）";
  if (p === "biz/01-strategy/08-pricing-and-scarcity.md") return "価格戦略と希少性設計（アクセシブル・ラグジュアリー）";
  if (p === "biz/01-strategy/09-business-model.md") return "ビジネスモデル — リセラー / 派遣 / 製品販売 / 運用代行の 4 本柱";
  if (p === "biz/01-strategy/10-execution.md") return "実行計画 — 3 ステージ段階立ち上げと品質ガードレール";
  if (p.startsWith("biz/01-strategy/")) return "ビジネス戦略ドキュメント";
  if (p === "biz/02-themes/index.yaml") return "ビジネステーマ一覧インデックス（ID・ステータス・オーナー）";
  if (p === "biz/02-themes/_directive-status.md") return "テーマ実行指示のステータス管理（CMO が更新・CEO が確認）";
  // テーマ内ファイル
  if (p.match(/^biz\/02-themes\/[^/]+\/theme\.yaml$/)) return "テーマ統合 SSOT（$ref で 7 分割ファイルを統合・直接編集禁止）";
  if (p.match(/^biz\/02-themes\/[^/]+\/00-meta\.yaml$/)) return "テーマメタデータ（ID/ステータス/オーナー/対象組織）";
  if (p.match(/^biz\/02-themes\/[^/]+\/01-motivation\.yaml$/)) return "解決する顧客課題・提供価値・成功指標（このテーマが必要な理由）";
  if (p.match(/^biz\/02-themes\/[^/]+\/02-customers\.yaml$/)) return "ターゲット組織とペルソナ定義";
  if (p.match(/^biz\/02-themes\/[^/]+\/03-constraints\.yaml$/)) return "法規制・予算・データ感度等の制約条件（Non-Functional Requirements の源泉）";
  if (p.match(/^biz\/02-themes\/[^/]+\/04-features\.yaml$/)) return "ビジネス機能リスト（AI が実装するユーザー向け機能）";
  if (p.match(/^biz\/02-themes\/[^/]+\/05-projects\.yaml$/)) return "このテーマを実装するプロジェクト一覧（project_id / role / feature_coverage）";
  if (p.match(/^biz\/02-themes\/[^/]+\/evidence\.md$/)) return "VoC / RFP / Discovery メモ — 市場ニーズの証跡（自由記述）";

  // ── guide/ ──────────────────────────────────────────
  if (p === "guide/01-agent-team.md") return "CADRE 8 役割チーム定義（architect/pm/worker/reviewer 等の専門領域）";
  if (p === "guide/02-how-to-call.md") return "スキル呼び出し逆引きガイド（やりたいこと → スキル名）";
  if (p === "guide/03-collaboration.md") return "エージェント協働フロー（dev cycle / biz cycle 二重ループ・ハンドオフ）";
  if (p === "guide/04-quality-gates.md") return "品質ゲート G1-G4 の基準・hooks/rules/CI 詳細";
  if (p === "guide/05-project-setup.md") return "プロジェクト新規作成手順（.env 設定 → md-scope → hvd-dev-cycle 起動）";
  if (p === "guide/06-skill-system.md") return "スキルシステム詳細（SKILL.md 仕様・スキルカタログ・CI 検証 S1-S14）";
  if (p === "guide/08-cadre.md") return "CADRE 設計原則（Contract/ADR/Dual/Role/Execution の 5 原則と HVD 実装）";

  // ── iac/shared-dev/*.tf ──────────────────────────────
  if (p === "iac/shared-dev/warehouses.tf") return "共有開発 WH（HVD_DEV_WH / XSMALL / 60 秒オートサスペンド）";
  if (p === "iac/shared-dev/compute_pools.tf") return "共有 SPCS コンピュートプール（HVD_DEV_POOL / CPU_X64_XS）";
  if (p === "iac/shared-dev/system_roles.tf") return "開発用ロール定義（HVD_DEV_DEPLOY / HVD_DEV_OBSERVER）";
  if (p === "iac/shared-dev/locals.tf") return "共有インフラ Terraform ローカル変数（環境フラグ・リソース名・CI ユーザー）";
  if (p === "iac/shared-dev/main.tf") return "Terraform プロバイダー・バックエンド設定（Snowflake provider v2）";
  if (p === "iac/shared-dev/variables.tf") return "Terraform 入力変数（SNOWFLAKE_ACCOUNT / USER / PAT・環境名切り替え）";
  if (p === "iac/shared-dev/outputs.tf") return "Terraform 出力値（WH 名 / プール名 / イメージリポジトリ URL を export）";
  if (p === "iac/shared-dev/users.tf") return "CI/CD サービスアカウント定義（RSA キー認証 / E2E_RUNNER / SMOKE_AUDIT）";
  if (p === "iac/shared-dev/image_repos.tf") return "Docker イメージリポジトリ定義（REPO_DEV — SPCS 用イメージプッシュ先）";

  // ── .agents/ ─────────────────────────────────────────
  if (p === ".agents" && node.type === "tree") return "外部 AI ツール向け公開スキル集（40+ スキル / HVD 内部スキルとは独立）";
  if (p.startsWith(".agents/skills/")) {
    const skillName = p.split("/")[2];
    if (skillName) return `公開スキル: ${skillName}（外部 AI ツールから独立呼び出し可能）`;
  }

  // ── tests/（ルート）──────────────────────────────────
  if (p === "tests" && node.type === "tree") return "クロスプロジェクト テストインフラ（hooks / scripts / skills テスト）";
  if (p === "tests/hooks" && node.type === "tree") return "git フック（validate-*.sh）の自動テスト（run-all.sh で一括実行）";
  if (p === "tests/scripts" && node.type === "tree") return "検証スクリプト（verify_*.py）の pytest テスト";
  if (p === "tests/skills" && node.type === "tree") return "スキル回帰テスト（入力 YAML → 期待出力 design.yaml）";
  if (p.startsWith("tests/hooks/") && name.endsWith(".sh")) return `git フックテスト: ${name.replace("test-", "").replace(".sh", "")}`;
  if (p.startsWith("tests/scripts/") && name.endsWith(".py")) return `スクリプトテスト: ${name.replace("test_", "").replace(".py", "")}`;
  if (p === "tests/skills/md-scope" && node.type === "tree") return "md-scope スキルの回帰テスト（inputs/ → expected/ の照合）";
  if (p === "tests/skills/hvd-ui-eval" && node.type === "tree") return "hvd-ui-eval スキルの動作テスト（UI 品質評価）";

  // ── projects/* 配下：プロジェクト名を取得してコンテキスト付き説明 ──
  const prjMatch = p.match(/^projects\/([^/]+)(\/(.*))?$/);
  if (prjMatch) {
    const prj = prjMatch[1]; // e.g. "jcg-platform"
    const sub = prjMatch[3] || ""; // e.g. "dbt/models/staging/stg_users.sql"

    // プロジェクトルートフォルダ自体
    if (!sub && node.type === "tree") return `【${prj}】プロジェクトルート（design/dbt/web/iac を内包）`;

    // progress.yaml
    if (name === "progress.yaml") return `【${prj}】R1〜R6 フェーズ進捗・ゲート承認状態のSSoT`;
    if (name === "readme.md" && !sub.includes("/")) return `【${prj}】プロジェクト概要・セットアップ手順`;

    // ── design/ ─────────────────────────────────────────
    if (sub.startsWith("design/")) {
      if (node.type === "tree") return `【${prj}】設計YAML格納ディレクトリ（全フェーズのSSoT）`;
      if (name.includes("purpose") || name.startsWith("1-10")) return `【${prj}】ビジネス目的・ペルソナ・意思決定フロー定義（R1a）`;
      if (name.includes("ai-strategy") || name.startsWith("1-20")) return `【${prj}】AI投資テーマ・ユースケース・リスク分類（R1a）`;
      if (name.includes("datasource") || name.startsWith("1-30") || name.startsWith("04-")) return `【${prj}】外部データソース定義・接続仕様（R1a）`;
      if (name.includes("feature") || name.startsWith("1-45") || name.startsWith("17-")) return `【${prj}】F-* 機能一覧・MVP/Phase2/3ライフサイクル（R2a）`;
      if (name.includes("scenario") || name.startsWith("1-50")) return `【${prj}】ユーザーストーリー・受け入れテスト定義（R2a）`;
      if (name.includes("branding") || name.startsWith("1-60")) return `【${prj}】カラー・タイポグラフィ・デザインシステム定義（R2a）`;
      if (name.includes("architecture") || name.startsWith("1-80") || name.startsWith("08-")) return `【${prj}】Snowflake DB/スキーマ/ウェアハウス/SSOT定義（R3a）`;
      if (name.includes("ui-inventory") || name.startsWith("2-20")) return `【${prj}】画面カタログ・ワイヤーフレーム参照（R5a）`;
      if (name.startsWith("2-10") || (name.includes("ui") && !name.includes("inventory"))) return `【${prj}】UIパターン・チャットUX・ペルソナ可視化設計（R5a）`;
      if (name.includes("capabilities") || name.startsWith("09-")) return `【${prj}】AIエージェント Actions/Functions 仕様定義（R4a）`;
      if (name.includes("governance") || name.startsWith("12-")) return `【${prj}】ロール階層・Secure View・GRANT マトリクス（R6a）`;
      if (name.includes("mcp") || name.startsWith("14-")) return `【${prj}】MCPサーバー設定・禁止ツール・権限定義（R4a）`;
      if (name.includes("requirement") || name.startsWith("16-")) return `【${prj}】R-* 要件エントリ・仕様トレーサビリティ（R2a）`;
      if (name === "design.yaml") return `【${prj}】設計YAML集約ファイル（$ref で各分割ファイルを参照するSSoT）`;
      return `【${prj}】設計YAMLファイル（SSOT）`;
    }

    // ── dbt/ ─────────────────────────────────────────────
    if (sub.startsWith("dbt/")) {
      if (node.type === "tree" && sub === "dbt") return `【${prj}】dbt データ変換プロジェクト（ELT：raw→staging→mart）`;
      if (sub.includes("/models/staging")) {
        if (node.type === "tree") return `【${prj}】ステージングレイヤー（rawデータを型変換・正規化するビュー群）`;
        return `【${prj}】ステージングビュー stg_*（ソースから型変換、列名正規化）`;
      }
      if (sub.includes("/models/marts")) {
        if (node.type === "tree") return `【${prj}】マートレイヤー（ビジネスロジック・集計処理を行うテーブル群）`;
        return `【${prj}】マートテーブル mart_*（集計・結合・ビジネス指標計算）`;
      }
      if (sub.includes("/models/semantic")) {
        if (node.type === "tree") return `【${prj}】セマンティックレイヤー（AIエージェントが参照する統合ビュー群）`;
        return `【${prj}】セマンティックビュー SV_*（Cortex Agent が自然言語クエリに使用）`;
      }
      if (sub.includes("/models/agents")) {
        if (node.type === "tree") return `【${prj}】Cortex AIエージェント DDL 自動生成定義`;
        return `【${prj}】AIエージェント DDL マクロ（YAML→SQL変換でエージェントを生成）`;
      }
      if (sub.includes("/models/hybrid")) {
        if (node.type === "tree") return `【${prj}】ハイブリッドテーブル定義（アプリ書き込みのSSoT、行単位ロック対応）`;
        return `【${prj}】ハイブリッドテーブル HT_*（Snowflake行ロック型テーブル、アプリが直接書き込む）`;
      }
      if (sub.includes("/macros/actions")) {
        if (node.type === "tree") return `【${prj}】ACTION_* ストアドプロシージャ マクロ（CQRSの書き込み層）`;
        return `【${prj}】ACTION_* SP マクロ（Server Actionsから CALL で実行される書き込み処理）`;
      }
      if (sub.includes("/macros/functions")) {
        if (node.type === "tree") return `【${prj}】Snowflake UDF/UDTF マクロ定義`;
        return `【${prj}】Snowflake 関数マクロ（計算ロジックを再利用可能な関数として定義）`;
      }
      if (sub.includes("/macros/agents")) {
        if (node.type === "tree") return `【${prj}】AIエージェント YAML→SQL DDL 変換マクロ`;
        return `【${prj}】AIエージェント定義マクロ（capabilities.yaml をもとにDDLを自動生成）`;
      }
      if (sub.includes("/macros/governance")) {
        if (node.type === "tree") return `【${prj}】ガバナンスマクロ（ロール階層・Secure View・GRANT 自動化）`;
        return `【${prj}】ガバナンスマクロ（governance.yaml から Secure View / GRANT を生成）`;
      }
      if (sub.includes("/macros/writeback")) {
        if (node.type === "tree") return `【${prj}】外部SaaS書き戻しマクロ（Notion等へのプッシュ/プル）`;
        return `【${prj}】SaaS連携マクロ（外部サービスとのデータ同期処理）`;
      }
      if (sub.includes("/seeds/")) {
        if (node.type === "tree") return `【${prj}】dbt シードデータ（マスターデータCSV、dbt seed で投入）`;
        return `【${prj}】シードCSV（マスターデータ、dbt seed コマンドで Snowflake へ投入）`;
      }
      if (sub.includes("/tests/")) return `【${prj}】dbt スキーマテスト（not_null・unique・relationships 等）`;
      if (name === "dbt_project.yml") return `【${prj}】dbt プロジェクト設定（vars・profiles・スキーマルーティング定義）`;
      return `【${prj}】dbt 関連ファイル`;
    }

    // ── web/ ─────────────────────────────────────────────
    if (sub.startsWith("web/")) {
      if (node.type === "tree" && sub === "web") return `【${prj}】Next.js 16 + shadcn/ui Webアプリケーション`;
      if (sub.includes("/app/api/chat")) return `【${prj}】チャット SSE ストリーミング・履歴 CRUD API ルート`;
      if (sub.includes("/app/api/export")) return `【${prj}】CSV/DOCX エクスポート API ルート`;
      if (sub.includes("/app/api/")) return `【${prj}】Next.js API ルートハンドラ`;
      if (sub.includes("/app/admin/")) return `【${prj}】管理者専用ルート（ガバナンス・モニタリング）`;
      if (sub.match(/\/app\/[^/]+\/\[id\]/)) return `【${prj}】レコード詳細ページ（動的ルート）`;
      if (sub.match(/\/app\/[^/]+\//)) return `【${prj}】意思決定ワークフローページ`;
      if (sub.includes("/components/app-shell")) return `【${prj}】3カラムレイアウト（ナビ/メイン/チャット、リサイズ可）`;
      if (sub.includes("/components/chat-panel")) return `【${prj}】右サイドバー AIチャットパネル（Cortex Agent と接続）`;
      if (sub.includes("/components/nav-sidebar")) return `【${prj}】左ナビゲーションサイドバー`;
      if (sub.includes("/components/patterns/")) return `【${prj}】再利用 UIパターン（マッチング・ダッシュボード・作成ダイアログ等）`;
      if (sub.includes("/components/ui/")) return `【${prj}】shadcn/ui プリミティブ（Button/Card/Dialog/Tabs 等）`;
      if (sub.includes("/components/")) return `【${prj}】React コンポーネント`;
      if (sub.includes("/lib/db/client")) return `【${prj}】Snowflake SDK + Kysely ファクトリ（SPCS対応ディスパッチャ）`;
      if (sub.includes("/lib/db/types.gen")) return `【${prj}】Snowflake SHOW COLUMNS から自動生成した型定義（直接編集禁止）`;
      if (sub.includes("/lib/db/schemas/")) return `【${prj}】zod スキーマ（テーブル単位のバリデーション境界）`;
      if (sub.includes("/lib/db/queries/")) return `【${prj}】Kysely SELECTクエリ関数（READ専用・パラメータ化・CQRS読み取り層）`;
      if (sub.includes("/lib/actions/fqn")) return `【${prj}】FQN ヘルパー（FQN_ACTION/FUNCTION/HT の完全修飾名生成）`;
      if (sub.includes("/lib/actions/")) return `【${prj}】Server Actions（CALL ACTION_* 経由でのCQRS書き込み処理）`;
      if (sub.includes("/lib/ai/cortex-agent-client")) return `【${prj}】Cortex Agent REST クライアント（:run エンドポイント・SSEストリーミング）`;
      if (sub.includes("/lib/ai/cortex-thread-client")) return `【${prj}】Cortex Threads API クライアント（POST /threads マルチターンチャット）`;
      if (sub.includes("/lib/ai/tools")) return `【${prj}】AIエージェント ツール定義（セマンティックビュー・アクション参照）`;
      if (sub.includes("/lib/ai/")) return `【${prj}】AI クライアント・ユーティリティ`;
      if (sub.includes("/lib/auth/snowflake-context")) return `【${prj}】SPCS対応コンテキストディスパッチャ（OAuthトークン処理）`;
      if (sub.includes("/lib/auth/")) return `【${prj}】認証・ユーザー同一性抽出`;
      if (sub.includes("/lib/hvd-data-context")) return `【${prj}】HvdDataProvider React Context（DBスナップショットの配布）`;
      if (sub.includes("/lib/logger")) return `【${prj}】pino ロギングラッパー（運用サイド構造化ログ）`;
      if (sub.includes("/lib/db/")) return `【${prj}】データベース接続・クエリ関連`;
      return `【${prj}】Web アプリ関連ファイル`;
    }

    // ── iac/ ─────────────────────────────────────────────
    if (sub.startsWith("iac/")) {
      if (node.type === "tree" && sub === "iac") return `【${prj}】インフラ as Code（Terraform）`;
      if (sub.includes("/base/locals")) return `【${prj}】Terraform locals（プロジェクト名・ウェアハウスサイズ定義）`;
      if (sub.includes("/base/databases")) return `【${prj}】Snowflake DATABASE 作成定義`;
      if (sub.includes("/base/schemas")) return `【${prj}】Snowflake SCHEMA 作成（base/_MARTS/_SECURE/_ACTIONS/_FUNCTIONS）`;
      if (sub.includes("/base/warehouses")) return `【${prj}】Snowflake WAREHOUSE 作成定義`;
      if (sub.includes("/base/")) return `【${prj}】Terraform 基盤リソース（DB・スキーマ・ウェアハウス）`;
      if (sub.includes("/governance/roles")) return `【${prj}】ビジネスロール・ロール階層・GRANT ROLE 定義`;
      if (sub.includes("/governance/secure-views")) return `【${prj}】Secure View 作成（dbt マクロ駆動、Terraform経由で実行）`;
      if (sub.includes("/governance/audit")) return `【${prj}】QUERY_HISTORY 分析ビュー（監査ログ）`;
      if (sub.includes("/governance/")) return `【${prj}】Terraform ガバナンスリソース（ロール・Secure View・監査）`;
      if (sub.includes("/spcs/")) return `【${prj}】SPCS リソース（コンピュートプール・サービス・イメージリポジトリ）`;
      return `【${prj}】Terraform リソース定義`;
    }

    // ── scripts/ ─────────────────────────────────────────
    if (sub.startsWith("scripts/")) {
      if (name.includes("load_source")) return `【${prj}】外部データ CSV → Snowflake _RAW ロードスクリプト`;
      if (name.includes("deploy_hybrid")) return `【${prj}】ハイブリッドテーブル初期データ投入（mart から HT へ Bootstrap）`;
      if (name.includes("gen_db_types")) return `【${prj}】Snowflake SHOW COLUMNS → TypeScript型定義 自動生成`;
      if (name.includes("verify_") || name.includes("smoke")) return `【${prj}】デプロイ後検証スクリプト`;
      return `【${prj}】プロジェクト固有運用スクリプト`;
    }

    // ── tests/ ───────────────────────────────────────────
    if (sub.startsWith("tests/")) {
      if (sub.includes("/sp/")) return `【${prj}】ACTION/FUNCTION SP 単体テスト（pytest）`;
      if (sub.includes("/e2e/")) return `【${prj}】Playwright E2E テスト`;
      if (name.includes("smoke")) return `【${prj}】デプロイ後スモークテスト（インテグレーション確認）`;
      return `【${prj}】プロジェクトテスト`;
    }

    // ── adr/ ─────────────────────────────────────────────
    if (sub.startsWith("adr/")) return `【${prj}】プロジェクト固有アーキテクチャ決定記録`;

    // ── .hvd/ ─────────────────────────────────────────────
    if (sub.startsWith(".hvd/")) {
      if (sub.includes("/messages/")) return `【${prj}】エージェント間通信ログ（JSONL append-only）`;
      if (sub.includes("/inbox/")) return `【${prj}】エージェントインボックス（自動生成リクエスト）`;
      if (sub.includes("/handoff/")) return `【${prj}】フェーズ境界ハンドオフドキュメント`;
      if (name === "index.jsonl") return `【${prj}】エージェントタスク実行ログ（JSONL）`;
      return `【${prj}】エージェント間通信・進捗管理ファイル`;
    }
  }

  // ── .claude/ フレームワーク ───────────────────────────
  if (p.startsWith(".claude/agents/")) return `HVD エージェント役割定義（CEO/COO/CTO/CFO-CRO/CMO/CAIO/engineer-web/engineer-sis の8役）`;
  if (p.startsWith(".claude/framework/workflow-core")) return "R1-R6ワークフロー・12ステップ・6品質ゲート・8人組織マトリクスのSSoT";
  if (p.startsWith(".claude/framework/workflow-ext")) return "ワークフロー拡張定義（workflow-core.yaml の補完）";
  if (p.startsWith(".claude/framework/skill-index")) return "スキルカタログ（人間が読めるスキル一覧、skill-index.md）";
  if (p.startsWith(".claude/framework/schemas/")) return "JSON スキーマ（design.yaml/skill.unit.yaml/review.unit.yaml等のバリデーション定義）";
  if (p.startsWith(".claude/framework/")) return "HVD フレームワーク定義・スキーマ";
  if (p.startsWith(".claude/skills/design/")) return "設計フェーズスキル md-*（R1a/R2a で design.yaml を生成・更新）";
  if (p.startsWith(".claude/skills/implement/sf-dbt")) return "dbt データモデル実装スキル（staging/mart/HT/semantic を生成）";
  if (p.startsWith(".claude/skills/implement/sf-")) return "Snowflake実装スキル sf-*（R3-R4：dbt・エージェント・ガバナンス）";
  if (p.startsWith(".claude/skills/implement/vc-")) return "Web UI実装スキル vc-*（R5：Next.js コンポーネント・Server Actions）";
  if (p.startsWith(".claude/skills/implement/pe-")) return "プロセス実行スキル pe-*（デプロイ・テスト実行）";
  if (p.startsWith(".claude/skills/implement/iac-")) return "IaC実装スキル iac-*（Terraform リソース生成）";
  if (p.startsWith(".claude/skills/implement/")) return "実装フェーズスキル（R3-R5）";
  if (p.startsWith(".claude/skills/verify/hvd-verify-crud")) return "CRUD整合性検証スキル（50項目のルールチェック）";
  if (p.startsWith(".claude/skills/verify/hvd-verify-design")) return "設計 SSOT 整合性検証スキル";
  if (p.startsWith(".claude/skills/verify/")) return "品質検証スキル（品質ゲートの自動チェック）";
  if (p.startsWith(".claude/skills/manage/hvd-dev-cycle")) return "開発サイクル管理スキル（R1-R6 オーケストレーション）";
  if (p.startsWith(".claude/skills/manage/hvd-biz-cycle")) return "ビジネスサイクル管理スキル（テーマ・ポートフォリオ更新）";
  if (p.startsWith(".claude/skills/manage/hvd-adr")) return "ADR 作成・管理スキル";
  if (p.startsWith(".claude/skills/manage/hvd-workflow-lookup")) return "workflow-core.yaml クエリスキル（ステップ・ゲート・DRI確認）";
  if (p.startsWith(".claude/skills/manage/")) return "プロジェクト管理スキル（dev-cycle/biz-cycle/pmo/adr等）";
  if (p.startsWith(".claude/skills/operate/")) return "運用スキル（監視・コンプライアンス・インシデント対応）";
  if (p.startsWith(".claude/skills/specialist/")) return "専門スキル（RAG・セマンティック検索・Cortex Agent パターン等）";
  if (p.startsWith(".claude/skills/templates/")) return "共有テンプレート（dbt/Web/design スキーマ/ドキュメント雛形）";
  if (p.startsWith(".claude/rules/design-yaml")) return "design.yaml 構造バリデーションルール（バージョン・必須セクション）";
  if (p.startsWith(".claude/rules/dbt-models")) return "dbt SQL/YAMLルール（スキーマルーティング・env_var使用・命名規則）";
  if (p.startsWith(".claude/rules/web-data-access")) return "Next.js データアクセスルール（Kysely/zod/Server Actions/CQRSレイヤー）";
  if (p.startsWith(".claude/rules/web-pages")) return "React コンポーネント・レイアウト・UIボキャブラリルール";
  if (p.startsWith(".claude/rules/cortex-agent")) return "Cortex Agent DDL・ツール設定・SV/Action SP ルール";
  if (p.startsWith(".claude/rules/governance-macros")) return "Secure View・Row Access Policy・GRANT マクロルール";
  if (p.startsWith(".claude/rules/no-fixed-cost")) return "固定コストオブジェクト禁止ルール（ADR-0015/0023：Cortex Search Service/CRON Task 禁止）";
  if (p.startsWith(".claude/rules/data-layer")) return "CQRSデータレイヤー責務分離ルール（raw→staging→mart、HT=SSOT）";
  if (p.startsWith(".claude/rules/agent-communication")) return "エージェント間通信ルール（JSONL ファイルベースメッセージング・progress.yaml ゲート）";
  if (p.startsWith(".claude/rules/portfolio-sync")) return "マルチプロジェクト エンティティ再利用・重複防止ルール";
  if (p.startsWith(".claude/rules/project-isolation")) return "プロジェクト境界分離ルール（マルチプロジェクト安全のための厳格なコンテキストロック）";
  if (p.startsWith(".claude/rules/")) return "パス別コードバリデーションルール（ルール違反を git hook でブロック）";
  if (p.startsWith(".claude/hooks/validate-secrets")) return "git pre-commit フック：認証情報・APIキーの混入検出";
  if (p.startsWith(".claude/hooks/validate-prj-dir")) return "git フック：プロジェクト境界検証（他プロジェクト編集の防止）";
  if (p.startsWith(".claude/hooks/validate-design-yaml")) return "git フック：design.yaml 構文・必須セクションの検証";
  if (p.startsWith(".claude/hooks/")) return "git フック（品質ゲート自動検証）";
  if (p === ".claude/claude.md") return "4レイヤ責務分離ガイド（ADR-0109）— .claude/ 配下操作の最上位原則";
  if (p.startsWith(".claude/")) return "Claude AI エージェント設定・スキル・ルール";

  // ── リポジトリ直下・共有ディレクトリ ─────────────────
  if (p.startsWith("adr/")) {
    const num = name.match(/^(\d+)/)?.[1];
    if (num) return `リポジトリ全体 ADR-${num}（アーキテクチャ決定記録）`;
    return "リポジトリ全体アーキテクチャ決定記録（ADR）";
  }
  if (p.startsWith("guide/00")) return "HVDフレームワーク 10分入門ガイド";
  if (p.startsWith("guide/01")) return "8人CxOチーム役割定義（CEO/COO/CTO/CFO-CRO/CMO/CAIO/engineer-web/engineer-sis）";
  if (p.startsWith("guide/02")) return "エージェント・スキル呼び出し判断ガイド（やりたいこと→どのスキルを呼ぶか）";
  if (p.startsWith("guide/03")) return "開発サイクルオーケストレーション・ゲート承認・エージェントハンドオフ手順";
  if (p.startsWith("guide/04")) return "品質ゲートG1-G4の基準・SSOT原則・Validation フック・CI/CD 連携";
  if (p.startsWith("guide/05")) return "マルチプロジェクトセットアップ・.env設定・design.yaml SSOT・dbt コマンド一覧";
  if (p.startsWith("guide/06")) return "スキルライフサイクル・SKILL.md フロントマター・skill-index 自動生成";
  if (p.startsWith("guide/07")) return "6RTW-Native 開発パイプライン詳細（R1-R6・12ステップ・6ゲート、workflow-core.yaml から自動生成）";
  if (p.startsWith("guide/08")) return "CADRE設計原則（Clarity/Accountability/Division/Resilience/Evidence）+ オーケストレーションルール";
  if (p.startsWith("guide/")) return "ユーザー向け開発ガイドドキュメント";
  if (p.startsWith("biz/02-themes/")) return "ビジネステーマポートフォリオ（AI投資判断・顧客定義・制約・機能紐付け・証跡）";
  if (name === "projects-inventory.yaml") return "全プロジェクトのデータモデル・機能・データソース統合インデックス（エンティティ重複防止のSSoT）";
  if (p.startsWith("biz/")) return "ビジネス戦略・ポートフォリオ管理";
  if (p.startsWith("iac/")) return "共有インフラリソース（Terraform：複数プロジェクト横断の基盤）";
  if (p.startsWith("scripts/verify_crud")) return "CRUD整合性検証スクリプト（50+ルール：R1-R50）";
  if (p.startsWith("scripts/verify_design")) return "設計基盤SSOT整合性検証（スキーマ・env_var・managed_by ルール）";
  if (p.startsWith("scripts/verify_spec")) return "仕様カバレッジトレーサビリティ検証（SC1-SC4）";
  if (p.startsWith("scripts/verify_feature")) return "機能→シナリオ/画面/Capability 後方参照検証（F1-F12）";
  if (p.startsWith("scripts/verify_skill")) return "skill.unit.yaml vs SKILL.md ドリフト検出（S1-S12）";
  if (p.startsWith("scripts/lookup_workflow")) return "workflow-core.yaml CLIクエリツール（--r/--step/--gate/--agent/--skill で参照）";
  if (p.startsWith("scripts/emit_escalation")) return "エスカレーションメッセージ生成スクリプト（ADR-0113 準拠のJSONL生成）";
  if (p.startsWith("scripts/lint_")) return "lintスクリプト（固定コストオブジェクト・ポートフォリオ整合・エージェント定義等）";
  if (p.startsWith("scripts/")) return "共有ユーティリティスクリプト（クロスプロジェクト検証・生成）";
  if (p.startsWith("tests/hooks/")) return "git フック実装テスト";
  if (p.startsWith("tests/scripts/")) return "検証スクリプトのテスト";
  if (p.startsWith("tests/skills/")) return "スキルレベル統合テスト";
  if (p.startsWith("tests/")) return "クロスプロジェクトテストインフラ";
  if (p.startsWith(".agents/")) return "公開エクスポート用エージェントスキル（外部利用可能な独立スキル）";

  // ── ルート直下の代表ファイル ──────────────────────────
  const rootFileHints: Record<string, string> = {
    "readme.md": "プロジェクト概要・HVD フレームワーク紹介・クイックスタート",
    "claude.md": "AIアシスタント向けリポジトリ操作ガイド（PRJ_DIR ロジック・dbt コマンド・コーディング規約・スキルシステム）",
    ".env.example": "Snowflake接続情報テンプレート（ACCOUNT/USER/PASSWORD/ROLE/WAREHOUSE）",
    "load-env.ps1": "Snowflake接続情報を .env から読み込み環境変数へエクスポート（Windows PowerShell 用）",
    "workflow-core.yaml": "R1-R6ワークフロー・12ステップ・6ゲート・8人組織マトリクスのSSoT",
    "memo.txt": "メモファイル",
    ".gitignore": "Git 除外対象設定（.env・node_modules等）",
    "package.json": "依存関係・スクリプト定義（npm/yarn）",
    "tsconfig.json": "TypeScript コンパイラ設定",
  };
  if (rootFileHints[name]) return rootFileHints[name];

  // ── 汎用フォールバック ────────────────────────────────
  if (node.type === "tree") {
    const genericFolders: Record<string, string> = {
      src: "ソースコードルート", app: "アプリ本体（Next.js App Router）",
      components: "再利用UIコンポーネント", lib: "共通ロジック・ユーティリティ",
      utils: "汎用ユーティリティ関数", hooks: "React カスタムフック",
      public: "静的アセット（画像・フォント等）", api: "APIエンドポイント",
      test: "テストコード", tests: "テストコード", docs: "ドキュメント",
      config: "設定ファイル群", types: "型定義", models: "データモデル",
      services: "ビジネスロジック・サービス層", middleware: "ミドルウェア",
      migrations: "DBマイグレーション", dist: "ビルド成果物（自動生成）",
    };
    return genericFolders[name] || "フォルダ";
  }

  const ext = name.includes(".") ? name.split(".").pop()! : "";
  const extHints: Record<string, string> = {
    ts: "TypeScript ソース", tsx: "React コンポーネント（TypeScript）",
    js: "JavaScript ソース", jsx: "React コンポーネント（JavaScript）",
    py: "Python スクリプト", go: "Go ソース", rs: "Rust ソース",
    css: "スタイルシート", scss: "Sass スタイルシート", html: "HTML テンプレート",
    json: "JSON 設定・データ", yml: "YAML 設定", yaml: "YAML 設定",
    md: "Markdown ドキュメント", sql: "SQL クエリ / スキーマ",
    sh: "シェルスクリプト", ps1: "PowerShell スクリプト",
    toml: "TOML 設定", tf: "Terraform 設定", tfvars: "Terraform 変数定義",
    svg: "ベクター画像", png: "画像", jpg: "画像", ico: "アイコン",
  };
  return extHints[ext] || "ファイル";
}

function getDetailedMemo(node: TreeNode): string | null {
  const p = node.path.toLowerCase();
  const name = node.name.toLowerCase();

  // ── ルート直下ファイル ───────────────────────────────
  if (p === "readme.md") {
    return `【リポジトリ README — 人間向け入口ドキュメント】

HVD（Hyperscale Value product Delivery）フレームワークの概要・クイックスタート・
主要リソースへのリンクを集めたリポジトリの表紙。

■ 書かれている内容
・HVD とは何か（Snowflake 上の AI システムを短期間で作るフレームワーク）
・リポジトリ全体の構造説明（projects / .claude / guide 等）
・初めての方向けのクイックスタート手順
・主要コンポーネントへのリンク集

■ AI はここを読まない
Claude Code は CLAUDE.md を参照する。README.md は人間が GitHub で最初に見るドキュメント。`;
  }
  if (p === ".env.example") {
    return `【Snowflake 接続情報テンプレート — .env のひな型】

このファイルをコピーして .env を作り、実際の値を書き込む。
.env 本体は .gitignore で管理対象外（認証情報をリポジトリに含めない）。

■ 設定項目
SNOWFLAKE_ACCOUNT   — アカウント識別子（例: xy12345.ap-northeast-1.aws）
SNOWFLAKE_USER      — Snowflake ユーザー名
SNOWFLAKE_PAT       — Programmatic Access Token（パスワード代わり）
SNOWFLAKE_ROLE      — デフォルトロール（ACCOUNTADMIN など）
SNOWFLAKE_WAREHOUSE — デフォルトウェアハウス
NOTION_TOKEN        — Notion 連携が必要なプロジェクト向け（任意）

■ DATABASE / SCHEMA は別管理
プロジェクト固有の DATABASE / SCHEMA は design/02-architecture.yaml が SSOT。
load-env.ps1 が design.yaml から自動導出して環境変数に export する（ADR-0060 v1.2）。

■ セキュリティ
.claude/hooks/validate-secrets.sh が pre-commit で接続情報の混入を自動ブロック。`;
  }
  if (p === "load-env.ps1") {
    return `【PowerShell 環境変数ローダ — dbt / Terraform 実行前に必ず実行する】

リポジトリルートの .env と PRJ_DIR の design.yaml から環境変数を一括 export する
Windows PowerShell 専用スクリプト。

■ 実行方法
. .\\load-env.ps1                          # cwd から PRJ_DIR を自動検出
. .\\load-env.ps1 -ProjectDir jcg-platform # プロジェクトを明示指定
. .\\load-env.ps1 -Quiet                   # 出力サマリを非表示
$env:HVD_ENV='prod'; . .\\load-env.ps1    # 本番環境の値を export

■ 処理内容
1. .env を読み込み Process スコープの環境変数に export
2. PRJ_DIR を自動検出して get_design_foundation.py を呼び出す
3. design/02-architecture.yaml から以下を export:
   SNOWFLAKE_DATABASE / SNOWFLAKE_SCHEMA / SNOWFLAKE_WAREHOUSE
   SNOWFLAKE_COMPUTE_POOL / SNOWFLAKE_IMAGE_REPOSITORY

■ ADR-0060 v1.2
dbt_project.yml#vars への DATABASE/SCHEMA 直書きは廃止済み。
このスクリプトが全消費者（dbt / Terraform / SPCS）の環境変数を一元提供する。`;
  }
  if (p === ".gitignore") {
    return `【Git 管理除外設定】

■ 主な除外対象
.env                    — Snowflake 認証情報（絶対にコミットしない）
node_modules/           — npm パッケージ（npm install で再生成）
.next/                  — Next.js ビルド成果物
dist/ build/            — ビルド出力
__pycache__/ .venv/     — Python キャッシュ・仮想環境
*.tfstate *.tfstate.*   — Terraform state（認証情報を含む場合あり）
keys/                   — RSA 鍵ファイル

■ validate-secrets.sh との連携
pre-commit フックが .env 以外のファイルにも接続情報が混入していないか検査。
.gitignore に追加するだけでは不十分。フックが最後の砦。`;
  }
  if (p === "verify-warnings.txt") {
    return `【検証スクリプトの警告ログ（一時ファイル）】

scripts/verify_*.py や scripts/lint_*.py の実行結果のうち
🟡 warning レベルの出力を保存したファイル。

■ 使い方
CI が 🔴 error を検出するとビルド失敗。🟡 warning はこのファイルに蓄積され
次のスプリントで対処する課題リストとして扱う。

■ 注意
このファイルの内容は古くなりやすい。現在の状態は
scripts/verify_crud.py 等を直接実行して確認する。`;
  }
  if (p === ".gitattributes") {
    return `【Git 属性設定 — 改行コード / diff / マージ戦略を制御】

■ 主な設定
* text=auto              — 改行コードを OS に合わせて自動変換
*.ps1 text eol=crlf      — PowerShell は CRLF 固定（Windows 実行のため）
*.sh text eol=lf         — シェルスクリプトは LF 固定（Unix 実行のため）
*.yaml linguist-language=YAML  — GitHub の言語統計設定`;
  }
  if (p === "plan" && node.type === "tree") {
    return `【開発ロードマップ・計画ドキュメント格納フォルダ】

プロジェクトの中長期計画・スプリント計画・マイルストーンを管理するフォルダ。
ADR に至る前の「検討中」の構想や、リリース計画を記録する。`;
  }
  if (p === ".github" && node.type === "tree") {
    return `【GitHub Actions CI/CD 設定フォルダ】

プルリクエスト・プッシュ時に自動実行される CI ワークフローを定義する。

■ 主な CI チェック
・skill-validate.yml — skill.unit.yaml ↔ SKILL.md のドリフト検出（S1-S14）
・verify-design.yml  — design.yaml の必須セクション・スキーマ検証
・lint-fixed-cost.yml — Cortex Search / CRON Task の混入検出（🔴 error）
・validate-secrets.sh — 接続情報の混入検出

■ 段階的エスカレーション
warning → error の段階昇格で運用。
最初は warning で周知し、次スプリントで error 化してブロックする。`;
  }

  // ── biz/01-strategy/ フォルダ ─────────────────────────
  if (p === "biz/01-strategy" && node.type === "tree") {
    return `【経営戦略ドキュメント集 — HVD 事業の「なぜ・何を・どうやって」を定義する 10 本のファイル】

このフォルダは「AI システムを作る技術」ではなく「なぜその事業をやるのか」を記述する。
エンジニアが設計判断に迷ったとき・新メンバーへの説明資料・顧客提案の背景理解に使う。

■ 収録ドキュメント（10 本）
01-vision-mission-and-theme.md   — AI 駆動経営を目指す 2 大テーマとビジョン・ミッション
02-why-now.md                    — なぜ今 AI か（判断スピード・競争優位・時代背景）
03-ai-accelerator-program.md     — 顧客を 5 ステップで AI 活用組織にする支援モデル
04-solution-stack.md             — 提供価値の 4 点セット（プログラム×アプリ×スキル×設計情報）
05-standard-apps-and-rollout.md  — 1 号機で標準形を作り 2 号機以降で横展開する戦略
06-two-pillar-engineers.md       — PdE（プロダクト）と FDE（フロント）の役割分担
07-customers-and-engagement.md   — 最初の顧客は「自社 as lead 事業部」というエンゲージメント方針
08-pricing-and-scarcity.md       — アクセシブル・ラグジュアリーの価格戦略と希少性設計
09-business-model.md             — リセラー / 派遣 / 製品 / 運用代行の 4 本柱収益構造
10-execution.md                  — 3 ステージ立ち上げ計画と品質ガードレール

■ biz/02-themes/ との関係
01-strategy で「なぜ・どんな顧客に・何を届けるか」を決め、
02-themes でそれを「どの業種ドメインのどの AI アプリで実現するか」に落とし込む。`;
  }

  // ── biz/02-themes/ フォルダ ────────────────────────────
  if (p === "biz/02-themes" && node.type === "tree") {
    return `【投資テーマ別ポートフォリオ管理 — 6 業種 AI テーマを governed に管理するフォルダ】

01-strategy の「大テーマ」を業種・ユースケース単位に分解した「テーマポートフォリオ」。
CMO が月次（T1）/四半期（T2）の biz cycle で各テーマを見直す。

■ 現在収録されているテーマ（6 個）
ai-accelerator-platform     — AI 活用支援プラットフォーム（AI 活用組織育成支援）
b2b-tech-matching           — 顧客課題 × 技術カタログの AI マッチング
gov-ai-platform             — 行政業務向け AI 支援プラットフォーム
profit-cost-visibility      — 経営ダッシュボード AI（収益・コスト可視化）
regulated-compliance-check  — 法令審査 AI（規制コンプライアンスチェック）
support-ai-triage           — 問い合わせ自動分類 AI（サポートトリアージ）

■ 各テーマの 7 ファイル構成
theme.yaml         — $ref 統合 SSOT（直接編集禁止）
00-meta.yaml       — ID・ステータス（active/planned/archived）・オーナー・対象組織
01-motivation.yaml — 解決する課題・提供価値・成功指標
02-customers.yaml  — ターゲット組織・典型ペルソナ（職種・課題・意思決定権）
03-constraints.yaml — 規制・予算・データ感度等の非機能制約
04-features.yaml   — ビジネス機能リスト（AI が提供するユーザー向け機能）
05-projects.yaml   — 実装プロジェクト一覧（project_id / role / directive）
evidence.md        — VoC / RFP / Discovery の自由記述エビデンス

■ index.yaml と Don't Build pre-check
biz/02-themes/index.yaml が全テーマを索引する。
新プロジェクト企画時は biz/projects-inventory.yaml と照合して
「同じ機能を別プロジェクトが既に作っていないか」を確認する（md-scope Phase 0.5）。`;
  }

  // ── biz/01-strategy/ 個別ファイル ─────────────────────
  if (p === "biz/01-strategy/01-vision-mission-and-theme.md") {
    return `【経営ビジョン・ミッション・大テーマ定義】

「AI 活用組織育成」と「AI アプリのレバレッジ」という 2 つの大テーマを定義。
最終到達目標「AI 駆動経営」を記述した戦略の起点ドキュメント。

HVD が何のために存在するか — の答えがここに書かれている。`;
  }
  if (p === "biz/01-strategy/02-why-now.md") {
    return `【なぜ今 AI を使わなければならないのか — 時代背景と競争優位】

判断のスピード・粒度・根拠の質が競争力になる時代における
現場主導の AI 活用が必須となる理由を論じたドキュメント。

顧客への提案資料作成時・新メンバーへの背景説明時に参照する。`;
  }
  if (p === "biz/01-strategy/03-ai-accelerator-program.md") {
    return `【AI アクセラレータープログラム — 5 ステップ顧客支援モデル】

顧客現場に AI 活用チームを立ち上げ、最終的に「AI 駆動経営」に到達させる
5 ステップのプログラム設計書。

FDE（Forward Deployed Engineer）が顧客に提供するサービスの全体像を定義する。`;
  }
  if (p === "biz/01-strategy/04-solution-stack.md") {
    return `【ソリューションスタック — プログラム × アプリ × スキル × 設計情報の 4 点セット】

顧客に提供する価値の構成要素を定義したドキュメント。
1. AI アクセラレータープログラム
2. 標準アプリ（繰り返し展開可能な業種別テンプレート）
3. HVD スキルセット（55 スキル）
4. design.yaml による設計情報の一元化`;
  }
  if (p === "biz/01-strategy/05-standard-apps-and-rollout.md") {
    return `【標準アプリ戦略 — 1 号機で標準形を作り 2 号機以降で横展開】

「1 軒目は赤字覚悟でも標準形を作る / 2 軒目以降は爆速展開」の戦略を記述。
VoC × RFP エンジンが第 1 号標準アプリとして位置付けられている。

biz/02-themes/ の各テーマが「標準アプリ昇格」を目指す設計になっている理由がここに書かれている。`;
  }
  if (p === "biz/01-strategy/06-two-pillar-engineers.md") {
    return `【二本柱エンジニアリング — PdE と FDE の役割分担】

PdE（Product Engineer）と FDE（Forward Deployed Engineer）の 2 役割を定義。
・PdE: 標準アプリと HVD スキルを進化させ、個別開発量を構造的に最小化
・FDE: 顧客現場で design.yaml に意図を集約し、高速・高品質に AI システムを届ける

「Maximum Delivery, Minimum Development」のキャッチコピーの裏側。`;
  }
  if (p === "biz/01-strategy/07-customers-and-engagement.md") {
    return `【顧客定義とエンゲージメントモデル】

立ち上げ期の最初の顧客は「自社 as lead 事業部」と定義。
業界特化せず、自プロダクトループを回すことから始めるエンゲージメント方針を記述。`;
  }
  if (p === "biz/01-strategy/08-pricing-and-scarcity.md") {
    return `【価格戦略と希少性設計 — アクセシブル・ラグジュアリー】

「高いけど手が届く」ポジショニングの価格戦略と
供給を意図的に絞ることで価値を維持する希少性設計を記述。`;
  }
  if (p === "biz/01-strategy/09-business-model.md") {
    return `【ビジネスモデル — 4 本柱の収益構造】

リセラー / エンジニア派遣 / 製品販売 / 運用代行の 4 本柱で
フロー収益とストック収益を組み合わせたビジネスモデルを定義。`;
  }
  if (p === "biz/01-strategy/10-execution.md") {
    return `【実行計画 — 3 ステージ立ち上げと品質ガードレール】

「量より質」を機械的に守るための 3 ステージ段階的立ち上げ計画と
品質ガードレール（受注基準・断るケース）を記述。`;
  }

  // ── biz/02-themes/ ────────────────────────────────────
  if (p === "biz/02-themes/index.yaml") {
    return `【ビジネステーマ一覧インデックス】

biz/02-themes/ 配下の全テーマの ID・ラベル・ステータス・オーナーを
一覧で索引したファイル。CMO が biz cycle で全体俯瞰する際に参照する。`;
  }
  if (p === "biz/02-themes/_directive-status.md") {
    return `【テーマ実行指示のステータス管理】

各テーマの「実行指示」（プロジェクト起票・予算承認・優先度変更等）の
現在のステータスを管理するドキュメント。CMO が更新し CEO が確認する。`;
  }
  // テーマフォルダ共通パターン
  const themeMatch = p.match(/^biz\/02-themes\/([^/]+)$/);
  if (themeMatch && node.type === "tree") {
    const tid = themeMatch[1];
    const labels: Record<string, string> = {
      "ai-accelerator-platform": "AI アクセラレーター基盤（AI 活用支援プラットフォーム）",
      "b2b-tech-matching": "B2B 技術マッチング（顧客課題 × 技術カタログの AI マッチング）",
      "gov-ai-platform": "行政 AI プラットフォーム（行政業務向け AI 支援）",
      "profit-cost-visibility": "収益・コスト可視化（経営ダッシュボード AI）",
      "regulated-compliance-check": "規制コンプライアンスチェック（法令審査 AI）",
      "support-ai-triage": "サポート AI トリアージ（問い合わせ自動分類 AI）",
    };
    const label = labels[tid] || tid;
    return `【ビジネステーマ: ${label}】

HVD が投資・開発の対象とする業種ドメイン別テーマのフォルダ。

■ フォルダ構成
theme.yaml         — $ref 統合 SSOT（直接編集しない）
00-meta.yaml       — テーマ ID・ステータス・オーナー・対象組織
01-motivation.yaml — 解決する顧客課題と提供価値
02-customers.yaml  — ターゲット組織とペルソナ定義
03-constraints.yaml — 規制・予算・データ感度等の制約
04-features.yaml   — ビジネス機能リスト（AI が実装する機能）
05-projects.yaml   — このテーマを実装するプロジェクト一覧
evidence.md        — VoC / RFP / Discovery メモ（自由記述）

■ biz cycle との連携
CMO が月次（T1）/四半期（T2）でこのテーマを見直す。
新プロジェクト起票時は biz-theme-manage スキルで 05-projects.yaml を更新する。`;
  }
  const themeFileMatch = p.match(/^biz\/02-themes\/([^/]+)\/(.+)$/);
  if (themeFileMatch) {
    const tid = themeFileMatch[1];
    const fname = themeFileMatch[2];
    if (fname === "theme.yaml") return `【${tid} テーマ統合 SSOT】7 分割ファイルを $ref で統合するマスターファイル。直接編集禁止。各分割ファイル（00〜05）を編集する。`;
    if (fname === "00-meta.yaml") return `【${tid} テーマメタデータ】ID・ラベル・ステータス（active/planned/archived）・オーナー・対象組織・作成日を定義。`;
    if (fname === "01-motivation.yaml") return `【${tid} 課題と価値定義】解決する顧客課題（problem）・提供価値（value）・成功指標（success_metrics）を記述。このテーマが「なぜ必要か」の答え。`;
    if (fname === "02-customers.yaml") return `【${tid} 顧客ペルソナ定義】ターゲット組織の種別・典型的なペルソナ（職種・課題・意思決定権）を定義。`;
    if (fname === "03-constraints.yaml") return `【${tid} 制約条件】法規制・認定要件・予算上限・データ感度・組織的制約を定義。設計時に守るべき Non-Functional Requirements の源泉。`;
    if (fname === "04-features.yaml") return `【${tid} ビジネス機能リスト】このテーマが提供するユーザー向けビジネス機能（F-* ではなくテーマ粒度の機能）の一覧。projects-inventory.yaml の capabilities と対応する。`;
    if (fname === "05-projects.yaml") return `【${tid} 紐付きプロジェクト】このテーマを実装する projects/<name>/ の一覧（project_id / role / feature_coverage）。テーマ → プロジェクトの配線を管理する。`;
    if (fname === "evidence.md") return `【${tid} エビデンス・VoC メモ（自由記述）】顧客ヒアリング（VoC）・RFP・Discovery ノートを自由記述で蓄積するファイル。このテーマが実在する市場ニーズに基づくことを示す証跡。`;
  }

  // ── iac/shared-dev/*.tf ────────────────────────────────
  if (p === "iac/shared-dev" && node.type === "tree") {
    return `【共有開発環境インフラ Terraform 設定】

全プロジェクトが共有する Snowflake 開発インフラを Terraform で管理するフォルダ。
ADR-0054（共有リソース戦略）/ ADR-0059（base/governance 分離）に基づく。

■ 管理リソース
HVD_DEV_WH        — 共有ウェアハウス（XSMALL / 60 秒オートサスペンド）
HVD_DEV_POOL      — 共有コンピュートプール（SPCS 用 CPU_X64_XS）
REPO_DEV          — Docker イメージリポジトリ
HVD_DEV_DEPLOY    — デプロイ権限ロール（dbt apply / SPCS push）
HVD_DEV_OBSERVER  — 読み取り専用ロール（smoke test / audit / E2E 読み取り）

■ プロジェクト IaC との分離（ADR-0059）
プロジェクト個別 IaC（projects/<name>/iac/）から resource 宣言しない。
terraform destroy でここが消えないよう、projects 側は文字列参照のみ。`;
  }
  if (p === "iac/shared-dev/warehouses.tf") {
    return `【共有開発ウェアハウス定義（ADR-0054）】

全プロジェクトが共有する Snowflake ウェアハウス HVD_DEV_WH を定義。

■ 設定値
名前: HVD_DEV_WH / サイズ: XSMALL（最小コスト）
オートサスペンド: 60 秒（アイドル後すぐ停止でコスト最小化）
初期状態: SUSPENDED（起動は dbt run / SPCS 起動時に自動）

■ なぜ 1 つ共有するか
プロジェクトごとに WH を作ると開発中の固定費が膨らむ。
本番（prod）では各プロジェクトが専用 WH を持つが、
dev は ADR-0054 の判断で 1 つを共有してコストを最小化。`;
  }
  if (p === "iac/shared-dev/compute_pools.tf") {
    return `【共有開発コンピュートプール定義（SPCS 用）】

SPCS（Snowpark Container Services）で Next.js アプリを動かすための
共有コンピュートプール HVD_DEV_POOL を定義。

■ 設定値
名前: HVD_DEV_POOL / インスタンス: CPU_X64_XS（最小スペック）
ノード数: 最小 1 / 最大 1（開発時はスケールアウトしない）
オートサスペンド: 300 秒（5 分アイドルで自動停止）

■ provider v2 の注意点
min_nodes >= 1 が必須（0 は不可）。
ゼロアイドルは auto_suspend_secs で代替。`;
  }
  if (p === "iac/shared-dev/system_roles.tf") {
    return `【開発用システムロール定義（HVD_DEV_DEPLOY / HVD_DEV_OBSERVER）】

開発操作に使う 2 種類のシステムロールを定義する。dev 環境のみ作成。

■ HVD_DEV_DEPLOY
dbt apply / SPCS service push 等のデプロイ操作に使うロール。
CI/CD パイプラインのサービスアカウント（T_E2E_RUNNER_WRITE）に付与される。

■ HVD_DEV_OBSERVER
読み取り専用ロール。smoke test / audit / E2E の read が用途。
T_E2E_RUNNER_RO / T_SMOKE_AUDIT_RO に付与される。`;
  }
  if (p === "iac/shared-dev/locals.tf") {
    return `【Terraform ローカル変数定義（共有インフラの名前・環境フラグ）】

共有 IaC 全体で使う変数をまとめる。
他の .tf ファイルはここで定義した名前を参照し、ハードコードを避ける。

■ 主な変数
is_dev / is_prod       — 環境フラグ（リソース出し分けに使う）
dev_warehouse_name     — HVD_DEV_WH
dev_compute_pool_name  — HVD_DEV_POOL
dev_image_repo_name    — REPO_DEV
utility_users          — CI ユーザー → ロールのマッピング表
  T_E2E_RUNNER_RO    → HVD_DEV_OBSERVER
  T_E2E_RUNNER_WRITE → HVD_DEV_DEPLOY
  T_SMOKE_AUDIT_RO   → HVD_DEV_OBSERVER`;
  }
  if (p === "iac/shared-dev/main.tf") {
    return `【Terraform プロバイダー設定・バックエンド設定】

Snowflake プロバイダーのバージョン指定と
state ファイルの保存先（backend）を定義するエントリポイント。

Snowflake provider v2 を使用。v1 との互換性なし（ADR 参照）。`;
  }
  if (p === "iac/shared-dev/variables.tf") {
    return `【Terraform 入力変数定義（apply 時に渡す値）】

terraform apply 時に外部から注入する変数を定義する。
SNOWFLAKE_ACCOUNT / SNOWFLAKE_USER / SNOWFLAKE_PAT 等の接続情報や
環境名（dev/prod）の切り替えフラグ。

実際の値は keys/ フォルダの .tfvars ファイルに書き .gitignore で管理対象外にする。`;
  }
  if (p === "iac/shared-dev/outputs.tf") {
    return `【Terraform 出力値定義（apply 後に参照できる値）】

terraform apply 完了後に他のツールやスクリプトが参照できる値を定義。
ウェアハウス名・コンピュートプール名・イメージリポジトリ URL 等を出力し
projects/<name>/iac/ の locals.tf から文字列参照できるようにする。`;
  }
  if (p === "iac/shared-dev/users.tf") {
    return `【Terraform CI/CD サービスユーザー定義（ADR-0055）】

E2E テスト・Smoke Test・CI デプロイに使う Snowflake サービスアカウントを定義。
RSA キー認証のみ（パスワード不使用）で接続する（ADR-0055）。

■ 定義ユーザー
T_E2E_RUNNER_RO    — E2E 読み取り専用（HVD_DEV_OBSERVER）
T_E2E_RUNNER_WRITE — E2E 書き込み（HVD_DEV_DEPLOY）
T_SMOKE_AUDIT_RO   — Smoke / Audit 読み取り専用（HVD_DEV_OBSERVER）`;
  }
  if (p === "iac/shared-dev/image_repos.tf") {
    return `【Terraform Docker イメージリポジトリ定義（SPCS 用）】

SPCS（Snowpark Container Services）に Next.js アプリの Docker イメージを
プッシュするための Snowflake Image Repository REPO_DEV を定義。

CI/CD がビルドした Docker イメージをここにプッシュし、
compute_pools.tf のプールで実行される SPCS Service が参照する。`;
  }

  // ── guide/ 個別ファイル ─────────────────────────────────
  if (p === "guide/01-agent-team.md") {
    return `【8 体 CxO チーム → CADRE 8 役割 移行ガイド（ADR-0116）】

HVD の AI エージェントチームの役割・判断軸・専門領域を定義したドキュメント。
ADR-0116 で旧 CxO 体制（CEO/COO/CTO 等）から CADRE 8 役割への統一が進行中。

■ CADRE 8 役割
architect   — 技術設計・design.yaml 更新 DRI
pm          — プロジェクト管理・スプリント計画
orchestrator — タスク割り振り・エージェント間連携
worker      — 実装担当（設計に従って生成）
reviewer    — 品質ゲート・検証・承認
doc         — ドキュメント生成・narrative 作成
marketing   — GTM・顧客提案・事業計画
designer    — UI/UX 設計・ワイヤーフレーム`;
  }
  if (p === "guide/02-how-to-call.md") {
    return `【スキル呼び出し判断ガイド — やりたいこと → どのスキルを使うか】

「〜したい」という目的から、呼ぶべきスキル名を逆引きするガイド。

■ 主な逆引き例
新規プロジェクト開始            → md-scope
機能要件を design.yaml に追加   → md-features
dbt モデルを実装したい          → sf-dbt-project
Web ページを作りたい            → vc-ui-build
AI エージェントをデプロイしたい → sf-deploy-agent
設計の整合性を確認したい        → hvd-verify`;
  }
  if (p === "guide/03-collaboration.md") {
    return `【エージェント協働フロー — dev cycle / biz cycle の動かし方】

dev cycle（内側ループ）と biz cycle（外側ループ）の二重ループ構造と
エージェント間のハンドオフ・ゲート承認フローを解説するガイド。

■ 説明している内容
・dev cycle: R1a→R1b→…→R6b の 12 ステップを進めるフロー
・biz cycle: CMO が月次/四半期でテーマポートフォリオを見直すフロー
・フェーズ境界での .hvd/handoff/ ドキュメント作成手順
・品質ゲート（G-R1〜G-R6）の承認フロー
・並走パターンとアンチパターン`;
  }
  if (p === "guide/04-quality-gates.md") {
    return `【品質ゲート G1-G4 — 検証基準・hooks・rules・CI 詳細】

各フェーズ境界で通過が必要な品質ゲートの基準と
自動検証インフラ（git hooks / rules / CI）を説明するガイド。

■ 品質ゲート一覧
G-R1: 設計基盤ゲート（design.yaml 構造・目的整合）
G-R2: 要件整合ゲート（仕様カバレッジ・機能トレーサビリティ）
G-R3: 実装受入ゲート（CRUD 整合・ADR 準拠・セキュリティ）
G-R4: AI 動作ゲート（Agent smoke test・SV クエリ動作）
G-R5: UI 動作ゲート（E2E テスト・アクセシビリティ）
G-R6: セキュリティゲート（RBAC・Secure View・監査ログ）

■ 自動化インフラ
validate-*.sh（git pre-commit）/ rules/*.md（path-scoped）/ GitHub Actions`;
  }
  if (p === "guide/05-project-setup.md") {
    return `【プロジェクト新規作成手順 — .env / design.yaml / PRJ_DIR 設定】

新しいプロジェクトを projects/<name>/ に作成してから開発を始めるまでの
ステップバイステップ手順を説明するガイド。

■ 手順
1. projects/<name>/ ディレクトリ作成
2. .env に SNOWFLAKE_ACCOUNT / USER / PAT / ROLE / WAREHOUSE を設定
3. load-env.ps1 を実行して環境変数を export
4. md-scope スキルを実行して design.yaml の骨格を生成
5. hvd-dev-cycle を起動して R1a から開発を開始

■ design.yaml の分割管理（ADR-0073）
大規模プロジェクトでは design/ フォルダに分割して $ref で統合する。
必須 6 ファイル: 01-purpose / 02-architecture / 04-datasources /
                 08-data_models / 09-capabilities / 12-governance`;
  }
  if (p === "guide/06-skill-system.md") {
    return `【スキルシステム詳細 — SKILL.md 仕様・スキルカタログ・CI 検証】

スキルのライフサイクル・SKILL.md フロントマター仕様・
スキルカタログの自動生成・CI 検証を解説するガイド。

■ スキルカタログ
全 55 スキルを 7 カテゴリ（design/implement/verify/document/manage/operate/specialist）
で管理。.claude/framework/skill-index.md が人間向け一覧。

■ SKILL.md の役割
skill.unit.yaml が SSOT（事実）で SKILL.md が narrative（人間向け説明）。
同じ事実を両方に書いてはいけない（ADR-0073 YAML-Anchored SSOT）。

■ CI 検証
scripts/verify_skill_ssot.py（S1-S14）が毎 PR で unit ↔ narrative の
ドリフト・必須キー欠落・id 不一致を検出する。`;
  }
  if (p === "guide/08-cadre.md") {
    return `【CADRE フレームワーク — HVD 設計原則の外部フレームワーク実装】

CADRE（Contract-anchored / ADR-governed / Dual-representation /
Role-separated / Execution-stratified）の 5 原則と
HVD での実装方法を解説するガイド。

■ CADRE 5 原則
C: Contract-anchored  — design.yaml / skill.unit.yaml が契約的 SSOT
A: ADR-governed       — 設計変更は必ず ADR で記録（ADR-0109 等）
D: Dual-representation — YAML（AI 向け）+ Markdown（人間向け）の二重表現
R: Role-separated     — architect/worker/reviewer 等の明確な役割分担
E: Execution-stratified — 設計層 / 実行層 / 検証層の分離

■ 関連 ADR
ADR-0111（retry_policy）/ ADR-0112（intent メタデータ）/
ADR-0113（escalation）/ ADR-0114（CADRE §5 完全準拠）`;
  }

  // ── .agents/ フォルダ ──────────────────────────────────
  if (p === ".agents" && node.type === "tree") {
    return `【公開エクスポート用スキル集（外部 AI ツール向け）】

jcg_snowflake 固有の HVD スキルとは異なり、外部 AI ツール（Claude.ai / GitHub Copilot 等）
から直接呼び出せる形に整備された独立スキルの公開配布フォルダ。

■ .claude/skills/ との違い
.claude/skills/ — HVD ワークフローに組み込まれた内部スキル（55 本）
.agents/skills/ — 独立して使える公開スキル（40+ 本）

■ 主なスキルカテゴリ
Snowflake 関連: snowflake-docs / semantic-view / snowpipe-bcdr
Next.js 関連: nextjs / next-forge / next-cache-components / next-upgrade
AI 関連: ai-sdk / ai-gateway / chat-sdk
インフラ: terraform-stacks / terraform-test / terraform-style-guide
セキュリティ: security-review / rbac / auth
その他: entity-resolution / mlops / routing-middleware / shadcn`;
  }
  // .agents/skills/* パターン
  const agentSkillMatch = p.match(/^\.agents\/skills\/([^/]+)(\/.*)?$/);
  if (agentSkillMatch) {
    const skillName = agentSkillMatch[1];
    if (!agentSkillMatch[2]) return `【公開スキル: ${skillName}】外部 AI ツールから独立して呼び出せる公開スキル。SKILL.md がエントリポイント。`;
  }

  // ── tests/ フォルダ（ルート直下）─────────────────────
  if (p === "tests" && node.type === "tree") {
    return `【クロスプロジェクト テストインフラ】

リポジトリ全体に影響する git hooks・検証スクリプト・スキルの
テストスイートを格納するフォルダ。

■ サブフォルダ
tests/hooks/    — git フック（validate-*.sh）の自動テスト
  test-validate-design-yaml.sh  設計 YAML 検証フックのテスト
  test-validate-doc-edit.sh     自動生成物保護フックのテスト
  test-validate-prj-dir.sh      プロジェクト境界フックのテスト
  test-validate-secrets.sh      秘密情報検出フックのテスト

tests/scripts/  — 検証スクリプト（verify_*.py）の単体テスト
  test_migrate_v2.py            設計 YAML v1→v2 マイグレーションのテスト
  test_resolve_design_refs.py   design $ref 解決のテスト

tests/skills/   — スキルの入力 / 期待出力による回帰テスト
  md-scope/     inputs/basic.yaml → expected/basic/design.yaml
  hvd-ui-eval/  UI 品質評価スキルのテスト

■ 実行方法
bash tests/hooks/run-all.sh        # フックテスト一括実行
pytest tests/scripts/              # スクリプトテスト`;
  }
  if (p === "tests/hooks" && node.type === "tree") {
    return `【git フック（validate-*.sh）の自動テスト群】

.claude/hooks/ の各検証フックが正しく動作するかを確認するシェルテスト。
フック改修時の回帰テストとして使う。run-all.sh で一括実行。`;
  }
  if (p === "tests/scripts" && node.type === "tree") {
    return `【検証スクリプト（verify_*.py）の単体テスト群】

scripts/ 配下の Python スクリプトに対する pytest テスト。
スクリプト改修時に意図しない挙動変更が起きていないかを確認する。`;
  }
  if (p === "tests/skills" && node.type === "tree") {
    return `【スキルレベル回帰テスト — 入力 YAML → 期待出力 design.yaml】

スキル（md-scope 等）の入力とその期待出力を fixtures として保持し
スキル改修時に出力が壊れていないかを確認するテストケース集。`;
  }

  // ── biz/ フォルダ ────────────────────────────────────
  if (p === "biz" && node.type === "tree") {
    return `【ビジネス戦略・ポートフォリオ管理ディレクトリ】

エンジニアリングではなく「事業」の視点でリポジトリを管理するフォルダ。
「何のために AI システムを作るのか」の答えをここに集約する。

■ 構造
biz/01-strategy/   — 経営戦略ドキュメント（Vision/Mission/Why Now/顧客定義/価格戦略等）
biz/02-themes/     — 投資テーマ別ポートフォリオ（governed-compliance-check 等の業種ドメイン）
biz/projects-inventory.yaml  — 全プロジェクトの資産カタログ SSOT

■ なぜ必要か
・開発するプロジェクトを「このテーマの何のために」と常に紐付けるため
・新規プロジェクト企画時に「同じ機能を別プロジェクトが既に作っていないか」
  を確認する Don't Build pre-check の入力源（md-scope Phase 0.5）
・CMO が月次（T1）/四半期（T2）の biz cycle で portfolioを見直す際の SSOT

■ 02-themes の構造（各テーマフォルダ）
theme.yaml           — $ref 統合 SSOT
00-meta.yaml         — テーマID・ステータス・オーナー
01-motivation.yaml   — 解決する課題・提供価値
02-customers.yaml    — 顧客ペルソナ定義
03-constraints.yaml  — 制約条件
04-features.yaml     — ビジネス機能リスト
05-projects.yaml     — 紐付くプロジェクト一覧`;
  }

  if (p === "biz/projects-inventory.yaml") {
    return `【全プロジェクト資産カタログ SSOT】

すべての projects/<name>/ に存在する資産（データモデル・機能・データソース）を
横断的に索引したファイル。git 管理された「在庫台帳」。

■ なぜ必要か
複数プロジェクトが別々に同じデータモデル（例: customer）を作ってしまうと
データの二重管理・不整合が生じる。このファイルを参照して「既にあるなら再利用」
「拡張できるなら拡張」の判断をするための照合台帳として使う。

■ 記載内容（プロジェクトごと）
decisions    — 意思決定ポイント（Cortex Agent が回答する問いの定義）
data_models  — データモデル一覧（layer: source/mart/hybrid + PK + 概要）
capabilities — 機能一覧（action/function/agent の種別・名前・概要）
datasources  — 外部データソース（Excel/XML/API 等の接続元）

■ 現在収録されているプロジェクト
・egov-compliance    — 法令コンプライアンスチェック AI
・faq-classification — FAQ 自動分類 AI
（他プロジェクトも同様に収録）

■ 更新タイミング
biz-portfolio-sync スキルが projects/*/design.yaml の変更を検出して自動同期。
同じ PR で design.yaml を変更したら必ずこのファイルも更新する（CI で検出）。

■ 照合方法（Don't Build pre-check）
indexes.data_models_by_name.<name>           — データモデル名で重複確認
indexes.capabilities_by_pattern.<verb>_<noun> — 機能パターンで重複確認
indexes.datasources_by_external_system.<id>  — データソースで重複確認`;
  }

  // ── guide/ フォルダ ──────────────────────────────────
  if (p === "guide" && node.type === "tree") {
    return `【HVD フレームワーク ユーザー向けドキュメント集】

CLAUDE.md や workflow-core.yaml に書かれた「事実」を
人間が読みやすい形で説明した narrative ドキュメント群。

■ 各ガイドの役割
guide/00-getting-started.md   — 初学者向け 10 分入門（まずここを読む）
guide/01-agent-team.md        — 8 体 CxO チームの役割・判断軸・専門領域
guide/02-how-to-call.md       — やりたいこと → どのスキルを呼ぶかの判断ガイド
guide/03-collaboration.md     — 開発サイクル・ゲート承認・エージェントハンドオフ手順
guide/04-quality-gates.md     — G1-G4 品質ゲートの基準・hooks/rules/CI 詳細
guide/05-project-setup.md     — 新規プロジェクト作成手順・.env 設定・design.yaml 管理
guide/06-skill-system.md      — スキルのライフサイクル・SKILL.md フロントマター仕様
guide/07-development-pipeline.md — R1-R6 パイプライン詳細（workflow-core.yaml の narrative）
guide/08-cadre.md             — CADRE 設計原則（Clarity/Accountability/Division/Resilience/Evidence）

■ 注意
guide/07-development-pipeline.md は workflow-core.yaml の自動生成 narrative。
直接編集禁止（docs-readonly ルール）。事実を変更する場合は workflow-core.yaml を編集する。

■ AI はこれを読まない
これらは人間向け。Claude Code は CLAUDE.md と .claude/ 配下を直接参照する。`;
  }

  // ── iac/ フォルダ（ルート直下・共有インフラ）────────
  if (p === "iac" && node.type === "tree") {
    return `【共有インフラ Infrastructure as Code（Terraform）】

複数プロジェクトが共通で使う Snowflake インフラリソースを
Terraform で管理するフォルダ。

■ なぜルート直下にあるのか
プロジェクトごとの IaC（projects/<name>/iac/）とは別に、
全プロジェクトが共有する「土台インフラ」は一箇所で管理する。
→ 共有リソースを誤って terraform destroy しないための分離（ADR-0059）。

■ iac/shared-dev/ の内容（HVD 開発環境の共有リソース）
warehouses.tf      — 共有ウェアハウス（HVD_DEV_WH）
compute_pools.tf   — SPCS 共有コンピュートプール（HVD_DEV_POOL）
image_repos.tf     — Docker イメージリポジトリ
system_roles.tf    — システムロール（SYSADMIN 配下の共有ロール）
users.tf           — CI/CD サービスアカウント等の共有ユーザー
locals.tf          — プロジェクト名・環境名等の共通変数

■ プロジェクト IaC との関係（ADR-0054 / ADR-0059）
・共有リソースは projects/<name>/iac/ から resource 宣言しない
  （terraform destroy で共有インフラが消えないよう）
・プロジェクト IaC は locals { name = "HVD_DEV_WH" } の文字列参照のみ
・managed_by: shared / project の切り分けは design.yaml が SSOT

■ 管理者のみが apply する
開発者は通常触らない。共有インフラ変更は PdE（Product Engineer）判断で行う。`;
  }

  // ── scripts/ フォルダ ──────────────────────────────
  if (p === "scripts" && node.type === "tree") {
    return `【クロスプロジェクト共有スクリプト集（129+ Python ファイル）】

CI・品質ゲート・スキル管理・Snowflake 運用を担う Python スクリプト群。
argparse + logging + 終了コード規約（scripts-style ルール）に従う。

■ カテゴリ別の主要スクリプト

▼ verify_*.py — 設計・実装の整合性検証（CI でエラー検出）
  verify_crud.py               R1-R50 CRUD 整合性（50+ ルール）
  verify_design_foundation.py  design.yaml × Terraform の整合
  verify_skill_ssot.py         skill.unit.yaml ↔ SKILL.md のドリフト検出
  verify_feature_traceability.py  F-* 機能のトレーサビリティ
  verify_spec_coverage.py      仕様書カバレッジ（SC1-SC4）

▼ lint_*.py — アンチパターン検出（CI で警告/エラー）
  lint_fixed_cost_objects.py   Cortex Search / CRON Task の混入検出（🔴）
  lint_agent_descriptions.py   agent.md のフレームワーク fact 再掲禁止
  lint_portfolio_sync.py       projects-inventory.yaml 未同期検出
  lint_messages.py             エージェント間通信 JSONL の整合性

▼ lookup_workflow.py — workflow-core.yaml CLIクエリツール
  --r / --step / --gate / --agent / --skill で SSOT を参照
  agent.md / SKILL.md からの fact 直参照の代替

▼ render_*.py — HTML レポート自動生成（CI 成果物）
▼ migrate_*.py — スキーマ・設計ファイルのマイグレーション
▼ spcs_*.py — SPCS デプロイ・ヘルスチェック運用スクリプト
▼ skill_*.py — スキルカタログ管理（index 生成・サイズ検証）

■ 実行方法（CLAUDE.md の規約）
python scripts/verify_crud.py --project <name>
python scripts/lookup_workflow.py --r R3
引数は必ず --project を明示指定（プロジェクト境界違反を防ぐ）`;
  }

  // ── guide/ 個別ファイル ──────────────────────────────
  if (p === "guide/00-getting-started.md") {
    return `【HVD 初学者向け 10 分入門ガイド】まずここを読む。

Snowflake 上で動く AI アプリを短期間で作るフレームワーク HVD の全体像を
専門用語最小限で説明したドキュメント。

■ 説明している内容
・HVD とは何か（FAQ分類/営業支援/文書チェック等のアプリを作れるフレームワーク）
・8 体 AI エージェントチームの役割（PM/Architect/Reviewer/Marketing 等）
・design.yaml を中心とした開発フロー（設計 → 実装 → デプロイ）
・スキルの呼び方（やりたいこと → スキル名 → Claude に指示）`;
  }
  if (p === "guide/07-development-pipeline.md") {
    return `【R1-R6 開発パイプライン詳細ガイド（自動生成 narrative）】

workflow-core.yaml の内容を人間向けに解説したドキュメント。
直接編集禁止（事実変更は workflow-core.yaml で行う）。

■ 説明している内容
R1: 目的・データソース定義 → R2: 機能・UI 設計
R3: Snowflake スキーマ・SP 実装 → R4: AI エージェント実装
R5: Web UI 実装 → R6: ガバナンス・セキュリティ
各 R の (a) 設計ステップと (b) 実行ステップの DRI・Reviewer・承認者`;
  }

  // ── scripts/ 個別スクリプト ──────────────────────────
  if (p === "scripts/lookup_workflow.py") {
    return `【workflow-core.yaml CLI クエリツール】

R/step/gate/agent/skill の事実を SSOT から安全に参照するためのツール。
agent.md や SKILL.md に workflow facts を直書きする代わりに使う。

使い方:
python scripts/lookup_workflow.py --r R3        # R3 フェーズ情報
python scripts/lookup_workflow.py --step R3b    # ステップ情報
python scripts/lookup_workflow.py --gate G-R3   # ゲート情報（承認者含む）
python scripts/lookup_workflow.py --agent cto   # CTO の担当ステップ
python scripts/lookup_workflow.py --skill vc-ui # スキルのワークフロー配線`;
  }
  if (p === "scripts/verify_crud.py") {
    return `【CRUD 整合性検証スクリプト（R1-R50 ルール）】

design.yaml × dbt macros × web コードの整合性を 50+ ルールで機械検証。
品質ゲート G2-3（実装受入）で必須実行。

主なルール:
R20: Hybrid Table への直 DML 禁止（Action SP 経由のみ）
R22: Agent に Semantic View ツール必須
R23: Agent ツールと design.yaml capabilities の 1:1 一致
R31: Cortex Search 採用時の ADR 存在確認（🟡）
R32: Cortex Search Service の全面禁止（🔴 CI fail）`;
  }
  if (p === "scripts/get_design_foundation.py") {
    return `【design.yaml → 環境変数変換スクリプト】

design/02-architecture.yaml の foundation.snowflake セクションを読み込み
SNOWFLAKE_DATABASE / SNOWFLAKE_SCHEMA 等の環境変数に変換する。
load-env.ps1 から呼ばれる中核スクリプト。

dbt_project.yml#vars への直書きは ADR-0060 v1.2 で廃止済み。
このスクリプトが全消費者（dbt / Terraform / Web）の環境変数を一元提供する。`;
  }

  // ── projects/ フォルダ ────────────────────────────────
  if (p === "projects" && node.type === "tree") {
    return `【全プロジェクトの格納ディレクトリ】なぜ必要か？

HVD フレームワークは「1 リポジトリに複数の AI システム開発プロジェクトを共存させる」
マルチプロジェクト構成を採用している。
このフォルダが「プロジェクト = 1 つの業務 AI システム」の入れ物。

■ 各プロジェクトの構造（projects/<name>/）
・design.yaml   — 設計の全事実を集約する SSOT（目的〜UI まで一ファイル）
・dbt/          — Snowflake のデータ変換・SP・Agent DDL（ELT パイプライン）
・web/          — Next.js 16 本番アプリ（shadcn/ui + Kysely + Cortex Agent）
・iac/          — Terraform（DB・スキーマ・ウェアハウス・SPCS リソース）
・tests/        — pytest による SP 単体テスト + Playwright E2E
・adr/          — そのプロジェクト固有のアーキテクチャ決定記録

■ PRJ_DIR 自動判別
Claude Code はどのファイルを編集しているかを見て
projects/<name>/ を自動的にアクティブプロジェクトと判断する。
複数プロジェクトが存在しても混同しないよう
.claude/hooks/validate-prj-dir.sh が境界違反を検出・ブロックする。

■ 現在収容されているプロジェクト
フォルダを開いて design.yaml を見ると、各プロジェクトの
目的・技術スタック・データ構造が一覧できる。`;
  }

  // ── adr/ フォルダ（ルート直下）────────────────────────
  if (p === "adr" && node.type === "tree") {
    return `【Architecture Decision Record（アーキテクチャ決定記録）の格納ディレクトリ】

ADR とは「なぜこの設計にしたのか」を残す不変のログ。
コードを読むだけでは分からない「判断の理由」と「捨てた選択肢」を記録する。

■ ADR が必要な理由
・3 ヶ月後に自分が読んでも、なぜ ORM を使わなかったのか分かる
・新メンバーが「なぜ Prisma じゃないの？」と同じ議論を繰り返さなくて済む
・後から覆す場合も、古い ADR を Supersede する形で根拠を残せる

■ ADR の 8 セクション構成
1. ステータス（Proposed / Accepted / Deprecated / Superseded）
2. コンテキスト（背景・前提・制約）
3. 検討した選択肢（各案の概要）
4. 決定（採用案と理由）
5. 影響（良い影響 / 悪い影響 / リスク）
6. 関連 ADR / リンク
7. 改訂履歴

■ 採番ルール
・リポジトリ直下 adr/ = リポジトリ横断の決定（0001〜）
・projects/<name>/adr/ = プロジェクト固有の決定（独立採番）
・一度発行した番号は再利用しない

■ 編集ルール
ADR は append-only。過去のものを書き換えず、
後継 ADR で「Superseded by ADR-NNNN」とマークする。`;
  }

  // ── ADR-0006 ────────────────────────────────────────
  if (p === "adr/0006-no-orm-snowflake-data-access.md") {
    return `【ADR-0006: ORM を使わない理由と Snowflake データアクセス層の設計】

■ 何を決めたか
TypeScript ORM（Prisma / Drizzle / TypeORM）は採用しない。
代わりに snowflake-sdk + Kysely（sql テンプレート）+ zod の 3 層構成を使う。

■ なぜ ORM を使わないのか
・Prisma / Drizzle / TypeORM はいずれも Snowflake 公式アダプタを持たない
・community adapter は production 非推奨（Hybrid Table / VARIANT が不安定）
・DDL は dbt マクロが既に SSOT として整備済み → ORM の migrate と二重管理になる
・SPCS（Snowflake Container Services）デプロイなので Vercel/Edge 最適化も不要
・認証は Snowflake OAuth パススルー → RBAC を Snowflake 側に集約できる

■ 採用した構成（選択肢 D）
層              技術                        役割
Connection  |  snowflake-sdk              |  OAuth トークン受領・接続プール
Query       |  Kysely（sql template）     |  型補助付き RAW SQL（SQL インジェクション防止）
Validation  |  zod                        |  クエリ結果のランタイム検証（境界のみ）
DDL         |  dbt macros/hybrid_tables/  |  Hybrid Table / View 定義（既存 SSOT）
型生成      |  gen_db_types.ts            |  SHOW COLUMNS → types.gen.ts（自動生成）

■ ファイル配置（web/ 直下）
lib/db/client.ts        — Snowflake 接続ファクトリ
lib/db/types.gen.ts     — 自動生成型定義（手動編集禁止）
lib/db/schemas/*.ts     — zod スキーマ（テーブル単位）
lib/db/queries/*.ts     — Kysely クエリ関数（テーブル/ユースケース単位）

■ クエリ規約
・sql\`SELECT ...\` でパラメタライズ必須（文字列連結による SQL 構築は禁止）
・結果は zod で境界 1 回だけ検証
・接続はリクエストごとに取得・解放（SPCS メモリ制約）

■ 関連ルール
.claude/rules/web-data-access.md がこの決定をパスルールとして強制している。`;
  }

  // ── 汎用 ADR ファイル（ルート直下）──────────────────
  const rootAdrMatch = p.match(/^adr\/(\d{4})-(.+)\.md$/);
  if (rootAdrMatch) {
    const num = rootAdrMatch[1];
    const slug = rootAdrMatch[2].replace(/-/g, " ");
    return `【ADR-${num}: リポジトリ横断アーキテクチャ決定記録】

テーマ: ${slug}

ADR（Architecture Decision Record）とは「なぜこの設計にしたのか」を残す不変のログ。
コードを読むだけでは分からない判断の理由と、検討して捨てた選択肢を記録する。

■ ADR の読み方
ステータス → コンテキスト → 検討した選択肢 → 決定 → 影響 の順に読む。
「決定」だけ読んでも分からない。「コンテキスト」と「検討した選択肢」が本質。

■ このファイルの意味
ルート直下 adr/ = リポジトリ全体に影響する横断決定。
プロジェクト固有の決定は projects/<name>/adr/ に別採番で存在する。`;
  }

  if (p === ".claude/claude.md") {
    return `.claude/ 配下を編集・参照するときの最上位原則（Claude Code 専用プロジェクト指示書）。
Cursor Rules / AGENTS.md / Copilot Instructions と同等の役割。

■ 4 レイヤ責務分離（ADR-0109）
・framework: workflow-core.yaml が R1-R6/12ステップ/6ゲート/組織マトリクスの SSOT
・agents: 役割宣言・dispatch・agent 間通信（.claude/agents/*.md）
・skills: 手順 SSOT（skill.unit.yaml）+ narrative（SKILL.md）
・projects: 個別プロジェクトの設計・実装（projects/<name>/）

■ 越境禁止パターン（lint で機械検出）
・agents → framework fact 再掲禁止（R/step/gate/DRI の表を agent.md に書かない）
・skills → framework fact 再掲禁止（phase/step_id/gate を unit.yaml に書かない）
・skills SSOT 二重化禁止（fact は skill.unit.yaml のみ、SKILL.md は narrative）
・派生 HTML 直接編集禁止（doc/skills/ は ADR-0086 で廃止済み）

■ workflow fact 参照プロトコル
hvd-workflow-lookup スキル / lookup_workflow.py を経由して参照。
agent.md / SKILL.md には「workflow-core.yaml に従う」の 1 行のみ記載。

■ 関連 ADR
0109（4 レイヤ責務分離） / 0073（YAML-Anchored SSOT）
0086（skill 派生 HTML 廃止） / 0102（6RTW-Native v4.0）
0018（ファイルベース agent 通信） / 0108（.claude/docs/ 廃止）`;
  }

  if (p === "claude.md") {
    return `Claude Code 向けリポジトリ操作マスターガイド（HVD フレームワーク全体の最上位指示書）。
セッション開始時に自動ロードされ、すべての実装リクエストに優先して適用される。

■ 定義内容
・PRJ_DIR 自動判別（env_var > ファイル探索 > CWD > fallback の優先順位）
・デフォルト agent（CEO）と subagent dispatch ルール（8 体 CxO 組織）
・dev cycle（R1-R6 内側ループ）と biz cycle（外側ループ）の 2 サイクル構成
・Snowflake 接続情報の管理（.env / design.yaml SSOT / load-env.ps1）
・dbt コマンド一覧（build / seed / deploy_action / deploy_agent / smoke_test）
・コーディング規約（CQRS 三責務分離・命名規則・env_var 参照）
・品質ゲート基盤（hooks / rules / CI・無効化フラグ一覧）

■ 最初に読むべきガイド
guide/00-getting-started.md（10 分入門）
guide/07-development-pipeline.md（R1-R6 パイプライン詳細）
guide/05-project-setup.md（プロジェクト構成・.env）`;
  }

  if (p === ".claude/framework/workflow-core.yaml") {
    return `HVD ワークフロー SSOT（最重要ファイル）— 直接読まず lookup_workflow.py 経由で参照。
R1-R6（6RTW-Native workflow v4.0）の全 fact を保持する Single Source of Truth。

■ 定義内容
・R1-R6: 6 フェーズ × 2 ステップ（Ra 設計 / Rb 実行）= 12 ステップ
・6 品質ゲート（G-R1〜G-R6）の承認者・Reviewer 定義
・8 体 CxO 組織マトリクス（CEO/COO/CTO/CFO-CRO/CMO/CAIO/engineer-web/engineer-sis）
・各ステップの DRI（主担当）・Reviewer・承認者マトリクス

■ 参照コマンド
scripts/lookup_workflow.py --r R3       # フェーズ情報
scripts/lookup_workflow.py --step R3b   # ステップ情報
scripts/lookup_workflow.py --gate G-R3  # ゲート情報

■ ADR-0073 / ADR-0109: fact はこのファイルに 1 回だけ記述。
agents/skills からの再掲は禁止（lint で検出）。`;
  }

  // ── .claude/framework/ フォルダ・ファイル ──────────────────
  if (p === ".claude/framework" && node.type === "tree") {
    return `【HVD フレームワーク SSOT フォルダ — 4 レイヤの「framework」層】

ADR-0109（4 レイヤ責務分離）で定義された最上位レイヤ。
workflow/R1-R6/12ステップ/6ゲート/組織マトリクス等の "fact" をここに集約する。

■ 格納ファイルの役割
workflow-core.yaml       — R1-R6 全 fact の SSOT（最重要）
workflow-extensions.yaml — オプショナルなステップ拡張（SaaS 連携等）
biz-cycle.yaml           — ビジネスサイクル（T1 月次/T2 四半期）の運用詳細
gates-guide.yaml         — 品質ゲート（G-R1〜G-R6）の運用詳細
skill-catalog.yaml       — 全スキルの機械読み取り可能なカタログ（v4.3 / 127 スキル）
skill-index.md           — スキルカタログから自動生成した人間向け一覧（直接編集禁止）
schemas/                 — 各種 YAML ファイルの JSON Schema（設計・messaging・スキル等）
templates/               — プロジェクト初期化用テンプレートファイル群

■ 越境禁止（ADR-0073/0109）
agents/*.md や skills/SKILL.md は workflow fact を直書きしない。
参照は lookup_workflow.py を経由する。`;
  }

  if (p === ".claude/framework/skill-catalog.yaml") {
    return `【全スキル機械読み取りカタログ — v4.3（127 スキル登録）】

scripts/build_skill_index.py が読み込み skill-index.md を自動生成する SSOT ファイル。
このファイルを直接参照して「どのスキルが何のカテゴリか」「エイリアスは何か」を一覧できる。

■ 各エントリの構造
name     — スキル識別子（kebab-case。ディレクトリ名・skill.unit.yaml#id と一致）
alias    — Claude Code から呼び出す際のスラッシュコマンド（例: /hvd-scope）
catalog  — "core"（標準工程）または "extension"（オプション）
category — 7 分類: design/implement/verify/document/manage/operate/specialist

■ 7 カテゴリの概要（v4.3 時点）
design（38）    — design.yaml 書き込みスキル（md-scope / md-features / md-capabilities 等）
implement（14） — ファイル生成スキル（sf-dbt-project / vc-ui-build / iac-project-base 等）
verify（7）     — 検証・QA スキル（hvd-verify / hvd-verify-crud 等）
document（1）   — 文書生成スキル（hvd-design-doc）
manage（7）     — 管理・横断スキル（hvd-dev-cycle / hvd-biz-cycle / hvd-pmo 等）
operate（8）    — 運用スキル（sf-saas-pull-deploy / spcs-deploy 等）
specialist（5） — ドメイン特化スキル（cortex-search-specialist 等）

■ skill-index.md との関係
カタログが SSOT（機械読み取り）→ build_skill_index.py が変換 → skill-index.md（人間向け一覧）
skill-index.md を直接編集してはいけない（次回生成で上書きされる）。`;
  }

  if (p === ".claude/framework/skill-index.md") {
    return `【スキル一覧（自動生成 — 直接編集禁止）】

skill-catalog.yaml から scripts/build_skill_index.py が自動生成するスキル一覧ページ。
GitHub Markdown で読む人間向け索引。

■ 読み方
カテゴリ別にスキルが並ぶ。各行に: エイリアス / スキル名 / 概要 が記載されている。
スキルを探すには Ctrl+F でスキル名またはエイリアスを検索する。

■ 編集したい場合
このファイルは編集禁止。内容を変えたければ skill-catalog.yaml のエントリを更新し
python scripts/build_skill_index.py を実行して再生成する。

■ workflow-catalog version
skill-catalog.yaml の version フィールドが表示される。現在 v4.2（2026-05-23）。
スキル総数 127（設計 38 / 実装 14 / 検証 7 / 文書 1 / 管理 7 / 運用 8 / specialist 5 他）。`;
  }

  if (p === ".claude/framework/biz-cycle.yaml") {
    return `【ビジネスサイクル（T1/T2）運用詳細 SSOT — ADR-0029 / ADR-0109】

hvd-biz-cycle スキルの narrative ではなく、biz cycle の "fact" を格納する SSOT。
workflow-core.yaml が dev cycle（R1-R6）の fact を持つのに対し、
このファイルは biz cycle（テーマポートフォリオの見直しサイクル）の fact を持つ。

■ T1 サイクル（月次テーマレビュー）
DRI: CMO / 頻度: 毎月 / 承認者: なし（重要変更時は PR + CEO レビュー）
実行内容:
  1. biz/02-themes/index.yaml で全テーマを俯瞰
  2. 各テーマの進捗確認・features 更新・evidence.md 追記
  3. biz-portfolio-sync で projects-inventory.yaml を最新化
  4. 軽微変更は CMO 単独 commit、重要変更は PR

■ T2 サイクル（四半期テーマ戦略見直し）
DRI: CMO → CEO 承認 / 頻度: 四半期 / テーマ新設・廃止・優先度変更を行う

■ dev cycle との関係
dev cycle（内側ループ）: 個別プロジェクトの R1-R6
biz cycle（外側ループ）: theme portfolio 全体の T1/T2 見直し
biz cycle が dev cycle のテーマ・方向性を決め、dev cycle が実装する。

■ 参照コマンド
python scripts/lookup_workflow.py --cycle T1`;
  }

  if (p === ".claude/framework/gates-guide.yaml") {
    return `【品質ゲート（G-R1〜G-R6）運用詳細 SSOT — ADR-0109】

workflow-core.yaml#gates[] がゲートの構造定義（id/dri/approvers/blocking）を持つのに対し、
このファイルはゲートの「運用詳細」（誘導テンプレ/チェック内容/fail 時挙動）を格納する。

■ 8 ゲートの概要
G-R1: 事業 Go 判定（DRI: CEO / 承認: CEO・CAIO・CFO-CRO）
G-R2: 設計受入（DRI: CTO / 承認: CTO・COO）
G-R3: 実装受入（DRI: CFO-CRO / 承認: CFO-CRO・CTO）
G-R4: AI 品質ゲート（DRI: CAIO / 承認: CAIO）
G-R5: UI 品質ゲート（DRI: CMO / 承認: CMO・CTO）
G-R6: セキュリティゲート（DRI: CFO-CRO / 承認: CFO-CRO）
G6.5: 横展開判定（DRI: architect / 承認: reviewer + pm）
G-Biz: biz cycle ゲート（DRI: CMO / 承認: CEO）

■ 各ゲートの運用詳細（このファイルで定義）
・実行コマンド（例: hvd-verify-r1 + ai-strategy 出力レビュー）
・チェック項目リスト
・approval フォーマット（by / at / decision / note）
・reject 時の挙動（下流ステップを frontier から除外等）
・biz_cycle_hooks（T1/T2 と連動する内容）

■ 参照方法
python scripts/lookup_workflow.py --gate G-R3`;
  }

  if (p === ".claude/framework/workflow-extensions.yaml") {
    return `【オプショナルワークフロー拡張ステップ（v3.5）— ADR-0011/0012/0037/0061】

workflow-core.yaml の必須経路には含まれないが、特定の設計フィールドが design.yaml に
出現した場合や /hvd-dev-cycle --extensions を明示実行した場合に提案されるオプションステップ群。

■ 主なオプションステップ
・チャット & ブリッジ（vc-chat）— capabilities.agents が定義されている場合に追加提案
・consulting.yaml 連携（R1a 並列）— ADR-0119 の人的役務 SSOT
・モックアクション抽出（md-capabilities Step 0）— 既存 web/app が存在する時のみ
・Phase 3.5 外部データ統合（ADR-0061）— SaaS データ取込みを Phase 4.5 から再編
・Phase 6.5 横展開判定（ADR-0037）— 成功プロジェクトの標準アプリ昇格評価

■ バージョン管理
v3.0 → v3.5: Phase 6.5（横展開判定）追加、SaaS 取込みを Phase 3.5 に再編

■ workflow-core.yaml との関係
core = 必須経路（毎回通る 12 ステップ）
extensions = オプション経路（条件付きで追加される）`;
  }

  // ── .claude/framework/schemas/ ────────────────────────────
  if (p === ".claude/framework/schemas" && node.type === "tree") {
    return `【HVD フレームワーク JSON Schema 群】

.claude/framework/ 内の YAML ファイルを機械的に検証するための
JSON Schema 定義を格納するフォルダ。

■ スキーマ一覧
skill.unit.schema.json       — skill.unit.yaml の JSON Schema（ADR-0073/0109）
review.unit.schema.json      — verify レポート（review.unit.yaml）の JSON Schema（ADR-0081）
messages.schema.json         — エージェント間通信メッセージの JSON Schema（ADR-0018）
biz-projects.schema.json     — biz theme の projects[] entry スキーマ（ADR-0114）
consulting.schema.json       — 人的役務エントリ（consulting.yaml）の JSON Schema（ADR-0119）
proposal-slides.schema.json  — 提案書スライド（proposal/chapters/*.yaml#slides[]）のスキーマ
design.schema.md             — design.yaml スキーマの人間向けドキュメント

■ 役割
CI が各 YAML ファイルをこれらのスキーマで検証し、
必須フィールド欠落・型不正・禁止フィールド使用を 🔴 error で検出する。`;
  }

  if (p === ".claude/framework/schemas/skill.unit.schema.json") {
    return `【skill.unit.yaml 用 JSON Schema（ADR-0073 / ADR-0109）】

.claude/skills/<category>/<name>/skill.unit.yaml が準拠すべき JSON Schema。
verify_skill_ssot.py が CI でこのスキーマを使いドリフトを検出する。

■ 必須フィールド
schema_version — "1.0" / "1.1" / "1.2"（ADR-0099 / ADR-0109 で段階追加）
id             — kebab-case 識別子（ディレクトリ名・catalog の name と完全一致）
version        — semver 風（例: 1.0 / 3.3）
category       — 7 分類 enum（design/implement/verify/document/manage/operate/specialist）
owner          — 担当 agent（CxO 8 値は deprecated → CADRE 8 値へ移行中 ADR-0116）
inputs/outputs — 主要入力・出力の文字列配列

■ ADR-0109 で禁止されたフィールド（additionalProperties=false で自動実点）
phase / step / step_id / step_order / dri / reviewer / gate / gates
→ workflow facts は workflow-core.yaml に集約する。skill.unit.yaml には書かない。

■ オプション追加フィールド（1.1/1.2 で段階追加）
io.reads/writes  — 機械読み取り可能な入出力宣言（ADR-0099）
retry_policy     — 差し戻しループの停止条件と escalation 経路（ADR-0111）
orchestrator_limits — subagent 上限（hvd-dev-cycle 等の orchestrator 用 ADR-0113）
verifies         — この skill が pass を保証する trace check ID 配列（ADR-0099/0100）`;
  }

  if (p === ".claude/framework/schemas/review.unit.schema.json") {
    return `【verify レポート（review.unit.yaml）用 JSON Schema（ADR-0081）】

hvd-verify-* スキルが出力する review record の YAML-Anchored SSOT スキーマ。
<PRJ_DIR>/review/<gate>/<id>.review.unit.yaml に配置し、
scripts/render_verify_review.py が doc/verify-reports/ に HTML/MD を派生生成する。

■ 必須フィールド
id            — G<gate>-<skill>-<yyyymmdd>-<HHMMSS> 形式（ファイル名 stem と一致）
gate          — ゲート識別子（例: G1-2）
project       — 対象プロジェクト名
reviewed_at   — ISO8601 タイムスタンプ
dri/reviewer  — DRI agent / レビュー実施 agent
skill         — 実施した verify skill 名
verdict       — approved / approved_with_notes / changes_requested / rejected
counters      — L1〜L4 の章単位 fitness 集計（L1:完全対応 / L4:誤対応）
chapter_fitness — 章単位の Level 評価（1 entry = 1 requirement 章）
next_actions  — ゲート通過に必須の修正リスト（blocking）と推奨修正（followup）

■ schema v1.1 の主な追加
chapter_fitness[].spec_items[] — spec が要求する個別項目 → design 側の応答を 1 行ずつ記録
（旧 findings[] は後方互換のため optional 残置、新規では使用しない）`;
  }

  if (p === ".claude/framework/schemas/messages.schema.json") {
    return `【エージェント間通信メッセージ JSON Schema（ADR-0018）】

.hvd/messages/*.jsonl の 1 行（1 JSONL イベント）を検証するスキーマ。
8 体 AI エージェントがファイルベースで通信する際のメッセージ形式を定義する。

■ 必須フィールド
id      — msg-<YYYY-MM-DD>-<identifier> 形式の一意 ID
ts      — ISO 8601 UTC タイムスタンプ
from    — 送信 agent（8 体のいずれか: ceo / coo / cto / cfo-cro / cmo / caio / engineer-web / engineer-sis）
to      — 受信 agent リスト（broadcast は ["*"]）
type    — メッセージ種別: request_review / approval / rejection / handoff / notify / task_assign
subject — 件名（1 行・最大 200 文字）

■ 条件付き必須（allOf で実点）
・type: approval / rejection のとき → reply_to 必須
・type: task_assign のとき → scope 必須

■ メッセージ規約（ADR-0018 C2）
JSONL は append-only。過去行の書換・削除禁止。
訂正は新しい行を追加し reply_to で参照する。
エスカレーションは scripts/emit_escalation_message.py 経由で書く（ADR-0113）。`;
  }

  if (p === ".claude/framework/schemas/biz-projects.schema.json") {
    return `【biz テーマ projects[] entry スキーマ（ADR-0114 / CADRE v0.2 §3）】

biz/02-themes/<theme-id>/05-projects.yaml の projects[] エントリを検証するスキーマ。
ADR-0114 で directive ブロック（CxO からの実行指示）が optional 追加された。

■ project_entry の構造
project_id   — projects/<id>/ ディレクトリ名（verify_biz_directives.py B5 で実在検証）
role         — theme 内での役割: reference / spin-off / shared-platform / internal-only / experimental
feature_coverage — 04-features.yaml#features[].id の部分集合
notes        — 自由記述
directive    — 実行指示（CxO → dev への指示。optional）

■ directive ブロック（ADR-0114 / CADRE Dual-representation）
id     — DIR-<DOMAIN>-<NNN> 形式（例: DIR-AAP-001）
intent — biz から dev への指示意図（narrative 1 行以上）
status — proposed / accepted / in_progress / done / rejected / on_hold
proposed_by / accepted_by — 起案・承認 agent（フラット 8 体）
lifecycle: proposed 以外は accepted_by / accepted_at が必須（B2 で強制）

■ 後方互換
directive なしの旧 entry も valid（additive / 後方互換）。`;
  }

  if (p === ".claude/framework/schemas/consulting.schema.json") {
    return `【人的役務エントリ（consulting.yaml）JSON Schema（ADR-0119）】

プロジェクトに付随する「人的役務」（コンサルティング・研修・ワークショップ等）を
consulting.yaml に構造化して記録するためのスキーマ。

■ ConsultingEntry の主フィールド
id          — C-<DOMAIN>-<NNN> 形式（例: C-RISK-003 / C-TRAIN-001）
label_ja    — 役務名（日本語）
summary     — 役務内容の概要
lifecycle   — proposed / active / completed / cancelled
spec_refs   — 仕様書との紐付け（spec/md/*.md パス）
teams       — 担当チーム
roles       — 関与する CxO / CADRE ロール
schedule    — 実施スケジュール・マイルストーン
outputs     — 役務成果物（ドキュメント・研修資料等）
artifacts   — 納品物パス
format      — 提供形態（workshop / document / training 等）
toc_proposed — 目次案（提案段階）
sections    — 章構成（詳細定義）

■ proposal-slides.schema.json との連携
proposal/chapters/<id>.yaml の consulting_ref フィールドが
このスキーマの C-* ID を参照して提案書スライドに設計根拠を紐付ける。`;
  }

  if (p === ".claude/framework/schemas/proposal-slides.schema.json") {
    return `【提案書スライド（proposal/chapters/*.yaml#slides[]）JSON Schema】

doc-proposal-slides スキルが読み込み、コンサル提案書 HTML を生成する際の
スライド定義スキーマ。proposal/chapters/<id>.yaml の slides[] 配列に準拠する。

■ slide エントリの構造
id          — スライド識別子（例: "3.1.1"）
title       — スライドタイトル（20-40 文字推奨）
key_message — 持ち帰ってほしい 1 メッセージ（1-3 行）
body        — 詳細パネル配列（以下の body_block 型のいずれか）
refs        — 典拠参照（design_ref / consulting_ref / spec_ref / requirement_ref）

■ body_block の 5 種類
diagram  — ASCII アート図（<pre class='ascii-art'> でレンダリング）
panel    — 箇条書き / 順序付きリスト / 段落テキスト
matrix   — ヘッダ付きテーブル（RACI 等）
cards    — グリッドカード（2-4 カラム / tag・heading・body・accent）
callout  — 強調ボックス（info=青 / ok=緑 / warn=黄 / danger=赤）

■ consulting.schema.json との関係
refs[].consulting_ref で consulting.yaml の C-* ID を参照。
設計根拠を提案書スライドにトレーサブルに紐付けられる。`;
  }

  if (p === ".claude/framework/schemas/design.schema.md") {
    return `【design.yaml スキーマドキュメント（人間向け）】

design.yaml および design/*.yaml の全セクションのスキーマを
人間が読める形で記述したドキュメント。

■ 扱っているセクション
purpose / personas / decision_flow / ai_strategy / datasources
analysis / scenarios / data_models / capabilities / agents
ui / ui_inventory / ia / architecture / governance / branding
requirements / features / mcp / writeback / observability 等

■ 特筆事項
branding スキーマ（ADR-0076）— brand_colors / typography / color_system / spacing 等
mcp スキーマ（ADR-0047）   — MCP サーバー定義・tool_count_limit・forbidden_grants 等
roles スキーマ              — ロール階層・Secure View スキーマ（ADR-0058）
architecture.foundation    — DB/スキーマ/WH/SPCS の環境別宣言（ADR-0060 v1.2 SSOT）

■ rules/design-yaml.md との関係
design.yaml を編集する際のルール（何を書くか/書かないか）は
.claude/rules/design-yaml.md が規定し、このファイルはスキーマの正典として参照される。`;
  }

  if (p === ".claude/framework/templates" && node.type === "tree") {
    return `【プロジェクト初期化用テンプレートファイル群】

新規プロジェクト作成時（md-scope / sf-dbt-init / vc-ui-build 等のスキル実行時）に
雛形として使われるファイルテンプレート群。

■ 主なテンプレートカテゴリ
web/           — Next.js アプリのテンプレート（lib/db/client.ts / auth/ / actions/ 等）
dbt/           — dbt プロジェクトテンプレート（macros/agents/_template.sql 等）
docs/          — ドキュメントテンプレート（ADR_template.md / runbook.md.j2 等）
biz-theme-schema.json — biz theme YAML スキーマ（validate_theme_schema.py が参照）
subagent-dispatch.md  — subagent dispatch 時の prompt 雛形（C7-1 の 4 項目を含む）
progress.yaml.template — progress.yaml の雛形

■ 重要なテンプレート
dbt/macros/agents/_template.sql — Cortex Agent DDL の正典（6 つの既知の罠を修正済み）
web/components/app-shell.tsx    — 3 カラムレイアウト正典（永続化キー / リサイズ対応）
web/components/patterns/matching.tsx — matching パターン 3 カラム正典`;
  }

  // scripts/ フォルダ
  if (p === "scripts" && node.type === "tree") {
    return `【共有 Python スクリプト群（107 本）— Snowflake 運用・品質ゲート・SSOT 管理の全自動化を担う】

プロジェクトをまたいで使う共通スクリプトを集約したフォルダ。
ファイル名プレフィクスで役割が分かる:

_*         内部モジュール（他スクリプトから import される共通ユーティリティ）
_tmp_*     一時診断スクリプト（本番運用外の調査用）
lint_*     静的 lint（規約違反の自動検出）
migrate_*  design.yaml / progress.yaml の形式マイグレーション
render_*   YAML → HTML / Markdown へのレンダリング
verify_*   設計整合性・トレーサビリティ・ゲート検証
validate_* スキーマ・規約の形式検証
spcs_*     Snowpark Container Services デプロイ・診断
sf_*       Snowflake 接続・運用操作
sync_*     SSOT 間の同期
spcs/      SPCS 専用スクリプト群（build-image.sh 等）`;
  }

  if (p === "scripts/spcs" && node.type === "tree") {
    return `【SPCS（Snowpark Container Services）専用スクリプト群】

snow CLI を使わずに SPCS Docker イメージのビルド・プッシュ・デプロイを行うスクリプト群。
ADR-0039（snow CLI 全廃）により、SSL MITM 環境で動作しない snow CLI の代替として整備。

build-image.sh — Docker image の build + push（プロキシ対応・プロジェクト非依存）
通常は spcs_orchestrate.py 経由で呼ばれる。`;
  }

  if (p === "scripts/spcs/build-image.sh") {
    return `【SPCS Docker イメージ build + push スクリプト（プロジェクト非依存）】

SPCS（Snowpark Container Services）用 Docker イメージをビルドして
Snowflake Image Registry へプッシュするシェルスクリプト。
snow CLI 非依存（ADR-0039 全廃対応）、法人プロキシ + SSL MITM 環境に対応。

引数: --image <URL> / --web-dir <Dockerfile のあるディレクトリ> / --proxy <URL> / --skip-push
通常は spcs_orchestrate.py から呼ばれる。`;
  }

  // _* 内部モジュール
  if (p === "scripts/_apply_compute_pool_policy.py") {
    return `【ADR-0069: Compute Pool ポリシー適用スクリプト（一回限り）】

ADR-0069 で定義した Compute Pool ポリシーを既存の全 Compute Pool に適用する一回限りの移行スクリプト。
適用後は lint_compute_pool_policy.py で違反がないことを確認する。`;
  }

  if (p === "scripts/_apply_hvd_dev_pool.py") {
    return `【ADR-0070: HVD_DEV_POOL 作成・旧プール削除スクリプト】

ADR-0070 に基づき、共有開発用 Compute Pool（HVD_DEV_POOL）を作成し、
旧個別プール（EGOV_POOL / WEB_POOL / SPRINTER_POOL）を削除する移行スクリプト。
--dry-run オプションで実際には変更せず確認のみ可能。
関連: lint_compute_pool_policy.py / iac/shared-dev/（Terraform 管理 shared infra）`;
  }

  if (p === "scripts/_design_loader.py") {
    return `【design.yaml ローダー共有モジュール（他スクリプトから import）】

design.yaml v2.4（単一ファイル）と v2.5（split layout / ADR-0092）の
両方に対応した split-aware ローダーを提供する内部共有モジュール。
$ref を再帰的に解決して統合 dict を返す。
verify_design_v2.py / render_decision_flow.py 等、design.yaml を読み込むほぼすべてのスクリプトが使用。`;
  }

  if (p === "scripts/_html_review_common.py") {
    return `【HTML レンダラー用共有ビルディングブロック集（内部モジュール）】

hvd-review-* 系 HTML レンダラー（render_verify_review.py 等）が共通して使う
HTML 生成ユーティリティ集。章単位カード・fitness バッジ・L1〜L4 色分け・verdict バナー等を提供。
使用者: render_verify_review.py / review_decision_flow.py / review_data_model.py`;
  }

  if (p === "scripts/_list_compute_pools.py") {
    return `【Snowflake Compute Pool 一覧表示診断ツール（read-only）】

Snowflake アカウント上のすべての Compute Pool と状態（ACTIVE / SUSPENDED）・インスタンス数を一覧表示。
SPCS デプロイ前後の確認・コスト削減対象の特定・HVD_DEV_POOL 移行後の検証に使用。`;
  }

  if (p === "scripts/_list_services.py") {
    return `【SPCS サービスと Compute Pool 依存関係一覧診断ツール（read-only）】

Snowflake 上で動作中の SPCS サービスと各サービスが紐付く Compute Pool の対応を一覧表示。
ADR-0070 移行後に HVD_DEV_POOL 以外のプールへの依存が残っていないか検証する際に使用。`;
  }

  if (p === "scripts/_patch_jcg_requirements_notes.py") {
    return `【requirements.yaml spec_lines への note フィールド追加パッチ（一回限り）】

jcg プロジェクトの requirements.yaml の spec_lines エントリに note フィールドを一括追加する
一回限りのデータパッチスクリプト。実行後は不要（_tmp に近い扱い）。`;
  }

  if (p === "scripts/_sf_common.py") {
    return `【Snowflake 接続・環境変数読み込み共通ユーティリティ（内部モジュール）】

すべての Snowflake 接続スクリプトが import する共通モジュール。
.env から ACCOUNT / USER / PASSWORD / ROLE / WAREHOUSE 等を読み込み
snowflake.connector.connect() の薄いラッパーを提供する。ログに接続情報を出力しない。
sf_sql.py / sf_finops_stop_all.py / verify_design_foundation.py 等が使用。`;
  }

  if (p === "scripts/_tmp_check_agents.py") {
    return `【HVD_DEV に登録された Cortex Agent 確認の一時診断スクリプト】

Snowflake HVD_DEV データベースに登録されている Cortex Agent を SHOW AGENTS で取得して表示。
エージェントデプロイ後の実在確認・デプロイ漏れの特定に使用。`;
  }

  if (p === "scripts/_tmp_check_schemas.py") {
    return `【Snowflake のスキーマとデータベース確認の一時診断スクリプト】

Snowflake アカウント上のデータベースとスキーマ一覧を SHOW DATABASES / SHOW SCHEMAS で取得して表示。
新規プロジェクトセットアップ後のスキーマ作成確認に使用。_tmp_create_schemas.py と組み合わせる。`;
  }

  if (p === "scripts/_tmp_check_tables.py") {
    return `【Snowflake の prompt template テーブル確認の一時診断スクリプト】

Snowflake 上の prompt template 関連テーブルの存在と内容を確認する一時診断ツール。
Cortex Agent のプロンプトテンプレートがテーブルに正しく投入されているかのスモークテスト前確認に使用。`;
  }

  if (p === "scripts/_tmp_create_schemas.py") {
    return `【env 指定スキーマを Snowflake に作成する一時セットアップスクリプト】

.env に設定された DATABASE / SCHEMA 値を元に Snowflake 上でスキーマを CREATE SCHEMA IF NOT EXISTS で作成。
新規プロジェクト初期セットアップ時の一回限り実行。Terraform IaC でカバーされていないスキーマの補完。`;
  }

  // add_ / audit_ / backfill_ / build_ / check_
  if (p === "scripts/add_skill_depends.py") {
    return `【SKILL.md frontmatter に depends_on を追加する冪等スクリプト】

.claude/skills/**/SKILL.md の frontmatter に depends_on フィールドを一括追加する。
すでに存在すれば skip（冪等）。スキル依存グラフ（check_skill_dependencies.py）が参照する
depends_on を既存 SKILL.md に遡及追加する際に使用。`;
  }

  if (p === "scripts/audit_skill_workflow_fields.py") {
    return `【skill.unit.yaml に残る禁止 workflow キーを集計・検出（read-only / ADR-0109）】

ADR-0109 で禁止された workflow キー（phase / step / step_id / step_order / dri / reviewer / gate / gates）が
skill.unit.yaml に残存していないかを集計する監査スクリプト。read-only（変更しない）。
修正は strip_skill_workflow_fields.py（破壊的）で行う。`;
  }

  if (p === "scripts/backfill_skill_unit_6rtw.py") {
    return `【6RTW-Native v4.0 移行時の skill.unit.yaml 遡及更新バックフィル（ADR-0102）】

HVD v4.0（6RTW-Native）移行（ADR-0102）に伴い、
全スキルの skill.unit.yaml を新しいスキーマ形式（workflow_position 等）に遡及更新するバックフィル。
移行時の一回限り実行。適用後は verify_skill_ssot.py（S11/S12）で検証する。`;
  }

  if (p === "scripts/build_review_index.py") {
    return `【review artifacts の index.html 生成スクリプト】

<PRJ_DIR>/review/<gate>/ 以下の review.unit.yaml を走査して
doc/verify-reports/index.html（レビュー成果物ナビゲーション）を生成する。
render_verify_review.py が各レビューの detail HTML を生成し、本スクリプトが index からリンクを張る。`;
  }

  if (p === "scripts/build_skill_index.py") {
    return `【skill-index.md 自動生成スクリプト（SSOT: skill-catalog.yaml）】

.claude/framework/skill-catalog.yaml + workflow-core.yaml を元に
.claude/framework/skill-index.md を自動生成する。
生成物（skill-index.md）は直接編集禁止。
CI の skill-validate.yml で自動実行される。`;
  }

  if (p === "scripts/check_governance_secure_view.py") {
    return `【IT-GOV-001 smoke check: Secure View 経由の公開列アクセス確認】

test user として実際にアクセスして Snowflake Governance の Secure View が正しく機能しているかを確認するスモークテスト。
test user が <base>_SECURE schema 経由で許可列のみ SELECT 可能か・base table 直接 SELECT が権限エラーかをチェック。`;
  }

  if (p === "scripts/check_grounded_answer.py") {
    return `【IT-CAP-004 runner: GROUNDED_ANSWER_AGENT デプロイ実在性 + SV bind 検証】

GROUNDED_ANSWER_AGENT が Snowflake に正しくデプロイされ対応 Semantic View が bind されているかを確認する統合テスト。
SHOW AGENTS で実在確認・tools[] の SV FQN 設定確認・1 ターン会話テストを実行する。`;
  }

  if (p === "scripts/check_skill_dependencies.py") {
    return `【Agent Skills frontmatter から依存グラフを構築し循環依存を検出するスクリプト】

.claude/skills/**/SKILL.md の frontmatter にある depends_on を収集して依存グラフを構築し、
循環依存（circular dependency）を検出する。新スキル追加後の依存整合性チェックに使用。`;
  }

  // consolidate_ / diag_ / emit_ / gen_ / inventory_ / issue_
  if (p === "scripts/consolidate_design_split.py") {
    return `【ADR-0092 per-feature split 撤回: design/<step>-<section>.yaml への統合 one-off】

ADR-0092 の per-feature split が運用上複雑すぎると判断された際に実行する逆操作スクリプト。
migrate_design_split.py（分割）の逆操作。`;
  }

  if (p === "scripts/diag_spcs_pat_ingress.py") {
    return `【SPCS ingress + PAT 認証失敗の原因切り分け診断スクリプト】

SPCS ingress エンドポイントへの PAT 認証失敗を段階的に切り分ける診断ツール。
PAT の有効期限・スコープ / ingress URL 疎通 / SERVICE ROLE GRANT（ADR-0068）/ PAT prerequisites を順に確認する。`;
  }

  if (p === "scripts/emit_escalation_message.py") {
    return `【エスカレーションメッセージ書き込みヘルパー（ADR-0113 / CADRE §5）】

retry_policy.on_exhaustion=escalate を持つスキルが retry 限界に達した際、
.hvd/messages/ に escalation JSONL を書き込む標準ヘルパー。
直書き禁止の理由: メッセージ ID / タイムスタンプ整形の一元化、messages.schema.json の
条件付き必須フィールド（reply_to 等）の pre-flight 検証、fcntl.flock による append 排他化。`;
  }

  if (p === "scripts/gen_cost_report.py") {
    return `【Snowflake 月次コストレポート自動生成スクリプト】

Snowflake の ACCOUNT_USAGE ビューを参照して
warehouse / search service / CRON task ごとの月次コストを集計して HTML レポートを生成する。
ADR-0014 / ADR-0015 / ADR-0023（固定費オブジェクト禁止）の遵守状況も確認できる。`;
  }

  if (p === "scripts/gen_progress_dashboard.py") {
    return `【improvement-progress YAML から進捗ダッシュボード HTML 生成スクリプト】

improvement-progress.yaml（改善計画進捗の SSOT）を読み込んで
進捗状況をビジュアルに確認できる HTML ダッシュボードを生成する。
report_improvement_progress.py（テキスト集計版）と対をなす HTML 出力版。`;
  }

  if (p === "scripts/gen_prohibited_words.py") {
    return `【design.yaml の prohibited_words → Playwright 用 TS モジュール変換スクリプト】

design.yaml#ui.prohibited_words（画面に出してはいけない実装語彙）を
Playwright E2E テスト用 TypeScript モジュールに変換して書き出す。
web-pages ルール「実装語彙を UI に出さない規約」の自動検証に使用。`;
  }

  if (p === "scripts/gen_rules_readme.py") {
    return `【.claude/rules/*.md frontmatter から rules/README.md ルール一覧テーブル自動生成スクリプト】

.claude/rules/ 以下のすべての .md ファイルの YAML frontmatter（name / description / globs / related_skills）を
収集して rules/README.md のルール一覧テーブルを自動生成する。
生成物（README.md）は直接編集禁止。新規ルール追加後に再実行する。`;
  }

  if (p === "scripts/inventory_skills.py") {
    return `【.claude/skills/**/SKILL.md 全件 CSV 集計スクリプト（read-only）】

.claude/skills/ 以下のすべての SKILL.md を走査してスキル属性（name / category / version / owner 等）を CSV に集計する。
スキルカタログの棚卸し・カテゴリ別スキル数確認・skill-catalog.yaml との乖離発見に使用。read-only。`;
  }

  if (p === "scripts/issue_pat.py") {
    return `【テスト用 PAT 発行スクリプト（DEPRECATED / USE ROLE 禁止環境では非動作）】

Snowflake Personal Access Token（PAT）を発行する旧スクリプト。
USE ROLE を内部で使用しているため ROLE_RESTRICTION ポリシー環境では失敗する。
代替: issue_pat_as_self.py（USE ROLE 不要）`;
  }

  if (p === "scripts/issue_pat_as_self.py") {
    return `【PAT 自己発行スクリプト（USE ROLE 禁止・ROLE_RESTRICTION 必須対策）】

Snowflake Personal Access Token を対象ユーザ自身として発行するスクリプト。
USE ROLE を使用しないため ROLE_RESTRICTION ポリシー下でも動作する。
issue_pat.py が ROLE_RESTRICTION 環境で失敗する問題への対処として作成。`;
  }

  // lint_*
  if (p === "scripts/lint_agent_descriptions.py") {
    return `【.claude/agents/*.md 4 層責務分離規約 lint（ADR-0109 / A1 🟡 warning）】

agent 定義ファイルが ADR-0109（4 レイヤ責務分離）に違反していないかを静的 lint する。
検出対象: S<N>-<n> 形式の skill ID 列挙 / R・step・gate の表形式再掲 / Phase 対応表 / DRI 表。
（workflow facts の SSOT は workflow-core.yaml であり agent.md への再掲禁止）
次フェーズで 🔴 error 化予定。`;
  }

  if (p === "scripts/lint_compute_pool_policy.py") {
    return `【ADR-0069/0070 Compute Pool ポリシー違反の静的 lint】

design.yaml / Terraform IaC 内の Compute Pool 定義が ADR-0069・ADR-0070 に違反していないかを静的検査。
非共有プール（EGOV_POOL / WEB_POOL / SPRINTER_POOL 等）の残存宣言・ポリシー違反インスタンスタイプを検出。`;
  }

  if (p === "scripts/lint_dead_links.py") {
    return `【Markdown 内の壊れた相対リンクを検出する lint（🟡 warning）】

.claude/skills/**/*.md / .claude/rules/*.md / guide/*.md 等の Markdown ファイル内の
相対リンク（[text](path)）が実在するファイルを指しているか検証する。
http:// 等の外部 URL は対象外。スキル移動・ファイル削除後のリンク切れ一括検出に使用。`;
  }

  if (p === "scripts/lint_design_split.py") {
    return `【design.yaml v2.5 split layout 整合性チェック（ADR-0092 / D1-D5 ルール）】

design.yaml v2.5 形式（ADR-0092 per-feature split）の $ref 参照先ファイルの整合性を検証する lint。
D1 🔴 $ref 先ファイルが存在しない / D2 🔴 必須セクション欠如 / D5 🔴 spec_inclusions と spec_exclusions の同時宣言など。`;
  }

  if (p === "scripts/lint_gh_aw_tools.py") {
    return `【gh-aw tools.bash allow-list の禁止パターン検出 lint】

GitHub Actions Workflow（gh-aw）で使う tools.bash の allow-list に
Snowflake 参照・credentials の直書き等の禁止パターンが含まれていないかを検出する。
関連: pe-ci-github スキル（CI/CD パイプライン管理）`;
  }

  if (p === "scripts/lint_messages.py") {
    return `【agent 間メッセージ JSONL の ADR-0018 C1-C7 規約機械検証 lint】

.hvd/messages/*.jsonl が ADR-0018（ファイルベース agent 通信規約）の C1〜C7 に準拠しているかを検証する。
C2 append-only / C4 gate 承認は progress.yaml のみ / C6 worker → pm/reviewer 直通信禁止 / C7 完了通知 24h 確認。`;
  }

  if (p === "scripts/lint_nextjs_best_practices.py") {
    return `【Next.js 16 + React 19 ベストプラクティス違反を grep ベースで検出する lint】

Next.js 16 / React 19 のベストプラクティス違反を正規表現ベースで検出する静的 lint。
console.log 残存 / useEffect 依存配列省略 / Snowflake・dbt 語彙の UI 露出 / モックデータ本番残存などを検出。`;
  }

  if (p === "scripts/lint_no_snow_cli.py") {
    return `【snow / snowsql CLI 残存使用検出（ADR-0039 全廃 enforce / 🔴 error / CI fail）】

ADR-0039（snow CLI 全廃）に基づきリポジトリ内に snow / snowsql CLI の呼び出しが
残存していないかを全ファイルで検索する。
検出対象: shell スクリプト内の snow コマンド・Python の subprocess.run(["snow", ...])・CI yml の snow 呼び出し。`;
  }

  if (p === "scripts/lint_portfolio_sync.py") {
    return `【projects-inventory.yaml の last_synced_at 乖離検出 lint】

biz/projects-inventory.yaml#indexes の last_modified_at と各 project の last_synced_at を比較して乖離を検出する。
design に capability / data_model / datasource を追加した PR で inventory.yaml を同時更新しないと 🟡 warning が出る。
関連: portfolio-sync ルール（Don't Build pre-check 規律）`;
  }

  if (p === "scripts/lint_progress_steps.py") {
    return `【progress.yaml の step ID と前提順序を検証する lint（L1-L6 ルール）】

progress.yaml 内の step 定義が正しい ID 形式・前提順序に従っているかを検証する。
L1 🔴 step ID が S<phase>-<n> 形式でない / L2 🔴 前提 step が存在しない / L4 🔴 重複 step ID など。`;
  }

  if (p === "scripts/lint_progress_yaml.py") {
    return `【progress.yaml v2.3 lean schema 検証（R1-R8 ルール）】

progress.yaml の構造が v2.3 lean schema に準拠しているかを検証する lint。
ADR-0090 で design.yaml と progress.yaml の二重管理を禁止したため、
各フィールドの帰属境界違反（progress 側に priority / lifecycle 等の design SSOT フィールドが存在など）も検出する。`;
  }

  if (p === "scripts/lint_rule_duplication.py") {
    return `【.claude/rules/*.md と SKILL.md の規約段落重複検出 lint（ADR-0073 SSOT 原則）】

rules/*.md の規約内容と SKILL.md の「適用ルール」セクションで同一内容が重複していないかを検出する。
rules/*.md が SSOT であり SKILL.md は「このルールを参照」の 1 行参照のみとする（1 fact = 1 location）。`;
  }

  if (p === "scripts/lint_secure_views.py") {
    return `【SPCS SECURE VIEW user isolation の静的検査（ADR-0058 / R32-R35 機械化）】

dbt/macros/governance/ の Secure View 定義が ADR-0058（Standard Edition Governance via Secure Views）の
R32-R35 ルールに準拠しているかを静的検査する。
R32 🔴 base table への直接 SELECT GRANT / R33 🔴 Masking Policy 使用（Standard Edition 非対応）など。`;
  }

  if (p === "scripts/lint_skill_size.py") {
    return `【SKILL.md サイズと Progressive Disclosure チェック lint（🟡 warning）】

.claude/skills/**/SKILL.md のファイルサイズと構造が Progressive Disclosure 規約に
従っているかをチェックする。SKILL.md が 200 行超（分割推奨）・前半 50 行に必須セクションがないなどを検出。`;
  }

  if (p === "scripts/lint_web_db_context.py") {
    return `【ADR-0062 enforcement: getSnowflakeContextFromEnv() 不正呼び出し検出（🔴 error）】

web/ 以下の TypeScript コードで getSnowflakeContextFromEnv() が
"use client" を持つ Client Component から呼び出されていないかを静的検出する。
Snowflake 接続情報はサーバ側（Server Action / Route Handler）のみで扱う規約（ADR-0062）の enforcement。`;
  }

  // migrate_*
  if (p === "scripts/migrate_cxo_to_cadre.py") {
    return `【CxO → CADRE 8 役割への一括用語置換スクリプト（ADR-0116 Phase 0' stub）】

ADR-0116（CADRE 8 役割体制）への移行 Phase 0' として、
.claude/agents/*.md / .claude/skills/**/SKILL.md / guide/*.md 等の
CxO 旧用語を CADRE 8 役割名に一括置換するスクリプトの stub。Phase D は scrub_cxo_narrative.py。`;
  }

  if (p === "scripts/migrate_design_split.py") {
    return `【design.yaml v2.4 → v2.5 per-feature 物理分割スクリプト（ADR-0092）】

design.yaml v2.4（単一ファイル）を v2.5（ADR-0092 per-feature split）形式に物理分割する。
features セクションを per-feature の設計ファイルに分割し、design.yaml からは $ref で参照する形に変換。
逆操作: consolidate_design_split.py。検証: lint_design_split.py。`;
  }

  if (p === "scripts/migrate_design_v1_to_v2.py") {
    return `【design.yaml v1.x → v2.0 破壊的マイグレーションスクリプト】

design.yaml の旧 v1.x 形式（単一セクション）を v2.0 形式（multi-section: purpose / personas / decision_flow 等）に変換する。
破壊的操作。実行前に必ずバックアップを取ること。v1.x プロジェクトの移行時に一回限り実行。`;
  }

  if (p === "scripts/migrate_design_v2_0_to_v2_1.py") {
    return `【design.yaml v2.0 → v2.1 マイグレーションスクリプト】

design.yaml v2.0 を v2.1 形式に変換する（主な変更: program: → theme: キー名変更・データモデル構造調整等）。
v2.0 プロジェクトの v2.1 移行時に一回限り実行。migrate_design_v1_to_v2.py の後続バージョンアップ版。`;
  }

  if (p === "scripts/migrate_progress_step_ids.py") {
    return `【progress.yaml の旧 step ID → 新 ID 形式への一括置換スクリプト（ADR-0050）】

ADR-0050（step ID 形式変更）に基づき、progress.yaml 内の旧形式 step ID（integer / decimal）を
新形式（S<phase>-<n>: S1-10 等）に一括置換する。
関連: rewrite_step_refs_in_docs.py（docs 内の step 参照も新 ID に書き直す）`;
  }

  // rename_ / render_*
  if (p === "scripts/rename_doc_chapters.py") {
    return `【ADR-0049: doc/ チャプターを decimal 命名から clean integer に採番し直す one-off スクリプト】

doc/ フォルダ内のチャプターファイル名が decimal 形式（1.1-xxx.html 等）だった場合に
clean integer 形式（01-xxx.html 等）に一括採番し直す一回限りスクリプト（ADR-0049）。`;
  }

  if (p === "scripts/render_biz_directive_status.py") {
    return `【biz directive status table 生成スクリプト（ADR-0114 / CADRE v0.2）】

biz/02-themes/<theme-id>/05-projects.yaml の directive ブロック（DIR-<DOMAIN>-<NNN>）の
lifecycle status（proposed / in_progress / done 等）を集計して HTML ステータステーブルを生成する。
CMO / CEO 向けの directive 進捗一覧表示・biz cycle T2 四半期レビュー資料として使用。`;
  }

  if (p === "scripts/render_evaluation_answers.py") {
    return `【evaluation-items.yaml × slides から評価回答クロスリファレンス HTML 生成スクリプト】

consulting/evaluation-items.yaml と proposal/slides/ を突合して、
評価項目ごとに対応するスライドページを紐付けたクロスリファレンス HTML を生成する。
提案書審査時に評価委員が「この評価項目はどのスライドで回答されているか」を素早く確認できるようにする。`;
  }

  if (p === "scripts/render_feature_coverage.py") {
    return `【3 段階カバレッジテーブル（R-* → F-* → 実装層）Markdown レンダリングスクリプト】

design.yaml の requirements（R-*）→ features（F-*）→ 実装層（stories / ui_screens / capabilities）の
3 段階カバレッジを Markdown テーブルとしてレンダリングする。
R-* と F-* のカバレッジ確認・ゲートレビュー（G1-2）時の証跡資料生成に使用。`;
  }

  if (p === "scripts/render_jcg_requirements_fitness.py") {
    return `【design.yaml fitness を 04-requirements.html に HTML セクションとして注入するスクリプト】

jcg プロジェクトの design.yaml#requirements[].fitness 値を
既存の 04-requirements.html に HTML セクション（fitness バッジ付き）として後付けで注入する。
hvd-verify-requirements-fitness スキルが生成した fitness 値を可視化する用途。`;
  }

  if (p === "scripts/render_test_coverage.py") {
    return `【_perspectives.yaml × case.yaml から Markdown カバレッジ matrix 生成スクリプト】

projects/<name>/tests/<phase>/<axis>/_perspectives.yaml と case.yaml を突合して
テスト観点 × テストケースのカバレッジ matrix を人間可読な Markdown で生成する。
テスト設計の網羅性確認・ゲートレビュー（G2-3 implementation acceptance）資料として使用。`;
  }

  if (p === "scripts/render_trace_report.py") {
    return `【verify_trace_pipeline.py の実行結果を HTML レポートに変換するスクリプト】

verify_trace_pipeline.py（6RTW review-entry trace gate orchestrator）の
実行結果（D1-D2 / W1-W3 等のチェック結果）を見やすい HTML レポートに変換する。
関連: build_review_index.py（全レビューの index.html 生成）`;
  }

  if (p === "scripts/render_training_html.py") {
    return `【course.unit.yaml + narrative.yaml → doc/training/ HTML 生成スクリプト（初期生成のみ / drift 許容 / ADR-0074）】

training/units/ の course.unit.yaml と training/narratives/ の narrative.yaml を元に
doc/training/<chapter>/<id>.html を生成する。
初期生成後は HTML を直接編集可能（drift 許容・ADR-0074）。講師が受講者反応に応じて柔軟に調整できるよう YAML との同期を意図的に行わない。`;
  }

  if (p === "scripts/render_verify_review.py") {
    return `【review.unit.yaml → doc/verify-reports/<id>.{md,html} 生成スクリプト（冪等 / ADR-0081）】

<PRJ_DIR>/review/<gate>/<id>.review.unit.yaml を読み込んで
doc/verify-reports/<id>.md / .html を冪等に生成する。生成物は直接編集禁止。
--check オプションで drift 検出のみ可能。
関連: build_review_index.py（index.html 生成）`;
  }

  // replace_ / report_ / resolve_ / review_ / rewrite_ / run_
  if (p === "scripts/replace_term.py") {
    return `【用語一括置換ユーティリティ（トークン境界保護付き）】

実装語 → 顧客語 / 英略語 → 日本語 等の用語をリポジトリ全体または指定ファイルで一括置換する。
トークン境界保護（部分一致を避けて単語境界で置換）。dry-run モードで確認してから実行可能。
用途: CxO → CADRE 用語移行の補助 / 英語技術用語の日本語化。`;
  }

  if (p === "scripts/report_gate_coverage.py") {
    return `【gate × phase × axis カバレッジレポートをレンダリングするスクリプト】

HVD 品質ゲート（G-R1〜G-R6）と phase / test axis のカバレッジマトリクスを Markdown / HTML でレンダリングする。
どのフェーズ・どのテスト軸でゲートが未カバーかを一覧表示。hvd-pmo スキルの進捗レポート資料として使用。`;
  }

  if (p === "scripts/report_gh_aw_cost.py") {
    return `【gh-aw 月次 KPI レポート集計スクリプト（LLM コスト・採択率・false positive 率）】

GitHub Actions Workflow ベースの AI assistant（gh-aw）の月次 KPI を集計する。
LLM 呼び出しコスト（input / output token 数）・コード採択率（PR マージ後 acceptance rate）・
false positive 率（lint / verify での誤検出率）を集計。CFO-CRO への AI コスト報告に使用。`;
  }

  if (p === "scripts/report_improvement_progress.py") {
    return `【改善計画進捗を集計して表示するスクリプト】

improvement-progress.yaml（改善施策の SSOT）から施策ごとの進捗状況を集計してテキスト形式で表示する。
gen_progress_dashboard.py（HTML ダッシュボード版）の軽量テキスト版。`;
  }

  if (p === "scripts/resolve_design_refs.py") {
    return `【design.yaml の $ref を再帰的に解決して 1 dict を返す共有ユーティリティ】

design.yaml v2.5（ADR-0092 split layout）の $ref で参照される分割ファイルを再帰的に読み込み
単一の統合 dict として返す共有ユーティリティモジュール。YAML circular reference は検出してエラーを返す。
verify_design_v2.py / render_decision_flow.py 等の verify・render 系スクリプトが使用。`;
  }

  if (p === "scripts/review_data_model.py") {
    return `【design 08-data_models.yaml → self-contained HTML review artifact レンダリングスクリプト】

design/08-data_models.yaml（ER 図・Hybrid Table 定義・mart スキーマ）を
レビュー用の self-contained HTML（CSS・図を一体化）として出力する。
G2-3（implementation acceptance）ゲートでの設計レビュー証跡として doc/verify-reports/ に管理。`;
  }

  if (p === "scripts/review_decision_flow.py") {
    return `【design 03-decision_flow.yaml → self-contained HTML review artifact レンダリングスクリプト】

design/03-decision_flow.yaml（意思決定フロー・ルールエンジン定義）を
レビュー用の self-contained HTML として出力する。
G1-2 / G2-3 ゲートでのレビュー証跡として使用。フロー図・判定ロジック・関連 personas を 1 HTML に統合。`;
  }

  if (p === "scripts/rewrite_step_refs_in_docs.py") {
    return `【ADR-0050: docs 内の "Step N" / "P<x>/S<n>" 参照を新 ID に書き直すスクリプト】

guide/*.md / doc/*.md / adr/*.md 内にある旧 step 参照（"Step 1" / "P1/S10" 形式）を
ADR-0050 で定めた新 ID 形式（S<phase>-<n>: S1-10 等）に一括書き直す。
関連: migrate_progress_step_ids.py（progress.yaml 内の step ID を変換）`;
  }

  if (p === "scripts/run_test_yaml.py") {
    return `【HVD test SSOT runner orchestrator: case.yaml の command に従いテスト実行】

tests/<phase>/<axis>/case.yaml に定義された test case の command フィールドに従い
テストを順番に実行し pass / fail / error を収集して結果サマリを出力する SSOT テストランナー。
関連: verify_test_yaml.py（case.yaml の構造検証のみ） / render_test_coverage.py（カバレッジ可視化）`;
  }

  // scrub_ / sf_ / sis_ / skill_ / slim_ / spcs_ / strip_ / sync_ / trace_
  if (p === "scripts/scrub_cxo_narrative.py") {
    return `【narrative ファイルから CxO 用語を CADRE 8 役割に置換する ADR-0116 Phase D スクリプト】

ADR-0116 Phase D として guide/*.md / biz/**/*.md / .claude/agents/*.md 等の narrative ファイルから
CxO 旧用語（CEO/CTO/CFO/CMO/CAIO の旧命名体系）を CADRE 8 役割名に一括置換する。
Phase B（verify_no_cxo_terms.py で 🔴 error 化）の後に実行する修正フェーズ。`;
  }

  if (p === "scripts/sf_finops_stop_all.py") {
    return `【Snowflake リソース全 SUSPEND 緊急停止スクリプト（cost = 0 化）】

Snowflake 上のすべての課金リソース（SPCS service / Compute Pool / Warehouse）を
SUSPEND して月次コストをゼロに近づける緊急停止スクリプト。
月末締め前のコスト圧縮・プロジェクト終了時の後片付けに使用。--dry-run で確認してから実行すること。`;
  }

  if (p === "scripts/sf_sql.py") {
    return `【snow CLI 代替: 任意 SQL を snowflake-connector-python 経由で実行するスクリプト（ADR-0039）】

ADR-0039（snow CLI 全廃）対応として、任意の SQL 文を snowflake-connector-python 経由で実行できる汎用 SQL 実行ツール。
スキーマ確認・権限確認等のアドホック SQL や Terraform 外の DDL/DML 実行に使用。
関連: _sf_common.py（接続共通ユーティリティ）`;
  }

  if (p === "scripts/sis_deploy.py") {
    return `【Streamlit in Snowflake デプロイスクリプト（snow CLI 廃止方針 ADR-0039 対応）】

ADR-0039（snow CLI 全廃）に対応した Streamlit in Snowflake（SiS）デプロイスクリプト。
snow CLI の snow streamlit deploy を snowflake-connector-python で代替する。
SiS は旧技術（ADR-0001 / ADR-0007 で Next.js に移行済み）のためレガシー SiS アプリの保守目的に限定。`;
  }

  if (p === "scripts/skill_refactor.py") {
    return `【YAML-Anchored SSOT 移行ヘルパー: SKILL.md + skill-catalog.yaml → skill.unit.yaml 生成（ADR-0073）】

ADR-0073（YAML-Anchored SSOT パターン）への移行時、
既存 SKILL.md の frontmatter と skill-catalog.yaml のエントリを統合して skill.unit.yaml を生成するマイグレーションヘルパー。
関連: slim_skill_catalog.py（catalog を発見メタのみに痩せさせる後続）/ verify_skill_ssot.py（移行後の検証）`;
  }

  if (p === "scripts/skill_test_coverage.py") {
    return `【tests/skills/ テストフィクスチャ件数と未テストスキルを集計するカバレッジレポーター】

tests/skills/ のテストフィクスチャと .claude/skills/ の全スキルを突合して
テストが書かれていないスキルを一覧表示するカバレッジレポーター。
スキルごとのテスト件数・未テストスキル一覧・カバレッジ率を出力する。`;
  }

  if (p === "scripts/slim_skill_catalog.py") {
    return `【skill-catalog.yaml を「発見メタのみ」に痩せさせる重複フィールド集約スクリプト】

skill-catalog.yaml から skill.unit.yaml に移行済みの重複フィールド（version / inputs / outputs 等）を削除して
catalog を「発見メタ（name / alias / catalog / category）のみ」に痩せさせる。
関連: skill_refactor.py（skill.unit.yaml への初期移行）/ verify_skill_ssot.py（移行後の検証）`;
  }

  if (p === "scripts/spcs_deploy.py") {
    return `【SPCS service の upsert（CREATE/ALTER FROM SPECIFICATION）実行スクリプト（ADR-0039）】

SPCS（Snowpark Container Services）サービスの CREATE FROM SPECIFICATION / ALTER FROM SPECIFICATION を
snowflake-connector-python 経由で実行する upsert スクリプト（冪等）。
関連: spcs_orchestrate.py（build → push → upsert を一括実行）/ spcs_endpoint_check.py（デプロイ後の検証）`;
  }

  if (p === "scripts/spcs_endpoint_check.py") {
    return `【SPCS service の ingress URL を progress.yaml 期待値と突合する検証スクリプト】

SPCS サービスの実際の ingress URL を Snowflake から取得し progress.yaml に記録された期待 URL と一致するか検証する。
SPCS デプロイ後のスモークテストの一環。ingress 外部到達可能確認の前段チェック。
関連: diag_spcs_pat_ingress.py（PAT 認証失敗時の詳細診断）`;
  }

  if (p === "scripts/spcs_image_helper.py") {
    return `【snow CLI 非依存 SPCS Image Registry 操作スクリプト（ADR-0039 全廃対応）】

ADR-0039（snow CLI 全廃）対応として、SPCS Image Registry の URL 取得と docker-login を
snowflake-connector-python 経由で実行する。
get-repository-url（Image Repository の完全修飾 URL 取得）と docker-login（認証トークン発行）を提供。
呼び出し元: spcs/build-image.sh / spcs_orchestrate.py`;
  }

  if (p === "scripts/spcs_orchestrate.py") {
    return `【TOML config 1 つで SPCS Web サービスを build → push → upsert するオーケストレーター（ADR-0039）】

1 つの TOML 設定ファイルを受け取り SPCS Web サービスの
build（Docker image）→ push（Image Registry）→ upsert（Snowflake service）を一括実行する。
snow CLI 非依存（ADR-0039）。--skip-build / --skip-push / --skip-upsert で各ステップのスキップ可能。
内部呼び出し: spcs/build-image.sh → spcs_image_helper.py → spcs_deploy.py`;
  }

  if (p === "scripts/strip_skill_workflow_fields.py") {
    return `【skill.unit.yaml から ADR-0109 禁止キーを除去する破壊的スクリプト】

ADR-0109（4 レイヤ責務分離）で禁止された workflow キー（phase / step / step_id / step_order / dri / reviewer / gate / gates）を
skill.unit.yaml から物理削除する破壊的スクリプト。
実行前に audit_skill_workflow_fields.py で影響範囲を確認すること。削除後は verify_skill_ssot.py（S11/S12）で検証。`;
  }

  if (p === "scripts/sync_skill_versions.py") {
    return `【SKILL.md frontmatter と skill.unit.yaml の version を max 値で同期するスクリプト】

.claude/skills/**/SKILL.md の frontmatter の version と skill.unit.yaml の version を比較し
より大きい値（max）に両方を統一する。
SKILL.md と skill.unit.yaml が別々に更新されて version がズレた場合に使用。
verify_skill_ssot.py の S6 で version 不一致が検出された後の修正手段。`;
  }

  if (p === "scripts/sync_workflow_position.py") {
    return `【workflow-core.yaml から各 SKILL.md frontmatter に workflow_position を bulk 同期するスクリプト】

.claude/framework/workflow-core.yaml の skill → R/step 対応表を元に
各 SKILL.md frontmatter の workflow_position フィールドを一括更新する。
workflow-core.yaml を更新した後に全スキルの workflow_position を一括整合させる際に使用。
関連: backfill_skill_unit_6rtw.py（6RTW-Native v4.0 移行時の遡及更新）`;
  }

  if (p === "scripts/trace_skill_execution.py") {
    return `【指定スキルの依存グラフを構築して実行順序を決定し実行トレースを可視化するスクリプト】

指定スキル名から depends_on を再帰的にたどって依存グラフを構築し、
実行順序（トポロジカルソート）を決定してテキストまたは DOT グラフとして可視化する。
複合スキル（多段依存）の実行順序確認・循環依存検出の視覚化に使用。`;
  }

  // validate_*
  if (p === "scripts/validate_pipeline_consistency.py") {
    return `【workflow-core + extensions と development-pipeline.md / skill-catalog の整合性検証スクリプト】

.claude/framework/workflow-core.yaml と workflow-extensions.yaml の内容が
guide/07-development-pipeline.md および skill-catalog.yaml と整合しているかを検証する。
workflow-core.yaml に定義されたスキルが skill-catalog.yaml に存在するか、
guide の step 記述が workflow-core.yaml と矛盾しないか等をチェックする。`;
  }

  if (p === "scripts/validate_skill_deps.py") {
    return `【skill-catalog depends_on と SKILL.md frontmatter 整合性検証スクリプト】

skill-catalog.yaml の depends_on フィールドと各スキルの SKILL.md frontmatter depends_on が
一致しているかを検証する。
skill_refactor.py / slim_skill_catalog.py 実行後の整合性確認。
verify_skill_dependencies.py / check_skill_dependencies.py と対をなす catalog 側検証。`;
  }

  if (p === "scripts/validate_skill_spec.py") {
    return `【agentskills.io specification 準拠検証スクリプト（ローカル品質ゲート）】

.claude/skills/**/skill.unit.yaml が agentskills.io の Agent Skills specification に
準拠しているかをローカルで検証する品質ゲートスクリプト。
verify_skill_ssot.py が HVD 内部規約を検証するのに対し本スクリプトは外部仕様への準拠を検証する。`;
  }

  if (p === "scripts/validate_theme_schema.py") {
    return `【biz/02-themes/<theme-id>/ 構造とスキーマ検証スクリプト】

biz/02-themes/ 以下の各テーマが .claude/skills/templates/biz-theme-schema.json のスキーマに準拠し、
7 つの必須ファイル（00-meta.yaml 〜 05-projects.yaml + evidence.md）がすべて存在するかを検証する。
--all で全テーマ一括検証 / --theme <id> で個別検証。`;
  }

  // verify_*
  if (p === "scripts/verify_biz_directives.py") {
    return `【biz directive lifecycle 検証（ADR-0114 / CADRE v0.2 / B1-B5 ルール）】

biz/02-themes/<theme-id>/05-projects.yaml の directive ブロック（DIR-<DOMAIN>-<NNN>）の
lifecycle が ADR-0114 の規約に従っているかを B1-B5 ルールで検証する。
B1 🔴 ID 形式不正 / B2 🔴 proposed 以外で accepted_by 欠如 / B4 🟡 in_progress 90 日超（放置）/ B5 🔴 参照 project_id 不在。`;
  }

  if (p === "scripts/verify_biz_strategy.py") {
    return `【biz/ 戦略文書群と products/market カタログ整合検証スクリプト】

biz/01-strategy/ の戦略文書群と biz/ の products / market カタログ（theme.yaml 等）が
相互に整合しているかを検証する。
biz cycle T2 四半期レビュー前の戦略整合確認・新テーマ追加時の既存戦略との矛盾検出に使用。`;
  }

  if (p === "scripts/verify_consulting_coverage.py") {
    return `【consulting.yaml + proposal/ 整合性検証（C1-C4, P1-P3 ルール / ADR-0119）】

consulting/consulting.yaml と proposal/ フォルダの提案書スライドが相互に整合しているかを検証する。
C1 🔴 evaluation_items が spec に存在しない要件を参照 / C4 🟡 未対応の required 評価項目存在
P1 🔴 slides で参照する consulting_ref が consulting.yaml に存在しない / P3 🟡 evidence が未反映。`;
  }

  if (p === "scripts/verify_design_foundation.py") {
    return `【design.yaml ↔ Terraform ↔ dbt ↔ SPCS 間の Snowflake 基盤整合検証（F1-F9 / ADR-0060）】

ADR-0060（design.yaml を Snowflake 基盤 SSOT とする）に基づき、
design/02-architecture.yaml の定義が Terraform・dbt_project.yml・SPCS service.yaml と整合しているかを F1-F9 ルールで検証する。
F1 🔴 Terraform vars.database と design.yaml の不一致 / F3 🔴 dbt_project.yml#vars に廃止済みフィールド残存 / F9 🟡 SPCS でのハードコードなど。`;
  }

  if (p === "scripts/verify_design_schema_versions.py") {
    return `【全 project の design.yaml schema version 検証スクリプト】

projects/ 以下の全プロジェクトの design.yaml および design/*.yaml の schema_version フィールドを確認し
サポート外のバージョンが残っていないかを検証する。
フレームワークバージョンアップ後の全プロジェクト schema version 一括確認・v2.4 以前の旧フォーマット早期発見に使用。`;
  }

  if (p === "scripts/verify_design_v2.py") {
    return `【design.yaml v2.0/v2.1 の R1-R40 包括検証ツール（40 ルール）】

design.yaml v2.0 / v2.1 の構造・参照整合・必須フィールドを R1-R40 の 40 ルールで包括的に検証する。
R1-R10 schema version / 必須セクション / R11-R20 decision_flow / personas 整合 /
R21-R30 capabilities / datasources 参照整合 / R31-R40 governance / security 規約。
hvd-verify スキルのゲート境界での検証実行で使用。`;
  }

  if (p === "scripts/verify_feature_traceability.py") {
    return `【features 層の整合性検証（ADR-0085 / F1-F8 + F10/F12 チェック）】

design.yaml#features（F-*）の定義が requirements（R-*）→ features（F-*）→ 実装層の
3 段トレーサビリティを満たしているかを F1-F8 等で検証する。
F1 🔴 requirement_refs が requirements[] に存在しない / F3 🟡 孤立 feature /
F10 🔴 MVP screen/operation で acceptance_refs が空 / F12 🟡 story/screen/capability の feature_refs が空。`;
  }

  if (p === "scripts/verify_iac_no_shared_collision.py") {
    return `【project IaC が shared infra（HVD_DEV_* 等）を誤宣言していないか検証（ADR-0054）】

projects/*/iac/**/*.tf 内で共有リソース（HVD_DEV_WH / HVD_DEV_POOL 等）を
resource ブロックとして宣言していないかを検証する。
誤宣言があると terraform destroy で共有リソースが消えるリスクがある（ADR-0054）。
関連: iac-tf-layout ルール（project IaC と shared IaC の責務境界）`;
  }

  if (p === "scripts/verify_implementation_acceptance.py") {
    return `【implementation acceptance blocks 検証（A1-A3 ルール）】

design.yaml の capabilities / data_models / ui_inventory に記載された
acceptance（実装受入条件）ブロックが A1-A3 ルールに準拠しているかを検証する。
A1 🔴 acceptance ブロックに criteria が存在しない / A2 🟡 criteria が曖昧（検証不可能な記述）。
G2-3（implementation acceptance gate）で実行される。`;
  }

  if (p === "scripts/verify_no_cxo_terms.py") {
    return `【narrative ファイルから CxO 用語残存を grep で検出（ADR-0116 Phase B / 🔴 error 化済み）】

ADR-0116 Phase B として guide/*.md / biz/**/*.md / .claude/agents/*.md 等から
CxO 旧用語の残存を grep で検出する。Phase B で 🔴 error 化済み（CI fail）。
検出されたファイルは scrub_cxo_narrative.py で修正する。`;
  }

  if (p === "scripts/verify_proposal_traceability.py") {
    return `【spec ⇄ consulting ⇄ slides 3 段トレーサビリティ検証（PT1-PT4 / ADR-0119）】

spec/md/*.md（要件仕様）→ consulting.yaml（評価項目）→ proposal/slides（スライド）の
3 段トレーサビリティを PT1-PT4 ルールで検証する。
PT1 🔴 consulting 評価項目が spec に存在しない / PT2 🔴 slides の consulting_ref が consulting.yaml に不在
PT3 🟡 required 評価項目が slides に未反映 / PT4 🟡 body_block タイプの不一致。`;
  }

  if (p === "scripts/verify_requirements_coverage.py") {
    return `【requirements 層の整合性検証（ADR-0080 / R1-R4 ルール）】

design.yaml#requirements（R-*）の定義が spec → requirements → 実装の
トレーサビリティを R1-R4 ルールで検証する。
R1 🔴 spec_ref.file が実在しない / R2 🔴 "必須:*" 章が requirements に未エントリ（status=out_of_system 以外）
R3 🟡 status=uncovered の requirements が残存 / R4 🟡 機能章が requirements に未マッピング。`;
  }

  if (p === "scripts/verify_rules_frontmatter.py") {
    return `【rules/*.md frontmatter の完全性と skill 名正確性を検証するスクリプト】

.claude/rules/*.md の YAML frontmatter（name / description / globs / related_skills）が
完全に記載され related_skills に列挙されたスキル名が skill-catalog.yaml に実在するかを検証する。
新規ルール追加後の frontmatter 記載漏れ検出。gen_rules_readme.py の前提として実行する。`;
  }

  if (p === "scripts/verify_rules_skills_xref.py") {
    return `【rules ↔ skills 双方向クロスリファレンス一貫性検証スクリプト】

rules/*.md の related_skills と SKILL.md の「適用ルール:」セクションの
双方向参照が一貫しているかを検証する。
rules.md が related_skills に A を列挙しているが A の SKILL.md が当該 rules.md を参照していない等を検出。`;
  }

  if (p === "scripts/verify_skill_dependencies.py") {
    return `【skills 依存グラフ整合性検証（existing check / circular check）】

skill-catalog.yaml の depends_on と .claude/skills/**/SKILL.md frontmatter の depends_on を統合して
依存グラフを構築し、参照スキルの実在確認（existing check）と循環依存（circular check）を検証する。
check_skill_dependencies.py（SKILL.md 専用軽量版）の包括的版。`;
  }

  if (p === "scripts/verify_skill_output_schemas.py") {
    return `【skills output_schema_version 一貫性検証スクリプト】

.claude/skills/**/skill.unit.yaml の output_schema_version フィールドが
skill-catalog.yaml の schema_version と一致しているかを検証する。
スキルのスキーマバージョンアップ時に全スキルの output_schema_version を一括確認する際に使用。`;
  }

  if (p === "scripts/verify_skill_ssot.py") {
    return `【YAML-Anchored SSOT 整合検証（ADR-0073 / S1-S14 ルール）— CI の中核スクリプト】

skill.unit.yaml ↔ SKILL.md の SSOT 整合性を S1-S14 ルールで検証する。
CI の skill-validate.yml で自動実行される中核的な検証スクリプト。
S1-S4 必須キー存在 / S5 narrative での fact 書き換え検出 / S6 version 不一致 /
S11/S12 禁止 workflow キー残存 / S14 retry_policy 構造（ADR-0111 / CADRE §4.1）。
修正: strip_skill_workflow_fields.py（S11/S12）/ sync_skill_versions.py（S6）`;
  }

  if (p === "scripts/verify_spec_coverage.py") {
    return `【spec_refs[] traceability 検証（ADR-0079 / SC1-SC4 ルール）】

design.yaml の spec_refs[]（仕様トレーサビリティ）が ADR-0079 の SC1-SC4 ルールに準拠しているかを検証する。
SC1 🔴 spec_refs[].file が spec/md/*.md に存在しない /
SC2 🟡 カバレッジ（inclusion/exclusion mode）/ SC3 🔴 "必須:*" 章のカバレッジ不足 /
SC4 🟡 anchor 見出しが spec/md 内に存在しない。`;
  }

  if (p === "scripts/verify_spec_routing.py") {
    return `【spec coverage direct routing 検証（consulting/design/slides 経由 / SR1-SR4）】

spec（仕様書）から consulting → design → slides への direct routing が SR1-SR4 ルールに準拠しているかを検証する。
SR1 🔴 spec 章が routing の起点になっていない / SR2 🔴 consulting 経由パスと design 直接パスが混在 /
SR3 🟡 routing depth が 3 段を超過 / SR4 🟡 孤立 spec 章（どの routing にも属さない）。`;
  }

  if (p === "scripts/verify_test_yaml.py") {
    return `【HVD test SSOT 構造検証（T1-T14 ルール）・tests/index.yaml 再生成スクリプト】

tests/<phase>/<axis>/case.yaml の構造が T1-T14 ルールに準拠しているかを検証し
tests/index.yaml を再生成する。
T1 🔴 case.yaml に required フィールド欠如 / T5 🔴 command が実在しない callable を参照 /
T14 🟡 _perspectives.yaml との観点対応が欠如。
関連: run_test_yaml.py（実際のテスト実行）/ render_test_coverage.py（カバレッジ可視化）`;
  }

  if (p === "scripts/verify_theme_consistency.py") {
    return `【project ↔ theme 整合検証（T1-T6 / G1-2 gate）】

projects/<name>/design.yaml に記載された theme_ref が biz/02-themes/<theme_id>/05-projects.yaml に
登録されているかを T1-T6 ルールで検証する。
T1 🔴 design.yaml の theme_ref が biz/02-themes/ に存在しない /
T2 🔴 theme の 05-projects.yaml にプロジェクトが未登録 /
T3 🟡 design.yaml の feature_refs が theme の 04-features.yaml に存在しない。`;
  }

  if (p === "scripts/verify_trace_pipeline.py") {
    return `【6RTW review-entry trace gate orchestrator（D1-D2 / W1-W3 等の新 checks）】

HVD v4.0 6RTW-Native ワークフローにおける review-entry の trace を検証する。
D1 design.yaml が progress.yaml の current_step と整合するか /
D2 前 gate の approval が progress.yaml に記録されているか /
W1 worker の担当スキルが workflow-core.yaml の DRI 定義と一致するか /
W3 skill 実行の prerequisite（前提成果物）が存在するか。
関連: render_trace_report.py（実行結果の HTML レポート変換）`;
  }

  if (p === "scripts/verify_training_unit.py") {
    return `【ADR-0074 course.unit.yaml + narrative.yaml 整合検証（C1-C11 ルール）】

training/units/ の course.unit.yaml と training/narratives/ の narrative.yaml の
内部整合性を C1-C11 ルールで検証する。
C1 🔴 unit に必須フィールド欠如 / C5 🔴 narrative が参照する unit の section_id が存在しない /
C11 🟡 exercise の正解モデルが solution_key に存在しない。
HTML（doc/training/）との drift は検出しない（ADR-0074 drift 許容）。`;
  }

  // ── hackathon-lib-check ────────────────────────────────

  // .github/copilot/
  if (p === ".github/copilot" && node.type === "tree") {
    return `【Copilot タスク別指示フォルダ（L2 指示層）】

L1（copilot-instructions.md）の横断ルールを受けて、タスク種別ごとの詳細手順を定義する。
instructions/*.instructions.md の形式でタスク別指示ファイルを置く。`;
  }

  if (p === ".github/copilot/instructions" && node.type === "tree") {
    return `【タスク別指示ファイルの格納フォルダ】

*.instructions.md の形式でタスク別の Copilot 指示ファイルを置く。
現在は design.instructions.md（設計修正タスク）が 1 ファイル。`;
  }

  if (p === ".github/copilot/instructions/design.instructions.md") {
    return `【設計ドキュメント修正タスクの詳細手順（L2 設計タスク指示）】

■ 修正手順（4 ステップ）
1. 現状確認（architect.md と実コードを両方読む）
2. 修正計画を立てる
3. 修正を実施する
4. drift-check.sh を実行して検証

■ architect.md 編集ルール
・§4.2 のディレクトリ構造は厳密なフォーマット（ツリー記号）で記述する
・Mermaid 図（システム概要図・データフロー図）を必ず含める
・ADR は NNN-kebab-case-title.md 形式、ステータスは「提案」→「承認済み」で遷移

■ 品質基準
drift-check.sh PASS / Mermaid 描画確認 / ADR 最新性 / セクション番号連続性`;
  }

  // .github/ISSUE_TEMPLATE/
  if (p === ".github/issue_template" && node.type === "tree") {
    return `【GitHub Issue テンプレートフォルダ（2 種類）】

agent-task.yml: Agent にタスクを依頼するときの Issue テンプレート
bug-report.yml: バグ報告の Issue テンプレート`;
  }

  if (p === ".github/issue_template/agent-task.yml") {
    return `【Agent タスク依頼用 Issue テンプレート ★最も重要なテンプレート】

Agent に作業を依頼するときはこのテンプレートを使う。

■ 記入項目
・担当 Agent の選択: analyst / modernizer / database / validator / drift-fixer
・ゴール: 何を達成するか（ゴール指示型で書く・現状分析は Agent が自分でやる）
  例: 「src/ 以下の変数命名規則を snake_case に統一する」
・スコープ: 対象範囲（例: src/ および tests/ 以下の全 Java ファイル）
・完了条件: CI PASS / drift-check PASS / テスト追加など

■ スナップショット原則
「何が壊れているか（現状）」は書かない。Agent が実行時にコードを読んで自分で確認する。`;
  }

  if (p === ".github/issue_template/bug-report.yml") {
    return `【バグ報告用 Issue テンプレート】

■ 記入項目
・何が起きているか: 期待される動作と実際の動作を記述
・再現手順: どうすれば再現できるかを記述`;
  }

  // .github/workflows/
  if (p === ".github/workflows" && node.type === "tree") {
    return `【GitHub Actions ワークフロー（5 本）】

※ ローカルの hackathon-lib-check では .gitignore 扱い（workflow スコープなし PAT のため除外済み）。
実際の GitHub リポジトリ（masaki-infinite/hackathon-lib-check）で動く。

architecture-drift-check.yml: architect.md とリポジトリ構成の乖離を自動検出
codeql-analysis.yml: CodeQL によるセキュリティスキャン
dependency-review.yml: PR 時の依存関係 CVE チェック
deploy-app.yml: Maven ビルド → Docker push → Container App 更新
deploy-infra.yml: Bicep で Azure インフラを構築`;
  }

  if (p === ".github/workflows/architecture-drift-check.yml") {
    return `【アーキテクチャドリフト検出ワークフロー】

トリガー: PR 作成・更新 / main へのプッシュ / 手動実行
処理: tools/drift-check.sh design/architect.md を実行（C-01〜C-10 チェック）
権限: contents: read のみ
警告 0 件で成功。1 件でもあるとビルド FAIL。`;
  }

  if (p === ".github/workflows/architecture-drift-check.md") {
    return `【architecture-drift-check.yml の詳細設計書】

ワークフローの背景・チェック項目（C-01〜C-10）・処理ステップを文書化したもの。
C-06: 未定義ディレクトリの検出 / C-07: 未定義ファイルの検出 など、
.yml には書ききれない設計意図が記録されている。`;
  }

  if (p === ".github/workflows/codeql-analysis.yml") {
    return `【CodeQL セキュリティスキャン ワークフロー】

トリガー: main への push / main への PR / 毎週月曜 06:00 UTC
対象言語: Java
処理: Java ファイル検出 → CodeQL 初期化 → Autobuild → 分析実行
条件: Public リポは自動実行。Private/Internal は vars.ENABLE_GHAS=true が必要。`;
  }

  if (p === ".github/workflows/dependency-review.yml") {
    return `【依存関係 CVE チェック ワークフロー（PR 時のみ）】

トリガー: main への PR のみ
処理: actions/dependency-review-action@v4 で追加・変更された依存関係の CVE を検出する。
新しい脆弱性が混入した PR をブロックする。
条件: Public リポは自動実行。Private/Internal は vars.ENABLE_GHAS=true が必要。`;
  }

  if (p === ".github/workflows/deploy-app.yml") {
    return `【アプリ自動デプロイ ワークフロー】

トリガー: src/** / Dockerfile / pom.xml / build.xml の変更が main に push されたとき / 手動実行
環境: production

■ 処理フロー（8 ステップ）
1. チェックアウト
2. JDK 17 セットアップ（Maven キャッシュ有効）
3. Maven でコンパイル・テスト（mvn test）
4. Azure OIDC ログイン
5. ACR（Azure Container Registry）にログイン
6. Docker ビルド・プッシュ（git sha タグ + latest タグ）
7. Container App 更新（プロビジョニング完了待ち 180 秒・リトライ最大 5 回 30 秒間隔）
8. デプロイ結果の FQDN を GitHub Step Summary に表示`;
  }

  if (p === ".github/workflows/deploy-infra.yml") {
    return `【Azure インフラ自動デプロイ ワークフロー（Bicep）】

トリガー: infra/** の変更が main に push されたとき / 手動実行
手動実行時のパラメータ: prefix（デフォルト: team01）/ location（デフォルト: japaneast）/ mysqlAdminLogin

■ 処理フロー（6 ステップ）
1. チェックアウト
2. Azure OIDC ログイン
3. Bicep Lint（infra/main.bicep の構文チェック）
4. Bicep デプロイ（サブスクリプション レベル）
5. デプロイ出力を JSON で抽出（fqdn / acr_login_server / mysql_fqdn / mysql_db）
6. GitHub Step Summary に出力結果をテーブル形式で表示`;
  }

  if (p === "playbook.md") {
    return `【ハッカソン当日の運用マニュアル ★最重要】

5人チームが 09:00〜16:00 でどう動くかのタイムライン。

■ Phase 構成
Phase 0（09:00〜）: Docker Compose で環境起動、analyst Agent が先行
Phase 1: analyst が ANALYZE-LEGACY を実行 → architect.md を生成
Phase 2: architect.md 確定後、全 Agent が並列で PR を出し始める
Phase 3: modernizer / database / validator が並列実装
Phase 4: VERIFY-MIGRATION でベースライン比較
Phase 5: Azure にデプロイ

■ 重要ルール
・architect.md が確定するまで他 Agent は動かない
・drift-check.sh が FAIL したら drift-fixer Agent が修正する
・Issue には「ゴール状態のみ」書く（現状分析は Agent が自分でやる）`;
  }

  if (p === "design/architect.md") {
    return `【アーキテクチャの「唯一の真実の源」★変更権限は analyst と drift-fixer のみ】

■ 記載内容
・As-Is: Java 17 + Struts 1.3.10 + Hibernate 5.6 + MySQL 8.0
・To-Be: Spring Boot 3.x + Azure Container Apps（Phase 2 でリーダーが記述）
・Mermaid のシステム概要図・データフロー図
・問題点分類（S-01〜S-07 セキュリティ / A-01〜A-07 アーキテクチャ / D-01〜D-06 DB / Q-01〜Q-04 品質）
・ディレクトリ構造（drift-check.sh がここをパースして実構成と比較する）

■ なぜ重要か
drift-check.sh がこのファイルに書かれた構成と実ファイルを比較する。
記載と実態が乖離すると GitHub Actions が FAIL する。`;
  }

  if (p === "design/migration-analysis.md") {
    return `【Java 17 アップグレード後の現状分析レポート】

CVE スキャン結果・ギャップ分析・次の移行フェーズ計画が書かれている。
Log4j Critical CVE × 3 は Logback 移行で対応済み。
Struts 1.x の CVE は未対応（Spring Boot 移行が必要）。`;
  }

  if (p === "design" && node.type === "tree") {
    return `【アーキテクチャ設計の「真実の源」フォルダ】

architect.md（正規定義）・migration-analysis.md（現状分析）・adr/（設計意思決定記録）を格納する。
このフォルダの内容が実装とズレると drift-check.sh で検出される。`;
  }

  if (p === "design/adr/001-copilot-customization-and-anti-drift.md") {
    return `【ADR: 並列 PR でのドリフトを防ぐ仕組みを採用した理由】

並列 PR 環境では「コードは衝突しないが意味が矛盾するセマンティックコンフリクト」が起きやすい。
解決策として「Issue=スナップショット原則」「3レイヤー Copilot カスタマイズ」「drift-check.sh」を採用した経緯を記録。`;
  }

  if (p === "design/adr/002-skill-quality-standards-and-phased-loading.md") {
    return `【ADR: スキルファイルの品質基準と読み込み戦略】

スキル品質 5原則（1責務・60行以内・how を書く・完了条件が検証可能など）と
「常時 2本 + 必要時最大 3本」の読み込み戦略の根拠を記録。
根拠: SkillsBench 論文「2〜3個で精度ピーク、それ以上は精度低下」。`;
  }

  if (p === "infra" && node.type === "tree") {
    return `【Azure インフラを Bicep（IaC）で定義するフォルダ】

「どの Azure リソースをどの設定で作るか」をコードで管理する。
main.bicep がエントリーポイント。modules/ 以下に各リソースの定義が分かれている。
deploy-infra.yml（GitHub Actions）がこのフォルダの変更を検知して自動デプロイする。`;
  }

  if (p === "infra/main.bicep") {
    return `【Bicep エントリーポイント — Azure 全リソースの呼び出し元】

targetScope: subscription（サブスクリプション全体が対象）。
prefix・location・containerImage・mysqlAdminPassword などのパラメータを受け取り、
modules/ 以下の 4 モジュール（loganalytics / acr / container-app / mysql）を順番に呼び出す。`;
  }

  if (p === "infra/modules/acr.bicep") {
    return `【Azure Container Registry を作る Bicep モジュール】

Docker イメージを保管するレジストリを Azure に作る。
deploy-app.yml でビルドした Docker イメージをここに push し、Container Apps が取得する。`;
  }

  if (p === "infra/modules/container-app.bicep") {
    return `【Azure Container Apps を作る Bicep モジュール — アプリの実行環境】

WAR（Java アプリ）を実際に動かす場所。ACR から Docker イメージを取得して実行する。
スケールアウト・スケールインも Container Apps が管理する。`;
  }

  if (p === "infra/modules/container-env.bicep") {
    return `【Container Apps Environment を作る Bicep モジュール — 実行基盤】

Container Apps が動くためのネットワーク・ログ転送先などの基盤環境を定義する。
container-app.bicep はこの環境の中で動く。`;
  }

  if (p === "infra/modules/loganalytics.bicep") {
    return `【Log Analytics Workspace を作る Bicep モジュール — ログ収集・監視】

Container Apps のログをここに集約する。Azure Portal から確認できる。`;
  }

  if (p === "infra/modules/mysql.bicep") {
    return `【Azure Database for MySQL（マネージド DB）を作る Bicep モジュール】

本番環境のデータベース。ローカルは docker-compose の MySQL 5.7 を使うが、
Azure デプロイ時はこのマネージド MySQL を使う。
パッチ・バックアップは Azure が管理するため運用負荷が下がる。`;
  }

  if (p === "infra/parameters.template.json") {
    return `【Bicep デプロイ時のパラメータテンプレート】

実際にデプロイするときはこのファイルをコピーして値を埋める。
prefix（チーム識別子）・location（japaneast）・containerImage・mysqlAdminPassword を設定する。`;
  }

  if (p === "skills" && node.type === "tree") {
    return `【Agent が参照する手順書ライブラリ（16 ファイル）】

Agent が「何をどの順番でやるか」の実行手順が書かれたファイル集。
すべて YAML frontmatter（description / phase / tags）付き。
SKILL-INDEX.md がどのスキルをいつ使うかの索引になっている。`;
  }

  if (p === "skills/skill-index.md") {
    return `【スキル索引 — Agent がタスクを受け取ったときに最初に参照する（load-always）】

常時読み込み: SKILL-AUTHORING のみ。
必要時読み込み（13個）: ANALYZE-LEGACY / MODERNIZE-PLAN / ADD-TESTS / CONTAINERIZE /
TRIAGE-ISSUE / CLARIFY-ISSUE / SETUP-MCP / REFACTOR-CODE / FIX-SECURITY /
UPGRADE-DEPENDENCIES / VERIFY-MIGRATION / MODERNIZE-DATABASE / LAUNCH-LEGACY / CAPTURE-BASELINE。`;
  }

  if (p === "skills/skill-authoring.md") {
    return `【スキルファイル自体の作り方（メタスキル・load-always）】

新しいスキルを追加するときに参照する。
スキル品質 5原則・YAML frontmatter の書き方・60行以内のルールなどを定義している。`;
  }

  if (p === "skills/add-tests.md") {
    return `【既存コードへのテスト追加手順（validator Agent が使用）】

CAPTURE-BASELINE でベースラインを記録した後に実行する（順序依存あり）。
テストが 0 件の状態から JUnit テストを追加していく手順が書かれている。`;
  }

  if (p === "skills/analyze-legacy.md") {
    return `【レガシーアプリを分析して architect.md を生成する手順（analyst Agent が使用）】

プロジェクト開始時に analyst が最初に実行するスキル。
コードを読んで As-Is 構成・問題点を特定し design/architect.md を生成する。`;
  }

  if (p === "skills/modernize-plan.md") {
    return `【分析結果をもとに Issue を起票する手順（analyst Agent が使用）】

Issue にはゴール状態のみ記述する（スナップショット原則）。
Issue を 5件以上起票することが analyst の完了条件の一つ。`;
  }

  if (p === "skills/containerize.md") {
    return `【アプリを Docker 化して Azure にデプロイする手順（手順 1〜5）】

手順 5 に Azure デプロイ確認が含まれる。
database Agent が Azure インフラ構築に失敗したときのフォールバックとしても使う。`;
  }

  if (p === "skills/triage-issue.md") {
    return `【起票された Issue を分類・優先度付けする手順（analyst Agent が使用）】

カテゴリ分類（セキュリティ / アーキテクチャ / DB / 品質）・依存関係整理・優先度付け（P0〜P3）。`;
  }

  if (p === "skills/clarify-issue.md") {
    return `【Issue 着手前の認識合わせ手順】

不明点をコメントで投稿 → 承認を待ってから作業開始する。
不明なまま実装を始めて後で差し戻されるのを防ぐ。`;
  }

  if (p === "skills/setup-mcp.md") {
    return `【MCP（Model Context Protocol）サーバーの設定手順（database Agent が使用）】

DB に接続するための JSON 設定を生成する。
database Agent が環境構築時に使用する。`;
  }

  if (p === "skills/refactor-code.md") {
    return `【コードをリファクタリングする手順（modernizer Agent が使用）】

デッドコード除去 → テストしやすい構造への変換。
Raw Types の解消・循環依存の排除なども含む。`;
  }

  if (p === "skills/fix-security.md") {
    return `【セキュリティ脆弱性を検出・修正する手順（modernizer Agent が使用）】

1. 依存関係スキャン（CVE チェック / npm audit / pip-audit / OWASP Dependency-Check）
2. コードレベルの修正（ハードコード認証情報・認証フィルター無効化・管理 JSP 公開など）

現状の Critical リスク: Struts 1.x CVE・DB 認証情報ハードコード・認証フィルター無効化・管理 JSP 公開。`;
  }

  if (p === "skills/upgrade-dependencies.md") {
    return `【依存ライブラリを段階的にアップグレードする手順（modernizer Agent が使用）】

一度に全部上げず、段階的に確認しながら進める。
対応済み: Log4j→Logback / commons-beanutils 1.11.0。
未対応: Struts 1.x（Spring Boot 移行が必要）。`;
  }

  if (p === "skills/verify-migration.md") {
    return `【移行後の動作をベースラインと比較検証する手順（validator Agent が使用）】

CAPTURE-BASELINE で保存したレスポンスと移行後のレスポンスを diff する。
verify-migration.sh スクリプトを使う。結果は baseline/verify-report.md に出力。`;
  }

  if (p === "skills/modernize-database.md") {
    return `【DB をモダナイゼーションする手順（database Agent が使用）】

スキーマ正規化（VARCHAR→DATE/INT の型修正）・InnoDB/MyISAM 混在解消・
スキーマファイルの統合・Flyway（マイグレーション管理ツール）導入などを進める。`;
  }

  if (p === "skills/launch-legacy.md") {
    return `【レガシーアプリを起動する手順（database Agent が環境構築時に最初に使用）】

直接起動（Ant + Tomcat）を試みて失敗したら Docker 化にフォールバックする。
docker compose up -d --build → http://localhost:8080/legacy-app/ でアクセス確認。`;
  }

  if (p === "skills/capture-baseline.md") {
    return `【旧アプリの動作をベースラインとして記録する手順（validator Agent が使用）】

1. baseline/endpoints.json にエンドポイント一覧を記述
2. 各エンドポイントに curl でリクエスト
3. baseline/responses/METHOD_PATH.txt にレスポンスを保存
4. 可変ヘッダ（Date / Set-Cookie / X-Request-Id 等）は除外して保存
移行前に必ず実行しておく（verify-migration.sh の比較元になる）。`;
  }

  if (p === ".github/agents" && node.type === "tree") {
    return `【AI Agent 5体の振る舞い定義フォルダ】

各 Agent が「どのスキルを使うか・何を禁止されているか・完了条件は何か」を定義する。
L3 Agent 定義（3レイヤー指示構造の最下層）。`;
  }

  if (p === ".github/agents/analyst.md") {
    return `【分析・計画 Agent の定義】

担当スキル: ANALYZE-LEGACY → MODERNIZE-PLAN → TRIAGE-ISSUE
役割: プロジェクト開始時に最初に動く。レガシーコードを分析して architect.md を生成し、Issue を 5件以上起票する。
禁止: 初回生成以外での architect.md の変更。`;
  }

  if (p === ".github/agents/database.md") {
    return `【環境・DB 構築 Agent の定義】

担当スキル: LAUNCH-LEGACY → SETUP-MCP → MODERNIZE-DATABASE
役割: レガシーアプリのローカル環境を起動し、MCP 設定・DB モダナイゼーションを進める。
Azure インフラ失敗時は CONTAINERIZE 手順 1〜5 で代替対応。`;
  }

  if (p === ".github/agents/drift-fixer.md") {
    return `【アーキテクチャ乖離修正 Agent の定義】

役割: drift-check.sh の失敗ログを見て architect.md を修正する。
C-01〜C-10 のどのチェックが失敗しているかを特定し、architect.md を修正して PR を出す。
architect.md を変更できる唯一の Agent（analyst の初回生成を除く）。`;
  }

  if (p === ".github/agents/modernizer.md") {
    return `【コード改善 Agent の定義】

担当スキル: REFACTOR-CODE → UPGRADE-DEPENDENCIES → FIX-SECURITY → CONTAINERIZE
役割: コードのリファクタリング・依存ライブラリ更新・セキュリティ修正・Docker 化。
制約: スキルは同時に最大 3個まで参照 / architect.md の変更禁止。`;
  }

  if (p === ".github/agents/validator.md") {
    return `【品質保証 Agent の定義】

担当スキル: CAPTURE-BASELINE → VERIFY-MIGRATION（逐次）→ ADD-TESTS
役割: 作業開始前にベースライン記録 → 各 PR マージ後に VERIFY-MIGRATION で比較 → 最終的にテストを追加。
最終確認: drift-check.sh が PASS / ベースラインとの差分なし。`;
  }

  if (p === ".github/copilot-instructions.md") {
    return `【全 Agent・全タスク共通ルール（L1 横断指示）】

■ 3つの重要原則
1. architect.md が唯一の真実の源（変更できるのは analyst と drift-fixer のみ）
2. Issue = スナップショット原則（ゴールだけ書く・現状分析は Agent が実行時にやる）
3. 日本語優先（ドキュメント・コミットメッセージは日本語）

■ 3レイヤー構成
L1: このファイル（横断ルール）
L2: .github/copilot/instructions/*.instructions.md（タスク別手順）
L3: .github/agents/*.md（Agent 定義）`;
  }

  if (p === "tools" && node.type === "tree") {
    return `【自動化・検証スクリプトフォルダ（3本）】

drift-check.sh: architect.md とリポジトリ構成の乖離を検出
capture-baseline.sh: 旧アプリの動作を保存
verify-migration.sh: 移行後と旧アプリの動作を比較`;
  }

  if (p === "tools/drift-check.sh") {
    return `【アーキテクチャドリフト検出スクリプト】

design/architect.md の §4.2 に書かれた構成と実ファイルを比較する。
チェック項目（C-01〜C-10）: ファイル存在確認・ディレクトリ確認・Mermaid 図確認・セクション番号連続性・ADR 整合性など。
終了コード 0=OK / 1=WARNING あり。GitHub Actions の architecture-drift-check.yml から呼ばれる。`;
  }

  if (p === "tools/capture-baseline.sh") {
    return `【旧アプリの動作をベースラインとして記録するスクリプト】

baseline/endpoints.json のエンドポイントに curl でリクエストし、
レスポンスを baseline/responses/METHOD_PATH.txt に保存する。
可変ヘッダ（Date / Set-Cookie / X-Request-Id）は除外して保存。
移行前に必ず実行しておく（verify-migration.sh の比較元になる）。`;
  }

  if (p === "tools/verify-migration.sh") {
    return `【移行後の動作を旧アプリと比較検証するスクリプト】

baseline/endpoints.json のエンドポイントに移行後アプリへリクエストし、
capture-baseline.sh で保存したレスポンスと diff をとる。
結果を baseline/verify-report.md に出力。終了コード 0=完全一致 / 1=差分あり。`;
  }

  if (p === "config" && node.type === "tree") {
    return `【ローカル開発環境の DB 初期化フォルダ】

docker-compose.yml が起動時に自動で実行する SQL ファイルを置く場所。
01-create-tables.sql: テーブル作成 DDL
02-seed-data.sql: テストデータ投入`;
  }

  if (p === "config/mysql/01-create-tables.sql") {
    return `【テーブル作成 DDL（17 テーブル）— 既知の問題あり】

users / books / authors / categories / customers / orders / order_items /
purchase_orders / suppliers / stock_transactions 等 17 テーブルを作成する。

■ 既知の問題（ファイル内コメントにも記録されている）
・InnoDB と MyISAM が混在している
・重複カラムがある（active_flg と is_enabled など）
・日付を VARCHAR(8/14) で管理している
・src/main/resources/sql/create-tables.sql と内容が乖離している（スキーマ非同期問題）`;
  }

  if (p === "config/mysql/02-seed-data.sql") {
    return `【テストデータ投入 SQL — 本番環境で実行しないこと】

デフォルトアカウント: admin/admin123・manager/manager123・clerk/clerk123・superadmin（pass: "god"）。

■ 注意
・パスワードが MD5 ハッシュ（ソルトなし）で保存されている ← セキュリティリスク
・TRUNCATE が含まれており、本番 DB に誤って実行したインシデントの実績がある`;
  }

  if (p === "pom.xml") {
    return `【Maven ビルド定義（Java 17 対応）】

■ 主要依存関係
Struts 1.3.10（EOL 2013 ← Critical リスク）/ Hibernate 5.6.15 / MySQL Connector 8.0.33
Logback 1.4.14（Log4j CVE 対応済み）/ commons-beanutils 1.11.0（CVE-2025-48734 対応済み）
JUnit Jupiter 5.10.2・Mockito 5.12.0（テストフレームワーク。現在テスト 0 件）

■ ビルド
mvn package -DskipTests で WAR 生成。Java ソース/ターゲット: 17。`;
  }

  if (p === "dockerfile") {
    return `【マルチステージビルド — Maven でビルドして Tomcat で実行】

Stage 1（ビルド）: maven:3.9-eclipse-temurin-17 → mvn package -DskipTests で WAR 生成
Stage 2（実行）: tomcat:9.0-jdk17-temurin-jammy → WAR を /legacy-app に配置
非 root ユーザー（appuser）で実行。ヘルスチェック: GET /legacy-app/health（起動後 90 秒待機）。`;
  }

  if (p === "docker-compose.yml") {
    return `【ローカル開発環境（MySQL 5.7 + Tomcat）】

legacy-mysql: MySQL 5.7、起動時に config/mysql/*.sql を自動実行。
app: Dockerfile でビルド、ポート 8080、legacy-mysql のヘルスチェック通過後に起動。
起動: docker compose up -d --build → http://localhost:8080/legacy-app/`;
  }

  if (p === "src/main/resources/hibernate.cfg.xml") {
    return `【Hibernate 設定ファイル — 要注意項目あり】

■ 危険な設定
hbm2ddl.auto = update → 本番で列削除インシデントの実績あり（BOOK-490）
Connection Pool Size = 1 → 同時接続 1本しか処理できないボトルネック

■ その他
MySQL Connector 8.x 対応 / EhCache は OOM 問題で無効化済み
ファイル内コメントに開発者間の意見対立記録あり（pool size 議論など）`;
  }

  if (p === "src/main/resources/logback.xml") {
    return `【ロギング設定（Log4j → Logback 移行済み）】

CVE-2021-44228（Log4Shell）対応のため Log4j 1.2.17 から Logback 1.4.14 に移行済み。`;
  }

  if (p === "build.xml") {
    return `【旧 Ant ビルドスクリプト（参考用・現在は Maven を使う）】

Maven 移行済みのため実際には使わない。歴史的経緯で残っている。`;
  }

  if (p === "lib" && node.type === "tree") {
    return `【旧 Ant ビルド用 JAR 管理フォルダ（現在は使わない）】

Maven 移行済みのため実際には使わない。HIBERNATE_LIBRARIES.md に旧 JAR 一覧が記録されている。`;
  }

  if (p === "lib/hibernate_libraries.md") {
    return `【旧 Ant ビルドで使っていた JAR ファイルの一覧（参考用）】

Maven 移行済みのため実際には使わない。歴史的経緯で残っている。`;
  }

  if (p === "plan.md") {
    return `【Java 1.5 → 17 アップグレード計画の完了報告書（作成日: 2026-03-10）】

10 段階のアップグレード（1.5→8→11→17）が完了したことを記録したドキュメント。

■ 解決した技術課題
Hibernate 3.6→5.6 の破壊的変更対応 / Log4j CVE→Logback 移行 / MySQL 5.7→8.0 方言変更

■ まだ残っている問題
Struts 1.x は Java 11 以降で非対応 → Spring Boot 移行が必要`;
  }

  return null;
}

function buildAutoNotes(node: TreeNode, result: Record<string, string>) {
  if (node.path) {
    const detailed = getDetailedMemo(node);
    if (detailed !== null) {
      result[node.path] = detailed;
    } else {
      const role = guessRole(node);
      if (role !== "フォルダ" && role !== "ファイル") result[node.path] = role;
    }
  }
  for (const child of node.children) buildAutoNotes(child, result);
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

function decodeBase64Utf8(b64: string): string {
  const binary = atob(b64.replace(/\n/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder("utf-8").decode(bytes);
}

export default function RepoAnalysisPage() {
  const [pageTab, setPageTab] = useState<"repo" | "guide" | "comparison">("repo");
  const [frameworkTab, setFrameworkTab] = useState<"hvd" | "streamlit" | "hackathon" | "agentic" | "jcg" | "tocho" | "chusho">("hvd");
  const [mode, setMode] = useState<Mode>("local");
  const [input, setInput] = useState("");
  const [token, setToken] = useState("");
  const [showTokenSettings, setShowTokenSettings] = useState(false);
  const [localPath, setLocalPath] = useState(JCG_DEFAULT_PATH);

  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [branch, setBranch] = useState("");
  const [repoLabel, setRepoLabel] = useState("");
  const [analyzedLocalPath, setAnalyzedLocalPath] = useState("");
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
  const [savedLocalPaths, setSavedLocalPaths] = useState<SavedLocalPath[]>([]);
  const [search, setSearch] = useState("");
  const [autoLoadState, setAutoLoadState] = useState<LastState | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem(TOKEN_KEY) || "");
    try { setSavedRepos(JSON.parse(localStorage.getItem(REPOS_KEY) || "[]")); } catch {}
    try { setSavedLocalPaths(JSON.parse(localStorage.getItem(LOCAL_PATHS_KEY) || "[]")); } catch {}
    const raw = localStorage.getItem(LAST_STATE_KEY);
    if (raw) {
      try {
        const state = JSON.parse(raw) as LastState;
        setMode(state.mode);
        if (state.mode === "local" && state.localPath) setLocalPath(state.localPath);
        if (state.mode === "github" && state.owner) setInput(`${state.owner}/${state.repo}`);
        setAutoLoadState(state);
      } catch {}
    }
  }, []);

  const saveNote = (filePath: string, value: string) => {
    if (mode === "local") {
      if (!analyzedLocalPath) return;
      setNotes((prev) => {
        const next = { ...prev };
        if (value.trim()) next[filePath] = value; else delete next[filePath];
        localStorage.setItem(localNotesKey(analyzedLocalPath), JSON.stringify(next));
        return next;
      });
    } else {
      if (!owner || !repo) return;
      setNotes((prev) => {
        const next = { ...prev };
        if (value.trim()) next[filePath] = value; else delete next[filePath];
        localStorage.setItem(notesKey(owner, repo), JSON.stringify(next));
        return next;
      });
    }
  };

  const deleteLocalPath = (p: string) => {
    setSavedLocalPaths((prev) => {
      const next = prev.filter((x) => x.path !== p);
      localStorage.setItem(LOCAL_PATHS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const ghHeaders = useCallback((): HeadersInit => {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
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

  const resetView = () => {
    setTree(null);
    setSelected(null);
    setFileContent("");
    setFileError("");
    setError("");
  };

  const mergeAndSaveNotes = (auto: Record<string, string>, storageKey: string) => {
    let existing: Record<string, string> = {};
    let prevAuto: Record<string, string> = {};
    try { existing = JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch {}
    try { prevAuto = JSON.parse(localStorage.getItem(storageKey + "_auto") || "{}"); } catch {}
    const merged: Record<string, string> = { ...existing };
    for (const [key, autoValue] of Object.entries(auto)) {
      const existingValue = existing[key] || "";
      const prevAutoValue = prevAuto[key] || "";
      // Auto wins if: no existing note, existing equals old auto (not user-modified),
      // or this is a bootstrap upgrade from single-line to multi-line detailed memo
      const isDetailedUpgrade = autoValue.includes("\n") && !existingValue.includes("\n");
      if (!existingValue || existingValue === prevAutoValue || isDetailedUpgrade) {
        merged[key] = autoValue;
      }
    }
    localStorage.setItem(storageKey, JSON.stringify(merged));
    localStorage.setItem(storageKey + "_auto", JSON.stringify(auto));
    setNotes(merged);
    return merged;
  };

  const handleLocalAnalyze = useCallback(async (targetPath?: string) => {
    const p = targetPath ?? localPath;
    if (!p.trim()) { setError("パスを入力してください"); return; }
    setLoading(true);
    setError("");
    resetView();
    try {
      const res = await fetch(`/api/local-tree?path=${encodeURIComponent(p)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `失敗しました (HTTP ${res.status})`);
      const built = buildTree(data.entries);
      setOwner("");
      setRepo("");
      setBranch("");
      const label = p.replace(/\\/g, "/").split("/").pop() || p;
      setAnalyzedLocalPath(p);
      setRepoLabel(label);
      setTree(built);
      setExpanded(new Set(built.children.filter((c) => c.type === "tree").map((c) => c.path)));
      const auto: Record<string, string> = {};
      buildAutoNotes(built, auto);
      mergeAndSaveNotes(auto, localNotesKey(p));
      // 最終状態・履歴を保存
      localStorage.setItem(LAST_STATE_KEY, JSON.stringify({ mode: "local", localPath: p } as LastState));
      setSavedLocalPaths((prev) => {
        const filtered = prev.filter((x) => x.path !== p);
        const next = [{ path: p, label, savedAt: new Date().toISOString() }, ...filtered].slice(0, 10);
        localStorage.setItem(LOCAL_PATHS_KEY, JSON.stringify(next));
        return next;
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "解析に失敗しました");
    } finally {
      setLoading(false);
    }
  }, [localPath]);

  const analyze = useCallback(
    async (o: string, r: string, requestedBranch?: string) => {
      setLoading(true);
      setError("");
      resetView();
      try {
        let targetBranch = requestedBranch;
        if (!targetBranch) {
          const repoRes = await fetch(`https://api.github.com/repos/${o}/${r}`, { headers: ghHeaders() });
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
          if (treeRes.status === 403)
            throw new Error("GitHub API のレート制限に達した可能性があります。トークンを設定してください。");
          throw new Error(`ツリーの取得に失敗しました (HTTP ${treeRes.status})`);
        }
        const treeData = await treeRes.json();
        const entries: GitTreeEntry[] = (treeData.tree || []).map((e: GitTreeEntry) => ({
          path: e.path, type: e.type, size: e.size, sha: e.sha,
        }));
        const built = buildTree(entries);
        setOwner(o);
        setRepo(r);
        setBranch(targetBranch!);
        setAnalyzedLocalPath("");
        setRepoLabel(`${o}/${r}`);
        setTree(built);
        setExpanded(new Set(built.children.filter((c) => c.type === "tree").map((c) => c.path)));
        const auto: Record<string, string> = {};
        buildAutoNotes(built, auto);
        mergeAndSaveNotes(auto, notesKey(o, r));
        rememberRepo(o, r, targetBranch!);
        localStorage.setItem(LAST_STATE_KEY, JSON.stringify({ mode: "github", owner: o, repo: r, branch: targetBranch } as LastState));
        if (treeData.truncated)
          setError("⚠️ ファイル数が多くツリーが一部省略されています（GitHub API の制限）。");
      } catch (e) {
        setError(e instanceof Error ? e.message : "解析に失敗しました");
      } finally {
        setLoading(false);
      }
    },
    [ghHeaders]
  );

  // ページ読み込み時に前回の状態を自動復元（handleLocalAnalyze/analyze の後に定義）
  useEffect(() => {
    if (!autoLoadState) return;
    if (autoLoadState.mode === "local" && autoLoadState.localPath) {
      handleLocalAnalyze(autoLoadState.localPath);
    } else if (autoLoadState.mode === "github" && autoLoadState.owner && autoLoadState.repo) {
      analyze(autoLoadState.owner, autoLoadState.repo, autoLoadState.branch);
    }
    setAutoLoadState(null);
  }, [autoLoadState, handleLocalAnalyze, analyze]);

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
      if (mode === "local") {
        const res = await fetch(
          `/api/local-file?dir=${encodeURIComponent(analyzedLocalPath)}&file=${encodeURIComponent(node.path)}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || `ファイル取得に失敗しました (HTTP ${res.status})`);
        setFileContent(data.content || "");
      } else {
        const res = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(node.path).replace(/%2F/g, "/")}?ref=${branch}`,
          { headers: ghHeaders() }
        );
        if (!res.ok) throw new Error(`ファイル取得に失敗しました (HTTP ${res.status})`);
        const data = await res.json();
        if (data.content) setFileContent(decodeBase64Utf8(data.content));
        else setFileError("内容を取得できませんでした。");
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
      if (next.has(path)) next.delete(path); else next.add(path);
      return next;
    });
  };

  const noteCount = Object.keys(notes).length;

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
          <span className="flex-shrink-0">{isFolder ? "📁" : "📄"}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="truncate font-medium">{node.name}</span>
              {hasNote && <span title="メモあり" className="flex-shrink-0 text-xs">📝</span>}
            </div>
            <div className="text-xs text-gray-400 truncate leading-tight">{guessRole(node)}</div>
          </div>
        </div>
        {isFolder && isOpen &&
          node.children.map((child) => (
            <TreeView key={child.path} node={child} depth={depth + 1} />
          ))}
      </div>
    );
  };

  return (
    <div className="-mx-8 -mt-8 -mb-8">
    <div className="pl-4 pr-6 pt-6 pb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">リポジトリ解析</h2>

      {/* ページ上位タブ */}
      <div className="flex gap-0 mb-6 border border-gray-200 rounded-lg overflow-hidden w-fit">
        <button
          onClick={() => setPageTab("repo")}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            pageTab === "repo" ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          📂 リポジトリ解析
        </button>
        <button
          onClick={() => setPageTab("guide")}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            pageTab === "guide" ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          📘 開発手順書
        </button>
        <button
          onClick={() => setPageTab("comparison")}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            pageTab === "comparison" ? "bg-indigo-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          📊 比較
        </button>
      </div>

      {pageTab === "guide" && (
        <div>
          <div className="flex gap-2 mb-6 border-b border-gray-200 pb-4">
            <button
              onClick={() => setFrameworkTab("hvd")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                frameworkTab === "hvd"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              ❄️ HVD（Next.js + SPCS）
            </button>
            <button
              onClick={() => setFrameworkTab("streamlit")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                frameworkTab === "streamlit"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              🐍 Streamlit PoC
            </button>
            <button
              onClick={() => setFrameworkTab("hackathon")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                frameworkTab === "hackathon"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              🏆 hackathon-lib-check
            </button>
            <button
              onClick={() => setFrameworkTab("agentic")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                frameworkTab === "agentic"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              🧭 agentic-dev-template
            </button>
            <button
              onClick={() => setFrameworkTab("jcg")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                frameworkTab === "jcg"
                  ? "bg-sky-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              ❄️ jcg_snowflake
            </button>
            <button
              onClick={() => setFrameworkTab("tocho")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                frameworkTab === "tocho"
                  ? "bg-rose-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              🗼 tocho-geospatial-platform
            </button>
            <button
              onClick={() => setFrameworkTab("chusho")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                frameworkTab === "chusho"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              🏢 chusho-kigyocho-project
            </button>
          </div>
          {frameworkTab === "hvd" && <DevGuide />}
          {frameworkTab === "streamlit" && <StreamlitGuide />}
          {frameworkTab === "hackathon" && <HackathonGuide />}
          {frameworkTab === "agentic" && <AgenticGuide />}
          {frameworkTab === "jcg" && <JcgGuide />}
          {frameworkTab === "tocho" && <TochoGuide />}
          {frameworkTab === "chusho" && <ChushoGuide />}
        </div>
      )}

      {pageTab === "comparison" && <ComparisonSlide />}

      {pageTab === "repo" && <>
      <p className="text-gray-600 mb-6">
        ローカルまたは GitHub のリポジトリ構成を読み解き、自分用メモとして整理できます。
      </p>

      {/* モード切替タブ */}
      <div className="flex gap-0 mb-4 border border-gray-200 rounded-lg overflow-hidden w-fit">
        <button
          onClick={() => { setMode("local"); resetView(); setAutoLoadState(null); }}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            mode === "local"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          ローカル
        </button>
        <button
          onClick={() => { setMode("github"); resetView(); setAutoLoadState(null); }}
          className={`px-5 py-2 text-sm font-medium transition-colors ${
            mode === "github"
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          GitHub
        </button>
      </div>

      {/* 入力フォーム */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        {mode === "local" ? (
          <>
            {/* プリセットリポジトリ — クリックで即解析 */}
            <div className="flex flex-wrap gap-3 mb-4">
              {PRESET_REPOS.map((preset) => {
                const isActive = analyzedLocalPath === preset.path;
                const isLoadingThis = loading && localPath === preset.path;
                return (
                  <button
                    key={preset.path}
                    onClick={() => { setLocalPath(preset.path); handleLocalAnalyze(preset.path); }}
                    disabled={loading}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all disabled:opacity-60 min-w-48 ${
                      isActive
                        ? "border-indigo-500 bg-indigo-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-2xl flex-shrink-0">{preset.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold text-sm ${isActive ? "text-indigo-800" : "text-gray-800"}`}>
                        {preset.label}
                      </div>
                      <div className="text-xs text-gray-500 truncate">{preset.description}</div>
                    </div>
                    {isLoadingThis && (
                      <span className="text-xs text-indigo-500 flex-shrink-0 animate-pulse">解析中…</span>
                    )}
                    {isActive && !isLoadingThis && (
                      <span className="text-xs text-indigo-600 font-medium flex-shrink-0">✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* カスタムパス（折りたたみ） */}
            <details className="group">
              <summary className="cursor-pointer text-xs text-gray-400 hover:text-gray-600 select-none list-none flex items-center gap-1">
                <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
                カスタムパスを指定する
              </summary>
              <div className="mt-2 flex gap-3">
                <input
                  type="text"
                  value={localPath}
                  onChange={(e) => setLocalPath(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLocalAnalyze()}
                  placeholder="C:\Users\...\your-repo"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                />
                <button
                  onClick={() => handleLocalAnalyze()}
                  disabled={loading}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
                >
                  {loading ? "解析中..." : "解析する"}
                </button>
              </div>
            </details>

            {/* 最近のカスタムパス（プリセット以外） */}
            {savedLocalPaths.filter((p) => !PRESET_REPOS.some((r) => r.path === p.path)).length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">最近解析したパス</p>
                <div className="flex flex-wrap gap-2">
                  {savedLocalPaths
                    .filter((p) => !PRESET_REPOS.some((r) => r.path === p.path))
                    .map((item) => (
                      <span
                        key={item.path}
                        className="group inline-flex items-center gap-1 bg-gray-100 hover:bg-indigo-50 rounded-full pl-3 pr-1 py-1 text-xs"
                      >
                        <button
                          onClick={() => { setLocalPath(item.path); handleLocalAnalyze(item.path); }}
                          className="text-gray-700 font-medium"
                        >
                          📂 {item.label}
                        </button>
                        <button
                          onClick={() => deleteLocalPath(item.path)}
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
            <p className="text-xs text-gray-400 mt-3">
              ローカルモードは Next.js 開発サーバー（localhost）でのみ動作します。
            </p>
          </>
        ) : (
          <>
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
                    onClick={() => { localStorage.setItem(TOKEN_KEY, token.trim()); setShowTokenSettings(false); }}
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
                        onClick={() => { setInput(`${r.owner}/${r.repo}`); analyze(r.owner, r.repo, r.branch); }}
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
          </>
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {repoLabel}
              {mode === "github" && branch && (
                <span className="ml-2 text-sm font-normal text-gray-500">branch: {branch}</span>
              )}
              {mode === "local" && (
                <span className="ml-2 text-xs font-normal text-gray-400 font-mono">{analyzedLocalPath}</span>
              )}
            </h3>
            <span className="text-sm text-gray-500">メモ: {noteCount}件</span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-4">
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
              <div className="p-2 max-h-[calc(100vh-280px)] overflow-y-auto">
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
                      <span className="font-mono text-sm text-gray-800 break-all">{selected.path}</span>
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
                      rows={10}
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
                      <div className="overflow-auto max-h-[45vh]">
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

        </>
      )}
      </>}
    </div>
    </div>
  );
}
