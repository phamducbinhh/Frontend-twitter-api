export type TFetchConfig = {
  method?: string;
  body?: any;
  token?: string;
};

export type TLoginAuth = {
  email: string;
  password: string;
};
export type TRegisterAuth = {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  date_of_birth: string;
};

export type TUser = {
  id: number;
  name: string;
  email: string;
  date_of_birth: Date;
  password?: string;
  email_verify_token?: string;
  forgot_password_token?: string;
  bio: string;
  location: string;
  website: string;
  username: string;
  cover_photo: string;
  avatar: string;
  verify_status: number;
  following?: any;
  followers?: any;
  createdAt?: Date;
  updatedAt?: Date;
};
