import scss from "./item.module.scss";
import cn from "classnames";

export const Item = ({ name, image, price, type, isSelected, onClick }) => {
  return (
    <div
      className={cn(scss["item"], { [scss["selected"]]: isSelected })}
      onClick={onClick}
    >
      <p className={scss["item-name"]}>{name}</p>
      <img
        src={`/src/assets/ShopItems/${type}/${image}`}
        alt="Item"
        className={scss["item-image"]}
      />
      <p className={scss["item-price"]}>{price}</p>
    </div>
  );
};
