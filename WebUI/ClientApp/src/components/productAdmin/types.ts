export enum AuthActionTypes {
  PRODUCT_SET = "PRODUCT_SET",
  PRODUCT_ADD = "PRODUCT_ADD",
  PRODUCT_REMOVE = "PRODUCT_REMOVE",
  PRODUCT_EDIT = "PRODUCT_EDIT",
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  barcode: string;
  imageDataURL: string;
  itemType?: IProductType | null | undefined;
}

export interface ProductSetAction {
  type: AuthActionTypes.PRODUCT_SET;
  payload: Array<IProduct>;
}
export interface ProductAddAction {
  type: AuthActionTypes.PRODUCT_ADD;
  payload: IProduct;
}
export interface ProductDeleteAction {
  type: AuthActionTypes.PRODUCT_REMOVE;
  payload: number;
}
export interface ProductEditAction {
  type: AuthActionTypes.PRODUCT_EDIT;
  payload: IProduct;
}

export interface IProductType {
  id: number;
  name: string;
}

export interface ProductState {
  products: Array<IProduct>;
}

export type ProductAction =
  | ProductSetAction
  | ProductAddAction
  | ProductDeleteAction
  | ProductEditAction;
