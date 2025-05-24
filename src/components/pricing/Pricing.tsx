"use client";
import React, { useState } from "react";

export default function PricingPage() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [activeTab, setActiveTab] = useState<"doctors" | "patients">("doctors");

  // بيانات باقات الأطباء
  const doctorPlans = [
    {
      icon: (
        <div className="bg-gradient-to-tr from-blue-100 to-purple-100 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
          <svg width="28" height="28" fill="none">
            <circle cx="14" cy="14" r="12" fill="#6366F1" />
          </svg>
        </div>
      ),
      label: "للأطباء الجدد",
      title: "الخطة المجانية",
      desc: "صفحة تعريفية للطبيب واستقبال حتى 10 حجوزات شهريًا ودعم عبر البريد فقط.",
      price: 0,
      period: isMonthly ? "شهريًا" : "سنويًا",
      features: [
        "صفحة تعريفية للطبيب",
        "استقبال حتى 10 حجوزات شهريًا",
        "دعم عبر البريد فقط",
      ],
      button: "ابدأ الآن",
      popular: false,
    },
    {
      icon: (
        <div className="bg-gradient-to-tr from-blue-100 to-purple-100 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
          <svg width="28" height="28" fill="none">
            <rect x="4" y="4" width="20" height="20" rx="4" fill="#6366F1" />
          </svg>
        </div>
      ),
      label: "للأطباء النشطين",
      title: "الخطة الاحترافية",
      desc: "حجوزات غير محدودة ودردشة مع المرضى وإحصائيات ودعم سريع.",
      price: isMonthly ? 299 : 2990,
      period: isMonthly ? "شهريًا" : "سنويًا",
      features: [
        "حجوزات غير محدودة",
        "دردشة مع المرضى",
        "إحصائيات وتحاليل",
        "دعم سريع",
      ],
      button: "اشترك الآن",
      popular: true,
    },
    {
      icon: (
        <div className="bg-gradient-to-tr from-blue-100 to-purple-100 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
          <svg width="28" height="28" fill="none">
            <polygon points="14,4 24,24 4,24" fill="#6366F1" />
          </svg>
        </div>
      ),
      label: "للأطباء المتقدمين",
      title: "الخطة المميزة",
      desc: "كل ميزات الخطة الاحترافية مع أولوية في نتائج البحث ودعم مخصص.",
      price: isMonthly ? 599 : 5990,
      period: isMonthly ? "شهريًا" : "سنويًا",
      features: [
        "كل ميزات الخطة الاحترافية",
        "أولوية في نتائج البحث",
        "إعلانات داخل المنصة",
        "دعم مخصص على مدار الساعة",
      ],
      button: "اشترك الآن",
      popular: false,
    },
  ];

  // بيانات باقات المرضى
  const patientPlans = [
    {
      title: "مجانية",
      desc: "خطة مجانية مناسبة لاستخدام الأساسي",
      price: 0,
      period: isMonthly ? "شهريًا" : "سنويًا",
      features: [
        "حجز موعد واحد في الشهر",
        "استعراض السجل الطبي الخاص بك",
        "تنبيهات مواعيد عبر البريد الإلكتروني",
      ],
      button: "ابدأ مجانًا",
      popular: false,
    },
    {
      title: "مميزة",
      desc: "أفضل تجربة طبية ممكنة",
      price: isMonthly ? 19 : 190,
      period: isMonthly ? "شهريًا" : "سنويًا",
      features: [
        "استشارات فيديو مباشرة مع الأطباء",
        "حفظ ومتابعة الأدوية والتوصيات",
        "تنبيهات ذكية للمواعيد والفحوصات",
      ],
      button: "اشترك الآن",
      popular: true,
    },
    {
      title: "أساسية",
      desc: "خطة مناسبة للمرضى النشطين",
      price: isMonthly ? 9 : 90,
      period: isMonthly ? "شهريًا" : "سنويًا",
      features: [
        "عدد غير محدود من الاستشارات",
        "تحميل ومشاركة الملفات الطبية",
        "أولوية في الدعم الفني",
      ],
      button: "اشترك الآن",
      popular: false,
    },
  ];

  // اختيار الباقات حسب التبويب
  const plans = activeTab === "doctors" ? doctorPlans : patientPlans;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-tr from-blue-50 via-white to-purple-50 py-6 px-4">
      <div className="flex flex-col items-start w-full max-w-7xl mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-3 text-right">
          باقات الاشتراك
        </h1>
        <h2 className="text-lg md:text-xl text-gray-500 mb-8 text-right">
          اختر ما يناسبك
        </h2>
      </div>
      {/* أزرار التبديل بين الشهري والسنوي */}
      <div className="flex justify-center items-center gap-4 mb-4">
        <span
          className={`cursor-pointer font-semibold ${
            isMonthly ? "text-blue-800" : "text-gray-500"
          }`}
          onClick={() => setIsMonthly(true)}
        >
          شهريًا
        </span>
        <div
          className="w-12 h-6 bg-blue-200 rounded-full relative cursor-pointer"
          onClick={() => setIsMonthly(!isMonthly)}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${
              isMonthly ? "right-0.5" : "left-0.5"
            }`}
          ></div>
        </div>
        <span
          className={`cursor-pointer font-semibold ${
            !isMonthly ? "text-blue-800" : "text-gray-500"
          }`}
          onClick={() => setIsMonthly(false)}
        >
          سنويًا
        </span>
      </div>
      {/* رسالة التوفير عند السنوي */}
      {!isMonthly && (activeTab === "doctors" || activeTab === "patients") && (
        <div className="flex justify-center mb-6">
          <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-semibold text-sm">
            وفر حتى 20% عند الاشتراك السنوي
          </span>
        </div>
      )}

      {/* أزرار التبديل بين باقات الأطباء وباقات المرضى */}
      <div className="flex justify-center gap-2 mb-20">
        <button
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === "doctors"
              ? "bg-blue-700 text-white"
              : "bg-blue-100 text-blue-700"
          }`}
          onClick={() => setActiveTab("doctors")}
        >
          باقات الأطباء
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === "patients"
              ? "bg-blue-700 text-white"
              : "bg-blue-100 text-blue-700"
          }`}
          onClick={() => setActiveTab("patients")}
        >
          باقات المرضى
        </button>
      </div>

      {/* عرض الباقات */}
      <div
        className={`grid grid-cols-1 md:grid-cols-${plans.length} gap-8 max-w-6xl w-full`}
      >
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`
            flex flex-col items-center rounded-3xl shadow-xl bg-white
            ${
              plan.popular
                ? "border-4 border-blue-600 scale-105 z-10 md:-mt-8 md:mb-8"
                : "border border-gray-100"
            }
            px-8 py-10 relative transition-all duration-300
            w-full max-w-xs md:max-w-none mx-auto
          `}
          >
            {/* احذف السطر التالي أو ما يشبهه */}
            {/* {plan.icon} */}
            {/* <div className="text-gray-500 font-semibold mb-1 mt-2">{plan.label}</div> */}
            <div className="text-2xl font-bold mb-3 ">{plan.title}</div>
            {/* احذف السطر التالي أو ما يشبهه */}
            {/* <div className="text-gray-400 text-sm mb-4 text-center">{plan.desc}</div> */}
            <div className="text-4xl font-extrabold text-blue-700 mb-1">
              {plan.price === 0 ? "0" : `${plan.price} دينار`}
            </div>
            <div className="text-gray-400 mb-4">
              {plan.period && `/${plan.period}`}
            </div>
            <div className="w-full text-right mb-2 font-bold">المميزات</div>
            <ul className="w-full mb-8 space-y-2">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-blue-700 font-medium"
                >
                  <svg width="20" height="20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="#6366F1" />
                    <path
                      d="M7 10l2 2 4-4"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`
                w-full py-3 rounded-2xl text-lg font-bold
                ${
                  plan.popular
                    ? "bg-blue-700 text-white hover:bg-blue-800"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }
                transition
              `}
            >
              {plan.button}
            </button>
            {plan.popular && (
              <span className="absolute top-6 left-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                الأكثر شيوعًا
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
