import * as RegisterAction from "../../components/authorization/registration/actions";
import * as AuthAction from "../../components/authorization/login/actions";

const actions = {
  ...RegisterAction,
  ...AuthAction,
};

export default actions;
