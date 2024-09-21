import { configureStore } from '@reduxjs/toolkit'
import roleReducer from '../redux/slices/roleSlice'
import loaderReducer from '../redux/slices/loaderSlice'
import userReducer from '../redux/slices/userSlice'
export const store = configureStore({
  reducer: {
    roleReducer,
    loaderReducer,
    userReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch