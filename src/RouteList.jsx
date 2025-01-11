import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./Components/Dashboard";

import CreateLaporanBencana from "./Components/CreateLaporanBencana";

const RouteList = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/create'  ,
        element: <CreateLaporanBencana/>
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
        ]
    }
]);

export default RouteList;