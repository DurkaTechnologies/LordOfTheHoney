import { AuthAction, AuthActionTypes, AuthState } from "./types";

const initialState: AuthState = {
  user: {
    id: "0",
    nickname: "",
    email: "",
    beeCoins: 0,
    role: "",
  },
  isAuth: false,
};

export const loginReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_AUTH: {
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    }
    case AuthActionTypes.LOGOUT_AUTH: {
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    }
    case AuthActionTypes.USER_COINS_SPEND: {
      const tmpUser = state.user ? Object.assign(state.user) : {};
      tmpUser.beeCoins = parseInt(tmpUser.beeCoins.toString()) - action.payload;
      return {
        ...state,
        user: tmpUser,
      };
    }
    default:
      return state;
  }
};
