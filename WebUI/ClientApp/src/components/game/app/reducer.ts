import { IGameState, GameActionTypes, GameAction } from "./types";

const initialState: IGameState = {
  pocket: [],
  currentPocketId: 0,
};

export const gameReducer = (state = initialState, action: GameAction) => {
  switch (action.type) {
    case GameActionTypes.GAME_SET_POCKET: {
      return {
        ...state,
        pocket: action.payload,
      };
    }
    case GameActionTypes.GAME_SET_CURRENT_POCKET: {
      return {
        ...state,
        currentPocketId: action.payload,
      };
    }
    default:
      return state;
  }
};
