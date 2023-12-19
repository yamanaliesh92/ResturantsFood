import { createReducer } from "@reduxjs/toolkit";

const initalState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems") as any)
    : [],
};

export const WishlistReduce = createReducer(initalState, {
  removeFromWishlist: (state, action) => {
    return {
      ...state,
      wishlist: state.wishlist.filter((i: any) => i.id !== action.payload),
    };
  },

  addToWishlist: (state, action) => {
    const item = action.payload;
    const isItemExist = state.wishlist.find((i: any) => i.id === item.id);
    if (isItemExist) {
      console.log("is existssssssssssss");
      return {
        ...state,
        wishlist: state.wishlist.map((i: any) =>
          i._id === isItemExist._id ? item : i
        ),
      };
    } else {
      return {
        ...state,
        wishlist: [...state.wishlist, item],
      };
    }
  },
});
