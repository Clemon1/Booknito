import "./App.css";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useAppSelector } from "./redux/store";
import { currentUser } from "./redux/authRedux/appSLice";
const Dashboard = lazy(() => import("./pages/dashboard/dashboard"));
const Reservation = lazy(() => import("./pages/reservation"));
const Bookings = lazy(() => import("./pages/bookings/bookings"));
const CreateBooking = lazy(() => import("./pages/bookings/createBooking"));

const Staffs = lazy(() => import("./pages/staff/staffs"));
const Login = lazy(() => import("./pages/auth/login"));
const Rooms = lazy(() => import("./pages/rooms/rooms"));
const Report = lazy(() => import("./pages/analysis/report"));
const Loading = lazy(() => import("./components/loader"));

function App() {
  const user = useAppSelector(currentUser);
  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Navigate to={"/dashboard"} /> : <Login />,
    },
    {
      path: "/dashboard",
      element: !user ? <Navigate to={"/"} /> : <Dashboard />,
    },
    {
      path: "/reservations",
      element: !user ? <Navigate to={"/"} /> : <Reservation />,
    },
    {
      path: "/bookings",
      element: !user ? <Navigate to={"/"} /> : <Bookings />,
    },
    {
      path: "/newbooking",
      element: !user ? <Navigate to={"/"} /> : <CreateBooking />,
    },
    {
      path: "/rooms",
      element: !user ? <Navigate to={"/"} /> : <Rooms />,
    },
    {
      path: "/staffs",
      element: !user ? <Navigate to={"/"} /> : <Staffs />,
    },
    {
      path: "/reports",
      element: !user ? <Navigate to={"/"} /> : <Report />,
    },
  ]);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
