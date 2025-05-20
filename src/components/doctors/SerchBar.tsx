"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const SearchBar = ({ options }: { options: (string | undefined)[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [specialization, setSpecialization] = useState(
    searchParams.get("specialization") || ""
  );

  // استخدم useEffect لتحديث الرابط عند أي تغيير
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (specialization) params.set("specialization", specialization);

    // حدّث الرابط بالمعلمات الجديدة
    router.push(`?${params.toString()}`);
  }, [search, specialization, router]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 px-4 md:px-8 my-8">
      <div className="w-full md:w-2/3 relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-main transition-colors"
          placeholder="ابحث عن طبيب"
        />
      </div>

      <select
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
        defaultValue="hello"
        className="w-full md:w-1/3 h-12 border-2 border-gray-300 rounded-lg px-4 focus:outline-none focus:border-main transition-colors"
      >
        <option value="">جميع التخصصات</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
