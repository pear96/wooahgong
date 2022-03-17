/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 서버로 code 전송
export const postKakacode = createAsyncThunk('auth/postKakacode', async (data: string, { rejectWithValue }) => {
  try {
    console.dir(data);
    const response = await axios.post('백코드');
    return response;
  } catch (error: any) {
    console.dir(error);
    return rejectWithValue(error.response.data);
  }
});

// 서버로 부터 토큰 받아옴
export const getToken = createAsyncThunk('auth/getToken', async (data, { rejectWithValue }) => {
  try {
    console.dir(data);
    const response = await axios.get('백코드');
    return response;
  } catch (error: any) {
    console.dir(error);
    return rejectWithValue(error.response.data);
  }
});

export interface InitialState {
  code: string;
  postkakaoCodeLoading: boolean;
  postkakaoCodeDong: boolean;
  postkakaoCodeError: string;
  getTokenLoading: boolean;
  getTokenDong: boolean;
  getTokenError: string;
}

const initialState: InitialState = {
  code: '',
  postkakaoCodeLoading: false,
  postkakaoCodeDong: false,
  postkakaoCodeError: '',
  getTokenLoading: false,
  getTokenDong: false,
  getTokenError: '',
};
const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postKakacode.pending, (state) => {
        state.postkakaoCodeLoading = true;
        state.postkakaoCodeDong = false;
        state.postkakaoCodeError = '';
      })
      .addCase(postKakacode.fulfilled, (state) => {
        state.postkakaoCodeLoading = false;
        state.postkakaoCodeDong = true;
      })
      .addCase(postKakacode.rejected, (state, action) => {
        state.postkakaoCodeLoading = true;
        state.postkakaoCodeError = action.error.message as string;
      });
  },
});

export const { saveCode } = authSlice.actions;

export default authSlice.reducer;
