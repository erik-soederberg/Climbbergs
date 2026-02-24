import axios from 'axios';

// CHANGE THIS TO YOUR API URL
const API_BASE_URL = 'http://localhost:5177/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const productApi = {
    // Get all products
    getAll: async () => {
        const response = await api.get('/products');
        return response.data;
    },

    // Get single product by ID
    getById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    // Get products by category
    getByCategory: async (categoryId) => {
        const response = await api.get(`/products/category/${categoryId}`);
        return response.data;
    },
};

export const interestApi = {
    // Record interest in a product
    recordInterest: async (productId) => {
        const response = await api.post('/productinterests', { productId });
        return response.data;
    },

    // Get interest count for a product
    getCount: async (productId) => {
        const response = await api.get(`/productinterests/${productId}/count`);
        return response.data;
    },
};

export default api;