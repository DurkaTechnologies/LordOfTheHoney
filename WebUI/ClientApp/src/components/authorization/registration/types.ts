export enum RegisterActionTypes {
  REGISTER_AUTH = "REGISTER_AUTH",
}

export interface IRegisterModel {
  nickname: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterAction {
  type: RegisterActionTypes.REGISTER_AUTH;
  payload: IRegisterModel;
}

export type RegisterError = {
  nickname: Array<string>;
  email: Array<string>;
  password: Array<string>;
  confirmPassword: Array<string>;
};

export type RegisterErrors = {
  errors: RegisterError;
  status: number;
};
