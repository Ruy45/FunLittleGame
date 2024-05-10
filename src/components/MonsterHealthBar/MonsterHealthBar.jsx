import scss from "./monster-health-bar.module.scss";

export const MonsterHealthBar = ({
  currentMonsterHealth,
  maxMonsterHealth,
}) => {
  const healthPercentage = (currentMonsterHealth / maxMonsterHealth) * 100;

  const healthBarStyle = {
    width: `${healthPercentage}%`,
  };

  return (
    <div className={scss["monster-health-bar"]} style={healthBarStyle}></div>
  );
};
