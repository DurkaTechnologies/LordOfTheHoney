import * as React from "react";
import {
  AuthAction,
  ILoginModel,
  ILoginResponse,
  AuthActionTypes,
  IUser,
} from "./types";

import http from "../../../http_common"; //axios
import axios, { AxiosError } from "axios";
import { AuthUser, LogoutUser } from "./service";

export const loginUser = (data: ILoginModel) => {
  return async (dispatch: React.Dispatch<AuthAction>) => {
    try {
      const response = await http.post<ILoginResponse>(
        "/api/identity/token",
        data
      );

      const { token } = response.data.data;
      const { refreshToken } = response.data.data;

      localStorage.token = token;
      localStorage.refreshToken = refreshToken;

      //Write to redux
      AuthUser(token, dispatch);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};
export const logoutUser = () => {
  return async (dispatch: React.Dispatch<AuthAction>) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      LogoutUser(dispatch);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};
