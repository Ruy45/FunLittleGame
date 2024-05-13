import { v4 as uuidv4 } from "uuid";

export class Item {
  id = uuidv4();
  constructor(name, price, image, type) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.type = type;
  }
}

export const ITEM_TYPES = {
  SWORD: "sword",
  HELMET: "helmet",
  ARMOR: "armor",
};
