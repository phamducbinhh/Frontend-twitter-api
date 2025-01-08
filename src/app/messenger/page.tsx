import { MessageCircle } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-zinc-900">
      <MessageCircle className="h-16 w-16 text-zinc-700 mb-4" />
      <h2 className="text-2xl font-semibold text-zinc-400">
        Select a conversation to start chatting
      </h2>
    </div>
  );
}
