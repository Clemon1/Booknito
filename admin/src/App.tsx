import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Reservation from "./pages/reservation";
import Bookings from "./pages/bookings/bookings";
import Staffs from "./pages/staff/staffs";
import Login from "./pages/auth/login";
import Rooms from "./pages/rooms/rooms";
import Report from "./pages/analysis/report";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/reservations",
      element: <Reservation />,
    },
    {
      path: "/bookings",
      element: <Bookings />,
    },
    {
      path: "/rooms",
      element: <Rooms />,
    },
    {
      path: "/staffs",
      element: <Staffs />,
    },
    {
      path: "/reports",
      element: <Report />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
