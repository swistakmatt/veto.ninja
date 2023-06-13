import { useState, useEffect } from "react";

import { People, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

import History from "../../views/History/History";

import style from "./SideMenu.module.scss";

interface SideMenuProps {
  menuType: "accountOptions" | "userFriends";
}

interface Friend {
  _id: string;
  username: string;
}

const SideMenu = (props: SideMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendUsername, setFriendUsername] = useState("");

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/logout", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleAddFriend = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users/me/friends", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendUsername }),
      });

      if (!response.ok) {
        throw new Error("Failed to add friend");
      }

      const friend: Friend = await response.json();
      setFriends((prevFriends) => [...prevFriends, friend]);
      setFriendUsername("");
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      if (props.menuType === "userFriends") {
        try {
          const response = await fetch("http://localhost:3000/users/friends", {
            credentials: "include",
          });
          const data: Friend[] = await response.json();
          setFriends(data);
        } catch (error) {
          console.error("Error fetching friends:", error);
        }
      }
    };

    fetchFriends();
  }, [props.menuType]);

  const toggleSideMenu = () => {
    setIsOpen(!isOpen);
  };

  const renderUserAccountOptions = () => (
    <div className={`${style.accountOptions} ${isOpen ? style.open : ""}`}>
      {/* <div>Profile</div>
      <div>Settings</div> */}
      <div className={style.accountButton}>
        <Link to="/history">History</Link>
      </div>

      <div className={style.accountButton} onClick={handleLogout}>
        Logout
      </div>
    </div>
  );

  const renderUserFriends = () => (
    <div className={`${style.userFriends} ${isOpen ? style.open : ""}`}>
      <form className={style.friendsForm} onSubmit={handleAddFriend}>
        <input
          type="text"
          placeholder="Enter friend's username"
          value={friendUsername}
          onChange={(e) => setFriendUsername(e.target.value)}
        />
        <button className={style.friendButton} type="submit">
          Add Friend
        </button>
      </form>
      <div className={style.friendsTitle}>Friends</div>
      {friends.map((friend) => (
        <div className={style.friends} key={friend._id}>
          - {friend.username}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {props.menuType === "accountOptions" ? (
        <>
          <div className={style.userProfilePicture}>
            <AccountCircle
              className={style.toggleButton}
              onClick={toggleSideMenu}
            />
          </div>

          {renderUserAccountOptions()}
        </>
      ) : (
        <>
          <div className={style.userProfilePicture}>
            <People className={style.toggleButton} onClick={toggleSideMenu} />
          </div>
          {renderUserFriends()}
        </>
      )}
    </div>
  );
};

export default SideMenu;
