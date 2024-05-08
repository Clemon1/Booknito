import { configureStore } from "@reduxjs/toolkit";
import authenticateSliceReducer from "./authRedux/appSLice";
import { authApi } from "./RTK_Query/authSlice";
import { bookingApi } from "./RTK_Query/bookingSlice";
import { useDispatch, useSelector } from "react-redux";
import { roomApi } from "./RTK_Query/roomSlice";
import { reportApi } from "./RTK_Query/reportSlice";

export const store = configureStore({
  reducer: {
    auth: authenticateSliceReducer,
    [authApi.reducerPath]: authApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      roomApi.middleware,
      bookingApi.middleware,
      reportApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector = useSelector.withTypes<RootState>();
