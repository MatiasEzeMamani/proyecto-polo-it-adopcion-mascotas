import { useState } from "react";
import ApiService from "../../services/ApiService"; // Asegúrate de que el servicio esté configurado

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [direccion, setDireccion] = useState("");
  const [rol, setRol] = useState("USER"); // Asumimos que por defecto es "USER"
  const [estado, setEstado] = useState("ACTIVO"); // Asumimos que por defecto es "ACTIVO"
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    if (contrasena !== confirmar) {
      setError("Las contraseñas no coinciden");
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
        estado,
      });
      setSuccess("Usuario creado con éxito");
      setError(""); // Limpiar cualquier error previo
    } catch (err: any) {
      setError(err.message || "Error al registrar el usuario");
      setSuccess(""); // Limpiar cualquier éxito previo
    }
  };

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="Confirmar Contraseña"
        value={confirmar}
        onChange={(e) => setConfirmar(e.target.value)}
      />
      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
      />
      <select value={rol} onChange={(e) => setRol(e.target.value)}>
        <option value="USER">Usuario</option>
        <option value="ADMIN">Administrador</option>
      </select>
      <select value={estado} onChange={(e) => setEstado(e.target.value)}>
        <option value="ACTIVO">Activo</option>
        <option value="INACTIVO">Inactivo</option>
      </select>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}

      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default Register;
