"use server";

import { HttpStatusCode } from "@/constants/httpStatusCode.enum";
import userApiRequest from "@/services/user.services";

export async function emailSendForgotPassword({ body }: { body: any }) {
  try {
    return await userApiRequest.forgotPasswordVerification({
      body,
    });
  } catch (error) {
    return {
      code: HttpStatusCode.InternalServerError,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      data: null,
    };
  }
}

export async function resetPassword({
  body,
}: {
  body: {
    forgot_password_token: string;
    password: string;
    confirm_password: string;
  };
}) {
  try {
    return await userApiRequest.resetPasswordVerification({
      body,
    });
  } catch (error) {
    return {
      code: HttpStatusCode.InternalServerError,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      data: null,
    };
  }
}
