import * as React from "react";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";

import { BulmaButton } from "src/components/common/bulma";

import { ICartProduct } from "../types";

import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { IStorageItem } from "src/components/storage/types";
import { toast } from "react-toastify";

const ItemCart = () => {
  const { cartProducts } = useTypedSelector((redux) => redux.cart);
  const { types } = useTypedSelector((redux) => redux.itemShop);
  const { isShopCartActive } = useTypedSelector((redux) => redux.home);
  const { user } = useTypedSelector((redux) => redux.auth);
  const {
    cartDeleteProduct,
    cartClear,
    cartSetProducts,
    cartSetQuantity,
    switchIsShopCart,
    switchIsShop,
    cartBuy,
    storageAddItems,
    userCoinsSpend,
  } = useActions();

  React.useEffect(() => {
    const cartItemsJson = localStorage.getItem("cartItems");
    if (cartItemsJson) {
      const items = JSON.parse(cartItemsJson) as Array<ICartProduct>;
      cartSetProducts(items);
    }
  }, []);

  const handleDelete = (id: number) => {
    cartDeleteProduct(id);
  };
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    cartSetQuantity({ productId, newQuantity });
  };
  const getFinalPrice = () => {
    let finalPrice = 0;
    cartProducts.map((x) => {
      finalPrice += x.cost * x.quantity;
    });
    return finalPrice;
  };
  const getButtonDisabled = () => {
    if (cartProducts.length === 0) return true;
    return user?.beeCoins
      ? parseInt(user?.beeCoins.toString()) < getFinalPrice()
      : true;
  };

  const handleCartBuy = async () => {
    try {
      await cartBuy();
      await storageAddItems(cartProducts as Array<IStorageItem>);
      await cartClear();
      await userCoinsSpend(getFinalPrice());
      switchIsShopCart(false);
      switchIsShop(true);
    } catch (error) {
      toast.error("Some errors. Check and try again");
    }
  };

  return (
    <>
      <Modal
        show={isShopCartActive}
        onHide={() => {
          switchIsShopCart(false);
        }}
        size="xl"
      >
        <Modal.Header>
          <div className="d-flex justify-content-between w-100">
            <Modal.Title>Item Cart</Modal.Title>

            <div>
              <BulmaButton
                className="me-2"
                label=""
                type="button"
                iconSpan={
                  <span className="material-icons-outlined">arrow_back</span>
                }
                onClick={() => {
                  switchIsShop(true);
                  switchIsShopCart(false);
                }}
              />
              <BulmaButton
                className="me-2"
                label=""
                type="button"
                iconSpan={
                  <span className="material-icons-outlined">close</span>
                }
                onClick={() => {
                  switchIsShopCart(false);
                }}
              />
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Cost/one</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.length !== 0 && (
                <>
                  {cartProducts.map((x, id) => {
                    return (
                      <tr key={id}>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
                        <td>
                          {
                            types.filter((t) => t.id == x.shopItemTypeId)[0]
                              .name
                          }
                        </td>
                        <td>{x.cost}</td>
                        <td>
                          <input
                            type="number"
                            name="quantity"
                            className="input"
                            min="1"
                            value={x.quantity}
                            onChange={(e) =>
                              handleQuantityChange(x.id, +e.target.value)
                            }
                          />
                        </td>
                        <td>{x.cost * x.quantity}</td>
                        <td>
                          <BulmaButton
                            label="Remove from cart"
                            className="is-danger"
                            type="button"
                            onClick={() => handleDelete(x.id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>

          <div className="row">
            <div className="offset-5 col-3">
              <p className="title t-1">TOTAL: {getFinalPrice()}</p>
            </div>
            <div className="col-4">
              <BulmaButton
                label="BUY"
                className="is-success"
                type="button"
                onClick={handleCartBuy}
                disabled={getButtonDisabled()}
              />
              <BulmaButton
                type="button"
                label="Clear cart"
                className="is-danger ml-4"
                onClick={cartClear}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ItemCart;
