import {
  StorageActionTypes,
  StorageAction,
  IStorageItem,
  IStorageState,
} from "./types";

const initialState: IStorageState = {
  items: [],
};

export const storageReducer = (state = initialState, action: StorageAction) => {
  switch (action.type) {
    case StorageActionTypes.STORAGE_SET_ITEMS: {
      return {
        ...state,
        items: action.payload,
      };
    }
    case StorageActionTypes.STORAGE_ADD_ITEMS: {
      const tmpArr = state.items.slice();
      action.payload.forEach((x, id) => {
        let thisItemStorageId = tmpArr.indexOf(
          tmpArr.filter((t) => t.id === x.id)[0]
        );
        if (thisItemStorageId !== -1) {
          tmpArr[thisItemStorageId].quantity += x.quantity;
        } else {
          tmpArr.push(x);
        }
      });
      return {
        ...state,
        items: tmpArr,
      };
    }
    case StorageActionTypes.STORAGE_REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter((x) => x.id !== action.payload),
      };
    }
    default:
      return state;
  }
};
