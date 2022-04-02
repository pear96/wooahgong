import { createSlice } from '@reduxjs/toolkit';

export interface InitialState {
  isUpdate: boolean;
  updateContest: string;
  userImage: string;
  userNickname: string;
  CreateDate: string;
}
const initialState = {
  isUpdate: false,
  updateContent: '',
  userImage: '',
  userNickname: '',
  CreateDate: '',
};

const feedDetailSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUpdate(state, action) {
      state.isUpdate = action.payload;
    },
    setContent(state, action) {
      state.updateContent = action.payload;
    },
    setUserImage(state, action) {
      state.userImage = action.payload;
    },
    setUesrNickname(state, action) {
      state.userNickname = action.payload;
    },
    setCreateDate(state, action) {
      state.CreateDate = action.payload;
    },
  },
});

export const { setUpdate, setContent, setUserImage, setUesrNickname, setCreateDate } = feedDetailSlice.actions;

export default feedDetailSlice.reducer;
