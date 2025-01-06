import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

const conversations = [
  { id: 1, name: "John Doe", lastMessage: "Hey, how's it going?", time: "2m" },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Did you see the latest tweet?",
    time: "1h",
  },
  {
    id: 3,
    name: "Bob Johnson",
    lastMessage: "Let's catch up soon!",
    time: "2h",
  },
];

const messages = [
  { id: 1, sender: "John Doe", content: "Hey there!", time: "10:30 AM" },
  { id: 2, sender: "You", content: "Hi John! How are you?", time: "10:31 AM" },
  {
    id: 3,
    sender: "John Doe",
    content: "I'm good, thanks! How about you?",
    time: "10:32 AM",
  },
  {
    id: 4,
    sender: "You",
    content: "Doing well, thanks for asking!",
    time: "10:33 AM",
  },
];

export default function MessengerModule() {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Conversation List */}
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

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-black p-4 border-b border-zinc-800 flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://api.dicebear.com/6.x/avataaars/svg?seed=John%20Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h2 className="ml-4 text-xl font-semibold">John Doe</h2>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md ${
                  message.sender === "You" ? "bg-blue-600" : "bg-zinc-800"
                } rounded-lg p-3`}
              >
                <p>{message.content}</p>
                <span className="text-xs mt-1 block text-zinc-400">
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Message Input */}
        <div className="bg-black p-4 border-t border-zinc-800">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Type a message..."
              className="flex-1 bg-zinc-900 border-zinc-700 text-white placeholder-zinc-400"
            />
            <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
