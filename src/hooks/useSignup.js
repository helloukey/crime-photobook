import { useState } from "react";
import { firebaseAuth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const { dispatch } = useAuthContext();

  const firebaseSignup = async (email, password, accountType) => {
    setPending(true);
    setError(null);
    try {
      const authUser = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      await updateProfile(firebaseAuth.currentUser, {
        displayName: accountType,
      });
      dispatch({ type: "LOGIN", payload: authUser });
      setUser(authUser);
      setPending(false);
    } catch (error) {
      setError(error.message);
      setPending(false);
    }
  };

  return { pending, error, firebaseSignup, user };
};
export default useSignup;
