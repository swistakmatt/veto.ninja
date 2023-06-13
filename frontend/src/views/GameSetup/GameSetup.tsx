import Page from "../../components/Page/Page";
import style from "./GameSetup.module.scss";
import GameSetupComponent from "../../components/GameSetup/GameSetup";

const GameSetup = () => {
  return (
    <Page>
      <div className={style.container}>
        <GameSetupComponent />
      </div>
    </Page>
  );
};

export default GameSetup;
