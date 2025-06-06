import React from 'react';
import { Loader2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const Loading = async () => {
  const t = await getTranslations('Loading');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl flex flex-col items-center transform hover:scale-105 transition-all duration-300 border border-gray-100">
        <div className="relative">
          <div className="absolute inset-0 bg-main/10 rounded-full blur-xl animate-pulse"></div>
          <Loader2 className="w-16 h-16 text-main animate-spin relative" />
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-main to-blue-600 bg-clip-text text-transparent mt-6 mb-2">
          {t('loading')}
        </h2>
        <p className="text-gray-500 text-center">
          {t('pleaseWait')}
        </p>
      </div>
    </div>
  );
};

export default Loading;