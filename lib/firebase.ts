import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBjK9J9EJqQfv4hPkWXsU1mcCD7Kmb2xyo",
  authDomain: "visuabuilder.firebaseapp.com",
  projectId: "visuabuilder",
  storageBucket: "visuabuilder.firebasestorage.app",
  messagingSenderId: "986615631790",
  appId: "1:986615631790:web:b6ffd90d4ea022f3c0c23f",
  measurementId: "G-R9V0PRB76G",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)

export default app
