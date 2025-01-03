import { APP_API_ENDPOINT } from "@/configs/api";
import { METHOD_TYPE } from "@/configs/method";
import { apiBaseServiceInstance } from "@/lib";

import { TLoginAuth, TRegisterAuth } from "@/types/auth";

class AuthApiRequest {
  public Login({ body }: { body: TLoginAuth }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.LOGIN,
      config: { method: METHOD_TYPE.POST, body },
    });
  }

  public Register({ body }: { body: TRegisterAuth }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.REGISTER,
      config: { method: METHOD_TYPE.POST, body },
    });
  }

  public LoginGoogle({ body }: { body: { token: string } }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.LOGIN_GOOGLE,
      config: { method: METHOD_TYPE.POST, body },
    });
  }

  public Logout(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.LOG_OUT,
      config: { method: METHOD_TYPE.POST },
    });
  }

  public VerifiedUserValidator(): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.VERIFIED_USER_VALIDATOR,
      config: { method: METHOD_TYPE.GET },
    });
  }
}

const authApiRequest = new AuthApiRequest();

export default authApiRequest;
