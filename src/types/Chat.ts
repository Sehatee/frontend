export type Doctor = {
  _id: string;
  username: string;
  specialization: string;
  picture: string;
  conversationId?: string;
};

export type UIEventMessage = {
  text: string;
  img: string;
  isReceived: boolean;
  senderId?: string;
};

export type Message = {
  _id: string;
  conversationId: string;
  sender: {
    _id: string;
    username: string;
    picture: string;
    role: string;
  };
  receiver: {
    _id: string;
    username: string;
    picture: string;
    role: string;
  };
  content: string;
  attachments: [];
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Conversation = {
  _id: string;
  doctor: {
    _id: string;
    username: string;
    specialization: string;
    picture: string;
  };
  participants: string[];
  lastMessage: string;
  patient: {
    _id: string;
    username: string;
    specialization: string;
    picture: string;
  };
  unreadCount: {
    doctor: number;
    patient: number;
  };
  createdAt: string;
  updatedAt: string;
};
