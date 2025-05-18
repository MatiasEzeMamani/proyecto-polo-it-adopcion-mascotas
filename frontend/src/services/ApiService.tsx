import axios from 'axios';

const API_URL_AUTH = 'http://localhost:4040/api/auth';
const API_URL_USERS = 'http://localhost:4040/api';

const ApiService = {
  loginUser: async (email: string, contrasena: string) => {
    try {
      const response = await axios.post(`${API_URL_AUTH}/login`, {
        email,
        contrasena,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  registerUser: async (userData: {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    contrasena: string;
    confirmar: string;
    direccion: string;
    rol: string;
    estado: string;
  }) => {
    try {
      // fix: el numero no era el correcto.
      const telefonoCompleto = `11${userData.telefono}`;

      const response = await axios.post(`${API_URL_AUTH}/register`, {
        ...userData,
        telefono: telefonoCompleto,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUsers: async (accessToken: string) => {
    try {
      const response = await axios.get(`${API_URL_USERS}/usuarios/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default ApiService;
