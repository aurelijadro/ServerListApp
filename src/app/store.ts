import { configureStore } from "@reduxjs/toolkit";
import authorizationReducer from "./authorizationSlice";
import serverListReducer from "./serverListSlice";

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    serverList: serverListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
