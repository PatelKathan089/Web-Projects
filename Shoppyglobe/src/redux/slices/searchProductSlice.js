import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filtered_products: []
}

export const searchProductSlice = createSlice({
    name: 'search_product',
    initialState,
    reducers: {
        searched_items: (state, action) => {
            state.filtered_products = action.payload;
        }
    }
})

export const { searched_items } = searchProductSlice.actions
export default searchProductSlice.reducer