export enum ProductActionTypes {
  PRODUCT_SET = "PRODUCT_SET",
  PRODUCT_ADD = "PRODUCT_ADD",
  PRODUCT_REMOVE = "PRODUCT_REMOVE",
  PRODUCT_EDIT = "PRODUCT_EDIT",
  CURRENT_PRODUCT_SET = "CURRENT_PRODUCT_SET",
}

export interface IProduct {
  id: number;
  name: string | null;
  description: string | null;
  barcode?: string | undefined | null;
  imageSrc: Blob | undefined | null | string;
  itemType: number;
}

export interface ProductSetAction {
  type: ProductActionTypes.PRODUCT_SET;
  payload: Array<IProduct>;
}
export interface ProductAddAction {
  type: ProductActionTypes.PRODUCT_ADD;
  payload: IProduct;
}
export interface ProductDeleteAction {
  type: ProductActionTypes.PRODUCT_REMOVE;
  payload: number;
}
export interface ProductEditAction {
  type: ProductActionTypes.PRODUCT_EDIT;
  payload: IProduct;
}
export interface ProductCurrentSet {
  type: ProductActionTypes.CURRENT_PRODUCT_SET;
  payload: IProduct;
}

export interface IProductType {
  id: number;
  name: string;
}

export interface ProductState {
  products: Array<IProduct>;
  types: Array<IProductType>;
  currentProduct: IProduct | null;
}

export type ProductAction =
  | ProductSetAction
  | ProductAddAction
  | ProductDeleteAction
  | ProductEditAction
  | ProductCurrentSet;
