/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 일반 login
export interface Data {
  id: string;
  password: string;
}

export interface InitialState {
  Changeradius: number;
}

const initialState: InitialState = {
  Changeradius: 1500,
};
const mainSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRadius: (state, action: PayloadAction<number>) => {
      state.Changeradius = action.payload;
    },
  },
});

export const { setRadius } = mainSlice.actions;

export default mainSlice.reducer;
