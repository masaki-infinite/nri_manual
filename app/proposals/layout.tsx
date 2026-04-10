import SharedLayout from "../components/SharedLayout";

export default function ProposalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SharedLayout>{children}</SharedLayout>;
}
