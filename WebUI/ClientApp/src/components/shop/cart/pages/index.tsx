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
              {cartProducts.length !== 0 && (
                <>
                  {cartProducts.map((x, id) => {
                    return (
                        <div className="cart-item">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/63/Icon_Bird_512x512.png" />
                            <div className="cart-content">
                                <p className="cart-title white-title">{x.name}</p>
                                <p className="cart-title">{x.shopItemTypeId}</p>
                                <input
                                    type="number"
                                    name="cart-quantity"
                                    className="input cart-quantity"
                                    min="1"
                                    value={x.quantity}
                                    onChange={(e) =>
                                        handleQuantityChange(x.id, +e.target.value)
                                    }
                                />
                            </div>
                            <BulmaButton
                                className="btnRemove"
                                label=""
                                type="button"
                                iconSpan={
                                    <span className="material-icons-outlined">close</span>
                                }
                                onClick={() => handleDelete(x.id)}
                            />
                            <p className="cart-price-title">{x.cost * x.quantity}</p>
                        </div>
                    );
                  })}
                </>
              )}

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
