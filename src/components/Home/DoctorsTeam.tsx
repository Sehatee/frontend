"use client";
import { useTranslations, useLocale } from "next-intl";
import React from "react";
import DoctorCard from "./cards/DoctorCard";
import { useState } from "react";
import Image from "next/image";

const DoctorsTeam = () => {
  const t = useTranslations("Doctors");
  const locale = useLocale();

  const group1 = [
    {
      name: "د. أحمد بن عيسى",
      specialty: "أخصائي طب وجراحة العيون",
      description:
        "يتمتّع الدكتور أحمد بخبرة واسعة في تشخيص وعلاج مشكلات الإبصار وأمراض الشبكية. يعتمد على أحدث الأجهزة والتقنيات الجراحية لضمان دقة العلاج وسلامة العين.يحرص على تقديم رعاية متكاملة تهدف إلى تحسين الرؤية.",
      img: "/imgs/doctorsteam/doctor2.png",
    },
    {
      name: "د. محمد بن زيدان",
      specialty: "أخصائي أمراض القلب",
      description:
        "يمتلك الدكتور محمد أكثر من 10 سنوات من الخبرة في تشخيص وعلاج أمراض القلب والشرايين. يُعرف بدقته العالية وحرصه على المتابعة المستمرة لحالة المريض، ويستخدم أحدث الأساليب العلمية في التقييم والعلاج الوقائي.",
      img: "/imgs/doctorsteam/doctor3.png",
    },
  ];

  const group2 = [
    {
      name: "د. ياسين محمد",
      specialty: "استشاري طب الأطفال وحديثي الولادة",
      description:
        "يتمتّع الدكتور أحمد بخبرة واسعة في تشخيص وعلاج الأمراض التي تصيب الأطفال. يقدّم رعاية طبية شاملة للأطفال تشمل الفحوصات الدورية، متابعة النمو والتطور، التطعيمات، وعلاج الأمراض الحادة والمزمنة.",
      img: "/imgs/doctorsteam/doctor4.png",
    },
    {
      name: "د. أيمن محمد",
      specialty: "أخصائي الأمراض الجلدية والتجميل",
      description:
        "متخصص في الأمراض الجلدية والتجميل، ويركز على تقديم رعاية شاملة لصحة البشرة. حاصل على شهادة التخصص من المملكة المتحدة، يمتلك خبرة في تشخيص وعلاج الأمراض الجلدية المزمنة بمختلف أنواعها.",
      img: "/imgs/doctorsteam/doctor5.png",
    },
  ];

  const [doctors, setDoctors] = useState(group1);

  const handleNext = () => {
    setDoctors(group2);
  };

  const handleBack = () => {
    setDoctors(group1);
  };

  return (
    <div className="my-24 px-4 sm:px-6 md:px-8">
      {/* title */}
      <div className={`flex flex-col gap-3 my-12 ${locale === 'ar' ? 'mr-4 sm:mr-20' : 'ml-4 sm:ml-20'}`}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-medium text-textSecondary mt-2">
          {t("subTitle")}
        </p>
      </div>
      {/* team */}
      <div className="grid grid-cols-1 max-[1296px]:grid-cols-1 min-[1296px]:grid-cols-2 gap-6 justify-items-center items-center mx-auto">
        {doctors.map((doc, index) => (
          <DoctorCard 
            key={index}
            name={doc.name}
            specialty={doc.specialty}
            description={doc.description}
            img={doc.img}
          />
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-16">
        <button onClick={handleBack} className={`bg-[#D4D4D4] p-3 sm:p-4 ${locale === 'ar' ? 'pl-4 sm:pl-5' : 'pr-4 sm:pr-5'} rounded-full`}>
          <Image
            width={24}
            height={24}
            src={`/imgs/doctorsteam/${locale === 'ar' ? 'back' : 'next'}.png`}
            alt="backImg"
            className="w-5 sm:w-6"
          />
        </button>
        <button onClick={handleNext} className={`bg-main p-3 sm:p-4 ${locale === 'ar' ? 'pr-4 sm:pr-5' : 'pl-4 sm:pl-5'} rounded-full`}>
          <Image
            width={24}
            height={24}
            src={`/imgs/doctorsteam/${locale === 'ar' ? 'next' : 'back'}.png`}
            alt="nextImg"
            className="w-5 sm:w-6"
          />
        </button>
      </div>
    </div>
  );
};

export default DoctorsTeam;