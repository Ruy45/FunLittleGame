import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { useStores } from "../../stores/RootStore.js";
import scss from "./pop-up-menu.module.scss";

export const PopUpMenu = () => {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const { setCurrentPage, isPaused, setIsPaused } = useStores();

  return (
    <div autoCapitalize="pop-up-menu">
      <Popup
        trigger={<div className={scss["button"]}>Menu</div>}
        open={isPaused}
        onClose={() => setIsPaused(false)}
      >
        <div>
          <button onClick={() => setCurrentPage("menu")}>Start Menu</button>
          <button onClick={() => setCurrentPage("shop")}>Shop</button>
          <button onClick={() => setCurrentPage("inventory")}>Inventory</button>
        </div>
      </Popup>
    </div>
  );
};
