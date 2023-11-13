import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { connect } from "react-redux";
import { userActions } from "store/actions";
import HomePage from "pages/HomePage";
import InvitePage from "pages/InvitePage";
import DashboardPage from "pages/dashboard/DashboardPage";
import ReportPage from "pages/dashboard/ReportPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import 'style/side-menu.css';
import 'style/dashboard.css';
import 'style/report.css';
import 'style/admin.css';
import 'style/auth.css';
import 'style/book.css';
import 'style/general.css';
import 'style/main-landing.css';

const router = createBrowserRouter([
    {
        path: "/invite/:email",
        element: <InvitePage />
    },
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "dashboard",
        element: <DashboardPage />,
        children: [
            {
                path: "gallery",
                element: <ReportPage />
            },
        ]
    },
])

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
