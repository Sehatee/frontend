'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import NotitficationCard from './NotitficationCard'

const Notifications = () => {
  const t = useTranslations('Settings.notifications')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filters = [
    { id: 'all', label: t('filters.all') },
    { id: 'unread', label: t('filters.unread') },
    { id: 'read', label: t('filters.read') },
    { id: 'system', label: t('filters.system') }
  ]

  return (
    <div className="min-h-screen space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-ft">{t('title')}</h2>
        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 rounded-xl border border-secondary bg-white px-4 py-2.5 text-sm font-medium text-ft transition-colors hover:bg-secondary"
          >
            {t('filterBy')}
            <ChevronDown className="h-4 w-4 text-main" />
          </button>
          {filterOpen && (
            <div className="absolute end-0 z-10 mt-2 w-48 rounded-xl border border-secondary bg-white py-1 shadow-lg">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setSelectedFilter(filter.id)
                    setFilterOpen(false)
                  }}
                  className={`block w-full px-4 py-2 text-start text-sm transition-colors hover:bg-secondary ${
                    selectedFilter === filter.id
                      ? 'font-semibold text-main'
                      : 'text-ft2'
                  }`}
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
