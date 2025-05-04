import React from "react";

const ADS = () => {
  return (
    <div className="my-20 bg-main rounded flex justify-between items-center px-4">
      {/* text */}
      <div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white ">
          هل تحتاج إلى مساعدة في اختيار الخدمة المناسبة؟
        </h1>
        <p className="text-sm  sm:text-base md:text-lg font-medium text-white  mt-2">
          فريق الدعم الطبي متاح على مدار الساعة لمساعدتك واختيار الخدمة المناسبة
          لحالتك.
        </p>
      </div>
      {/* button */}
      <div className="flex justify-center items-center mt-5 mb-10">
        <button className="text-lg hover:text-white bg-white text-main  px-4 py-2 rounded-md mt-4  hoverBtn ">
          تواصل معنا
        </button>
      </div>
    </div>
  );
};

export default ADS;
