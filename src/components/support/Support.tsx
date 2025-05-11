import React from "react";
import { MessageCircle, Phone } from "lucide-react";
import AccordingSupport from "./AccordingSupport";
import { useTranslations } from "next-intl";

const Support = () => {
  const t = useTranslations('Support');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="md:text-4xl text-2xl font-bold  mb-2">
        {t("title")}
      </h1>
      <p className="text-gray-600  mb-8">{t("subtitle")}</p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            {t("liveChat.title")}
          </h2>
          <p className="text-gray-600 mb-4">
            {t("liveChat.description")}
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            {t("liveChat.button")}
          </button>
        </div>

        <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">
            {t("callUs.title")}
          </h2>
          <p className="text-gray-600 mb-4">
            {t("callUs.description")}
          </p>
          <p className="text-lg font-medium text-blue-600">
            {t("callUs.phone")}
          </p>
          <p className="text-sm text-gray-500">
            {t("callUs.workingHours")}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="md:text-4xl text-2xl font-bold mb-8">
          {t("faq.title")}
        </h2>
        <AccordingSupport />
      </div>
    </div>
  );
};

export default Support;
