import { v4 as uuidv4 } from "uuid";

export class Monster {
  static entities = new Map();
  static insert(entity) {
    this.entities.set(entity.id, entity);
  }
  static remove(entity) {
    if (typeof entity === "string") {
      return this.entities.delete(entity);
    }
    return this.entities.delete(entity.id);
  }

  id = uuidv4();

  constructor(name = "", position = { x: 0, y: 0 }, level = 1, health = 100) {
    this.name = name;
    this.position = position;
    this.level = level;
    this.health = health;
  }
}
