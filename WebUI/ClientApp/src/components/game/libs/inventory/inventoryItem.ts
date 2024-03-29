export interface inventoryItemProps {
  id: number;
  textureIndex: number;
  name: string;
  isActivity: boolean;
  type: InventoryItemType;
  barcode: string;
  quantity?: number | null;
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
  quantity?: number | null;

  constructor({
    id,
    textureIndex,
    name,
    barcode,
    quantity,
    type = InventoryItemType.BLOCK,
    isActivity = false,
  }: inventoryItemProps) {
    this.id = id;
    this.textureIndex = textureIndex;
    this.name = name;
    this.isActivity = isActivity;
    this.type = type;
    this.barcode = barcode;
    this.quantity = quantity;
  }
}

export interface ILocalStorageItem {
  barcode: string;
  quantity: number;
}
