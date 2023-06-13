import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./GameSetup.module.scss";
import { useSession } from "../../providers/SessionProvider";
import { Friend } from "../../types/auth";
import val from "../../assets/val.webp";
import csgo from "../../assets/cs.webp";

const GameSetup = () => {
  const navigate = useNavigate();
  const [session] = useSession();

  if (session.user === undefined) return (location.href = "/login");

  const [game, setGame] = useState("");
  const [matchFormat, setMatchFormat] = useState("bo1");
  const [opponentType, setOpponentType] = useState("friend");
  const [opponentName, setOpponentName] = useState("");
  const [startPlayer, setStartPlayer] = useState(session.user.nickname);
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/friends", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch friends");
        }
        const data: Friend[] = await response.json();
        setFriends(data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const draft = {
      gameName: game,
      startingUser: startPlayer,
      teams: [
        {
          user: session.user?.nickname,
          picks: [],
          bans: [],
        },
        {
          user: opponentName,
          picks: [],
          bans: [],
        },
      ],
    };

    try {
      const draftResponse = await fetch("http://localhost:3000/drafts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const draftData = await draftResponse.json();

      const match = {
        date: new Date(),
        draft: draftData._id,
      };

      const matchResponse = await fetch(
        "http://localhost:3000/matches/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(match),
        }
      );
      const matchData = await matchResponse.json();

      navigate(`/game-lobby/${matchData._id}`);
    } catch (error) {
      console.error("Error creating match:", error);
    }
  };

  return (
    <div className={style.container}>
      <form className={style.gameForm} onSubmit={handleSubmit}>
        <div className={style.chooseGame}>
          <input
            type="radio"
            value="counter_strike"
            checked={game === "counter_strike"}
            onChange={() => setGame("counter_strike")}
          />
          <label className={style.labels} htmlFor="counter_strike">
            <img className={style.gameImage} src={csgo} alt="Counter Strike" />
          </label>
          <input
            type="radio"
            value="valorant"
            checked={game === "valorant"}
            onChange={() => setGame("valorant")}
          />
          <label className={style.labels} htmlFor="valorant">
            <img className={style.gameImage} src={val} alt="Valorant" />
          </label>
        </div>
        <label htmlFor="opponent">Opponent</label>
        <div className={style.opponentContainer}>
          <div>
            <input
              id="friend"
              type="radio"
              value="friend"
              checked={opponentType === "friend"}
              onChange={() => setOpponentType("friend")}
            />
            <label htmlFor="friend">Friend</label>
            {opponentType === "friend" && (
              <select
                name="opponentName"
                id="opponentName"
                value={opponentName}
                onChange={(e) => setOpponentName(e.target.value)}
              >
                {friends.map((friend) => (
                  <option key={friend._id}>{friend.username}</option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label htmlFor="specUser">User</label>
            <input
              id="specUser"
              type="radio"
              value="user"
              checked={opponentType === "user"}
              onChange={() => setOpponentType("user")}
            />
            {opponentType === "user" && (
              <input
                type="text"
                name="opponentName"
                id="opponentName"
                value={opponentName}
                onChange={(e) => setOpponentName(e.target.value)}
              />
            )}
          </div>
        </div>
        <label htmlFor="gameMode">Match Format</label>
        <select
          name="matchFormat"
          id="matchFormat"
          value={matchFormat}
          onChange={(e) => setMatchFormat(e.target.value)}
        >
          <option value="bo1">Best of 1</option>
          <option value="bo3">Best of 3</option>
        </select>
        <label htmlFor="startPlayer">Who Starts</label>
        <select
          name="startPlayer"
          id="startPlayer"
          value={startPlayer}
          onChange={(e) => setStartPlayer(e.target.value)}
        >
          <option value="me">Me</option>
          <option value="opponent">Opponent</option>
          <option value="random">Random</option>
        </select>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default GameSetup;
