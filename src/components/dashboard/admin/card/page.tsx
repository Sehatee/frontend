import React from 'react'
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

function Card({ title, value, href, icon: Icon }: { title: string; value: number; href: string; icon: LucideIcon }) {
  return (
    <div>
      <Link href={href} className="block">
        <div className="flex items-center gap-4 bg-white rounded-2xl border border-secondary p-6 shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-main/10 text-main">
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-ft2 truncate">{title}</h3>
            <p className="mt-1 text-3xl font-bold text-ft">{value}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Card
