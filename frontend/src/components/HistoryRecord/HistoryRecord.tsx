import style from "./HistoryRecord.module.scss";
import val from "../../assets/val.webp";
import cs from "../../assets/cs.webp";

export interface Teams {
  user: { username: string };
  picks: string[];
  bans: string[];
}

interface HistoryRecordProps {
  gameName: "valorant" | "counter_strike";
  result?: string;
  score?: string;
  map?: string;
  date: string;
  startingUser: { username: string };
  teams: Teams[];
}

const HistoryRecord = ({
  gameName,
  result,
  score,
  map,
  date,
  startingUser,
  teams,
}: HistoryRecordProps) => {
  return (
    <div className={style.container}>
      <img
        src={gameName === "valorant" ? val : cs}
        className={style.gameImage}
      />
      <div className={style.gameInfo}>
        {result && (
          <div className={style.gameResult}>
            <div>{result}</div>
          </div>
        )}
        <div className={style.gameDate}>{date}</div>
        <div className={style.gameDetails}>
          {teams.map((team, index) => (
            <div className={style.detail} key={index}>
              <div className={style.gameUser}>{team.user.username}</div>
              {score && <div className={style.gameScore}>{score}</div>}
              {map && <div className={style.gameMap}>{map}</div>}
              <div className={style.gamePicks}>
                Picks: {team.picks.join(", ")}
              </div>
              <div className={style.gameBans}>Bans: {team.bans.join(", ")}</div>
            </div>
          ))}
        </div>
        <div className={style.startingUser}>
          Starts: {startingUser.username}
        </div>
      </div>
    </div>
  );
};

export default HistoryRecord;
