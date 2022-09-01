import { useEffect, useState, useId } from "react";
import { storage, db } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import useAuthContext from "./useAuthContext";

const useAsylumForm = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [formId, setFormId] = useState(null);

  // current user
  const { user } = useAuthContext();
  const { id } = useId();

  useEffect(() => {
    if (user) {
      setFormId(user.uid);
    } else {
      setFormId(id);
    }
  }, [id, user]);

  const asylumFormFirebase = async (
    name,
    address,
    height,
    weight,
    frontFace
  ) => {
    // Updating state
    setPending(true);
    setError(null);
    try {
      // Files references
      const frontFaceRef = ref(storage, `asylum/${user.uid}/${frontFace.name}`);

      // Upload to firebase storage
      await uploadBytes(frontFaceRef, frontFace);

      // Get download url
      const data1 = await getDownloadURL(ref(storage, frontFaceRef));

      // Add to collection
      const docRef = await addDoc(collection(db, "cases"), {
        name: name,
        address: address,
        height: height,
        weight: weight,
        frontFace: data1,
        caseType: "asylum",
        submittedBy: formId,
        approved: false,
      });
      // Setting state
      setResponse(docRef);
      setPending(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setPending(false);
    }
  };

  return { pending, error, response, asylumFormFirebase };
};
export default useAsylumForm;
