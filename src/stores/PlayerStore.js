import { createContext, useContext } from "react";
import { action, makeObservable, observable } from "mobx";
import emptyImage from "../assets/empty.png";
import character from "../assets/character.png";
import { ITEM_TYPES } from "../class/Item.js";
import { runInAction } from "mobx";

export class PlayerStore {
  @observable
  username = "Guest";
  @observable
  currentImage = character;
  @observable
  money = 200;
  @observable
  playerHealth = 100;
  @observable
  currentSword = {
    id: 0,
    name: "",
    price: 0,
    image: emptyImage,
    type: ITEM_TYPES.SWORD,
  };
  @observable
  currentHelmet = {
    id: 0,
    name: "",
    image: null,
    price: 0,
    type: ITEM_TYPES.HELMET,
  };
  @observable
  currentArmor = {
    id: 0,
    name: "",
    image: null,
    price: 0,
    type: ITEM_TYPES.ARMOR,
  };
  @observable
  ownedItems = [];

  constructor() {
    makeObservable(this);
  }

  @action setMoney = (money) => {
    this.money = money;
  };

  @action setUsername = (username) => {
    this.username = username;
  };

  @action setPlayerHealth = (health) => {
    this.playerHealth = health;
  };

  @action setCurrentImage = (currentImage) => {
    this.currentImage = currentImage;
  };

  @action setCurrentSword = (currentSword) => {
    this.currentSword = currentSword;
  };

  @action mergeImages = async () => {
    try {
      const combinedImage = await mergeImages([
        { src: character },
        { src: this.currentHelmet.image },
        { src: this.currentArmor.image },
      ]);

      runInAction(() => {
        this.setCurrentImage(combinedImage);
      });
    } catch (error) {
      console.error("Error merging images:", error);
    }
  };

  @action setCurrentHelmet = (currentHelmet) => {
    this.currentHelmet = currentHelmet;
    this.mergeImages();
  };

  @action setCurrentArmor = (currentArmor) => {
    this.currentArmor = currentArmor;
    this.mergeImages();
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
    let itemAlreadyBought = this.ownedItems.find(
      (ownedItem) => ownedItem.id === item.id,
    );

    if (!itemAlreadyBought) {
      switch (item.type) {
        case ITEM_TYPES.ARMOR:
          this.setCurrentArmor(item);
          break;
        case ITEM_TYPES.HELMET:
          this.setCurrentHelmet(item);
          break;
        case ITEM_TYPES.SWORD:
          this.setCurrentSword(item);
          break;
      }
      this.ownedItems.push(item);
      this.ownedItems.sort((a, b) => {
        const lastCharA = a.name.charAt(a.name.length - 1);
        const lastCharB = b.name.charAt(b.name.length - 1);

        if (lastCharA < lastCharB) {
          return -1;
        }
        if (lastCharA > lastCharB) {
          return 1;
        }
        return 0;
      });
    } else {
      console.log("Item already bought");
    }
  };
}

export const playerStore = new PlayerStore();

//Create a context using the RootStore structure.
export const PlayerStoreContext = createContext(playerStore);

//Hook used for providing access to the RootStore throughout the frontend.
export const usePlayerStore = () => {
  const store = useContext(PlayerStoreContext);
  if (!store) {
    throw new Error("RootStore is null.");
  }
  return store;
};
