import React from "react";
import Footer from "@/components/Footer";
import ADS from "@/components/services/ADS";
import MyServices from "@/components/services/MyServices";



const page = () => {
  return (
    <>
      <div className="container mx-auto">
        <MyServices />
        <ADS />
      </div>
      <Footer />
    </>
  );
};

export default page;
