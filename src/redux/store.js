import { configureStore } from '@reduxjs/toolkit'
import { blogsApi } from './features/blogs/blogsApi'
import authApi from './features/auth/authApi'
import authReducer from './features/auth/authSlice'
import commentsApi from './features/comments/commentApi'

export const store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer, // Assuming you have imported commentsApi from the commentsApi file
    auth: authReducer, // Assuming you have an authReducer defined in your authSlice


  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogsApi.middleware, authApi.middleware, commentsApi.middleware),
})