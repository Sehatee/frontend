import Doctors from "@/components/doctors/Doctors";

import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    search: string;
    specialization: string;
  }>;
}) => {
  const awaitngSearchParams = await searchParams;
  return (
    <div className="container mx-auto">
      <Doctors searchParams={awaitngSearchParams} />
    </div>
  );
};

export default page;
