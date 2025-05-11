'use client'
import React, { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import NotitficationCard from './NotitficationCard'


const Notifications = () => {
  const t = useTranslations('Settings.notifications')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const locale = useLocale()
  const isRTL = locale === 'ar'

  const filters = [
    { id: 'all', label: t('filters.all') },
    { id: 'unread', label: t('filters.unread') },
    { id: 'read', label: t('filters.read') },
    { id: 'system', label: t('filters.system') }
  ]

  return (
    <div className="space-y-6 min-h-screen p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">{t('title')}</h2>
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
          >
            {t('filterBy')}
            <ChevronDown className="w-4 h-4" />
          </button>
          {filterOpen && (
            <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-white border rounded-lg shadow-lg py-1 z-10`}>
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setSelectedFilter(filter.id)
                    setFilterOpen(false)
                  }}
                  className={`w-full text-${isRTL ? 'right' : 'left'} px-4 py-2 text-sm hover:bg-gray-50 ${selectedFilter === filter.id ? 'text-main' : 'text-gray-700'}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <NotitficationCard
          title="تأكيد موعد جديد"
          description="لديك موعد جديد مع د. أحمد العلي يوم الخميس الساعة 10:00 صباحاً"
          time="منذ 5 دقائق"
        />
        <NotitficationCard
          title="تحديث معلومات الحساب"
          description="تم تحديث معلومات حسابك بنجاح"
          time="منذ ساعة"
          isRead
        />
      </div>
    </div>
  )
}

export default Notifications