import { MapTile } from "../MapTile/MapTile.jsx";
import { Player } from "../Player/Player.jsx";
import scss from "./map.module.scss";
import { useStores } from "../../stores/RootStore.js";
import { playerStore, usePlayerStore } from "../../stores/PlayerStore.js";
import { observer } from "mobx-react";
import { HealthBar } from "../HealthBar/HealthBar.jsx";
import { PopUpMenu } from "../PopUpMenu/PopUpMenu.jsx";
import { useEffect, useState } from "react";
import { GameOverPopUp } from "../GameOverPopUp/GameOverPopUp.jsx";

export const MapComponent = observer(() => {
  const {
    monsters,
    playerPosition,
    setPlayerPosition,
    DSMap,
    MAP_WIDTH,
    MAP_HEIGHT,
    isPaused,
    setIsPaused,
    getMonsterByPosition,
    cameraPosition,
    cameraRadius,
    setCameraPosition,
  } = useStores();

  const { playerHealth, setPlayerHealth, username } = usePlayerStore();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isGameOverPopUpOpen, setIsGameOverPopUpOpen] = useState(false);

  // useEffect(() => {
  //   if (playerHealth <= 0) {
  //     setIsGameOverPopUpOpen(true);
  //   }
  // }, [playerHealth]);

  const handleAttack = () => {
    const attackRange = 1;

    for (let i = -attackRange; i <= attackRange; i++) {
      for (let j = -attackRange; j <= attackRange; j++) {
        const checkX = playerPosition.y + i;
        const checkY = playerPosition.x + j;
        const monster = getMonsterByPosition({ x: checkX, y: checkY });
        if (monster) {
          monster.health = Math.max(0, monster.health - 10);
          if (!monster.health) {
            playerStore.money += 10;
            monsters.delete(monster.id);
          }
        }
      }
    }
  };

  const handleKeyDown = (event) => {
    let nextX = playerPosition.x;
    let nextY = playerPosition.y;

    switch (event.key) {
      case "w":
        nextY = Math.max(playerPosition.y - 1, 0);
        break;
      case "s":
        nextY = Math.min(playerPosition.y + 1, MAP_HEIGHT - 1);
        break;
      case "a":
        nextX = Math.max(playerPosition.x - 1, 0);
        break;
      case "d":
        nextX = Math.min(playerPosition.x + 1, MAP_WIDTH - 1);
        break;
      case "k":
        handleAttack();
        break;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        setIsPaused(!isPaused);
        break;
      default:
        break;
    }

    const nextTile = DSMap.data[nextX][nextY];
    // if (nextTile < 30) {
    //   return;
    // }

    if (nextX > MAP_WIDTH || nextY > MAP_HEIGHT || nextX < 0 || nextY < 0) {
      console.log("Out of bounds.");
      return;
    }

    if (
      cameraPosition.x + cameraRadius > MAP_HEIGHT ||
      cameraPosition.y + cameraRadius > MAP_WIDTH ||
      cameraPosition.x < 0 ||
      cameraPosition.y < 0
    ) {
      console.log("Camera out of bounds.");
      return;
    }

    if (nextX >= cameraPosition.x + cameraRadius) {
      setCameraPosition({ x: cameraPosition.x + 1, y: cameraPosition.y });
    } else if (nextY >= cameraPosition.y + cameraRadius) {
      setCameraPosition({ x: cameraPosition.x, y: cameraPosition.y + 1 });
    } else if (nextX < cameraPosition.x) {
      setCameraPosition({ x: cameraPosition.x - 1, y: cameraPosition.y });
    } else if (nextY < cameraPosition.y) {
      setCameraPosition({ x: cameraPosition.x, y: cameraPosition.y - 1 });
    }

    setPlayerPosition({ x: nextX, y: nextY });
    //console.log("playerPos", playerPosition.x, playerPosition.y);
    //console.log("cameraPos", cameraPosition.x, cameraPosition.y);
  };

  const map = [];

  for (let i = cameraPosition.y; i < cameraPosition.y + cameraRadius; i++) {
    const row = [];
    for (let j = cameraPosition.x; j < cameraPosition.x + cameraRadius; j++) {
      // if (i < 0 || j < 0) {
      //   console.log(i, j);
      // }
      row.push(
        <MapTile key={`tile${j}`} height={DSMap.data[i][j]} x={i} y={j} />,
      );
    }
    map.push(
      <div key={i} className={scss["map-row"]}>
        {row}
      </div>,
    );
  }

  const maxHealth = 100;
  return (
    <div className={scss["map-wrap"]} tabIndex="0">
      {/*<span>{JSON.stringify(playerPosition)}</span>*/}
      <div className="top-bar">
        <PopUpMenu isOpen={isPopUpOpen} setIsOpen={setIsPopUpOpen} />
        <span>
          Money: {playerStore.money}
          <br />
          Username: {username}
        </span>
        <HealthBar maxHealth={maxHealth} currentHealth={playerHealth} />
      </div>
      <div
        className={scss["map-container"]}
        style={{
          width: `calc(${cameraRadius} * 30px)`,
          height: `calc(${cameraRadius} * 30px)`,
        }}
        tabIndex="0"
        onKeyDown={handleKeyDown}
      >
        {map}
        <Player
          position={{
            x: playerPosition.x - cameraPosition.x,
            y: playerPosition.y - cameraPosition.y,
          }}
        />
        {isPaused ? <div className={scss["pause-overlay"]}>paused</div> : null}
      </div>
    </div>
  );
});
// <GameOverPopUp
//     open={isGameOverPopUpOpen}
//     setIsOpen={setIsGameOverPopUpOpen}
// />
