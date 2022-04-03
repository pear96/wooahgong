import { createSlice } from '@reduxjs/toolkit';

export interface InitialState {
  isUpdate: boolean;
  updateConttent: string;
  userImages: string;
  userNicknames: string;
  CreateDates: string;
}
const initialState = {
  isUpdate: false,
  updateConttent: '',
  userImages: '',
  userNicknames: '',
  CreateDates: '',
};

const feedDetailSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUpdate(state, action) {
      state.isUpdate = action.payload;
    },
    setContent(state, action) {
      state.updateConttent = action.payload;
    },
    setUserImage(state, action) {
      state.userImages = action.payload;
    },
    setUesrNickname(state, action) {
      state.userNicknames = action.payload;
    },
    setCreateDate(state, action) {
      state.CreateDates = action.payload;
    },
  },
});

export const { setUpdate, setContent, setUserImage, setUesrNickname, setCreateDate } = feedDetailSlice.actions;

export default feedDetailSlice.reducer;
