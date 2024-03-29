import * as React from "react";
import { Dispatch } from "react";
import {
  CartAction,
  CartActionTypes,
  ICartProduct,
  SetQuantityType,
  IBuyResponseSend,
} from "./types";
import http from "../../../http_common";

export const cartAddProduct = (data: ICartProduct) => {
  return async (dispatch: Dispatch<CartAction>) => {
    try {
      AddProduct(data, dispatch);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};
export const cartDeleteProduct = (data: number) => {
  return async (dispatch: Dispatch<CartAction>) => {
    try {
      DeleteProduct(data, dispatch);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};
export const cartClear = () => {
  return async (dispatch: Dispatch<CartAction>) => {
    try {
      ClearProduct(dispatch);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};
export const cartSetQuantity = (data: SetQuantityType) => {
  return async (dispatch: Dispatch<CartAction>) => {
    try {
      SetQuantity(data, dispatch);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};
export const cartSetProducts = (data: Array<ICartProduct>) => {
  return async (dispatch: Dispatch<CartAction>) => {
    try {
      SetProducts(data, dispatch);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};
export const cartBuy = (cart: IBuyResponseSend) => {
  return async (dispatch: Dispatch<CartAction>) => {
    try {
      const response = await http.post(
        "api/identity/account/BuyShopItemsAsync",
        cart
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};

const AddProduct = (data: ICartProduct, dispatch: Dispatch<CartAction>) => {
  dispatch({
    type: CartActionTypes.CART_ADD_PRODUCT,
    payload: data,
  });
};
const DeleteProduct = (data: number, dispatch: Dispatch<CartAction>) => {
  dispatch({
    type: CartActionTypes.CART_DELETE_PRODUCT,
    payload: data,
  });
};
const ClearProduct = (dispatch: Dispatch<CartAction>) => {
  dispatch({
    type: CartActionTypes.CART_CLEAR,
  });
};
const SetQuantity = (data: SetQuantityType, dispatch: Dispatch<CartAction>) => {
  dispatch({
    type: CartActionTypes.CART_QUANTITY_SET,
    payload: data,
  });
};
const SetProducts = (
  data: Array<ICartProduct>,
  dispatch: Dispatch<CartAction>
) => {
  dispatch({
    type: CartActionTypes.CART_SET_PRODUCTS,
    payload: data,
  });
};
