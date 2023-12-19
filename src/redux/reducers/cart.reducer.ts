import { createReducer } from "@reduxjs/toolkit";

const initalState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") as any)
    : [],
};

export const createReduce = createReducer(initalState, {
  // addToCart: (state, action) => {
  //   const item = action.payload;
  //   const isItemExist = state.cart.find((i: any) => i._id === item._id);

  //   return {
  //     ...state,
  //     cart: [...state.cart, item],
  //   };
  // },

  removeFromCart: (state, action) => {
    return {
      ...state,
      cart: state.cart.filter((i: any) => i.id !== action.payload),
    };
  },

  addToCart: (state, action) => {
    const item = action.payload;
    const isItemExist = state.cart.find((i: any) => i.id === item.id);
    if (isItemExist) {
      console.log("is existssssssssssss");
      return {
        ...state,
        cart: state.cart.map((i: any) =>
          i._id === isItemExist._id ? item : i
        ),
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, item],
      };
    }
  },
});
