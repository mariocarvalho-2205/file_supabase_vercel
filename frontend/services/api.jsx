import axios from 'axios';

// Configurando a URL base do backend
const api = axios.create({
  baseURL: 'URL backend',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;