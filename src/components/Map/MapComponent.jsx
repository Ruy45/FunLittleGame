import { MapTile } from "../MapTile/MapTile.jsx";
import { Player } from "../Player/Player.jsx";
import scss from "./map.module.scss";
import { useStores } from "../../stores/RootStore.js";
import { playerStore } from "../../stores/PlayerStore.js";
import { observer } from "mobx-react";
import { renderMonsters } from "../Monster/Monster.jsx";
import { HealthBar } from "../HealthBar/HealthBar.jsx";
import { PopUpMenu } from "../PopUpMenu/PopUpMenu.jsx";
import { useEffect, useState } from "react";
import { GameOverPopUp } from "../GameOverPopUp/GameOverPopUp.jsx";

export const MapComponent = observer(() => {
  const {
    playerPosition,
    playerHealth,
    setPlayerPosition,
    setPlayerHealth,
    DSMap,
    MAP_WIDTH,
    MAP_HEIGHT,
    isPaused,
    setIsPaused,
  } = useStores();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isGameOverPopUpOpen, setIsGameOverPopUpOpen] = useState(false);
  const monsters = renderMonsters(MAP_WIDTH);

  useEffect(() => {
    if (playerHealth <= 0) {
      setIsGameOverPopUpOpen(true);
    }
  }, [playerHealth]);

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
      case "Escape":
        console.log("setPause", isPaused);
        event.preventDefault();
        event.stopPropagation();
        setIsPaused(!isPaused);
        break;
      default:
        break;
    }

    const nextTile = DSMap.data[nextX][nextY];
    console.log({ nextTile, nextX, nextY });
    if (nextTile >= 30) {
      setPlayerPosition({ x: nextX, y: nextY });
    }
  };

  const map = [];

  for (let i = 0; i < MAP_HEIGHT; i++) {
    const row = [];
    for (let j = 0; j < MAP_WIDTH; j++) {
      row.push(
        <MapTile key={`tile${j}`} height={DSMap.data[j][i]} x={i} y={j} />,
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
        Money: {playerStore.money}
        <HealthBar maxHealth={maxHealth} currentHealth={playerHealth} />
      </div>
      <div
        className={scss["map-container"]}
        tabIndex="0"
        onKeyDown={handleKeyDown}
      >
        {map}
        {monsters}
        <Player position={playerPosition} />
        {isPaused ? <div className={scss["pause-overlay"]}>paused</div> : null}
      </div>
    </div>
  );
});
// <GameOverPopUp
//     open={isGameOverPopUpOpen}
//     setIsOpen={setIsGameOverPopUpOpen}
// />
