import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice"
import searchProductReducer from "./slices/searchProductSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        search_product: searchProductReducer
    }
})