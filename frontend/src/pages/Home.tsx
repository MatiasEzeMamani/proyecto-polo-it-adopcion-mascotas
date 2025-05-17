import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:4040/api";

const TokenRenewalComponent = () => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Función para refrescar el token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      localStorage.clear();
      navigate("/login");
      throw new Error("No hay refresh token disponible");
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
      if (response.status === 200) {
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        setAccessToken(newAccessToken);
        return newAccessToken;
      } else {
        throw new Error("No se pudo refrescar el token");
      }
    } catch (error) {
      console.error("Error al refrescar el token:", error);
      localStorage.clear();
      navigate("/login");
      throw error;
    }
  };

  // Función para obtener la lista de usuarios
  const fetchUsers = async (tokenParam: string | null = null) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const tokenToUse = tokenParam ?? accessToken;

      if (!tokenToUse) {
        console.log("No hay token disponible, redirigiendo al login.");
        navigate("/login");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/usuarios/`, {
        headers: { Authorization: `Bearer ${tokenToUse}` },
      });

      // Verificar si la respuesta es un array o si está en alguna propiedad
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (response.data.usuarios && Array.isArray(response.data.usuarios)) {
        setUsers(response.data.usuarios);
      } else {
        setUsers([]);
        setErrorMessage("La respuesta no tiene formato esperado");
        console.warn("Respuesta inesperada de usuarios:", response.data);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.log("Token expirado o inválido, intentando refrescar...");
        try {
          const newToken = await refreshAccessToken();
          await fetchUsers(newToken);
        } catch {
          // refreshAccessToken ya redirige a login si falla
        }
      } else {
        console.error("Error al obtener usuarios:", error);
        setErrorMessage("Error al cargar usuarios");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Renovación de Token y Usuarios</h1>
      <p><b>Access Token:</b> {accessToken || "No disponible"}</p>
      <button onClick={() => fetchUsers()} disabled={loading} style={{ marginBottom: "10px" }}>
        {loading ? "Cargando..." : "Refrescar Usuarios"}
      </button>
      <h2>Usuarios:</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <ul>
        {loading && users.length === 0 ? (
          <li>Cargando usuarios...</li>
        ) : users.length > 0 ? (
          users.map((user: any) => (
            <li key={user.usuarioId}>
              {user.nombre} {user.apellido} - {user.email}
            </li>
          ))
        ) : (
          <li>No hay usuarios cargados</li>
        )}
      </ul>
    </div>
  );
};

export default TokenRenewalComponent;
