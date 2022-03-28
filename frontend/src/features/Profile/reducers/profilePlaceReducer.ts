import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfilePlaces {
  places: { placeSeq: number; thumbnail: string }[];
}

export const profilePlaces = createSlice({
  name: 'profilePlaces',
  initialState: {
    places: [],
  } as ProfilePlaces,
  reducers: {
    setPlaces(state, action: PayloadAction<any>) {
      state.places = action.payload;
    },
  },
});

export const { setPlaces } = profilePlaces.actions;
export default profilePlaces.reducer;
