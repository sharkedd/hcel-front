import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../services/auth";

export default function Login() {
  const { token, login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // si ya hay token → ir al menú
  useEffect(() => {
    if (token) {
      window.location.href = "/menu";
    }
  }, [token]);

  if (loading) return <p>Cargando...</p>;

  async function handleLogin() {
    try {
      const data = await loginRequest(email, password);

      login(data.user, data.accessToken);
      // redirige automáticamente por el useEffect
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Login</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleLogin}>
          Ingresar
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
