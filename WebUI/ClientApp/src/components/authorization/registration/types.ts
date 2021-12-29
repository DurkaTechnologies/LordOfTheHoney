export enum RegisterActionTypes {
  REGISTER_AUTH = "REGISTER_AUTH",
}

export interface IRegisterModel {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  activateUser: boolean;
  autoConfirmEmail: boolean;
}

export interface RegisterAction {
  type: RegisterActionTypes.REGISTER_AUTH;
}

export interface IRegisterResponse {
  data: string;
  message: string;
  succeed: boolean;
}

export type RegisterError = {
  messages: Array<string>;
  succeeded: boolean;
};
