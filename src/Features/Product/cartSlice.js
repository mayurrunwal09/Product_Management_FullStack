







// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     cartItems: [],
//   },
//   reducers: {
//     updateCartItem: (state, action) => {
//       state.cartItems = action.payload;
//     },
//     removeFromCart: (state, action) => {
//       const { cartId } = action.payload;
//       state.cartItems = state.cartItems.filter((item) => item.id !== cartId);
//     },
//     // ... (other reducers)
//   },
// });

// export const { updateCartItem, removeFromCart } = cartSlice.actions;
// export const selectCartItems = (state) => state.cart.cartItems;
// export default cartSlice.reducer;



// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    updateCartItem: (state, action) => {
      state.cartItems = action.payload;
    },
    removeFromCart: (state, action) => {
      const { cartId } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== cartId);
    },
  },
});

export const { updateCartItem, removeFromCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export default cartSlice.reducer;
