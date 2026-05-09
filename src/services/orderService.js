import api from './api';

export const orderService = {
  async placeOrder(orderData) {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to place order');
    }
  },

  async getUserOrders(email) {
    try {
      const response = await api.get('/orders', { params: { email } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch orders');
    }
  },

  async getAllOrders() {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch orders');
    }
  }
};
