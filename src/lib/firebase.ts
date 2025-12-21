// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Optional: Analytics (lazy-loaded for better performance)
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      import("firebase/analytics").then(({ getAnalytics }) => {
        analytics = getAnalytics(app);
      });
    }
  });
}

// Development emulators (optional - only if you're using them)
if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  // Uncomment these if you want to use Firebase emulators in development
  // if (!auth._delegate._config.emulator) {
  //   connectAuthEmulator(auth, "http://localhost:9099");
  // }
  // if (!db._delegate._databaseId.projectId.includes("demo-")) {
  //   connectFirestoreEmulator(db, "localhost", 8080);
  // }
}

export { app, analytics };