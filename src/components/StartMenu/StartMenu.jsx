import scss from "./start-menu.module.scss";
import { rootStore, useStores } from "../../stores/RootStore.js";
import { observer } from "mobx-react";
import { useState } from "react";

export const StartMenu = observer(() => {
  const { currentPage, setCurrentPage } = useStores();
  const { username, setUsername } = useStores();
  const [gameStarted, setGameStarted] = useState(false);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNewGameClick = () => {
    let element = document.getElementById("continue-button");
    let hidden = element.getAttribute("hidden");

    if (!hidden) {
      element.removeAttribute("hidden");
    } else {
      element.setAttribute("hidden", "hidden");
    }

    rootStore.setPlayerPosition({ x: 0, y: 0 });
    setGameStarted(true);
    setCurrentPage("game");
    rootStore.setPlayerHealth(100);
    rootStore.genMap();
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
