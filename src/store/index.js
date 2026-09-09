import { configureStore } from '@reduxjs/toolkit';
import postReducer from "./postSlice"
import newsReducer from "./updatePostSlice"
export const store = configureStore({
    reducer: {
        post: postReducer,
        news: newsReducer,
    }
});