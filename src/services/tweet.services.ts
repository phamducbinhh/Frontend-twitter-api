import { APP_API_ENDPOINT } from "@/configs/api";
import { METHOD_TYPE } from "@/configs/method";
import { apiBaseServiceInstance } from "@/lib";

class TweetApiRequest {
  public getNewsFeedTweet({ limit }: { limit: number }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.TWITTER.GET_NEWS_FEED_TWEET({ limit }),
      config: { method: METHOD_TYPE.GET },
    });
  }
}

const tweetApiRequest = new TweetApiRequest();

export default tweetApiRequest;
