import { createSlice } from "@reduxjs/toolkit";

const postState = {
  // addPost: {},
  // allPosts: [],
  addInvoice: {},
  allInvoice: [],
};

const postSlice = createSlice({
  name: "post",
  initialState: postState,
  reducers: {
    // CreatePost: (state, { payload }) => {
    //   state.addPost = payload;
    // },
    // GetPosts: (state, { payload }) => {
    //   state.allPosts = payload;
    // },
    CreateInvoice: (state, { payload }) => {
      state.addInvoice = payload;
    },
    GetInvoice: (state, { payload }) => {
      state.allInvoice = payload;
    },
  },
});

export const { CreateInvoice, GetInvoice } = postSlice.actions;
export default postSlice.reducer;
