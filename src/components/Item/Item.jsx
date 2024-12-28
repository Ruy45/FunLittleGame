import scss from "./item.module.scss";
import cn from "classnames";

export const Item = ({
  name,
  image,
  price,
  type,
  isSelected,
  onClick,
  styleType,
}) => {
  return (
    <div
      className={cn(
        styleType === "inventory" ? scss["inventory-item"] : scss["shop-item"],
        {
          [scss["selected"]]: isSelected,
        },
      )}
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
