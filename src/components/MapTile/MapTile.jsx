import PropTypes from "prop-types";
import scss from "./map-tile.module.scss";
import cn from "classnames";
import { useStores } from "../../stores/RootStore.js";
import { Monster } from "../Monster/Monster.jsx";
import { observer } from "mobx-react";

const heightThresholds = (height, x, y) => {
  if (x === 0 && y === 0) {
    return "grass";
  }
  if (height < 30) {
    return "water";
  }
  if (height < 80) {
    return "beach";
  }
  if (height < 100) {
    return "grass";
  }
  return "wall";
};

export const MapTile = observer(({ height, x, y }) => {
  const { monsters, MAP_HEIGHT, cameraPosition } = useStores();
  const monster = Array.from(monsters.values()).find(
    (monster) => monster.position.x === x && monster.position.y === y,
  );

  return (
    <div className={cn(scss["map-tile"], scss[heightThresholds(height, x, y)])}>
      {monster ? (
        <div className={scss["monster"]}>
          <Monster
            position={{
              x: monster.position.y - cameraPosition.x,
              y: monster.position.x - cameraPosition.y,
            }}
            monsterName={monster.name}
            monsterHealth={monster.health}
          />
        </div>
      ) : null}
    </div>
  );
});

MapTile.propTypes = {
  height: PropTypes.number.isRequired,
};
