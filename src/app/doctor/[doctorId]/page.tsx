import Doctor from "@/components/doctor/Doctor";
import { User } from "@/types/User";
import React from "react";
interface Props {
  params: Promise<{ doctorId: string }>;
}
// TODO: docn't forget to add generateStaticParams func
export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.API_URL}/doctors`
  );
  const data = await res.json();

  return data.doctors.map((doctor: User) => ({
    doctorId: doctor._id,
  }));
}
const page = async ({ params }: Props) => {
  const doctorId = (await params).doctorId;

  return (
    <div>
      <Doctor doctorId={doctorId} />
    </div>
  );
};

export default page;
