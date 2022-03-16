import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Register {
    id : string,
    pwd : string,
    email : string,
    gender : any,
    atmos : string[],
    birth : string,
    nick : string,
}

export const register = createSlice({
    name : 'register',
    initialState : {
        id : "",
        pwd : "",
        email : "",
        gender : "",
        atmos : [],
        birth : "",
        nick : ""
    } as Register,
    reducers:{
        setId(state, action : PayloadAction<string>){
            state.id = action.payload
            return state
        },
        setPwd(state, action : PayloadAction<string>){
            state.pwd = action.payload
        },
        setEmail(state, action : PayloadAction<string>){
            state.email = action.payload
        },
        setGender(state, action : PayloadAction<any>){
            state.gender = action.payload
        },
        setAtmos(state, action : PayloadAction<string[]>){
            state.atmos = action.payload
        },
        setBirth(state, action : PayloadAction<string>){
            state.birth = action.payload
        },
        setNick(state, action : PayloadAction<string>){
            state.nick = action.payload
        }
    }
})

export const {setId, setPwd, setEmail, setGender, setAtmos, setBirth, setNick} = register.actions;
export default register.reducer;