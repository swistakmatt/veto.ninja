import { Link } from "react-router-dom";
import style from "./NavBar.module.scss";
import logo from "../../assets/logo.svg";
import SideMenu from "../SideMenu/SideMenu";

const NavBar = () => {
  // Replace this with a state or context value that represents the user's login status
  const isLoggedIn = true;

  const userNickname = "swstk";

  return (
    <div className={style.navBar}>
      <img src={logo} className={style.logo} alt="logo" />
      <Link to="/gamesetup" className={style.gamesButton}>
        Games
      </Link>
      <Link to="/history" className={style.historyButton}>
        History
      </Link>
      {isLoggedIn ? (
        <div className={style.userSection}>
          <SideMenu menuType="userFriends" />
          <span className={style.nickname}>{userNickname}</span>
          <SideMenu menuType="accountOptions" />
        </div>
      ) : (
        <div className={style.newUser}>
          <Link to="/login" className={style.loginButton}>
            Login
          </Link>
          <Link to="/register" className={style.registerButton}>
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
