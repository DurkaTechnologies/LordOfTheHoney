import { InventoryItem } from "./inventoryItem";

export class PocketService {
  getItem: (id: number) => InventoryItem | undefined;
  initPocket: () => void;

  constructor(pocketItems: Array<number>) {
    this.getItem = (id) => {
      const itemsJson = localStorage.getItem("allInventoryItems");
      if (itemsJson) {
        const inventoryItems = JSON.parse(itemsJson) as Array<InventoryItem>;
        let pocketItems: Array<InventoryItem> = [];

        const pocketItemsIndices = JSON.parse(
          localStorage.getItem("pocketItems") as string
        ) as Array<number>;

        pocketItemsIndices.forEach((x, v) => {
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
    this.initPocket = () => {
      const itemsJson = localStorage.getItem("pocketItems");
      if (!itemsJson) {
        localStorage.setItem("pocketItems", JSON.stringify([]));
        return;
      }
    };
  }
}
