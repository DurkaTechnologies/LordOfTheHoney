import * as React from "react";
import { useEffect } from "react";

import { useActions } from "../../../hooks/useActions";

import "bulma/css/bulma.css";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { getProducts } = useActions();
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <h1 className="title is-1">Product list</h1>
      <Link className="button is-success" to="/admin/product/add">
        Add product
      </Link>
    </>
  );
};

export default ProductList;
