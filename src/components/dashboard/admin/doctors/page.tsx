import { getAnalysis } from "@/lib/api/admin";
import DoctorsPageClient from "../doctor/doctorPage";
import { User } from "@/types/User";
import { cookies } from "next/headers";



export default async function DoctorsPage() {
  const token = (await cookies()).get("token")?.value;
  const data = await getAnalysis(token || "");
  const doctors:User[] = data?.doctors.doctors

  return <DoctorsPageClient doctors={doctors} />;
}

























