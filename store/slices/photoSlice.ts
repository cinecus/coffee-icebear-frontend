import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    photo:[]
}

const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        
    }
})

export const {} = photoSlice.actions

export default photoSlice.reducer