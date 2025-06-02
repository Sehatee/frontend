import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Cairo } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Metadata } from "next";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import { fetchUser } from "@/lib/fetchUser";

const cairo = Cairo({
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "صحتي - منصة الرعاية الصحية",
  description:
    "منصة صحتي تتيح لك حجز مواعيد الأطباء بسهولة والحصول على استشارات طبية أونلاين من أخصائيين معتمدين.",
  keywords: [
    "صحتي",
    "استشارات طبية",
    "حجز مواعيد",
    "أطباء",
    "صحة",
    "منصة طبية",
    "تشخيص أونلاين",
  ],
  authors: [{ name: "Yacine & Imad" }],
  creator: "Yacine & Imad",
  generator: "Next.js",
  metadataBase: new URL("https://sehatte.com"),
  openGraph: {
    title: "صحتي - منصة الرعاية الصحية",
    description:
      "احصل على استشارة طبية فورية أو قم بحجز موعد مع طبيب معتمد عبر منصة صحتي.",
    url: "https://sehatte.com",
    siteName: "صحتي",
    locale: "ar_DZ",
    type: "website",
    images: [
      {
        url: "https://sehatte.com/metaImg.jpg",
        width: 1200,
        height: 630,
        alt: "صحتي - منصة الرعاية الصحية",
      },
    ],
  },
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const user = await fetchUser();
  console.log(user);
  const font = cairo.className;

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning={true}
      className={font}
    >
      <body className="" suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale}>
          <ToastContainer />
          <NavBar />
          <div className="mt-16">{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
