import Page from "../../components/Page/Page";
import style from "./Home.module.scss";
import { useSession } from "../../providers/SessionProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const [session] = useSession();

  console.log(session);

  return (
    <Page>
      <div className={style.container}>
        <div className={style.title}>Get started!</div>
        <div className={style.button}>
          <Link to="/login">Login</Link>
        </div>
        <div className={style.button}>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </Page>
  );
};

export default Home;
