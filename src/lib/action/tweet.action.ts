import { OBJECT_TYPE_ERROR } from "@/configs/error";
import { HttpStatusCode } from "@/constants/httpStatusCode.enum";
import tweetApiRequest from "@/services/tweet.services";

export async function getNewsFeedTweet({ limit }: { limit: number }) {
  try {
    const response = await tweetApiRequest.getNewsFeedTweet({
      limit,
    });

    if (!response) {
      throw new Error(OBJECT_TYPE_ERROR.NO_RESPONSE);
    }

    if (response.status !== HttpStatusCode.Ok) {
      const serverErrorMessage =
        response.message ||
        `${OBJECT_TYPE_ERROR.UNEXPECTED_STATUS_CODE}: ${response.code}`;
      throw new Error(serverErrorMessage);
    }

    return response;
  } catch (error) {
    return {
      code: HttpStatusCode.InternalServerError,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      data: null,
    };
  }
}
