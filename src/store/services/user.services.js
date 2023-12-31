import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { get, getDatabase, ref } from "firebase/database";
import { getReadDb, readDb, writeDb } from "utils/API";

export const userServices = {
    checkAuth,
    register,
    login,
    logout,
    loginWithGoogle,
    sendResetEmail,
}

function checkAuth(uid) {
    let isAdmin = false;
    
    return get(ref(getDatabase(), `/adminUids/${uid}`))
    .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
            isAdmin = true;
        }

        return getReadDb(`/user/${uid}`);
    })
    .then((snapshot) => {
        const data = snapshot.val();

        if (data) {
            data.isAdmin = isAdmin;
            return Promise.resolve(data);
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

function loginWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
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
