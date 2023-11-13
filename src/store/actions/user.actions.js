import { userServices } from "store/services";
const { setUser, setLogginIn } = require("store/user");

export const userActions = {
    checkAuth,
    register,
    login,
    loginWithGoogle,
    logout,
    sendResetEmail,
}

function checkAuth(userId) {
    return dispatch => {
        userServices.checkAuth(userId)
        .then((user) => {
            dispatch(setUser(user));
        }, (error) => {
            dispatch(setUser(null))
        })
    }
}

function register(data) {
    return dispatch => {
        dispatch(setLogginIn(true))
        userServices.register(data)
        .then((user) => {
            dispatch(setUser(user))
            dispatch(setLogginIn(false))
            window.location = data.redirect ? data.redirect : "/";
        }, (error) => {
            dispatch(setLogginIn(false))
        })
    }
}

function login(data) {
    return dispatch => {
        dispatch(setLogginIn(true))
        userServices.login(data)
        .then((user) => {
            dispatch(setUser(user))
            dispatch(setLogginIn(false))
            window.location = data.redirect ? data.redirect : "/";
        }, (error) => {
            dispatch(setLogginIn(false))
        })
    }
}

function loginWithGoogle(data) {
    return dispatch => {
        dispatch(setLogginIn(true))
        userServices.loginWithGoogle()
        .then((user) => {
            dispatch(setUser(user))
            dispatch(setLogginIn(false))
            window.location = data.redirect ? data.redirect : "/";
        }, (error) => {
            dispatch(setLogginIn(false))
        })
    }
}

function sendResetEmail(data) {
    return dispatch => {
        dispatch(setLogginIn(true))
        userServices.sendResetEmail(data)
        .then(() => {
            dispatch(setLogginIn(false))
            window.location = data.redirect ? data.redirect : "/";
        }, (error) => {
            dispatch(setLogginIn(false))
        })
    }
}

function logout() {
    return dispatch => {
        userServices.logout();
        dispatch(setUser(null));
    }
}
