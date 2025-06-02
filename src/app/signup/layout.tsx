import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "إنشاء حساب جديد - صحتي",
  description:
    "أنشئ حسابك الآن في منصة صحتي لحجز المواعيد الطبية، والحصول على استشارات أونلاين من أفضل الأطباء في الجزائر.",
  keywords: [
    "تسجيل حساب",
    "إنشاء حساب",
    "منصة صحتي",
    "تسجيل مستخدم جديد",
    "حجز طبي",
    "استشارة طبية",
    "الرعاية الصحية في الجزائر",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
