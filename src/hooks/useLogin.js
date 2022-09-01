import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { firebaseAuth } from "../firebase/firebase";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setPending(true);
    setError(null);
    try {
      const data = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      dispatch({ type: "LOGIN", payload: data });
      setUser(data);
      setPending(false);
    } catch (error) {
      setError(error.message);
      setPending(false);
    }
  };

  return { pending, error, user, login };
};
export default useLogin;
