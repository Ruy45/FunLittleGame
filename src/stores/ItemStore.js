import { action, makeObservable, observable } from "mobx";
import { createContext, useContext } from "react";

import sword1 from "../assets/ShopItems/Swords/sword1.png";
import sword2 from "../assets/ShopItems/Swords/sword2.png";
import sword3 from "../assets/ShopItems/Swords/sword3.png";
import sword4 from "../assets/ShopItems/Swords/sword4.png";
import sword5 from "../assets/ShopItems/Swords/sword5.png";

import helmet1 from "../assets/ShopItems/Helmets/helmet1.png";
import helmet2 from "../assets/ShopItems/Helmets/helmet2.png";
import helmet3 from "../assets/ShopItems/Helmets/helmet3.png";
import helmet4 from "../assets/ShopItems/Helmets/helmet4.png";
import helmet5 from "../assets/ShopItems/Helmets/helmet5.png";

import armor1 from "../assets/ShopItems/Armor/armor1.png";
import armor2 from "../assets/ShopItems/Armor/armor2.png";
import armor3 from "../assets/ShopItems/Armor/armor3.png";
import armor4 from "../assets/ShopItems/Armor/armor4.png";
import armor5 from "../assets/ShopItems/Armor/armor5.png";

import costume1 from "../assets/Costumes/costume1.png";
import costume2 from "../assets/Costumes/costume2.png";
import costume3 from "../assets/Costumes/costume3.png";
import costume4 from "../assets/Costumes/costume4.png";
import costume5 from "../assets/Costumes/costume5.png";

export class ItemStore {
  @observable swords = [
    { id: 1, name: "Sword1", price: 10, image: sword1 },
    { id: 2, name: "Sword2", price: 10, image: sword2 },
    { id: 3, name: "Sword3", price: 10, image: sword3 },
    { id: 4, name: "Sword4", price: 10, image: sword4 },
    { id: 5, name: "Sword5", price: 10, image: sword5 },
  ];

  @observable helmets = [
    { id: 1, name: "Helmet1", price: 12, image: helmet1 },
    { id: 2, name: "Helmet2", price: 15, image: helmet2 },
    { id: 3, name: "Helmet3", price: 15, image: helmet3 },
    { id: 4, name: "Helmet4", price: 15, image: helmet4 },
    { id: 5, name: "Helmet5", price: 15, image: helmet5 },
  ];

  @observable armors = [
    { id: 1, name: "Armor1", price: 17, image: armor1 },
    { id: 2, name: "Armor2", price: 17, image: armor2 },
    { id: 3, name: "Armor3", price: 17, image: armor3 },
    { id: 4, name: "Armor4", price: 17, image: armor4 },
    { id: 5, name: "Armor5", price: 17, image: armor5 },
  ];

  @observable costumes = [
    { id: 1, name: "Costume1", image: costume1 },
    { id: 2, name: "Costume2", image: costume2 },
    { id: 3, name: "Costume3", image: costume3 },
    { id: 4, name: "Costume4", image: costume4 },
    { id: 5, name: "Costume5", image: costume5 },
  ];

  //@observable items = [swords, helmets, armors];

  constructor() {
    makeObservable(this);
  }
}

export const itemStore = new ItemStore();

//Create a context using the RootStore structure.
export const ItemStoreContext = createContext(itemStore);

//Hook used for providing access to the RootStore throughout the frontend.
export const useStores = () => {
  const store = useContext(ItemStoreContext);
  if (!store) {
    throw new Error("ItemStore is null.");
  }
  return store;
};
