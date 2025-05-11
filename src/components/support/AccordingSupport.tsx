'use client'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslations } from 'next-intl'

const AccordingSupport = () => {
  const t = useTranslations('Support')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50"
            onClick={() => toggleAccordion(index)}
          >
            <span className="font-medium">{t(`faq.questions.${index}.question`)}</span>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-blue-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-600" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 py-4 bg-gray-50">
              <p className="text-gray-600">{t(`faq.questions.${index}.answer`)}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default AccordingSupport