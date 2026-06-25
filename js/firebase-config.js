import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZ56iI-eHs4kU1MGR9FtHEPtY7RMCeP1g",
  authDomain: "porha-hub.firebaseapp.com",
  projectId: "porha-hub",
  storageBucket: "porha-hub.firebasestorage.app",
  messagingSenderId: "1076784019480",
  appId: "1:1076784019480:web:1c820d3a6767f218bceb6d",
  measurementId: "G-41CYM9L4PE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
