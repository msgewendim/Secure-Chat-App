import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Chat from "../pages/Chat";
import Register from "../pages/Register";
import SetAvatar from "../components/SetAvatar";

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

    ]
  }
]);

export default router;