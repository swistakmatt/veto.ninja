import { useEffect, useState } from "react";
import Page from "../../components/Page/Page";
import style from "./History.module.scss";
import HistoryRecord from "../../components/HistoryRecord/HistoryRecord";
import { useSession } from "../../providers/SessionProvider";
import { Teams } from "../../components/HistoryRecord/HistoryRecord";

interface Match {
  _id: string;
  date: string;
  result: string;
  draft: {
    _id: string;
    gameName: "valorant" | "counter_strike";
    draftOrder: string[];
    startingUser: { username: string };
    teams: Teams[];
  };
}

const History = () => {
  const [session] = useSession();

  if (session.user === undefined) return (location.href = "/login");

  const [historyRecords, setHistoryRecords] = useState<Match[]>([]);

  useEffect(() => {
    const fetchHistoryRecords = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/matches/history/${session.user?._id}/usernames`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch history records");
        }
        const data: Match[] = await response.json();
        setHistoryRecords(data);
      } catch (error) {
        console.error("Error fetching history records:", error);
      }
    };

    fetchHistoryRecords();
  }, []);

  return (
    <Page>
      <div className={style.container}>
        <div className={style.historyRecords}>
          {historyRecords.map((record, index) => (
            <HistoryRecord
              key={index}
              gameName={record.draft.gameName}
              result={record.result}
              date={new Date(record.date).toLocaleString()}
              startingUser={record.draft.startingUser}
              teams={record.draft.teams}
            />
          ))}
        </div>
      </div>
    </Page>
  );
};

export default History;
