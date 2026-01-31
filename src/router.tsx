import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ContentDetail from "./components/ContentDetail";

export const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    errorElement: <Error />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "content/:id", element: <ContentDetail /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
