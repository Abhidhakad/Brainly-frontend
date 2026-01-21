import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Error from "./pages/Error"
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export const router = createBrowserRouter([
  {
    path:"/",
    element:<PrivateRoute />,
    children:[
      {
        index:true,
        element:<Dashboard />,
      }
    ]
  },
  {
    path:"/login",
    element:<Login />
  },
  {
    path:"/signup",
    element:<Signup />
  },
  {
    path:"*",
    element:<Error />
  }
 
]) 