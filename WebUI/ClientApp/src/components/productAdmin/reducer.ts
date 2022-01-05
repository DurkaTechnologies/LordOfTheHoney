import { string } from "yup/lib/locale";
import { ProductState, ProductAction, ProductActionTypes } from "./types";
import { initialProductState } from "./seeders";

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
  products: initialProductState,
  types: initialTypesState,
  currentProduct: {
    id: 0,
    name: "",
    description: "",
    imageSrc: "",
    itemType: 0,
  },
};

export const itemShopReducer = (
  state = initialState,
  action: ProductAction
) => {
  switch (action.type) {
    case ProductActionTypes.PRODUCT_SET: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case ProductActionTypes.PRODUCT_ADD: {
      const tmpProducts = state.products.slice();
      tmpProducts.push(action.payload);
      return {
        ...state,
        products: tmpProducts,
      };
    }
    case ProductActionTypes.PRODUCT_REMOVE: {
      return {
        ...state,
        products: state.products.filter((x) => x.id !== action.payload),
      };
    }
    case ProductActionTypes.PRODUCT_EDIT: {
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
    case ProductActionTypes.CURRENT_PRODUCT_SET: {
      return {
        ...state,
        currentProduct: action.payload,
      };
    }
    default:
      return state;
  }
};
