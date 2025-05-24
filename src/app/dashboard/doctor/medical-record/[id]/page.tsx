import MedicalRecord from "@/components/medicalRecord/MedicalRecord";
import { getOneMedicalRecordByDoctor } from "@/lib/api/medicalRecord";
import { MedicalRecordDoctor } from "@/types/MedicalRecord";
import { User } from "@/types/User";
import { cookies } from "next/headers";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}
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
  const doctorId = (await params).id;
  const token = (await cookies()).get("token")?.value;
  const medicalRecordByDoctor: MedicalRecordDoctor =
    await getOneMedicalRecordByDoctor(token || "", doctorId);
  return (
    <div>
      <MedicalRecord medicalRecord={medicalRecordByDoctor} />
    </div>
  );
};

export default page;
