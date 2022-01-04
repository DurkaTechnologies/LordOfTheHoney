import * as AuthAction from "../../components/authorization/login/actions";
import * as ProductAction from "../../components/productAdmin/actions";

const actions = {
  ...AuthAction,
  ...ProductAction,
};

export default actions;
