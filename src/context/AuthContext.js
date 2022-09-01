import { useEffect } from "react";
import { useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase/firebase";

const { createContext } = require("react");

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { authIsReady: true, user: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
    });
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
