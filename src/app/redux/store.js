'use client';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';  // <-- import the reducer, not the slice

export const store = configureStore({
  reducer: {
    user: userReducer,   
  },
});
