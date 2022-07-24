import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type ServerListState = {
  servers: { name: string; distance: number }[];
};

const initialState: ServerListState = {
  servers: [],
};

export const serverListSlice = createSlice({
  name: "serverList",
  initialState,
  reducers: {
    setServerList: (
      state,
      action: PayloadAction<Array<{ name: string; distance: number }>>
    ) => {
      state.servers = action.payload;
    },
  },
});

export const { setServerList } = serverListSlice.actions;

export const selectServerList = (state: RootState) => state.serverList.servers;

export default serverListSlice.reducer;
