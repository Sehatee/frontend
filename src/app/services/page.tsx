import React from "react";
import ADS from "@/components/services/ADS";
import MyServices from "@/components/services/MyServices";

const page = () => {
  return (
    <div className="container mx-auto">
      <MyServices />
      <ADS />
    </div>
  );
};

export default page;
