import React from 'react'
import { useTranslations } from 'next-intl'
import { Timer, Rocket, Stars } from 'lucide-react'

const CoominSoon = () => {
  const t = useTranslations('ComingSoon')

  return (
    <div className="min-h-screen flex  items-center justify-center bg-gray-50">
      <div className="text-center flex flex-col gap-3 space-y-8 p-8">
        <div className="flex  justify-center gap-4 text-main">
          <Rocket size={32} className="animate-bounce" />
          <Stars size={32} className="animate-pulse" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-main">
          {t('title')}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600">
          {t('description')}
        </p>
        <div className="flex justify-center items-center gap-3 text-main">
          <Timer size={24} className="animate-spin" />
          <span className="text-lg font-medium">{t('loading')}</span>
        </div>
      </div>
    </div>
  )
}

export default CoominSoon