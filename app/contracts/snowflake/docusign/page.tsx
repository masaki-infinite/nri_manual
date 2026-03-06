import Image from "next/image";
import Link from "next/link";

export default function DocusignPage() {
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
        Docusign 電子署名マニュアル
      </h2>

      <div className="prose max-w-none">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📘 このマニュアルについて
          </h3>
          <p className="text-blue-800 text-sm">
            このマニュアルでは、Docusignを使用した電子署名の作成から送信、
            署名完了までの一連の流れを解説します。
          </p>
        </div>

        {/* セクション1: Docusignとは */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            1. Docusignとは
          </h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Docusignは、世界中で使用されている電子署名サービスです。
              紙の契約書を印刷・郵送する代わりに、オンラインで署名を完了できます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-gray-800 mb-2">迅速</h4>
                <p className="text-sm text-gray-600">
                  数分で署名を完了し、契約プロセスを大幅に短縮
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">🔒</div>
                <h4 className="font-semibold text-gray-800 mb-2">安全</h4>
                <p className="text-sm text-gray-600">
                  暗号化技術で文書を保護し、法的効力を担保
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">🌍</div>
                <h4 className="font-semibold text-gray-800 mb-2">グローバル</h4>
                <p className="text-sm text-gray-600">
                  世界中どこからでもアクセス可能
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* セクション2: ログイン方法 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            2. ログイン方法
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Docusignのサイトにアクセス
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  サプライヤー様がNRI側の氏名を入力いただくと受け取ったNRI側では変更ができません。
                  <br />
                  （現在江口様のお名前です）ここを【廣卓郎】か【空欄のテキストボックス】に変更していただきたいです。
                </p>
                <div className="border rounded-lg overflow-hidden mt-3">
                  <Image
                    src="/images/contracts/snowflake/docusign/image1.png"
                    alt="Docusignログイン画面"
                    width={800}
                    height={400}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">
                  会社のメールアドレスでログイン
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  会社から付与されたメールアドレスとパスワードを入力します。
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <p className="text-yellow-800 text-sm">
                    ⚠️
                    初回ログイン時は、管理者から送られた招待メールのリンクからアクセスしてください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* セクション3: 文書の送信方法 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            3. 署名依頼文書の送信方法
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">
                  「送信」をクリック
                </h4>
                <p className="text-gray-600 text-sm">
                  ホーム画面の「送信」ボタンをクリックして、新しい署名依頼を開始します。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">
                  文書をアップロード
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  署名してもらいたい文書（PDF推奨）をドラッグ＆ドロップまたは「参照」ボタンからアップロードします。
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-blue-800 text-sm">
                    💡 ヒント: PDFファイルが最も互換性が高く推奨されます。
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">
                  受信者を追加
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  署名者のメールアドレスと名前を入力します。複数の署名者を追加する場合は、署名順序も設定できます。
                </p>
                <div className="bg-white border rounded p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">署名者1:</span>
                    <span className="text-gray-600">taro@company.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">署名者2:</span>
                    <span className="text-gray-600">hanako@company.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">
                  署名フィールドを配置
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  文書上で署名してもらいたい場所に署名フィールドをドラッグ＆ドロップします。
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                  <div className="bg-white border rounded p-2 text-center text-xs">
                    <div className="text-lg mb-1">✍️</div>
                    <div>署名</div>
                  </div>
                  <div className="bg-white border rounded p-2 text-center text-xs">
                    <div className="text-lg mb-1">📅</div>
                    <div>日付</div>
                  </div>
                  <div className="bg-white border rounded p-2 text-center text-xs">
                    <div className="text-lg mb-1">📝</div>
                    <div>テキスト</div>
                  </div>
                  <div className="bg-white border rounded p-2 text-center text-xs">
                    <div className="text-lg mb-1">☑️</div>
                    <div>チェックボックス</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                5
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">送信</h4>
                <p className="text-gray-600 text-sm">
                  すべての設定が完了したら「送信」ボタンをクリックします。
                  受信者にメールで通知が送信されます。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* セクション4: 署名方法 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            4. 文書への署名方法（受信者側）
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">
                  メールを確認
                </h4>
                <p className="text-gray-600 text-sm">
                  Docusignから「文書の確認とご署名のお願い」というメールが届きます。
                  メール内の「文書を確認」ボタンをクリックします。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">
                  文書内容を確認
                </h4>
                <p className="text-gray-600 text-sm">
                  文書の内容をよく読み、問題がないか確認します。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">
                  署名を追加
                </h4>
                <p className="text-gray-600 text-sm mb-3">
                  黄色でハイライトされた署名フィールドをクリックし、署名を追加します。
                </p>
                <div className="bg-white border rounded p-4">
                  <p className="text-sm text-gray-700 mb-2 font-medium">
                    署名の種類:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>手書き: マウスやタッチパネルで直接描画</li>
                    <li>タイプ: キーボードで入力（自動でフォント適用）</li>
                    <li>画像: 事前に作成した署名画像をアップロード</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">完了</h4>
                <p className="text-gray-600 text-sm">
                  すべての必須フィールドに入力したら「完了」ボタンをクリックします。
                  署名済み文書のコピーがメールで送信されます。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* セクション5: よくある質問 */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            5. よくある質問（FAQ）
          </h3>
          <div className="space-y-4">
            <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
              <summary className="font-semibold text-gray-800 cursor-pointer">
                Q: 署名済み文書はどこで確認できますか？
              </summary>
              <p className="text-gray-600 text-sm mt-3">
                A: Docusignにログイン後、「管理」タブから「完了済み」フォルダを開くと、
                すべての署名済み文書を確認できます。また、署名完了時にメールでも送信されます。
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
              <summary className="font-semibold text-gray-800 cursor-pointer">
                Q: 署名依頼をキャンセルできますか？
              </summary>
              <p className="text-gray-600 text-sm mt-3">
                A: はい、可能です。「管理」タブから該当の文書を開き、
                右上の「その他」メニューから「無効化」を選択してください。
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
              <summary className="font-semibold text-gray-800 cursor-pointer">
                Q: 署名者が文書に署名してくれない場合は？
              </summary>
              <p className="text-gray-600 text-sm mt-3">
                A:
                リマインダーを送信できます。該当文書を開き、「リマインダーを送信」をクリックしてください。
                また、自動リマインダーを設定することも可能です。
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
              <summary className="font-semibold text-gray-800 cursor-pointer">
                Q: モバイルデバイスからも署名できますか？
              </summary>
              <p className="text-gray-600 text-sm mt-3">
                A: はい、Docusignのモバイルアプリ（iOS/Android）をインストールすることで、
                スマートフォンやタブレットからも署名できます。
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
              <summary className="font-semibold text-gray-800 cursor-pointer">
                Q: 電子署名は法的に有効ですか？
              </summary>
              <p className="text-gray-600 text-sm mt-3">
                A: はい、日本を含む多くの国で電子署名は法的に有効です。
                Docusignは電子署名法に準拠しており、裁判でも証拠として認められます。
              </p>
            </details>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            ⚠️ 重要な注意事項
          </h3>
          <ul className="text-red-800 text-sm space-y-2 list-disc list-inside">
            <li>機密情報を含む文書は必ず適切なアクセス権限を設定してください</li>
            <li>
              署名依頼を送信する前に、受信者のメールアドレスが正しいか必ず確認してください
            </li>
            <li>重要な契約書は法務部のレビューを受けてから送信してください</li>
            <li>
              個人のDocusignアカウントは使用せず、必ず会社アカウントを使用してください
            </li>
          </ul>
        </div>

        {/* サポート情報 */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            🆘 サポートが必要な場合
          </h3>
          <p className="text-green-800 text-sm mb-3">
            Docusignの使用方法で不明点がある場合は、以下にお問い合わせください：
          </p>
          <div className="space-y-2 text-green-800 text-sm">
            <p>
              <strong>社内ヘルプデスク:</strong> helpdesk@company.com
            </p>
            <p>
              <strong>内線:</strong> 1234
            </p>
            <p>
              <strong>営業時間:</strong> 平日 9:00-18:00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
