import * as React from "react";
import axios, { AxiosError } from "axios";
import { Dispatch } from "react";
import http from "../../../http_common";
import { IRegisterResponse, RegisterError, IRegisterModel } from "./types";

export const registerUser = async (data: IRegisterModel) => {
  var serverErrors: Array<string> | undefined = [];
  var isError: boolean = false;
  const response = await http
    .post<IRegisterResponse>("api/identity/user", data)
    .catch(function (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data as RegisterError;
        if (serverError) {
          isError = true;
          serverErrors = serverError.messages;
        }
      }
    });

  if (isError) {
    return Promise.reject(serverErrors);
  }
  return Promise.resolve();
};
