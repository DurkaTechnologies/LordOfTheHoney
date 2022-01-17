import * as React from "react";
import { useState } from "react";

import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";

import { BulmaButton } from "src/components/common/bulma";

import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import {
  InventoryItem,
  InventoryItemType,
} from "src/components/game/libs/inventory/inventoryItem";
import { textureNameDictionary } from "src/components/game/libs/dictionary";
import { IStorageItem } from "../types";

const Storage = () => {
  const [inventorySendItems, setInventorySendItems] = useState<
    Array<IStorageItem>
  >([]);
  const { isStorageActive } = useTypedSelector((redux) => redux.home);
  const { user } = useTypedSelector((redux) => redux.auth);
  const { items } = useTypedSelector((redux) => redux.storage);
  const {
    switchIsStorage,
    switchIsShop,
    storageRemoveItem,
    storageFetchItems,
  } = useActions();

  const handleSendToInventory = (item: IStorageItem) => {
    const inventory = inventorySendItems.slice();
    inventory.push(item);
    setInventorySendItems(inventory);
    storageRemoveItem(item.id);
  };

  const fetch = async () => {
    try {
      await storageFetchItems(user.id);
    } catch (error) {
      toast.error("Some error. Check and try again");
    }
  };

  const loadInventory = () => {
    const itemProducts = JSON.parse(
      localStorage.getItem("inventoryItems") as string
    ) as Array<string>;
    inventorySendItems.forEach((item) => {
      itemProducts.push(item.barcode as string);
    });
    localStorage.setItem("inventoryItems", JSON.stringify(itemProducts));
  };

  return (
    <>
      <Modal
        show={isStorageActive}
        onHide={() => {
          loadInventory();
          switchIsStorage(false);
        }}
        onShow={fetch}
        size="xl"
      >
        <Modal.Header>
          <div className="d-flex justify-content-between w-100">
            <Modal.Title>Item storage</Modal.Title>

            <div>
              <BulmaButton
                className="me-2 orangeBackColor"
                label=""
                type="button"
                iconSpan={
                  <span className="material-icons-outlined">store</span>
                }
                onClick={() => {
                  switchIsStorage(false);
                  switchIsShop(true);
                }}
              />
              <BulmaButton
                className=""
                label=""
                type="button"
                iconSpan={
                  <span className="material-icons-outlined">close</span>
                }
                onClick={() => {
                  loadInventory();
                  switchIsStorage(false);
                }}
              />
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Options</th>
                {/* <th>Type</th>
                <th>Cost/one</th>
                <th>Price</th>
                */}
              </tr>
            </thead>
            <tbody>
              {items.length !== 0 && (
                <>
                  {items.map((x, id) => {
                    return (
                      <tr key={id}>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
                        <td>{x.quantity}</td>
                        <td>
                          <BulmaButton
                            label="Send to inventory"
                            className="orangeBackColor"
                            type="button"
                            onClick={() => handleSendToInventory(x)}
                          />
                        </td>
                        {/* <td>
                          {
                            types.filter((t) => t.id == x.shopItemTypeId)[0]
                              .name
                          }
                        </td>
                        <td>{x.cost}</td>
                        <td>
                          <input
                            type="number"
                            name="quantity"
                            className="input"
                            min="1"
                            value={x.quantity}
                            onChange={(e) =>
                              handleQuantityChange(x.id, +e.target.value)
                            }
                          />
                        </td>
                        <td>{x.cost * x.quantity}</td>
                        <td>
                          <BulmaButton
                            label="Remove from cart"
                            className="is-danger"
                            type="button"
                            onClick={() => handleDelete(x.id)}
                          />
                        </td> */}
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>

          {/* <div className="row">
            <div className="offset-5 col-3">
              <p className="title t-1">TOTAL: {getFinalPrice()}</p>
            </div>
            <div className="col-4">
              <BulmaButton
                label="BUY"
                className="is-success"
                type="button"
                onClick={handleCartBuy}
                disabled={getButtonDisabled()}
              />
              <BulmaButton
                type="button"
                label="Clear cart"
                className="is-danger ml-4"
                onClick={cartClear}
              />
            </div>
          </div> */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Storage;
