import { createSlice } from "@reduxjs/toolkit";
import {menu,cart} from '../../constant/data'
import { singleCartType } from "../../types/cart_types";

const initialState:any = {
    cart:[],
    init:null,
    summary_detail:{
        subtotal:0,
        discount:0,
        summary_subtotal:0
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        insertInit:(state,action)=>{
            console.log(action.payload)
            state.init = {
                ...state.init,
                ...action.payload
            }
        },
        customizeCart:(state,action)=>{
            if(action.payload.type==='INCREASE'){
                state.cart = state.cart.map((el:singleCartType,i:number)=>{
                    if(el.id==action.payload.id){
                        return {...el,qty:el.qty+1}
                    }
                    return el
                })
            }else if(action.payload.type==='DECREASE'){
                state.cart = state.cart.map((el:singleCartType,i:number)=>{
                    if(el.id==action.payload.id && el.qty !==1){
                        return {...el,qty:el.qty-1}
                    }
                    return el
                })
            }

        },
        deleteItemByID:(state,action)=>{
            state.cart = state.cart.filter((el:singleCartType,i:number)=>{
                return el.id !== action.payload
            })
        },
        addItemToCart:(state,action)=>{
            const insertedItem = action.payload
            let findItemSameInCart = state.cart.find((el:singleCartType)=>el.name===insertedItem.name 
                && el.type === insertedItem.type
                && el.sweetLevel === insertedItem.sweetLevel 
                && el.addWhipCream === insertedItem.addWhipCream
                && el.addBrownie === insertedItem.addBrownie
                && el.addCoffeeShot === insertedItem.addCoffeeShot
                && el.addBubble === insertedItem.addBubble
                )
            if(!!findItemSameInCart){
                findItemSameInCart.qty +=1
            }else{
                state.cart=  [...state.cart,action.payload]
            }
            
        },
        setCartToEmpty:(state,action)=>{
            state.cart = []
        }

    }
})

export const {insertInit,customizeCart,deleteItemByID,addItemToCart,setCartToEmpty} = cartSlice.actions

export default cartSlice.reducer