import { fetchUser } from "@/lib/fetchUser";
import { redirect } from "next/navigation";
import React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchUser();
  console.log(user);
  if (!user) {
    redirect("/login");
  }

  // if (user.role !== "patient") {
  //   redirect(`/dashboard/${user.role}/profile/info`);
  // }
  return <>{children}</>;
}
