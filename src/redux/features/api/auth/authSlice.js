import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken:'',
  user:  localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      const { user = {}, accessToken = "" } = action.payload || {};
      if (accessToken) {
        state.accessToken = accessToken;
        state.user = user;
    
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);
    
        const expirationTime = new Date().getTime() + 5 * 60 * 1000; // 1 day
        localStorage.setItem("expirationTime", expirationTime);
      } else {
        console.error("Invalid payload received in userLoggedIn");
      }
    },
    
    
    userLoggedOut: (state) => {
      state.accessToken = "";
      state.user = {};
      localStorage.clear();
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
