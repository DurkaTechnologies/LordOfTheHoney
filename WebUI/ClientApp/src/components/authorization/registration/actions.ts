import * as React from "react";
import axios, { AxiosError } from "axios";
import { Dispatch } from "react";
import http from "../../../http_common";
import {
  RegisterAction,
  RegisterActionTypes,
  IRegisterResponse,
  RegisterError,
  IRegisterModel,
} from "./types";

export const registerUser = (data: IRegisterModel) => {
  return async (dispatch: Dispatch<RegisterAction>) => {
    try {
      console.log("data: ", data);
      const response = await http.post<IRegisterResponse>(
        "api/identity/user",
        data
      );

      if (!response.data.succeed) {
        const messages = response.data.message;
        return Promise.reject(messages);
      }

      dispatch({ type: RegisterActionTypes.REGISTER_AUTH });
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<RegisterError>;
        if (serverError && serverError.response) {
          const { messages } = serverError.response.data;
          return Promise.reject(messages);
        }
      }
      return Promise.reject();
    }
  };
};
