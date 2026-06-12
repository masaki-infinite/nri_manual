import TrainingSectionLayout from "../components/TrainingSectionLayout";
import { claudeCodeTocItems } from "./claudeCodeToc";

export default function ClaudeCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TrainingSectionLayout
      items={claudeCodeTocItems}
      accent={{
        active: "bg-purple-100 text-purple-800 font-semibold",
        idle: "text-gray-600 hover:bg-gray-100",
        sectionActive: "bg-purple-100 text-purple-800 font-medium",
        sectionIdle: "text-gray-500 hover:bg-gray-100 hover:text-gray-700",
      }}
    >
      {children}
    </TrainingSectionLayout>
  );
}
