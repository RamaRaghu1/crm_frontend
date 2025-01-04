import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  user: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    userLoggedIn: (state, action) => {
      console.log(`action ${JSON.stringify(action)}`);
      console.log(`token ${JSON.stringify(action.payload.accessToken)}`);

      state.accessToken = action.payload.accessToken;
      state.user = action.payload.data.data.user;
      console.log("userrrr", action.payload.accessToken);
      // console.log("userrrr", action.payload.data.data.user);
      localStorage.setItem("accessToken", state.accessToken);
    },
    userLoggedOut: (state) => {
      state.accessToken = "";
      state.user = "";
      localStorage.clear();
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } =
  authSlice.actions;
export default authSlice.reducer;
