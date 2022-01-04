import { IProduct, ProductAction, AuthActionTypes } from "./types";
import { Dispatch } from "react";
import http from "../../http_common";

export const getProducts = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      //   const response = await http.post<ILoginResponse>(
      //     "/api/identity/token"
      //   );

      //Write to redux
      // SetProducts();

      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};

export const SetProducts = (
  data: Array<IProduct>,
  dispatch: Dispatch<ProductAction>
) => {
  dispatch({
    type: AuthActionTypes.PRODUCT_SET,
    payload: data,
  });
};
