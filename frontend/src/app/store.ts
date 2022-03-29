import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootreducer, { ReducerType } from './rootReducer';

const store = configureStore({
  reducer: rootreducer,
  middleware : 
  getDefaultMiddleware({
    serializableCheck : false
  })
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReducerType> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ReducerType, unknown, Action<string>>;
