import playerImage from "../../assets/girl.png";
import { useStores } from "../../stores/RootStore.js";
import scss from "../Player/player.module.scss";

export const Player = ({ position }) => {
  const { username } = useStores();

  return (
    <div
      className={scss["player"]}
      style={{
        position: "absolute",
        left: position.x * 30,
        top: position.y * 30,
        backgroundImage: `url(${playerImage})`,
      }}
    >
      <div className={scss["username"]}>{username}</div>
    </div>
  );
};
