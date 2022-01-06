import * as React from "react";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";

import { BulmaButton } from "src/components/common/bulma";

import { ICartProduct } from "../types";

const ItemCart = () => {
  const { cartProducts } = useTypedSelector((redux) => redux.cart);
  const { products, types } = useTypedSelector((redux) => redux.itemShop);
  const { cartDeleteProduct, cartClear, cartSetProducts, cartSetQuantity } =
    useActions();

  React.useEffect(() => {
    const cartItemsJson = localStorage.getItem("cartItems");
    if (cartItemsJson) {
      const items = JSON.parse(cartItemsJson) as Array<ICartProduct>;
      cartSetProducts(items);
    }
  }, []);

  const getProductById = (id: number) => {
    return products.filter((x) => x.id === id)[0];
  };

  const handleDelete = (id: number) => {
    cartDeleteProduct(id);
  };
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    cartSetQuantity({ productId, newQuantity });
  };

  const handleCartBuy = () => {
    console.log("BUY");
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((x, id) => {
            return (
              <tr key={id}>
                <td>{getProductById(x.productId).id}</td>
                <td>{getProductById(x.productId).name}</td>
                <td>
                  {
                    types.filter(
                      (t) => t.id == getProductById(x.productId).shopItemTypeId
                    )[0].name
                  }
                </td>
                <td>price</td>
                <td>
                  <input
                    type="number"
                    name="quantity"
                    className="input"
                    min="1"
                    value={x.quantity}
                    onChange={(e) =>
                      handleQuantityChange(x.productId, +e.target.value)
                    }
                  />
                </td>
                <td>
                  <BulmaButton
                    label="Remove from cart"
                    className="is-danger"
                    type="button"
                    onClick={() => handleDelete(x.productId)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="row">
        <div className="offset-5 col-3">
          <p className="title t-1">TOTAL: </p>
        </div>
        <div className="col-4">
          <BulmaButton
            label="BUY"
            className="is-success"
            type="button"
            onClick={handleCartBuy}
          />
          <BulmaButton
            type="button"
            label="Clear cart"
            className="is-danger ml-4"
            onClick={cartClear}
          />
        </div>
      </div>
    </>
  );
};

export default ItemCart;
