import * as AuthAction from "../../components/authorization/login/actions";
import * as ProductAction from "../../components/productAdmin/actions";
import * as CartAction from "../../components/shop/cart/actions";
import * as HomeAction from "../../components/app/actions";

const actions = {
  ...AuthAction,
  ...ProductAction,
  ...CartAction,
  ...HomeAction,
};

export default actions;
