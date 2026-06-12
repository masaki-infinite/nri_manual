import TrainingSectionLayout from "../components/TrainingSectionLayout";
import { snowflakeTocItems } from "./snowflakeToc";

export default function SnowflakeTrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TrainingSectionLayout
      items={snowflakeTocItems}
      accent={{
        active: "bg-sky-100 text-sky-800 font-semibold",
        idle: "text-gray-600 hover:bg-gray-100",
      }}
    >
      {children}
    </TrainingSectionLayout>
  );
}
