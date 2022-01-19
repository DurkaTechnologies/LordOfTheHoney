import * as HomeAction from "../../components/app/actions";
import * as AuthAction from "../../components/authorization/login/actions";
import * as ProductAction from "../../components/productAdmin/actions";
import * as CartAction from "../../components/shop/cart/actions";
import * as StorageAction from "../../components/storage/actions";
import * as GameAction from "../../components/game/app/actions";

const actions = {
  ...HomeAction,
  ...AuthAction,
  ...ProductAction,
  ...CartAction,
  ...StorageAction,
  ...GameAction,
};

export default actions;
