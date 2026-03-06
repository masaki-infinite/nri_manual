"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function SnowflakeInternalPage() {
  const [miroUrl, setMiroUrl] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("snowflake_internal_miro");
    if (stored) {
      setMiroUrl(stored);
    }
  }, []);

  const saveMiroUrl = (url: string) => {
    localStorage.setItem("snowflake_internal_miro", url);
    setMiroUrl(url);
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/contracts/snowflake"
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
        >
          ← Snowflakeマニュアルに戻る
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Snowflake内販マニュアル
      </h2>

      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          Snowflake内販に関する契約関係やプロセスのマニュアルをまとめています。
        </p>

        {/* Miroボード */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📊 Miro ボード
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Miro埋め込みURL
              </label>
              <input
                type="text"
                value={miroUrl}
                onChange={(e) => saveMiroUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="https://miro.com/app/live-embed/..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Miroボードの「Share」→「Get embed code」からURLを取得してください
              </p>
            </div>
            {miroUrl && (
              <div className="border border-gray-300 rounded-lg overflow-hidden" style={{ height: "600px" }}>
                <iframe
                  src={miroUrl}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📋 契約プロセス
          </h3>
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="border-l-4 border-indigo-600 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                手順1: 要件確認
              </h4>
              <p className="text-gray-600 text-sm">
                お客様の要件を確認し、必要なSnowflakeのリソースを特定します。
              </p>
            </div>

            <div className="border-l-4 border-indigo-600 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                手順2: 見積もり作成
              </h4>
              <p className="text-gray-600 text-sm">
                確認した要件に基づいて見積もりを作成します。
              </p>
            </div>

            <div className="border-l-4 border-indigo-600 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                手順3: 契約締結
              </h4>
              <p className="text-gray-600 text-sm">
                見積もり承認後、契約書を作成し締結します。
              </p>
            </div>

            <div className="border-l-4 border-indigo-600 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                手順4: 環境構築
              </h4>
              <p className="text-gray-600 text-sm">
                契約完了後、Snowflake環境を構築し、お客様に提供します。
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            🔗 便利なリンク
          </h3>
          <div className="space-y-3">
            <a
              href="https://docs.snowflake.com/ja/"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Snowflake公式ドキュメント
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Snowflakeの使い方やベストプラクティス
                  </p>
                </div>
                <span className="text-indigo-600">→</span>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📞 お問い合わせ
          </h3>
          <p className="text-blue-800 text-sm mb-3">
            Snowflake内販でご不明な点がある場合は、以下にお問い合わせください：
          </p>
          <div className="space-y-2 text-blue-800 text-sm">
            <p>
              <strong>担当部署:</strong> 営業部
            </p>
            <p>
              <strong>メール:</strong> sales@company.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
