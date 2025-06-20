// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBPeQC-as_6t7TPRegwiebQXF0zO5XOIy8",
    authDomain: "react-cursos-fd169.firebaseapp.com",
    projectId: "react-cursos-fd169",
    storageBucket: "react-cursos-fd169.firebasestorage.app",
    messagingSenderId: "462553052589",
    appId: "1:462553052589:web:24168d013e784f67f49d24",
    measurementId: "G-VPQ8QVVFSF"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
export const FirebaseAnalytics = getAnalytics(FirebaseApp);