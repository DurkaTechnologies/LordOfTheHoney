import * as React from "react";

import { ReactReduxContext } from "react-redux";
import { Link } from "react-router-dom";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";

import { Constants } from "src/constants";

import "./header.css";

const Header = () => {
    const { isAuth, user } = useTypedSelector((redux) => redux.auth);
    const isAdmin = user?.role === Constants.AdminRole;
    const { logoutUser } = useActions();

  return (
    <>
      {isAuth && (
        <div className="d-flex justify-content-between">
          <div className="element leftElement d-flex">
            <span className="material-icons-outlined pt-48 my-auto">
              monetization_on
            </span>
            <span className="headerName">{user?.beeCoins}</span>
          </div>
          <div className="element rightElement d-flex">
            <p className="headerName">{user?.nickname}</p>
            <div className="btnOption">
              <Link to="/shop" className="color-inherit">
                <span className="material-icons-outlined pt-48 mt-1">
                  store
                </span>
              </Link>
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

        // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //   <div className="container-fluid">
        //     <Link className="navbar-brand" to="/">
        //       Lord of the honey
        //     </Link>
        //     <button
        //       className="navbar-toggler"
        //       type="button"
        //       data-bs-toggle="collapse"
        //       data-bs-target="#navbarSupportedContent"
        //       aria-controls="navbarSupportedContent"
        //       aria-expanded="false"
        //       aria-label="Toggle navigation"
        //     >
        //       <span className="navbar-toggler-icon"></span>
        //     </button>
        //     <div
        //       className="collapse navbar-collapse"
        //       id="navbarSupportedContent"
        //     >
        //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //         <li className="nav-item">
        //           <Link className="nav-link" to="/">
        //             Home
        //           </Link>
        //         </li>
        //         <li className="nav-item">
        //           <Link className="nav-link" to="/shop">
        //             Shop
        //           </Link>
        //         </li>
        //         {isAdmin && (
        //           <li className="nav-item">
        //             <Link className="nav-link" to="/admin/product/list">
        //               Admin panel
        //             </Link>
        //           </li>
        //         )}
        //       </ul>
        //       {isAuth ? (
        //         <ul className="navbar-nav">
        //           <li className="nav-item">
        //             <Link className="nav-link" to="/profile">
        //               {user?.nickname}
        //             </Link>
        //           </li>
        //           <li className="nav-item">
        //             <Link className="nav-link" to="/shop/cart">
        //               Cart
        //             </Link>
        //           </li>
        //           <li className="nav-item">
        //             <button className="button is-white" onClick={logoutUser}>
        //               Logout
        //             </button>
        //           </li>
        //         </ul>
        //       ) : (
        //         <ul className="navbar-nav">
        //           <li className="nav-item">
        //             <Link className="nav-link" to="/login">
        //               Login
        //             </Link>
        //           </li>
        //           <li className="nav-item">
        //             <Link className="nav-link" to="/register">
        //               Register
        //             </Link>
        //           </li>
        //         </ul>
        //       )}
        //     </div>
        //   </div>
        // </nav>
      )}
    </>
  );
};

export default Header;
