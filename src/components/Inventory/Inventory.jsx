import scss from "../Item/item.module.scss";
import profile from "../../assets/girl.png";
import { rootStore } from "../../stores/RootStore.js";

export const Inventory = ({
  profilePic,
  currentSword,
  currentHelmet,
  currentArmor,
}) => {
  profilePic = profile;

  return (
    <div>
      <div className={scss["items-grid"]}>
        <img src={profilePic} alt="pic" className={scss["profile-image"]} />
        <div className={scss["current-items"]}>
          <img src={currentHelmet} alt="helmet" />
          <img src={currentArmor} alt="armor" />
          <img src={currentSword} alt="Sword" />
        </div>
      </div>
      <button
        className={scss["back"]}
        onClick={() => rootStore.setCurrentPage("game")}
      >
        Back
      </button>
    </div>
  );
};
