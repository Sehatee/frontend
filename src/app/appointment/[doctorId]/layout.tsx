import "@/app/globals.css";
import { fetchUser } from "@/lib/fetchUser";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ doctorId: string }>;
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `appointment ${(await params).doctorId}`,
  };
}

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
