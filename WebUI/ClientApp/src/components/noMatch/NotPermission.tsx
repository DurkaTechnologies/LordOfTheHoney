import * as React from "react";
import { Link } from "react-router-dom";

const NotPermittedPage = () => {
  return (
    <>
      <h1>405</h1>
      <h3>Not permitted. You are not admin</h3>
      <Link className="link-info" to="/">
        Go home
      </Link>
      <Link className="link-info" to="/login">
        Go login
      </Link>
    </>
  );
};

export default NotPermittedPage;
