import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootreducer from './rootReducer';

const store = configureStore({
  reducer: rootreducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
