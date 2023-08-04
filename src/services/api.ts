// src/services/api.ts
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


  update: async (id: number, updatedData: any) => {  // Substitua "any" pelo tipo do plano se você tiver definido um
    try {
      const response = await api.put(`/endpoint-dos-planos/${id}`, updatedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id: number) => {
    try {
      const response = await api.delete(`/endpoint-dos-planos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};

export default api;
