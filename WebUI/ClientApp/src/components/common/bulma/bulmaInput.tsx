import * as React from "react";

import classNames from "classnames";

import "bulma/css/bulma.css";

export interface IBulmaInputProps {
  value: string | number | string[] | undefined | null;
  field: string;
  type?: "text" | "number" | "password" | "email";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error: string | undefined;
  touched: boolean | undefined;
}

const BulmaInput = ({
  value,
  field,
  onChange,
  label,
  error,
  touched,
  type = "text",
}: IBulmaInputProps) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          type="text"
          name={field}
          className={classNames("input", { "is-danger": error && touched })}
          placeholder={`Input ${label}`}
          value={value ? value : ""}
          onChange={onChange}
        />
      </div>
      {error && touched && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default BulmaInput;
