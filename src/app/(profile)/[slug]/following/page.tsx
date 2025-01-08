import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FollowingPage() {
  return (
    <div className="dark min-h-screen">
      <main>
        {/* Header */}
        <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4 p-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Link href="/profile">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold">John Doe</h1>
              <p className="text-sm text-gray-500">@johndoe</p>
            </div>
          </div>
          <div className="flex border-b dark:border-gray-800">
            <Link
              href="/profile/followers"
              className="flex-1 text-center py-4 text-gray-500 hover:bg-gray-900"
            >
              Followers
            </Link>
            <Link
              href="/profile/following"
              className="flex-1 text-center py-4 border-b-2 border-blue-500 font-bold"
            >
              Following
            </Link>
          </div>
        </div>

        {/* Following List */}
        <ScrollArea className="h-[calc(100vh-7rem)]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 hover:bg-gray-900 transition-colors"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={`/placeholder-user.jpg`} />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="truncate">
                    <h2 className="font-bold truncate">User Name {i + 1}</h2>
                    <div className="text-gray-500 truncate">
                      @username{i + 1}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-full hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50"
                  >
                    Following
                  </Button>
                </div>
                <p className="text-gray-500 mt-1 line-clamp-2">
                  Full-stack developer | Building awesome things | Love coding
                  and sharing knowledge #{i + 1}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </main>
    </div>
  );
}
