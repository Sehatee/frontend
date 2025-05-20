import React from 'react'
import Link from "next/link";

function Card({ title, value, href }: { title: string; value: number; href: string }) {
  return (
    <div>
         <Link href={href} className="block">
        <div className="bg-white p-5 rounded-xl shadow-sm text-center cursor-pointer transition hover:shadow-md">
          <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
          <p className="text-2xl font-bold text-blue-600">{value}</p>
        </div>
          </Link>
    </div>
  )
}

export default Card

