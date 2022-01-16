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
export const switchIsStorage = (data: boolean) => {
  return async (dispatch: Dispatch<HomeAction>) => {
    dispatch({
      type: HomeActionTypes.SWITCH_STORAGE,
      payload: data,
    });
  };
};
export const switchIsHeader = (data: boolean) => {
  return async (dispatch: Dispatch<HomeAction>) => {
    dispatch({
      type: HomeActionTypes.SWITCH_HEADER,
      payload: data,
    });
  };
};
export const switchIsInventory = (data: boolean) => {
  return async (dispatch: Dispatch<HomeAction>) => {
    dispatch({
      type: HomeActionTypes.SWITCH_INVENTORY,
      payload: data,
    });
  };
};
