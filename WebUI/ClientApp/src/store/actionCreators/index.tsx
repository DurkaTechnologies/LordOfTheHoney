import * as AuthAction from "../../components/authorization/login/actions";
import * as ProductAction from "../../components/productAdmin/actions";
import * as CartAction from "../../components/shop/cart/actions";

const actions = {
  ...AuthAction,
  ...ProductAction,
  ...CartAction,
};

export default actions;
