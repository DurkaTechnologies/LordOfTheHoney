import { IHomeState, HomeActionTypes, HomeAction } from "./types";

const initialState: IHomeState = {
  isShopActive: false,
  isShopCartActive: false,
  isStorageActive: false,
};

export const homeReducer = (state = initialState, action: HomeAction) => {
  switch (action.type) {
    case HomeActionTypes.SWITCH_SHOP: {
      return {
        ...state,
        isShopActive: action.payload,
      };
    }
    case HomeActionTypes.SWITCH_SHOP_CART: {
      return {
        ...state,
        isShopCartActive: action.payload,
      };
    }
    case HomeActionTypes.SWITCH_STORAGE: {
      return {
        ...state,
        isStorageActive: action.payload,
      };
    }
    default:
      return state;
  }
};
