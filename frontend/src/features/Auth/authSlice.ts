import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  accessToken: '',
  money: 0,
};
const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default authSlice;
