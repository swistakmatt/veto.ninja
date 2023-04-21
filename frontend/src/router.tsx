import { createBrowserRouter } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import GameSetup from "./views/GameSetup/GameSetup";
import NotFound from "./views/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/gamesetup",
    element: <GameSetup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
