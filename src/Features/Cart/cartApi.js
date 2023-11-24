// cartApi.js
import axios from 'axios';
import { Base_Url, apiExtension, Get_All_Cart, Get_Cart_ById, Create_Cart, Update_Cart, Delete_Cart } from '../../Component/BaseUrl';

const api = axios.create({
  baseURL: Base_Url + apiExtension,
});

export const getAllCartItems = async () => {
  try {
    const response = await api.get(Get_All_Cart);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCartItemById = async (cartId) => {
  try {
    const response = await api.get(`${Get_Cart_ById}/${cartId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCartItem = async (cartData) => {
  try {
    const response = await api.post(Create_Cart, cartData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCartItem = async (cartId, updatedCartData) => {
  try {
    const response = await api.put(`${Update_Cart}/${cartId}`, updatedCartData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCartItem = async (cartId) => {
  try {
    const response = await api.delete(`${Delete_Cart}/${cartId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
