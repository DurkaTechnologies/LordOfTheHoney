import { InventoryItem } from "./inventoryItem";

export class Pocket {
  getItem: (id: number) => InventoryItem | undefined;
  pocketItemsIndices: Array<number>;

  constructor(pocketItems: Array<number>) {
    this.pocketItemsIndices = pocketItems;

    this.getItem = (id) => {
      const itemsJson = localStorage.getItem("allInventoryItems");
      if (itemsJson) {
        const inventoryItems = JSON.parse(itemsJson) as Array<InventoryItem>;
        let pocketItems: Array<InventoryItem> = [];
        this.pocketItemsIndices.forEach((x, v) => {
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
  }
}
