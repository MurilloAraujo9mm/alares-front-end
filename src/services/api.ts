import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const planController = {
  getAllOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  findAllUsersWithOrders: async () => {
    try {
      const response = await api.get('/orders/with/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  

  updateUserWithOrder: async (id: number, userData: any) => {
    try {
      const response = await api.patch(`/orders/${id}/update/user`, userData);
    return response.data;
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteUserWithOrder: async (id: number, userData: any) => {
    try {
      const response = await api.patch(`/orders/${id}/delete/user`, userData);
    return response.data;
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

  updatePlan: async (id: number, data: any) => {   
    try {
      const response = await api.patch(`/plans/update/${id}`, data);      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deletePlan: async (id: number) => {   
    try {
      const response = await api.delete(`/plans/delete/${id}`);      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createPlan: async (planData: any) => {   
    try {
      const response = await api.post('/plans/create', planData);      
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

  authCreate: async (username: any, password: any, email: any): Promise<any> => {   
    try {
      const response = await api.post('/auth/create',  {
        username,
        password,
        email
      });      
      
      return response;
      
    } catch (error) {
       return error;
    }
  },

  
};

export default api;
