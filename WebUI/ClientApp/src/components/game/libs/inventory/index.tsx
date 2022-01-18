import * as React from "react";
import { useState } from "react";

import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";

import { BulmaButton } from "../../../common/bulma";

import { InventoryItem } from "./inventoryItem";

import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const Inventory = () => {
  const { isInventoryActive } = useTypedSelector((redux) => redux.home);
  const { switchIsInventory, switchIsShop, setPocketItems } = useActions();

  const [inventoryItems, setInventoryItems] = useState<Array<InventoryItem>>(
    []
  );
  const [pocketItems, setPocketItemsState] = useState<Array<InventoryItem>>([]);

  React.useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    const inventoryItemsJson = localStorage.getItem("inventoryItems");
    const pocketItemsJson = localStorage.getItem("pocketItems");
    const allItems = JSON.parse(
      localStorage.getItem("allInventoryItems") as string
    ) as Array<InventoryItem>;

    let pocketLocalItems: Array<InventoryItem> = [];

    if (pocketItemsJson) {
      const itemBarcodes = JSON.parse(
        pocketItemsJson as string
      ) as Array<string>;
      if (itemBarcodes) {
        const tmp: Array<InventoryItem> = [];
        itemBarcodes.forEach((x) => {
          const pocketItem = allItems.filter((el) => el.barcode == x)[0];
          if (pocketItem) {
            tmp.push(pocketItem);
          }
        });
        setPocketItemsState(tmp);
        pocketLocalItems = tmp;
      }
    }

    if (inventoryItemsJson) {
      const itemsBarcodes = JSON.parse(
        inventoryItemsJson as string
      ) as Array<string>;
      if (itemsBarcodes) {
        const tmp: Array<InventoryItem> = [];
        itemsBarcodes.forEach((x) => {
          const invItem = allItems.filter((el) => el.barcode == x)[0];
          if (
            invItem &&
            !pocketLocalItems.filter((item) => item.barcode === x)[0]
          ) {
            tmp.push(invItem);
          }
        });
        setInventoryItems(tmp);
      }
    }
  };

  const hide = () => {
    let tmp: Array<string> = [];
    pocketItems.forEach((x) => {
      tmp.push(x.barcode);
    });
    setPocketItems(pocketItems);
    localStorage.setItem("pocketItems", JSON.stringify(tmp));

    switchIsInventory(false);
  };
  const removeFromPocket = (item: InventoryItem) => {
    let tmp = pocketItems.slice();
    setPocketItemsState(tmp.filter((x) => x.id !== item.id));

    let tmpInventory = inventoryItems.slice();
    tmpInventory.push(item);
    setInventoryItems(tmpInventory);
  };
  const addToPocket = (item: InventoryItem) => {
    if (pocketItems.length > 10) {
      toast.error("Pocket is full");
      return;
    }
    if (pocketItems.indexOf(item) !== -1) {
      toast.error("This item is exist in pocket");
      return;
    }
    let tmp = pocketItems.slice();
    tmp.push(item);
    setPocketItemsState(tmp);
  };

  return (
    <div>
      <Modal
        show={isInventoryActive}
        size="xl"
        onHide={hide}
        onShow={fetch}
        // dialogClassName="modal-90w"
        // aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <div className="d-flex justify-content-between w-100">
            <Modal.Title>Shop Item</Modal.Title>

            <div>
              <BulmaButton
                className="me-2 orangeBackColor"
                label=""
                type="button"
                iconSpan={
                  <span className="material-icons-outlined">shopping_cart</span>
                }
                onClick={() => {
                  switchIsInventory(false);
                  switchIsShop(false);
                }}
              />
              <BulmaButton
                className="me-2"
                label=""
                type="button"
                iconSpan={
                  <span className="material-icons-outlined">close</span>
                }
                onClick={() => {
                  hide();
                  switchIsInventory(false);
                }}
              />
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <h2>Pocket</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Qunatity</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {pocketItems &&
                    pocketItems.length > 0 &&
                    pocketItems.map((x, id) => {
                      return (
                        <tr key={id}>
                          <td>{x.id}</td>
                          <td>{x.name}</td>
                          <td>{x.quantity ? x.quantity : "-"}</td>
                          <td>
                            <BulmaButton
                              label="Remove from pocket"
                              className="is-primary"
                              type="button"
                              onClick={() => removeFromPocket(x)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="col">
              <h2>Inventory</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryItems &&
                    inventoryItems.length > 0 &&
                    inventoryItems.map((x, id) => {
                      return (
                        <tr key={id}>
                          <td>{x.id}</td>
                          <td>{x.name}</td>
                          <td>
                            <BulmaButton
                              label="Add to pocket"
                              className="is-primary"
                              type="button"
                              onClick={() => addToPocket(x)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Inventory;
