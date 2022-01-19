import * as React from "react";
import { useEffect, useState } from "react";
import { InventoryItem, ILocalStorageItem } from "../inventoryItem";

import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";

import classNames from "classnames";

import "./pocket.css";

const Pocket = () => {
  const { pocket, currentPocketId } = useTypedSelector((redux) => redux.game);
  const { setPocketItems } = useActions();
  useEffect(() => {
    if (!pocket || pocket.length === 0) {
      const pocketBarcodes = JSON.parse(
        localStorage.getItem("pocketItems") as string
      ) as Array<ILocalStorageItem>;
      const allItems = JSON.parse(
        localStorage.getItem("allInventoryItems") as string
      ) as Array<InventoryItem>;

      let tmp = Array<InventoryItem>();

      pocketBarcodes.forEach((x) => {
        tmp.push(allItems.filter((i) => i.barcode === x.barcode)[0]);
      });

      setPocketItems(tmp);
    }
  }, []);
  const getNormalizedName = (str: string) => {
    return str.replace(" ", "_").toLowerCase();
  };
  const getPocketFront = () => {
    let tmp: Array<JSX.Element> = [];

    for (let i = 0; i < 10; i++) {
      if (pocket[i]) {
        tmp.push(
          <div
            key={i}
            className={classNames("pocketItemBack", {
              currentPocketItem: currentPocketId === i,
            })}
          >
            <img
              src={`/images/preview/${getNormalizedName(pocket[i].name)}.png`}
              alt=""
            />
          </div>
        );
      } else {
        tmp.push(<div key={i} className="pocketItemBack"></div>);
      }
    }
    return tmp;
  };

  return (
    <div className="pocket">
      {pocket && pocket.length > 0 && (
        <div className="d-flex justify-content-center">
          {/* {pocket.map((x, i) => {
            return (
              <div key={i} className="pocketItemBack">
                <img
                  src={`/images/preview/${getNormalizedName(x.name)}.png`}
                  alt=""
                  width="50"
                />
              </div>
            );
          })} */}
          {getPocketFront()}
        </div>
      )}
    </div>
  );
};

export default Pocket;
