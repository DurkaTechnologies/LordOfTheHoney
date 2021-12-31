import { AuthAction, AuthActionTypes, IUser } from "./types";
import jwt_decode from "jwt-decode";

export const AuthUser = (
  token: string,
  dispatch: React.Dispatch<AuthAction>
) => {
  const userTmp = jwt_decode(token) as any;
  const user: IUser = { nickname: "", email: "", id: "" };
  user.id = userTmp.unique_name;
  user.email = userTmp.email;
  user.nickname = userTmp.given_name;

  dispatch({
    type: AuthActionTypes.LOGIN_AUTH,
    payload: user,
  });
};

export const LogoutUser = (dispatch: React.Dispatch<AuthAction>) => {
  dispatch({
    type: AuthActionTypes.LOGOUT_AUTH,
  });
};
