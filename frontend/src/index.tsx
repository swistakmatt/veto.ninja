import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

import "./index.scss";
import { SessionProvider } from "./providers/SessionProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SessionProvider>
    <RouterProvider router={router} />
  </SessionProvider>
);

const updateAppHeight = () => {
  document.documentElement.style.setProperty(
    "--app-height",
    `${window.innerHeight}px`
  );
};

window.addEventListener("resize", updateAppHeight);
updateAppHeight();
