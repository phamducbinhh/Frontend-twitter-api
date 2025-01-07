"use client";
import { useVerifiedUserValidator } from "@/queries/useAuth";
import socket from "@/utils/socket";
import { useEffect, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { ConversationList } from "./ConversationList";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

export default function MessengerModule() {
  const conversations = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how's it going?",
      time: "2m",
    },
  ];

  const { data: account } = useVerifiedUserValidator();
  const { id } = account?.data || {};
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket.auth = { id };
    socket.connect();

    const handleMessage = (data: any) => {
      setMessages((prev) => [...prev, { ...data, sender: "Other" }]);
    };

    socket.on("receive private message", handleMessage);

    return () => {
      socket.off("receive private message", handleMessage);
      socket.disconnect();
    };
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;

    // Gửi tin nhắn qua socket
    const message = {
      content: value,
      sender: "You",
    };
    setMessages((prev) => [...prev, message]);

    socket.emit("private message", { content: value, to: 29 });
    setValue("");
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <ConversationList conversations={conversations} />
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        <MessageList messages={messages} />
        <MessageInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
