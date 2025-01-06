"use server";

import { OBJECT_TYPE_ERROR } from "@/configs/error";
import { HttpStatusCode } from "@/constants/httpStatusCode.enum";
import userApiRequest from "@/services/user.services";

export async function emailSendForgotPassword({ body }: { body: any }) {
  try {
    const response = await userApiRequest.forgotPasswordVerification({
      body,
    });

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
