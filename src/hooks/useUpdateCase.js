import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useUpdateCase = () => {
  const [actionPending, setActionPending] = useState(false);
  const [actionError, setActionError] = useState(null);

  const updateDocument = async (id, option) => {
    setActionPending(true);
    setActionError(null);

    try {
      const singleDoc = doc(db, "cases", id);
      await updateDoc(singleDoc, {
        approved: option,
      });
    } catch (error) {
        setActionError(error.message);
        setActionPending(false);
    }
  };

  return { actionError, actionPending, updateDocument }
};
export default useUpdateCase;
