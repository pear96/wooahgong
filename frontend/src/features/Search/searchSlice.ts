import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  autoCompete: any[];
}
const initialState = {
  isFocus: false,
  inputValue: false,
  autoCompete: [],
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
  },
});

export const { setToggle, setAutoComplete } = searchSlice.actions;

export default searchSlice.reducer;
