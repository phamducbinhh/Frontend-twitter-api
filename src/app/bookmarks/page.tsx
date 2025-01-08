import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat,
} from "lucide-react";

const bookmarks = [
  {
    id: 1,
    author: "John Doe",
    username: "@johndoe",
    content:
      "Just learned about the new features in React 18. Excited to try them out!",
    timestamp: "2h ago",
    likes: 15,
    retweets: 5,
    replies: 3,
  },
  {
    id: 2,
    author: "Jane Smith",
    username: "@janesmith",
    content:
      "Here's a great article on optimizing performance in Next.js applications. A must-read for all Next.js developers!",
    timestamp: "5h ago",
    likes: 32,
    retweets: 12,
    replies: 7,
  },
  {
    id: 3,
    author: "Tech News",
    username: "@technews",
    content:
      "Breaking: Major tech company announces new AI-powered coding assistant. Could this change the way we write code?",
    timestamp: "1d ago",
    likes: 245,
    retweets: 89,
    replies: 56,
  },
];

export default function BookmarksPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Bookmarks</h1>
        <ScrollArea className="h-[calc(100vh-100px)]">
          {bookmarks.map((bookmark) => (
            <Card
              key={bookmark.id}
              className="mb-4 bg-zinc-900 border-zinc-800"
            >
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${bookmark.author}`}
                  />
                  <AvatarFallback>{bookmark.author.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-sm font-semibold text-white">
                    {bookmark.author}
                  </CardTitle>
                  <p className="text-xs text-zinc-400">{bookmark.username}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-2 text-white">{bookmark.content}</p>
                <p className="text-xs text-zinc-400 mb-2">
                  {bookmark.timestamp}
                </p>
                <div className="flex justify-between text-zinc-400">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:text-blue-500"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {bookmark.replies}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:text-green-500"
                  >
                    <Repeat className="h-4 w-4 mr-1" />
                    {bookmark.retweets}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:text-red-500"
                  >
                    <Heart className="h-4 w-4 mr-1" />
                    {bookmark.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-blue-500">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
