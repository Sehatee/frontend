"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { io, Socket } from "socket.io-client";

import { useUserStore } from "@/stores/user";
import { ChatBox } from "@/components/chat/ChatBox";
import { Doctor, Message } from "@/types/Chat";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  /**{
  _id: ObjectId('6aa428a141338c881a988866'),
  conversationId: ObjectId('6aa41915541ae392b37a560e'),
  sender: ObjectId('6a82e1592155b2b0cf28d2b1'),
  receiver: ObjectId('65f900000000000000000003'),
  content: 'hello',
  attachments: [],
  isRead: false,
  createdAt: ISODate('2026-09-11T16:13:21.275Z'),
  updatedAt: ISODate('2026-09-11T16:13:21.275Z'),
  __v: NumberInt('0')
} */
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [conversations, setConversations] = useState<
    {
      _id: string;
      doctor: {
        _id: string;
        username: string;
        specialization: string;
        picture: string;
      };
      participants: string[];
      lastMessage: string;
      patient: string;
      unreadCount: {
        doctor: number;
        patient: number;
      };
      createdAt: string;
      updatedAt: string;
    }[]
  >();
  const [currentConv, setCurrentConv] = useState<string>("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const { user } = useUserStore();
  const token = Cookies.get("token");
  const socketRef = useRef<Socket | null>(null);

  // only if the first time conversation
  const searchParam = useSearchParams();
  const doctorId = searchParam.get("doctorId") || null;

  // connect with server using socket.io
  const fetchAllConversation = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/conversations`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();

      setConversations(data);
    } catch (error) {
      console.error("Failed to fetch conversation:", error);
    }
  };
  const createConversation = async (doctorId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/conversations/${doctorId}`,
        {
          method: "POST",
          body: JSON.stringify({
            doctorId,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();

      setConversations([...(conversations || []), data]);
    } catch (error) {
      console.error("Failed to fetch create conversation:", error);
    }
  };
  useEffect(() => {
    fetchAllConversation();
    console.log(doctorId);
    if (doctorId) {
      createConversation(doctorId);
    }
  }, [doctorId]);

  const fetchOldMessages = async (convId: string) => {
    setIsLoadingMessages(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chats/${convId}/messages`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();

      if (data && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Failed to fetch old messages:", error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleSelectDoctor = (doc: Doctor) => {
    setSelectedDoctor(doc);
    setCurrentConv(doc.conversationId!);
    fetchOldMessages(doc.conversationId!);
  };

  useEffect(() => {
    if (!user || !selectedDoctor) return;

    const socket = io(process.env.NEXT_PUBLIC_BASE_API_URL as string, {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("joinRoom", {
        conversationId: currentConv,
      });
      socket.emit("markAsRead", {
        conversationId: currentConv,
        userId: user._id,
        role: "patient",
      });
    });

    // socket.on("newMessage", (savedMessage: any) => {
    //   const isReceived = savedMessage.senderId !== user._id;

    //   const incomingUIEvent: UIEventMessage = {
    //     text: savedMessage.content,
    //     img: isReceived
    //       ? selectedDoctor.picture
    //       : user.picture || "/imgs/default-avatar.png",
    //     isReceived,
    //     senderId: savedMessage.senderId,
    //   };

    //   setMessages((prev) => [...prev, incomingUIEvent]);
    // });

    return () => {
      socket.disconnect();
    };
  }, [selectedDoctor, user]);

  const handleSendMessage = () => {
    if (!message.trim() || !selectedDoctor || !user) return;
    // if the patient is the sender
    const payload =
      user.role === "patient"
        ? {
            senderId: user._id,
            receiverId: selectedDoctor._id,
            doctorId: selectedDoctor._id,
            patientId: user._id,
            content: message,
            attachments: [],
          }
        : {
            senderId: user._id,
            receiverId: "", // patientId from conversations
            doctorId: user._id,
            patientId: "", // patientId from conversations
            content: message,
            attachments: [],
          };
    // if the doctor is the sender
    if (socketRef.current?.connected) {
      socketRef.current.emit(
        "sendMessage",
        payload,
        (data: { status: string; data: Message }) => {
          setMessages([...messages, data.data]);
        },
      );
    }

    setMessage("");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-ft2">يرجى تسجيل الدخول لعرض المحادثات</p>
      </div>
    );
  }

  return (
    <div className="flex h-[90vh] bg-bg p-4">
      {/* Last Conversations Sidebar */}
      <div className="w-1/4 bg-bg border-e border-secondary rounded-s-2xl overflow-hidden">
        <h2 className="md:text-xl text-base font-bold p-4 border-b border-secondary text-start text-main">
          محادثاتي
        </h2>
        {/* if the user is patient */}
        {conversations ? (
          conversations.map((conv) => (
            <div
              key={conv._id}
              onClick={() =>
                handleSelectDoctor({ ...conv.doctor, conversationId: conv._id })
              }
              className={`group relative flex items-center gap-4 p-4 hover:bg-secondary transition-all duration-300 ease-in-out cursor-pointer border-b-[1px] border-secondary ${
                selectedDoctor?._id === conv.doctor._id ? "bg-secondary" : ""
              }`}
            >
              <div className="flex items-center gap-4 w-full">
                <Image
                  src={conv.doctor.picture}
                  alt={conv.doctor.username}
                  width={40}
                  height={40}
                  className="h-12 w-12 rounded-full object-cover object-top shadow-sm shadow-main/20"
                />
                <div className="flex flex-col space-y-1">
                  <p className="font-bold md:text-sm text-xs sm:block hidden text-ft">
                    {conv.doctor.username}
                  </p>
                  <p className="text-xs text-main md:block hidden">
                    {conv.doctor.specialization}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>

      {/* ChatBox Component */}
      <ChatBox
        selectedDoctor={selectedDoctor}
        messages={messages}
        isLoadingMessages={isLoadingMessages}
        message={message}
        setMessage={setMessage}
        onSendMessage={handleSendMessage}
        patientId={user._id}
      />
    </div>
  );
};

export default ChatPage;
