import { createContext, useContext } from "react";
import { action, makeObservable, observable } from "mobx";
import emptyImage from "../assets/empty.png";

export class PlayerStore {
  @observable
  money = 100;
  @observable
  currentSword = { id: 0, name: "", image: emptyImage, price: 0 };
  @observable
  currentHelmet = { id: 0, name: "", image: emptyImage, price: 0 };
  @observable
  currentArmor = { id: 0, name: "", image: emptyImage, price: 0 };

  constructor() {
    makeObservable(this);
  }

  @action setMoney = (money) => {
    this.money = money;
  };

  @action setCurrentSword = (currentSword) => {
    this.currentSword = currentSword;
  };

  @action setCurrentHelmet = (currentHelmet) => {
    this.currentHelmet = currentHelmet;
  };

  @action setCurrentArmor = (currentArmor) => {
    this.currentArmor = currentArmor;
  };

  @action buyItem = (item) => {
    console.log("buy");
    if (this.money >= item.price) {
      this.money -= item.price;
      this.addItemToInventory(item);
    } else {
      console.log("Not enough money");
    }
  };

  @action addItemToInventory = (item) => {
    console.log("add to inventory");
    if (item.name.include("sword")) {
      this.currentSword = item;
    } else if (item.name.include("helmet")) {
      this.currentHelmet = item;
    } else if (item.name.include("armor")) {
      this.currentArmor = item;
    }
  };
}

export const playerStore = new PlayerStore();

//Create a context using the RootStore structure.
export const PlayerStoreContext = createContext(playerStore);

//Hook used for providing access to the RootStore throughout the frontend.
export const useStores = () => {
  const store = useContext(PlayerStoreContext);
  if (!store) {
    throw new Error("RootStore is null.");
  }
  return store;
};
