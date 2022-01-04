import { ProductState, ProductAction, IProductType } from "./types";

const initialTypesState = [
  {
    id: 1,
    name: "Honeycomb",
  },
  {
    id: 2,
    name: "Tools",
  },
  {
    id: 3,
    name: "Bee's",
  },
];

const initialState: ProductState = {
  products: [],
  types: initialTypesState,
};

export const itemShopReducer = (
  state = initialState,
  action: ProductAction
) => {
  switch (action.type) {
    default:
      return state;
  }
};
