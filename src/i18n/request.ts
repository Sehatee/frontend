import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  let locale = "ar"; // اللغة الافتراضية
  const cookieStore = await cookies();

  // قراءة الكوكيز التي تحتوي على لغة المستخدم
  const savedLocale = cookieStore.get("locale");

  // إذا تم حفظ اللغة في الكوكيز
  if (savedLocale) {
    locale = savedLocale.value;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
