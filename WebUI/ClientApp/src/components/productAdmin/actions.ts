import { IProduct, ProductAction, ProductActionTypes } from "./types";
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
export const addProduct = (data: IProduct) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      AddProduct(data, dispatch);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};
export const editProduct = (data: IProduct) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      EditProduct(data, dispatch);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};
export const deleteProduct = (data: number) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      DeleteProduct(data, dispatch);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};
export const setCurrentProduct = (data: IProduct) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      SetCurrentProduct(data, dispatch);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};

const SetProducts = (
  data: Array<IProduct>,
  dispatch: Dispatch<ProductAction>
) => {
  dispatch({
    type: ProductActionTypes.PRODUCT_SET,
    payload: data,
  });
};
const AddProduct = (data: IProduct, dispatch: Dispatch<ProductAction>) => {
  dispatch({
    type: ProductActionTypes.PRODUCT_ADD,
    payload: data,
  });
};
const DeleteProduct = (data: number, dispatch: Dispatch<ProductAction>) => {
  dispatch({
    type: ProductActionTypes.PRODUCT_REMOVE,
    payload: data,
  });
};
const EditProduct = (data: IProduct, dispatch: Dispatch<ProductAction>) => {
  dispatch({
    type: ProductActionTypes.PRODUCT_EDIT,
    payload: data,
  });
};
const SetCurrentProduct = (
  data: IProduct,
  dispatch: Dispatch<ProductAction>
) => {
  dispatch({
    type: ProductActionTypes.CURRENT_PRODUCT_SET,
    payload: data,
  });
};
