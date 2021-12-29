import { AuthAction, AuthActionTypes, AuthState } from "./types";

const initialState: AuthState = {
    user: null,
    isAuth: false,
}

export const loginReducer = (state = initialState, action: AuthAction) => {
    switch (action.type){
        case AuthActionTypes.LOGIN_AUTH: {
            return {
                ...state, isAuth: true, user: action.payload
            };
        }
        default:
            return state;
    }
}