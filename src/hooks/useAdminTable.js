import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";

const useAdminTable = (documents) => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);

    let ref = collection(db, documents);
    const unsub = onSnapshot(ref, (snapshot) => {
        let results = []
        snapshot.docs.forEach(doc => {
            results.push({id: doc.id, ...doc.data()})
        })
        setData(results);
    })

    setPending(false);

    return () => unsub();
  }, [documents])

  return { data }
};
export default useAdminTable;
