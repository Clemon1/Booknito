import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IloginDetails {
  userDetails: object | unknown;
}
const user = localStorage.getItem("userDetail");
const initialState: IloginDetails = {
  userDetails: user ? JSON.parse(user) : null,
};

export const authenticateSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<object>) => {
      state.userDetails = action.payload;
      localStorage.setItem("userDetail", JSON.stringify(state.userDetails));
    },
    logOut: (state) => {
      state.userDetails = null;
      localStorage.removeItem("userDetail");
    },
  },
});

export const { authenticate, logOut } = authenticateSlice.actions;
export const currentUser = (state: { auth: { userDetails: object } }) =>
  state.auth.userDetails;

export default authenticateSlice.reducer;
