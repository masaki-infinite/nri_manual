export type PageSection = {
  id: string;
  label: string;
};

export const trainingPageSections: Record<string, PageSection[]> = {
  "/training/snowflake/intelligence": [
    { id: "agents", label: "Cortex Agents" },
    { id: "features", label: "主な機能" },
    { id: "stack", label: "スタックでの位置づけ" },
    { id: "comparison", label: "標準 UI vs カスタム" },
    { id: "links", label: "関連リンク" },
    { id: "summary", label: "まとめ" },
  ],
  "/training/snowflake/cortex-code": [
    { id: "interfaces", label: "インターフェース" },
    { id: "usecases", label: "ユースケース" },
    { id: "intelligence", label: "Intelligence との関係" },
    { id: "extensions", label: "拡張と連携" },
    { id: "approaches", label: "他アプローチとの比較" },
    { id: "cli", label: "CLI 利用例" },
    { id: "summary", label: "まとめ" },
  ],
  "/training/snowflake/adaptor": [
    { id: "auth", label: "認証方式" },
    { id: "pattern", label: "実装パターン" },
    { id: "env", label: "環境変数" },
    { id: "runtime", label: "他ランタイム" },
    { id: "summary", label: "まとめ" },
  ],
  "/training/snowflake/data-platform": [
    { id: "phases", label: "3 つのフェーズ" },
    { id: "layers", label: "機能レイヤー" },
    { id: "compare", label: "他基盤との比較" },
    { id: "why", label: "採用する理由" },
    { id: "patterns", label: "典型構成" },
    { id: "summary", label: "まとめ" },
  ],
  "/training/snowflake/geospatial": [
    { id: "overview", label: "概要" },
    { id: "data-types", label: "データ型・ファイル形式" },
    { id: "methods", label: "見る方法 6 選" },
    { id: "sql", label: "主要SQL" },
    { id: "stack", label: "可視化スタック" },
    { id: "carto-case", label: "Snowflake + CARTO 事例" },
    { id: "practice", label: "導入ステップ" },
    { id: "links", label: "参考リンク" },
  ],
  "/training/snowflake": [
    { id: "spcs", label: "SPCS の基本" },
    { id: "pages", label: "ページ一覧" },
    { id: "summary", label: "まとめ" },
  ],
  "/training/arcgis/enterprise": [
    { id: "overview", label: "概要" },
    { id: "lineup", label: "製品ラインナップ" },
    { id: "features", label: "主な機能" },
    { id: "compare", label: "Online との違い" },
    { id: "infra", label: "インフラ" },
    { id: "position", label: "閉域案件での位置づけ" },
  ],
  "/training/arcgis/layer": [
    { id: "basics", label: "レイヤの基本" },
    { id: "arch", label: "全体構成" },
    { id: "position", label: "典型的な構成" },
    { id: "snowflake", label: "Snowflake 連携" },
    { id: "hosted-vs-ref", label: "Hosted vs 参照" },
    { id: "types", label: "レイヤ種別" },
    { id: "flow", label: "作成から利用まで" },
  ],
  "/training/arcgis/import": [
    { id: "overview", label: "全体像" },
    { id: "formats", label: "データ形式" },
    { id: "paths", label: "取り込み経路" },
    { id: "agol", label: "Online 手順" },
    { id: "exb", label: "Experience Builder" },
    { id: "qa", label: "品質チェック" },
    { id: "example", label: "実装例" },
  ],
  "/training/claude-code": [
    { id: "models", label: "モデル" },
  ],
  "/training/claude-code/models": [
    { id: "lineup", label: "モデル比較" },
    { id: "selection", label: "選び方" },
    { id: "effort", label: "Effort 設定" },
    { id: "links", label: "詳細ページ" },
  ],
  "/training/claude-code/models/opus-4-8": [
    { id: "overview", label: "概要" },
    { id: "features", label: "主な特徴" },
    { id: "claude-code", label: "Claude Code での使い方" },
    { id: "pricing", label: "料金" },
    { id: "when", label: "使い分け" },
  ],
  "/training/claude-code/models/fable": [
    { id: "overview", label: "概要" },
    { id: "capabilities", label: "できること" },
    { id: "safeguards", label: "セーフガード" },
    { id: "claude-code", label: "Claude Code での使い方" },
    { id: "pricing", label: "料金" },
    { id: "when", label: "使い分け" },
  ],
};
