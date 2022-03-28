import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfileImage {
  file: any;
  image: string | Blob;
  originalImg: any;
}

export const profileImage = createSlice({
  name: 'profileImage',
  initialState: {
    file: null,
    image: '',
    originalImg: '',
  } as ProfileImage,
  reducers: {
    setFile(state, action: PayloadAction<any>) {
      state.file = action.payload;
    },
    setImage(state, action: PayloadAction<any>) {
      state.image = action.payload;
    },
    setOriginalImg(state, action: PayloadAction<any>) {
      state.originalImg = action.payload;
    },
  },
});

export const { setFile, setImage, setOriginalImg } = profileImage.actions;
export default profileImage.reducer;
