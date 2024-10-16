import authOptions from "@/features/auth/next-auth.option";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { type PropsWithChildren } from "react";

export default async function SessionClientProvider(props: PropsWithChildren) {
  const session = await getServerSession(authOptions);
  return <SessionProvider session={session}>{props.children}</SessionProvider>;
}
