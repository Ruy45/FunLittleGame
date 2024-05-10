import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { createContext, useContext } from "react";
import { DsMap } from "diamond-square-generator";
import { Monster } from "../class/Monster.js";
import { cchance } from "../utils/chance.js";

export class RootStore {
  @observable
  monstersTrajectories = new Map();
  @observable
  isPaused = false;
  @observable
  isAttackKeyPressed = false;
  @observable
  monsters = observable.map();
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
    this.spawnMonsters(2);
  }

  @action spawnMonsters = (count) => {
    for (let i = 0; i < count; i++) {
      let monsterName = cchance.name().substring(0, 5);
      const monster = new Monster(monsterName, {
        x: cchance.integer({ min: 0, max: this.MAP_HEIGHT - 1 }),
        y: cchance.integer({ min: 0, max: this.MAP_WIDTH - 1 }),
      });

      makeObservable(monster, { position: true });
      this.monsters.set(monster.id, monster);
    }
  };

  @action moveMonster = () => {
    Array.from(this.monsters.values()).forEach((monster) => {
      const deltaX = cchance.pickone([-1, 0, 1]);
      const deltaY = cchance.pickone([-1, 0, 1]);

      let nextX = monster.position.x + deltaX;
      let nextY = monster.position.y + deltaY;

      if (
        nextX >= 0 &&
        nextX < this.MAP_WIDTH &&
        nextY >= 0 &&
        nextY < this.MAP_HEIGHT
      ) {
        monster.position = { x: nextX, y: nextY };
      }
      if (
        (monster.position.x === this.playerPosition.x &&
          monster.position.y === this.playerPosition.y) ||
        (Math.abs(this.playerPosition.x - monster.position.x) === 1 &&
          this.playerPosition.y === monster.position.y) ||
        (Math.abs(this.playerPosition.y - monster.position.y) === 1 &&
          this.playerPosition.x === monster.position.x)
      ) {
        this.setPlayerHealth(Math.max(0, this.playerHealth - 5));
      }
    });
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
    return Array.from(this.monsters.values()).find(
      (monster) =>
        monster.position.x === position.x && monster.position.y === position.y,
    );
  };

  @action setIsPaused = (isPaused) => {
    this.isPaused = isPaused;
  };

  @action setIsAttackKeyPressed = (isAttackKeyPressed) => {
    this.isAttackKeyPressed = isAttackKeyPressed;
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

  @action tick = () => {
    if (this.isPaused) {
      return;
    }
    this.moveMonster();
  };

  @observable
  gameLoop = setInterval(this.tick, 500);
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
