import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice.js";
import authSlice from "./features/api/auth/authSlice.js";
import { setupListeners } from "@reduxjs/toolkit/query/react";
// import 

// const rootReducer=combineReducers({
//   [apiSlice.reducerPath]: apiSlice.reducer,
//     auth: authSlice,
// })


 const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,

  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});


console.log("storeeee", store.getState());


const initializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initializeApp();
// setupListeners(store.dispatch);
export default store;