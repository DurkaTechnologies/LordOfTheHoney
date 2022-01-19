import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";

import * as qs from "qs";

import { BulmaModal, BulmaButton } from "../../common/bulma";

import "bulma/css/bulma.css";
import { IProduct } from "../types";
import { toast } from "react-toastify";

const ProductList = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const { getProducts, deleteProduct, setCurrentProduct, getProductTypes } =
    useActions();
  const { products, types } = useTypedSelector((redux) => redux.itemShop);

  const fetch = async () => {
    setLoading(true);
    try {
      await getProducts();
      await getProductTypes();
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      fetch();
    }
  }, []);

  const openModal = (id: number) => {
    setModalOpen(true);
    setIdToDelete(id);
  };
  const handleModalConfirm = async () => {
    setModalOpen(false);
    try {
      await deleteProduct(idToDelete);
      toast.success(`Product with id ${idToDelete} are successfully deleted`);
    } catch (error) {
      toast.error(error as string);
    }
  };
  const handleModalCancel = () => {
    setModalOpen(false);
  };

  const handleEditProduct = (product: IProduct) => {
    setCurrentProduct(product);
  };

  const handleUpdate = () => {
    fetch();
  };

  return (
    <>
      <div className="admin-container">
        <h1 className="title is-1">Product list</h1>

        <Link className="button is-success" to="/admin/product/add">
          Add product
        </Link>

        <BulmaButton
          label="Update with db"
          className="is-info ms-3"
          type="submit"
          onClick={handleUpdate}
          iconSpan={
            <span className="material-icons-outlined icon me-1">update</span>
          }
          loading={loading}
        />

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
                  <th>{x.id === 0 ? "-" : x.id}</th>
                  <td>{x.name}</td>
                  <td>
                    {types.filter((t) => t.id == x.shopItemTypeId)[0]?.name}
                  </td>
                  <td>
                    <Link
                      className="button is-info is-light"
                      to={`/admin/product/edit/`}
                      onClick={() => handleEditProduct(x)}
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
      </div>

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