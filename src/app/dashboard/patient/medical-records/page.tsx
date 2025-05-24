import MedicalRecordCardPatient from "@/components/medicalRecord/MedicalRecordCardPatient";
import { getAllMedicalRecordsByPatient } from "@/lib/api/medicalRecord";
import { MedicalRecordPateint } from "@/types/MedicalRecord";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const token = (await cookies()).get("token")?.value;
  const medicalRecordsByPateint: MedicalRecordPateint[] =
    await getAllMedicalRecordsByPatient(token || "");
  return (
    <div>
      <MedicalRecordCardPatient medicalRecords={medicalRecordsByPateint} />
    </div>
  );
};

export default page;
