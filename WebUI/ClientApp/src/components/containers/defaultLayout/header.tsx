import * as React from "react";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";
import { Constants } from "src/constants";

import "./header.css";

const Header = () => {
  const { isAuth, user } = useTypedSelector((redux) => redux.auth);
  const { isHeaderActive } = useTypedSelector((redux) => redux.home);
  const isAdmin = user?.role === Constants.AdminRole;
  const { logoutUser, switchIsShop, switchIsStorage } = useActions();

  return (
    <>
      {isHeaderActive && isAuth && (
        <div className="d-flex justify-content-between ownHeader">
          <div className="element leftElement d-flex">
            <span className="material-icons-outlined pt-48 my-auto">
              monetization_on
            </span>
            <span className="headerName">
              {parseInt(user?.beeCoins.toString())}
            </span>
          </div>
          <div className="element rightElement d-flex">
            <p className="headerName">{user?.nickname}</p>
            <div className="btnOption">
              <span
                className="material-icons-outlined pt-48 mt-1"
                onClick={() => switchIsShop(true)}
              >
                store
              </span>
            </div>
            <div className="btnOption">
              <span
                className="material-icons-outlined pt-48 mt-1"
                onClick={() => switchIsStorage(true)}
              >
                inventory_2
              </span>
            </div>
            <div className="btnOption">
              <Link to="/settings" className="color-inherit">
                <span className="material-icons-outlined pt-48 mt-1">
                  settings
                </span>
              </Link>
            </div>
            <div className="btnOption">
              <span
                className="material-icons-outlined pt-48 mt-1"
                onClick={logoutUser}
              >
                logout
              </span>
            </div>
          </div>
        </div>

    return (
        <>
            {isAuth && (
                <div className="d-flex justify-content-between ownHeader">
                    <div className="element leftElement d-flex align-items-center">
                        <span className="material-icons-outlined">
                            monetization_on
                        </span>
                        <span className="headerCoins">
                            {parseInt(user?.beeCoins).toLocaleString()}
                        </span>
                    </div>
                    <div className="element rightElement d-flex align-items-center">
                        <p className="headerName">{user?.nickname}</p>
                        <div className="btnOption">
                            <span
                                className="material-icons-outlined"
                                onClick={() => switchIsShop(true)}
                            >
                                store
                            </span>
                        </div>
                        <div className="btnOption">
                            <span
                                className="material-icons-outlined"
                                onClick={() => switchIsStorage(true)}
                            >
                                inventory_2
                            </span>
                        </div>
                        <div className="btnOption">
                            <span className="material-icons-outlined">
                                settings
                            </span>
                        </div>
                        <div className="btnOption">
                            <span
                                className="material-icons-outlined"
                                onClick={logoutUser}
                            >
                                logout
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
