import PropTypes from "prop-types";
import scss from "./map-tile.module.scss";
import cn from "classnames";
import { useStores } from "../../stores/RootStore.js";
import monsterImage from "../../assets/monster.png";

const heightThresholds = (height) => {
  if (height < 30) {
    return "water";
  }
  if (height < 35) {
    return "beach";
  }
  if (height < 70) {
    return "grass";
  }
  return "wall";
};

export const MapTile = ({ height, x, y }) => {
  const { getMonsterByPosition } = useStores();
  const monster = getMonsterByPosition({ x, y });

  return (
    <div className={cn(scss["map-tile"], scss[heightThresholds(height)])}>
      {monster ? (
        <div className="monster">
          <img src={monsterImage} alt="monster" />
        </div>
      ) : null}
    </div>
  );
};

MapTile.propTypes = {
  height: PropTypes.number.isRequired,
};
