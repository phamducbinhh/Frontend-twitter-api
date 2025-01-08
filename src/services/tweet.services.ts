import { APP_API_ENDPOINT } from "@/configs/api";
import { METHOD_TYPE } from "@/configs/method";
import { apiBaseServiceInstance } from "@/lib";

class TweetApiRequest {
  public getNewsFeedTweet({
    limit,
    token,
  }: {
    limit: number;
    token: string;
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TWITTER.GET_NEWS_FEED_TWEET({ limit }),
      config: {
        method: METHOD_TYPE.GET,
        token,
        next: {
          revalidate: 60,
        },
      },
    });
  }
}

const tweetApiRequest = new TweetApiRequest();

export default tweetApiRequest;
