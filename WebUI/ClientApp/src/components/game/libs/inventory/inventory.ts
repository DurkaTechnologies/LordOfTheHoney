import { InventoryItem } from "./inventoryItem";

export class InventoryService {
  getItem: (id: number) => InventoryItem | undefined;
  initInventory: () => void;

  itemsIndices: Array<number>;

  constructor(pocketItems: Array<number>) {
    this.itemsIndices = pocketItems;
    localStorage.setItem("inventoryItems", JSON.stringify(this.itemsIndices));

    this.getItem = (id) => {
      const itemsJson = localStorage.getItem("allInventoryItems");
      if (itemsJson) {
        const inventoryItems = JSON.parse(itemsJson) as Array<InventoryItem>;
        let pocketItems: Array<InventoryItem> = [];
        this.itemsIndices.forEach((x, v) => {
          pocketItems.push(inventoryItems.filter((ii) => ii.id === x)[0]);
        });
        const item = pocketItems[id];
        if (item) {
          return item;
        }
        return undefined;
      }
      return undefined;
    };
    this.initInventory = () => {
      const itemsJson = localStorage.getItem("inventoryItems");
      if (!itemsJson) {
        localStorage.setItem("inventoryItems", JSON.stringify([]));
        return;
      }
      const items = JSON.parse(itemsJson) as Array<InventoryItem>;
      this.itemsIndices = [];
      items.forEach((element) => {
        this.itemsIndices.push(element.id);
      });
    };
  }
}
