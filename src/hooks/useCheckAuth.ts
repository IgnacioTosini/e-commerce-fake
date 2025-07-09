import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth/authSlice";
import { FirebaseAuth } from "../firebase/config";

export const useCheckAuth = () => {
    const { status } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, (user) => {
            if (user) {
                dispatch(login({ email: user.email || '', uid: user.uid || '', photoURL: user.photoURL || '', displayName: user.displayName || '' }));
            } else {
                dispatch(logout({ errorMessage: 'No user is logged in' }));
            }
        });
    }, []);

    return {
        status
    }
}
