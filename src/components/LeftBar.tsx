"use client";
import { HttpStatusCode } from "@/constants/httpStatusCode.enum";
import { useLogoutMutation, useVerifiedUserValidator } from "@/queries/useAuth";
import { LogOut, MoreHorizontal, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomImage from "./CustomImage";
import Image from "./Image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const LeftBar = () => {
  const logoutMutation = useLogoutMutation();

  const { data, isLoading } = useVerifiedUserValidator();

  const { name, username, avatar } = data?.data || {};

  const router = useRouter();

  const menuList = [
    {
      id: 1,
      name: "Homepage",
      link: "/",
      icon: "home.svg",
    },
    {
      id: 2,
      name: "Messages",
      link: "/messenger",
      icon: "message.svg",
    },
    {
      id: 3,
      name: "Bookmarks",
      link: "/bookmarks",
      icon: "bookmark.svg",
    },
    {
      id: 4,
      name: "Profile",
      link: `/${name || username}`,
      icon: "profile.svg",
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await logoutMutation.mutateAsync();
      if (response?.status === HttpStatusCode.Ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="h-screen sticky top-0 flex flex-col justify-between pt-2 pb-8">
      {/* LOGO MENU BUTTON */}
      <div className="flex flex-col gap-4 text-lg items-center xxl:items-start">
        {/* LOGO */}
        <div className="p-4">
          <h1 className="text-xl font-bold hidden md:block">Twitter Clone</h1>
        </div>
        {/* MENU LIST */}
        <nav className="flex flex-col gap-4">
          {menuList.map((item) => (
            <Link
              href={item.link}
              className="p-2 rounded-full hover:bg-[#181818] flex items-center gap-4"
              key={item.id}
            >
              <Image
                path={`icons/${item.icon}`}
                alt={item.name}
                w={24}
                h={24}
              />
              <span className="hidden xxl:inline">{item.name}</span>
            </Link>
          ))}
        </nav>
        {/* BUTTON */}
        <Link
          href="/compose/post"
          className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center xxl:hidden"
        >
          <CustomImage
            src="icons/post.svg"
            alt="new post"
            width={24}
            height={24}
          />
        </Link>
        <Link
          href="/compose/post"
          className="hidden xxl:block bg-white text-black rounded-full font-bold py-2 px-20"
        >
          Post
        </Link>
      </div>
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <Avatar>
              <AvatarImage src={avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="hidden xxl:flex flex-col">
            {!isLoading && data ? (
              <>
                <span className="font-bold">{name}</span>
                <span className="text-sm text-textGray">{username}</span>
              </>
            ) : (
              <span>Loading...</span> // Hiển thị thông báo nếu đang tải
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 text-red-600 focus:text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default LeftBar;
