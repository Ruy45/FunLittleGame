import React, { useState, useEffect } from "react";
import scss from "./monster.module.scss";
import monsterImage from "../../assets/monster.png";
import { useStores } from "../../stores/RootStore.js";

const monsters = [];

export const Monster = ({ startPosition, endPosition, mapSize }) => {
  const { playerHealth, setPlayerHealth } = useStores();
  const { playerPosition, setPlayerPosition } = useStores();
  const [position, setPosition] = useState(startPosition);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    console.log("monster useEffect");
    const moveMonster = () => {
      const deltaX = endPosition.x - startPosition.x;
      const deltaY = endPosition.y - startPosition.y;

      let nextX =
        position.x + direction * (deltaX !== 0 ? Math.sign(deltaX) : 0);
      let nextY =
        position.y + direction * (deltaY !== 0 ? Math.sign(deltaY) : 0);

      setPosition({ x: nextX, y: nextY });

      if (nextX === endPosition.x && nextY === endPosition.y) {
        setDirection(-1);
      } else if (nextX === startPosition.x && nextY === startPosition.y) {
        setDirection(1);
        clearInterval(moveInterval);
      }
    };

    const moveInterval = setInterval(moveMonster, 6000000);
    checkPlayerIntersection();

    return () => clearInterval(moveInterval);
  }, [position, endPosition, startPosition]);

  const checkPlayerIntersection = () => {
    if (
      (position.x === playerPosition.x && position.y === playerPosition.y) ||
      (Math.abs(playerPosition.x - position.x) === 1 &&
        playerPosition.y === position.y) ||
      (Math.abs(playerPosition.y - position.y) === 1 &&
        playerPosition.x === position.x)
    ) {
      setPlayerHealth(Math.max(0, playerHealth - 5));
    }
  };

  return (
    <div
      className={scss["monster"]}
      style={{
        left: position.x * 30,
        top: position.y * 30,
        backgroundImage: `url(${monsterImage})`,
      }}
    ></div>
  );
};

export const renderMonsters = ({ MAP_WIDTH }) => {
  return monsters.map((monster) => (
    <Monster
      key={monster.id}
      startPosition={monster.startPosition}
      endPosition={monster.endPosition}
      mapSize={MAP_WIDTH}
    />
  ));
};
