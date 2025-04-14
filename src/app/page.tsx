import LangSwitcher from "@/components/lang/LangSwitcher";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <button className="p-2 bg-main text-white rounded ">{t("title")}</button>
      <LangSwitcher />
    </div>
  );
}
