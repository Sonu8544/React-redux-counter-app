import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartProduct: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.cartProduct.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1; // ✅ Increase quantity if item exists
            } else {
                state.cartProduct.push({ ...action.payload, quantity: 1 }); // ✅ Add new item with quantity 1
            }
        },
        removeItem: (state, action) => {
            const existingItem = state.cartProduct.find(item => item.id === action.payload.id);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1; // ✅ Decrease quantity instead of removing the item completely
                } else {
                    state.cartProduct = state.cartProduct.filter(item => item.id !== action.payload.id);
                }
            }
        },
        clearCart: (state) => {
            state.cartProduct = []; // ✅ Clears entire cart
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
