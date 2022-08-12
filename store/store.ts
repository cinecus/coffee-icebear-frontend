import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'

import menuSlice from "./slices/menuSlice";
import cartSlice from "./slices/cartSlice";
import orderSlice from "./slices/orderSlice";

const store =  configureStore({
    reducer: {
        menu:menuSlice,
        cart:cartSlice,
        order:orderSlice
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({thunk:false})
})

// Types of root state and dispatch
type RootState = ReturnType<typeof store.getState>
type AppDispath = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispath>()

export default store