export interface inventoryItemProps {
  id: number;
  textureIndex: number;
  name: string;
  isActivity: boolean;
  type: InventoryItemType;
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

  constructor({
    id,
    textureIndex,
    name,
    type = InventoryItemType.BLOCK,
    isActivity = false,
  }: inventoryItemProps) {
    this.id = id;
    this.textureIndex = textureIndex;
    this.name = name;
    this.isActivity = isActivity;
    this.type = type;
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
    })
  );
  tmp.push(
    new InventoryItem({
      id: 2,
      textureIndex: 13,
      name: "water",
      isActivity: false,
      type: InventoryItemType.BLOCK,
    })
  );

  localStorage.setItem("allInventoryItems", JSON.stringify(tmp));
};
