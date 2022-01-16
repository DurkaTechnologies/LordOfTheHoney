export enum HomeActionTypes {
  SWITCH_SHOP = "SWITCH_SHOP",
  SWITCH_SHOP_CART = "SWITCH_SHOP_CART",
  SWITCH_STORAGE = "SWITCH_STORAGE",
  SWITCH_HEADER = "SWITCH_HEADER",
  SWITCH_INVENTORY = "SWITCH_INVENTORY",
}

export interface HomeSwitchShopAction {
  type: HomeActionTypes.SWITCH_SHOP;
  payload: boolean;
}
export interface HomeSwitchShopCartAction {
  type: HomeActionTypes.SWITCH_SHOP_CART;
  payload: boolean;
}
export interface HomeSwitchStorageAction {
  type: HomeActionTypes.SWITCH_STORAGE;
  payload: boolean;
}
export interface HomeSwitchHeaderAction {
  type: HomeActionTypes.SWITCH_HEADER;
  payload: boolean;
}
export interface HomeSwitchInventoryAction {
  type: HomeActionTypes.SWITCH_INVENTORY;
  payload: boolean;
}

export interface IHomeState {
  isShopActive: boolean;
  isShopCartActive: boolean;
  isStorageActive: boolean;
  isHeaderActive: boolean;
  isInventoryActive: boolean;
}

export type HomeAction =
  | HomeSwitchShopAction
  | HomeSwitchShopCartAction
  | HomeSwitchStorageAction
  | HomeSwitchHeaderAction
  | HomeSwitchInventoryAction;
