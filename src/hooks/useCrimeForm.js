import { useEffect, useId, useState } from "react";
import { storage, db } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import useAuthContext from "./useAuthContext";

const useCrimeForm = () => {
  // const [isCancelled, setIsCancelled] = useState(false);
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

  const crimeFormFirebase = async (
    name,
    address,
    height,
    weight,
    cprNumber,
    frontFace,
    leftFace,
    rightFace
  ) => {
    // Updating state
    setPending(true);
    setError(null);
    try {
      // Files references
      const frontFaceRef = ref(
        storage,
        `crime/${user.uid}/${cprNumber}/${frontFace.name}`
      );
      const leftFaceRef = ref(
        storage,
        `crime/${user.uid}/${cprNumber}/${leftFace.name}`
      );
      const rightFaceRef = ref(
        storage,
        `crime/${user.uid}/${cprNumber}/${rightFace.name}`
      );

      // Upload to firebase storage
      await uploadBytes(frontFaceRef, frontFace);
      await uploadBytes(leftFaceRef, leftFace);
      await uploadBytes(rightFaceRef, rightFace);

      // Get download url
      const data1 = await getDownloadURL(ref(storage, frontFaceRef));
      const data2 = await getDownloadURL(ref(storage, leftFaceRef));
      const data3 = await getDownloadURL(ref(storage, rightFaceRef));

      // Add to collection
      const docRef = await addDoc(collection(db, "cases"), {
        name: name,
        address: address,
        height: height,
        weight: weight,
        cprNumber: cprNumber,
        frontFace: data1,
        leftFace: data2,
        rightFace: data3,
        caseType: "crime",
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

  // Cleanup function
  // useEffect(() => {
  //   return () => setIsCancelled(true);
  // });

  return { pending, error, response, crimeFormFirebase };
};
export default useCrimeForm;
