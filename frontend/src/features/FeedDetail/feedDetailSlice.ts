import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  autoCompete: any[];
  nickname: string;
  values: number;
}
const initialState = {
  isFocus: false,
  autoCompete: [],
  values: 0,
  nickname: '',
};

const feedDetailSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setToggle(state, action) {
    //   state.isFocus = action.payload;
    // },
    // setAutoComplete(state, action) {
    //   state.autoCompete = action.payload;
    // },
    // setValues(state, action: PayloadAction<number>) {
    //   state.values = action.payload;
    // },
    // setNickname(state, action) {
    //   state.nickname = action.payload;
    // },
  },
});

// export const {} = feedDetailSlice.actions;

export default feedDetailSlice.reducer;
