import { OBJECT_TYPE_ERROR } from "@/configs/error";
import { HttpStatusCode } from "@/constants/httpStatusCode.enum";
import tweetApiRequest from "@/services/tweet.services";
import { getTokenCookies } from "./getCookies";

export async function getNewsFeedTweet({ limit }: { limit: number }) {
  try {
    const token = (await getTokenCookies()) as string;
    const response = await tweetApiRequest.getNewsFeedTweet({
      limit,
      token,
    });

    if (!response) {
      throw new Error(OBJECT_TYPE_ERROR.NO_RESPONSE);
    }

    return response.data;
  } catch (error) {
    return {
      code: HttpStatusCode.InternalServerError,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      data: null,
    };
  }
}
