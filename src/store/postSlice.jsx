import { createSlice } from "@reduxjs/toolkit";

/* =========================================================
   INITIAL STATE
========================================================= */

const initialState = {
  // Current post form
  formData: {},

  // All posts
  posts: [],

  // Editor settings
  sidebar: "right",
  template: 1,
  themeMode: "light",
  published: false,

  // Current image
  image: null,
};

/* =========================================================
   SLICE
========================================================= */

const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    /* =====================================================
       FORM DATA
    ===================================================== */

    setFormData: (state, action) => {
      state.formData = action.payload;
    },

    /* =====================================================
       ADD POST
    ===================================================== */

    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    /* =====================================================
       SET POSTS
    ===================================================== */

    setPosts: (state, action) => {
      state.posts = action.payload || [];
    },

    /* =====================================================
       UPDATE POST
    ===================================================== */

    updateNews: (state, action) => {
      const { id, updatedData } = action.payload || {};

      console.log("=================================");
      console.log("Redux updateNews");
      console.log("Received ID:", id);
      console.log("Received updatedData:", updatedData);
      console.log("Current posts:", state.posts);
      console.log("=================================");

      if (!id) {
        console.error(
          "updateNews: Post ID is missing"
        );
        return;
      }

      if (!updatedData) {
        console.error(
          "updateNews: updatedData is missing"
        );
        return;
      }

      const index = state.posts.findIndex(
        (post) =>
          String(post.key ?? post.id) === String(id)
      );

      console.log(
        "Post index found:",
        index
      );

      if (index === -1) {
        console.warn(
          "Post not found in Redux:",
          id
        );
        return;
      }

      /*
        Keep the original post data and
        replace only the updated fields.
      */

      state.posts[index] = {
        ...state.posts[index],
        ...updatedData,
      };

      console.log(
        "Updated post:",
        state.posts[index]
      );
    },

    /* =====================================================
       MOVE TO TRASH
    ===================================================== */

    trashNews: (state, action) => {
      const id = action.payload;

      console.log(
        "Moving post to Trash:",
        id
      );

      const post = state.posts.find(
        (item) =>
          String(item.key ?? item.id) ===
          String(id)
      );

      if (!post) {
        console.warn(
          "Post not found for Trash:",
          id
        );
        return;
      }

      post.status = "Trash";
    },

    /* =====================================================
       MOVE TO DRAFT
    ===================================================== */

    draftNews: (state, action) => {
      const id = action.payload;

      console.log(
        "Moving post to Draft:",
        id
      );

      const post = state.posts.find(
        (item) =>
          String(item.key ?? item.id) ===
          String(id)
      );

      if (!post) {
        console.warn(
          "Post not found for Draft:",
          id
        );
        return;
      }

      post.status = "Draft";
    },

    /* =====================================================
       DELETE PERMANENTLY
    ===================================================== */

    deletePost: (state, action) => {
      const id = action.payload;

      state.posts = state.posts.filter(
        (post) =>
          String(post.key ?? post.id) !==
          String(id)
      );
    },

    /* =====================================================
       SIDEBAR
    ===================================================== */

    setSidebar: (state, action) => {
      state.sidebar = action.payload;
    },

    /* =====================================================
       TEMPLATE
    ===================================================== */

    setTemplate: (state, action) => {
      state.template = action.payload;
    },

    /* =====================================================
       PUBLISH
    ===================================================== */

    publishPost: (state) => {
      state.published = true;
      state.themeMode = "dark";

      if (state.formData) {
        state.formData.status = "Published";
      }
    },

    /* =====================================================
       RESET
    ===================================================== */

    resetPost: (state) => {
      state.formData = {};
      state.published = false;
      state.image = null;
    },

    /* =====================================================
       IMAGE
    ===================================================== */

    setImage: (state, action) => {
      state.image = action.payload;
    },

    clearImage: (state) => {
      state.image = null;
    },
  },
});

/* =========================================================
   ACTIONS
========================================================= */

export const {
  setFormData,

  addPost,
  setPosts,
  updateNews,
  trashNews,
  draftNews,
  deletePost,

  setSidebar,
  setTemplate,
  publishPost,
  resetPost,

  setImage,
  clearImage,
} = postSlice.actions;

/* =========================================================
   REDUCER
========================================================= */

export default postSlice.reducer;

