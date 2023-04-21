import { useState, useEffect } from "react";
import PeopleIcon from "@mui/icons-material/People";

import style from "./SideMenu.module.scss";

interface SideMenuProps {
  menuType: "accountOptions" | "userFriends";
}

interface Friend {
  id: number;
  name: string;
}

const SideMenu = (props: SideMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      if (props.menuType === "userFriends") {
        try {
          const response = await fetch("friends.json");
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
      <div>Profile</div>
      <div>Settings</div>
      <div>History</div>
      <div>Logout</div>
    </div>
  );

  const renderUserFriends = () => (
    <div className={`${style.userFriends} ${isOpen ? style.open : ""}`}>
      {friends.map((friend) => (
        <div key={friend.id}>{friend.name}</div>
      ))}
    </div>
  );

  const userProfilePicture = "/img/profilepic.jpg";

  return (
    <div>
      {props.menuType === "accountOptions" ? (
        <>
          <img
            src={userProfilePicture}
            alt="Profile"
            className={(style.toggleButton, style.profilePicture)}
            onClick={toggleSideMenu}
          />
          {renderUserAccountOptions()}
        </>
      ) : (
        <>
          <PeopleIcon className={style.toggleButton} onClick={toggleSideMenu} />
          {renderUserFriends()}
        </>
      )}
    </div>
  );
};

export default SideMenu;
