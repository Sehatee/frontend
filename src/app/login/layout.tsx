import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول - صحتي",
  description:
    "سجّل الدخول إلى حسابك في منصة صحتي لحجز المواعيد الطبية والحصول على استشارات أونلاين بسهولة وأمان.",
  keywords: [
    "تسجيل الدخول",
    "منصة صحتي",
    "دخول المستخدم",
    "تسجيل الدخول لحساب طبي",
    "حجز موعد طبي",
    "استشارة طبية",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
