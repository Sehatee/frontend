import ApplyAppointment from "@/components/appointment/ApplyAppointment";
import React from "react";

interface Props {
  params: Promise<{ appointmentId: string }>;
}
const page = async ({ params }: Props) => {
  const appointmentId = (await params).appointmentId;
  console.log(appointmentId);

  return (
    <div className="mt-16">
      <ApplyAppointment />
    </div>
  );
};

export default page;
