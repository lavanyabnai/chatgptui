import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../chatgpt/Dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});
