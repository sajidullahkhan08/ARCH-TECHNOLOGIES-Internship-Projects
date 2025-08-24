import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

// Todo API functions
export const getTodos = async (queryParams = '') => {
  const url = queryParams ? `/todos?${queryParams}` : '/todos';
  return api.get(url);
};

export const getTodo = async (id) => {
  return api.get(`/todos/${id}`);
};

export const createTodo = async (todoData) => {
  return api.post('/todos', todoData);
};

export const updateTodo = async (id, todoData) => {
  return api.put(`/todos/${id}`, todoData);
};

export const deleteTodo = async (id) => {
  return api.delete(`/todos/${id}`);
};

export const toggleTodo = async (id) => {
  return api.patch(`/todos/${id}/toggle`);
};

export const getStats = async () => {
  return api.get('/todos/stats/summary');
};

export default api;
