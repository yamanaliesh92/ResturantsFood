// add to cart

export const addToCart =
  (data: any) => async (dispatch: any, getState: any) => {
    dispatch({
      type: "addToCart",
      payload: data,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
  };

export const removeFromCart =
  (data: any) => async (dispatch: any, getState: any) => {
    dispatch({
      type: "removeFromCart",
      payload: data?.id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
  };
