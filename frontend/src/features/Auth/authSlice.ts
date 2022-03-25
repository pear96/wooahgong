/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { saveToken } from '../../common/api/JTW-Token';

// 서버로 code 전송
export const postKakaocode = createAsyncThunk('auth/postKakaocode', async (data: string, { rejectWithValue }) => {
  try {
    console.dir(data);
    const response = await axios.post('url');
    return response;
  } catch (error: any) {
    console.dir(error);
    return rejectWithValue(error.response.data);
  }
});

// 서버로 부터 token 받기
export const getKakaoToken = createAsyncThunk('auth/getKakaoToken', async (data, { rejectWithValue }) => {
  try {
    console.dir(data);
    const response = await axios.get('url');
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
// export const commonLogin = createAsyncThunk('auth/commonLogin', async (data: Data, { rejectWithValue }) => {
//   try {
//     console.dir(data);
//     const response = await axios.post('백코드');
//     saveToken(response.data.accessToken); // 토큰 저장
//     return response;
//   } catch (error: any) {
//     console.dir(error);
//     return rejectWithValue(error.response.data);
//   }
// });

export interface InitialState {
  test: number;
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
  test: 0,
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
    testNum: (state, action: PayloadAction<number>) => {
      state.test = action.payload;
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
      // .addCase(commonLogin.pending, (state) => {
      //   state.commonLoginLoading = true;
      //   state.commonLoginDone = false;
      //   state.commonLoginError = '';
      // })
      // .addCase(commonLogin.fulfilled, (state) => {
      //   state.commonLoginLoading = false;
      //   state.commonLoginDone = true;
      // })
      // .addCase(commonLogin.rejected, (state, action) => {
      //   state.commonLoginLoading = true;
      //   state.commonLoginError = action.error.message as string;
      // });
  },
});

export const { setUser, testNum } = authSlice.actions;

export default authSlice.reducer;
