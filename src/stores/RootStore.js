import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { createContext, useContext } from "react";
import { DsMap } from "diamond-square-generator";
import { Monster } from "../class/Monster.js";
import { cchance } from "../utils/chance.js";
import { playerStore } from "./PlayerStore.js";
import { Noise } from "noisejs";

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
  MAP_WIDTH = 150;
  @observable
  MAP_HEIGHT = 150;
  @observable
  monstersNumber = this.MAP_WIDTH / 4;
  @observable
  DSMap = {};
  @observable
  playerPosition = { x: 0, y: 0 };
  @observable
  cameraPosition = { x: 0, y: 0 };
  @observable
  cameraRadius = 20;
  @observable
  currentPage = "game";
  @observable
  items = observable.map();

  constructor() {
    makeObservable(this);
    this.genMap();
    this.spawnMonsters(this.monstersNumber);
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
        (monster.position.x === this.playerPosition.y &&
          monster.position.y === this.playerPosition.x) ||
        (Math.abs(this.playerPosition.x - monster.position.y) === 1 &&
          this.playerPosition.y === monster.position.x) ||
        (Math.abs(this.playerPosition.y - monster.position.x) === 1 &&
          this.playerPosition.x === monster.position.y)
      ) {
        playerStore.setPlayerHealth(Math.max(0, playerStore.playerHealth - 5));
      }

      // if (
      //   (monster.position.x === this.playerPosition.x &&
      //     monster.position.y === this.playerPosition.y) ||
      //   (Math.abs(this.playerPosition.x - monster.position.x) === 1 &&
      //     this.playerPosition.y === monster.position.y) ||
      //   (Math.abs(this.playerPosition.y - monster.position.y) === 1 &&
      //     this.playerPosition.x === monster.position.x)
      // ) {
      //   playerStore.setPlayerHealth(Math.max(0, playerStore.playerHealth - 5));
      // }
    });
  };

  @action
  genMap = () => {
    let noise = new Noise(Math.random());

    this.DSMap = {
      data: Array.from({ length: this.MAP_WIDTH }, () =>
        Array(this.MAP_HEIGHT).fill(0),
      ),
    };

    for (let x = 0; x < this.MAP_WIDTH; x++) {
      for (let y = 0; y < this.MAP_HEIGHT; y++) {
        const value = noise.simplex2(x / 80, y / 80);

        const normalizedValue = Math.floor((value + 1) * 64);
        console.log("Height value:", normalizedValue);

        this.DSMap.data[x][y] = normalizedValue;
      }
    }
  };

  getMonsterByPosition = (position) => {
    return Array.from(this.monsters.values()).find(
      (monster) =>
        monster.position.x === position.x && monster.position.y === position.y,
    );
  };

  @action setMonstersNumber = (monstersNumber) => {
    this.monstersNumber = monstersNumber;
  };

  @action setIsPaused = (isPaused) => {
    this.isPaused = isPaused;
  };

  @action setIsAttackKeyPressed = (isAttackKeyPressed) => {
    this.isAttackKeyPressed = isAttackKeyPressed;
  };

  @action setUsername = (username) => {
    this.username = username;
  };

  @action setPlayerPosition = (playerPosition) => {
    this.playerPosition = playerPosition;
  };

  @action setCameraPosition = (cameraPosition) => {
    this.cameraPosition = cameraPosition;
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
