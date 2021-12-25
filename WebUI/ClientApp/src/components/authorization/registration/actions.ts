import * as React from "react";
import axios, { AxiosError } from "axios";
import { Dispatch } from "react";
import http_common from "../../../http_common";
import { RegisterAction, RegisterActionTypes, RegisterErrors } from "./types";

export const RegisterUser = (data: FormData) => {
  return async (dispatch: Dispatch<RegisterAction>) => {
    try {
      const response = await http_common.post("api/user/register", data);
      const token = await response.data.token;
      dispatch({
        type: RegisterActionTypes.REGISTER_AUTH,
        payload: token,
      });
      return Promise.resolve(token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<RegisterErrors>;
        if (serverError && serverError.response) {
          const { errors } = serverError.response.data;
          return Promise.reject(errors);
        }
      }
      return Promise.reject();
    }
  };
};
