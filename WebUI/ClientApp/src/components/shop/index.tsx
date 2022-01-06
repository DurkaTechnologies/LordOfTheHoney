import * as React from "react";
import { useState } from "react";

import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";

import { BulmaButton } from "../common/bulma";
import ButtonCart from "./buttonCart";
import { IProduct } from "../productAdmin/types";

const Shop = () => {
  const { products, types } = useTypedSelector((redux) => redux.itemShop);
  const { cartAddProduct } = useActions();

  const handleCartAdd = (productId: number) => {
    cartAddProduct({ productId, quantity: 1 });
  };

  return (
    <>
      <h1 className="title is-1">Shop item</h1>
      <div className="d-flex flex-wrap justify-content-around">
        {products.map((x, id) => {
          return (
            <div key={id} className="mx-4 my-3" style={{ width: "300px" }}>
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
                      {types.filter((t) => t.id == x.itemType)[0]
                        ? types.filter((t) => t.id == x.itemType)[0].name
                        : "Undefined type"}
                    </p>
                    <div className="d-flex align-items-start w-100">
                      <div className="me-auto align-self-center">
                        <p>PRICE: </p>
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
    </>
  );
};

export default Shop;
