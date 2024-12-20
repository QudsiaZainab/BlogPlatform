
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../Features/ThemeSlice';
import sidebarReducer from '../Features/SidebarSlice';
import categoryReducer from '../Features/CategorySlice';
import blogsReducer from '../Features/BlogsSlice';
import authReducer from '../Features/AuthSlice'

const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
    categories: categoryReducer,
    blogs: blogsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;