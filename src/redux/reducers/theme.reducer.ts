import { createSlice } from "@reduxjs/toolkit";

const ls = typeof window !== "undefined" ? window.localStorage : null;
export interface IMode {
  mode: boolean;
}

const init: IMode = {
  mode: ls?.getItem("darkMode") ? JSON.parse(ls?.getItem("darkMode")!) : false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: init,
  reducers: {
    toggle: (state) => {
      state.mode = !state.mode;

      ls?.setItem("darkMode", JSON.stringify(state.mode));
    },
  },
});

export default themeSlice.reducer;

export const { toggle } = themeSlice.actions;
