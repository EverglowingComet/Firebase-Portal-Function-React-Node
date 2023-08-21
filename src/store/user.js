import { createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { listenDb, writeDb } from "utils/API";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: null,
        ref: null,
        loggingIn: false,
    },
    reducers: {
        checkAuth: (state) => {
            const auth = getAuth();
            
            onAuthStateChanged(auth, (user) => {
                if (state.ref) {
                    state.unsubscribe();
                }
                const uid = user.uid;
                state.ref = listenDb("/user/" + uid, (data) => {
                    state.value = data;
                    state.loggingIn = false;
                })
            })
        },
        register: (state, action) => {
            const data = action.payload;
            const auth = getAuth();
            state.loggingIn = true;

            createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((credential) => {
                if (credential && credential.user) {
                    console.log("Login Successful: ", credential.user);

                    const user = {
                        uid: credential.user.uid,
                        email: data.email,
                        username: data.username,
                    }

                    writeDb("/user/" + user.uid, user);
                    window.location = data.redirect ? data.redirect : "/";
                } else {
                    state.loggingIn = false;
                }
            })
            .catch((error) => {
                console.log("Authentication Error: ", error);
                state.loggingIn = false;
            })
        },
        login: (state, action) => {
            state.loggingIn = true;
            const data = action.payload;
            const auth = getAuth();

            signInWithEmailAndPassword(auth, data.email, data.password)
            .then((credential) => {
                if (credential && credential.user) {
                    console.log("Login Successful: ", credential.user);
                    window.location = data.redirect ? data.redirect : "/";
                } else {
                    state.loggingIn = false;
                }
            })
            .catch((error) => {
                console.log("Authentication Error: ", error);
                state.loggingIn = false;
            })
        },
        logout: (state) => {
            state.value = null;
            signOut();
        },
        sendResetEmail: (state, action) => {
            sendPasswordResetEmail(getAuth(), action.payload);
        },
    },
});

export const { checkAuth, register, login, logout, sendResetEmail } = userSlice.actions;
export default userSlice.reducer;