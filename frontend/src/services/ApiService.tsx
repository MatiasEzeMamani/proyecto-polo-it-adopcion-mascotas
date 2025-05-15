import axios from 'axios';

const API_URL = 'http://localhost:4040/api/usuarios'; // Asegúrate de que la URL esté configurada correctamente para tu Spring Boot

const ApiService = {
  loginUser: async (email: string, contrasena: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        contrasena,
      });
      return response.data; // El servidor debe devolver algún tipo de dato, como un token o información del usuario
    } catch (error) {
      throw error; // Aquí simplemente lanzamos el error hacia el componente que lo maneja
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
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default ApiService;
