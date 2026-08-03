import { fetchUser } from "@/lib/fetchUser";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await fetchUser();

  if (!user) {
    redirect("/login");
  }

  return <main className="min-h-screen bg-bg">{children}</main>;
}
