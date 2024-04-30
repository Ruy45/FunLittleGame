import { rootStore } from "../../stores/RootStore.js";
import { Item } from "../Item/Item.jsx";
import { observer } from "mobx-react";
import { useStores } from "../../stores/ItemStore.js";
import { playerStore } from "../../stores/PlayerStore.js";
import scss from "./shop.module.scss";
import { useState } from "react";

export const Shop = observer(() => {
  const { swords, helmets, armors } = useStores();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleBuyItemClick = () => {
    if (selectedItem) {
      playerStore.buyItem(selectedItem);
      setSelectedItem(null);
    }
  };

  return (
    <div className={scss["shop-wrap"]}>
      <h2>Shop</h2>
      <h3>Money: {playerStore.money}</h3>
      <div className={scss["item-grid"]}>
        <div className={scss["swords-row"]}>
          {swords.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              onClick={() => {
                console.log("clicked");
                setSelectedItem(item);
              }}
              isSelected={item.name === selectedItem?.name}
            />
          ))}
        </div>
        <div className={scss["helmets-row"]}>
          {helmets.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
        <div className={scss["armors-row"]}>
          {armors.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
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
