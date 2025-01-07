"use client";
import { useVerifiedUserValidator } from "@/queries/useAuth";
import { useQueryProfiles } from "@/queries/useUsers";
import socket from "@/utils/socket";
import { useCallback, useEffect, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { ConversationList } from "./ConversationList";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

export default function MessengerModule() {
  const conversations = [
    {
      id: 1,
      name: "phamducbinh",
      lastMessage: "Hey, how's it going?",
      time: "2m",
    },
    {
      id: 2,
      name: "binhboong171",
      lastMessage: "Hey, how's it going?",
      time: "2m",
    },
  ];

  const { data: account } = useVerifiedUserValidator();
  const { id } = account?.data || {};
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [name, setName] = useState("");

  const { data: profiles } = useQueryProfiles(
    { name },
    { enabled: Boolean(name) }
  );

  const getProfile = useCallback((name: string) => {
    if (name.trim()) {
      setName(name);
    }
  }, []);

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
    const trimmedValue = value.trim();

    if (!trimmedValue || !profiles?.data?.id) return;

    const message = {
      content: trimmedValue,
      sender: "You",
    };

    setMessages((prev) => [...prev, message]);

    // Gửi tin nhắn qua socket
    socket.emit("private message", {
      content: trimmedValue,
      to: profiles.data.id,
    });
    setValue("");
  };
  return (
    <div className="flex h-screen bg-black text-white">
      <ConversationList conversations={conversations} getProfile={getProfile} />
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
