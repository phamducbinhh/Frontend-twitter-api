import { APP_API_ENDPOINT } from "@/configs/api";
import { METHOD_TYPE } from "@/configs/method";
import { apiBaseServiceInstance } from "@/lib";

class UserApiRequest {
  public getUserProfile({
    name,
    token,
  }: {
    name: string;
    token?: string;
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.USER.GET_PROFILE({ name }),
      config: { method: METHOD_TYPE.GET, token },
    });
  }

  public emailVerification({
    body,
  }: {
    body: { email_verify_token: string };
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.USER.VERIFY_EMAIL,
      config: { method: METHOD_TYPE.POST, body },
    });
  }

  public forgotPasswordVerification({
    body,
  }: {
    body: { email: string };
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.USER.FORGOT_PASSWORD,
      config: { method: METHOD_TYPE.POST, body },
    });
  }

  public resetPasswordVerification({
    body,
  }: {
    body: {
      forgot_password_token: string;
      password: string;
      confirm_password: string;
    };
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.USER.RESET_PASSWORD,
      config: { method: METHOD_TYPE.POST, body },
    });
  }
}

const userApiRequest = new UserApiRequest();

export default userApiRequest;
