import { configureStore } from "@reduxjs/toolkit";
import svReducer from "./reducer/svReducer";

export const store = configureStore({
  reducer: {
    svReducer: svReducer,
  },
});
