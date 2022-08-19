
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8CBzNp2bSCO4E1BGkBBTiITgf9OUTtb8",
  authDomain: "profilepicture-ff4a5.firebaseapp.com",
  projectId: "profilepicture-ff4a5",
  storageBucket: "profilepicture-ff4a5.appspot.com",
  messagingSenderId: "1064328282450",
  appId: "1:1064328282450:web:21262c2b60494bc0443a8b",
  measurementId: "G-ZHZ5TXD5E6"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage= getStorage(app)