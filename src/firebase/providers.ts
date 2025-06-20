import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        /* const credentials = GoogleAuthProvider.credentialFromResult(result); */
        const user = result.user;
        console.log("User signed in with Google: ", user);
        const { displayName, email, photoURL, uid } = user;
        const userData = {
            displayName,
            email,
            photoURL,
            uid,
        }
        return { ok: true, user: userData };
    } catch (error) {
        console.error("Error signing in with Google: ", error);
        return { ok: false, errorMessage: "Error signing in with Google" };
    }
}
