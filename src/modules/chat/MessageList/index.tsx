import { ScrollArea } from "@/components/ui/scroll-area";
import { formatTime } from "@/helpers";

interface Message {
  sender_id: number;
  content: string;
  createdAt: string;
}

interface MessageListProps {
  messages: Message[];
  user_id: number;
}

export function MessageList({ messages, user_id }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 p-4 space-y-4">
      {messages.map((item, index) => (
        <div
          key={index}
          className={`flex mb-2 ${
            item.sender_id === user_id ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
              item.sender_id === user_id
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-200"
            } shadow-md`}
          >
            <p className="text-sm">{item.content}</p>
            {item.sender_id !== user_id && (
              <span className="text-xs mt-1 block text-zinc-400">
                {formatTime(item.createdAt)}
              </span>
            )}
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}
