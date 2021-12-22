import * as React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container-fluid">
      <h1>Home page</h1>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default HomePage;
