import style from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={style.container}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
