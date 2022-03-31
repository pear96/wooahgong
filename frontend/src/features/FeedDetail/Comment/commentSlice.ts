import { createSlice } from '@reduxjs/toolkit';

export interface InitialState {
  isUpdate: boolean;
  updateContest: string;
}
const initialState = {
  isUpdate: false,
  updateContest: '',
};

const commentSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setUpdate(state, action) {
    //   state.isUpdate = action.payload;
    // },
    // setUpdateContent(state, action) {
    //   state.updateContest = action.payload;
    // },
  },
});

// export const { setUpdate, setUpdateContent } = commentSlice.actions;

export default commentSlice.reducer;
