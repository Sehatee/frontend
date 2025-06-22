import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Cairo, Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Metadata } from "next";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import { fetchUser } from "@/lib/fetchUser";

const cairo = Cairo({
  subsets: ["arabic"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  manifest: "/manifest.json",
  themeColor: "#0B62DE",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-512.png",
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
  const font = locale === "ar" ? cairo.className : poppins.className;

  return (
      <html
        lang={locale}
        dir={dir}
        suppressHydrationWarning={true}
        className={font}
      >
      <head>
        {/* روابط PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0B62DE" />

        {/* دعم iOS */}
        <link rel="apple-touch-icon" href="/icons/icon-512.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="صحتي" />
      </head>

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
