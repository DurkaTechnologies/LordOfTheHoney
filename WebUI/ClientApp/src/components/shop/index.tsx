import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";

import { BulmaButton, BulmaPagination, BulmaTabs } from "../common/bulma";
import ButtonCart from "./buttonCart";
import { IProduct, IProductFilter } from "../productAdmin/types";

import classNames from "classnames";
import { toast } from "react-toastify";
import ItemCart from "./cart/pages";

import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.scss";

const Shop = () => {
    const { products, types, pagination } = useTypedSelector(
        (redux) => redux.itemShop
    );
    const {
        cartAddProduct,
        getFilterProducts,
        getProducts,
        switchIsShop,
        switchIsShopCart,
        switchIsStorage,
        getProductTypes,
    } = useActions();

    const { isShopActive } = useTypedSelector((redux) => redux.home);

    const [filter, setFilter] = useState<IProductFilter>({
        pageNumber: 1,
        pageSize: 8,
        searchString: "",
        sortDirection: 1,
    });

    React.useEffect(() => {
        getProductTypes();
        // fetch();
    }, []);

    const fetch = async () => {
        try {
            await getFilterProducts(filter);
        } catch (error) {
            toast.error("Error to fetch products");
        }
    };

    const handleCartAdd = (product: IProduct) => {
        cartAddProduct({ ...product, quantity: 1 });
    };

    const handleNextPage = () => {
        filter.pageNumber += 1;
        fetch();
    };
    const handlePrevPage = () => {
        filter.pageNumber -= 1;
        fetch();
    };
    const handleChangePage = (page: number) => {
        filter.pageNumber = page;
        fetch();
    };

    const handleTypeChange = (value: number | string) => {
        filter.searchString = value.toString();
        filter.pageNumber = 1;
        fetch();
    };
    const handleBuyItem = (product: IProduct) => {
        handleCartAdd(product);
        switchIsShop(false);
        switchIsShopCart(true);
    };

    return (
        <div>
            <Modal
                show={isShopActive}
                // size="xl"
                fullscreen={true}
                onHide={() => switchIsShop(false)}
                onShow={fetch}
            // dialogClassName="modal-90w"
            // aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header>
                    <div className="d-flex justify-content-between w-100">
                        <Modal.Title>Shop</Modal.Title>

                        <div>
                            <BulmaButton
                                className="me-2 orangeBackColor"
                                label=""
                                type="button"
                                iconSpan={
                                    <span className="material-icons-outlined">inventory_2</span>
                                }
                                onClick={() => {
                                    switchIsStorage(true);
                                    switchIsShop(false);
                                }}
                            />
                            <BulmaButton
                                className="me-2 orangeBackColor"
                                label=""
                                type="button"
                                iconSpan={
                                    <span className="material-icons-outlined">shopping_cart</span>
                                }
                                onClick={() => {
                                    switchIsShopCart(true);
                                    switchIsShop(false);
                                }}
                            />
                            <BulmaButton
                                className=""
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
                    <BulmaTabs handleChange={handleTypeChange} elements={types} />
                    <div className="row shop-content">
                        <div className="col">
                            <div className="d-flex flex-wrap justify-content-center">
                                {products.map((x, id) => {
                                    return (
                                        <div
                                            key={id}
                                            className="mx-2 my-2"
                                            style={{ width: "220px" }}
                                        >
                                            <div className="card">
                                                <div className="card-content">
                                                    <div className="content d-flex flex-column align-items-center">
                                                        <img
                                                            // src=""
                                                            src={ x.picturePath as string }
                                                            alt="Image"
                                                            width="128px"
                                                        />
                                                        <p className="product-name">{x.name}</p>
                                                        <p className="product-category">
                                                            {types.filter((t) => t.id == x.shopItemTypeId)[0]
                                                                ? types.filter(
                                                                    (t) => t.id == x.shopItemTypeId
                                                                )[0].name
                                                                : "Undefined type"}
                                                        </p>
                                                        <div className="d-flex w-100 mt-3 align-items-center">
                                                            <div className="mr-auto">
                                                                <p className="price-title">
                                                                    <span className="material-icons-outlined coinPrice">
                                                                        monetization_on
                                                                    </span>
                                                                    {x.cost}
                                                                </p>
                                                            </div>
                                                            <BulmaButton
                                                                label="BUY"
                                                                className="is-success me-3 btnBuy"
                                                                type="button"
                                                                onClick={() => handleBuyItem(x)}
                                                            />
                                                            <ButtonCart
                                                                onChange={() => {
                                                                    handleCartAdd(x);
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
                        <div className="mt-5">
                            <BulmaPagination
                                handlePrevPage={handlePrevPage}
                                handleNextPage={handleNextPage}
                                handleChangePage={handleChangePage}
                                pagination={pagination}
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <ItemCart />
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
