/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { saveToken } from '../../common/api/JTW-Token';

// 서버로 code 전송 => socical login
export const postKakaocode = createAsyncThunk('auth/postKakaocode', async (data: string, { rejectWithValue }) => {
  try {
    console.dir(data);
    const response = await axios.post('백코드');
    // 여기서 소셜 로그인의 분기가 이루어진다
    return response;
  } catch (error: any) {
    console.dir(error);
    return rejectWithValue(error.response.data);
  }
});

// 일반 login
export interface Data {
  id: string;
  password: string;
}
export const commonLogin = createAsyncThunk('auth/getToken', async (data: Data, { rejectWithValue }) => {
  try {
    console.dir(data);
    const response = await axios.get('백코드');
    saveToken(response.data.accessToken); // 토큰 저장
    return response;
  } catch (error: any) {
    console.dir(error);
    return rejectWithValue(error.response.data);
  }
});

export interface InitialState {
  nickname: string;
  profileImg: string;
  postkakaoCodeLoading: boolean;
  postkakaoCodeDone: boolean;
  postkakaoCodeError: string;
  commonLoginLoading: boolean;
  commonLoginDone: boolean;
  commonLoginError: string;
}

const initialState: InitialState = {
  nickname: '',
  profileImg: '',
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
    setUser: (state, action: PayloadAction<{ nickname: string; profileImg: string }>) => {
      state.nickname = action.payload.nickname;
      state.profileImg = action.payload.profileImg;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postKakaocode.pending, (state) => {
        state.postkakaoCodeLoading = true;
        state.postkakaoCodeDone = false;
        state.postkakaoCodeError = '';
      })
      .addCase(postKakaocode.fulfilled, (state) => {
        state.postkakaoCodeLoading = false;
        state.postkakaoCodeDone = true;
      })
      .addCase(postKakaocode.rejected, (state, action) => {
        state.postkakaoCodeLoading = true;
        state.postkakaoCodeError = action.error.message as string;
      })
      .addCase(commonLogin.pending, (state) => {
        state.commonLoginLoading = true;
        state.commonLoginDone = false;
        state.commonLoginError = '';
      })
      .addCase(commonLogin.fulfilled, (state) => {
        state.commonLoginLoading = false;
        state.commonLoginDone = true;
      })
      .addCase(commonLogin.rejected, (state, action) => {
        state.commonLoginLoading = true;
        state.commonLoginError = action.error.message as string;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
