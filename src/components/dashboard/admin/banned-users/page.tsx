import { cookies } from "next/headers";
import BannedUsersPageClient from "../banned-user/userPage";
import { getAnalysis } from "@/lib/api/admin";
import { User } from "@/types/User";



export default async function BannedUsersPage() {
  const token = (await cookies()).get("token")?.value;
  const data = await getAnalysis(token || "");
  const users: User[] = data?.usersBlock;

  return <BannedUsersPageClient bannedUsers={users} />;
}
