// Import des modules Firebase nécessaires
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDzjcboW8jzXXfQIKSJYumGCoPn_GGc8o4",
  authDomain: "topronto-dc780.firebaseapp.com",
  projectId: "topronto-dc780",
  storageBucket: "topronto-dc780.firebasestorage.app",
  messagingSenderId: "651238498180",
  appId: "1:651238498180:web:8ab2b149806577fb0c07d1",
  measurementId: "G-FJJVJHPMRW"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation des services
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, db, auth, storage };
