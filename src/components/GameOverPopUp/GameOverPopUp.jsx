import Popup from "reactjs-popup";
import React from "react";

export const GameOverPopUp = () => {
  return (
    <Popup
      trigger={<div className="button">Game over</div>}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div>Game over</div>
    </Popup>
  );
};
