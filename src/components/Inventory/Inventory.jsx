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
      <img src={profilePic} alt="pic" className={scss["profile-image"]} />
      <button
        className={scss["back"]}
        onClick={() => rootStore.setCurrentPage("game")}
      >
        Back
      </button>
    </div>
  );
};
