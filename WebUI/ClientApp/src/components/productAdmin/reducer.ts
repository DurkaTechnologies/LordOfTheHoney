import { ProductState, ProductAction, AuthActionTypes } from "./types";

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

const initialProductState = [
  {
    id: 1,
    name: "Honeycomb purple",
    description: "Purple magic honeycomb, great thing",
    barcode: "honeycomb:honeycombpurple",
    imageSrc: "1.png",
    itemType: 1,
  },
  {
    id: 2,
    name: "Honeycomb green",
    description: "Green honeycomb, great thing!",
    barcode: "honeycomb:honeycombgreen",
    imageSrc: "2.png",
    itemType: 1,
  },
  {
    id: 3,
    name: "Bee net",
    description: "Bee net for bee hunting. Great one!",
    barcode: "tools:beenet",
    imageSrc: "3.png",
    itemType: 2,
  },
  {
    id: 4,
    name: "Black-yellow bee",
    description: "Small bee. They not brings honey",
    barcode: "bee:Blackyellowbee",
    imageSrc: "4.png",
    itemType: 3,
  },
];

const initialState: ProductState = {
  products: initialProductState,
  types: initialTypesState,
};

export const itemShopReducer = (
  state = initialState,
  action: ProductAction
) => {
  switch (action.type) {
    case AuthActionTypes.PRODUCT_SET: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case AuthActionTypes.PRODUCT_ADD: {
      const tmpProducts = state.products.slice();
      tmpProducts.push(action.payload);
      return {
        ...state,
        products: tmpProducts,
      };
    }
    case AuthActionTypes.PRODUCT_REMOVE: {
      return {
        ...state,
        products: state.products.filter((x) => x.id !== action.payload),
      };
    }
    case AuthActionTypes.PRODUCT_EDIT: {
      const tmpProducts = state.products.slice();
      const indOfEl = tmpProducts.indexOf(
        tmpProducts.filter((x) => x.id === action.payload.id)[0]
      );
      tmpProducts[indOfEl] = action.payload;
      return {
        ...state,
        products: tmpProducts,
      };
    }
    default:
      return state;
  }
};
