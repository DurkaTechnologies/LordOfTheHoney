import * as React from "react";
import { useState } from "react";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";

import { BulmaButton } from "src/components/common/bulma";

import {
  ICartProduct,
  IBuyResponseCartProduct,
  IBuyResponseSend,
} from "../types";

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

  const [loading, setLoading] = useState<boolean>(false);

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

  const getProductCartToSend = async () => {
    let cartProductsSend: Array<IBuyResponseCartProduct> = [];
    cartProducts.forEach((x) => {
      cartProductsSend.push({ shopItemId: x.id, quantity: x.quantity });
    });
    const cartSend: IBuyResponseSend = {
      userId: user.id,
      cartItems: cartProductsSend,
    };
    return cartSend;
  };

  const handleCartBuy = async () => {
    try {
      setLoading(true);
      const total = await getProductCartToSend();
      const totalPrice = await getFinalPrice();
      await cartBuy(total);
      await storageAddItems(cartProducts as Array<IStorageItem>);
      await cartClear();
      await userCoinsSpend(getFinalPrice());
      switchIsShopCart(false);
      switchIsShop(true);
      toast.success(`You spend ${totalPrice} bee coins. Thanks`);
    } catch (error) {
      toast.error("Some errors. Check and try again");
    } finally {
      setLoading(false);
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
            <Modal.Title>Shop Cart</Modal.Title>

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
                className=""
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
                <th className="mw-32">ID</th>
                <th>Name</th>
                <th>Type</th>
                <th className="mw-32">Cost/one</th>
                <th className="mw-128">Quantity</th>
                <th>Price</th>
                <th className="mw-32">Options</th>
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
                            <td className="text-end">
                            <BulmaButton
                                className="btnRemove"
                                label=""
                                type="button"
                                iconSpan={
                                    <span className="material-icons-outlined">close</span>
                                }
                                onClick={ () => handleDelete(x.id) }
                            />
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>

          <div className="d-flex justify-content-start align-items-center">
              <p className="title mr-auto">TOTAL: {getFinalPrice()}</p>
              <BulmaButton
                label="BUY"
                className="is-success"
                type="button"
                onClick={handleCartBuy}
                disabled={getButtonDisabled()}
                loading={loading}
              />
              <BulmaButton
                type="button"
                label="Clear cart"
                className="is-danger ml-2"
                onClick={cartClear}
                loading={loading}
              />
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ItemCart;
