import * as React from "react";

import classNames from "classnames";

export interface IBulmaButtonInterface {
  label: string;
  loading?: boolean;
  onClick?: () => any;
  className: string;
  type: "button" | "submit" | "reset" | undefined;
  iconSpan?: any;
  disabled?: boolean;
}

const BulmaButton = ({
  label,
  onClick,
  className,
  iconSpan,
  disabled = false,
  loading = false,
  type = "button",
}: IBulmaButtonInterface) => {
  return (
    <button
      className={classNames("button", className, { "is-loading": loading })}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {iconSpan}
      {label}
    </button>
  );
};

export default BulmaButton;
