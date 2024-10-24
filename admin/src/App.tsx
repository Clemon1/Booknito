import "./App.css";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useAppSelector } from "./redux/store";
import { currentUser } from "./redux/authRedux/appSLice";

// lazy loading routes
const Loading = lazy(() => import("./components/loader"));
const Dashboard = lazy(() => import("./pages/dashboard/dashboard"));
const Expenses = lazy(() => import("./pages/expenses/expenses"));
const Bookings = lazy(() => import("./pages/bookings/bookings"));
const BookingDetails = lazy(() => import("./pages/bookings/bookingDetails"));
const CreateBooking = lazy(() => import("./pages/bookings/createBooking"));
const Staffs = lazy(() => import("./pages/staff/staffs"));
const Login = lazy(() => import("./pages/auth/login"));
const Rooms = lazy(() => import("./pages/rooms/rooms"));
const RoomDetails = lazy(() => import("./pages/rooms/roomDetails"));
const CreateRoom = lazy(() => import("./pages/rooms/createRoom"));
const Report = lazy(() => import("./pages/analysis/report"));
const ReportRevenue = lazy(() => import("./pages/analysis/reportRevenue"));
const ReportBooking = lazy(() => import("./pages/analysis/reportBookings"));
const ReportUsers = lazy(() => import("./pages/analysis/reportUsers"));

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
      path: "/expenses",
      element: !user ? <Navigate to={"/"} /> : <Expenses />,
    },
    {
      path: "/bookings",
      element: !user ? <Navigate to={"/"} /> : <Bookings />,
    },
    {
      path: "/bookings/:id",
      element: !user ? <Navigate to={"/"} /> : <BookingDetails />,
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
      path: "/rooms/:id",
      element: !user ? <Navigate to={"/"} /> : <RoomDetails />,
    },
    {
      path: "/newroom",
      element: !user ? <Navigate to={"/"} /> : <CreateRoom />,
    },
    {
      path: "/staffs",
      element: !user ? <Navigate to={"/"} /> : <Staffs />,
    },
    {
      path: "/reports",
      element: !user ? <Navigate to={"/"} /> : <Report />,
      children: [
        {
          path: "revenue",
          element: !user ? <Navigate to={"/"} /> : <ReportRevenue />,
        },
        {
          path: "bookings",
          element: !user ? <Navigate to={"/"} /> : <ReportBooking />,
        },
        {
          path: "users",
          element: !user ? <Navigate to={"/"} /> : <ReportUsers />,
        },
      ],
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
