import { OBJECT_TYPE_ERROR } from "@/configs/error";
import { HttpStatusCode } from "@/constants/httpStatusCode.enum";
import userApiRequest from "@/services/user.services";
import { getTokenCookies } from "./getCookies";

class UserAction {
  async getUserProfile({ name }: { name: string }) {
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

  async emailSendVerification({ body }: { body: any }) {
    try {
      const response = await userApiRequest.emailVerification({ body });

      if (!response) {
        throw new Error(OBJECT_TYPE_ERROR.NO_RESPONSE);
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

  async getReceiverList() {
    const token = (await getTokenCookies()) as string;
    try {
      const response = await userApiRequest.getReceiverList({ token });

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
}

const userAction = new UserAction();
export default userAction;
