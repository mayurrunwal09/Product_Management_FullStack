

// // CartList.js
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectCartItems, addToCart, removeFromCart, clearCart } from './cartSlice';

// const CartList = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector(selectCartItems);

//   const handleRemoveFromCart = (productId) => {
//     dispatch(removeFromCart({ productId }));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   return (
//     <div className="cart-list-container">
//       <h2>Shopping Cart</h2>

//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           <ul>
//             {cartItems.map((item) => (
//               <li key={item.id}>
//                 Product ID: {item.productId}, Quantity: {item.quantity}
//                 <button onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
//               </li>
//             ))}
//           </ul>
//           <button onClick={handleClearCart}>Clear Cart</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartList;
