import { OBJECT_TYPE_ERROR } from "@/configs/error";
import { HttpStatusCode } from "@/constants/httpStatusCode.enum";
import userApiRequest from "@/services/user.services";
import { getTokenCookies } from "./getCookies";

export async function getUserProfile({ name }: { name: string }) {
  try {
    const token = (await getTokenCookies()) as string;
    const response = await userApiRequest.getUserProfile({
      name,
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
