import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.scss";
import logo from "../../assets/logo.svg";
import SideMenu from "../SideMenu/SideMenu";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNickname, setUserNickname] = useState("");

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/me", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Server responded with an error");
        }

        const data = await response.json();
        if (data.nickname !== null) {
          setUserNickname(data.nickname);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error occurred while checking if logged in: ", error);
        setIsLoggedIn(false);
      }
    };

    checkIfLoggedIn();
  }, []);

  return (
    <div className={style.navBar}>
      <img src={logo} className={style.logo} alt="logo" />
      <Link to="/game-setup" className={style.gamesButton}>
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
