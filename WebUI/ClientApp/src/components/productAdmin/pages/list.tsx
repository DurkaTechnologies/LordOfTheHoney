import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

import * as qs from "qs";

import BulmaModal from "../../common/modal";

import "bulma/css/bulma.css";

const ProductList = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<number>(0);

  const { getProducts, deleteProduct } = useActions();
  const { products, types } = useTypedSelector((redux) => redux.itemShop);

  const openModal = (id: number) => {
    setModalOpen(true);
    setIdToDelete(id);
  };
  const handleModalConfirm = () => {
    setModalOpen(false);
    deleteProduct(idToDelete);
  };
  const handleModalCancel = () => {
    setModalOpen(false);
  };

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
                  <Link
                    className="button is-info is-light"
                    to={`/admin/product/edit/${qs.stringify(x)}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="button is-danger is-light ms-3"
                    onClick={() => openModal(x.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <BulmaModal
        content="Are you sure want to delete?"
        isActive={isModalOpen}
        onSuccess={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </>
  );
};

export default ProductList;
