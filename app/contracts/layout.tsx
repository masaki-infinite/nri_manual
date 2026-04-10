import SharedLayout from "../components/SharedLayout";

export default function ContractsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SharedLayout>{children}</SharedLayout>;
}
