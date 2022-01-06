import * as React from "react";

import { ReactReduxContext } from "react-redux";
import { Link } from "react-router-dom";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";

import { Constants } from "src/constants";

const Header = () => {
    const { isAuth, user } = useTypedSelector((redux) => redux.auth);
    const isAdmin = user?.role === Constants.AdminRole;
    const { logoutUser } = useActions();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Lord of the honey
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/shop">
                                Shop
                            </Link>
                        </li>
                        {isAdmin && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/product/list">
                                    Admin panel
                                </Link>
                            </li>
                        )}
                    </ul>
                    {isAuth ? (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    {user?.nickname}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/shop/cart">
                                    Cart
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="text-dark nav-link" href="/swagger/index.html">Swagger</a>
                            </li>
                            <li className="nav-item">
                                <button className="button is-white" onClick={logoutUser}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
