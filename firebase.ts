import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9kgGhLl8eWkNnMVTyqbtvJxmAKOk24EQ",
  authDomain: "dropbox-clone-xafor.firebaseapp.com",
  projectId: "dropbox-clone-xafor",
  storageBucket: "dropbox-clone-xafor.appspot.com",
  messagingSenderId: "788619202360",
  appId: "1:788619202360:web:666778ce0632ff969c7bcd",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
