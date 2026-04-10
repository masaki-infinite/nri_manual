import SharedLayout from "../components/SharedLayout";

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SharedLayout>{children}</SharedLayout>;
}
