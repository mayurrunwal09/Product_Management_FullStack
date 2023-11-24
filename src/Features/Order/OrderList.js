



// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Modal, Button, TextField, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
// import {
//   getAllOrders,
//   createOrder as createOrderAPI,
//   updateOrder as updateOrderAPI,
//   deleteOrder as deleteOrderAPI,
// } from './orderApi';
// import {
//   selectOrders,
//   setOrders,
//   addOrder,
//   updateOrder,
//   deleteOrder,
// } from './orderSlice';
// import './OrderList.css';

// const OrderList = () => {
//   const dispatch = useDispatch();
//   const orders = useSelector(selectOrders);
//   const [openModal, setOpenModal] = useState(false);
//   const [modalData, setModalData] = useState({
//     id: null,
//     orderDate: '',
//     totalAmount: '',
//     orderItems: [],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getAllOrders();
//         dispatch(setOrders(data));
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   const handleOpenModal = (order) => {
//     const initializedOrder = {
//       ...order,
//       orderItems: order.orderItems || [],
//     };

//     setModalData(initializedOrder);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setModalData({
//       id: null,
//       orderDate: '',
//       totalAmount: '',
//       orderItems: [],
//     });
//     setOpenModal(false);
//   };

//   const handleFetchData = async () => {
//     try {
//       const data = await getAllOrders();
//       dispatch(setOrders(data));
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   };

//   const handleCreateOrder = async () => {
//     try {
//       const newOrder = await createOrderAPI(modalData);
//       dispatch(addOrder(newOrder));
//       handleCloseModal();
//     } catch (error) {
//       console.error('Error creating order:', error);
//     }
//   };

//   const handleUpdateOrder = async () => {
//     try {
//       await updateOrderAPI(modalData.id, {
//         orderDate: modalData.orderDate,
//         totalAmount: modalData.totalAmount,
//         orderItems: modalData.orderItems,
//       });
//       dispatch(updateOrder({ id: modalData.id, updatedOrderData: modalData }));
//       handleCloseModal();
//     } catch (error) {
//       console.error('Error updating order:', error);
//     }
//   };

//   const handleDeleteOrder = async () => {
//     try {
//       await deleteOrderAPI(modalData.id);
//       dispatch(deleteOrder(modalData.id));
//       handleCloseModal();
//     } catch (error) {
//       console.error('Error deleting order:', error);
//     }
//   };

//   return (
//     <div className="order-list-container">
//       <Button variant="contained" onClick={() => handleOpenModal({})}>
//         Add Order
//       </Button>
      

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Order Date</TableCell>
//               <TableCell>Total Amount</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.id}</TableCell>
//                 <TableCell>{order.orderDate}</TableCell>
//                 <TableCell>{order.totalAmount}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" onClick={() => handleOpenModal(order)}>
//                     Update
//                   </Button>
//                   <Button variant="contained" onClick={() => handleDeleteOrder(order)}>
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Modal open={openModal} onClose={handleCloseModal}>
//         <div className="modal-content">
//           <h2>{modalData.id ? 'Update Order' : 'Add New Order'}</h2>
//           <TextField
//             label="Order Date"
//             type="date"
//             value={modalData.orderDate}
//             onChange={(e) => setModalData({ ...modalData, orderDate: e.target.value })}
//           />
//           <TextField
//             label="Total Amount"
//             type="number"
//             value={modalData.totalAmount}
//             onChange={(e) => setModalData({ ...modalData, totalAmount: e.target.value })}
//           />

//           <h3>Order Items</h3>
//           <ul>
//             {modalData.orderItems.map((item) => (
//               <li key={item.id}>
//                 {item.productName} - Quantity: {item.quantity}
//               </li>
//             ))}
//           </ul>

        
//           {modalData.id && (
//             <>
//               <Button variant="contained" onClick={handleUpdateOrder}>
//                 Update Order
//               </Button>
             
//             </>
//           )}
//           <Button variant="contained" onClick={handleCloseModal}>
//             Cancel
//           </Button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default OrderList;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, TextField, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import {
  getAllOrders,
  createOrder as createOrderAPI,
  updateOrder as updateOrderAPI,
  deleteOrder as deleteOrderAPI,
} from './orderApi';
import {
  selectOrders,
  setOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} from './orderSlice';
import './OrderList.css';

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({
    id: null,
    orderDate: '',
    totalAmount: '',
    orderItems: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrders();
        dispatch(setOrders(data));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleOpenModal = (order) => {
    const initializedOrder = {
      ...order,
      orderItems: order.orderItems || [],
    };

    setModalData(initializedOrder);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setModalData({
      id: null,
      orderDate: '',
      totalAmount: '',
      orderItems: [],
    });
    setOpenModal(false);
  };

  const handleFetchData = async () => {
    try {
      const data = await getAllOrders();
      dispatch(setOrders(data));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleCreateOrder = async () => {
    try {
      const newOrder = await createOrderAPI(modalData);
      dispatch(addOrder(newOrder));
      handleCloseModal();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleUpdateOrder = async () => {
    try {
      await updateOrderAPI(modalData.id, {
        orderDate: modalData.orderDate,
        totalAmount: modalData.totalAmount,
        orderItems: modalData.orderItems,
      });
      dispatch(updateOrder({ id: modalData.id, updatedOrderData: modalData }));
      handleCloseModal();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrderAPI(orderId);
      dispatch(deleteOrder(orderId));
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="order-list-container">
      <Button variant="contained" onClick={() => handleOpenModal({})}>
        Add Order
      </Button>
   

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleOpenModal(order)}>
                    Update
                  </Button>
                  {/* <Button variant="contained" onClick={() => handleDeleteOrder(order.id)}>
                    Delete
                  </Button> */}
                   <Button
                     variant="contained"
                       onClick={() => handleDeleteOrder(order.id)}
                       style={{ backgroundColor: '#f00', color: '#fff' }} 
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div className="modal-content">
          <h2>{modalData.id ? 'Update Order' : 'Add New Order'}</h2>
          <TextField
            label=""
            type="date"
            value={modalData.orderDate}
            onChange={(e) => setModalData({ ...modalData, orderDate: e.target.value })}
          />
          <TextField
            label="Total Amount"
            type="number"
            value={modalData.totalAmount}
            onChange={(e) => setModalData({ ...modalData, totalAmount: e.target.value })}
          />

          <h3>Order Items</h3>
          <ul>
            {modalData.orderItems.map((item) => (
              <li key={item.id}>
                {item.productName} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>

          <Button variant="contained" onClick={handleCreateOrder}>
            Add Order
          </Button>
          {modalData.id && (
            <>
              <Button variant="contained" onClick={handleUpdateOrder}>
                Update Order
              </Button>
           
            </>
          )}
          <Button variant="contained" onClick={handleCloseModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderList;
