import { createSlice } from "@reduxjs/toolkit";

export interface IPost {
  id: string;
  created_at: string;
  nickname: string;
  fileURL: string;
  fileType: string;
  caption: string;
  like_count: string;
  comment_count: string;
}

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [] as IPost[],
  },
  reducers: {
    createPost: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
  },
});

export const { createPost } = postSlice.actions;
export default postSlice.reducer;
