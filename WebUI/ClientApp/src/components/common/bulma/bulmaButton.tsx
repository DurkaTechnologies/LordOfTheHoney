import * as React from "react";

import classNames from "classnames";

export interface IBulmaButtonInterface {
  label: string;
  loading?: boolean;
  onClick?: () => any;
  className: string;
  type: "button" | "submit" | "reset" | undefined;
}

const BulmaButton = ({
  label,
  onClick,
  className,
  loading = false,
  type = "button",
}: IBulmaButtonInterface) => {
  return (
    <button
      className={classNames("button", className, { "is-loading": loading })}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export default BulmaButton;
