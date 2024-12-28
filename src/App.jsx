import { List } from "./List.jsx";
import { MapComponent } from "./components/Map/MapComponent.jsx";
import { observer, Provider } from "mobx-react";
import { useStores } from "./stores/RootStore.js";
import { StartMenu } from "./components/StartMenu/StartMenu.jsx";
import { Shop } from "./components/Shop/Shop.jsx";
import { Inventory } from "./components/Inventory/Inventory.jsx";
import { usePlayerStore } from "./stores/PlayerStore.js";

export const App = observer(() => {
  const { currentPage } = useStores();
  const { currentSword, currentArmor, currentHelmet } = usePlayerStore();

  switch (currentPage) {
    case "menu": {
      return (
        <Provider value={useStores()}>
          <StartMenu></StartMenu>
        </Provider>
      );
    }
    case "game": {
      return (
        <Provider value={useStores()}>
          <MapComponent />
        </Provider>
      );
    }
    case "shop": {
      return (
        <Provider value={useStores()}>
          <Shop />
        </Provider>
      );
    }
    case "inventory": {
      return (
        <Provider value={useStores()}>
          <Inventory />
        </Provider>
      );
    }
  }
});
