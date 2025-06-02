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
      name: "د. أحمد عيسى",
      specialty: "أخصائي طب وجراحة العيون",
      description:
        "يتمتّع الدكتور أحمد بخبرة واسعة في تشخيص وعلاج مشكلات الإبصار وأمراض الشبكية. يعتمد على أحدث الأجهزة والتقنيات الجراحية لضمان دقة العلاج وسلامة العين.يحرص على تقديم رعاية متكاملة تهدف إلى تحسين الرؤية.",
      img: "/imgs/doctorsteam/doctor2.png",
    },
    {
      name: "د. يوسف أنس",
      specialty: "أخصائي أمراض القلب",
      description:
        "يمتلك الدكتور يوسف أكثر من 10 سنوات من الخبرة في تشخيص وعلاج أمراض القلب والشرايين. يُعرف بدقته العالية وحرصه على المتابعة المستمرة لحالة المريض، ويستخدم أحدث الأساليب العلمية في التقييم والعلاج الوقائي.",
      img: "/imgs/doctorsteam/doctor3.png",
    },
  ];

  const group2 = [
    {
      name: "د. ياسين محمد",
      specialty: "استشاري طب الأطفال وحديثي الولادة",
      description:
        "يتمتّع الدكتور ياسين بخبرة واسعة في تشخيص وعلاج الأمراض التي تصيب الأطفال. يقدّم رعاية طبية شاملة للأطفال تشمل الفحوصات الدورية، متابعة النمو والتطور، التطعيمات، وعلاج الأمراض الحادة والمزمنة.",
      img: "/imgs/doctorsteam/doctor6.png",
    },
    {
      name: "د. أيمن جاد",
      specialty: "أخصائي الأمراض الجلدية والتجميل",
      description:
        "متخصص في الأمراض الجلدية والتجميل، ويركز على تقديم رعاية شاملة لصحة البشرة. حاصل على شهادة التخصص من المملكة المتحدة، يمتلك خبرة في تشخيص وعلاج الأمراض الجلدية المزمنة بمختلف أنواعها.",
      img: "/imgs/doctorsteam/doctor5.png",
    },
  ];

  const group3 = [
    {
      name: "د. محمد مصعب",
      specialty: "استشاري طب الأسرة",
      description:
        "يتمتع الدكتور محمد مصعب بخبرة واسعة في تقديم الرعاية الصحية الأولية، يُعرف بقدرته على متابعة الأمراض المزمنة، يحرص على بناء علاقة ثقة وتواصل فعّال مع المرضى لضمان تقديم رعاية شاملة ومستمرة.",
      img: "/imgs/doctorsteam/doctor7.png",
    },
    {
      name: "د. خالد أسامة",
      specialty: "أخصائي جراحة العظام والمفاصل",
      description:
        "متخصص في علاج إصابات العظام والمفاصل، ويستخدم أحدث التقنيات الجراحية لضمان أفضل  النتائج. لديه خبرة في عمليات استبدال المفاصل وجراحة الإصابات الرياضية والتأهيل الحركي لتحسين جودة حياة المرضى.",
      img: "/imgs/doctorsteam/doctor4.png",
    },
  ];

  const groups = [group1, group2, group3];
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [doctors, setDoctors] = useState(groups[0]);

  const handleNext = () => {
    const nextIndex = (currentGroupIndex + 1) % groups.length;
    setCurrentGroupIndex(nextIndex);
    setDoctors(groups[nextIndex]);
  };

  const handleBack = () => {
    const prevIndex = (currentGroupIndex - 1 + groups.length) % groups.length;
    setCurrentGroupIndex(prevIndex);
    setDoctors(groups[prevIndex]);
  };

  const allDoctors = [...group1, ...group2, ...group3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSmall = () => {
    setCurrentIndex((prev) => (prev === allDoctors.length - 1 ? 0 : prev + 1));
  };
  const handleBackSmall = () => {
    setCurrentIndex((prev) => (prev === 0 ? allDoctors.length - 1 : prev - 1));
  };

  return (
    <div className="my-24 px-4 sm:px-6 md:px-8">
      {/* title */}
      <div
        className={`flex flex-col gap-3 my-12 ${
          locale === "ar" ? "min-[1296px]:mr-16 mr-0" : "xl:ml-16 ml-0"
        }`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold min-[1296px]:text-start text-center">
          {t("title")}
        </h1>
        <p className="hidden md:block text-base sm:text-lg md:text-xl font-medium text-textSecondary mt-2 min-[1296px]:text-start text-center">
          {t("subTitle")}
        </p>
      </div>
      {/* team */}

      {/* Show all cards on md and larger screens */}
      <div className="hidden min-[1296px]:grid grid-cols-1 max-[1296px]:grid-cols-1 min-[1296px]:grid-cols-2 gap-6 justify-items-center items-center mx-auto">
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
      <div className="min-[1296px]:hidden w-full flex flex-col items-center">
        <DoctorCard
          name={allDoctors[currentIndex].name}
          specialty={allDoctors[currentIndex].specialty}
          description={allDoctors[currentIndex].description}
          img={allDoctors[currentIndex].img}
        />
      </div>
      <div className="flex justify-center gap-2 min-[1296px]:mt-16 mt-10">
        <button
          onClick={handleBack}
          className={`hidden min-[1296px]:block p-3 sm:p-4 ${
            locale === "ar" ? "pl-4 sm:pl-5" : "pr-4 sm:pr-5"
          } rounded-full  bg-[#D4D4D4]`}
        >
          <Image
            width={24}
            height={24}
            src={`/imgs/doctorsteam/${locale === "ar" ? "back" : "next"}.png`}
            alt="backImg"
            className="w-5 sm:w-6"
          />
        </button>

        <button
          onClick={handleNext}
          className={`hidden min-[1296px]:block p-3 sm:p-4 ${
            locale === "ar" ? "pr-4 sm:pr-5" : "pl-4 sm:pl-5"
          } rounded-full bg-[#3D87F2]`}
        >
          <Image
            width={24}
            height={24}
            src={`/imgs/doctorsteam/${locale === "ar" ? "next" : "back"}.png`}
            alt="nextImg"
            className="w-5 sm:w-6"
          />
        </button>

        {/* Small screens: btn */}

        <button
          onClick={handleBackSmall}
          className={`min-[1296px]:hidden bg-[#D4D4D4] p-3 sm:p-4 ${
            locale === "ar" ? "pl-4 sm:pl-5" : "pr-4 sm:pr-5"
          } rounded-full`}
        >
          <Image
            width={24}
            height={24}
            src={`/imgs/doctorsteam/${locale === "ar" ? "back" : "next"}.png`}
            alt="backImg"
            className="w-5 sm:w-6"
          />
        </button>

        <button
          onClick={handleNextSmall}
          className={`min-[1296px]:hidden bg-[#3D87F2] p-3 sm:p-4 ${
            locale === "ar" ? "pr-4 sm:pr-5" : "pl-4 sm:pl-5"
          } rounded-full`}
        >
          <Image
            width={24}
            height={24}
            src={`/imgs/doctorsteam/${locale === "ar" ? "next" : "back"}.png`}
            alt="nextImg"
            className="w-5 sm:w-6"
          />
        </button>
      </div>
    </div>
  );
};

export default DoctorsTeam;
