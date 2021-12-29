import * as React from "react";

export interface IBaseButtonProps {
  type: "submit" | "button" | "reset" | undefined;
  label: string;
}

const Button = ({ type, label }: IBaseButtonProps) => {
  return (
    <button type={type} className="form-control">
      {label}
    </button>
  );
};

export default Button;
