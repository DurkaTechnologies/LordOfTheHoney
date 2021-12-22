import * as React from "react";

import classNames from "classnames";
import Input, { IBaseInputProps } from "./input";

export interface IBaseInputGroupProps extends IBaseInputProps {
  label: string;
  error: string | undefined;
  touched: boolean | undefined;
}

const InputGroupFormik = ({
  value,
  field,
  onChange,
  label,
  error,
  touched,
  type = "text",
}: IBaseInputGroupProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label">
        {label}
      </label>
      <Input
        value={value}
        onChange={onChange}
        field={field}
        type={type}
        className={classNames(
          "form-control",
          { "is-invalid": error && touched },
          { "is-valid": !error && touched }
        )}
      />
      {error && touched && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default InputGroupFormik;
