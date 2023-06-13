import { createBrowserRouter } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import GameSetup from "./views/GameSetup/GameSetup";
import GameLobby from "./views/GameLobby/GameLobby";
import History from "./views/History/History";
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
    path: "/game-setup",
    element: <GameSetup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/game-lobby/:id",
    element: <GameLobby />,
  },
]);
