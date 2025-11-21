import { useAuth } from "../context/AuthContext";

export default function Menu() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Menú Principal</h1>
      <p>Hola, {user?.email}</p>

      <button onClick={() => (window.location.href = "/historias")}>
        Ver historias
      </button>

      <button onClick={() => (window.location.href = "/escribir")}>
        Escribir historia
      </button>

      <button onClick={logout} style={{ marginTop: "30px" }}>
        Cerrar sesión
      </button>
    </div>
  );
}
