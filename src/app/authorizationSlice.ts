import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface AuthorizationState {
  token: null | string;
}

const initialState: AuthorizationState = {
  token: null,
};

export const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    assignToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    resetToken: (state) => {
      state.token = null;
    },
  },
});

export const { assignToken, resetToken } = authorizationSlice.actions;

export const selectToken = (state: RootState) => state.authorization.token;

export default authorizationSlice.reducer;
