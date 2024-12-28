import scss from "../Inventory/inventory.module.scss";
import profile from "../../assets/character.png";
import { rootStore } from "../../stores/RootStore.js";
import { playerStore, usePlayerStore } from "../../stores/PlayerStore.js";
import { Item } from "../Item/Item.jsx";
import { ITEM_TYPES } from "../../class/Item.js";
import { useState } from "react";

export const Inventory = ({ profilePic }) => {
  profilePic = profile;
  const {
    currentHelmet,
    currentArmor,
    currentSword,
    ownedItems,
    setCurrentHelmet,
    setCurrentArmor,
    setCurrentSword,
  } = usePlayerStore();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleIsSelectedItem = () => {
    if (selectedItem) {
      switch (selectedItem.type) {
        case ITEM_TYPES.HELMET:
          setCurrentHelmet(selectedItem);
          setSelectedItem(null);
          break;
        case ITEM_TYPES.ARMOR:
          setCurrentArmor(selectedItem);
          setSelectedItem(null);
          break;
        case ITEM_TYPES.SWORD:
          setCurrentSword(selectedItem);
          setSelectedItem(null);
          break;
      }
    }
  };

  const rows = (
    <div className={scss["owned-item-grid"]}>
      {Object.values(ITEM_TYPES).map((itemType, i) => (
        <div className={scss["row"]} key={i}>
          {Array.from(ownedItems.values())
            .filter((item) => item.type === itemType)
            .map((item) => (
              <Item
                className={scss["owned-item"]}
                key={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                type={item.type}
                isSelected={item.name === selectedItem?.name}
                onClick={() => {
                  setSelectedItem(item);
                  handleIsSelectedItem();
                }}
                styleType={"inventory"}
              />
            ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className={scss["inventory-wrap"]}>
      <div className={scss["current-items"]}>
        <img src={profilePic} alt="pic" className={scss["profile-image"]} />
        <div className={scss["equipped-items"]}>
          {currentHelmet.name !== "" ? (
            <img
              src={`/src/assets/ShopItems/${currentHelmet.type}/${currentHelmet.image}`}
              alt={currentHelmet.type}
            />
          ) : (
            <div />
          )}
          {currentArmor.name !== "" ? (
            <img
              src={`/src/assets/ShopItems/${currentArmor.type}/${currentArmor.image}`}
              alt={currentArmor.type}
            />
          ) : (
            <div />
          )}
          <img
            src={`/src/assets/ShopItems/${currentSword.type}/${currentSword.image}`}
            alt={currentSword.type}
          />
        </div>
      </div>
      <div className={scss["owned-items"]}>{rows}</div>

      <button
        className={scss["back"]}
        onClick={() => rootStore.setCurrentPage("game")}
      >
        Back
      </button>
    </div>
  );
};
