import { InventoryItem } from "./inventoryItem";

export class InventoryService {
  getItem: (id: number) => InventoryItem | undefined;
  initInventory: () => void;

  constructor(pocketItems: Array<number>) {
    this.getItem = (id) => {
      const itemsJson = localStorage.getItem("allInventoryItems");
      if (itemsJson) {
        const inventoryItems = JSON.parse(itemsJson) as Array<InventoryItem>;
        let pocketItems: Array<InventoryItem> = [];
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
    };
  }
}
