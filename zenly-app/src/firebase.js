import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAlPXuuV1rRC8GTERBqQE4rkQKVBPIWEE",
  authDomain: "zenly-map.firebaseapp.com",
  projectId: "zenly-map",
  storageBucket: "zenly-map.appspot.com",
  messagingSenderId: "485705506847",
  appId: "1:485705506847:web:559d4be0e597dcc832352a",
  measurementId: "G-T7GDWLSGF1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
