import { API_BASE_URL } from "../constants/config";
import { apiRequest } from "./api";


const headers= {
      'Content-Type': 'application/json',
    };

// Specific methods if needed
export const login =async (data) => apiRequest(API_BASE_URL,'POST',headers, '/login', data);
export const register =async (data) => apiRequest(API_BASE_URL,'POST',headers, `/register`,data);
export const history = (id,limit) => apiRequest(API_BASE_URL,'GET',headers, `/history?id=${id}&limit=${limit}`);
export const deposit =async (id,data) => apiRequest(API_BASE_URL,'GET',headers, `/deposit?id=${id}`,data);
export const withdraw =async (id,data) => apiRequest(API_BASE_URL,'GET',headers, `/withdraw?id=${id}`,data);