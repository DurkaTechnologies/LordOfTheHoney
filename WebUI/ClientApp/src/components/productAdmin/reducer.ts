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
    default:
      return state;
  }
};
