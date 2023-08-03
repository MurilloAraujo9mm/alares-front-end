// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://suaapi.com',
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    // "Authorization": "Bearer " + token (se tiver token de autenticação)
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

  create: async (planData: any) => {   // Substitua "any" pelo tipo do plano se você tiver definido um
    try {
      const response = await api.post('/endpoint-dos-planos', planData);
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
