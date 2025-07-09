import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        const user = result.user;
        const createdAt = user.metadata.creationTime;
        const lastLoginAt = user.metadata.lastSignInTime;
        const { displayName, email, photoURL, uid, phoneNumber } = user;
        const userData = {
            displayName,
            email,
            photoURL,
            uid,
            phoneNumber,
            createdAt,
            lastLoginAt
        }
        return { ok: true, user: userData };
    } catch (error) {
        console.error("Error signing in with Google: ", error);
        return { ok: false, errorMessage: "Error signing in with Google" };
    }
}

export const registerWithEmailPassword = async (email: string, password: string, name: string) => {
    try {
        const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = response.user;
        await updateProfile(FirebaseAuth.currentUser!, {
            displayName: name
        });
        return { ok: true, uid, photoURL, email, displayName: name };
    } catch (error) {
        console.error("Error signing in with email and password: ", error);
        return { ok: false, errorMessage: "Email ya en uso" };
    }
}

export const loginWithEmailPassword = async (email: string, password: string) => {
    try {
        const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = response.user;
        return { ok: true, uid, photoURL, email, displayName };
    } catch (error) {
        console.error("Error logging in with email and password: ", error);
        return { ok: false, errorMessage: "Usuario o contraseña incorrectos" };
    }
}

export const signOut = async () => {
    try {
        await FirebaseAuth.signOut();
        console.log("User signed out successfully");
        return { ok: true };
    } catch (error) {
        console.error("Error signing out: ", error);
        return { ok: false, errorMessage: "Error signing out" };
    }
}