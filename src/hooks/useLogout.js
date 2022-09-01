import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../firebase/firebase";
import useAuthContext from "./useAuthContext";

const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setPending(true);
    setError(null);

    try {
      await signOut(firebaseAuth);
      dispatch({ type: "LOGOUT" });
      if (!isCancelled) {
        setPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setPending(false);
      }
    }
  };

  // Cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { pending, error, logout };
};
export default useLogout;
