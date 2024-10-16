import ReactQueryProvider from "@/components/provider/react-query.provider";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}