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

import jwt_decode from "jwt-decode";

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

      const user = jwt_decode(token) as IUser;

      //Write to redux
      dispatch({
        type: AuthActionTypes.LOGIN_AUTH,
        payload: user,
      });

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

      dispatch({
        type: AuthActionTypes.LOGOUT_AUTH,
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};
export const userCoinsSpend = (value: number) => {
  return async (dispatch: React.Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.USER_COINS_SPEND,
      payload: value,
    });
  };
};
