export const APP_API_ENDPOINT = Object.freeze({
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    LOGIN_GOOGLE: "/api/v1/auth/google",
    VERIFIED_USER_VALIDATOR: "/api/v1/user/profile",
    LOG_OUT: "/api/v1/auth/logout",
  },
  TWITTER: {
    GET_NEWS_FEED_TWEET: ({ limit }: { limit: number }) =>
      `/api/v1/tweet?limit=${limit}`,
  },
  USER: {
    GET_PROFILE: ({ name }: { name: string }) => `/api/v1/user/${name}`,
  },
});
