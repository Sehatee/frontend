import { User } from "@/types/User";
import UserPage from "../user/userPage";
import { getAnalysis } from "@/lib/api/admin";
import { cookies } from "next/headers";

export default async function UsersPage() {
  const token = (await cookies()).get("token")?.value;
  const data = await getAnalysis(token || "");
  const users:User[] = data?.users.users

  return <UserPage users={users} />;
}
