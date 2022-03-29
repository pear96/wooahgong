import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlaceInterface {
  placeSeq: number;
  isRegistered: boolean;
  name: string;
  address: string;
}

export const PlaceSlice = createSlice({
  name: 'profileImage',
  initialState: {
    placeSeq: 0,
    isRegistered: false,
    name: '',
    address: '',
  } as PlaceInterface,
  reducers: {
    setPlaceSeq(state, action: PayloadAction<number>) {
      state.placeSeq = action.payload;
    },
    setRegistered(state, action: PayloadAction<boolean>) {
      state.isRegistered = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
  },
});

export const { setPlaceSeq, setRegistered, setName, setAddress } = PlaceSlice.actions;
export default PlaceSlice.reducer;
