import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  places: '',
  email: '',
  isFocus: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
    },
  },
});

export default userSlice;
