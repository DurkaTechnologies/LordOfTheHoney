import { IHomeState, HomeActionTypes, HomeAction } from "./types";

const initialState: IHomeState = {
  isShopActive: false,
};

export const homeReducer = (state = initialState, action: HomeAction) => {
  switch (action.type) {
    case HomeActionTypes.SWITCH_SHOP: {
      return {
        ...state,
        isShopActive: action.payload,
      };
    }
    default:
      return state;
  }
};
