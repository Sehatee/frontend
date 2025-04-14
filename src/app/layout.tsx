import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Cairo ,Geist  } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
});
const geist = Geist({
  subsets: ['latin'],
})
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const font = locale === "ar" ? cairo.className : geist.className;

  return (
    <html lang={locale} dir={dir} className={font}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
