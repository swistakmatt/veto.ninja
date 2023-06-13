import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { FrontendUser } from "../types/auth";
import { Show } from "../components/Show";

import style from "./SessionProvider.module.scss";

export type SessionContextState = {
  loggedIn: boolean;
  user?: FrontendUser;
};

export type SessionContextValue = [
  state: SessionContextState,
  actions: {
    fetchUser: () => Promise<FrontendUser | null>;
    invalidate: () => void;
    logout: () => void;
  }
];

const defaultState: SessionContextState = {
  loggedIn: false,
};

export const SessionContext = createContext<SessionContextValue>([
  defaultState,
  {
    fetchUser: async () => null,
    invalidate: () => {},
    logout: () => {},
  },
]);

const sessionReducer = (
  oldState: SessionContextState,
  newState: Partial<SessionContextState>
) => ({
  ...oldState,
  ...newState,
});

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useReducer(sessionReducer, defaultState);
  const [loaded, setLoaded] = useState(false);

  const fetchUser = async (): Promise<FrontendUser | null> => {
    const response = await fetch("http://localhost:3000/users/me", {
      credentials: "include",
      cache: "no-store",
    });

    if (response.ok) {
      const data = (await response.json()) as FrontendUser;
      setState({ loggedIn: true, user: data });

      return data;
    }

    setState({ loggedIn: false, user: undefined });
    return null;
  };

  const invalidate = () => {
    setState({ loggedIn: false, user: undefined });

    location.pathname = "/";
  };

  const logout = async () => {
    const response = await fetch("http://localhost:3000/users/logout", {
      credentials: "include",
      method: "POST",
    });

    if (response.ok) {
      invalidate();
    }
  };

  useEffect(() => {
    fetchUser().then((result) => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    console.log("User logged in:", state.loggedIn);
  }, [state.loggedIn]);

  return (
    <SessionContext.Provider
      value={[
        state,
        {
          fetchUser,
          invalidate,
          logout,
        },
      ]}
    >
      <Show when={loaded}>{children}</Show>
    </SessionContext.Provider>
  );
}

export const useSession = (): SessionContextValue => useContext(SessionContext);
