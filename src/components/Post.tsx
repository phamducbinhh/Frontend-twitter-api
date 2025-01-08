import { TweetType } from "@/constants/enums";
import { formatLastChangedTime } from "@/helpers";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import CustomImage from "./CustomImage";
import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Post = async ({ type, data }: { type?: TweetType; data?: any }) => {
  if (!data) {
    return null;
  }
  return (
    <div className="p-4 border-y-[1px] border-borderGray">
      {/* POST TYPE */}
      <div className="flex items-center gap-2 text-sm text-textGray mb-2 font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            fill="#71767b"
            d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
          />
        </svg>
        <span>{`${data?.author?.name} reposted`}</span>
      </div>
      {/* POST CONTENT */}
      <div className={`flex gap-4 ${type === TweetType.Tweet && "flex-col"}`}>
        {/* AVATAR */}
        <div
          className={`${
            type === TweetType.Tweet && "hidden"
          } relative w-10 h-10 rounded-full overflow-hidden`}
        >
          <Link href={`/${data?.author?.name}`}>
            <Avatar>
              <AvatarImage src={data?.author?.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        {/* CONTENT */}
        <div className="flex-1 flex flex-col gap-2">
          {/* TOP */}
          <div className="w-full flex justify-between">
            <Link href={`/${data?.author?.name}`} className="flex gap-4">
              <div
                className={`${
                  type !== TweetType.Tweet && "hidden"
                } relative w-10 h-10 rounded-full overflow-hidden`}
              >
                <Avatar>
                  <AvatarImage src={"/general/avatar.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div
                className={`flex items-center gap-2 flex-wrap ${
                  type === TweetType.Tweet && "flex-col gap-0 !items-start"
                }`}
              >
                <h1 className="text-md font-bold">{data?.author?.name}</h1>
                <span
                  className={`text-textGray ${
                    type === TweetType.Tweet && "text-sm"
                  }`}
                >
                  @{data?.author?.username}
                </span>
                {type !== TweetType.Tweet && (
                  <span className="text-textGray">
                    {formatLastChangedTime(data.createdAt)}
                  </span>
                )}
              </div>
            </Link>
            <PostInfo />
          </div>
          {/* TEXT & MEDIA */}
          <Link href={`/${data?.id}`}>
            <p className={`${type === TweetType.Tweet && "text-lg"}`}>
              {data.content}
            </p>
          </Link>
          {data.tweet_media.map((media: any) => (
            <CustomImage
              key={media.url}
              src={media.url}
              alt="post"
              width={600}
              height={600}
            />
          ))}
          {type === TweetType.Tweet && (
            <span className="text-textGray">8:41 PM · Dec 5, 2024</span>
          )}
          <PostInteractions post={data} />
        </div>
      </div>
    </div>
  );
};

export default Post;
