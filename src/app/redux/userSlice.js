'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    AuthUser(state, action) {
      console.log('payload:', action.payload);
      state.user = action.payload;
    },
  },
});

export const { AuthUser } = userSlice.actions;
export default userSlice.reducer;  // <-- export the reducer function
