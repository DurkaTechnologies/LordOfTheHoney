import * as React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

import * as qs from "qs";

import "bulma/css/bulma.css";

const ProductList = () => {
  const { getProducts } = useActions();

  const { products, types } = useTypedSelector((redux) => redux.itemShop);

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <h1 className="title is-1">Product list</h1>
      <Link className="button is-success" to="/admin/product/add">
        Add product
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {products.map((x, id) => {
            return (
              <tr key={id}>
                <th>{x.id}</th>
                <td>{x.name}</td>
                <td>{types.filter((t) => t.id == x.itemType)[0].name}</td>
                <td>
                  <Link to={`/admin/product/edit/${qs.stringify(x)}`}>
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;
