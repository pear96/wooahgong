import { combineReducers } from '@reduxjs/toolkit';

// reducer

import feedReducer from 'features/Feed/feedReducer';
import searchReducer from 'features/Search/searchSlice';
import feedDeatilReducer from 'features/FeedDetail/feedDetailSlice';
import registerReducer from '../features/Regist/registerReducer';
import authSlice from '../features/Auth/authSlice';

// 만들어 놓은 리듀서들을 합친다.
const rootReducer = combineReducers({
  registerReducer,
  feedReducer,
  login: authSlice,
  search: searchReducer,
  feeddetail: feedDeatilReducer,
});

// React에서 사용할 수 있도록 타입을 만들어 export 해준다.
export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
