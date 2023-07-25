import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  inProcess: false,
  isLoggedIn: false,
  username: "",
  email: "",
  error: "",
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.inProcess = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setIsLoading, setError } = auth.actions;
export default auth.reducer;
