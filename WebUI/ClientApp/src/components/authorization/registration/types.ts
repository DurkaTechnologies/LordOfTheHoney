export interface IRegisterModel {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  activateUser: boolean;
  autoConfirmEmail: boolean;
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
