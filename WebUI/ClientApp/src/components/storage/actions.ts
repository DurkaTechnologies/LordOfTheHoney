import * as React from "react";
import { Dispatch } from "react";

import {
  IStorageItem,
  StorageAction,
  StorageActionTypes,
  IFetchStorageResponse,
} from "./types";

import http from "../../http_common";

export const storageSetItems = (items: Array<IStorageItem>) => {
  return async (dispatch: Dispatch<StorageAction>) => {
    try {
      SetProducts(items, dispatch);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};
export const storageFetchItems = (userId: string) => {
  return async (dispatch: Dispatch<StorageAction>) => {
    try {
      const response = await http.get<IFetchStorageResponse>(
        `api/identity/account/GetUserStorage?userId=${userId}`
      );

      const { data } = response.data;
      let storageItems: Array<IStorageItem> = [];
      data.forEach((x) => {
        storageItems.push({ ...x.shopItem, quantity: x.quantity });
      });

      SetProducts(storageItems, dispatch);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};
export const storageAddItems = (items: Array<IStorageItem>) => {
  return async (dispatch: Dispatch<StorageAction>) => {
    try {
      BuyItems(items, dispatch);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};
export const storageRemoveItem = (value: number) => {
  return async (dispatch: Dispatch<StorageAction>) => {
    try {
      RemoveItem(value, dispatch);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
};

const SetProducts = (
  data: Array<IStorageItem>,
  dispatch: Dispatch<StorageAction>
) => {
  dispatch({
    type: StorageActionTypes.STORAGE_SET_ITEMS,
    payload: data,
  });
};
const BuyItems = (
  data: Array<IStorageItem>,
  dispatch: Dispatch<StorageAction>
) => {
  dispatch({
    type: StorageActionTypes.STORAGE_ADD_ITEMS,
    payload: data,
  });
};
const RemoveItem = (data: number, dispatch: Dispatch<StorageAction>) => {
  dispatch({
    type: StorageActionTypes.STORAGE_REMOVE_ITEM,
    payload: data,
  });
};
