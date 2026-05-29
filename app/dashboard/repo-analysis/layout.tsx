import SharedLayout from "../../components/SharedLayout";

export default function RepoAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SharedLayout>{children}</SharedLayout>;
}
