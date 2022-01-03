export enum AuthActionTypes {
  LOGIN_AUTH = "LOGIN_AUTH",
  LOGOUT_AUTH = "LOGOUT_AUTH",
}
export interface IUser {
  id: string | null | undefined;
  nickname: string;
  email: string;
  role?: string | null | undefined;
}
export interface ILoginModel {
  email: string;
  password: string;
}
export interface AuthState {
  user: null | IUser;
  isAuth: boolean;
}

export interface AuthLogin {
  type: AuthActionTypes.LOGIN_AUTH;
  payload: IUser;
}

export interface AuthLogout {
  type: AuthActionTypes.LOGOUT_AUTH;
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

export type AuthAction = AuthLogin | AuthLogout;
