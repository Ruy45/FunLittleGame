import { rootStore } from "../../stores/RootStore.js";
import { Item } from "../Item/Item.jsx";
import { observer } from "mobx-react";
import { useItemStore } from "../../stores/ItemStore.js";
import { playerStore } from "../../stores/PlayerStore.js";
import scss from "./shop.module.scss";
import { useState } from "react";
import { ITEM_TYPES } from "../../class/Item.js";

export const Shop = observer(() => {
  const { items } = useItemStore();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleBuyItemClick = () => {
    if (selectedItem) {
      playerStore.buyItem(selectedItem);
      setSelectedItem(null);
    }
  };

  const rows = (
    <div className={scss["item-grid"]}>
      {Object.values(ITEM_TYPES).map((itemType, i) => (
        <div className={scss["row"]} key={i}>
          {Array.from(items.values())
            .filter((item) => item.type === itemType)
            .map((item) => (
              <Item
                key={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                type={item.type}
                onClick={() => {
                  console.log("clicked");
                  setSelectedItem(item);
                }}
                isSelected={item.name === selectedItem?.name}
              />
            ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className={scss["shop-wrap"]}>
      <h2>Shop</h2>
      <h3>Money: {playerStore.money}</h3>
      {rows}
      <button
        className={scss["back-button"]}
        onClick={() => rootStore.setCurrentPage("game")}
      >
        Back
      </button>
      <button onClick={handleBuyItemClick}>Buy</button>
    </div>
  );
});
