import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Feed{
    image : File[],
    type : boolean,
    place : {placeSeq : number, name : string, address : string }
}

export const feed = createSlice({
    name : 'feed',
    initialState: {
        image : [],
        type : false,
        place : {placeSeq : 0, name : "", address : "" }
    } as Feed,
    reducers: {
        setImage(state, action : PayloadAction<File[]>){
            state.image = action.payload;
        },
        setType(state, action : PayloadAction<boolean>){
            state.type = action.payload;
        },
        setPlace(state, action : PayloadAction<{placeSeq : number, name : string, address : string }>){
            state.place = action.payload;
        },
        setInitState(state){
            state.image = [];
            state.type = false;
        }
    }
})
export const {setImage, setType, setPlace,setInitState} = feed.actions;
export default feed.reducer;