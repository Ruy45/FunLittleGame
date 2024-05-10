import React, { useState, useEffect } from "react";
import scss from "./monster.module.scss";
import monsterImage from "../../assets/monster.png";
import { MonsterHealthBar } from "../MonsterHealthBar/MonsterHealthBar.jsx";

export const Monster = ({ position, monsterName, monsterHealth }) => {
  const maxMonsterHealth = 100;
  return (
    <div
      className={scss["monster"]}
      style={{
        left: `calc(${position.x * 30}px + (15px / 2))`,
        top: `calc(${position.y * 30}px + (15px / 2))`,
        backgroundImage: `url(${monsterImage})`,
      }}
    >
      {monsterHealth !== maxMonsterHealth ? (
        <MonsterHealthBar
          currentMonsterHealth={monsterHealth}
          maxMonsterHealth={maxMonsterHealth}
        />
      ) : null}
      {/*<div className={scss["monster-name"]}>{monsterName}</div>*/}
    </div>
  );
};
