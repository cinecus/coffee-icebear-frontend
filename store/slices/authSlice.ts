import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    user:null,
    token_id:''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn:(state,action)=>{
                state.user = action.payload.result.user
                state.token_id = action.payload.result.token_id
                localStorage.setItem('token',action.payload.result.token_id)
                localStorage.setItem('account_id',action.payload.result.user._id)
        },
        signUp:(state,action)=>{
            state.user = action.payload.result.account
                state.token_id = action.payload.result.token_id
                localStorage.setItem('token',action.payload.result.token_id)
                localStorage.setItem('account_id',action.payload.result.account._id)
        },
        signOut:(state)=>{
            state.user = null
            state.token_id =''
            localStorage.removeItem('token')
            localStorage.removeItem('account_id')
        },
        getInfo:(state,action)=>{
            state.user = action.payload.result.account
        }
    }
})

export const {signIn,signOut,signUp,getInfo} = authSlice.actions

export default authSlice.reducer