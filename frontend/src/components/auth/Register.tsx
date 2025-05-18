import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ApiService from "../../services/ApiService";
import { Link } from "react-router-dom";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [direccion, setDireccion] = useState("");
  const [rol, setRol] = useState("ADOPTANTE"); // Rol por defecto como "ADOPTANTE"
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Verificación de campos vacíos
    if (!nombre || !apellido || !telefono || !email || !contrasena || !confirmar || !direccion) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Validación de teléfono (debe empezar con 11 y tener 8 dígitos más)
    if (!/^\d{8}$/.test(telefono)) {
      setError("Teléfono inválido. Debe tener 8 números luego del 11.");
      return;
    }

    // Validación de contraseñas
    if (contrasena !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      await ApiService.registerUser({
        nombre,
        apellido,
        telefono,
        email,
        contrasena,
        confirmar,
        direccion,
        rol,
        estado: "ACTIVO",
      });
      setSuccess("Usuario creado con éxito");
      setError(""); // Limpiar cualquier error previo
      navigate('/Home');
    } catch (err: any) {
      setError(err.message || "Error al registrar el usuario");
      setSuccess(""); // Limpiar cualquier éxito previo
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Registro de Usuario</h1>

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Teléfono dividido en dos campos */}
        <div className="flex mb-4">
          <div className="flex items-center px-3 py-2 border border-gray-300 rounded-l-md bg-gray-200">
            11
          </div>

          <input
            type="text"
            placeholder="Ingrese el resto del número"
            value={telefono}
            onChange={(e) => {
              const value = e.target.value;
              // Permitir solo números y limitar a 8 dígitos
              if (/^\d{0,8}$/.test(value)) {
                setTelefono(value);
              }
            }}
            maxLength={8} // Limitamos a 8 números
            className="w-full p-3 border-t border-b border-r border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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

        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ADOPTANTE">Adoptante</option>
          <option value="HOGAR_TRANSITO">Hogar de tránsito</option>
        </select>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">{success}</div>}

        <button
          onClick={handleRegister}
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Registrar
        </button>
        <p className="mt-4 text-center text-gray-600">
          ¿Ya tenés una cuenta? <Link to="/login" className="text-blue-600 hover:text-blue-700">Inicia sesión acá</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
