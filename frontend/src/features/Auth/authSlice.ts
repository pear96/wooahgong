/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { saveToken } from '../../common/api/JTW-Token';

// 일반 login
export interface Data {
  id: string;
  password: string;
}

export interface InitialState {
  test: number;
  nickname: string;
  profileImg: string;
  gender : boolean | null;
  postkakaoCodeLoading: boolean;
  postkakaoCodeDone: boolean;
  postkakaoCodeError: string;
  commonLoginLoading: boolean;
  commonLoginDone: boolean;
  commonLoginError: string;
}

const initialState: InitialState = {
  test: 0,
  nickname: '',
  profileImg: '',
  gender : null,
  postkakaoCodeLoading: false,
  postkakaoCodeDone: false,
  postkakaoCodeError: '',
  commonLoginLoading: false,
  commonLoginDone: false,
  commonLoginError: '',
};
const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ nickname: string; profileImg: string, gender : boolean }>) => {
      state.nickname = action.payload.nickname;
      state.profileImg = action.payload.profileImg;
      state.gender = action.payload.gender;
    },
    testNum: (state, action: PayloadAction<number>) => {
      state.test = action.payload;
    },
    setProfileImg: (state, action: PayloadAction<string>) => {
      state.profileImg = action.payload;
    },
    setProfileNick: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(postKakaocode.pending, (state) => {
  //       state.postkakaoCodeLoading = true;
  //       state.postkakaoCodeDone = false;
  //       state.postkakaoCodeError = '';
  //     })
  //     .addCase(postKakaocode.fulfilled, (state) => {
  //       state.postkakaoCodeLoading = false;
  //       state.postkakaoCodeDone = true;
  //     })
  //     .addCase(postKakaocode.rejected, (state, action) => {
  //       state.postkakaoCodeLoading = true;
  //       state.postkakaoCodeError = action.error.message as string;
  //     })
  //     // .addCase(commonLogin.pending, (state) => {
  //     //   state.commonLoginLoading = true;
  //     //   state.commonLoginDone = false;
  //     //   state.commonLoginError = '';
  //     // })
  //     // .addCase(commonLogin.fulfilled, (state) => {
  //     //   state.commonLoginLoading = false;
  //     //   state.commonLoginDone = true;
  //     // })
  //     // .addCase(commonLogin.rejected, (state, action) => {
  //     //   state.commonLoginLoading = true;
  //     //   state.commonLoginError = action.error.message as string;
  //     // });
  // },
});

export const { setUser, testNum, setProfileImg, setProfileNick } = authSlice.actions;

export default authSlice.reducer;
