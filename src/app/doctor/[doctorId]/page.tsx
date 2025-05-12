import Doctor from "@/components/doctor/Doctor";
import React from "react";
interface Props {
  params: Promise<{ doctorId: string }>;
}
// TODO: docn't forget to add generateStaticParams func
const page = async ({ params }: Props) => {
  const doctorId = (await params).doctorId;
  console.log(doctorId);
  return (
    <div>
      <Doctor />
    </div>
  );
};

export default page;
