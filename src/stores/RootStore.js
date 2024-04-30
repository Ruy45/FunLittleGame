import { action, makeObservable, observable } from "mobx";
import { createContext, useContext } from "react";
import { DsMap } from "diamond-square-generator";
import { Monster } from "../class/Monster.js";
import { cchance } from "../utils/chance.js";

export class RootStore {
  @observable
  isPaused = false;
  @observable
  monsters = [];
  @observable
  MAP_WIDTH = 18;
  @observable
  MAP_HEIGHT = 18;
  @observable
  DSMap = {};
  @observable
  playerHealth = 100;
  @observable
  username = "Guest";
  @observable
  playerPosition = { x: 0, y: 0 };
  @observable
  currentPage = "game";

  constructor() {
    makeObservable(this);
    this.genMap();
    this.spawnMonsters(5);
  }

  @action spawnMonsters = (count) => {
    for (let i = 0; i < count; i++) {
      this.monsters.push(
        new Monster(cchance.name(), {
          x: cchance.integer({ min: 0, max: this.MAP_HEIGHT - 1 }),
          y: cchance.integer({ min: 0, max: this.MAP_WIDTH - 1 }),
        }),
      );
    }
  };

  @action genMap = () => {
    const height = 100; // Max height of the map
    const roughness = 100; // Base roughness of the map

    const DSMap = new DsMap(5, {
      height,
      roughness,
    });

    DSMap.calculate();
    DSMap.normalize(80);

    this.DSMap = DSMap;
  };

  getMonsterByPosition = (position) => {
    return this.monsters.find(
      (monster) =>
        monster.position.x === position.x && monster.position.y === position.y,
    );
  };

  @action setIsPaused = (isPaused) => {
    this.isPaused = isPaused;
  };

  @action setPlayerHealth = (health) => {
    this.playerHealth = health;
  };

  @action setUsername = (username) => {
    this.username = username;
  };

  @action setPlayerPosition = (playerPosition) => {
    this.playerPosition = playerPosition;
  };

  @action setCurrentPage = (currentPage) => {
    this.currentPage = currentPage;
  };
}

export const rootStore = new RootStore();

//Create a context using the RootStore structure.
export const RootStoreContext = createContext(rootStore);

//Hook used for providing access to the RootStore throughout the frontend.
export const useStores = () => {
  const store = useContext(RootStoreContext);
  if (!store) {
    throw new Error("RootStore is null.");
  }
  return store;
};
