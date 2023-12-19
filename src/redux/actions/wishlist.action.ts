// add to cart

export const addToWishlist =
  (data: any) => async (dispatch: any, getState: any) => {
    dispatch({
      type: "addToWishlist",
      payload: data,
    });
    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(getState().wishlist.wishlist)
    );
    return data;
  };

export const removeFromWishlist =
  (data: any) => async (dispatch: any, getState: any) => {
    dispatch({
      type: "removeFromWishlist",
      payload: data?.id,
    });
    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(getState().wishlist.wishlist)
    );
    return data;
  };
