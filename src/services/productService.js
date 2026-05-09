import api from './api';

export const productService = {
  async getProducts(params = {}) {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch products');
    }
  },

  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch product');
    }
  },
  
  async getCategories() {
    // In a real application, there would likely be a separate endpoint for this.
    // For now, we will fetch the products to dynamically derive categories.
    try {
      const products = await this.getProducts();
      const categories = ['All', ...new Set(products.map(p => p.category))];
      return categories;
    } catch (error) {
        return ['All', 'Electronics', 'Accessories', 'Furniture', 'Essentials', 'Photography', 'Footwear']; // Fallback
    }
  }
};
