export enum StorageActionTypes {
  STORAGE_SET_ITEMS = "STORAGE_SET_ITEMS",
  STORAGE_ADD_ITEMS = "STORAGE_ADD_ITEMS",
  STORAGE_REMOVE_ITEM = "STORAGE_REMOVE_ITEM",
}

export interface IStorageState {
  items: Array<IStorageItem>;
}

export interface IStorageItem {
  id: number;
  name: string | null;
  shopItemTypeId: number;
  picturePath: Blob | undefined | null | string;
  description: string | null;
  barcode?: string | undefined | null;
  quantity: number;
}

export interface StorageSetItemsAction {
  type: StorageActionTypes.STORAGE_SET_ITEMS;
  payload: Array<IStorageItem>;
}
export interface StorageAddItemsAction {
  type: StorageActionTypes.STORAGE_ADD_ITEMS;
  payload: Array<IStorageItem>;
}
export interface StorageRemoveItemAction {
  type: StorageActionTypes.STORAGE_REMOVE_ITEM;
  payload: number;
}

export interface IFetchStorageResponseDataItem {}
export interface IFetchStorageResponseData {
  // data: Array<IFetchStorageResponseDataItem>;
  shopItem: IStorageItem;
  quantity: number;
}
export interface IFetchStorageResponse {
  data: Array<IFetchStorageResponseData>;
  failed: boolean;
  messages: Array<string>;
  succeeded: boolean;
  type: any;
}

export type StorageAction =
  | StorageSetItemsAction
  | StorageAddItemsAction
  | StorageRemoveItemAction;
