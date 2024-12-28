import scss from "./start-menu.module.scss";
import { rootStore, useStores } from "../../stores/RootStore.js";
import { observer } from "mobx-react";
import { useState } from "react";
import { playerStore, usePlayerStore } from "../../stores/PlayerStore.js";

export const StartMenu = observer(() => {
  const { setCurrentPage, monsters, genMap, spawnMonsters, monstersNumber } =
    useStores();

  const { setUsername } = usePlayerStore();
  const [gameStarted, setGameStarted] = useState(false);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNewGameClick = () => {
    rootStore.setPlayerPosition({ x: 0, y: 0 });
    setGameStarted(true);
    setCurrentPage("game");
    playerStore.setMoney(200);
    playerStore.setPlayerHealth(100);
    monsters.clear();
    genMap();
    spawnMonsters(monstersNumber);
  };

  return (
    <>
      <div className={scss["start-menu-wrap"]}>
        Menu
        <div className={scss["username"]}>
          <form>
            <label>
              <p>Username</p>
              <input id="usernameID" type="text" onChange={handleInputChange} />
            </label>
          </form>
        </div>
        <button
          className={scss["new-game-button"]}
          onClick={handleNewGameClick}
        >
          New Game
        </button>
        <button
          type="submit"
          id="continue-button"
          className={scss["continue-button"]}
          onClick={() => setCurrentPage("game")}
          hidden={true}
        >
          Continue
        </button>
      </div>
    </>
  );
});
