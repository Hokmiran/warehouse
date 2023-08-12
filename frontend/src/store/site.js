import { createSlice } from "@reduxjs/toolkit";

export const site = createSlice({
  name: "site",
  initialState: {
    toggle: true,
  },
  reducers: {
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
  },
});

export const { setToggle } = site.actions;

export default site.reducer;
