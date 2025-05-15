import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook para redirigir

  const handleLogin = async () => {
    try {
      const response = await ApiService.loginUser(email, contrasena);
      console.log('Login exitoso', response);
      
      // Aquí puedes guardar el token en localStorage si es necesario
      localStorage.setItem('token', response.token);  // O lo que sea que retorne tu API

      // Redirigir al dashboard
      navigate('/Home');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />
      {error && <div>{error}</div>}
      <button onClick={handleLogin}>Iniciar sesión</button>
      <p>¿No tenés cuenta? <Link to="/register">Registrate acá</Link></p>
    </div>
  );
};

export default Login;
