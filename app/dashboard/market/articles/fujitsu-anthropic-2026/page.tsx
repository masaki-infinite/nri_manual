import Image from "next/image";
import Link from "next/link";

export default function FujitsuAnthropicArticlePage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* パンくず */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/dashboard/market" className="hover:text-indigo-600 transition-colors">
          市場インテリジェンス
        </Link>
        <span>›</span>
        <span className="text-gray-600">記事詳細</span>
      </nav>

      {/* ヘッダー */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
            富士通 × Anthropic
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">
            国内
          </span>
          <span className="text-xs text-gray-400">2026年05月29日</span>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">fujitsu.com</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 leading-snug mb-4">
          サイバー防衛が「属人化した職人技」から「人×AIの組織戦」に変わる号砲、富士通が鳴らした。
        </h1>
      </div>

      {/* メイン画像 */}
      <div className="mb-8 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
        <Image
          src="/images/fujitsu.png"
          alt="富士通 × Anthropic 戦略的パートナーシップ インフォグラフィック"
          width={800}
          height={1100}
          className="w-full h-auto"
          unoptimized
        />
      </div>

      {/* 本文 */}
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-5">
        <p>
          富士通が、米Anthropicと戦略的パートナーシップを締結🔥{" "}
          全社員約10万人にClaudeを展開するだけでなく、1,000人規模のエンジニアチームを編成して顧客現場に送り込み、専門人材依存の属人的サイバー防衛を「人とAIが協業して迅速対応する次世代セキュリティ運用モデル」へ進化させる、というのが今回の本丸。
          AnthropicのCCO Paul Smith氏が「日本市場における最も重要なAI取り組みのひとつ」と名指しした提携です。
        </p>

        <p className="font-semibold text-gray-800">
          経営企画・CISO・情シス・SIer・MSSP・セキュリティ責任者の方は絶対にブクマして。
        </p>

        <h2 className="text-lg font-bold text-gray-800 mt-8 mb-3">押さえるべき5点</h2>

        <ul className="space-y-4 list-none pl-0">
          <li className="pl-4 border-l-4 border-indigo-300">
            <span className="font-semibold text-gray-800">
              1,000人規模のエンジニアチームを編成して顧客に届ける
            </span>{" "}
            — AnthropicのCCO Paul Smith氏が直接言及した数字。10万人の社内活用は「入口」にすぎず、その知見を1,000人のエンジニア部隊が顧客企業へ実装するのが今回の設計。社内検証→外部展開のラインが人数規模で裏付けられている
          </li>
          <li className="pl-4 border-l-4 border-indigo-300">
            <span className="font-semibold text-gray-800">
              Forward Deployed Engineer（FDE）モデルをClaudeで強化
            </span>{" "}
            — FDEとはエンジニアが顧客の現場に入り込み、AIのユースケース設計→実装→定着までを伴走する取り組み。富士通はPalantirなどとの提携でFDEの実践知を蓄積済み。そこにClaude＋Fujitsu Kozuchi＋Takaneを組み合わせ、顧客のデータ主権・規制対応・セキュリティ・性能要件に応じてAIを使い分ける
          </li>
          <li className="pl-4 border-l-4 border-indigo-300">
            <span className="font-semibold text-gray-800">
              人とAIが協業するサイバー防御への転換
            </span>{" "}
            — ここが今回の角度の核心。専門人材に依存した属人的なサイバー防衛から脱却し、人とAIが協業して迅速に対応する運用モデルへ。ミッションクリティカル領域でAI活用と防御を両立させる方針で、慢性的なセキュリティ人材不足を組織モデルそのものから解く狙い
          </li>
          <li className="pl-4 border-l-4 border-indigo-300">
            <span className="font-semibold text-gray-800">
              Takaneによる開発工程の協調自動化との連結
            </span>{" "}
            — 富士通は2026年2月、要件定義→設計→実装→結合テストまでをAIエージェントが協調実行するAIドリブン開発基盤をTakaneで発表済み。今回Claudeも組み込み開発生産性をさらに引き上げる。つまりFDEが現場で使う土台そのものがAIエージェント化されている
          </li>
          <li className="pl-4 border-l-4 border-indigo-300">
            <span className="font-semibold text-gray-800">
              社内実践で安全性・透明性・制御性を確立し顧客に還元
            </span>{" "}
            — 10万人の社内活用は単なる効率化ではなく、AIを安心・安全に使う技術と運用の検証の場。確立した標準アプローチを顧客に還元し、日本政府とも連携して社会全体のセキュリティ強化に生かすとしている
          </li>
        </ul>

        <h2 className="text-lg font-bold text-gray-800 mt-8 mb-3">法人視点での衝撃はこうだ…</h2>

        <p>
          これまで日本企業のサイバー防御は「優秀なセキュリティ人材を何人確保できるか」という属人ゲームだった。
          SOCもインシデント対応も、結局は少数の専門家のスキルと稼働に依存し、人材は採れない・辞める・燃え尽きる。
          これが構造的なボトルネックだった。
        </p>

        <p>
          今回の提携が突いているのは、まさにそこです。
          「人を増やす」のではなく「人×AIの協業モデルに作り変える」。
          富士通が10万人で自ら運用し、安全性・透明性・制御性を検証したうえで、1,000人のFDE部隊が顧客現場でその運用モデルごと実装する
          ——「ツールを売って終わり」ではなく「運用モデルを移植する」アプローチです。
        </p>

        <p>特に即効果が出る領域と実務上のポイント：</p>
        <ul className="space-y-2 list-disc pl-5">
          <li>
            慢性的なセキュリティ人材不足を「増員」ではなく「人×AI協業の運用設計」で解く選択肢が現実になる（重要インフラ・電力・通信・金融・医療・官公庁に特に刺さる）
          </li>
          <li>
            FDEモデルにより「製品導入」ではなく「現場定着まで伴走」の提案が受けられる
          </li>
          <li>
            Claude＋Kozuchi＋Takaneのマルチモデル前提で、データ主権・規制対応を理由にした導入見送りが減る
          </li>
          <li>
            属人的SOC運用の標準化を、自社で検証済みの外部運用モデルとして導入検討できる
          </li>
          <li>
            AIドリブン開発基盤と連結することで、防御だけでなく開発側の生産性も同時に底上げ
          </li>
        </ul>

        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mt-6">
          <p className="font-semibold text-indigo-800 mb-2">提携の本質</p>
          <p className="text-indigo-700">
            今回の提携の本質は「Claudeが使えるようになる」ではなく、サイバー防御という最も属人化していた領域を、人とAIの協業を前提とした組織モデルに再設計するという点にあります。
            守りの世界に「スケールする仕組み」が持ち込まれる構図です。
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mt-4">
          <p className="font-semibold text-yellow-800 mb-2">冷静に押さえるべき点</p>
          <p className="text-yellow-700">
            現時点では「目指す」段階の戦略方針であり、1,000人体制やFDEによるサイバー防御の効果は今後の実装で検証されるものです。
            導入効果を約束する発表ではない点は冷静に押さえてください。
            自社で評価する際は、属人運用のどの工程をAIに任せ、どこは人が判断を持つかの線引きから設計するのが現実的です。
          </p>
        </div>

        <div className="bg-gray-800 text-white rounded-xl p-5 mt-6">
          <p className="font-semibold text-white mb-2">今すぐやるべきこと</p>
          <p className="text-gray-200">
            CISO・情シス・経営企画は、自社のセキュリティ運用が「特定の人」に依存している工程を一度棚卸しし、人×AI協業モデルで再設計できる余地を今週中に洗い出しておくべき1本です。
          </p>
        </div>
      </div>

      {/* フッター */}
      <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-between">
        <Link
          href="/dashboard/market"
          className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← 市場インテリジェンスに戻る
        </Link>
        <a
          href="https://www.fujitsu.com/jp/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 hover:text-gray-600"
        >
          fujitsu.com ↗
        </a>
      </div>
    </div>
  );
}
