import TrainingSectionLayout from "../components/TrainingSectionLayout";
import { arcgisTocItems } from "./arcgisToc";

export default function ArcGisTrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TrainingSectionLayout
      items={arcgisTocItems}
      accent={{
        active: "bg-cyan-100 text-cyan-800 font-semibold",
        idle: "text-gray-600 hover:bg-gray-100",
      }}
    >
      {children}
    </TrainingSectionLayout>
  );
}
