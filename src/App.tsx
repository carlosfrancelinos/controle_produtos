import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Home from './pages/home';
import Details from "./pages/details";

export default function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/details/:id",
            element: <Details />,
        },
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}