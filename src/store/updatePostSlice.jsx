import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,

  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },

    updateNews: (state, action) => {
      const { id, updatedData } = action.payload;

      const index = state.news.findIndex(
        (item) => item.id === id
      );

      if (index !== -1) {
        state.news[index] = {
          ...state.news[index],
          ...updatedData,
        };
      }
    },

    trashNews: (state, action) => {
      const id = action.payload;

      state.news = state.news.filter(
        (item) => item.id !== id
      );
    },

    draftNews: (state, action) => {
      const id = action.payload;

      const news = state.news.find(
        (item) => item.id === id
      );

      if (news) {
        news.status = "Draft";
      }
    },
  },
});

export const {
  setNews,
  updateNews,
  trashNews,
  draftNews,
} = newsSlice.actions;

export default newsSlice.reducer;