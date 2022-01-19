import {
  IProduct,
  ProductAction,
  ProductActionTypes,
  IProductGetResponse,
  IProductFilter,
  IProductResponse,
  IProductServerError,
  IProductTypesGetResponse,
  IProductType,
  IProductError,
  ProductPaginationState,
  IProductImage,
} from "./types";
import { Dispatch } from "react";
import http from "../../http_common";
import axios, { AxiosError } from "axios";

import * as qs from "qs";

export const getProducts = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const response = await http.get<IProductGetResponse>(
        `/api/shop/shopItem?sortDirection=1`
      );

      if (response.data.failed) {
        return Promise.reject(response.data.Messages);
      }
      const { data } = response.data;

      //Write to redux
      SetProducts(data as Array<IProduct>, dispatch);

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IProductGetResponse>;
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response?.data.Messages.join("\n"));
        }
      }
      return Promise.reject();
    }
  };
};
export const getFilterProducts = (dataFilter: IProductFilter) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const response = await http.get<IProductGetResponse>(
        `/api/shop/shopItem?${qs.stringify(dataFilter)}`
      );

      if (response.data.failed) {
        return Promise.reject(response.data.Messages);
      }
      const { data } = response.data;
      const pagination: ProductPaginationState = response.data;

      //Write to redux
      SetProducts(data as Array<IProduct>, dispatch);
      SetPagination(pagination, dispatch);

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IProductGetResponse>;
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response?.data.Messages.join("\n"));
        }
      }
      return Promise.reject();
    }
  };
};
export const getProductTypes = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      let data: Array<IProductType> = [];
      // if (localStorage.getItem("itemTypes")) {
      //   data = JSON.parse(
      //     localStorage.getItem("itemTypes") as string
      //   ) as Array<IProductType>;
      // } else {
      const response = await http.get(`/api/shop/shopItemType`);

      data = response.data;

      if (data.length === 0) return Promise.reject("No one product type");

      localStorage.setItem("itemTypes", JSON.stringify(data));
      // }
      //Write to redux
      SetProductTypes(data, dispatch);

      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IProductResponse>;
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response?.data.Messages.join("\n"));
        }
      }
      return Promise.reject();
    }
  };
};
export const addProduct = (data: IProduct) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const response = await http.post<IProductResponse>(
        `/api/shop/shopItem/CreateShopItem/`, data);
      AddProduct(data, dispatch);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let serverError = null;
        if (error as AxiosError<IProductError>) {
          serverError = error as AxiosError<IProductError>;
          return Promise.reject(serverError.response?.data.Messages.join("\n"));
        } else if (error as AxiosError<IProductServerError>) {
          serverError = error as AxiosError<IProductServerError>;
          return Promise.reject(
            `${serverError.response?.data.status} ${serverError.response?.data.title}`
          );
        }
      }
      return Promise.reject();
    }
  };
};
export const editProduct = (data: IProduct) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const response = http.patch<IProductResponse>("api/shop/shopItem", data);

      EditProduct(data, dispatch);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let serverError = null;
        if (error as AxiosError<IProductError>) {
          serverError = error as AxiosError<IProductError>;
          return Promise.reject(serverError.response?.data.Messages.join("\n"));
        } else if (error as AxiosError<IProductServerError>) {
          serverError = error as AxiosError<IProductServerError>;
          return Promise.reject(
            `${serverError.response?.data.status} ${serverError.response?.data.title}`
          );
        }
      }
      return Promise.reject();
    }
  };
};
export const deleteProduct = (data: number) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const response = await http.delete<IProductResponse>(
        `/api/shop/shopItem/${data}`
      );

      DeleteProduct(data, dispatch);
      return Promise.resolve();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<IProductGetResponse>;
        if (serverError && serverError.response) {
          return Promise.reject(serverError.response?.data.Messages.join("\n"));
        }
      }
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
const SetProductTypes = (
  data: Array<IProductType>,
  dispatch: Dispatch<ProductAction>
) => {
  dispatch({
    type: ProductActionTypes.PRODUCT_TYPES_SET,
    payload: data,
  });
};
const SetPagination = (
  data: ProductPaginationState,
  dispatch: Dispatch<ProductAction>
) => {
  dispatch({
    type: ProductActionTypes.PRODUCT_PAGINATION_SET,
    payload: data,
  });
};
