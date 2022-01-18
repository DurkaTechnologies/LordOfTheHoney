import { InventoryItem } from "../libs/inventory/inventoryItem";

export enum GameActionTypes {
  GAME_SET_POCKET = "GAME_SET_POCKET",
  GAME_SET_CURRENT_POCKET = "GAME_SET_CURRENT_POCKET",
}

export interface GameSetPocketAction {
  type: GameActionTypes.GAME_SET_POCKET;
  payload: Array<InventoryItem>;
}
export interface GameSetCurrentPocketIndexAction {
  type: GameActionTypes.GAME_SET_CURRENT_POCKET;
  payload: number;
}

export interface IGameState {
  pocket: Array<InventoryItem>;
  currentPocketId: number;
}

export type GameAction = GameSetPocketAction | GameSetCurrentPocketIndexAction;
