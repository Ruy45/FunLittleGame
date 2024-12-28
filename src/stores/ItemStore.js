import { action, makeObservable, observable } from "mobx";
import { createContext, useContext } from "react";
import itemsJson from "../assets/items.json";

import costume1 from "../assets/Costumes/costume1.png";
import costume2 from "../assets/Costumes/costume2.png";
import costume3 from "../assets/Costumes/costume3.png";
import costume4 from "../assets/Costumes/costume4.png";
import costume5 from "../assets/Costumes/costume5.png";
import { Item } from "../class/Item.js";

export class ItemStore {
  @observable costumes = [
    { id: 1, name: "Costume1", image: costume1 },
    { id: 2, name: "Costume2", image: costume2 },
    { id: 3, name: "Costume3", image: costume3 },
    { id: 4, name: "Costume4", image: costume4 },
    { id: 5, name: "Costume5", image: costume5 },
  ];

  @observable items = observable.map();
  constructor() {
    makeObservable(this);
    itemsJson
      .map((item) => new Item(item.name, item.price, item.image, item.type))
      .map((item) => this.items.set(item.id, item));
    console.log(Array.from(this.items.values()));
  }
}

export const itemStore = new ItemStore();

//Create a context using the RootStore structure.
export const ItemStoreContext = createContext(itemStore);

//Hook used for providing access to the RootStore throughout the frontend.
export const useItemStore = () => {
  const store = useContext(ItemStoreContext);
  if (!store) {
    throw new Error("ItemStore is null.");
  }
  return store;
};
