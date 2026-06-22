import TrainingCardsWithSearch from "./TrainingCardsWithSearch";

export default function TrainingPage() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">勉強会</h2>
      <p className="text-gray-500 text-sm mb-8">
        キーワードで絞り込んでページを探せます。
      </p>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">📘 勉強会資料</h3>
        <TrainingCardsWithSearch />
      </section>
    </div>
  );
}
