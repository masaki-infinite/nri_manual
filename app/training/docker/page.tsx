"use client";

import { useState } from "react";
import Link from "next/link";

type Tab = "overview" | "compose" | "commands" | "examples";

export default function DockerPage() {
  const [tab, setTab] = useState<Tab>("overview");

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "📦 Docker 基礎" },
    { id: "compose", label: "🐙 Docker Compose" },
    { id: "commands", label: "⌨️ コマンド早見表" },
    { id: "examples", label: "🔧 実践例" },
  ];

  return (
    <div>
      <div className="mb-6">
        <Link href="/training" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          ← 勉強会一覧に戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Docker 勉強会資料</h2>
      <p className="text-gray-500 text-sm mb-6">Docker / Docker Compose の基礎から実践まで</p>

      {/* タブ */}
      <div className="flex gap-2 mb-8 border-b border-gray-200 pb-4 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Docker 基礎 */}
      {tab === "overview" && (
        <div className="space-y-8">
          {/* 概念図 */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Docker とは</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
              <p className="text-blue-800 text-sm leading-relaxed">
                アプリケーションとその依存関係を <strong>コンテナ</strong> という軽量な実行単位にパッケージングする技術。
                「自分のマシンでは動くのに...」を解消し、開発・テスト・本番で同じ環境を再現できます。
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  icon: "📦",
                  title: "イメージ（Image）",
                  desc: "コンテナの設計図。OS・ランタイム・アプリを層（レイヤー）として積み上げた読み取り専用のテンプレート。",
                  color: "bg-blue-50 border-blue-200",
                },
                {
                  icon: "🚀",
                  title: "コンテナ（Container）",
                  desc: "イメージから生成した実行中のプロセス。独立したファイルシステム・ネットワーク・プロセス空間を持つ。",
                  color: "bg-green-50 border-green-200",
                },
                {
                  icon: "🗄️",
                  title: "ボリューム（Volume）",
                  desc: "コンテナが削除されてもデータを保持する永続ストレージ。DB のデータや設定ファイルの保存に使う。",
                  color: "bg-purple-50 border-purple-200",
                },
              ].map((item) => (
                <div key={item.title} className={`${item.color} border rounded-xl p-4`}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-bold text-gray-800 text-sm mb-1">{item.title}</div>
                  <div className="text-xs text-gray-600 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* VM との違い */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4">VM（仮想マシン）との違い</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left px-4 py-2 border border-gray-200 text-xs font-semibold text-gray-600">比較項目</th>
                    <th className="text-left px-4 py-2 border border-gray-200 text-xs font-semibold text-blue-600">🐳 Docker コンテナ</th>
                    <th className="text-left px-4 py-2 border border-gray-200 text-xs font-semibold text-gray-600">🖥️ 仮想マシン（VM）</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { item: "起動時間", docker: "秒単位", vm: "分単位" },
                    { item: "サイズ", docker: "MB 単位（軽量）", vm: "GB 単位（重い）" },
                    { item: "OS カーネル", docker: "ホストと共有", vm: "各 VM が独立した OS を持つ" },
                    { item: "隔離レベル", docker: "プロセス隔離", vm: "完全な隔離" },
                    { item: "リソース消費", docker: "少ない", vm: "多い" },
                    { item: "ポータビリティ", docker: "高い（どこでも同じ動作）", vm: "やや低い" },
                  ].map((row) => (
                    <tr key={row.item} className="border border-gray-200">
                      <td className="px-4 py-2 text-xs text-gray-700 font-medium">{row.item}</td>
                      <td className="px-4 py-2 text-xs text-blue-700">{row.docker}</td>
                      <td className="px-4 py-2 text-xs text-gray-600">{row.vm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Dockerfile */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Dockerfile の基本構造</h3>
            <p className="text-sm text-gray-600 mb-3">イメージをビルドするための手順書。上から順に実行され、各行が 1 レイヤーになります。</p>
            <div className="bg-gray-900 rounded-xl p-5 font-mono text-xs text-gray-300 overflow-x-auto">
              <div className="space-y-1">
                <div><span className="text-blue-400">FROM</span> <span className="text-green-300">openjdk:17-slim</span>          <span className="text-gray-500"># ベースイメージを指定</span></div>
                <div className="mt-2"><span className="text-blue-400">WORKDIR</span> <span className="text-yellow-300">/app</span>                 <span className="text-gray-500"># 作業ディレクトリ</span></div>
                <div className="mt-2"><span className="text-blue-400">COPY</span> <span className="text-yellow-300">target/*.war</span> <span className="text-yellow-300">app.war</span> <span className="text-gray-500"># ファイルをコンテナ内にコピー</span></div>
                <div className="mt-2"><span className="text-blue-400">EXPOSE</span> <span className="text-green-300">8080</span>                <span className="text-gray-500"># 公開するポート番号</span></div>
                <div className="mt-2"><span className="text-blue-400">CMD</span> <span className="text-green-300">[&quot;java&quot;, &quot;-jar&quot;, &quot;app.war&quot;]</span>  <span className="text-gray-500"># 起動コマンド</span></div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { cmd: "FROM", desc: "ベースイメージを指定。全ての Dockerfile は FROM で始まる" },
                { cmd: "RUN", desc: "ビルド時にコマンドを実行（apt-get install など）" },
                { cmd: "COPY / ADD", desc: "ホストのファイルをイメージ内にコピー" },
                { cmd: "ENV", desc: "環境変数を設定" },
                { cmd: "EXPOSE", desc: "公開するポートを宣言（ドキュメント的な役割）" },
                { cmd: "CMD / ENTRYPOINT", desc: "コンテナ起動時に実行するコマンド" },
              ].map((item) => (
                <div key={item.cmd} className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                  <span className="font-mono text-xs font-bold text-blue-600">{item.cmd}</span>
                  <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ネットワーク */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4">ネットワークの基本</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { type: "bridge（デフォルト）", desc: "同一ホスト上のコンテナ間通信。docker-compose は自動で bridge ネットワークを作成し、サービス名で名前解決できる。", color: "bg-green-50 border-green-200" },
                { type: "host", desc: "コンテナがホストのネットワークをそのまま使う。ポートマッピング不要だが隔離性が低い。", color: "bg-orange-50 border-orange-200" },
                { type: "none", desc: "ネットワーク接続なし。完全隔離が必要なバッチ処理などに使用。", color: "bg-gray-50 border-gray-200" },
              ].map((item) => (
                <div key={item.type} className={`${item.color} border rounded-xl p-4`}>
                  <div className="font-mono text-xs font-bold text-gray-700 mb-2">{item.type}</div>
                  <div className="text-xs text-gray-600 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Docker Compose */}
      {tab === "compose" && (
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Docker Compose とは</h3>
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5 mb-4">
              <p className="text-cyan-800 text-sm leading-relaxed">
                複数のコンテナを <strong>1つの YAML ファイル（docker-compose.yml）</strong> で定義・管理するツール。
                アプリ本体・DB・キャッシュなどを一括起動・停止でき、ローカル開発環境の構築に最適です。
              </p>
            </div>
          </section>

          {/* compose.yml の構造 */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4">docker-compose.yml の構造</h3>
            <div className="bg-gray-900 rounded-xl p-5 font-mono text-xs overflow-x-auto">
              <pre className="text-gray-300 leading-relaxed whitespace-pre">{`services:
  app:                              # サービス名（任意）
    build:
      context: .                    # Dockerfile のある場所
      dockerfile: Dockerfile
    image: myapp:latest             # 使用するイメージ名
    container_name: my-app          # コンテナ名（省略可）
    ports:
      - "8080:8080"                 # ホスト:コンテナ のポートマッピング
    environment:
      - DB_HOST=mysql               # 環境変数（サービス名で名前解決）
      - DB_PORT=3306
    env_file:
      - .env                        # .env ファイルから環境変数を読込
    volumes:
      - ./logs:/app/logs            # ホストパス:コンテナパス
      - app-data:/var/data          # 名前付きボリューム
    depends_on:
      mysql:
        condition: service_healthy  # ヘルスチェック通過後に起動
    networks:
      - backend
    restart: unless-stopped         # 自動再起動ポリシー

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: \${DB_ROOT_PASS}
      MYSQL_DATABASE: app_db
      MYSQL_USER: \${DB_USER}
      MYSQL_PASSWORD: \${DB_PASS}
    volumes:
      - mysql-data:/var/lib/mysql   # データ永続化
      - ./config/mysql:/docker-entrypoint-initdb.d  # 初期化 SQL
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - backend

volumes:
  mysql-data:                       # 名前付きボリュームの宣言
  app-data:

networks:
  backend:                          # カスタムネットワークの宣言`}</pre>
            </div>
          </section>

          {/* 主要フィールド解説 */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4">主要フィールド解説</h3>
            <div className="space-y-4">
              {[
                {
                  field: "services",
                  color: "blue",
                  desc: "起動するコンテナ群を定義するルートキー。各エントリがひとつのコンテナに対応する。",
                  tips: [
                    "サービス名はネットワーク内での DNS 名としてそのまま使える（mysql → http://mysql:3306）",
                    "同一 compose.yml 内のサービスは自動的に同じデフォルトネットワークに参加する",
                  ],
                },
                {
                  field: "build vs image",
                  color: "green",
                  desc: "build: Dockerfile からビルド。image: Docker Hub などの既存イメージを使う。両方指定するとビルドしたイメージに image で指定した名前を付ける。",
                  tips: [
                    "自作アプリは build、ミドルウェア（DB など）は image を使うのが一般的",
                    "build.args でビルド時変数を渡せる",
                  ],
                },
                {
                  field: "volumes",
                  color: "purple",
                  desc: "ファイルをホストとコンテナ間でマウントする。バインドマウント（./path:/container）と名前付きボリュームの2種類がある。",
                  tips: [
                    "DB データは必ず名前付きボリュームで永続化（コンテナ削除でもデータが残る）",
                    "初期化 SQL は /docker-entrypoint-initdb.d/ にマウントすると自動実行される",
                  ],
                },
                {
                  field: "depends_on",
                  color: "orange",
                  desc: "起動順序の依存関係を定義。condition: service_healthy を使うと healthcheck が通過するまで待機する。",
                  tips: [
                    "depends_on だけでは「プロセスが起動した」だけで「サービスが使える状態」は保証しない",
                    "condition: service_healthy を必ず使うこと（特に DB の起動待ち）",
                  ],
                },
                {
                  field: "healthcheck",
                  color: "teal",
                  desc: "コンテナが「使える状態」かどうかを定期的にチェックするコマンド。depends_on の condition: service_healthy と組み合わせる。",
                  tips: [
                    "interval: チェック間隔、timeout: タイムアウト、retries: 失敗許容回数",
                    "MySQL は mysqladmin ping、HTTP サービスは curl -f http://localhost/health など",
                  ],
                },
                {
                  field: "env_file / environment",
                  color: "red",
                  desc: "環境変数を設定する2つの方法。env_file は .env ファイルを読み込む。environment は直接記載（${VAR} で .env 参照も可）。",
                  tips: [
                    ".env はリポジトリにコミットしない（.gitignore に追加）",
                    ".env.example をコミットしてメンバーが .env を作れるようにする",
                  ],
                },
              ].map((item) => {
                const colorMap: Record<string, string> = {
                  blue: "bg-blue-50 border-blue-200 text-blue-800",
                  green: "bg-green-50 border-green-200 text-green-800",
                  purple: "bg-purple-50 border-purple-200 text-purple-800",
                  orange: "bg-orange-50 border-orange-200 text-orange-800",
                  teal: "bg-teal-50 border-teal-200 text-teal-800",
                  red: "bg-red-50 border-red-200 text-red-800",
                };
                return (
                  <div key={item.field} className={`${colorMap[item.color]} border rounded-xl p-4`}>
                    <div className="font-mono font-bold text-sm mb-2">{item.field}</div>
                    <p className="text-sm leading-relaxed mb-2">{item.desc}</p>
                    <ul className="space-y-1">
                      {item.tips.map((tip, i) => (
                        <li key={i} className="text-xs flex items-start gap-2">
                          <span className="mt-0.5 flex-shrink-0">💡</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ベストプラクティス */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4">ベストプラクティス</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🔒", title: ".env をコミットしない", desc: "パスワード・トークンは .env に書き、.gitignore で除外。.env.example をコミットしてチームに共有。" },
                { icon: "🏥", title: "healthcheck を使う", desc: "DB の起動完了前にアプリが接続しようとして失敗するケースが多い。healthcheck + depends_on の condition で解決。" },
                { icon: "📌", title: "イメージタグを固定する", desc: "image: mysql:latest ではなく mysql:8.0.33 のようにバージョンを固定して環境の再現性を確保。" },
                { icon: "📁", title: "名前付きボリュームでデータ永続化", desc: "DB データは必ず名前付きボリュームを使う。docker compose down -v で消えてしまうことに注意。" },
                { icon: "🌐", title: "カスタムネットワークで分離", desc: "フロントエンド・バックエンド・DB でネットワークを分けると、不要なコンテナ間通信を防げる。" },
                { icon: "🔄", title: "restart ポリシーを設定", desc: "unless-stopped でコンテナが落ちたとき自動再起動。本番に近い動作検証に有用。" },
              ].map((item) => (
                <div key={item.title} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-bold text-gray-800">{item.title}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* コマンド早見表 */}
      {tab === "commands" && (
        <div className="space-y-8">
          {[
            {
              title: "🚀 起動・停止",
              color: "green",
              commands: [
                { cmd: "docker compose up -d", desc: "バックグラウンドで全サービスを起動" },
                { cmd: "docker compose up -d --build", desc: "イメージを再ビルドして起動（コード変更後）" },
                { cmd: "docker compose up -d <service>", desc: "特定サービスのみ起動（例: mysql）" },
                { cmd: "docker compose down", desc: "全コンテナを停止・削除（ボリュームは保持）" },
                { cmd: "docker compose down -v", desc: "コンテナ・ボリュームを全て削除（データも消える）" },
                { cmd: "docker compose stop", desc: "コンテナを停止（削除はしない）" },
                { cmd: "docker compose start", desc: "停止中のコンテナを再起動" },
                { cmd: "docker compose restart <service>", desc: "特定サービスを再起動" },
              ],
            },
            {
              title: "📊 状態確認・ログ",
              color: "blue",
              commands: [
                { cmd: "docker compose ps", desc: "全サービスの起動状態・ポート確認" },
                { cmd: "docker compose logs", desc: "全サービスのログを表示" },
                { cmd: "docker compose logs -f", desc: "ログをリアルタイムで追跡（tail -f 相当）" },
                { cmd: "docker compose logs -f <service>", desc: "特定サービスのログを追跡" },
                { cmd: "docker compose logs --tail=50 <service>", desc: "直近 50 行のログを表示" },
                { cmd: "docker compose top", desc: "各コンテナで動いているプロセスを表示" },
              ],
            },
            {
              title: "🔧 操作・デバッグ",
              color: "purple",
              commands: [
                { cmd: "docker compose exec <service> bash", desc: "コンテナ内でシェルを起動（デバッグ用）" },
                { cmd: "docker compose exec mysql mysql -u root -p", desc: "MySQL コンテナに接続" },
                { cmd: "docker compose run --rm <service> <cmd>", desc: "一時コンテナでコマンドを実行（起動済み不要）" },
                { cmd: "docker compose cp <service>:/path ./local", desc: "コンテナからファイルをコピー" },
                { cmd: "docker compose config", desc: "最終的な compose 設定を表示（.env 展開後）" },
              ],
            },
            {
              title: "🏗️ ビルド・イメージ管理",
              color: "orange",
              commands: [
                { cmd: "docker compose build", desc: "全サービスのイメージをビルド" },
                { cmd: "docker compose build <service>", desc: "特定サービスのみビルド" },
                { cmd: "docker compose build --no-cache", desc: "キャッシュなしで全てビルドし直す" },
                { cmd: "docker compose pull", desc: "全サービスのイメージを最新に更新" },
                { cmd: "docker image ls", desc: "ローカルのイメージ一覧" },
                { cmd: "docker image prune", desc: "使われていないイメージを削除（容量節約）" },
                { cmd: "docker system prune", desc: "未使用の全リソースを一括削除" },
              ],
            },
          ].map((section) => {
            const colorMap: Record<string, { header: string; bg: string; code: string }> = {
              green: { header: "bg-green-500", bg: "bg-green-50", code: "text-green-700" },
              blue: { header: "bg-blue-500", bg: "bg-blue-50", code: "text-blue-700" },
              purple: { header: "bg-purple-500", bg: "bg-purple-50", code: "text-purple-700" },
              orange: { header: "bg-orange-500", bg: "bg-orange-50", code: "text-orange-700" },
            };
            const c = colorMap[section.color];
            return (
              <section key={section.title}>
                <h3 className="text-base font-bold text-gray-800 mb-3">{section.title}</h3>
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <table className="w-full">
                    <tbody>
                      {section.commands.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : c.bg}>
                          <td className="px-4 py-2.5 w-1/2">
                            <code className={`text-xs font-mono font-semibold ${c.code}`}>{row.cmd}</code>
                          </td>
                          <td className="px-4 py-2.5 text-xs text-gray-600">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* 実践例 */}
      {tab === "examples" && (
        <div className="space-y-8">
          {/* hackathon-lib-check の例 */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-2">実例: hackathon-lib-check</h3>
            <p className="text-sm text-gray-500 mb-4">Java レガシーアプリ（Struts + Hibernate + MySQL）のローカル開発環境</p>
            <div className="bg-gray-900 rounded-xl p-5 font-mono text-xs overflow-x-auto mb-4">
              <pre className="text-gray-300 leading-relaxed whitespace-pre">{`services:
  legacy-app:
    build:
      context: .
    container_name: legacy-app
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=legacy-mysql
      - DB_PORT=3306
    env_file:
      - .env
    depends_on:
      legacy-mysql:
        condition: service_healthy   # ← DB のヘルスチェックを待つ
    restart: unless-stopped

  legacy-mysql:
    image: mysql:8.0
    container_name: legacy-mysql
    environment:
      MYSQL_ROOT_PASSWORD: \${DB_ROOT_PASS}
      MYSQL_DATABASE: legacy_db
      MYSQL_USER: \${DB_USER}
      MYSQL_PASSWORD: \${DB_PASS}
    volumes:
      - mysql-data:/var/lib/mysql
      - ./config/mysql:/docker-entrypoint-initdb.d  # DDL + シードデータを自動実行
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mysql-data:`}</pre>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs mb-4">
              <div className="text-gray-500 mb-2"># 起動</div>
              <div className="text-green-300">cp .env.example .env   <span className="text-gray-500"># 環境変数を設定</span></div>
              <div className="text-green-300 mt-1">docker compose up -d --build</div>
              <div className="text-gray-500 mt-1"># http://localhost:8080/legacy-app/ にアクセス</div>
              <div className="text-gray-500 mt-3"># DB に直接接続して確認</div>
              <div className="text-green-300">docker compose exec legacy-mysql mysql -u root -p legacy_db</div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
              <strong>ポイント：</strong> <code>./config/mysql</code> を <code>/docker-entrypoint-initdb.d/</code> にマウントすると、
              MySQL コンテナ初回起動時に <code>01-create-tables.sql</code> → <code>02-seed-data.sql</code> の順で自動実行されます。
            </div>
          </section>

          {/* よくある構成パターン */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4">よくある構成パターン</h3>
            <div className="space-y-4">
              {[
                {
                  title: "Web アプリ + DB",
                  services: ["nginx（リバースプロキシ）", "app（Node.js / Java / Python）", "db（MySQL / PostgreSQL）"],
                  tip: "nginx → app → db の順で depends_on でチェーンする",
                },
                {
                  title: "マイクロサービス構成",
                  services: ["api-gateway", "auth-service", "product-service", "redis（セッションキャッシュ）", "db"],
                  tip: "サービスごとにネットワークを分けて、必要なものだけ疎通できる構成にする",
                },
                {
                  title: "CI/CD テスト環境",
                  services: ["app（テスト対象）", "db（テスト用）", "mock-server（外部 API モック）"],
                  tip: "docker compose up --abort-on-container-exit でテスト終了時に全停止",
                },
              ].map((pattern) => (
                <div key={pattern.title} className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                  <div className="font-bold text-gray-800 text-sm mb-3">{pattern.title}</div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {pattern.services.map((s) => (
                      <span key={s} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg">{s}</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 flex items-start gap-1.5">
                    <span>💡</span>{pattern.tip}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* トラブルシューティング */}
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-4">トラブルシューティング</h3>
            <div className="space-y-3">
              {[
                {
                  problem: "コンテナが起動しない",
                  cause: "ポート競合 / 環境変数未設定 / ビルドエラー",
                  solution: "docker compose logs <service> でエラーを確認。ポートは lsof -i :8080 で競合チェック。",
                },
                {
                  problem: "DB に接続できない",
                  cause: "DB の起動が完了する前にアプリが接続しようとしている",
                  solution: "healthcheck と depends_on の condition: service_healthy を設定する。",
                },
                {
                  problem: "コードを変更したのに反映されない",
                  cause: "古いイメージがキャッシュされている",
                  solution: "docker compose up -d --build で再ビルド。それでも直らなければ --no-cache。",
                },
                {
                  problem: "ボリュームのデータが消えた",
                  cause: "docker compose down -v を実行した",
                  solution: "down は -v なしで実行するとボリュームは残る。本番データは外部ストレージを検討。",
                },
                {
                  problem: "コンテナ内のファイルを確認したい",
                  cause: "—",
                  solution: "docker compose exec <service> bash でシェルに入る。bash がなければ sh を使う。",
                },
              ].map((item) => (
                <div key={item.problem} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">🔴</span>
                    <div>
                      <div className="font-bold text-sm text-gray-800 mb-1">{item.problem}</div>
                      {item.cause !== "—" && (
                        <div className="text-xs text-gray-500 mb-1.5">原因: {item.cause}</div>
                      )}
                      <div className="text-xs text-green-700 bg-green-50 rounded px-2 py-1.5">
                        ✅ {item.solution}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
