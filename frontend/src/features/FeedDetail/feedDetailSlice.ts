import { createSlice } from '@reduxjs/toolkit';

export interface InitialState {
  isUpdate: boolean;
  updateContest: string;
}
const initialState = {
  isUpdate: false,
  updateContest: '',
};

const feedDetailSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUpdate(state, action) {
      state.isUpdate = action.payload;
    },
    setUpdateContent(state, action) {
      state.updateContest = action.payload;
    },
  },
});

export const { setUpdate, setUpdateContent } = feedDetailSlice.actions;

export default feedDetailSlice.reducer;
