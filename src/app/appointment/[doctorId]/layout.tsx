import "@/app/globals.css";
import { fetchUser } from "@/lib/fetchUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "حجز",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUser();
  if (user && user.role !== "patient") {
    redirect("/doctors");
  }
  return (
    <div className="bg-bg  ">
      <div className="container mx-auto  ">{children}</div>
    </div>
  );
}
