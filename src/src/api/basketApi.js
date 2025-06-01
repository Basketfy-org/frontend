import { apiRequest } from "./api";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;;

const headers= {
      'Content-Type': 'application/json',
    };

// Specific methods if needed
export const saveBasket = (data) => apiRequest(API_BASE_URL,'POST',headers, '/create-basket', data);
export const getBaskets =async (limit) => apiRequest(API_BASE_URL,'GET',headers, `/get-all-basket?limit=${limit}`);
export const saveBuyBasket = (data) => apiRequest(API_BASE_URL,'POST',headers, `/buy-basket`, data);


