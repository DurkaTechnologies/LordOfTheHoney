import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";

import { BulmaButton } from "../common/bulma";
import ButtonCart from "./buttonCart";
import { IProduct, IProductFilter } from "../productAdmin/types";

import classNames from "classnames";
import { toast } from "react-toastify";

import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";

const Shop = () => {
  const { products, types, pagination } = useTypedSelector(
    (redux) => redux.itemShop
  );
  const { cartAddProduct, getFilterProducts, getProducts, switchIsShop } =
    useActions();

  const { isShopActive } = useTypedSelector((redux) => redux.home);

  const [filter, setFilter] = useState<IProductFilter>({
    pageNumber: 1,
    pageSize: 10,
    searchString: "",
    sortDirection: 1,
  });

  React.useEffect(() => {
    // fetch();
  }, []);

  const fetch = async () => {
    try {
      await getFilterProducts(filter);
    } catch (error) {
      toast.error("Error to fetch products");
    }
  };

  const handleCartAdd = (productId: number) => {
    cartAddProduct({ productId, quantity: 1 });
  };

  const handleNextPage = () => {
    // setFilter({
    //   ...filter,
    //   pageNumber: pageNumber + 1,
    // });
  };

  return (
    <div>
      <Modal
        show={isShopActive}
        size="xl"
        fullscreen={true}
        onHide={() => switchIsShop(false)}
        onShow={fetch}
        // dialogClassName="modal-90w"
        // aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <div className="d-flex justify-content-between w-100">
            <Modal.Title>Shop Item</Modal.Title>

            <div>
              <BulmaButton
                className="me-5"
                label=""
                type="button"
                iconSpan={
                  <span className="material-icons-outlined">shopping_cart</span>
                }
                onClick={() => switchIsShop(false)}
              />
              <BulmaButton
                className="me-5"
                label=""
                type="button"
                iconSpan={
                  <span className="material-icons-outlined">close</span>
                }
                onClick={() => switchIsShop(false)}
              />
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-3 filterPanel"></div>
            <div className="col">
              <div className="d-flex flex-wrap justify-content-around">
                {products.map((x, id) => {
                  return (
                    <div
                      key={id}
                      className="mx-4 my-3"
                      style={{ width: "300px" }}
                    >
                      <div className="card">
                        <div className="card-content">
                          <div className="content d-flex flex-column align-items-center">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/6/63/Icon_Bird_512x512.png"
                              alt="Image"
                              width="128px"
                            />
                            <p className="title is-4 text-center">{x.name}</p>
                            <p className="subtitle is-5 text-center">
                              {types.filter((t) => t.id == x.shopItemTypeId)[0]
                                ? types.filter(
                                    (t) => t.id == x.shopItemTypeId
                                  )[0].name
                                : "Undefined type"}
                            </p>
                            <div className="d-flex align-items-start w-100">
                              <div className="me-auto align-self-center">
                                <p>{x.cost} </p>
                              </div>
                              <BulmaButton
                                label="BUY"
                                className="is-success me-3 px-5"
                                type="button"
                              />
                              <ButtonCart
                                onChange={() => {
                                  handleCartAdd(x.id);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="row">
            <nav
              className="pagination is-centered"
              role="navigation"
              aria-label="pagination"
            >
              <button
                className="pagination-previous"
                disabled={!pagination.hasPreviousPage}
              >
                Previous
              </button>
              <button
                className="pagination-next"
                disabled={!pagination.hasNextPage}
                // onClick={}
              >
                Next page
              </button>
              <ul className="pagination-list">
                <li>
                  <a className="pagination-link" aria-label="Goto page 1">
                    1
                  </a>
                </li>
                <li>
                  <span className="pagination-ellipsis">&hellip;</span>
                </li>
                <li>
                  <a className="pagination-link" aria-label="Goto page 45">
                    45
                  </a>
                </li>
                <li>
                  <a
                    className="pagination-link is-current"
                    aria-label="Page 46"
                    aria-current="page"
                  >
                    46
                  </a>
                </li>
                <li>
                  <a className="pagination-link" aria-label="Goto page 47">
                    47
                  </a>
                </li>
                <li>
                  <span className="pagination-ellipsis">&hellip;</span>
                </li>
                <li>
                  <a className="pagination-link" aria-label="Goto page 86">
                    86
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Shop;

{
  /* <div tabIndex={-1} className="modal">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="title is-1 white-color" style={{ color: "white" }}>
                Shop item
              </h1>
              <button
                onClick={() => switchIsShop(false)}
                className="color-inherit align-self-center"
              >
                <span
                  className="material-icons-outlined pt-48 white-color"
                  style={{ color: "white" }}
                >
                  close
                </span>
              </button>
            </div>
            <div className="modal-body"></div>
            <div className="modal-footer justify-content-between"></div>
          </div>
        </div>
      </div> */
}
