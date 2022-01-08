export enum ProductActionTypes {
  PRODUCT_SET = "PRODUCT_SET",
  PRODUCT_ADD = "PRODUCT_ADD",
  PRODUCT_REMOVE = "PRODUCT_REMOVE",
  PRODUCT_EDIT = "PRODUCT_EDIT",
  CURRENT_PRODUCT_SET = "CURRENT_PRODUCT_SET",

  PRODUCT_TYPES_SET = "PRODUCT_TYPES_GET",

  PRODUCT_PAGINATION_SET = "PRODUCT_PAGINATION_SET",
}

export interface IProduct {
  id: number;
  name: string | null;
  shopItemTypeId: number;
  picturePath: Blob | undefined | null | string;
  cost: number;
  description: string | null;
  barcode?: string | undefined | null;
}
export interface IProductType {
  id: number;
  name: string;
  description: string;
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
export interface ProductCurrentSetAction {
  type: ProductActionTypes.CURRENT_PRODUCT_SET;
  payload: IProduct;
}
export interface ProductTypesSetAction {
  type: ProductActionTypes.PRODUCT_TYPES_SET;
  payload: Array<IProductType>;
}
export interface ProductPaginationSetAction {
  type: ProductActionTypes.PRODUCT_PAGINATION_SET;
  payload: ProductPaginationState;
}

export interface ProductState {
  products: Array<IProduct>;
  types: Array<IProductType>;
  currentProduct: IProduct | null;
  pagination: ProductPaginationState;
}
export interface ProductPaginationState {
  totalPages: number;
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
export interface IProductFilter {
  pageNumber: number;
  pageSize: number;
  searchString: string;
  sortDirection: number;
}

export interface IProductResponse {
  data: boolean | Array<IProduct> | null | undefined;
  type: any;
  failed: boolean;
  Messages: Array<string>;
  succeeded: boolean;
}
export interface IProductGetResponse extends IProductResponse {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
export interface IProductTypesGetResponse {
  data: Array<IProductType>;
}

export interface IProductError {
  Type: any;
  Failed: boolean;
  Messages: Array<string>;
  Succeeded: boolean;
}
export interface IProductServerError {
  detail: string;
  status: number;
  title: string;
  type: any;
}

export type ProductAction =
  | ProductSetAction
  | ProductAddAction
  | ProductDeleteAction
  | ProductEditAction
  | ProductCurrentSetAction
  | ProductTypesSetAction
  | ProductPaginationSetAction;
