"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// تعريف نوع الحدث الخاص بـ beforeinstallprompt
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  // تهيئة AOS وحدث beforeinstallprompt
  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler as EventListener);
    };
  }, []);

  // زر التحميل
  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
    }
  };

  // إخفاء إذا لم يكن هناك عرض
  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 w-full flex justify-center z-50" data-aos="fade-up">
      <div className="bg-bg border border-secondary shadow-xl rounded-xl flex items-start justify-between p-4 gap-4 text-sm w-[90%] md:max-w-sm">
        <div>
          <p className="font-bold text-main">تطبيق صحتي</p>
          <p className="text-ft2">
            استشر الأطباء بسهولة عبر التطبيق، أو احجز موعداً فوراً.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleInstall}
            className="bg-main text-white px-3 py-1 rounded-lg hover:bg-mainLight"
          >
            تحميل
          </button>
          <button
            onClick={() => setShowPrompt(false)}
            className="text-ft2 text-xs hover:text-ft"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
