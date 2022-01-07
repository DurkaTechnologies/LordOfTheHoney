export enum CartActionTypes {
  CART_SET_PRODUCTS = "CART_SET_PRODUCTS",
  CART_ADD_PRODUCT = "CART_ADD_PRODUCT",
  CART_DELETE_PRODUCT = "CART_DELETE_PRODUCT",
  CART_CLEAR = "CART_CLEAR",
  CART_QUANTITY_SET = "CART_QUANTITY_SET",
}

export interface ICartProduct {
  id: number;
  name: string | null;
  shopItemTypeId: number;
  picturePath: Blob | undefined | null | string;
  cost: number;
  quantity: number;
}

export interface CartState {
  cartProducts: Array<ICartProduct>;
}

export interface SetQuantityType {
  productId: number;
  newQuantity: number;
}

export interface CartSetProductsAction {
  type: CartActionTypes.CART_SET_PRODUCTS;
  payload: Array<ICartProduct>;
}
export interface CartAddProductAction {
  type: CartActionTypes.CART_ADD_PRODUCT;
  payload: ICartProduct;
}
export interface CartDeleteProductAction {
  type: CartActionTypes.CART_DELETE_PRODUCT;
  payload: number;
}
export interface CartClearProductAction {
  type: CartActionTypes.CART_CLEAR;
}
export interface CartSetQuantity {
  type: CartActionTypes.CART_QUANTITY_SET;
  payload: SetQuantityType;
}

export type CartAction =
  | CartAddProductAction
  | CartDeleteProductAction
  | CartClearProductAction
  | CartSetQuantity
  | CartSetProductsAction;
