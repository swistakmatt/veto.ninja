import style from "./GameSettings.module.scss";

const GameSettings = () => {
  return (
    <div className={style.container}>
      <form className={style.gameForm}>
        <label htmlFor="gameMode">Game Mode</label>
        <select name="gameMode" id="gameMode">
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <label htmlFor="gameDifficulty">Game Difficulty</label>
        <select name="gameDifficulty" id="gameDifficulty">
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </form>
    </div>
  );
};

export default GameSettings;
