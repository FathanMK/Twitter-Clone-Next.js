import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";

const persistedState =
  typeof window !== "undefined"
    ? localStorage.getItem("reduxState")
      ? JSON.parse(localStorage.getItem("reduxState")!)
      : {}
    : {};

const rootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
