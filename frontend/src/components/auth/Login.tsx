import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // Para manejar estado de carga
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !contrasena) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setError('');  // Limpiar el error previo
    setLoading(true);  // Activar estado de carga

    try {
      const response = await ApiService.loginUser(email, contrasena);
      console.log('Login exitoso', response);

      // Asegurarse de acceder correctamente a los tokens dentro de la respuesta
      const { accessToken, refreshToken } = response;  // Desestructuración para obtener los tokens

      // Guardar los tokens en el localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Mostrar los tokens en consola
      console.log('Token de acceso guardado:', accessToken);
      console.log('Token de refresco guardado:', refreshToken);

      // Redirigir al dashboard
      navigate('/Home');
    } catch (err: any) {
      console.log('Error en el login:', err);
      // Manejar errores más específicos si los hay
      setError(err.response?.data?.message || 'Error desconocido. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);  // Desactivar estado de carga
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Iniciar sesión</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <button
          onClick={handleLogin}
          className={`w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}  // Deshabilitar el botón mientras está cargando
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>

        <p className="mt-4 text-center text-gray-600">
          ¿No tenés cuenta? <Link to="/register" className="text-blue-600 hover:text-blue-700">Registrate acá</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
