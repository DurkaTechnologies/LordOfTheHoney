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
          <div className="container-fluid d-flex align-items-center"> 
          
          <div className="float-right d-none d-sm-inline ">
            <div className="d-flex justify-content-end mt-3 mr-2">
              <Switch />
            </div>
          </div>
          <span>
            Made with <span>&hearts;</span> by <a href="https://github.com/DurkaTechnologies">Durka Technologies</a>.
          </span>
        </div>
          </div>
      )}
    </>
  );
};

export default Footer;
