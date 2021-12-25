export enum AuthActionTypes {
  LOGIN_AUTH = "LOGIN_AUTH",
}
export interface IUser {
  nickname: string;
  email: string;
}
export interface ILoginModel {
  nickname: string;
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
  access_token: string;
  expires_in: string;
}

export interface ILoginError {
  password: Array<string>;
  email: Array<string>;
  invalid: Array<string>;
}
export interface ILoginErrors {
  errors: ILoginError;
  status: number;
}
