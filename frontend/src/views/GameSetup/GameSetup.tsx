import Page from "../../components/Page/Page";
import style from "./GameSetup.module.scss";
import GameSettings from "../../components/GameSettings/GameSettings";

const GameSetup = () => {
  return (
    <Page>
      <div className={style.container}>
        <GameSettings />
      </div>
    </Page>
  );
};

export default GameSetup;
