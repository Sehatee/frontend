import React from "react";
interface Props {
  params: Promise<{ doctorId: string }>;
}
// TODO: docn't forget to add generateStaticParams func
const page = async ({ params }: Props) => {
  const doctorId = (await params).doctorId;
  return <div>{doctorId}</div>;
};

export default page;
