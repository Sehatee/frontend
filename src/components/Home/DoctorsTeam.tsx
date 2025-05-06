import { useTranslations } from "next-intl";
import React from "react";
// import DoctorCard from "./cards/DoctorCard";

const DoctorsTeam = () => {
  const t = useTranslations("Doctors");
  return (
    <div className="my-24">
      {/* title */}
      <div className="flex flex-col gap-3 my-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium text-textSecondary text-center mt-2">
          {t("subTitle")}
        </p>
      </div>
      {/* team */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center items-center mx-auto">
        {/* <DoctorCard
          name="د. أحمد علي"
          specialty="أخصائي طب الأطفال"
          description="د. أحمد علي هو طبيب ذو خبرة واسعة في مجال طب الأطفال ويهتم بصحة الأطفال وتقديم أفضل رعاية طبية لهم."
          img="/imgs/doctorsteam/doctor1.png"
        />
        <DoctorCard
          name="د. سارة محمد"
          specialty="أخصائية طب الأسرة"
          description="د. سارة محمد تقدم رعاية شاملة للعائلات وتعمل على تعزيز الصحة العامة والوقاية من الأمراض."
          img="/imgs/doctorsteam/doctor1.png"
        />
        <DoctorCard
          name="د. خالد حسن"
          specialty="أخصائي طب القلب"
          description="د. خالد حسن متخصص في علاج أمراض القلب ويقدم استشارات طبية دقيقة للمرضى."
          img="/imgs/doctorsteam/doctor1.png"
        /> */}
      </div>
    </div>
  );
};

export default DoctorsTeam;
