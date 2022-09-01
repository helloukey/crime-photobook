import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlsailMrzYcS04SilFBW5qhUvxEqR4P_E",
  authDomain: "photo-library-e287d.firebaseapp.com",
  projectId: "photo-library-e287d",
  storageBucket: "photo-library-e287d.appspot.com",
  messagingSenderId: "172309127645",
  appId: "1:172309127645:web:948abb5fbcf903791b9634"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { firebaseAuth, db, storage }