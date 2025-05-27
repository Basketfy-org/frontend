import { apiRequest } from "./api";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;;

const headers= {
      'Content-Type': 'application/json',
    };

// Specific methods if needed
export const saveBasket = (data) => apiRequest(API_BASE_URL,'POST',headers, '/create-basket', data);
export const getBaskets = (limit) => apiRequest(API_BASE_URL,'GET',headers, `/get-all-basket?limit=${limit}`);
export const updateBasket = (id, data) => apiRequest(API_BASE_URL,'PUT',headers, `/baskets/${id}`, data);
