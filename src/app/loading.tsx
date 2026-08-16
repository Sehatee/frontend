import React from 'react';
import { Loader2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const Loading = async () => {
  const t = await getTranslations('Loading');

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-secondary flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-main text-white flex items-center justify-center shadow-sm animate-float">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <h2 className="text-2xl font-semibold text-ft mt-6 mb-2">
          {t('loading')}
        </h2>
        <p className="text-ft2 text-center">
          {t('pleaseWait')}
        </p>
      </div>
    </div>
  );
};

export default Loading;