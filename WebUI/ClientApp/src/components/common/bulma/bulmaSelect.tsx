import * as React from "react";
import classNames from "classnames";

import "bulma/css/bulma.css";

export interface IBulmaSelectProps {
  value: number;
  field: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  error: string | undefined;
  touched: boolean | undefined;

  values: Array<any>;
}

const BulmaSelect = ({
  value,
  field,
  onChange,
  label,
  error,
  touched,
  values,
}: IBulmaSelectProps) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="select">
        <select
          // defaultValue={0}
          value={value}
          name={field}
          onChange={onChange}
          className={classNames(
            "input",
            { "is-danger": error && touched },
            { "is-success": !error && touched }
          )}
        >
          <option disabled value="0">
            Choose item type
          </option>
          {values.map((element) => {
            return (
              <option key={element.id} value={element.id}>
                {element.name}
              </option>
            );
          })}
        </select>
      </div>
      {error && touched && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default BulmaSelect;
