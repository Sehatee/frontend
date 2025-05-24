import MedicalRecordPatient from "@/components/medicalRecord/MedicalRecordPatient";
import { getOneMedicalRecordByPatient } from "@/lib/api/medicalRecord";
import {

  MedicalRecordPateint,
} from "@/types/MedicalRecord";
import { cookies } from "next/headers";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}
const page = async ({ params }: Props) => {
  const doctorId = (await params).id;
  const token = (await cookies()).get("token")?.value;
  const medicalRecordsByPateint: MedicalRecordPateint =
    await getOneMedicalRecordByPatient(token || "", doctorId);
  return (
    <div>
      <MedicalRecordPatient medicalRecord={medicalRecordsByPateint} />
    </div>
  );
};

export default page;
