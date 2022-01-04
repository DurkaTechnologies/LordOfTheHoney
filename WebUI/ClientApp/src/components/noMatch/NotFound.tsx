import * as React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h1>404</h1>
      <h3>Page not found</h3>
      <Link className="link-info" to="/">
        Go home
      </Link>
    </>
  );
};

export default NotFoundPage;
