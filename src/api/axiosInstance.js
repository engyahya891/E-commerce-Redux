import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://sandbox.mockerito.com/ecommerce/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;