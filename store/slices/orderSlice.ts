import { createSlice } from "@reduxjs/toolkit";
import {menu,cart,order} from '../../constant/data'
import moment from "moment";
import { singleOrderType } from "../../types/order_types";

const initialState:any = {
    order:order.sort((a:any,b:any)=>a.orderDate-b.orderDate),
    fetch_order:order,
    init:null,
    filter:'all'
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        insertInit:(state,action)=>{
            console.log(action.payload)
            state.init = {
                ...state.init,
                ...action.payload
            }
        },
        filterOrder:(state,action)=>{
            switch (action.payload) {
                case 'waiting':
                    state.order = state.fetch_order.filter((el:singleOrderType)=>el.status==='waiting')
                    break;
                case 'success':
                    state.order = state.fetch_order.filter((el:singleOrderType)=>el.status==='success')
                    break;
                case 'cancel':
                    state.order = state.fetch_order.filter((el:singleOrderType)=>el.status==='cancel')
                    break;
                default:
                    state.order = state.fetch_order
                    break;
            }
            state.filter = action.payload
        },
        insertOrder:(state,action)=>{
            state.order = [...state.order,action.payload]
            state.cart=[]
        },
        filterOrderByDate:(state,action)=>{
            console.log('action.payload', action.payload)
            state.order = state.fetch_order.filter((el:singleOrderType)=>{
                console.log(moment(el.orderDate));
                console.log('dateStart', action.payload.dateStart)
                return moment(el.orderDate).isBetween(action.payload.dateStart,action.payload.dateEnd)
            })
        }
    }
})

export const {insertInit,filterOrder,insertOrder,filterOrderByDate} = orderSlice.actions

export default orderSlice.reducer