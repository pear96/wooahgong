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

const searchSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToggle(state, action) {
      state.isFocus = action.payload;
    },
    setAutoComplete(state, action) {
      state.autoCompete = action.payload;
    },
    setValues(state, action: PayloadAction<number>) {
      state.values = action.payload;
    },
    setNickname(state, action) {
      state.nickname = action.payload;
    },
  },
});

export const { setToggle, setAutoComplete, setValues, setNickname } = searchSlice.actions;

export default searchSlice.reducer;
