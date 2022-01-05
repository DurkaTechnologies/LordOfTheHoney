import * as React from "react";

import { useState } from "react";

export interface IButtonCartProps {
  onChange: () => any;
}

const ButtonCart = ({ onChange }: IButtonCartProps) => {
  const [cartBtnIcon, setCartIcon] = useState<string>("shopping_cart");

  return (
    <button
      className="button is-primary"
      onClick={() => {
        setCartIcon("check");
        onChange();
      }}
    >
      <span className="material-icons-outlined">{cartBtnIcon}</span>
    </button>
  );
};

export default ButtonCart;
