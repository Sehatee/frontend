import ApplyAppointment from "@/components/appointment/ApplyAppointment";
import React from "react";

interface Props {
  params: Promise<{ doctorId: string }>;
}
const page = async ({ params }: Props) => {
  const doctorId = (await params).doctorId;
  console.log(doctorId);

  return (
    <div className="mt-16">
      <ApplyAppointment doctorId={doctorId} />
    </div>
  );
};

export default page;
