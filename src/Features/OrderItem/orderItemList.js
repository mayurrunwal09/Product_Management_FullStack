



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

import {
  getAllOrderItems,
  createOrderItem as createOrderItemAPI,
  updateOrderItem as updateOrderItemAPI,
  deleteOrderItem as deleteOrderItemAPI,
} from './orderItemApi';

import {
  selectOrderItems,
  setOrderItems,
  addOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from './orderItemSlice';

import { getAllProducts } from '../Product/enrollProduct';
import { getAllOrders } from '../Order/orderApi';

// Styled component for action buttons
const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const OrderItemList = () => {
  const dispatch = useDispatch();
  const orderItems = useSelector(selectOrderItems);
  const [modalData, setModalData] = useState({
    id: null,
    orderId: '',
    productId: '',
    quantity: '',
    unitPrice: '',
  });
  const [openModal, setOpenModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllOrderItems();
        const orderData = await getAllOrders();
        const productData = await getAllProducts();
        dispatch(setOrderItems(data));
        setOrders(orderData);
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching order items:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const getOrderDate = (orderId) => {
    const order = orders.find((order) => order.id === orderId);
    return order ? order.orderDate : 'N/A';
  };

  const getTotalAmount = (orderId) => {
    const order = orders.find((order) => order.id === orderId);
    return order ? order.totalAmount : 'N/A';
  };

  const getProductName = (productId) => {
    const product = products.find((product) => product.id === productId);
    return product ? product.productName : 'N/A';
  };

  const handleCreateOrderItem = async () => {
    try {
      const newOrderItemData = {
        orderId: modalData.orderId,
        productId: modalData.productId,
        quantity: modalData.quantity,
        unitPrice: modalData.unitPrice,
      };

      const newOrderItem = await createOrderItemAPI(newOrderItemData);
      dispatch(addOrderItem(newOrderItem));
      handleCloseModal();
    } catch (error) {
      console.error('Error creating order item:', error);
    }
  };

  const handleUpdateOrderItem = async () => {
    try {
      await updateOrderItemAPI(modalData.id, modalData);
      dispatch(updateOrderItem({ id: modalData.id, updatedOrderItemData: modalData }));
      handleCloseModal();
    } catch (error) {
      console.error('Error updating order item:', error);
    }
  };

  const handleDeleteOrderItem = async (orderItemId) => {
    try {
      await deleteOrderItemAPI(orderItemId);
      dispatch(deleteOrderItem(orderItemId));
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting order item:', error);
    }
  };

  const handleOpenModal = (orderItemId) => {
    const orderItemToUpdate = orderItems.find((item) => item.id === orderItemId);
    setModalData({ ...orderItemToUpdate });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setModalData({
      id: null,
      orderId: '',
      productId: '',
      quantity: '',
      unitPrice: '',
    });
    setOpenModal(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        Order Items
      </Typography>
      <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={() => handleOpenModal(null)}>
        Create Order Item
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItems.map((orderItem) => (
              <TableRow key={orderItem.id}>
                <TableCell>{orderItem.id}</TableCell>
                <TableCell>{getOrderDate(orderItem.orderId)}</TableCell>
                <TableCell>{getTotalAmount(orderItem.orderId)}</TableCell>
                <TableCell>{orderItem.productId}</TableCell>
                <TableCell>{getProductName(orderItem.productId)}</TableCell>
                <TableCell>{orderItem.quantity}</TableCell>
                <TableCell>{orderItem.unitPrice}</TableCell>
                <TableCell>
                  <ActionButton
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenModal(orderItem.id)}
                  >
                    Update
                  </ActionButton>
                  <ActionButton
                    variant="contained"
                    onClick={() => handleDeleteOrderItem(orderItem.id)}
                    style={{ backgroundColor: '#f00', color: '#fff' }}
                  >
                    Delete
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div style={{ backgroundColor: 'white', padding: 20, borderRadius: 8, width: 300, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h6" gutterBottom>
            {modalData.id ? 'Update Order Item' : 'Create Order Item'}
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="order-label">Order Date</InputLabel>
            <Select
              labelId="order-label"
              id="order"
              value={modalData.orderId}
              onChange={(e) => setModalData({ ...modalData, orderId: e.target.value })}
            >
              {orders.map((order) => (
                <MenuItem key={order.id} value={order.id}>
                  {getOrderDate(order.id)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="product-label">Product</InputLabel>
            <Select
              labelId="product-label"
              id="product"
              value={modalData.productId}
              onChange={(e) => setModalData({ ...modalData, productId: e.target.value })}
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.productName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Quantity"
            value={modalData.quantity}
            onChange={(e) => setModalData({ ...modalData, quantity: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Unit Price"
            value={modalData.unitPrice}
            onChange={(e) => setModalData({ ...modalData, unitPrice: e.target.value })}
            fullWidth
            margin="normal"
          />
          <ActionButton
            variant="contained"
            color="primary"
            onClick={modalData.id ? handleUpdateOrderItem : handleCreateOrderItem}
            style={{ margin: '8px 0' }}
          >
            {modalData.id ? 'Update Order Item' : 'Create Order Item'}
          </ActionButton>
          <ActionButton
            variant="contained"
            onClick={handleCloseModal}
            style={{ margin: '8px 0' }}
          >
            Cancel
          </ActionButton>
        </div>
      </Modal>
    </div>
  );
};

export default OrderItemList;