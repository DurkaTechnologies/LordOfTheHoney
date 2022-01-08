import * as React from "react";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import Switch from "../../common/switch";

import "./footer.css";

const Footer = () => {
  const { isAuth } = useTypedSelector((redux) => redux.auth);

  return (
    <>
      {!isAuth && (
        <div className="footerOwn">
          <div className="d-flex justify-content-end mt-3 mr-2">
            <Switch />
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
