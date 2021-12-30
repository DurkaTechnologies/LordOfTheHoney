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
import jwt_decode, { JwtPayload } from "jwt-decode";
// import jwt from "jsonwebtoken";

export const loginUser = (data: ILoginModel) => {
  return async (dispatch: React.Dispatch<AuthAction>) => {
    try {
      const response = await http.post<ILoginResponse>(
        "/api/identity/token",
        data
      );

      console.log("AAA");

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

export const AuthUser = (
  token: string,
  dispatch: React.Dispatch<AuthAction>
) => {
  const userTmp = parseJwt(token);
  console.log("User: ", userTmp);
  // console.log("User.nickname: ", user.nickname);
  // console.log("User.email: ", user.email);

  // dispatch({
  //   type: AuthActionTypes.LOGIN_AUTH,
  //   payload: user,
  // });
};
function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
