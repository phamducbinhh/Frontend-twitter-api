import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  sender: string;
  content: string;
  time: string;
}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 p-4 space-y-4">
      {messages.map((item, index) => (
        <div
          key={index}
          className={`flex ${
            item.sender === "You" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs md:max-w-md ${
              item.sender === "You" ? "bg-blue-600" : "bg-zinc-800"
            } rounded-lg p-3`}
          >
            <p>{item.content}</p>
            <span className="text-xs mt-1 block text-zinc-400">
              {item.time}
            </span>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}
