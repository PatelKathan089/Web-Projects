import { createSlice } from "@reduxjs/toolkit";

// This will initalize with saved values or an empty array:-
const initCart = () => {
    const localData = localStorage.getItem("products");
    return localData ? JSON.parse(localData) : []
}

// This will save data to localStorage:-
const saveData = (data)=>{
    localStorage.setItem("products",JSON.stringify(data));
}

const initialState = {
    cart_items: initCart(),
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload
            const e_product = state.cart_items.find((item) => {
                return item._id === product._id
            })
            if (e_product) {
                return;
            } else {
                state.cart_items.push({ ...product, qty: 1 });
            }
            saveData(state.cart_items);
        },
        increaseQty: (state, action) => {
            const e_product = state.cart_items.find((item) => {
                return item._id == action.payload;
            });
            if (e_product) {
                e_product.qty += 1;
            }
            saveData(state.cart_items);
        },
        decreaseQty: (state, action) => {
            const e_product = state.cart_items.find((item) => {
                return item._id == action.payload;
            });
            if (e_product.qty > 1) {
                e_product.qty -= 1;
            } else {
                state.cart_items = state.cart_items.filter((item) => {
                    return item._id !== action.payload
                })
            }
            saveData(state.cart_items);
        },
        removeAllProducts: (state,action)=>{
            state.cart_items.length = 0;
            saveData(state.cart_items);
        }
    }
})

export const { addToCart, increaseQty, decreaseQty, removeAllProducts } = cartSlice.actions
export default cartSlice.reducer