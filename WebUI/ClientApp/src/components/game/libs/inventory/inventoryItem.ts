export interface inventoryItemProps {
  id: number;
  textureIndex: number;
  name: string;
  isActivity: boolean;
  type: InventoryItemType;
  barcode: string;
}

export enum InventoryItemType {
  BLOCK,
  TOOL,
}

export class InventoryItem {
  id: number;
  textureIndex: number;
  name: string;
  isActivity: boolean;
  type: InventoryItemType;
  barcode: string;

  constructor({
    id,
    textureIndex,
    name,
    barcode,
    type = InventoryItemType.BLOCK,
    isActivity = false,
  }: inventoryItemProps) {
    this.id = id;
    this.textureIndex = textureIndex;
    this.name = name;
    this.isActivity = isActivity;
    this.type = type;
    this.barcode = barcode;
  }
}

export const initialInventoryItems = () => {
  if (localStorage.getItem("allInventoryItems")) {
    return;
  }
  let tmp: Array<InventoryItem> = [];
  tmp.push(
    new InventoryItem({
      id: 1,
      textureIndex: 14,
      name: "ground",
      isActivity: false,
      type: InventoryItemType.BLOCK,
      barcode: "Block:Ground"
    })
  );
  tmp.push(
    new InventoryItem({
      id: 2,
      textureIndex: 13,
      name: "water",
      isActivity: false,
      type: InventoryItemType.BLOCK,
      barcode: "Block:Water"
    })
  );

  localStorage.setItem("allInventoryItems", JSON.stringify(tmp));
};
