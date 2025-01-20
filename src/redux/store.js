import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { profileReducer } from "./reducers/profileReducer";

const store = configureStore({
  reducer: { authReducer, profileReducer },
});

export default store;
