import * as React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container-fluid">
      <h1>Home page</h1>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
      <Link to="/register" className="btn btn-primary ms-4">
        Register
      </Link>
    </div>
  );
};

export default HomePage;
