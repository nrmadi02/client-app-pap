import SessionClientProvider from "@/components/provider/session.provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionClientProvider>{children}</SessionClientProvider>;
}
