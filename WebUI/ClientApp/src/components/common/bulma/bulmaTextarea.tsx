import * as React from "react";
import classNames from "classnames";

export interface BulmaTextareaProps {
  value: string | number | string[] | undefined | null;
  field: string;
  type?: "text";
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  error: string | undefined;
  touched: boolean | undefined;
}

const BulmaTextarea = ({
  value,
  field,
  onChange,
  label,
  error,
  touched,
  type = "text",
}: BulmaTextareaProps) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea
          name={field}
          placeholder={`Input ${label}`}
          value={value ? value : ""}
          onChange={onChange}
          className={classNames("textarea", { "is-danger": error && touched })}
        />
      </div>
      {error && touched && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default BulmaTextarea;
