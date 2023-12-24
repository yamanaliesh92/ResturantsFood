import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IResponseOrder } from "../api/order.api";

interface ICart {
  cartItem: IResponseOrder[];
}

const cartFromLocalStorage: IResponseOrder[] = window.localStorage.getItem(
  "cartItems"
)
  ? JSON.parse(window.localStorage.getItem("cartItems")!)
  : [];

const init: ICart = {
  cartItem: cartFromLocalStorage,
};

const cartReduce = createSlice({
  name: "cart",
  initialState: init,
  reducers: {
    addToCart: (state, action: PayloadAction<IResponseOrder>) => {
      const newItem = action.payload;
      const existItem = state.cartItem.find((item) => item.id === newItem.id);

      if (existItem) {
        alert("already is exist");
      } else {
        state.cartItem.push(newItem);
      }

      window.localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const id = action.payload.id;
      const updateState = state.cartItem.filter((item) => item.id !== id);
      state.cartItem.splice(0, state.cartItem.length, ...updateState);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },
  },
});
export default cartReduce.reducer;

export const { addToCart, removeFromCart } = cartReduce.actions;
