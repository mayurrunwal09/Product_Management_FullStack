








// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeFromCart, selectCartItems, updateCartItem } from './cartSlice';
// import { getAllCartItems, getProductById, removeCartItem } from './enrollProduct';
// import './CartProduct.css';

// const CartProduct = () => {
//   const cartItems = useSelector(selectCartItems);
//   const dispatch = useDispatch();
//   const [cartWithDetails, setCartWithDetails] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getAllCartItems();

//         const cartDetails = await Promise.all(
//           data.map(async (item) => {
//             const [productDetails] = await Promise.all([
//               getProductDetails(item.productId),
//             ]);
//             return { ...item, ...productDetails };
//           })
//         );
//         dispatch(updateCartItem(cartDetails));
//         setCartWithDetails(cartDetails);
//       } catch (error) {
//         console.error('Error fetching cart data:', error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   const getProductDetails = async (productId) => {
//     try {
//       const product = await getProductById(productId);

//       const details = {
//         productName: product.productName || 'Unknown',
//         price: product.price || 0,
//         stockQuantity: product.stockQuantity || 0,
//       };

//       return details;
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//       return {
//         productName: 'Unknown',
//         price: 0,
//         stockQuantity: 0,
//       };
//     }
//   };

//   const handleRemoveItem = async (cartId) => {
//     try {
//       await removeCartItem(cartId);

//       // Remove the item from the local state
//       const updatedCartItems = cartWithDetails.filter((item) => item.id !== cartId);
//       setCartWithDetails(updatedCartItems);

//       // Dispatch the removeFromCart action
//       dispatch(removeFromCart({ cartId }));
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//     }
//   };

//   return (
//     <div className="cart-product">
//       <h2>Cart</h2>
//       {cartWithDetails.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Cart ID</th>
//               <th>Product ID</th>
//               <th>Product Name</th>
//               <th>Price</th>
//               <th>Stock Quantity</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartWithDetails.map((item) => (
//               <tr key={item.productId}>
//                 <td>{item.id}</td>
//                 <td>{item.productId}</td>
//                 <td>{item.productName}</td>
//                 <td>{item.price}</td>
//                 <td>{item.stockQuantity}</td>
//                 <td>
//                   <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CartProduct;


// CartProduct.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, selectCartItems, updateCartItem } from './cartSlice';
import { getAllCartItems, getProductById, removeCartItem } from './enrollProduct';
import './CartProduct.css';

const CartProduct = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [cartWithDetails, setCartWithDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCartItems();

        const cartDetails = await Promise.all(
          data.map(async (item) => {
            const [productDetails] = await Promise.all([
              getProductDetails(item.productId),
            ]);
            return { ...item, ...productDetails };
          })
        );
        dispatch(updateCartItem(cartDetails));
        setCartWithDetails(cartDetails);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    console.log('Component re-rendered:', cartWithDetails);
  }, [cartWithDetails]);

  const getProductDetails = async (productId) => {
    try {
      const product = await getProductById(productId);

      const details = {
        productName: product.productName || 'Unknown',
        price: product.price || 0,
        stockQuantity: product.stockQuantity || 0,
      };

      return details;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return {
        productName: 'Unknown',
        price: 0,
        stockQuantity: 0,
      };
    }
  };

  const handleRemoveItem = async (cartId) => {
    try {
      await removeCartItem(cartId);

      
      const updatedCartItems = cartWithDetails.filter((item) => item.id !== cartId);
      setCartWithDetails(updatedCartItems);

     
      dispatch(removeFromCart({ cartId }));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="cart-product">
      <h2>Cart</h2>
      {cartWithDetails.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Cart ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartWithDetails.map((item) => (
              <tr key={item.productId}>
                <td>{item.id}</td>
                <td>{item.productId}</td>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>{item.stockQuantity}</td>
                <td>
                <button className="blue-light" onClick={() => handleRemoveItem(item.id)}>
                    Remove from Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartProduct;

