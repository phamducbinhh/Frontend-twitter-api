/* eslint-disable no-unused-vars */
export enum TweetType {
  Tweet = 0,
  Retweet = 1,
  Comment = 2,
  QuoteTweet = 3,
}

export enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned, // bị khóa
}
