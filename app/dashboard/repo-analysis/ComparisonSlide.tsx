"use client";

import { useState } from "react";
import Image from "next/image";

type AgentAction = { agent: string; actions: string[] };

type Slide = {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  script: string;
  bg: string;
};

type ComparisonKey = "hvd-ecc" | "hvd-ghaw" | "hvd-aidlc";

// ─────────────────────────────────────────────
// Shared glossary
// ─────────────────────────────────────────────
const GLOSSARY = [
  { term: "CADRE", en: "Coordinated Agentic Development Role Engine", desc: "HVD が採用するエージェントチームの役割設計フレームワーク。CEO / COO / CTO / CFO-CRO / CMO / CAIO / Worker × 2 の8体フラット組織で構成される。各エージェントに DRI（意思決定責任者）と拒否権（Veto）を割り当てることで、人間のマネジメント組織を AI で再現する。" },
  { term: "AgentShield", en: "ECC のセキュリティパッケージ", desc: "Everything Claude Code（ECC）が提供するセキュリティ機能パッケージ。プロンプトインジェクション・シークレット漏洩・コード改ざんなどの脅威を検出する12点のセキュリティポリシーと、CVE（既知脆弱性）の自動追跡機能を含む。" },
  { term: "OWASP ASI", en: "Open Worldwide Application Security Project – Agentic Security Initiative", desc: "Web アプリセキュリティの国際標準団体 OWASP が2024年に立ち上げた、AIエージェント向けセキュリティガイドライン。プロンプトインジェクション・過剰な権限委譲・安全でないコード実行などのリスクを分類・対策方針を定める。" },
  { term: "FinOps", en: "Financial Operations", desc: "クラウド・SaaS 利用コストを継続的に可視化・最適化するプラクティス。HVD では ADR-0014「固定費最小化」に基づき、常時起動 Warehouse や自動ジョブ・Cortex Search（固定課金）を禁止し、sf-finops スキルで AUTO_SUSPEND チューニングを自動化する。" },
  { term: "段階的フェーズイン", en: "Phased Introduction", desc: "機能や設計書を一度に全部導入せず、工程に応じて段階的に追加していく手法。HVD では design.yaml のセクションを R1〜R6 の各フェーズで順番に埋めていくことで、初期の記述負荷を下げながら設計書を完成させる。" },
  { term: "6RTW-Native v4.0", en: "6 Reviews To Work-Native", desc: "HVD の開発パイプライン名。R1（仕様・AI戦略）→ R6（運用・セキュリティ）の6段階ゲートと22ステップで構成される。各ゲートを通過しないと次フェーズに進めない品質保証の仕組み。" },
  { term: "SSOT", en: "Single Source of Truth（唯一の真実の源）", desc: "システム内のある情報を1箇所にだけ定義し、他の場所はそこを参照する設計原則。HVD では design.yaml が SSOT であり、Snowflake のスキーマ・Web UI・governance 設定などすべてがここから自動生成される。" },
  { term: "ADR", en: "Architecture Decision Record（アーキテクチャ決定記録）", desc: "「なぜこの設計を選んだか」を文書として残す手法。背景・検討した選択肢・決定内容・トレードオフを記録する。HVD には 110 件、gh-aw には 200 件が存在する。" },
  { term: "safe-outputs", en: "gh-aw のセキュリティ機能", desc: "gh-aw が提供する書き込み制御機能。エージェントは デフォルトで読み取り専用で動作し、safe-outputs を明示的に宣言した場合のみファイル書き込みやコマンド実行が許可される。サプライチェーン攻撃への防御層として機能する。" },
  { term: "Cross-Harness", en: "複数のAIツールへの対応", desc: "Claude Code・Cursor・GitHub Copilot・Codex・Gemini など複数の AI 開発ツール（ハーネス）で同じスキルやエージェントが動作すること。ECC はハーネスごとに専用ディレクトリを持ち、gh-aw は Copilot / Claude / Codex / Gemini を統一 API で扱う。" },
  { term: "DRI", en: "Directly Responsible Individual（直接責任者）", desc: "ある意思決定や成果物の最終責任を持つ個人（またはエージェント）を明示する概念。HVD の CADRE では各エージェントが担当領域の DRI となり、承認・拒否の権限が明確になる。" },
  { term: "WASM / WebAssembly", en: "Web Assembly", desc: "ブラウザや Node.js 上でバイナリ速度で動作するコンパイルターゲット。gh-aw は Go コードを WASM にコンパイルし、ブラウザ上で直接ワークフローを実行できる。wasm-opt で 8% のサイズ最適化を適用している。" },
];

// ─────────────────────────────────────────────
// HVD vs ECC スライド
// ─────────────────────────────────────────────
function buildEccSlides(onOpenAgentShield: () => void, onOpenRules115: () => void): Slide[] {
  return [
    {
      id: 1, title: "hvd-claud-agent--skills 概要", subtitle: "Snowflake × AI エージェントの超高速デリバリーフレームワーク",
      bg: "from-blue-900 to-blue-800",
      script: "hvd-claud-agent--skillsは、スローガン「Maximum Delivery, Minimum Development」を掲げるSnowflake特化のAIエージェントフレームワークです。design.yamlに意図を書けば、121本の内製スキルと8体のCADREエージェントが設計・実装・検証・デプロイを自動で走らせます。6RTW-Native v4.0という6段階ゲート方式で22ステップが整備されており、Snowflake Cortex AgentやSemantic View、SPCSデプロイまでを一気通貫でカバーしています。",
      content: (
        <div className="flex flex-col gap-4 mt-4">
          <div className="bg-blue-700/40 rounded-xl p-4 border border-blue-400/30">
            <div className="text-blue-200 font-semibold mb-2">🎯 コアコンセプト</div>
            <div className="text-white text-sm"><code className="bg-blue-900/60 px-2 py-0.5 rounded text-blue-200">design.yaml</code> を唯一の真実源として、Snowflake / Web UI / Governance を一気通貫で自動実装</div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[["🏗️","6RTW-Native v4.0","22ステップ・6品質ゲートのパイプライン"],["🤖","CADRE 8体エージェント","CEO/COO/CTO/CFO相当の役割設計"],["❄️","Snowflake Cortex統合","Cortex Agent / Analyst / MCP / SPCS"],["📋","ADR 110件","設計判断をすべて記録・追跡"],["🔍","hvd-verify R1–R28","28項目の自動整合性検証"],["💼","FDE/PdE二本柱","現場エンジニアと製品エンジニアの分業"]].map(([icon,label,desc])=>(
              <div key={label as string} className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-xl mb-1">{icon}</div>
                <div className="text-white font-medium text-xs">{label}</div>
                <div className="text-white/60 text-xs mt-1">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 2, title: "ECC（Everything Claude Code）概要", subtitle: "クロスハーネス対応の汎用エージェントOSSプラットフォーム",
      bg: "from-orange-900 to-amber-800",
      script: "ECCはAffaan Mustafa氏が開発した「すべてのAI IDEハーネスに対応する」汎用エージェントシステムです。Claude Code・Cursor・Codex・OpenCode・Gemini・Zed・GitHub Copilotなど8種以上のツールに対応しており、182,000以上のGitHub Starを獲得しています。63体のエージェント、249のスキル、79のコマンド、115本のRulesを備えています。AgentShieldというセキュリティパッケージとCross-harnessの設計思想が特徴で、MITライセンスで無料公開されています。",
      content: (
        <div className="flex flex-col gap-4 mt-4">
          <div className="bg-orange-700/40 rounded-xl p-4 border border-orange-400/30">
            <div className="text-orange-200 font-semibold mb-2">🎯 コアコンセプト</div>
            <div className="text-white text-sm">「The harness-native operator system」— どのAIツールでも動く、ハーネス非依存のエージェント基盤</div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {([["🔀","Cross-Harness 8+","Claude/Cursor/Codex/Gemini/Zed/Copilot等", false],["🌍","OSS・MIT","182K Stars / 28K Forks / 170+ Contributors", false],["🛡️","AgentShield","セキュリティパッケージ・脅威検出 ▶ クリックで詳細", true],["📚","115 Rules","12言語エコシステム別ルール ▶ クリックで詳細", true],["🧪","137 Tests","unit/integration/E2Eテスト", false],["📖","1,337 Docs","多言語対応（日本語含む11言語）", false]] as [string,string,string,boolean][]).map(([icon,label,desc,clickable])=>(
              clickable ? (
                <button key={label} onClick={() => label === "AgentShield" ? onOpenAgentShield() : onOpenRules115()} className="bg-white/10 rounded-xl p-3 border border-orange-400/50 hover:border-orange-300 hover:bg-orange-500/20 transition-all text-left group">
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-white font-medium text-xs group-hover:text-orange-200 transition-colors">{label}</div>
                  <div className="text-white/60 text-xs mt-1">{desc}</div>
                </button>
              ) : (
                <div key={label} className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-white font-medium text-xs">{label}</div>
                  <div className="text-white/60 text-xs mt-1">{desc}</div>
                </div>
              )
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 3, title: "設計思想の違い", subtitle: "何のために作られたか",
      bg: "from-teal-900 to-cyan-900",
      script: "両者の最大の違いは「誰のために・何のために作ったか」です。HVDはNomuraのFDEが顧客現場でSnowflakeを使ったAIシステムを高速デリバリーするための専用ツールです。design.yamlに意図を書けば本番まで自動で動く、縦方向の深さが強みです。一方ECCは、どのAIツールを使っていてもどの言語でも動く横方向の広さが強みです。どちらが優れているというより、目的に応じた正解が異なります。",
      content: (
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="flex flex-col gap-3">
            <div className="text-blue-300 font-bold text-lg">HVD の哲学</div>
            {[["🎯","深さ優先","Snowflake × AI 特化。ドメイン知識を121スキルに凝縮"],["🏢","組織モデル","8体CxO相当エージェントが責任分担。人間チームをAIで再現"],["📄","SSOT中心","design.yaml が唯一の真実。すべての工程が1ファイルから派生"],["🔒","ガバナンス強","ADR110件・固定費禁止・Secure View・整合性検証28項目"],["⚡","速さ最優先","FDEが顧客現場で当日中に本番デプロイ可能な水準を目指す"]].map(([icon,title,desc])=>(
              <div key={title as string} className="bg-blue-800/40 rounded-lg p-3 border border-blue-500/30 flex gap-3">
                <span className="text-xl">{icon}</span>
                <div><div className="text-white font-medium text-sm">{title}</div><div className="text-white/60 text-xs">{desc}</div></div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-orange-300 font-bold text-lg">ECC の哲学</div>
            {[["🌐","広さ優先","8+ハーネス・12言語対応。ツール非依存で誰でも使える"],["👥","スペシャリストモデル","63体の専門エージェントが用途別に独立。疎結合設計"],["📦","モジュール設計","skills/commands/rules を組み合わせて自由にカスタム"],["🛡️","セキュリティ基盤","AgentShield・12点ポリシー・CVE追跡が標準装備"],["🌍","OSS・コミュニティ","MIT公開・170+コントリビュータ・182K Starsの資産"]].map(([icon,title,desc])=>(
              <div key={title as string} className="bg-orange-800/40 rounded-lg p-3 border border-orange-500/30 flex gap-3">
                <span className="text-xl">{icon}</span>
                <div><div className="text-white font-medium text-sm">{title}</div><div className="text-white/60 text-xs">{desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 4, title: "HVD の独自価値", subtitle: "ECCにはない強み",
      bg: "from-blue-900 to-indigo-900",
      script: "HVDにしかない強みを整理します。最大の独自価値は「Snowflakeとのディープインテグレーション」です。Cortex Agent・Analyst・Semantic View・MCP・SPCSという主要サービスすべてにスキルが対応しています。次に「ADR 110件による設計判断の蓄積」、「CADRE 組織モデル」、「hvd-verify 28項目の整合性検証」、「実案件8件の内包」、「固定費最小化の設計化」が独自価値です。",
      content: (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {[["❄️","Snowflake ディープ統合","Cortex Agent / Analyst / Semantic View / MCP / SPCS / dbt / Secure Viewまでカバー","唯一無二","bg-blue-500"],["📜","ADR 110件の設計知識","「なぜこの設計か」をすべて記録。ADR-0001から0128まで意思決定を完全トレース","圧倒的差","bg-indigo-500"],["🏢","CADRE 組織モデル","8体エージェントにCEO/COO/CTO/CFO相当の役割とDRI/Reviewerを明示。反対意見構造あり","先進的","bg-violet-500"],["✅","hvd-verify 28項目","R1–R28の自動整合性検証。design.yamlと実装の乖離をCI段階で検出","自動化","bg-teal-600"],["💼","実案件 8プロジェクト","ai-accelerator / egov-compliance / jcg-platform等、実際のプロジェクトをリポジトリ内に保有","実績","bg-blue-600"],["💰","固定費最小化の設計","ADR-0014で自動ジョブ・常時起動Warehouse禁止。コスト管理がコード化","ガバナンス","bg-emerald-600"]].map(([icon,title,desc,tag,tagColor])=>(
            <div key={title as string} className="bg-white/10 rounded-xl p-4 border border-white/15">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-sm">{title}</span>
                    <span className={`text-xs text-white px-2 py-0.5 rounded-full ${tagColor}`}>{tag}</span>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 5, title: "ECC から学べること", subtitle: "HVD に取り込むべき知見",
      bg: "from-amber-900 to-orange-900",
      script: "ECCのどこを参考にすべきか、優先度別に見ていきます。P1は言語別Rulesの整備とAgentShield相当のセキュリティ基盤です。P2はスラッシュコマンドの充実とテストの定量化。P3は将来的なマルチハーネス対応です。",
      content: (
        <div className="flex flex-col gap-3 mt-4">
          {[{priority:"P1",color:"bg-red-500",title:"言語別 Rules の体系化",ecc:"115本（Python/TS/Go/Rust/Java/Kotlin等）",hvd:"18本（.claude/rules/ 配下）",action:"Snowflake SQL・dbt・Next.js・Terraform 専用 Rules を追加・整理"},
            {priority:"P1",color:"bg-red-500",title:"AgentShield 相当のセキュリティ基盤",ecc:"AgentShield パッケージ・12点ポリシー・CVE追跡",hvd:"validate-secrets.sh フック（基本チェックのみ）",action:"OWASP ASI準拠の自動チェックスキルを .agents/skills/ に追加"},
            {priority:"P2",color:"bg-yellow-500",title:"スラッシュコマンドの充実",ecc:"79コマンド（/tdd /plan /e2e /code-review等）",hvd:"主なエントリは hvd-dev-cycle のみ",action:"/hvd-start /hvd-verify /hvd-adr を .claude/commands/ に追加"},
            {priority:"P2",color:"bg-yellow-500",title:"テストの定量化",ecc:"137テストファイル / node tests/run-all.js で一括実行",hvd:"tests/ はあるが定量計測がしにくい",action:"pytest / vitest ベースで tests/run-all.sh を整備しCI で数値計測"},
            {priority:"P3",color:"bg-green-600",title:"マルチハーネス対応（将来）",ecc:"8種以上（.cursor/.codex/.opencode/.gemini等）",hvd:"Claude Code 専用",action:"将来 Cursor 等対応時に ECC の harness adapter パターンを参考にする"},
          ].map((c)=>(
            <div key={c.title} className="bg-white/10 rounded-xl p-3 border border-white/10 flex gap-3">
              <div className={`${c.color} text-white text-xs font-bold px-2 py-1 rounded-lg h-fit mt-1 shrink-0`}>{c.priority}</div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm mb-1">{c.title}</div>
                <div className="text-xs mb-1"><span className="text-orange-300">ECC: </span><span className="text-white/70">{c.ecc}</span></div>
                <div className="text-xs mb-2"><span className="text-blue-300">HVD: </span><span className="text-white/70">{c.hvd}</span></div>
                <div className="bg-white/10 rounded px-2 py-1 text-xs text-white/80">→ {c.action}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 6, title: "HVD の改善提案", subtitle: "短期・中期・長期アクション",
      bg: "from-rose-900 to-pink-900",
      script: "改善提案をタイムライン別に見ていきます。短期（1〜2週）は Rules 再整理・コマンド追加・OWASP スキル追加・テスト整備の4点。中期（1〜2ヶ月）はセキュリティスキル実装・design.yaml 段階的フェーズイン・スキル依存グラフ可視化。長期（3ヶ月〜）はADRステータス管理の自動化・FinOps強化・マルチハーネス対応検討です。",
      content: (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[{term:"短期（1〜2週）",color:"border-red-400",headerColor:"text-red-300",items:["Rules を Snowflake / dbt / Next.js カテゴリで再整理",".claude/commands/ に /hvd-start /hvd-verify /hvd-adr を追加","OWASP ASI スキルを .agents/skills/ に追加","テスト実行スクリプト tests/run-all.sh の整備"]},
            {term:"中期（1〜2ヶ月）",color:"border-yellow-400",headerColor:"text-yellow-300",items:["AgentShield 相当のセキュリティレビュースキル実装","design.yaml 段階的フェーズイン（R1-R3 は軽量版）","スキル依存グラフの可視化（DAG 描画スクリプト追加）","CADRE 移行に伴うガイドドキュメントの更新"]},
            {term:"長期（3ヶ月〜）",color:"border-green-400",headerColor:"text-green-300",items:["ADR ステータス管理の自動化（Accepted ゲート実装）","Multi-project 管理の projects.yaml 化","FinOps スキルの強化（cost alert → ADR-0014 連動）","マルチハーネス対応検討（Cursor / OpenCode）"]},
          ].map((c)=>(
            <div key={c.term} className={`bg-white/10 rounded-xl p-4 border ${c.color}`}>
              <div className={`font-bold text-sm mb-3 ${c.headerColor}`}>{c.term}</div>
              <ul className="flex flex-col gap-2">
                {c.items.map((item,i)=>(
                  <li key={i} className="text-white/70 text-xs flex gap-2"><span className="text-white/40 shrink-0">•</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 7, title: "まとめ", subtitle: "両者の立ち位置と今後の方向性",
      bg: "from-slate-800 to-gray-900",
      script: "まとめです。HVDとECCは競合ではなく目的が異なります。HVDはSnowflake特化の深さでADR・CADRE・SSOT・整合性検証でECCを上回ります。ECCはクロスハーネス・OSS・コミュニティで圧倒的です。「HVDの強みを守りながらECCの知見を選択的に取り込む」が正しい方向性で、言語別Rules・スラッシュコマンド・セキュリティスキルの3点から着手するのが最も効果的です。",
      content: (
        <div className="flex flex-col gap-4 mt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-800/40 rounded-xl p-4 border border-blue-500/30">
              <div className="text-blue-300 font-bold mb-2">HVD が勝る点</div>
              <ul className="text-white/70 text-xs flex flex-col gap-1.5">
                {["Snowflake ドメイン特化の深さ","ADR 110件の設計知識蓄積","組織モデル（CADRE）の先進性","28項目の自動整合性検証","固定費・ガバナンスの設計化","実案件 8件を内包"].map(t=><li key={t}>✅ {t}</li>)}
              </ul>
            </div>
            <div className="bg-orange-800/40 rounded-xl p-4 border border-orange-500/30">
              <div className="text-orange-300 font-bold mb-2">ECC が勝る点</div>
              <ul className="text-white/70 text-xs flex flex-col gap-1.5">
                {["クロスハーネス対応（8種以上）","言語別 Rules 115本の網羅性","AgentShield セキュリティ基盤","コミュニティ・OSS の規模","テストの定量化・CI 整備","ドキュメント 1,337本"].map(t=><li key={t}>✅ {t}</li>)}
              </ul>
            </div>
            <div className="bg-emerald-800/40 rounded-xl p-4 border border-emerald-500/30">
              <div className="text-emerald-300 font-bold mb-2">推奨アクション</div>
              <ul className="text-white/70 text-xs flex flex-col gap-1.5">
                {["Rules を言語別に再整理","スラッシュコマンドを追加","OWASP スキルを導入","テストを定量化","HVD の強みは崩さない","ADR で取り込み判断を記録"].map(t=><li key={t}>🎯 {t}</li>)}
              </ul>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
            <div className="text-white/40 text-xs mb-1">結論</div>
            <div className="text-white font-semibold text-sm">HVD は「Snowflake 特化の深さ」で勝負する。ECC から「Rules 体系・セキュリティ・コマンド」を選択的に取り込み、<br />日本で最も洗練された Snowflake エージェントフレームワークを目指す。</div>
          </div>
        </div>
      ),
    },
  ];
}

// ─────────────────────────────────────────────
// HVD vs gh-aw スライド
// ─────────────────────────────────────────────
function buildGhawSlides(): Slide[] {
  return [
    {
      id: 1, title: "hvd-claud-agent--skills 概要", subtitle: "Snowflake × AI アプリケーションの自動デリバリーフレームワーク",
      bg: "from-blue-900 to-blue-800",
      script: "hvdはSnowflakeを使ったAIシステムを高速に本番デリバリーするためのフレームワークです。design.yamlというSingle Source of Truthに意図を書けば、121本のスキルと8体のCADREエージェントが設計・実装・検証・デプロイを自動実行します。ADR 110件で設計判断を記録し、hvd-verify R1-R28で整合性を自動検証します。8件の実案件を内包しており、Snowflake Cortex AgentやSPCSまで一気通貫です。",
      content: (
        <div className="flex flex-col gap-4 mt-4">
          <div className="bg-blue-700/40 rounded-xl p-4 border border-blue-400/30">
            <div className="text-blue-200 font-semibold mb-2">🎯 コアコンセプト</div>
            <div className="text-white text-sm"><code className="bg-blue-900/60 px-2 py-0.5 rounded text-blue-200">design.yaml</code> を唯一の真実源として Snowflake / Web UI / Governance を一気通貫で自動実装する <strong className="text-blue-200">アプリケーション層</strong> のフレームワーク</div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[["🏗️","6RTW-Native v4.0","22ステップ・6品質ゲートのパイプライン"],["🤖","CADRE 8体エージェント","CEO/COO/CTO/CFO相当の役割設計"],["❄️","Snowflake Cortex統合","Cortex Agent / Analyst / MCP / SPCS"],["📋","ADR 110件","設計判断をすべて記録・追跡"],["🔍","hvd-verify R1–R28","28項目の自動整合性検証"],["💼","8実案件を内包","実際のプロジェクトがリポジトリに存在"]].map(([icon,label,desc])=>(
              <div key={label as string} className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-xl mb-1">{icon}</div>
                <div className="text-white font-medium text-xs">{label}</div>
                <div className="text-white/60 text-xs mt-1">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 2, title: "gh-aw（GitHub Agentic Workflows）概要", subtitle: "マークダウンで書いてGitHub Actions上でAIを動かすCLI拡張",
      bg: "from-green-900 to-emerald-900",
      script: "gh-awはGitHubが開発したGitHub CLI拡張機能です。マークダウン形式で書いたエージェントワークフロー定義を、GitHub Actions YAMLに自動コンパイルして実行します。Copilot・Claude・OpenAI Codex・Google Geminiという主要4AIエンジンに対応しています。セキュリティが最大の特徴で、デフォルト読み取り専用・safe-outputsによる書き込み制御・サンドボックス実行・ネットワーク隔離という多層防御を持っています。ADRは200件と非常に充実しており、Go 1.26.3で実装されています。",
      content: (
        <div className="flex flex-col gap-4 mt-4">
          <div className="bg-green-700/40 rounded-xl p-4 border border-green-400/30">
            <div className="text-green-200 font-semibold mb-2">🎯 コアコンセプト</div>
            <div className="text-white text-sm">マークダウンで書いたワークフローを GitHub Actions に自動コンパイルして実行する <strong className="text-green-200">インフラ層</strong> のツール。AI エンジンをスワップ可能に抽象化</div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[["🔄","Markdown→YAML","自然言語定義を GitHub Actions に自動コンパイル"],["🤖","4AIエンジン対応","Copilot / Claude / Codex / Gemini を統一 API で扱う"],["🛡️","多層セキュリティ","デフォルト読み取り専用・safe-outputs・サンドボックス・NW隔離"],["📋","ADR 200件","設計判断のドキュメント化が HVD 以上に充実"],["🌐","WASM対応","ブラウザでもワークフローを実行可能"],["🔨","Dogfooding","gh-aw 自体を Copilot Coding Agent で開発している"]].map(([icon,label,desc])=>(
              <div key={label as string} className="bg-white/10 rounded-xl p-3 border border-white/10">
                <div className="text-xl mb-1">{icon}</div>
                <div className="text-white font-medium text-xs">{label}</div>
                <div className="text-white/60 text-xs mt-1">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 3, title: "設計思想の違い", subtitle: "アプリ層 vs インフラ層",
      bg: "from-teal-900 to-cyan-900",
      script: "最も重要な違いは「レイヤーが違う」という点です。HVDはSnowflakeを使ったAIアプリケーションを『何を作るか』を定義するアプリケーション層のツールです。一方gh-awは『どうやってAIをGitHub Actions上で動かすか』というインフラ層のツールです。これは競合ではなく、理論上は組み合わせて使えます。gh-awでHVDのワークフローをGitHub Actions上で実行する、という統合も将来考えられます。",
      content: (
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="flex flex-col gap-3">
            <div className="text-blue-300 font-bold text-lg">HVD の哲学 — アプリ層</div>
            {[["🎯","What to build","Snowflake上に何を作るかをdesign.yamlで定義"],["🏢","組織モデル","8体CxO相当エージェントが設計〜デプロイを担当"],["📄","SSOT中心","design.yaml がすべての起点。設計ドリフトを自動検出"],["💡","ドメイン特化","Snowflake Cortex・dbt・IaC・UIまで縦一直線"],["📊","ビジネス連動","biz-cycleでKPI・テーマ・ポートフォリオも管理"]].map(([icon,title,desc])=>(
              <div key={title as string} className="bg-blue-800/40 rounded-lg p-3 border border-blue-500/30 flex gap-3">
                <span className="text-xl">{icon}</span>
                <div><div className="text-white font-medium text-sm">{title}</div><div className="text-white/60 text-xs">{desc}</div></div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-green-300 font-bold text-lg">gh-aw の哲学 — インフラ層</div>
            {[["⚙️","How to run","GitHub Actions上でAIをどう動かすかを定義"],["🔄","コンパイル型","Markdown→YAML変換で人間が書きやすい形を維持"],["🛡️","セキュリティ第一","デフォルト読み取り専用・safe-outputsで書き込みを制御"],["🔌","エンジン抽象化","AIエンジンをスワップ可能。ベンダーロックインなし"],["🐕","Dogfooding","gh-aw自体をCopilot Coding Agentで開発している"]].map(([icon,title,desc])=>(
              <div key={title as string} className="bg-green-800/40 rounded-lg p-3 border border-green-500/30 flex gap-3">
                <span className="text-xl">{icon}</span>
                <div><div className="text-white font-medium text-sm">{title}</div><div className="text-white/60 text-xs">{desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 4, title: "HVD の独自価値", subtitle: "gh-awにはない強み",
      bg: "from-blue-900 to-indigo-900",
      script: "gh-awと比べてHVDにしかない強みです。まず「Snowflakeドメインの深さ」で、gh-awはSnowflakeのことをまったく知りません。次に「アプリケーションを作り切る力」で、gh-awはワークフロー実行基盤だけ、HVDは設計からデプロイまで一気通貫です。ADR 110件の設計知識蓄積・CADRE組織モデル・実案件8件の内包・ビジネスサイクル管理もHVD固有の強みです。",
      content: (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {[["❄️","Snowflake ドメイン特化","Cortex Agent / Analyst / Semantic View / MCP / SPCS / dbt / Secure View。gh-awはSnowflakeを知らない","唯一無二","bg-blue-500"],["🏗️","アプリを作り切る","gh-awはワークフロー実行基盤のみ。HVDは設計→実装→検証→デプロイまで一気通貫","完結型","bg-indigo-500"],["📋","ADR 110件","「なぜこの設計か」をすべて記録。gh-awの200件に迫る知識資産","充実","bg-violet-500"],["🤖","CADRE 組織モデル","8体エージェントにDRI/Reviewer/拒否権を持つ組織設計。gh-awにはない責任構造","先進的","bg-teal-600"],["💼","実案件 8プロジェクト","ai-accelerator / egov-compliance等、実際の案件が蓄積されている","実績","bg-blue-600"],["📈","ビジネスサイクル統合","biz-cycleでKPI・テーマ・ポートフォリオを管理。ビジネス観点まで内包","独自","bg-emerald-600"]].map(([icon,title,desc,tag,tagColor])=>(
            <div key={title as string} className="bg-white/10 rounded-xl p-4 border border-white/15">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-sm">{title}</span>
                    <span className={`text-xs text-white px-2 py-0.5 rounded-full ${tagColor}`}>{tag}</span>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 5, title: "gh-aw から学べること", subtitle: "HVD に取り込むべき知見",
      bg: "from-emerald-900 to-green-900",
      script: "gh-awのどこを参考にすべきか。P1最優先は「多層セキュリティアーキテクチャ」です。safe-outputs・サンドボックス・ネットワーク隔離・SHA-pinned依存という設計はHVDのvalidate-secrets.shより遥かに成熟しています。P1のもう1点は「ADR 200件の管理手法」です。gh-awはIssue番号ベースのADRファイル名（例: 25821-...）を使い追跡性を高めています。P2は「Dogfooding文化」と「Markdownベースのワークフロー定義」。P3は将来的なGitHub Actions統合です。",
      content: (
        <div className="flex flex-col gap-3 mt-4">
          {[{priority:"P1",color:"bg-red-500",title:"多層セキュリティアーキテクチャ",ghaw:"safe-outputs・サンドボックス・NW隔離・SHA-pinned依存・入力サニタイズの5層",hvd:"validate-secrets.sh フック（1層のみ）",action:"safe-outputs 相当の書き込み制御と NW 隔離設計を .claude/hooks/ に追加"},
            {priority:"P1",color:"bg-red-500",title:"ADR 管理手法（Issue番号ベース）",ghaw:"200件。ファイル名に Issue番号を含める（例: 25821-rust-style-errors.md）",hvd:"110件。連番のみ（ADR-0001〜）",action:"Issue番号をADRファイル名に付与し、設計判断と Issue を双方向でリンクする"},
            {priority:"P2",color:"bg-yellow-500",title:"Dogfooding 文化の確立",ghaw:"gh-aw 自体を Copilot Coding Agent で開発。CONTRIBUTING.md に agentic plan 提出を必須化",hvd:"hvd を使って hvd 自体を開発しているか？",action:"hvd の機能追加・改善を hvd-dev-cycle で実施し、Dogfooding を README に明記する"},
            {priority:"P2",color:"bg-yellow-500",title:"Markdownベースのワークフロー定義",ghaw:"自然言語Markdownを GitHub Actions YAMLに自動コンパイル",hvd:"YAML+スキルの直接呼び出し",action:"hvd-dev-cycle のフロー定義を Markdown で書ける軽量DSLとして整備する"},
            {priority:"P3",color:"bg-green-600",title:"GitHub Actions との統合（将来）",ghaw:"273の GitHub Actions ワークフローを自動生成・管理",hvd:"GitHub Actions は15本のみ",action:"hvd-dev-cycle を gh-aw 経由で GitHub Actions から実行できる統合レイヤーを検討"},
          ].map((c)=>(
            <div key={c.title} className="bg-white/10 rounded-xl p-3 border border-white/10 flex gap-3">
              <div className={`${c.color} text-white text-xs font-bold px-2 py-1 rounded-lg h-fit mt-1 shrink-0`}>{c.priority}</div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm mb-1">{c.title}</div>
                <div className="text-xs mb-1"><span className="text-green-300">gh-aw: </span><span className="text-white/70">{c.ghaw}</span></div>
                <div className="text-xs mb-2"><span className="text-blue-300">HVD: </span><span className="text-white/70">{c.hvd}</span></div>
                <div className="bg-white/10 rounded px-2 py-1 text-xs text-white/80">→ {c.action}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 6, title: "HVD の改善提案", subtitle: "gh-aw 比較から見えた短期・中期・長期アクション",
      bg: "from-rose-900 to-pink-900",
      script: "gh-awとの比較から導いた改善提案です。短期は多層セキュリティHooksの追加とADRファイル命名規則の改善。中期はDogfooding文化の確立と、Markdown DSLによるワークフロー定義の軽量化。長期はgh-awとのGitHub Actions統合で、hvdのワークフローをCI上から呼び出せるようにする構想です。",
      content: (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[{term:"短期（1〜2週）",color:"border-red-400",headerColor:"text-red-300",items:["safe-outputs相当の書き込み制御Hookを追加","ADRファイル名にIssue番号を付与する規則を導入","gh-aw の developer スキルを参考に DEVGUIDE.md を整備","セキュリティチェックをNW隔離・SHA-pinnedまで拡充"]},
            {term:"中期（1〜2ヶ月）",color:"border-yellow-400",headerColor:"text-yellow-300",items:["hvd 自体の改善に hvd-dev-cycle を適用（Dogfooding）","hvd-dev-cycle の定義を Markdown DSL で書けるよう整備","CONTRIBUTING.md に agentic plan 提出フローを追加","ADR 200件を目指し、設計判断をより積極的に記録"]},
            {term:"長期（3ヶ月〜）",color:"border-green-400",headerColor:"text-green-300",items:["gh-aw 統合レイヤーを検討（hvd → GitHub Actions 実行）","Go または TypeScript でのコアロジックのバイナリ化","WASM 対応検討（ブラウザから hvd スキルを実行）","OSS化・コミュニティ化の可能性を評価"]},
          ].map((c)=>(
            <div key={c.term} className={`bg-white/10 rounded-xl p-4 border ${c.color}`}>
              <div className={`font-bold text-sm mb-3 ${c.headerColor}`}>{c.term}</div>
              <ul className="flex flex-col gap-2">
                {c.items.map((item,i)=>(
                  <li key={i} className="text-white/70 text-xs flex gap-2"><span className="text-white/40 shrink-0">•</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 7, title: "まとめ", subtitle: "2つのリポジトリは競合せず、補完し合える",
      bg: "from-slate-800 to-gray-900",
      script: "まとめです。HVDとgh-awは「アプリ層 vs インフラ層」という役割が異なります。HVDはSnowflake上にAIアプリを作り切る力、gh-awはGitHub Actions上でAIをセキュアに動かす基盤です。gh-awから最も学ぶべきは「多層セキュリティ設計」と「ADR 200件の管理手法」です。長期的にはgh-awの上でhvdのワークフローを実行する統合も考えられます。HVDはSnowflake案件の本番デリバリーにおいて唯一無二の価値を持っており、gh-awの知見でインフラ層を補強していくことが次の方向性です。",
      content: (
        <div className="flex flex-col gap-4 mt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-800/40 rounded-xl p-4 border border-blue-500/30">
              <div className="text-blue-300 font-bold mb-2">HVD が勝る点</div>
              <ul className="text-white/70 text-xs flex flex-col gap-1.5">
                {["Snowflake ドメイン特化の深さ","設計〜デプロイを一気通貫","ADR 110件の設計知識","CADRE 組織モデル","実案件 8件の実績","ビジネスサイクル管理"].map(t=><li key={t}>✅ {t}</li>)}
              </ul>
            </div>
            <div className="bg-green-800/40 rounded-xl p-4 border border-green-500/30">
              <div className="text-green-300 font-bold mb-2">gh-aw が勝る点</div>
              <ul className="text-white/70 text-xs flex flex-col gap-1.5">
                {["多層セキュリティ設計","ADR 200件（HVD超え）","マルチAIエンジン対応","Markdown→YAML コンパイル","Dogfooding 文化","WASM対応・バイナリ配布"].map(t=><li key={t}>✅ {t}</li>)}
              </ul>
            </div>
            <div className="bg-emerald-800/40 rounded-xl p-4 border border-emerald-500/30">
              <div className="text-emerald-300 font-bold mb-2">推奨アクション</div>
              <ul className="text-white/70 text-xs flex flex-col gap-1.5">
                {["safe-outputs相当のHookを追加","ADR命名にIssue番号を付与","Dogfooding を hvd 開発に適用","Markdown DSLの整備を検討","gh-aw統合の長期ロードマップ策定","セキュリティ多層化を最優先で実施"].map(t=><li key={t}>🎯 {t}</li>)}
              </ul>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
            <div className="text-white/40 text-xs mb-1">結論</div>
            <div className="text-white font-semibold text-sm">HVD（アプリ層）と gh-aw（インフラ層）は競合しない。gh-aw の「セキュリティ多層化」と「ADR管理手法」を取り込み、<br />将来は gh-aw 上で hvd ワークフローを実行する統合アーキテクチャを目指す。</div>
          </div>
        </div>
      ),
    },
  ];
}

// ─────────────────────────────────────────────
// HVD vs AI-DLC スライド
// ─────────────────────────────────────────────
function buildAidlcSlides(onOpenEvaluator: () => void, onOpenInception: () => void, onOpenDesignReview: () => void, onOpenRules: () => void, onOpenSecurity: () => void, onOpenIde: () => void): Slide[] {
  return [
    {
      id: 1, title: "AI-DLC 概要", subtitle: "AWS公式 AI駆動開発ライフサイクルフレームワーク",
      bg: "from-orange-900 to-amber-800",
      script: "AI-DLCはAWSが公式に提供するAI駆動開発ライフサイクルフレームワークです。Inception・Construction・Operationsの3フェーズで構成される適応型ワークフローで、Kiro・Amazon Q・Cursor・Cline・Claude Codeなど複数のIDEツールに対応しています。aidlc-evaluatorという11パッケージのuv workspaceで定量・定性評価を自動化し、aidlc-designreviewでBedrock AIによる設計レビューを実施します。MIT No Attributionライセンスで公開されています。",
      content: (
        <div className="flex flex-col gap-4 mt-4">
          <div className="bg-orange-700/40 rounded-xl p-4 border border-orange-400/30">
            <div className="text-orange-200 font-semibold mb-2">🎯 コアコンセプト</div>
            <div className="text-white text-sm">Inception → Construction → Operations の3フェーズ適応型ワークフローで、AI IDEツールとAWS Bedrockを統合した開発サイクルを標準化</div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {([["🏗️","3フェーズ適応型","Inception/Construction/Operations で段階管理 ▶ クリックで詳細", "inception"],["🤖","マルチIDE対応","Kiro・Amazon Q・Cursor・Cline・Claude Code ▶ クリックで詳細", "ide"],["📊","aidlc-evaluator","11パッケージ uv workspace による自動評価 ▶ クリックで詳細", "evaluator"],["🔍","aidlc-designreview","15設計パターン × Bedrock AIレビュー ▶ クリックで詳細", "designreview"],["🔐","セキュリティ統合","bandit/semgrep/grype/GitLeaks で自動スキャン ▶ クリックで詳細", "security"],["📋","30 Rules MD","拡張可能なオプションルール体系（baseline/testing等）▶ クリックで詳細", "rules"]] as [string,string,string,string|null][]).map(([icon,label,desc,action])=>(
              action ? (
                <button key={label} onClick={() => action === "evaluator" ? onOpenEvaluator() : action === "inception" ? onOpenInception() : action === "designreview" ? onOpenDesignReview() : action === "rules" ? onOpenRules() : action === "security" ? onOpenSecurity() : onOpenIde()} className="bg-white/10 rounded-xl p-3 border border-orange-400/50 hover:border-orange-300 hover:bg-orange-500/20 transition-all text-left group">
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-white font-medium text-xs group-hover:text-orange-200 transition-colors">{label}</div>
                  <div className="text-white/60 text-xs mt-1">{desc}</div>
                </button>
              ) : (
                <div key={label} className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <div className="text-xl mb-1">{icon}</div>
                  <div className="text-white font-medium text-xs">{label}</div>
                  <div className="text-white/60 text-xs mt-1">{desc}</div>
                </div>
              )
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 2, title: "設計思想の違い", subtitle: "何のために作られたか",
      bg: "from-teal-900 to-cyan-900",
      script: "両者の設計思想は対照的です。HVDはSnowflakeという単一クラウドに深く刺さる縦型統合を目指しています。design.yaml SSOT・CADRE組織モデル・6RTWパイプラインという独自の方法論体系が特徴です。一方AI-DLCはAWS Bedrockを基盤としながら、複数のIDEツールで同じワークフローを実行できる水平展開を目指しています。どちらもAI駆動開発を標準化しようとしていますが、アプローチが根本的に異なります。",
      content: (
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="flex flex-col gap-3">
            <div className="text-blue-300 font-bold text-lg">HVD の哲学</div>
            {[["🎯","深さ優先","Snowflake × AI 特化。ドメイン知識を121スキルに凝縮"],["🏢","組織モデル","8体CxO相当エージェントが責任分担。人間チームをAIで再現"],["📄","SSOT中心","design.yaml が唯一の真実。すべての工程が1ファイルから派生"],["🔒","ADR蓄積","110件の設計判断を完全記録。意思決定の理由を永続化"],["⚡","速さ最優先","FDEが顧客現場で当日中に本番デプロイ可能な水準を目指す"]].map(([icon,title,desc])=>(
              <div key={title as string} className="bg-blue-800/40 rounded-lg p-3 border border-blue-500/30 flex gap-3">
                <span className="text-xl">{icon}</span>
                <div><div className="text-white font-medium text-sm">{title}</div><div className="text-white/60 text-xs">{desc}</div></div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-orange-300 font-bold text-lg">AI-DLC の哲学</div>
            {[["🌐","広さ優先","複数IDE対応。Kiro/Q/Cursor/Cline/Claude Codeで同一フロー"],["📊","評価駆動","11パッケージで定量・定性・契約・非機能・トレンドを網羅的に計測"],["🔍","設計レビュー統合","15パターン × Bedrock AIレビューで設計品質を客観評価"],["🔐","セキュリティファースト","bandit/semgrep/grype/GitLeaks をCI標準装備"],["☁️","AWS統合","CodeBuild・Bedrock・SBOM・脆弱性スキャンがパイプラインに内蔵"]].map(([icon,title,desc])=>(
              <div key={title as string} className="bg-orange-800/40 rounded-lg p-3 border border-orange-500/30 flex gap-3">
                <span className="text-xl">{icon}</span>
                <div><div className="text-white font-medium text-sm">{title}</div><div className="text-white/60 text-xs">{desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 3, title: "HVD の独自価値", subtitle: "AI-DLCにはない強み",
      bg: "from-blue-900 to-indigo-900",
      script: "HVDがAI-DLCに対して持つ独自価値を整理します。最大の強みはSnowflakeドメイン知識の深さです。Cortex Agent・Analyst・SPCS・dbtまで一気通貫でカバーします。次にADR 110件による設計判断の蓄積、CADRE組織モデルによる構造化されたエージェント設計、hvd-verify 28項目の整合性検証があります。AI-DLCはマルチIDEで広く使えますが、特定クラウドへの深い統合とビジネスサイクル管理はHVDの強みです。",
      content: (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {[["❄️","Snowflake ディープ統合","Cortex Agent/Analyst/Semantic View/MCP/SPCS/dbt/Secure Viewまで一気通貫","唯一無二","bg-blue-500"],["📜","ADR 110件の設計知識","設計判断をADR-0001〜0128まで完全記録。なぜこの設計かを時系列で追跡可能","圧倒的","bg-indigo-500"],["🏢","CADRE 組織モデル","8体エージェントに役割・DRI・Reviewerを明示。AI間の意思決定プロセスを構造化","先進的","bg-violet-500"],["✅","hvd-verify 28項目","R1–R28の自動整合性検証。design.yamlと実装の乖離をCI段階で検出する仕組み","自動化","bg-teal-600"],["💼","ビジネスサイクル管理","hvd-biz-cycle でテーマポートフォリオを月次/四半期で管理。biz/02-themes/ SSOT","実務対応","bg-blue-600"],["💰","固定費最小化の設計","ADR-0014で自動ジョブ・常時起動Warehouse禁止。コスト管理がコードとして明文化","ガバナンス","bg-emerald-600"]].map(([icon,title,desc,tag,tagColor])=>(
            <div key={title as string} className="bg-white/10 rounded-xl p-4 border border-white/15">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-sm">{title}</span>
                    <span className={`text-xs text-white px-2 py-0.5 rounded-full ${tagColor}`}>{tag}</span>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 4, title: "AI-DLC から学べること", subtitle: "HVD に取り込むべき知見",
      bg: "from-amber-900 to-orange-900",
      script: "AI-DLCのどこを参考にすべきか、優先度別に見ていきます。P1最優先は「評価フレームワークの体系化」です。AI-DLCのaidlc-evaluatorは定量・定性・契約・非機能・トレンドを11パッケージで網羅しており、HVDのhvd-verifyより計測の深さが違います。もう1つのP1は「セキュリティスキャンのCI統合」です。P2は設計レビューの客観化と、IDE非依存なワークフロー定義です。",
      content: (
        <div className="flex flex-col gap-3 mt-4">
          {[{priority:"P1",color:"bg-red-500",title:"評価フレームワークの体系化",aidlc:"aidlc-evaluator：定量/定性/契約/非機能/トレンド/報告 11パッケージ",hvd:"hvd-verify R1–R28（整合性検証）/ tests/（手動）",action:"hvd-verify に定量評価モジュール（パフォーマンス計測・トレンド追跡）を追加する"},
            {priority:"P1",color:"bg-red-500",title:"セキュリティスキャンのCI統合",aidlc:"bandit/semgrep/grype/GitLeaks が security-scanners.yml でCI標準実行",hvd:"validate-secrets.sh フック（コミット時のみ・限定的）",action:"GitHub Actions に bandit/semgrep/grype を追加し、PRごとに自動セキュリティスキャンを実施"},
            {priority:"P2",color:"bg-yellow-500",title:"設計レビューの客観化",aidlc:"aidlc-designreview：15パターン × Bedrock AIが設計文書を評価",hvd:"hvd-verify（自動整合性チェック）/人間レビュー",action:"design.yaml の内容を Bedrock/Claude APIで自動評価するスキルを追加し、設計品質スコアを可視化"},
            {priority:"P2",color:"bg-yellow-500",title:"トレーサビリティ管理",aidlc:"aidlc-traceability：要件→実装→テストのトレーサビリティを自動管理",hvd:"design.yaml spec_refs・progress.yaml（手動連携）",action:"spec_refs と実装ファイルの自動双方向トレーサビリティツールを scripts/ に追加"},
            {priority:"P3",color:"bg-green-600",title:"マルチIDE対応（将来）",aidlc:"Kiro・Amazon Q・Cursor・Cline・Claude Code で同一ワークフロー実行",hvd:"Claude Code専用",action:"将来 Cursor/Kiro 対応時に AI-DLC のadaptive workflow パターンを参考にする"},
          ].map((c)=>(
            <div key={c.title} className="bg-white/10 rounded-xl p-3 border border-white/10 flex gap-3">
              <div className={`${c.color} text-white text-xs font-bold px-2 py-1 rounded-lg h-fit mt-1 shrink-0`}>{c.priority}</div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm mb-1">{c.title}</div>
                <div className="text-xs mb-1"><span className="text-orange-300">AI-DLC: </span><span className="text-white/70">{c.aidlc}</span></div>
                <div className="text-xs mb-2"><span className="text-blue-300">HVD: </span><span className="text-white/70">{c.hvd}</span></div>
                <div className="bg-white/10 rounded px-2 py-1 text-xs text-white/80">→ {c.action}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 5, title: "HVD の改善提案", subtitle: "AI-DLC 比較から見えた短期・中期・長期アクション",
      bg: "from-rose-900 to-pink-900",
      script: "AI-DLCとの比較から導いた改善提案です。短期はセキュリティスキャンのCI統合と、评価フレームワークの基盤追加。中期は設計レビューの客観化とトレーサビリティ自動化。長期はマルチIDE対応の検討です。",
      content: (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {[{term:"短期（1〜2週）",color:"border-red-400",headerColor:"text-red-300",items:["GitHub Actions に bandit/semgrep を追加（セキュリティCI）","grype でコンテナ脆弱性スキャンを自動化","GitLeaks をpre-commitフックに追加","hvd-verify に計測スコア出力を追加"]},
            {term:"中期（1〜2ヶ月）",color:"border-yellow-400",headerColor:"text-yellow-300",items:["aidlc-evaluatorを参考に定量評価モジュールを追加","design.yamlの設計品質を AIで自動評価するスキル作成","spec_refs の双方向トレーサビリティを自動検証","aidlc-designreview の15パターンを hvd-verify に取り込む"]},
            {term:"長期（3ヶ月〜）",color:"border-green-400",headerColor:"text-green-300",items:["Cursor/Kiro 対応を検討（AI-DLC adaptive workflow参考）","aidlc-traceability相当の自動化を scripts/ に整備","AWS Bedrock との連携スキルを追加（クラウド横断）","uv workspace 化で Python評価ツールを整備"]},
          ].map((c)=>(
            <div key={c.term} className={`bg-white/10 rounded-xl p-4 border ${c.color}`}>
              <div className={`font-bold text-sm mb-3 ${c.headerColor}`}>{c.term}</div>
              <ul className="flex flex-col gap-2">
                {c.items.map((item,i)=>(
                  <li key={i} className="text-white/70 text-xs flex gap-2"><span className="text-white/40 shrink-0">•</span><span>{item}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 6, title: "まとめ", subtitle: "HVD と AI-DLC は競合しない — 異なるクラウドの補完関係",
      bg: "from-slate-800 to-gray-900",
      script: "まとめです。HVDとAI-DLCは「Snowflake特化の垂直統合」vs「AWS Bedrock×マルチIDEの水平展開」という位置づけで競合しません。AI-DLCから最も学ぶべきは「評価フレームワークの体系化」と「セキュリティスキャンのCI統合」です。HVDの強みであるADR蓄積・CADRE組織モデル・Snowflakeドメイン知識はAI-DLCにはない独自価値です。AI-DLCの設計レビューとトレーサビリティの仕組みをHVDに取り込むことで、さらに高品質な開発サイクルが実現できます。",
      content: (
        <div className="flex flex-col gap-4 mt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-800/40 rounded-xl p-4 border border-blue-500/30">
              <div className="text-blue-300 font-bold mb-2">HVD が勝る点</div>
              <ul className="text-white/70 text-xs flex flex-col gap-1.5">
                {["Snowflake ドメイン特化の深さ","ADR 110件の設計知識蓄積","CADRE 8体組織モデル","設計〜デプロイを一気通貫","hvd-verify 28項目の整合性検証","ビジネスサイクル（biz-cycle）管理"].map(t=><li key={t}>✅ {t}</li>)}
              </ul>
            </div>
            <div className="bg-orange-800/40 rounded-xl p-4 border border-orange-500/30">
              <div className="text-orange-300 font-bold mb-2">AI-DLC が勝る点</div>
              <ul className="text-white/70 text-xs flex flex-col gap-1.5">
                {["評価フレームワーク 11パッケージ","セキュリティCI（bandit/semgrep/grype）","5+ IDE マルチ対応","Bedrock AIによる設計レビュー","トレーサビリティ自動管理","AWS公式 OSS（MIT No Attribution）"].map(t=><li key={t}>✅ {t}</li>)}
              </ul>
            </div>
            <div className="bg-emerald-800/40 rounded-xl p-4 border border-emerald-500/30">
              <div className="text-emerald-300 font-bold mb-2">推奨アクション</div>
              <ul className="text-white/70 text-xs flex flex-col gap-1.5">
                {["bandit/semgrep をCI に追加（最優先）","定量評価モジュールを hvd-verify に追加","設計品質の AI自動評価スキル作成","トレーサビリティ検証の自動化","aidlc-designreview の15パターン参照","長期でマルチIDE対応を検討"].map(t=><li key={t}>🎯 {t}</li>)}
              </ul>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
            <div className="text-white/40 text-xs mb-1">結論</div>
            <div className="text-white font-semibold text-sm">HVD（Snowflake特化）と AI-DLC（AWS Bedrock×マルチIDE）は競合しない。<br />AI-DLC の「評価体系化」と「セキュリティCI」を取り込み、HVDの品質保証をさらに高度化する。</div>
          </div>
        </div>
      ),
    },
  ];
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function ComparisonSlide() {
  const [comparisonKey, setComparisonKey] = useState<ComparisonKey>("hvd-ecc");
  const [current, setCurrent] = useState(0);
  const [showScript, setShowScript] = useState(false);
  const [showAgentShieldModal, setShowAgentShieldModal] = useState(false);
  const [showRules115Modal, setShowRules115Modal] = useState(false);
  const [showEvaluatorModal, setShowEvaluatorModal] = useState(false);
  const [showInceptionModal, setShowInceptionModal] = useState(false);
  const [showDesignReviewModal, setShowDesignReviewModal] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showIdeModal, setShowIdeModal] = useState(false);

  const allSlides: Record<ComparisonKey, Slide[]> = {
    "hvd-ecc": buildEccSlides(() => setShowAgentShieldModal(true), () => setShowRules115Modal(true)),
    "hvd-ghaw": buildGhawSlides(),
    "hvd-aidlc": buildAidlcSlides(() => setShowEvaluatorModal(true), () => setShowInceptionModal(true), () => setShowDesignReviewModal(true), () => setShowRulesModal(true), () => setShowSecurityModal(true), () => setShowIdeModal(true)),
  };

  const slides = allSlides[comparisonKey];
  const slide = slides[current];

  const switchComparison = (key: ComparisonKey) => {
    setComparisonKey(key);
    setCurrent(0);
    setShowScript(false);
  };

  const COMPARISONS: { key: ComparisonKey; label: string; left: string; right: string; leftColor: string; rightColor: string }[] = [
    { key: "hvd-ecc", label: "HVD vs ECC", left: "hvd", right: "ECC", leftColor: "text-blue-400", rightColor: "text-orange-400" },
    { key: "hvd-ghaw", label: "HVD vs gh-aw", left: "hvd", right: "gh-aw", leftColor: "text-blue-400", rightColor: "text-green-400" },
    { key: "hvd-aidlc", label: "HVD vs AI-DLC", left: "hvd", right: "AI-DLC", leftColor: "text-blue-400", rightColor: "text-purple-400" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* AgentShield 詳細モーダル */}
      {showAgentShieldModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowAgentShieldModal(false)}
        >
          <div
            className="relative max-w-5xl w-full mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
              <div>
                <div className="font-bold text-gray-800 text-sm">AgentShield：ECC セキュリティパッケージ・脅威検出</div>
                <div className="text-gray-500 text-xs">12点セキュリティポリシー × CVE 自動追跡</div>
              </div>
              <button
                onClick={() => setShowAgentShieldModal(false)}
                className="text-gray-400 hover:text-gray-700 text-xl font-bold leading-none px-2"
                aria-label="閉じる"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[80vh]">
              <Image
                src="/images/agent.png"
                alt="AgentShield ECC セキュリティパッケージ"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* 115 Rules 詳細モーダル */}
      {showRules115Modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowRules115Modal(false)}
        >
          <div
            className="relative max-w-5xl w-full mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
              <div>
                <div className="font-bold text-gray-800 text-sm">115 Rules：12言語エコシステム別ルール</div>
                <div className="text-gray-500 text-xs">ECC 言語別ルール体系一覧</div>
              </div>
              <button
                onClick={() => setShowRules115Modal(false)}
                className="text-gray-400 hover:text-gray-700 text-xl font-bold leading-none px-2"
                aria-label="閉じる"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[80vh]">
              <Image
                src="/images/115.png"
                alt="ECC 115 Rules 12言語エコシステム別ルール"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* 3フェーズ適応型 詳細モーダル */}
      {showInceptionModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowInceptionModal(false)}
        >
          <div
            className="relative max-w-5xl w-full mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
              <div>
                <div className="font-bold text-gray-800 text-sm">3フェーズ適応型ワークフロー</div>
                <div className="text-gray-500 text-xs">Inception → Construction → Operations</div>
              </div>
              <button
                onClick={() => setShowInceptionModal(false)}
                className="text-gray-400 hover:text-gray-700 text-xl font-bold leading-none px-2"
                aria-label="閉じる"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[80vh]">
              <Image
                src="/images/inception.png"
                alt="AI-DLC 3フェーズ適応型ワークフロー（Inception/Construction/Operations）"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* aidlc-evaluator 詳細モーダル */}
      {showEvaluatorModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowEvaluatorModal(false)}
        >
          <div
            className="relative max-w-5xl w-full mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
              <div>
                <div className="font-bold text-gray-800 text-sm">aidlc-evaluator：11パッケージを uv workspace で管理し、自動評価を実行</div>
                <div className="text-gray-500 text-xs">AI-DLC Workflows における自動評価の全体像</div>
              </div>
              <button
                onClick={() => setShowEvaluatorModal(false)}
                className="text-gray-400 hover:text-gray-700 text-xl font-bold leading-none px-2"
                aria-label="閉じる"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[80vh]">
              <Image
                src="/images/aidlc.png"
                alt="aidlc-evaluator 11パッケージ構成と自動評価パイプライン"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* aidlc-designreview 詳細モーダル */}
      {showDesignReviewModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowDesignReviewModal(false)}
        >
          <div
            className="relative max-w-5xl w-full mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
              <div>
                <div className="font-bold text-gray-800 text-sm">aidlc-designreview：15設計パターン × Bedrock AIレビュー</div>
                <div className="text-gray-500 text-xs">AI-DLC 設計レビューパターン一覧</div>
              </div>
              <button
                onClick={() => setShowDesignReviewModal(false)}
                className="text-gray-400 hover:text-gray-700 text-xl font-bold leading-none px-2"
                aria-label="閉じる"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[80vh]">
              <Image
                src="/images/design.png"
                alt="aidlc-designreview 15設計パターン"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* 30 Rules MD 詳細モーダル */}
      {showRulesModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowRulesModal(false)}
        >
          <div
            className="relative max-w-5xl w-full mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
              <div>
                <div className="font-bold text-gray-800 text-sm">30 Rules MD：拡張可能なオプションルール体系</div>
                <div className="text-gray-500 text-xs">baseline / testing / security 等のカテゴリ別ルール一覧</div>
              </div>
              <button
                onClick={() => setShowRulesModal(false)}
                className="text-gray-400 hover:text-gray-700 text-xl font-bold leading-none px-2"
                aria-label="閉じる"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[80vh]">
              <Image
                src="/images/rules.png"
                alt="AI-DLC 30 Rules MD オプションルール体系"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      )}
      {/* セキュリティ統合 詳細モーダル */}
      {showSecurityModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowSecurityModal(false)}
        >
          <div
            className="relative max-w-5xl w-full mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
              <div>
                <div className="font-bold text-gray-800 text-sm">セキュリティ統合：bandit / semgrep / grype / GitLeaks</div>
                <div className="text-gray-500 text-xs">AI-DLC 自動セキュリティスキャン構成</div>
              </div>
              <button
                onClick={() => setShowSecurityModal(false)}
                className="text-gray-400 hover:text-gray-700 text-xl font-bold leading-none px-2"
                aria-label="閉じる"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[80vh]">
              <Image
                src="/images/bandit.png"
                alt="AI-DLC セキュリティ統合 bandit/semgrep/grype/GitLeaks"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      )}
      {/* マルチIDE対応 詳細モーダル */}
      {showIdeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowIdeModal(false)}
        >
          <div
            className="relative max-w-5xl w-full mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
              <div>
                <div className="font-bold text-gray-800 text-sm">マルチIDE対応：Kiro・Amazon Q・Cursor・Cline・Claude Code</div>
                <div className="text-gray-500 text-xs">AI-DLC 対応 IDE・ツール一覧</div>
              </div>
              <button
                onClick={() => setShowIdeModal(false)}
                className="text-gray-400 hover:text-gray-700 text-xl font-bold leading-none px-2"
                aria-label="閉じる"
              >
                ×
              </button>
            </div>
            <div className="p-4 overflow-auto max-h-[80vh]">
              <Image
                src="/images/ide.png"
                alt="AI-DLC マルチIDE対応"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      )}
      {/* 比較切り替えタブ */}
      <div className="flex gap-3 items-center">
        <span className="text-gray-500 text-xs font-medium">比較対象：</span>
        <div className="flex gap-2">
          {COMPARISONS.map((c) => (
            <button
              key={c.key}
              onClick={() => switchComparison(c.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                comparisonKey === c.key
                  ? "bg-gray-800 text-white border-gray-600 shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span className={c.leftColor}>{c.left}</span>
              <span className="text-gray-400 mx-1">vs</span>
              <span className={c.rightColor}>{c.right}</span>
            </button>
          ))}
        </div>
      </div>

      {/* メインスライド */}
      <div className={`bg-gradient-to-br ${slide.bg} rounded-2xl p-8 min-h-[560px] flex flex-col`}>
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="text-white/40 text-xs font-mono mb-1">{String(slide.id).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}</div>
            <h2 className="text-2xl font-bold text-white">{slide.title}</h2>
            {slide.subtitle && <p className="text-white/50 text-sm mt-1">{slide.subtitle}</p>}
          </div>
          <button
            onClick={() => setShowScript(!showScript)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${showScript ? "bg-white/20 text-white" : "bg-white/10 text-white/60 hover:bg-white/15"}`}
          >
            🎤 台本
          </button>
        </div>

        {showScript && (
          <div className="bg-black/30 border border-white/20 rounded-xl px-4 py-3 mb-3 text-white/80 text-sm leading-relaxed">
            <div className="text-white/40 text-xs mb-1">話す台本</div>
            {slide.script}
          </div>
        )}

        <div className="flex-1 overflow-auto">{slide.content}</div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
          <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0} className="px-4 py-2 bg-white/10 text-white text-sm rounded-lg disabled:opacity-30 hover:bg-white/20 transition-colors">← 前へ</button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/30"}`} />
            ))}
          </div>
          <button onClick={() => setCurrent((c) => Math.min(slides.length - 1, c + 1))} disabled={current === slides.length - 1} className="px-4 py-2 bg-white/10 text-white text-sm rounded-lg disabled:opacity-30 hover:bg-white/20 transition-colors">次へ →</button>
        </div>
      </div>

      {/* スライド一覧サムネイル */}
      <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${slides.length}, minmax(0, 1fr))` }}>
        {slides.map((s, i) => (
          <button key={s.id} onClick={() => setCurrent(i)} className={`bg-gradient-to-br ${s.bg} rounded-lg p-2 text-center transition-all border-2 ${i === current ? "border-white scale-105 shadow-lg" : "border-transparent opacity-60 hover:opacity-80"}`}>
            <div className="text-white/50 text-xs font-mono">{String(s.id).padStart(2,"0")}</div>
            <div className="text-white text-xs font-medium leading-tight mt-0.5 line-clamp-2">{s.title}</div>
          </button>
        ))}
      </div>

      {/* 専門用語解説 */}
      <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50">
        <h3 className="text-sm font-bold text-gray-700 mb-4">専門用語解説</h3>
        <div className="grid grid-cols-2 gap-3">
          {GLOSSARY.map((g) => (
            <div key={g.term} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-gray-800 text-sm">{g.term}</span>
                <span className="text-gray-400 text-xs">{g.en}</span>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
