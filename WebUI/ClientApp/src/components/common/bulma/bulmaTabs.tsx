import * as React from "react";
import { useState } from "react";
import classNames from "classnames";
import { IProductType } from "src/components/productAdmin/types";

export interface IBulmaTabsProps {
  elements: Array<IProductType>;
  handleChange: (value: number | string) => void;
}

const BulmaTabs = ({ elements, handleChange }: IBulmaTabsProps) => {
  const [activeTabId, setActiveTabId] = useState<number>(-1);

  return (
    <div className="tabs is-boxed is-medium">
      <ul>
        <li
          className={classNames({ "is-active": -1 === activeTabId })}
          onClick={() => {
            setActiveTabId(-1);
            handleChange("");
          }}
        >
          <a>
            <span>All</span>
          </a>
        </li>
        {elements.map((x, id) => {
          return (
            <li
              key={id}
              className={classNames({ "is-active": id === activeTabId })}
              onClick={() => {
                setActiveTabId(id);
                handleChange(x.id);
              }}
            >
              <a>
                <span>{x.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BulmaTabs;
