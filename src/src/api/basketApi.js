const API_BASE_URL = 'https://basketfy-ai.onrender.com/api/v1';

export const apiRequest = async (method, endpoint, body = null) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API error: ${res.status} ${error}`);
  }

  return res.json();
};

// Specific methods if needed
export const saveBasket = (data) => apiRequest('POST', '/create-basket', data);
export const getBaskets = () => apiRequest('GET', '/get-all-basket');
export const updateBasket = (id, data) => apiRequest('PUT', `/baskets/${id}`, data);
