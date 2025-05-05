import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], // Array to hold book objects
};

export const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        addBooks: (state, action) => {
            state.items.push(action.payload); // Add the new book to the books array
        }
    }
})

export const { addBooks } = bookSlice.actions; // Export the action to add books
export default bookSlice.reducer; // Export the reducer to be used in the store