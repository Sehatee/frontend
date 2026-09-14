"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { Doctor } from "@/types/Chat";

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiver: Doctor;
  isCallConnected?: boolean; // حالة لمعرفة هل تم الرد من طرف المستقبل
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  isOpen,
  onClose,
  receiver,
  isCallConnected = false,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const ringIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1. إدارة صوت الانتظار (Outgoing Ringback Tone) باستعمال Web Audio API
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isOpen && !isCallConnected) {
      // دالة لتوليد نغمة الرنين برمجياً (440Hz + 480Hz - Standard US Ringback)
      const playRingTone = () => {
        try {
          const AudioCtx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext;
          if (!AudioCtx) return;

          const ctx = audioCtxRef.current || new AudioCtx();
          audioCtxRef.current = ctx;

          if (ctx.state === "suspended") {
            ctx.resume();
          }

          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gainNode = ctx.createGain();

          osc1.type = "sine";
          osc2.type = "sine";
          osc1.frequency.setValueAtTime(440, ctx.currentTime);
          osc2.frequency.setValueAtTime(480, ctx.currentTime);

          // إعداد مستوى الصوت مع تأثير Fade-in/Fade-out لمنع التقطع
          gainNode.gain.setValueAtTime(0, ctx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.08, ctx.currentTime + 1.8);
          gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.0);

          osc1.connect(gainNode);
          osc2.connect(gainNode);
          gainNode.connect(ctx.destination);

          osc1.start(ctx.currentTime);
          osc2.start(ctx.currentTime);

          osc1.stop(ctx.currentTime + 2.0);
          osc2.stop(ctx.currentTime + 2.0);
        } catch (error) {
          console.error("Failed to play ringback tone:", error);
        }
      };

      // تشغيل النغمة لأول مرة ثم تكرارها كل 4 ثوانٍ
      playRingTone();
      interval = setInterval(playRingTone, 4000);
      ringIntervalRef.current = interval;
    }

    return () => {
      if (interval) clearInterval(interval);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, [isOpen, isCallConnected]);

  // 2. حاسبة وقت المكالمة (Timer)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && isCallConnected) {
      setCallDuration(0);
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, isCallConnected]);

  // تنسيق الوقت المنقضي MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleMic = () => setIsMuted((prev) => !prev);
  const toggleVideo = () => setIsVideoOff((prev) => !prev);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-5xl h-[85vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-between"
          >
            {/* Header / Info Overlay */}
            <div className="absolute top-0 inset-x-0 p-6 z-20 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={receiver.picture}
                  alt={receiver.username}
                  width={40}
                  height={40}
                  className="rounded-full object-cover ring-2 ring-white/20"
                />
                <div>
                  <h4 className="text-white font-semibold text-sm">
                    {receiver.username}
                  </h4>
                  <p className="text-xs text-white/70">
                    {receiver.specialization}
                  </p>
                </div>
              </div>

              {/* Call Status / Timer Display */}
              <div className="bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-white font-mono text-sm shadow-sm">
                {isCallConnected ? formatTime(callDuration) : "جاري الاتصال..."}
              </div>
            </div>

            {/* Video Canvas Area */}
            <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden">
              {/* Remote Video Placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <Image
                      src={receiver.picture}
                      alt={receiver.username}
                      width={100}
                      height={100}
                      className="rounded-full object-cover ring-4 ring-main/30 shadow-2xl"
                    />
                    <span
                      className={`absolute bottom-1 end-1 w-4 h-4 rounded-full ring-2 ring-slate-950 ${
                        isCallConnected
                          ? "bg-emerald-500"
                          : "bg-amber-500 animate-pulse"
                      }`}
                    />
                  </div>
                  <p className="text-white/60 text-sm">
                    {isCallConnected
                      ? `في مكالمة مع ${receiver.username}`
                      : `جاري الاتصال بـ ${receiver.username}...`}
                  </p>
                </div>
              </div>

              {/* Local Video Placeholder */}
              <div className="absolute bottom-6 end-6 w-40 h-56 bg-slate-800 rounded-2xl border border-white/20 overflow-hidden shadow-2xl flex items-center justify-center">
                {!isVideoOff ? (
                  <div className="w-full h-full bg-slate-700 flex items-center justify-center text-xs text-white/50">
                    الكاميرا محلية
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-white/40">
                    <VideoOff className="h-6 w-6" />
                    <span className="text-[10px]">الكاميرا معطلة</span>
                  </div>
                )}
              </div>
            </div>

            {/* Call Control Bar */}
            <div className="p-6 bg-slate-900/90 backdrop-blur-md flex items-center justify-center gap-6 z-20 border-t border-white/10">
              <button
                type="button"
                onClick={toggleMic}
                className={`p-4 rounded-full transition-all duration-200 ${
                  isMuted
                    ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 ring-1 ring-red-500/50"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                title={isMuted ? "تشغيل الميكروفون" : "كتم الميكروفون"}
              >
                {isMuted ? (
                  <MicOff className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/30"
                title="إنهاء المكالمة"
              >
                <PhoneOff className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={toggleVideo}
                className={`p-4 rounded-full transition-all duration-200 ${
                  isVideoOff
                    ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 ring-1 ring-red-500/50"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                title={isVideoOff ? "تشغيل الكاميرا" : "إيقاف الكاميرا"}
              >
                {isVideoOff ? (
                  <VideoOff className="h-6 w-6" />
                ) : (
                  <Video className="h-6 w-6" />
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
