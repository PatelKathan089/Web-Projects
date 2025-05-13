import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cart_items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload
            const e_product = state.cart_items.find((item) => {
                return item.id === product.id
            })
            if (e_product) {
                toast.info(`Item is already in the cart!`);
                return;
            } else {
                state.cart_items.push({ ...product, qty: 1 });
                toast.success(`Item added to your cart`);
            }
        },
        increaseQty: (state, action) => {
            const e_product = state.cart_items.find((item) => {
                return item.id == action.payload;
            });
            if (e_product) {
                e_product.qty += 1;
            }
        },
        decreaseQty: (state, action) => {
            const e_product = state.cart_items.find((item) => {
                return item.id == action.payload;
            });
            if (e_product.qty > 1) {
                e_product.qty -= 1;
            } else {
                state.cart_items = state.cart_items.filter((item) => {
                    toast.error("Item removed from your cart!")
                    return item.id !== action.payload
                })
            }
        }
    }
})

export const { addToCart, increaseQty, decreaseQty } = cartSlice.actions
export default cartSlice.reducer