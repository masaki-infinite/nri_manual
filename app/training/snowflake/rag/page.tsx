"use client";

import Link from "next/link";
import { useState } from "react";
import SnowflakeSubNav from "../SnowflakeSubNav";

type PatternRow = {
  pattern: string;
  architecture: string;
  strengths: string;
  cautions: string;
  fit: string;
  cortexSearch: boolean;
  details: string;
};

type BuildStep = {
  step: string;
  activity: string;
  output: string;
};

const patternRows: PatternRow[] = [
  {
    pattern: "A. Cortex Search中心（最短構築）",
    architecture:
      "Snowflake内データ -> チャンク化/埋め込み -> Cortex Search インデックス -> LLM応答",
    strengths:
      "構築が速い。Snowflake内でデータ・権限・監査を一体運用しやすい。PoCに向く。",
    cautions:
      "高度な再ランキングや独自検索ロジックは後段の拡張が必要。",
    fit: "まず業務適合性を確認したい案件",
    cortexSearch: true,
    details:
      "Cortex Search はSnowflake のマネージドサービスで、チャンキング・埋め込み・インデックス・検索を統合提供。SQL で構成を定義すれば、複雑な実装なしに RAG が構築できます。Cortex AI（LLM）と組み合わせてエンドツーエンドのソリューションが実現します。本ページの「Cortex Search でのデータ格納と自動処理」セクションを参照。",
  },
  {
    pattern: "B. SPCSで自前RAG（高自由度）",
    architecture:
      "Snowflake + SPCS(FastAPI/推論サーバ) + 独自Retriever/再ランキング + 応答API",
    strengths:
      "モデル選択、検索戦略、プロンプト制御、API設計の自由度が高い。",
    cautions:
      "運用設計（監視・コスト・モデル更新）をしっかり作る必要がある。",
    fit: "要件が複雑で独自実装が必要な案件",
    cortexSearch: false,
    details:
      "Cortex Search に依存せず、SPCS 上で FastAPI / Python を使ってカスタム RAG を実装。チャンキング・埋め込み・検索・リランキング・生成を完全にコントロール可能。複雑な業務ロジックやマルチステップエージェント、既存システムとの統合が必要な場合に有効。本ページの「Cortex Search を使わない場合の自前 RAG 構築（SPCS）」セクションを参照。",
  },
  {
    pattern: "C. ハイブリッド（段階拡張）",
    architecture:
      "初期は Cortex Search、要件が増えた部分のみ SPCS マイクロサービスで補完",
    strengths:
      "初期スピードと将来拡張のバランスが良い。リスクを分割できる。",
    cautions:
      "責務分離（どこまで標準機能でどこから自前か）を明確にする必要がある。",
    fit: "本番展開を見据えた中長期案件",
    cortexSearch: true,
    details:
      "Cortex Search で基本的な RAG 機能を実装し、業務効果を検証。要件が増えたら、差別化が必要な部分だけ SPCS で拡張実装。例えば、基本検索は Cortex Search、独自のリランキングや複雑な生成ロジックは SPCS マイクロサービスで対応。初期速度と将来の自由度を両立できる、実務的で最も失敗しにくいアプローチです。",
  },
  {
    pattern: "D. 外部検索基盤連携（既存資産活用）",
    architecture:
      "既存ベクトルDB/検索基盤を活かし、Snowflakeをデータ統制・分析の中核として併用",
    strengths:
      "既存投資を活かせる。移行期間の業務影響を抑えやすい。",
    cautions:
      "権限/監査/同期の責任境界を明確にしないと運用が複雑化しやすい。",
    fit: "既存RAG基盤がある大規模組織",
    cortexSearch: false,
    details:
      "既存のベクトルDB（例：Pinecone、Weaviate）や検索基盤（Elasticsearch 等）を活用しながら、Snowflake をデータ統制・分析の中核に据える。既存投資を活かしつつ、Snowflake との権限・監査を統合。ただし、複数基盤の同期・整合性管理は運用負荷が大きいため、責任境界を事前に明確にすることが重要です。",
  },
];

const buildSteps: BuildStep[] = [
  {
    step: "1. ユースケース定義",
    activity: "業務質問の種類、期待精度、回答SLA、禁止回答ルールを定義",
    output: "要件一覧、評価観点、成功基準",
  },
  {
    step: "2. データ準備",
    activity: "文書収集、チャンク設計、メタデータ設計、アクセス権マッピング",
    output: "インデックス対象データと権限モデル",
  },
  {
    step: "3. 検索設計",
    activity: "埋め込み方式、検索条件、フィルタ、再ランキング方針を決定",
    output: "検索フロー設計書",
  },
  {
    step: "4. 生成設計",
    activity: "プロンプトテンプレート、引用表示、ガードレール、応答フォーマットを設計",
    output: "回答仕様・安全設計",
  },
  {
    step: "5. 評価と改善",
    activity: "正答率・再現率・根拠率・応答時間・コストを計測し改善サイクル運用",
    output: "評価レポートと改善バックログ",
  },
  {
    step: "6. 本番運用",
    activity: "監査ログ、アラート、モデル更新手順、問い合わせフローを整備",
    output: "運用Runbook、SLA、障害対応手順",
  },
];

export default function SnowflakeRagTrainingPage() {
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null);

  const getPatternDiagram = (pattern: string) => {
    if (pattern.startsWith("A.")) {
      return {
        title: "Aの構成図",
        steps: ["ユーザー", "アプリ", "Cortex Search", "Snowflakeデータ", "LLM応答"],
        colorClass: "bg-blue-100 border-blue-300",
        note: "最短でPoCを作る標準構成。検索責務はCortex Searchに集約。",
      };
    }
    if (pattern.startsWith("B.")) {
      return {
        title: "Bの構成図",
        steps: ["ユーザー", "アプリ", "SPCS API", "Cortex Search", "Snowflakeデータ"],
        colorClass: "bg-emerald-100 border-emerald-300",
        note: "検索はCortex Search、独自ロジックはSPCSで拡張するハイブリッド構成。",
      };
    }
    if (pattern.startsWith("C.")) {
      return {
        title: "Cの構成図",
        steps: ["ユーザー", "アプリ", "SPCS API", "独自検索/再ランク", "LLM"],
        colorClass: "bg-amber-100 border-amber-300",
        note: "Cortex依存は下がるが、SPCSがSnowflake上のためSnowflake依存は残る。",
      };
    }

    return {
      title: "Dの構成図",
      steps: ["ユーザー", "アプリ", "外部検索基盤", "外部LLM", "Snowflake（同期）"],
      colorClass: "bg-violet-100 border-violet-300",
      note: "検索・推論の外部化でSnowflake依存を最小化しやすい構成。",
    };
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">SnowflakeでRAGを構築する方法</h2>
      <SnowflakeSubNav />
      <p className="text-gray-700 leading-7 mb-8">
        SnowflakeでRAGを作る方法は1つではありません。要件（スピード、自由度、既存資産、統制）に応じて、
        構成を選ぶのが成功のポイントです。本ページでは、実務で使いやすい代表パターンを比較して整理します。
      </p>

      <div className="space-y-8">
        <section className="bg-gradient-to-br from-indigo-50 to-sky-50 border border-indigo-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-slate-900 mb-3">最初に押さえる方針</h3>
          <ul className="space-y-2 text-slate-700 leading-7">
            <li>・短期間で価値検証するなら「Cortex Search中心」</li>
            <li>・複雑な業務ロジックや独自UIが必要なら「SPCS自前RAG」</li>
            <li>・迷ったら「ハイブリッド」で段階拡張（最も失敗しにくい）</li>
            <li>・既存資産が強い場合は「外部検索基盤連携」も有力</li>
          </ul>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">RAG構成パターン比較</h3>
          <p className="text-sm text-slate-600 mb-4">
            Cortex Search と SPCS は二者択一ではなく併用可能です。各パターンを開くと「説明文の直後」に対応する構成図を確認できます。
          </p>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="font-semibold text-slate-900 mb-2">Snowflake依存の目安（強い → 弱い）</h4>
            <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
              <li>Cortex Search中心</li>
              <li>SPCS + Cortex Search（ハイブリッド）</li>
              <li>SPCSのみRAG（Cortex依存は低いが Snowflake 依存は高い）</li>
              <li>外部検索基盤連携（Snowflake依存が最小）</li>
            </ol>
          </div>

          <p className="text-sm text-slate-600 mb-4">各パターンをクリックすると詳細解説が展開されます</p>
          <div className="space-y-3">
            {patternRows.map((row) => (
              <div key={row.pattern}>
                <button
                  onClick={() =>
                    setExpandedPattern(
                      expandedPattern === row.pattern ? null : row.pattern
                    )
                  }
                  className="w-full text-left bg-slate-50 border border-slate-200 rounded-lg p-4 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-slate-900">{row.pattern}</h4>
                        <span
                          className={`text-xs font-bold rounded-full px-2.5 py-1 ${
                            row.cortexSearch
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {row.cortexSearch ? "Cortex Search 利用" : "カスタム実装"}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{row.architecture}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="font-semibold text-slate-700">強み：</span>
                          <span className="text-slate-600 ml-1">{row.strengths}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-700">注意：</span>
                          <span className="text-slate-600 ml-1">{row.cautions}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-700">向き：</span>
                          <span className="text-slate-600 ml-1">{row.fit}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xl text-slate-400 flex-shrink-0">
                      {expandedPattern === row.pattern ? "▼" : "▶"}
                    </div>
                  </div>
                </button>

                {expandedPattern === row.pattern && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-b-lg text-sm text-slate-700 leading-6">
                    {row.details}
                    <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
                      <h5 className="font-semibold text-slate-900 mb-2">{getPatternDiagram(row.pattern).title}</h5>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700 mb-2">
                        {getPatternDiagram(row.pattern).steps.map((step, index) => (
                          <div key={`${row.pattern}-${step}-${index}`} className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 rounded border ${
                                index === 2 ? getPatternDiagram(row.pattern).colorClass : "bg-white border-slate-300"
                              }`}
                            >
                              {step}
                            </span>
                            {index < getPatternDiagram(row.pattern).steps.length - 1 && <span>→</span>}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-slate-600">{getPatternDiagram(row.pattern).note}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">実装ステップ（共通）</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">ステップ</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">作業内容</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-800">成果物</th>
                </tr>
              </thead>
              <tbody>
                {buildSteps.map((row) => (
                  <tr key={row.step} className="border-t border-gray-200 align-top">
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">{row.step}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.activity}</td>
                    <td className="px-4 py-3 text-slate-700 leading-6">{row.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">Cortex Search を使わない場合の自前 RAG 構築（SPCS）</h3>
          <p className="text-slate-700 leading-7 mb-6">
            Cortex Search に依存せず、Snowflake のデータを活用しながら SPCS（Snowpark Container Services）上でカスタム RAG を実装する方法。より細かい制御が可能で、独自の検索・生成ロジックを組み込める。
          </p>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <h4 className="font-bold text-slate-900 text-base mb-2">📦 アーキテクチャの概要</h4>
              <div className="text-slate-700 text-sm space-y-2 leading-6">
                <div>① <span className="font-semibold">ナレッジベース準備</span>：Snowflake テーブルに文書情報を格納</div>
                <div>② <span className="font-semibold">チャンキング・埋め込み</span>：SPCS の Python / Java で実装。外部 Embedding API（OpenAI、Mistral 等）または Snowflake Cortex Embeddings を呼び出し</div>
                <div>③ <span className="font-semibold">ベクトルストレージ</span>：チャンクのベクトルを Snowflake テーブルや pgvector 互換の Postgres に保存</div>
                <div>④ <span className="font-semibold">検索レイヤー</span>：SPCS 内 FastAPI / Flask で、ユーザークエリ → 埋め込み → 類似度検索 → リランキングを実装</div>
                <div>⑤ <span className="font-semibold">生成レイヤー</span>：検索結果 + プロンプト → 外部 LLM API または Cortex AI を呼び出して応答生成</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <h4 className="font-bold text-slate-900 text-base mb-2">🛠️ 実装例（Python Stack）</h4>
              <div className="bg-slate-50 p-3 rounded text-xs text-slate-800 font-mono space-y-1 leading-5 overflow-x-auto">
                <div>1. チャンキング・埋め込み（バッチ処理）</div>
                <div className="ml-4">• SnowflakePython UDF でテキストをチャンク化</div>
                <div className="ml-4">• OpenAI Embeddings API 呼び出し → ベクトル取得</div>
                <div className="ml-4">• 結果を Snowflake テーブルに挿入</div>
                <div>2. 検索 API（SPCS 内 FastAPI）</div>
                <div className="ml-4">• ユーザークエリを受け取り → 埋め込み計算</div>
                <div className="ml-4">• Snowflake SQL で類似度検索（cosine similarity）</div>
                <div className="ml-4">• 上位候補を取得 → cross-encoder でリランキング</div>
                <div>3. 生成 API（同 FastAPI）</div>
                <div className="ml-4">• 検索結果 + ユーザークエリを RAG プロンプトに組成</div>
                <div className="ml-4">• Cortex AI または Azure OpenAI / Claude を呼び出し</div>
                <div className="ml-4">• 引用情報・confidence score を付与して応答</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <h4 className="font-bold text-slate-900 text-base mb-2">⚙️ 主な利点と留意点</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="bg-green-50 border border-green-200 p-3 rounded">
                  <div className="font-semibold text-green-900 mb-1">✅ 利点</div>
                  <ul className="text-green-800 space-y-1 text-xs">
                    <li>• 検索・リランキング・生成を完全にカスタマイズ</li>
                    <li>• 複雑な業務ロジック（フィルタ、集計等）を組み込み可能</li>
                    <li>• マルチステップのエージェント実装も可</li>
                    <li>• コスト最適化（不要な処理を削減）</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 p-3 rounded">
                  <div className="font-semibold text-red-900 mb-1">⚠️ 留意点</div>
                  <ul className="text-red-800 space-y-1 text-xs">
                    <li>• 実装・テスト・チューニング工数が大幅に増加</li>
                    <li>• 埋め込みモデル・LLM 選定と統合の手作業</li>
                    <li>• 监视・エラーハンドリング・ロールバック戦略が必須</li>
                    <li>• 権限管理・セキュリティ設計に責任が発生</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-lg p-4 border-l-4 border-amber-500">
              <p className="text-slate-700 text-sm">
                <span className="font-semibold">推奨用途：</span>要件が複雑で独自の検索戦略・生成ロジックが必要な案件、または既存の RAG 基盤との統合が必要な大規模組織。
                初期段階なら Cortex Search で POC し、要件が増えたら SPCS で拡張する「ハイブリッド」アプローチが現実的。
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">Cortex Search でのデータ格納と自動処理</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h4 className="font-bold text-slate-900 text-base mb-2">📥 チャンク処理は自動実行</h4>
              <p className="text-slate-700 text-sm leading-6">
                Cortex Search インデックスを作成する際、チャンク戦略を SQL で定義します（例：<code className="bg-slate-100 px-1 rounded text-xs">{"chunking_parameters = {type: 'SEMANTIC', chunk_size: 256}"}</code>）。
                その後「Add data」でドキュメントを追加すると、定義済みのチャンク設定に従って<span className="font-semibold">自動でチャンク化</span>されます。手動で個別設定する必要はありません。
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h4 className="font-bold text-slate-900 text-base mb-2">🔄 リランキングは設定次第</h4>
              <ul className="text-slate-700 text-sm space-y-2 leading-6">
                <li>• <span className="font-semibold">デフォルト</span>：リランキング <span className="font-semibold">なし</span>（ベクトル類似度だけで順位付け）</li>
                <li>• <span className="font-semibold">高精度が必要</span>な場合、インデックス作成時に <code className="bg-slate-100 px-1 rounded text-xs">{"reranking_config = {type: 'CORTEX', model: 'reranker'}"}</code> を指定</li>
                <li>• 指定すれば、新規データ追加時も自動で適用される</li>
                <li>• さらに高度なリランキングが必要な場合は、SPCS でカスタムリランキング機能を後付けすることも可能</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h4 className="font-bold text-slate-900 text-base mb-2">✅ 実務での推奨フロー</h4>
              <ol className="text-slate-700 text-sm space-y-2 leading-6 list-decimal list-inside">
                <li>インデックス作成時に、チャンク・リランキング戦略を<span className="font-semibold">一度決める</span>（試行錯誤）</li>
                <li>以降のデータ追加は「Add data」で流し込むだけ（自動処理）</li>
                <li>精度が不十分なら、SPCS で<span className="font-semibold">カスタムリランキング</span>を追加実装</li>
                <li>本番運用に入ったら、定期的に精度計測と改善サイクルを回す</li>
              </ol>
            </div>
            <div className="bg-slate-100 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-slate-700 text-sm">
                <span className="font-semibold">まとめ：</span>チャンク処理は<span className="font-semibold">完全自動</span>、リランキングは<span className="font-semibold">インデックス作成時の設定で決まる</span>。
                「Add data」はデータ投入のみで、設定変更は基本的に不要です。
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-2xl font-semibold mb-3">推奨アプローチ（実務向け）</h3>
          <p className="text-slate-200 leading-7 mb-4 max-w-4xl">
            多くの案件では、まず Cortex Search中心で業務効果を検証し、差別化が必要な部分だけ SPCS 自前RAGへ拡張する
            「ハイブリッド」方式が最もバランスに優れます。初期速度と将来の自由度を両立できます。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-white/10 px-4 py-3">・初期立ち上げが速い</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・統制を維持しやすい</div>
            <div className="rounded-xl bg-white/10 px-4 py-3">・要件増に追従しやすい</div>
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">用語集</h3>
          <div className="space-y-4">
            {[
              {
                term: "リランキング（Reranking）",
                definition:
                  "初期検索で取得した複数の候補文書を、より精密なモデル（cross-encoder など）を用いてスコアを再計算し、関連度の高い順に並び替えるプロセス。通常、ベクトル埋め込みの類似度やBM25だけでは順位が不正確な場合に、2段階目の精密評価として機能する。特に高精度が求められるRAGでは必須の技術。",
              },
              {
                term: "チャンキング（Chunking）",
                definition:
                  "大規模な文書やテキストを小さな意味的な単位（チャンク）に分割するプロセス。トークン数の制限やベクトル埋め込みの精度を考慮して、適切なサイズ（通常100〜500トークン）に区切る。単純な固定長分割と、段落・文単位の意味的分割がある。",
              },
              {
                term: "埋め込み（Embedding）",
                definition:
                  "テキストを多次元ベクトル空間に変換する処理。Cortex Embeddings や OpenAI Embeddings などのサービスを使用。意味的に似たテキストは近いベクトル表現になるため、ベクトル検索の基盤となる。",
              },
              {
                term: "メタデータ",
                definition:
                  "チャンク化した文書に付与する属性情報（著者、日付、部門、ドキュメントID など）。検索結果をフィルタ・グループ化するほか、生成AIの根拠表示や権限チェックに利用される。RAGの精度と透明性を大きく左右する。",
              },
              {
                term: "Cortex Search",
                definition:
                  "Snowflake独自のベクトル検索・RAG機能。チャンク化・埋め込み・インデックス・リトリーバルを統合サービスとして提供。SQL で構成を定義でき、Cortex AI（LLM）と組み合わせて本格的なRAGを短期間で構築できる。",
              },
              {
                term: "Cortex AI",
                definition:
                  "Snowflake上で動作するマネージドLLMサービス。SNOWFLAKE.CORTEX.COMPLETE関数で外部APIなしに生成AIを利用できる。複数モデル（Claude、Llama など）から選択可。データ学習不可設定で機密情報の安全性を確保できる。",
              },
              {
                term: "SPCS（Snowpark Container Services）",
                definition:
                  "Snowflake上で Docker コンテナを実行するマネージドサービス。カスタムの推論モデルや検索ロジックを実装する際に使用。Snowflakeデータへのダイレクトアクセスとセキュアな実行環境を両立できるため、自前RAGの構築に最適。",
              },
              {
                term: "Cross-Encoder",
                definition:
                  "リランキング用のニューラルネットワークモデル。クエリと文書のペアを同時に入力して関連度スコアを出力する。Bi-encoderよりも高精度だが計算コストが高いため、候補文書数が限定された2段階目の精密評価に向いている。",
              },
              {
                term: "BM25",
                definition:
                  "統計的な全文検索アルゴリズム。ベクトル埋め込みを使わず、キーワード頻度と文書長に基づいてスコアを計算。実装が軽く高速だが、意味的な理解は限定的。初期候補取得や複合検索に有効。",
              },
              {
                term: "プロンプトエンジニアリング",
                definition:
                  "LLMから期待する出力を得るための入力指示（プロンプト）の設計・最適化。RAGでは、検索結果の根拠を正確に引用させたり、不正確な回答を避けさせたりするために、プロンプトテンプレートの工夫が重要。",
              },
            ].map((item) => (
              <div key={item.term} className="border-l-4 border-indigo-500 pl-4 py-2">
                <h4 className="font-semibold text-slate-900 text-base mb-1">{item.term}</h4>
                <p className="text-slate-700 text-sm leading-6">{item.definition}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
