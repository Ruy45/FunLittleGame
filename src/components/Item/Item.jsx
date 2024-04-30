import scss from "./item.module.scss";
import cn from "classnames";

export const Item = ({ name, image, price, isSelected }) => {
  console.log(isSelected);
  return (
    <div className={cn(scss["item"], { [scss["selected"]]: isSelected })}>
      <p className={scss["item-name"]}>{name}</p>
      <img src={image} alt="Item" className={scss["item-image"]} />
      <p className={scss["item-price"]}>{price}</p>
    </div>
  );
};
