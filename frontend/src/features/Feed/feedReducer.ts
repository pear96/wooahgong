import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Feed{
    image : File[],
    type : boolean,
}

export const feed = createSlice({
    name : 'feed',
    initialState: {
        image : [],
        type : false
    } as Feed,
    reducers: {
        setImage(state, action : PayloadAction<File>){
            state.image.push(action.payload);
        },
        setType(state, action : PayloadAction<boolean>){
            state.type = action.payload;
        },
        setInitState(state){
            state.image = [];
            state.type = false;
        }
    }
})
export const {setImage, setType, setInitState} = feed.actions;
export default feed.reducer;