import * as React from "react";
import {
  AuthAction,
  ILoginModel,
  ILoginResponse,
  AuthActionTypes,
  IUser,
  ILoginErrors,
} from "./types";

import http from "../../../http_common"; //axios
import axios, { AxiosError } from "axios";
import jwt from "jsonwebtoken";

export const loginUser = (data: ILoginModel) => {
  return async (dispatch: React.Dispatch<AuthAction>) => {
    try {
      const response = await http.post<ILoginResponse>("/api/auth/login", data);

      const { access_token } = response.data;
      localStorage.token = access_token;

      //Write to redux
      AuthUser(access_token, dispatch);

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ILoginErrors>;
        if (serverError && serverError.response) {
          const { errors } = serverError.response?.data;
          return Promise.reject(errors);
        }
      }
      return Promise.reject();
    }
  };
};

export const AuthUser = (
  token: string,
  dispatch: React.Dispatch<AuthAction>
) => {
  const user = jwt.decode(token) as IUser;
  dispatch({
    type: AuthActionTypes.LOGIN_AUTH,
    payload: user,
  });
};
