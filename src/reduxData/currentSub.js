import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSub: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setCurrentSub(state, action) {
      state.currentSub = action.payload;
    },
  },
});

export const { setCurrentSub } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
