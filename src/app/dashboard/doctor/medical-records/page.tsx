import MedicalRecordCard from "@/components/medicalRecord/MedicalRecordCard";
import { getAllMedicalRecordsByDoctor } from "@/lib/api/medicalRecord";
import { MedicalRecordDoctor } from "@/types/MedicalRecord";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const token = (await cookies()).get("token")?.value;
  const medicalRecordsByDoctor: MedicalRecordDoctor[] =
    await getAllMedicalRecordsByDoctor(token || "");
  return (
    <div>
      <MedicalRecordCard medicalRecords={medicalRecordsByDoctor} />
    </div>
  );
};

export default page;
