// // productStore.js
// import { configureStore } from '@reduxjs/toolkit';
// import productReducer from '../Features/Product/ProductSlice';
// import categoryReducer from '../Features/Category/categorySlice';
// import cartReducer from '../Features/Cart/cartSlice';
// import orderReducer from '../Features/Order/orderSlice';
// import orderItemReducer from '../Features/OrderItem/orderItemSlice';

// const store = configureStore({
//   reducer: {
//     product: productReducer,
//     category: categoryReducer,
//     cart: cartReducer,
//     order: orderReducer,
//     orderItem: orderItemReducer,

   
//   },
// });

// export default store;


// productStore.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import productReducer from '../Features/Product/ProductSlice';
import categoryReducer from '../Features/Category/categorySlice';
import cartReducer from '../Features/Cart/cartSlice';
import orderReducer from '../Features/Order/orderSlice';
import orderItemReducer from '../Features/OrderItem/orderItemSlice';
import thunk from 'redux-thunk'; // Import thunk

const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
    order: orderReducer,
    orderItem: orderItemReducer,
  },
  middleware: [...getDefaultMiddleware(), thunk],
});

export default store;

