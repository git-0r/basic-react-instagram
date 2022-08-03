import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer, { IPost } from "./postSlice";

const localPosts: IPost[] | null = JSON.parse(localStorage.getItem("state")!)
  ?.data?.posts;

const preloadedState = {
  auth: { user: null},
  data: { posts: localPosts?.length ? localPosts : ([] as IPost[]) },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: postReducer,
  },
  preloadedState,
});

// export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("state", JSON.stringify(state));
});
