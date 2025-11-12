import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicio de Pacientes
export const pacienteService = {
  getAll: async () => {
    const response = await api.get('/pacientes');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/pacientes/${id}`);
    return response.data;
  },
  create: async (paciente) => {
    const response = await api.post('/pacientes', paciente);
    return response.data;
  },
  update: async (id, paciente) => {
    const response = await api.put(`/pacientes/${id}`, paciente);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/pacientes/${id}`);
  },
};

// Servicio de Citas
export const citaService = {
  getAll: async () => {
    const response = await api.get('/citas');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/citas/${id}`);
    return response.data;
  },
  getProximas: async () => {
    const response = await api.get('/citas/proximas');
    return response.data;
  },
  create: async (cita) => {
    const response = await api.post('/citas', cita);
    return response.data;
  },
  update: async (id, cita) => {
    const response = await api.put(`/citas/${id}`, cita);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/citas/${id}`);
  },
};

// Servicio de Horarios
export const horarioService = {
  getAll: async () => {
    const response = await api.get('/horarios');
    return response.data;
  },
  getDisponibles: async () => {
    const response = await api.get('/horarios/disponibles');
    return response.data;
  },
  getByDia: async (dia) => {
    const response = await api.get(`/horarios/dia/${dia}`);
    return response.data;
  },
  create: async (horario) => {
    const response = await api.post('/horarios', horario);
    return response.data;
  },
  update: async (id, horario) => {
    const response = await api.put(`/horarios/${id}`, horario);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/horarios/${id}`);
  },
};

// Servicio de Materiales
export const materialService = {
  getAll: async () => {
    const response = await api.get('/materiales');
    return response.data;
  },
  getPublicos: async () => {
    const response = await api.get('/materiales/publicos');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/materiales/${id}`);
    return response.data;
  },
  getByCategoria: async (categoria) => {
    const response = await api.get(`/materiales/categoria/${categoria}`);
    return response.data;
  },
  upload: async (formData) => {
    const response = await api.post('/materiales', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  descargar: (id) => {
    return `${API_BASE_URL}/materiales/descargar/${id}`;
  },
  delete: async (id) => {
    await api.delete(`/materiales/${id}`);
  },
};

export default api;
