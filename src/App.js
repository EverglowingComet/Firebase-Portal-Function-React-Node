import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { connect } from "react-redux";
import { userActions } from "store/actions";
import { Home } from "pages/Home";
import { AuthPage } from "pages/auth/AuthPage";

import 'style/auth.scss';
import 'style/general.scss';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/auth",
        element: <AuthPage />
    },
]);

function App(props) {
    useEffect(() => {
        onAuthStateChanged(getAuth(), (user) => {
            if (user && user.uid) {
                props.checkAuth(user.uid);
            }
        })
    })

    return (
        <RouterProvider router={router} />
    );
}

function mapState(state) {
    const { loggingIn } = state.auth;
    return { loggingIn }
}

const actionCreators = {
    checkAuth: userActions.checkAuth
};

export default connect(mapState, actionCreators)(App);
