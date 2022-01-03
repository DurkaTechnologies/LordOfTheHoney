import { ProductState, ProductAction } from "./types";

const initialState: ProductState = {
  products: [],
};

export const productReducer = (state = initialState, action: ProductAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
