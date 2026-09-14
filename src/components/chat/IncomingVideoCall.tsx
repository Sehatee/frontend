import React, { useEffect, useRef } from 'react';
import { Phone, PhoneOff, Video } from 'lucide-react';

interface IncomingVideoCallProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  callerName?: string;
  callerAvatar?: string;
}

export default function IncomingVideoCall({
  isOpen,
  onAccept,
  onDecline,
  callerName = "Sarah Connor",
  callerAvatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
}: IncomingVideoCallProps) {
  // Ref لإدارة كائن الصوت
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // إنشاء كائن الصوت وتضمين مسار الملف من مجلد public
      audioRef.current = new Audio('/sounds/ringtone.mp3');
      audioRef.current.loop = true; // تكرار الصوت أثناء الرنين

      // تشغيل الصوت مع التعامل مع Autoplay Policies الخاصة بالمتصفحات
      audioRef.current.play().catch((error) => {
        console.warn("Autoplay blocked or audio file missing:", error);
      });
    } else {
      // إيقاف الصوت وتصفير التوقيت عند إغلاق النافذة
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }

    // Cleanup: إيقاف الصوت حتماً عند الـ Unmount للمكون
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="relative flex flex-col items-center justify-between h-[480px] w-full max-w-sm mx-auto bg-gray-900 text-white rounded-3xl p-6 shadow-2xl overflow-hidden border border-gray-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-transparent to-green-600/20 animate-pulse pointer-events-none" />

        {/* Header */}
        <div className="z-10 flex flex-col items-center mt-4 space-y-2">
          <div className="flex items-center space-x-2 text-blue-400 text-sm font-medium animate-pulse">
            <Video className="w-4 h-4" />
            <span>Incoming Video Call...</span>
          </div>
          <h2 className="text-2xl font-bold tracking-wide">{callerName}</h2>
        </div>

        {/* Avatar */}
        <div className="relative z-10 flex items-center justify-center my-auto">
          <div className="absolute w-36 h-36 bg-green-500/20 rounded-full animate-ping duration-1000" />
          <img 
            src={callerAvatar} 
            alt={callerName} 
            className="relative w-28 h-28 rounded-full object-cover border-4 border-gray-700 shadow-xl"
          />
        </div>

        {/* Action Buttons */}
        <div className="z-10 flex items-center justify-around w-full px-6 mb-2">
          {/* Decline */}
          <div className="flex flex-col items-center space-y-2">
            <button 
              onClick={onDecline}
              className="flex items-center justify-center w-16 h-16 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-full shadow-lg transition-all"
            >
              <PhoneOff className="w-7 h-7" />
            </button>
            <span className="text-xs text-gray-400 font-medium">Decline</span>
          </div>

          {/* Accept */}
          <div className="flex flex-col items-center space-y-2">
            <button 
              onClick={onAccept}
              className="relative flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 active:scale-95 text-white rounded-full shadow-lg animate-bounce transition-all"
            >
              <Phone className="relative w-7 h-7" />
            </button>
            <span className="text-xs text-gray-400 font-medium">Accept</span>
          </div>
        </div>

      </div>
    </div>
  );
}