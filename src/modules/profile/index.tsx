import CustomImage from "@/components/CustomImage";
import Feed from "@/components/Feed";
import Image from "@/components/Image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserVerifyStatus } from "@/constants/enums";
import { formatDateString } from "@/helpers";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ProfileModule({ data }: any) {
  if (!data) return null;
  return (
    <main>
      {/* PROFILE TITLE */}
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-[#00000084]">
        <Link href="/">
          <Image path="icons/back.svg" alt="back" w={24} h={24} />
        </Link>
        <h1 className="font-bold text-lg">{data.name}</h1>
      </div>
      {/* INFO */}
      <div className="">
        {/* COVER & AVATAR CONTAINER */}
        <div className="relative w-full">
          {/* COVER */}
          <div className="w-full aspect-[3/1] relative">
            <CustomImage
              src={data.cover_photo}
              alt=""
              width={600}
              height={200}
            />
          </div>
          {/* AVATAR */}
          <div className="w-1/5 aspect-square rounded-full overflow-hidden border-4 border-black bg-gray-300 absolute left-4 -translate-y-1/2">
            <Avatar style={{ width: "100%", height: "100%" }}>
              <AvatarImage src={data.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-2 p-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <Image path="icons/more.svg" alt="more" w={20} h={20} />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <Image path="icons/explore.svg" alt="more" w={20} h={20} />
          </div>
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer">
            <Link
              href={{
                pathname: `/messenger/${data.name}`,
                query: { receiver_id: data.id },
              }}
            >
              <Image path="icons/message.svg" alt="more" w={20} h={20} />
            </Link>
          </div>
          <button className="py-2 px-4 bg-white text-black font-bold rounded-full">
            Follow
          </button>
        </div>
        {/* USER DETAILS */}
        <div className="p-4 flex flex-col gap-2">
          {/* USERNAME & HANDLE */}
          <div>
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <div className="flex items-center gap-1">
              <span className="text-textGray text-sm">@{data.username}</span>
              {data.verify_status === UserVerifyStatus.Verified && (
                <CheckCircle className="h-4 w-4 ml-1 text-blue-500" />
              )}
            </div>
          </div>
          <p>{data.bio}</p>
          {/* JOB & LOCATION & DATE */}
          <div className="flex gap-4 text-textGray text-[15px]">
            <div className="flex items-center gap-2">
              <Image
                path="icons/userLocation.svg"
                alt="location"
                w={20}
                h={20}
              />
              <span>{data.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Image path="icons/date.svg" alt="date" w={20} h={20} />
              <span>Joined {formatDateString(data.createdAt)}</span>
            </div>
          </div>
          {/* FOLLOWINGS & FOLLOWERS */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold">{data.followers}</span>
              <Link
                href={`${data.name}/followers`}
                className="text-textGray text-[15px] hover:text-iconBlue"
              >
                Followers
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{data.following}</span>
              <Link
                href={`${data.name}/following`}
                className="text-textGray text-[15px] hover:text-iconBlue"
              >
                Followings
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* FEED */}
      <Feed />
    </main>
  );
}
