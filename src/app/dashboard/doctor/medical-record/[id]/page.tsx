import MedicalRecord from "@/components/medicalRecord/MedicalRecord";
import { getOneMedicalRecordByDoctor } from "@/lib/api/medicalRecord";
import { MedicalRecordDoctor } from "@/types/MedicalRecord";

import { cookies } from "next/headers";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: Props) => {
  const doctorId = (await params).id;
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;
  const medicalRecordByDoctor: MedicalRecordDoctor =
    await getOneMedicalRecordByDoctor(token || "", doctorId);
  return (
    <div>
      <MedicalRecord medicalRecord={medicalRecordByDoctor} />
    </div>
  );
};

export default page;
