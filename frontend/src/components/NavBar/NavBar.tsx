import style from "./NavBar.module.scss";
import logo from "../../assets/logo_smaller.svg";
import cs from "../../assets/counter.svg";
import val from "../../assets/valorant.svg";
import league from "../../assets/league.svg";

const NavBar = () => {
  return (
    <div className={style.navBar}>
      <div className={style.logoContainer}>
        <img src={logo} className={style.logo} alt="logo" />
      </div>
    </div>
  );
};

export default NavBar;
