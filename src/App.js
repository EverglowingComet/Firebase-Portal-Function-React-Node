import { Home } from "pages/Home";
import { Login } from "pages/auth/Login";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
]);

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;
