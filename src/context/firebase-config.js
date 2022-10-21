import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// import { getPerformance } from "firebase/performance";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSdGJ5wXZOA6eZGxaLOxBVcXnF15simAU",
  authDomain: "saude-vapor-1-0.firebaseapp.com",
  projectId: "saude-vapor-1-0",
  storageBucket: "saude-vapor-1-0.appspot.com",
  messagingSenderId: "244485256876",
  appId: "1:244485256876:web:ac21bb520d642e1cb39109",
  measurementId: "G-V5S45DP86V",
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const providerGoogle = new GoogleAuthProvider();
export const providerFacebook = new FacebookAuthProvider();
export const storage = getStorage(app);
