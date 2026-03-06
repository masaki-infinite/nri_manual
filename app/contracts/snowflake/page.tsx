import Link from "next/link";

export default function SnowflakePage() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Snowflake関連マニュアル
      </h2>

      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          Snowflakeに関連する契約関係のマニュアルをまとめています。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link href="/contracts/snowflake/docusign">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-4xl mb-4">✍️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Docusignマニュアル
              </h3>
              <p className="text-gray-600 text-sm">
                Docusignを使用した電子署名の手順とベストプラクティス
              </p>
              <div className="mt-4 text-indigo-600 text-sm font-medium">
                マニュアルを見る →
              </div>
            </div>
          </Link>

          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow opacity-50">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              その他のマニュアル
            </h3>
            <p className="text-gray-600 text-sm">今後追加予定</p>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📌 Snowflakeについて
          </h3>
          <p className="text-blue-800 text-sm">
            Snowflakeは当社の主要なデータウェアハウスプラットフォームです。
            契約や署名プロセスに関する重要な情報をこちらで管理しています。
          </p>
        </div>
      </div>
    </div>
  );
}
