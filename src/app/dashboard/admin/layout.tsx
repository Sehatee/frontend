import { fetchUser } from "@/lib/fetchUser";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await fetchUser();

  if (!user) {
    redirect("/login");
  }

  // if (user.role !== "admin") {
  //   redirect(`/dashboard/${user.role}/profile/info`);
  // }
  return (
    <div className="bg-backgroundDashboards py-3">
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
