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
  };
  content: string;
  attachments: [];
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};
