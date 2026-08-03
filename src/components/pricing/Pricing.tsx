"use client";
import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function PricingPage() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [activeTab, setActiveTab] = useState<"doctors" | "patients">("doctors");

  type Plan = {
    icon?: React.ReactNode;
    label?: string;
    title: string;
    desc: string;
    price: number;
    period: string;
    features: string[];
    button: string;
    popular: boolean;
  };

  // بيانات باقات الأطباء
  const doctorPlans: Plan[] = [
    {
      icon: (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
          <svg width="28" height="28" fill="currentColor" className="text-main">
            <circle cx="14" cy="14" r="12" />
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
        " إنشاء 3 سجلات طبية فقط",
      ],
      button: "ابدأ الآن",
      popular: false,
    },
    {
      icon: (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
          <svg width="28" height="28" fill="currentColor" className="text-main">
            <rect x="4" y="4" width="20" height="20" rx="4" />
          </svg>
        </div>
      ),
      label: "للأطباء النشطين",
      title: "الخطة الاحترافية",
      desc: "حجوزات غير محدودة ودردشة مع المرضى وإحصائيات ودعم سريع.",
      price: isMonthly ? 299 : 2990,
      period: isMonthly ? "شهريًا" : "سنويًا",
      features: [
        "100 حجز",
        "إنشاء 50 سجل طبي",
        "تفعيل الدردشة مع المرضى",
        " إشعارات لتذكير بالمواعيد",
      ],
      button: "اشترك الآن",
      popular: true,
    },
    {
      icon: (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
          <svg width="28" height="28" fill="currentColor" className="text-main">
            <polygon points="14,4 24,24 4,24" />
          </svg>
        </div>
      ),
      label: "للأطباء المتقدمين",
      title: "الخطة المميزة",
      desc: "كل ميزات الخطة الاحترافية مع أولوية في نتائج البحث ودعم مخصص.",
      price: isMonthly ? 599 : 5990,
      period: isMonthly ? "شهريًا" : "سنويًا",
      features: [
        "سجلات غير محدودة",
        "دردشة غير محدودة",
        "إشعارات غير محدودة",
        "دعم مخصص على مدار الساعة",
        "إعلانات",
        "وسم VIP (طبيب مشهور)",
      ],
      button: "اشترك الآن",
      popular: false,
    },
  ];

  // بيانات باقات المرضى
  const patientPlans: Plan[] = [
    {
      title: "مجانية",
      desc: "خطة مجانية مناسبة لاستخدام الأساسي",
      price: 0,
      period: isMonthly ? "شهريًا" : "سنويًا",
      features: [
        "حجزين مجانيين",
        "إمكانية الدردشة مع طبيب واحد (غير VIP)",
        "تنبيهات مواعيد",
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
        "استخدام الذكاء الاصطناعي لتحليل السجلات الطبية",
        "إقتراحات طبية مخصصة من خلال AI",
        "تفعيل الدردشة بواسطة AI",
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
    <div className="flex min-h-screen flex-col items-center bg-bg px-4 py-16 md:py-20">
      {/* العنوان */}
      <div className="mb-10 flex w-full max-w-7xl flex-col items-center gap-3 text-center">
        <span className="eyebrow">الاشتراكات</span>
        <h1 className="font-display text-3xl font-bold text-ft sm:text-4xl md:text-5xl">
          باقات الاشتراك
        </h1>
        <h2 className="text-lg md:text-xl text-ft2">اختر ما يناسبك</h2>
      </div>

      {/* أزرار التبديل بين الشهري والسنوي */}
      <div className="mb-4 flex items-center justify-center gap-4">
        <span
          className={`cursor-pointer font-semibold transition-colors ${
            isMonthly ? "text-main" : "text-ft2"
          }`}
          onClick={() => setIsMonthly(true)}
        >
          شهريًا
        </span>
        <div
          className="relative h-6 w-12 cursor-pointer rounded-full border border-main/20 bg-secondary"
          onClick={() => setIsMonthly(!isMonthly)}
        >
          <div
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-main shadow transition-all duration-300 ${
              isMonthly ? "start-0.5" : "end-0.5"
            }`}
          ></div>
        </div>
        <span
          className={`cursor-pointer font-semibold transition-colors ${
            !isMonthly ? "text-main" : "text-ft2"
          }`}
          onClick={() => setIsMonthly(false)}
        >
          سنويًا
        </span>
      </div>
      {/* رسالة التوفير عند السنوي */}
      {!isMonthly && (activeTab === "doctors" || activeTab === "patients") && (
        <div className="mb-6 flex justify-center">
          <span className="rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-main">
            وفر حتى 20% عند الاشتراك السنوي
          </span>
        </div>
      )}

      {/* أزرار التبديل بين باقات الأطباء وباقات المرضى */}
      <div className="mb-16 flex justify-center gap-2">
        <button
          className={`rounded-full px-6 py-2 font-semibold transition-all duration-300 ${
            activeTab === "doctors"
              ? "bg-main text-white shadow-md shadow-main/20"
              : "bg-secondary text-main hover:bg-secondary/70"
          }`}
          onClick={() => setActiveTab("doctors")}
        >
          باقات الأطباء
        </button>
        <button
          className={`rounded-full px-6 py-2 font-semibold transition-all duration-300 ${
            activeTab === "patients"
              ? "bg-main text-white shadow-md shadow-main/20"
              : "bg-secondary text-main hover:bg-secondary/70"
          }`}
          onClick={() => setActiveTab("patients")}
        >
          باقات المرضى
        </button>
      </div>

      {/* عرض الباقات */}
      <div
        className={`grid w-full max-w-6xl grid-cols-1 gap-8 ${
          activeTab === "doctors" ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`
            relative flex w-full max-w-xs flex-col items-center rounded-3xl px-8 py-10 transition-all duration-300 md:max-w-none
            ${
              plan.popular
                ? "z-10 scale-105 bg-main text-white shadow-2xl shadow-main/25 md:-mt-8 md:mb-8"
                : "border border-secondary bg-white text-ft shadow-xl shadow-main/5"
            }
            mx-auto
          `}
          >
            {plan.popular && (
              <span className="absolute -top-4 start-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-white shadow-lg shadow-accent/30">
                الأكثر شيوعًا
              </span>
            )}
            {plan.label && (
              <div
                className={`mb-2 text-sm font-semibold ${
                  plan.popular ? "text-accent" : "text-ft2"
                }`}
              >
                {plan.label}
              </div>
            )}
            <div
              className={`text-2xl font-bold ${
                plan.popular ? "text-white" : "text-ft"
              }`}
            >
              {plan.title}
            </div>
            {plan.desc && (
              <div
                className={`mb-4 mt-2 text-center text-sm leading-relaxed ${
                  plan.popular ? "text-white/70" : "text-ft2"
                }`}
              >
                {plan.desc}
              </div>
            )}
            <div
              className={`font-display text-4xl font-bold ${
                plan.popular ? "text-white" : "text-main"
              }`}
            >
              {plan.price === 0 ? "0" : `${plan.price} دينار`}
            </div>
            <div
              className={`mb-4 ${
                plan.popular ? "text-white/70" : "text-ft2"
              }`}
            >
              {plan.period && `/${plan.period}`}
            </div>
            <div
              className={`mb-2 w-full text-start font-bold ${
                plan.popular ? "text-white/80" : "text-ft"
              }`}
            >
              المميزات
            </div>
            <ul className="mb-8 w-full space-y-2.5">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={20}
                    strokeWidth={1.75}
                    className={`mt-0.5 shrink-0 ${
                      plan.popular ? "text-white" : "text-main"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      plan.popular ? "text-white/90" : "text-ft"
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full text-lg font-bold transition-all duration-300 ${
                plan.popular
                  ? "rounded-xl bg-accent py-3.5 text-white hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25"
                  : "btn-ghost"
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
