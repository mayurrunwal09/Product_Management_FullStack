// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, productId, quantity } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.productId === productId);

      if (existingItemIndex !== -1) {
        // If the product is already in the cart, update the quantity
        state.cartItems[existingItemIndex].quantity += quantity;
      } else {
        // If the product is not in the cart, add it
        state.cartItems.push({ id, productId, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      state.cartItems = state.cartItems.filter(item => item.productId !== productId);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCartItems = state => state.cart.cartItems;
export default cartSlice.reducer;

console.log(selectCartItems)