import { createSlice } from "@reduxjs/toolkit";
import {menu} from '../../constant/data'

const initialState:any = {
    fetch_menu:menu,
    menu:menu,
    singleMenu:null,
    filter:"all"
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        filterCategory:(state,action)=>{
            switch (action.payload) {
                case 'coffee':
                    state.menu = state.fetch_menu.filter(el=>el.category==='coffee')
                    break;
                case 'tea':
                    state.menu = state.fetch_menu.filter(el=>el.category==='tea')
                    break;
                case 'milk':
                    state.menu = state.fetch_menu.filter(el=>el.category==='milk')
                    break;
                default:
                    state.menu = state.fetch_menu
                    break;
            }
            state.filter = action.payload
        },
        getMenuByID:(state,action)=>{
            state.singleMenu = state.fetch_menu.find(el=>el.id===action.payload)
        },
        searchMenu:(state,action)=>{
            console.log('action.payload', action.payload)
            state.menu = state.fetch_menu.filter(el=>`${el.name}${el.description}${el.type}${el.category}`.toLowerCase().includes(action.payload.toLowerCase()))
        }
    }
})

export const {filterCategory,getMenuByID,searchMenu} = menuSlice.actions

export default menuSlice.reducer