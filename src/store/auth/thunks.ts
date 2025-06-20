import { signInWithGoogle } from '../../firebase/providers';
import type { AppDispatch } from '../store';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email: string, password: string) => {
    return async (dispatch: AppDispatch) => {
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
        console.log('Google Sign-In result:', result);
        return dispatch(login(result.user));
    }
}