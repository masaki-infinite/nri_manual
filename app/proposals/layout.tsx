import DashboardLayout from "../dashboard/layout";

export default function ProposalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
