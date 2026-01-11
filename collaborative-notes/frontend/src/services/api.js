import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5001/api' });
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const authService = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me')
};

export const noteService = {
    getNotes: () => api.get('/notes'),
    getNote: (id) => api.get(`/notes/${id}`),
    createNote: (data) => api.post('/notes', data),
    updateNote: (id, data) => api.put(`/notes/${id}`, data),
    deleteNote: (id) => api.delete(`/notes/${id}`),
    shareNote: (id, data) => api.post(`/notes/${id}/share`, data),
    searchNotes: (q) => api.get(`/notes/search?query=${q}`)
};
export default api;
