"use client";

import { useMemo, useState } from "react";

type Tab = "overview" | "arch" | "playbook" | "slides";

type Slide = {
  title: string;
  summary: string;
  bullets: string[];
};

export default function VendorGuide() {
  const [tab, setTab] = useState<Tab>("overview");
  const [slideIndex, setSlideIndex] = useState(0);

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "🧭 概要" },
    { id: "arch", label: "🏗️ 構成図" },
    { id: "playbook", label: "📋 手順書" },
    { id: "slides", label: "🖼️ 説明スライド" },
  ];

  const slides: Slide[] = useMemo(
    () => [
      {
        title: "Slide 1: このリポジトリの狙い",
        summary: "入口を固定しつつ、検索基盤だけを差し替えられる RAG を検証する。",
        bullets: [
          "Web / MCP / REST は同一 API 契約を利用",
          "Core は Ports & Adapters で実装責務を分離",
          "PoC から本番へ段階移行しやすい設計",
        ],
      },
      {
        title: "Slide 2: アーキテクチャの要点",
        summary: "固定資産（契約・スキーマ・評価セット）を持ち、下層の実装は可換にする。",
        bullets: [
          "contracts/openapi.yaml が境界契約",
          "chunk-metadata.schema.json で標準化",
          "Adapter を環境変数で切替（in_memory/pgvector/OpenSearch等）",
        ],
      },
      {
        title: "Slide 3: 運用と品質担保",
        summary: "回答品質は eval ハーネスで継続測定し、切替時は shadow-read で安全に移行する。",
        bullets: [
          "eval/qa_set.json で比較評価",
          "dual-write + shadow-read + cutover",
          "refusal_rate / citation_recall を追跡",
        ],
      },
      {
        title: "Slide 4: 都庁案件への適用",
        summary: "既存の Snowflake 中心構成へ段階導入し、ロックインリスクを制御する。",
        bullets: [
          "初期: Snowflake 連携で最短 PoC",
          "拡張: OpenSearch / pgvector への移行余地を保持",
          "同じ契約でチャット・整合性・シナリオ生成へ展開",
        ],
      },
    ],
    []
  );

  const currentSlide = slides[slideIndex];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">🧩 vendor-agnostic-rag</h2>
        <p className="text-sm text-gray-500 mt-1">ベンダー非依存 RAG 基盤（Adapter 差し替え型）の検証プロジェクト</p>
      </div>

      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-4 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-5">
          <section className="bg-purple-50 border border-purple-200 rounded-xl p-5">
            <h3 className="text-base font-bold text-purple-900 mb-2">概要</h3>
            <p className="text-sm text-gray-700 leading-6">
              Snowflake / Azure / AWS / pgvector / OpenSearch などの検索基盤を Adapter で切り替えながら、
              入口（Web UI / MCP / REST）と API 契約を固定する RAG 検証リポジトリです。
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="font-semibold text-slate-900 mb-1">リポジトリパス</div>
              <div className="font-mono text-xs text-slate-600 break-all">C:\Users\cab02322\src\nomura\vendor-agnostic-rag</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="font-semibold text-slate-900 mb-1">主な固定資産</div>
              <ul className="text-slate-700 text-xs space-y-1 list-disc pl-4">
                <li>contracts/openapi.yaml</li>
                <li>contracts/chunk-metadata.schema.json</li>
                <li>eval/qa_set.json</li>
              </ul>
            </div>
          </div>

          <section className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">確認観点（都庁案件向け）</h4>
            <ul className="text-sm text-gray-700 leading-6 list-disc pl-5 space-y-1">
              <li>検索基盤切替時に API 契約が変わらないか</li>
              <li>根拠提示・拒否応答の品質が維持できるか</li>
              <li>評価指標で移行可否を定量判断できるか</li>
            </ul>
          </section>
        </div>
      )}

      {tab === "arch" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-4">構成図（レイヤー）</h3>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="text-xs font-bold text-blue-700 uppercase mb-2">フロントエンド</div>
                <div className="text-sm text-gray-700 leading-6">
                  <div>Web UI / Next.js</div>
                  <div>操作画面 / 説明画面</div>
                  <div>質問入力 / 結果表示</div>
                </div>
              </div>

              <div className="flex items-center justify-center text-gray-500 font-semibold text-sm px-2 md:px-0">
                ⇄
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                <div className="text-xs font-bold text-indigo-700 uppercase mb-2">バックエンド</div>
                <div className="text-sm text-gray-700 leading-6">
                  <div>FastAPI / Orchestrator</div>
                  <div>ACL / Audit / Ingest</div>
                  <div>MCP Server / REST API</div>
                </div>
              </div>

              <div className="flex items-center justify-center text-gray-500 font-semibold text-sm px-2 md:px-0">
                ⇄
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div className="text-xs font-bold text-emerald-700 uppercase mb-2">ナレッジ格納先</div>
                <div className="text-sm text-gray-700 leading-6">
                  <div>Postgres / pgvector</div>
                  <div>文書チャンク / メタデータ</div>
                  <div>検索インデックス / 永続化</div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-center">
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-700">
                ユーザーが画面から質問を入力し、フロントエンドが API を呼ぶ
              </div>
              <div className="flex items-center justify-center text-gray-500 font-semibold text-sm px-2 md:px-0">
                →
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-700">
                バックエンドが検索・引用判定・LLM 呼び出しを行って結果を返す
              </div>
              <div className="flex items-center justify-center text-gray-500 font-semibold text-sm px-2 md:px-0">
                →
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-700">
                バックエンドがナレッジを Postgres に保存し、検索時に取り出す
              </div>
            </div>

            <div className="mt-4 bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="text-xs font-bold text-purple-700 uppercase mb-2">共通契約・差し替え層</div>
              <div className="text-sm text-gray-700">
                OpenAPI + Chunk Schema / in_memory / pgvector / OpenSearch / Snowflake / Azure / Bedrock
              </div>
            </div>
          </section>

          <section>
            <h4 className="font-semibold text-gray-800 mb-2">リクエストフロー（Answer）</h4>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-700 leading-6">
              User → Entry → POST /v1/answer → Orchestrator → Embedding → Vector Search → 引用判定 → LLM → Answer + Citations
            </div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">サーバーやコンテナは含めるか</h4>
            <p className="text-sm text-gray-700 leading-6">
              ここでは構成図の主役をフロントエンドとバックエンドに置いているため、サーバーやコンテナは
              本体の構成要素ではなく、実行環境・配置先として扱うのが分かりやすいです。
            </p>
            <p className="text-sm text-gray-600 leading-6 mt-2">
              もし必要なら別枠で「デプロイ構成」として、Docker Compose / Postgres / API / MCP のように分けて描けます。
            </p>
          </section>
        </div>
      )}

      {tab === "playbook" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-base font-bold text-gray-700 mb-3">手順書（ローカル PoC）</h3>
            <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-3 leading-6">
              <li>
                <div className="font-semibold text-gray-900">まず core を起動する</div>
                <div>venv を作成し、requirements を入れてから run.py を実行します。ここで API 本体が立ち上がります。</div>
              </li>
              <li>
                <div className="font-semibold text-gray-900">Postgres を用意する</div>
                <div>docker compose で Postgres を起動するか、既存の Postgres を使います。ナレッジの永続化先になります。</div>
              </li>
              <li>
                <div className="font-semibold text-gray-900">Adapter を pgvector に切り替える</div>
                <div>VECTOR_STORE_ADAPTER=pgvector と POSTGRES_DSN を設定し、Embedding / LLM は必要に応じて mock か openai_compat を選びます。</div>
              </li>
              <li>
                <div className="font-semibold text-gray-900">文書を取り込む</div>
                <div>/v1/ingest を呼び、sample_docs や実データをチャンク化して Postgres の検索インデックスに登録します。</div>
              </li>
              <li>
                <div className="font-semibold text-gray-900">回答を確認する</div>
                <div>/v1/answer を呼び、引用付きで返るか、拒否条件に入るかを確認します。</div>
              </li>
              <li>
                <div className="font-semibold text-gray-900">必要なら web を起動する</div>
                <div>Next.js の画面は npm run dev で起動し、/rag で操作 UI を確認します。</div>
              </li>
              <li>
                <div className="font-semibold text-gray-900">評価する</div>
                <div>eval/run_eval.py で Q&A セットの評価を回し、切替前後で品質を比較します。</div>
              </li>
            </ol>
          </section>

          <section className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-green-300 overflow-auto">
            <div>cd vendor-agnostic-rag/core</div>
            <div>python -m venv .venv</div>
            <div>. .venv/Scripts/Activate.ps1</div>
            <div>pip install -r requirements.txt</div>
            <div>set PYTHONPATH=.</div>
            <div>set SAMPLE_DOCS_DIR=../sample_docs</div>
            <div>docker compose up -d postgres</div>
            <div>set VECTOR_STORE_ADAPTER=in_memory</div>
            <div>set VECTOR_STORE_ADAPTER=pgvector</div>
            <div>set POSTGRES_DSN=postgresql://rag:rag@localhost:5432/rag</div>
            <div>set EMBEDDING_ADAPTER=mock</div>
            <div>set LLM_ADAPTER=mock</div>
            <div>python run.py</div>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Adapter 切替の運用ポイント</h4>
            <ul className="text-sm text-gray-700 leading-6 list-disc pl-5 space-y-1">
              <li>切替はコードではなく環境変数で行う</li>
              <li>初期は in_memory + mock でコスト 0 に近い PoC を回す</li>
              <li>次に pgvector / OpenSearch を使い、永続化と検索性能を確認する</li>
              <li>Snowflake / Azure / Bedrock は外部基盤なので、利用開始時点から課金や接続費用を意識する</li>
            </ul>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">コストがかかる部分</h4>
            <ul className="text-sm text-gray-700 leading-6 list-disc pl-5 space-y-1">
              <li>OpenAI 互換 API を使う embedding / LLM 呼び出し</li>
              <li>Postgres / OpenSearch / Snowflake / Azure AI Search / Bedrock の外部基盤</li>
              <li>データ量が増えたときの再インデックス・再評価の実行回数</li>
            </ul>
            <p className="text-sm text-gray-600 mt-3">
              逆に、in_memory + mock の組み合わせなら、ローカル検証の固定費はかなり低く抑えられます。
            </p>
          </section>

          <section className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-2">コードの記述はどこを見るか</h4>
            <ul className="text-sm text-gray-700 leading-6 list-disc pl-5 space-y-1">
              <li>.env で VECTOR_STORE_ADAPTER / EMBEDDING_ADAPTER / LLM_ADAPTER を切り替える</li>
              <li>adapters.yaml に必要な環境変数と注記をまとめる</li>
              <li>core/rag_core/config.py で既定値と設定値を管理する</li>
              <li>core/rag_core/adapters/factory.py で実際に Adapter を生成する</li>
            </ul>
            <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700 font-mono overflow-auto">
              <div>VECTOR_STORE_ADAPTER=pgvector</div>
              <div>EMBEDDING_ADAPTER=openai_compat</div>
              <div>LLM_ADAPTER=openai_compat</div>
              <div>POSTGRES_DSN=postgresql://rag:rag@localhost:5432/rag</div>
              <div>OPENAI_BASE_URL=https://api.openai.com/v1</div>
              <div>OPENAI_API_KEY=...</div>
            </div>
          </section>
        </div>
      )}

      {tab === "slides" && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-5">
            <div className="text-xs font-semibold text-purple-700 mb-2">
              {slideIndex + 1} / {slides.length}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{currentSlide.title}</h3>
            <p className="text-sm text-gray-700 leading-6 mb-3">{currentSlide.summary}</p>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              {currentSlide.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setSlideIndex((prev) => Math.max(0, prev - 1))}
              disabled={slideIndex === 0}
              className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            >
              ← 前へ
            </button>
            <div className="text-xs text-gray-500">説明会用の要点スライド</div>
            <button
              onClick={() => setSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
              disabled={slideIndex === slides.length - 1}
              className="px-3 py-2 rounded-lg text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
            >
              次へ →
            </button>
          </div>
        </div>
      )}

      <section className="mt-8 space-y-5 border-t border-gray-200 pt-6">
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <h3 className="text-base font-bold text-indigo-900 mb-2">用語集</h3>
          <p className="text-sm text-gray-700 leading-6">
            実装でよく出る単語を、ページの下部にまとめて確認できるようにしています。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="font-semibold text-gray-900">Embedding</div>
            <div className="text-sm text-gray-700 leading-6 mt-1">
              文書や質問を、意味の近さを計算できるベクトルに変換する処理です。検索の入口になるため、
              ベクトルの次元数やモデル選定が精度とコストに直結します。
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="font-semibold text-gray-900">Vector Store</div>
            <div className="text-sm text-gray-700 leading-6 mt-1">
              Embedding したベクトルを保存し、類似検索する場所です。例は in_memory、pgvector、OpenSearch、Snowflake などです。
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="font-semibold text-gray-900">Adapter</div>
            <div className="text-sm text-gray-700 leading-6 mt-1">
              同じ機能を持つ別実装を差し替えるための層です。このプロジェクトでは環境変数で切り替え、
              コードの変更量を抑えています。
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="font-semibold text-gray-900">RAG</div>
            <div className="text-sm text-gray-700 leading-6 mt-1">
              Retrieval-Augmented Generation の略です。検索で根拠文を取ってきて、LLM に渡して回答を作らせる方式です。
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="font-semibold text-gray-900">Chunk</div>
            <div className="text-sm text-gray-700 leading-6 mt-1">
              文書を小分けにした単位です。長い文書をそのまま使わず、検索しやすいサイズに分割して扱います。
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="font-semibold text-gray-900">Citations</div>
            <div className="text-sm text-gray-700 leading-6 mt-1">
              回答の根拠として返す参照情報です。PoC では「答えたか」だけでなく「どの根拠を使ったか」が重要です。
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="font-semibold text-gray-900">OpenAI 互換 API</div>
            <div className="text-sm text-gray-700 leading-6 mt-1">
              OpenAI と同じ形式で呼び出せる API です。モデル本体を完全に同じにしなくても、クライアント側の実装を揃えやすくなります。
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="font-semibold text-gray-900">In-memory</div>
            <div className="text-sm text-gray-700 leading-6 mt-1">
              メモリ上だけで動かす軽量実装です。外部基盤を使わないため、最初の PoC でコストを抑えやすいです。
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
