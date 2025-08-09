// Import des modules Firebase nécessaires
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBUpr_46vZPxcv1xN73ITOf70cs41lnixM",
  authDomain: "topronto-9ae6f.firebaseapp.com",
  projectId: "topronto-9ae6f",
  storageBucket: "topronto-9ae6f.appspot.com", // J'ai corrigé le storageBucket
  messagingSenderId: "182475170035",
  appId: "1:182475170035:web:4f54a90026d85d24635786",
  measurementId: "G-S2X8M8MFPL"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };
