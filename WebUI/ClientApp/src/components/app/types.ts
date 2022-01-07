export enum HomeActionTypes {
  SWITCH_SHOP = "SWITCH_SHOP",
}

export interface HomeSwitchShopAction {
  type: HomeActionTypes.SWITCH_SHOP;
  payload: boolean;
}

export interface IHomeState {
  isShopActive: boolean;
}

export type HomeAction = HomeSwitchShopAction;
