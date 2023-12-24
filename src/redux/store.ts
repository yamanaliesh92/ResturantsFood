import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import cartReduce from "./reducers/cart.reducer";
import userReducer from "./reducers/user.reducer";
import whishListReduce from "./reducers/wishlist.reducer";

const Store = configureStore({
  reducer: {
    cart: cartReduce,
    wishlist: whishListReduce,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;

export default Store;
