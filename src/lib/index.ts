import envConfig from "@/configs/env";
import { ApiClient } from "./http";

const createApiClientInstance = (host: string, prefix: string): ApiClient => {
  return new ApiClient(host, prefix);
};

const apiBaseServiceInstance = createApiClientInstance(
  envConfig.NEXT_PUBLIC_API_ENDPOINT as string,
  ""
);

export { apiBaseServiceInstance };
