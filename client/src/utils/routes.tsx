import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Chat from "../pages/Chat";
import Register from "../pages/Register";
import SetAvatar from "../components/SetAvatar";
import PasswordsList from "../pages/Passwords";
import AddPassword from "../components/AddPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Chat />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/setAvatar",
        element: <SetAvatar />,
      }
      , {
        path: "passwords",
        element: <PasswordsList />
      }
      , {
        path: "passwords/add",
        element: <AddPassword />
      }
    ]
  }
]);

export default router;