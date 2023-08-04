import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const planController = {
  getAll: async () => {
    try {
      const response = await api.get('/endpoint-dos-planos');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: number) => {
    try {
      const response = await api.get(`/endpoint-dos-planos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (userData: any) => {   
    try {
      const response = await api.post('/users/create', userData);
      console.log(response);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createOrder: async (orderData: any) => {
    try {
      const response = await api.post('/orders/create', orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  plans: async () => {   
    try {
      const response = await api.get('/plans');      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  auth: async (username: any, password: any): Promise<any> => {   
    try {
      const response = await api.post('/auth/login',  {
        username,
        password
      });      

      
      return response;
      
    } catch (error) {
       return error;
    }
  },
};

export default api;
