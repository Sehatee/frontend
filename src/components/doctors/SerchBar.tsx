"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Search, SlidersHorizontal } from "lucide-react";

const SearchBar = ({ options }: { options: (string | undefined)[] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Doctors");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [specialization, setSpecialization] = useState(
    searchParams.get("specialization") || "",
  );

  const specializations = useMemo(
    () =>
      Array.from(new Set(options.filter((o): o is string => Boolean(o)))),
    [options],
  );

  const isFirstRender = useRef(true);

  // update the URL with debounce, keeping the full pathname (and its locale prefix)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (specialization) params.set("specialization", specialization);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search, specialization, pathname, router]);

  return (
    <div className="mx-auto my-10 flex w-full max-w-4xl flex-col items-center gap-4 px-4 md:px-8">
      <div className="relative w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-secondary bg-white py-3.5 ps-12 pe-4 text-ft shadow-sm placeholder:text-ft2/70 focus:border-main focus:outline-none focus:ring-2 focus:ring-main/30 transition"
          placeholder={t("search")}
        />
        <Search className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-main" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="me-1 hidden items-center gap-1.5 text-sm font-semibold text-ft2 sm:inline-flex">
          <SlidersHorizontal className="size-4" />
          {t("spec")}
        </span>
        <button
          type="button"
          onClick={() => setSpecialization("")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            specialization === ""
              ? "bg-main text-white shadow-md shadow-main/20"
              : "bg-bg text-ft2 hover:bg-secondary hover:text-main"
          }`}
        >
          {t("spec")}
        </button>
        {specializations.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() =>
              setSpecialization((prev) => (prev === option ? "" : option))
            }
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              specialization === option
                ? "bg-secondary text-main shadow-md shadow-main/10"
                : "bg-bg text-ft2 hover:bg-secondary hover:text-main"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
