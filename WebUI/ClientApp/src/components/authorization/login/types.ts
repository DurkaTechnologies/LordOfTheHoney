export enum AuthActionTypes {
  LOGIN_AUTH = "LOGIN_AUTH",
}
export interface IUser {
  nickname: string;
  email: string;
}
export interface ILoginModel {
  email: string;
  password: string;
}
export interface AuthState {
  user: null | IUser;
  isAuth: boolean;
}

export interface AuthAction {
  type: AuthActionTypes.LOGIN_AUTH;
  payload: IUser;
}

export interface ILoginResponse {
  data: ILoginResponseData;
  messages: Array<string>;
  succeeded: boolean;
}
export interface ILoginResponseData {
  token: string;
  refreshToken: string;
  userImageUrl: string | null;
  refreshTokenExpiryTime: Date;
}
