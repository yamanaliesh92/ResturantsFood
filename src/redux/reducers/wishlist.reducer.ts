import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IResponseOrder } from "../api/order.api";

export interface IWishList {
  whishItem: IResponseOrder[];
}

const wishFromLocalStorage: IResponseOrder[] = window.localStorage.getItem(
  "wishlistItems"
)
  ? JSON.parse(window.localStorage.getItem("wishlistItems")!)
  : [];

const init: IWishList = {
  whishItem: wishFromLocalStorage,
};

const whishListReduce = createSlice({
  name: "whishList",
  initialState: init,
  reducers: {
    addToWishlist: (state, action: PayloadAction<IResponseOrder>) => {
      const newItem = action.payload;
      const existItem = state.whishItem.find((item) => item.id === newItem.id);

      if (existItem) {
        alert("already is exist");
      } else {
        state.whishItem.push(newItem);
      }

      window.localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.whishItem)
      );
    },
    removeFromWishlist: (state, action: PayloadAction<{ id: number }>) => {
      const id = action.payload.id;
      const updateState = state.whishItem.filter((item) => item.id !== id);
      state.whishItem.splice(0, state.whishItem.length, ...updateState);

      localStorage.setItem("wishlistItems", JSON.stringify(state.whishItem));
    },
  },
});
export default whishListReduce.reducer;

export const { addToWishlist, removeFromWishlist } = whishListReduce.actions;
