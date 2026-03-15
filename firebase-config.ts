import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA5whf3LBXM--Ma4zARDbdKYXx7LvEkyfc",
  authDomain: "viral-saver-fd922.firebaseapp.com",
  projectId: "viral-saver-fd922",
  databaseURL: "https://viral-saver-fd922-default-rtdb.firebaseio.com",
  storageBucket: "viral-saver-fd922.firebasestorage.app",
  messagingSenderId: "755065276076",
  appId: "1:755065276076:web:221b63fa8a0fc475c98109",
  measurementId: "G-C55BYNTYT6"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
