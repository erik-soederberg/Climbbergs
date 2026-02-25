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

// 🆕 HANGBOARD DESIGNER API
export const hangboardApi = {
    // Get all hangboard bases
    getBases: async () => {
        const response = await api.get('/hangboardbases');
        return response.data;
    },

    // Get all grip types
    getGripTypes: async () => {
        const response = await api.get('/griptypes');
        return response.data;
    },

    // Save a design
    saveDesign: async (design) => {
        const response = await api.post('/hangboarddesigns', design);
        return response.data;
    },

    // Get design by ID
    getDesignById: async (id) => {
        const response = await api.get(`/hangboarddesigns/${id}`);
        return response.data;
    },

    // Get designs by session ID
    getDesignsBySession: async (sessionId) => {
        const response = await api.get(`/hangboarddesigns/session/${sessionId}`);
        return response.data;
    },
    // Get recent designs (for gallery)
    getRecentDesigns: async (count = 10) => {
        const response = await api.get(`/hangboarddesigns/recent?count=${count}`);
        return response.data;
    },

    // Update design
    updateDesign: async (id, design) => {
        const response = await api.put(`/hangboarddesigns/${id}`, design);
        return response.data;
    },

    // Delete design
    deleteDesign: async (id) => {
        await api.delete(`/hangboarddesigns/${id}`);
    },
};

export default api;