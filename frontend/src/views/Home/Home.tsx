import DraftForm from "../../components/DraftForm/DraftForm";
import NavBar from "../../components/NavBar/NavBar";
import style from "./Home.module.scss";

const Home = () => {
  return (
    <div className={style.home}>
      <NavBar />
      <DraftForm />
    </div>
  );
};

export default Home;
