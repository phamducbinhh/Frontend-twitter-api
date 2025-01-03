import { APP_API_ENDPOINT } from "@/configs/api";
import { METHOD_TYPE } from "@/configs/method";
import { apiBaseServiceInstance } from "@/lib";

class UserApiRequest {
  public getUserProfile({
    name,
    token,
  }: {
    name: string;
    token: string;
  }): Promise<any> {
    return apiBaseServiceInstance.Http({
      path: APP_API_ENDPOINT.USER.GET_PROFILE({ name }),
      config: { method: METHOD_TYPE.GET, token },
    });
  }
}

const userApiRequest = new UserApiRequest();

export default userApiRequest;
