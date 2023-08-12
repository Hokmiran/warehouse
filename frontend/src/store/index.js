import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import site from "./site";

export const store = configureStore({
  reducer: {
    auth,
    site,
  },
});
