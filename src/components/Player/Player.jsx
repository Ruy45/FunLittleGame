import { usePlayerStore } from "../../stores/PlayerStore.js";
import scss from "../Player/player.module.scss";
import { observer } from "mobx-react";

export const Player = observer(({ position }) => {
  const { currentImage, currentHelmet, currentArmor } = usePlayerStore();

  const backgroundImages = [
    { image: currentImage },
    { type: "helmet", image: currentHelmet?.image },
    { type: "armor", image: currentArmor?.image },
  ];

  return (
    <div
      className={scss["player-container"]}
      style={{
        position: "absolute",
        left: position.x * 30,
        top: position.y * 30,
        width: "30px",
        height: "30px",
      }}
    >
      {backgroundImages.map((bgImage, index) => (
        <div
          key={index}
          className={scss["player-layer"]}
          style={{
            backgroundImage: bgImage.type
              ? `url("src/assets/ShopItems/${bgImage.type}/${bgImage.image}")`
              : `url("src/assets/character.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: index + 999,
          }}
        ></div>
      ))}
    </div>
  );
});
