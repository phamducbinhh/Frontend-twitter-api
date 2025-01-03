import { getNewsFeedTweet } from "@/lib/action/tweet.action";
import Post from "./Post";

interface TweetResponse<T> {
  tweets: {
    items: T[];
    total: number;
    limit: number;
    offset: number;
  };
}
async function getPostFeedTweet(): Promise<TweetResponse<any>> {
  return (await getNewsFeedTweet({
    limit: 10,
  })) as TweetResponse<any>;
}
export default async function Feed() {
  const postFeedTweet = await getPostFeedTweet();
  const { tweets } = postFeedTweet;
  return (
    <>
      {tweets?.items.map((tweet: any) => {
        return <Post key={tweet.id} data={tweet} />;
      })}
    </>
  );
}
