import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfileFeeds {
  feeds: { feedSeq: number; imageUrl: string }[];
}

export const profileFeeds = createSlice({
  name: 'profileFeeds',
  initialState: {
    feeds: [],
  } as ProfileFeeds,
  reducers: {
    setFeeds(state, action: PayloadAction<any>) {
      state.feeds = action.payload;
    },
  },
});

export const { setFeeds } = profileFeeds.actions;
export default profileFeeds.reducer;
