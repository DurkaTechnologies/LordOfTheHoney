import { stat } from "fs";
import { CartAction, CartState, CartActionTypes } from "./types";

const initialState: CartState = {
  cartProducts: [],
};

export const cartReducer = (state = initialState, action: CartAction) => {
  switch (action.type) {
    case CartActionTypes.CART_ADD_PRODUCT: {
      const tmpProducts = state.cartProducts.slice();
      if (tmpProducts.filter((x) => x.id === action.payload.id)[0]) {
        tmpProducts.filter((x) => x.id === action.payload.id)[0].quantity++;
      } else {
        tmpProducts.push(action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(tmpProducts));
      return {
        ...state,
        cartProducts: tmpProducts,
      };
    }
    case CartActionTypes.CART_DELETE_PRODUCT: {
      const tmpProducts = state.cartProducts.filter(
        (x) => x.id != action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(tmpProducts));
      return {
        ...state,
        cartProducts: tmpProducts,
      };
    }
    case CartActionTypes.CART_CLEAR: {
      localStorage.removeItem("cartItems");
      return {
        ...state,
        cartProducts: [],
      };
    }
    case CartActionTypes.CART_QUANTITY_SET: {
      const tmpProducts = state.cartProducts.slice();
      tmpProducts.filter((x) => x.id == action.payload.productId)[0]!.quantity =
        action.payload.newQuantity;
      localStorage.setItem("cartItems", JSON.stringify(tmpProducts));
      return {
        ...state,
        cartProducts: tmpProducts,
      };
    }
    case CartActionTypes.CART_SET_PRODUCTS: {
      return {
        ...state,
        cartProducts: action.payload,
      };
    }
    default:
      return state;
  }
};
