import { signInWithGoogle } from '../../firebase/providers';
import type { AppDispatch } from '../store';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        console.log('Checking authentication for:', email);
        console.log('Checking authentication for:', password);
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();

        if (!result.ok) {
            return dispatch(logout(result));
        }
        if (!result.user || !result.user.uid || !result.user.email || !result.user.displayName || !result.user.photoURL) {
            return dispatch(logout({ errorMessage: 'Incomplete user data from Google Sign-In' }));
        }
        return dispatch(login({
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL
        }));
    }
}