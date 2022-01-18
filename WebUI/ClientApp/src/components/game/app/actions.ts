import { Dispatch } from "react";
import { InventoryItem } from "../libs/inventory/inventoryItem";
import { GameActionTypes, GameAction } from "./types";

export const setPocketItems = (data: Array<InventoryItem>) => {
  return async (dispatch: Dispatch<GameAction>) => {
    dispatch({
      type: GameActionTypes.GAME_SET_POCKET,
      payload: data,
    });
  };
};
export const setCurrentPocketIndex = (data: number) => {
  return async (dispatch: Dispatch<GameAction>) => {
    dispatch({
      type: GameActionTypes.GAME_SET_CURRENT_POCKET,
      payload: data,
    });
  };
};
