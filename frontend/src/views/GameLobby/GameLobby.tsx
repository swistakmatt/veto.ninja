import React, { useState, useEffect } from "react";
import Page from "../../components/Page/Page";
import style from "./GameLobby.module.scss";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

interface GameData {
  _id: string;
  game: string;
  matchFormat: string;
  opponentType: string;
  opponentName: string;
  startPlayer: string;
  lobbyId: string;
}

interface GameMap {
  id: string;
  name: string;
  pickedBy: string | null;
}

let socket = io();

const GameLobby = () => {
  const { id } = useParams<{ id: string }>();
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [timer, setTimer] = useState(60);
  const [gameMaps, setGameMaps] = useState<GameMap[]>([]);
  const [pickedMaps, setPickedMaps] = useState<GameMap[]>([]);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/matches/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch match data");
        }
        const data = await response.json();
        setGameData(data);
      } catch (error) {
        console.error("Error fetching match data:", error);
      }
    };

    fetchMatchData();
  }, [id]);

  // useEffect(() => {
  //   socket = io("http://localhost:3000");

  //   socket.on("connect", () => {
  //     console.log("Connected to server");
  //   });

  //   socket.emit("join_room", id);

  //   socket.on("timer_update", (remainingTime: number) => {
  //     setTimer(remainingTime);
  //   });

  //   socket.on("map_update", (maps: GameMap[], pickedMaps: GameMap[]) => {
  //     setGameMaps(maps);
  //     setPickedMaps(pickedMaps);
  //   });

  //   return () => {
  //     socket.off("timer_update");
  //     socket.off("map_update");
  //   };
  // }, [id]);

  const handleMapClick = (map: GameMap) => {
    socket.emit("map_select", map.id);
  };

  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <Page>
      <div className={style.container}>
        <p>Time remaining: {timer}</p>
        <div>
          <h2>Available Maps</h2>
          {gameMaps.map((map) => (
            <div key={map.id} onClick={() => handleMapClick(map)}>
              {map.name}
            </div>
          ))}
        </div>
        <div>
          <h2>Picked Maps</h2>
          {pickedMaps.map((map) => (
            <div key={map.id}>
              {map.name} (picked by: {map.pickedBy})
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default GameLobby;
