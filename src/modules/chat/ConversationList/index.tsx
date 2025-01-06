import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
}

interface ConversationListProps {
  conversations: Conversation[];
}

export function ConversationList({ conversations }: ConversationListProps) {
  return (
    <div className="w-1/3 border-r border-zinc-800 hidden md:block">
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-60px)]">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="flex items-center p-4 border-b border-zinc-800 hover:bg-zinc-900 cursor-pointer"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${conversation.name}`}
              />
              <AvatarFallback>{conversation.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold">{conversation.name}</h3>
                <span className="text-sm text-zinc-400">
                  {conversation.time}
                </span>
              </div>
              <p className="text-sm text-zinc-400 truncate">
                {conversation.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
