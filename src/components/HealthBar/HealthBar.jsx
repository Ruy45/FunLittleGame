import scss from "./health-bar.module.scss";

export const HealthBar = ({ maxHealth, currentHealth }) => {
  const healthPercentage = (currentHealth / maxHealth) * 100;

  const healthBarStyle = {
    width: `${healthPercentage}%`,
  };

  return (
    <div className={scss["health-bar-container"]}>
      Health: {currentHealth}
      <div className={scss["health-bar"]} style={healthBarStyle}></div>
    </div>
  );
};
