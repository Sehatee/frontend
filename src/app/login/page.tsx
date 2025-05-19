import Login from "@/components/login/Login";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    callBackUrl: string;
  }>;
}) => {
  const awaitngSearchParams = await searchParams;
  return (
    <div>
      <Login callBackUrl={awaitngSearchParams.callBackUrl} />
    </div>
  );
};

export default page;
