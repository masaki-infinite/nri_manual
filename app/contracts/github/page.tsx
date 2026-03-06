"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import * as XLSX from "xlsx";

export default function GitHubPage() {
  const [miroUrl, setMiroUrl] = useState("");
  const [excelData1, setExcelData1] = useState<any[][]>([]);
  const [excelData2, setExcelData2] = useState<any[][]>([]);
  const [selectedFile, setSelectedFile] = useState<"pdf" | "excel1" | "excel2">("pdf");

  useEffect(() => {
    const stored = localStorage.getItem("github_contracts_miro");
    if (stored) {
      setMiroUrl(stored);
    }
  }, []);

  const saveMiroUrl = (url: string) => {
    localStorage.setItem("github_contracts_miro", url);
    setMiroUrl(url);
  };

  const loadExcelFile = async (filePath: string, setData: (data: any[][]) => void) => {
    try {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setData(data as any[][]);
    } catch (error) {
      console.error("Excelファイルの読み込みエラー:", error);
    }
  };

  useEffect(() => {
    if (selectedFile === "excel1" && excelData1.length === 0) {
      loadExcelFile("/xlsx/asleadサービス_申込書（ＮＲＩデジタル株式会社様）.xlsx", setExcelData1);
    } else if (selectedFile === "excel2" && excelData2.length === 0) {
      loadExcelFile("/xlsx/申込書補足情報（ＮＲＩデジタル株式会社様）.xlsx", setExcelData2);
    }
  }, [selectedFile, excelData1.length, excelData2.length]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        GitHub関連マニュアル
      </h2>

      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          GitHubに関連する契約関係やアカウント管理のマニュアルをまとめています。
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
            📋 案件登録
          </h3>
          <a>https://www.notion.so/aslead/GitHub-2656b174cec0802a9568d997ce34960e</a>
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="border-l-4 border-indigo-600 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                名刺管理
              </h4>
              <p className="text-gray-600 text-sm">
            法人番号や社員数はネットで検索して入力
              </p>
            </div>

            <div className="border-l-4 border-indigo-600 pl-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                取引先管理
              </h4>
              <p className="text-gray-600 text-sm mb-2">
                会社の組織アカウント: <code className="bg-gray-200 px-2 py-1 rounded">@company-org</code>
              </p>
              <p className="text-gray-600 text-sm">
                すべてのプロジェクトは組織アカウント配下で管理してください。
                個人アカウントでの開発は避けてください。
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            👤 与信
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">
                  個人GitHubアカウントの作成
                </h4>
                <p className="text-gray-600 text-sm">
                  <a
                    href="https://nrigsp.service-now.com/now/nav/ui/classic/params/target/sn_shop_proc_business_partner_list.do%3Fsysparm_query%3Du_proc_examination_result!%3D%26sysparm_view%3Dbusiness_partner?sysparm_query=u_proc_examination_result!%3D&sysparm_view=business_partner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700 underline"
                  >
                    PROCheck（取引先審査システム）ログイン
                  </a><br />
                  企業の名前があればOK
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            🔐 見積書作成
          </h3>
          <div className="space-y-6">
            {/* 手順1 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-indigo-600 text-white px-5 py-3">
                <h4 className="font-semibold text-lg">手順1: 見積書・申込書作成依頼</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="space-y-3">
                  <p className="text-gray-700 font-medium">外販</p>
                  <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside">
                    <li>Github価格表において現在の為替の料金で計算する</li>
                    <li>
                      <a 
                        href="https://azure.microsoft.com/ja-jp/pricing/details/githubenterprise/?msockid=0ca18efaa0386bef3f3a9872a1996a99#pricing" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-indigo-600 hover:text-indigo-800 underline font-semibold"
                      >
                        GitHub Enterprise の価格
                      </a>
                      <div className="ml-6 mt-1 text-xs text-gray-500">
                        リージョンは東日本、通貨は円を選択する
                      </div>
                    </li>
                  </ul>
                  <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
                    <p className="text-blue-800 text-sm">
                      <strong>ポイント:</strong> Github価格表からNRI_技術サポート付き.xlsxを作成
                    </p>
                  </div>

                  {/* 区切り線 */}
                  <hr className="my-6 border-t-2 border-gray-300" />

                  {/* グループ会社セクション */}
                  <div className="mt-6">
                    <h4 className="text-gray-700 font-medium text-lg mb-3">グループ会社</h4>
                    <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside">
                      <li>GitHub価格表においては<a href="https://helpdesk.aslead.cloud/wiki/portal/ja/%E3%82%BD%E3%83%AA%E3%83%A5%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E4%B8%80%E8%A6%A7%E3%83%BB%E3%83%9E%E3%83%8B%E3%83%A5%E3%82%A2%E3%83%AB/github-copilot%EF%BC%88ai%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0%EF%BC%89/%E6%96%99%E9%87%91%E3%80%90github-copilot%E3%80%91" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline font-semibold">料金【GitHub Copilot】</a>のものを使用すること</li>
                      <li>内部承認プロセスを確認</li>
                    </ul>

                    {/* テンプレート表示 */}
                    <div className="mt-4 bg-gray-50 border border-gray-300 rounded-lg p-4">
                      <h5 className="text-sm font-semibold text-gray-700 mb-3">📋 入力テンプレート</h5>
                      <div className="bg-white border border-gray-200 rounded p-4 text-xs font-mono text-gray-800 whitespace-pre-wrap overflow-x-auto">
{`GitHub Copilot／ＮＲＩデータｉテック
専決決裁、正式見積書作成、更新、申込書作成

顧客社名：ＮＲＩデータｉテック
案件名　：NRI技術サポート付 GitHub Copilot（新規）
見積金額　：264,600円
仕入コスト：252,000円
納品日　：空欄
納品場所：空欄
作業期間：空欄
御支払い条件：利用開始月翌月末請求、翌々月末支払
見積有効期限：2026年01月31日
見積もり根拠：価格表に基づく提示

＜内訳欄（複数ある場合は製品数分＞
・【月額固定費】NRI技術サポート付きGitHub Enterprise_新規 5：単価4,410円,Users：266,400円
　2026年01月01日 ～ 2026年12月31日

＜特記事項尾事項＞
「申込みの際は、本申込書に加え別途「申込書補足情報」のご提出をお願いいたします」

＜特約事項＞
特約事項は定型文言でお願いいたします。`}
                      </div>
                      <button
                        onClick={() => {
                          const text = `GitHub Copilot／ＮＲＩデータｉテック
専決決裁、正式見積書作成、更新、申込書作成

顧客社名：ＮＲＩデータｉテック
案件名　：NRI技術サポート付 GitHub Copilot（新規）
見積金額　：264,600円
仕入コスト：252,000円
納品日　：空欄
納品場所：空欄
作業期間：空欄
御支払い条件：利用開始月翌月末請求、翌々月末支払
見積有効期限：2026年01月31日
見積もり根拠：価格表に基づく提示

＜内訳欄（複数ある場合は製品数分＞
・【月額固定費】NRI技術サポート付きGitHub Enterprise_新規 5：単価4,410円,Users：266,400円
　2026年01月01日 ～ 2026年12月31日

＜特記事項尾事項＞
「申込みの際は、本申込書に加え別途「申込書補足情報」のご提出をお願いいたします」

＜特約事項＞
特約事項は定型文言でお願いいたします。`;
                          navigator.clipboard.writeText(text);
                          alert('テンプレートをクリップボードにコピーしました');
                        }}
                        className="mt-3 px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
                      >
                        📋 コピー
                      </button>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src="/images/contracts/github/image4.png" 
                    alt="見積書・申込書作成依頼画面"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            {/* 手順2 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-indigo-600 text-white px-5 py-3">
                <h4 className="font-semibold text-lg">手順2: 起案</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="space-y-3">
                  <p className="text-gray-700 font-medium">社員の人に起案してもらう</p>
                  <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside">
                    <li></li>
                  </ul>
                  <p className="text-gray-700 font-medium">正式見積書、申込書・申込書補足情報が届く</p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>注意:</strong> 
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <img 
                    src="/images/contracts/github/image5.png" 
                    alt="起案画面1" 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                  <img 
                    src="/images/contracts/github/image6.png" 
                    alt="起案画面2" 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* 手順3 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-indigo-600 text-white px-5 py-3">
                <h4 className="font-semibold text-lg">手順3:お客様にメールを送る </h4>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-700 font-medium">お客様にメールを送るときは資料3つが必要</p>
                  <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside">
                    <li>asleadサービス_申込書.xlsx</li>
                    <li>申込書補足情報.xlsx</li>
                    <li>正式見積書.pdf</li>
                  </ul>

                  {/* ファイル選択ボタン */}
                  <div className="flex gap-2 mt-6">
                    <button
                      onClick={() => setSelectedFile("pdf")}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedFile === "pdf"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      正式見積書.pdf
                    </button>
                    <button
                      onClick={() => setSelectedFile("excel1")}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedFile === "excel1"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      申込書.xlsx
                    </button>
                    <button
                      onClick={() => setSelectedFile("excel2")}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedFile === "excel2"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      補足情報.xlsx
                    </button>
                  </div>

                  {/* ファイル表示エリア */}
                  <div className="border border-gray-300 rounded-lg overflow-hidden mt-4">
                    {selectedFile === "pdf" && (
                      <iframe
                        src="/pdfs/contracts/github/正式見積書（ＮＲＩデジタル株式会社様）.pdf"
                        className="w-full"
                        style={{ height: "600px" }}
                      />
                    )}
                    {selectedFile === "excel1" && (
                      <div className="p-4 bg-gray-50">
                        <img 
                          src="/images/contracts/github/image8.png" 
                          alt="asleadサービス_申込書" 
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                    {selectedFile === "excel2" && (
                      <div className="p-4 bg-gray-50">
                        <img 
                          src="/images/contracts/github/image7.png" 
                          alt="申込書補足情報" 
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 手順4 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-indigo-600 text-white px-5 py-3">
                <h4 className="font-semibold text-lg">手順4: 申込書の原本と電子を送ってもらう</h4>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-700 font-medium">お客様に申込書を記入してもらい、返送してもらう</p>
                  <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside">
                    <li>記入済みの申込書を確認</li>
                    <li>必要事項が全て記載されているか確認</li>
                    <li>押印があるか確認</li>
                  </ul>
                  
                  {/* PDF表示 */}
                  <div className="border border-gray-300 rounded-lg overflow-hidden mt-4">
                    <iframe
                      src="/pdfs/contracts/github/image9.pdf"
                      className="w-full"
                      style={{ height: "600px" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 手順5 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-indigo-600 text-white px-5 py-3">
                <h4 className="font-semibold text-lg">手順5: 新規利用申請</h4>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <p className="text-gray-700 font-medium">申込書を社内で処理し、契約を完了させる</p>
                  <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside">
                    <li>AI生革に環境を作ってもらう</li>
                  </ul>
                  
                  {/* 新規利用申請リンク */}
                  <div className="mt-6">
                    <a
                      href="https://helpdesk.aslead.cloud/wiki/portal/ja/%E3%82%BD%E3%83%AA%E3%83%A5%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E4%B8%80%E8%A6%A7%E3%83%BB%E3%83%9E%E3%83%8B%E3%83%A5%E3%82%A2%E3%83%AB/github-copilot%EF%BC%88ai%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0%EF%BC%89/%E7%94%B3%E8%AB%8B%E3%83%BB%E5%B0%8E%E5%85%A5%E3%80%90github-copilot%E3%80%91/%E6%96%B0%E8%A6%8F%E5%88%A9%E7%94%A8%E7%94%B3%E8%AB%8B%E3%80%90github-copilot%E3%80%91"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 underline font-semibold"
                    >
                      新規利用申請【GitHub Copilot】
                    </a>
                  </div>

                  {/* サンプル文章 */}
                  <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 mb-3">申請サンプル</h5>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-[200px_1fr] gap-2">
                        <span className="text-gray-600 font-medium">利用プラン名</span>
                        <span className="text-gray-800">Liteプラン</span>
                      </div>
                      <div className="grid grid-cols-[200px_1fr] gap-2">
                        <span className="text-gray-600 font-medium">利用プロジェクトの所属事業本部</span>
                        <span className="text-gray-800">マルチクラウドインテグレーション事業本部</span>
                      </div>
                      <div className="grid grid-cols-[200px_1fr] gap-2">
                        <span className="text-gray-600 font-medium">利用プロジェクトの所属事業部署</span>
                        <span className="text-gray-800">aslead事業部</span>
                      </div>
                      <div className="grid grid-cols-[200px_1fr] gap-2">
                        <span className="text-gray-600 font-medium">Liteプラン 管理者</span>
                        <span className="text-gray-800">萩平 俊介</span>
                      </div>
                      <div className="grid grid-cols-[200px_1fr] gap-2">
                        <span className="text-gray-600 font-medium">GitHubカテゴリ名（ベース値）</span>
                        <span className="text-gray-800">asd-data</span>
                      </div>
                      <div className="grid grid-cols-[200px_1fr] gap-2">
                        <span className="text-gray-600 font-medium">GitHubカテゴリID（ベース値）</span>
                        <span className="text-gray-800">ASDDATA</span>
                      </div>
                      <div className="grid grid-cols-[200px_1fr] gap-2">
                        <span className="text-gray-600 font-medium">利用開始希望日</span>
                        <span className="text-gray-800">2026/02/01</span>
                      </div>
                      <div className="grid grid-cols-[200px_1fr] gap-2">
                        <span className="text-gray-600 font-medium">利用上の制約事項について</span>
                        <span className="text-gray-800">「利用上の制約事項」に同意します</span>
                      </div>
                      <div className="grid grid-cols-[200px_1fr] gap-2">
                        <span className="text-gray-600 font-medium">リクエストが作成されました</span>
                        <span className="text-gray-800">2026/01/23 19:11</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            📚 リポジトリ管理ルール
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                命名規則
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                リポジトリ名は以下の形式で命名してください：
              </p>
              <code className="bg-white px-3 py-2 rounded text-sm block">
                [project]-[component]-[type]
              </code>
              <p className="text-gray-500 text-xs mt-2">
                例: crm-frontend-app, analytics-api-service
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                ブランチ戦略
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                基本的なブランチ構成：
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <code className="bg-white px-2 py-1 rounded">main</code> - 本番環境</li>
                <li>• <code className="bg-white px-2 py-1 rounded">develop</code> - 開発環境</li>
                <li>• <code className="bg-white px-2 py-1 rounded">feature/*</code> - 機能開発</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                コードレビュー
              </h4>
              <p className="text-gray-600 text-sm">
                mainブランチへのマージには最低1名のレビュアー承認が必要です。
                プルリクエストには適切な説明を記載してください。
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-800 mb-2">
                README必須
              </h4>
              <p className="text-gray-600 text-sm">
                すべてのリポジトリにREADME.mdを作成し、
                プロジェクトの概要、セットアップ方法、使用方法を記載してください。
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
              href="https://docs.github.com/ja"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    GitHub公式ドキュメント
                  </h4>
                  <p className="text-gray-600 text-sm">
                    GitHubの使い方やベストプラクティス
                  </p>
                </div>
                <span className="text-indigo-600">→</span>
              </div>
            </a>

            <a
              href="https://docs.github.com/ja/authentication/securing-your-account-with-two-factor-authentication-2fa"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    2要素認証の設定方法
                  </h4>
                  <p className="text-gray-600 text-sm">
                    アカウントのセキュリティを強化
                  </p>
                </div>
                <span className="text-indigo-600">→</span>
              </div>
            </a>

            <a
              href="https://docs.github.com/ja/pull-requests"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    プルリクエストガイド
                  </h4>
                  <p className="text-gray-600 text-sm">
                    効果的なコードレビューのために
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
            GitHub関連でご不明な点がある場合は、以下にお問い合わせください：
          </p>
          <div className="space-y-2 text-blue-800 text-sm">
            <p>
              <strong>GitHub管理者:</strong> github-admin@company.com
            </p>
            <p>
              <strong>開発部:</strong> dev-support@company.com
            </p>
            <p>
              <strong>内線:</strong> 2345
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
