"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { getDoctor } from "@/lib/api/doctor";
import Image from 'next/image';
import { useLocale } from "next-intl";

type Message = {
  text: string;
  img: string;
  isReceived: boolean;
};

type Doctor = {
  _id: string;
  username: string;
  specialization: string;
  picture: string;
};

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [conversationDoctors, setConversationDoctors] = useState<Doctor[]>([]);
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  const isArabic = useLocale() === "ar";

  const conversationsKey = "chat_conversations";

  useEffect(() => {
    const stored = localStorage.getItem(conversationsKey);
    if (stored) {
      setConversationDoctors(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (doctorId) {
      getDoctor(doctorId).then((doctor) => {
        if (doctor) {
          setSelectedDoctor(doctor);

          const localStorageKey = `chat_messages_${doctor._id}`;
          const storedMessages = localStorage.getItem(localStorageKey);
          if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
          } else {
            setTimeout(() => {
              const welcomeMessage: Message = {
                text: "مرحبًا، كيف يمكنني مساعدتك؟",
                img: doctor.picture,
                isReceived: true,
              };
              setMessages([welcomeMessage]);
              localStorage.setItem(localStorageKey, JSON.stringify([welcomeMessage]));
            }, 1000);
          }

          const stored = localStorage.getItem(conversationsKey);
          const previous = stored ? JSON.parse(stored) : [];
          const exists = previous.find((doc: Doctor) => doc._id === doctor._id);
          if (!exists) {
            const updated = [...previous, doctor];
            localStorage.setItem(conversationsKey, JSON.stringify(updated));
            setConversationDoctors(updated);
          }
        }
      });
    }
  }, [doctorId]);

  const handleSendMessage = () => {
    if (message.trim() && selectedDoctor) {
      const newMessages = [
        ...messages,
        {
          text: message,
          img: "/imgs/doctorsteam/doctor5.png",
          isReceived: false,
        },
      ];
      setMessages(newMessages);
      const localStorageKey = `chat_messages_${selectedDoctor._id}`;
      localStorage.setItem(localStorageKey, JSON.stringify(newMessages));
      setMessage("");

      const stored = localStorage.getItem(conversationsKey);
      const previous = stored ? JSON.parse(stored) : [];
      const exists = previous.find((doc: Doctor) => doc._id === selectedDoctor._id);
      if (!exists) {
        const updated = [...previous, selectedDoctor];
        localStorage.setItem(conversationsKey, JSON.stringify(updated));
        setConversationDoctors(updated);
      }
    }
  };

  const handleSelectDoctor = (doc: Doctor) => {
    setSelectedDoctor(doc);
    const localStorageKey = `chat_messages_${doc._id}`;
    const storedMessages = localStorage.getItem(localStorageKey);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      setTimeout(() => {
        const welcomeMessage: Message = {
          text: "مرحبًا، كيف يمكنني مساعدتك؟",
          img: doc.picture,
          isReceived: true,
        };
        setMessages([welcomeMessage]);
        localStorage.setItem(localStorageKey, JSON.stringify([welcomeMessage]));
      }, 1000);
    }
  };

  const handleDeleteMessage = (index: number) => {
    if (!selectedDoctor) return;
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
    const localStorageKey = `chat_messages_${selectedDoctor._id}`;
    localStorage.setItem(localStorageKey, JSON.stringify(updatedMessages));
  };

  const handleDeleteConversation = (doctorId: string) => {
    const updatedDoctors = conversationDoctors.filter((doc) => doc._id !== doctorId);
    setConversationDoctors(updatedDoctors);
    localStorage.setItem(conversationsKey, JSON.stringify(updatedDoctors));
    localStorage.removeItem(`chat_messages_${doctorId}`);
    if (selectedDoctor?._id === doctorId) {
      setSelectedDoctor(null);
      setMessages([]);
    }
  };

  const getLastMessage = (doctorId: string): string => {
    const localStorageKey = `chat_messages_${doctorId}`;
    const stored = localStorage.getItem(localStorageKey);
    if (stored) {
      const msgs: Message[] = JSON.parse(stored);
      if (msgs.length > 0) {
        return msgs[msgs.length - 1].text;
      }
    }
    return "لا توجد رسائل بعد";
  };

  return (
    <div className="flex h-[90vh] bg-bg p-4">
      {/* الشريط الجانبي */}
      <div className={`w-1/4 bg-white border-r ${isArabic ? 'rounded-tr-xl' : 'rounded-tl-xl'}`}>
        <h2 className="text-xl font-bold p-4 border-b text-right text-blue-800">محادثاتي</h2>

        {conversationDoctors.map((doc) => (
          <div
            key={doc._id}
            className={`group relative flex items-center gap-4 p-4 hover:bg-secondary transition-all duration-300 ease-in-out hover:shadow-sm cursor-pointer border-b-[1px] border-gray-300 mb-1 shadow-sm shadow-gray-100 ${selectedDoctor?._id === doc._id ? 'bg-blue-50' : ''}`}
          >
            <div onClick={() => handleSelectDoctor(doc)} className="flex items-center gap-4 w-full">
              <Image
                src={doc.picture}
                alt="doctor"
                width={40}
                height={40}
                className="h-12 w-12 rounded-full object-cover object-top shadow-sm shadow-main"
              />
              <div className="flex flex-col space-y-2">
                <p className="font-bold md:text-sm text-xs sm:block hidden">{doc.username}</p>
                <p className="text-xs text-blue-700 md:block hidden">{doc.specialization}</p>
                <p className="text-xs text-gray-500 truncate max-w-[150px] md:block hidden">{getLastMessage(doc._id)}</p>
              </div>
            </div>

            {/* زر الحذف */}
            <button
              onClick={() => handleDeleteConversation(doc._id)}
              className="absolute top-2 left-2 hidden group-hover:flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-xs"
              title="حذف المحادثة"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* نافذة المحادثة */}
      <div className="flex flex-col flex-1">
        {selectedDoctor && (
          <div className={`bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 flex gap-4 items-center py-6 ${isArabic ? 'rounded-tl-xl' : 'rounded-tr-xl'}`}>
            <Image
              src={selectedDoctor.picture}
              alt="avatar"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full bg-secondary object-cover object-top"
            />
            <div className="text-right">
              <p className="font-bold">{selectedDoctor.username}</p>
              <p className="text-sm">{selectedDoctor.specialization}</p>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 group ${msg.isReceived ? "" : "flex-row-reverse"}`}
            >
              {msg.isReceived ? (
                <Image
                  src={msg.img}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="h-9 w-9 rounded-full bg-secondary object-cover object-top"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A4.992 4.992 0 0112 15a4.992 4.992 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              )}
              <div className="relative">
                <div
                  className={`border text-right p-3 rounded-2xl max-w-xs shadow ${msg.isReceived ? "bg-white" : "bg-blue-600 text-white"}`}
                >
                  {msg.text}
                </div>
                <button
                  onClick={() => handleDeleteMessage(index)}
                  className="absolute -top-2 -left-2 bg-red-100 text-ft text-xs rounded-full w-5 h-5 hidden group-hover:flex items-center justify-center"
                  title="حذف"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* إدخال الرسائل */}
        <div className="p-4 bg-white border-t flex gap-2 items-center">
          <button
            className="rounded-full p-2 text-white bg-blue-600 hover:bg-blue-700"
            onClick={handleSendMessage}
          >
            <MessageCircle className="h-5 w-5" />
          </button>
          <input
            type="text"
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 text-right border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
