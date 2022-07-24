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
  // The `reducers` field lets us define reducers and generate associated actions
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

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectToken = (state: RootState) => state.authorization.token;

export default authorizationSlice.reducer;
