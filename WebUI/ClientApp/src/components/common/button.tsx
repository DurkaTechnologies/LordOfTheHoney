import * as React from "react";

export interface IBaseButtonProps {
  type: "submit" | "button" | "reset" | undefined;
  label: string;
  disabled?: boolean | undefined;
}

const Button = ({ type, label, disabled = false }: IBaseButtonProps) => {
  return (
    <button type={type} className="form-control" disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
