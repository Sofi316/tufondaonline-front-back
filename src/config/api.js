import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
});

// Interceptor para inyectar el Token automáticamente en cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Recuperamos el token guardado
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Lo pegamos en el header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;