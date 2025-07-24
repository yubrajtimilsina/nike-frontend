import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import reviewSlice from "./reviewSlice";
import cartSlice from './cartSlice'
import orderSlice from './orderSlice'
import chatBoxSlice from './chatBoxSlice'

const store = configureStore({
    reducer : {
        auth : authSlice,

        products:productSlice,
        reviews:reviewSlice,
        cart:cartSlice,
        orders:orderSlice,
        chat: chatBoxSlice,
        

    }
})

export default store 
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>


