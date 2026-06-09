import Link from "next/link";

export default function SnowflakeSummit2026PlatformPage() {
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
          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-semibold">
            Snowflake Summit 2026
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">
            AIエージェント
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-medium">
            AI/機械学習
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-cyan-100 text-cyan-700 font-medium">
            snowflake
          </span>
          <span className="text-xs text-gray-400">2026年06月03日</span>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">brainpad.co.jp</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 leading-snug mb-4">
          ブレインパッドが現地から速報！Snowflake Summit 2026　AIのビジネス実装最前線：Platform Keynote
        </h1>
        <p className="text-sm text-gray-500">更新日：2026年06月04日</p>
      </div>

      {/* 執筆者 */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
        <h2 className="text-sm font-semibold text-gray-600 mb-4">本記事の執筆者</h2>
        <div className="space-y-5">
          <div className="border-b border-gray-200 pb-4">
            <p className="text-xs text-gray-500 font-medium mb-1">データサイエンティスト</p>
            <p className="font-bold text-gray-800">木村 真也 <span className="font-normal text-gray-500 text-sm">Masaya Kimura</span></p>
            <p className="text-xs text-gray-500 mt-1">株式会社ブレインパッド｜アナリティクスコンサルティングユニット｜リードデータサイエンティスト</p>
            <p className="text-sm text-gray-600 mt-2">
              ブレインパッドにデータサイエンティストとして入社後、金融・食品業界におけるDX推進組織の立ち上げに携わる。DX推進組織のビジョンやアクションプランの策定といった上流支援に加え、課題整理、分析、運用化までのデータ活用支援も担当。顧客のデータ活用人材の育成や社内コンペの主催など、データ/AI活用の民主化に向けた取り組みも実施。
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">データサイエンティスト</p>
            <p className="font-bold text-gray-800">中道 亮介 <span className="font-normal text-gray-500 text-sm">Nakamichi Ryosuke</span></p>
            <p className="text-xs text-gray-500 mt-1">株式会社ブレインパッド｜アナリティクスコンサルティングユニット / フィナンシャルインダストリーユニット｜シニアマネジャー／エグゼクティブデータサイエンティスト</p>
            <p className="text-sm text-gray-600 mt-2">
              2020年3月に株式会社ブレインパッドに入社。前職は大手SIerにて8年ほど勤務、オンプレ基盤構築やシステム開発業務に携わる。ブレインパッドでは広告分析・金融業界の法人分析・需要予測・自然言語分析などに携わる。
            </p>
          </div>
        </div>
      </div>

      {/* リード文 */}
      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed space-y-5">
        <p>
          米国サンフランシスコで開催中の「Snowflake Summit 2026」。Day2の本日は、昨日の盛況ぶりの影響からか、開始1時間以上前から会場前が早くも熱気に包まれていました。
        </p>
        <p>
          そんな期待感の中で幕を開けたDay2は、午前のPlatform Keynoteが主役の一日となりました。冒頭では共同創業者のBenoit Dageville氏がSnowflakeのアーキテクチャの原点を振り返り、続いてEVP of ProductのChristian Kleinerman氏が登壇。製品の最新発表とライブデモ、そしてUnder Armour、Samsungといった先進ユーザーとの対談が次々と披露されました。
        </p>

        {/* 目次 */}
        <nav className="bg-gray-50 border border-gray-200 rounded-xl p-5 not-prose">
          <h2 className="text-sm font-bold text-gray-700 mb-3">目次</h2>
          <ol className="space-y-1 text-sm text-indigo-600">
            <li><a href="#updates" className="hover:underline">Platform Keynoteで披露されたアップデート</a>
              <ol className="ml-4 mt-1 space-y-1 list-decimal list-inside text-gray-600 text-xs">
                <li><a href="#act1" className="hover:underline">ACT 1：THE ERASURE OF FRICTION</a></li>
                <li><a href="#act2" className="hover:underline">ACT 2：THE BASTION OF TRUST</a></li>
                <li><a href="#act3" className="hover:underline">ACT 3：THE LIBERATION OF DATA</a></li>
                <li><a href="#act4" className="hover:underline">ACT 4：THE OMNIPRESENCE OF INTELLIGENCE</a></li>
              </ol>
            </li>
            <li><a href="#brainpad" className="hover:underline">ブレインパッドが特に注目した進化とビジネスへの接続</a>
              <ol className="ml-4 mt-1 space-y-1 list-decimal list-inside text-gray-600 text-xs">
                <li><a href="#cowork" className="hover:underline">Snowflake Intelligenceの進化：専属ワークエンジン"CoWork"</a></li>
                <li><a href="#context" className="hover:underline">Horizon ContextとCortex Sense</a></li>
                <li><a href="#governance" className="hover:underline">ガバナンス境界の中で動く</a></li>
                <li><a href="#runtime" className="hover:underline">Snowflake Runtime</a></li>
              </ol>
            </li>
            <li><a href="#swag" className="hover:underline">Summit会場で入手したSwagたち</a></li>
            <li><a href="#extra" className="hover:underline">おまけ</a></li>
            <li><a href="#conclusion" className="hover:underline">おわりに</a></li>
          </ol>
        </nav>

        {/* Platform Keynoteアップデート */}
        <h2 id="updates" className="text-xl font-bold text-gray-800 mt-10 mb-4">
          Platform Keynoteで披露されたアップデート
        </h2>
        <p>
          冒頭、EVP of ProductのChristian氏から、Snowflakeの根幹である「3つの基本原則（データ・コンピュート・ユーザーの統合）」と、データサイロ化の歴史が語られました。現在はAIエージェントを活用する「エージェンティック・エンタープライズ」の時代ですが、AI専用の独立したシステム（孤立したAIスタック）を組むことは、過去のサイロ化の過ちを繰り返し、ガバナンスの崩壊を招くと警告されています。
        </p>
        <p>
          「データがAIを賢くし、AIがデータを高速・シンプルにする」という単一プラットフォームの優位性を示したうえで、Christian氏による「魔法のようなAI機能（ACT1〜4）」の発表へと鮮やかに繋がっていきました。
        </p>
        <p>今回のアップデートで特に記憶に残ったのは、既存の2つのサービスの改名でした。</p>
        <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 not-prose">
          <ul className="space-y-2 text-sm text-gray-700">
            <li><span className="font-semibold">「Snowflake Cortex Code」</span> → <span className="font-semibold text-sky-700">「Snowflake CoCo」</span><br/><span className="text-xs text-gray-500">ユーザー間で自然に広まった愛称を元に改名</span></li>
            <li><span className="font-semibold">「Snowflake Intelligence」</span> → <span className="font-semibold text-sky-700">「Snowflake CoWork」</span><br/><span className="text-xs text-gray-500">ツールの適用範囲が当初の想定よりもはるかに広範になることで変更</span></li>
          </ul>
        </div>

        {/* ACT 1 */}
        <h3 id="act1" className="text-lg font-bold text-gray-800 mt-8 mb-3">
          ACT 1：THE ERASURE OF FRICTION
        </h3>
        <p>
          第1幕では、データを扱うあらゆる場面から摩擦を取り除くことにフォーカスしていました。データの取り込みから処理、アプリ化までの各レイヤで続々と新機能が発表される中、以下の機能に目がとまりました。
        </p>
        <ul className="space-y-2 list-none pl-0">
          <li className="pl-4 border-l-4 border-sky-300">
            <span className="font-semibold">Cortex Training</span>：基盤モデルのファインチューニングや強化学習をフルマネージドで実現
          </li>
          <li className="pl-4 border-l-4 border-sky-300">
            <span className="font-semibold">Snowsight Pipeline Builder</span>：パイプラインを視覚的に組み立て・編集
          </li>
          <li className="pl-4 border-l-4 border-sky-300">
            <span className="font-semibold">Snowflake Runtime</span>：Node.jsやReactアプリをそのまま実行
          </li>
        </ul>
        <p>
          Cortex Trainingは、汎用AIの精度向上が目覚ましい中、どれほどモデルが強力になるかを実際に試してみたいと思いました。Snowflake Runtimeについては後述しますが、Streamlit以外の出口に注力している方向性に期待を寄せています。
        </p>

        {/* ACT 2 */}
        <h3 id="act2" className="text-lg font-bold text-gray-800 mt-8 mb-3">
          ACT 2：THE BASTION OF TRUST
        </h3>
        <p>
          データの保護にとどまらず、エージェントの振る舞いやコストまで含めて「安心して任せられる」状態づくりも、1日目から続く共通のテーマのようです。
        </p>
        <ul className="space-y-2 list-none pl-0">
          <li className="pl-4 border-l-4 border-emerald-300">
            <span className="font-semibold">Horizon Catalog</span>：ガバナンスの中核。守りたい意図を言葉で宣言すると分類やポリシーを自動適用するintent-driven governanceを追加
          </li>
          <li className="pl-4 border-l-4 border-emerald-300">
            <span className="font-semibold">Horizon Context</span>：各所のシグナルを集めてエンリッチし、CoCo・CoWork・各種エージェントへ文脈を渡す
          </li>
        </ul>
        <p>
          セマンティックレイヤの重要性が至るところで言及される中で、コンテキストの整備にかかる負荷は依然として高いままであり、その問題を解決する一手になることを願っています。
        </p>

        {/* ACT 3 */}
        <h3 id="act3" className="text-lg font-bold text-gray-800 mt-8 mb-3">
          ACT 3：THE LIBERATION OF DATA
        </h3>
        <p>
          組織やプラットフォームを越えてデータを「動かさずに」つなぐ仕組みも大きく前進しました。共有・連携まわりの主な3つを取り上げます。
        </p>
        <ul className="space-y-3 list-none pl-0">
          <li className="pl-4 border-l-4 border-violet-300">
            <span className="font-semibold">リシェアリング</span>：これまでは共有されたデータをさらに別の相手へ共有しようとすると弾かれていました。今回これがGAとなり、制約なく再共有できるようになりました。
          </li>
          <li className="pl-4 border-l-4 border-violet-300">
            <span className="font-semibold">オープンシェアリング</span>：IcebergとIceberg RESTカタログを活用し、Snowflakeを使っていない相手にもデータを公開できる仕組み（パブリックプレビュー）。
          </li>
          <li className="pl-4 border-l-4 border-violet-300">
            <span className="font-semibold">ゼロコピーパートナーシップ</span>：SaaSなどに溜まったデータをコピーせずSnowflake側から扱える連携。Salesforceに続きWorkday・IBM watsonx.dataへ拡大。SAP連携はGAに到達。
          </li>
        </ul>
        <p>
          これらは、データのサイロ化を生んできた境界を、いずれもコピーなしで越えさせるものです。「社内にデータを集約する」ことから、ソース側に統制を残したまま社内外とデータを共有・流通させる形へ変わっていくと感じています。
        </p>

        {/* ACT 4 */}
        <h3 id="act4" className="text-lg font-bold text-gray-800 mt-8 mb-3">
          ACT 4：THE OMNIPRESENCE OF INTELLIGENCE
        </h3>
        <p>
          最後に、ここまでの要素を束ねるパーソナルなワークエンジンとしてのCoWorkです。一人ひとりに付く専属エージェントの「精度」と「ガバナンス」の進化に言及していました。
        </p>
        <ul className="space-y-2 list-none pl-0">
          <li className="pl-4 border-l-4 border-orange-300">
            <span className="font-semibold">Cortex Sense</span>：エージェントに渡すコンテキストを自動でかき集め、精度向上を実現するランタイム機能
          </li>
          <li className="pl-4 border-l-4 border-orange-300">
            <span className="font-semibold">Natomaの買収</span>：CoCoやCoWorkを100以上の社内外システムへ安全に接続
          </li>
        </ul>
        <p>
          後半には、SamsungのJohn Suh氏が登壇し、Galaxy S26のローンチを支えるCoWork上のエージェント「SIA」と、AIで業務プロセスそのものを作り替える"AX"を紹介。データ職ではない約1,000人の経営層・営業・マーケティング担当が日常的に使っているという規模感が、利用者像の広がりを物語っていました。
        </p>

        {/* 関連記事 */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 not-prose">
          <h2 className="text-sm font-bold text-gray-700 mb-3">関連記事</h2>
          <div className="flex items-start gap-2 text-sm">
            <span className="text-gray-400 text-xs mt-0.5">2026.06.02</span>
            <div>
              <Link href="/dashboard/market/articles/snowflake-summit-2026-opening" className="text-indigo-600 hover:underline font-medium">
                ブレインパッドが現地から速報！Snowflake Summit 2026　AIのビジネス実装最前線：Opening Keynote
              </Link>
              <div className="flex gap-1 mt-1">
                <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">AIエージェント</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">AI/機械学習</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-700">snowflake</span>
              </div>
            </div>
          </div>
        </div>

        {/* ブレインパッドの注目ポイント */}
        <h2 id="brainpad" className="text-xl font-bold text-gray-800 mt-10 mb-4">
          ブレインパッドが特に注目した進化とビジネスへの接続
        </h2>

        <h3 id="cowork" className="text-lg font-bold text-gray-800 mt-6 mb-3">
          Snowflake Intelligenceの進化：専属ワークエンジン"CoWork"
        </h3>
        <p>
          CoWorkは「質問に答えるだけの道具」から「一人ひとりに付く専属ワークエンジン」へと位置づけを変えました。マルチエージェントの振り分け、ユーザーメモリ、スケジュール実行、そしてメールやSlackとの連携（MCP経由）が加わっています。
        </p>
        <p>
          デモでは、自動実行とMCP連携により、毎朝6時にブリーフがメールで届き、分析結果がSlackに共有される様子が示されました。ユーザーが外部ツールも含めて自ら情報を取りに行くだけでなく、必要な情報が向こうから届く——その両方向を備えた設計になっていた点が印象的です。
        </p>
        <p>
          現状、業務部門ではM365 Copilotなどがすでに浸透している企業も多く、使い方の棲み分けは論点になりますが、必要なデータへのアクセス性とガバナンスの近さでは、CoWorkに分があると感じます。一方で、全社員がSnowflakeを日常的に使う世界には、まだ距離があるのも正直なところです。
        </p>

        <h3 id="context" className="text-lg font-bold text-gray-800 mt-6 mb-3">
          Horizon ContextとCortex Sense：コンテキストの充実と管理の課題
        </h3>
        <p>
          AIに渡す文脈の質を底上げする仕掛けとして、Horizon Contextが紹介されました。Horizon Catalogの一部として、各所のシグナルを集めてエンリッチし、CoCo・CoWork・Cortex agentsに渡すものです。従来から議論されてきたセマンティックレイヤを、運用しやすい形で補強する位置づけと理解しました。
        </p>
        <p>
          あわせて発表されたCortex Senseは、データ・ビジネス定義・運用知識を自動で束ね、エージェントの精度を底上げするとのこと。「CoCo/CoWorkで24%だった精度が、Cortex Senseありで83%まで上がる」という数値が示されました。ただしこれは「すべてのモデルに効くわけではない」「コーディングエージェントの文脈での比較」といった但し書きの付いた数値であり、この差がどんな条件で再現するのかは半信半疑なのが正直なところです。
        </p>
        <p>
          セマンティックレイヤの補強そのものは歓迎ですが、肝心なのは「このコンテキストを誰が生み出し、誰が直し、どう承認して回すのか」という人の運用設計です。これを組織内で定着させるためのオーナーシップとレビュー設計は依然として重要度が高いと感じます。
        </p>

        <h3 id="governance" className="text-lg font-bold text-gray-800 mt-6 mb-3">
          ガバナンス境界の中で動く：データと行動に対する制御
        </h3>
        <p>
          ガバナンスのデモは、CoWorkの画面上で行われました。営業オペレーション担当としてVIPの連絡先一覧を求めると値はマスクされ、データを外部ステージへエクスポートしようとするとdata movement policyに弾かれる。登壇者が「これはユーザーエラーでもAIエラーでもなく、ポリシーによる正規のブロックだ」と言い切った瞬間が象徴的でした。LLMが「出そう」と判断しても、実行時にデータ層で決定論的に手が止まる設計です。
        </p>
        <p className="pl-4 border-l-4 border-red-200 italic text-gray-700 text-sm">
          なんの制約もない中でClaude Codeなどを実行したことによる事故は多発していますが、それをSnowflakeのガバナンスを利かせられる点は非常に魅力的でした。
        </p>
        <p>
          そしてこの境界を外部システムまで広げるのが、Opening Keynoteでも発表されたNatomaの買収です。NatomaはMCPゲートウェイで、エージェントが社外のSaaSやAPIを叩く際に、誰が要求し・どの権限で・許可してよいかをtool-call単位で検証し、監査まで残します。規制の厳しい企業でもエージェント活用を本番投入しやすくなると考えています。
        </p>

        <h3 id="runtime" className="text-lg font-bold text-gray-800 mt-6 mb-3">
          Snowflake Runtime：Streamlitを超えて、Reactアプリがデータの真横で動く
        </h3>
        <p>
          これまでSnowflakeでは「データアプリの出口はStreamlit」が推されていた印象がありましたが、コーディングのハードルが下がった今、Streamlitだけでは正直物足りない場面も増えてきました。今回発表されたSnowflake Runtimeは、Node.jsを実行でき（Pythonも近日）、フルのReactアプリをSnowflake上で動かせるというものです。デプロイはsnow app deployの一発。あわせてStreamlit HostingのGAも発表されました。
        </p>
        <p>
          これまで分析チームと、それを業務アプリに仕立てる開発チームの間にあったハンドオフが消え、PoCから本番までの谷が一層浅くなります。CoCoとの組み合わせで「何を作りたいかを記述するとCoCoがアプリを生成し、Runtimeがガバナンス境界の内側に配る」という流れです。
        </p>
        <p>
          ただ、現状はpublic previewでReactは動くがPythonは近日公開という段階で、TypeScriptのNext.jsとPythonを組み合わせたフルスタック開発を実現するにはもう一歩、という温度感でした。
        </p>

        {/* Swag */}
        <h2 id="swag" className="text-xl font-bold text-gray-800 mt-10 mb-4">
          Summit会場で入手したSwagたち
        </h2>
        <p>
          Platform Keynote終了後はブースを中心に会場を回りました。会場で集めるSwag（ノベルティ）も、Summitの楽しみのひとつです。今年は全体的に昨年より一段と豪華に感じました。
        </p>
        <p>
          特に印象に残ったのが、Olympic Zoneのバスケットボール・フリースローチャレンジです。シュートを決めて（結果的には抽選によって）Snowflake仕様のバスケットボールを獲得しました。使わずに取っておこうと思います。
        </p>
        <p>
          会場のグッズ売り場でもいくつか買い求め、各社のブースでは企業オリジナルのグッズも受け取りました。歩きながらおみやげが増えていくのも、会場を回る楽しみでした。
        </p>

        {/* おまけ */}
        <h2 id="extra" className="text-xl font-bold text-gray-800 mt-10 mb-4">おまけ</h2>
        <p>
          最新テックの発表はもちろんですが、現地での熱い交流もSnowflake Summitの大きな醍醐味。会場では参加者の皆さまと意気投合し、光栄なことに一緒に記念写真を撮影させていただく場面もありました。画面越しでは味わえないこのリアルな熱気と繋がりこそ、現地参加ならではの最高のお土産です。
        </p>
      </div>
    </div>
  );
}
