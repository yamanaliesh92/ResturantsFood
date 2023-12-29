import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItemFromLocalStorage {
  id: number;
  name: string;
  price: number;
  imgOrder: string;
  description: string;
  category: string;
  userId: number;
  restaurantId: number;
  cartQuantity: number;
}

export interface ICart {
  cartItem: ICartItemFromLocalStorage[];

  cartTotalAmount: number;
}

const cartFromLocalStorage: ICartItemFromLocalStorage[] =
  window.localStorage.getItem("cartItems")
    ? JSON.parse(window.localStorage.getItem("cartItems")!)
    : [];

const init: ICart = {
  cartItem: cartFromLocalStorage,

  cartTotalAmount: 0,
};

const cartReduce = createSlice({
  name: "cart",
  initialState: init,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItemFromLocalStorage>) => {
      const newItem = action.payload;
      const existItem = state.cartItem.findIndex(
        (item) => item.id === newItem.id
      );

      if (existItem >= 0) {
        state.cartItem[existItem].cartQuantity += 1;
      } else {
        state.cartItem.push(newItem);
      }

      window.localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },

    decreaseCart: (state, action: PayloadAction<{ id: number }>) => {
      const id = action.payload.id;
      const existItem = state.cartItem.findIndex((item) => item.id === id);

      if (existItem >= 0) {
        state.cartItem[existItem].cartQuantity -= 1;
      } else if (state.cartItem[existItem].cartQuantity === 1) {
        const updateState = state.cartItem.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItem.splice(0, state.cartItem.length, ...updateState);

        localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
      }

      window.localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },

    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const id = action.payload.id;
      const updateState = state.cartItem.filter((item) => item.id !== id);
      state.cartItem.splice(0, state.cartItem.length, ...updateState);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },
    getTotal: (state) => {
      let { total } = state.cartItem.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;

          return cartTotal;
        },
        {
          total: 0,
        }
      );

      state.cartTotalAmount = total;
    },
  },
});
export default cartReduce.reducer;

export const { addToCart, removeFromCart, decreaseCart, getTotal } =
  cartReduce.actions;
