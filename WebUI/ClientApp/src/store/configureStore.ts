import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";
import { ApplicationState, reducers } from "./";

import { homeReducer } from "../components/app/reducer";
import { loginReducer } from "../components/authorization/login/reducer";
import { itemShopReducer } from "../components/productAdmin/reducer";
import { cartReducer } from "../components/shop/cart/reducer";
import { storageReducer } from "src/components/storage/reducer";

const rootReducer = combineReducers({
  ...reducers,
  router: connectRouter(history),
  home: homeReducer,
  auth: loginReducer,
  itemShop: itemShopReducer,
  cart: cartReducer,
  storage: storageReducer,
});

export default function configureStore(
  history: History,
  initialState?: ApplicationState
) {
  const middleware = [thunk, routerMiddleware(history)];

  const enhancers = [];
  const windowIfDefined =
    typeof window === "undefined" ? null : (window as any); // eslint-disable-line @typescript-eslint/no-explicit-any
  if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}

export type RootState = ReturnType<typeof rootReducer>;
