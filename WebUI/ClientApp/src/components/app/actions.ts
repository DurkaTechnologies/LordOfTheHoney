import { Dispatch } from "react";
import { HomeActionTypes, HomeAction } from "./types";

export const switchIsShop = (data: boolean) => {
  return async (dispatch: Dispatch<HomeAction>) => {
    dispatch({
      type: HomeActionTypes.SWITCH_SHOP,
      payload: data,
    });
  };
};
export const switchIsShopCart = (data: boolean) => {
  return async (dispatch: Dispatch<HomeAction>) => {
    dispatch({
      type: HomeActionTypes.SWITCH_SHOP_CART,
      payload: data,
    });
  };
};
