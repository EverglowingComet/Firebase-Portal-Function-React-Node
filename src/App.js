import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { checkAuth } from "store/user";
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

function App() {
    checkAuth();

    return (
        <RouterProvider router={router} />
    );
}

export default App;
