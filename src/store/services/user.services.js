import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { get, getDatabase, ref } from "firebase/database";
import { readDb, writeDb } from "utils/API";

export const userServices = {
    checkAuth,
    register,
    login,
    logout,
    sendResetEmail,
}

function checkAuth(uid) {
    
    return get(ref(getDatabase(), `/user/${uid}`))
    .then((snapshot) => {
        const data = snapshot.val();

        if (data) {
            return Promise.resolve(data);
        } else {
            return Promise.error(null);
        }
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        alert(errorMessage);
        return Promise.error(error);
    });
}

function register(data) {
    const auth = getAuth();
    
    return createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((credential) => {
        if (credential && credential.user) {
            const user = {
                uid: credential.user.uid,
                email: data.email,
                username: data.username,
            }

            writeDb("/user/" + user.uid, user, (error) => {
                if (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
    
                    console.log(errorCode, errorMessage);
                    
                    signOut(auth);
                    return Promise.reject(error);
                } else {
                    return Promise.resolve(user);
                }
            })
        } else {
            return Promise.reject(null);
        }
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        alert(errorMessage);
        return Promise.reject(error);
    })
}

function login(data) {
    const auth = getAuth();
    
    return signInWithEmailAndPassword(auth, data.email, data.password)
    .then((credential) => {
        if (credential && credential.user) {
            const uid = credential.user.uid;
            if (uid) {
                readDb(`/user/${uid}`, (data) => {
                    if (data) {
                        return Promise.resolve(data);
                    } else {
                        return Promise.reject(null);
                    }
                })
            } else {
                return Promise.reject(null);
            }
        } else {
            return Promise.reject(null);
        }
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        alert(errorMessage);
        return Promise.reject(error);
    })
}

function sendResetEmail(data) {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, data.email).then(() => {
        return Promise.resolve();
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        alert(errorMessage);
        return Promise.reject(error);
    })
}

function logout() {
    signOut(getAuth());
}
